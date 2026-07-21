import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
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
    const mouseXVal = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const mouseYVal = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    x.current = mouseXVal * 6;
    y.current = -mouseYVal * 6;
    event.currentTarget.style.transform = `rotateY(${x.current}deg) rotateX(${y.current}deg)`;
  };
  const handleMouseLeave = (event) => {
    event.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };
  return (
    <div className={className} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ ...style, transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d', perspective: 1000 }}>
      {children}
    </div>
  );
};

/* Feature pill tube data — clicking any tube redirects to that feature */
const featurePills = [
  { icon: BarChart3, bg: '#ecfdf5', color: '#10b981', title: 'ATS Resume Analyzer', link: '/upload' },
  { icon: Layers, bg: '#fdf4ff', color: '#c026d3', title: 'AI Resume Maker', link: '/app/builder/default' },
  { icon: FileCode, bg: '#eff6ff', color: '#3b82f6', title: 'Complete Evaluation Reports', link: '/dashboard' },
  { icon: Mic, bg: '#fff1f2', color: '#f43f5e', title: 'Voice AI Mock Interview', link: '/preparation' },
  { icon: Code2, bg: '#fef3c7', color: '#d97706', title: 'CS Special Evaluation', link: '/preparation' },
  { icon: Search, bg: '#f3e8ff', color: '#9333ea', title: 'Live Job Matching', link: '/jobs' },
  { icon: Target, bg: '#ecfeff', color: '#0891b2', title: 'Career Roadmap & Keywords', link: '/preparation' }
];

/* Positions for the 7 floating pills — generous vertical distance & front layer overlap */
const pillPositions = [
  // Left side (4 pills, cleanly spaced vertically)
  { top: '2%', left: '-25px', flyX: -520, flyY: -100 },  // ATS Resume Analyzer
  { top: '26%', left: '-40px', flyX: -560, flyY: -30 },   // AI Resume Maker
  { top: '52%', left: '-45px', flyX: -560, flyY: 30 },    // LaTeX Resume Architect
  { top: '78%', left: '-20px', flyX: -520, flyY: 100 },   // Voice AI Mock Interview

  // Right side (3 pills, cleanly spaced vertically)
  { top: '10%', right: '-25px', flyX: 520, flyY: -80 },   // CS Special Evaluation
  { top: '44%', right: '-40px', flyX: 560, flyY: 0 },     // Live Job Matching
  { top: '78%', right: '-20px', flyX: 520, flyY: 80 }     // Career Roadmap & Keywords
];


const Home = () => {
  const containerRef = useRef(null);
  const laptopRef = useRef(null);
  const dockRef = useRef(null);
  const [showFeatureScreen, setShowFeatureScreen] = useState(false);
  const [dockOffset, setDockOffset] = useState({ x: 0, y: 0, scale: 0.58 });

  // Measure exact offset between laptop and dock target
  const measureDock = useCallback(() => {
    if (!laptopRef.current || !dockRef.current) return;
    const laptopRect = laptopRef.current.getBoundingClientRect();
    const dockRect = dockRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const laptopCenterX = laptopRect.left + laptopRect.width / 2;
    const laptopCenterY = laptopRect.top + scrollY + laptopRect.height / 2;
    const dockCenterX = dockRect.left + dockRect.width / 2;
    // Push target position further down side:
    const dockCenterY = dockRect.top + scrollY + dockRect.height / 2 + 75;
    const targetScale = Math.min(dockRect.width / laptopRect.width, 0.54);
    setDockOffset({ x: dockCenterX - laptopCenterX, y: dockCenterY - laptopCenterY, scale: targetScale });
  }, []);

  useEffect(() => {
    const timer = setTimeout(measureDock, 300);
    window.addEventListener('resize', measureDock);
    return () => { clearTimeout(timer); window.removeEventListener('resize', measureDock); };
  }, [measureDock]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const floatY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [0, 180]);

  // Laptop scroll transforms — fast glide and dock lower down side
  const laptopX = useTransform(scrollYProgress, [0, 0.15], [0, dockOffset.x]);
  const laptopY = useTransform(scrollYProgress, [0, 0.15], [0, dockOffset.y]);
  const laptopScale = useTransform(scrollYProgress, [0, 0.15], [1, dockOffset.scale]);

  // Feature pills fly outward fast on scroll
  const pillProgress = useTransform(scrollYProgress, [0, 0.10], [0, 1]);

  // Create individual pill transforms
  const pillTransforms = pillPositions.map(pos => ({
    x: useTransform(pillProgress, [0, 1], [0, pos.flyX]),
    y: useTransform(pillProgress, [0, 1], [0, pos.flyY]),
    opacity: useTransform(pillProgress, [0, 0.6, 1], [1, 1, 0]),
    scale: useTransform(pillProgress, [0, 1], [1, 0.7])
  }));

  // Swap screen content
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowFeatureScreen(latest > 0.08);
  });

  return (
    <div ref={containerRef} className="page-shell" style={{ position: 'relative', overflowX: 'hidden' }}>
      <motion.div style={{ scaleX: scaleY, position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(to right, var(--accent), var(--teal))', transformOrigin: '0%', zIndex: 100000 }} />

      <Navbar />

      {/* Background blobs */}
      <motion.div style={{ position: 'absolute', top: '10%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,74,0.14) 0%, rgba(255,255,255,0) 70%)', filter: 'blur(50px)', y: floatY1, pointerEvents: 'none', zIndex: -1 }} />
      <motion.div style={{ position: 'absolute', top: '40%', left: '-5%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,214,199,0.15) 0%, rgba(255,255,255,0) 70%)', filter: 'blur(60px)', y: floatY2, pointerEvents: 'none', zIndex: -1 }} />

      <main style={{ width: 'min(var(--max-width), calc(100% - 32px))', margin: '0 auto' }}>

        {/* ═══════════════════════════════════════════════════════
            HERO — Laptop centered with floating pill tubes around it
            Scrolling → pills fly outward, laptop docks into box
            ═══════════════════════════════════════════════════════ */}
        <section style={{ padding: '140px 0 180px', textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '1440px', margin: '0 auto' }}>

            {/* ── FLOATING FEATURE PILL TUBES ── */}
            {featurePills.map((pill, idx) => {
              const Icon = pill.icon;
              const pos = pillPositions[idx];
              const transform = pillTransforms[idx];
              return (
                <motion.div
                  key={idx}
                  style={{
                    position: 'absolute',
                    top: pos.top,
                    left: pos.left || 'auto',
                    right: pos.right || 'auto',
                    x: transform.x,
                    y: transform.y,
                    opacity: transform.opacity,
                    scale: transform.scale,
                    zIndex: 50
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={pill.link} style={{ textDecoration: 'none' }}>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.07 }}
                      whileTap={{ scale: 0.96 }}
                      animate={{ y: [0, idx % 2 === 0 ? -6 : 6, 0] }}
                      transition={{ duration: 3 + idx * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        background: '#ffffff',
                        borderRadius: '999px',
                        padding: '10px 20px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                        border: '1px solid #cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ background: pill.bg, padding: '7px', borderRadius: '10px', color: pill.color, flexShrink: 0, display: 'grid', placeItems: 'center' }}>
                        <Icon className="size-4" />
                      </div>
                      <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#1c2427' }}>{pill.title}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}

            {/* ── LAPTOP MOCKUP ── scrolls down into spotlight box */}
            <motion.div
              ref={laptopRef}
              style={{
                x: laptopX, y: laptopY, scale: laptopScale,
                position: 'relative', width: '100%', maxWidth: '880px', zIndex: 30
              }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* LAPTOP BODY */}
              <div style={{ background: '#1c2427', borderRadius: '26px 26px 10px 10px', padding: '14px 14px 24px 14px', boxShadow: '0 30px 80px rgba(0,0,0,0.28)', border: '2px solid #334155' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#475569' }} />
                </div>

                {/* SCREEN — crossfade */}
                <div style={{ background: '#0f172a', borderRadius: '14px', overflow: 'hidden', display: 'flex', height: '500px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'left', position: 'relative' }}>
                  {/* Sidebar */}
                  <div style={{ width: '56px', background: '#090d16', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', paddingTop: '20px', borderRight: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--accent), #ff8f57)', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '0.75rem', color: 'white' }}>C</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', color: '#475569' }}>
                      <FileText className="size-5" style={{ color: showFeatureScreen ? '#475569' : 'var(--accent)' }} />
                      <Briefcase className="size-5" />
                      <BarChart3 className="size-5" style={{ color: showFeatureScreen ? 'var(--accent)' : '#475569' }} />
                      <Award className="size-5" />
                    </div>
                  </div>

                  {/* Screen content with crossfade */}
                  <div style={{ flex: 1, position: 'relative' }}>
                    {/* SCREEN 1: Dashboard (Full Comprehensive Platform Preview) */}
                    <div style={{ position: 'absolute', inset: 0, opacity: showFeatureScreen ? 0 : 1, transition: 'opacity 0.5s ease', pointerEvents: showFeatureScreen ? 'none' : 'auto' }}>
                      <div style={{ padding: '16px 20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>

                        {/* Top Header Row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                          <div>
                            <span style={{ fontSize: '0.98rem', fontWeight: 800, color: 'white', display: 'block' }}>Welcome back, Candidate! 👋</span>
                            <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Career Readiness & Evaluation Scorecard</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.65rem', background: 'rgba(16,185,129,0.15)', color: '#34d399', padding: '3px 10px', borderRadius: '12px', fontWeight: 700, border: '1px solid rgba(16,185,129,0.3)' }}>🟢 Live Dashboard</span>
                          </div>
                        </div>

                        {/* Stat Metric Pills Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                          {[
                            { label: 'Avg ATS Score', val: '85%', color: '#10b981' },
                            { label: 'Scanned Resumes', val: '3', color: '#3b82f6' },
                            { label: 'Interview Score', val: '78%', color: '#f59e0b' },
                            { label: 'Job Fit Score', val: '88%', color: '#ec4899' }
                          ].map((m, idx) => (
                            <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '8px 10px', textAlign: 'center' }}>
                              <span style={{ fontSize: '0.62rem', color: '#94a3b8', display: 'block', fontWeight: 600 }}>{m.label}</span>
                              <strong style={{ fontSize: '0.9rem', color: m.color, fontWeight: 800 }}>{m.val}</strong>
                            </div>
                          ))}
                        </div>

                        {/* Center Row: Conic Gauge + Target Role + CS Core Progress */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          {/* Radial Gauge & Target */}
                          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                            <div style={{
                              width: '78px', height: '78px', borderRadius: '50%',
                              background: 'conic-gradient(#10b981 306deg, #1e293b 0deg)',
                              display: 'grid', placeItems: 'center',
                              boxShadow: '0 0 20px rgba(16,185,129,0.2)'
                            }}>
                              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#0b1329', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>85%</span>
                                <span style={{ fontSize: '0.45rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>ATS MATCH</span>
                              </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                              <strong style={{ fontSize: '0.85rem', color: 'white' }}>Overall Score: 85%</strong>
                              <span style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 700 }}>ATS Ready & Market Aligned ✔</span>
                              <span style={{ fontSize: '0.64rem', color: '#94a3b8' }}>Role: Data Science & ML Specialist</span>
                            </div>
                          </div>

                          {/* CS Subjects Mini Progress Bars */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center' }}>
                            <span style={{ fontSize: '0.64rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>CS Core Subjects Progress:</span>
                            {[
                              { name: 'DSA & Algo', pct: '92%', color: '#10b981' },
                              { name: 'OS & DBMS', pct: '88%', color: '#f59e0b' },
                              { name: 'CN & OOPs', pct: '85%', color: '#3b82f6' },
                              { name: 'System Design', pct: '80%', color: '#9333ea' }
                            ].map((sub, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '0.6rem', color: '#cbd5e1', width: '75px' }}>{sub.name}</span>
                                <div style={{ flex: 1, height: '5px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                                  <div style={{ width: sub.pct, height: '100%', background: sub.color, borderRadius: '3px' }} />
                                </div>
                                <span style={{ fontSize: '0.6rem', color: sub.color, fontWeight: 700, width: '26px' }}>{sub.pct}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Dashboard Activity Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <span style={{ fontSize: '0.68rem', color: 'white', fontWeight: 700, display: 'block' }}>PDF Evaluation Report</span>
                              <span style={{ fontSize: '0.6rem', color: '#34d399' }}>Complete Breakdown Ready</span>
                            </div>
                            <span style={{ fontSize: '0.6rem', background: '#10b981', color: 'white', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>Export</span>
                          </div>

                          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <span style={{ fontSize: '0.68rem', color: 'white', fontWeight: 700, display: 'block' }}>Active Job Matches</span>
                              <span style={{ fontSize: '0.6rem', color: '#9333ea' }}>16 Live Opportunities</span>
                            </div>
                            <span style={{ fontSize: '0.6rem', background: '#9333ea', color: 'white', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>View</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* SCREEN 2: ATS Feature */}
                    <div style={{ position: 'absolute', inset: 0, opacity: showFeatureScreen ? 1 : 0, transition: 'opacity 0.5s ease', pointerEvents: showFeatureScreen ? 'auto' : 'none' }}>
                      <div style={{ padding: '16px 20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}><BarChart3 className="size-4" /> ATS Match Engine</span>
                          <span style={{ fontSize: '0.65rem', background: 'rgba(16,185,129,0.15)', color: '#34d399', padding: '3px 8px', borderRadius: '8px', fontWeight: 700 }}>85% Optimal</span>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Overall Score</span>
                            <strong style={{ fontSize: '0.82rem', color: '#10b981' }}>85% (ATS Ready ✔)</strong>
                          </div>
                          <div style={{ width: '100%', height: '10px', background: '#1e293b', borderRadius: '5px', overflow: 'hidden' }}>
                            <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)', borderRadius: '5px' }} />
                          </div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 700 }}>⚠ Missing Skills Detected:</span>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '8px' }}>
                            {['Docker', 'Kubernetes', 'CI/CD', 'AWS Lambda'].map((s, i) => (
                              <span key={i} style={{ background: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.25)', padding: '3px 10px', borderRadius: '10px', fontSize: '0.68rem', fontWeight: 600 }}>✗ {s}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Gemini AI Keywords:</span>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '8px' }}>
                            {['PyTorch', 'Scikit-learn', 'Random Forest', 'TF-IDF', 'NLP Pipelines', 'Feature Eng.'].map((kw, i) => (
                              <span key={i} style={{ background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.25)', padding: '3px 10px', borderRadius: '10px', fontSize: '0.68rem', fontWeight: 600 }}>+ {kw}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Laptop base */}
              <div style={{ height: '16px', width: '108%', marginLeft: '-4%', background: 'linear-gradient(to bottom, #475569, #1e293b)', borderRadius: '0 0 18px 18px', boxShadow: '0 12px 30px rgba(0,0,0,0.35)' }} />
            </motion.div>

          </div>
        </section>


        {/* ═══════════════════════════════════════════════
            FEATURE SPOTLIGHT — Laptop docks into right side
            ═══════════════════════════════════════════════ */}
        <section style={{ padding: '100px 0 100px', position: 'relative' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '32px', alignItems: 'center',
            background: '#ffffff', borderRadius: '28px', padding: '32px 36px',
            boxShadow: '0 16px 50px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', textAlign: 'left'
          }}>
            {/* LEFT TEXT */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ecfdf5', color: '#047857', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '16px' }}>
                <Sparkles className="size-4" /> Feature Spotlight
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#1c2427', margin: '0 0 16px 0', lineHeight: 1.15 }}>
                ATS Resume Screener & Real-Time Keyword Engine
              </h2>
              <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.65, margin: '0 0 24px 0' }}>
                CareerPilot parses candidate resumes against job descriptions, identifying missing skills, quantifying ATS match scores, and suggesting high-impact keywords dynamically generated by Gemini AI.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {[
                  { bg: '#ecfdf5', color: '#10b981', title: 'Instant Keyword Extraction & Match Score', desc: 'Extracts hard skills, soft skills, and missing keywords in seconds.' },
                  { bg: '#eff6ff', color: '#3b82f6', title: 'Dynamic LaTeX Source Generation', desc: 'Export clean LaTeX across 3 professional templates.' },
                  { bg: '#fff1f2', color: '#f43f5e', title: 'Voice AI Mock Interview Prep', desc: 'Simulate real interviews with speech recognition & AI feedback.' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ background: item.bg, color: item.color, padding: '6px', borderRadius: '8px', marginTop: '2px', flexShrink: 0 }}><CheckCircle className="size-4" /></div>
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: '#1c2427', display: 'block' }}>{item.title}</strong>
                      <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/upload" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1c2427', color: '#fff', padding: '12px 28px', borderRadius: '14px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
                Try ATS Screener Now <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* RIGHT — DOCK TARGET */}
            <div ref={dockRef} style={{ width: '100%', height: '360px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
          </div>
        </section>


        {/* FEATURES OVERVIEW SECTION */}
        <section className="section" id="featuresSection" style={{ padding: '70px 0 60px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
            <span className="section-tag">✨ Core Platform Modules</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: '12px 0', color: '#1c2427' }}>Everything You Need to Succeed</h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0 }}>Tailored tools engineered to elevate your resume, sharpen your technical interview skills, and land your ideal job.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {[
              { icon: BarChart3, color: '#10b981', bg: '#ecfdf5', title: 'ATS Resume Screener', desc: 'Upload your resume and get instant scoring, missing skill identification, formatting suggestions, and downloadable PDF evaluation reports.', link: '/upload', linkText: 'Scan Resume' },
              { icon: FileCode, color: '#3b82f6', bg: '#eff6ff', title: 'LaTeX Resume Architect', desc: 'Choose from 3 specialized LaTeX templates (Data & ML, Classic Tech, Executive). Edit form fields with magic autofill and compile online.', link: '/app/builder/default', linkText: 'Build LaTeX Resume' },
              { icon: Mic, color: '#f43f5e', bg: '#fff1f2', title: 'Voice AI Mock Interview', desc: 'Practice technical & behavioral interviews with dynamic speech recognition, audio playback, and comprehensive scoring breakdowns.', link: '/preparation', linkText: 'Start Interview' },
              { icon: Code2, color: '#d97706', bg: '#fef3c7', title: 'CS Special Evaluation Report', desc: 'Master DSA, OOPs, Operating Systems, DBMS, Computer Networks & System Design with theory notes, quizzes, and downloadable PDF reports.', link: '/preparation', linkText: 'Explore CS Subjects' },
              { icon: Search, color: '#9333ea', bg: '#f3e8ff', title: 'Live Job Matcher', desc: 'Search 100K+ real-time job listings using auto-extracted skills from your resume, location filters, and remote work preferences.', link: '/jobs', linkText: 'Browse Jobs' },
              { icon: Target, color: '#0891b2', bg: '#ecfeff', title: 'Career Roadmap & AI Keywords', desc: 'Get personalized career roadmaps and Gemini AI-recommended ATS keywords for any target role or specialization.', link: '/app/builder/default', linkText: 'Generate Keywords' }
            ].map((f, idx) => {
              const IconComp = f.icon;
              return (
                <TiltCard key={idx} style={{ background: '#fff', borderRadius: '24px', padding: '28px 24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
                  <div>
                    <div style={{ background: f.bg, color: f.color, width: '48px', height: '48px', borderRadius: '16px', display: 'grid', placeItems: 'center', marginBottom: '18px' }}><IconComp className="size-6" /></div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1c2427', margin: '0 0 10px 0' }}>{f.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, margin: '0 0 20px 0' }}>{f.desc}</p>
                  </div>
                  <Link to={f.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: f.color, fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none' }}>{f.linkText} <ArrowRight className="size-4" /></Link>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* CTA BANNER */}
        <section style={{ padding: '30px 0 80px' }}>
          <div style={{ background: 'linear-gradient(135deg, #1c2427, #0f172a)', borderRadius: '32px', padding: '50px 36px', color: '#fff', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, margin: '0 0 16px 0', fontFamily: '"Sora", sans-serif' }}>Ready to Accelerate Your Career?</h2>
            <p style={{ fontSize: '1.05rem', color: '#94a3b8', maxWidth: '640px', margin: '0 auto 28px auto', lineHeight: 1.6 }}>Join thousands of candidates using CareerPilot to optimize their resumes, crack AI mock interviews, and land top tech roles.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link className="btn btn-primary" to="/upload" style={{ padding: '14px 32px', background: 'linear-gradient(135deg, var(--accent), #ff8f57)', color: 'white', fontWeight: 700, borderRadius: '999px' }}>Build Your Resume Now <ArrowRight className="size-4 ml-1" /></Link>
              <Link className="btn btn-secondary" to="/preparation" style={{ padding: '14px 32px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 700, borderRadius: '999px' }}>Practice Mock Interviews</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Home;
