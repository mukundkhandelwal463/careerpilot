import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Terminal, 
  Compass, 
  Briefcase, 
  Zap, 
  Award, 
  FileText, 
  HelpCircle, 
  Layers, 
  Star,
  Users,
  Mic,
  Code2,
  FileCode,
  Target,
  BarChart3,
  Search,
  CheckCircle,
  Clock
} from 'lucide-react';
import '../css/home.css';

// 3D Interactive Tilt Card Component
const TiltCard = ({ children, className, style = {} }) => {
  const x = useRef(0);
  const y = useRef(0);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = (event.clientX - rect.left - width / 2) / (width / 2);
    const mouseYVal = (event.clientY - rect.top - height / 2) / (height / 2);
    x.current = mouseXVal * 6; // degrees max tilt
    y.current = -mouseYVal * 6;
    event.currentTarget.style.transform = `rotateY(${x.current}deg) rotateX(${y.current}deg)`;
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };

  return (
    <div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      {children}
    </div>
  );
};

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax background animations
  const floatY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <div ref={containerRef} className="page-shell" style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* Top Scroll Indicator */}
      <motion.div 
        style={{ 
          scaleX: scaleY, 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '4px', 
          background: 'linear-gradient(to right, var(--accent), var(--teal))', 
          transformOrigin: '0%', 
          zIndex: 100000 
        }} 
      />

      <Navbar />

      {/* Background blobs for depth */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          top: '10%', 
          right: '10%', 
          width: '380px', 
          height: '380px', 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(255, 107, 74, 0.12) 0%, rgba(255,255,255,0) 70%)', 
          filter: 'blur(50px)',
          y: floatY1,
          pointerEvents: 'none',
          zIndex: -1
        }} 
      />
      <motion.div 
        style={{ 
          position: 'absolute', 
          top: '40%', 
          left: '-5%', 
          width: '450px', 
          height: '450px', 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(124, 214, 199, 0.15) 0%, rgba(255,255,255,0) 70%)', 
          filter: 'blur(60px)',
          y: floatY2,
          pointerEvents: 'none',
          zIndex: -1
        }} 
      />

      <main style={{ width: 'min(var(--max-width), calc(100% - 32px))', margin: '0 auto' }}>
        
        {/* REDESIGNED HERO SECTION - CENTERED BIGGER LAPTOP WITH CLEAN FEATURE TITLES */}
        <section style={{ padding: '30px 0 50px', textAlign: 'center' }}>
          
          {/* 3-COLUMN HERO GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(240px, 280px) minmax(580px, 1fr) minmax(240px, 280px)',
            gap: '24px',
            alignItems: 'center',
            maxWidth: '1440px',
            margin: '0 auto',
            position: 'relative'
          }}>

            {/* ── LEFT SURROUNDING FEATURE BADGES (NAMES ONLY) ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              
              {/* Feature 1: ATS Resume Screener */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '18px',
                  padding: '14px 18px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{ background: '#ecfdf5', padding: '10px', borderRadius: '12px', color: '#10b981', flexShrink: 0 }}>
                  <BarChart3 className="size-5" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: '#1c2427' }}>ATS Resume Analyzer</h3>
                  <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>85% Match Verified</span>
                </div>
              </motion.div>

              {/* Feature 2: LaTeX Resume Architect */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '18px',
                  padding: '14px 18px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '12px', color: '#3b82f6', flexShrink: 0 }}>
                  <FileCode className="size-5" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: '#1c2427' }}>LaTeX Resume Architect</h3>
                  <span style={{ fontSize: '0.72rem', color: '#3b82f6', fontWeight: 700 }}>3 LaTeX Templates</span>
                </div>
              </motion.div>

              {/* Feature 3: Voice AI Mock Interview */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '18px',
                  padding: '14px 18px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{ background: '#fff1f2', padding: '10px', borderRadius: '12px', color: '#f43f5e', flexShrink: 0 }}>
                  <Mic className="size-5" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: '#1c2427' }}>Voice AI Mock Interview</h3>
                  <span style={{ fontSize: '0.72rem', color: '#f43f5e', fontWeight: 700 }}>Real-Time AI Speech</span>
                </div>
              </motion.div>

            </div>

            {/* ── CENTER BIGGER LAPTOP MOCKUP DISPLAY ── */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', margin: '0 auto', width: '100%', maxWidth: '820px' }}
            >
              {/* Floating Top Pill Badge */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '-22px',
                  right: '20px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  padding: '9px 18px',
                  borderRadius: '24px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  zIndex: 10
                }}
              >
                <div style={{ background: '#ecfdf5', color: '#10b981', padding: '5px', borderRadius: '8px' }}>
                  <Sparkles className="size-4" />
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1c2427' }}>Your AI Career Companion</span>
              </motion.div>

              {/* Floating Bottom Pill Badge */}
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  bottom: '28px',
                  left: '-18px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  padding: '9px 18px',
                  borderRadius: '24px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  zIndex: 10
                }}
              >
                <div style={{ background: '#fef2f2', color: '#ef4444', padding: '5px', borderRadius: '8px' }}>
                  <Award className="size-4" />
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1c2427' }}>16 Applications Active</span>
              </motion.div>

              {/* LAPTOP HARDWARE BODY (BIGGER & CRISPER) */}
              <div style={{
                background: '#1c2427',
                borderRadius: '28px 28px 10px 10px',
                padding: '16px 16px 28px 16px',
                boxShadow: '0 30px 75px rgba(0,0,0,0.3)',
                border: '2px solid #334155'
              }}>
                
                {/* Laptop Camera dot */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#475569' }} />
                </div>

                {/* LAPTOP SCREEN INTERFACE (EXPANDED TO 440px HEIGHT) */}
                <div style={{
                  background: '#0f172a',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  height: '440px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  textAlign: 'left'
                }}>
                  {/* Laptop Sidebar */}
                  <div style={{ width: '58px', background: '#090d16', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '22px', paddingTop: '22px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--accent), #ff8f57)', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '0.75rem', color: 'white' }}>C</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#475569' }}>
                      <FileText className="size-5" style={{ color: 'var(--accent)' }} />
                      <Briefcase className="size-5" />
                      <Sparkles className="size-5" />
                      <Award className="size-5" />
                    </div>
                  </div>
                  
                  {/* Laptop Dashboard Canvas */}
                  <div style={{ flex: 1, padding: '22px 26px', background: '#0b1329', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'white' }}>Welcome back, Anam! 👋</span>
                      <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.08)', color: '#a7f3d0', padding: '4px 10px', borderRadius: '12px', fontWeight: 700 }}>AI Live</span>
                    </div>
                    
                    {/* ATS Score Gauge Indicator */}
                    <div style={{ display: 'flex', gap: '22px', alignItems: 'center', margin: '16px 0' }}>
                      <div style={{
                        width: '104px', height: '104px', borderRadius: '50%',
                        background: 'conic-gradient(#10b981 306deg, #1e293b 0deg)',
                        display: 'grid', placeItems: 'center', position: 'relative',
                        boxShadow: '0 0 25px rgba(16,185,129,0.25)'
                      }}>
                        <div style={{ width: '86px', height: '86px', borderRadius: '50%', background: '#0b1329', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>85%</span>
                          <span style={{ fontSize: '0.52rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ATS MATCH</span>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <strong style={{ fontSize: '1.05rem', color: 'white' }}>Overall Career Score: 85%</strong>
                        <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700 }}>ATS Ready & Market Aligned ✔</span>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Target Role: Data Science & ML Specialist</span>
                      </div>
                    </div>

                    {/* Progress Metrics Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                      {[
                        { label: 'Resume Score', val: '92%', color: '#10b981' },
                        { label: 'Interview Score', val: '78%', color: '#3b82f6' },
                        { label: 'CS Special Progress', val: '88%', color: '#f59e0b' },
                        { label: 'Active Applications', val: '16', color: '#ec4899' }
                      ].map((item, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>{item.label}</span>
                          <strong style={{ fontSize: '0.9rem', color: item.color }}>{item.val}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Laptop Stand Base */}
              <div style={{
                height: '18px',
                width: '108%',
                marginLeft: '-4%',
                background: 'linear-gradient(to bottom, #475569, #1e293b)',
                borderRadius: '0 0 20px 20px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.35)'
              }} />
            </motion.div>

            {/* ── RIGHT SURROUNDING FEATURE BADGES (NAMES ONLY) ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              
              {/* Feature 4: CS Special Evaluation */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '18px',
                  padding: '14px 18px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{ background: '#fef3c7', padding: '10px', borderRadius: '12px', color: '#d97706', flexShrink: 0 }}>
                  <Code2 className="size-5" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: '#1c2427' }}>CS Special Evaluation</h3>
                  <span style={{ fontSize: '0.72rem', color: '#d97706', fontWeight: 700 }}>6 CS Core Subjects</span>
                </div>
              </motion.div>

              {/* Feature 5: Live Job Matcher */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '18px',
                  padding: '14px 18px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{ background: '#f3e8ff', padding: '10px', borderRadius: '12px', color: '#9333ea', flexShrink: 0 }}>
                  <Search className="size-5" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: '#1c2427' }}>Live Job Matching</h3>
                  <span style={{ fontSize: '0.72rem', color: '#9333ea', fontWeight: 700 }}>100K+ Live Jobs</span>
                </div>
              </motion.div>

              {/* Feature 6: Career Roadmap & AI Keywords */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '18px',
                  padding: '14px 18px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{ background: '#ecfeff', padding: '10px', borderRadius: '12px', color: '#0891b2', flexShrink: 0 }}>
                  <Target className="size-5" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: '#1c2427' }}>Career Roadmap & Keywords</h3>
                  <span style={{ fontSize: '0.72rem', color: '#0891b2', fontWeight: 700 }}>Gemini AI Keyword Stream</span>
                </div>
              </motion.div>

            </div>

          </div>

        </section>

        {/* FEATURES OVERVIEW SECTION */}
        <section className="section" id="featuresSection" style={{ padding: '70px 0 60px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
            <span className="section-tag">✨ Core Platform Modules</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: '12px 0', color: '#1c2427' }}>
              Everything You Need to Succeed
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0 }}>
              Tailored tools engineered to elevate your resume, sharpen your technical interview skills, and land your ideal job.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {[
              {
                icon: BarChart3,
                color: '#10b981',
                bg: '#ecfdf5',
                title: 'ATS Resume Screener',
                desc: 'Upload your resume and get instant scoring, missing skill identification, formatting suggestions, and downloadable PDF evaluation reports.',
                link: '/upload',
                linkText: 'Scan Resume'
              },
              {
                icon: FileCode,
                color: '#3b82f6',
                bg: '#eff6ff',
                title: 'LaTeX Resume Architect',
                desc: 'Choose from 3 specialized LaTeX templates (Data & ML, Classic Tech, Executive). Edit form fields with magic autofill and compile online.',
                link: '/app/builder/default',
                linkText: 'Build LaTeX Resume'
              },
              {
                icon: Mic,
                color: '#f43f5e',
                bg: '#fff1f2',
                title: 'Voice AI Mock Interview',
                desc: 'Practice technical & behavioral interviews with dynamic speech recognition, audio playback, and comprehensive scoring breakdowns.',
                link: '/preparation',
                linkText: 'Start Interview'
              },
              {
                icon: Code2,
                color: '#d97706',
                bg: '#fef3c7',
                title: 'CS Special Evaluation Report',
                desc: 'Master DSA, OOPs, Operating Systems, DBMS, Computer Networks & System Design with theory notes, quizzes, and downloadable PDF reports.',
                link: '/preparation',
                linkText: 'Explore CS Subjects'
              },
              {
                icon: Search,
                color: '#9333ea',
                bg: '#f3e8ff',
                title: 'Live Job Matcher',
                desc: 'Search 100K+ real-time job listings using auto-extracted skills from your resume, location filters, and remote work preferences.',
                link: '/jobs',
                linkText: 'Browse Jobs'
              },
              {
                icon: Target,
                color: '#0891b2',
                bg: '#ecfeff',
                title: 'Career Roadmap & AI Keywords',
                desc: 'Get personalized career roadmaps and Gemini AI-recommended ATS keywords for any target role or specialization.',
                link: '/app/builder/default',
                linkText: 'Generate Keywords'
              }
            ].map((f, idx) => {
              const IconComp = f.icon;
              return (
                <TiltCard 
                  key={idx}
                  style={{
                    background: '#ffffff',
                    borderRadius: '24px',
                    padding: '28px 24px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'left'
                  }}
                >
                  <div>
                    <div style={{ background: f.bg, color: f.color, width: '48px', height: '48px', borderRadius: '16px', display: 'grid', placeItems: 'center', marginBottom: '18px' }}>
                      <IconComp className="size-6" />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1c2427', margin: '0 0 10px 0' }}>{f.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, margin: '0 0 20px 0' }}>{f.desc}</p>
                  </div>
                  <Link to={f.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: f.color, fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none' }}>
                    {f.linkText} <ArrowRight className="size-4" />
                  </Link>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* CTA BANNER SECTION */}
        <section style={{ padding: '30px 0 80px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1c2427, #0f172a)',
            borderRadius: '32px',
            padding: '50px 36px',
            color: '#ffffff',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, margin: '0 0 16px 0', fontFamily: '"Sora", sans-serif' }}>
              Ready to Accelerate Your Career?
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#94a3b8', maxWidth: '640px', margin: '0 auto 28px auto', lineHeight: 1.6 }}>
              Join thousands of candidates using CareerPilot to optimize their resumes, crack AI mock interviews, and land top tech roles.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link className="btn btn-primary" to="/upload" style={{ padding: '14px 32px', background: 'linear-gradient(135deg, var(--accent), #ff8f57)', color: 'white', fontWeight: 700, borderRadius: '999px' }}>
                Build Your Resume Now <ArrowRight className="size-4 ml-1" />
              </Link>
              <Link className="btn btn-secondary" to="/preparation" style={{ padding: '14px 32px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 700, borderRadius: '999px' }}>
                Practice Mock Interviews
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Home;
