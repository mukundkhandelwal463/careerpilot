import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import '../css/style.css';

const MakerOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page" style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--accent-deep)', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Step 3 • Build Your Resume
        </p>
        <h1 style={{ maxWidth: 'none' }}>Choose Your Builder</h1>
        <p style={{ color: 'var(--muted)', maxWidth: '48ch', margin: '0 auto', lineHeight: 1.7 }}>
          Pick the method that works best for you to create your professional, ATS-optimized resume.
        </p>

        <div className="maker-grid">
          {/* Form Builder Card */}
          <div className="maker-card maker-card--form" onClick={() => navigate('/app/builder/default')}>
            <div className="card-icon">📝</div>
            <h2>Form Builder</h2>
            <p>
              Fill out a structured form with live preview. Pick templates, colors, and fonts — download a polished DOCX/PDF instantly.
            </p>
          </div>

          {/* Chatbot Card */}
          <div className="maker-card maker-card--chat" onClick={() => navigate('/chatbot')} style={{ opacity: 1, cursor: 'pointer' }}>
            <span className="badge-upcoming" style={{ background: 'linear-gradient(135deg, var(--accent), #ff8f57)' }}>Active</span>
            <div className="card-icon">🤖</div>
            <h2>AI Chatbot Builder</h2>
            <p>
              Answer guided questions and let our AI assemble a perfectly structured resume for you — conversationally.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MakerOptions;
