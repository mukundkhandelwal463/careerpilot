import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import { 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  Briefcase, 
  Award, 
  Camera, 
  Compass, 
  CheckSquare, 
  User as UserIcon,
  Activity,
  FileText,
  Download,
  Mic,
  Calendar
} from 'lucide-react';
import '../css/style.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  // Accordion toggle states for left options list
  const [openSection, setOpenSection] = useState('resumes'); // 'resumes', 'target', 'benchmarks', 'milestones'

  // Profile picture state
  const [profileImg, setProfileImg] = useState("/candidate_profile.png");

  // Load state from localStorage
  const getLocalDateString = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 10);
  };

  const [scheduledTasks, setScheduledTasks] = useState({});
  const [careerRoadmap, setCareerRoadmap] = useState(null);
  const [targetRole, setTargetRole] = useState('');

  // Track the number of times user has initiated mock interview for their best resume
  const [interviewCount, setInterviewCount] = useState(0);
  const [bestTestResult, setBestTestResult] = useState(null);

  const todayStr = getLocalDateString(new Date());
  const todayTasks = scheduledTasks[todayStr] || [];

  const toggleTodayTask = (taskId) => {
    const updated = { ...scheduledTasks };
    if (updated[todayStr] && user) {
      updated[todayStr] = updated[todayStr].map(t => 
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );
      setScheduledTasks(updated);
      localStorage.setItem(`scheduled_tasks_${user.email}`, JSON.stringify(updated));
    }
  };

  const todayCompletedCount = todayTasks.filter(t => t.completed).length;
  const todayProgressPercent = todayTasks.length > 0 
    ? Math.round((todayCompletedCount / todayTasks.length) * 100)
    : 0;

  // Handle file upload for profile picture
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file && user) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem(`candidate_profile_img_${user.email}`, reader.result);
        setProfileImg(reader.result);
        // Force header update by triggering storage event
        window.dispatchEvent(new Event('storage'));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const email = user.email;
    setProfileImg(localStorage.getItem(`candidate_profile_img_${email}`) || "/candidate_profile.png");
    
    const savedTasks = localStorage.getItem(`scheduled_tasks_${email}`);
    setScheduledTasks(savedTasks ? JSON.parse(savedTasks) : {});
    
    const savedRoadmap = localStorage.getItem(`active_career_roadmap_${email}`);
    setCareerRoadmap(savedRoadmap ? JSON.parse(savedRoadmap) : null);
    
    setTargetRole(localStorage.getItem(`active_target_role_${email}`) || '');
    
    const savedCount = localStorage.getItem(`best_resume_interview_count_${email}`);
    setInterviewCount(savedCount ? parseInt(savedCount, 10) : 0);

    const fetchResumes = async () => {
      try {
        const res = await fetch('/api/resumes');
        const data = await res.json();
        if (data.success) {
          setResumes(data.resumes || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchTestResults = async () => {
      try {
        const res = await fetch('/api/results/list');
        const data = await res.json();
        if (data.success && data.tests && data.tests.length > 0) {
          const best = data.tests.reduce((prev, current) => (prev.score > current.score ? prev : current));
          setBestTestResult(best);
        }
      } catch (err) {
        console.error("Error fetching test results:", err);
      }
    };

    fetchResumes();
    fetchTestResults();
  }, [user, navigate]);

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

  if (!user) return null;

  // Dynamic calculations
  const validScores = resumes.map(r => r.ats_score).filter(s => s !== null && s !== undefined);
  const avgAtsScore = validScores.length ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length) : 0;
  const bestAtsScore = validScores.length ? Math.round(Math.max(...validScores)) : 0; // Fallback to 0% for new user
  const interviewReadiness = user.interview_score ? Math.round(user.interview_score) : 0; // Not Taken represents 0
  const jobFitScore = bestAtsScore ? Math.round(bestAtsScore * 0.95) : 0; // Mapped fallback to 0%
  const targetPositionsCount = resumes.length > 0 ? 203 : 0;

  // Find the highest scoring resume item
  const bestResumeItem = resumes.length > 0 
    ? resumes.reduce((prev, current) => (prev.ats_score > current.ats_score ? prev : current), resumes[0])
    : null;

  // Function to download the highest ATS scoring resume file
  const downloadBestResume = () => {
    if (!bestResumeItem) {
      alert("No scanned resumes available. Please scan a resume first.");
      return;
    }

    try {
      const parsed = JSON.parse(bestResumeItem.resume_json || '{}');
      if (parsed.original_file_b64) {
        const mime = parsed.original_file_name?.endsWith('.pdf') 
          ? 'application/pdf' 
          : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        
        const linkSource = `data:${mime};base64,${parsed.original_file_b64}`;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = parsed.original_file_name || 'best_ats_resume.docx';
        downloadLink.click();
        return;
      }
    } catch (e) {
      console.error("Failed to parse resume json details:", e);
    }

    // Fallback: Download as text blob
    const element = document.createElement("a");
    const file = new Blob([bestResumeItem.resume_text || ''], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${bestResumeItem.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Function to trigger mock interview and track count
  const handleTakeInterview = () => {
    const newCount = interviewCount + 1;
    setInterviewCount(newCount);
    if (user) {
      localStorage.setItem(`best_resume_interview_count_${user.email}`, String(newCount));
    }
    navigate('/preparation');
  };

  // Helper for Circular progress gauge calculation
  const renderRadialGauge = (percentage, strokeColor) => {
    const radius = 38;
    const circ = 2 * Math.PI * radius; // ~238.76
    const isNotTaken = percentage === 0 && strokeColor === '#f5c35c';
    const strokeDashoffset = isNotTaken ? circ : circ - (circ * Math.min(percentage, 100)) / 100;

    return (
      <div style={{ position: 'relative', width: '96px', height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg style={{ transform: 'rotate(-90deg)', width: '96px', height: '96px' }}>
          {/* Track circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="transparent"
            stroke="#f1f5f9"
            strokeWidth="7"
          />
          {/* Progress circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth="7"
            strokeDasharray={circ}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <strong style={{ fontSize: '0.94rem', color: '#1c2427', fontFamily: 'Sora, monospace', fontWeight: 800 }}>
            {isNotTaken ? 'N/A' : `${percentage}%`}
          </strong>
          {isNotTaken && <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Not Taken</span>}
        </div>
      </div>
    );
  };

  return (
    <div className="page-shell" style={{ background: '#FAF9F4', minHeight: '100vh', paddingBottom: '40px' }}>
      <Navbar />

      <main className="page" style={{ marginTop: '48px' }}>
        
        {/* TOP ROW HEADER: TITLE + COMPACT STATS */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '32px',
          borderBottom: '1px solid rgba(28,36,39,0.05)',
          paddingBottom: '20px'
        }}>
          {/* Welcome Text */}
          <div>
            <h1 style={{ fontSize: '2.05rem', fontWeight: 500, fontFamily: 'Sora, sans-serif', color: '#1c2427', margin: 0 }}>
              Welcome in, {user.full_name ? user.full_name.split(' ')[0] : 'Candidate'}
            </h1>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.82rem' }}>
              Your career readiness scorecard dashboard.
            </p>
          </div>

          {/* Stats details (matches image right) */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp className="size-5 text-slate-500" />
              <div>
                <strong style={{ fontSize: '1.23rem', fontFamily: 'Sora', display: 'block', lineHeight: 1 }}>{avgAtsScore}%</strong>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Avg ATS Match</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase className="size-5 text-slate-500" />
              <div>
                <strong style={{ fontSize: '1.23rem', fontFamily: 'Sora', display: 'block', lineHeight: 1 }}>{resumes.length}</strong>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Scanned Resumes</span>
              </div>
            </div>

            {/* Target Positions block removed per user request */}
          </div>
        </div>

        {/* MAIN THREE-COLUMN GRID CONTAINER */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '270px 1fr 310px',
          gap: '24px',
          alignItems: 'start'
        }}>

          {/* 1. LEFT COLUMN: Profile Card & Accordions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Candidate Profile Card */}
            <div style={{
              background: '#ffffff',
              borderRadius: '32px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              position: 'relative'
            }}>
              {/* Photo area with hover trigger */}
              <div 
                onClick={() => fileInputRef.current.click()}
                style={{ 
                  position: 'relative', 
                  height: profileImg && profileImg !== "/candidate_profile.png" ? '240px' : '150px',
                  cursor: 'pointer', 
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: profileImg && profileImg !== "/candidate_profile.png" ? 'transparent' : '#f8fafc',
                  transition: 'height 0.3s'
                }}
                className="group"
              >
                {profileImg && profileImg !== "/candidate_profile.png" ? (
                  <img 
                    src={profileImg} 
                    alt="Profile photo" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'filter 0.3s' }}
                  />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
                      <UserIcon className="size-8 text-slate-400" />
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>No Photo</span>
                  </div>
                )}
                {/* Photo hover overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  gap: '8px',
                  opacity: 0,
                  transition: 'opacity 0.3s'
                }}
                className="hover-overlay"
                >
                  <Camera className="size-6" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Change Photo</span>
                </div>
              </div>

              {/* Hidden file input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleProfileImageChange} 
                accept="image/*" 
                style={{ display: 'none' }}
              />

              {/* Info Area (Text removed from the image itself) */}
              <div style={{ padding: '20px 24px', background: '#ffffff', borderTop: '1px solid #f1f5f9' }}>
                <h3 style={{ fontSize: '1.11rem', fontWeight: 700, margin: '0 0 4px', color: '#1c2427' }}>
                  {user.full_name}
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '10px', fontWeight: 600 }}>
                  {targetRole || 'N/A'}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: '#64748b', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                    <svg style={{ flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.phone || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                    <svg style={{ flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email || 'user@example.com'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Accordion / List Cards widget */}
            <div style={{
              background: '#ffffff',
              borderRadius: '28px',
              padding: '16px 20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              {/* Card 1: Parsed Resumes */}
              <div>
                <button
                  onClick={() => setOpenSection(openSection === 'resumes' ? null : 'resumes')}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: '12px 6px',
                    background: 'none',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    color: '#1c2427',
                    cursor: 'pointer'
                  }}
                >
                  <span>Parsed Resumes ({resumes.length})</span>
                  {openSection === 'resumes' ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </button>
                {openSection === 'resumes' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '4px 6px 12px', maxHeight: '180px', overflowY: 'auto' }}>
                    {resumes.map(r => (
                      <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '8px 12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                          {r.title}
                        </span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb' }}>
                          {r.ats_score ? `${Math.round(r.ats_score)}%` : '0%'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: 0 }} />

              {/* Card 2: Target Role details */}
              <div>
                <button
                  onClick={() => setOpenSection(openSection === 'target' ? null : 'target')}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: '12px 6px',
                    background: 'none',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    color: '#1c2427',
                    cursor: 'pointer'
                  }}
                >
                  <span>Target Role & Domain</span>
                  {openSection === 'target' ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </button>
                {openSection === 'target' && (
                  <div style={{ padding: '4px 6px 12px', fontSize: '0.8rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.11rem' }}>🎯</span>
                      <div>
                        <strong style={{ display: 'block', color: '#334155' }}>{targetRole}</strong>
                        <span>Active tracking &bull; Roadmap set</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: 0 }} />

              {/* Card 3: ATS keyword benchmarks */}
              <div>
                <button
                  onClick={() => setOpenSection(openSection === 'benchmarks' ? null : 'benchmarks')}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: '12px 6px',
                    background: 'none',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    color: '#1c2427',
                    cursor: 'pointer'
                  }}
                >
                  <span>ATS Keyword Match Goals</span>
                  {openSection === 'benchmarks' ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </button>
                {openSection === 'benchmarks' && (
                  <div style={{ padding: '4px 6px 12px', fontSize: '0.8rem', color: '#64748b' }}>
                    Target standard: <strong>Aim for &gt; 70% ATS score</strong> to pass recruiters' automatic pre-screening.
                  </div>
                )}
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: 0 }} />

              {/* Card 4: Interview Ready milestones */}
              <div>
                <button
                  onClick={() => setOpenSection(openSection === 'milestones' ? null : 'milestones')}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: '12px 6px',
                    background: 'none',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    color: '#1c2427',
                    cursor: 'pointer'
                  }}
                >
                  <span>Interview Readiness</span>
                  {openSection === 'milestones' ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </button>
                {openSection === 'milestones' && (
                  <div style={{ padding: '4px 6px 12px', fontSize: '0.8rem', color: '#64748b' }}>
                    Mock Score: <strong>{interviewReadiness ? `${interviewReadiness}%` : 'No mock test yet'}</strong> &bull; Average rating based on technical + HR questions.
                  </div>
                )}
              </div>
            </div>

            {/* Download Complete Report Button in Left Column */}
            <div style={{
              background: '#ffffff',
              borderRadius: '28px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              textAlign: 'center',
              marginTop: '8px'
            }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Get your full evaluation</span>
              <button
                onClick={() => window.open(`/api/results/download-complete-report?id=${user.email}`, '_blank')}
                style={{
                  background: '#1c2427',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(28,36,39,0.1)'
                }}
              >
                <Download className="size-5" /> Download Complete Report
              </button>
            </div>
          </div>

          {/* 2. MIDDLE COLUMN: Scorecard Radials Grid + New Download & Mock Interview Box */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* 2x2 Scorecard Radials Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Card 1: Best ATS Match */}
              <div style={{
                background: '#ffffff',
                borderRadius: '28px',
                padding: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Best ATS Match
                </span>
                {renderRadialGauge(bestAtsScore, '#10b981')}
              </div>

              {/* Card 2: Mock Interview */}
              <div style={{
                background: '#ffffff',
                borderRadius: '28px',
                padding: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Mock Interview
                </span>
                {renderRadialGauge(interviewReadiness, '#f5c35c')}
              </div>

              {/* Card 3: Tasks Progress */}
              <div style={{
                background: '#ffffff',
                borderRadius: '28px',
                padding: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Tasks Progress
                </span>
                {renderRadialGauge(todayProgressPercent, '#3b82f6')}
              </div>

              {/* Card 4: Job Fit Match */}
              <div style={{
                background: '#ffffff',
                borderRadius: '28px',
                padding: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Job Fit Match
                </span>
                {renderRadialGauge(jobFitScore, '#8b5cf6')}
              </div>
            </div>

            {/* NEW BOX: Download & Mock Interview Hub (Fills the blank space!) */}
            <div style={{
              background: '#ffffff',
              borderRadius: '28px',
              padding: '28px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              border: '1px solid rgba(28,36,39,0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#1c2427', margin: '0 0 4px' }}>
                  Resume Alignment & Action Center
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
                  Download your highest-aligned resume matching the <strong>{targetRole}</strong> roadmap, or launch a dynamic mock voice interview simulation.
                </p>
              </div>

              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                gap: '12px',
                textAlign: 'center'
              }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Best ATS Match</span>
                  <strong style={{ fontSize: '0.94rem', color: '#10b981', display: 'block', marginTop: '2px' }}>{bestAtsScore}%</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Best Mock Score</span>
                  <strong style={{ fontSize: '0.94rem', color: '#f5c35c', display: 'block', marginTop: '2px' }}>
                    {interviewReadiness ? `${interviewReadiness}%` : 'N/A'}
                  </strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Interviews Taken</span>
                  <strong style={{ fontSize: '0.94rem', color: '#1c2427', display: 'block', marginTop: '2px' }}>{interviewCount} Attempts</strong>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '4px' }}>
                {/* Download best resume */}
                <button
                  onClick={downloadBestResume}
                  style={{
                    background: '#1c2427',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '12px 16px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(28,36,39,0.1)'
                  }}
                >
                  <Download className="size-4" /> Download Resume
                </button>

                {/* Take mock interview */}
                <button
                  onClick={handleTakeInterview}
                  style={{
                    background: '#f5c35c',
                    color: '#1c2427',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '12px 16px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(245,195,92,0.15)'
                  }}
                >
                  <Mic className="size-4" /> Start Mock Interview
                </button>
              </div>
            </div>

            {/* NEW BOX: Best Mock Test Result */}
            <div style={{
              background: '#ffffff',
              borderRadius: '32px',
              padding: '28px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1c2427', margin: 0 }}>Best Mock Test Result</h2>
                <Award className="size-6 text-emerald-500" />
              </div>
              
              {bestTestResult ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#10b981', fontFamily: 'Sora, monospace' }}>
                      {bestTestResult.score} <span style={{ fontSize: '1.2rem', color: '#94a3b8' }}>/ {bestTestResult.max_score}</span>
                    </span>
                    <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Total Score</p>
                  </div>
                  
                  <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>Technical MCQs</span>
                      <strong style={{ fontSize: '0.9rem', color: '#1c2427' }}>{bestTestResult.technical_score} / 90.0</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>Verbal Reasoning</span>
                      <strong style={{ fontSize: '0.9rem', color: '#1c2427' }}>{bestTestResult.verbal_score} / 15.0</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>Aptitude</span>
                      <strong style={{ fontSize: '0.9rem', color: '#1c2427' }}>{bestTestResult.aptitude_score} / 15.0</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>Coding (Easy)</span>
                      <strong style={{ fontSize: '0.9rem', color: '#1c2427' }}>{bestTestResult.coding_easy_score} / 30.0</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>Coding (Hard)</span>
                      <strong style={{ fontSize: '0.9rem', color: '#1c2427' }}>{bestTestResult.coding_hard_score} / 50.0</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px', background: '#f8fafc', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>
                    No mock test results found. Take a test in the Preparation Hub!
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* 3. RIGHT COLUMN: Detailed Career Map & Dynamic Tasks Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Detailed Career Map Card */}
            <div style={{
              background: '#ffffff',
              borderRadius: '28px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1c2427', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Compass className="size-4 text-slate-500" /> Career Map
                </span>
                <span style={{ fontSize: '0.8rem', background: '#eff6ff', color: '#3b82f6', padding: '2px 8px', borderRadius: '999px', fontWeight: 700 }}>
                  Active Path
                </span>
              </div>

              {/* Detailed roadmap level blocks */}
              {careerRoadmap ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {careerRoadmap.levels?.slice(0, 3).map((lvl, idx) => (
                    <div key={idx} style={{ 
                      background: '#f8fafc', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '16px', 
                      padding: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1c2427' }}>
                          Level {lvl.level || idx + 1}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                          {lvl.duration}
                        </span>
                      </div>
                      <strong style={{ fontSize: '0.8rem', color: '#1e293b' }}>{lvl.title}</strong>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', lineHeight: 1.3 }}>
                        {lvl.focus}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px 10px', border: '1px dashed #cbd5e1', borderRadius: '16px' }}>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.8rem', fontStyle: 'italic' }}>
                    No Career Map loaded. Generate your path in <Link to="/preparation" style={{ color: '#3b82f6', fontWeight: 700 }}>Preparation Hub</Link>.
                  </p>
                </div>
              )}
            </div>

            {/* Dark Preparation tasks list */}
            <div style={{
              background: '#1c2427',
              borderRadius: '32px',
              padding: '24px',
              color: '#ffffff',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                <span style={{ fontSize: '0.87rem', fontWeight: 700 }}>Preparation Tasks</span>
                <strong style={{ fontSize: '1.11rem', fontFamily: 'monospace', color: '#f5c35c' }}>
                  {todayCompletedCount}/{todayTasks.length}
                </strong>
              </div>

              {/* Task list with circular checked badges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {todayTasks.length > 0 ? (
                  todayTasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => toggleTodayTask(task.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '16px',
                        padding: '12px 16px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        color: '#ffffff',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* Circle custom icon */}
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.1)',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: '10px'
                        }}>
                          📋
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                          <strong style={{ 
                            display: 'block', 
                            fontSize: '0.8rem',
                            textDecoration: task.completed ? 'line-through' : 'none',
                            color: task.completed ? '#6b7280' : '#ffffff',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '150px'
                          }}>
                            {task.text}
                          </strong>
                          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Today &bull; Target</span>
                        </div>
                      </div>

                      {/* Right circular check badge */}
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: '2px solid #6b7280',
                        borderColor: task.completed ? '#f5c35c' : '#6b7280',
                        background: task.completed ? '#f5c35c' : 'transparent',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: '9px',
                        color: '#1c2427',
                        fontWeight: 'bold',
                        flexShrink: 0
                      }}>
                        {task.completed && '✓'}
                      </div>
                    </button>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px 10px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '16px' }}>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.8rem', fontStyle: 'italic' }}>
                      No tasks scheduled for today. Add goals in <Link to="/preparation" style={{ color: '#f5c35c', fontWeight: 700 }}>Task Tracker</Link>.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* NEW BOX: Computer Science Special Progress */}
            <div style={{
              background: '#1c2427',
              borderRadius: '32px',
              padding: '28px',
              color: '#ffffff',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>CS Special Course</h3>
                <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '999px', fontWeight: 700 }}>
                  Active
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { title: "Data Structures & Algorithms", progress: 85, color: "#10b981" },
                  { title: "Operating Systems", progress: 60, color: "#3b82f6" },
                  { title: "Database Management", progress: 40, color: "#f5c35c" },
                  { title: "Computer Networks", progress: 25, color: "#8b5cf6" }
                ].map((course, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{course.title}</span>
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700, fontFamily: 'monospace' }}>{course.progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ width: `${course.progress}%`, height: '100%', background: course.color, borderRadius: '999px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
