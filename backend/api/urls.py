from django.urls import path
from api import views

urlpatterns = [
    # Metrics and Diagnostics
    path('health', views.health, name='health'),
    path('test-smtp', views.test_smtp, name='test_smtp'),

    # Core AI and resume screener
    path('generate-summary', views.generate_summary, name='generate_summary'),
    path('enhance-text', views.enhance_text, name='enhance_text'),
    path('analyze-resume', views.analyze_resume, name='analyze_resume'),
    path('parse-resume-to-json', views.parse_resume_to_json, name='parse_resume_to_json'),
    path('recommend-jobs', views.recommend_jobs, name='recommend_jobs'),
    path('search-jobs', views.search_jobs_jsearch, name='search_jobs_jsearch'),
    path('rank-candidates', views.rank_candidates, name='rank_candidates'),

    # Chatbot
    path('chatbot/questions', views.chatbot_questions, name='chatbot_questions'),
    path('chatbot/generate-resume', views.chatbot_generate_resume, name='chatbot_generate_resume'),

    # Interview Prep
    path('interview/start', views.start_interview, name='start_interview'),
    path('interview/grade', views.grade_response, name='grade_response'),
    path('interview/save-score', views.save_interview_score, name='save_interview_score'),
    path('interview/roadmap', views.generate_roadmap, name='generate_roadmap'),
    path('interview/notify-overdue', views.notify_overdue_tasks, name='notify_overdue_tasks'),
    path('mock-test/generate', views.generate_mock_test_api, name='generate_mock_test_api'),
    path('mock-test/run-code', views.run_code_api, name='run_code_api'),
    path('mock-test/submit', views.submit_mock_test_api, name='submit_mock_test_api'),
    path('results/list', views.get_results_api, name='get_results_api'),
    path('results/download-pdf', views.download_pdf_report_api, name='download_pdf_report_api'),

    # Downloads / Standalone
    path('download-docx', views.download_docx_api, name='download_docx_api'),
    path('build-resume', views.build_resume_standalone, name='build_resume_standalone'),
    path('download/<str:filename>', views.download_file, name='download_file'),

    # Auth
    path('auth/register', views.register, name='register'),
    path('auth/verify-otp', views.verify_otp, name='verify_otp'),
    path('auth/resend-otp', views.resend_otp, name='resend_otp'),
    path('auth/login', views.login, name='login'),
    path('auth/logout', views.logout, name='logout'),
    path('auth/google', views.google_auth, name='google_auth'),
    path('auth/google-client-id', views.get_google_client_id, name='get_google_client_id'),
    path('auth/me', views.get_current_user, name='get_current_user'),
    path('auth/update', views.update_profile, name='update_profile'),

    # Session Analysis
    path('session/analysis', views.session_analysis, name='session_analysis'),

    # Dashboard & Resumes
    path('dashboard', views.get_dashboard, name='get_dashboard'),
    path('resumes', views.list_or_create_resumes, name='list_or_create_resumes'),
    path('resumes/<int:resume_id>', views.get_or_delete_resume, name='get_or_delete_resume'),
]
