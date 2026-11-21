import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mic, ShieldCheck, FileText, Users } from 'lucide-react';

const ClaudeAmberCTA = () => {
  return (
    <section
      aria-label="Get Started with CareerPilot"
      style={{
        width: 'calc(100% - clamp(32px, 7vw, 112px))',
        maxWidth: '1640px',
        margin: '48px auto 96px',
        padding: 0
      }}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '360px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(52px, 6vw, 80px) clamp(24px, 5vw, 64px)',
          borderRadius: '28px',
          background: '#FDFCF9',
          border: '1px solid rgba(31, 30, 29, 0.1)',
          boxShadow: '0 18px 48px rgba(31, 30, 29, 0.05)'
        }}
      >
        {/* 21st.dev Soft Luminous Gradient Glow Backdrop (Claude Amber Edition) */}
        <div
          style={{
            position: 'absolute',
            left: '5%',
            right: '5%',
            bottom: '-85px',
            height: '260px',
            borderRadius: '9999px',
            background: 'linear-gradient(90deg, rgba(201, 100, 66, 0.24) 10%, rgba(250, 249, 245, 0.9) 50%, rgba(217, 119, 87, 0.3) 90%)',
            filter: 'blur(56px)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '24px',
            maxWidth: '820px',
            margin: '0 auto'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <h2
              style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: 'clamp(2.1rem, 4.6vw, 3.45rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: '#141413',
                margin: 0
              }}
            >
              Turn Your Resume Into{' '}
              <span style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', fontWeight: 400, color: '#C96442' }}>
                Interview Offers
              </span>
            </h2>
            <p
              style={{
                margin: 0,
                maxWidth: '620px',
                fontSize: '1rem',
                color: '#535146',
                lineHeight: 1.62
              }}
            >
              Check your ATS compatibility score in seconds, build executive LaTeX resumes, and practice realistic AI voice interviews — completely free to start.
            </p>
          </div>

          {/* 21st.dev Signature Sliding-Arrow Pill Button + Charcoal Secondary CTA */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center', alignItems: 'center' }}>
            <Link
              to="/upload"
              className="group relative inline-flex items-center h-14 rounded-full ps-7 pe-16 transition-all duration-500 hover:ps-16 hover:pe-7 overflow-hidden"
              style={{
                background: '#C96442',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.96rem',
                boxShadow: '0 14px 32px rgba(201, 100, 66, 0.34)',
                textDecoration: 'none'
              }}
            >
              <span className="relative z-10 transition-all duration-500">
                Analyze My Resume Free
              </span>
              <span
                className="absolute right-1.5 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-50px)] group-hover:rotate-45"
                style={{ background: '#FAF9F5', color: '#141413' }}
              >
                <ArrowUpRight size={18} strokeWidth={2.3} />
              </span>
            </Link>

            <Link
              to="/preparation"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                height: '56px',
                padding: '0 28px',
                borderRadius: '999px',
                background: '#262624',
                color: '#FAF9F5',
                border: '1px solid #3E3E38',
                fontWeight: 700,
                fontSize: '0.94rem',
                boxShadow: '0 10px 24px rgba(20, 20, 19, 0.16)',
                textDecoration: 'none'
              }}
            >
              <Mic size={17} color="#D97757" /> Practice Voice Interviews
            </Link>
          </div>

          {/* Subtle Trust Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', paddingTop: '14px', borderTop: '1px solid rgba(31, 30, 29, 0.08)', width: '100%' }}>
            {[
              { icon: ShieldCheck, text: '100% Free to Start' },
              { icon: FileText, text: 'Instant PDF & LaTeX Export' },
              { icon: Users, text: 'Built for Engineers & Students' }
            ].map((b, i) => {
              const BIcon = b.icon;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.84rem', fontWeight: 600, color: '#535146' }}>
                  <BIcon size={15} color="#C96442" />
                  <span>{b.text}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClaudeAmberCTA;
