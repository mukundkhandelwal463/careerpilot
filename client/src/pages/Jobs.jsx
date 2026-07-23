import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import { Search, MapPin, Briefcase, Calendar, Upload } from 'lucide-react';
import '../css/style.css';

const EMPLOYMENT_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'FULLTIME', label: 'Full-time' },
  { value: 'PARTTIME', label: 'Part-time' },
  { value: 'CONTRACTOR', label: 'Contract' },
  { value: 'INTERN', label: 'Internship' },
];

const DATE_POSTED_OPTIONS = [
  { value: 'all', label: 'Any time' },
  { value: 'today', label: 'Today' },
  { value: '3days', label: 'Past 3 days' },
  { value: 'week', label: 'Past week' },
  { value: 'month', label: 'Past month' },
];

const JOB_SOURCE_OPTIONS = [
  { value: 'all', label: 'All Sources' },
  { value: 'jsearch', label: 'JSearch / Google Jobs' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'indeed', label: 'Indeed' },
];

const Jobs = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [datePosted, setDatePosted] = useState('all');
  const [jobSource, setJobSource] = useState('all');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [file, setFile] = useState(null);
  const [skillTags, setSkillTags] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  const [status, setStatus] = useState({ text: '', type: '', visible: false });
  const [loading, setLoading] = useState(false);
  const [jobsList, setJobsList] = useState([]);
  const [searched, setSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [queryUsed, setQueryUsed] = useState('');
  const [resultSource, setResultSource] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Auto-fill from previous analysis if available
  useEffect(() => {
    const store = localStorage.getItem("resume_analysis_result");
    if (store) {
      try {
        const data = JSON.parse(store);
        if (data.analysis && data.analysis.category) {
          setQuery(data.analysis.category);
        }
        if (data.analysis && data.analysis.resume_skills) {
          setSkillTags(data.analysis.resume_skills.slice(0, 10));
        }
      } catch (e) {}
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleExtractSkills = async () => {
    if (!file) return;
    setLoading(true);
    setStatus({ text: 'Extracting skills from your resume...', type: 'info', visible: true });

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("source", jobSource);

    try {
      const res = await fetch("/api/search-jobs", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to extract skills.");
      }
      if (data.extracted_skills && data.extracted_skills.length > 0) {
        setSkillTags(data.extracted_skills.slice(0, 15));
        setQuery(data.query_used || data.extracted_skills.slice(0, 8).join(", "));
      }
      setJobsList(data.jobs || []);
      setSearched(true);
      setQueryUsed(data.query_used || '');
      setResultSource(data.source || '');
      setStatus({ text: '', type: '', visible: false });
    } catch (err) {
      setStatus({ text: err.message, type: 'error', visible: true });
    } finally {
      setLoading(false);
    }
  };

  const removeSkill = (skill) => {
    const updated = skillTags.filter(s => s !== skill);
    setSkillTags(updated);
    if (updated.length > 0) {
      setQuery(updated.slice(0, 8).join(", "));
    }
  };

  const addSkill = () => {
    const s = newSkill.trim().toLowerCase();
    if (s && !skillTags.includes(s)) {
      const updated = [...skillTags, s];
      setSkillTags(updated);
      setQuery(updated.slice(0, 8).join(", "));
      setNewSkill('');
    }
  };

  const handleSearch = async (e, pageOverride) => {
    if (e) e.preventDefault();
    const searchQuery = query.trim() || (skillTags.length > 0 ? skillTags.slice(0, 8).join(", ") : '');

    if (!searchQuery) {
      setStatus({ text: "Please enter a search query, add skills, or upload a resume.", type: "error", visible: true });
      return;
    }

    const currentPage = pageOverride || 1;
    setLoading(true);
    const sourceLabel = JOB_SOURCE_OPTIONS.find(option => option.value === jobSource)?.label || 'jobs';
    setStatus({ text: `Searching ${sourceLabel}...`, type: "info", visible: true });
    if (!pageOverride) {
      setJobsList([]);
      setSearched(false);
      setPage(1);
      setResultSource('');
    }

    const formData = new FormData();
    formData.append("query", searchQuery);
    formData.append("location", location);
    formData.append("employment_type", employmentType);
    formData.append("date_posted", datePosted);
    formData.append("source", jobSource);
    formData.append("remote_only", remoteOnly ? "true" : "false");
    formData.append("page", currentPage.toString());
    formData.append("num_pages", "1");

    try {
      const res = await fetch("/api/search-jobs", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Search failed.");
      }

      setJobsList(data.jobs || []);
      setSearched(true);
      setQueryUsed(data.query_used || searchQuery);
      setResultSource(data.source || '');
      setPage(currentPage);
      setStatus({ text: '', type: '', visible: false });
    } catch (err) {
      setStatus({ text: err.message, type: "error", visible: true });
    } finally {
      setLoading(false);
    }
  };

  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      let d;
      if (!isNaN(dateStr) && String(dateStr).length === 10) {
        d = new Date(Number(dateStr) * 1000);
      } else {
        d = new Date(dateStr);
      }
      if (isNaN(d.getTime())) return '';
      const now = new Date();
      const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));
      if (diff <= 0) return 'Recently';
      if (diff === 1) return 'Yesterday';
      if (diff < 7) return `${diff} days ago`;
      if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
      return d.toLocaleDateString();
    } catch { return ''; }
  };

  const formatSalary = (job) => {
    if (!job.min_salary && !job.max_salary) return null;
    const currency = job.salary_currency || 'USD';
    const period = job.salary_period || 'YEAR';
    const min = job.min_salary ? `${currency} ${job.min_salary.toLocaleString()}` : '';
    const max = job.max_salary ? `${currency} ${job.max_salary.toLocaleString()}` : '';
    const range = min && max ? `${min} - ${max}` : (min || max);
    return `${range} / ${period.toLowerCase()}`;
  };

  /* ── Styles ── */
  const cardBg = 'rgba(255,255,255,0.82)';
  const cardBorder = '1px solid rgba(24,35,38,0.07)';
  const pillStyle = {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    padding: '5px 14px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 600,
    background: 'rgba(255,107,74,0.08)', color: '#d45a36', border: '1px solid rgba(255,107,74,0.15)',
    cursor: 'pointer', transition: 'all 0.15s ease',
  };
  const selectStyle = {
    padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(24,35,38,0.1)',
    background: '#fff', fontSize: '0.88rem', fontWeight: 500, color: 'var(--text)',
    cursor: 'pointer', outline: 'none', width: '100%',
  };
  const inputStyle = {
    padding: '12px 16px', borderRadius: '14px', border: '1px solid rgba(24,35,38,0.1)',
    background: '#fff', fontSize: '0.92rem', fontWeight: 500, color: 'var(--text)',
    outline: 'none', width: '100%', transition: 'border 0.2s',
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page" id="liveJobsPage">

        {/* ── Hero Banner ── */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,107,74,0.08), rgba(124,214,199,0.1))',
          padding: '36px 32px', borderRadius: '20px', marginBottom: '24px',
          border: '1px solid rgba(255,255,255,0.55)', backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
        }}>

          <h1 style={{ margin: '0 0 10px', fontFamily: '"Sora", sans-serif', fontSize: 'clamp(1.6rem,3.5vw,2.4rem)' }}>
            Find Jobs by Skills & Filters
          </h1>
          <p style={{ marginBottom: 0, color: 'var(--muted)', lineHeight: 1.7, maxWidth: '60ch' }}>
            Search for your dream job. Upload your resume to auto-extract skills, or search manually with advanced filters.
          </p>
        </div>

        {/* ── Main 2-Column Layout ── */}
        <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          
          {/* Left Sidebar (Filters & Search) */}
          <aside style={{ width: '320px', flexShrink: 0, position: 'sticky', top: '80px' }}>
            <section style={{
              background: cardBg, borderRadius: '20px', border: cardBorder,
              padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}>
              <form onSubmit={handleSearch}>
                {/* Search Bar */}
                <div style={{ position: 'relative', marginBottom: '14px', display: 'flex', alignItems: 'center' }}>
                  <Search 
                    style={{ 
                      position: 'absolute', 
                      left: '14px', 
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#94a3b8', 
                      width: '18px', 
                      height: '18px', 
                      pointerEvents: 'none' 
                    }} 
                  />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search jobs..."
                    style={{ 
                      ...inputStyle, 
                      paddingLeft: '42px', 
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      lineHeight: 'normal'
                    }}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    height: '48px', width: '100%', borderRadius: '12px', marginBottom: '20px',
                    background: 'linear-gradient(135deg, #ff6b4a, #ff8f57)', color: '#fff',
                    border: 'none', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
                    transition: 'all 0.2s', opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? '⏳ Searching...' : 'Search Jobs'}
                </button>

                {/* Filters */}
                <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '14px', color: 'var(--text)' }}>Filters</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '6px', display: 'block' }}>Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. New York, India"
                      style={selectStyle}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '6px', display: 'block' }}>Employment Type</label>
                    <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} style={selectStyle}>
                      {EMPLOYMENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '6px', display: 'block' }}>Date Posted</label>
                    <select value={datePosted} onChange={(e) => setDatePosted(e.target.value)} style={selectStyle}>
                      {DATE_POSTED_OPTIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                    </select>
                  </div>
                  <label style={{
                    display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px',
                    padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(24,35,38,0.1)',
                    background: remoteOnly ? 'rgba(124,214,199,0.12)' : '#fff',
                    cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem',
                    transition: 'all 0.2s',
                  }}>
                    <input
                      type="checkbox"
                      checked={remoteOnly}
                      onChange={(e) => setRemoteOnly(e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: '#ff6b4a' }}
                    />
                    Remote Only
                  </label>
                </div>
              </form>

              {/* Resume Upload / Extract */}
              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(24,35,38,0.06)' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '10px' }}>
                  Auto-Extract Skills
                </span>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    padding: '10px 0', width: '100%', borderRadius: '10px', border: '1px dashed rgba(255,107,74,0.4)',
                    background: 'rgba(255,107,74,0.04)', fontWeight: 600, fontSize: '0.84rem', cursor: 'pointer',
                    color: '#d45a36', transition: 'all 0.2s', marginBottom: '10px',
                  }}
                >
                  📄 {file ? file.name : 'Upload Resume'}
                </button>
                {file && (
                  <button
                    type="button"
                    onClick={handleExtractSkills}
                    disabled={loading}
                    style={{
                      padding: '10px 0', width: '100%', borderRadius: '10px',
                      background: 'rgba(124,214,199,0.15)', color: '#2a7a6f',
                      border: '1px solid rgba(124,214,199,0.3)', fontWeight: 700, fontSize: '0.84rem', cursor: 'pointer',
                      opacity: loading ? 0.7 : 1, marginBottom: '10px',
                    }}
                  >
                    ✨ Extract & Search
                  </button>
                )}
                
                {/* Skill tags */}
                {skillTags.length > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                      {skillTags.map((skill, idx) => (
                        <span key={idx} style={pillStyle} onClick={() => removeSkill(skill)} title="Click to remove">
                          {skill} <span style={{ opacity: 0.5, fontSize: '0.7rem' }}>✕</span>
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        placeholder="Add skill..."
                        style={{ flex: 1, padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(24,35,38,0.1)', fontSize: '0.82rem', outline: 'none' }}
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        style={{ padding: '0 12px', borderRadius: '8px', background: 'rgba(255,107,74,0.1)', border: 'none', fontSize: '1rem', fontWeight: 700, color: '#d45a36', cursor: 'pointer' }}
                      >+</button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </aside>

          {/* Right Column (Job Results) */}
          <div style={{ flex: 1, minWidth: '320px' }}>
            
            {/* Status */}
            {status.visible && (
              <div className={`status ${status.type}`} style={{
                display: 'block', marginBottom: '18px', padding: '14px 20px',
                borderRadius: '14px', fontWeight: 600,
                background: status.type === 'error' ? 'rgba(220,53,69,0.08)' : 'rgba(255,107,74,0.06)',
                color: status.type === 'error' ? '#dc3545' : 'var(--text)',
                border: `1px solid ${status.type === 'error' ? 'rgba(220,53,69,0.15)' : 'rgba(255,107,74,0.12)'}`,
              }}>
                {status.text}
              </div>
            )}

            {/* Results info */}
            {searched && (
              <div style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)' }}>
                  <strong style={{ color: 'var(--text)' }}>{jobsList.length}</strong> jobs found
                  {queryUsed && <> for "<strong style={{ color: '#d45a36' }}>{queryUsed}</strong>"</>}
                  {' '} • Page {page}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {page > 1 && (
                    <button
                      onClick={() => handleSearch(null, page - 1)}
                      style={{
                        padding: '8px 18px', borderRadius: '10px', border: '1px solid rgba(24,35,38,0.1)',
                        background: '#fff', fontWeight: 600, fontSize: '0.84rem', cursor: 'pointer',
                      }}
                    >
                      ← Previous
                    </button>
                  )}
                  {jobsList.length >= 12 && (
                    <button
                      onClick={() => handleSearch(null, page + 1)}
                      style={{
                        padding: '8px 18px', borderRadius: '10px',
                        background: 'linear-gradient(135deg, #ff6b4a, #ff8f57)', color: '#fff',
                        border: 'none', fontWeight: 600, fontSize: '0.84rem', cursor: 'pointer',
                      }}
                    >
                      Next →
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Empty State */}
            {!searched && !loading && (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)', background: 'rgba(255,255,255,0.4)', borderRadius: '20px', border: '1px dashed rgba(24,35,38,0.1)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '14px', opacity: 0.5 }}>💼</div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text)', margin: '0 0 8px' }}>Ready to find your next role?</h3>
                <p style={{ margin: 0 }}>Use the filters on the left to start searching.</p>
              </div>
            )}

            {/* Job Results Grid */}
            {searched && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px', marginBottom: '28px' }}>
                {jobsList.length > 0 ? (
                  jobsList.map((job, idx) => (
                    <article key={idx} style={{
                      background: cardBg, borderRadius: '18px', border: cardBorder,
                      padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                      transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default',
                      display: 'flex', flexDirection: 'column', gap: '12px',
                    }}>
                      {/* Header */}
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        {job.company_logo ? (
                          <img
                            src={job.company_logo}
                            alt={job.company}
                            style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'contain', background: '#f8f8fa', padding: '4px', border: '1px solid rgba(0,0,0,0.05)' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(255,107,74,0.15), rgba(124,214,199,0.15))', display: 'grid', placeItems: 'center', fontSize: '1.2rem', fontWeight: 800, color: '#d45a36', flexShrink: 0 }}>
                            {(job.company || '?')[0].toUpperCase()}
                          </div>
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h3 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                            {job.title}
                          </h3>
                          <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--muted)', fontWeight: 500 }}>
                            {job.company}
                          </p>
                        </div>
                      </div>

                      {/* Meta tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {job.location && (
                          <span style={{ padding: '4px 10px', borderRadius: '8px', background: 'rgba(24,35,38,0.04)', fontSize: '0.76rem', fontWeight: 600, color: 'var(--muted)' }}>
                            📍 {job.location}
                          </span>
                        )}
                        {job.employment_type && (
                          <span style={{ padding: '4px 10px', borderRadius: '8px', background: 'rgba(124,214,199,0.1)', fontSize: '0.76rem', fontWeight: 600, color: '#2a7a6f' }}>
                            {job.employment_type}
                          </span>
                        )}
                        {job.is_remote && (
                          <span style={{ padding: '4px 10px', borderRadius: '8px', background: 'rgba(59,130,246,0.08)', fontSize: '0.76rem', fontWeight: 600, color: '#2563eb' }}>
                            🏠 Remote
                          </span>
                        )}
                        {job.date_posted && formatDate(job.date_posted) !== '' && (
                          <span style={{ padding: '4px 10px', borderRadius: '8px', background: 'rgba(24,35,38,0.04)', fontSize: '0.76rem', fontWeight: 600, color: 'var(--muted)' }}>
                            🕐 {formatDate(job.date_posted)}
                          </span>
                        )}
                      </div>

                      {/* Salary */}
                      {formatSalary(job) && (
                        <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 700, color: '#16a34a' }}>
                          💰 {formatSalary(job)}
                        </p>
                      )}

                      {job.description && (
                        <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                          {stripHtml(job.description)}
                        </p>
                      )}

                      {/* Required skills */}
                      {job.required_skills && job.required_skills.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                          {job.required_skills.slice(0, 6).map((skill, i) => (
                            <span key={i} style={{ padding: '3px 10px', borderRadius: '999px', background: 'rgba(255,107,74,0.07)', fontSize: '0.72rem', fontWeight: 600, color: '#d45a36' }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Apply button */}
                      <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                        {job.apply_link ? (
                          <a
                            href={job.apply_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '6px',
                              padding: '10px 22px', borderRadius: '12px',
                              background: 'linear-gradient(135deg, #ff6b4a, #ff8f57)', color: '#fff',
                              fontWeight: 700, fontSize: '0.84rem', textDecoration: 'none',
                              transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(255,107,74,0.15)',
                            }}
                          >
                            Apply Now →
                          </a>
                        ) : (
                          <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Apply link unavailable</span>
                        )}
                      </div>
                    </article>
                  ))
                ) : (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 20px', color: 'var(--muted)' }}>
                    <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>No jobs found for this query.</p>
                    <p>Try adjusting your search terms or filters.</p>
                  </div>
                )}
              </div>
            )}

            {/* Bottom pagination */}
            {searched && jobsList.length >= 10 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '32px' }}>
                {page > 1 && (
                  <button
                    onClick={() => handleSearch(null, page - 1)}
                    style={{ padding: '10px 24px', borderRadius: '12px', border: '1px solid rgba(24,35,38,0.1)', background: '#fff', fontWeight: 600, cursor: 'pointer' }}
                  >
                    ← Previous Page
                  </button>
                )}
                <button
                  onClick={() => handleSearch(null, page + 1)}
                  style={{ padding: '10px 24px', borderRadius: '12px', background: 'linear-gradient(135deg, #ff6b4a, #ff8f57)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,107,74,0.15)' }}
                >
                  Next Page →
                </button>
              </div>
            )}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
