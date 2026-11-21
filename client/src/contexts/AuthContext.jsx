import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const AuthContext = createContext();

// Session security policy: 12 hours of inactivity or reopening after 12 hours
const SESSION_TIMEOUT_MS = 12 * 60 * 60 * 1000; // 12 hours (43,200,000 ms)
const SESSION_KEY = 'user_session';
const LAST_ACTIVITY_KEY = 'last_activity_timestamp';
const LOGIN_TIME_KEY = 'session_login_time';

export const AuthProvider = ({ children }) => {
  // Check if existing session has expired (e.g. reopening tab/browser after 12 hours)
  const isSessionExpired = () => {
    try {
      const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
      if (!lastActivity) return false;
      const elapsed = Date.now() - parseInt(lastActivity, 10);
      return elapsed > SESSION_TIMEOUT_MS;
    } catch {
      return false;
    }
  };

  const [user, setUser] = useState(() => {
    try {
      if (isSessionExpired()) {
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(LAST_ACTIVITY_KEY);
        localStorage.removeItem(LOGIN_TIME_KEY);
        return null;
      }
      const saved = localStorage.getItem(SESSION_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);
  const lastThrottleRef = useRef(0);

  // Update last activity timestamp in localStorage (throttled to avoid high write frequency)
  const recordActivity = useCallback(() => {
    if (!localStorage.getItem(SESSION_KEY)) return;
    const now = Date.now();
    if (now - lastThrottleRef.current > 30000) { // update at most once every 30 seconds
      lastThrottleRef.current = now;
      localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
    }
  }, []);

  const logout = async (isAutoExpired = false) => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (e) {
      console.error("Logout failed:", e);
    } finally {
      setUser(null);
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(LAST_ACTIVITY_KEY);
      localStorage.removeItem(LOGIN_TIME_KEY);
      localStorage.removeItem('resume_analysis_result');
      localStorage.removeItem('app_notifications');
      localStorage.removeItem('has_unread_notifications');

      if (isAutoExpired && window.location.pathname !== '/login') {
        window.location.href = '/login?expired=1';
      }
    }
  };

  // Evaluate whether session has exceeded 12 hours of inactivity
  const checkSessionExpiry = useCallback(() => {
    if (localStorage.getItem(SESSION_KEY)) {
      const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
      if (lastActivity) {
        const elapsed = Date.now() - parseInt(lastActivity, 10);
        if (elapsed > SESSION_TIMEOUT_MS) {
          console.warn("[Session Security] Session timed out after 12 hours of inactivity. Logging out.");
          logout(true);
          return true;
        }
      }
    }
    return false;
  }, []);

  const fetchUser = async () => {
    // If the 12-hour session has expired on reopen, force logout immediately
    if (isSessionExpired()) {
      await logout(true);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
        if (!localStorage.getItem(LAST_ACTIVITY_KEY)) {
          localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
        }
      } else {
        // Server rejected session (e.g. 401 or session cookie expired on backend)
        setUser(null);
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(LAST_ACTIVITY_KEY);
        localStorage.removeItem(LOGIN_TIME_KEY);
      }
    } catch (e) {
      // Offline fallback: allow only if within valid 12-hour window
      const saved = localStorage.getItem(SESSION_KEY);
      const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
      if (saved && lastActivity && (Date.now() - parseInt(lastActivity, 10)) <= SESSION_TIMEOUT_MS) {
        try {
          setUser(JSON.parse(saved));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(LAST_ACTIVITY_KEY);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    setUser(userData);
    if (userData) {
      const now = Date.now().toString();
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      localStorage.setItem(LAST_ACTIVITY_KEY, now);
      localStorage.setItem(LOGIN_TIME_KEY, now);
      lastThrottleRef.current = Date.now();
    }
  };

  // Activity listeners, focus checks, and periodic 12h timeout checker
  useEffect(() => {
    fetchUser();

    // Check expiration on tab focus or visibility change (e.g. reopening computer/tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const expired = checkSessionExpiry();
        if (!expired) {
          recordActivity();
        }
      }
    };

    const handleWindowFocus = () => {
      const expired = checkSessionExpiry();
      if (!expired) {
        recordActivity();
      }
    };

    // User interaction events to maintain active session
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    const handleUserActivity = () => {
      recordActivity();
    };

    // Sync logout across multiple tabs
    const handleStorageChange = (e) => {
      if (e.key === SESSION_KEY && !e.newValue) {
        setUser(null);
      } else if (e.key === SESSION_KEY && e.newValue) {
        try {
          setUser(JSON.parse(e.newValue));
        } catch { }
      }
    };

    activityEvents.forEach((ev) => window.addEventListener(ev, handleUserActivity, { passive: true }));
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('storage', handleStorageChange);

    // Periodic check every 30 seconds for background/idle tabs
    const intervalId = setInterval(() => {
      checkSessionExpiry();
    }, 30000);

    return () => {
      activityEvents.forEach((ev) => window.removeEventListener(ev, handleUserActivity));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, [checkSessionExpiry, recordActivity]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
