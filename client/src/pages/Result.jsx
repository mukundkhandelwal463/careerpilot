import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Briefcase, 
  Layers, 
  TrendingUp, 
  RefreshCw,
  Award,
  Zap
} from 'lucide-react';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import '../css/style.css';

const Result = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const store = localStorage.getItem("resume_analysis_result");
    if (store) {
      try {
        setAnalysisData(JSON.parse(store));
      } catch (e) {
        console.error("Error parsing analysis result:", e);
      }
    }
  }, []);

  const handleDecisionClick = (ats, isAtsAvailable) => {
    if (!isAtsAvailable) {
      navigate('/upload');
    } else if (ats >= 70) {
      navigate('/jobs');
    } else {
      navigate('/maker_options');
    }
  };

  if (!analysisData) {
    return (
      <div className="page-shell" style={{ background: '#f8fafc', minHeight: '100vh' }}>
        <Navbar />
        <main className="page" id="resultPage" style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '50px', background: '#eff6ff', color: '#2563eb', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>
            <Sparkles size={14} /> Analysis Complete
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '24px', letterSpacing: '-0.02em' }}>Resume Analysis Result</h1>
          <div id="resultEmpty" style={{ background: '#ffffff', borderRadius: '16px', padding: '32px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <FileText size={48} style={{ color: '#94a3b8', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>No Analysis Record Found</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '24px' }}>Upload your CV or resume in the ATS Analyzer to generate real-time metrics.</p>
            <Link to="/upload" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', background: '#2563eb', color: '#ffffff', fontWeight: 700, textDecoration: 'none' }}>
              Analyze CV Now <ArrowRight size={16} />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const analysis = analysisData.analysis || {};
  const isAtsAvailable = analysis.ats_available !== false && typeof analysis.ats_score === 'number';
  const ats = analysis.ats_score ?? 0;

  // Clean suggestions formatting
  const suggestions = (analysis.suggestions || [])
    .flatMap(s => String(s || "").split('\n'))
    .map(line => line.replace(/^[\-\*\d\.\)\s]+/, "").trim())
    .filter(line => line.length > 0)
    .slice(0, 12);

  // Status color variables based on ATS score
  const getScoreColor = (score) => {
    if (score >= 70) return { primary: '#10b981', bg: '#ecfdf5', border: '#a7f3d0', text: '#047857', status: 'ATS Ready & Market Aligned' };
    if (score >= 50) return { primary: '#f59e0b', bg: '#fffbeb', border: '#fde68a', text: '#b45309', status: 'Moderate Alignment - Optimization Advised' };
    return { primary: '#e11d48', bg: '#fff1f2', border: '#fecdd3', text: '#be123c', status: 'Action Required - Keyword Optimization Needed' };
  };

  const scoreTheme = getScoreColor(ats);

  return (
    <div className="page-shell" style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Navbar />
      <main className="page" id="resultPage" style={{ maxWidth: '1140px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Top Header Badge & Title */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '50px', background: '#eff6ff', color: '#2563eb', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
            <Sparkles size={14} /> Analysis Complete · Scorecard Report
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
            Resume Analysis Result
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.98rem', margin: 0 }}>
            Comprehensive evaluation of ATS parser compliance, keyword density, and domain skill alignment.
          </p>
        </div>

        {/* Executive Summary Metrics Grid */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '28px' }}>
          
          {/* ATS Score Metric Card */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative', width: '84px', height: '84px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: scoreTheme.bg, border: `3px solid ${scoreTheme.border}` }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: scoreTheme.primary }}>
                {isAtsAvailable ? `${ats}%` : 'N/A'}
              </span>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                ATS Match Score
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                {isAtsAvailable ? (ats >= 70 ? 'High Match' : ats >= 50 ? 'Medium Match' : 'Low Match') : 'Pending JD'}
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 700, color: scoreTheme.text, background: scoreTheme.bg, padding: '3px 10px', borderRadius: '50px' }}>
                {ats >= 70 ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                {scoreTheme.status}
              </div>
            </div>
          </div>

          {/* Target Role Category Card */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={28} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                Detected Domain Category
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                {analysis.category || 'General Software Engineering'}
              </div>
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 500 }}>
                Matched against tech standards
              </span>
            </div>
          </div>

          {/* Detected Skills Counter Card */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={28} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                Extracted Hard Skills
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                {analysis.skills?.length || 0} Skills Found
              </div>
              <span style={{ fontSize: '0.82rem', color: '#16a34a', fontWeight: 600 }}>
                Parsed in candidate profile
              </span>
            </div>
          </div>

        </section>

        {/* Detected Skills Pill Cloud */}
        {analysis.skills && analysis.skills.length > 0 && (
          <section style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} style={{ color: '#2563eb' }} /> Detected Hard & Soft Skills ({analysis.skills.length})
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {analysis.skills.map((skill, idx) => (
                <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 14px', borderRadius: '50px', background: '#f1f5f9', color: '#334155', fontSize: '0.85rem', fontWeight: 600, border: '1px solid #e2e8f0' }}>
                  <CheckCircle2 size={12} style={{ color: '#10b981' }} /> {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Two Column Grid: Missing Keywords & Suggestions */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '28px' }}>
          
          {/* Missing Keywords Column */}
          <article style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#fff1f2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={20} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Missing High-Yield Keywords</h2>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Critical gaps identified by ATS similarity algorithms</span>
              </div>
            </div>

            {analysis.missing_keywords && analysis.missing_keywords.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {analysis.missing_keywords.map((k, index) => (
                  <span key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '12px', background: '#fff1f2', color: '#be123c', fontSize: '0.85rem', fontWeight: 700, border: '1px solid #fecdd3' }}>
                    + {k}
                  </span>
                ))}
              </div>
            ) : (
              <div style={{ padding: '20px', borderRadius: '12px', background: '#ecfdf5', color: '#047857', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} /> No missing keywords detected! Your resume covers key domain requirements.
              </div>
            )}
          </article>

          {/* AI Suggestions Column */}
          <article style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={20} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>AI Optimization Recommendations</h2>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Actionable improvements to elevate ATS score</span>
              </div>
            </div>

            {suggestions.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {suggestions.map((s, index) => (
                  <div key={index} style={{ padding: '12px 16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #f1f5f9', fontSize: '0.88rem', color: '#334155', lineHeight: '1.5', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Zap size={15} style={{ color: '#2563eb', flexShrink: 0, marginTop: '3px' }} />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: '#64748b', fontSize: '0.9rem', fontStyle: 'italic' }}>No additional suggestions at this time.</div>
            )}
          </article>

        </section>

        {/* Modern Executive Action Center (No "Model 3") */}
        <div 
          id="decisionBox" 
          style={{
            padding: '36px 30px',
            borderRadius: '24px',
            background: !isAtsAvailable 
              ? 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)' 
              : ats >= 70 
              ? 'linear-gradient(135deg, #ecfdf5 0%, #ffffff 100%)' 
              : 'linear-gradient(135deg, #fff1f2 0%, #ffffff 100%)',
            border: !isAtsAvailable 
              ? '1px solid #bfdbfe' 
              : ats >= 70 
              ? '1px solid #a7f3d0' 
              : '1px solid #fecdd3',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
            marginBottom: '40px'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '50px', background: scoreTheme.bg, color: scoreTheme.text, fontSize: '0.82rem', fontWeight: 700, marginBottom: '14px' }}>
            <TrendingUp size={15} /> Recommended Action Center
          </div>

          <h2 id="decisionTitle" style={{ margin: '0 0 10px 0', fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>
            {!isAtsAvailable 
              ? "Add a Target Job Description for Full ATS Scoring" 
              : ats >= 70 
              ? `Outstanding ATS Match (${ats}%)! You're ready to apply.` 
              : `ATS Score requires optimization (${ats}%).`}
          </h2>

          <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '640px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
            {!isAtsAvailable
              ? "Paste a job description in the ATS Analyzer to receive pinpoint TF-IDF similarity vector matching and keyword gap analysis."
              : ats >= 70
              ? "Your resume strongly aligns with tech market requirements. Proceed directly to our real-time live job index to start applying."
              : "Use CareerPilot's Executive Resume Builder to automatically integrate missing keywords and re-format bullet points for maximum ATS readability."}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <button 
              id="decisionBtn" 
              onClick={() => handleDecisionClick(ats, isAtsAvailable)}
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '14px 28px', 
                borderRadius: '14px',
                fontSize: '1rem', 
                fontWeight: 700,
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                background: !isAtsAvailable 
                  ? '#2563eb' 
                  : ats >= 70 
                  ? '#10b981' 
                  : '#e11d48',
                boxShadow: !isAtsAvailable
                  ? '0 6px 20px rgba(37, 99, 235, 0.25)'
                  : ats >= 70
                  ? '0 6px 20px rgba(16, 185, 129, 0.25)'
                  : '0 6px 20px rgba(225, 29, 72, 0.25)'
              }}
            >
              {!isAtsAvailable 
                ? <>Add Job Description & Re-analyze <ArrowRight size={18} /></>
                : ats >= 70 
                ? <>Explore & Apply to Live Tech Jobs <ArrowRight size={18} /></>
                : <>Optimize Resume with Executive Builder <ArrowRight size={18} /></>}
            </button>

            <Link
              to="/upload"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px 24px',
                borderRadius: '14px',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#475569',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                textDecoration: 'none'
              }}
            >
              <RefreshCw size={16} /> Analyze Another CV
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Result;
