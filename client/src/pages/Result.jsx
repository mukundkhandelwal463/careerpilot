import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      <div className="page-shell">
        <Navbar />
        <main className="page" id="resultPage">
          <p style={{ color: 'var(--accent-deep)', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Analysis Complete
          </p>
          <h1>Resume Analysis Result</h1>
          <div id="resultEmpty" className="status info" style={{ display: 'block' }}>
            No analysis result found. Go to Analyze page and submit a resume.
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

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page" id="resultPage">
        <p style={{ color: 'var(--accent-deep)', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Analysis Complete
        </p>
        <h1>Resume Analysis Result</h1>

        <section className="card" style={{ marginBottom: '22px' }}>
          <h2>Summary</h2>
          <div className="result-grid">
            <div className="metric">
              <div className="label">ATS Score</div>
              <div id="atsScore" className="value">
                {isAtsAvailable ? `${ats}%` : 'N/A'}
              </div>
            </div>
            <div className="metric">
              <div className="label">Category</div>
              <div id="category" className="value">
                {analysis.category || 'General'}
              </div>
            </div>
            <div className="metric">
              <div className="label">Detected Skills</div>
              <div id="skills" className="value" style={{ fontSize: '14px', fontWeight: 600 }}>
                {analysis.skills && analysis.skills.length > 0 ? analysis.skills.join(', ') : 'No skills detected'}
              </div>
            </div>
          </div>
        </section>

        <section className="grid two">
          <article className="card">
            <h2>Missing Keywords</h2>
            <ul id="missingKeywords" className="list">
              {analysis.missing_keywords && analysis.missing_keywords.length > 0 ? (
                analysis.missing_keywords.map((k, index) => <li key={index}>{k}</li>)
              ) : (
                <li>No missing keywords found.</li>
              )}
            </ul>
          </article>
          <article className="card">
            <h2>Suggestions</h2>
            <ul id="suggestions" className="list">
              {suggestions.length > 0 ? (
                suggestions.map((s, index) => <li key={index}>{s}</li>)
              ) : (
                <li>No suggestions.</li>
              )}
            </ul>
          </article>
        </section>

        {/* Dynamic Model Router Box */}
        <div 
          id="decisionBox" 
          style={{
            marginTop: '22px',
            padding: '30px',
            borderRadius: 'var(--radius-lg)',
            background: !isAtsAvailable 
              ? '#eef2ff' 
              : ats >= 70 
              ? 'linear-gradient(135deg, rgba(124,214,199,0.15), rgba(255,255,255,0.8))' 
              : '#fff1f2',
            border: !isAtsAvailable 
              ? '1px solid #bfdbfe' 
              : ats >= 70 
              ? '1px solid rgba(124,214,199,0.3)' 
              : '1px solid #fecdd3',
            textAlign: 'center',
            backdropFilter: 'blur(12px)',
            boxShadow: 'var(--shadow)'
          }}
        >
          <h2 id="decisionTitle" style={{ marginTop: 0, fontFamily: '"Sora", sans-serif' }}>
            {!isAtsAvailable 
              ? "ATS score needs a Job Description to calculate." 
              : ats >= 70 
              ? `Great ATS Score (${ats}%)! You're ready to apply!` 
              : `ATS Score is low (${ats}%). We should fix this.`}
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: '18px' }}>
            Our dynamic Model Pipeline determines exactly where you should proceed next.
          </p>
          <button 
            id="decisionBtn" 
            className="btn-primary" 
            onClick={() => handleDecisionClick(ats, isAtsAvailable)}
            style={{ 
              fontSize: '18px', 
              minWidth: '250px',
              background: !isAtsAvailable ? '#2563eb' : ats >= 70 ? '#2563eb' : '#e11d48'
            }}
          >
            {!isAtsAvailable 
              ? "Add Job Description and Re-analyze →" 
              : ats >= 70 
              ? "Proceed to Target Live Jobs →" 
              : "Let's Build a Better Resume! (Model 3) →"}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Result;
