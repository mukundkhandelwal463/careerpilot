import os
import re
import json
import base64
import urllib.request
import urllib.parse
import urllib.error
import time
import logging
import smtplib
import random
import string
import traceback
from threading import Lock
from datetime import datetime, timezone
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import parseaddr

from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import login as django_login, logout as django_logout
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from api.models import User, OTP, Resume

from model1 import (
    CHATBOT_QUESTIONS,
    ResumeModelService,
    build_resume_from_answers,
    extract_resume_text,
    extract_skills,
)

from ai_integration import (
    get_gemini_ats_feedback,
    get_gemini_career_strategy,
    get_gemini_resume_suggestions,
    get_gemini_professional_summary,
    get_gemini_full_resume_analysis,
    get_gemini_enhanced_text,
    generate_pdf,
    generate_docx,
    generate_docx_from_builder,
    generate_interview_questions,
    grade_interview_response,
    generate_career_roadmap,
    get_gemini_parse_resume_to_json,
    generate_mock_test
)

# ── Prometheus Metrics Counters (Unit V: Monitoring & Observability) ──
_metrics_lock = Lock()
_metrics = {
    "http_requests_total":       0,   # Every HTTP request received
    "resumes_analyzed_total":    0,   # POST /api/analyze-resume calls
    "ats_score_sum":             0.0, # Sum of all ATS scores (to compute avg)
    "ats_score_count":           0,   # Count of ATS scores given
    "gemini_calls_total":        0,   # Total Gemini API calls
    "gemini_errors_total":       0,   # Failed Gemini API calls
    "auth_logins_total":         0,   # Successful logins
    "auth_registrations_total":  0,   # New user registrations
    "summaries_generated_total": 0,   # POST /api/generate-summary calls
    "app_start_time":            time.time(),  # When application started
}

def _increment(metric: str, value: float = 1):
    """Thread-safe increment a metric counter."""
    with _metrics_lock:
        _metrics[metric] = _metrics.get(metric, 0) + value


def _rapidapi_error_message(exc):
    if isinstance(exc, urllib.error.HTTPError):
        try:
            body = exc.read().decode(errors="ignore")[:300]
        except Exception:
            body = ""
        return f"HTTP {exc.code}: {body or exc.reason}"
    return str(exc)


# Initialize Resume Service
DATASET_PATH = os.path.join(settings.BASE_DIR, "UpdatedResumeDataSet.csv")
DOWNLOAD_FOLDER = os.path.join(settings.BASE_DIR, "downloads")
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

try:
    service = ResumeModelService(dataset_path=DATASET_PATH)
except Exception as e:
    print(f"Error loading ResumeModelService dataset: {e}")
    service = None


# Email helper functions
def _send_email_sync(subject, recipient, body_html):
    smtp_server = os.environ.get("SMTP_SERVER", "").strip()
    try:
        smtp_port = int(os.environ.get("SMTP_PORT") or 587)
    except Exception:
        smtp_port = 587
        
    smtp_user = os.environ.get("SMTP_USER", "").strip()
    smtp_pass_raw = os.environ.get("SMTP_PASS", "").strip()
    smtp_pass = smtp_pass_raw.replace(" ", "")
    default_sender = smtp_user if smtp_user else "noreply@airesume.com"
    mail_sender = os.environ.get("MAIL_SENDER", "").strip() or default_sender
    sender_email = parseaddr(mail_sender)[1].lower().strip()
    smtp_user_lower = smtp_user.lower().strip()

    if "gmail.com" in smtp_server.lower() and sender_email and sender_email != smtp_user_lower:
        print(f"[SMTP] Using SMTP_USER as sender for Gmail compatibility.")
        mail_sender = smtp_user

    if not all([smtp_server, smtp_user, smtp_pass]):
        print("[SMTP] Error: Missing configuration in .env")
        return False

    msg = MIMEMultipart()
    msg["From"] = mail_sender
    msg["To"] = recipient
    msg["Subject"] = subject
    msg.attach(MIMEText(body_html, "html"))

    # Try STARTTLS (port 587)
    try:
        server = smtplib.SMTP(smtp_server, smtp_port, timeout=10)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e1:
        print(f"[SMTP] STARTTLS failed: {e1}")

    # Try SSL (port 465)
    try:
        ssl_port = 465
        server = smtplib.SMTP_SSL(smtp_server, ssl_port, timeout=10)
        server.ehlo()
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e2:
        print(f"[SMTP] SSL also failed: {e2}")

    return False

def generate_otp(length=6):
    return "".join(random.choices(string.digits, k=length))

def _build_otp_email_html(full_name: str, otp_code: str) -> str:
    return f"""
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #ff6b6b;">Confirm Your AI Resume Account</h2>
        <p>Hello {full_name or 'there'},</p>
        <p>Use the code below to verify your email address and continue:</p>
        <div style="background: #f8f9fa; padding: 15px; font-size: 24px; font-weight: bold; text-align: center; color: #333; letter-spacing: 5px;">
            {otp_code}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>Best regards,<br>The AI Resume Team</p>
    </div>
    """

def _fallback_professional_summary(professional_title: str, stream_or_category: str, skills: str, experience: str) -> str:
    role_anchor = (professional_title or stream_or_category or "professional").strip()
    words = [w.strip() for w in str(skills or "").replace("\n", ",").split(",") if w.strip()]
    top_skills = ", ".join(words[:6])
    skill_line = top_skills if top_skills else "data analysis, communication, and problem solving"
    exp_text = str(experience or "").strip()
    exp_hint = exp_text.split("\n")[0][:120] if exp_text else ""

    parts = [
        f"Results-driven {role_anchor} with a strong foundation in {skill_line}.",
        "Known for translating requirements into measurable outcomes, improving process quality, and delivering reliable execution across cross-functional teams.",
    ]
    if exp_hint:
        parts.append(f"Hands-on experience includes {exp_hint}.")
    parts.append("Brings an ATS-friendly profile aligned to role expectations with clear impact, technical depth, and continuous learning mindset.")
    return " ".join(parts)


def _extract_candidate_name(resume_text: str) -> str:
    lines = [line.strip() for line in str(resume_text or "").splitlines() if line.strip()]
    banned = {"resume", "curriculum vitae", "cv", "profile", "summary", "objective", "experience", "education"}
    for line in lines[:12]:
        lowered = line.lower()
        if any(token in lowered for token in ["@", "http://", "https://", "linkedin", "github"]):
            continue
        if any(ch.isdigit() for ch in line):
            continue
        cleaned = re.sub(r"[^a-zA-Z\s]", " ", line)
        words = [w for w in cleaned.split() if w]
        if 2 <= len(words) <= 4:
            joined = " ".join(words).strip()
            if joined.lower() not in banned and len(joined) >= 4:
                return joined.title()
    return ""


def _find_contact(text: str, pattern: str) -> str:
    match = re.search(pattern, str(text or ""), flags=re.IGNORECASE)
    return match.group(0).strip() if match else ""


def _extract_section(lines: list, starts: list, stops: list) -> str:
    start_idx = None
    for idx, line in enumerate(lines):
        lowered = re.sub(r"[^a-zA-Z\s]", " ", line.lower()).strip()
        if any(key in lowered for key in starts):
            start_idx = idx + 1
            break
    if start_idx is None:
        return ""

    end_idx = len(lines)
    for idx in range(start_idx, len(lines)):
        lowered = re.sub(r"[^a-zA-Z\s]", " ", lines[idx].lower()).strip()
        if any(key in lowered for key in stops):
            end_idx = idx
            break
    return "\n".join(lines[start_idx:end_idx]).strip()


def _build_resume_prefill(resume_text: str, category: str, detected_skills: list) -> dict:
    text = str(resume_text or "")
    lines = [line.strip() for line in text.splitlines() if line.strip()]

    email = _find_contact(text, r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}")
    raw_phone = _find_contact(text, r"(?:\+?\d[\d\-\s\(\)]{8,}\d)")
    phone = re.sub(r"[^\d\+\-\s\(\)]", "", raw_phone).strip() if raw_phone else ""

    linkedin = _find_contact(text, r"(?:https?://)?(?:www\.)?linkedin\.com/[^\s]+")
    github = _find_contact(text, r"(?:https?://)?(?:www\.)?github\.com/[^\s]+")
    website = _find_contact(text, r"https?://[^\s]+")
    if website and (linkedin and website in linkedin or github and website in github):
        website = ""

    full_name = _extract_candidate_name(text)
    professional_title = str(category or "").strip()

    summary_block = _extract_section(
        lines,
        starts=["professional summary", "summary", "profile", "objective", "about"],
        stops=["experience", "education", "skills", "projects", "certification", "achievements"],
    )
    summary = " ".join(summary_block.split())
    if not summary:
        candidate_lines = []
        for line in lines[:20]:
            lowered = line.lower()
            if any(token in lowered for token in ["@", "linkedin", "github", "http://", "https://"]):
                continue
            if len(line.split()) < 4:
                continue
            if any(h in lowered for h in ["experience", "education", "skills", "project", "certification"]):
                continue
            candidate_lines.append(line)
            if len(candidate_lines) >= 3:
                break
        summary = " ".join(candidate_lines)
    summary = summary[:420].strip()

    experience_block = _extract_section(
        lines,
        starts=["work experience", "professional experience", "experience"],
        stops=["education", "skills", "projects", "certification", "achievements"],
    )
    education_block = _extract_section(
        lines,
        starts=["education", "academic"],
        stops=["experience", "skills", "projects", "certification", "achievements"],
    )

    experience_list = []
    if experience_block:
        exp_desc = " ".join(experience_block.split())[:700]
        experience_list.append(
            {
                "company": "",
                "position": professional_title or "Professional Experience",
                "start_date": "",
                "end_date": "",
                "is_current": False,
                "description": exp_desc,
            }
        )

    education_list = []
    if education_block:
        edu_desc = " ".join(education_block.split())[:450]
        education_list.append(
            {
                "institution": "",
                "degree": "",
                "field": "",
                "graduation_date": "",
                "gpa": "",
                "details": edu_desc,
            }
        )

    skills = [str(s).strip() for s in (detected_skills or []) if str(s).strip()][:20]

    return {
        "title": f"{professional_title or 'Resume'} Builder Draft",
        "personal_info": {
            "full_name": full_name,
            "email": email,
            "phone": phone,
            "address": "",
            "city": "",
            "state": "",
            "zip": "",
            "country": "",
            "linkedin": linkedin,
            "github": github,
            "website": website,
            "professional_title": professional_title,
        },
        "professional_summary": summary,
        "experience": experience_list,
        "education": education_list,
        "project": [],
        "skills": skills,
    }


# Prometheus /metrics endpoint
@api_view(['GET'])
@permission_classes([AllowAny])
def prometheus_metrics(request):
    with _metrics_lock:
        total     = _metrics["http_requests_total"]
        analyzed  = _metrics["resumes_analyzed_total"]
        score_sum = _metrics["ats_score_sum"]
        score_cnt = _metrics["ats_score_count"]
        gcalls    = _metrics["gemini_calls_total"]
        gerrors   = _metrics["gemini_errors_total"]
        logins    = _metrics["auth_logins_total"]
        regs      = _metrics["auth_registrations_total"]
        summaries = _metrics["summaries_generated_total"]
        uptime    = time.time() - _metrics["app_start_time"]

    avg_ats = round(score_sum / score_cnt, 2) if score_cnt > 0 else 0.0

    metrics_text = f"""# HELP http_requests_total Total number of HTTP requests received
# TYPE http_requests_total counter
http_requests_total {total}

# HELP resumes_analyzed_total Total number of resumes analyzed via /api/analyze-resume
# TYPE resumes_analyzed_total counter
resumes_analyzed_total {analyzed}

# HELP ats_score_avg Average ATS score given across all analyzed resumes (0-100)
# TYPE ats_score_avg gauge
ats_score_avg {avg_ats}

# HELP ats_scores_count Total number of ATS scores computed
# TYPE ats_scores_count counter
ats_scores_count {score_cnt}

# HELP gemini_calls_total Total number of Gemini AI API calls made
# TYPE gemini_calls_total counter
gemini_calls_total {gcalls}

# HELP gemini_errors_total Total number of failed Gemini AI API calls
# TYPE gemini_errors_total counter
gemini_errors_total {gerrors}

# HELP auth_logins_total Total number of successful user logins
# TYPE auth_logins_total counter
auth_logins_total {logins}

# HELP auth_registrations_total Total number of new user registrations
# TYPE auth_registrations_total counter
auth_registrations_total {regs}

# HELP summaries_generated_total Total number of AI professional summaries generated
# TYPE summaries_generated_total counter
summaries_generated_total {summaries}

# HELP app_uptime_seconds Seconds since application started
# TYPE app_uptime_seconds gauge
app_uptime_seconds {round(uptime, 1)}
"""
    return HttpResponse(metrics_text, content_type="text/plain; version=0.0.4")


# Diagnostics / Health check
@api_view(['GET'])
@permission_classes([AllowAny])
def health(request):
    db_status = "ok"
    trace = ""
    try:
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
    except Exception as e:
        db_status = str(e)
        trace = traceback.format_exc()
    
    return JsonResponse({
        "status": "ok",
        "database_status": db_status,
        "smtp_server": os.environ.get("SMTP_SERVER", "NOT SET"),
        "smtp_port": os.environ.get("SMTP_PORT", "NOT SET"),
        "smtp_user": os.environ.get("SMTP_USER", "NOT SET"),
        "smtp_pass_set": "yes" if os.environ.get("SMTP_PASS") else "NO",
        "mail_sender": os.environ.get("MAIL_SENDER", "NOT SET"),
        "trace": trace
    })


# Diagnostics / Test SMTP
@api_view(['GET'])
@permission_classes([AllowAny])
def test_smtp(request):
    smtp_server = os.environ.get("SMTP_SERVER", "").strip()
    try:
        smtp_port = int(os.environ.get("SMTP_PORT") or 587)
    except Exception:
        smtp_port = 587
    smtp_user = os.environ.get("SMTP_USER", "").strip()
    smtp_pass = os.environ.get("SMTP_PASS", "").strip().replace(" ", "")

    if not all([smtp_server, smtp_user, smtp_pass]):
        return JsonResponse({"error": "Missing SMTP config", "server": smtp_server, "user": smtp_user, "pass_set": bool(smtp_pass)})

    results = []

    # STARTTLS
    try:
        server = smtplib.SMTP(smtp_server, smtp_port, timeout=10)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(smtp_user, smtp_pass)
        server.quit()
        results.append({"method": "STARTTLS", "port": smtp_port, "status": "SUCCESS"})
    except Exception as e:
        results.append({"method": "STARTTLS", "port": smtp_port, "status": "FAILED", "error": str(e)})

    # SSL
    try:
        server = smtplib.SMTP_SSL(smtp_server, 465, timeout=10)
        server.ehlo()
        server.login(smtp_user, smtp_pass)
        server.quit()
        results.append({"method": "SSL", "port": 465, "status": "SUCCESS"})
    except Exception as e:
        results.append({"method": "SSL", "port": 465, "status": "FAILED", "error": str(e)})

    should_send = request.GET.get("send", "").strip() in {"1", "true", "yes"}
    send_to = request.GET.get("to", "").strip() or smtp_user
    send_result = None
    if should_send:
        body = "<p>This is a live SMTP delivery test from AI Resume.</p>"
        ok = _send_email_sync("AI Resume SMTP Test", send_to, body)
        send_result = {"to": send_to, "status": "SUCCESS" if ok else "FAILED"}

    return JsonResponse({
        "smtp_server": smtp_server,
        "smtp_port": smtp_port,
        "smtp_user": smtp_user,
        "results": results,
        "send_test": send_result,
    })


# AI Summary Generation
@api_view(['POST'])
@permission_classes([AllowAny])
def generate_summary(request):
    try:
        payload = request.data
        professional_title = str(payload.get("professional_title", "")).strip()
        stream_or_category = str(payload.get("stream_or_category", "")).strip()
        skills = payload.get("skills", "")
        experience = payload.get("experience", "")
        current_summary = payload.get("current_summary", "")

        if not professional_title and not stream_or_category:
            raise ValueError("Professional Title or Category/Stream is required.")

        _increment("gemini_calls_total")
        try:
            gemini_summary = get_gemini_professional_summary(
                professional_title=professional_title,
                stream_or_category=stream_or_category,
                skills=str(skills or ""),
                experience=str(experience or ""),
                current_summary=str(current_summary or ""),
            )
        except Exception:
            _increment("gemini_errors_total")
            gemini_summary = None

        source = "gemini"
        summary = str(gemini_summary or "").strip()
        if not summary or summary.lower().startswith("gemini error"):
            source = "fallback"
            summary = _fallback_professional_summary(
                professional_title=professional_title,
                stream_or_category=stream_or_category,
                skills=str(skills or ""),
                experience=str(experience or ""),
            )

        _increment("summaries_generated_total")
        return JsonResponse({"success": True, "summary": summary, "source": source})
    except Exception as exc:
        return JsonResponse({"success": False, "error": str(exc)}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def parse_resume_to_json(request):
    try:
        if "resume" not in request.FILES:
            return JsonResponse({"success": False, "error": "No resume file provided."}, status=400)
            
        file_storage = request.FILES.get("resume")
        if not file_storage or not file_storage.name:
            return JsonResponse({"success": False, "error": "Invalid file."}, status=400)
            
        resume_text = extract_resume_text(file_storage.name, file_storage.read())
        if not resume_text.strip():
            return JsonResponse({"success": False, "error": "Could not extract text from file."}, status=400)
            
        _increment("gemini_calls_total")
        parsed_data = get_gemini_parse_resume_to_json(resume_text)
        
        if not parsed_data:
            return JsonResponse({"success": False, "error": "Failed to parse resume data."}, status=500)
            
        return JsonResponse({"success": True, "data": parsed_data})
    except Exception as exc:
        return JsonResponse({"success": False, "error": str(exc)}, status=500)


# AI Enhance Text
@api_view(['POST'])
@permission_classes([AllowAny])
def enhance_text(request):
    try:
        payload = request.data
        text_to_enhance = str(payload.get("text", "")).strip()
        if not text_to_enhance:
            return JsonResponse({"success": False, "error": "No text provided"}, status=400)
        
        _increment("gemini_calls_total")
        try:
            enhanced = get_gemini_enhanced_text(text_to_enhance)
        except Exception as e:
            _increment("gemini_errors_total")
            return JsonResponse({"success": False, "error": str(e)}, status=500)
            
        return JsonResponse({"success": True, "enhanced_text": enhanced})
    except Exception as exc:
        return JsonResponse({"success": False, "error": str(exc)}, status=500)


# Resume Upload / Analysis
@api_view(['POST'])
@permission_classes([AllowAny])
def analyze_resume(request):
    try:
        job_description = request.data.get("job_description", "").strip()
        stream_or_category = request.data.get("stream_or_category", "").strip()
        
        if "job_description_file" in request.FILES:
            jd_file = request.FILES.get("job_description_file")
            if jd_file and jd_file.name:
                job_description = extract_resume_text(jd_file.name, jd_file.read())
                
        resume_text = ""
        
        file_bytes = None
        if "resume" in request.FILES:
            file_storage = request.FILES.get("resume")
            if file_storage and file_storage.name:
                file_bytes = file_storage.read()
                resume_text = extract_resume_text(file_storage.name, file_bytes)
        elif not (stream_or_category and job_description):
            raise ValueError("Please upload a resume, or provide both Category/Stream and Job Description.")

        if not service:
            raise RuntimeError("Resume Classifier Service is not initialized.")

        use_dataset_for_category = not stream_or_category or service.has_category_in_dataset(stream_or_category)

        def merge_suggestions(*groups):
            merged = []
            seen = set()
            for group in groups:
                if not group:
                    continue
                for item in group:
                    text = str(item or "").strip()
                    if not text:
                        continue
                    key = text.lower()
                    if key in seen:
                        continue
                    seen.add(key)
                    merged.append(text)
            return merged

        # Run Analysis
        _increment("resumes_analyzed_total")
        
        if stream_or_category and job_description:
            analysis = service.analyze_resume(resume_text, job_description)
            _increment("gemini_calls_total")
            try:
                gemini_full = get_gemini_full_resume_analysis(
                    resume_text=resume_text,
                    job_description=job_description,
                    stream_or_category=stream_or_category,
                )
            except Exception:
                _increment("gemini_errors_total")
                gemini_full = {"gemini_ok": False}

            if gemini_full.get("gemini_ok"):
                gemini_ats = gemini_full.get("ats_score", analysis.ats_score)
                ats_score = round((analysis.ats_score + gemini_ats) / 2, 2)
                merged_suggestions = merge_suggestions(analysis.suggestions, gemini_full.get("suggestions", []))
                missing_keywords = gemini_full.get("missing_keywords", analysis.missing_keywords)
            else:
                ats_score = analysis.ats_score
                merged_suggestions = list(analysis.suggestions)
                missing_keywords = analysis.missing_keywords
            
            response_analysis = {
                "category": stream_or_category,
                "ats_score": ats_score,
                "skills": analysis.resume_skills,
                "missing_keywords": missing_keywords,
                "suggestions": merged_suggestions,
                "mode": "user_category_plus_jd",
            }
            jobs = service.recommend_jobs(resume_text or stream_or_category, top_k=5)
            gemini_career_map = get_gemini_career_strategy(resume_text)
            
            _increment("ats_score_sum", ats_score)
            _increment("ats_score_count")
            
            return JsonResponse({
                "success": True,
                "analysis": response_analysis,
                "job_recommendations": jobs,
                "gemini_ats_feedback": None,
                "gemini_career_map": gemini_career_map,
                "prefill_data": _build_resume_prefill(resume_text, stream_or_category, response_analysis.get("skills", [])),
            })

        if not job_description:
            analysis = service.analyze_resume(resume_text, "")
            final_category = stream_or_category or analysis.category
            _increment("gemini_calls_total")
            try:
                gemini_full = get_gemini_full_resume_analysis(
                    resume_text=resume_text,
                    job_description="",
                    stream_or_category=final_category,
                )
            except Exception:
                _increment("gemini_errors_total")
                gemini_full = {"gemini_ok": False}

            if gemini_full.get("gemini_ok"):
                dataset_ats = service.estimate_ats_without_jd(resume_text, final_category)
                gemini_ats = gemini_full.get("ats_score", 0.0)
                ats_score = round((dataset_ats + gemini_ats) / 2, 2)
                response_analysis = {
                    "category": gemini_full.get("category", final_category),
                    "ats_score": ats_score,
                    "ats_available": True,
                    "skills": analysis.resume_skills,
                    "missing_keywords": gemini_full.get("missing_keywords", []),
                    "suggestions": merge_suggestions(analysis.suggestions, gemini_full.get("suggestions", [])),
                    "mode": "gemini_no_jd",
                }
            else:
                dataset_ats = service.estimate_ats_without_jd(resume_text, final_category)
                ats_score = dataset_ats
                response_analysis = {
                    "category": final_category,
                    "ats_score": dataset_ats,
                    "ats_available": True,
                    "skills": analysis.resume_skills,
                    "missing_keywords": [],
                    "suggestions": merge_suggestions(
                        analysis.suggestions,
                        ["Gemini unavailable, so ATS is estimated using the resume dataset profile."],
                    ),
                    "mode": "dataset_no_jd_fallback",
                }
        elif use_dataset_for_category:
            analysis = service.analyze_resume(resume_text, job_description)
            final_category = stream_or_category or analysis.category
            _increment("gemini_calls_total")
            try:
                gemini_full = get_gemini_full_resume_analysis(
                    resume_text=resume_text,
                    job_description=job_description,
                    stream_or_category=final_category,
                )
            except Exception:
                _increment("gemini_errors_total")
                gemini_full = {"gemini_ok": False}

            if gemini_full.get("gemini_ok"):
                gemini_ats = gemini_full.get("ats_score", analysis.ats_score)
                ats_score = round((analysis.ats_score + gemini_ats) / 2, 2)
                merged_suggestions = merge_suggestions(analysis.suggestions, gemini_full.get("suggestions", []))
                missing_keywords = gemini_full.get("missing_keywords", analysis.missing_keywords)
            else:
                ats_score = analysis.ats_score
                merged_suggestions = merge_suggestions(
                    analysis.suggestions,
                    ["Gemini analysis failed, using dataset analysis fallback suggestions."]
                )
                missing_keywords = analysis.missing_keywords

            response_analysis = {
                "category": final_category,
                "ats_score": ats_score,
                "ats_available": True,
                "skills": analysis.resume_skills,
                "missing_keywords": missing_keywords,
                "suggestions": merged_suggestions,
                "mode": "dataset_category",
            }
        else:
            analysis = service.analyze_resume(resume_text, job_description)
            _increment("gemini_calls_total")
            try:
                gemini_full = get_gemini_full_resume_analysis(
                    resume_text=resume_text,
                    job_description=job_description,
                    stream_or_category=stream_or_category,
                )
            except Exception:
                _increment("gemini_errors_total")
                gemini_full = {"gemini_ok": False}

            if gemini_full.get("gemini_ok"):
                gemini_ats = gemini_full.get("ats_score", analysis.ats_score)
                ats_score = round((analysis.ats_score + gemini_ats) / 2, 2)
                response_analysis = {
                    "category": gemini_full.get("category", stream_or_category or "General"),
                    "ats_score": ats_score,
                    "ats_available": True,
                    "skills": analysis.resume_skills,
                    "missing_keywords": gemini_full.get("missing_keywords", []),
                    "suggestions": merge_suggestions(analysis.suggestions, gemini_full.get("suggestions", [])),
                    "mode": "gemini_only_unknown_category",
                }
            else:
                ats_score = analysis.ats_score
                response_analysis = {
                    "category": stream_or_category or analysis.category,
                    "ats_score": ats_score,
                    "ats_available": True,
                    "skills": analysis.resume_skills,
                    "missing_keywords": analysis.missing_keywords,
                    "suggestions": merge_suggestions(
                        analysis.suggestions,
                        ["Gemini analysis failed, so dataset ATS scoring is used as fallback."],
                    ),
                    "mode": "dataset_fallback_unknown_category",
                }
        # Boost score if no keywords are missing and no optimization suggestions are given
        clean_suggs = [s for s in response_analysis.get("suggestions", []) if "fail" not in s.lower() and "unavail" not in s.lower()]
        clean_miss = response_analysis.get("missing_keywords", [])
        if not clean_miss and not clean_suggs:
            gemini_ats_score_raw = None
            if 'gemini_full' in locals() and isinstance(locals()['gemini_full'], dict) and locals()['gemini_full'].get("gemini_ok"):
                gemini_ats_score_raw = locals()['gemini_full'].get("ats_score")
            elif 'gemini_ats' in locals():
                gemini_ats_score_raw = locals()['gemini_ats']
                
            if gemini_ats_score_raw is not None and gemini_ats_score_raw > 0:
                ats_score = gemini_ats_score_raw
            else:
                ats_score = 95.0
            response_analysis["ats_score"] = ats_score

        jobs = service.recommend_jobs(resume_text or stream_or_category, top_k=5)
        gemini_career_map = get_gemini_career_strategy(resume_text or stream_or_category)

        _increment("ats_score_sum", ats_score)
        _increment("ats_score_count")

        # Save scan to database for authenticated users
        if request.user and request.user.is_authenticated:
            try:
                file_storage = request.FILES.get("resume")
                title = file_storage.name if (file_storage and hasattr(file_storage, 'name')) else f"Scan: {response_analysis.get('category') or 'General'}"
                
                # Copy response analysis and embed file data
                db_analysis = dict(response_analysis)
                if file_bytes:
                    db_analysis["original_file_b64"] = base64.b64encode(file_bytes).decode('utf-8')
                    db_analysis["original_file_name"] = file_storage.name
                
                Resume.objects.create(
                    user=request.user,
                    title=title,
                    resume_text=resume_text,
                    ats_score=ats_score,
                    category=response_analysis.get("category"),
                    resume_json=json.dumps(db_analysis)
                )
            except Exception as db_err:
                print("Failed to auto-save scan to database:", db_err)

        return JsonResponse({
            "success": True,
            "analysis": response_analysis,
            "job_recommendations": jobs,
            "gemini_ats_feedback": None,
            "gemini_career_map": gemini_career_map,
            "prefill_data": _build_resume_prefill(resume_text, response_analysis.get("category", stream_or_category) or "", response_analysis.get("skills", [])),
        })
    except Exception as exc:
        return JsonResponse({"success": False, "error": str(exc)}, status=400)


# Recommend Jobs standalone
@api_view(['POST'])
@permission_classes([AllowAny])
def recommend_jobs(request):
    try:
        resume_text = request.data.get("resume_text", "").strip()
        if not resume_text and "resume" in request.FILES:
            file_storage = request.FILES.get("resume")
            if file_storage and file_storage.name:
                resume_text = extract_resume_text(file_storage.name, file_storage.read())
            
        if not resume_text:
            raise ValueError("Please provide resume text or upload a resume file.")

        jobs = service.recommend_jobs(resume_text, top_k=5)
        gemini_career_map = get_gemini_career_strategy(resume_text)
        
        return JsonResponse({"success": True, "jobs": jobs, "gemini_career_map": gemini_career_map})
    except Exception as exc:
        return JsonResponse({"success": False, "error": str(exc)}, status=400)


# Rank Candidates
@api_view(['POST'])
@permission_classes([AllowAny])
def rank_candidates(request):
    try:
        job_description = request.data.get("job_description", "").strip()
        if not job_description:
            raise ValueError("job_description is required")
            
        # Extract multiple files
        uploaded_files = request.FILES.getlist("resumes")
        if not uploaded_files:
            raise ValueError("Upload at least one resume in 'resumes'")

        parsed = []
        for file_storage in uploaded_files:
            if not file_storage or not file_storage.name:
                continue
            text = extract_resume_text(file_storage.name, file_storage.read())
            parsed.append((file_storage.name, text))

        if not parsed:
            raise ValueError("No valid resume files were uploaded")

        ranked = service.rank_candidates(parsed, job_description)
        return JsonResponse({"success": True, "ranked_candidates": ranked})
    except Exception as exc:
        return JsonResponse({"success": False, "error": str(exc)}, status=400)


# Chatbot questions
@api_view(['GET'])
@permission_classes([AllowAny])
def chatbot_questions(request):
    return JsonResponse({"success": True, "questions": CHATBOT_QUESTIONS})


# Chatbot Generate Resume
@api_view(['POST'])
@permission_classes([AllowAny])
def chatbot_generate_resume(request):
    try:
        payload = request.data
        answers = payload.get("answers", {})
        template_choice = payload.get("template_choice", "classical.pdf")
        
        if not isinstance(answers, dict) or not answers:
            raise ValueError("answers must be a non-empty object")
            
        data = {
            "name": answers.get("full_name", "Candidate"),
            "headline": answers.get("headline", ""),
            "email": answers.get("email", ""),
            "phone": answers.get("phone", ""),
            "location": answers.get("location", ""),
            "website": answers.get("website", ""),
            "linkedin": answers.get("linkedin", ""),
            "summary": answers.get("summary", ""),
            "skills": answers.get("skills", ""),
            "side_skills": answers.get("side_skills", ""),
            "languages": answers.get("languages", ""),
            "experience": answers.get("experience", ""),
            "education": answers.get("education", "")
        }
            
        resume_text = build_resume_from_answers(answers)
        jobs = service.recommend_jobs(resume_text, top_k=3)
        
        _increment("gemini_calls_total")
        try:
            suggestions = get_gemini_resume_suggestions(data)
        except Exception:
            _increment("gemini_errors_total")
            suggestions = "Suggestions currently unavailable."
        
        pdf_bytes = generate_pdf(data, template_choice)
        docx_bytes = generate_docx(data, template_choice)
        
        pdf_b64 = base64.b64encode(pdf_bytes).decode('utf-8')
        docx_b64 = base64.b64encode(docx_bytes).decode('utf-8')
        
        return JsonResponse({
            "success": True, 
            "resume_text": resume_text, 
            "job_recommendations": jobs,
            "gemini_suggestions": suggestions,
            "selected_template": template_choice,
            "pdf_b64": pdf_b64,
            "docx_b64": docx_b64
        })
    except Exception as exc:
        return JsonResponse({"success": False, "error": str(exc)}, status=400)


# Download DOCX from resume builder JSON
@api_view(['POST'])
@permission_classes([AllowAny])
def download_docx_api(request):
    try:
        data = request.data
        if not data:
            return JsonResponse({"error": "No data provided"}, status=400)

        docx_bytes = generate_docx_from_builder(data)
        docx_b64 = base64.b64encode(docx_bytes).decode('utf-8')

        return JsonResponse({"success": True, "docx_b64": docx_b64})
    except Exception as exc:
        return JsonResponse({"success": False, "error": str(exc)}, status=400)


# =============================================
# AUTH & USER API ENDPOINTS
# =============================================

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    try:
        data = request.data
        full_name = (data.get("full_name") or "").strip()
        email = (data.get("email") or "").strip().lower()
        mobile = (data.get("mobile") or "").strip()
        password = data.get("password") or ""

        if not full_name or not email or not password:
            return JsonResponse({"success": False, "error": "Name, email, and password are required."}, status=400)
        if len(password) < 6:
            return JsonResponse({"success": False, "error": "Password must be at least 6 characters."}, status=400)

        existing = User.objects.filter(email=email).first()
        if existing:
            if existing.is_verified:
                return JsonResponse({"success": False, "error": "Email already registered."}, status=409)
            
            # Delete unverified user and OTPs so they can re-register
            OTP.objects.filter(email=email).delete()
            existing.delete()

        user = User(
            full_name=full_name,
            email=email,
            mobile=mobile,
            is_verified=False,
            is_active=True # Active but unverified
        )
        user.set_password(password)
        user.username = email
        user.save()

        otp_code = generate_otp()
        otp_entry = OTP(email=email, code=otp_code, purpose="registration")
        otp_entry.save()

        email_body = _build_otp_email_html(full_name, otp_code)
        sent = _send_email_sync("Verify your AI Resume Account", email, email_body)
        
        # Log OTP to console in development as fallback
        print(f"[OTP DEV FALLBACK] Verification code for {email} is: {otp_code}")

        # Count registration metric
        _increment("auth_registrations_total")

        if not sent:
            # We return success if SMTP fails but print OTP in console for dev purposes
            response_data = {
                "success": True,
                "message": "Verify your email with the OTP sent. (Note: Email system warning, OTP printed in server console)",
                "email": email
            }
            if settings.DEBUG:
                response_data["dev_otp"] = otp_code
            return JsonResponse(response_data, status=201)

        response_data = {"success": True, "message": "Verify your email with the OTP sent.", "email": email}
        if settings.DEBUG:
            response_data["dev_otp"] = otp_code
        return JsonResponse(response_data, status=201)
    except Exception as exc:
        traceback.print_exc()
        return JsonResponse({"success": False, "error": str(exc)}, status=500)


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_otp(request):
    data = request.data
    email = (data.get("email") or "").strip().lower()
    code = (data.get("code") or "").strip()

    if not email or not code:
        return JsonResponse({"success": False, "error": "Email and code are required."}, status=400)

    otp_record = OTP.objects.filter(email=email, code=code).order_by('-created_at').first()
    
    if not otp_record:
        return JsonResponse({"success": False, "error": "Invalid OTP code."}, status=400)
    
    if otp_record.is_expired:
        return JsonResponse({"success": False, "error": "OTP has expired. Please request a new one."}, status=400)

    user = User.objects.filter(email=email).first()
    if user:
        user.is_verified = True
        user.save()
        otp_record.delete() # Cleanup
        
        # Log user in
        django_login(request, user)
        
        # Increment login metrics
        _increment("auth_logins_total")
        
        return JsonResponse({"success": True, "user": user.to_dict()})
    
    return JsonResponse({"success": False, "error": "User not found."}, status=404)


@api_view(['POST'])
@permission_classes([AllowAny])
def resend_otp(request):
    data = request.data
    email = (data.get("email") or "").strip().lower()

    if not email:
        return JsonResponse({"success": False, "error": "Email is required."}, status=400)

    user = User.objects.filter(email=email).first()
    if not user:
        return JsonResponse({"success": False, "error": "Email not found."}, status=404)

    otp_code = generate_otp()
    otp_entry = OTP(email=email, code=otp_code, purpose="registration")
    otp_entry.save()

    email_body = _build_otp_email_html(user.full_name, otp_code)
    sent = _send_email_sync("New Verification Code", email, email_body)
    
    print(f"[OTP DEV FALLBACK RESEND] Code for {email} is: {otp_code}")
    
    response_data = {"success": True, "message": "New OTP sent."}
    if settings.DEBUG:
        response_data["dev_otp"] = otp_code
    return JsonResponse(response_data)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    data = request.data
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    user = User.objects.filter(email=email).first()
    if not user or not user.check_password(password):
        return JsonResponse({"success": False, "error": "Invalid email or password."}, status=401)

    if not user.is_verified:
        return JsonResponse({
            "success": False, 
            "error": "Email not verified. Please verify your account first.",
            "unverified": True,
            "email": user.email
        }, status=403)

    django_login(request, user)
    _increment("auth_logins_total")
    return JsonResponse({"success": True, "user": user.to_dict()})


@api_view(['POST'])
def logout(request):
    django_logout(request)
    request.session.pop("analysis_result", None)
    return JsonResponse({"success": True})


@api_view(['POST'])
@permission_classes([AllowAny])
def google_auth(request):
    data = request.data
    id_token_str = data.get("id_token", "")
    if not id_token_str:
        return JsonResponse({"success": False, "error": "No id_token provided."}, status=400)

    try:
        from google.oauth2 import id_token as gid_token
        from google.auth.transport import requests as google_requests
        GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", "")
        info = gid_token.verify_oauth2_token(
            id_token_str,
            google_requests.Request(),
            GOOGLE_CLIENT_ID,
        )
        email = info.get("email", "").lower().strip()
        full_name = info.get("name", "").strip()
        if not email:
            return JsonResponse({"success": False, "error": "Google account has no email."}, status=400)

        user = User.objects.filter(email=email).first()
        if not user:
            user = User(full_name=full_name, email=email, is_verified=True, is_active=True)
            user.username = email
            user.set_password(os.urandom(24).hex())
            user.save()

        django_login(request, user)
        _increment("auth_logins_total")
        return JsonResponse({"success": True, "user": user.to_dict()})
    except ValueError as e:
        return JsonResponse({"success": False, "error": f"Invalid Google token: {e}"}, status=401)
    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=500)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_google_client_id(request):
    return JsonResponse({
        "success": True,
        "google_client_id": os.environ.get("GOOGLE_CLIENT_ID", "")
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def get_current_user(request):
    if request.user.is_authenticated:
        return JsonResponse({"success": True, "user": request.user.to_dict()})
    return JsonResponse({"success": False, "error": "Not authenticated"}, status=401)


@api_view(['PUT'])
def update_profile(request):
    user = request.user
    data = request.data
    if "full_name" in data:
        user.full_name = data["full_name"].strip()
    if "mobile" in data:
        user.mobile = data["mobile"].strip()
    user.save()
    return JsonResponse({"success": True, "user": user.to_dict()})


# Session-based analysis storage
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def session_analysis(request):
    if request.method == 'POST':
        data = request.data
        request.session["analysis_result"] = json.dumps(data)
        return JsonResponse({"success": True})
    
    elif request.method == 'GET':
        raw = request.session.get("analysis_result")
        if not raw:
            return JsonResponse({"success": False, "error": "No analysis result in session."}, status=404)
        return JsonResponse({"success": True, "data": json.loads(raw)})


# Dashboard Stats
@api_view(['GET'])
def get_dashboard(request):
    resumes = Resume.objects.filter(user=request.user).order_by('-updated_at')
    
    total_resumes = resumes.count()
    scores = [r.ats_score for r in resumes if r.ats_score is not None]
    avg_score = round(sum(scores) / len(scores), 1) if scores else 0
    best_score = round(max(scores), 1) if scores else 0
    categories = list(set(r.category for r in resumes if r.category))
    
    recent = []
    for r in resumes[:5]:
        recent.append({
            "id": r.id,
            "title": r.title,
            "ats_score": r.ats_score,
            "category": r.category,
            "date": r.updated_at.strftime("%b %d, %Y") if r.updated_at else "",
        })

    return JsonResponse({
        "success": True,
        "user": request.user.to_dict(),
        "stats": {
            "total_resumes": total_resumes,
            "avg_score": avg_score,
            "best_score": best_score,
            "categories": categories,
            "total_analyses": len(scores),
        },
        "recent_activity": recent,
    })


# Resumes CRUD
@api_view(['GET', 'POST'])
def list_or_create_resumes(request):
    if request.method == 'GET':
        resumes = Resume.objects.filter(user=request.user).order_by('-updated_at')
        return JsonResponse({"success": True, "resumes": [r.to_dict() for r in resumes]})
        
    elif request.method == 'POST':
        data = request.data
        resume_id = data.get("id")
        title = data.get("title", "Untitled Resume")
        resume_json = json.dumps(data.get("resume_data", {})) if data.get("resume_data") else None
        resume_text = data.get("resume_text")
        ats_score = data.get("ats_score")
        category = data.get("category")

        if resume_id:
            resume = Resume.objects.filter(id=resume_id, user=request.user).first()
            if not resume:
                return JsonResponse({"success": False, "error": "Resume not found."}, status=404)
            resume.title = title
            if resume_json:
                resume.resume_json = resume_json
            if resume_text:
                resume.resume_text = resume_text
            if ats_score is not None:
                resume.ats_score = ats_score
            if category:
                resume.category = category
            resume.save()
        else:
            resume = Resume(
                user=request.user,
                title=title,
                resume_json=resume_json,
                resume_text=resume_text,
                ats_score=ats_score,
                category=category,
            )
            resume.save()

        return JsonResponse({"success": True, "resume": resume.to_dict()})


@api_view(['GET', 'DELETE'])
def get_or_delete_resume(request, resume_id):
    resume = Resume.objects.filter(id=resume_id, user=request.user).first()
    if not resume:
        return JsonResponse({"success": False, "error": "Resume not found."}, status=404)
        
    if request.method == 'GET':
        return JsonResponse({"success": True, "resume": resume.to_dict()})
        
    elif request.method == 'DELETE':
        resume.delete()
        return JsonResponse({"success": True})


# Standalone builder API
@api_view(['POST'])
def build_resume_standalone(request):
    try:
        data = request.data
        
        # Generate the professional DOCX file
        filename = f"Resume_{int(datetime.now(timezone.utc).timestamp())}.docx"
        filepath = os.path.join(DOWNLOAD_FOLDER, filename)
        
        generate_docx_from_builder(data, filepath)
        
        return JsonResponse({
            "success": True, 
            "message": "Resume built successfully!",
            "filename": filename,
            "download_url": f"/api/download/{filename}"
        })
    except Exception as e:
        print(f"Error building resume: {e}")
        return JsonResponse({"success": False, "error": str(e)}, status=500)


# Download files (e.g. DOCX downloads)
@api_view(['GET'])
@permission_classes([AllowAny])
def download_file(request, filename):
    filepath = os.path.join(DOWNLOAD_FOLDER, filename)
    if not os.path.isfile(filepath):
        return HttpResponse("File not found", status=404)
        
    with open(filepath, 'rb') as f:
        file_data = f.read()
        
    response = HttpResponse(file_data, content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    return response

# ── JSearch API (RapidAPI) with Arbeitnow fallback ──
@api_view(['POST'])
@permission_classes([AllowAny])
def search_jobs_jsearch(request):
    """Search jobs via JSearch (RapidAPI) with filters and optional resume skill extraction.
    Falls back to Arbeitnow API if JSearch is unavailable."""
    try:
        query = request.data.get("query", "").strip()
        location = request.data.get("location", "").strip()
        employment_type = request.data.get("employment_type", "").strip()
        date_posted = request.data.get("date_posted", "all").strip()
        requested_source = request.data.get("source", "all").strip().lower()
        if requested_source not in {"all", "jsearch", "linkedin", "indeed"}:
            requested_source = "all"
        remote_only_str = request.data.get("remote_only", "false")
        remote_only = remote_only_str in (True, "true", "True", "1")
        page = int(request.data.get("page", 1))
        num_pages = int(request.data.get("num_pages", 1))

        # If resume file is uploaded, extract skills and use as query
        extracted_skills = []
        if "resume" in request.FILES:
            file_storage = request.FILES.get("resume")
            if file_storage and file_storage.name:
                resume_text = extract_resume_text(file_storage.name, file_storage.read())
                extracted_skills = extract_skills(resume_text)
                if not query and extracted_skills:
                    query = ", ".join(extracted_skills[:8])

        if not query:
            return JsonResponse({
                "success": False,
                "error": "Please provide a search query or upload a resume."
            }, status=400)

        rapidapi_key = (
            os.environ.get("RAPIDAPI_KEY", "")
            or os.environ.get("RAPIDAPI_JSEARCH_KEY", "")
            or getattr(settings, "RAPIDAPI_KEY", "")
            or getattr(settings, "RAPIDAPI_JSEARCH_KEY", "")
        ).strip()
        serpapi_key = (
            os.environ.get("SERPAPI_KEY", "")
            or getattr(settings, "SERPAPI_KEY", "")
        ).strip()
        
        provider_success = False
        jobs = []
        active_source = "arbeitnow"

        def normalize_jsearch_job(j, publisher_override=None):
            publisher = publisher_override or j.get("job_publisher", "") or "JSearch"
            apply_link = j.get("job_apply_link", "") or j.get("job_google_link", "")
            return {
                "job_id": j.get("job_id", ""),
                "title": j.get("job_title", ""),
                "company": j.get("employer_name", ""),
                "company_logo": j.get("employer_logo", ""),
                "location": f"{j.get('job_city', '')} {j.get('job_state', '')} {j.get('job_country', '')}".strip(),
                "employment_type": j.get("job_employment_type", ""),
                "date_posted": j.get("job_posted_at_datetime_utc", ""),
                "apply_link": apply_link,
                "description": (j.get("job_description", "") or "")[:500],
                "is_remote": j.get("job_is_remote", False),
                "min_salary": j.get("job_min_salary"),
                "max_salary": j.get("job_max_salary"),
                "salary_currency": j.get("job_salary_currency", ""),
                "salary_period": j.get("job_salary_period", ""),
                "required_skills": j.get("job_required_skills") or [],
                "highlights": {
                    "qualifications": (j.get("job_highlights", {}) or {}).get("Qualifications", []),
                    "responsibilities": (j.get("job_highlights", {}) or {}).get("Responsibilities", []),
                },
                "publisher": publisher,
            }

        def normalize_linkedin_job(j):
            apply_link = (
                j.get("url")
                or j.get("job_url")
                or j.get("linkedin_url")
                or j.get("job_link")
                or j.get("apply_link")
                or ""
            )
            company = j.get("company") or j.get("company_name") or j.get("organization") or ""
            return {
                "job_id": str(j.get("id") or j.get("job_id") or j.get("urn") or apply_link or ""),
                "title": j.get("title") or j.get("job_title") or "",
                "company": company,
                "company_logo": j.get("company_logo") or j.get("company_logo_url") or "",
                "location": j.get("location") or j.get("job_location") or "",
                "employment_type": j.get("employment_type") or j.get("job_type") or "",
                "date_posted": j.get("posted_at") or j.get("date_posted") or j.get("created_at") or "",
                "apply_link": apply_link,
                "description": (j.get("description") or j.get("job_description") or "")[:500],
                "is_remote": bool(j.get("remote") or j.get("is_remote")),
                "min_salary": j.get("min_salary"),
                "max_salary": j.get("max_salary"),
                "salary_currency": j.get("salary_currency", ""),
                "salary_period": j.get("salary_period", ""),
                "required_skills": j.get("skills") or [],
                "highlights": {"qualifications": [], "responsibilities": []},
                "publisher": "LinkedIn",
            }

        def normalize_indeed_job(j):
            apply_link = j.get("url") or j.get("job_url") or j.get("link") or ""
            company = j.get("company_name") or j.get("company") or ""
            return {
                "job_id": str(j.get("id") or j.get("job_id") or apply_link or ""),
                "title": j.get("title") or j.get("job_title") or "",
                "company": company,
                "company_logo": j.get("company_logo") or "",
                "location": j.get("location") or j.get("formatted_location") or "",
                "employment_type": j.get("employment_type") or "",
                "date_posted": j.get("date") or j.get("date_posted") or "",
                "apply_link": apply_link,
                "description": (j.get("description") or j.get("snippet") or "")[:500],
                "is_remote": "remote" in str(j.get("location") or j.get("title") or "").lower(),
                "min_salary": j.get("min_salary"),
                "max_salary": j.get("max_salary"),
                "salary_currency": j.get("salary_currency", ""),
                "salary_period": j.get("salary_period", ""),
                "required_skills": [],
                "highlights": {"qualifications": [], "responsibilities": []},
                "publisher": "Indeed",
            }

        def collect_list(payload):
            if isinstance(payload, list):
                return payload
            if not isinstance(payload, dict):
                return []
            for key in ("data", "jobs", "results", "items"):
                value = payload.get(key)
                if isinstance(value, list):
                    return value
            return []

        if serpapi_key and not provider_success:
            try:
                search_query = query
                if location:
                    search_query = f"{search_query} in {location}"
                
                start_offset = (page - 1) * 10
                params = {
                    "engine": "google_jobs",
                    "q": search_query,
                    "gl": "in", # India region
                    "hl": "en",
                    "start": str(start_offset),
                    "api_key": serpapi_key
                }
                
                url = "https://serpapi.com/search.json?" + urllib.parse.urlencode(params)
                req = urllib.request.Request(url)
                with urllib.request.urlopen(req, timeout=15) as response:
                    data = json.loads(response.read().decode())
                
                jobs_raw = data.get("jobs_results", [])
                for j in jobs_raw:
                    jobs.append({
                        "job_id": j.get("job_id", ""),
                        "title": j.get("title", ""),
                        "company": j.get("company_name", ""),
                        "company_logo": j.get("thumbnail", ""),
                        "location": j.get("location", ""),
                        "employment_type": j.get("detected_extensions", {}).get("schedule_type", ""),
                        "date_posted": j.get("detected_extensions", {}).get("posted_at", ""),
                        "apply_link": (j.get("apply_options") or [{"link": ""}])[0].get("link", "") if j.get("apply_options") else "",
                        "description": j.get("description", "")[:500],
                        "is_remote": "remote" in j.get("location", "").lower(),
                        "min_salary": "",
                        "max_salary": "",
                        "salary_currency": "",
                        "salary_period": "",
                        "required_skills": [],
                        "highlights": {"qualifications": [], "responsibilities": []},
                        "publisher": j.get("via", "").replace("via ", ""),
                    })
                
                if jobs:
                    provider_success = True
                    active_source = "serpapi"
            except Exception as e:
                print(f"[SerpApi] API failed, trying next provider: {e}")

        if rapidapi_key and requested_source in {"all", "linkedin"}:
            try:
                linkedin_host = os.environ.get("LINKEDIN_RAPIDAPI_HOST", "linkedin-job-search-api.p.rapidapi.com").strip()
                linkedin_query = {
                    "title": query,
                    "location": location or "United States",
                    "time_frame": "24h" if date_posted == "today" else "1w" if date_posted in {"3days", "week"} else "1m",
                }
                url = f"https://{linkedin_host}/active-jb-count?" + urllib.parse.urlencode(linkedin_query)
                headers = {
                    "Content-Type": "application/json",
                    "x-rapidapi-host": linkedin_host,
                    "x-rapidapi-key": rapidapi_key,
                }
                req = urllib.request.Request(url, headers=headers)
                with urllib.request.urlopen(req, timeout=15) as response:
                    data = json.loads(response.read().decode())
                linkedin_jobs = collect_list(data)
                jobs.extend(normalize_linkedin_job(j) for j in linkedin_jobs)
                provider_success = bool(jobs)
                if provider_success:
                    active_source = "linkedin"
            except Exception as linkedin_err:
                print(f"[LinkedIn RapidAPI] API failed, trying next provider: {_rapidapi_error_message(linkedin_err)}")

        if rapidapi_key and requested_source in {"all", "jsearch", "linkedin"} and not provider_success:
            try:
                search_query = query
                if requested_source == "linkedin" and "linkedin" not in search_query.lower():
                    search_query = f"{search_query} LinkedIn"
                if location:
                    search_query = f"{search_query} in {location}"

                params = {
                    "query": search_query,
                    "page": str(page),
                    "num_pages": str(num_pages),
                    "date_posted": date_posted,
                }
                if employment_type:
                    params["employment_types"] = employment_type
                if remote_only:
                    params["remote_jobs_only"] = "true"

                url = "https://jsearch.p.rapidapi.com/search?" + urllib.parse.urlencode(params)
                headers = {
                    "Content-Type": "application/json",
                    "x-rapidapi-host": "jsearch.p.rapidapi.com",
                    "x-rapidapi-key": rapidapi_key,
                }

                req = urllib.request.Request(url, headers=headers)
                with urllib.request.urlopen(req, timeout=15) as response:
                    data = json.loads(response.read().decode())

                jobs_raw = data.get("data", [])
                for j in jobs_raw:
                    if requested_source == "linkedin":
                        source_text = f"{j.get('job_publisher', '')} {j.get('job_apply_link', '')}".lower()
                        if "linkedin" not in source_text:
                            continue
                    jobs.append(normalize_jsearch_job(j))
                provider_success = True
                active_source = "linkedin" if requested_source == "linkedin" else "jsearch"
            except Exception as jsearch_err:
                print(f"[JSearch] API failed, trying next provider: {_rapidapi_error_message(jsearch_err)}")

        if rapidapi_key and requested_source in {"all", "indeed"} and not provider_success:
            try:
                indeed_host = os.environ.get("INDEED_RAPIDAPI_HOST", "indeed12.p.rapidapi.com").strip()
                company_or_query = query.replace(" ", "-")
                indeed_query = {"locality": location or "us", "start": str(page)}
                url = f"https://{indeed_host}/company/{urllib.parse.quote(company_or_query)}/jobs?" + urllib.parse.urlencode(indeed_query)
                headers = {
                    "Content-Type": "application/json",
                    "x-rapidapi-host": indeed_host,
                    "x-rapidapi-key": rapidapi_key,
                }
                req = urllib.request.Request(url, headers=headers)
                with urllib.request.urlopen(req, timeout=15) as response:
                    data = json.loads(response.read().decode())
                indeed_jobs = collect_list(data)
                jobs.extend(normalize_indeed_job(j) for j in indeed_jobs)
                provider_success = bool(jobs)
                if provider_success:
                    active_source = "indeed"
            except Exception as indeed_err:
                print(f"[Indeed RapidAPI] API failed, falling back to Arbeitnow: {_rapidapi_error_message(indeed_err)}")

        if requested_source in {"jsearch", "linkedin", "indeed"} and not provider_success:
            return JsonResponse({
                "success": False,
                "error": f"{requested_source.title()} search is not available. Check RAPIDAPI_KEY and the selected RapidAPI subscription.",
                "jobs": [],
                "total_count": 0,
                "extracted_skills": extracted_skills,
                "query_used": query,
                "page": page,
                "source": requested_source,
                "requested_source": requested_source,
                "using_fallback": False,
            }, status=502)

        # Fallback: use Arbeitnow API + skill matching (existing logic from model1)
        if not provider_success:
            active_source = "arbeitnow"
            try:
                arbeitnow_url = "https://www.arbeitnow.com/api/job-board-api"
                req = urllib.request.Request(arbeitnow_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req, timeout=8) as response:
                    arbeitnow_data = json.loads(response.read().decode())
                    raw_jobs = arbeitnow_data.get("data", [])
            except Exception:
                raw_jobs = []

            query_lower = query.lower()
            resume_skills = set(s.lower() for s in extracted_skills) if extracted_skills else set(query_lower.replace(",", " ").split())

            for j in raw_jobs:
                title = j.get("title", "")
                company = j.get("company_name", j.get("company", ""))
                desc = j.get("description", "")
                tags = j.get("tags", [])
                job_text = f"{title} {desc} {' '.join(tags)}".lower()

                # Filter by query
                if not any(word in job_text for word in query_lower.split()):
                    continue

                # Filter by location
                job_location = j.get("location", "Remote")
                if location and location.lower() not in job_location.lower():
                    continue

                # Filter by remote
                is_remote = j.get("remote", False)
                if remote_only and not is_remote:
                    continue

                # Skill match score
                job_skills = set(s.lower() for s in tags)
                overlap = resume_skills.intersection(job_skills)
                score = (len(overlap) / max(len(job_skills), 1)) * 100 if job_skills else 0

                jobs.append({
                    "job_id": j.get("slug", ""),
                    "title": title,
                    "company": company,
                    "company_logo": "",
                    "location": job_location,
                    "employment_type": "FULLTIME",
                    "date_posted": j.get("created_at", ""),
                    "apply_link": j.get("url", "#"),
                    "description": (desc or "")[:500],
                    "is_remote": is_remote,
                    "min_salary": None,
                    "max_salary": None,
                    "salary_currency": "",
                    "salary_period": "",
                    "required_skills": tags[:8],
                    "highlights": {"qualifications": [], "responsibilities": []},
                    "publisher": "Arbeitnow",
                    "match_score": round(score, 1),
                })

            # Sort by match score descending
            jobs.sort(key=lambda x: x.get("match_score", 0), reverse=True)
            # Paginate manually
            per_page = 10
            start = (page - 1) * per_page
            jobs = jobs[start:start + per_page]

        return JsonResponse({
            "success": True,
            "jobs": jobs,
            "total_count": len(jobs),
            "extracted_skills": extracted_skills,
            "query_used": query,
            "page": page,
            "source": active_source,
            "requested_source": requested_source,
            "using_fallback": active_source == "arbeitnow",
        })

    except Exception as exc:
        traceback.print_exc()
        return JsonResponse({"success": False, "error": str(exc)}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def start_interview(request):
    try:
        resume_text = ""
        if "resume" in request.FILES:
            file_storage = request.FILES.get("resume")
            if file_storage and file_storage.name:
                resume_text = extract_resume_text(file_storage.name, file_storage.read())
        else:
            resume_text = request.data.get("resume_text", "").strip()

        if not resume_text:
            return JsonResponse({"success": False, "error": "Please upload a resume file or provide resume text."}, status=400)

        questions = generate_interview_questions(resume_text)
        return JsonResponse({"success": True, "questions": questions})
    except Exception as exc:
        traceback.print_exc()
        return JsonResponse({"success": False, "error": str(exc)}, status=500)


@api_view(['POST'])
@permission_classes([AllowAny])
def grade_response(request):
    try:
        question = request.data.get("question", "").strip()
        response = request.data.get("response", "").strip()

        if not question or not response:
            return JsonResponse({"success": False, "error": "Question and response are required."}, status=400)

        evaluation = grade_interview_response(question, response)
        return JsonResponse({"success": True, "evaluation": evaluation})
    except Exception as exc:
        traceback.print_exc()
        return JsonResponse({"success": False, "error": str(exc)}, status=500)


@api_view(['POST'])
@permission_classes([AllowAny])
def save_interview_score(request):
    try:
        score = request.data.get("score")
        transcript = request.data.get("transcript", [])
        feedback = request.data.get("feedback", "")
        if score is None:
            return JsonResponse({"success": False, "error": "Score is required."}, status=400)

        user = request.user
        if user and user.is_authenticated:
            user.interview_score = float(score)
            user.save()

            from api.models import MockInterview
            MockInterview.objects.create(
                user=user,
                score=float(score),
                transcript=transcript,
                feedback=feedback
            )
            return JsonResponse({"success": True, "message": "Interview score saved successfully.", "interview_score": user.interview_score})
        
        return JsonResponse({"success": True, "message": "Interview completed! (Log in to save score to dashboard)", "interview_score": float(score)})
    except Exception as exc:
        traceback.print_exc()
        return JsonResponse({"success": False, "error": str(exc)}, status=500)


@api_view(['POST'])
@permission_classes([AllowAny])
def generate_roadmap(request):
    try:
        resume_text = ""
        if "resume" in request.FILES:
            file_storage = request.FILES.get("resume")
            if file_storage and file_storage.name:
                resume_text = extract_resume_text(file_storage.name, file_storage.read())
        else:
            resume_text = request.data.get("resume_text", "").strip()

        target_role = request.data.get("target_role", "").strip()
        job_description = request.data.get("job_description", "").strip()

        if not target_role:
            return JsonResponse({"success": False, "error": "Target role is required."}, status=400)

        # Fallback to general skills if resume is not provided
        if not resume_text:
            resume_text = "General technology skillset"

        roadmap = generate_career_roadmap(resume_text, target_role, job_description)
        return JsonResponse({"success": True, "roadmap": roadmap})
    except Exception as exc:
        traceback.print_exc()
        return JsonResponse({"success": False, "error": str(exc)}, status=500)


@api_view(['POST'])
@permission_classes([AllowAny])
def notify_overdue_tasks(request):
    try:
        user = request.user
        recipient_email = "candidate@airesume.com"
        user_name = "Candidate"
        if user and user.is_authenticated:
            recipient_email = user.email
            user_name = user.first_name or user.email
        
        missed_dates = request.data.get("missed_dates", [])
        if not missed_dates:
            return JsonResponse({"success": False, "error": "No missed dates provided."}, status=400)
            
        subject = "Action Required: You have missed preparation tasks! 🔔"
        dates_str = ", ".join(map(str, missed_dates))
        body_html = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
                <h2 style="color: #2563eb; margin-top: 0;">Hi {user_name},</h2>
                <p>We noticed you have incomplete study tasks in your Preparation Task Tracker for the following dates in July 2026:</p>
                <p style="font-size: 1.1em; font-weight: bold; color: #ef4444; background: #fef2f2; padding: 10px 14px; border-radius: 8px; display: inline-block;">
                    July {dates_str}
                </p>
                <p>Keep your learning streak alive and stay on track for your target career goals! Complete your tasks today to maintain your progress.</p>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                <p style="font-size: 0.8rem; color: #64748b;">AI Resume & Career Hub &bull; Unit V Study Track</p>
            </div>
        </body>
        </html>
        """
        
        sent = _send_email_sync(subject, recipient_email, body_html)
        if sent:
            return JsonResponse({"success": True, "message": f"Overdue task email sent successfully to {recipient_email}."})
        else:
            return JsonResponse({"success": True, "message": f"[Simulation] Email generated successfully for {recipient_email} but SMTP not fully configured."})
            
    except Exception as exc:
        return JsonResponse({"success": False, "error": str(exc)}, status=500)


@api_view(['POST'])
@permission_classes([AllowAny])
def generate_mock_test_api(request):
    try:
        difficulty = request.data.get("difficulty", "medium").lower()
        if difficulty not in ["easy", "medium", "hard"]:
            difficulty = "medium"

        test_data = generate_mock_test(difficulty)
        return JsonResponse({"success": True, "test_data": test_data})
    except Exception as exc:
        traceback.print_exc()
        return JsonResponse({"success": False, "error": str(exc)}, status=500)


@api_view(['POST'])
@permission_classes([AllowAny])
def run_code_api(request):
    try:
        data = request.data
        language = data.get("language", "").strip()
        code = data.get("code", "")
        title = data.get("title", "")
        description = data.get("description", "")
        examples = data.get("examples", [])

        if not language or not code:
            return JsonResponse({"success": False, "error": "Language and Code are required parameters."}, status=400)

        from ai_integration import evaluate_mock_test_code
        result = evaluate_mock_test_code(language, code, title, description, examples)
        return JsonResponse({"success": True, "result": result})
    except Exception as exc:
        traceback.print_exc()
        return JsonResponse({"success": False, "error": str(exc)}, status=500)


@api_view(['POST'])
@permission_classes([AllowAny])
def submit_mock_test_api(request):
    try:
        data = request.data
        difficulty = data.get("difficulty", "medium")
        test_data = data.get("test_data", {})
        answers = data.get("answers", {})
        coding_answers = data.get("coding_answers", {})
        coding_languages = data.get("coding_languages", {})

        user = request.user
        if not user or not user.is_authenticated:
            return JsonResponse({"success": False, "error": "Authentication required to submit test."}, status=401)

        # 1. Technical MCQs Score (60 questions * 1.5 marks = 90 marks)
        tech_correct = 0
        tech_questions = test_data.get("technical", [])
        for q in tech_questions:
            ans = answers.get(str(q.get("id")), "")
            if ans == q.get("answer"):
                tech_correct += 1
        tech_score = tech_correct * 1.5

        # 2. Verbal MCQs Score (15 questions * 1 mark = 15 marks)
        verb_correct = 0
        verb_questions = test_data.get("verbal", [])
        for q in verb_questions:
            ans = answers.get(str(q.get("id")), "")
            if ans == q.get("answer"):
                verb_correct += 1
        verb_score = verb_correct * 1.0

        # 3. Aptitude MCQs Score (15 questions * 1 mark = 15 marks)
        apt_correct = 0
        apt_questions = test_data.get("aptitude", [])
        for q in apt_questions:
            ans = answers.get(str(q.get("id")), "")
            if ans == q.get("answer"):
                apt_correct += 1
        apt_score = apt_correct * 1.0

        # 4. Coding Questions Score
        coding_questions = test_data.get("coding", [])
        
        easy_coding_score = 0.0
        easy_feedback = "No solution submitted."
        hard_coding_score = 0.0
        hard_feedback = "No solution submitted."

        from ai_integration import grade_coding_question

        if len(coding_questions) > 0:
            q_easy = coding_questions[0]
            code_easy = coding_answers.get(str(q_easy.get("id")), "")
            lang_easy = coding_languages.get(str(q_easy.get("id")), "python")
            easy_coding_score, easy_feedback = grade_coding_question(
                lang_easy, code_easy, q_easy.get("title", ""),
                q_easy.get("description", ""), q_easy.get("constraints", []),
                q_easy.get("examples", []), 30.0
            )

        if len(coding_questions) > 1:
            q_hard = coding_questions[1]
            code_hard = coding_answers.get(str(q_hard.get("id")), "")
            lang_hard = coding_languages.get(str(q_hard.get("id")), "python")
            hard_coding_score, hard_feedback = grade_coding_question(
                lang_hard, code_hard, q_hard.get("title", ""),
                q_hard.get("description", ""), q_hard.get("constraints", []),
                q_hard.get("examples", []), 50.0
            )

        total_score = tech_score + verb_score + apt_score + easy_coding_score + hard_coding_score
        max_score = 200.0

        details = {
            "test_data": test_data,
            "answers": answers,
            "coding_answers": coding_answers,
            "coding_languages": coding_languages,
            "grading": {
                "technical": {
                    "correct": tech_correct,
                    "total": len(tech_questions),
                    "score": tech_score,
                    "max": 90.0
                },
                "verbal": {
                    "correct": verb_correct,
                    "total": len(verb_questions),
                    "score": verb_score,
                    "max": 15.0
                },
                "aptitude": {
                    "correct": apt_correct,
                    "total": len(apt_questions),
                    "score": apt_score,
                    "max": 15.0
                },
                "coding_easy": {
                    "score": easy_coding_score,
                    "max": 30.0,
                    "feedback": easy_feedback
                },
                "coding_hard": {
                    "score": hard_coding_score,
                    "max": 50.0,
                    "feedback": hard_feedback
                }
            }
        }

        from api.models import MockTestAttempt
        attempt = MockTestAttempt.objects.create(
            user=user,
            difficulty=difficulty,
            score=total_score,
            max_score=max_score,
            technical_score=tech_score,
            verbal_score=verb_score,
            aptitude_score=apt_score,
            coding_easy_score=easy_coding_score,
            coding_hard_score=hard_coding_score,
            details=details
        )

        return JsonResponse({
            "success": True,
            "attempt_id": attempt.id,
            "score": total_score,
            "max_score": max_score,
            "technical_score": tech_score,
            "verbal_score": verb_score,
            "aptitude_score": apt_score,
            "coding_easy_score": easy_coding_score,
            "coding_hard_score": hard_coding_score,
            "details": details
        })
    except Exception as exc:
        traceback.print_exc()
        return JsonResponse({"success": False, "error": str(exc)}, status=500)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_results_api(request):
    try:
        user = request.user
        if not user or not user.is_authenticated:
            return JsonResponse({"success": False, "error": "Authentication required."}, status=401)

        from api.models import MockInterview, MockTestAttempt

        interviews_db = MockInterview.objects.filter(user=user).order_by("-created_at")
        interviews = []
        for x in interviews_db:
            interviews.append({
                "id": x.id,
                "score": x.score,
                "feedback": x.feedback,
                "transcript": x.transcript,
                "created_at": x.created_at.isoformat()
            })

        tests_db = MockTestAttempt.objects.filter(user=user).order_by("-created_at")
        tests = []
        for x in tests_db:
            tests.append({
                "id": x.id,
                "difficulty": x.difficulty,
                "score": x.score,
                "max_score": x.max_score,
                "technical_score": x.technical_score,
                "verbal_score": x.verbal_score,
                "aptitude_score": x.aptitude_score,
                "coding_easy_score": x.coding_easy_score,
                "coding_hard_score": x.coding_hard_score,
                "details": x.details,
                "created_at": x.created_at.isoformat()
            })

        return JsonResponse({"success": True, "interviews": interviews, "tests": tests})
    except Exception as exc:
        traceback.print_exc()
        return JsonResponse({"success": False, "error": str(exc)}, status=500)


@api_view(['GET'])
@permission_classes([AllowAny])
def download_pdf_report_api(request):
    try:
        user = request.user
        if not user or not user.is_authenticated:
            return HttpResponse("Unauthorized", status=401)

        attempt_id = request.GET.get("id")
        report_type = request.GET.get("type")

        if not attempt_id or not report_type:
            return HttpResponse("Missing parameters", status=400)

        from fpdf import FPDF
        pdf = FPDF()
        pdf.set_auto_page_break(auto=True, margin=15)
        pdf.add_page()

        if report_type == "interview":
            from api.models import MockInterview
            try:
                attempt = MockInterview.objects.get(id=attempt_id, user=user)
            except MockInterview.DoesNotExist:
                return HttpResponse("Interview report not found", status=404)

            pdf.set_fill_color(30, 41, 59)
            pdf.rect(0, 0, 210, 40, 'F')
            pdf.set_text_color(255, 255, 255)
            pdf.set_font("Helvetica", "B", 20)
            pdf.cell(0, 10, "AI Mock Interview Performance Report", ln=True, align='C')
            pdf.set_font("Helvetica", "", 12)
            pdf.cell(0, 10, f"Candidate: {user.full_name} ({user.email})", ln=True, align='C')
            pdf.ln(15)

            pdf.set_text_color(30, 41, 59)
            pdf.set_font("Helvetica", "B", 14)
            pdf.cell(0, 8, "Overall Score Card", ln=True)
            pdf.line(10, pdf.get_y(), 200, pdf.get_y())
            pdf.ln(4)

            pdf.set_font("Helvetica", "B", 36)
            pdf.set_text_color(79, 70, 229)
            pdf.cell(0, 15, f"{int(attempt.score)} / 100", ln=True, align='C')
            pdf.ln(5)

            pdf.set_text_color(30, 41, 59)
            pdf.set_font("Helvetica", "B", 14)
            pdf.cell(0, 8, "Overall Summary Feedback", ln=True)
            pdf.line(10, pdf.get_y(), 200, pdf.get_y())
            pdf.ln(4)
            
            pdf.set_font("Helvetica", "", 10)
            feedback_text = attempt.feedback or "No overall feedback compiled."
            feedback_text = feedback_text.encode('latin-1', 'replace').decode('latin-1')
            pdf.multi_cell(0, 5, feedback_text)
            pdf.ln(10)

            pdf.set_font("Helvetica", "B", 14)
            pdf.cell(0, 8, "Question Breakdown & Transcript", ln=True)
            pdf.line(10, pdf.get_y(), 200, pdf.get_y())
            pdf.ln(4)

            for idx, item in enumerate(attempt.transcript):
                pdf.set_font("Helvetica", "B", 11)
                pdf.set_text_color(79, 70, 229)
                pdf.cell(0, 6, f"Question {idx+1}: {item.get('question', '')}".encode('latin-1', 'replace').decode('latin-1'), ln=True)
                pdf.set_text_color(30, 41, 59)
                pdf.set_font("Helvetica", "B", 10)
                pdf.cell(30, 6, "Your Answer: ")
                pdf.set_font("Helvetica", "", 10)
                pdf.multi_cell(0, 5, item.get('userAnswer', '').encode('latin-1', 'replace').decode('latin-1'))
                
                score_val = item.get('score', 0)
                pdf.set_font("Helvetica", "B", 10)
                pdf.cell(30, 6, "Question Score: ")
                pdf.set_font("Helvetica", "", 10)
                pdf.cell(0, 6, f"{score_val} / 100", ln=True)

                eval_details = item.get('feedback', {})
                strengths = eval_details.get("strengths", [])
                improvements = eval_details.get("improvements", [])
                
                if strengths:
                    pdf.set_font("Helvetica", "B", 10)
                    pdf.cell(30, 6, "Strengths: ")
                    pdf.set_font("Helvetica", "", 10)
                    pdf.multi_cell(0, 5, ", ".join(strengths).encode('latin-1', 'replace').decode('latin-1'))
                if improvements:
                    pdf.set_font("Helvetica", "B", 10)
                    pdf.cell(30, 6, "Improvements: ")
                    pdf.set_font("Helvetica", "", 10)
                    pdf.multi_cell(0, 5, ", ".join(improvements).encode('latin-1', 'replace').decode('latin-1'))
                
                pdf.ln(6)

        elif report_type == "test":
            from api.models import MockTestAttempt
            try:
                attempt = MockTestAttempt.objects.get(id=attempt_id, user=user)
            except MockTestAttempt.DoesNotExist:
                return HttpResponse("Test report not found", status=404)

            pdf.set_fill_color(15, 23, 42)
            pdf.rect(0, 0, 210, 40, 'F')

            import os
            from django.conf import settings
            logo_path = os.path.join(settings.BASE_DIR, "..", "client", "public", "logo.png")
            if os.path.exists(logo_path):
                pdf.image(logo_path, x=10, y=8, w=25)

            pdf.set_text_color(255, 255, 255)
            pdf.set_font("Helvetica", "B", 20)
            pdf.cell(0, 10, "Full-Length Mock Assessment Report", ln=True, align='C')
            pdf.set_font("Helvetica", "", 12)
            pdf.cell(0, 10, f"Candidate: {user.full_name} ({user.email}) | Level: {attempt.difficulty.upper()}", ln=True, align='C')
            pdf.ln(15)

            pdf.set_text_color(30, 41, 59)
            pdf.set_font("Helvetica", "B", 14)
            pdf.cell(0, 8, "Detailed Marks Distribution", ln=True)
            pdf.line(10, pdf.get_y(), 200, pdf.get_y())
            pdf.ln(4)

            pdf.set_font("Helvetica", "B", 24)
            pdf.set_text_color(16, 185, 129)
            pdf.cell(0, 10, f"Total Marks: {attempt.score} / {attempt.max_score}", ln=True, align='C')
            pdf.ln(5)

            pdf.set_font("Helvetica", "B", 11)
            pdf.set_text_color(30, 41, 59)
            pdf.cell(100, 6, "Section", border=1)
            pdf.cell(90, 6, "Marks Obtained", border=1, ln=True)
            pdf.set_font("Helvetica", "", 10)

            pdf.cell(100, 6, "1. Technical Core MCQs (90 Marks max)", border=1)
            pdf.cell(90, 6, f"{attempt.technical_score} / 90.0", border=1, ln=True)

            pdf.cell(100, 6, "2. Verbal Reasoning MCQs (15 Marks max)", border=1)
            pdf.cell(90, 6, f"{attempt.verbal_score} / 15.0", border=1, ln=True)

            pdf.cell(100, 6, "3. Aptitude & Quantitative MCQs (15 Marks max)", border=1)
            pdf.cell(90, 6, f"{attempt.aptitude_score} / 15.0", border=1, ln=True)

            pdf.cell(100, 6, "4. Easy Coding Challenge (30 Marks max)", border=1)
            pdf.cell(90, 6, f"{attempt.coding_easy_score} / 30.0", border=1, ln=True)

            pdf.cell(100, 6, "5. Hard Coding Challenge (50 Marks max)", border=1)
            pdf.cell(90, 6, f"{attempt.coding_hard_score} / 50.0", border=1, ln=True)
            pdf.ln(10)

            grading = attempt.details.get("grading", {})
            test_data = attempt.details.get("test_data", {})
            coding_questions = test_data.get("coding", [])
            coding_answers = attempt.details.get("coding_answers", {})
            coding_languages = attempt.details.get("coding_languages", {})

            if len(coding_questions) > 0:
                pdf.set_font("Helvetica", "B", 14)
                pdf.cell(0, 8, "Coding (Easy) Challenge", ln=True)
                pdf.line(10, pdf.get_y(), 200, pdf.get_y())
                pdf.ln(4)

                q_easy = coding_questions[0]
                lang_easy = coding_languages.get(str(q_easy.get("id")), "python")
                code_easy = coding_answers.get(str(q_easy.get("id")), "")
                grade_info = grading.get("coding_easy", {})

                pdf.set_font("Helvetica", "B", 11)
                pdf.cell(0, 6, f"Problem: {q_easy.get('title', '')}", ln=True)
                pdf.set_font("Helvetica", "", 10)
                pdf.multi_cell(0, 5, q_easy.get('description', '').encode('latin-1', 'replace').decode('latin-1'))
                pdf.ln(2)

                pdf.set_font("Helvetica", "B", 10)
                pdf.cell(0, 6, f"Your Code Solution ({lang_easy.upper()}):", ln=True)
                pdf.set_font("Helvetica", "", 9)
                code_easy_cleaned = code_easy.encode('latin-1', 'replace').decode('latin-1')
                pdf.multi_cell(0, 4, code_easy_cleaned, border=1)
                pdf.ln(2)

                pdf.set_font("Helvetica", "B", 10)
                pdf.cell(0, 6, f"Marks given: {grade_info.get('score', 0.0)} / 30.0", ln=True)
                pdf.set_font("Helvetica", "B", 10)
                pdf.cell(30, 6, "AI Evaluation: ")
                pdf.set_font("Helvetica", "", 10)
                feedback_cleaned = grade_info.get('feedback', '').encode('latin-1', 'replace').decode('latin-1')
                pdf.multi_cell(0, 5, feedback_cleaned)
                pdf.ln(8)

            if len(coding_questions) > 1:
                pdf.set_font("Helvetica", "B", 14)
                pdf.cell(0, 8, "Coding (Hard) Challenge", ln=True)
                pdf.line(10, pdf.get_y(), 200, pdf.get_y())
                pdf.ln(4)

                q_hard = coding_questions[1]
                lang_hard = coding_languages.get(str(q_hard.get("id")), "python")
                code_hard = coding_answers.get(str(q_hard.get("id")), "")
                grade_info_hard = grading.get("coding_hard", {})

                pdf.set_font("Helvetica", "B", 11)
                pdf.cell(0, 6, f"Problem: {q_hard.get('title', '')}", ln=True)
                pdf.set_font("Helvetica", "", 10)
                pdf.multi_cell(0, 5, q_hard.get('description', '').encode('latin-1', 'replace').decode('latin-1'))
                pdf.ln(2)

                pdf.set_font("Helvetica", "B", 10)
                pdf.cell(0, 6, f"Your Code Solution ({lang_hard.upper()}):", ln=True)
                pdf.set_font("Helvetica", "", 9)
                code_hard_cleaned = code_hard.encode('latin-1', 'replace').decode('latin-1')
                pdf.multi_cell(0, 4, code_hard_cleaned, border=1)
                pdf.ln(2)

                pdf.set_font("Helvetica", "B", 10)
                pdf.cell(0, 6, f"Marks given: {grade_info_hard.get('score', 0.0)} / 50.0", ln=True)
                pdf.set_font("Helvetica", "B", 10)
                pdf.cell(30, 6, "AI Evaluation: ")
                pdf.set_font("Helvetica", "", 10)
                feedback_hard_cleaned = grade_info_hard.get('feedback', '').encode('latin-1', 'replace').decode('latin-1')
                pdf.multi_cell(0, 5, feedback_hard_cleaned)
                pdf.ln(8)

        pdf_bytes = pdf.output(dest='S')
        response = HttpResponse(bytes(pdf_bytes), content_type='application/pdf')
        filename_prefix = "Mock_Test" if report_type == "test" else "Mock_Interview"
        response['Content-Disposition'] = f'attachment; filename="{filename_prefix}_Report_{attempt_id}.pdf"'
        return response

    except Exception as e:
        import traceback
        traceback.print_exc()
        return HttpResponse("Error generating report", status=500)

@api_view(['GET'])
def download_complete_report_api(request):
    try:
        user = request.user
        if not user or not user.is_authenticated:
            user_id = request.GET.get('id')
            if user_id:
                from api.models import User
                user = User.objects.filter(email=user_id).first()

        if not user:
            return HttpResponse("Unauthorized", status=401)

        from fpdf import FPDF
        from api.models import MockTestAttempt, Resume, MockInterview, CareerMap
        import os
        from django.conf import settings
        from datetime import datetime

        class ReportPDF(FPDF):
            def footer(self):
                self.set_y(-12)
                self.set_font("Helvetica", "I", 8)
                self.set_text_color(148, 163, 184)
                self.cell(0, 10, f"CareerPilot Comprehensive Report  |  Page {self.page_no()}", align='C')

        pdf = ReportPDF()
        pdf.set_auto_page_break(auto=True, margin=15)
        pdf.add_page()

        # 1. HEADER & BRANDING BARS
        pdf.set_fill_color(28, 36, 39)
        pdf.rect(0, 0, 210, 42, 'F')
        
        logo_path = os.path.join(settings.BASE_DIR, "..", "client", "public", "logo.png")
        if os.path.exists(logo_path):
            pdf.image(logo_path, x=12, y=6, w=22)

        pdf.set_text_color(245, 195, 92)
        pdf.set_font("Helvetica", "B", 20)
        pdf.set_xy(40, 8)
        pdf.cell(0, 8, "CAREER PILOT", ln=True)

        pdf.set_text_color(255, 255, 255)
        pdf.set_font("Helvetica", "B", 12)
        pdf.set_xy(40, 18)
        pdf.cell(0, 6, "Comprehensive Profile & Career Evaluation Report", ln=True)
        pdf.set_font("Helvetica", "I", 9)
        pdf.set_text_color(203, 213, 225)
        pdf.set_xy(40, 25)
        pdf.cell(0, 5, f"Generated: {datetime.now().strftime('%B %d, %Y')}", ln=True)

        pdf.set_y(48)

        # Helper to draw Section Header
        def draw_section_header(title):
            pdf.set_fill_color(248, 250, 252)
            pdf.rect(10, pdf.get_y(), 190, 8, 'F')
            pdf.set_font("Helvetica", "B", 11)
            pdf.set_text_color(28, 36, 39)
            pdf.cell(0, 8, f"  {title}", ln=True)
            pdf.set_draw_color(226, 232, 240)
            pdf.line(10, pdf.get_y(), 200, pdf.get_y())
            pdf.ln(3)

        # Helper to draw Progress Bar Graph
        def draw_progress_bar(x, y, w, h, pct, color_rgb=(16, 185, 129)):
            pdf.set_fill_color(226, 232, 240)
            pdf.rect(x, y, w, h, 'F')
            fill_w = max(0, min(w, (float(pct) / 100.0) * w))
            if fill_w > 0:
                pdf.set_fill_color(*color_rgb)
                pdf.rect(x, y, fill_w, h, 'F')

        # 1. CANDIDATE DETAILS
        full_name_clean = str(getattr(user, 'full_name', '') or user.email).encode('latin-1', 'replace').decode('latin-1')
        email_clean = str(user.email).encode('latin-1', 'replace').decode('latin-1')
        mobile_clean = str(getattr(user, 'mobile', '') or 'N/A').encode('latin-1', 'replace').decode('latin-1')

        draw_section_header("1. Candidate Profile Details")

        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(71, 85, 105)
        pdf.cell(95, 6, f"Full Name: {full_name_clean}")
        pdf.cell(95, 6, f"Email: {email_clean}", ln=True)
        pdf.cell(95, 6, f"Phone / Mobile: {mobile_clean}", ln=True)
        pdf.ln(5)

        # 2. TARGET ROLE & CAREER ROADMAP
        draw_section_header("2. Target Role & Career Roadmap")

        cmap = CareerMap.objects.filter(user=user).first()
        target_role_str = cmap.target_role if (cmap and cmap.target_role) else "Software Engineer"
        target_role_clean = str(target_role_str).encode('latin-1', 'replace').decode('latin-1')

        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(71, 85, 105)
        pdf.cell(95, 6, f"Target Position / Domain: {target_role_clean}")
        pdf.cell(95, 6, "Career Roadmap Status: Active Structured Path Set", ln=True)
        pdf.ln(5)

        # 3. BEST ATS SCORE & RESUME MATCH
        draw_section_header("3. Best ATS Score & Resume Match")

        best_resume = Resume.objects.filter(user=user).order_by('-ats_score').first()
        if best_resume:
            title_clean = str(best_resume.title or 'Uploaded Resume').encode('latin-1', 'replace').decode('latin-1')
            ats_val = int(best_resume.ats_score) if best_resume.ats_score is not None else 0
            cat_clean = str(best_resume.category or 'General').encode('latin-1', 'replace').decode('latin-1')
            
            pdf.set_font("Helvetica", "", 10)
            pdf.set_text_color(71, 85, 105)
            pdf.cell(0, 6, f"Analyzed Resume: {title_clean}", ln=True)
            pdf.cell(0, 6, f"Target Category: {cat_clean}", ln=True)

            pdf.set_font("Helvetica", "B", 10)
            pdf.set_text_color(16, 185, 129)
            pdf.cell(45, 6, f"Highest ATS Score: {ats_val}%")
            
            cur_y = pdf.get_y() + 1
            draw_progress_bar(55, cur_y, 135, 4.5, ats_val, (16, 185, 129))
            pdf.ln(8)
        else:
            pdf.set_font("Helvetica", "", 10)
            pdf.set_text_color(148, 163, 184)
            pdf.cell(0, 6, "No resumes analyzed yet.", ln=True)
            pdf.ln(2)

        pdf.ln(3)

        # 4. MOCK VOICE INTERVIEW PERFORMANCE
        draw_section_header("4. Mock Voice Interview Performance")

        best_interview = MockInterview.objects.filter(user=user).order_by('-score', '-id').first()
        if best_interview and best_interview.score is not None:
            int_score = int(best_interview.score)
            pdf.set_font("Helvetica", "B", 10)
            pdf.set_text_color(245, 195, 92)
            pdf.cell(50, 6, f"Interview Score: {int_score}%")
            
            cur_y = pdf.get_y() + 1
            draw_progress_bar(60, cur_y, 130, 4.5, int_score, (245, 195, 92))
            pdf.ln(8)

            pdf.set_font("Helvetica", "I", 9)
            pdf.set_text_color(100, 116, 139)
            feedback_text = str(best_interview.feedback or "Voice mock interview attempt completed.").encode('latin-1', 'replace').decode('latin-1')
            pdf.multi_cell(0, 4.5, f"AI Feedback: {feedback_text[:250]}")
            pdf.ln(3)
        else:
            pdf.set_font("Helvetica", "", 10)
            pdf.set_text_color(148, 163, 184)
            pdf.cell(0, 6, "No mock interviews recorded yet.", ln=True)
            pdf.ln(2)

        pdf.ln(3)

        # 5. FULL-TIME MOCK ASSESSMENT RESULTS
        draw_section_header("5. Full-Time Mock Assessment Results")

        best_test = MockTestAttempt.objects.filter(user=user).order_by('-score').first()
        if best_test:
            total_pct = int((best_test.score / best_test.max_score) * 100) if best_test.max_score else 0
            pdf.set_font("Helvetica", "B", 10)
            pdf.set_text_color(16, 185, 129)
            pdf.cell(55, 6, f"Total Score: {best_test.score} / {best_test.max_score} ({total_pct}%)")
            
            cur_y = pdf.get_y() + 1
            draw_progress_bar(65, cur_y, 125, 4.5, total_pct, (16, 185, 129))
            pdf.ln(8)

            sections = [
                ("Technical Core MCQs", best_test.technical_score, 90.0, (16, 185, 129)),
                ("Verbal Reasoning", best_test.verbal_score, 15.0, (59, 130, 246)),
                ("Aptitude", best_test.aptitude_score, 15.0, (245, 195, 92)),
                ("Coding (Easy)", best_test.coding_easy_score, 30.0, (139, 92, 246)),
                ("Coding (Hard)", best_test.coding_hard_score, 50.0, (236, 72, 153))
            ]

            pdf.set_font("Helvetica", "", 9.5)
            pdf.set_text_color(71, 85, 105)
            for sec_name, score_val, max_val, color_rgb in sections:
                sec_pct = int((score_val / max_val) * 100) if max_val else 0
                pdf.cell(45, 6, f"{sec_name}")
                pdf.cell(40, 6, f"{score_val} / {max_val} ({sec_pct}%)")
                cur_y = pdf.get_y() + 1
                draw_progress_bar(95, cur_y, 95, 4, sec_pct, color_rgb)
                pdf.ln(6.5)
        else:
            pdf.set_font("Helvetica", "", 10)
            pdf.set_text_color(148, 163, 184)
            pdf.cell(0, 6, "No full-time mock tests completed yet.", ln=True)
            pdf.ln(2)

        pdf.ln(3)

        # 6. CSE SPECIAL COMPLETE EVALUATION REPORT
        draw_section_header("6. CSE Special Complete Evaluation Report")

        def clean_pct(val):
            if not val or val in ['undefined', 'NaN', 'null', 'None']:
                return '0'
            try:
                return str(int(float(val)))
            except:
                return '0'

        cs_subjects = [
            ("DSA", clean_pct(request.GET.get('dsa')), (16, 185, 129)),
            ("OOPs", clean_pct(request.GET.get('oops')), (236, 72, 153)),
            ("Operating System", clean_pct(request.GET.get('os')), (59, 130, 246)),
            ("Database Management", clean_pct(request.GET.get('dbms')), (245, 195, 92)),
            ("Computer Networks", clean_pct(request.GET.get('cn')), (139, 92, 246)),
            ("System Design", clean_pct(request.GET.get('sys')), (6, 182, 212))
        ]

        pdf.set_font("Helvetica", "", 9.5)
        pdf.set_text_color(51, 65, 85)

        for subj_name, pct_str, color_rgb in cs_subjects:
            pct_val = int(pct_str)
            pdf.cell(55, 6, f"{subj_name}")
            pdf.cell(20, 6, f"{pct_val}%")
            cur_y = pdf.get_y() + 1
            draw_progress_bar(85, cur_y, 105, 4, pct_val, color_rgb)
            pdf.ln(6.5)

        pdf_output = pdf.output(dest='S')
        if isinstance(pdf_output, str):
            pdf_bytes = pdf_output.encode('latin1')
        else:
            pdf_bytes = bytes(pdf_output)

        response = HttpResponse(pdf_bytes, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="CareerPilot_Complete_Evaluation_Report.pdf"'
        return response

    except Exception as e:
        import traceback
        traceback.print_exc()
        return HttpResponse(f"Error generating complete report: {str(e)}", status=500)


@csrf_exempt
def suggest_stream_keywords_api(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST method required'}, status=405)
    try:
        body = json.loads(request.body.decode('utf-8'))
        stream = body.get('stream', '').strip()
        if not stream:
            return JsonResponse({'error': 'Stream parameter is required'}, status=400)
        
        from ai_integration import get_gemini_keywords_for_stream
        keywords = get_gemini_keywords_for_stream(stream)
        return JsonResponse({
            'success': True,
            'stream': stream,
            'keywords': keywords
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

