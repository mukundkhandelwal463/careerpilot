import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Menu, X, Home, Award, FileCode, Briefcase, Sparkles, LayoutDashboard, LogOut } from 'lucide-react';
import '../css/style.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const saved = localStorage.getItem("app_notifications");
    if (saved) {
      try {
        setNotifications(JSON.parse(saved));
      } catch (e) { }
    }
    setHasUnread(localStorage.getItem("has_unread_notifications") === "true");

    const handleNewNotification = (e) => {
      const savedLatest = localStorage.getItem("app_notifications");
      if (savedLatest) {
        try {
          setNotifications(JSON.parse(savedLatest));
        } catch (err) { }
      }
      setHasUnread(true);
      setShowDropdown(true);
    };

    window.addEventListener("new_scan_notification", handleNewNotification);
    return () => {
      window.removeEventListener("new_scan_notification", handleNewNotification);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) {
      setHasUnread(false);
      localStorage.setItem("has_unread_notifications", "false");
    }
  };

  const handleClearNotifications = (e) => {
    e.stopPropagation();
    setNotifications([]);
    setHasUnread(false);
    localStorage.removeItem("app_notifications");
    localStorage.removeItem("has_unread_notifications");
  };

  const handleLogout = async () => {
    setMobileMenuOpen(false);
    await logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const renderAvatar = (size = '41px') => {
    const userEmail = user?.email || "default";
    const savedImg = localStorage.getItem(`candidate_profile_img_${userEmail}`);
    if (savedImg) {
      return (
        <img
          src={savedImg}
          alt="Profile"
          style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }}
        />
      );
    }
    if (user && user.profile_image) {
      return (
        <img
          src={user.profile_image}
          alt="Profile"
          style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }}
        />
      );
    }
    return (
      <div style={{ width: size, height: size, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg style={{ width: '20px', height: '20px', color: '#64748b' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    );
  };

  return (
    <>
      <header className="navbar" style={{
        width: '100%',
        maxWidth: '100%',
        margin: '0',
        padding: '12px 24px 6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'transparent',
        boxShadow: 'none',
        border: 'none',
        backdropFilter: 'none',
        position: 'sticky',
        top: '8px',
        zIndex: 100
      }}>
        {/* Left side: logo icon + CareerPilot brand title in pill wrapper */}
        <Link to="/" style={{
          background: '#ffffff',
          borderRadius: '999px',
          padding: '10px 24px',
          marginLeft: '20px',
          border: '1px solid rgba(24, 35, 38, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          height: '56px',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.2s'
        }}>
          <img src="/logo.png" alt="Logo" style={{ height: '34px', width: 'auto', objectFit: 'contain' }} />
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1c2427', fontFamily: 'Sora, sans-serif', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
            Career<span style={{ color: '#ff6b4a' }}>Pilot</span>
          </span>
        </Link>

        {/* Right side desktop container: Exact Original Desktop Layout */}
        <div className="nav-desktop-container" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Navigation links capsule */}
          <nav style={{
            background: '#ffffff',
            borderRadius: '999px',
            padding: '5px',
            border: '1px solid rgba(24, 35, 38, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)'
          }}>
            <Link to="/" className={`nav-link-mock ${isActive('/')}`}>Home</Link>
            {user && (
              <>
                <Link to="/upload" className={`nav-link-mock ${isActive('/upload')}`}>ATS Score</Link>
                <Link to="/app/builder/default" className={`nav-link-mock ${location.pathname.startsWith('/app/builder/') ? 'active' : ''}`}>Resume Maker</Link>
                <Link to="/jobs" className={`nav-link-mock ${isActive('/jobs')}`}>Jobs</Link>
                <Link to="/preparation" className={`nav-link-mock ${isActive('/preparation')}`}>Preparation</Link>
                <Link to="/dashboard" className={`nav-link-mock ${isActive('/dashboard')}`}>Dashboard</Link>
              </>
            )}
          </nav>

          {/* User Actions */}
          {user ? (
            <>
              {/* Notification Button */}
              <button
                onClick={toggleDropdown}
                style={{
                  background: '#ffffff',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '1px solid rgba(24, 35, 38, 0.08)',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)'
                }}
              >
                <span style={{ fontSize: '1.0rem' }}>🔔</span>
                {hasUnread && (
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '6px',
                    height: '6px',
                    background: '#ff6b4a',
                    borderRadius: '50%'
                  }}></span>
                )}

                {showDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '46px',
                    right: '0',
                    width: '320px',
                    background: '#ffffff',
                    border: '1px solid rgba(24, 35, 38, 0.08)',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    zIndex: 1000,
                    padding: '16px',
                    textAlign: 'left',
                    cursor: 'default'
                  }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text)' }}>Notifications</strong>
                      <button
                        onClick={handleClearNotifications}
                        style={{ background: 'none', border: 'none', color: 'var(--accent-deep)', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Clear all
                      </button>
                    </div>
                    {notifications.length === 0 ? (
                      <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: '10px 0', textAlign: 'center' }}>No new notifications.</p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
                        {notifications.map((n) => (
                          <div key={n.id} style={{
                            fontSize: '0.82rem',
                            color: 'var(--text)',
                            padding: '8px 12px',
                            borderRadius: '10px',
                            background: 'rgba(24, 35, 38, 0.03)',
                            borderLeft: '3px solid #ff6b4a'
                          }}>
                            <div>{n.text}</div>
                            <span style={{ fontSize: '0.68rem', color: 'var(--muted)', marginTop: '4px', display: 'block' }}>{n.time}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </button>

              {/* Profile Avatar Button */}
              <Link to="/dashboard" style={{
                display: 'block',
                textDecoration: 'none',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '1px solid rgba(24, 35, 38, 0.08)',
                background: '#ffffff',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)'
              }}>
                <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
                  {renderAvatar()}
                </div>
              </Link>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                style={{
                  height: '50px',
                  borderRadius: '999px',
                  padding: '0 21px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  border: '1px solid rgba(24, 35, 38, 0.08)',
                  background: '#ffffff',
                  color: 'var(--text)',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)'
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link className="btn btn-primary" to="/login" style={{
              height: '50px',
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: '999px',
              padding: '0 21px',
              fontSize: '0.94rem',
              fontWeight: 700,
              background: '#ff6b4a',
              color: 'white',
              border: 'none',
              boxShadow: '0 8px 20px rgba(255, 107, 74, 0.15)',
              textDecoration: 'none'
            }}>
              Start
            </Link>
          )}
        </div>

        {/* Mobile Toggle Button (Visible ONLY on mobile max-width: 900px) */}
        <div className="nav-mobile-toggle">
          {user && (
            <Link to="/dashboard" style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'grid',
              placeItems: 'center',
              background: '#ffffff',
              border: '1px solid rgba(24, 35, 38, 0.1)'
            }}>
              {renderAvatar('38px')}
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '1px solid rgba(24, 35, 38, 0.1)',
              display: 'grid',
              placeItems: 'center',
              color: '#1e293b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              cursor: 'pointer'
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="size-6 text-slate-800" /> : <Menu className="size-6 text-slate-800" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Active on Mobile Screen Width) */}
      <div className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
        <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/logo.png" alt="Logo" style={{ height: '30px', width: 'auto' }} />
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1c2427' }}>
                Career<span style={{ color: '#ff6b4a' }}>Pilot</span>
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'grid', placeItems: 'center', cursor: 'pointer' }}
            >
              <X className="size-5 text-slate-600" />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <Link to="/" className={`mobile-nav-link ${isActive('/')}`}>
              <Home className="size-5 text-orange-500" /> Home
            </Link>

            {user ? (
              <>
                <Link to="/upload" className={`mobile-nav-link ${isActive('/upload')}`}>
                  <Award className="size-5 text-emerald-500" /> ATS Score Analyzer
                </Link>
                <Link to="/app/builder/default" className={`mobile-nav-link ${location.pathname.startsWith('/app/builder/') ? 'active' : ''}`}>
                  <FileCode className="size-5 text-purple-500" /> Resume Builder
                </Link>
                <Link to="/jobs" className={`mobile-nav-link ${isActive('/jobs')}`}>
                  <Briefcase className="size-5 text-teal-500" /> Jobs Engine
                </Link>
                <Link to="/preparation" className={`mobile-nav-link ${isActive('/preparation')}`}>
                  <Sparkles className="size-5 text-amber-500" /> Preparation Hub
                </Link>
                <Link to="/dashboard" className={`mobile-nav-link ${isActive('/dashboard')}`}>
                  <LayoutDashboard className="size-5 text-blue-500" /> Candidate Dashboard
                </Link>
              </>
            ) : (
              <Link to="/login" className="mobile-nav-link active" style={{ background: '#ff6b4a', color: '#ffffff', justifyContent: 'center', marginTop: '16px' }}>
                Get Started
              </Link>
            )}
          </div>

          {user && (
            <div style={{ paddingTop: '20px', borderTop: '1px solid #f1f5f9', marginTop: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', padding: '10px', background: '#f8fafc', borderRadius: '14px' }}>
                {renderAvatar('40px')}
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {user.name || user.email?.split('@')[0]}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {user.email}
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  background: '#fef2f2',
                  color: '#dc2626',
                  border: '1px solid #fee2e2',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <LogOut className="size-4" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
