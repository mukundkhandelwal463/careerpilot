import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import '../css/style.css';

const Upload = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('analyze'); // 'analyze' or 'records'
  const [file, setFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [streamCategory, setStreamCategory] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [status, setStatus] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [dragover, setDragover] = useState(false);
  
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
          const res = await fetch('/api/resumes');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file && !(streamCategory.trim() && (jobDescription.trim() || jdFile))) {
      setStatus({ text: "Upload a resume, or provide both Category/Stream and Job Description (paste or file).", type: "error" });
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
      const data = await res.json();
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

      const newNotif = {
        id: Date.now(),
        text: `Scanning complete! Calculated ATS Score: ${data.analysis?.ats_score ?? 'N/A'}%`,
        time: new Date().toLocaleTimeString(),
        read: false
      };
      const currentNotifs = JSON.parse(localStorage.getItem("app_notifications") || "[]");
      const updatedNotifs = [newNotif, ...currentNotifs].slice(0, 10);
      localStorage.setItem("app_notifications", JSON.stringify(updatedNotifs));
      localStorage.setItem("has_unread_notifications", "true");
      
      window.dispatchEvent(new CustomEvent("new_scan_notification", {
        detail: { message: newNotif.text }
      }));

      setStatus({ text: "Analysis complete. Redirecting...", type: "success" });
      setTimeout(() => {
        navigate('/result');
      }, 500);

    } catch (err) {
      setStatus({ text: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page" style={{ marginTop: '24px', display: 'flex', gap: '28px', alignItems: 'flex-start' }}>
        
        {/* Left Sidebar Menu */}
        <aside style={{
          width: '260px',
          flexShrink: 0,
          background: 'rgba(255, 255, 255, 0.72)',
          border: '1px solid rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          padding: '24px 16px',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          position: 'sticky',
          top: '220px',
          marginTop: '40px'
        }}>
          <div style={{ padding: '0 8px 12px', borderBottom: '1px solid rgba(24, 35, 38, 0.08)', marginBottom: '12px' }}>
            <strong style={{ display: 'block', fontSize: '0.94rem', color: 'var(--text)' }}>ATS Toolkit</strong>
            <span style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>Optimizers & History</span>
          </div>

          <button 
            onClick={() => setActiveTab('analyze')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              borderRadius: '16px',
              background: activeTab === 'analyze' ? 'var(--surface-dark)' : 'transparent',
              color: activeTab === 'analyze' ? '#ffffff' : 'var(--text)',
              fontSize: '0.92rem',
              fontWeight: 700,
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>📈</span> Analyze Resume
          </button>

          <button 
            onClick={() => setActiveTab('records')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              borderRadius: '16px',
              background: activeTab === 'records' ? 'var(--surface-dark)' : 'transparent',
              color: activeTab === 'records' ? '#ffffff' : 'var(--text)',
              fontSize: '0.92rem',
              fontWeight: 700,
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>📄</span> Previous Records
          </button>
        </aside>

        {/* Right Content Area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {activeTab === 'analyze' ? (
            <>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 600, color: 'var(--text)', marginBottom: '28px' }}>
                ATS Resume Analyzer
              </h1>
              
              <article className="card" style={{ padding: '32px' }}>
                <form id="analyzeForm" onSubmit={handleSubmit}>
                  <div 
                    className={`drop-zone ${dragover ? 'dragover' : ''}`} 
                    id="dropZone"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('resumeFile').click()}
                  >
                    <div className="icon">📄</div>
                    <div className="label">
                      Drag & drop your resume here, or <strong>click to browse</strong>
                    </div>
                    {file && (
                      <div className="file-name" id="fileName" style={{ display: 'block' }}>
                        ✅ {file.name}
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

                  <label htmlFor="streamCategory">Category / Stream (optional)</label>
                  <input 
                    id="streamCategory" 
                    type="text" 
                    value={streamCategory}
                    onChange={(e) => setStreamCategory(e.target.value)}
                    placeholder="Example: Data Science, DevOps, HR, Marketing" 
                  />

                  <label htmlFor="jobDescription">Target Job Description (optional but recommended)</label>
                  <textarea 
                    id="jobDescription" 
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description here for a precise ATS match score..." 
                    style={{ minHeight: '140px' }}
                  />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', marginBottom: '20px' }}>
                    <span style={{ fontSize: '0.86rem', color: 'var(--muted)', fontWeight: 600 }}>Or upload JD file:</span>
                    <button 
                      type="button" 
                      onClick={() => document.getElementById('jdFile').click()} 
                      style={{
                        background: '#ffffff',
                        border: '1px solid rgba(24, 35, 38, 0.12)',
                        borderRadius: '12px',
                        padding: '6px 14px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        color: 'var(--text)'
                      }}
                    >
                      Choose File (.pdf, .docx, .txt)
                    </button>
                    <input 
                      type="file" 
                      id="jdFile" 
                      accept=".pdf,.docx,.txt" 
                      style={{ display: 'none' }}
                      onChange={handleJdFileChange}
                    />
                    {jdFile && (
                      <span style={{ fontSize: '0.84rem', color: 'var(--teal)', fontWeight: 700 }}>
                        ✅ {jdFile.name}
                      </span>
                    )}
                  </div>

                  <button className="btn-primary" type="submit" style={{ width: '100%', fontSize: '16px', padding: '14px' }} disabled={loading}>
                    {loading ? 'Analyzing...' : 'Analyze Match & Get AI Career Map'}
                  </button>
                </form>

                {status.text && (
                  <div id="status" className={`status ${status.type}`}>
                    {status.text}
                  </div>
                )}
              </article>
            </>
          ) : (
            <>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 600, color: 'var(--text)', marginBottom: '28px' }}>
                Previous Records
              </h1>
              
              <article className="card" style={{ padding: '32px', minHeight: '380px', display: 'flex', flexDirection: 'column' }}>
                {!user ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '40px 20px', textAlign: 'center' }}>
                    <span style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔒</span>
                    <h4 style={{ margin: '0 0 6px', fontSize: '1.1rem', fontWeight: 700 }}>Authentication Required</h4>
                    <p style={{ margin: '0 18px 20px', fontSize: '0.86rem', color: 'var(--muted)', maxWidth: '340px' }}>
                      Sign in to your account to save your resume scans and review historically computed scores.
                    </p>
                    <Link to="/login" className="btn btn-primary" style={{ background: 'var(--accent)', border: 'none', padding: '10px 28px', borderRadius: '999px', fontSize: '0.88rem', fontWeight: 700, color: 'white' }}>
                      Sign In / Create Account
                    </Link>
                  </div>
                ) : resumesLoading ? (
                  <div style={{ display: 'grid', placeItems: 'center', flex: 1 }}>
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Loading records...</p>
                  </div>
                ) : resumes.length === 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '40px 20px', textAlign: 'center' }}>
                    <span style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📄</span>
                    <h4 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 700 }}>No Resumes Screened Yet</h4>
                    <p style={{ margin: '0 18px 20px', fontSize: '0.84rem', color: 'var(--muted)', maxWidth: '340px' }}>
                      Once you analyze your compatibility score against a JD, your analysis records will show up here.
                    </p>
                    <button onClick={() => setActiveTab('analyze')} className="btn btn-primary" style={{ background: '#1c2427', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '999px', fontSize: '0.86rem', fontWeight: 700 }}>
                      Scan First Resume
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {resumes.slice(0, 3).map((resume) => {
                      const hasAts = resume.ats_score !== null && resume.ats_score !== undefined;
                      const rScore = hasAts ? Math.round(resume.ats_score) : 0;
                      
                      return (
                        <div key={resume.id} style={{
                          display: 'grid',
                          gridTemplateColumns: '1.6fr 1fr 0.8fr 2.6fr',
                          alignItems: 'center',
                          background: 'rgba(255, 255, 255, 0.7)',
                          padding: '16px 20px',
                          borderRadius: '20px',
                          border: '1px solid rgba(24, 35, 38, 0.04)',
                          gap: '12px',
                          cursor: 'default'
                        }}
                        >
                          <div>
                            <strong style={{ display: 'block', fontSize: '0.94rem', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {resume.title}
                            </strong>
                            <span style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>
                              Parsed on {resume.created_at ? new Date(resume.created_at).toLocaleDateString() : 'N/A'}
                            </span>
                          </div>

                          <div>
                            <span style={{ 
                              fontSize: '0.8rem', 
                              background: 'rgba(24, 35, 38, 0.05)', 
                              padding: '4px 10px', 
                              borderRadius: '999px', 
                              fontWeight: 600, 
                              color: 'var(--text)',
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
                            <span style={{ fontSize: '0.74rem', color: 'var(--muted)', display: 'block' }}>ATS Score</span>
                            <strong style={{ fontSize: '1.05rem', color: rScore >= 70 ? 'var(--teal)' : 'var(--accent-deep)' }}>
                              {hasAts ? `${rScore}%` : 'N/A'}
                            </strong>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                            <button
                              onClick={(e) => handleDownloadResume(resume, e)}
                              style={{
                                border: '1px solid rgba(24, 35, 38, 0.1)',
                                background: '#ffffff',
                                color: 'var(--text)',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                padding: '6px 10px',
                                borderRadius: '10px'
                              }}
                            >
                              📥 Resume
                            </button>
                            <button
                              onClick={(e) => handleShowReport(resume, e)}
                              style={{
                                border: '1px solid rgba(24, 35, 38, 0.1)',
                                background: '#ffffff',
                                color: 'var(--text)',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                padding: '6px 10px',
                                borderRadius: '10px'
                              }}
                            >
                              💡 Report
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteResume(resume.id, e);
                              }}
                              disabled={deleteLoadingId === resume.id}
                              style={{
                                border: 'none',
                                background: 'transparent',
                                color: 'var(--accent-deep)',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                padding: '6px 8px'
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
              </article>
            </>
          )}
        </div>
      </main>

      {activeReport && ReactDOM.createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(24, 35, 38, 0.5)',
          backdropFilter: 'blur(10px)',
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
            padding: '32px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
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
                background: 'rgba(24, 35, 38, 0.05)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.2rem',
                fontWeight: 700,
                display: 'grid',
                placeItems: 'center',
                color: 'var(--text)'
              }}
            >
              ×
            </button>

            <h3 style={{ margin: '0 0 4px', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)' }}>ATS Optimization Report</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.86rem', margin: '0 0 24px' }}>
              Detailed alignment overview for <strong>{activeReport.title}</strong>
            </p>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                background: 'rgba(24, 35, 38, 0.03)',
                padding: '12px 18px',
                borderRadius: '16px',
                flex: 1
              }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>Category</span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--text)' }}>{activeReport.category}</strong>
              </div>
              <div style={{
                background: 'rgba(24, 35, 38, 0.03)',
                padding: '12px 18px',
                borderRadius: '16px',
                flex: 1
              }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>ATS Score</span>
                <strong style={{ fontSize: '1.1rem', color: activeReport.ats_score >= 70 ? 'var(--teal)' : 'var(--accent-deep)' }}>
                  {activeReport.ats_score}%
                </strong>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '0.94rem', fontWeight: 700, color: 'var(--text)' }}>Missing Keywords</h4>
              {activeReport.missing_keywords.length === 0 ? (
                <p style={{ fontSize: '0.86rem', color: 'var(--teal)', margin: 0, fontWeight: 600 }}>✓ No critical keywords missing!</p>
              ) : (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {activeReport.missing_keywords.map((kw, idx) => (
                    <span key={idx} style={{
                      fontSize: '0.78rem',
                      background: 'rgba(255, 107, 74, 0.08)',
                      color: 'var(--accent-deep)',
                      padding: '6px 12px',
                      borderRadius: '999px',
                      fontWeight: 600
                    }}>
                      {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '0.94rem', fontWeight: 700, color: 'var(--text)' }}>Improvement Suggestions</h4>
              {activeReport.suggestions.length === 0 ? (
                <p style={{ fontSize: '0.86rem', color: 'var(--muted)', margin: 0 }}>No suggestions recorded.</p>
              ) : (
                <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeReport.suggestions.map((s, idx) => (
                    <li key={idx} style={{ fontSize: '0.86rem', color: 'var(--text)', lineHeight: 1.4 }}>
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
                background: 'var(--text)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.92rem',
                padding: '12px',
                borderRadius: '14px',
                cursor: 'pointer'
              }}
            >
              Close Report
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
