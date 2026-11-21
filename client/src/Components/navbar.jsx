import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Menu, X, Home, Award, FileCode, Briefcase, Sparkles, LayoutDashboard, LogOut, Bell, Code2 } from 'lucide-react';
import '../css/style.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    setShowDropdown(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const userEmail = user?.email ? user.email.toLowerCase().trim() : null;
  const notifStorageKey = userEmail ? `app_notifications_${userEmail}` : null;
  const unreadStorageKey = userEmail ? `has_unread_notifications_${userEmail}` : null;

  useEffect(() => {
    // Clean up legacy global keys that previously leaked notifications across accounts
    localStorage.removeItem("app_notifications");
    localStorage.removeItem("has_unread_notifications");

    if (!notifStorageKey || !unreadStorageKey) {
      setNotifications([]);
      setHasUnread(false);
      setShowDropdown(false);
      return;
    }

    const loadUserNotifications = () => {
      const saved = localStorage.getItem(notifStorageKey);
      if (saved) {
        try {
          setNotifications(JSON.parse(saved));
        } catch (e) {
          setNotifications([]);
        }
      } else {
        setNotifications([]);
      }
      setHasUnread(localStorage.getItem(unreadStorageKey) === "true");
    };

    loadUserNotifications();

    const handleNewNotification = (e) => {
      const targetEmail = e?.detail?.email ? String(e.detail.email).toLowerCase().trim() : null;
      if (targetEmail && targetEmail !== userEmail) return;

      const savedLatest = localStorage.getItem(notifStorageKey);
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
  }, [userEmail, notifStorageKey, unreadStorageKey]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown && unreadStorageKey) {
      setHasUnread(false);
      localStorage.setItem(unreadStorageKey, "false");
    }
  };

  const handleClearNotifications = (e) => {
    e.stopPropagation();
    setNotifications([]);
    setHasUnread(false);
    if (notifStorageKey) localStorage.removeItem(notifStorageKey);
    if (unreadStorageKey) localStorage.removeItem(unreadStorageKey);
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
          <img src="/logo.png" alt="CareerPilot AI Resume Screener Logo" style={{ height: '34px', width: 'auto', objectFit: 'contain' }} />
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1F1E1D', fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
            Career<span style={{ color: '#D97757' }}>Pilot</span>
          </span>
        </Link>

        {/* Right side desktop container: Exact Original Desktop Layout */}
        <div className="nav-desktop-container" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Navigation links capsule */}
          <nav aria-label="Primary Navigation" style={{
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
              </>
            )}
          </nav>

          {/* User Actions - Outside Notification Bell + 3-Line Menu */}
          {user ? (
            <>
              {/* Notification Bell Button (Outside, just like previous) */}
              <div style={{ position: 'relative' }} ref={notifRef}>
                <button
                  onClick={toggleDropdown}
                  aria-label="Notifications"
                  title="Notifications"
                  style={{
                    position: 'relative',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '1px solid rgba(24, 35, 38, 0.08)',
                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
                    transition: 'all 0.2s ease',
                    color: '#1F1E1D'
                  }}
                >
                  <Bell size={20} />
                  {notifications.length > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      width: '9px',
                      height: '9px',
                      background: '#ff6b4a',
                      borderRadius: '50%',
                      border: '2px solid #ffffff'
                    }} />
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showDropdown && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '58px',
                      right: '0',
                      width: '320px',
                      background: '#ffffff',
                      border: '1px solid rgba(24, 35, 38, 0.08)',
                      borderRadius: '20px',
                      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
                      zIndex: 1000,
                      padding: '18px',
                      textAlign: 'left'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1e293b' }}>Notifications</span>
                      {notifications.length > 0 && (
                        <button
                          onClick={handleClearNotifications}
                          style={{ background: 'none', border: 'none', color: '#ff6b4a', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                    {notifications.length === 0 ? (
                      <p style={{ margin: '14px 0', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>No notifications yet</p>
                    ) : (
                      <div style={{ maxHeight: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {notifications.map((n) => (
                          <div key={n.id} style={{ fontSize: '0.82rem', color: '#334155', borderLeft: '3px solid #ff6b4a', paddingLeft: '10px' }}>
                            <div style={{ fontWeight: 500 }}>{n.text}</div>
                            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{n.time}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 3-Line Hamburger Menu Button */}
              <div style={{ position: 'relative' }} ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-label="User Options Menu"
                  title="Account & Profile Menu"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '1px solid rgba(24, 35, 38, 0.08)',
                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
                    transition: 'all 0.2s ease',
                    color: '#1F1E1D'
                  }}
                >
                  {userMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                {/* Dropdown Menu: Profile with photo, Dashboard & Logout options */}
                {userMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '58px',
                      right: '0',
                      width: '300px',
                      background: '#ffffff',
                      border: '1px solid rgba(24, 35, 38, 0.08)',
                      borderRadius: '20px',
                      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
                      zIndex: 1000,
                      padding: '18px',
                      textAlign: 'left'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Profile info with photo */}
                    <Link
                      to="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textDecoration: 'none',
                        paddingBottom: '14px',
                        borderBottom: '1px solid #f1f5f9'
                      }}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2px solid rgba(217, 119, 87, 0.35)',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0
                      }}>
                        {renderAvatar('48px')}
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {user?.name || user?.full_name || user?.username || 'My Profile'}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {user?.email || 'Candidate Account'}
                        </div>
                      </div>
                    </Link>

                    {/* Navigation & Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '12px 0' }}>
                      <Link
                        to="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 14px',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          color: '#1e293b',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          transition: 'background 0.15s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <LayoutDashboard size={18} color="#4f46e5" />
                        <span>Candidate Dashboard</span>
                      </Link>
                    </div>

                    <div style={{ height: '1px', background: '#f1f5f9', margin: '4px 0 10px 0' }} />

                    {/* Sign Out / Logout Option */}
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'rgba(239, 68, 68, 0.08)',
                        color: '#ef4444',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)'}
                    >
                      <LogOut size={18} color="#ef4444" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
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
