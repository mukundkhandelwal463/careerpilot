import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/dashboard.jsx'
import ResumeBuilder from './pages/ResumeBuilder.jsx'
import Preview from './pages/Preview.jsx'
import Upload from './pages/Upload.jsx'
import Result from './pages/Result.jsx'
import MakerOptions from './pages/MakerOptions.jsx'
import Jobs from './pages/Jobs.jsx'
import Preparation from './pages/Preparation.jsx'
import DetailedTheory from './pages/DetailedTheory.jsx'
import OopsTheory from './pages/OopsTheory.jsx'
import OsTheory from './pages/OsTheory.jsx'
import CnTheory from './pages/CnTheory.jsx'
import DbmsTheory from './pages/DbmsTheory.jsx'
import SystemDesignTheory from './pages/SystemDesignTheory.jsx'
import MockTest from './pages/MockTest.jsx'
import TermsAndConditions from './pages/TermsAndConditions.jsx'

// Protected Route Wrapper Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#FAF9F4' }}>
        <div style={{ fontSize: '1.1rem', color: '#1c2427', fontFamily: 'sans-serif' }}>Loading...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/view/:resumeId' element={<Preview />} />
          <Route path='/terms' element={<TermsAndConditions />} />
          <Route path='/privacy' element={<TermsAndConditions />} />

          {/* Protected Routes */}
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/upload' element={<ProtectedRoute><Upload /></ProtectedRoute>} />
          <Route path='/result' element={<ProtectedRoute><Result /></ProtectedRoute>} />
          <Route path='/maker_options' element={<Navigate to="/app/builder/default" replace />} />
          <Route path='/jobs' element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
          <Route path='/preparation' element={<ProtectedRoute><Preparation /></ProtectedRoute>} />
          <Route path='/preparation/theory/OOPs' element={<ProtectedRoute><OopsTheory /></ProtectedRoute>} />
          <Route path='/preparation/theory/OS' element={<ProtectedRoute><OsTheory /></ProtectedRoute>} />
          <Route path='/preparation/theory/CN' element={<ProtectedRoute><CnTheory /></ProtectedRoute>} />
          <Route path='/preparation/theory/DBMS' element={<ProtectedRoute><DbmsTheory /></ProtectedRoute>} />
          <Route path='/preparation/theory/SystemDesign' element={<ProtectedRoute><SystemDesignTheory /></ProtectedRoute>} />
          <Route path='/preparation/mock-test' element={<ProtectedRoute><MockTest /></ProtectedRoute>} />
          <Route path='/preparation/theory/:patternName' element={<ProtectedRoute><DetailedTheory /></ProtectedRoute>} />
          <Route path='/app/builder/:resumeId' element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
          
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
