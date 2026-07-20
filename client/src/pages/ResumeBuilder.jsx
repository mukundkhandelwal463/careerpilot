import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import Loader from '../Components/Loader.jsx';
import ResumePreviewCard from '../Components/ResumePreviewCard.jsx';
import '../css/style.css';


const TEMPLATE_CONFIGS = {
  "classical.pdf": {
    headings: ["ABOUT ME", "EDUCATION", "WORK EXPERIENCE", "SKILLS"],
    previewType: "classical",
    fields: ["name", "headline", "email", "phone", "location", "summary", "education", "experience", "skills"],
    labels: { summary: "About Me" },
  },
  "resume for experienced.pdf": {
    headings: ["ABOUT ME", "EDUCATION", "WORK EXPERIENCE", "SKILLS"],
    previewType: "classical",
    fields: ["name", "headline", "email", "phone", "location", "summary", "education", "experience", "skills"],
    labels: { summary: "About Me" },
  },
  "freasher.pdf": {
    headings: ["ABOUT ME", "EDUCATION", "WORK EXPERIENCE", "CONTACT", "SKILLS", "LANGUAGES"],
    previewType: "freasher",
    fields: ["name", "headline", "email", "phone", "location", "website", "summary", "education", "experience", "skills", "side_skills", "languages"],
    labels: { summary: "About Me", side_skills: "Personal Skills" },
  },
  "resume for experienced2.pdf": {
    headings: ["SUMMARY", "WORK EXPERIENCE", "EDUCATION"],
    previewType: "experienced2",
    fields: ["name", "headline", "email", "phone", "location", "website", "summary", "experience", "education"],
    labels: { summary: "Summary", headline: "Role (Uppercase in template)" },
  },
};

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  // Helper to load unsaved draft from localStorage
  const getInitialValue = (fieldKey, defaultValue = '') => {
    const draft = localStorage.getItem(`resume_draft_${resumeId || 'new'}`);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (parsed[fieldKey] !== undefined) return parsed[fieldKey];
      } catch (e) {}
    }
    return defaultValue;
  };

  // Form Fields State
  const [template, setTemplate] = useState(() => getInitialValue('template', 'classical.pdf'));
  const [name, setName] = useState(() => getInitialValue('full_name', ''));
  const [headline, setHeadline] = useState(() => getInitialValue('headline', ''));
  const [email, setEmail] = useState(() => getInitialValue('email', ''));
  const [phone, setPhone] = useState(() => getInitialValue('phone', ''));
  const [location, setLocation] = useState(() => getInitialValue('location', ''));
  const [website, setWebsite] = useState(() => getInitialValue('website', ''));
  const [summary, setSummary] = useState(() => getInitialValue('summary', ''));
  const [skills, setSkills] = useState(() => getInitialValue('skills', ''));
  const [sideSkills, setSideSkills] = useState(() => getInitialValue('side_skills', ''));
  const [languages, setLanguages] = useState(() => getInitialValue('languages', ''));
  const [experience, setExperience] = useState(() => getInitialValue('experience', ''));
  const [education, setEducation] = useState(() => getInitialValue('education', ''));

  // Split personal info location & social states
  const [address, setAddress] = useState(() => getInitialValue('address', ''));
  const [city, setCity] = useState(() => getInitialValue('city', ''));
  const [stateField, setStateField] = useState(() => getInitialValue('state', ''));
  const [zipCode, setZipCode] = useState(() => getInitialValue('zip_code', ''));
  const [country, setCountry] = useState(() => getInitialValue('country', ''));
  const [linkedin, setLinkedin] = useState(() => getInitialValue('linkedin', ''));
  const [github, setGithub] = useState(() => getInitialValue('github', ''));

  // Active form section state
  const [activeSection, setActiveSection] = useState('personal');

  // UI Status
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ text: '', type: '' });
  const [geminiSuggestions, setGeminiSuggestions] = useState('');
  const [downloadLinks, setDownloadLinks] = useState(null);
  const [isAutofilling, setIsAutofilling] = useState(false);

  const handleAutofillUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsAutofilling(true);
    setStatus({ text: 'Extracting data from resume...', type: 'info' });

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await fetch('/api/parse-resume-to-json', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.data) {
        const pd = data.data;
        if (pd.full_name) setName(pd.full_name);
        if (pd.headline) setHeadline(pd.headline);
        if (pd.email) setEmail(pd.email);
        if (pd.phone) setPhone(pd.phone);
        if (pd.location) setLocation(pd.location);
        if (pd.summary) setSummary(pd.summary);
        if (pd.skills) setSkills(pd.skills);
        if (pd.experience) setExperience(pd.experience);
        if (pd.education) setEducation(pd.education);
        if (pd.address) setAddress(pd.address);
        if (pd.city) setCity(pd.city);
        if (pd.state) setStateField(pd.state);
        if (pd.zip_code) setZipCode(pd.zip_code);
        if (pd.country) setCountry(pd.country);
        if (pd.linkedin) setLinkedin(pd.linkedin);
        if (pd.github) setGithub(pd.github);
        if (pd.website) setWebsite(pd.website);
        
        setStatus({ text: 'Resume successfully extracted!', type: 'success' });
      } else {
        setStatus({ text: data.error || 'Failed to parse resume.', type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ text: 'Network error parsing resume.', type: 'error' });
    } finally {
      setIsAutofilling(false);
    }
  };


  useEffect(() => {
    const fetchResume = async () => {
      if (!resumeId || resumeId === 'default') {
        setLoading(false);
        return;
      }
      
      // If there is already a local unsaved draft, do not overwrite it with stale DB values on refresh
      if (localStorage.getItem(`resume_draft_${resumeId}`)) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/resumes/${resumeId}`);
        const data = await res.json();
        if (data.success && data.resume) {
          const r = data.resume;
          let parsedData = {};
          if (r.resume_json) {
            try {
              parsedData = JSON.parse(r.resume_json);
            } catch (e) { }
          }
          setTemplate(parsedData.template || 'classical.pdf');
          setName(parsedData.full_name || parsedData.name || '');
          setHeadline(parsedData.headline || '');
          setEmail(parsedData.email || '');
          setPhone(parsedData.phone || '');
          setLocation(parsedData.location || '');
          setWebsite(parsedData.website || '');
          setSummary(parsedData.summary || '');
          setSkills(parsedData.skills || '');
          setSideSkills(parsedData.side_skills || '');
          setLanguages(parsedData.languages || '');
          setExperience(parsedData.experience || '');
          setEducation(parsedData.education || '');

          setAddress(parsedData.address || '');
          setCity(parsedData.city || '');
          setStateField(parsedData.state || '');
          setZipCode(parsedData.zip_code || '');
          setCountry(parsedData.country || '');
          setLinkedin(parsedData.linkedin || '');
          setGithub(parsedData.github || '');

          if (parsedData.location && !parsedData.city) {
            const parts = parsedData.location.split(',').map(p => p.trim());
            if (parts.length >= 2) {
              setCity(parts[0]);
              setCountry(parts[parts.length - 1]);
            } else {
              setCity(parsedData.location);
            }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [resumeId]);

  // Auto-save form fields to local storage draft on any changes
  useEffect(() => {
    const draftData = {
      template,
      full_name: name,
      headline,
      email,
      phone,
      location,
      website,
      summary,
      skills,
      side_skills: sideSkills,
      languages,
      experience,
      education,
      address,
      city,
      state: stateField,
      zip_code: zipCode,
      country,
      linkedin,
      github
    };
    localStorage.setItem(`resume_draft_${resumeId || 'new'}`, JSON.stringify(draftData));
  }, [
    template, name, headline, email, phone, location, website, summary,
    skills, sideSkills, languages, experience, education,
    address, city, stateField, zipCode, country, linkedin, github, resumeId
  ]);

  const getLabel = (fieldKey, defaultText) => {
    const config = TEMPLATE_CONFIGS[template] || TEMPLATE_CONFIGS["classical.pdf"];
    return (config.labels && config.labels[fieldKey]) || defaultText;
  };

  const isFieldVisible = (fieldKey) => {
    const config = TEMPLATE_CONFIGS[template] || TEMPLATE_CONFIGS["classical.pdf"];
    return config.fields.includes(fieldKey);
  };

  const splitLines = (text) => {
    return String(text || "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  };

  const splitBlocks = (text) => {
    return String(text || "")
      .split(/\r?\n\s*\r?\n/)
      .map((block) => splitLines(block))
      .filter((lines) => lines.length > 0);
  };

  const parseCommaOrLineItems = (text) => {
    return String(text || "")
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const parseEntryBlocks = (rawText, defaultLabel) => {
    return splitBlocks(rawText).map((lines, index) => {
      if (lines.length === 1) {
        return {
          meta: `${defaultLabel} ${index + 1}`,
          title: lines[0],
          detailLines: [],
        };
      }
      if (lines.length === 2) {
        return {
          meta: lines[0],
          title: lines[1],
          detailLines: [],
        };
      }
      return {
        meta: lines[0],
        title: lines[1],
        detailLines: lines.slice(2),
      };
    });
  };

  // ── Premium Live Preview ──
  const renderUnifiedPreview = () => {
    const expBlocks = parseEntryBlocks(experience, 'Experience');
    const eduBlocks = parseEntryBlocks(education, 'Education');
    const skillList = parseCommaOrLineItems(skills);
    const sideSkillList = parseCommaOrLineItems(sideSkills);
    const langList = parseCommaOrLineItems(languages);
    const displayLocation = [city, stateField, country].filter(Boolean).join(', ') || location;

    const previewData = {
      name, headline, phone, email, displayLocation,
      linkedin, github, website, summary,
      expBlocks, eduBlocks, skillList, sideSkillList, langList,
      template,
    };

    return (
      <ResumePreviewCard
        data={previewData}
        onAddSkill={(kw) => setSkills(prev => prev ? prev + ', ' + kw : kw)}
      />
    );
  };

  // ── Legacy aliases (all point to unified renderer) ──
  const renderClassicalPreview = () => renderUnifiedPreview();
  const renderFreasherPreview = () => renderUnifiedPreview();
  const renderExperienced2Preview = () => renderUnifiedPreview();


  // ── ATS Analysis Panel ──
  const KEYWORD_BANK = {
    default: ['Leadership', 'Project Management', 'Communication', 'Problem Solving', 'Teamwork', 'Time Management', 'Critical Thinking'],
    data: ['SQL', 'Statistical Analysis', 'Machine Learning Algorithms', 'Data Modeling', 'ETL', 'Deep Learning (TensorFlow/PyTorch)', 'Experimentation/A/B Testing', 'Data Visualization', 'Python', 'R'],
    software: ['Agile', 'Scrum', 'REST APIs', 'Microservices', 'CI/CD', 'Docker', 'Kubernetes', 'System Design', 'Code Review'],
    web: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'REST APIs', 'Responsive Design', 'Performance Optimization', 'SEO', 'Testing'],
    finance: ['Financial Reporting', 'Auditing', 'Tax Compliance', 'Risk Assessment', 'Budgeting', 'Forecasting', 'GAAP', 'Excel'],
    marketing: ['SEO/SEM', 'Content Strategy', 'Social Media', 'Brand Management', 'Analytics', 'Email Campaigns', 'A/B Testing'],
    hr: ['Talent Acquisition', 'Onboarding', 'Performance Management', 'Employee Relations', 'HRIS', 'Compliance', 'Workforce Planning'],
  };

  const getATSCategory = (hl) => {
    const h = (hl || '').toLowerCase();
    if (h.includes('data') || h.includes('analyst') || h.includes('science') || h.includes('ml') || h.includes('ai')) return 'data';
    if (h.includes('software') || h.includes('engineer') || h.includes('backend') || h.includes('devops')) return 'software';
    if (h.includes('web') || h.includes('frontend') || h.includes('full stack') || h.includes('react')) return 'web';
    if (h.includes('finance') || h.includes('account') || h.includes('audit')) return 'finance';
    if (h.includes('market') || h.includes('brand') || h.includes('seo')) return 'marketing';
    if (h.includes('hr') || h.includes('human resource') || h.includes('recruit')) return 'hr';
    return 'default';
  };

  const computeATSPanel = () => {
    const extractedSkills = parseCommaOrLineItems(skills);
    const extractedSideSkills = parseCommaOrLineItems(sideSkills);
    const allSkillsLower = [...extractedSkills, ...extractedSideSkills].map(s => s.toLowerCase());
    const cat = getATSCategory(headline);
    const pool = [...(KEYWORD_BANK[cat] || []), ...KEYWORD_BANK.default];
    const missing = pool.filter(kw => !allSkillsLower.some(sk => sk.includes(kw.toLowerCase().split(' ')[0])));
    // Simple ATS score: % of pool keywords found
    const found = pool.length - missing.length;
    const atsScore = Math.round((found / pool.length) * 100);
    return { extractedSkills, atsScore, missing: missing.slice(0, 8), cat };
  };

  const renderATSPanel = () => {
    const { extractedSkills, atsScore, missing, cat } = computeATSPanel();
    const catLabel = cat === 'default' ? 'General' : cat.charAt(0).toUpperCase() + cat.slice(1);
    const scoreColor = atsScore >= 75 ? '#16a34a' : atsScore >= 50 ? '#d97706' : '#dc2626';

    return (
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Extracted Info */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.8px' }}>📋 Extracted from Resume</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            <div>
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Name</span>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#1e293b', fontWeight: 700 }}>{name || <em style={{ color: '#94a3b8' }}>Not entered</em>}</p>
            </div>
            <div>
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Role</span>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#1e293b', fontWeight: 700 }}>{headline || <em style={{ color: '#94a3b8' }}>Not entered</em>}</p>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Skills Detected</span>
              {extractedSkills.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                  {extractedSkills.slice(0, 10).map((sk, i) => (
                    <span key={i} style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: '10.5px', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>{sk}</span>
                  ))}
                  {extractedSkills.length > 10 && <span style={{ fontSize: '10.5px', color: '#64748b' }}>+{extractedSkills.length - 10} more</span>}
                </div>
              ) : <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' }}>No skills entered yet</p>}
            </div>
          </div>
        </div>

        {/* ATS Score + Missing Keywords */}
        <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: '12px', padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '14px' }}>✦</span>
            <h4 style={{ margin: 0, fontSize: '12.5px', fontWeight: 800, color: '#3730a3' }}>ATS Analysis Target (<span style={{ color: scoreColor }}>{atsScore}% Score</span>)</h4>
          </div>
          <p style={{ margin: '0 0 10px 0', fontSize: '11.5px', color: '#4338ca' }}>
            Add these missing keywords to boost your ATS compatibility for <strong>{catLabel}</strong> roles:
          </p>
          {missing.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {missing.map((kw, i) => (
                <button
                  key={i}
                  onClick={() => setSkills(prev => prev ? prev + ', ' + kw : kw)}
                  style={{ background: '#fff', border: '1px solid #a5b4fc', color: '#4338ca', fontSize: '11px', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.target.style.background = '#eef2ff'; e.target.style.borderColor = '#6366f1'; }}
                  onMouseLeave={e => { e.target.style.background = '#fff'; e.target.style.borderColor = '#a5b4fc'; }}
                >
                  + {kw}
                </button>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '11.5px', color: '#4338ca', fontStyle: 'italic' }}>🎉 No missing keywords! You are fully optimized for {catLabel} roles.</p>
          )}
        </div>
      </div>
    );
  };

  // (renderFreasherPreview and renderExperienced2Preview are already declared above as aliases to renderUnifiedPreview)


  const renderLivePreview = () => {
    const config = TEMPLATE_CONFIGS[template] || TEMPLATE_CONFIGS["classical.pdf"];
    if (config.previewType === "freasher") return renderFreasherPreview();
    if (config.previewType === "experienced2") return renderExperienced2Preview();
    return renderClassicalPreview();
  };

  const renderPersonalFields = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
      
      {/* Autofill Resume Block */}
      <div style={{
        gridColumn: '1 / -1',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        padding: '16px',
        borderRadius: '16px',
        border: '1px solid #bbf7d0',
        marginBottom: '4px'
      }}>
        <div>
          <strong style={{ display: 'block', fontSize: '0.95rem', color: '#166534', marginBottom: '2px' }}>✨ Magic Autofill</strong>
          <span style={{ fontSize: '0.78rem', color: '#15803d' }}>Upload an existing resume and our AI will extract all your info instantly!</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
          <input 
            type="file" 
            accept=".pdf,.docx,.txt"
            onChange={handleAutofillUpload}
            disabled={isAutofilling}
            style={{ fontSize: '0.8rem', color: '#166534' }}
          />
          {isAutofilling && <span style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 'bold' }}>Extracting...</span>}
        </div>
      </div>

      {/* Profile Picture Placeholder Mockup */}
      <div style={{
        gridColumn: '1 / -1',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        background: 'rgba(24, 35, 38, 0.02)',
        padding: '16px',
        borderRadius: '16px',
        marginBottom: '8px'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '2px dashed rgba(24, 35, 38, 0.12)',
          display: 'grid',
          placeItems: 'center',
          background: '#ffffff',
          color: 'var(--muted)',
          fontSize: '0.8rem',
          fontWeight: 700,
          cursor: 'pointer'
        }}>
          📷 <span style={{ fontSize: '0.62rem', marginTop: '4px' }}>Add Photo</span>
        </div>
        <div>
          <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text)' }}>Profile Picture</strong>
          <span style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>JPG, PNG or GIF. Max 5MB.</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)' }}>Full Name <span style={{ color: '#ff6b4a' }}>*</span></label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="John Doe" 
          style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(24, 35, 38, 0.12)', fontSize: '0.86rem', outline: 'none' }} 
          required 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)' }}>Email <span style={{ color: '#ff6b4a' }}>*</span></label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="hello@email.com" 
          style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(24, 35, 38, 0.12)', fontSize: '0.86rem', outline: 'none' }} 
          required 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)' }}>Phone <span style={{ color: '#ff6b4a' }}>*</span></label>
        <input 
          type="text" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          placeholder="+1 234 567 8900" 
          style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(24, 35, 38, 0.12)', fontSize: '0.86rem', outline: 'none' }} 
          required 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)' }}>Address <span style={{ color: '#ff6b4a' }}>*</span></label>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Enter your address" 
          style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(24, 35, 38, 0.12)', fontSize: '0.86rem', outline: 'none' }} 
          required 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)' }}>City <span style={{ color: '#ff6b4a' }}>*</span></label>
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter your city" 
          style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(24, 35, 38, 0.12)', fontSize: '0.86rem', outline: 'none' }} 
          required 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)' }}>State <span style={{ color: '#ff6b4a' }}>*</span></label>
        <input 
          type="text" 
          value={stateField} 
          onChange={(e) => setStateField(e.target.value)} 
          placeholder="Enter your state" 
          style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(24, 35, 38, 0.12)', fontSize: '0.86rem', outline: 'none' }} 
          required 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)' }}>Zip Code <span style={{ color: '#ff6b4a' }}>*</span></label>
        <input 
          type="text" 
          value={zipCode} 
          onChange={(e) => setZipCode(e.target.value)} 
          placeholder="Enter your zip code" 
          style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(24, 35, 38, 0.12)', fontSize: '0.86rem', outline: 'none' }} 
          required 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)' }}>Country <span style={{ color: '#ff6b4a' }}>*</span></label>
        <input 
          type="text" 
          value={country} 
          onChange={(e) => setCountry(e.target.value)} 
          placeholder="Enter your country" 
          style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(24, 35, 38, 0.12)', fontSize: '0.86rem', outline: 'none' }} 
          required 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)' }}>LinkedIn</label>
        <input 
          type="text" 
          value={linkedin} 
          onChange={(e) => setLinkedin(e.target.value)} 
          placeholder="https://linkedin.com/in/..." 
          style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(24, 35, 38, 0.12)', fontSize: '0.86rem', outline: 'none' }} 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)' }}>GitHub</label>
        <input 
          type="text" 
          value={github} 
          onChange={(e) => setGithub(e.target.value)} 
          placeholder="https://github.com/..." 
          style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(24, 35, 38, 0.12)', fontSize: '0.86rem', outline: 'none' }} 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)' }}>Website</label>
        <input 
          type="text" 
          value={website} 
          onChange={(e) => setWebsite(e.target.value)} 
          placeholder="https://yourwebsite.com" 
          style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(24, 35, 38, 0.12)', fontSize: '0.86rem', outline: 'none' }} 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)' }}>Professional Title</label>
        <input 
          type="text" 
          value={headline} 
          onChange={(e) => setHeadline(e.target.value)} 
          placeholder="Data Science" 
          style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(24, 35, 38, 0.12)', fontSize: '0.86rem', outline: 'none' }} 
        />
      </div>

    </div>
  );

  const renderSummaryFields = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text)' }}>Professional Summary</label>
      <span style={{ fontSize: '0.76rem', color: 'var(--muted)', marginBottom: '8px' }}>
        Write a short profile summarizing your career achievements, background, and target roles.
      </span>
      <textarea 
        value={summary} 
        onChange={(e) => setSummary(e.target.value)} 
        placeholder="Write short profile text" 
        style={{ padding: '12px', borderRadius: '10px', border: '1px solid rgba(24, 35, 38, 0.12)', fontSize: '0.86rem', minHeight: '160px', width: '100%', resize: 'vertical', outline: 'none' }} 
      />
    </div>
  );

  const renderExperienceFields = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text)' }}>Work Experience</label>
      <span style={{ fontSize: '0.76rem', color: 'var(--muted)', marginBottom: '8px' }}>
        Add your work experience. Leave a blank line between different job blocks.
      </span>
      <textarea 
        value={experience} 
        onChange={(e) => setExperience(e.target.value)} 
        placeholder="Format:&#13;Salford & Co. | 2033 - 2035&#13;Senior Accountant&#13;- Managed auditing&#13;- Financial reporting" 
        style={{ padding: '12px', borderRadius: '10px', border: '1px solid rgba(24, 35, 38, 0.12)', fontSize: '0.86rem', minHeight: '220px', width: '100%', fontFamily: 'monospace', outline: 'none' }} 
      />
    </div>
  );

  const renderEducationFields = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text)' }}>Education Timeline</label>
      <span style={{ fontSize: '0.76rem', color: 'var(--muted)', marginBottom: '8px' }}>
        Add your academic history. Leave a blank line between different degree blocks.
      </span>
      <textarea 
        value={education} 
        onChange={(e) => setEducation(e.target.value)} 
        placeholder="Format:&#13;Borcelle University | 2026 - 2030&#13;Senior Accountant&#13;GPA: 3.8" 
        style={{ padding: '12px', borderRadius: '10px', border: '1px solid rgba(24, 35, 38, 0.12)', fontSize: '0.86rem', minHeight: '220px', width: '100%', fontFamily: 'monospace', outline: 'none' }} 
      />
    </div>
  );

  const renderSkillsFields = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text)' }}>Core Technical Skills</label>
        <span style={{ fontSize: '0.76rem', color: 'var(--muted)', marginBottom: '4px' }}>
          Separate your skills with commas.
        </span>
        <textarea 
          value={skills} 
          onChange={(e) => setSkills(e.target.value)} 
          placeholder="python, machine learning, javascript, sql, react" 
          style={{ padding: '12px', borderRadius: '10px', border: '1px solid rgba(24, 35, 38, 0.12)', fontSize: '0.86rem', minHeight: '100px', width: '100%', outline: 'none' }} 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text)' }}>Personal & Soft Skills</label>
        <span style={{ fontSize: '0.76rem', color: 'var(--muted)', marginBottom: '4px' }}>
          Communication, leadership, project management, etc.
        </span>
        <textarea 
          value={sideSkills} 
          onChange={(e) => setSideSkills(e.target.value)} 
          placeholder="communication, team leadership, problem solving" 
          style={{ padding: '12px', borderRadius: '10px', border: '1px solid rgba(24, 35, 38, 0.12)', fontSize: '0.86rem', minHeight: '100px', width: '100%', outline: 'none' }} 
        />
      </div>
    </div>
  );

  const renderLanguagesFields = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text)' }}>Languages</label>
      <span style={{ fontSize: '0.76rem', color: 'var(--muted)', marginBottom: '8px' }}>
        List the languages you speak, separated by commas.
      </span>
      <textarea 
        value={languages} 
        onChange={(e) => setLanguages(e.target.value)} 
        placeholder="English - Fluent, Spanish - Fluent" 
        style={{ padding: '12px', borderRadius: '10px', border: '1px solid rgba(24, 35, 38, 0.12)', fontSize: '0.86rem', minHeight: '120px', width: '100%', outline: 'none' }} 
      />
    </div>
  );

  const handleBuild = async (e) => {
    e.preventDefault();
    setStatus({ text: "Building template and generating updated files...", type: "info" });
    setSaving(true);

    const computedLocation = `${address ? address + ', ' : ''}${city ? city + ', ' : ''}${stateField ? stateField + ', ' : ''}${zipCode ? zipCode + ' ' : ''}${country || ''}`;
    const answers = {
      full_name: name,
      headline,
      email,
      phone,
      location: computedLocation || location,
      address,
      city,
      state: stateField,
      zip_code: zipCode,
      country,
      website,
      linkedin,
      github,
      summary,
      skills,
      side_skills: sideSkills,
      languages,
      experience,
      education
    };

    try {
      // Save/create first in database if resumeId is provided
      if (resumeId && resumeId !== 'default') {
        await fetch(`/api/resumes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: resumeId,
            title: name ? `${name} - Resume` : 'Form Builder Resume',
            resume_data: { ...answers, template }
          })
        });
      }

      // Hit generation endpoint
      const res = await fetch("/api/chatbot/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, template_choice: template })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Could not build resume.");
      }

      if (data.gemini_suggestions) {
        setGeminiSuggestions(data.gemini_suggestions);
      }

      if (data.pdf_b64) {
        const safeName = String(template || "resume").replace(/\.pdf$/i, "").replace(/\s+/g, "_");
        const pdfDataUri = `data:application/pdf;base64,${data.pdf_b64}`;
        
        // Programmatically trigger immediate browser download
        const downloadLink = document.createElement("a");
        downloadLink.href = pdfDataUri;
        downloadLink.download = `${safeName}_updated.pdf`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        setDownloadLinks({
          pdf: pdfDataUri
        });
      }

      setStatus({ text: "Updated resume generated successfully.", type: "success" });
      localStorage.removeItem(`resume_draft_${resumeId || 'new'}`);
    } catch (err) {
      setStatus({ text: err.message, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const handleDownloadTrigger = () => {
      handleBuild({ preventDefault: () => {} });
    };
    window.addEventListener("trigger_resume_download", handleDownloadTrigger);
    return () => {
      window.removeEventListener("trigger_resume_download", handleDownloadTrigger);
    };
  }, [name, headline, email, phone, address, city, stateField, zipCode, country, website, linkedin, github, summary, skills, sideSkills, languages, experience, education, template]);

  if (loading) {
    return (
      <div className="page-shell">
        <Navbar />
        <main className="page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Loader />
        </main>
      </div>
    );
  }

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: '👤' },
    { id: 'summary', name: 'Summary', icon: '📝' },
    { id: 'experience', name: 'Work Experience', icon: '💼' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'skills', name: 'Skills', icon: '✨' },
    { id: 'languages', name: 'Languages', icon: '🌐' }
  ];

  const handleNext = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page" style={{ marginTop: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'start' }}>
          
          {/* LEFT PANEL: Form Editor */}
          <article className="card" style={{ background: 'rgba(255, 255, 255, 0.7)', borderRadius: '20px', padding: '24px', border: '1px solid rgba(24, 35, 38, 0.04)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            
            {/* Form Editor Header toolbar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(24, 35, 38, 0.08)',
              paddingBottom: '16px',
              marginBottom: '16px'
            }}>
              <div style={{
                background: '#eff6ff',
                color: '#2563eb',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '0.88rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>{sections.find(s => s.id === activeSection)?.icon}</span>
                {sections.find(s => s.id === activeSection)?.name}
              </div>

              {/* Toolbar controls */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    style={{
                      appearance: 'none',
                      background: '#ffffff',
                      border: '1px solid rgba(24, 35, 38, 0.12)',
                      borderRadius: '8px',
                      padding: '8px 32px 8px 12px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--text)',
                      cursor: 'pointer'
                    }}
                  >
                    {Object.keys(TEMPLATE_CONFIGS).map((tKey) => (
                      <option key={tKey} value={tKey}>Template: {tKey.replace(/\.pdf$/i, '')}</option>
                    ))}
                  </select>
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', fontSize: '0.68rem', color: 'var(--muted)' }}>▼</span>
                </div>

                <button style={{
                  background: '#ffffff',
                  border: '1px solid rgba(24, 35, 38, 0.12)',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text)',
                  cursor: 'pointer'
                }}>
                  🎨 Color
                </button>

                <button style={{
                  background: '#ffffff',
                  border: '1px solid rgba(24, 35, 38, 0.12)',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text)',
                  cursor: 'pointer'
                }}>
                  𝖳 Size: Medium
                </button>
              </div>
            </div>

            {/* Icon tabs navigation */}
            <div style={{
              display: 'flex',
              gap: '12px',
              borderBottom: '1px solid rgba(24, 35, 38, 0.06)',
              paddingBottom: '14px',
              marginBottom: '20px'
            }}>
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSection(sec.id)}
                  title={sec.name}
                  style={{
                    background: activeSection === sec.id ? 'rgba(37, 99, 235, 0.08)' : 'none',
                    border: activeSection === sec.id ? '1px solid #bfdbfe' : '1px solid transparent',
                    borderRadius: '8px',
                    width: '38px',
                    height: '38px',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '1.15rem',
                    cursor: 'pointer',
                    color: activeSection === sec.id ? '#2563eb' : 'var(--muted)',
                    transition: 'all 0.2s'
                  }}
                >
                  {sec.icon}
                </button>
              ))}
            </div>

            {/* Active section inputs */}
            <div style={{ minHeight: '360px', marginBottom: '24px' }}>
              {activeSection === 'personal' && renderPersonalFields()}
              {activeSection === 'summary' && renderSummaryFields()}
              {activeSection === 'experience' && renderExperienceFields()}
              {activeSection === 'education' && renderEducationFields()}
              {activeSection === 'skills' && renderSkillsFields()}
              {activeSection === 'languages' && renderLanguagesFields()}
            </div>

            {/* Bottom Actions Row */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(24, 35, 38, 0.08)',
              paddingTop: '20px'
            }}>
              <button 
                onClick={handlePrev}
                disabled={activeSection === 'personal'}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeSection === 'personal' ? 'var(--muted)' : '#475569',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  cursor: activeSection === 'personal' ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                ← Previous
              </button>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={handleBuild}
                  disabled={saving}
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(24, 35, 38, 0.12)',
                    borderRadius: '8px',
                    padding: '10px 24px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    cursor: 'pointer'
                  }}
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>

                <button 
                  onClick={handleBuild}
                  disabled={saving}
                  style={{
                    background: '#1c2427',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 24px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  📥 {saving ? 'Building...' : 'Download'}
                </button>

                <button 
                  onClick={handleNext}
                  disabled={activeSection === 'languages'}
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(24, 35, 38, 0.12)',
                    borderRadius: '8px',
                    padding: '10px 24px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: activeSection === 'languages' ? 'var(--muted)' : 'var(--text)',
                    cursor: activeSection === 'languages' ? 'default' : 'pointer'
                  }}
                >
                  Next →
                </button>
              </div>
            </div>

            {status.text && (
              <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '0.84rem',
                background: status.type === 'error' ? 'rgba(255, 107, 74, 0.08)' : 'rgba(15, 157, 88, 0.08)',
                color: status.type === 'error' ? 'var(--accent-deep)' : '#0f9d58'
              }}>
                {status.text}
              </div>
            )}
          </article>

          {/* RIGHT PANEL: Live Resume Preview */}
          <article className="card" style={{ background: 'rgba(255, 255, 255, 0.7)', borderRadius: '20px', padding: '24px', border: '1px solid rgba(24, 35, 38, 0.04)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', position: 'sticky', top: '100px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', fontWeight: 800 }}>
                📋 Live Preview
              </span>
              <span style={{ fontSize: '0.74rem', color: 'var(--muted)', fontStyle: 'italic' }}>
                Autosaved just now
              </span>
            </div>

            <div id="selectedTemplateLabel" style={{ fontSize: '0.76rem', color: 'var(--text)', background: 'rgba(24, 35, 38, 0.04)', padding: '6px 12px', borderRadius: '6px', marginBottom: '16px', display: 'inline-block' }}>
              Template Choice: <strong>{template}</strong>
            </div>

            {geminiSuggestions && (
              <div style={{ whiteSpace: 'pre-wrap', background: 'rgba(37,99,235,0.04)', border: '1px solid rgba(37,99,235,0.15)', borderRadius: '12px', padding: '14px', marginBottom: '16px', fontSize: '0.84rem', color: 'var(--text)' }}>
                <strong>AI Builder Analysis Checklist:</strong><br /><br />
                {geminiSuggestions}
              </div>
            )}

            <div className="resume-preview resume-preview-rich" style={{ padding: 0, border: 'none', background: 'none' }}>
              {renderLivePreview()}
            </div>

            {/* ATS Analysis Panel Removed per user request */}

            {downloadLinks && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <a 
                  className="btn btn-primary" 
                  style={{ textDecoration: 'none', width: '100%', textAlign: 'center', background: '#0f172a' }} 
                  download={`${template.replace(/\.pdf$/i, '')}_updated.pdf`} 
                  href={downloadLinks.pdf}
                >
                  Download Updated PDF File
                </a>
              </div>
            )}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResumeBuilder;
