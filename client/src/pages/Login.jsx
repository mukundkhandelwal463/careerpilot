import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import '../css/style.css';

const Login = () => {
  // Mode: 'login' | 'register' | 'otp'
  const [mode, setMode] = useState('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  
  // 6 digits OTP code state
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const [status, setStatus] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const { login: setAuthUser, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleGoogleCredentialResponse = async (response) => {
    showStatus('', '');
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: response.credential })
      });
      const data = await res.json();
      if (data.success) {
        setAuthUser(data.user);
        navigate('/dashboard');
      } else {
        showStatus(data.error || 'Google sign-in failed.', 'error');
      }
    } catch (err) {
      showStatus('Connection failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let attempts = 0;
    const initGoogle = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/google-client-id`);
        const data = await res.json();
        if (data.success && data.google_client_id) {
          const interval = setInterval(() => {
            attempts++;
            if (window.google) {
              clearInterval(interval);
              window.google.accounts.id.initialize({
                client_id: data.google_client_id,
                callback: handleGoogleCredentialResponse
              });
              
              if (mode !== 'otp') {
                const container = document.getElementById("googleBtnContainer");
                if (container) {
                  container.innerHTML = '';
                  window.google.accounts.id.renderButton(container, {
                    theme: "outline",
                    size: "large",
                    shape: "pill",
                    text: "continue_with",
                    logo_alignment: "center",
                    width: 320
                  });
                }
              }
            } else if (attempts > 30) {
              clearInterval(interval);
            }
          }, 200);
        }
      } catch (err) {
        console.error("Google SSO initialization failed:", err);
      }
    };
    initGoogle();
  }, [mode]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const showStatus = (msg, type) => {
    setStatus({ text: msg, type: type });
  };

  const switchTab = (tab) => {
    setMode(tab);
    setStatus({ text: '', type: '' });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    showStatus('', '');
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setAuthUser(data.user);
        navigate('/dashboard');
      } else if (data.unverified) {
        setMode('otp');
        showStatus(data.error || 'Account unverified. Verify email.', 'error');
      } else {
        showStatus(data.error || 'Login failed.', 'error');
      }
    } catch (err) {
      showStatus('Connection failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    showStatus('', '');
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          mobile: mobile,
          password: password
        })
      });
      const data = await res.json();
      if (data.success) {
        setMode('otp');
        const helperText = data.dev_otp ? ` (Dev Code: ${data.dev_otp})` : '';
        showStatus("Verification code sent to " + email + helperText, 'success');
      } else {
        showStatus(data.error || 'Registration failed.', 'error');
      }
    } catch (err) {
      showStatus('Connection failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    showStatus('', '');
    const code = otpCode.join('');
    if (code.length < 6) {
      showStatus('Please enter all 6 digits.', 'error');
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      const data = await res.json();
      if (data.success) {
        setAuthUser(data.user);
        navigate('/dashboard');
      } else {
        showStatus(data.error || 'Verification failed.', 'error');
      }
    } catch (err) {
      showStatus('Connection failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    showStatus('', '');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) {
        const helperText = data.dev_otp ? ` (Dev Code: ${data.dev_otp})` : '';
        showStatus("New OTP sent to " + email + helperText, 'success');
        setResendCooldown(30);
      } else {
        showStatus(data.error || 'Failed to resend OTP.', 'error');
      }
    } catch (err) {
      showStatus('Connection failed.', 'error');
    }
  };

  const handleOtpChange = (val, index) => {
    const cleaned = val.replace(/[^0-9]/g, '');
    const nextOtp = [...otpCode];
    nextOtp[index] = cleaned;
    setOtpCode(nextOtp);

    // Auto-focus next field
    if (cleaned && index < 5) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px', minHeight: 'calc(100vh - 120px)' }}>
        <div className="auth-container" style={{ width: '100%', maxWidth: '440px' }}>
          <div className="auth-card" id="authCard" style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #FAF9F5 100%)',
            borderRadius: '28px',
            padding: '38px 32px',
            border: '1px solid rgba(24, 35, 38, 0.08)',
            boxShadow: '0 20px 50px rgba(28, 36, 39, 0.08)',
            transition: 'all 0.3s ease'
          }}>
            {/* Header Brand Icon */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: '#ffffff',
                border: '1px solid rgba(24, 35, 38, 0.08)',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
                margin: '0 auto 14px',
                display: 'grid',
                placeItems: 'center',
                padding: '8px'
              }}>
                <img src="/logo.png" alt="CareerPilot" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
              </div>
              <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#1c2427', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create Account' : 'Email Verification'}
              </h1>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                {mode === 'login' 
                  ? 'Sign in to access your AI resume screener & interview prep' 
                  : mode === 'register' 
                  ? 'Join CareerPilot for AI ATS analysis & mock interviews' 
                  : `Check ${email} for 6-digit verification code`}
              </p>
            </div>

            {/* Google SSO Container */}
            {mode !== 'otp' && (
              <div style={{ marginBottom: '20px' }}>
                <div 
                  id="googleBtnContainer" 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    width: '100%',
                    minHeight: '44px'
                  }}
                ></div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  margin: '20px 0 16px',
                  color: '#94a3b8',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(24, 35, 38, 0.08)' }}></div>
                  <span>or continue with email</span>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(24, 35, 38, 0.08)' }}></div>
                </div>
              </div>
            )}

            {/* Segmented Control Tabs */}
            {mode !== 'otp' && (
              <div style={{
                background: '#f1f5f9',
                padding: '4px',
                borderRadius: '999px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4px',
                marginBottom: '22px'
              }}>
                <button 
                  type="button"
                  onClick={() => switchTab('login')}
                  style={{
                    padding: '9px 16px',
                    borderRadius: '999px',
                    border: 'none',
                    background: mode === 'login' ? '#ffffff' : 'transparent',
                    color: mode === 'login' ? '#ff6b4a' : '#64748b',
                    fontWeight: mode === 'login' ? 700 : 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    boxShadow: mode === 'login' ? '0 2px 8px rgba(0, 0, 0, 0.06)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Sign In
                </button>
                <button 
                  type="button"
                  onClick={() => switchTab('register')}
                  style={{
                    padding: '9px 16px',
                    borderRadius: '999px',
                    border: 'none',
                    background: mode === 'register' ? '#ffffff' : 'transparent',
                    color: mode === 'register' ? '#ff6b4a' : '#64748b',
                    fontWeight: mode === 'register' ? 700 : 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    boxShadow: mode === 'register' ? '0 2px 8px rgba(0, 0, 0, 0.06)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Create Account
                </button>
              </div>
            )}

            {/* Login Form */}
            {mode === 'login' && (
              <form id="loginForm" onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label htmlFor="loginEmail" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Email Address</label>
                  <input 
                    type="email" 
                    id="loginEmail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com" 
                    required 
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      fontSize: '0.92rem',
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s'
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="loginPassword" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Password</label>
                  <input 
                    type="password" 
                    id="loginPassword" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password" 
                    required 
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      fontSize: '0.92rem',
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s'
                    }}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{
                    width: '100%',
                    marginTop: '8px',
                    padding: '13px',
                    borderRadius: '999px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #ff6b4a 0%, #ff8f57 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.96rem',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(255, 107, 74, 0.35)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
            )}

            {/* Register Form */}
            {mode === 'register' && (
              <form id="registerForm" onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label htmlFor="regName" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Full Name</label>
                  <input 
                    type="text" 
                    id="regName" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name" 
                    required 
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      fontSize: '0.92rem',
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="regEmail" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Email Address</label>
                  <input 
                    type="email" 
                    id="regEmail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com" 
                    required 
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      fontSize: '0.92rem',
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="regMobile" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Mobile (optional)</label>
                  <input 
                    type="text" 
                    id="regMobile" 
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 9999999999" 
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      fontSize: '0.92rem',
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="regPassword" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Password</label>
                  <input 
                    type="password" 
                    id="regPassword" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters" 
                    required 
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      fontSize: '0.92rem',
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{
                    width: '100%',
                    marginTop: '8px',
                    padding: '13px',
                    borderRadius: '999px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #ff6b4a 0%, #ff8f57 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.96rem',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(255, 107, 74, 0.35)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}

            {/* OTP Form */}
            {mode === 'otp' && (
              <form id="otpForm" className="auth-form active" onSubmit={handleVerifyOTP}>
                <div className="otp-box">
                  <p style={{ fontWeight: 700, marginBottom: '10px' }}>Verify Your Email</p>
                  <div className="otp-inputs" id="otpInputs">
                    {otpCode.map((val, idx) => (
                      <input 
                        key={idx}
                        ref={otpRefs[idx]}
                        type="text" 
                        maxLength={1} 
                        value={val}
                        onChange={(e) => handleOtpChange(e.target.value, idx)}
                        onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                      />
                    ))}
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify & Sign In'}
                  </button>
                  <p className="resend-text">
                    Didn't get it?{' '}
                    <span 
                      className={`resend-link ${resendCooldown > 0 ? 'disabled' : ''}`} 
                      id="resendBtn" 
                      onClick={handleResendOTP}
                    >
                      {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
                    </span>
                  </p>
                  <button 
                    type="button" 
                    onClick={() => setMode('login')} 
                    className="btn btn-secondary" 
                    style={{ width: '105px', marginTop: '20px', fontSize: '0.82rem', padding: '6px' }}
                  >
                    Back
                  </button>
                </div>
              </form>
            )}

            {status.text && (
              <div id="authStatus" className={`auth-status ${status.type}`} style={{ marginTop: '16px', borderRadius: '12px', padding: '10px 14px', fontSize: '0.86rem', textAlign: 'center' }}>
                {status.text}
              </div>
            )}

            <p style={{ marginTop: '22px', fontSize: '0.78rem', color: '#64748b', textAlign: 'center', lineHeight: 1.5 }}>
              By signing in or creating an account, you agree to our{' '}
              <Link to="/terms" style={{ color: '#ff6b4a', textDecoration: 'underline', fontWeight: 600 }}>Terms & Conditions</Link>
              {' '}and{' '}
              <Link to="/privacy" style={{ color: '#ff6b4a', textDecoration: 'underline', fontWeight: 600 }}>Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
