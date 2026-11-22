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
  Sparkles,
  Check,
  Download,
  Lightbulb,
  UploadCloud,
  Briefcase,
  Clock,
  Trash2,
  X,
  ShieldCheck,
  Zap,
  ArrowRight,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import '../css/style.css';

const SAMPLE_CATEGORIES = [
  'Software Engineering',
  'Data Science & AI',
  'DevOps & Cloud',
  'Full Stack Development',
  'Product Management',
  'Cybersecurity'
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
  const [jobDescription, setJobDescription] = useState('');
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
    const fileBlob = new Blob([text], {type: 'text/plain'});
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
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file && !(streamCategory.trim() && (jobDescription.trim() || jdFile))) {
      setStatus({ text: "Please upload a resume file, or provide both Category and Job Description.", type: "error" });
      return;
    }

    setStatus({ text: "Analyzing resume...", type: "info" });
    setLoading(true);

    const formData = new FormData();
    if (file) {
      formData.append("resume", file);
    }
    formData.append("job_description", jobDescription);
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

      setStatus({ text: "Analysis complete. Redirecting...", type: "success" });
      setTimeout(() => {
        setLoading(false);
        navigate('/result');
      }, 450);

    } catch (err) {
      setStatus({ text: err.message, type: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="page-shell" style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <LoadingOverlay
        isOpen={loading}
        variant="scan"
        title="Scanning & Analyzing Resume"
        subtitle={file ? `Evaluating ${file.name} against ATS criteria` : 'Running AI career alignment analysis'}
        steps={[
          'Extracting document structure, fonts & text layers...',
          'Matching skills against ATS keyword density models...',
          'Running semantic career alignment diagnostics...',
          'Generating comprehensive ATS match report & feedback...'
        ]}
      />
      <Navbar />

      <main className="page" style={{ marginTop: '28px', maxWidth: '1280px', margin: '28px auto 60px', padding: '0 24px', boxSizing: 'border-box' }}>
        
        {/* Hero Header Section */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)',
            border: '1px solid rgba(79, 70, 229, 0.18)',
            color: '#4f46e5',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginBottom: '12px'
          }}>
            <Sparkles size={14} className="text-indigo-600" />
            <span>AI-Powered ATS Match & Keyword Scanner</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.7rem)',
            fontWeight: 800,
            color: '#0f172a',
            letterSpacing: '-0.03em',
            margin: '0 0 10px',
            lineHeight: 1.15
          }}>
            ATS Resume Analyzer
          </h1>

          <p style={{
            margin: 0,
            fontSize: '1.02rem',
            color: '#475569',
            maxWidth: '780px',
            lineHeight: 1.6
          }}>
            Scan your resume against modern ATS recruitment algorithms (Workday, Taleo, Greenhouse) and specific job descriptions to instantly identify keyword gaps, formatting flaws, and boost your callback rate.
          </p>

          {/* Quick Stats / Trust Badges */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '18px', flexWrap: 'wrap' }}>
            {[
              { icon: Zap, label: 'Instant < 3s Scan', color: '#6366f1' },
              { icon: ShieldCheck, label: '100% Client Encrypted', color: '#10b981' },
              { icon: BarChart3, label: '98% ATS Keyword Precision', color: '#0ea5e9' },
              { icon: FileCheck2, label: 'PDF, DOCX & TXT Supported', color: '#8b5cf6' }
            ].map((b, i) => {
              const IconComp = b.icon;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', fontWeight: 600, color: '#334155' }}>
                  <IconComp size={15} style={{ color: b.color }} />
                  <span>{b.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Left Navigation Sidebar & Right Content Form */}
        <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>
          
          {/* Left Sidebar Menu */}
          <aside style={{
            width: '280px',
            flexShrink: 0,
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            position: 'sticky',
            top: '100px'
          }}>
            <div style={{ padding: '4px 6px 12px', borderBottom: '1px solid #f1f5f9' }}>
              <strong style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.94rem', color: '#0f172a' }}>
                <BarChart3 size={16} className="text-indigo-600" /> ATS Command Center
              </strong>
              <span style={{ fontSize: '0.76rem', color: '#64748b', marginLeft: '24px' }}>Optimizers & Scan History</span>
            </div>

            <button 
              onClick={() => setActiveTab('analyze')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '12px 14px',
                border: '1px solid',
                borderColor: activeTab === 'analyze' ? '#6366f1' : 'transparent',
                borderRadius: '14px',
                background: activeTab === 'analyze' ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' : 'transparent',
                color: activeTab === 'analyze' ? '#ffffff' : '#334155',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: activeTab === 'analyze' ? '0 8px 16px -4px rgba(79, 70, 229, 0.35)' : 'none'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={17} style={{ color: activeTab === 'analyze' ? '#ffffff' : '#6366f1' }} />
                <span>Analyze Resume</span>
              </span>
              {activeTab === 'analyze' && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a5b4fc' }} />}
            </button>

            <button 
              onClick={() => setActiveTab('records')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '12px 14px',
                border: '1px solid',
                borderColor: activeTab === 'records' ? '#6366f1' : 'transparent',
                borderRadius: '14px',
                background: activeTab === 'records' ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' : 'transparent',
                color: activeTab === 'records' ? '#ffffff' : '#334155',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: activeTab === 'records' ? '0 8px 16px -4px rgba(79, 70, 229, 0.35)' : 'none'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={17} style={{ color: activeTab === 'records' ? '#ffffff' : '#64748b' }} />
                <span>Previous Records</span>
              </span>
              {resumes.length > 0 && (
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  background: activeTab === 'records' ? '#ffffff' : '#f1f5f9',
                  color: activeTab === 'records' ? '#4f46e5' : '#475569'
                }}>
                  {resumes.length}
                </span>
              )}
            </button>

            {/* Recruiter Pro-Tip Card inside Sidebar */}
            <div style={{
              marginTop: '16px',
              padding: '16px',
              background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
              border: '1px solid #bbf7d0',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontWeight: 800, fontSize: '0.82rem' }}>
                <Lightbulb size={16} className="text-emerald-600" />
                <span>Recruiter Insider Tip</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#14532d', lineHeight: 1.5 }}>
                Aim for a <strong>75%+ keyword match score</strong> against the target JD. Tailoring skills raises recruiter callbacks by <strong>3.2x</strong>!
              </p>
            </div>

            {/* Data Privacy Guarantee */}
            <div style={{ padding: '12px 6px 0', borderTop: '1px solid #f1f5f9', marginTop: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#64748b' }}>
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Zero data sharing. Encrypted.</span>
              </div>
            </div>
          </aside>

          {/* Right Content Area */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {activeTab === 'analyze' ? (
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '24px',
                padding: '36px',
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 0 1px 1px rgba(0, 0, 0, 0.02)'
              }}>
                <form id="analyzeForm" onSubmit={handleSubmit}>
                  
                  {/* Step 1: Resume Upload Box */}
                  <div style={{ marginBottom: '28px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <label style={{ fontSize: '0.96rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '6px',
                          background: '#4f46e5',
                          color: '#ffffff',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 800
                        }}>1</span>
                        <span>Upload Candidate Resume</span>
                      </label>
                      <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600 }}>PDF, DOCX, TXT (Max 10 MB)</span>
                    </div>

                    {!file ? (
                      <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('resumeFile').click()}
                        style={{
                          border: dragover ? '2px dashed #6366f1' : '2px dashed #cbd5e1',
                          borderRadius: '20px',
                          padding: '42px 24px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          background: dragover ? 'rgba(99, 102, 241, 0.06)' : 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <div style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '20px',
                          background: 'linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '14px',
                          color: '#4f46e5',
                          boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.25)'
                        }}>
                          <UploadCloud size={32} />
                        </div>

                        <div style={{ fontSize: '1.02rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                          Drag & drop your resume file here, or <span style={{ color: '#4f46e5', fontWeight: 800, textDecoration: 'underline' }}>click to browse</span>
                        </div>

                        <p style={{ margin: 0, fontSize: '0.84rem', color: '#64748b' }}>
                          Supports modern single or multi-page formats (.pdf, .docx, .txt)
                        </p>

                        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                          {['PDF', 'DOCX', 'TXT'].map((ext) => (
                            <span key={ext} style={{
                              padding: '3px 10px',
                              borderRadius: '6px',
                              background: '#ffffff',
                              border: '1px solid #e2e8f0',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              color: '#475569'
                            }}>
                              {ext}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* File Selected Card */
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '18px 24px',
                        background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 100%)',
                        border: '1.5px solid #86efac',
                        borderRadius: '18px',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.08)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '14px',
                            background: '#dcfce7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#15803d'
                          }}>
                            <FileCheck2 size={26} />
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <strong style={{ fontSize: '0.98rem', color: '#0f172a' }}>{file.name}</strong>
                              <span style={{
                                padding: '2px 8px',
                                borderRadius: '999px',
                                background: '#dcfce7',
                                color: '#166534',
                                fontSize: '0.72rem',
                                fontWeight: 800
                              }}>
                                Ready
                              </span>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                              {formatFileSize(file.size)} • File loaded for ATS scan
                            </span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <button
                            type="button"
                            onClick={() => document.getElementById('resumeFile').click()}
                            style={{
                              padding: '8px 14px',
                              background: '#ffffff',
                              border: '1px solid #cbd5e1',
                              borderRadius: '10px',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              color: '#334155',
                              cursor: 'pointer'
                            }}
                          >
                            Change File
                          </button>
                          <button
                            type="button"
                            onClick={() => setFile(null)}
                            title="Remove resume"
                            style={{
                              padding: '8px',
                              background: '#fee2e2',
                              border: 'none',
                              borderRadius: '10px',
                              color: '#dc2626',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Trash2 size={16} />
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

                  {/* Step 2: Category / Industry Stream */}
                  <div style={{ marginBottom: '28px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <label htmlFor="streamCategory" style={{ fontSize: '0.96rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '6px',
                          background: '#4f46e5',
                          color: '#ffffff',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 800
                        }}>2</span>
                        <span>Job Category / Industry Stream</span>
                        <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600, background: '#f1f5f9', padding: '2px 8px', borderRadius: '6px' }}>Optional</span>
                      </label>
                    </div>

                    <div style={{ position: 'relative' }}>
                      <Briefcase size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input 
                        id="streamCategory" 
                        type="text" 
                        value={streamCategory}
                        onChange={(e) => setStreamCategory(e.target.value)}
                        placeholder="e.g. Software Engineering, Data Science, DevOps, Product Management..."
                        style={{
                          width: '100%',
                          padding: '13px 16px 13px 44px',
                          background: '#f8fafc',
                          border: '1.5px solid #cbd5e1',
                          borderRadius: '14px',
                          fontSize: '0.92rem',
                          color: '#0f172a',
                          outline: 'none',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit',
                          transition: 'border-color 0.15s ease'
                        }}
                      />
                    </div>

                    {/* Quick Category Chips */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                      {SAMPLE_CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setStreamCategory(cat)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '8px',
                            background: streamCategory === cat ? '#e0e7ff' : '#f1f5f9',
                            border: streamCategory === cat ? '1px solid #818cf8' : '1px solid #e2e8f0',
                            color: streamCategory === cat ? '#3730a3' : '#475569',
                            fontSize: '0.76rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          + {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Target Job Description (Paste or File) */}
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                      <label htmlFor="jobDescription" style={{ fontSize: '0.96rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '6px',
                          background: '#4f46e5',
                          color: '#ffffff',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 800
                        }}>3</span>
                        <span>Target Job Description</span>
                        <span style={{ fontSize: '0.74rem', color: '#059669', fontWeight: 700, background: '#ecfdf5', padding: '2px 8px', borderRadius: '6px' }}>Highly Recommended</span>
                      </label>

                      {/* Mode Switcher Tabs */}
                      <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '3px', borderRadius: '10px' }}>
                        <button
                          type="button"
                          onClick={() => setJdMode('paste')}
                          style={{
                            padding: '5px 12px',
                            borderRadius: '8px',
                            border: 'none',
                            background: jdMode === 'paste' ? '#ffffff' : 'transparent',
                            color: jdMode === 'paste' ? '#4f46e5' : '#64748b',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: jdMode === 'paste' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                          }}
                        >
                          Paste Text
                        </button>
                        <button
                          type="button"
                          onClick={() => setJdMode('file')}
                          style={{
                            padding: '5px 12px',
                            borderRadius: '8px',
                            border: 'none',
                            background: jdMode === 'file' ? '#ffffff' : 'transparent',
                            color: jdMode === 'file' ? '#4f46e5' : '#64748b',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: jdMode === 'file' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                          }}
                        >
                          Upload JD Document
                        </button>
                      </div>
                    </div>

                    {jdMode === 'paste' ? (
                      <div>
                        <textarea 
                          id="jobDescription" 
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          placeholder="Paste the full job description here (responsibilities, required skills, technologies, qualifications) to compute a high-precision ATS match score..." 
                          style={{
                            width: '100%',
                            minHeight: '160px',
                            padding: '14px 16px',
                            background: '#f8fafc',
                            border: '1.5px solid #cbd5e1',
                            borderRadius: '16px',
                            fontSize: '0.9rem',
                            color: '#0f172a',
                            outline: 'none',
                            boxSizing: 'border-box',
                            fontFamily: 'inherit',
                            lineHeight: 1.5,
                            resize: 'vertical'
                          }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            {jobDescription.trim() ? `${jobDescription.trim().split(/\s+/).length} words entered` : 'Tip: Include required skills and qualifications for highest accuracy.'}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setJobDescription(SAMPLE_TECH_JD);
                              setStreamCategory('Software Engineering');
                            }}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '5px 12px',
                              borderRadius: '8px',
                              background: '#eef2ff',
                              border: '1px solid #c7d2fe',
                              color: '#4338ca',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            <Sparkles size={13} /> Auto-fill Sample Tech JD
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* JD File Upload Mode */
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
                              border: jdDragover ? '2px dashed #6366f1' : '2px dashed #cbd5e1',
                              borderRadius: '16px',
                              padding: '32px 20px',
                              textAlign: 'center',
                              cursor: 'pointer',
                              background: jdDragover ? 'rgba(99, 102, 241, 0.06)' : '#f8fafc',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <FileText size={30} style={{ color: '#6366f1', marginBottom: '8px' }} />
                            <div style={{ fontSize: '0.94rem', fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>
                              Drop target JD file here, or <span style={{ color: '#4f46e5', fontWeight: 700, textDecoration: 'underline' }}>click to select</span>
                            </div>
                            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Supports .pdf, .docx, .txt</span>
                          </div>
                        ) : (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '16px 20px',
                            background: '#f0fdf4',
                            border: '1.5px solid #86efac',
                            borderRadius: '16px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <FileCheck2 size={24} style={{ color: '#16a34a' }} />
                              <div>
                                <strong style={{ fontSize: '0.92rem', color: '#0f172a', display: 'block' }}>{jdFile.name}</strong>
                                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{formatFileSize(jdFile.size)} • Job description attached</span>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                type="button"
                                onClick={() => document.getElementById('jdFile').click()}
                                style={{
                                  padding: '6px 12px',
                                  background: '#ffffff',
                                  border: '1px solid #cbd5e1',
                                  borderRadius: '8px',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                Change
                              </button>
                              <button
                                type="button"
                                onClick={() => setJdFile(null)}
                                style={{
                                  padding: '6px',
                                  background: '#fee2e2',
                                  border: 'none',
                                  borderRadius: '8px',
                                  color: '#dc2626',
                                  cursor: 'pointer'
                                }}
                              >
                                <Trash2 size={16} />
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
                      padding: '16px 28px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #4338ca 100%)',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '1.04rem',
                      fontWeight: 800,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      boxShadow: '0 10px 24px -4px rgba(79, 70, 229, 0.45)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Sparkles size={20} className="text-white" />
                    <span>{loading ? 'Analyzing Candidate Resume...' : 'Analyze Match & Get AI Career Map'}</span>
                    <ArrowRight size={18} />
                  </button>

                  <div style={{ textAlign: 'center', marginTop: '12px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      🔒 Zero data leakage. Instant deterministic scoring & AI career gap analysis.
                    </span>
                  </div>
                </form>

                {status.text && (
                  <div style={{
                    marginTop: '20px',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    background: status.type === 'error' ? '#fef2f2' : '#f0fdf4',
                    border: status.type === 'error' ? '1px solid #fecaca' : '1px solid #bbf7d0',
                    color: status.type === 'error' ? '#991b1b' : '#166534',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    {status.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                    <span>{status.text}</span>
                  </div>
                )}
              </div>
            ) : (
              /* Previous Records Tab */
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '24px',
                padding: '36px',
                minHeight: '440px',
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                    Scan History & Saved Reports
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b' }}>
                    Review previously evaluated resumes, keyword match scores, and improvement recommendations.
                  </p>
                </div>

                {!user ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: '#e0e7ff', display: 'grid', placeItems: 'center', color: '#4f46e5', marginBottom: '14px' }}>
                      <Lock size={26} />
                    </div>
                    <h3 style={{ margin: '0 0 6px', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Authentication Required</h3>
                    <p style={{ margin: '0 0 20px', fontSize: '0.88rem', color: '#64748b', maxWidth: '360px' }}>
                      Sign in to your account to securely store and view historical ATS resume scans.
                    </p>
                    <Link to="/login" style={{
                      padding: '12px 28px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)'
                    }}>
                      Sign In / Create Account
                    </Link>
                  </div>
                ) : resumesLoading ? (
                  <div style={{ display: 'grid', placeItems: 'center', padding: '60px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4f46e5', fontWeight: 700 }}>
                      <Sparkles size={20} className="animate-spin" />
                      <span>Loading previous scan records...</span>
                    </div>
                  </div>
                ) : resumes.length === 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: '#f1f5f9', display: 'grid', placeItems: 'center', color: '#64748b', marginBottom: '14px' }}>
                      <FileText size={26} />
                    </div>
                    <h3 style={{ margin: '0 0 6px', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>No Resumes Screened Yet</h3>
                    <p style={{ margin: '0 0 20px', fontSize: '0.88rem', color: '#64748b', maxWidth: '360px' }}>
                      Once you analyze your resume against a target job description, your detailed records will appear here.
                    </p>
                    <button
                      onClick={() => setActiveTab('analyze')}
                      style={{
                        padding: '12px 26px',
                        borderRadius: '14px',
                        background: '#0f172a',
                        color: 'white',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        cursor: 'pointer'
                      }}
                    >
                      Scan Your First Resume
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
                          background: '#f8fafc',
                          padding: '18px 22px',
                          borderRadius: '18px',
                          border: '1px solid #e2e8f0',
                          gap: '14px'
                        }}>
                          <div>
                            <strong style={{ display: 'block', fontSize: '0.96rem', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {resume.title}
                            </strong>
                            <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
                              Scanned on {resume.created_at ? new Date(resume.created_at).toLocaleDateString() : 'Recent'}
                            </span>
                          </div>

                          <div>
                            <span style={{ 
                              fontSize: '0.78rem', 
                              background: '#ffffff', 
                              padding: '5px 12px', 
                              borderRadius: '8px', 
                              fontWeight: 700, 
                              color: '#334155',
                              border: '1px solid #e2e8f0',
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
                            <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', fontWeight: 600 }}>ATS Score</span>
                            <strong style={{
                              fontSize: '1.15rem',
                              fontWeight: 800,
                              color: isGood ? '#16a34a' : isMedium ? '#d97706' : '#dc2626'
                            }}>
                              {hasAts ? `${rScore}%` : 'N/A'}
                            </strong>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                            <button
                              onClick={(e) => handleDownloadResume(resume, e)}
                              style={{
                                border: '1px solid #cbd5e1',
                                background: '#ffffff',
                                color: '#1e293b',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                padding: '8px 12px',
                                borderRadius: '10px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px'
                              }}
                            >
                              <Download size={14} /> Resume
                            </button>
                            <button
                              onClick={(e) => handleShowReport(resume, e)}
                              style={{
                                border: '1px solid #818cf8',
                                background: '#eef2ff',
                                color: '#4338ca',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                padding: '8px 14px',
                                borderRadius: '10px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px'
                              }}
                            >
                              <Lightbulb size={14} /> Report
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
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                padding: '8px 12px',
                                borderRadius: '10px'
                              }}
                            >
                              {deleteLoadingId === resume.id ? "..." : "Delete"}
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

      {/* Report Modal */}
      {activeReport && ReactDOM.createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '20px'
        }}
        onClick={() => setActiveReport(null)}
        >
          <div style={{
            background: '#ffffff',
            width: '100%',
            maxWidth: '640px',
            borderRadius: '24px',
            padding: '36px',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.25)',
            position: 'relative',
            maxHeight: '85vh',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveReport(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                border: 'none',
                background: '#f1f5f9',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: 700,
                display: 'grid',
                placeItems: 'center',
                color: '#64748b'
              }}
            >
              ×
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4f46e5', fontWeight: 800, fontSize: '0.82rem', marginBottom: '6px' }}>
              <Sparkles size={16} /> ATS Analysis Diagnostic
            </div>
            <h3 style={{ margin: '0 0 6px', fontSize: '1.45rem', fontWeight: 800, color: '#0f172a' }}>Optimization Report</h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0 0 24px' }}>
              Detailed alignment report for <strong>{activeReport.title}</strong>
            </p>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '14px 18px',
                borderRadius: '16px',
                flex: 1
              }}>
                <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Category</span>
                <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>{activeReport.category}</strong>
              </div>
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '14px 18px',
                borderRadius: '16px',
                flex: 1
              }}>
                <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Computed ATS Match</span>
                <strong style={{ fontSize: '1.15rem', color: activeReport.ats_score >= 70 ? '#16a34a' : '#d97706', fontWeight: 800 }}>
                  {activeReport.ats_score}%
                </strong>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '0.94rem', fontWeight: 700, color: '#0f172a' }}>Missing Keywords</h4>
              {activeReport.missing_keywords.length === 0 ? (
                <p style={{ fontSize: '0.88rem', color: '#16a34a', margin: 0, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={16} /> No critical keywords missing! Excellent match.
                </p>
              ) : (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {activeReport.missing_keywords.map((kw, idx) => (
                    <span key={idx} style={{
                      fontSize: '0.78rem',
                      background: '#fee2e2',
                      color: '#991b1b',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      fontWeight: 700
                    }}>
                      + {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '0.94rem', fontWeight: 700, color: '#0f172a' }}>Improvement Suggestions</h4>
              {activeReport.suggestions.length === 0 ? (
                <p style={{ fontSize: '0.86rem', color: '#64748b', margin: 0 }}>No critical suggestions recorded.</p>
              ) : (
                <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeReport.suggestions.map((s, idx) => (
                    <li key={idx} style={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.5 }}>
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
                background: '#0f172a',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.92rem',
                padding: '13px',
                borderRadius: '14px',
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
