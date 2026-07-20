import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import { 
  FileCode, 
  Copy, 
  Download, 
  ExternalLink, 
  Check, 
  Sparkles, 
  Upload, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code2
} from 'lucide-react';
import '../css/style.css';

const escapeLatex = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
};

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  // Form State
  const [template, setTemplate] = useState('modern_tech'); // 'modern_tech' | 'executive' | 'minimal'
  
  const [name, setName] = useState('Mukund Khandelwal');
  const [headline, setHeadline] = useState('Software Engineer');
  const [email, setEmail] = useState('mukundkhandelwal463@gmail.com');
  const [phone, setPhone] = useState('+91 9876543210');
  const [location, setLocation] = useState('India');
  const [linkedin, setLinkedin] = useState('linkedin.com/in/mukund');
  const [github, setGithub] = useState('github.com/mukundkhandelwal463');
  const [summary, setSummary] = useState('Results-driven Software Engineer with expertise in React, Python, Django, Data Structures, and System Architecture.');

  // Experience
  const [jobTitle, setJobTitle] = useState('Software Engineer Intern');
  const [company, setCompany] = useState('Tech Solutions Inc.');
  const [jobDates, setJobDates] = useState('Jan 2024 -- Present');
  const [jobLocation, setJobLocation] = useState('Remote');
  const [jobBullets, setJobBullets] = useState('Developed high-performance web applications using React and Django.\nOptimized backend REST APIs reducing response latency by 35%.\nImplemented secure authentication and automated CI/CD workflows.');

  // Education
  const [college, setCollege] = useState('Institute of Technology');
  const [degree, setDegree] = useState('B.Tech in Computer Science & Engineering');
  const [gradDate, setGradDate] = useState('2021 -- 2025');
  const [eduLocation, setEduLocation] = useState('India');

  // Skills & Projects
  const [skills, setSkills] = useState('JavaScript, React, Python, Django, C++, SQL, Git, Linux, System Design');
  const [projectName, setProjectName] = useState('CareerPilot - AI Resume Screener');
  const [projectTech, setProjectTech] = useState('React, Python, Django, Gemini AI, TailwindCSS');
  const [projectDate, setProjectDate] = useState('2024');
  const [projectDesc, setProjectDesc] = useState('Built full-stack AI career preparation platform with dynamic ATS evaluation, mock voice interviews, and LaTeX resume compilation.');

  // UI Status
  const [isCopied, setIsCopied] = useState(false);
  const [isAutofilling, setIsAutofilling] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [activeTab, setActiveTab] = useState('personal');

  // Autofill from user's latest resume on mount
  useEffect(() => {
    const fetchLatestResume = async () => {
      try {
        const res = await fetch('/api/resumes');
        const data = await res.json();
        if (data.success && data.resumes && data.resumes.length > 0) {
          const latest = data.resumes[0];
          if (latest.resume_json) {
            const parsed = JSON.parse(latest.resume_json);
            if (parsed.full_name || parsed.name) setName(parsed.full_name || parsed.name);
            if (parsed.email) setEmail(parsed.email);
            if (parsed.phone) setPhone(parsed.phone);
            if (parsed.headline) setHeadline(parsed.headline);
            if (parsed.summary) setSummary(parsed.summary);
            if (parsed.skills) setSkills(parsed.skills);
            if (parsed.experience) setJobBullets(parsed.experience);
            if (parsed.education) setDegree(parsed.education);
          }
        }
      } catch (err) {
        console.error("Error fetching latest resume:", err);
      }
    };
    fetchLatestResume();
  }, []);

  // Handle Resume Upload & Extraction
  const handleAutofillUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsAutofilling(true);
    setStatusMsg('Extracting data from resume file...');

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
        if (pd.full_name || pd.name) setName(pd.full_name || pd.name);
        if (pd.headline) setHeadline(pd.headline);
        if (pd.email) setEmail(pd.email);
        if (pd.phone) setPhone(pd.phone);
        if (pd.location) setLocation(pd.location);
        if (pd.summary) setSummary(pd.summary);
        if (pd.skills) setSkills(pd.skills);
        if (pd.experience) setJobBullets(pd.experience);
        if (pd.education) setDegree(pd.education);
        if (pd.linkedin) setLinkedin(pd.linkedin);
        if (pd.github) setGithub(pd.github);
        setStatusMsg('Resume data extracted successfully!');
      } else {
        setStatusMsg(data.error || 'Failed to extract resume data.');
      }
    } catch (err) {
      console.error(err);
      setStatusMsg('Error parsing resume file.');
    } finally {
      setIsAutofilling(false);
    }
  };

  // Generate LaTeX Code
  const latexCode = useMemo(() => {
    const escName = escapeLatex(name);
    const escHeadline = escapeLatex(headline);
    const escEmail = escapeLatex(email);
    const escPhone = escapeLatex(phone);
    const escLocation = escapeLatex(location);
    const escLinkedin = escapeLatex(linkedin);
    const escGithub = escapeLatex(github);
    const escSummary = escapeLatex(summary);

    const escJobTitle = escapeLatex(jobTitle);
    const escCompany = escapeLatex(company);
    const escJobDates = escapeLatex(jobDates);
    const escJobLocation = escapeLatex(jobLocation);
    const escJobBullets = jobBullets.split('\n').filter(Boolean).map(b => `  \\item ${escapeLatex(b)}`).join('\n');

    const escCollege = escapeLatex(college);
    const escDegree = escapeLatex(degree);
    const escGradDate = escapeLatex(gradDate);

    const escSkills = escapeLatex(skills);
    const escProjName = escapeLatex(projectName);
    const escProjTech = escapeLatex(projectTech);
    const escProjDate = escapeLatex(projectDate);
    const escProjDesc = escapeLatex(projectDesc);

    if (template === 'executive') {
      return `\\documentclass[10pt,a4paper]{article}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{titlesec}
\\usepackage{xcolor}
\\usepackage[hidelinks]{hyperref}

\\definecolor{primary}{RGB}{28, 36, 39}
\\definecolor{accent}{RGB}{16, 185, 129}

\\titleformat{\\section}{\\color{primary}\\large\\bfseries\\uppercase}{}{0em}{}[\\titlerule]

\\begin{document}

\\begin{center}
{\\Huge \\bfseries \\color{primary} ${escName}} \\\\[4pt]
{\\color{accent} \\bfseries ${escHeadline}} \\\\[6pt]
\\small ${escEmail} $\\cdot$ ${escPhone} $\\cdot$ ${escLocation} $\\cdot$ \\href{https://${escLinkedin}}{${escLinkedin}}
\\end{center}

\\vspace{8pt}

\\section{Executive Summary}
${escSummary}

\\section{Professional Experience}
\\textbf{${escJobTitle}} \\hfill ${escJobDates} \\\\
\\textit{${escCompany}, ${escJobLocation}}
\\begin{itemize}
${escJobBullets}
\\end{itemize}

\\section{Education}
\\textbf{${escDegree}} \\hfill ${escGradDate} \\\\
\\textit{${escCollege}, ${escLocation}}

\\section{Key Projects}
\\textbf{${escProjName}} (${escProjTech}) \\hfill ${escProjDate} \\\\
${escProjDesc}

\\section{Technical Skills}
${escSkills}

\\end{document}`;
    }

    if (template === 'minimal') {
      return `\\documentclass[10pt,letterpaper]{article}
\\usepackage[margin=0.5in]{geometry}
\\usepackage[hidelinks]{hyperref}
\\usepackage{xcolor}

\\pagestyle{empty}

\\begin{document}

\\begin{center}
    {\\Huge \\textbf{${escName}}} \\\\[2pt]
    \\small ${escHeadline} $|$ ${escEmail} $|$ ${escPhone} $|$ \\href{https://${escGithub}}{${escGithub}}
\\end{center}

\\hrule
\\vspace{8pt}

\\noindent \\textbf{\\large SUMMARY} \\\\
\\small ${escSummary}

\\vspace{8pt}
\\noindent \\textbf{\\large EXPERIENCE} \\\\
\\textbf{${escCompany}} -- \\textit{${escJobTitle}} \\hfill ${escJobDates} \\\\
\\begin{itemize}
${escJobBullets}
\\end{itemize}

\\vspace{8pt}
\\noindent \\textbf{\\large PROJECTS} \\\\
\\textbf{${escProjName}} (${escProjTech}) \\hfill ${escProjDate} \\\\
${escProjDesc}

\\vspace{8pt}
\\noindent \\textbf{\\large EDUCATION} \\\\
\\textbf{${escCollege}} -- ${escDegree} \\hfill ${escGradDate}

\\vspace{8pt}
\\noindent \\textbf{\\large TECHNICAL SKILLS} \\\\
${escSkills}

\\end{document}`;
    }

    // Default: 'modern_tech' (Jake's Resume style)
    return `\\documentclass[letterpaper,11pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[hidelinks]{hyperref}
\\usepackage{verbatim}
\\usepackage{enumitem}

\\pagestyle{empty}
\\urlstyle{same}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\titleformat{\\section}{\\vspace{-4pt}\\scshape\\raggedright\\large}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape ${escName}} \\\\[2pt]
    \\small ${escPhone} $|$ \\href{mailto:${escEmail}}{${escEmail}} $|$ 
    \\href{https://${escLinkedin}}{${escLinkedin}} $|$
    \\href{https://${escGithub}}{${escGithub}}
\\end{center}

\\section{Summary}
\\small{${escSummary}}

\\section{Education}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\item \\textbf{${escCollege}} \\hfill ${escGradDate} \\\\
  ${escDegree} \\hfill \\textit{${escLocation}}
\\end{itemize}

\\section{Experience}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\item \\textbf{${escJobTitle}} \\hfill ${escJobDates} \\\\
  \\textit{${escCompany}} \\hfill \\textit{${escJobLocation}}
  \\begin{itemize}
${escJobBullets}
  \\end{itemize}
\\end{itemize}

\\section{Projects}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\item \\textbf{${escProjName}} $|$ \\emph{${escProjTech}} \\hfill ${escProjDate} \\\\
  ${escProjDesc}
\\end{itemize}

\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{\\textbf{Skills}{: ${escSkills}}}}
\\end{itemize}

\\end{document}`;
  }, [template, name, headline, email, phone, location, linkedin, github, summary, jobTitle, company, jobDates, jobLocation, jobBullets, college, degree, gradDate, skills, projectName, projectTech, projectDate, projectDesc]);

  // Copy LaTeX code handler
  const handleCopyLatex = () => {
    navigator.clipboard.writeText(latexCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Download .tex file handler
  const handleDownloadTex = () => {
    const blob = new Blob([latexCode], { type: 'text/x-tex;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.replace(/\s+/g, '_')}_Resume.tex`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Live Compiler URLs
  const latexOnlineUrl = `https://latexonline.cc/compile?text=${encodeURIComponent(latexCode)}`;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ marginTop: '70px', padding: '32px 24px', flex: 1 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          
          {/* Header Title Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1c2427', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileCode className="size-8 text-emerald-500" /> LaTeX Resume Architect
              </h1>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
                Generate clean, ATS-optimized LaTeX source code with 3 professional templates and instant online compile links.
              </p>
            </div>

            {/* Quick Upload Banner */}
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '12px 20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Sparkles className="size-5 text-amber-500" />
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1c2427', display: 'block' }}>Autofill From Resume</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Extract info from PDF/DOCX</span>
              </div>
              <label style={{
                background: '#1c2427',
                color: '#ffffff',
                padding: '8px 14px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Upload className="size-4" /> Upload
                <input type="file" onChange={handleAutofillUpload} accept=".pdf,.docx,.txt" style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          {statusMsg && (
            <div style={{
              background: '#ecfdf5',
              border: '1px solid #10b981',
              color: '#065f46',
              padding: '10px 16px',
              borderRadius: '12px',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '20px'
            }}>
              {statusMsg}
            </div>
          )}

          {/* MAIN 2-COLUMN GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', alignItems: 'start' }}>

            {/* LEFT COLUMN: FORM INPUTS */}
            <div style={{
              background: '#ffffff',
              borderRadius: '28px',
              padding: '28px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              border: '1px solid #e2e8f0'
            }}>

              {/* Form Section Navigation Tabs */}
              <div style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '12px',
                borderBottom: '1px solid #f1f5f9',
                marginBottom: '24px'
              }}>
                {[
                  { id: 'personal', label: 'Personal', icon: User },
                  { id: 'experience', label: 'Experience', icon: Briefcase },
                  { id: 'education', label: 'Education', icon: GraduationCap },
                  { id: 'skills', label: 'Skills & Projects', icon: Code2 },
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        background: isActive ? '#1c2427' : '#f8fafc',
                        color: isActive ? '#ffffff' : '#64748b',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '10px 16px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Icon className="size-4" /> {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* TAB 1: PERSONAL DETAILS */}
              {activeTab === 'personal' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Full Name *</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Headline / Target Position</label>
                    <input type="text" value={headline} onChange={e => setHeadline(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Phone Number</label>
                      <input type="text" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>LinkedIn URL</label>
                      <input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>GitHub / Portfolio URL</label>
                      <input type="text" value={github} onChange={e => setGithub(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Professional Summary</label>
                    <textarea rows="4" value={summary} onChange={e => setSummary(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.88rem', outline: 'none', resize: 'vertical' }} />
                  </div>
                </div>
              )}

              {/* TAB 2: EXPERIENCE */}
              {activeTab === 'experience' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Job Title</label>
                      <input type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Company Name</label>
                      <input type="text" value={company} onChange={e => setCompany(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Dates (e.g. Jan 2024 -- Present)</label>
                      <input type="text" value={jobDates} onChange={e => setJobDates(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Location</label>
                      <input type="text" value={jobLocation} onChange={e => setJobLocation(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Key Responsibilities & Achievements (1 per line)</label>
                    <textarea rows="5" value={jobBullets} onChange={e => setJobBullets(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.88rem', outline: 'none', resize: 'vertical' }} />
                  </div>
                </div>
              )}

              {/* TAB 3: EDUCATION */}
              {activeTab === 'education' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>College / University Name</label>
                    <input type="text" value={college} onChange={e => setCollege(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Degree & Major</label>
                    <input type="text" value={degree} onChange={e => setDegree(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Graduation Date / Years</label>
                      <input type="text" value={gradDate} onChange={e => setGradDate(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Location</label>
                      <input type="text" value={eduLocation} onChange={e => setEduLocation(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: SKILLS & PROJECTS */}
              {activeTab === 'skills' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Technical Skills (Comma Separated)</label>
                    <input type="text" value={skills} onChange={e => setSkills(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '8px 0' }} />

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Project Title</label>
                    <input type="text" value={projectName} onChange={e => setProjectName(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Technologies Used</label>
                      <input type="text" value={projectTech} onChange={e => setProjectTech(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Project Date</label>
                      <input type="text" value={projectDate} onChange={e => setProjectDate(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Project Description</label>
                    <textarea rows="3" value={projectDesc} onChange={e => setProjectDesc(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.88rem', outline: 'none', resize: 'vertical' }} />
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: LATEX PREVIEW & CONTROLS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Template Selector Card */}
              <div style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                border: '1px solid #e2e8f0'
              }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Select Major LaTeX Template
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {[
                    { id: 'modern_tech', name: 'Jake\'s Tech', tag: 'ATS Standard' },
                    { id: 'executive', name: 'Executive', tag: 'Corporate' },
                    { id: 'minimal', name: 'Minimalist', tag: 'Clean Deedy' },
                  ].map(t => {
                    const isSelected = template === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTemplate(t.id)}
                        style={{
                          background: isSelected ? '#1c2427' : '#f8fafc',
                          color: isSelected ? '#ffffff' : '#1c2427',
                          border: isSelected ? '2px solid #10b981' : '1px solid #cbd5e1',
                          borderRadius: '16px',
                          padding: '12px 10px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <strong style={{ fontSize: '0.85rem', display: 'block' }}>{t.name}</strong>
                        <span style={{ fontSize: '0.7rem', color: isSelected ? '#10b981' : '#64748b', fontWeight: 600 }}>{t.tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <button
                  onClick={handleCopyLatex}
                  style={{
                    background: isCopied ? '#10b981' : '#1c2427',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '12px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(28,36,39,0.1)'
                  }}
                >
                  {isCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  {isCopied ? 'Copied!' : 'Copy LaTeX'}
                </button>

                <button
                  onClick={handleDownloadTex}
                  style={{
                    background: '#3b82f6',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '12px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(59,130,246,0.2)'
                  }}
                >
                  <Download className="size-4" /> Download .tex
                </button>

                <a
                  href="https://www.overleaf.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#f5c35c',
                    color: '#1c2427',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '12px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(245,195,92,0.2)'
                  }}
                >
                  <ExternalLink className="size-4" /> Open Overleaf
                </a>
              </div>

              {/* Online Preview Link Banner */}
              <div style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '16px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.82rem', color: '#1e40af', fontWeight: 600 }}>
                  Want instant online PDF rendering?
                </span>
                <a
                  href={latexOnlineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#2563eb',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    textDecoration: 'underline'
                  }}
                >
                  Compile PDF Online <ExternalLink className="size-3.5" />
                </a>
              </div>

              {/* Generated LaTeX Code Display Box */}
              <div style={{
                background: '#1c2427',
                borderRadius: '24px',
                padding: '20px',
                color: '#e2e8f0',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f5c35c', fontFamily: 'monospace' }}>
                    generated_resume.tex
                  </span>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '6px', color: '#94a3b8' }}>
                    LaTeX Source
                  </span>
                </div>

                <pre style={{
                  background: '#141a1c',
                  borderRadius: '14px',
                  padding: '16px',
                  fontFamily: 'Consolas, Monaco, "Fira Code", monospace',
                  fontSize: '0.8rem',
                  lineHeight: 1.5,
                  maxHeight: '480px',
                  overflow: 'auto',
                  color: '#a7f3d0',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all'
                }}>
                  {latexCode}
                </pre>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResumeBuilder;
