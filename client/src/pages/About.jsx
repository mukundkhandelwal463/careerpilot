import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, ChevronRight, Code2, Cpu, Github, Linkedin, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import SEOHead from '../Components/SEOHead.jsx';
import '../css/style.css';

const About = () => {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About CareerPilot',
    url: 'https://careerpilot.website/about',
    description: 'Learn about CareerPilot, its AI-powered ATS resume screening architecture, and its creator Mukund Khandelwal.',
    mainEntity: {
      '@type': 'Person',
      name: 'Mukund Khandelwal',
      jobTitle: 'Founder & Software Engineer',
      affiliation: {
        '@type': 'EducationalOrganization',
        name: 'Lovely Professional University'
      },
      email: 'mukundkhandelwal463@gmail.com',
      sameAs: [
        'https://github.com/mukundkhandelwal463',
        'https://www.linkedin.com/in/mukund-khandelwal-6a8663283/'
      ]
    }
  };

  return (
    <div className="page-shell">
      <SEOHead
        title="About CareerPilot & Creator Mukund Khandelwal"
        description="Meet CareerPilot — an AI-powered ATS Resume Screener, Executive LaTeX Resume Builder, Voice Mock Interviewer, and CS Fundamentals platform created by Mukund Khandelwal."
        path="/about"
        keywords="About CareerPilot, Mukund Khandelwal, AI Resume Screener architecture, ATS platform"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' }
        ]}
        jsonLd={aboutSchema}
      />
      <Navbar />
      <main className="page" style={{ maxWidth: '1040px', margin: '32px auto', padding: '0 20px' }}>
        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--muted)', marginBottom: '18px' }}>
          <Link to="/" style={{ fontWeight: 600 }}>Home</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--text)', fontWeight: 700 }}>About CareerPilot</span>
        </nav>

        <article className="card" style={{ padding: '42px 36px', borderRadius: '28px', marginBottom: '28px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '999px',
            background: 'rgba(255, 107, 74, 0.1)',
            color: '#e14b29',
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.07em',
            marginBottom: '14px'
          }}>
            <Sparkles size={14} /> ABOUT CAREERPILOT
          </span>

          <h1 style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.7rem)', fontWeight: 800, color: '#122023', margin: '0 0 16px', lineHeight: 1.2 }}>
            AI-Powered Career Preparation & ATS Resume Intelligence Platform
          </h1>

          <p style={{ fontSize: '1.02rem', lineHeight: 1.72, color: '#334155', margin: '0 0 28px' }}>
            <strong>CareerPilot</strong> (<code>careerpilot.website</code>) is an end-to-end AI career readiness suite engineered to help students, software developers, and job seekers overcome Applicant Tracking System (ATS) rejections and succeed in competitive technical interviews.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '34px' }}>
            <div style={{ padding: '20px', borderRadius: '18px', background: '#f8fafc', border: '1px solid rgba(24,35,38,0.07)' }}>
              <Award size={22} color="#ff6b4a" style={{ marginBottom: '10px' }} />
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 6px', color: '#122023' }}>ATS Benchmark Scoring</h2>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
                Parses PDF, DOCX, and TXT resumes against real Job Descriptions to surface missing keywords and concrete formatting improvements.
              </p>
            </div>
            <div style={{ padding: '20px', borderRadius: '18px', background: '#f8fafc', border: '1px solid rgba(24,35,38,0.07)' }}>
              <Cpu size={22} color="#0f766e" style={{ marginBottom: '10px' }} />
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 6px', color: '#122023' }}>AI Mock Interviews & Prep</h2>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
                Combines voice/written AI mock interviews, timed 5-section assessments, and structured CS fundamentals (OS, DBMS, CN, OOPs, System Design).
              </p>
            </div>
            <div style={{ padding: '20px', borderRadius: '18px', background: '#f8fafc', border: '1px solid rgba(24,35,38,0.07)' }}>
              <ShieldCheck size={22} color="#2563eb" style={{ marginBottom: '10px' }} />
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 6px', color: '#122023' }}>Privacy-First Cloud Stack</h2>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
                Deployed on encrypted AWS infrastructure with HTTPS/TLS, private authenticated user dashboards, and real-time Prometheus observability.
              </p>
            </div>
          </div>

          {/* Creator / Author Authority Section (GEO) */}
          <section style={{
            padding: '26px 28px',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, rgba(18, 32, 35, 0.96), rgba(28, 45, 49, 0.96))',
            color: '#fff',
            marginBottom: '26px'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
              <div style={{ maxWidth: '640px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.09em', color: '#7cd6c7', display: 'block', marginBottom: '6px' }}>
                  CREATOR & LEAD ENGINEER
                </span>
                <h2 style={{ margin: '0 0 8px', fontSize: '1.45rem', fontWeight: 800 }}>Mukund Khandelwal</h2>
                <p style={{ margin: '0 0 14px', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.65 }}>
                  B.Tech Computer Science & Engineering student at Lovely Professional University, specializing in Full-Stack Web Engineering, Machine Learning / NLP pipelines, and Cloud DevOps (Docker, Kubernetes, Terraform, AWS, Prometheus & Grafana).
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  <a href="https://github.com/mukundkhandelwal463" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.82rem', fontWeight: 700 }}>
                    <Github size={15} /> GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/mukund-khandelwal-6a8663283/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.82rem', fontWeight: 700 }}>
                    <Linkedin size={15} /> LinkedIn
                  </a>
                  <a href="mailto:mukundkhandelwal463@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '999px', background: 'rgba(255,107,74,0.2)', color: '#ffd5cb', fontSize: '0.82rem', fontWeight: 700 }}>
                    <Mail size={15} /> mukundkhandelwal463@gmail.com
                  </a>
                </div>
              </div>
              <Code2 size={64} color="#7cd6c7" style={{ opacity: 0.85 }} />
            </div>
          </section>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Link to="/guides" className="btn-primary" style={{ padding: '12px 22px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
              Explore Career Guides <ArrowRight size={16} />
            </Link>
            <Link to="/upload" style={{ padding: '12px 22px', borderRadius: '999px', border: '1px solid rgba(24,35,38,0.15)', fontWeight: 700, color: '#122023', background: '#fff' }}>
              Try ATS Resume Screener
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default About;
