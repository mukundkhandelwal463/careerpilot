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
  UploadCloud,
  Clock,
  Trash2,
  X,
  ArrowRight,
  FileCheck2,
  AlertCircle,
  FileUp
} from 'lucide-react';
import '../css/style.css';

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
    <div className="page-shell">
      <LoadingOverlay
        isOpen={loading}
        variant="scan"
        title="Analyzing Resume"
        subtitle={file ? `Evaluating ${file.name} against ATS benchmark criteria` : 'Running career alignment analysis'}
        steps={[
          'Extracting document structure & text...',
          'Matching skills against ATS keyword density...',
          'Evaluating job description relevance...',
          'Preparing detailed score report...'
        ]}
      />
      <Navbar />

      <main 
        className="page" 
        style={{ 
          width: '100%', 
          maxWidth: '1440px', 
          margin: '24px auto 60px', 
          padding: '0 24px', 
          boxSizing: 'border-box' 
        }}
      >
        {/* Page Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            margin: '0 0 8px',
            lineHeight: 1.2
          }}>
            ATS Resume Analyzer
          </h1>
          <p style={{
            margin: 0,
            fontSize: '1rem',
            color: 'var(--muted)',
            maxWidth: '760px',
            lineHeight: 1.55
          }}>
            Scan your resume against target job descriptions to identify missing keywords, evaluate formatting, and optimize your ATS match score.
          </p>
        </div>

        {/* Main Grid: Sidebar + Content */}
        <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>
          
          {/* Left Navigation Sidebar */}
          <aside style={{
            width: '260px',
            flexShrink: 0,
            background: 'var(--surface)',
            border: '1px solid rgba(24, 35, 38, 0.08)',
            borderRadius: '20px',
            padding: '20px 16px',
            boxShadow: 'var(--shadow)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            position: 'sticky',
            top: '90px'
          }}>
            <div style={{ padding: '0 8px 12px', borderBottom: '1px solid rgba(24, 35, 38, 0.08)', marginBottom: '4px' }}>
              <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--text)' }}>ATS Toolkit</strong>
              <span style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>Optimizers & History</span>
            </div>

            <button 
              onClick={() => setActiveTab('analyze')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '11px 16px',
                border: 'none',
                borderRadius: '14px',
                background: activeTab === 'analyze' ? 'var(--surface-dark)' : 'transparent',
                color: activeTab === 'analyze' ? '#ffffff' : 'var(--text)',
                fontSize: '0.9rem',
                fontWeight: 700,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <BarChart3 size={17} />
              <span>Analyze Resume</span>
            </button>

            <button 
              onClick={() => setActiveTab('records')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '11px 16px',
                border: 'none',
                borderRadius: '14px',
                background: activeTab === 'records' ? 'var(--surface-dark)' : 'transparent',
                color: activeTab === 'records' ? '#ffffff' : 'var(--text)',
                fontSize: '0.9rem',
                fontWeight: 700,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Clock size={17} />
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
          </aside>

          {/* Right Main Content Card */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {activeTab === 'analyze' ? (
              <div style={{
                background: 'var(--surface)',
                border: '1px solid rgba(24, 35, 38, 0.08)',
                borderRadius: '24px',
                padding: '32px 36px',
                boxShadow: 'var(--shadow)'
              }}>
                <form id="analyzeForm" onSubmit={handleSubmit}>
                  
                  {/* Step 1: Upload Resume Box */}
                  <div style={{ marginBottom: '24px' }}>
                    {!file ? (
                      <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('resumeFile').click()}
                        style={{
                          border: dragover ? '2px dashed var(--accent)' : '2px dashed rgba(201, 100, 66, 0.4)',
                          borderRadius: '18px',
                          padding: '40px 24px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          background: dragover ? 'rgba(201, 100, 66, 0.04)' : '#faf9f5',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <div style={{
                          marginBottom: '12px',
                          color: 'var(--accent)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <FileUp size={40} />
                        </div>

                        <div style={{ fontSize: '1rem', color: 'var(--text)', marginBottom: '4px' }}>
                          Drag & drop your resume here, or <strong style={{ color: 'var(--accent)' }}>click to browse</strong>
                        </div>

                        <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>
                          Supports PDF, DOCX, and TXT files (up to 10 MB)
                        </p>
                      </div>
                    ) : (
                      /* Attached File Banner */
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 20px',
                        background: '#faf9f5',
                        border: '1.5px solid rgba(201, 100, 66, 0.3)',
                        borderRadius: '16px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            background: 'rgba(201, 100, 66, 0.12)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--accent)'
                          }}>
                            <FileCheck2 size={24} />
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <strong style={{ fontSize: '0.96rem', color: 'var(--text)' }}>{file.name}</strong>
                              <span style={{
                                padding: '2px 8px',
                                borderRadius: '999px',
                                background: 'rgba(94, 163, 151, 0.15)',
                                color: 'var(--teal)',
                                fontSize: '0.72rem',
                                fontWeight: 700
                              }}>
                                Attached
                              </span>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                              {formatFileSize(file.size)}
                            </span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => document.getElementById('resumeFile').click()}
                            style={{
                              padding: '7px 14px',
                              background: '#ffffff',
                              border: '1px solid rgba(24, 35, 38, 0.15)',
                              borderRadius: '10px',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              color: 'var(--text)',
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
                              padding: '7px',
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

                  {/* Step 2: Category / Stream */}
                  <div style={{ marginBottom: '22px' }}>
                    <label 
                      htmlFor="streamCategory" 
                      style={{ 
                        display: 'block', 
                        fontSize: '0.92rem', 
                        fontWeight: 600, 
                        color: 'var(--text)', 
                        marginBottom: '8px' 
                      }}
                    >
                      Category / Stream (optional)
                    </label>
                    <input 
                      id="streamCategory" 
                      type="text" 
                      value={streamCategory}
                      onChange={(e) => setStreamCategory(e.target.value)}
                      placeholder="Example: Data Science, DevOps, HR, Marketing" 
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#ffffff',
                        border: '1px solid rgba(24, 35, 38, 0.14)',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        color: 'var(--text)',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Step 3: Target Job Description */}
                  <div style={{ marginBottom: '28px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label 
                        htmlFor="jobDescription" 
                        style={{ 
                          fontSize: '0.92rem', 
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
                            fontSize: '0.78rem',
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
                            fontSize: '0.78rem',
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
                          placeholder="Paste the full job description here for a precise ATS match score..." 
                          style={{
                            width: '100%',
                            minHeight: '150px',
                            padding: '14px 16px',
                            background: '#ffffff',
                            border: '1px solid rgba(24, 35, 38, 0.14)',
                            borderRadius: '14px',
                            fontSize: '0.9rem',
                            color: 'var(--text)',
                            outline: 'none',
                            boxSizing: 'border-box',
                            fontFamily: 'inherit',
                            lineHeight: 1.5,
                            resize: 'vertical'
                          }}
                        />
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
                              borderRadius: '14px',
                              padding: '28px 20px',
                              textAlign: 'center',
                              cursor: 'pointer',
                              background: '#faf9f5',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <FileText size={28} style={{ color: 'var(--accent)', marginBottom: '8px' }} />
                            <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
                              Drop JD document here, or <span style={{ color: 'var(--accent)', textDecoration: 'underline' }}>click to select</span>
                            </div>
                            <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Supports .pdf, .docx, .txt</span>
                          </div>
                        ) : (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '14px 18px',
                            background: '#faf9f5',
                            border: '1.5px solid rgba(201, 100, 66, 0.3)',
                            borderRadius: '14px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <FileCheck2 size={22} style={{ color: 'var(--accent)' }} />
                              <div>
                                <strong style={{ fontSize: '0.9rem', color: 'var(--text)', display: 'block' }}>{jdFile.name}</strong>
                                <span style={{ fontSize: '0.76rem', color: 'var(--muted)' }}>{formatFileSize(jdFile.size)} · Job description attached</span>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                type="button"
                                onClick={() => document.getElementById('jdFile').click()}
                                style={{
                                  padding: '5px 12px',
                                  background: '#ffffff',
                                  border: '1px solid rgba(24, 35, 38, 0.15)',
                                  borderRadius: '8px',
                                  fontSize: '0.78rem',
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
                                  borderRadius: '8px',
                                  color: '#dc2626',
                                  cursor: 'pointer'
                                }}
                              >
                                <Trash2 size={15} />
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

                    {/* Quick upload alternative if in paste mode */}
                    {jdMode === 'paste' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px' }}>
                        <span style={{ fontSize: '0.84rem', color: 'var(--muted)', fontWeight: 500 }}>Or upload JD file:</span>
                        <button 
                          type="button" 
                          onClick={() => document.getElementById('quickJdFile').click()} 
                          style={{
                            background: '#ffffff',
                            border: '1px solid rgba(24, 35, 38, 0.15)',
                            borderRadius: '10px',
                            padding: '6px 14px',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            color: 'var(--text)'
                          }}
                        >
                          Choose File (.pdf, .docx, .txt)
                        </button>
                        <input 
                          type="file" 
                          id="quickJdFile" 
                          accept=".pdf,.docx,.txt" 
                          style={{ display: 'none' }}
                          onChange={handleJdFileChange}
                        />
                        {jdFile && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--teal)', fontWeight: 600 }}>
                            <Check size={14} /> {jdFile.name}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Primary CTA Submit Button */}
                  <button 
                    type="submit" 
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '15px 28px',
                      borderRadius: '14px',
                      background: 'var(--accent)',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '1rem',
                      fontWeight: 700,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      boxShadow: '0 4px 14px rgba(201, 100, 66, 0.28)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{loading ? 'Analyzing Resume...' : 'Analyze Match & Get AI Career Map'}</span>
                  </button>
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
              /* Records Tab */
              <div style={{
                background: 'var(--surface)',
                border: '1px solid rgba(24, 35, 38, 0.08)',
                borderRadius: '24px',
                padding: '32px 36px',
                boxShadow: 'var(--shadow)',
                minHeight: '380px'
              }}>
                <div style={{ marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 6px' }}>
                    Previous Records
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)' }}>
                    Review past resume evaluations and computed ATS match scores.
                  </p>
                </div>

                {!user ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 20px', textAlign: 'center' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(201, 100, 66, 0.12)', display: 'grid', placeItems: 'center', color: 'var(--accent)', marginBottom: '14px' }}>
                      <Lock size={24} />
                    </div>
                    <h3 style={{ margin: '0 0 6px', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)' }}>Authentication Required</h3>
                    <p style={{ margin: '0 0 20px', fontSize: '0.88rem', color: 'var(--muted)', maxWidth: '360px' }}>
                      Sign in to your account to securely store and view historical ATS resume scans.
                    </p>
                    <Link to="/login" style={{
                      padding: '11px 26px',
                      borderRadius: '12px',
                      background: 'var(--accent)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      textDecoration: 'none'
                    }}>
                      Sign In / Create Account
                    </Link>
                  </div>
                ) : resumesLoading ? (
                  <div style={{ display: 'grid', placeItems: 'center', padding: '50px 0' }}>
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Loading records...</p>
                  </div>
                ) : resumes.length === 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 20px', textAlign: 'center' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(24, 35, 38, 0.05)', display: 'grid', placeItems: 'center', color: 'var(--muted)', marginBottom: '14px' }}>
                      <FileText size={24} />
                    </div>
                    <h3 style={{ margin: '0 0 6px', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>No Resumes Screened Yet</h3>
                    <p style={{ margin: '0 0 20px', fontSize: '0.86rem', color: 'var(--muted)', maxWidth: '360px' }}>
                      Once you analyze your resume against a target job description, your detailed records will appear here.
                    </p>
                    <button
                      onClick={() => setActiveTab('analyze')}
                      style={{
                        padding: '11px 24px',
                        borderRadius: '12px',
                        background: 'var(--surface-dark)',
                        color: 'white',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.86rem',
                        cursor: 'pointer'
                      }}
                    >
                      Scan Your First Resume
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                          padding: '16px 20px',
                          borderRadius: '16px',
                          border: '1px solid rgba(24, 35, 38, 0.06)',
                          gap: '14px'
                        }}>
                          <div>
                            <strong style={{ display: 'block', fontSize: '0.94rem', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {resume.title}
                            </strong>
                            <span style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>
                              Scanned on {resume.created_at ? new Date(resume.created_at).toLocaleDateString() : 'Recent'}
                            </span>
                          </div>

                          <div>
                            <span style={{ 
                              fontSize: '0.78rem', 
                              background: '#ffffff', 
                              padding: '4px 10px', 
                              borderRadius: '8px', 
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
                            <span style={{ fontSize: '0.72rem', color: 'var(--muted)', display: 'block', fontWeight: 600 }}>ATS Score</span>
                            <strong style={{
                              fontSize: '1.1rem',
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
                                border: '1px solid rgba(24, 35, 38, 0.15)',
                                background: '#ffffff',
                                color: 'var(--text)',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                padding: '7px 12px',
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
                                border: '1px solid rgba(201, 100, 66, 0.3)',
                                background: 'rgba(201, 100, 66, 0.08)',
                                color: 'var(--accent)',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                padding: '7px 14px',
                                borderRadius: '10px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px'
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
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                padding: '7px 12px',
                                borderRadius: '10px'
                              }}
                            >
                              <Trash2 size={14} />
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
            padding: '32px',
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
                top: '20px',
                right: '20px',
                border: 'none',
                background: 'rgba(24, 35, 38, 0.06)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: 700,
                display: 'grid',
                placeItems: 'center',
                color: 'var(--muted)'
              }}
            >
              ×
            </button>

            <h3 style={{ margin: '0 0 6px', fontSize: '1.35rem', fontWeight: 700, color: 'var(--text)' }}>Optimization Report</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.86rem', margin: '0 0 20px' }}>
              Detailed alignment report for <strong>{activeReport.title}</strong>
            </p>

            <div style={{ display: 'flex', gap: '14px', marginBottom: '20px' }}>
              <div style={{
                background: '#faf9f5',
                border: '1px solid rgba(24, 35, 38, 0.08)',
                padding: '12px 16px',
                borderRadius: '14px',
                flex: 1
              }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Category</span>
                <strong style={{ fontSize: '1rem', color: 'var(--text)' }}>{activeReport.category}</strong>
              </div>
              <div style={{
                background: '#faf9f5',
                border: '1px solid rgba(24, 35, 38, 0.08)',
                padding: '12px 16px',
                borderRadius: '14px',
                flex: 1
              }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Computed ATS Match</span>
                <strong style={{ fontSize: '1.1rem', color: activeReport.ats_score >= 70 ? '#16a34a' : '#d97706', fontWeight: 800 }}>
                  {activeReport.ats_score}%
                </strong>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)' }}>Missing Keywords</h4>
              {activeReport.missing_keywords.length === 0 ? (
                <p style={{ fontSize: '0.86rem', color: '#16a34a', margin: 0, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={16} /> No critical keywords missing.
                </p>
              ) : (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {activeReport.missing_keywords.map((kw, idx) => (
                    <span key={idx} style={{
                      fontSize: '0.78rem',
                      background: '#fee2e2',
                      color: '#991b1b',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontWeight: 600
                    }}>
                      + {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)' }}>Improvement Suggestions</h4>
              {activeReport.suggestions.length === 0 ? (
                <p style={{ fontSize: '0.84rem', color: 'var(--muted)', margin: 0 }}>No critical suggestions recorded.</p>
              ) : (
                <ul style={{ paddingLeft: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeReport.suggestions.map((s, idx) => (
                    <li key={idx} style={{ fontSize: '0.84rem', color: 'var(--text)', lineHeight: 1.5 }}>
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
                fontSize: '0.9rem',
                padding: '12px',
                borderRadius: '12px',
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
