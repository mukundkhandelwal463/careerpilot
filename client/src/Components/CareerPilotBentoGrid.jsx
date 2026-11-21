import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Globe, Mic, ArrowUpRight, Zap, FileCode } from 'lucide-react';
import { Link } from 'react-router-dom';

/* 1. Animated ATS Score Display (21st.dev TypeTester motif) */
function AtsScoreVisual() {
  const scores = ['88%', '94%', '97%'];
  const [idx, setIdx] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % scores.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={scores[idx]}
          initial={{ scale: 0.82, opacity: 0, filter: 'blur(6px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          exit={{ scale: 1.12, opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: 'clamp(4rem, 6vw, 5.4rem)',
            color: '#FAF9F5',
            lineHeight: 1,
            letterSpacing: '-0.03em'
          }}
        >
          {scores[idx]}
        </motion.span>
      </AnimatePresence>
      <span
        style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: '#D97757',
          background: 'rgba(217, 119, 87, 0.14)',
          border: '1px solid rgba(217, 119, 87, 0.32)',
          padding: '4px 12px',
          borderRadius: '999px'
        }}
      >
        ATS SHORTLIST READY
      </span>
    </div>
  );
}

/* 2. Morphing LaTeX Layout Grid (21st.dev LayoutAnimation motif) */
function LatexLayoutVisual() {
  const [layoutIdx, setLayoutIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLayoutIdx((prev) => (prev + 1) % 3);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const colTemplates = ['repeat(2, 1fr)', 'repeat(3, 1fr)', '1fr'];

  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        layout
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'grid',
          gridTemplateColumns: colTemplates[layoutIdx],
          gap: '8px',
          width: '100%',
          maxWidth: '170px'
        }}
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            layout
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: '24px',
              borderRadius: '8px',
              background: i === 1 ? 'rgba(217, 119, 87, 0.55)' : 'rgba(250, 249, 245, 0.16)',
              border: i === 1 ? '1px solid rgba(217, 119, 87, 0.7)' : '1px solid rgba(255,255,255,0.08)'
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

/* 3. Expanding Global Job Radar (21st.dev GlobalNetwork motif) */
function GlobalJobRadarVisual() {
  const pulses = [0, 1, 2, 3];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', position: 'relative' }}>
      <div
        style={{
          width: '68px',
          height: '68px',
          borderRadius: '50%',
          background: 'rgba(217, 119, 87, 0.16)',
          border: '1px solid rgba(217, 119, 87, 0.45)',
          display: 'grid',
          placeItems: 'center',
          zIndex: 4
        }}
      >
        <Globe size={34} color="#FAF9F5" strokeWidth={1.6} />
      </div>
      {pulses.map((p) => (
        <motion.div
          key={p}
          initial={{ scale: 0.6, opacity: 0.85 }}
          animate={{ scale: 3.1, opacity: 0 }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            delay: p * 0.8,
            ease: 'easeOut'
          }}
          style={{
            position: 'absolute',
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            border: '1.5px solid rgba(217, 119, 87, 0.48)',
            pointerEvents: 'none'
          }}
        />
      ))}
    </div>
  );
}

/* 4. Speed Reveal Indicator (21st.dev SpeedIndicator motif) */
function AiSpeedVisual() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loop = setInterval(() => {
      setReady((prev) => !prev);
    }, 3000);
    const init = setTimeout(() => setReady(true), 600);
    return () => {
      clearInterval(loop);
      clearTimeout(init);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '10px' }}>
      <div style={{ height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          {!ready ? (
            <motion.div
              key="skel"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.35, 0.75, 0.35] }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.9, repeat: Infinity }}
              style={{ width: '96px', height: '28px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)' }}
            />
          ) : (
            <motion.span
              key="val"
              initial={{ y: 16, opacity: 0, filter: 'blur(5px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -16, opacity: 0, filter: 'blur(5px)' }}
              style={{ fontSize: '2.1rem', fontWeight: 800, color: '#FAF9F5', letterSpacing: '-0.02em' }}
            >
              1.8s
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div style={{ width: '130px', height: '6px', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: ready ? '100%' : '22%' }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          style={{ height: '100%', borderRadius: '999px', background: 'linear-gradient(90deg, #D97757, #E6997A)' }}
        />
      </div>
    </div>
  );
}

/* 5. Cascading Encryption Shields (21st.dev SecurityBadge motif) */
function SecurityShieldsVisual() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % 4);
    }, 850);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '14px' }}>
      {[0, 1, 2].map((i) => {
        const isLit = activeIdx > i;
        return (
          <motion.div
            key={i}
            animate={{ scale: isLit ? 1.12 : 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              display: 'grid',
              placeItems: 'center',
              background: isLit ? 'rgba(217, 119, 87, 0.24)' : 'rgba(255, 255, 255, 0.05)',
              border: isLit ? '1px solid rgba(217, 119, 87, 0.55)' : '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <Lock size={20} color={isLit ? '#FAF9F5' : '#6E6D68'} />
          </motion.div>
        );
      })}
    </div>
  );
}

/* 6. Live AI Voice Waveform Visual */
function VoiceWaveVisual() {
  const bars = [18, 34, 48, 28, 42, 22, 38, 26];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '7px' }}>
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: 'rgba(217, 119, 87, 0.2)',
          border: '1px solid rgba(217, 119, 87, 0.45)',
          display: 'grid',
          placeItems: 'center',
          marginRight: '8px'
        }}
      >
        <Mic size={20} color="#E6997A" />
      </div>
      {bars.map((h, i) => (
        <motion.span
          key={i}
          animate={{ height: [`${h * 0.45}px`, `${h}px`, `${h * 0.5}px`] }}
          transition={{
            duration: 1.1 + (i % 3) * 0.25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.1
          }}
          style={{
            width: '5px',
            borderRadius: '999px',
            background: i % 2 === 0 ? '#D97757' : 'rgba(250, 249, 245, 0.45)'
          }}
        />
      ))}
    </div>
  );
}

const CareerPilotBentoGrid = () => {
  const cardStyle = {
    background: '#2C2C2B',
    border: '1px solid #3E3E38',
    borderRadius: '22px',
    padding: '26px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
    textDecoration: 'none'
  };

  return (
    <section
      aria-label="CareerPilot Platform Architecture Highlights"
      style={{
        width: 'calc(100% - clamp(32px, 7vw, 112px))',
        maxWidth: '1640px',
        margin: '72px auto 88px',
        padding: 0
      }}
    >
      <div
        style={{
          background: '#232321',
          border: '1px solid #353531',
          borderRadius: '28px',
          padding: 'clamp(44px, 5vw, 68px) clamp(28px, 4vw, 56px)',
          boxShadow: '0 22px 56px rgba(20, 20, 19, 0.12)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', marginBottom: '32px' }}>
          <div>
            <h2
              style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: 'clamp(1.9rem, 3.6vw, 2.85rem)',
                fontWeight: 800,
                color: '#FAF9F5',
                margin: 0,
                letterSpacing: '-0.025em'
              }}
            >
              Every Career Tool, Unified in One Engine
            </h2>
          </div>
          <Link
            to="/upload"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.88rem',
              fontWeight: 700,
              color: '#D97757'
            }}
          >
            Launch Workspace <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* 6-Column Asymmetric Bento Grid (from 21st.dev bento-grid-01) */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[210px]">
          {/* 1. ATS Score (2x2 Tall) */}
          <motion.div
            className="md:col-span-2 md:row-span-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, borderColor: 'rgba(217, 119, 87, 0.55)' }}
            style={cardStyle}
          >
            <div style={{ flex: 1 }}>
              <AtsScoreVisual />
            </div>
            <div style={{ marginTop: '14px' }}>
              <h3 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: '1.55rem', fontWeight: 400, color: '#FAF9F5', margin: '0 0 4px' }}>
                Hybrid ATS Scoring
              </h3>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#B7B5A9', lineHeight: 1.5 }}>
                TF-IDF lexical precision combined with Gemini AI semantic analysis against live job descriptions.
              </p>
            </div>
          </motion.div>

          {/* 2. LaTeX Layouts (2x1) */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            whileHover={{ y: -4, borderColor: 'rgba(217, 119, 87, 0.55)' }}
            style={cardStyle}
          >
            <div style={{ flex: 1 }}>
              <LatexLayoutVisual />
            </div>
            <div>
              <h3 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: '1.4rem', fontWeight: 400, color: '#FAF9F5', margin: '0 0 2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileCode size={18} color="#D97757" /> Executive LaTeX Templates
              </h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#B7B5A9' }}>
                Live two-way form &amp; code sync with auto-fill PDF parser.
              </p>
            </div>
          </motion.div>

          {/* 3. Global Job Radar (2x2 Tall) */}
          <motion.div
            className="md:col-span-2 md:row-span-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            whileHover={{ y: -4, borderColor: 'rgba(217, 119, 87, 0.55)' }}
            style={cardStyle}
          >
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GlobalJobRadarVisual />
            </div>
            <div style={{ marginTop: '14px', position: 'relative', zIndex: 5 }}>
              <h3 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: '1.55rem', fontWeight: 400, color: '#FAF9F5', margin: '0 0 4px' }}>
                Live Global Job Radar
              </h3>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#B7B5A9', lineHeight: 1.5 }}>
                Instantly match your extracted resume skills against real-time LinkedIn, Indeed &amp; Google Jobs listings.
              </p>
            </div>
          </motion.div>

          {/* 4. Sub-2s AI Speed (2x1) */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            whileHover={{ y: -4, borderColor: 'rgba(217, 119, 87, 0.55)' }}
            style={cardStyle}
          >
            <div style={{ flex: 1 }}>
              <AiSpeedVisual />
            </div>
            <div>
              <h3 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: '1.4rem', fontWeight: 400, color: '#FAF9F5', margin: '0 0 2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={17} color="#D97757" /> Instant AI Diagnostics
              </h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#B7B5A9' }}>
                Gunicorn multi-worker pipeline with real-time Prometheus telemetry.
              </p>
            </div>
          </motion.div>

          {/* 5. Privacy & Security (3x1) */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.22 }}
            whileHover={{ y: -4, borderColor: 'rgba(217, 119, 87, 0.55)' }}
            style={cardStyle}
          >
            <div style={{ flex: 1 }}>
              <SecurityShieldsVisual />
            </div>
            <div>
              <h3 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: '1.45rem', fontWeight: 400, color: '#FAF9F5', margin: '0 0 2px' }}>
                HTTPS/TLS &amp; Per-Account Isolation
              </h3>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#B7B5A9' }}>
                Encrypted AWS infrastructure with private dashboards and strict user-scoped sessions.
              </p>
            </div>
          </motion.div>

          {/* 6. AI Voice Mock Interview (3x1) */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.26 }}
            whileHover={{ y: -4, borderColor: 'rgba(217, 119, 87, 0.55)' }}
            style={cardStyle}
          >
            <div style={{ flex: 1 }}>
              <VoiceWaveVisual />
            </div>
            <div>
              <h3 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: '1.45rem', fontWeight: 400, color: '#FAF9F5', margin: '0 0 2px' }}>
                24/7 AI Voice Mock Interviewer
              </h3>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#B7B5A9' }}>
                Speak answers aloud and get graded on technical accuracy, English clarity &amp; fluency.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CareerPilotBentoGrid;
