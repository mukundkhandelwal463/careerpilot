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
  const [bestInterviewResult, setBestInterviewResult] = useState(null);
  const [csProgress, setCsProgress] = useState({ dsa: 0, oops: 0, os: 0, dbms: 0, cn: 0, sys: 0 });

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
    // Load profile image: prefer localStorage uploaded photo, then Google OAuth picture, then default
    const savedProfileImg = localStorage.getItem(`candidate_profile_img_${email}`);
    if (savedProfileImg) {
      setProfileImg(savedProfileImg);
    } else if (user.google_picture) {
      setProfileImg(user.google_picture);
    } else if (user.avatar) {
      setProfileImg(user.avatar);
    } else {
      setProfileImg("/candidate_profile.png");
    }

    const savedTasks = localStorage.getItem(`scheduled_tasks_${email}`);
    setScheduledTasks(savedTasks ? JSON.parse(savedTasks) : {});

    const savedRoadmap = localStorage.getItem(`active_career_roadmap_${email}`);
    setCareerRoadmap(savedRoadmap ? JSON.parse(savedRoadmap) : null);

    setTargetRole(localStorage.getItem(`active_target_role_${email}`) || '');

    const savedCount = localStorage.getItem(`best_resume_interview_count_${email}`);
    setInterviewCount(savedCount ? parseInt(savedCount, 10) : 0);

    // Dynamic CS Special Course Progress calculation
    try {
      // 1. DSA Sheet Progress
      let dsaDone = 0;
      const dsaRaw = localStorage.getItem(`dsa_sheet_progress_${email}`);
      if (dsaRaw) {
        const parsed = JSON.parse(dsaRaw);
        dsaDone = Object.values(parsed).filter(Boolean).length;
      }
      const dsaPct = Math.min(100, Math.round((dsaDone / 260) * 100)) || 0;

      // 2. OS Progress
      let osDone = 0;
      const osRaw = localStorage.getItem(`os_tracker_progress_${email}`);
      if (osRaw) {
        const parsed = JSON.parse(osRaw);
        osDone += Object.values(parsed).filter(Boolean).length;
      }
      const osTheoryRaw = localStorage.getItem('completed_os_concepts');
      if (osTheoryRaw) {
        const parsed = JSON.parse(osTheoryRaw);
        if (Array.isArray(parsed)) osDone += parsed.length;
      }
      const osPct = Math.min(100, Math.round((osDone / 25) * 100)) || 0;

      // 3. DBMS Progress
      let dbmsDone = 0;
      const dbmsRaw = localStorage.getItem(`dbms_tracker_progress_${email}`);
      if (dbmsRaw) {
        const parsed = JSON.parse(dbmsRaw);
        dbmsDone += Object.values(parsed).filter(Boolean).length;
      }
      const dbmsTheoryRaw = localStorage.getItem('completed_dbms_concepts');
      if (dbmsTheoryRaw) {
        const parsed = JSON.parse(dbmsTheoryRaw);
        if (Array.isArray(parsed)) dbmsDone += parsed.length;
      }
      const dbmsPct = Math.min(100, Math.round((dbmsDone / 25) * 100)) || 0;

      // 4. CN Progress
      let cnDone = 0;
      const cnRaw = localStorage.getItem(`cn_tracker_progress_${email}`);
      if (cnRaw) {
        const parsed = JSON.parse(cnRaw);
        cnDone += Object.values(parsed).filter(Boolean).length;
      }
      const cnTheoryRaw = localStorage.getItem('completed_cn_concepts');
      if (cnTheoryRaw) {
        const parsed = JSON.parse(cnTheoryRaw);
        if (Array.isArray(parsed)) cnDone += parsed.length;
      }
      const cnPct = Math.min(100, Math.round((cnDone / 25) * 100)) || 0;

      // 5. OOPs Progress
      let oopsDone = 0;
      const oopsRaw = localStorage.getItem(`oops_tracker_progress_${email}`);
      if (oopsRaw) {
        const parsed = JSON.parse(oopsRaw);
        oopsDone += Object.values(parsed).filter(Boolean).length;
      }
      const oopsTheoryRaw = localStorage.getItem('completed_oops_concepts');
      if (oopsTheoryRaw) {
        const parsed = JSON.parse(oopsTheoryRaw);
        if (Array.isArray(parsed)) oopsDone += parsed.length;
      }
      const oopsPct = Math.min(100, Math.round((oopsDone / 25) * 100)) || 0;

      // 6. System Design Progress
      let sysDone = 0;
      const sysRaw = localStorage.getItem(`sys_tracker_progress_${email}`);
      if (sysRaw) {
        const parsed = JSON.parse(sysRaw);
        sysDone += Object.values(parsed).filter(Boolean).length;
      }
      const sysTheoryRaw = localStorage.getItem('completed_sys_concepts');
      if (sysTheoryRaw) {
        const parsed = JSON.parse(sysTheoryRaw);
        if (Array.isArray(parsed)) sysDone += parsed.length;
      }
      const sysPct = Math.min(100, Math.round((sysDone / 25) * 100)) || 0;

      setCsProgress({
        dsa: dsaPct,
        oops: oopsPct,
        cn: cnPct,
        os: osPct,
        dbms: dbmsPct,
        sys: sysPct
      });
    } catch (err) {
      console.error("Error calculating CS course progress:", err);
    }

    const fetchResumes = async () => {
      try {
        const res = await fetch(`/api/resumes?email=${encodeURIComponent(user.email)}`);
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
        const res = await fetch(`/api/results/list?email=${encodeURIComponent(user.email)}`);
        const data = await res.json();
        if (data.success) {
          if (data.tests && data.tests.length > 0) {
            const best = data.tests.reduce((prev, current) => (prev.score > current.score ? prev : current));
            setBestTestResult(best);
          } else {
            setBestTestResult(null);
          }
          if (data.interviews && data.interviews.length > 0) {
            const bestInter = data.interviews.reduce((prev, current) => (prev.score > current.score ? prev : current));
            setBestInterviewResult(bestInter);
          } else {
            setBestInterviewResult(null);
          }
          // Update interview count from DB data
          if (data.total_interviews !== undefined) {
            setInterviewCount(data.total_interviews);
            localStorage.setItem(`best_resume_interview_count_${user.email}`, String(data.total_interviews));
          }
        }
      } catch (err) {
        console.error("Error fetching test results:", err);
      }
    };

    fetchResumes();
    fetchTestResults();
  }, [user, navigate]);

  const handleDownloadPdfReport = async () => {
    if (!user) return;
    try {
      const url = `/api/results/download-complete-report.pdf?id=${encodeURIComponent(user.email)}&dsa=${csProgress.dsa}&oops=${csProgress.oops}&cn=${csProgress.cn}&os=${csProgress.os}&dbms=${csProgress.dbms}&sys=${csProgress.sys}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to download PDF");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'CareerPilot_Complete_Evaluation_Report.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("PDF Download error:", err);
      window.open(`/api/results/download-complete-report.pdf?id=${encodeURIComponent(user.email)}&dsa=${csProgress.dsa}&oops=${csProgress.oops}&cn=${csProgress.cn}&os=${csProgress.os}&dbms=${csProgress.dbms}&sys=${csProgress.sys}`, '_blank');
    }
  };

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
  const interviewReadiness = bestInterviewResult ? Math.round(bestInterviewResult.score) : (user.interview_score ? Math.round(user.interview_score) : 0);
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
        </div>
      </div>
    );
  };

  return (
    <div className="page-shell" style={{ background: '#FAF9F4', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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

          {/* 1. LEFT COLUMN: Profile Card & Download Complete Report */}
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

              {/* Info Area */}
              <div style={{ padding: '20px 24px', background: '#ffffff', borderTop: '1px solid #f1f5f9' }}>
                <h3 style={{ fontSize: '1.11rem', fontWeight: 700, margin: '0 0 4px', color: '#1c2427' }}>
                  {user.full_name || 'Candidate'}
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '10px', fontWeight: 600 }}>
                  {targetRole || user?.target_role || bestResumeItem?.category || ''}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: '#64748b', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                    <svg style={{ flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.mobile || user?.phone || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                    <svg style={{ flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email || 'user@example.com'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Complete Report Card */}
            <div style={{
              background: '#ffffff',
              borderRadius: '28px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              textAlign: 'center'
            }}>
              <div>
                <strong style={{ fontSize: '0.95rem', color: '#1c2427', display: 'block', marginBottom: '4px' }}>Complete Evaluation Report</strong>

              </div>
              <button
                onClick={handleDownloadPdfReport}
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
                <Download className="size-5" /> Download PDF
              </button>
            </div>
          </div>

          {/* 2. MIDDLE COLUMN: Scorecards, Action Center, Best Test Result */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* 3 Scorecard Radials Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {/* Card 1: Best ATS Match */}
              <div style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '20px 16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '190px',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Best ATS Match
                </span>
                {renderRadialGauge(bestAtsScore, '#10b981')}
              </div>

              {/* Card 2: Mock Interview */}
              <div style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '20px 16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '190px',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Mock Interview
                </span>
                {renderRadialGauge(interviewReadiness, '#f5c35c')}
              </div>

              {/* Card 3: Job Fit Match */}
              <div style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '20px 16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '190px',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Job Fit Match
                </span>
                {renderRadialGauge(jobFitScore, '#8b5cf6')}
              </div>
            </div>

            {/* Resume Alignment & Action Center */}
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
                <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#1c2427', margin: 0 }}>
                  Resume Alignment & Action Center
                </h3>
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

            {/* Best Mock Test Result Card */}
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
                    <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Total Score Performance</p>
                  </div>

                  <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {[
                      { name: "Technical MCQs", score: bestTestResult.technical_score, max: 90, color: "#10b981" },
                      { name: "Verbal Reasoning", score: bestTestResult.verbal_score, max: 15, color: "#3b82f6" },
                      { name: "Aptitude", score: bestTestResult.aptitude_score, max: 15, color: "#f5c35c" },
                      { name: "Coding (Easy)", score: bestTestResult.coding_easy_score, max: 30, color: "#8b5cf6" },
                      { name: "Coding (Hard)", score: bestTestResult.coding_hard_score, max: 50, color: "#ec4899" }
                    ].map((sec, idx) => {
                      const pct = Math.min(100, Math.round((sec.score / sec.max) * 100)) || 0;
                      return (
                        <div key={idx}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 600 }}>{sec.name}</span>
                            <strong style={{ fontSize: '0.85rem', color: '#1c2427' }}>{sec.score} / {sec.max} ({pct}%)</strong>
                          </div>
                          <div style={{ width: '100%', height: '7px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{ width: `${pct}%`, height: '100%', background: sec.color, borderRadius: '999px', transition: 'width 0.5s ease' }} />
                          </div>
                        </div>
                      );
                    })}
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

          {/* 3. RIGHT COLUMN: CS Special Course & Preparation Tasks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Computer Science Special Progress */}
            <div style={{
              background: '#1c2427',
              borderRadius: '32px',
              padding: '28px',
              color: '#ffffff',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>CSE Special</h3>
                <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '999px', fontWeight: 700 }}>
                  Active
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { title: "DSA", progress: csProgress.dsa || 0, color: "#10b981" },
                  { title: "OOPs", progress: csProgress.oops || 0, color: "#ec4899" },
                  { title: "Operating System", progress: csProgress.os || 0, color: "#3b82f6" },
                  { title: "Database Management", progress: csProgress.dbms || 0, color: "#f5c35c" },
                  { title: "Computer Networks", progress: csProgress.cn || 0, color: "#8b5cf6" },
                  { title: "System Design", progress: csProgress.sys || 0, color: "#06b6d4" }
                ].map((course, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{course.title}</span>
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700, fontFamily: 'monospace' }}>{course.progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ width: `${course.progress}%`, height: '100%', background: course.color, borderRadius: '999px', transition: 'width 0.5s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation tasks checklist */}
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

              {/* Task list */}
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
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: task.completed ? 'rgba(245,195,92,0.15)' : 'rgba(255,255,255,0.05)',
                          display: 'grid',
                          placeItems: 'center',
                          color: task.completed ? '#f5c35c' : '#94a3b8',
                          flexShrink: 0
                        }}>
                          <CheckSquare className="size-4" />
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                          <strong style={{
                            display: 'block',
                            fontSize: '0.85rem',
                            textDecoration: task.completed ? 'line-through' : 'none',
                            color: task.completed ? '#94a3b8' : '#ffffff'
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

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
