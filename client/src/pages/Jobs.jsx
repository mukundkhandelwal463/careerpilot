import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import LoadingOverlay from '../Components/LoadingOverlay.jsx';
import {
  Search,
  MapPin,
  Briefcase,
  Calendar,
  Upload,
  FileText,
  Sparkles,
  X,
  Home,
  Clock,
  DollarSign,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Filter,
  Building2,
  Zap,
  Tag,
  Award,
  GraduationCap
} from 'lucide-react';
import '../css/style.css';

const EMPLOYMENT_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'FULLTIME', label: 'Full-time' },
  { value: 'PARTTIME', label: 'Part-time' },
  { value: 'CONTRACTOR', label: 'Contract' },
  { value: 'INTERN', label: 'Internship' },
];

const EXPERIENCE_OPTIONS = [
  { value: '', label: 'All Experience Levels' },
  { value: 'fresher', label: 'Fresher / Entry Level (0-1 yr)' },
  { value: '1-3', label: 'Junior (1-3 yrs)' },
  { value: '3-5', label: 'Mid-Level (3-5 yrs)' },
  { value: '5+', label: 'Senior (5+ yrs)' },
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

const TRENDING_TRACKS = [
  { name: 'Full Stack Developer', tag: 'React, Node, Cloud', count: '1,200+ roles' },
  { name: 'Frontend Engineer', tag: 'React, TypeScript, CSS', count: '850+ roles' },
  { name: 'Backend Engineer', tag: 'Python, Java, APIs', count: '980+ roles' },
  { name: 'Data Scientist & AI', tag: 'Python, ML, PyTorch', count: '740+ roles' },
  { name: 'DevOps & Cloud', tag: 'AWS, Docker, K8s', count: '620+ roles' },
  { name: 'Product Manager', tag: 'Agile, Roadmap, KPI', count: '410+ roles' }
];

const POPULAR_SKILLS = [
  'React', 'Python', 'TypeScript', 'AWS', 'Node.js', 'Docker',
  'PostgreSQL', 'Kubernetes', 'Java', 'Next.js', 'GraphQL', 'Tailwind CSS'
];

const FEATURED_JOBS = [
  {
    title: 'Senior Full Stack Engineer',
    company: 'Stripe',
    company_initial: 'S',
    location: 'Remote · US / Global',
    employment_type: 'Full-time',
    is_remote: true,
    salary: '$145,000 - $190,000 / year',
    description: 'Design and architect scalable financial infrastructure services. Build seamless web applications using React, TypeScript, Node.js, and distributed backend systems.',
    required_skills: ['React', 'TypeScript', 'Node.js', 'Distributed Systems', 'AWS'],
    date_posted: '2 days ago',
    query_target: 'Full Stack Engineer'
  },
  {
    title: 'Machine Learning Platform Engineer',
    company: 'Datadog',
    company_initial: 'D',
    location: 'New York, NY / Hybrid',
    employment_type: 'Full-time',
    is_remote: false,
    salary: '$155,000 - $210,000 / year',
    description: 'Scale our next-gen ML training and inference pipelines. Build model monitoring systems, automated evaluation workflows, and high-throughput data processors in Python and Go.',
    required_skills: ['Python', 'PyTorch', 'Kubernetes', 'Docker', 'MLOps'],
    date_posted: '1 day ago',
    query_target: 'Machine Learning Engineer'
  },
  {
    title: 'Cloud DevOps & Infrastructure Architect',
    company: 'Vercel',
    company_initial: 'V',
    location: 'Remote',
    employment_type: 'Full-time',
    is_remote: true,
    salary: '$140,000 - $185,000 / year',
    description: 'Ensure 99.99% reliability across edge compute nodes and automated CI/CD deployment pipelines. Manage container orchestration on AWS and multi-region routing.',
    required_skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux'],
    date_posted: '3 days ago',
    query_target: 'DevOps Engineer'
  },
  {
    title: 'Frontend Systems Engineer',
    company: 'Linear',
    company_initial: 'L',
    location: 'San Francisco, CA / Remote',
    employment_type: 'Full-time',
    is_remote: true,
    salary: '$135,000 - $175,000 / year',
    description: 'Craft ultra-responsive, high-fidelity UI systems and client-side synchronization engines. Optimize web performance, interaction latency, and state architecture.',
    required_skills: ['React', 'TypeScript', 'Tailwind CSS', 'State Management'],
    date_posted: 'Today',
    query_target: 'Frontend Engineer'
  },
  {
    title: 'Backend Microservices Engineer',
    company: 'Shopify',
    company_initial: 'S',
    location: 'Remote · Americas',
    employment_type: 'Full-time',
    is_remote: true,
    salary: '$130,000 - $170,000 / year',
    description: 'Build fault-tolerant payment and catalog microservices processing millions of requests per second. Optimize database query performance and asynchronous queues.',
    required_skills: ['Java', 'Python', 'Kafka', 'PostgreSQL', 'Microservices'],
    date_posted: '4 days ago',
    query_target: 'Backend Engineer'
  },
  {
    title: 'AI Product Application Engineer',
    company: 'Perplexity',
    company_initial: 'P',
    location: 'San Francisco, CA / Hybrid',
    employment_type: 'Full-time',
    is_remote: true,
    salary: '$150,000 - $215,000 / year',
    description: 'Integrate state-of-the-art LLMs and retrieval mechanisms into high-impact user experiences. Build low-latency streaming APIs and evaluate model quality.',
    required_skills: ['Python', 'React', 'FastAPI', 'Vector Databases'],
    date_posted: 'Yesterday',
    query_target: 'AI Engineer'
  }
];

const Jobs = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
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

  const executeSearch = async (searchQueryText, pageOverride = 1, expOverride = experienceLevel) => {
    const q = searchQueryText || query.trim() || (skillTags.length > 0 ? skillTags.slice(0, 8).join(", ") : '');

    if (!q) {
      setStatus({ text: "Please enter a search query, select a category, or upload a resume.", type: "error", visible: true });
      return;
    }

    setQuery(q);
    const currentPage = pageOverride || 1;
    setLoading(true);
    const sourceLabel = JOB_SOURCE_OPTIONS.find(option => option.value === jobSource)?.label || 'jobs';
    setStatus({ text: `Searching ${sourceLabel} for "${q}"...`, type: "info", visible: true });
    
    if (currentPage === 1) {
      setJobsList([]);
      setSearched(false);
      setPage(1);
      setResultSource('');
    }

    const formData = new FormData();
    formData.append("query", q);
    formData.append("location", location);
    formData.append("employment_type", employmentType);
    formData.append("experience_level", expOverride);
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
      setQueryUsed(data.query_used || q);
      setResultSource(data.source || '');
      setPage(currentPage);
      setStatus({ text: '', type: '', visible: false });
    } catch (err) {
      setStatus({ text: err.message, type: "error", visible: true });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e, pageOverride) => {
    if (e) e.preventDefault();
    executeSearch(query, pageOverride, experienceLevel);
  };

  const handleTrackClick = (trackName) => {
    executeSearch(trackName, 1, experienceLevel);
  };

  const handlePopularSkillClick = (skill) => {
    if (!skillTags.includes(skill)) {
      const updated = [...skillTags, skill];
      setSkillTags(updated);
      executeSearch(updated.join(", "), 1, experienceLevel);
    } else {
      executeSearch(skill, 1, experienceLevel);
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
  const cardBg = 'rgba(255,255,255,0.85)';
  const cardBorder = '1px solid rgba(24,35,38,0.08)';
  const pillStyle = {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    padding: '4px 12px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600,
    background: 'rgba(201,100,66,0.08)', color: 'var(--accent)', border: '1px solid rgba(201,100,66,0.2)',
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
      <LoadingOverlay
        isOpen={loading}
        variant="jobs"
        title="Finding Best Job Matches"
        subtitle={status.text || 'Scanning live listings across LinkedIn, Indeed & Google Jobs'}
        steps={[
          'Querying live job boards & recruiter feeds...',
          'Matching roles to your skills & preferences...',
          'Sorting & ranking top opportunities...'
        ]}
      />
      <Navbar />
      <main 
        className="page" 
        id="liveJobsPage"
        style={{
          width: '100%',
          maxWidth: '1600px',
          margin: '20px auto 48px',
          padding: '0 20px',
          boxSizing: 'border-box'
        }}
      >

        {/* ── Hero Banner ── */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(201,100,66,0.06), rgba(94,163,151,0.08))',
          padding: '30px 32px', borderRadius: '20px', marginBottom: '24px',
          border: '1px solid rgba(24,35,38,0.07)', backdropFilter: 'blur(12px)',
          boxShadow: 'var(--shadow)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px'
        }}>
          <div>
            <h1 style={{ margin: '0 0 8px', fontFamily: '"Sora", sans-serif', fontSize: 'clamp(1.6rem,3.2vw,2.3rem)', color: 'var(--text)', letterSpacing: '-0.02em' }}>
              Find Jobs by Skills & Filters
            </h1>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.5, maxWidth: '65ch', fontSize: '0.96rem' }}>
              Search for your dream job. Filter by experience (Fresher to Senior), upload your resume to auto-extract skills, or explore live verified postings.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 12px', borderRadius: '999px', background: '#fff',
              border: '1px solid rgba(24,35,38,0.08)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text)'
            }}>
              <CheckCircle2 size={14} color="var(--teal)" /> Verified Live Postings
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 12px', borderRadius: '999px', background: '#fff',
              border: '1px solid rgba(24,35,38,0.08)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text)'
            }}>
              <Zap size={14} color="var(--accent)" /> 1-Click Skill Matching
            </span>
          </div>
        </div>

        {/* ── Main 2-Column Layout ── */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          
          {/* Left Sidebar (Filters & Search) */}
          <aside style={{ width: '310px', flexShrink: 0, position: 'sticky', top: '80px' }}>
            <section style={{
              background: cardBg, borderRadius: '20px', border: cardBorder,
              padding: '22px', boxShadow: 'var(--shadow)',
            }}>
              <form onSubmit={handleSearch}>
                {/* Search Bar */}
                <div style={{ position: 'relative', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
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
                    placeholder="Search roles, skills, companies..."
                    style={{ 
                      ...inputStyle, 
                      paddingLeft: '40px', 
                      height: '46px',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    height: '46px', width: '100%', borderRadius: '12px', marginBottom: '18px',
                    background: 'var(--accent)', color: '#fff',
                    border: 'none', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
                    transition: 'all 0.15s ease', opacity: loading ? 0.7 : 1,
                    boxShadow: '0 4px 12px rgba(201,100,66,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                  }}
                >
                  <Search size={16} />
                  <span>{loading ? 'Searching...' : 'Search Jobs'}</span>
                </button>

                {/* Filters */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '0.94rem', fontWeight: 700, margin: 0, color: 'var(--text)' }}>Filters</h3>
                  {(searched || location || employmentType || experienceLevel || remoteOnly) && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('');
                        setLocation('');
                        setEmploymentType('');
                        setExperienceLevel('');
                        setDatePosted('all');
                        setRemoteOnly(false);
                        setSearched(false);
                        setJobsList([]);
                      }}
                      style={{ border: 'none', background: 'transparent', fontSize: '0.74rem', color: 'var(--accent)', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '5px', display: 'block' }}>Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. New York, London, Remote"
                      style={selectStyle}
                    />
                  </div>

                  {/* Experience Level Filter (Requested by user) */}
                  <div>
                    <label style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '5px', display: 'block' }}>
                      Experience Level
                    </label>
                    <select 
                      value={experienceLevel} 
                      onChange={(e) => setExperienceLevel(e.target.value)} 
                      style={selectStyle}
                    >
                      {EXPERIENCE_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '5px', display: 'block' }}>Employment Type</label>
                    <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} style={selectStyle}>
                      {EMPLOYMENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '5px', display: 'block' }}>Date Posted</label>
                    <select value={datePosted} onChange={(e) => setDatePosted(e.target.value)} style={selectStyle}>
                      {DATE_POSTED_OPTIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                    </select>
                  </div>

                  <label style={{
                    display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px',
                    padding: '9px 12px', borderRadius: '10px', border: '1px solid rgba(24,35,38,0.1)',
                    background: remoteOnly ? 'rgba(94,163,151,0.12)' : '#fff',
                    cursor: 'pointer', fontWeight: 600, fontSize: '0.84rem',
                    transition: 'all 0.15s ease',
                  }}>
                    <input
                      type="checkbox"
                      checked={remoteOnly}
                      onChange={(e) => setRemoteOnly(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }}
                    />
                    Remote Opportunities Only
                  </label>
                </div>
              </form>

              {/* Resume Upload / Extract */}
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(24,35,38,0.06)' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>
                  Auto-Match From Resume
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
                    padding: '9px 0', width: '100%', borderRadius: '10px', border: '1px dashed rgba(201,100,66,0.4)',
                    background: 'rgba(201,100,66,0.04)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
                    color: 'var(--accent)', transition: 'all 0.15s ease', marginBottom: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                  }}
                >
                  <FileText size={14} /> {file ? file.name : 'Upload Resume to Auto-Filter'}
                </button>
                {file && (
                  <button
                    type="button"
                    onClick={handleExtractSkills}
                    disabled={loading}
                    style={{
                      padding: '9px 0', width: '100%', borderRadius: '10px',
                      background: 'rgba(94,163,151,0.15)', color: 'var(--teal)',
                      border: '1px solid rgba(94,163,151,0.3)', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                      opacity: loading ? 0.7 : 1, marginBottom: '8px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                    }}
                  >
                    <Sparkles size={14} /> Extract Skills & Search
                  </button>
                )}
                
                {/* Skill tags */}
                {skillTags.length > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '8px' }}>
                      {skillTags.map((skill, idx) => (
                        <span key={idx} style={pillStyle} onClick={() => removeSkill(skill)} title="Click to remove">
                          {skill} <X size={11} style={{ opacity: 0.6 }} />
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
                        style={{ flex: 1, padding: '6px 10px', borderRadius: '8px', border: '1px solid rgba(24,35,38,0.1)', fontSize: '0.8rem', outline: 'none' }}
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        style={{ padding: '0 10px', borderRadius: '8px', background: 'rgba(201,100,66,0.1)', border: 'none', fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent)', cursor: 'pointer' }}
                      >+</button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </aside>

          {/* Right Column (Job Results / Discovery State) */}
          <div style={{ flex: 1, minWidth: '320px' }}>
            
            {/* Status */}
            {status.visible && (
              <div className={`status ${status.type}`} style={{
                display: 'block', marginBottom: '16px', padding: '12px 18px',
                borderRadius: '12px', fontWeight: 600, fontSize: '0.88rem',
                background: status.type === 'error' ? 'rgba(220,53,69,0.08)' : 'rgba(201,100,66,0.06)',
                color: status.type === 'error' ? '#dc3545' : 'var(--text)',
                border: `1px solid ${status.type === 'error' ? 'rgba(220,53,69,0.15)' : 'rgba(201,100,66,0.15)'}`,
              }}>
                {status.text}
              </div>
            )}

            {/* Results Header (When searched) */}
            {searched && (
              <div style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--muted)' }}>
                  <strong style={{ color: 'var(--text)' }}>{jobsList.length}</strong> jobs found
                  {queryUsed && <> for "<strong style={{ color: 'var(--accent)' }}>{queryUsed}</strong>"</>}
                  {experienceLevel && <> • Level: <strong style={{ color: 'var(--text)' }}>{EXPERIENCE_OPTIONS.find(o => o.value === experienceLevel)?.label}</strong></>}
                  {' '} • Page {page}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {page > 1 && (
                    <button
                      onClick={() => handleSearch(null, page - 1)}
                      style={{
                        padding: '7px 16px', borderRadius: '10px', border: '1px solid rgba(24,35,38,0.12)',
                        background: '#fff', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
                      }}
                    >
                      ← Previous
                    </button>
                  )}
                  {jobsList.length >= 10 && (
                    <button
                      onClick={() => handleSearch(null, page + 1)}
                      style={{
                        padding: '7px 16px', borderRadius: '10px',
                        background: 'var(--accent)', color: '#fff',
                        border: 'none', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                      }}
                    >
                      Next Page →
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ── RICH DISCOVERY STATE (When Not Searched & Not Loading) ── */}
            {!searched && !loading && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* 1. Trending Career Tracks (1-Click Instant Search) */}
                <div style={{
                  background: cardBg,
                  borderRadius: '20px',
                  border: cardBorder,
                  padding: '24px 26px',
                  boxShadow: 'var(--shadow)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '2px' }}>
                        <TrendingUp size={16} color="var(--accent)" />
                        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--text)' }}>
                          Explore Trending Career Tracks
                        </h2>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                        Select any in-demand domain to immediately discover verified active postings
                      </span>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                    gap: '10px'
                  }}>
                    {TRENDING_TRACKS.map((track, i) => (
                      <div
                        key={i}
                        onClick={() => handleTrackClick(track.name)}
                        style={{
                          background: '#faf9f5',
                          border: '1px solid rgba(24,35,38,0.08)',
                          borderRadius: '14px',
                          padding: '12px 14px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '6px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(201,100,66,0.35)';
                          e.currentTarget.style.background = '#ffffff';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(24,35,38,0.08)';
                          e.currentTarget.style.background = '#faf9f5';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <strong style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.3 }}>
                            {track.name}
                          </strong>
                          <ArrowRight size={14} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--muted)' }}>
                          <span>{track.tag}</span>
                          <span style={{ fontWeight: 600, color: 'var(--teal)' }}>{track.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Interactive Experience Level Quick Filter (Requested by user) */}
                <div style={{
                  background: cardBg,
                  borderRadius: '16px',
                  border: cardBorder,
                  padding: '14px 20px',
                  boxShadow: 'var(--shadow)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text)', flexShrink: 0 }}>
                    <GraduationCap size={16} color="var(--accent)" />
                    <strong style={{ fontSize: '0.84rem' }}>Filter by Experience:</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {EXPERIENCE_OPTIONS.map((opt, i) => {
                      const isSelected = experienceLevel === opt.value;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            const nextExp = isSelected && opt.value !== '' ? '' : opt.value;
                            setExperienceLevel(nextExp);
                            executeSearch(query || 'Software Developer', 1, nextExp);
                          }}
                          style={{
                            padding: '5px 12px',
                            borderRadius: '999px',
                            border: '1px solid',
                            borderColor: isSelected ? 'var(--accent)' : 'rgba(24,35,38,0.12)',
                            background: isSelected ? 'var(--accent)' : '#ffffff',
                            color: isSelected ? '#ffffff' : 'var(--text)',
                            fontSize: '0.76rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Popular Tech Skills Filter Cloud */}
                <div style={{
                  background: cardBg,
                  borderRadius: '18px',
                  border: cardBorder,
                  padding: '16px 20px',
                  boxShadow: 'var(--shadow)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text)', flexShrink: 0 }}>
                    <Tag size={15} color="var(--accent)" />
                    <strong style={{ fontSize: '0.84rem' }}>Popular Skills:</strong>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', flex: 1 }}>
                    {POPULAR_SKILLS.map((skill, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handlePopularSkillClick(skill)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '8px',
                          border: '1px solid rgba(24,35,38,0.1)',
                          background: '#ffffff',
                          color: 'var(--text)',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent)';
                          e.currentTarget.style.color = 'var(--accent)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(24,35,38,0.1)';
                          e.currentTarget.style.color = 'var(--text)';
                        }}
                      >
                        + {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Featured Verified Opportunities Grid */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 4px' }}>
                    <div>
                      <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--text)' }}>
                        Featured Live Opportunities
                      </h2>
                      <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                        Top tech companies actively hiring remote & onsite engineers
                      </span>
                    </div>
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: 'var(--teal)',
                      background: 'rgba(94,163,151,0.12)',
                      padding: '3px 10px',
                      borderRadius: '999px'
                    }}>
                      Actively Hiring
                    </span>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '16px'
                  }}>
                    {FEATURED_JOBS.map((job, idx) => (
                      <article key={idx} style={{
                        background: cardBg,
                        borderRadius: '18px',
                        border: cardBorder,
                        padding: '20px',
                        boxShadow: 'var(--shadow)',
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                      }}>
                        {/* Header */}
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '10px',
                            background: 'rgba(201,100,66,0.1)',
                            display: 'grid',
                            placeItems: 'center',
                            fontSize: '1.1rem',
                            fontWeight: 800,
                            color: 'var(--accent)',
                            flexShrink: 0
                          }}>
                            {job.company_initial}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h3 style={{ margin: '0 0 2px', fontSize: '0.94rem', fontWeight: 700, lineHeight: 1.3, color: 'var(--text)' }}>
                              {job.title}
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 500 }}>
                              {job.company}
                            </p>
                          </div>
                        </div>

                        {/* Meta tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(24,35,38,0.04)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--muted)' }}>
                            <MapPin size={11} /> {job.location}
                          </span>
                          <span style={{ padding: '3px 8px', borderRadius: '6px', background: 'rgba(94,163,151,0.1)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--teal)' }}>
                            {job.employment_type}
                          </span>
                          {job.is_remote && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(59,130,246,0.08)', fontSize: '0.72rem', fontWeight: 600, color: '#2563eb' }}>
                              <Home size={11} /> Remote
                            </span>
                          )}
                        </div>

                        {/* Salary */}
                        <p style={{ margin: 0, fontSize: '0.84rem', fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <DollarSign size={13} /> {job.salary}
                        </p>

                        {/* Description */}
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                          {job.description}
                        </p>

                        {/* Skills */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: 'auto', paddingTop: '6px' }}>
                          {job.required_skills.map((skill, i) => (
                            <span key={i} style={{ padding: '2px 8px', borderRadius: '999px', background: 'rgba(201,100,66,0.08)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--accent)' }}>
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Search Role Button */}
                        <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(24,35,38,0.06)' }}>
                          <button
                            type="button"
                            onClick={() => executeSearch(job.query_target, 1, experienceLevel)}
                            style={{
                              width: '100%',
                              padding: '8px 14px',
                              borderRadius: '10px',
                              background: '#ffffff',
                              border: '1px solid rgba(201,100,66,0.3)',
                              color: 'var(--accent)',
                              fontWeight: 700,
                              fontSize: '0.8rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'var(--accent)';
                              e.currentTarget.style.color = '#ffffff';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#ffffff';
                              e.currentTarget.style.color = 'var(--accent)';
                            }}
                          >
                            <span>Browse Similar Openings</span>
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ── SEARCHED JOB RESULTS GRID ── */}
            {searched && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                {jobsList.length > 0 ? (
                  jobsList.map((job, idx) => (
                    <article key={idx} style={{
                      background: cardBg, borderRadius: '18px', border: cardBorder,
                      padding: '22px', boxShadow: 'var(--shadow)',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease', cursor: 'default',
                      display: 'flex', flexDirection: 'column', gap: '10px',
                    }}>
                      {/* Header */}
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        {job.company_logo ? (
                          <img
                            src={job.company_logo}
                            alt={job.company}
                            style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'contain', background: '#f8f8fa', padding: '4px', border: '1px solid rgba(0,0,0,0.05)' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(201,100,66,0.12)', display: 'grid', placeItems: 'center', fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent)', flexShrink: 0 }}>
                            {(job.company || '?')[0].toUpperCase()}
                          </div>
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h3 style={{ margin: '0 0 3px', fontSize: '0.96rem', fontWeight: 700, lineHeight: 1.3, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                            {job.title}
                          </h3>
                          <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', fontWeight: 500 }}>
                            {job.company}
                          </p>
                        </div>
                      </div>

                      {/* Meta tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {job.location && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(24,35,38,0.04)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--muted)' }}>
                            <MapPin size={11} /> {job.location}
                          </span>
                        )}
                        {job.employment_type && (
                          <span style={{ padding: '3px 8px', borderRadius: '6px', background: 'rgba(94,163,151,0.1)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--teal)' }}>
                            {job.employment_type}
                          </span>
                        )}
                        {job.is_remote && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(59,130,246,0.08)', fontSize: '0.72rem', fontWeight: 600, color: '#2563eb' }}>
                            <Home size={11} /> Remote
                          </span>
                        )}
                        {job.date_posted && formatDate(job.date_posted) !== '' && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(24,35,38,0.04)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--muted)' }}>
                            <Clock size={11} /> {formatDate(job.date_posted)}
                          </span>
                        )}
                      </div>

                      {/* Salary */}
                      {formatSalary(job) && (
                        <p style={{ margin: 0, fontSize: '0.84rem', fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <DollarSign size={13} /> {formatSalary(job)}
                        </p>
                      )}

                      {job.description && (
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                          {stripHtml(job.description)}
                        </p>
                      )}

                      {/* Required skills */}
                      {job.required_skills && job.required_skills.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {job.required_skills.slice(0, 6).map((skill, i) => (
                            <span key={i} style={{ padding: '2px 8px', borderRadius: '999px', background: 'rgba(201,100,66,0.08)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--accent)' }}>
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
                              padding: '9px 20px', borderRadius: '10px',
                              background: 'var(--accent)', color: '#fff',
                              fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none',
                              transition: 'all 0.15s ease', boxShadow: '0 4px 12px rgba(201,100,66,0.25)',
                            }}
                          >
                            <span>Apply Now</span>
                            <ArrowRight size={14} />
                          </a>
                        ) : (
                          <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Apply link unavailable</span>
                        )}
                      </div>
                    </article>
                  ))
                ) : (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 20px', color: 'var(--muted)', background: cardBg, borderRadius: '18px', border: cardBorder }}>
                    <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>No direct listings found for this query.</p>
                    <p style={{ margin: '0 0 16px', fontSize: '0.86rem' }}>Try broadening your search terms, adjusting experience level, or exploring a trending career track.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearched(false);
                        setJobsList([]);
                        setQuery('');
                      }}
                      style={{
                        padding: '9px 20px',
                        borderRadius: '10px',
                        background: 'var(--surface-dark)',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Back to Career Discovery
                    </button>
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
                    style={{ padding: '9px 20px', borderRadius: '10px', border: '1px solid rgba(24,35,38,0.12)', background: '#fff', fontWeight: 600, fontSize: '0.84rem', cursor: 'pointer' }}
                  >
                    ← Previous Page
                  </button>
                )}
                <button
                  onClick={() => handleSearch(null, page + 1)}
                  style={{ padding: '9px 20px', borderRadius: '10px', background: 'var(--accent)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.84rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(201,100,66,0.25)' }}
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
