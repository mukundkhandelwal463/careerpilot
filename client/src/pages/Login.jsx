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
                  window.google.accounts.id.renderButton(container, {
                    theme: "outline",
                    size: "large",
                    width: 368
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
      <main className="page">
        <div className="auth-container">
          <div className="auth-card" id="authCard">
            <h1>
              {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create Account' : 'Verification'}
            </h1>
            <p className="subtitle">
              {mode === 'login' 
                ? 'Sign in to save your resumes & analysis' 
                : mode === 'register' 
                ? 'Join the future of resume building' 
                : `Check ${email} for 6-digit code`}
            </p>

            {/* Google Sign-In & Divider */}
            {mode !== 'otp' && (
              <>
                <div id="googleBtnContainer" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}></div>
                <div className="divider">or</div>
              </>
            )}

            {/* Tabs */}
            {mode !== 'otp' && (
              <div className="auth-tabs">
                <button className={mode === 'login' ? 'active' : ''} onClick={() => switchTab('login')}>Sign In</button>
                <button className={mode === 'register' ? 'active' : ''} onClick={() => switchTab('register')}>Create Account</button>
              </div>
            )}

            {/* Login Form */}
            {mode === 'login' && (
              <form id="loginForm" className="auth-form active" onSubmit={handleLogin}>
                <label htmlFor="loginEmail">Email</label>
                <input 
                  type="email" 
                  id="loginEmail" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com" 
                  required 
                />
                <label htmlFor="loginPassword">Password</label>
                <input 
                  type="password" 
                  id="loginPassword" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password" 
                  required 
                />
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
            )}

            {/* Register Form */}
            {mode === 'register' && (
              <form id="registerForm" className="auth-form active" onSubmit={handleRegister}>
                <label htmlFor="regName">Full Name</label>
                <input 
                  type="text" 
                  id="regName" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name" 
                  required 
                />
                <label htmlFor="regEmail">Email</label>
                <input 
                  type="email" 
                  id="regEmail" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com" 
                  required 
                />
                <label htmlFor="regMobile">Mobile (optional)</label>
                <input 
                  type="text" 
                  id="regMobile" 
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 9999999999" 
                />
                <label htmlFor="regPassword">Password</label>
                <input 
                  type="password" 
                  id="regPassword" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters" 
                  required 
                />
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} disabled={loading}>
                  {loading ? 'Creating...' : 'Create Account'}
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
              <div id="authStatus" className={`auth-status ${status.type}`}>
                {status.text}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
