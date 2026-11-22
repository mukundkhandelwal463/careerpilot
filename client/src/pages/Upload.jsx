import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import LoadingOverlay from '../Components/LoadingOverlay.jsx';
import {
  BarChart3,
  FileText,
  CheckCircle2,
  Lock,
  Check,
  Download,
  Clock,
  Trash2,
  X,
  ArrowRight,
  FileCheck2,
  AlertCircle,
  FileUp,
  Tag,
  Plus,
  Target,
  Layers,
  CheckCheck,
  ShieldCheck,
  Briefcase,
  Award
} from 'lucide-react';
import '../css/style.css';

const DOMAIN_PRESETS = [
  {
    name: 'Software Engineering',
    keywords: ['Data Structures', 'System Design', 'Algorithms', 'CI/CD', 'Git', 'REST APIs', 'Unit Testing']
  },
  {
    name: 'Full Stack Development',
    keywords: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Next.js', 'GraphQL']
  },
  {
    name: 'Data Science & AI',
    keywords: ['Python', 'Pandas', 'Machine Learning', 'SQL', 'PyTorch', 'Data Visualization', 'Scikit-Learn']
  },
  {
    name: 'DevOps & Cloud',
    keywords: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Linux', 'Microservices', 'Monitoring']
  },
  {
    name: 'Product Management',
    keywords: ['Agile / Scrum', 'Roadmapping', 'User Stories', 'A/B Testing', 'Stakeholder Management', 'KPIs']
  }
];

const SENIORITY_LEVELS = [
  { label: 'Entry Level', range: '0-2 yrs' },
  { label: 'Mid-Level', range: '3-5 yrs' },
  { label: 'Senior', range: '5-8 yrs' },
  { label: 'Lead / Staff', range: '8+ yrs' }
];

const SAMPLE_TECH_JD = `Role: Senior Software Engineer (Full Stack / Backend)

Responsibilities:
- Design, build, and maintain high-performance, reusable, and reliable backend microservices in Python, Java, or Node.js.
- Work closely with cloud infrastructure on AWS, implementing containerized workloads using Docker and Kubernetes.
- Collaborate with frontend teams to integrate modern React interfaces with scalable RESTful and GraphQL APIs.
- Optimize database schemas and queries across PostgreSQL, MongoDB, and Redis for high throughput and low latency.
- Participate in agile sprints, conduct code reviews, and drive automated CI/CD pipeline deployments.

Required Skills & Qualifications:
- 3+ years of professional software engineering experience with strong proficiency in Data Structures and Algorithms.
- Hands-on experience with modern web frameworks (Django, FastAPI, Spring Boot, or Express).
- Strong understanding of cloud-native architecture, distributed systems, and microservices.
- Experience with Git, Docker, automated unit testing, and continuous integration.`;

const Upload = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('analyze'); // 'analyze' or 'records'
  const [file, setFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [jdMode, setJdMode] = useState('paste'); // 'paste' or 'file'
  const [streamCategory, setStreamCategory] = useState('');
  const [seniority, setSeniority] = useState('Mid-Level');
  const [jobDescription, setJobDescription] = useState('');
  
  // Custom Keywords testing state
  const [customKeywords, setCustomKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState('');
  
  const [status, setStatus] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [dragover, setDragover] = useState(false);
  const [jdDragover, setJdDragover] = useState(false);
  
  const [resumes, setResumes] = useState([]);
  const [resumesLoading, setResumesLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  
  const [activeReport, setActiveReport] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const downloadTextFile = (filename, text) => {
    const element = document.createElement("a");
    const fileBlob = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(fileBlob);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadResume = (resume, e) => {
    e.stopPropagation();
    try {
      const data = JSON.parse(resume.resume_json || "{}");
      if (data.original_file_b64) {
        const byteCharacters = atob(data.original_file_b64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        
        const element = document.createElement("a");
        element.href = URL.createObjectURL(blob);
        element.download = data.original_file_name || resume.title || "resume.pdf";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      } else {
        const text = resume.resume_text || "No resume text available.";
        const title = resume.title || "Resume";
        downloadTextFile(`${title.replace(/[\s\(\)]+/g, "_")}_resume.txt`, text);
      }
    } catch (err) {
      console.error(err);
      const text = resume.resume_text || "No resume text available.";
      const title = resume.title || "Resume";
      downloadTextFile(`${title.replace(/[\s\(\)]+/g, "_")}_resume.txt`, text);
    }
  };

  const handleShowReport = (resume, e) => {
    e.stopPropagation();
    try {
      const data = JSON.parse(resume.resume_json || "{}");
      setActiveReport({
        title: resume.title || "Scan",
        category: resume.category || "General",
        ats_score: resume.ats_score ? Math.round(resume.ats_score) : 0,
        missing_keywords: data.missing_keywords || [],
        suggestions: data.suggestions || []
      });
    } catch (err) {
      console.error(err);
      alert("Failed to display report details.");
    }
  };

  useEffect(() => {
    if (activeTab === 'records' && user) {
      const fetchResumes = async () => {
        setResumesLoading(true);
        try {
          const res = await fetch(`/api/resumes?email=${encodeURIComponent(user.email)}`);
          const data = await res.json();
          if (data.success) {
            setResumes(data.resumes || []);
          }
        } catch (err) {
          console.error("Failed to fetch resumes:", err);
        } finally {
          setResumesLoading(false);
        }
      };
      fetchResumes();
    }
  }, [activeTab, user]);

  const handleDeleteResume = async (resumeId, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this resume scan result?")) return;

    setDeleteLoadingId(resumeId);
    try {
      const res = await fetch(`/api/resumes/${resumeId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setResumes(prev => prev.filter(r => r.id !== resumeId));
      } else {
        alert(data.error || "Failed to delete resume.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting.");
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragover(true);
  };

  const handleDragLeave = () => {
    setDragover(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragover(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleJdFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setJdFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 KB';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // Keyword tags handling
  const handleAddKeyword = () => {
    const trimmed = keywordInput.trim();
    if (trimmed && !customKeywords.includes(trimmed)) {
      setCustomKeywords([...customKeywords, trimmed]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setCustomKeywords(customKeywords.filter(k => k !== keywordToRemove));
  };

  const handleKeyDownKeyword = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleSelectDomain = (domain) => {
    setStreamCategory(domain.name);
    // Add domain keywords that aren't already present
    const newKeywords = [...customKeywords];
    domain.keywords.forEach(k => {
      if (!newKeywords.includes(k) && newKeywords.length < 12) {
        newKeywords.push(k);
      }
    });
    setCustomKeywords(newKeywords);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file && !(streamCategory.trim() && (jobDescription.trim() || jdFile))) {
      setStatus({ text: "Please upload a resume file, or provide both Category and Job Description.", type: "error" });
      return;
    }

    setStatus({ text: "Analyzing resume against target criteria...", type: "info" });
    setLoading(true);

    const formData = new FormData();
    if (file) {
      formData.append("resume", file);
    }
    
    // Append seniority level and custom keywords to job description text for direct ATS keyword matching
    let fullJdPayload = jobDescription.trim();
    if (seniority) {
      fullJdPayload = `Target Seniority Level: ${seniority}\n` + fullJdPayload;
    }
    if (customKeywords.length > 0) {
      const keywordBlock = `\n\nTarget Skills & Core Keywords:\n${customKeywords.join(', ')}`;
      fullJdPayload = fullJdPayload ? `${fullJdPayload}\n${keywordBlock}` : keywordBlock;
    }

    formData.append("job_description", fullJdPayload);
    formData.append("stream_or_category", streamCategory);
    if (jdFile) {
      formData.append("job_description_file", jdFile);
    }

    try {
      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData
      });
      const responseText = await res.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonErr) {
        throw new Error(`Server returned error (${res.status}). Please verify your resume file and try again.`);
      }
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to analyze resume.");
      }

      localStorage.setItem("resume_analysis_result", JSON.stringify(data));
      
      try {
        await fetch("/api/session/analysis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
      } catch (err) {}

      const currentEmail = user?.email ? user.email.toLowerCase().trim() : null;
      if (currentEmail) {
        const notifKey = `app_notifications_${currentEmail}`;
        const unreadKey = `has_unread_notifications_${currentEmail}`;
        const newNotif = {
          id: Date.now(),
          text: `Scanning complete! Calculated ATS Score: ${data.analysis?.ats_score ?? 'N/A'}%`,
          time: new Date().toLocaleTimeString(),
          read: false
        };
        const currentNotifs = JSON.parse(localStorage.getItem(notifKey) || "[]");
        const updatedNotifs = [newNotif, ...currentNotifs].slice(0, 10);
        localStorage.setItem(notifKey, JSON.stringify(updatedNotifs));
        localStorage.setItem(unreadKey, "true");
        
        window.dispatchEvent(new CustomEvent("new_scan_notification", {
          detail: { message: newNotif.text, email: currentEmail }
        }));
      }

      setStatus({ text: "Analysis complete. Redirecting to results...", type: "success" });
      setTimeout(() => {
        setLoading(false);
        navigate('/result');
      }, 450);

    } catch (err) {
      setStatus({ text: err.message, type: "error" });
      setLoading(false);
    }
  };

  // Get suggested keywords for the current category
  const activePreset = DOMAIN_PRESETS.find(p => p.name.toLowerCase() === streamCategory.toLowerCase());
  const suggestedKeywords = activePreset ? activePreset.keywords : DOMAIN_PRESETS[0].keywords;

  return (
    <div className="page-shell">
      <LoadingOverlay
        isOpen={loading}
        variant="scan"
        title="Analyzing Resume"
        subtitle={file ? `Evaluating ${file.name} against ATS benchmark criteria` : 'Running career alignment analysis'}
        steps={[
          'Extracting document structure, fonts & text layers...',
          'Matching skills against ATS keyword density models...',
          'Scanning target job description & required skills...',
          'Compiling diagnostic ATS match report...'
        ]}
      />
      <Navbar />

      <main 
        className="page" 
        style={{ 
          width: '100%', 
          maxWidth: '1600px', 
          margin: '20px auto 48px', 
          padding: '0 20px', 
          boxSizing: 'border-box' 
        }}
      >
        {/* Header Row */}
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(1.9rem, 2.8vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
              margin: '0 0 6px',
              lineHeight: 1.2
            }}>
              ATS Resume Analyzer
            </h1>
            <p style={{
              margin: 0,
              fontSize: '0.98rem',
              color: 'var(--muted)',
              maxWidth: '820px',
              lineHeight: 1.5
            }}>
              Benchmark your resume against target job descriptions, test keyword density, and inspect ATS parsability to maximize recruiter callback rates.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '999px',
              background: '#ffffff',
              border: '1px solid rgba(24, 35, 38, 0.08)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--text)'
            }}>
              <CheckCheck size={14} color="var(--teal)" /> PDF, DOCX & TXT Supported
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '999px',
              background: '#ffffff',
              border: '1px solid rgba(24, 35, 38, 0.08)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--text)'
            }}>
              <Target size={14} color="var(--accent)" /> Keyword Match Testing
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          
          {/* Left Navigation Sidebar */}
          <aside style={{
            width: '280px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'sticky',
            top: '85px'
          }}>
            {/* Toolkit Tabs Card */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid rgba(24, 35, 38, 0.08)',
              borderRadius: '20px',
              padding: '16px 14px',
              boxShadow: 'var(--shadow)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ padding: '0 8px 10px', borderBottom: '1px solid rgba(24, 35, 38, 0.06)', marginBottom: '4px' }}>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text)' }}>ATS Toolkit</strong>
                <span style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>Optimizers & Scan History</span>
              </div>

              <button 
                onClick={() => setActiveTab('analyze')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '11px 14px',
                  border: 'none',
                  borderRadius: '12px',
                  background: activeTab === 'analyze' ? 'var(--surface-dark)' : 'transparent',
                  color: activeTab === 'analyze' ? '#ffffff' : 'var(--text)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <BarChart3 size={16} />
                <span>Analyze Resume</span>
              </button>

              <button 
                onClick={() => setActiveTab('records')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '11px 14px',
                  border: 'none',
                  borderRadius: '12px',
                  background: activeTab === 'records' ? 'var(--surface-dark)' : 'transparent',
                  color: activeTab === 'records' ? '#ffffff' : 'var(--text)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={16} />
                  <span>Previous Records</span>
                </span>
                {resumes.length > 0 && (
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    background: activeTab === 'records' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(24, 35, 38, 0.06)',
                    color: activeTab === 'records' ? '#ffffff' : 'var(--muted)'
                  }}>
                    {resumes.length}
                  </span>
                )}
              </button>
            </div>

            {/* ATS Verification Pillars Card */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid rgba(24, 35, 38, 0.08)',
              borderRadius: '20px',
              padding: '18px 16px',
              boxShadow: 'var(--shadow)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--text)' }}>
                <Layers size={16} color="var(--accent)" />
                <strong style={{ fontSize: '0.86rem' }}>ATS Evaluation Criteria</strong>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.4 }}>
                  <strong style={{ color: 'var(--text)', display: 'block', marginBottom: '2px' }}>1. Keyword Density</strong>
                  Compares document vocabulary against target JD skills and frequency.
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.4 }}>
                  <strong style={{ color: 'var(--text)', display: 'block', marginBottom: '2px' }}>2. Parsable Hierarchy</strong>
                  Checks header structure, standard fonts, and table readability.
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.4 }}>
                  <strong style={{ color: 'var(--text)', display: 'block', marginBottom: '2px' }}>3. Impact Action Verbs</strong>
                  Scans bullet points for quantified achievements and action verbs.
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main Content Card */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {activeTab === 'analyze' ? (
              <div style={{
                background: 'var(--surface)',
                border: '1px solid rgba(24, 35, 38, 0.08)',
                borderRadius: '24px',
                padding: '28px 32px',
                boxShadow: 'var(--shadow)'
              }}>
                <form id="analyzeForm" onSubmit={handleSubmit}>
                  
                  {/* Step 1: Upload Resume Box + Companion ATS Standards Card (Side by Side) */}
                  <div style={{ marginBottom: '22px' }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                      gap: '16px',
                      alignItems: 'stretch'
                    }}>
                      
                      {/* Left: Compact CV Upload Zone */}
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <label style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)' }}>
                            Resume Document
                          </label>
                          <span style={{ fontSize: '0.76rem', color: 'var(--muted)' }}>
                            PDF, DOCX, TXT
                          </span>
                        </div>

                        {!file ? (
                          <div 
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('resumeFile').click()}
                            style={{
                              border: dragover ? '2px dashed var(--accent)' : '2px dashed rgba(201, 100, 66, 0.4)',
                              borderRadius: '16px',
                              padding: '24px 18px',
                              textAlign: 'center',
                              cursor: 'pointer',
                              background: dragover ? 'rgba(201, 100, 66, 0.04)' : '#faf9f5',
                              transition: 'all 0.15s ease',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flex: 1,
                              minHeight: '145px',
                              boxSizing: 'border-box'
                            }}
                          >
                            <div style={{
                              marginBottom: '8px',
                              color: 'var(--accent)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <FileUp size={30} />
                            </div>

                            <div style={{ fontSize: '0.92rem', color: 'var(--text)', marginBottom: '3px' }}>
                              Drop resume file here, or <strong style={{ color: 'var(--accent)' }}>click to browse</strong>
                            </div>

                            <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--muted)' }}>
                              Max 10 MB · Multi-page supported
                            </p>
                          </div>
                        ) : (
                          /* Attached File Banner */
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '16px 18px',
                            background: '#faf9f5',
                            border: '1.5px solid rgba(201, 100, 66, 0.3)',
                            borderRadius: '16px',
                            flex: 1,
                            minHeight: '145px',
                            boxSizing: 'border-box'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: 'rgba(201, 100, 66, 0.12)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--accent)'
                              }}>
                                <FileCheck2 size={22} />
                              </div>
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <strong style={{ fontSize: '0.92rem', color: 'var(--text)' }}>{file.name}</strong>
                                  <span style={{
                                    padding: '2px 7px',
                                    borderRadius: '999px',
                                    background: 'rgba(94, 163, 151, 0.15)',
                                    color: 'var(--teal)',
                                    fontSize: '0.7rem',
                                    fontWeight: 700
                                  }}>
                                    Ready
                                  </span>
                                </div>
                                <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                                  {formatFileSize(file.size)}
                                </span>
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <button
                                type="button"
                                onClick={() => document.getElementById('resumeFile').click()}
                                style={{
                                  padding: '6px 12px',
                                  background: '#ffffff',
                                  border: '1px solid rgba(24, 35, 38, 0.15)',
                                  borderRadius: '8px',
                                  fontSize: '0.78rem',
                                  fontWeight: 600,
                                  color: 'var(--text)',
                                  cursor: 'pointer'
                                }}
                              >
                                Replace
                              </button>
                              <button
                                type="button"
                                onClick={() => setFile(null)}
                                title="Remove resume"
                                style={{
                                  padding: '6px',
                                  background: '#fee2e2',
                                  border: 'none',
                                  borderRadius: '8px',
                                  color: '#dc2626',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>
                        )}

                        <input 
                          type="file" 
                          id="resumeFile" 
                          accept=".pdf,.docx,.txt" 
                          style={{ display: 'none' }}
                          onChange={handleFileChange}
                        />
                      </div>

                      {/* Right: Companion ATS Pre-Flight Standards Card */}
                      <div style={{
                        background: '#faf9f5',
                        border: '1px solid rgba(24, 35, 38, 0.08)',
                        borderRadius: '16px',
                        padding: '16px 18px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '145px',
                        boxSizing: 'border-box'
                      }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                            <ShieldCheck size={16} color="var(--accent)" />
                            <strong style={{ fontSize: '0.86rem', color: 'var(--text)' }}>ATS Compatibility Checklist</strong>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--muted)' }}>
                              <Check size={13} color="var(--teal)" />
                              <span><strong>Selectable Text:</strong> Clean text layers (no flat scans)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--muted)' }}>
                              <Check size={13} color="var(--teal)" />
                              <span><strong>Standard Headings:</strong> Experience, Skills, Education</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--muted)' }}>
                              <Check size={13} color="var(--teal)" />
                              <span><strong>Single-Column Flow:</strong> Compatible with Workday & Taleo</span>
                            </div>
                          </div>
                        </div>

                        <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '6px', borderTop: '1px solid rgba(24, 35, 38, 0.06)', paddingTop: '6px' }}>
                          Verified parser: Greenhouse, Lever, iCIMS, SmartRecruiters compatible.
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Step 2: Target Role + Target Seniority Level (Side by Side) */}
                  <div style={{ marginBottom: '22px' }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                      gap: '16px',
                      alignItems: 'flex-start'
                    }}>
                      
                      {/* Left: Target Role / Job Category */}
                      <div>
                        <label 
                          htmlFor="streamCategory" 
                          style={{ 
                            display: 'block', 
                            fontSize: '0.9rem', 
                            fontWeight: 600, 
                            color: 'var(--text)', 
                            marginBottom: '6px' 
                          }}
                        >
                          Target Role / Job Category
                        </label>
                        <input 
                          id="streamCategory" 
                          type="text" 
                          value={streamCategory}
                          onChange={(e) => setStreamCategory(e.target.value)}
                          placeholder="e.g. Software Engineer, Full Stack, Data Scientist" 
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            background: '#ffffff',
                            border: '1px solid rgba(24, 35, 38, 0.14)',
                            borderRadius: '10px',
                            fontSize: '0.88rem',
                            color: 'var(--text)',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />

                        {/* Quick Domain Presets */}
                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '7px', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600 }}>Presets:</span>
                          {DOMAIN_PRESETS.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleSelectDomain(preset)}
                              style={{
                                padding: '2px 8px',
                                borderRadius: '999px',
                                border: '1px solid',
                                borderColor: streamCategory === preset.name ? 'var(--accent)' : 'rgba(24, 35, 38, 0.12)',
                                background: streamCategory === preset.name ? 'rgba(201, 100, 66, 0.08)' : '#ffffff',
                                color: streamCategory === preset.name ? 'var(--accent)' : 'var(--text)',
                                fontSize: '0.72rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              {preset.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Right: Target Seniority / Experience Level */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>
                            Target Seniority / Experience Level
                          </label>
                          <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>
                            Calibrates ATS depth
                          </span>
                        </div>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(4, 1fr)',
                          gap: '6px'
                        }}>
                          {SENIORITY_LEVELS.map((level, idx) => {
                            const isSelected = seniority === level.label;
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setSeniority(level.label)}
                                style={{
                                  padding: '8px 4px',
                                  borderRadius: '10px',
                                  border: '1px solid',
                                  borderColor: isSelected ? 'var(--surface-dark)' : 'rgba(24, 35, 38, 0.12)',
                                  background: isSelected ? 'var(--surface-dark)' : '#ffffff',
                                  color: isSelected ? '#ffffff' : 'var(--text)',
                                  textAlign: 'center',
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                <strong style={{ display: 'block', fontSize: '0.76rem', lineHeight: 1.2 }}>
                                  {level.label}
                                </strong>
                                <span style={{
                                  fontSize: '0.68rem',
                                  color: isSelected ? '#d1d5db' : 'var(--muted)',
                                  display: 'block',
                                  marginTop: '2px'
                                }}>
                                  {level.range}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '7px' }}>
                          Tunes ATS scoring expectations for impact verbs, leadership scope, and project scale.
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Step 3: Interactive Keyword Tester */}
                  <div style={{
                    marginBottom: '22px',
                    padding: '16px 18px',
                    background: '#faf9f5',
                    borderRadius: '14px',
                    border: '1px solid rgba(24, 35, 38, 0.08)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <Tag size={15} color="var(--accent)" />
                        <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text)' }}>
                          Target Keywords & Core Skills to Test
                        </label>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>
                        Optional · Press Enter or click + to add
                      </span>
                    </div>

                    <p style={{ margin: '0 0 10px', fontSize: '0.76rem', color: 'var(--muted)', lineHeight: 1.4 }}>
                      Specify the core competencies, technologies, or domain terms you want your resume explicitly benchmarked against.
                    </p>

                    {/* Keyword Input Box */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input 
                        type="text"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyDown={handleKeyDownKeyword}
                        placeholder="Add a target skill (e.g. React, Python, AWS, System Design, SQL)..."
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          background: '#ffffff',
                          border: '1px solid rgba(24, 35, 38, 0.14)',
                          borderRadius: '8px',
                          fontSize: '0.84rem',
                          color: 'var(--text)',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddKeyword}
                        disabled={!keywordInput.trim()}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '8px',
                          border: 'none',
                          background: keywordInput.trim() ? 'var(--surface-dark)' : 'rgba(24, 35, 38, 0.12)',
                          color: '#ffffff',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: keywordInput.trim() ? 'pointer' : 'default',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Plus size={14} /> Add
                      </button>
                    </div>

                    {/* Active Selected Keywords */}
                    {customKeywords.length > 0 && (
                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        {customKeywords.map((kw, i) => (
                          <span
                            key={i}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '3px 9px',
                              background: '#ffffff',
                              border: '1px solid rgba(201, 100, 66, 0.35)',
                              borderRadius: '999px',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              color: 'var(--accent)'
                            }}
                          >
                            <span>{kw}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveKeyword(kw)}
                              style={{
                                border: 'none',
                                background: 'transparent',
                                color: 'var(--muted)',
                                cursor: 'pointer',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Suggested Keywords to add */}
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600 }}>Suggested:</span>
                      {suggestedKeywords.slice(0, 7).map((sk, i) => {
                        const isAdded = customKeywords.includes(sk);
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              if (!isAdded) setCustomKeywords([...customKeywords, sk]);
                            }}
                            disabled={isAdded}
                            style={{
                              padding: '2px 7px',
                              borderRadius: '6px',
                              border: '1px solid rgba(24, 35, 38, 0.1)',
                              background: isAdded ? 'rgba(24, 35, 38, 0.04)' : '#ffffff',
                              color: isAdded ? 'var(--muted)' : 'var(--text)',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              cursor: isAdded ? 'default' : 'pointer'
                            }}
                          >
                            {isAdded ? '✓ ' : '+ '} {sk}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 4: Target Job Description */}
                  <div style={{ marginBottom: '26px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label 
                        htmlFor="jobDescription" 
                        style={{ 
                          fontSize: '0.9rem', 
                          fontWeight: 600, 
                          color: 'var(--text)' 
                        }}
                      >
                        Target Job Description (optional but recommended)
                      </label>

                      {/* Mode Switcher */}
                      <div style={{ display: 'flex', gap: '4px', background: 'rgba(24, 35, 38, 0.05)', padding: '2px', borderRadius: '8px' }}>
                        <button
                          type="button"
                          onClick={() => setJdMode('paste')}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: 'none',
                            background: jdMode === 'paste' ? '#ffffff' : 'transparent',
                            color: jdMode === 'paste' ? 'var(--text)' : 'var(--muted)',
                            fontSize: '0.76rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            boxShadow: jdMode === 'paste' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
                          }}
                        >
                          Paste Text
                        </button>
                        <button
                          type="button"
                          onClick={() => setJdMode('file')}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: 'none',
                            background: jdMode === 'file' ? '#ffffff' : 'transparent',
                            color: jdMode === 'file' ? 'var(--text)' : 'var(--muted)',
                            fontSize: '0.76rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            boxShadow: jdMode === 'file' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
                          }}
                        >
                          Upload File
                        </button>
                      </div>
                    </div>

                    {jdMode === 'paste' ? (
                      <div>
                        <textarea 
                          id="jobDescription" 
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          placeholder="Paste the full job description here (responsibilities, required skills, tools, qualifications) for a detailed ATS keyword match..." 
                          style={{
                            width: '100%',
                            minHeight: '130px',
                            padding: '12px 14px',
                            background: '#ffffff',
                            border: '1px solid rgba(24, 35, 38, 0.14)',
                            borderRadius: '12px',
                            fontSize: '0.86rem',
                            color: 'var(--text)',
                            outline: 'none',
                            boxSizing: 'border-box',
                            fontFamily: 'inherit',
                            lineHeight: 1.5,
                            resize: 'vertical'
                          }}
                        />

                        {/* Textarea Bottom Tools */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>
                            {jobDescription.trim() ? `${jobDescription.trim().split(/\s+/).length} words entered` : 'Include required skills and qualifications for highest accuracy.'}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setJobDescription(SAMPLE_TECH_JD);
                              setStreamCategory('Software Engineering');
                              setSeniority('Senior');
                              if (!customKeywords.includes('Python')) setCustomKeywords(['Python', 'AWS', 'Docker', 'React', 'PostgreSQL']);
                            }}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              background: '#ffffff',
                              border: '1px solid rgba(201, 100, 66, 0.3)',
                              color: 'var(--accent)',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            Load Sample Tech JD
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* JD Document Upload */
                      <div>
                        {!jdFile ? (
                          <div
                            onDragOver={(e) => { e.preventDefault(); setJdDragover(true); }}
                            onDragLeave={() => setJdDragover(false)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setJdDragover(false);
                              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                setJdFile(e.dataTransfer.files[0]);
                              }
                            }}
                            onClick={() => document.getElementById('jdFile').click()}
                            style={{
                              border: jdDragover ? '2px dashed var(--accent)' : '2px dashed rgba(24, 35, 38, 0.18)',
                              borderRadius: '12px',
                              padding: '24px 18px',
                              textAlign: 'center',
                              cursor: 'pointer',
                              background: '#faf9f5',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <FileText size={24} style={{ color: 'var(--accent)', marginBottom: '5px' }} />
                            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)', marginBottom: '3px' }}>
                              Drop JD document here, or <span style={{ color: 'var(--accent)', textDecoration: 'underline' }}>click to select</span>
                            </div>
                            <span style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>Supports .pdf, .docx, .txt</span>
                          </div>
                        ) : (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            background: '#faf9f5',
                            border: '1.5px solid rgba(201, 100, 66, 0.3)',
                            borderRadius: '12px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <FileCheck2 size={18} style={{ color: 'var(--accent)' }} />
                              <div>
                                <strong style={{ fontSize: '0.86rem', color: 'var(--text)', display: 'block' }}>{jdFile.name}</strong>
                                <span style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>{formatFileSize(jdFile.size)} · Job description attached</span>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button
                                type="button"
                                onClick={() => document.getElementById('jdFile').click()}
                                style={{
                                  padding: '5px 10px',
                                  background: '#ffffff',
                                  border: '1px solid rgba(24, 35, 38, 0.15)',
                                  borderRadius: '6px',
                                  fontSize: '0.76rem',
                                  fontWeight: 600,
                                  cursor: 'pointer'
                                }}
                              >
                                Change
                              </button>
                              <button
                                type="button"
                                onClick={() => setJdFile(null)}
                                style={{
                                  padding: '5px',
                                  background: '#fee2e2',
                                  border: 'none',
                                  borderRadius: '6px',
                                  color: '#dc2626',
                                  cursor: 'pointer'
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        )}
                        <input 
                          type="file" 
                          id="jdFile" 
                          accept=".pdf,.docx,.txt" 
                          style={{ display: 'none' }}
                          onChange={handleJdFileChange}
                        />
                      </div>
                    )}
                  </div>

                  {/* Primary CTA Submit Button */}
                  <button 
                    type="submit" 
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '14px 28px',
                      borderRadius: '12px',
                      background: 'var(--accent)',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '0.98rem',
                      fontWeight: 700,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(201, 100, 66, 0.28)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{loading ? 'Analyzing Resume...' : 'Analyze Match & Get AI Career Map'}</span>
                    <ArrowRight size={18} />
                  </button>
                </form>

                {status.text && (
                  <div style={{
                    marginTop: '18px',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: status.type === 'error' ? '#fef2f2' : '#f0fdf4',
                    border: status.type === 'error' ? '1px solid #fecaca' : '1px solid #bbf7d0',
                    color: status.type === 'error' ? '#991b1b' : '#166534',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    {status.type === 'error' ? <AlertCircle size={17} /> : <CheckCircle2 size={17} />}
                    <span>{status.text}</span>
                  </div>
                )}
              </div>
            ) : (
              /* Records Tab */
              <div style={{
                background: 'var(--surface)',
                border: '1px solid rgba(24, 35, 38, 0.08)',
                borderRadius: '24px',
                padding: '28px 32px',
                boxShadow: 'var(--shadow)',
                minHeight: '380px'
              }}>
                <div style={{ marginBottom: '22px' }}>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 6px' }}>
                    Previous Records
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--muted)' }}>
                    Review past resume evaluations and computed ATS match scores.
                  </p>
                </div>

                {!user ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 20px', textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(201, 100, 66, 0.12)', display: 'grid', placeItems: 'center', color: 'var(--accent)', marginBottom: '12px' }}>
                      <Lock size={22} />
                    </div>
                    <h3 style={{ margin: '0 0 6px', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>Authentication Required</h3>
                    <p style={{ margin: '0 0 18px', fontSize: '0.86rem', color: 'var(--muted)', maxWidth: '360px' }}>
                      Sign in to your account to securely store and view historical ATS resume scans.
                    </p>
                    <Link to="/login" style={{
                      padding: '10px 24px',
                      borderRadius: '10px',
                      background: 'var(--accent)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.86rem',
                      textDecoration: 'none'
                    }}>
                      Sign In / Create Account
                    </Link>
                  </div>
                ) : resumesLoading ? (
                  <div style={{ display: 'grid', placeItems: 'center', padding: '48px 0' }}>
                    <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>Loading records...</p>
                  </div>
                ) : resumes.length === 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 20px', textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(24, 35, 38, 0.05)', display: 'grid', placeItems: 'center', color: 'var(--muted)', marginBottom: '12px' }}>
                      <FileText size={22} />
                    </div>
                    <h3 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>No Resumes Screened Yet</h3>
                    <p style={{ margin: '0 0 18px', fontSize: '0.84rem', color: 'var(--muted)', maxWidth: '360px' }}>
                      Once you analyze your resume against a target job description, your detailed records will appear here.
                    </p>
                    <button
                      onClick={() => setActiveTab('analyze')}
                      style={{
                        padding: '10px 22px',
                        borderRadius: '10px',
                        background: 'var(--surface-dark)',
                        color: 'white',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.84rem',
                        cursor: 'pointer'
                      }}
                    >
                      Scan Your First Resume
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {resumes.map((resume) => {
                      const hasAts = resume.ats_score !== null && resume.ats_score !== undefined;
                      const rScore = hasAts ? Math.round(resume.ats_score) : 0;
                      const isGood = rScore >= 75;
                      const isMedium = rScore >= 60;
                      
                      return (
                        <div key={resume.id} style={{
                          display: 'grid',
                          gridTemplateColumns: '1.8fr 1fr 1fr 2.2fr',
                          alignItems: 'center',
                          background: '#faf9f5',
                          padding: '14px 18px',
                          borderRadius: '14px',
                          border: '1px solid rgba(24, 35, 38, 0.06)',
                          gap: '12px'
                        }}>
                          <div>
                            <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {resume.title}
                            </strong>
                            <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>
                              Scanned on {resume.created_at ? new Date(resume.created_at).toLocaleDateString() : 'Recent'}
                            </span>
                          </div>

                          <div>
                            <span style={{ 
                              fontSize: '0.76rem', 
                              background: '#ffffff', 
                              padding: '3px 9px', 
                              borderRadius: '7px', 
                              fontWeight: 600, 
                              color: 'var(--text)',
                              border: '1px solid rgba(24, 35, 38, 0.08)',
                              display: 'inline-block',
                              maxWidth: '100%',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {resume.category || 'General'}
                            </span>
                          </div>

                          <div>
                            <span style={{ fontSize: '0.7rem', color: 'var(--muted)', display: 'block', fontWeight: 600 }}>ATS Score</span>
                            <strong style={{
                              fontSize: '1.05rem',
                              fontWeight: 800,
                              color: isGood ? '#16a34a' : isMedium ? '#d97706' : '#dc2626'
                            }}>
                              {hasAts ? `${rScore}%` : 'N/A'}
                            </strong>
                          </div>

                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                            <button
                              onClick={(e) => handleDownloadResume(resume, e)}
                              style={{
                                border: '1px solid rgba(24, 35, 38, 0.15)',
                                background: '#ffffff',
                                color: 'var(--text)',
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                padding: '6px 10px',
                                borderRadius: '8px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <Download size={13} /> Resume
                            </button>
                            <button
                              onClick={(e) => handleShowReport(resume, e)}
                              style={{
                                border: '1px solid rgba(201, 100, 66, 0.3)',
                                background: 'rgba(201, 100, 66, 0.08)',
                                color: 'var(--accent)',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              Report
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteResume(resume.id, e);
                              }}
                              disabled={deleteLoadingId === resume.id}
                              style={{
                                border: 'none',
                                background: '#fee2e2',
                                color: '#dc2626',
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                padding: '6px 10px',
                                borderRadius: '8px'
                              }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Detail Diagnostic Modal */}
      {activeReport && ReactDOM.createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(8px)',
          display: 'grid',
          placeItems: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '30px',
            maxWidth: '560px',
            width: '100%',
            position: 'relative',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.25)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <button 
              onClick={() => setActiveReport(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                border: 'none',
                background: 'rgba(24, 35, 38, 0.06)',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.05rem',
                fontWeight: 700,
                display: 'grid',
                placeItems: 'center',
                color: 'var(--muted)'
              }}
            >
              ×
            </button>

            <h3 style={{ margin: '0 0 6px', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)' }}>Optimization Report</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.84rem', margin: '0 0 18px' }}>
              Detailed alignment report for <strong>{activeReport.title}</strong>
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '18px' }}>
              <div style={{
                background: '#faf9f5',
                border: '1px solid rgba(24, 35, 38, 0.08)',
                padding: '12px 14px',
                borderRadius: '12px',
                flex: 1
              }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Category</span>
                <strong style={{ fontSize: '0.96rem', color: 'var(--text)' }}>{activeReport.category}</strong>
              </div>
              <div style={{
                background: '#faf9f5',
                border: '1px solid rgba(24, 35, 38, 0.08)',
                padding: '12px 14px',
                borderRadius: '12px',
                flex: 1
              }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Computed ATS Match</span>
                <strong style={{ fontSize: '1.05rem', color: activeReport.ats_score >= 70 ? '#16a34a' : '#d97706', fontWeight: 800 }}>
                  {activeReport.ats_score}%
                </strong>
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ margin: '0 0 8px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>Missing Keywords</h4>
              {activeReport.missing_keywords.length === 0 ? (
                <p style={{ fontSize: '0.84rem', color: '#16a34a', margin: 0, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={15} /> No critical keywords missing.
                </p>
              ) : (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {activeReport.missing_keywords.map((kw, idx) => (
                    <span key={idx} style={{
                      fontSize: '0.76rem',
                      background: '#fee2e2',
                      color: '#991b1b',
                      padding: '3px 9px',
                      borderRadius: '7px',
                      fontWeight: 600
                    }}>
                      + {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '22px' }}>
              <h4 style={{ margin: '0 0 8px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>Improvement Suggestions</h4>
              {activeReport.suggestions.length === 0 ? (
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0 }}>No critical suggestions recorded.</p>
              ) : (
                <ul style={{ paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {activeReport.suggestions.map((s, idx) => (
                    <li key={idx} style={{ fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.5 }}>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button 
              onClick={() => setActiveReport(null)}
              style={{
                width: '100%',
                border: 'none',
                background: 'var(--surface-dark)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.88rem',
                padding: '11px',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            >
              Close Diagnostic Report
            </button>
          </div>
        </div>,
        document.body
      )}

      <Footer />
    </div>
  );
};

export default Upload;
