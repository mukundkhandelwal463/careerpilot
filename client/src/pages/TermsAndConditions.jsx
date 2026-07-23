import React from 'react';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import { ShieldCheck, Lock, UserCheck, EyeOff, FileText, Cpu, Mail, Globe, Server, CheckCircle2 } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="page-shell" style={{ background: '#FAF9F4', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ maxWidth: '1000px', margin: '48px auto 60px', padding: '0 24px', width: '100%', flex: 1 }}>
        {/* Page Header */}
        <div style={{
          background: 'linear-gradient(135deg, #090d16 0%, #121a2d 100%)',
          borderRadius: '24px',
          padding: '40px 36px',
          color: '#ffffff',
          marginBottom: '36px',
          boxShadow: '0 12px 32px rgba(9, 13, 22, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #ff6b4a, #ff8f57)',
              display: 'grid', placeItems: 'center', color: '#ffffff'
            }}>
              <ShieldCheck className="size-6" />
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ff8f57', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Legal Transparency & Data Protection
            </span>
          </div>

          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.02em', color: '#ffffff' }}>
            Terms & Conditions and Privacy Policy
          </h1>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '780px' }}>
            Learn about CareerPilot AI, how our career evaluation services operate, how your user data is processed, and our strict zero-data-selling guarantee.
          </p>
        </div>

        {/* Section 1: About Who We Are */}
        <section style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '28px',
          border: '1px solid rgba(28, 36, 39, 0.08)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Globe className="size-5 text-amber-500" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#1c2427', margin: 0 }}>
              1. About CareerPilot AI
            </h2>
          </div>
          <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.92rem', margin: '0 0 16px' }}>
            <strong>CareerPilot AI</strong> is a full-stack career intelligence platform created and maintained by <strong>Mukund Khandelwal</strong> (<a href="mailto:mukundkhandelwal463@gmail.com" style={{ color: '#ff6b4a', textDecoration: 'none', fontWeight: 600 }}>mukundkhandelwal463@gmail.com</a>).
          </p>
          <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.92rem', margin: 0 }}>
            Our platform provides automated candidate career preparation tools, including:
          </p>
          <ul style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.8, paddingLeft: '20px', marginTop: '10px', marginBottom: 0 }}>
            <li>Model-4 Intelligent ATS Resume Screener and skill gap benchmarking.</li>
            <li>Interactive AI Voice Mock Interview Assistant with real-time audio evaluation.</li>
            <li>Full-length technical, aptitude, and coding assessments.</li>
            <li>LaTeX Resume Architect with instant document compilation.</li>
            <li>Real-time automated job recommendations.</li>
          </ul>
        </section>

        {/* Section 2: User Data Processing & Storage */}
        <section style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '28px',
          border: '1px solid rgba(28, 36, 39, 0.08)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Server className="size-5 text-blue-500" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#1c2427', margin: 0 }}>
              2. What User Data We Collect & Where It Is Used
            </h2>
          </div>
          <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.92rem', margin: '0 0 16px' }}>
            To deliver personalized career feedback and dashboard analytics, we collect and process the following data points:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '16px' }}>
            <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '20px', border: '1px solid #e2e8f0' }}>
              <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px', fontSize: '0.95rem' }}>
                👤 Account Profile Information
              </strong>
              <p style={{ color: '#64748b', fontSize: '0.86rem', margin: 0, lineHeight: 1.6 }}>
                Your full name and email address are used strictly to authenticate your account, secure your Candidate Dashboard, and calculate personalized assessment history.
              </p>
            </div>

            <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '20px', border: '1px solid #e2e8f0' }}>
              <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px', fontSize: '0.95rem' }}>
                📄 Uploaded Resumes & Documents
              </strong>
              <p style={{ color: '#64748b', fontSize: '0.86rem', margin: 0, lineHeight: 1.6 }}>
                Uploaded PDF/DOCX resumes are parsed on secure backend servers to extract skills, calculate ATS match percentages, generate LaTeX code, and offer job matches.
              </p>
            </div>

            <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '20px', border: '1px solid #e2e8f0' }}>
              <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px', fontSize: '0.95rem' }}>
                🎙️ Voice Interview Audio & Scores
              </strong>
              <p style={{ color: '#64748b', fontSize: '0.86rem', margin: 0, lineHeight: 1.6 }}>
                Transcripts and performance metrics from voice mock interviews and mock tests are stored securely to track your progress on the Prep Hub and Candidate Dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Third-Party & Data Privacy Guarantee */}
        <section style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '28px',
          border: '1px solid rgba(28, 36, 39, 0.08)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <EyeOff className="size-5 text-emerald-500" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#1c2427', margin: 0 }}>
              3. Who We Share Data With (Zero Data Selling Guarantee)
            </h2>
          </div>
          <div style={{ background: '#ecfdf5', borderRadius: '14px', padding: '20px', border: '1px solid #a7f3d0', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#047857', fontWeight: 700, fontSize: '0.96rem', marginBottom: '6px' }}>
              <CheckCircle2 className="size-5" /> Strict Zero-Data-Selling Policy
            </div>
            <p style={{ color: '#065f46', fontSize: '0.88rem', margin: 0, lineHeight: 1.65 }}>
              We <strong>NEVER sell, rent, monetize, or disclose</strong> your personal information, email address, resumes, or interview responses to recruiters, data brokers, or third-party advertisers.
            </p>
          </div>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: '20px 0 10px' }}>
            Secure AI Processing (Google Gemini API)
          </h3>
          <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.92rem', margin: 0 }}>
            Resume contents and interview audio transcripts are evaluated using official Google Gemini AI endpoints. Data sent to Gemini is encrypted in transit and used solely for instant analysis without persistent public training on your confidential resumes.
          </p>
        </section>

        {/* Section 4: User Rights & Deletion */}
        <section style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '28px',
          border: '1px solid rgba(28, 36, 39, 0.08)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Lock className="size-5 text-indigo-500" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#1c2427', margin: 0 }}>
              4. User Rights & Data Deletion
            </h2>
          </div>
          <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.92rem', margin: '0 0 16px' }}>
            You retain full ownership of all resume documents and performance records uploaded to CareerPilot AI.
          </p>
          <ul style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.8, paddingLeft: '20px', margin: 0 }}>
            <li>You can delete individual scanned resumes at any time directly from your Candidate Dashboard.</li>
            <li>You may request complete account data wipe by contacting developer <strong>Mukund Khandelwal</strong> at <a href="mailto:mukundkhandelwal463@gmail.com" style={{ color: '#ff6b4a', textDecoration: 'none', fontWeight: 600 }}>mukundkhandelwal463@gmail.com</a>.</li>
          </ul>
        </section>

        {/* Section 5: Legal Inquiries & Developer Contact */}
        <section style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid rgba(28, 36, 39, 0.08)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Mail className="size-5 text-rose-500" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#1c2427', margin: 0 }}>
              5. Contact Information & Legal Support
            </h2>
          </div>
          <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.92rem', margin: '0 0 16px' }}>
            If you have questions regarding these Terms & Conditions, data privacy policies, or platform security, feel free to reach out directly to the developer:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#0f172a', fontWeight: 700 }}>Mukund Khandelwal</span>
            <span style={{ color: '#64748b', fontSize: '0.88rem' }}>Software Engineer & AI Architect</span>
            <a href="mailto:mukundkhandelwal463@gmail.com" style={{ color: '#ff6b4a', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem' }}>
              ✉️ mukundkhandelwal463@gmail.com
            </a>
            <a href="https://github.com/mukundkhandelwal463" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.88rem' }}>
              🔗 github.com/mukundkhandelwal463
            </a>
            <a href="https://www.linkedin.com/in/mukund-khandelwal-6a8663283/" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.88rem' }}>
              💼 linkedin.com/in/mukund-khandelwal
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
