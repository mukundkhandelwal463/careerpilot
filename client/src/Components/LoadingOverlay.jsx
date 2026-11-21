import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  FileSearch,
  ShieldCheck,
  MailCheck,
  Sparkles,
  Briefcase,
  Cpu,
  Compass,
  Loader2,
  CheckCircle2
} from 'lucide-react';

const VARIANT_CONFIG = {
  scan: {
    icon: FileSearch,
    accent: '#D97757',
    secondary: '#5EA397',
    badge: 'ATS AI ENGINE',
    defaultTitle: 'Scanning Your Resume',
    defaultSteps: [
      'Extracting document structure & text...',
      'Evaluating ATS keyword compatibility...',
      'Running AI career alignment analysis...',
      'Compiling personalized score & insights...'
    ]
  },
  auth: {
    icon: ShieldCheck,
    accent: '#D97757',
    secondary: '#5EA397',
    badge: 'SECURE AUTH',
    defaultTitle: 'Signing You In',
    defaultSteps: [
      'Verifying credentials securely...',
      'Checking account security status...',
      'Preparing your CareerPilot workspace...'
    ]
  },
  otp: {
    icon: MailCheck,
    accent: '#D97757',
    secondary: '#22c55e',
    badge: 'EMAIL VERIFICATION',
    defaultTitle: 'Sending Verification Code',
    defaultSteps: [
      'Generating 6-digit security code...',
      'Connecting to secure mail server...',
      'Delivering OTP to your inbox...'
    ]
  },
  ai: {
    icon: Sparkles,
    accent: '#D97757',
    secondary: '#E6997A',
    badge: 'CAREERPILOT AI',
    defaultTitle: 'AI Engine Working',
    defaultSteps: [
      'Analyzing your inputs with Gemini AI...',
      'Structuring high-impact content...',
      'Polishing final output...'
    ]
  },
  jobs: {
    icon: Briefcase,
    accent: '#D97757',
    secondary: '#5EA397',
    badge: 'LIVE JOB MATCHER',
    defaultTitle: 'Searching Live Jobs',
    defaultSteps: [
      'Querying LinkedIn, Indeed & Google Jobs...',
      'Filtering roles matching your skills...',
      'Ranking best career opportunities...'
    ]
  },
  test: {
    icon: Cpu,
    accent: '#D97757',
    secondary: '#5EA397',
    badge: 'ASSESSMENT ENGINE',
    defaultTitle: 'Processing Assessment',
    defaultSteps: [
      'Connecting to evaluation sandbox...',
      'Analyzing responses & code logic...',
      'Finalizing performance metrics...'
    ]
  },
  roadmap: {
    icon: Compass,
    accent: '#D97757',
    secondary: '#5EA397',
    badge: 'CAREER ARCHITECT',
    defaultTitle: 'Building Career Roadmap',
    defaultSteps: [
      'Analyzing target role requirements...',
      'Identifying skill milestones & resources...',
      'Generating personalized study timeline...'
    ]
  },
  default: {
    icon: Loader2,
    accent: '#D97757',
    secondary: '#5EA397',
    badge: 'CAREERPILOT',
    defaultTitle: 'Please Wait',
    defaultSteps: [
      'Processing your request...',
      'Almost ready...'
    ]
  }
};

const LoadingOverlay = ({
  isOpen,
  title,
  subtitle,
  steps,
  variant = 'default'
}) => {
  const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.default;
  const Icon = config.icon;
  const activeSteps = steps && steps.length > 0 ? steps : config.defaultSteps;
  const activeTitle = title || config.defaultTitle;

  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    if (!isOpen) {
      setStepIndex(0);
      setProgress(8);
      return;
    }

    setStepIndex(0);
    setProgress(12);

    const stepTimer = setInterval(() => {
      setStepIndex((prev) => (prev < activeSteps.length - 1 ? prev + 1 : prev));
    }, 1800);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 93) return prev;
        const remaining = 94 - prev;
        return Math.min(93, prev + Math.max(1.2, remaining * 0.12));
      });
    }, 260);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
    };
  }, [isOpen, activeSteps.length]);

  if (!isOpen) return null;

  const overlay = (
    <div
      className="cp-loader-backdrop"
      role="dialog"
      aria-modal="true"
      aria-live="polite"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'rgba(15, 25, 28, 0.62)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        animation: 'cpFadeIn 0.22s ease-out forwards'
      }}
    >
      <style>{`
        @keyframes cpFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cpScaleIn {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cpOrbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes cpOrbitReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes cpPulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.16); opacity: 1; }
        }
        @keyframes cpShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes cpScanLine {
          0%, 100% { transform: translateY(-18px); opacity: 0.35; }
          50% { transform: translateY(18px); opacity: 0.95; }
        }
      `}</style>

      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          borderRadius: '28px',
          background: 'linear-gradient(145deg, rgba(255, 253, 249, 0.96) 0%, rgba(248, 244, 236, 0.96) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 32px 80px rgba(10, 18, 20, 0.36), 0 0 0 1px rgba(24, 35, 38, 0.06)',
          padding: '34px 30px 28px',
          textAlign: 'center',
          fontFamily: '"Manrope", "Segoe UI", sans-serif',
          color: '#182326',
          animation: 'cpScaleIn 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle decorative ambient blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${config.accent}24 0%, transparent 70%)`,
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-50px',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${config.secondary}30 0%, transparent 70%)`,
            pointerEvents: 'none'
          }}
        />

        {/* Top Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '999px',
            background: 'rgba(255, 107, 74, 0.1)',
            border: '1px solid rgba(255, 107, 74, 0.22)',
            color: '#e14b29',
            fontSize: '0.7rem',
            fontWeight: 800,
            letterSpacing: '0.09em',
            marginBottom: '20px'
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#ff6b4a',
              animation: 'cpPulseGlow 1.2s ease-in-out infinite'
            }}
          />
          {config.badge}
        </div>

        {/* Dual-Orbital Animated Loader Emblem */}
        <div
          style={{
            position: 'relative',
            width: '96px',
            height: '96px',
            margin: '0 auto 22px',
            display: 'grid',
            placeItems: 'center'
          }}
        >
          {/* Outer spinning ring */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '3px solid rgba(24, 35, 38, 0.06)',
              borderTopColor: config.accent,
              borderRightColor: config.accent,
              animation: 'cpOrbitSpin 1.15s cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite'
            }}
          />
          {/* Inner counter-spinning dashed ring */}
          <div
            style={{
              position: 'absolute',
              inset: '10px',
              borderRadius: '50%',
              border: '2.5px dashed rgba(24, 35, 38, 0.12)',
              borderBottomColor: config.secondary,
              borderLeftColor: config.secondary,
              animation: 'cpOrbitReverse 2.1s linear infinite'
            }}
          />
          {/* Center glowing orb */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '18px',
              background: `linear-gradient(135deg, ${config.accent}, #ff8f57)`,
              boxShadow: '0 12px 28px rgba(255, 107, 74, 0.35)',
              display: 'grid',
              placeItems: 'center',
              color: '#ffffff',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Icon
              size={27}
              strokeWidth={2.2}
              style={variant === 'default' ? { animation: 'cpOrbitSpin 1.2s linear infinite' } : undefined}
            />
            {variant === 'scan' && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'rgba(255, 255, 255, 0.85)',
                  boxShadow: '0 0 10px #fff',
                  animation: 'cpScanLine 1.5s ease-in-out infinite'
                }}
              />
            )}
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3
          style={{
            margin: '0 0 6px',
            fontSize: '1.3rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#122023'
          }}
        >
          {activeTitle}
        </h3>
        <p
          style={{
            margin: '0 0 20px',
            fontSize: '0.86rem',
            color: '#536266',
            lineHeight: 1.45
          }}
        >
          {subtitle || activeSteps[stepIndex]}
        </p>

        {/* Smooth Progress Bar with Shimmer */}
        <div
          style={{
            width: '100%',
            height: '8px',
            borderRadius: '999px',
            background: 'rgba(24, 35, 38, 0.08)',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '18px'
          }}
        >
          <div
            style={{
              width: `${Math.round(progress)}%`,
              height: '100%',
              borderRadius: '999px',
              background: `linear-gradient(90deg, ${config.accent}, #ff8f57, ${config.secondary})`,
              transition: 'width 0.3s ease-out',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                animation: 'cpShimmer 1.4s ease-in-out infinite'
              }}
            />
          </div>
        </div>

        {/* Progressive Step Checklist */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            textAlign: 'left',
            background: 'rgba(255, 255, 255, 0.72)',
            border: '1px solid rgba(24, 35, 38, 0.06)',
            borderRadius: '16px',
            padding: '12px 14px'
          }}
        >
          {activeSteps.map((stepText, idx) => {
            const isDone = idx < stepIndex;
            const isCurrent = idx === stepIndex;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.79rem',
                  fontWeight: isCurrent ? 700 : 500,
                  color: isDone ? '#0f766e' : isCurrent ? '#122023' : '#8b999d',
                  transition: 'color 0.25s ease'
                }}
              >
                {isDone ? (
                  <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0 }} />
                ) : isCurrent ? (
                  <Loader2
                    size={15}
                    color={config.accent}
                    style={{ flexShrink: 0, animation: 'cpOrbitSpin 0.95s linear infinite' }}
                  />
                ) : (
                  <span
                    style={{
                      width: '15px',
                      height: '15px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'rgba(24, 35, 38, 0.2)'
                      }}
                    />
                  </span>
                )}
                <span>{stepText}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(overlay, document.body);
};

export default LoadingOverlay;
