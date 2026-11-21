import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSearch, Mic, FileCode, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ_ITEMS = [
  {
    num: '01',
    heading: 'ATS RESUME SCREENER',
    tag: 'AI MATCHING',
    meta: '3 key capabilities',
    icon: FileSearch,
    q: 'What is CareerPilot and how does its AI ATS resume screener work?',
    a: 'CareerPilot parses your PDF, DOCX, or TXT resume against a target Job Description. It computes an ATS compatibility score (0–100%), highlights missing technical keywords, and provides actionable bullet-point improvements.',
    highlights: [
      { label: 'Hybrid TF-IDF + Gemini AI Semantic Scoring', metric: '98%' },
      { label: 'Missing High-Yield Keyword Detection', metric: 'Instant' },
      { label: 'PDF, DOCX & TXT Clean Text Extraction', metric: '100%' }
    ]
  },
  {
    num: '02',
    heading: 'AI VOICE MOCK INTERVIEWS',
    tag: 'INTERVIEW PREP',
    meta: '3 evaluation axes',
    icon: Mic,
    q: 'How can I practice technical and behavioral interviews with CareerPilot?',
    a: 'Upload your resume in the Preparation Hub to launch an AI Voice or Written Mock Interview tailored directly to your projects and skills. After each answer, CareerPilot scores technical depth, English clarity, and fluency.',
    highlights: [
      { label: 'Resume-Tailored Technical & HR Questions', metric: '24/7' },
      { label: 'Real-Time Speech Recognition & Voice Mode', metric: 'Live' },
      { label: 'Technical, Clarity & Fluency Breakdown', metric: '3 Axes' }
    ]
  },
  {
    num: '03',
    heading: 'LATEX RESUME ARCHITECT',
    tag: 'EXECUTIVE BUILDER',
    meta: '3 core workflows',
    icon: FileCode,
    q: 'Does CareerPilot include a LaTeX resume builder and ATS templates?',
    a: 'Yes. CareerPilot features an Executive LaTeX & Template Resume Builder that auto-parses existing resume files, suggests stream-specific ATS keywords with AI, and exports clean PDF & DOCX files optimized for recruiter parsing.',
    highlights: [
      { label: 'Live Two-Way Form & LaTeX Code Sync', metric: '100%' },
      { label: 'Magic PDF / DOCX Auto-Fill Parser', metric: '1-Click' },
      { label: 'AI Stream Keyword Suggester & Enhancer', metric: 'Live' }
    ]
  },
  {
    num: '04',
    heading: 'CS FUNDAMENTALS & TESTS',
    tag: 'PLACEMENT HUB',
    meta: '5 core subjects',
    icon: Cpu,
    q: 'What Computer Science subjects and mock tests are included?',
    a: 'CareerPilot provides structured theory modules for Operating Systems (OS), DBMS, Computer Networks (CN), OOPs, System Design, and Top 50 DSA patterns alongside a timed 5-section Full-Length Mock Test.',
    highlights: [
      { label: 'OS, DBMS, CN, OOPs & System Design Notes', metric: '5 Tracks' },
      { label: 'Timed 5-Section MCQ + Coding Assessment', metric: '90 MCQs' },
      { label: 'Personalized Career Roadmap & Task Tracker', metric: 'AI Plan' }
    ]
  },
  {
    num: '05',
    heading: 'PRIVACY & DATA SECURITY',
    tag: 'CLOUD PROTECTION',
    meta: '3 safeguards',
    icon: ShieldCheck,
    q: 'Is my resume and personal data kept private on CareerPilot?',
    a: 'Yes. All traffic is secured over HTTPS/TLS, user dashboards and private resume scans require authentication and are excluded from search engine indexing, and uploaded documents are protected on encrypted AWS infrastructure.',
    highlights: [
      { label: 'End-to-End HTTPS / TLS Encryption', metric: 'TLS 1.3' },
      { label: 'Strict Per-Account Data & Notification Isolation', metric: '100%' },
      { label: 'Private Dashboards Excluded from Search Crawlers', metric: 'NoIndex' }
    ]
  }
];

const EditorialFaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section
      aria-labelledby="careerpilot-faq-heading"
      style={{
        width: 'calc(100% - clamp(32px, 7vw, 112px))',
        maxWidth: '1640px',
        margin: '88px auto 72px',
        padding: 0
      }}
    >
      {/* Top Section Intro */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', marginBottom: '32px', padding: '0 4px' }}>
        <div>
          <h2
            id="careerpilot-faq-heading"
            style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: 'clamp(1.9rem, 3.4vw, 2.7rem)',
              fontWeight: 800,
              color: '#1F1E1D',
              margin: 0,
              letterSpacing: '-0.025em'
            }}
          >
            Frequently Asked Questions About CareerPilot
          </h2>
        </div>
        <p style={{ margin: 0, fontSize: '0.92rem', color: '#5C5954', maxWidth: '460px', lineHeight: 1.55 }}>
          Hover over any question to preview direct answers on ATS scoring, AI voice interviews, LaTeX templates, and security.
        </p>
      </div>

      {/* Editorial Numbered Accordion Container (Open, Airy & Minimal) */}
      <div
        onMouseLeave={() => setOpenIndex(-1)}
        style={{
          background: 'transparent',
          borderTop: '1px solid rgba(31, 30, 29, 0.12)',
          borderBottom: '1px solid rgba(31, 30, 29, 0.12)',
          borderRadius: 0,
          overflow: 'hidden'
        }}
      >
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          const Icon = item.icon;

          return (
            <div
              key={item.num}
              onMouseEnter={() => setOpenIndex(idx)}
              style={{
                borderTop: idx === 0 ? 'none' : '1px solid rgba(31, 30, 29, 0.09)',
                background: isOpen
                  ? 'rgba(243, 240, 231, 0.72)'
                  : 'transparent',
                transition: 'background 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Accordion Header Row */}
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                onMouseEnter={() => setOpenIndex(idx)}
                aria-expanded={isOpen}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  padding: 'clamp(22px, 3vw, 30px) clamp(24px, 4vw, 44px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3vw, 32px)' }}>
                  <span
                    style={{
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: isOpen ? '#D97757' : '#9B958B',
                      minWidth: '24px'
                    }}
                  >
                    {item.num}
                  </span>
                  <span
                    style={{
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: 'clamp(1.45rem, 3vw, 2.35rem)',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      color: isOpen ? '#1F1E1D' : '#9B958B',
                      transition: 'color 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                      lineHeight: 1.05
                    }}
                  >
                    {item.heading}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexShrink: 0 }}>
                  {isOpen && (
                    <span
                      style={{
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        color: '#8C867B'
                      }}
                    >
                      {item.tag}
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: isOpen ? '#5C5954' : '#9B958B'
                    }}
                  >
                    {item.meta}
                  </span>
                </div>
              </button>

              {/* Smooth Animated Expanded Body (Slow & Luxurious Editorial Unfold) */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.82, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }
                    }}
                    style={{ overflow: 'hidden' }}
                  >
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 12, opacity: 0 }}
                      transition={{ duration: 0.72, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        padding: '0 clamp(24px, 4vw, 44px) clamp(28px, 4vw, 40px)',
                        paddingLeft: 'clamp(24px, 7.5vw, 100px)',
                        display: 'grid',
                        gridTemplateColumns: 'minmax(240px, 0.95fr) minmax(300px, 1.85fr)',
                        gap: 'clamp(24px, 4vw, 56px)',
                        alignItems: 'start'
                      }}
                    >
                      {/* Left Column: Icon + Italic Question */}
                      <div>
                        <div
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '14px',
                            background: 'rgba(217, 119, 87, 0.12)',
                            border: '1px solid rgba(217, 119, 87, 0.25)',
                            display: 'grid',
                            placeItems: 'center',
                            color: '#C05D3C',
                            marginBottom: '16px'
                          }}
                        >
                          <Icon size={22} />
                        </div>
                        <h3
                          style={{
                            fontFamily: '"Instrument Serif", Georgia, serif',
                            fontStyle: 'italic',
                            fontSize: '1.35rem',
                            fontWeight: 400,
                            color: '#3D3A35',
                            lineHeight: 1.4,
                            margin: '0 0 12px'
                          }}
                        >
                          {item.q}
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#5C5954', lineHeight: 1.65 }}>
                          {item.a}
                        </p>
                      </div>

                      {/* Right Column: Clean Capability Rows with Warm Amber Lines (Matches Image 6) */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {item.highlights.map((hl, hIdx) => (
                          <div
                            key={hIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '16px',
                              padding: '15px 20px',
                              borderRadius: '14px',
                              background: hIdx === 0 ? 'rgba(217, 119, 87, 0.08)' : 'rgba(255, 255, 255, 0.55)',
                              border: hIdx === 0 ? '1px solid rgba(217, 119, 87, 0.22)' : '1px solid rgba(31, 30, 29, 0.06)'
                            }}
                          >
                            <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1F1E1D' }}>
                              {hl.label}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                              <div
                                style={{
                                  width: 'clamp(44px, 7vw, 84px)',
                                  height: '2.5px',
                                  borderRadius: '999px',
                                  background: 'linear-gradient(to right, #D97757, #E6997A)'
                                }}
                              />
                              <span
                                style={{
                                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                                  fontSize: '0.78rem',
                                  fontWeight: 700,
                                  color: '#5C5954',
                                  minWidth: '52px',
                                  textAlign: 'right'
                                }}
                              >
                                {hl.metric}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Quick Links under FAQ */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '28px', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
        <span style={{ fontSize: '0.88rem', color: '#5C5954' }}>
          Need deeper ATS checklists, interview frameworks, or CS roadmaps?
        </span>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link
            to="/guides"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              borderRadius: '1rem',
              background: '#1F1E1D',
              color: '#FDFCF9',
              fontSize: '0.84rem',
              fontWeight: 700
            }}
          >
            Career Guides <ArrowRight size={14} />
          </Link>
          <Link
            to="/about"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              borderRadius: '1rem',
              border: '1px solid rgba(31, 30, 29, 0.16)',
              background: '#FDFCF9',
              color: '#1F1E1D',
              fontSize: '0.84rem',
              fontWeight: 700
            }}
          >
            About CareerPilot
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EditorialFaqAccordion;
