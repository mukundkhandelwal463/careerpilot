import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import SEOHead from '../Components/SEOHead.jsx';
import IndustryWheelSection from '../Components/IndustryWheelSection.jsx';
import CareerPilotBentoGrid from '../Components/CareerPilotBentoGrid.jsx';
import ClaudeAmberCTA from '../Components/ClaudeAmberCTA.jsx';
import BlogMarqueeSection from '../Components/BlogMarqueeSection.jsx';
import EditorialFaqAccordion from '../Components/EditorialFaqAccordion.jsx';
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

// 3D Interactive Tilt Card Component with dynamic light reflection (GPU optimized)
const TiltCard = ({ children, className = '', style = {} }) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const mouseXVal = (mouseX - rect.width / 2) / (rect.width / 2);
    const mouseYVal = (mouseY - rect.height / 2) / (rect.height / 2);

    const rotX = -mouseYVal * 7;
    const rotY = mouseXVal * 7;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${(mouseX / rect.width) * 100}% ${(mouseY / rect.height) * 100}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`;
      glareRef.current.style.opacity = '0.15';
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
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
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
        overflow: 'hidden',
        willChange: 'transform'
      }}
    >
      {children}
      {/* Glare effect */}
      <div
        ref={glareRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          borderRadius: 'inherit'
        }}
      />
    </div>
  );
};

// Neural Mesh Background Canvas Component (Optimized 60FPS)
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
    window.addEventListener('resize', handleResize, { passive: true });

    // 20 particles (80% less distance checks than 45 particles)
    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.8 + 1,
      color: Math.random() > 0.5 ? 'rgba(255, 107, 74, ' : 'rgba(16, 185, 129, '
    }));

    const maxDistSq = 135 * 135;

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(canvas);

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

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
            const distSq = dx * dx + dy * dy;

            if (distSq < maxDistSq) {
              const alpha = 0.12 * (1 - Math.sqrt(distSq) / 135);
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(203, 213, 225, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
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
        opacity: 0.28
      }}
    />
  );
};

// Dedicated Laptop Mockup Component for Feature Spotlights 02, 03, 04 (With dynamic scroll slide-in & out effect)
const FeatureLaptopMockup = ({ type, direction = 'left' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -80 : 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative', width: '100%', maxWidth: '480px', margin: '0 auto', willChange: 'transform, opacity' }}
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

/* 5-Step Career Journey Roadmap Steps (Restored Authentic S-Curve Highway) */
const ROADMAP_STEPS = [
  {
    num: '01',
    label: 'STEP 01',
    title: 'Upload & Scan Resume',
    icon: BarChart3,
    color: '#D97757',
    bg: 'rgba(217, 119, 87, 0.12)',
    desc: 'Upload your existing PDF/DOCX CV. Get instant match scoring (0–100%) & ATS keyword gap analysis.',
    link: '/upload',
    cta: 'Scan Resume',
    isTop: true
  },
  {
    num: '02',
    label: 'STEP 02',
    title: 'Build LaTeX Resume',
    icon: FileCode,
    color: '#5EA397',
    bg: 'rgba(94, 163, 151, 0.14)',
    desc: 'Select an executive LaTeX template. Auto-fill AI keywords & export high-conversion PDF.',
    link: '/app/builder/default',
    cta: 'Build LaTeX',
    isTop: false
  },
  {
    num: '03',
    label: 'STEP 03',
    title: 'Ace Voice & Tech Tests',
    icon: Mic,
    color: '#C05D3C',
    bg: 'rgba(192, 93, 60, 0.12)',
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
    color: '#8C6239',
    bg: 'rgba(140, 98, 57, 0.14)',
    desc: 'Define your goal role (SDE/ML). CareerPilot maps your skill gaps into an actionable daily study roadmap.',
    link: '/preparation',
    cta: 'Generate Roadmap',
    isTop: false
  },
  {
    num: '05',
    label: 'STEP 05',
    title: 'Land Live Job Offers',
    icon: Briefcase,
    color: '#D97757',
    bg: 'rgba(217, 119, 87, 0.12)',
    desc: 'Match your resume skill graph against 100K+ live tech jobs synchronized daily via verified job APIs.',
    link: '/jobs',
    cta: 'Browse Jobs',
    isTop: true
  }
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

  // Initialize Lenis smooth scroll with clean RAF lifecycle
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.5
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
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

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.01 });
  const floatY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [0, 180]);

  // Continuous GPU-driven multi-step trajectory
  const rawLaptopX = useTransform(scrollYProgress, dockData.p, dockData.x);
  const rawLaptopY = useTransform(scrollYProgress, dockData.p, dockData.y);
  const rawLaptopScale = useTransform(scrollYProgress, dockData.p, dockData.scale);
  const rawPillProgress = useTransform(scrollYProgress, [0, (dockData.p[1] || 0.15) * 0.7], [0, 1]);

  // Fast responsive spring engine for quick laptop glide into target box (settles cleanly to save frames)
  const springConfig = { stiffness: 220, damping: 26, mass: 0.3, restDelta: 0.01 };
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

  // Screen crossfade for Spotlight 01 (only triggers React state update when value actually flips)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const { p } = dockData;
    const target = latest < (p[1] || 0.15) ? 0 : 1;
    setCurrentScreen(prev => (prev !== target ? target : prev));
  });

  const homeFaqs = [
    {
      q: 'What is CareerPilot and how does its AI ATS resume screener work?',
      a: 'CareerPilot is an AI-powered career preparation platform that parses your PDF, DOCX, or TXT resume against a target Job Description. It computes an ATS compatibility score (0–100%), highlights missing technical keywords, and provides actionable bullet-point improvements.'
    },
    {
      q: 'How can I practice technical and behavioral interviews with CareerPilot?',
      a: 'Upload your resume in the Preparation Hub to launch an AI Voice or Written Mock Interview tailored to your projects and skills. After each answer, CareerPilot scores your technical depth, English clarity, and fluency with immediate improvement tips.'
    },
    {
      q: 'Does CareerPilot include a LaTeX resume builder and ATS templates?',
      a: 'Yes. CareerPilot features an Executive LaTeX & Template Resume Builder that can auto-parse an existing resume file, suggest stream-specific ATS keywords with AI, and export clean PDF and DOCX files optimized for recruiter parsing.'
    },
    {
      q: 'What Computer Science subjects and mock tests are included?',
      a: 'CareerPilot provides structured theory modules for Operating Systems (OS), DBMS, Computer Networks (CN), OOPs, System Design, and DSA patterns, alongside a full-length timed 5-section mock test with MCQ and coding challenges.'
    },
    {
      q: 'Is my resume and personal data kept private on CareerPilot?',
      a: 'Yes. All traffic is secured over HTTPS/TLS, user dashboards and private resume scans require authentication and are excluded from search engine indexing, and uploaded documents are stored in encrypted cloud infrastructure.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  return (
    <div ref={containerRef} className="page-shell" style={{ position: 'relative', overflowX: 'hidden' }}>
      <SEOHead
        title="CareerPilot — Free AI ATS Resume Screener, LaTeX Resume Builder & Voice Mock Interviews"
        description="CareerPilot (careerpilot.website) is a free AI ATS Resume Screener, Executive LaTeX Resume Builder, AI Voice Mock Interviewer, and CS Fundamentals Prep Hub for software engineers and job seekers."
        path="/"
        keywords="CareerPilot, CareerPilot website, free AI resume screener, ATS resume score checker online, beat ATS resume, LaTeX resume builder for software engineers, AI voice mock interview practice, CS fundamentals OS DBMS CN OOPs, placement preparation platform"
        breadcrumbs={[{ name: 'Home', url: '/' }]}
        jsonLd={faqSchema}
      />
      {/* Scroll Progress Bar — Claude Amber */}
      <motion.div
        style={{
          scaleX: scaleY,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3.5px',
          background: 'linear-gradient(to right, #D97757, #E6997A, #1F1E1D)',
          transformOrigin: '0%',
          zIndex: 100000
        }}
      />

      <Navbar />

      {/* Subtle Warm Claude Amber Ambient Glows */}
      <ParticleMeshCanvas />
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '5%',
          right: '6%',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 119, 87, 0.14) 0%, rgba(250,249,245,0) 70%)',
          filter: 'blur(75px)',
          y: floatY1,
          pointerEvents: 'none',
          zIndex: -1
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '36%',
          left: '-6%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230, 153, 122, 0.12) 0%, rgba(250,249,245,0) 70%)',
          filter: 'blur(80px)',
          y: floatY2,
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      <main style={{ width: '100%', maxWidth: '100%', margin: 0, padding: 0, position: 'relative', zIndex: 1 }}>

        {/* ═══════════════════════════════════════════════════════
            HERO SECTION — Laptop upside, Text & Buttons downside
            ═══════════════════════════════════════════════════════ */}
        <section style={{ padding: '130px clamp(16px, 3vw, 48px) 30px', textAlign: 'center', position: 'relative' }}>

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
                          <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, margin: 0 }}>Welcome back, Candidate!</h4>
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
                              <span style={{ color: '#10b981', fontSize: '0.65rem', fontWeight: 700 }}>ATS Ready & Market Aligned</span>
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
                          <span style={{ color: '#10b981', fontSize: '0.72rem', fontWeight: 700 }}>85% (ATS Ready)</span>
                        </div>
                        <div style={{ height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: '85%', background: '#10b981' }} />
                        </div>
                      </div>
                      <div style={{ background: 'rgba(239,68,68,0.08)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(239,68,68,0.2)' }}>
                        <span style={{ color: '#f87171', fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Missing Skills Detected:</span>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {['Docker', 'Kubernetes', 'CI/CD', 'AWS Lambda'].map((sk, idx) => (
                            <span key={idx} style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem' }}>{sk}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ background: 'rgba(16,185,129,0.08)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(16,185,129,0.2)' }}>
                        <span style={{ color: '#34d399', fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>AI ENGINE KEYWORDS RECOMMENDED:</span>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {['PyTorch', 'Scikit-learn', 'Random Forest', 'TF-IDF', 'NLP Pipelines'].map((kw, idx) => (
                            <span key={idx} style={{ background: 'rgba(16,185,129,0.15)', color: '#6ee7b7', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem' }}>{kw}</span>
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

          {/* Hero Title (DOWNSIDE — Claude Amber + Outfit Typography) */}
          <motion.h1
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: 'clamp(2.3rem, 5vw, 4.1rem)',
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: '-0.025em',
              color: '#1F1E1D',
              maxWidth: '1100px',
              margin: '0 auto 24px auto'
            }}
          >
            Accelerate Your Tech Career with <br />
            <span style={{
              background: 'linear-gradient(135deg, #D97757 0%, #C05D3C 52%, #1F1E1D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Real-Time AI Precision
            </span>
          </motion.h1>

          {/* Quick Action Buttons (Claude Amber Tactile Spring CTAs) */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}
          >
            <motion.div whileHover={{ y: -3, scale: 1.025 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 380, damping: 22 }}>
              <Link
                to="/upload"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'linear-gradient(135deg, #D97757, #C05D3C)',
                  color: '#FDFCF9',
                  padding: '16px 36px',
                  borderRadius: '1rem',
                  fontWeight: 800,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  boxShadow: '0 14px 32px rgba(217, 119, 87, 0.36)',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                Analyze Your Resume <ArrowRight className="size-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3, scale: 1.025 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 380, damping: 22 }}>
              <Link
                to="/preparation"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#1F1E1D',
                  color: '#FDFCF9',
                  padding: '16px 32px',
                  borderRadius: '1rem',
                  fontWeight: 800,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  boxShadow: '0 10px 26px rgba(31, 30, 29, 0.2)',
                  border: '1px solid #3D3B37',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                <Mic className="size-5" style={{ color: '#D97757' }} /> Start AI Interview
              </Link>
            </motion.div>
          </motion.div>

        </section>


        {/* ═══════════════════════════════════════════════
            FEATURE SPOTLIGHT 01 — Color A (Text LEFT, Dock RIGHT)
            ═══════════════════════════════════════════════ */}
        <section style={{ width: '100%', margin: 0, padding: 'clamp(56px, 7vw, 84px) 0', background: '#FFFFFF', borderBottom: '1px solid rgba(31, 30, 29, 0.08)', position: 'relative' }}>
          <div style={{
            width: 'calc(100% - clamp(32px, 7vw, 112px))',
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'grid', gridTemplateColumns: '1.05fr 0.95fr',
            gap: 'clamp(36px, 5vw, 64px)', alignItems: 'center',
            textAlign: 'left'
          }}>
            {/* LEFT TEXT */}
            <div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#1F1E1D', margin: '0 0 16px 0', lineHeight: 1.15 }}>
                ATS Resume Screener & Real-Time Keyword Engine
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#5C5954', lineHeight: 1.65, margin: '0 0 24px 0' }}>
                CareerPilot parses candidate resumes against job descriptions, identifying missing skills, quantifying ATS match scores, and suggesting high-impact keywords dynamically generated by our AI engine.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {[
                  { bg: 'rgba(217, 119, 87, 0.14)', color: '#D97757', title: 'Instant Keyword Extraction & Match Score', desc: 'Extracts hard skills, soft skills, and missing keywords in seconds.' },
                  { bg: 'rgba(94, 163, 151, 0.16)', color: '#3E8276', title: 'Dynamic Skill Gap Analysis', desc: 'Compares candidate profiles against targeted employer requirements.' },
                  { bg: 'rgba(192, 93, 60, 0.12)', color: '#C05D3C', title: 'Actionable Improvement Roadmap', desc: 'Provides instant advice to maximize ATS resume parser compatibility.' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ background: item.bg, color: item.color, padding: '6px', borderRadius: '8px', marginTop: '2px', flexShrink: 0 }}><CheckCircle className="size-4" /></div>
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: '#1F1E1D', display: 'block' }}>{item.title}</strong>
                      <span style={{ fontSize: '0.82rem', color: '#5C5954' }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/upload" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1F1E1D', color: '#FDFCF9', padding: '12px 28px', borderRadius: '1rem', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem', boxShadow: '0 8px 20px rgba(31, 30, 29, 0.18)' }}>
                Try ATS Screener Now <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* RIGHT — DOCK BAY 01 */}
            <div ref={dockRef1} style={{ width: '100%', height: '400px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
          </div>
        </section>


        {/* ═══════════════════════════════════════════════
            FEATURE SPOTLIGHT 02 — Color B (Dock LEFT, Text RIGHT)
            ═══════════════════════════════════════════════ */}
        <section style={{ width: '100%', margin: 0, padding: 'clamp(56px, 7vw, 84px) 0', background: '#F4EFE6', borderBottom: '1px solid rgba(31, 30, 29, 0.08)', position: 'relative' }}>
          <div style={{
            width: 'calc(100% - clamp(32px, 7vw, 112px))',
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'grid', gridTemplateColumns: '0.95fr 1.05fr',
            gap: 'clamp(36px, 5vw, 64px)', alignItems: 'center',
            textAlign: 'left'
          }}>
            {/* LEFT — FEATURE SPOTLIGHT 02 LAPTOP MOCKUP (Slides Left -> Right) */}
            <div ref={dockRef2} style={{ width: '100%' }}>
              <FeatureLaptopMockup type="latex" direction="left" />
            </div>

            {/* RIGHT TEXT */}
            <div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#1F1E1D', margin: '0 0 16px 0', lineHeight: 1.15 }}>
                AI Resume Architect & Voice AI Mock Interviews
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#5C5954', lineHeight: 1.65, margin: '0 0 24px 0' }}>
                Build high-converting LaTeX resumes tailored for tech roles and sharpen candidate confidence with interactive voice AI mock interviews and CS subject drills.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {[
                  { bg: 'rgba(201, 100, 66, 0.12)', color: '#C96442', title: 'Automated LaTeX Resume Compilation', desc: 'Craft polished executive & tech resumes directly downloadable as DOCX or PDF.' },
                  { bg: 'rgba(94, 163, 151, 0.14)', color: '#3E8276', title: 'Voice AI Practice & Scorecards', desc: 'Get speech feedback, fluency analytics, and technical accuracy scoring.' },
                  { bg: 'rgba(31, 30, 29, 0.07)', color: '#535146', title: 'CS Core Subjects & DSA Trackers', desc: 'Master DSA sheets, OS, DBMS, OOPs, and System Design with guided roadmaps.' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ background: item.bg, color: item.color, padding: '6px', borderRadius: '8px', marginTop: '2px', flexShrink: 0 }}><CheckCircle className="size-4" /></div>
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: '#1F1E1D', display: 'block' }}>{item.title}</strong>
                      <span style={{ fontSize: '0.82rem', color: '#5C5954' }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/app/builder/default" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1F1E1D', color: '#FAF9F5', padding: '12px 28px', borderRadius: '1rem', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
                Build LaTeX Resume <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════
            FEATURE SPOTLIGHT 03 — Color A (Text LEFT, Dock RIGHT)
            ═══════════════════════════════════════════════ */}
        <section style={{ width: '100%', margin: 0, padding: 'clamp(56px, 7vw, 84px) 0', background: '#FFFFFF', borderBottom: '1px solid rgba(31, 30, 29, 0.08)', position: 'relative' }}>
          <div style={{
            width: 'calc(100% - clamp(32px, 7vw, 112px))',
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'grid', gridTemplateColumns: '1.05fr 0.95fr',
            gap: 'clamp(36px, 5vw, 64px)', alignItems: 'center',
            textAlign: 'left'
          }}>
            {/* LEFT TEXT */}
            <div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#1F1E1D', margin: '0 0 16px 0', lineHeight: 1.15 }}>
                CS Special Evaluation & Technical Core Drills
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#5C5954', lineHeight: 1.65, margin: '0 0 24px 0' }}>
                Master essential computer science core subjects with topic-wise revision notes, top 50 DSA sheet pattern trackers, and downloadable subject diagnostic reports.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {[
                  { bg: 'rgba(201, 100, 66, 0.12)', color: '#C96442', title: 'Top 50 Curated DSA Patterns', desc: 'Handpicked problem sets with direct LeetCode and GeeksforGeeks links.' },
                  { bg: 'rgba(94, 163, 151, 0.14)', color: '#3E8276', title: 'Core CS Subject Theory Notes', desc: 'Master Operating Systems, DBMS, Networking, OOPs, and System Design.' },
                  { bg: 'rgba(31, 30, 29, 0.07)', color: '#535146', title: 'Diagnostic Quizzes & PDF Scorecards', desc: 'Test your understanding and export personalized subject readiness scorecards.' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ background: item.bg, color: item.color, padding: '6px', borderRadius: '8px', marginTop: '2px', flexShrink: 0 }}><CheckCircle className="size-4" /></div>
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: '#1F1E1D', display: 'block' }}>{item.title}</strong>
                      <span style={{ fontSize: '0.82rem', color: '#5C5954' }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/preparation" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1F1E1D', color: '#FAF9F5', padding: '12px 28px', borderRadius: '1rem', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
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
            FEATURE SPOTLIGHT 04 — Color B (Dock LEFT, Text RIGHT)
            ═══════════════════════════════════════════════ */}
        <section style={{ width: '100%', margin: 0, padding: 'clamp(56px, 7vw, 84px) 0', background: '#F4EFE6', borderBottom: '1px solid rgba(31, 30, 29, 0.08)', position: 'relative' }}>
          <div style={{
            width: 'calc(100% - clamp(32px, 7vw, 112px))',
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'grid', gridTemplateColumns: '0.95fr 1.05fr',
            gap: 'clamp(36px, 5vw, 64px)', alignItems: 'center',
            textAlign: 'left'
          }}>
            {/* LEFT — FEATURE SPOTLIGHT 04 LAPTOP MOCKUP (Slides Left -> Right) */}
            <div ref={dockRef4} style={{ width: '100%' }}>
              <FeatureLaptopMockup type="jobs" direction="left" />
            </div>

            {/* RIGHT TEXT */}
            <div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#1F1E1D', margin: '0 0 16px 0', lineHeight: 1.15 }}>
                Live Job Matcher & AI Career Mapping
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#5C5954', lineHeight: 1.65, margin: '0 0 24px 0' }}>
                Search thousands of live tech job listings indexed directly against your resume skill profile, with remote filters and one-click application routing.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {[
                  { bg: 'rgba(201, 100, 66, 0.12)', color: '#C96442', title: 'Skill-Graph Job Matching', desc: 'Matches live job postings with your extracted resume skills and category.' },
                  { bg: 'rgba(94, 163, 151, 0.14)', color: '#3E8276', title: 'Remote & Location Filtering', desc: 'Filter remote opportunities, tech hubs, and competitive salary bands.' },
                  { bg: 'rgba(31, 30, 29, 0.07)', color: '#535146', title: 'Direct Application Links', desc: 'One-click application routing powered by verified job board APIs.' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ background: item.bg, color: item.color, padding: '6px', borderRadius: '8px', marginTop: '2px', flexShrink: 0 }}><CheckCircle className="size-4" /></div>
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: '#1F1E1D', display: 'block' }}>{item.title}</strong>
                      <span style={{ fontSize: '0.82rem', color: '#5C5954' }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1F1E1D', color: '#FAF9F5', padding: '12px 28px', borderRadius: '1rem', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
                Browse Live Jobs <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════
            WINDING 5-STEP S-CURVE CANDIDATE ROADMAP (INFINITE RIGHT-TO-LEFT LOOP)
            ═══════════════════════════════════════════════ */}
        <section
          aria-label="5-Step Career Roadmap"
          style={{
            position: 'relative',
            width: '100%',
            padding: 'clamp(48px, 6vw, 72px) 0 clamp(40px, 5vw, 60px) 0',
            background: '#FAF9F5',
            overflow: 'hidden'
          }}
        >
          <style>{`
            @keyframes cpRoadmapMarquee {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-2100px, 0, 0); }
            }
            .cp-roadmap-track {
              display: flex;
              width: max-content;
              will-change: transform;
              animation: cpRoadmapMarquee 34s linear infinite;
            }
            .cp-roadmap-wrapper:hover .cp-roadmap-track {
              animation-play-state: paused !important;
            }
            .cp-roadmap-card {
              transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
            }
            .cp-roadmap-card:hover {
              transform: translateY(-4px) scale(1.02);
              box-shadow: 0 16px 40px rgba(31, 30, 29, 0.12), 0 0 0 2px rgba(217, 119, 87, 0.45) !important;
            }
          `}</style>

          {/* Centered Editorial Header */}
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 32px auto', position: 'relative', zIndex: 10, padding: '0 20px' }}>
            <h2
              style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
                color: '#1F1E1D',
                fontWeight: 900,
                letterSpacing: '-0.025em',
                margin: '0 0 10px 0',
                lineHeight: 1.15
              }}
            >
              Your 5-Step Path to Landing Top Offers
            </h2>
            <p
              style={{
                color: '#5C5954',
                fontSize: '0.94rem',
                margin: 0,
                lineHeight: 1.5
              }}
            >
              Follow the winding S-curve road — moving continuously right to left in an infinite loop.
            </p>
          </div>

          {/* Continuous Infinite Marquee Highway Wrapper (GPU Accelerated) */}
          <div
            className="cp-roadmap-wrapper"
            style={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
              padding: '20px 0'
            }}
          >
            {/* Smooth Edge Fades (Replaced heavy maskImage with zero-cost CSS overlays) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: '60px',
                background: 'linear-gradient(to right, #faf9f5, transparent)',
                zIndex: 6,
                pointerEvents: 'none'
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                width: '60px',
                background: 'linear-gradient(to left, #faf9f5, transparent)',
                zIndex: 6,
                pointerEvents: 'none'
              }}
            />

            <div className="cp-roadmap-track">
              {[0, 1].map((segIdx) => (
                <div
                  key={`seg-${segIdx}`}
                  style={{
                    display: 'flex',
                    width: '2100px',
                    position: 'relative',
                    flexShrink: 0,
                    alignItems: 'center'
                  }}
                >
                  {/* SVG Winding S-Curve Asphalt Road Track */}
                  <svg
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      transform: 'translateY(-50%)',
                      width: '2100px',
                      height: '360px',
                      pointerEvents: 'none',
                      zIndex: 0
                    }}
                    viewBox="0 0 2100 360"
                    fill="none"
                  >
                    {/* Outer Charcoal Asphalt Road */}
                    <path
                      d="M 0 180 Q 105 130, 210 180 Q 420 80, 630 180 T 1050 180 T 1470 180 T 1890 180 Q 1995 230, 2100 180"
                      stroke="#1F1E1D"
                      strokeWidth="38"
                    />
                    {/* Inner Road Bed */}
                    <path
                      d="M 0 180 Q 105 130, 210 180 Q 420 80, 630 180 T 1050 180 T 1470 180 T 1890 180 Q 1995 230, 2100 180"
                      stroke="#2F2D2A"
                      strokeWidth="28"
                    />
                    {/* Claude Amber Dashed Center Line */}
                    <path
                      d="M 0 180 Q 105 130, 210 180 Q 420 80, 630 180 T 1050 180 T 1470 180 T 1890 180 Q 1995 230, 2100 180"
                      stroke="#E6997A"
                      strokeWidth="3"
                      strokeDasharray="14 14"
                      opacity="0.95"
                    />
                  </svg>

                  {/* 5 Alternating Step Cards & Milestone Pins */}
                  {ROADMAP_STEPS.map((card, i) => {
                    const IconComp = card.icon;

                    return (
                      <div
                        key={`seg${segIdx}-${card.num}`}
                        style={{
                          width: '420px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          position: 'relative',
                          zIndex: 1,
                          flexShrink: 0,
                          marginTop: card.isTop ? '0px' : '90px',
                          marginBottom: card.isTop ? '90px' : '0px'
                        }}
                      >
                        {/* Top Pin Node (if isTop = true) */}
                        {card.isTop && (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '12px' }}>
                            <div
                              style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: '#FFFFFF',
                                border: `4px solid ${card.color}`,
                                boxShadow: `0 8px 24px ${card.color}35`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                zIndex: 2
                              }}
                            >
                              <span style={{ fontSize: '0.98rem', fontWeight: 900, color: card.color, lineHeight: 1 }}>{card.num}</span>
                              <span style={{ fontSize: '0.52rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.06em' }}>STEP</span>
                            </div>
                            {/* Pointer Pin Arrow */}
                            <div
                              style={{
                                width: 0,
                                height: 0,
                                borderLeft: '9px solid transparent',
                                borderRight: '9px solid transparent',
                                borderTop: `11px solid ${card.color}`,
                                marginTop: '-2px'
                              }}
                            />
                          </div>
                        )}

                        {/* Step Card Body */}
                        <div
                          className="cp-roadmap-card"
                          style={{
                            width: '290px',
                            background: '#FFFFFF',
                            borderRadius: '22px',
                            padding: '18px 18px',
                            boxShadow: '0 8px 24px rgba(31, 30, 29, 0.05)',
                            border: '1px solid rgba(31, 30, 29, 0.08)',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            minHeight: '210px',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <div
                              style={{
                                background: card.bg,
                                color: card.color,
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                marginBottom: '8px',
                                display: 'grid',
                                placeItems: 'center'
                              }}
                            >
                              <IconComp size={20} />
                            </div>
                            <span
                              style={{
                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                                fontSize: '0.68rem',
                                fontWeight: 800,
                                letterSpacing: '0.08em',
                                color: card.color,
                                marginBottom: '3px'
                              }}
                            >
                              {card.label}
                            </span>
                            <h3
                              style={{
                                fontFamily: '"Outfit", sans-serif',
                                fontSize: '1.05rem',
                                fontWeight: 800,
                                color: '#1F1E1D',
                                margin: '0 0 6px 0',
                                lineHeight: 1.25
                              }}
                            >
                              {card.title}
                            </h3>
                            <p
                              style={{
                                color: '#5C5954',
                                fontSize: '0.78rem',
                                lineHeight: 1.4,
                                margin: '0 0 10px 0'
                              }}
                            >
                              {card.desc}
                            </p>
                          </div>

                          <Link
                            to={card.link}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '6px 14px',
                              borderRadius: '999px',
                              background: '#1F1E1D',
                              color: '#FFFFFF',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                              transition: 'all 0.2s ease',
                              boxShadow: '0 4px 12px rgba(31, 30, 29, 0.15)'
                            }}
                          >
                            {card.cta} <ArrowRight size={13} />
                          </Link>
                        </div>

                        {/* Bottom Pin Node (if isTop = false) */}
                        {!card.isTop && (
                          <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', marginTop: '12px' }}>
                            <div
                              style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: '#FFFFFF',
                                border: `4px solid ${card.color}`,
                                boxShadow: `0 8px 24px ${card.color}35`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                zIndex: 2
                              }}
                            >
                              <span style={{ fontSize: '0.98rem', fontWeight: 900, color: card.color, lineHeight: 1 }}>{card.num}</span>
                              <span style={{ fontSize: '0.52rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.06em' }}>STEP</span>
                            </div>
                            {/* Pointer Pin Arrow */}
                            <div
                              style={{
                                width: 0,
                                height: 0,
                                borderLeft: '9px solid transparent',
                                borderRight: '9px solid transparent',
                                borderBottom: `11px solid ${card.color}`,
                                marginBottom: '-2px'
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════
            MINIMALIST EDITORIAL METRICS BAR (AIRY & CLEAN ON CANVAS)
            ═══════════════════════════════════════════════ */}
        <section style={{ width: 'calc(100% - clamp(32px, 7vw, 112px))', maxWidth: '1640px', margin: '24px auto 80px' }}>
          <div style={{
            background: 'transparent',
            padding: '44px 12px',
            borderTop: '1px solid rgba(31, 30, 29, 0.1)',
            borderBottom: '1px solid rgba(31, 30, 29, 0.1)',
            position: 'relative'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '32px'
            }}>
              {[
                { val: '98.4%', label: 'ATS Match Precision', icon: Target, badge: 'Workday & Greenhouse' },
                { val: '50,000+', label: 'Resumes Optimized', icon: FileText, badge: 'Top Tech Candidates' },
                { val: '100K+', label: 'Live Jobs Indexed', icon: Briefcase, badge: 'Real-Time Sync' },
                { val: '4.9 / 5', label: 'Candidate Rating', icon: Award, badge: 'Verified Reviews' }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      padding: '12px 16px',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                      <Icon className="size-4" style={{ color: '#C96442' }} />
                      <span style={{ color: '#8A857D', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        {stat.badge}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 'clamp(2.4rem, 3.6vw, 3.2rem)', fontWeight: 400, color: '#1F1E1D', margin: '0 0 6px 0', letterSpacing: '-0.02em', lineHeight: 1 }}>
                      {stat.val}
                    </h3>
                    <span style={{ fontSize: '0.92rem', color: '#5C5954', fontWeight: 600 }}>
                      {stat.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>


        {/* 21st.dev Inspired Interactive Bento Grid (Claude Amber Dark) */}
        <CareerPilotBentoGrid />

        {/* Kinetic 13-Industry Editorial Wheel Section (Shifted into lower editorial flow) */}
        <IndustryWheelSection />

        {/* Latest ATS & Interview Preparation Blogs — Sleek Dark Infinite Marquee */}
        <BlogMarqueeSection />

        {/* Frequently Asked Questions About CareerPilot — Editorial Numbered Accordion */}
        <EditorialFaqAccordion />

        {/* 21st.dev Signature Gradient CTA Banner with Sliding-Arrow Pill Button */}
        <ClaudeAmberCTA />

      </main>
      <Footer />
    </div>
  );
};

export default Home;
