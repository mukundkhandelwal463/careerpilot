import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import {
  Sparkles,
  ArrowRight,
  Briefcase,
  Award,
  FileText,
  Layers,
  Mic,
  Code2,
  FileCode,
  Target,
  BarChart3,
  Search,
  CheckCircle,
  TrendingUp,
  Zap,
  Users,
  ShieldCheck,
  Star,
  Compass,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import '../css/home.css';

// 3D Interactive Tilt Card Component with dynamic light reflection
const TiltCard = ({ children, className = '', style = {} }) => {
  const cardRef = useRef(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const mouseXVal = (mouseX - rect.width / 2) / (rect.width / 2);
    const mouseYVal = (mouseY - rect.height / 2) / (rect.height / 2);

    const rotX = -mouseYVal * 8;
    const rotY = mouseXVal * 8;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
    setGlarePos({
      x: (mouseX / rect.width) * 100,
      y: (mouseY / rect.height) * 100,
      opacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        position: 'relative',
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
        overflow: 'hidden'
      }}
    >
      {children}
      {/* Glare effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`,
          opacity: glarePos.opacity,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          borderRadius: 'inherit'
        }}
      />
    </div>
  );
};

// Neural Mesh Background Canvas Component
const ParticleMeshCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(255, 107, 74, ' : 'rgba(16, 185, 129, '
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect particles with faint lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color + '0.6)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(203, 213, 225, ${0.12 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6
      }}
    />
  );
};

// Dedicated Laptop Mockup Component for Feature Spotlights 02, 03, 04 (With dynamic scroll slide-in & out effect)
const FeatureLaptopMockup = ({ type, direction = 'left' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -120 : 120 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative', width: '100%', maxWidth: '480px', margin: '0 auto' }}
    >
      {/* Laptop Frame */}
      <div style={{
        background: '#1c2427',
        borderRadius: '18px 18px 8px 8px',
        padding: '10px 10px 16px 10px',
        boxShadow: '0 20px 55px rgba(0,0,0,0.20)',
        border: '2px solid #334155'
      }}>
        {/* Webcam */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#475569' }} />
        </div>

        {/* Screen (20% smaller height & font scale) */}
        <div style={{
          background: '#0f172a',
          borderRadius: '10px',
          overflow: 'hidden',
          height: '288px',
          border: '1px solid rgba(255,255,255,0.08)',
          textAlign: 'left',
          position: 'relative',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between'
        }}>

          {type === 'latex' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileCode className="size-3.5 text-blue-400" />
                  <h4 style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 700, margin: 0 }}>LaTeX Resume Builder & Voice Studio</h4>
                </div>
                <span style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', padding: '2px 8px', borderRadius: '10px', fontSize: '0.6rem', fontWeight: 700 }}>● Live Studio</span>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '8px 10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: '#3b82f6', fontSize: '0.62rem', fontWeight: 700 }}>SELECTED TEMPLATE: Data Science & ML</span>
                <div style={{ fontFamily: 'monospace', color: '#94a3b8', fontSize: '0.58rem', marginTop: '4px', background: '#090d16', padding: '6px', borderRadius: '4px', lineHeight: 1.3 }}>
                  {`\\documentclass[11pt]{article}`} <br />
                  {`\\usepackage[margin=0.75in]{geometry}`} <br />
                  {`\\begin{document} \\textbf{EXPERIENCE...} \\end{document}`}
                </div>
              </div>

              <div style={{ background: 'rgba(244,63,94,0.08)', borderRadius: '8px', padding: '8px 10px', border: '1px solid rgba(244,63,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mic className="size-3.5 text-rose-400 animate-pulse" />
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.66rem', display: 'block' }}>Voice AI Speech Analytics</strong>
                    <span style={{ color: '#f43f5e', fontSize: '0.58rem' }}>Fluency: 94% | Accuracy: 92%</span>
                  </div>
                </div>
                <span style={{ background: '#f43f5e', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.56rem', fontWeight: 700 }}>Recording</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '6px 10px', borderRadius: '6px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.6rem' }}>Export Formats: PDF / DOCX / LaTeX</span>
                <span style={{ background: '#10b981', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.56rem', fontWeight: 700 }}>Download PDF</span>
              </div>
            </>
          )}

          {type === 'cs' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Code2 className="size-3.5 text-amber-400" />
                  <h4 style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 700, margin: 0 }}>CS Core Subjects & Top 50 DSA Sheet</h4>
                </div>
                <span style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', padding: '2px 8px', borderRadius: '10px', fontSize: '0.6rem', fontWeight: 700 }}>Technical Drills</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { topic: 'Top 50 Curated DSA Patterns', status: '45/50 Solved', pct: '90%', color: '#f59e0b' },
                  { topic: 'Operating Systems & Concurrency', status: 'Mastery: 94%', pct: '94%', color: '#10b981' },
                  { topic: 'DBMS, SQL & Indexing', status: 'Mastery: 88%', pct: '88%', color: '#3b82f6' },
                  { topic: 'Networks & System Design', status: 'Mastery: 85%', pct: '85%', color: '#9333ea' }
                ].map((sub, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '6px', padding: '6px 8px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ color: '#fff', fontSize: '0.66rem', display: 'block' }}>{sub.topic}</strong>
                      <span style={{ color: '#94a3b8', fontSize: '0.58rem' }}>{sub.status}</span>
                    </div>
                    <span style={{ background: sub.color, color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.56rem', fontWeight: 700 }}>{sub.pct}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(245,158,11,0.08)', padding: '6px 10px', borderRadius: '6px', border: '1px solid rgba(245,158,11,0.2)' }}>
                <span style={{ color: '#fef3c7', fontSize: '0.6rem', fontWeight: 700 }}>Full Diagnostic Report</span>
                <span style={{ background: '#f59e0b', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.56rem', fontWeight: 700 }}>Generate Report</span>
              </div>
            </>
          )}

          {type === 'jobs' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Search className="size-3.5 text-purple-400" />
                  <h4 style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 700, margin: 0 }}>Live Tech Job Matcher (Arbeitnow)</h4>
                </div>
                <span style={{ background: 'rgba(147,51,234,0.15)', color: '#a855f7', padding: '2px 8px', borderRadius: '10px', fontSize: '0.6rem', fontWeight: 700 }}>Arbeitnow API</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { title: 'Senior ML Engineer', company: 'TechCorp USA', type: 'Remote', match: '96% Match' },
                  { title: 'Full Stack Engineer', company: 'DataFlow Inc', type: 'Hybrid', match: '92% Match' },
                  { title: 'Backend Systems Architect', company: 'CloudScale Labs', type: 'Remote', match: '89% Match' }
                ].map((jb, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '6px 8px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ color: 'white', fontSize: '0.66rem', display: 'block' }}>{jb.title}</strong>
                      <span style={{ color: '#94a3b8', fontSize: '0.58rem' }}>{jb.company} • {jb.type}</span>
                    </div>
                    <span style={{ background: '#9333ea', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.56rem', fontWeight: 700 }}>{jb.match}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: 'rgba(147,51,234,0.08)', borderRadius: '8px', padding: '6px 10px', border: '1px solid rgba(147,51,234,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.6rem', color: '#cbd5e1' }}>Real-Time Source:</span>
                <span style={{ fontSize: '0.56rem', background: '#9333ea', color: 'white', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>● Arbeitnow Connected</span>
              </div>
            </>
          )}

        </div>
      </div>

      {/* Base */}
      <div style={{ height: '12px', width: '106%', marginLeft: '-3%', background: 'linear-gradient(to bottom, #475569, #1e293b)', borderRadius: '0 0 14px 14px', boxShadow: '0 8px 20px rgba(0,0,0,0.25)' }} />
    </motion.div>
  );
};

/* Feature pill tube data — clicking any tube redirects to that feature */
const featurePills = [
  { icon: BarChart3, bg: '#ecfdf5', color: '#10b981', title: 'ATS Resume Analyzer', link: '/upload' },
  { icon: Layers, bg: '#fdf4ff', color: '#c026d3', title: 'AI Resume Maker', link: '/app/builder/default' },
  { icon: FileCode, bg: '#eff6ff', color: '#3b82f6', title: 'LaTeX Resume Architect', link: '/app/builder/default' },
  { icon: Mic, bg: '#fff1f2', color: '#f43f5e', title: 'Voice AI Mock Interview', link: '/preparation' },
  { icon: Code2, bg: '#fef3c7', color: '#d97706', title: 'CS Special Evaluation', link: '/preparation' },
  { icon: Search, bg: '#f3e8ff', color: '#9333ea', title: 'Live Job Matching', link: '/jobs' },
  { icon: Target, bg: '#ecfeff', color: '#0891b2', title: 'Career Roadmap & Keywords', link: '/app/builder/default' }
];

/* Positions for the 7 floating pills around the hero laptop */
const pillPositions = [
  { top: '2%', left: '-25px', flyX: -520, flyY: -100 },
  { top: '26%', left: '-40px', flyX: -560, flyY: -30 },
  { top: '52%', left: '-45px', flyX: -560, flyY: 30 },
  { top: '78%', left: '-20px', flyX: -520, flyY: 100 },
  { top: '10%', right: '-25px', flyX: 520, flyY: -80 },
  { top: '44%', right: '-40px', flyX: 560, flyY: 0 },
  { top: '78%', right: '-20px', flyX: 520, flyY: 80 }
];

const Home = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const laptopRef = useRef(null);
  const dockRef1 = useRef(null); // Spotlight 01: Right Dock
  const dockRef2 = useRef(null); // Spotlight 02: Left Dock
  const dockRef3 = useRef(null); // Spotlight 03: Right Dock
  const dockRef4 = useRef(null); // Spotlight 04: Left Dock

  const [currentScreen, setCurrentScreen] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');

  // Roadmap horizontal track navigation
  const roadmapTrackRef = useRef(null);
  const handleScrollRoadmap = (direction) => {
    if (roadmapTrackRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      roadmapTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Dynamic calculated keyframe data based on exact document positions
  const [dockData, setDockData] = useState({
    p: [0, 0.18, 0.36, 0.54, 0.72, 0.88],
    x: [0, 240, -240, 240, -240, -240],
    y: [0, 700, 1400, 2100, 2800, 2920],
    scale: [1, 0.55, 0.55, 0.55, 0.55, 0.48]
  });

  const measurePositions = useCallback(() => {
    if (!heroRef.current || !laptopRef.current) return;
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;
    const maxScroll = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;

    if (maxScroll <= 0) return;

    // Measure exact un-transformed initial center of laptopRef element
    const laptopRect = laptopRef.current.getBoundingClientRect();
    let currentX = 0;
    let currentY = 0;
    try {
      if (typeof laptopX !== 'undefined' && laptopX?.get) currentX = laptopX.get() || 0;
      if (typeof laptopY !== 'undefined' && laptopY?.get) currentY = laptopY.get() || 0;
    } catch (e) {
      currentX = 0;
      currentY = 0;
    }
    const initialLaptopX = laptopRect.left + scrollX + laptopRect.width / 2 - currentX;
    const initialLaptopY = laptopRect.top + scrollY + laptopRect.height / 2 - currentY;

    const laptopWidth = laptopRef.current ? laptopRef.current.offsetWidth : 880;

    const getDockInfo = (ref, yOffset = 110) => {
      if (!ref.current) return { p: 0.2, x: 0, y: 500, scale: 0.52 };
      const r = ref.current.getBoundingClientRect();
      const cx = r.left + scrollX + r.width / 2;
      const cy = r.top + scrollY + r.height / 2 + yOffset;
      const p = Math.max(0, Math.min(1, (cy - window.innerHeight / 2) / maxScroll));
      const scale = Math.min((r.width / laptopWidth) * 0.92, 0.52);
      return {
        p,
        x: cx - initialLaptopX,   // exact horizontal translation to dock center
        y: cy - initialLaptopY,   // exact vertical translation to dock center
        scale
      };
    };

    const d1 = getDockInfo(dockRef1, 90); // 1% downside shift
    const d2 = getDockInfo(dockRef2, 90);
    const d3 = getDockInfo(dockRef3, 90);
    const d4 = getDockInfo(dockRef4, 90);

    // Fast early arrival & dock hold range
    const arrivalP = Math.max(0.03, d1.p - 0.08);
    const holdP = Math.min(1, d1.p + 0.04);

    setDockData({
      p: [0, arrivalP, holdP, 1],
      x: [0, d1.x, d1.x, d1.x],
      y: [0, d1.y, d1.y, d1.y],
      scale: [1, d1.scale * 1.05, d1.scale * 1.05, d1.scale * 1.05]
    });
  }, []);

  useEffect(() => {
    measurePositions();
    const t1 = setTimeout(measurePositions, 150);
    const t2 = setTimeout(measurePositions, 600);
    const t3 = setTimeout(measurePositions, 1200);
    window.addEventListener('resize', measurePositions);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', measurePositions);
    };
  }, [measurePositions]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const floatY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [0, 180]);

  // Continuous GPU-driven multi-step trajectory
  const rawLaptopX = useTransform(scrollYProgress, dockData.p, dockData.x);
  const rawLaptopY = useTransform(scrollYProgress, dockData.p, dockData.y);
  const rawLaptopScale = useTransform(scrollYProgress, dockData.p, dockData.scale);
  const rawPillProgress = useTransform(scrollYProgress, [0, (dockData.p[1] || 0.15) * 0.7], [0, 1]);

  // Fast responsive spring engine for quick laptop glide into target box
  const springConfig = { stiffness: 260, damping: 20, mass: 0.25, restDelta: 0.001 };
  const laptopX = useSpring(rawLaptopX, springConfig);
  const laptopY = useSpring(rawLaptopY, springConfig);
  const laptopScale = useSpring(rawLaptopScale, springConfig);
  const pillProgress = useSpring(rawPillProgress, springConfig);

  const laptopOpacity = useTransform(
    scrollYProgress,
    [0, 0.9, 1],
    [1, 1, 1]
  );

  // Direct GPU-driven pill transforms
  const pillTransforms = pillPositions.map(pos => ({
    x: useTransform(pillProgress, [0, 1], [0, pos.flyX]),
    y: useTransform(pillProgress, [0, 1], [0, pos.flyY]),
    opacity: useTransform(pillProgress, [0, 0.5, 1], [1, 1, 0]),
    scale: useTransform(pillProgress, [0, 1], [1, 0.75])
  }));

  // Screen crossfade for Spotlight 01
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const { p } = dockData;
    if (latest < (p[1] || 0.15)) {
      setCurrentScreen(0); // Hero
    } else {
      setCurrentScreen(1); // Spotlight 01
    }
  });

  return (
    <div ref={containerRef} className="page-shell" style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX: scaleY,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(to right, var(--accent), #ff8f57, #10b981)',
          transformOrigin: '0%',
          zIndex: 100000
        }}
      />

      <Navbar />

      {/* Dynamic Background Mesh & Glowing Blobs */}
      <ParticleMeshCanvas />
      <motion.div
        style={{
          position: 'absolute',
          top: '8%',
          right: '8%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,74,0.18) 0%, rgba(255,255,255,0) 70%)',
          filter: 'blur(60px)',
          y: floatY1,
          pointerEvents: 'none',
          zIndex: -1
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          top: '38%',
          left: '-5%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.16) 0%, rgba(255,255,255,0) 70%)',
          filter: 'blur(70px)',
          y: floatY2,
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      <main style={{ width: 'min(var(--max-width), calc(100% - 32px))', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ═══════════════════════════════════════════════════════
            HERO SECTION — Laptop upside, Text & Buttons downside
            ═══════════════════════════════════════════════════════ */}
        <section style={{ padding: '130px 0 30px', textAlign: 'center', position: 'relative' }}>

          {/* 3D Laptop Container & Floating Feature Pills (UPSIDE) */}
          <div ref={heroRef} style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '1440px', margin: '20px auto 40px auto' }}>

            {/* FLOATING FEATURE PILL TUBES */}
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
                    zIndex: 50,
                    willChange: 'transform, opacity'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={pill.link} style={{ textDecoration: 'none' }}>
                    <motion.div
                      whileHover={{ y: -6, scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{ y: [0, idx % 2 === 0 ? -6 : 6, 0] }}
                      transition={{ duration: 3.2 + idx * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        background: '#ffffff',
                        borderRadius: '999px',
                        padding: '12px 22px',
                        boxShadow: '0 14px 36px rgba(0,0,0,0.12)',
                        border: '1px solid #cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ background: pill.bg, padding: '8px', borderRadius: '12px', color: pill.color, flexShrink: 0, display: 'grid', placeItems: 'center' }}>
                        <Icon className="size-4" />
                      </div>
                      <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1c2427' }}>{pill.title}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}

            {/* SINGLE PARALLAX LAPTOP MOCKUP — Glides & Docks across sections */}
            <motion.div
              ref={laptopRef}
              style={{
                x: laptopX, y: laptopY, scale: laptopScale, opacity: laptopOpacity,
                position: 'relative', width: '100%', maxWidth: '880px', zIndex: 30,
                willChange: 'transform, opacity', transformStyle: 'preserve-3d'
              }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* LAPTOP BODY */}
              <div style={{ background: '#1c2427', borderRadius: '26px 26px 10px 10px', padding: '14px 14px 24px 14px', boxShadow: '0 35px 90px rgba(0,0,0,0.3)', border: '2px solid #334155' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#475569' }} />
                </div>

                {/* SCREEN CONTAINER WITH SMOOTH CROSSFADE BETWEEN 5 SCREENS */}
                <div style={{ background: '#0f172a', borderRadius: '14px', overflow: 'hidden', display: 'flex', height: '500px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'left', position: 'relative' }}>

                  {/* Left Sidebar */}
                  <div style={{ width: '56px', background: '#090d16', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', paddingTop: '20px', borderRight: '1px solid rgba(255,255,255,0.05)', flexShrink: 0, zIndex: 10 }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--accent), #ff8f57)', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '0.75rem', color: 'white' }}>C</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                      <FileText className="size-5" style={{ color: currentScreen === 0 ? 'var(--accent)' : '#475569', transition: 'color 0.3s' }} />
                      <BarChart3 className="size-5" style={{ color: currentScreen === 1 ? '#10b981' : '#475569', transition: 'color 0.3s' }} />
                      <FileCode className="size-5" style={{ color: currentScreen === 2 ? '#3b82f6' : '#475569', transition: 'color 0.3s' }} />
                      <Code2 className="size-5" style={{ color: currentScreen === 3 ? '#f59e0b' : '#475569', transition: 'color 0.3s' }} />
                      <Search className="size-5" style={{ color: currentScreen === 4 ? '#9333ea' : '#475569', transition: 'color 0.3s' }} />
                    </div>
                  </div>

                  {/* SCREEN CONTENTS (Crossfading dynamically) */}
                  <div style={{ flex: 1, position: 'relative' }}>

                    {/* SCREEN 0: Live Platform Dashboard (Hero) */}
                    <div style={{ position: 'absolute', inset: 0, opacity: currentScreen === 0 ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: currentScreen === 0 ? 'auto' : 'none', padding: '16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                        <div>
                          <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, margin: 0 }}>Welcome back, Candidate! 👋</h4>
                          <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>Career Readiness & Evaluation Scorecard</span>
                        </div>
                        <span style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.68rem', fontWeight: 700 }}>● Live Dashboard</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                        {[
                          { title: 'Avg ATS Score', val: '85%', color: '#10b981' },
                          { title: 'Scanned Resumes', val: '3', color: '#3b82f6' },
                          { title: 'Interview Score', val: '78%', color: '#f59e0b' },
                          { title: 'Job Fit Score', val: '88%', color: '#ec4899' }
                        ].map((stat, i) => (
                          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '8px 10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <span style={{ color: '#94a3b8', fontSize: '0.62rem', display: 'block' }}>{stat.title}</span>
                            <strong style={{ color: stat.color, fontSize: '0.95rem', fontWeight: 800 }}>{stat.val}</strong>
                          </div>
                        ))}
                      </div>

                      <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(255,255,255,0.06)', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '12px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'conic-gradient(#10b981 0% 85%, #334155 85% 100%)', display: 'grid', placeItems: 'center', fontSize: '0.65rem', color: 'white', fontWeight: 800 }}>85%</div>
                            <div>
                              <strong style={{ color: 'white', fontSize: '0.78rem', display: 'block' }}>Overall Score: 85%</strong>
                              <span style={{ color: '#10b981', fontSize: '0.65rem', fontWeight: 700 }}>ATS Ready & Market Aligned ✓</span>
                            </div>
                          </div>
                          <span style={{ color: '#94a3b8', fontSize: '0.65rem' }}>Role: Data Science & ML Specialist</span>
                        </div>
                        <div>
                          <span style={{ color: '#cbd5e1', fontSize: '0.65rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>CS CORE SUBJECTS PROGRESS:</span>
                          {[
                            { name: 'DSA & Algo', width: '92%', color: '#10b981' },
                            { name: 'OS & DBMS', width: '83%', color: '#3b82f6' },
                            { name: 'CN & OOPs', width: '85%', color: '#f59e0b' },
                            { name: 'System Design', width: '80%', color: '#ec4899' }
                          ].map((sb, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                              <span style={{ color: '#94a3b8', fontSize: '0.6rem', width: '65px' }}>{sb.name}</span>
                              <div style={{ flex: 1, height: '4px', background: '#1e293b', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: sb.width, background: sb.color }} />
                              </div>
                              <span style={{ color: '#cbd5e1', fontSize: '0.58rem' }}>{sb.width}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '8px 12px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <strong style={{ color: 'white', fontSize: '0.72rem', display: 'block' }}>PDF Evaluation Report</strong>
                            <span style={{ color: '#94a3b8', fontSize: '0.62rem' }}>Complete Breakdown Ready</span>
                          </div>
                          <span style={{ background: '#10b981', color: 'white', padding: '3px 8px', borderRadius: '4px', fontSize: '0.62rem', fontWeight: 700 }}>Export</span>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '8px 12px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <strong style={{ color: 'white', fontSize: '0.72rem', display: 'block' }}>Active Job Matches</strong>
                            <span style={{ color: '#94a3b8', fontSize: '0.62rem' }}>16 Live Opportunities</span>
                          </div>
                          <span style={{ background: '#3b82f6', color: 'white', padding: '3px 8px', borderRadius: '4px', fontSize: '0.62rem', fontWeight: 700 }}>View</span>
                        </div>
                      </div>
                    </div>

                    {/* SCREEN 1: ATS Match Engine (Spotlight 01) */}
                    <div style={{ position: 'absolute', inset: 0, opacity: currentScreen === 1 ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: currentScreen === 1 ? 'auto' : 'none', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <BarChart3 className="size-4 text-emerald-400" />
                          <h4 style={{ color: '#fff', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>ATS Match Engine</h4>
                        </div>
                        <span style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '3px 10px', borderRadius: '12px', fontSize: '0.68rem', fontWeight: 700 }}>85% Optimal Match</span>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ color: '#cbd5e1', fontSize: '0.72rem' }}>ATS Parser Compatibility</span>
                          <span style={{ color: '#10b981', fontSize: '0.72rem', fontWeight: 700 }}>85% (ATS Ready ✓)</span>
                        </div>
                        <div style={{ height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: '85%', background: '#10b981' }} />
                        </div>
                      </div>
                      <div style={{ background: 'rgba(239,68,68,0.08)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(239,68,68,0.2)' }}>
                        <span style={{ color: '#f87171', fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>⚠️ Missing Skills Detected:</span>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {['Docker', 'Kubernetes', 'CI/CD', 'AWS Lambda'].map((sk, idx) => (
                            <span key={idx} style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem' }}>✕ {sk}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ background: 'rgba(16,185,129,0.08)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(16,185,129,0.2)' }}>
                        <span style={{ color: '#34d399', fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>GEMINI AI KEYWORDS RECOMMENDED:</span>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {['PyTorch', 'Scikit-learn', 'Random Forest', 'TF-IDF', 'NLP Pipelines'].map((kw, idx) => (
                            <span key={idx} style={{ background: 'rgba(16,185,129,0.15)', color: '#6ee7b7', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem' }}>+ {kw}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* SCREEN 2: LaTeX Resume Architect & Voice Studio (Spotlight 02) */}
                    <div style={{ position: 'absolute', inset: 0, opacity: currentScreen === 2 ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: currentScreen === 2 ? 'auto' : 'none', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FileCode className="size-4 text-blue-400" />
                          <h4 style={{ color: '#fff', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>LaTeX Resume Builder & Voice AI Studio</h4>
                        </div>
                        <span style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', padding: '3px 10px', borderRadius: '12px', fontSize: '0.68rem', fontWeight: 700 }}>Interactive Suite</span>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '10px 12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <span style={{ color: '#3b82f6', fontSize: '0.7rem', fontWeight: 700 }}>SELECTED LATEX TEMPLATE: Data Science & ML Specialist</span>
                        <div style={{ fontFamily: 'monospace', color: '#94a3b8', fontSize: '0.65rem', marginTop: '6px', background: '#090d16', padding: '8px', borderRadius: '6px' }}>
                          {`\\documentclass[11pt]{article}`} <br />
                          {`\\usepackage[margin=0.75in]{geometry}`} <br />
                          {`\\begin{document} \\textbf{EXPERIENCE: Senior Data Scientist...} \\end{document}`}
                        </div>
                      </div>
                      <div style={{ background: 'rgba(244,63,94,0.08)', borderRadius: '10px', padding: '10px 12px', border: '1px solid rgba(244,63,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Mic className="size-4 text-rose-400" />
                          <div>
                            <strong style={{ color: '#fff', fontSize: '0.72rem', display: 'block' }}>Voice AI Speech Analysis</strong>
                            <span style={{ color: '#f43f5e', fontSize: '0.64rem' }}>Technical Accuracy: 88% | Fluency: High</span>
                          </div>
                        </div>
                        <span style={{ background: '#f43f5e', color: 'white', padding: '3px 8px', borderRadius: '4px', fontSize: '0.62rem', fontWeight: 700 }}>Live Feed</span>
                      </div>
                    </div>

                    {/* SCREEN 3: CS Core Subjects Hub (Spotlight 03) */}
                    <div style={{ position: 'absolute', inset: 0, opacity: currentScreen === 3 ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: currentScreen === 3 ? 'auto' : 'none', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Code2 className="size-4 text-amber-400" />
                          <h4 style={{ color: '#fff', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>CS Core Subjects & Top 50 DSA Sheet</h4>
                        </div>
                        <span style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', padding: '3px 10px', borderRadius: '12px', fontSize: '0.68rem', fontWeight: 700 }}>Technical Drills</span>
                      </div>
                      {[
                        { topic: 'Top 50 DSA Patterns', status: '42/50 Completed', pct: '84%', color: '#f59e0b' },
                        { topic: 'Operating Systems & Concurrency', status: 'Mastery Score: 92%', pct: '92%', color: '#10b981' },
                        { topic: 'DBMS, SQL & Indexing', status: 'Mastery Score: 85%', pct: '85%', color: '#3b82f6' },
                        { topic: 'Computer Networks & System Design', status: 'Mastery Score: 80%', pct: '80%', color: '#9333ea' }
                      ].map((sub, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '8px 12px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <strong style={{ color: '#fff', fontSize: '0.72rem', display: 'block' }}>{sub.topic}</strong>
                            <span style={{ color: '#94a3b8', fontSize: '0.62rem' }}>{sub.status}</span>
                          </div>
                          <span style={{ background: sub.color, color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.62rem', fontWeight: 700 }}>{sub.pct}</span>
                        </div>
                      ))}
                    </div>

                    {/* SCREEN 4: Live Job Matcher (Spotlight 04) */}
                    <div style={{ position: 'absolute', inset: 0, opacity: currentScreen === 4 ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: currentScreen === 4 ? 'auto' : 'none', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Search className="size-4 text-purple-400" />
                          <h4 style={{ color: '#fff', fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Live Job Matcher Feed</h4>
                        </div>
                        <span style={{ background: 'rgba(147,51,234,0.15)', color: '#a855f7', padding: '3px 10px', borderRadius: '12px', fontSize: '0.68rem', fontWeight: 700 }}>Arbeitnow Job API</span>
                      </div>
                      {[
                        { title: 'Senior Machine Learning Engineer', company: 'TechCorp USA', type: 'Remote (US/EU)', match: '96% Skill Match' },
                        { title: 'Full Stack Engineer (React/Python)', company: 'DataFlow Inc', type: 'Hybrid', match: '91% Skill Match' },
                        { title: 'Backend Systems Architect', company: 'CloudScale Labs', type: 'Remote', match: '88% Skill Match' }
                      ].map((jb, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '8px 12px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <strong style={{ color: 'white', fontSize: '0.72rem', display: 'block' }}>{jb.title}</strong>
                            <span style={{ color: '#94a3b8', fontSize: '0.62rem' }}>{jb.company} • {jb.type}</span>
                          </div>
                          <span style={{ background: '#9333ea', color: 'white', padding: '3px 8px', borderRadius: '4px', fontSize: '0.62rem', fontWeight: 700 }}>{jb.match}</span>
                        </div>
                      ))}
                      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '8px 12px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Verified Job Source API:</span>
                        <span style={{ fontSize: '0.64rem', background: '#9333ea', color: 'white', padding: '3px 10px', borderRadius: '4px', fontWeight: 700 }}>Arbeitnow API Connected</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Laptop base */}
              <div style={{ height: '16px', width: '108%', marginLeft: '-4%', background: 'linear-gradient(to bottom, #475569, #1e293b)', borderRadius: '0 0 18px 18px', boxShadow: '0 12px 30px rgba(0,0,0,0.35)' }} />
            </motion.div>

          </div>

          {/* Hero Title (DOWNSIDE - Line break for Real-Time AI Precision) */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#1c2427',
              maxWidth: '1100px',
              margin: '0 auto 24px auto'
            }}
          >
            Accelerate Your Tech Career with <br />
            <span style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, #ff8f57 50%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Real-Time AI Precision
            </span>
          </motion.h1>

          {/* Quick Action Buttons (DOWNSIDE) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}
          >
            <Link
              to="/upload"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'linear-gradient(135deg, var(--accent), #ff8f57)',
                color: 'white',
                padding: '16px 36px',
                borderRadius: '16px',
                fontWeight: 800,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 12px 30px rgba(255,107,74,0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              Analyze Your Resume <ArrowRight className="size-5" />
            </Link>
            <Link
              to="/preparation"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#ffffff',
                color: '#1c2427',
                padding: '16px 32px',
                borderRadius: '16px',
                fontWeight: 800,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease'
              }}
            >
              <Mic className="size-5 text-rose-500" /> Start AI Interview
            </Link>
          </motion.div>

        </section>


        {/* ═══════════════════════════════════════════════
            FEATURE SPOTLIGHT 01 — Text on LEFT, Dock on RIGHT
            ═══════════════════════════════════════════════ */}
        <section style={{ padding: '20px 0 80px', position: 'relative' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1.05fr 0.95fr',
            gap: '36px', alignItems: 'center',
            background: '#ffffff', borderRadius: '28px', padding: '40px 44px',
            boxShadow: '0 16px 50px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', textAlign: 'left'
          }}>
            {/* LEFT TEXT */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ecfdf5', color: '#047857', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '16px' }}>
                <Sparkles className="size-4" /> Feature Spotlight 01
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#1c2427', margin: '0 0 16px 0', lineHeight: 1.15 }}>
                ATS Resume Screener & Real-Time Keyword Engine
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#64748b', lineHeight: 1.65, margin: '0 0 24px 0' }}>
                CareerPilot parses candidate resumes against job descriptions, identifying missing skills, quantifying ATS match scores, and suggesting high-impact keywords dynamically generated by Gemini AI.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {[
                  { bg: '#ecfdf5', color: '#10b981', title: 'Instant Keyword Extraction & Match Score', desc: 'Extracts hard skills, soft skills, and missing keywords in seconds.' },
                  { bg: '#eff6ff', color: '#3b82f6', title: 'Dynamic Skill Gap Analysis', desc: 'Compares candidate profiles against targeted employer requirements.' },
                  { bg: '#fff1f2', color: '#f43f5e', title: 'Actionable Improvement Roadmap', desc: 'Provides instant advice to maximize ATS resume parser compatibility.' }
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

            {/* RIGHT — DOCK BAY 01 */}
            <div ref={dockRef1} style={{ width: '100%', height: '400px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
          </div>
        </section>


        {/* ═══════════════════════════════════════════════
            FEATURE SPOTLIGHT 02 — Dock on LEFT, Text on RIGHT
            ═══════════════════════════════════════════════ */}
        <section style={{ padding: '140px 0 140px', position: 'relative' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '0.95fr 1.05fr',
            gap: '36px', alignItems: 'center',
            background: '#ffffff', borderRadius: '28px', padding: '40px 44px',
            boxShadow: '0 16px 50px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', textAlign: 'left'
          }}>
            {/* LEFT — FEATURE SPOTLIGHT 02 LAPTOP MOCKUP (Slides Left -> Right) */}
            <div ref={dockRef2} style={{ width: '100%' }}>
              <FeatureLaptopMockup type="latex" direction="left" />
            </div>

            {/* RIGHT TEXT */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#eff6ff', color: '#1d4ed8', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '16px' }}>
                <Sparkles className="size-4" /> Feature Spotlight 02
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#1c2427', margin: '0 0 16px 0', lineHeight: 1.15 }}>
                AI Resume Architect & Voice AI Mock Interviews
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#64748b', lineHeight: 1.65, margin: '0 0 24px 0' }}>
                Build high-converting LaTeX resumes tailored for tech roles and sharpen candidate confidence with interactive voice AI mock interviews and CS subject drills.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {[
                  { bg: '#eff6ff', color: '#3b82f6', title: 'Automated LaTeX Resume Compilation', desc: 'Craft polished executive & tech resumes directly downloadable as DOCX or PDF.' },
                  { bg: '#fff1f2', color: '#f43f5e', title: 'Voice AI Practice & Scorecards', desc: 'Get speech feedback, fluency analytics, and technical accuracy scoring.' },
                  { bg: '#fef3c7', color: '#d97706', title: 'CS Core Subjects & DSA Trackers', desc: 'Master DSA sheets, OS, DBMS, OOPs, and System Design with guided roadmaps.' }
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
              <Link to="/app/builder/default" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1c2427', color: '#fff', padding: '12px 28px', borderRadius: '14px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
                Build LaTeX Resume <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════
            FEATURE SPOTLIGHT 03 — Text on LEFT, Dock on RIGHT
            ═══════════════════════════════════════════════ */}
        <section style={{ padding: '140px 0 140px', position: 'relative' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1.05fr 0.95fr',
            gap: '36px', alignItems: 'center',
            background: '#ffffff', borderRadius: '28px', padding: '40px 44px',
            boxShadow: '0 16px 50px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', textAlign: 'left'
          }}>
            {/* LEFT TEXT */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fef3c7', color: '#b45309', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '16px' }}>
                <Sparkles className="size-4" /> Feature Spotlight 03
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#1c2427', margin: '0 0 16px 0', lineHeight: 1.15 }}>
                CS Special Evaluation & Technical Core Drills
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#64748b', lineHeight: 1.65, margin: '0 0 24px 0' }}>
                Master essential computer science core subjects with topic-wise revision notes, top 50 DSA sheet pattern trackers, and downloadable subject diagnostic reports.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {[
                  { bg: '#fef3c7', color: '#d97706', title: 'Top 50 Curated DSA Patterns', desc: 'Handpicked problem sets with direct LeetCode and GeeksforGeeks links.' },
                  { bg: '#ecfdf5', color: '#10b981', title: 'Core CS Subject Theory Notes', desc: 'Master Operating Systems, DBMS, Networking, OOPs, and System Design.' },
                  { bg: '#f3e8ff', color: '#9333ea', title: 'Diagnostic Quizzes & PDF Scorecards', desc: 'Test your understanding and export personalized subject readiness scorecards.' }
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
              <Link to="/preparation" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1c2427', color: '#fff', padding: '12px 28px', borderRadius: '14px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
                Explore CS Preparation <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* RIGHT — FEATURE SPOTLIGHT 03 LAPTOP MOCKUP (Slides Right -> Left) */}
            <div ref={dockRef3} style={{ width: '100%' }}>
              <FeatureLaptopMockup type="cs" direction="right" />
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════
            FEATURE SPOTLIGHT 04 — Dock on LEFT, Text on RIGHT
            ═══════════════════════════════════════════════ */}
        <section style={{ padding: '140px 0 160px', position: 'relative' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '0.95fr 1.05fr',
            gap: '36px', alignItems: 'center',
            background: '#ffffff', borderRadius: '28px', padding: '40px 44px',
            boxShadow: '0 16px 50px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', textAlign: 'left'
          }}>
            {/* LEFT — FEATURE SPOTLIGHT 04 LAPTOP MOCKUP (Slides Left -> Right) */}
            <div ref={dockRef4} style={{ width: '100%' }}>
              <FeatureLaptopMockup type="jobs" direction="left" />
            </div>

            {/* RIGHT TEXT */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f3e8ff', color: '#7e22ce', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '16px' }}>
                <Sparkles className="size-4" /> Feature Spotlight 04
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#1c2427', margin: '0 0 16px 0', lineHeight: 1.15 }}>
                Live Job Matcher & AI Career Mapping
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#64748b', lineHeight: 1.65, margin: '0 0 24px 0' }}>
                Search thousands of live tech job listings indexed directly against your resume skill profile, with remote filters and one-click application routing.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {[
                  { bg: '#f3e8ff', color: '#9333ea', title: 'Skill-Graph Job Matching', desc: 'Matches live job postings with your extracted resume skills and category.' },
                  { bg: '#ecfeff', color: '#0891b2', title: 'Remote & Location Filtering', desc: 'Filter remote opportunities, tech hubs, and competitive salary bands.' },
                  { bg: '#ecfdf5', color: '#10b981', title: 'Direct Application Links', desc: 'One-click application routing powered by verified job board APIs.' }
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
              <Link to="/jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1c2427', color: '#fff', padding: '12px 28px', borderRadius: '14px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
                Browse Live Jobs <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════
            WINDING S-CURVE CANDIDATE ROADMAP (EXACT INFOGRAPHIC DESIGN)
            ═══════════════════════════════════════════════ */}
        <section style={{ padding: '80px 0 100px', overflow: 'hidden', position: 'relative', background: 'transparent', color: '#1c2427' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px auto', position: 'relative', zIndex: 1, padding: '0 20px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              color: '#92400e',
              padding: '5px 16px',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 800,
              marginBottom: '10px',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              <Compass className="size-4" /> INTERACTIVE CANDIDATE PIPELINE
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', color: '#1c2427', fontWeight: 900, letterSpacing: '-0.02em', margin: '0 0 8px 0' }}>
              Your 5-Step Path to Landing Top Offers
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '0 0 20px 0', lineHeight: 1.45 }}>
              Follow the winding S-curve road — click the navigation arrows or drag to glide through all 5 stages.
            </p>

            {/* Navigation Arrow Controls */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
              <button
                onClick={() => handleScrollRoadmap('left')}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#1c2427',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s ease'
                }}
                aria-label="Previous Step"
              >
                <ChevronLeft className="size-5" />
              </button>
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700 }}>Move Along Road</span>
              <button
                onClick={() => handleScrollRoadmap('right')}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#1c2427',
                  border: 'none',
                  color: '#ffffff',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 6px 16px rgba(28,36,39,0.2)',
                  transition: 'all 0.2s ease'
                }}
                aria-label="Next Step"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>

          {/* Winding S-Curve Road Container (Horizontal Scrollable with Generous Spacing) */}
          <div style={{ position: 'relative', width: '100%', zIndex: 1 }}>
            <div
              ref={roadmapTrackRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                overflowX: 'auto',
                padding: '40px 6vw 40px 6vw',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                scrollSnapType: 'x mandatory',
                position: 'relative',
                minHeight: '660px'
              }}
            >
              {/* SVG Winding S-Curve Asphalt Road Track (Starts at Step 01 & Ends at Step 05) */}
              <svg
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '6vw',
                  transform: 'translateY(-50%)',
                  width: '2300px',
                  height: '420px',
                  pointerEvents: 'none',
                  zIndex: 0
                }}
                viewBox="0 0 2300 420"
                fill="none"
              >
                {/* Outer Dark Asphalt Road */}
                <path
                  d="M 230 210 Q 460 50, 690 210 T 1150 210 T 1610 210 Q 1840 50, 2070 210"
                  stroke="#334155"
                  strokeWidth="42"
                  strokeLinecap="round"
                />
                {/* Inner Road Border Outline */}
                <path
                  d="M 230 210 Q 460 50, 690 210 T 1150 210 T 1610 210 Q 1840 50, 2070 210"
                  stroke="#1e293b"
                  strokeWidth="32"
                  strokeLinecap="round"
                />
                {/* White Dashed Center Line */}
                <path
                  d="M 230 210 Q 460 50, 690 210 T 1150 210 T 1610 210 Q 1840 50, 2070 210"
                  stroke="#ffffff"
                  strokeWidth="4"
                  strokeDasharray="16 16"
                  opacity="0.9"
                />
              </svg>

              {/* 5 Alternating Circular Step Pin Nodes */}
              {[
                {
                  num: '01',
                  label: 'STEP 01',
                  title: 'Upload & Scan Resume',
                  icon: BarChart3,
                  color: '#10b981',
                  bg: '#ecfdf5',
                  desc: 'Upload your existing PDF/DOCX CV. Get instant match scoring (0-100%) & ATS keyword gap analysis.',
                  link: '/upload',
                  cta: 'Scan Resume',
                  isTop: true
                },
                {
                  num: '02',
                  label: 'STEP 02',
                  title: 'Build LaTeX Resume',
                  icon: FileCode,
                  color: '#06b6d4',
                  bg: '#ecfeff',
                  desc: 'Select an executive LaTeX template. Auto-fill Gemini AI keywords & export high-conversion PDF.',
                  link: '/app/builder/default',
                  cta: 'Build LaTeX',
                  isTop: false
                },
                {
                  num: '03',
                  label: 'STEP 03',
                  title: 'Ace Voice & Tech Tests',
                  icon: Mic,
                  color: '#3b82f6',
                  bg: '#eff6ff',
                  desc: 'Practice real-time speech AI interviews, full-length 60-MCQ mock tests & CS subject revision notes.',
                  link: '/preparation',
                  cta: 'Start AI Drills',
                  isTop: true
                },
                {
                  num: '04',
                  label: 'STEP 04',
                  title: 'Target Role Roadmap',
                  icon: Target,
                  color: '#9333ea',
                  bg: '#f3e8ff',
                  desc: 'Define your goal role (SDE/ML). Gemini AI maps your skill gaps into a study plan with streak tracking.',
                  link: '/preparation',
                  cta: 'Generate Roadmap',
                  isTop: false
                },
                {
                  num: '05',
                  label: 'STEP 05',
                  title: 'Land Live Job Offers',
                  icon: Briefcase,
                  color: '#f59e0b',
                  bg: '#fef3c7',
                  desc: 'Match your resume skill graph against 100K+ live tech jobs synchronized daily via Arbeitnow API.',
                  link: '/jobs',
                  cta: 'Browse Jobs',
                  isTop: true
                }
              ].map((card, i) => {
                const IconComp = card.icon;
                return (
                  <div
                    key={i}
                    style={{
                      width: '460px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                      zIndex: 1,
                      scrollSnapAlign: 'center',
                      flexShrink: 0,
                      marginTop: card.isTop ? '0px' : '260px',
                      marginBottom: card.isTop ? '260px' : '0px'
                    }}
                  >
                    {/* Top Pin Node (if isTop = true) */}
                    {card.isTop && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
                        {/* Circular Step Pin */}
                        <div style={{
                          width: '84px',
                          height: '84px',
                          borderRadius: '50%',
                          background: '#ffffff',
                          border: `6px solid ${card.color}`,
                          boxShadow: `0 10px 30px ${card.color}40`,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justify: 'center',
                          position: 'relative',
                          zIndex: 2
                        }}>
                          <span style={{ fontSize: '1.25rem', fontWeight: 900, color: card.color, lineHeight: 1 }}>{card.num}</span>
                          <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.06em' }}>STEP</span>
                        </div>
                        {/* Pointer Pin Arrow */}
                        <div style={{
                          width: 0,
                          height: 0,
                          borderLeft: '12px solid transparent',
                          borderRight: '12px solid transparent',
                          borderTop: `16px solid ${card.color}`,
                          marginTop: '-2px'
                        }} />
                      </div>
                    )}

                    {/* Step Card Details */}
                    <div style={{
                      width: '310px',
                      background: '#ffffff',
                      borderRadius: '24px',
                      padding: '24px 20px',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.06)',
                      border: `1px solid ${card.color}35`,
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}>
                      <div style={{ background: card.bg, color: card.color, padding: '10px', borderRadius: '16px', marginBottom: '12px', display: 'grid', placeItems: 'center' }}>
                        <IconComp className="size-6" />
                      </div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: card.color, letterSpacing: '0.08em', background: card.bg, padding: '3px 12px', borderRadius: '12px', marginBottom: '8px' }}>
                        {card.label}
                      </span>
                      <h3 style={{ fontSize: '1.18rem', fontWeight: 900, color: '#1c2427', margin: '0 0 6px 0' }}>
                        {card.title}
                      </h3>
                      <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                        {card.desc}
                      </p>
                      <Link
                        to={card.link}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: card.bg,
                          color: card.color,
                          padding: '8px 18px',
                          borderRadius: '12px',
                          fontWeight: 800,
                          fontSize: '0.82rem',
                          textDecoration: 'none'
                        }}
                      >
                        {card.cta} <ArrowRight className="size-4" />
                      </Link>
                    </div>

                    {/* Bottom Pin Node (if isTop = false) */}
                    {!card.isTop && (
                      <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', marginTop: '16px' }}>
                        {/* Circular Step Pin */}
                        <div style={{
                          width: '84px',
                          height: '84px',
                          borderRadius: '50%',
                          background: '#ffffff',
                          border: `6px solid ${card.color}`,
                          boxShadow: `0 10px 30px ${card.color}40`,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justify: 'center',
                          position: 'relative',
                          zIndex: 2
                        }}>
                          <span style={{ fontSize: '1.25rem', fontWeight: 900, color: card.color, lineHeight: 1 }}>{card.num}</span>
                          <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.06em' }}>STEP</span>
                        </div>
                        {/* Pointer Pin Arrow */}
                        <div style={{
                          width: 0,
                          height: 0,
                          borderLeft: '12px solid transparent',
                          borderRight: '12px solid transparent',
                          borderBottom: `16px solid ${card.color}`,
                          marginBottom: '-2px'
                        }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════
            REDESIGNED 1: METRIC IMPACT OBSIDIAN RIBBON
            ═══════════════════════════════════════════════ */}
        <section style={{ padding: '60px 0 90px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #090d16 0%, #151d2a 50%, #0a0f1d 100%)',
            borderRadius: '32px',
            padding: '48px 36px',
            boxShadow: '0 35px 80px rgba(0,0,0,0.30)',
            border: '1px solid rgba(255,255,255,0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Glowing Mesh Orbs */}
            <div style={{ position: 'absolute', top: '-40%', left: '20%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,107,74,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-40%', right: '20%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '32px',
              position: 'relative',
              zIndex: 1
            }}>
              {[
                { val: '98.4%', label: 'ATS Match Precision', icon: Target, color: '#10b981', badge: 'Workday & Greenhouse' },
                { val: '50,000+', label: 'Resumes Optimized', icon: FileText, color: '#3b82f6', badge: 'Top Tech Candidates' },
                { val: '100K+', label: 'Live Jobs Indexed', icon: Briefcase, color: '#9333ea', badge: 'Real-Time Sync' },
                { val: '4.9 / 5', label: 'Candidate Rating', icon: Award, color: '#f59e0b', badge: 'Verified Reviews' }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '20px',
                      padding: '28px 20px',
                      border: '1px solid rgba(255,255,255,0.06)',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justify: 'center',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                      <div style={{ background: `${stat.color}18`, color: stat.color, padding: '8px', borderRadius: '12px', border: `1px solid ${stat.color}30` }}>
                        <Icon className="size-4" />
                      </div>
                      <span style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', padding: '3px 10px', borderRadius: '12px', fontSize: '0.68rem', fontWeight: 700 }}>
                        {stat.badge}
                      </span>
                    </div>
                    <h3 style={{ fontSize: 'clamp(2.1rem, 3.2vw, 2.6rem)', fontWeight: 900, color: 'white', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
                      {stat.val}
                    </h3>
                    <strong style={{ fontSize: '0.96rem', color: '#f8fafc', display: 'block' }}>
                      {stat.label}
                    </strong>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════
            REDESIGNED 2: CORE PLATFORM MODULES & CATEGORY TABS
            ═══════════════════════════════════════════════ */}
        <section className="section" id="featuresSection" style={{ padding: '40px 0 90px' }}>
          <div style={{ textAlign: 'center', maxWidth: '920px', margin: '0 auto 44px auto' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              color: '#1d4ed8',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: 800,
              marginBottom: '14px'
            }}>
              <Sparkles className="size-4" /> AI-POWERED CAREER INFRASTRUCTURE
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', margin: '0 auto 16px auto', color: '#1c2427', fontWeight: 900, letterSpacing: '-0.02em', maxWidth: '1000px', lineHeight: 1.2 }}>
              Everything You Need <br /> to Scale Your Career
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0, lineHeight: 1.6 }}>
              10 specialized modules engineered with AI precision to optimize resumes, master technical interviews, and automate job discovery.
            </p>

            {/* Interactive Category Filter Pills (Clean Single Line Layout) */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '28px' }}>
              {[
                { id: 'all', label: 'All Modules' },
                { id: 'resume', label: 'Resume & History' },
                { id: 'interview', label: 'Voice AI & Mock Tests' },
                { id: 'career', label: 'Roadmap & Tasks' },
                { id: 'cs', label: 'CS & PDF Reports' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.25s ease',
                    background: activeCategory === tab.id ? '#1c2427' : '#f1f5f9',
                    color: activeCategory === tab.id ? '#ffffff' : '#64748b',
                    boxShadow: activeCategory === tab.id ? '0 8px 20px rgba(28,36,39,0.18)' : 'none'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Module Cards Container — Perfectly Centered Flex Grid */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '28px', maxWidth: '1240px', margin: '0 auto' }}>
            {[
              { id: 'screener', category: 'resume', icon: BarChart3, color: '#10b981', bg: '#ecfdf5', title: 'ATS Resume Screener', desc: 'Upload your resume to get instant scoring, missing skill identification, formatting suggestions, and parser compatibility diagnostics.', highlights: ['Instant ATS Score (0-100%)', 'Missing Keywords & Skill Gap', 'Workday & Greenhouse Compatible'], link: '/upload', linkText: 'Scan Resume' },
              { id: 'latex', category: 'resume', icon: FileCode, color: '#3b82f6', bg: '#eff6ff', title: 'LaTeX Resume Architect', desc: 'Choose from 3 specialized LaTeX templates (Data Science/ML, Classic Tech, Executive). Edit fields with magic autofill and compile online.', highlights: ['3 Executive LaTeX Templates', 'Magic Autofill Form Engine', 'Direct DOCX & PDF Export'], link: '/app/builder/default', linkText: 'Build LaTeX Resume' },
              { id: 'records', category: 'resume', icon: FileText, color: '#6366f1', bg: '#e0e7ff', title: 'Previous Records & History', desc: 'Track and manage your past parsed resumes, historical ATS match scores, generated reports, and candidate progression over time.', highlights: ['Historical ATS Score Trends', 'Saved Evaluation Reports', 'One-Click Resume View & Re-scan'], link: '/app/history', linkText: 'View History' },
              { id: 'voice', category: 'interview', icon: Mic, color: '#f43f5e', bg: '#fff1f2', title: 'Voice AI Mock Interview', desc: 'Practice technical & behavioral interviews with dynamic speech recognition, audio recording playback, and real-time scorecards.', highlights: ['Speech Fluency Analytics', 'Technical Accuracy Scoring', 'Role-Specific Question Bank'], link: '/preparation', linkText: 'Start AI Interview' },
              { id: 'mocktest', category: 'interview', icon: Award, color: '#8b5cf6', bg: '#f3e8ff', title: 'Full-Length AI Mock Test', desc: 'Take full-length AI assessments covering Technical (60 MCQs), Verbal (15 MCQs), Aptitude (15 MCQs), and Coding (2 Problems).', highlights: ['Technical, Aptitude & Verbal MCQs', '2 Real-Time Coding Problems', 'Easy / Medium / Hard Modes'], link: '/preparation', linkText: 'Start Assessment' },
              { id: 'roadmap', category: 'career', icon: Target, color: '#0891b2', bg: '#ecfeff', title: 'Career Roadmap Visualizer', desc: 'Provide your target role (Data Scientist, DevOps, SDE). Gemini AI generates a custom level-by-level study roadmap mapped to your CV.', highlights: ['Target Role Skill Gap Analysis', 'Level-by-Level Study Roadmap', 'CV-to-Role Mapping Engine'], link: '/preparation', linkText: 'Generate Roadmap' },
              { id: 'tasktracker', category: 'career', icon: CheckCircle, color: '#14b8a6', bg: '#ccfbf1', title: 'Preparation Task Tracker', desc: 'Stay consistent with daily preparation tasks, interactive calendar views, goal countdown timers, and daily streak counters.', highlights: ['Daily Task Schedule & Calendar', 'Streak Counter & Study Timer', 'Custom Learning Goals'], link: '/preparation', linkText: 'Track Preparation' },
              { id: 'jobs', category: 'career', icon: Search, color: '#9333ea', bg: '#f3e8ff', title: 'Live Tech Job Matcher Feed', desc: 'Search 100K+ live tech job listings indexed directly against your resume skill graph, with remote filters and direct application links.', highlights: ['Skill-Graph Matching Engine', 'Remote & Hub Location Filters', 'Direct Arbeitnow API Sync'], link: '/jobs', linkText: 'Browse Live Jobs' },
              { id: 'cs', category: 'cs', icon: Code2, color: '#d97706', bg: '#fef3c7', title: 'CS Special Evaluation', desc: 'Master DSA pattern sheets, Operating Systems, DBMS & SQL, OOPs, Computer Networks, and System Design with guided notes.', highlights: ['Top 50 Curated DSA Patterns', 'Core CS Subject Theory Notes', 'Topic-Wise Revision Drills'], link: '/preparation', linkText: 'Explore CS Subjects' },
              { id: 'reports', category: 'cs', icon: TrendingUp, color: '#059669', bg: '#d1fae5', title: 'Complete Evaluation Reports', desc: 'Generate and download comprehensive PDF readiness scorecards breaking down ATS compatibility, subject readiness, and interview scores.', highlights: ['Comprehensive Diagnostic PDF', 'Breakdown of Weak Areas', 'Recruiter-Ready PDF Export'], link: '/upload', linkText: 'Download Reports' }
            ]
              .filter(m => activeCategory === 'all' || m.category === activeCategory)
              .map((f) => {
                const IconComp = f.icon;
                return (
                  <TiltCard
                    key={f.id}
                    style={{
                      flex: '1 1 340px',
                      maxWidth: '380px',
                      width: '100%',
                      background: '#ffffff',
                      borderRadius: '28px',
                      padding: '34px 30px',
                      boxShadow: '0 14px 40px rgba(0,0,0,0.04)',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      flexDirection: 'column',
                      justify: 'space-between',
                      textAlign: 'left'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                        <div style={{ background: f.bg, color: f.color, width: '54px', height: '54px', borderRadius: '18px', display: 'grid', placeItems: 'center', boxShadow: `0 8px 20px ${f.color}20` }}>
                          <IconComp className="size-6" />
                        </div>
                        <span style={{ background: f.bg, color: f.color, padding: '4px 12px', borderRadius: '14px', fontSize: '0.74rem', fontWeight: 800 }}>
                          ● Active Module
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.28rem', fontWeight: 800, color: '#1c2427', margin: '0 0 12px 0' }}>
                        {f.title}
                      </h3>
                      <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.65, margin: '0 0 20px 0' }}>
                        {f.desc}
                      </p>

                      {/* Feature Bullet Highlights */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '26px' }}>
                        {f.highlights.map((hl, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle className="size-4" style={{ color: f.color, flexShrink: 0 }} />
                            <span style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 600 }}>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      to={f.link}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        color: '#1c2427',
                        padding: '12px 20px',
                        borderRadius: '16px',
                        fontWeight: 800,
                        fontSize: '0.88rem',
                        textDecoration: 'none',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <span>{f.linkText}</span>
                      <ArrowRight className="size-4" style={{ color: f.color }} />
                    </Link>
                  </TiltCard>
                );
              })}
          </div>
        </section>


        {/* ═══════════════════════════════════════════════
            REDESIGNED 3: VERIFIED CANDIDATE SUCCESS STORIES
            ═══════════════════════════════════════════════ */}
        <section style={{ padding: '50px 0 90px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 50px auto' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#fef3c7',
              color: '#b45309',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: 800,
              marginBottom: '14px'
            }}>
              <Star className="size-4 fill-current" /> VERIFIED CANDIDATE SUCCESS STORIES
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: '0 0 14px 0', color: '#1c2427', fontWeight: 900 }}>
              Trusted by Tech Professionals
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0 }}>
              See how software engineers and data scientists boosted their match scores and landed top offers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '28px' }}>
            {[
              {
                initials: 'AC',
                bg: 'linear-gradient(135deg, #10b981, #059669)',
                name: 'Alex Chen',
                role: 'Machine Learning Engineer',
                company: 'Hired at Top Tech',
                metric: '94% ATS Match (+32%)',
                text: 'CareerPilot identified key missing PyTorch & Docker keywords I was lacking. Uploading the suggested keywords boosted my resume match score from 62% to 94%!'
              },
              {
                initials: 'SJ',
                bg: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                name: 'Sarah Jenkins',
                role: 'Full Stack Engineer',
                company: 'Hired Remote ($160K)',
                metric: '4 Recruiter Calls / Wk',
                text: 'The LaTeX resume builder is incredible. Compiling my resume directly into PDF with executive formatting got me 4 recruiter interview calls in the very first week!'
              },
              {
                initials: 'DK',
                bg: 'linear-gradient(135deg, #f43f5e, #be123c)',
                name: 'David Kumar',
                role: 'Backend Systems Developer',
                company: 'Landed Senior Role',
                metric: 'Scored 94% Voice AI',
                text: 'The Voice AI mock interview gave me real-time feedback on technical accuracy and speech clarity. It was a game-changer for my confidence before system design interviews.'
              }
            ].map((t, idx) => (
              <TiltCard
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '28px',
                  padding: '32px',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.03)',
                  border: '1px solid #e2e8f0',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: t.bg, color: 'white', width: '44px', height: '44px', borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '0.95rem' }}>
                        {t.initials}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.98rem', color: '#1c2427', display: 'block' }}>{t.name}</strong>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{t.role}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
                      {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
                    </div>
                  </div>

                  <p style={{ fontSize: '0.94rem', color: '#475569', lineHeight: 1.65, margin: '0 0 22px 0', fontStyle: 'italic' }}>
                    "{t.text}"
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{t.company}</span>
                  <span style={{ background: '#ecfdf5', color: '#10b981', padding: '5px 12px', borderRadius: '14px', fontSize: '0.76rem', fontWeight: 800 }}>
                    {t.metric}
                  </span>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>


        {/* ═══════════════════════════════════════════════
            REDESIGNED 4: HIGH-IMPACT CYBERPUNK CTA BANNER
            ═══════════════════════════════════════════════ */}
        <section style={{ padding: '20px 0 90px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 60%, #0f172a 100%)',
            borderRadius: '36px',
            padding: '64px 44px',
            color: '#fff',
            textAlign: 'center',
            boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
            border: '1px solid rgba(255, 107, 74, 0.25)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background Orbs */}
            <div style={{ position: 'absolute', top: '-40%', right: '-15%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,74,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-40%', left: '-15%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,107,74,0.15)',
                color: '#ff8f57',
                padding: '6px 18px',
                borderRadius: '20px',
                fontSize: '0.82rem',
                fontWeight: 800,
                marginBottom: '20px',
                border: '1px solid rgba(255,107,74,0.3)'
              }}>
                <Zap className="size-4" /> START YOUR CAREER ACCELERATION
              </span>

              <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, margin: '0 0 18px 0', letterSpacing: '-0.02em' }}>
                Ready to Land Your Dream Tech Role?
              </h2>
              <p style={{ fontSize: '1.12rem', color: '#94a3b8', maxWidth: '680px', margin: '0 auto 36px auto', lineHeight: 1.65 }}>
                Join 50,000+ candidates using CareerPilot to optimize resumes with Gemini AI, master technical voice interviews, and land top software & ML engineering positions.
              </p>

              <div style={{ display: 'flex', gap: '18px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '36px' }}>
                <Link
                  to="/upload"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '16px 38px',
                    background: 'linear-gradient(135deg, var(--accent), #ff8f57)',
                    color: 'white',
                    fontWeight: 800,
                    borderRadius: '999px',
                    fontSize: '1.02rem',
                    textDecoration: 'none',
                    boxShadow: '0 12px 35px rgba(255,107,74,0.35)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Build Your Resume Now <ArrowRight className="size-5" />
                </Link>

                <Link
                  to="/preparation"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '16px 36px',
                    background: 'rgba(255,255,255,0.06)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.18)',
                    fontWeight: 800,
                    borderRadius: '999px',
                    fontSize: '1.02rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Mic className="size-5 text-rose-400" /> Practice Mock Interviews
                </Link>
              </div>

              {/* Bottom Feature Badges */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {[
                  { icon: ShieldCheck, text: '100% Free Trial Available' },
                  { icon: FileText, text: 'Instant PDF & DOCX Downloads' },
                  { icon: Users, text: 'Trusted by 50,000+ Engineers' }
                ].map((b, i) => {
                  const BIcon = b.icon;
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 600 }}>
                      <BIcon className="size-4 text-emerald-400" />
                      <span>{b.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Home;
