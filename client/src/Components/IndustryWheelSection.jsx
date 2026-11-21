import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const INDUSTRIES = [
  {
    name: 'Software Engineering',
    tag: 'SDE & Backend',
    detail: 'ATS keyword benchmarks for Python, Java, Go, REST APIs, distributed systems & DSA interviews.'
  },
  {
    name: 'Data Science & AI',
    tag: 'ML & Analytics',
    detail: 'Tailored NLP, PyTorch, Scikit-learn, SQL optimization & ML system design readiness.'
  },
  {
    name: 'Cloud & DevOps',
    tag: 'AWS & SRE',
    detail: 'Terraform IaC, Docker, Kubernetes, CI/CD pipelines, Linux & Prometheus observability keywords.'
  },
  {
    name: 'Full-Stack Web',
    tag: 'React & APIs',
    detail: 'Modern React, TypeScript, Node.js, Django, PostgreSQL & Core Web Vitals architecture metrics.'
  },
  {
    name: 'Cybersecurity',
    tag: 'AppSec & CloudSec',
    detail: 'Zero-trust IAM, OWASP Top 10, network defense, TLS/HTTPS & threat modeling evaluation.'
  },
  {
    name: 'FinTech & Banking',
    tag: 'High Reliability',
    detail: 'ACID transactions, low-latency ledgers, compliance audit trails & high-availability systems.'
  },
  {
    name: 'Healthcare Tech',
    tag: 'Bio & MedTech',
    detail: 'Privacy-first clinical analytics, HIPAA-aware data pipelines & diagnostic AI modeling.'
  },
  {
    name: 'E-Commerce & Retail',
    tag: 'Scale & Search',
    detail: 'Recommendation engines, cart checkout reliability, search ranking & Redis caching.'
  },
  {
    name: 'Product Management',
    tag: 'Strategy & KPIs',
    detail: 'Metric-driven PRDs, A/B experimentation, funnel conversion & roadmap prioritization.'
  },
  {
    name: 'Mobile Engineering',
    tag: 'iOS & Android',
    detail: 'Swift, Kotlin, React Native, Flutter, offline-first sync & app performance profiling.'
  },
  {
    name: 'Data Engineering',
    tag: 'ETL & Warehousing',
    detail: 'Apache Spark, Kafka, Airflow, Snowflake, Databricks & high-throughput streaming pipelines.'
  },
  {
    name: 'QA & Automation',
    tag: 'SDET & Testing',
    detail: 'Playwright, Cypress, Selenium, load testing, CI regression gates & quality metrics.'
  },
  {
    name: 'Enterprise SaaS',
    tag: 'B2B Cloud',
    detail: 'Multi-tenant architecture, SSO/OAuth2, role-based access & scalable microservices.'
  }
];

const IndustryWheelSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const total = INDUSTRIES.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Infinite smooth automatic motion: 1, 2, 3, 4, ... 13 -> 1
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 2600);
    return () => clearInterval(timer);
  }, [total]);

  // Compute circular signed offset from -2 to +2 around activeIndex
  const getRelativeOffset = (idx) => {
    let diff = idx - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const activeItem = INDUSTRIES[activeIndex];

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Industries Supported by CareerPilot"
      style={{
        width: 'calc(100% - clamp(32px, 7vw, 112px))',
        maxWidth: '1640px',
        margin: '84px auto',
        padding: 0
      }}
    >
      <div
        style={{
          background: 'transparent',
          borderTop: '1px solid rgba(31, 30, 29, 0.1)',
          borderBottom: '1px solid rgba(31, 30, 29, 0.1)',
          borderRadius: 0,
          padding: 'clamp(52px, 6vw, 84px) clamp(12px, 3vw, 40px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 'clamp(40px, 6vw, 96px)',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle warm Claude Amber ambient corner glow */}
        <div
          style={{
            position: 'absolute',
            top: '-90px',
            right: '-80px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217, 119, 87, 0.16) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* LEFT COLUMN: Editorial Serif Title + Live Detail + Counter & Arrow Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '300px', zIndex: 1 }}>
          <div>
            <h2
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontSize: 'clamp(2.3rem, 4.4vw, 3.45rem)',
                fontWeight: 400,
                lineHeight: 1.06,
                letterSpacing: '-0.02em',
                color: '#1F1E1D',
                margin: '0 0 22px'
              }}
            >
              Know-how across <br />
              thirteen industries
            </h2>

            {/* Smooth animated contextual description for active industry */}
            <div style={{ minHeight: '76px', marginBottom: '24px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: '#D97757',
                      marginBottom: '6px',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {activeItem.tag.toUpperCase()}
                  </span>
                  <p style={{ margin: 0, fontSize: '0.94rem', color: '#5C5954', lineHeight: 1.6, maxWidth: '420px' }}>
                    {activeItem.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Hairline Divider & Controls Bar (Matches Image 2) */}
          <div>
            <div style={{ height: '1px', background: 'rgba(31, 30, 29, 0.11)', marginBottom: '22px' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', fontFamily: '"Outfit", sans-serif' }}>
                <motion.span
                  key={activeIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1F1E1D', minWidth: '24px', display: 'inline-block' }}
                >
                  {activeIndex + 1}
                </motion.span>
                <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#8A867E' }}>of {total}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <motion.button
                  type="button"
                  onClick={handlePrev}
                  whileHover={{ scale: 1.06, y: -1 }}
                  whileTap={{ scale: 0.94 }}
                  aria-label="Previous industry"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    border: '1px solid rgba(31, 30, 29, 0.12)',
                    background: '#FDFCF9',
                    color: '#1F1E1D',
                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(31, 30, 29, 0.05)'
                  }}
                >
                  <ArrowLeft size={18} />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleNext}
                  whileHover={{ scale: 1.06, y: -1, backgroundColor: '#D97757' }}
                  whileTap={{ scale: 0.94 }}
                  aria-label="Next industry"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    border: 'none',
                    background: '#1F1E1D',
                    color: '#FDFCF9',
                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(31, 30, 29, 0.22)'
                  }}
                >
                  <ArrowRight size={18} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Vertical Kinetic Blur Slot Wheel (Matches Image 2) */}
        <div
          style={{
            position: 'relative',
            height: '350px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            overflow: 'hidden',
            paddingLeft: 'clamp(6px, 2vw, 24px)',
            userSelect: 'none'
          }}
        >
          {/* Top & Bottom Soft Parchment Fade Masks */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '86px',
              background: 'linear-gradient(to bottom, #FAF9F5 12%, rgba(250, 249, 245, 0) 100%)',
              zIndex: 5,
              pointerEvents: 'none'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '86px',
              background: 'linear-gradient(to top, #FAF9F5 12%, rgba(250, 249, 245, 0) 100%)',
              zIndex: 5,
              pointerEvents: 'none'
            }}
          />

          {/* Wheel Items */}
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {INDUSTRIES.map((industry, idx) => {
              const offset = getRelativeOffset(idx);
              const absOffset = Math.abs(offset);
              const isVisible = absOffset <= 2;

              if (!isVisible) return null;

              const yPos = offset * 74;
              const isCenter = offset === 0;
              const blurPx = isCenter ? 0 : absOffset === 1 ? 1.5 : 3.8;
              const opacityVal = isCenter ? 1 : absOffset === 1 ? 0.44 : 0.17;
              const scaleVal = isCenter ? 1.04 : absOffset === 1 ? 0.94 : 0.86;

              return (
                <motion.button
                  key={industry.name}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  initial={false}
                  animate={{
                    y: yPos,
                    opacity: opacityVal,
                    scale: scaleVal
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 30,
                    mass: 0.8
                  }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    marginTop: '-26px',
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    padding: '6px 0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    transformOrigin: 'left center',
                    zIndex: isCenter ? 4 : 2,
                    willChange: 'transform, opacity'
                  }}
                >
                  <span
                    style={{
                      width: isCenter ? '10px' : '0px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#D97757',
                      boxShadow: isCenter ? '0 0 14px rgba(217, 119, 87, 0.7)' : 'none',
                      transition: 'width 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                      flexShrink: 0
                    }}
                  />
                  <span
                    style={{
                      fontFamily: '"Instrument Serif", Georgia, serif',
                      fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)',
                      fontWeight: 400,
                      letterSpacing: '-0.015em',
                      color: isCenter ? '#1F1E1D' : '#4C4A46',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {industry.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Subtle Quick Action under the Industry Wheel */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '22px 24px 8px', background: 'transparent' }}>
        <Link
          to="/upload"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.88rem',
            fontWeight: 700,
            color: '#C05D3C'
          }}
        >
          Analyze your resume for <strong style={{ color: '#1F1E1D' }}>{activeItem.name}</strong> <ArrowRight size={15} />
        </Link>
      </div>
    </motion.section>
  );
};

export default IndustryWheelSection;
