import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, HelpCircle, FileText, Briefcase, Award, Github, Linkedin, Mail, AlertTriangle, MessageSquare, Terminal, Code2, Layers } from 'lucide-react';

const Footer = () => {
  const googleFormReportUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc_Problem_Report_Form/viewform?usp=sf_link";
  const googleFormFeedbackUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc_Feedback_Form/viewform?usp=sf_link";

  return (
    <footer style={{
      background: '#090d16',
      color: '#94a3b8',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '70px 60px 40px',
      fontSize: '0.88rem',
      fontFamily: '"Manrope", sans-serif',
      width: '100%',
      marginTop: '60px'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '90px',
        marginBottom: '52px'
      }}>
        {/* Brand & Developer Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ffffff' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #ff6b4a, #ff8f57)',
              display: 'grid', placeItems: 'center', fontWeight: 800, color: '#ffffff',
              boxShadow: '0 4px 14px rgba(255, 107, 74, 0.35)', fontSize: '1.25rem'
            }}>
              🚀
            </div>
            <div>
              <strong style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', color: '#ffffff', display: 'block', lineHeight: 1.2 }}>
                CareerPilot AI
              </strong>
            </div>
          </div>

          <p style={{ margin: 0, lineHeight: 1.65, fontSize: '0.84rem', color: '#64748b', maxWidth: '340px' }}>
            Empowering candidates worldwide with AI ATS Benchmark Scoring, Voice Mock Interviews, full-length tests, and real-time job search engines.
          </p>

          {/* Contact / Social Links */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
            <a
              href="https://github.com/mukundkhandelwal463"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile"
              style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                display: 'grid', placeItems: 'center', color: '#e2e8f0',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = '#ff6b4a'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#e2e8f0'; }}
            >
              <Github className="size-4" />
            </a>

            <a
              href="https://linkedin.com/in/mukundkhandelwal463"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile"
              style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                display: 'grid', placeItems: 'center', color: '#e2e8f0',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = '#0077b5'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#e2e8f0'; }}
            >
              <Linkedin className="size-4" />
            </a>

            <a
              href="mailto:mukundkhandelwal23@lpu.in"
              title="Send Email"
              style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                display: 'grid', placeItems: 'center', color: '#e2e8f0',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = '#ea4335'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#e2e8f0'; }}
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>

        {/* Feature / Product Links Column */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 20px', letterSpacing: '0.02em' }}>
            Products & Features
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <li>
              <Link to="/upload" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <Award className="size-4.5 text-emerald-400" /> ATS Resume Screener
              </Link>
            </li>
            <li>
              <Link to="/preparation" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <Sparkles className="size-4.5 text-amber-400" /> AI Voice Mock Interview
              </Link>
            </li>
            <li>
              <Link to="/preparation" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <Terminal className="size-4.5 text-blue-400" /> Full-Length Mock Test
              </Link>
            </li>
            <li>
              <Link to="/app/builder/default" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <Code2 className="size-4.5 text-purple-400" /> LaTeX Resume Architect
              </Link>
            </li>
            <li>
              <Link to="/jobs" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <Briefcase className="size-4.5 text-teal-400" /> Live Jobs Search
              </Link>
            </li>
          </ul>
        </div>

        {/* Support & Problem Report Column */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 20px', letterSpacing: '0.02em' }}>
            Support & Feedback
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <li>
              <a
                href={googleFormReportUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ef4444', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.color = '#f87171'}
                onMouseOut={(e) => e.currentTarget.style.color = '#ef4444'}
              >
                <AlertTriangle className="size-4.5 text-red-500" /> Report a Problem / Issue
              </a>
            </li>
            <li>
              <a
                href={googleFormFeedbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.color = '#ff6b4a'}
                onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
              >
                <MessageSquare className="size-4.5 text-sky-400" /> Submit Feature Feedback
              </a>
            </li>
            <li>
              <Link to="/chatbot" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <HelpCircle className="size-4.5 text-indigo-400" /> AI Resume Assistant
              </Link>
            </li>
            <li>
              <a
                href="mailto:mukundkhandelwal23@lpu.in"
                style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}
              >
                <Mail className="size-4.5 text-rose-400" /> Contact Developer
              </a>
            </li>
          </ul>
        </div>

        {/* Developer & Navigation Column */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 20px', letterSpacing: '0.02em' }}>
            Developer Contact
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem', color: '#64748b' }}>
            <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem' }}>Mukund Khandelwal</span>
            <span style={{ color: '#94a3b8' }}>Software Engineer & AI Architect</span>
            <span style={{ color: '#94a3b8' }}>✉️ mukundkhandelwal23@lpu.in</span>
            <span style={{ color: '#94a3b8' }}>🔗 github.com/mukundkhandelwal463</span>
            <div style={{ marginTop: '10px' }}>
              <Link to="/dashboard" style={{ color: '#ff6b4a', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem' }}>
                Go to Candidate Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Policy Bar */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        paddingTop: '28px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px',
        fontSize: '0.82rem',
        color: '#64748b'
      }}>
        <span>&copy; {new Date().getFullYear()} CareerPilot. Created by <strong style={{ color: '#e2e8f0' }}>Mukund Khandelwal</strong>. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href={googleFormReportUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#ef4444', textDecoration: 'none', fontWeight: 600 }}>Report Bug</a>
          <Link to="/upload" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link to="/upload" style={{ color: '#64748b', textDecoration: 'none' }}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
