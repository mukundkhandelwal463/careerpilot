import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, HelpCircle, FileText, Briefcase, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: '#122023',
      color: '#94a3b8',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '48px 24px 30px',
      fontSize: '0.9rem',
      fontFamily: '"Manrope", sans-serif',
      width: '100%',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }}>
        {/* Branding Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #ff6b4a, #ff8f57)',
              display: 'grid', placeItems: 'center', fontWeight: 800, color: '#ffffff'
            }}>
              AI
            </div>
            <strong style={{ fontSize: '1.1rem', letterSpacing: '-0.02em' }}>AI Resume Platform</strong>
          </div>
          <p style={{ margin: 0, lineHeight: 1.6, fontSize: '0.82rem', color: '#64748b' }}>
            Empowering professionals with Model 4 Intelligent ATS routing, automated resume enhancements, and live job pipelines.
          </p>
        </div>

        {/* Column 1 - Core Services */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 16px' }}>Services</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <Link to="/upload" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }} 
                    onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <Award className="size-4" /> ATS Benchmark
              </Link>
            </li>
            <li>
              <Link to="/maker_options" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <FileText className="size-4" /> Resume Maker Hub
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2 - Career Tools */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 16px' }}>Prep & Jobs</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <Link to="/preparation" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <Sparkles className="size-4" /> Preparation Hub
              </Link>
            </li>
            <li>
              <Link to="/jobs" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <Briefcase className="size-4" /> Live Jobs Pipeline
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Assistance */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 16px' }}>Support</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <Link to="/chatbot" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = '#ff6b4a'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <HelpCircle className="size-4" /> AI Chat Assistant
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        fontSize: '0.8rem',
        color: '#64748b'
      }}>
        <span>&copy; {new Date().getFullYear()} AI Resume Platform. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/upload" style={{ color: '#64748b', textDecoration: 'none' }}>Terms of Service</Link>
          <Link to="/upload" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
