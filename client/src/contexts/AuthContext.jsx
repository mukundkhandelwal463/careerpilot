import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('user_session', JSON.stringify(data.user));
      } else {
        const saved = localStorage.getItem('user_session');
        if (saved) {
          try {
            setUser(JSON.parse(saved));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    } catch (e) {
      const saved = localStorage.getItem('user_session');
      if (saved) {
        try {
          setUser(JSON.parse(saved));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user_session', JSON.stringify(userData));
    }
  };

  const logout = async () => {
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
      localStorage.removeItem('user_session');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
