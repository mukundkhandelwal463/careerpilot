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
    x.current = mouseXVal * 6;
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

  // Smooth Scroll Effect: Laptop shrinks and glides down-right smoothly on scroll!
  const laptopX = useTransform(scrollYProgress, [0, 0.3], [0, 160]);
  const laptopY = useTransform(scrollYProgress, [0, 0.3], [0, 110]);
  const laptopScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.78]);

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
          width: '400px', 
          height: '400px', 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(255, 107, 74, 0.14) 0%, rgba(255,255,255,0) 70%)', 
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
        
        {/* HERO SECTION: DEAD-CENTER LAPTOP WITH SMOOTH DOWN-RIGHT SCROLL TRANSFORM */}
        <section style={{ padding: '40px 0 60px', textAlign: 'center' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(220px, 270px) minmax(500px, 1fr) minmax(220px, 270px)',
            gap: '32px',
            alignItems: 'center',
            maxWidth: '1440px',
            margin: '0 auto',
            position: 'relative'
          }}>

            {/* ── LEFT SURROUNDING FEATURE BADGES (CLEANLY ALIGNED NO OVERLAP) ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', zIndex: 20 }}>
              
              {/* Feature 1: ATS Resume Screener */}
              <motion.div
                whileHover={{ y: -5, scale: 1.03 }}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '16px 20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{ background: '#ecfdf5', padding: '10px', borderRadius: '12px', color: '#10b981', flexShrink: 0 }}>
                  <BarChart3 className="size-5" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.94rem', fontWeight: 800, color: '#1c2427' }}>ATS Resume Analyzer</h3>
                  <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>85% Match Verified</span>
                </div>
              </motion.div>

              {/* Feature 2: LaTeX Resume Architect */}
              <motion.div
                whileHover={{ y: -5, scale: 1.03 }}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '16px 20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '12px', color: '#3b82f6', flexShrink: 0 }}>
                  <FileCode className="size-5" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.94rem', fontWeight: 800, color: '#1c2427' }}>LaTeX Resume Architect</h3>
                  <span style={{ fontSize: '0.72rem', color: '#3b82f6', fontWeight: 700 }}>3 LaTeX Templates</span>
                </div>
              </motion.div>

              {/* Feature 3: Voice AI Mock Interview */}
              <motion.div
                whileHover={{ y: -5, scale: 1.03 }}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '16px 20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{ background: '#fff1f2', padding: '10px', borderRadius: '12px', color: '#f43f5e', flexShrink: 0 }}>
                  <Mic className="size-5" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.94rem', fontWeight: 800, color: '#1c2427' }}>Voice AI Mock Interview</h3>
                  <span style={{ fontSize: '0.72rem', color: '#f43f5e', fontWeight: 700 }}>Real-Time AI Speech</span>
                </div>
              </motion.div>

            </div>

            {/* ── DEAD-CENTERED LAPTOP MOCKUP (GLIDES DOWN-RIGHT & SHRINKS ON SCROLL) ── */}
            <motion.div 
              style={{
                x: laptopX,
                y: laptopY,
                scale: laptopScale,
                position: 'relative',
                margin: '0 auto',
                width: '100%',
                maxWidth: '780px',
                zIndex: 10
              }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Floating Top Pill Badge */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '20px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  padding: '8px 16px',
                  borderRadius: '24px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  zIndex: 25
                }}
              >
                <div style={{ background: '#ecfdf5', color: '#10b981', padding: '4px', borderRadius: '6px' }}>
                  <Sparkles className="size-3.5" />
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1c2427' }}>Your AI Career Companion</span>
              </motion.div>

              {/* Floating Bottom Pill Badge */}
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '-16px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  padding: '8px 16px',
                  borderRadius: '24px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  zIndex: 25
                }}
              >
                <div style={{ background: '#fef2f2', color: '#ef4444', padding: '4px', borderRadius: '6px' }}>
                  <Award className="size-3.5" />
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1c2427' }}>16 Applications Active</span>
              </motion.div>

              {/* LAPTOP HARDWARE BODY */}
              <div style={{
                background: '#1c2427',
                borderRadius: '26px 26px 10px 10px',
                padding: '14px 14px 24px 14px',
                boxShadow: '0 30px 80px rgba(0,0,0,0.28)',
                border: '2px solid #334155'
              }}>
                
                {/* Laptop Camera dot */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#475569' }} />
                </div>

                {/* LAPTOP SCREEN INTERFACE */}
                <div style={{
                  background: '#0f172a',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  display: 'flex',
                  height: '420px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  textAlign: 'left'
                }}>
                  {/* Laptop Sidebar */}
                  <div style={{ width: '56px', background: '#090d16', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', paddingTop: '20px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--accent), #ff8f57)', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '0.75rem', color: 'white' }}>C</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', color: '#475569' }}>
                      <FileText className="size-5" style={{ color: 'var(--accent)' }} />
                      <Briefcase className="size-5" />
                      <Sparkles className="size-5" />
                      <Award className="size-5" />
                    </div>
                  </div>
                  
                  {/* Laptop Dashboard Canvas */}
                  <div style={{ flex: 1, padding: '20px 24px', background: '#0b1329', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: 'white' }}>Welcome back! 👋</span>
                      <span style={{ fontSize: '0.68rem', background: 'rgba(255,255,255,0.08)', color: '#a7f3d0', padding: '4px 10px', borderRadius: '12px', fontWeight: 700 }}>AI Live</span>
                    </div>
                    
                    {/* ATS Score Gauge Indicator */}
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', margin: '14px 0' }}>
                      <div style={{
                        width: '98px', height: '98px', borderRadius: '50%',
                        background: 'conic-gradient(#10b981 306deg, #1e293b 0deg)',
                        display: 'grid', placeItems: 'center', position: 'relative',
                        boxShadow: '0 0 25px rgba(16,185,129,0.25)'
                      }}>
                        <div style={{ width: '82px', height: '82px', borderRadius: '50%', background: '#0b1329', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>85%</span>
                          <span style={{ fontSize: '0.5rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ATS MATCH</span>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <strong style={{ fontSize: '1rem', color: 'white' }}>Overall Career Score: 85%</strong>
                        <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>ATS Ready & Market Aligned ✔</span>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Target Role: Data Science & ML Specialist</span>
                      </div>
                    </div>

                    {/* Progress Metrics Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                      {[
                        { label: 'Resume Score', val: '92%', color: '#10b981' },
                        { label: 'Interview Score', val: '78%', color: '#3b82f6' },
                        { label: 'CS Special Progress', val: '88%', color: '#f59e0b' },
                        { label: 'Active Applications', val: '16', color: '#ec4899' }
                      ].map((item, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>{item.label}</span>
                          <strong style={{ fontSize: '0.85rem', color: item.color }}>{item.val}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Laptop Stand Base */}
              <div style={{
                height: '16px',
                width: '108%',
                marginLeft: '-4%',
                background: 'linear-gradient(to bottom, #475569, #1e293b)',
                borderRadius: '0 0 18px 18px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.35)'
              }} />
            </motion.div>

            {/* ── RIGHT SURROUNDING FEATURE BADGES (CLEANLY ALIGNED NO OVERLAP) ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', zIndex: 20 }}>
              
              {/* Feature 4: CS Special Evaluation */}
              <motion.div
                whileHover={{ y: -5, scale: 1.03 }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '16px 20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{ background: '#fef3c7', padding: '10px', borderRadius: '12px', color: '#d97706', flexShrink: 0 }}>
                  <Code2 className="size-5" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.94rem', fontWeight: 800, color: '#1c2427' }}>CS Special Evaluation</h3>
                  <span style={{ fontSize: '0.72rem', color: '#d97706', fontWeight: 700 }}>6 CS Core Subjects</span>
                </div>
              </motion.div>

              {/* Feature 5: Live Job Matcher */}
              <motion.div
                whileHover={{ y: -5, scale: 1.03 }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '16px 20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{ background: '#f3e8ff', padding: '10px', borderRadius: '12px', color: '#9333ea', flexShrink: 0 }}>
                  <Search className="size-5" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.94rem', fontWeight: 800, color: '#1c2427' }}>Live Job Matching</h3>
                  <span style={{ fontSize: '0.72rem', color: '#9333ea', fontWeight: 700 }}>100K+ Live Jobs</span>
                </div>
              </motion.div>

              {/* Feature 6: Career Roadmap & AI Keywords */}
              <motion.div
                whileHover={{ y: -5, scale: 1.03 }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '16px 20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{ background: '#ecfeff', padding: '10px', borderRadius: '12px', color: '#0891b2', flexShrink: 0 }}>
                  <Target className="size-5" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.94rem', fontWeight: 800, color: '#1c2427' }}>Career Roadmap & Keywords</h3>
                  <span style={{ fontSize: '0.72rem', color: '#0891b2', fontWeight: 700 }}>Gemini AI Keyword Stream</span>
                </div>
              </motion.div>

            </div>

          </div>

        </section>

        {/* INTERACTIVE FEATURE SPOTLIGHT SECTION (EXPLAINS ATS RESUME SCREENER FEATURE) */}
        <section style={{ padding: '60px 0 80px', position: 'relative' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '40px',
            alignItems: 'center',
            background: '#ffffff',
            borderRadius: '32px',
            padding: '44px 48px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            textAlign: 'left'
          }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ecfdf5', color: '#047857', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '16px' }}>
                <Sparkles className="size-4 text-emerald-600" /> Feature Spotlight
              </div>

              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#1c2427', margin: '0 0 16px 0', lineHeight: 1.15 }}>
                ATS Resume Screener & Real-Time Keyword Engine
              </h2>

              <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.65, margin: '0 0 24px 0' }}>
                CareerPilot parses candidate resumes against job descriptions, identifying missing skills, quantifying ATS match scores (85%+ accuracy), and suggesting high-impact keywords dynamically generated by Gemini AI.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ background: '#ecfdf5', color: '#10b981', padding: '6px', borderRadius: '8px', marginTop: '2px' }}>
                    <CheckCircle className="size-4" />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: '#1c2427', display: 'block' }}>Instant Keyword Extraction & Match Score</strong>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Extracts hard skills, soft skills, and missing keywords in seconds.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ background: '#eff6ff', color: '#3b82f6', padding: '6px', borderRadius: '8px', marginTop: '2px' }}>
                    <CheckCircle className="size-4" />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: '#1c2427', display: 'block' }}>Dynamic LaTeX Source Generation</strong>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Export clean LaTeX code across 3 professional templates with Overleaf integration.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ background: '#fff1f2', color: '#f43f5e', padding: '6px', borderRadius: '8px', marginTop: '2px' }}>
                    <CheckCircle className="size-4" />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: '#1c2427', display: 'block' }}>Voice AI Mock Interview Prep</strong>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Simulate real interviews with speech recognition and instant AI acoustic feedback.</span>
                  </div>
                </div>
              </div>

              <Link to="/upload" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1c2427', color: '#ffffff', padding: '12px 28px', borderRadius: '14px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
                Try ATS Screener Now <ArrowRight className="size-4 text-emerald-400" />
              </Link>
            </div>

            {/* Feature Mini Interactive Preview Box */}
            <div style={{
              background: '#0f172a',
              borderRadius: '24px',
              padding: '24px',
              color: '#ffffff',
              boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981' }}>🎯 ATS Match Analysis</span>
                <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', color: '#94a3b8', padding: '3px 8px', borderRadius: '8px' }}>Real-Time AI</span>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '16px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>Overall Score</span>
                  <strong style={{ fontSize: '0.85rem', color: '#10b981' }}>85% (Optimal)</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recommended AI Keywords:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['PyTorch', 'Scikit-learn', 'Random Forest', 'TF-IDF', 'NLP Pipelines', 'Feature Engineering'].map((kw, i) => (
                    <span key={i} style={{ background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.25)', padding: '3px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 600 }}>
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
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
