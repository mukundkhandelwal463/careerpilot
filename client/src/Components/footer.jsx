import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, HelpCircle, FileText, Briefcase, Award, Github, Linkedin, Mail, AlertTriangle, MessageSquare, Terminal, Code2, ShieldCheck, FileCode } from 'lucide-react';

const Footer = () => {
  const googleFormReportUrl = "https://forms.gle/tyv5pqaYjGpbrT8c7";
  const googleFormFeedbackUrl = "https://forms.gle/77srxKxzcddWGdPF7";

  return (
    <footer style={{
      background: '#090d16',
      color: '#94a3b8',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '64px 40px 40px',
      fontSize: '0.88rem',
      fontFamily: '"Manrope", sans-serif',
      width: '100%',
      marginTop: '60px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '50px',
        marginBottom: '48px'
      }}>
        {/* Brand & Developer Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ffffff' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #ff6b4a, #ff8f57)',
              display: 'grid', placeItems: 'center', fontWeight: 800, color: '#ffffff',
              boxShadow: '0 4px 14px rgba(255, 107, 74, 0.35)', fontSize: '1.2rem'
            }}>
              🚀
            </div>
            <div>
              <strong style={{ fontSize: '1.3rem', letterSpacing: '-0.02em', color: '#ffffff', display: 'block', lineHeight: 1.2 }}>
                CareerPilot AI
              </strong>
            </div>
          </div>

          <p style={{ margin: 0, lineHeight: 1.65, fontSize: '0.84rem', color: '#64748b', maxWidth: '320px' }}>
            Empowering candidates worldwide with AI ATS Benchmark Scoring, Voice Mock Interviews, full-length tests, and real-time job search engines.
          </p>

          {/* Contact / Social Links */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
            <a
              href="https://github.com/mukundkhandelwal463"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile"
              style={{
                width: '38px', height: '38px', borderRadius: '10px',
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
              href="https://www.linkedin.com/in/mukund-khandelwal-6a8663283/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile"
              style={{
                width: '38px', height: '38px', borderRadius: '10px',
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
              href="mailto:mukundkhandelwal463@gmail.com"
              title="Send Email"
              style={{
                width: '38px', height: '38px', borderRadius: '10px',
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
          <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 18px', letterSpacing: '0.02em' }}>
            Products & Features
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <li>
              <Link to="/upload" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <Award className="size-4 text-emerald-400" /> ATS Resume Screener
              </Link>
            </li>
            <li>
              <Link to="/preparation" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <Sparkles className="size-4 text-amber-400" /> AI Voice Mock Interview
              </Link>
            </li>
            <li>
              <Link to="/preparation" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <Terminal className="size-4 text-blue-400" /> Full-Length Mock Test
              </Link>
            </li>
            <li>
              <Link to="/app/builder/default" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <Code2 className="size-4 text-purple-400" /> LaTeX Resume Architect
              </Link>
            </li>
            <li>
              <Link to="/jobs" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <Briefcase className="size-4 text-teal-400" /> Live Jobs Search
              </Link>
            </li>
          </ul>
        </div>

        {/* Support & Problem Report Column */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 18px', letterSpacing: '0.02em' }}>
            Support & Legal
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
                <AlertTriangle className="size-4 text-red-500" /> Report a Problem / Issue
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
                <MessageSquare className="size-4 text-sky-400" /> Submit Feature Feedback
              </a>
            </li>
            <li>
              <Link to="/upload" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <FileCode className="size-4 text-indigo-400" /> Terms & Conditions
              </Link>
            </li>
            <li>
              <a
                href="mailto:mukundkhandelwal463@gmail.com"
                style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.2s' }}
                onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}
              >
                <Mail className="size-4 text-rose-400" /> Contact Developer
              </a>
            </li>
          </ul>
        </div>

        {/* Developer Contact Column */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 18px', letterSpacing: '0.02em' }}>
            Developer Contact
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.84rem', color: '#64748b' }}>
            <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem' }}>Mukund Khandelwal</span>
            <span style={{ color: '#94a3b8' }}>Software Engineer & AI Architect</span>
            <a href="mailto:mukundkhandelwal463@gmail.com" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', wordBreak: 'break-all' }}>
              ✉️ mukundkhandelwal463@gmail.com
            </a>
            <a href="https://github.com/mukundkhandelwal463" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🔗 github.com/mukundkhandelwal463
            </a>
            <a href="https://www.linkedin.com/in/mukund-khandelwal-6a8663283/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              💼 linkedin.com/in/mukund-khandelwal
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Policy Bar */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        paddingTop: '24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        fontSize: '0.82rem',
        color: '#64748b'
      }}>
        <span>&copy; {new Date().getFullYear()} CareerPilot. Created by <strong style={{ color: '#e2e8f0' }}>Mukund Khandelwal</strong>. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href={googleFormReportUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#ef4444', textDecoration: 'none', fontWeight: 600 }}>Report Bug</a>
          <Link to="/upload" style={{ color: '#64748b', textDecoration: 'none' }}>Terms & Conditions</Link>
          <Link to="/upload" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
