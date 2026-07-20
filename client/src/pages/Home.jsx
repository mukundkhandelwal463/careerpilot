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
  CheckCircle,
  Clock,
  ArrowRightLeft,
  ChevronsRight
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
    x.current = mouseXVal * 10; // degrees max tilt
    y.current = -mouseYVal * 10;
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
        transition: 'transform 0.1s ease-out',
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
  const rotateFloat = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Framer motion variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

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
          top: '12%', 
          right: '8%', 
          width: '320px', 
          height: '320px', 
          borderRadius: '50% 30% 70% 30% / 50% 60% 40% 50%', 
          background: 'linear-gradient(135deg, rgba(255, 107, 74, 0.15), rgba(124, 214, 199, 0.1))', 
          filter: 'blur(40px)',
          y: floatY1,
          rotate: rotateFloat,
          pointerEvents: 'none',
          zIndex: -1
        }} 
      />
      <motion.div 
        style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '-5%', 
          width: '450px', 
          height: '450px', 
          borderRadius: '30% 70% 40% 60% / 50% 30% 70% 50%', 
          background: 'linear-gradient(135deg, rgba(124, 214, 199, 0.15), rgba(255, 107, 74, 0.1))', 
          filter: 'blur(50px)',
          y: floatY2,
          rotate: rotateFloat,
          pointerEvents: 'none',
          zIndex: -1
        }} 
      />

      <main style={{ width: 'min(var(--max-width), calc(100% - 32px))', margin: '0 auto' }}>
        
        {/* HERO SECTION */}
        <section className="hero">
          <motion.div 
            className="hero-copy"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Sparkles className="size-4 text-orange-500" /> AI-Powered Career Operating System
            </motion.div>
            
            <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#1e293b' }}>
              Simplify. Prepare. <br />
              Get <span style={{ background: 'linear-gradient(135deg, var(--accent), #ff8f57)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Hired Faster.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="hero-text" style={{ fontSize: '1.1rem', color: '#64748b', margin: '20px 0 32px 0', lineHeight: 1.65 }}>
              The all-in-one platform to build better resumes, get ATS insights, master interviews, learn in-demand skills and discover the right opportunities — effortlessly.
            </motion.p>

            <motion.div variants={fadeUp} className="hero-actions" style={{ display: 'flex', gap: '16px' }}>
              <Link className="btn btn-primary" to="/upload" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'linear-gradient(135deg, var(--accent), var(--accent-deep))', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '999px', fontWeight: 700 }}>
                Get Started Free <ArrowRight className="size-4" />
              </Link>
              <Link className="btn btn-secondary" to="/preparation" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', color: '#475569', background: 'white', border: '1px solid rgba(24,35,38,0.1)', cursor: 'pointer', borderRadius: '999px', fontWeight: 700 }}>
                Explore Prep Hub
              </Link>
            </motion.div>

            {/* Hero Stats strip row */}
            <motion.div variants={fadeUp} className="stats-strip">
              <div className="stats-item">
                <div className="stats-icon-wrap"><Users className="size-4" /></div>
                <div className="stats-text">
                  <strong>10K+</strong>
                  <span>Active Users</span>
                </div>
              </div>
              <div className="stats-item">
                <div className="stats-icon-wrap"><FileText className="size-4" /></div>
                <div className="stats-text">
                  <strong>500K+</strong>
                  <span>Resumes Optimized</span>
                </div>
              </div>
              <div className="stats-item">
                <div className="stats-icon-wrap"><Award className="size-4" /></div>
                <div className="stats-text">
                  <strong>95%</strong>
                  <span>ATS Accuracy</span>
                </div>
              </div>
              <div className="stats-item">
                <div className="stats-icon-wrap"><Cpu className="size-4" /></div>
                <div className="stats-text">
                  <strong>24/7</strong>
                  <span>AI Career Assistant</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side Laptop Mockup */}
          <motion.div 
            className="hero-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="laptop-mockup-wrapper">
              
              {/* Floating Badges */}
              <motion.div 
                className="floating-badge" 
                style={{ top: '8%', right: '-8%' }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div style={{ background: '#ecfdf5', color: '#10b981', padding: '6px', borderRadius: '8px' }}>✨</div>
                <span>Your AI Career Companion, Always with You</span>
              </motion.div>

              <motion.div 
                className="floating-badge" 
                style={{ bottom: '25%', left: '-12%' }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div style={{ background: '#fef2f2', color: '#ef4444', padding: '6px', borderRadius: '8px' }}><Award className="size-4" /></div>
                <span>16 Applications Active</span>
              </motion.div>

              {/* Laptop Screen */}
              <div className="laptop-screen-container">
                {/* Mock Dashboard Sidebar */}
                <div style={{ width: '50px', background: '#090d16', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', paddingTop: '20px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--accent), #ff8f57)', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '0.65rem', color: 'white' }}>C</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', color: '#475569' }}>
                    <FileText className="size-4" style={{ color: 'var(--accent)' }} />
                    <Briefcase className="size-4" />
                    <Sparkles className="size-4" />
                    <Award className="size-4" />
                  </div>
                </div>
                
                {/* Mock Dashboard Main Area */}
                <div style={{ flex: 1, padding: '16px', background: '#0b1329', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'white' }}>Welcome back, Anam! 👋</span>
                    <span style={{ fontSize: '0.6rem', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', padding: '3px 8px', borderRadius: '10px' }}>AI Live</span>
                  </div>
                  
                  {/* Conic Score indicator */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center', margin: '8px 0' }}>
                    <div style={{
                      width: '76px', height: '76px', borderRadius: '50%',
                      background: 'conic-gradient(var(--accent) 306deg, #1e293b 0deg)',
                      display: 'grid', placeItems: 'center', position: 'relative'
                    }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#0b1329', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '1rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>85%</span>
                        <span style={{ fontSize: '0.45rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ATS MATCH</span>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <strong style={{ fontSize: '0.78rem', color: 'white' }}>Overall Score 85%</strong>
                      <span style={{ fontSize: '0.6rem', color: '#10b981', fontWeight: 700 }}>ATS Ready ✔</span>
                    </div>
                  </div>

                  {/* Core Metrics lists */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                    {[
                      { label: 'Resume Score', val: '92%', color: '#10b981' },
                      { label: 'Interview Ready', val: '78%', color: '#3b82f6' },
                      { label: 'Skills Matched', val: '88%', color: '#f59e0b' },
                      { label: 'Applications', val: '16', color: '#ec4899' }
                    ].map((item, idx) => (
                      <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.58rem', color: '#94a3b8' }}>{item.label}</span>
                        <strong style={{ fontSize: '0.68rem', color: item.color }}>{item.val}</strong>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Laptop Keyboard Base */}
              <div className="laptop-base-container">
                <div className="laptop-base-notch" />
              </div>

            </div>
          </motion.div>
        </section>

        {/* FEATURES SECTION */}
        <section className="section" id="features" style={{ padding: '72px 0' }}>
          <motion.div 
            className="section-heading" 
            style={{ textAlign: 'center', marginBottom: '48px' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <p className="section-tag"><Layers className="size-4" /> Features</p>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1e293b', marginTop: '10px' }}>Powerful AI tools to accelerate every step of your career.</h2>
          </motion.div>

          <motion.div 
            className="feature-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { title: "AI Resume Builder", desc: "Create ATS-optimized resumes that get you noticed.", icon: <FileText className="size-6" /> },
              { title: "Real-time ATS Insights", desc: "Get detailed analysis and actionable improvement tips.", icon: <Layers className="size-6" /> },
              { title: "Smart Interview Prep", desc: "Practice with AI mock interviews and get instant feedback.", icon: <Sparkles className="size-6" /> },
              { title: "Personalized Roadmaps", desc: "Get custom learning paths based on your goals and skills.", icon: <Compass className="size-6" /> }
            ].map((feat, idx) => (
              <motion.div key={idx} variants={fadeUp}>
                <TiltCard className="feature-card" style={{ padding: '30px', borderRadius: '20px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ background: 'var(--accent-soft)', color: 'var(--accent-deep)', padding: '12px', borderRadius: '12px', width: 'fit-content' }}>
                    {feat.icon}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>{feat.title}</h3>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6 }}>{feat.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="section" id="how-it-works" style={{ padding: '72px 0' }}>
          <motion.div 
            className="section-heading" 
            style={{ textAlign: 'center', marginBottom: '48px' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <p className="section-tag"><Compass className="size-4" /> How It Works</p>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1e293b', marginTop: '10px' }}>Your path to a better career — simple, smart and guided by AI.</h2>
          </motion.div>

          <motion.div 
            className="steps-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { step: "1. Upload Resume", desc: "Share your resume in seconds.", icon: <FileText className="size-6" /> },
              { step: "2. AI Analysis", desc: "Get ATS score, skill gaps & personalized insights.", icon: <Cpu className="size-6" /> },
              { step: "3. Follow Your Roadmap", desc: "Learn, practice & improve with AI guidance.", icon: <Compass className="size-6" /> },
              { step: "4. Get Hired", desc: "Apply to best-matched jobs and track your progress.", icon: <Award className="size-6" /> }
            ].map((step, idx) => (
              <motion.div key={idx} variants={fadeUp} style={{ position: 'relative' }}>
                <TiltCard className="step-card" style={{ padding: '28px', borderRadius: '20px', height: '100%', display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'center', alignItems: 'center' }}>
                  <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '12px', borderRadius: '16px', width: 'fit-content' }}>
                    {step.icon}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>{step.step}</h3>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>{step.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* TRUST LOGOS STRIP */}
        <section className="section" style={{ padding: '36px 0', borderTop: '1px solid rgba(24,35,38,0.06)', borderBottom: '1px solid rgba(24,35,38,0.06)' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, margin: '0 0 16px' }}>
              Trusted by Aspiring Professionals at Leading Tech Giants
            </p>
            <div className="trust-logos-strip">
              <div className="trust-logo">Google</div>
              <div className="trust-logo">Microsoft</div>
              <div className="trust-logo">Amazon</div>
              <div className="trust-logo">TCS</div>
              <div className="trust-logo">Infosys</div>
              <div className="trust-logo">Accenture</div>
              <div className="trust-logo">Deloitte</div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="section" style={{ padding: '72px 0' }}>
          <motion.div 
            className="section-heading" 
            style={{ textAlign: 'center', marginBottom: '40px' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <p className="section-tag"><Star className="size-4" /> Reviews</p>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1e293b', marginTop: '10px' }}>What our candidates say</h2>
          </motion.div>

          <div className="testimonial-grid">
            {[
              {
                text: "AI Resume Platform helped me improve my resume ATS keywords alignment and crack my dream software engineering job in just 3 months!",
                user: "Riya Sharma",
                role: "Software Engineer | Microsoft",
                avatar: "RS"
              },
              {
                text: "The parallelized custom AI interview simulations and technical mock assessments were absolute game-changers. Extremely detailed insights!",
                user: "Arjun Mehta",
                role: "Data Analyst | Amazon",
                avatar: "AM"
              },
              {
                text: "The custom preparation roadmaps and automated skill gap analyses gave me direct clarity. My career progression immediately accelerated.",
                user: "Neha Verma",
                role: "Product Manager | Deloitte",
                avatar: "NV"
              }
            ].map((review, idx) => (
              <div key={idx} className="testimonial-card">
                <div>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
                  </div>
                  <p className="testimonial-text">"{review.text}"</p>
                </div>
                <div className="testimonial-user">
                  <div className="testimonial-avatar">{review.avatar}</div>
                  <div className="testimonial-info">
                    <strong>{review.user}</strong>
                    <span>{review.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA CARD OVERHAUL */}
        <section className="section cta-section" style={{ paddingBottom: '90px' }}>
          <motion.div 
            className="cta-card-premium"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <p className="chip" style={{ background: 'rgba(255,255,255,0.08)', color: 'white', display: 'inline-flex', gap: '8px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Zap className="size-4" /> Ready to upgrade?
            </p>
            <h2>Ready to Build Your Dream Career?</h2>
            <p>Join thousands of successful candidates who are already ahead with AI Resume Platform.</p>
            <div className="hero-actions" style={{ marginTop: '32px', justifyContent: 'center', display: 'flex', gap: '16px' }}>
              <Link className="btn btn-primary" to="/upload" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'linear-gradient(135deg, var(--accent), var(--accent-deep))', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '999px', fontWeight: 700 }}>
                Get Started Free <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Home;
