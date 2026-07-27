import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Award, FileCode, Briefcase, Sparkles, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import '../css/mobile.css';

const MobileBottomDock = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="mobile-bottom-dock">
      <Link to="/" className={`dock-item ${isActive('/') ? 'active' : ''}`}>
        <Home className="dock-icon" />
        <span className="dock-label">Home</span>
      </Link>

      <Link to="/upload" className={`dock-item ${isActive('/upload') ? 'active' : ''}`}>
        <Award className="dock-icon" />
        <span className="dock-label">ATS Score</span>
      </Link>

      <Link to="/app/builder/default" className={`dock-item ${isActive('/app/builder') ? 'active' : ''}`}>
        <FileCode className="dock-icon" />
        <span className="dock-label">Builder</span>
      </Link>

      <Link to="/jobs" className={`dock-item ${isActive('/jobs') ? 'active' : ''}`}>
        <Briefcase className="dock-icon" />
        <span className="dock-label">Jobs</span>
      </Link>

      <Link to="/preparation" className={`dock-item ${isActive('/preparation') ? 'active' : ''}`}>
        <Sparkles className="dock-icon" />
        <span className="dock-label">Prep</span>
      </Link>

      <Link to={user ? "/dashboard" : "/login"} className={`dock-item ${isActive('/dashboard') || isActive('/login') ? 'active' : ''}`}>
        <LayoutDashboard className="dock-icon" />
        <span className="dock-label">{user ? 'Dashboard' : 'Sign In'}</span>
      </Link>
    </div>
  );
};

export default MobileBottomDock;
