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
  Code2,
  Award,
  Trophy,
  Plus,
  Trash2
} from 'lucide-react';
import '../css/style.css';

const esc = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}');
};

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  // Template Choice: 'mukund_ml' | 'abey_classic' | 'executive'
  const [template, setTemplate] = useState('mukund_ml');

  // Form Section State
  const [activeTab, setActiveTab] = useState('personal');

  // Personal Info (Starts BLANK by default)
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');

  // Education (Starts BLANK by default)
  const [educationList, setEducationList] = useState([]);

  // Key / Technical Skills (Starts BLANK by default)
  const [skillsList, setSkillsList] = useState([]);

  // Projects (Starts BLANK by default)
  const [projectsList, setProjectsList] = useState([]);

  // Training / Experience (Starts BLANK by default)
  const [trainingList, setTrainingList] = useState([]);

  // Certifications (Starts BLANK by default)
  const [certificationsList, setCertificationsList] = useState([]);

  // Achievements (Starts BLANK by default)
  const [achievementsList, setAchievementsList] = useState([]);

  // Status
  const [isCopied, setIsCopied] = useState(false);
  const [isAutofilling, setIsAutofilling] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Clear all form fields
  const clearForm = () => {
    setName('');
    setLocation('');
    setPhone('');
    setEmail('');
    setLinkedin('');
    setGithub('');
    setEducationList([]);
    setSkillsList([]);
    setProjectsList([]);
    setTrainingList([]);
    setCertificationsList([]);
    setAchievementsList([]);
    setStatusMsg('Form reset to blank.');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  // Handle Upload Auto-parse
  const handleAutofillUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsAutofilling(true);
    setStatusMsg('Extracting data from uploaded resume file...');

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
        if (pd.email) setEmail(pd.email);
        if (pd.phone) setPhone(pd.phone);
        if (pd.location || pd.address || pd.city) setLocation(pd.location || pd.address || pd.city);
        if (pd.linkedin) setLinkedin(pd.linkedin);
        if (pd.github) setGithub(pd.github);

        // Parse Education
        if (pd.education) {
          if (Array.isArray(pd.education)) {
            setEducationList(pd.education.map(e => (typeof e === 'string' ? { school: e, location: '', degree: '', dates: '' } : e)));
          } else if (typeof pd.education === 'string') {
            setEducationList([{ school: pd.education, location: '', degree: '', dates: '' }]);
          }
        }

        // Parse Skills
        if (pd.skills) {
          if (Array.isArray(pd.skills)) {
            setSkillsList([{ category: 'Technical Skills', items: pd.skills.join(', ') }]);
          } else if (typeof pd.skills === 'string') {
            setSkillsList([{ category: 'Technical Skills', items: pd.skills }]);
          }
        }

        // Parse Projects / Experience
        if (pd.experience) {
          if (typeof pd.experience === 'string') {
            setTrainingList([{ title: 'Professional Experience', date: '', link: '', projectTitle: 'Key Responsibilities', tech: '', bullets: pd.experience }]);
          }
        }

        setStatusMsg('Resume parsed and form populated successfully!');
        setTimeout(() => setStatusMsg(''), 4000);
      } else {
        setStatusMsg(data.error || 'Failed to extract resume data.');
      }
    } catch (err) {
      console.error(err);
      setStatusMsg('Error parsing uploaded resume file.');
    } finally {
      setIsAutofilling(false);
    }
  };

  // Dynamic Tabs depending on template choice
  const activeTabsList = useMemo(() => {
    if (template === 'abey_classic') {
      return [
        { id: 'personal', label: 'Personal', icon: User },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'skills', label: 'Technical Skills', icon: Code2 },
        { id: 'projects', label: 'Projects', icon: Briefcase },
        { id: 'training', label: 'Experience & Training', icon: Award },
        { id: 'certifications', label: 'Certifications', icon: Trophy },
      ];
    }
    if (template === 'executive') {
      return [
        { id: 'personal', label: 'Personal', icon: User },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'skills', label: 'Skills & Competencies', icon: Code2 },
        { id: 'projects', label: 'Projects', icon: Briefcase },
        { id: 'certifications', label: 'Certifications', icon: Trophy },
      ];
    }
    // Default: 'mukund_ml'
    return [
      { id: 'personal', label: 'Personal', icon: User },
      { id: 'education', label: 'Education', icon: GraduationCap },
      { id: 'skills', label: 'Key Skills', icon: Code2 },
      { id: 'projects', label: 'Projects', icon: Briefcase },
      { id: 'training', label: 'Training', icon: Award },
      { id: 'certifications', label: 'Certifications & Wins', icon: Trophy },
    ];
  }, [template]);

  // Ensure active tab remains valid when template changes
  useEffect(() => {
    if (!activeTabsList.find(t => t.id === activeTab)) {
      setActiveTab('personal');
    }
  }, [template, activeTabsList, activeTab]);

  // Generate Dynamic LaTeX Code
  const latexCode = useMemo(() => {
    const displayName = name || '[YOUR FULL NAME]';
    const displayLocation = location || '[City, State]';
    const displayPhone = phone || '[Phone Number]';
    const displayEmail = email || '[Email Address]';
    const displayLinkedin = linkedin || 'LinkedIn';
    const displayGithub = github || 'GitHub';

    const eduContent = educationList.length > 0
      ? educationList.map(e => `    \\resumeSubheading\n      {${esc(e.school || '[School Name]')}}{${esc(e.location || '[Location]')}}\n      {${esc(e.degree || '[Degree / CGPA]')}}{${esc(e.dates || '[Dates]')}}`).join('\n')
      : `    \\resumeSubheading\n      {[University / School Name]}{[Location]}\n      {[Degree / Major | CGPA / Marks]}{[Aug 2023 -- Present]}`;

    const skillsContent = skillsList.length > 0
      ? skillsList.map(s => `     \\textbf{\\normalsize{${esc(s.category || 'Skills')}:}}{\\normalsize{ ${esc(s.items || '[Skill Items]')}}} \\\\`).join('\n')
      : `     \\textbf{\\normalsize{Programming \\& Tools:}}{\\normalsize{ [Python, SQL, JavaScript, Git, Linux]}} \\\\`;

    const projectsContent = projectsList.length > 0
      ? projectsList.map(p => `      \\resumeProjectHeading\n          {\\href{${esc(p.link || '#')}}{\\textbf{\\large{${esc(p.title || '[Project Title]')}}}}{${esc(p.tech ? ` $|$ \\large{${esc(p.tech)}}` : '')}}}{${esc(p.date || '[Date]')}}\n          \\resumeItemListStart\n${(p.bullets || '[Project achievement description]').split('\n').filter(Boolean).map(b => `            \\resumeItem{\\normalsize{${esc(b)}}}`).join('\n')}\n          \\resumeItemListEnd\n          \\vspace{-18pt}`).join('\n')
      : `      \\resumeProjectHeading\n          {\\textbf{\\large{[Project Title]}} $|$ \\large{[Technologies Used]}}{[Date]}\n          \\resumeItemListStart\n            \\resumeItem{\\normalsize{[Developed key project features and optimized performance metrics.]}}\n          \\resumeItemListEnd\n          \\vspace{-18pt}`;

    const trainingContent = trainingList.length > 0
      ? trainingList.map(t => `  \\resumeSubheading\n    {${esc(t.title || '[Training Title]')}}{${esc(t.date || '[Date]')}}\n    {}{}\n  \\vspace{-25pt}\n  \\begin{itemize}[leftmargin=0.15in, label={}]\n    \\resumeProjectHeading\n        {\\href{${esc(t.link || '#')}}{\\textbf{\\large{${esc(t.projectTitle || '[Project]')}}}}{${esc(t.tech ? ` $|$ \\large{${esc(t.tech)}}` : '')}}}{}\n        \\resumeItemListStart\n${(t.bullets || '[Training description]').split('\n').filter(Boolean).map(b => `          \\resumeItem{\\normalsize{${esc(b)}}}`).join('\n')}\n        \\resumeItemListEnd\n  \\end{itemize}`).join('\n')
      : `  \\resumeSubheading\n    {[Training Program / Experience]}{[Date]}\n    {}{}\n  \\vspace{-25pt}\n  \\begin{itemize}[leftmargin=0.15in, label={}]\n    \\resumeProjectHeading\n        {\\textbf{\\large{[Project Title]}} $|$ \\large{[Tech Stack]}}{}\n        \\resumeItemListStart\n          \\resumeItem{\\normalsize{[Completed hands-on technical modules and key assignments.]}}\n        \\resumeItemListEnd\n  \\end{itemize}`;

    const certsContent = certificationsList.length > 0
      ? certificationsList.map(c => `        \\resumeItem{\\normalsize{${esc(c.title || '[Certification]')} -- \\textbf{(${esc(c.issuer || '[Issuer]')})} \\hfill \\textbf{${esc(c.date || '[Date]')}}}}`).join('\n')
      : `        \\resumeItem{\\normalsize{[Machine Learning \\& Data Science Certification] -- \\textbf{([Issuer])} \\hfill \\textbf{[Date]}}}`;

    const achievementsContent = achievementsList.length > 0
      ? achievementsList.map(a => `    \\item ${esc(a)}`).join('\n')
      : `    \\item [Built end-to-end data pipelines and solved 200+ problem solving challenges.]`;

    if (template === 'abey_classic') {
      return `%-------------------------
% Resume in Latex - Abey George Classic Style
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{multicol}
\\usepackage{graphicx}
\\setlength{\\multicolsep}{-3.0pt}
\\setlength{\\columnsep}{-1pt}
\\input{glyphtounicode}

\\RequirePackage{tikz}
\\RequirePackage{xcolor}
\\usepackage{tikz}
\\usetikzlibrary{svg.path}

\\definecolor{cvblue}{HTML}{0E5484}
\\definecolor{black}{HTML}{130810}
\\definecolor{darkcolor}{HTML}{0F4539}
\\definecolor{cvgreen}{HTML}{3BD80D}
\\definecolor{taggreen}{HTML}{00E278}
\\definecolor{SlateGrey}{HTML}{2E2E2E}
\\definecolor{LightGrey}{HTML}{666666}
\\colorlet{name}{black}
\\colorlet{tagline}{darkcolor}
\\colorlet{heading}{darkcolor}
\\colorlet{headingrule}{cvblue}
\\colorlet{accent}{darkcolor}
\\colorlet{emphasis}{SlateGrey}
\\colorlet{body}{LightGrey}

\\addtolength{\\oddsidemargin}{-0.6in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.19in}
\\addtolength{\\topmargin}{-.7in}
\\addtolength{\\textheight}{1.4in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

\\newcommand{\\resumeItem}[1]{
  \\item\\small{{#1 \\vspace{-2pt}}}
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{\\large#1} & \\textbf{\\small #2} \\\\
      \\textit{\\large#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & \\textbf{\\small #2}\\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\newcommand\\sbullet[1][.5]{\\mathbin{\\vcenter{\\hbox{\\scalebox{#1}{$\\bullet$}}}}}

\\begin{document}

%----------HEADING----------
\\begin{center}
    {\\Huge \\scshape ${esc(displayName)}} \\\\ \\vspace{2pt}
    ${esc(displayLocation)} \\\\ \\vspace{2pt}
    \\small
    \\href{tel:${esc(displayPhone)}}{${esc(displayPhone)}} ~\\$|\\$~
    \\href{mailto:${esc(displayEmail)}}{${esc(displayEmail)}} ~\\$|\\$~
    \\href{${esc(displayLinkedin)}}{LinkedIn} ~\\$|\\$~
    \\href{${esc(displayGithub)}}{GitHub}
\\end{center}
\\vspace{3mm}

%-----------EDUCATION-----------
\\section{EDUCATION}
\\vspace{3pt}
  \\resumeSubHeadingListStart
${eduContent}
  \\resumeSubHeadingListEnd

%-----------TECHNICAL SKILLS-----------
\\section{TECHNICAL SKILLS}
\\vspace{2pt}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
${skillsContent}
    }}
 \\end{itemize}
 \\vspace{-15pt}

%-----------PROJECTS-----------
\\section{PROJECTS}
    \\vspace{-2pt}
    \\resumeSubHeadingListStart

${projectsContent}

    \\resumeSubHeadingListEnd

%-----------EXPERIENCE & TRAINING-----------
\\section{EXPERIENCE \\& TRAINING}
\\vspace{-2pt}
\\resumeSubHeadingListStart
${trainingContent}

\\resumeSubHeadingListEnd
\\vspace{-12pt}

%-----------CERTIFICATIONS-----------
\\section{CERTIFICATIONS}
\\resumeSubHeadingListStart
    \\resumeItemListStart
${certsContent}
    \\resumeItemListEnd
\\resumeSubHeadingListEnd
\\vspace{-15pt}

\\end{document}`;
    }

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
{\\Huge \\bfseries \\color{primary} ${esc(displayName)}} \\\\[4pt]
{\\color{accent} \\bfseries ${esc(displayLocation)}} \\\\[6pt]
\\small ${esc(displayEmail)} $\\cdot$ ${esc(displayPhone)} $\\cdot$ \\href{${esc(displayLinkedin)}}{LinkedIn} $\\cdot$ \\href{${esc(displayGithub)}}{GitHub}
\\end{center}

\\vspace{8pt}

\\section{Education}
${educationList.length > 0 ? educationList.map(e => `\\textbf{${esc(e.school)}} \\hfill ${esc(e.dates)} \\\\ \\textit{${esc(e.degree)}} \\hfill ${esc(e.location)} \\\\[4pt]`).join('\n') : '\\textbf{[University]} \\hfill [Dates] \\\\ \\textit{[Degree]} \\hfill [Location]'}

\\section{Key Skills \\& Competencies}
${skillsList.length > 0 ? skillsList.map(s => `\\textbf{${esc(s.category)}}: ${esc(s.items)} \\\\[2pt]`).join('\n') : '\\textbf{[Skills]}: [Python, SQL, Machine Learning, Problem Solving]'}

\\section{Projects}
${projectsList.length > 0 ? projectsList.map(p => `\\textbf{${esc(p.title)}} (${esc(p.tech)}) \\hfill ${esc(p.date)} \\\\
${(p.bullets || '').split('\n').filter(Boolean).map(b => `$\\bullet$ ${esc(b)}`).join(' \\\\ ')} \\\\[6pt]`).join('\n') : '\\textbf{[Project Title]} ([Tech Stack]) \\hfill [Date] \\\\ $\\bullet$ [Project description]'}

\\section{Certifications}
${certificationsList.length > 0 ? certificationsList.map(c => `$\\bullet$ \\textbf{${esc(c.title)}} -- ${esc(c.issuer)} (${esc(c.date)})`).join(' \\\\ ') : '$\\bullet$ \\textbf{[Certification]} -- [Issuer] ([Date])'}

\\end{document}`;
    }

    // Default: 'mukund_ml' (User's 1st LaTeX Template)
    return `\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{multicol}
\\usepackage{graphicx}
\\setlength{\\multicolsep}{-3.0pt}
\\setlength{\\columnsep}{-1pt}
\\input{glyphtounicode}

\\RequirePackage{tikz}
\\RequirePackage{xcolor}
\\usepackage{tikz}
\\usetikzlibrary{svg.path}

\\definecolor{cvblue}{HTML}{0E5484}
\\definecolor{black}{HTML}{130810}
\\definecolor{darkcolor}{HTML}{0F4539}
\\definecolor{SlateGrey}{HTML}{2E2E2E}
\\definecolor{LightGrey}{HTML}{666666}
\\colorlet{heading}{darkcolor}
\\colorlet{headingrule}{cvblue}

\\addtolength{\\oddsidemargin}{-0.6in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.19in}
\\addtolength{\\topmargin}{-.7in}
\\addtolength{\\textheight}{1.4in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

\\newcommand{\\resumeItem}[1]{
  \\item\\small{{#1 \\vspace{-2pt}}}
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{\\large#1} & \\textbf{\\small #2} \\\\
      \\textit{\\large#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & \\textbf{\\small #2}\\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\newcommand\\sbullet[1][.5]{\\mathbin{\\vcenter{\\hbox{\\scalebox{#1}{$\\bullet$}}}}}

%-------------------------------------------
\\begin{document}

%----------HEADING----------
\\begin{center}
    {\\Huge \\scshape ${esc(displayName)}} \\\\ \\vspace{2pt}
    ${esc(displayLocation)} \\\\ \\vspace{2pt}
    \\small
    \\href{tel:${esc(displayPhone)}}{${esc(displayPhone)}} ~\\$|\\$~
    \\href{mailto:${esc(displayEmail)}}{${esc(displayEmail)}} ~\\$|\\$~
    \\href{${esc(displayLinkedin)}}{LinkedIn} ~\\$|\\$~
    \\href{${esc(displayGithub)}}{GitHub}
\\end{center}
\\vspace{-4mm}

%-----------EDUCATION-----------
\\section{EDUCATION}
\\vspace{3pt}
  \\resumeSubHeadingListStart
${eduContent}
  \\resumeSubHeadingListEnd

%-----------KEY SKILLS-----------
\\section{KEY SKILLS}
\\vspace{2pt}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
${skillsContent}
    }}
 \\end{itemize}
 \\vspace{-15pt}

%-----------PROJECTS-----------
\\section{PROJECTS}
    \\vspace{-2pt}
    \\resumeSubHeadingListStart

${projectsContent}

    \\resumeSubHeadingListEnd

%-----------TRAINING-----------
\\section{TRAINING}
\\vspace{-2pt}
\\resumeSubHeadingListStart
${trainingContent}
\\resumeSubHeadingListEnd
\\vspace{-12pt}

%-----------CERTIFICATIONS-----------
\\section{CERTIFICATIONS}
\\resumeSubHeadingListStart
    \\resumeItemListStart
${certsContent}
    \\resumeItemListEnd
\\resumeSubHeadingListEnd
\\vspace{-15pt}

%-----------ACHIEVEMENTS-----------
\\section{ACHIEVEMENTS}
\\begin{itemize}[leftmargin=0.15in, label={$\\bullet$}, itemsep=1pt]
    \\small{
${achievementsContent}
    }
\\end{itemize}

\\end{document}`;
  }, [template, name, location, phone, email, linkedin, github, educationList, skillsList, projectsList, trainingList, certificationsList, achievementsList]);

  // Copy LaTeX
  const handleCopyLatex = () => {
    navigator.clipboard.writeText(latexCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Download .tex
  const handleDownloadTex = () => {
    const blob = new Blob([latexCode], { type: 'text/x-tex;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(name || 'Resume').replace(/\s+/g, '_')}_Resume.tex`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const latexOnlineUrl = `https://latexonline.cc/compile?text=${encodeURIComponent(latexCode)}`;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ marginTop: '55px', padding: '16px 20px', flex: 1 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          
          {/* Top Header Row - Perfectly Aligned */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            flexWrap: 'nowrap',
            gap: '16px'
          }}>
            <div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1c2427', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileCode className="size-6 text-emerald-500" /> LaTeX Resume Architect
              </h1>
              <p style={{ margin: '2px 0 0', color: '#64748b', fontSize: '0.82rem', fontWeight: 500 }}>
                Form is blank by default -- Upload your resume to autofill, or switch templates dynamically.
              </p>
            </div>

            {/* Header Right Action Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              { (name || educationList.length > 0) && (
                <button
                  onClick={clearForm}
                  style={{
                    background: '#fef2f2',
                    color: '#ef4444',
                    border: '1px solid #fca5a5',
                    borderRadius: '12px',
                    padding: '8px 14px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Trash2 className="size-3.5" /> Clear Form
                </button>
              )}

              {/* Quick Resume Upload Banner */}
              <div style={{
                background: '#ffffff',
                borderRadius: '14px',
                padding: '6px 14px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Sparkles className="size-4 text-amber-500" />
                <div style={{ lineHeight: 1.2 }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1c2427', display: 'block' }}>Magic Resume Autofill</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Parse PDF / DOCX to Form</span>
                </div>
                <label style={{
                  background: '#1c2427',
                  color: '#ffffff',
                  padding: '7px 14px',
                  borderRadius: '10px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap'
                }}>
                  <Upload className="size-3.5" /> Upload Resume
                  <input type="file" onChange={handleAutofillUpload} accept=".pdf,.docx,.txt" style={{ display: 'none' }} />
                </label>
              </div>
            </div>
          </div>

          {/* Status Message Notification */}
          {statusMsg && (
            <div style={{
              background: '#ecfdf5',
              border: '1px solid #10b981',
              color: '#065f46',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: 600,
              marginBottom: '12px'
            }}>
              {statusMsg}
            </div>
          )}

          {/* MAIN 2-COLUMN GRID (Top Aligned Flush) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'stretch' }}>

            {/* LEFT COLUMN: CONTROLS & FORM TABS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
              
              {/* Template Selector Card (Top of Left Column) */}
              <div style={{
                background: '#ffffff',
                borderRadius: '18px',
                padding: '12px 16px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                border: '1px solid #e2e8f0'
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Select LaTeX Resume Template
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {[
                    { id: 'mukund_ml', name: 'Data & ML Specialist', tag: 'ATS Standard' },
                    { id: 'abey_classic', name: 'Classic Tech', tag: 'Software Engineer' },
                    { id: 'executive', name: 'Executive Modern', tag: 'Corporate Lead' },
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
                          borderRadius: '12px',
                          padding: '8px 6px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <strong style={{ fontSize: '0.8rem', display: 'block' }}>{t.name}</strong>
                        <span style={{ fontSize: '0.65rem', color: isSelected ? '#10b981' : '#64748b', fontWeight: 600 }}>{t.tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Input Card (Middle of Left Column) */}
              <div style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '16px 20px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                border: '1px solid #e2e8f0',
                flex: 1
              }}>

                {/* Form Navigation Tabs (Dynamic according to selected template) */}
                <div style={{
                  display: 'flex',
                  gap: '6px',
                  overflowX: 'auto',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #f1f5f9',
                  marginBottom: '14px'
                }}>
                  {activeTabsList.map(tab => {
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
                          borderRadius: '10px',
                          padding: '8px 12px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.2s'
                        }}
                      >
                        <Icon className="size-3.5" /> {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* TAB 1: PERSONAL DETAILS */}
                {activeTab === 'personal' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Full Name</label>
                      <input type="text" placeholder="e.g. John Doe" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Location / City, State</label>
                      <input type="text" placeholder="e.g. New York, NY" value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Phone Number</label>
                        <input type="text" placeholder="+1-555-0199" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Email Address</label>
                        <input type="email" placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>LinkedIn URL</label>
                        <input type="text" placeholder="linkedin.com/in/username" value={linkedin} onChange={e => setLinkedin(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>GitHub URL</label>
                        <input type="text" placeholder="github.com/username" value={github} onChange={e => setGithub(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: EDUCATION */}
                {activeTab === 'education' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {educationList.map((edu, idx) => (
                      <div key={idx} style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1c2427' }}>Education #{idx + 1}</span>
                          <button onClick={() => setEducationList(educationList.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                          <input type="text" placeholder="School / University" value={edu.school} onChange={e => { const list = [...educationList]; list[idx].school = e.target.value; setEducationList(list); }} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                          <input type="text" placeholder="Location" value={edu.location} onChange={e => { const list = [...educationList]; list[idx].location = e.target.value; setEducationList(list); }} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                          <input type="text" placeholder="Degree / Marks" value={edu.degree} onChange={e => { const list = [...educationList]; list[idx].degree = e.target.value; setEducationList(list); }} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                          <input type="text" placeholder="Dates (e.g. Aug 2023 -- Present)" value={edu.dates} onChange={e => { const list = [...educationList]; list[idx].dates = e.target.value; setEducationList(list); }} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                        </div>
                      </div>
                    ))}
                    <button onClick={() => setEducationList([...educationList, { school: '', location: '', degree: '', dates: '' }])} style={{ background: '#f1f5f9', color: '#1c2427', border: '1px stroke #cbd5e1', borderRadius: '10px', padding: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <Plus className="size-3.5" /> Add Education Row
                    </button>
                  </div>
                )}

                {/* TAB 3: SKILLS */}
                {activeTab === 'skills' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {skillsList.map((skill, idx) => (
                      <div key={idx} style={{ background: '#f8fafc', padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <input type="text" placeholder="Skill Category Name (e.g. Machine Learning)" value={skill.category} onChange={e => { const list = [...skillsList]; list[idx].category = e.target.value; setSkillsList(list); }} style={{ fontWeight: 700, color: '#1c2427', background: 'transparent', border: 'none', fontSize: '0.85rem', width: '80%' }} />
                          <button onClick={() => setSkillsList(skillsList.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                        <textarea rows="2" placeholder="Items (comma separated: Python, TensorFlow, PyTorch)" value={skill.items} onChange={e => { const list = [...skillsList]; list[idx].items = e.target.value; setSkillsList(list); }} style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                      </div>
                    ))}
                    <button onClick={() => setSkillsList([...skillsList, { category: '', items: '' }])} style={{ background: '#f1f5f9', color: '#1c2427', border: '1px stroke #cbd5e1', borderRadius: '10px', padding: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <Plus className="size-3.5" /> Add Skill Category
                    </button>
                  </div>
                )}

                {/* TAB 4: PROJECTS */}
                {activeTab === 'projects' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {projectsList.map((proj, idx) => (
                      <div key={idx} style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1c2427' }}>Project #{idx + 1}</span>
                          <button onClick={() => setProjectsList(projectsList.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                        <input type="text" placeholder="Project Title" value={proj.title} onChange={e => { const list = [...projectsList]; list[idx].title = e.target.value; setProjectsList(list); }} style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', marginBottom: '6px' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '6px' }}>
                          <input type="text" placeholder="GitHub Link" value={proj.link} onChange={e => { const list = [...projectsList]; list[idx].link = e.target.value; setProjectsList(list); }} style={{ padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.78rem' }} />
                          <input type="text" placeholder="Tech Stack" value={proj.tech} onChange={e => { const list = [...projectsList]; list[idx].tech = e.target.value; setProjectsList(list); }} style={{ padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.78rem' }} />
                          <input type="text" placeholder="Date" value={proj.date} onChange={e => { const list = [...projectsList]; list[idx].date = e.target.value; setProjectsList(list); }} style={{ padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.78rem' }} />
                        </div>
                        <textarea rows="3" placeholder="Bullet points (1 per line)" value={proj.bullets} onChange={e => { const list = [...projectsList]; list[idx].bullets = e.target.value; setProjectsList(list); }} style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.78rem' }} />
                      </div>
                    ))}
                    <button onClick={() => setProjectsList([...projectsList, { title: '', link: '', tech: '', date: '', bullets: '' }])} style={{ background: '#f1f5f9', color: '#1c2427', border: '1px stroke #cbd5e1', borderRadius: '10px', padding: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <Plus className="size-3.5" /> Add Project
                    </button>
                  </div>
                )}

                {/* TAB 5: TRAINING / EXPERIENCE */}
                {activeTab === 'training' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {trainingList.map((tr, idx) => (
                      <div key={idx} style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1c2427' }}>Training / Experience #{idx + 1}</span>
                          <button onClick={() => setTrainingList(trainingList.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '6px' }}>
                          <input type="text" placeholder="Training / Position Title" value={tr.title} onChange={e => { const list = [...trainingList]; list[idx].title = e.target.value; setTrainingList(list); }} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                          <input type="text" placeholder="Date (e.g. Jun 2025)" value={tr.date} onChange={e => { const list = [...trainingList]; list[idx].date = e.target.value; setTrainingList(list); }} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '6px' }}>
                          <input type="text" placeholder="Project / Subtitle" value={tr.projectTitle} onChange={e => { const list = [...trainingList]; list[idx].projectTitle = e.target.value; setTrainingList(list); }} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                          <input type="text" placeholder="Tech Stack" value={tr.tech} onChange={e => { const list = [...trainingList]; list[idx].tech = e.target.value; setTrainingList(list); }} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                        </div>
                        <textarea rows="3" placeholder="Description Bullets (1 per line)" value={tr.bullets} onChange={e => { const list = [...trainingList]; list[idx].bullets = e.target.value; setTrainingList(list); }} style={{ width: '100%', padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.78rem' }} />
                      </div>
                    ))}
                    <button onClick={() => setTrainingList([...trainingList, { title: '', date: '', link: '', projectTitle: '', tech: '', bullets: '' }])} style={{ background: '#f1f5f9', color: '#1c2427', border: '1px stroke #cbd5e1', borderRadius: '10px', padding: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <Plus className="size-3.5" /> Add Training / Experience
                    </button>
                  </div>
                )}

                {/* TAB 6: CERTIFICATIONS & ACHIEVEMENTS */}
                {activeTab === 'certifications' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1c2427', marginBottom: '8px' }}>Certifications</h3>
                      {certificationsList.map((cert, idx) => (
                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr auto', gap: '6px', marginBottom: '6px' }}>
                          <input type="text" placeholder="Certification Name" value={cert.title} onChange={e => { const list = [...certificationsList]; list[idx].title = e.target.value; setCertificationsList(list); }} style={{ padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.78rem' }} />
                          <input type="text" placeholder="Issuer / Organization" value={cert.issuer} onChange={e => { const list = [...certificationsList]; list[idx].issuer = e.target.value; setCertificationsList(list); }} style={{ padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.78rem' }} />
                          <input type="text" placeholder="Date" value={cert.date} onChange={e => { const list = [...certificationsList]; list[idx].date = e.target.value; setCertificationsList(list); }} style={{ padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.78rem' }} />
                          <button onClick={() => setCertificationsList(certificationsList.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      ))}
                      <button onClick={() => setCertificationsList([...certificationsList, { title: '', issuer: '', date: '' }])} style={{ background: '#f1f5f9', color: '#1c2427', border: 'none', borderRadius: '8px', padding: '6px 10px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Plus className="size-3" /> Add Certification
                      </button>
                    </div>

                    {template === 'mukund_ml' && (
                      <div>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1c2427', marginBottom: '8px' }}>Key Achievements (1 per line)</h3>
                        <textarea rows="3" placeholder="Bullet points of key accomplishments" value={achievementsList.join('\n')} onChange={e => setAchievementsList(e.target.value.split('\n').filter(Boolean))} style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }} />
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Action Bar (Down Side - Copy LaTeX, Download .tex, Open Overleaf) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <button
                  onClick={handleCopyLatex}
                  style={{
                    background: isCopied ? '#10b981' : '#1c2427',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '10px 8px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 8px rgba(28,36,39,0.08)'
                  }}
                >
                  {isCopied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  {isCopied ? 'Copied!' : 'Copy LaTeX'}
                </button>

                <button
                  onClick={handleDownloadTex}
                  style={{
                    background: '#3b82f6',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '10px 8px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 8px rgba(59,130,246,0.15)'
                  }}
                >
                  <Download className="size-3.5" /> Download .tex
                </button>

                <a
                  href="https://www.overleaf.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#f5c35c',
                    color: '#1c2427',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '10px 8px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(245,195,92,0.15)'
                  }}
                >
                  <ExternalLink className="size-3.5" /> Open Overleaf
                </a>
              </div>

              {/* Online Preview Link Banner (Down Side) */}
              <div style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '12px',
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.78rem', color: '#1e40af', fontWeight: 600 }}>
                  Render & Preview Live PDF Online:
                </span>
                <a
                  href={latexOnlineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#2563eb',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    textDecoration: 'underline'
                  }}
                >
                  Compile PDF Online <ExternalLink className="size-3" />
                </a>
              </div>

            </div>

            {/* RIGHT COLUMN: GENERATED LATEX CODE CONTAINER (Aligned Flush to Left Column) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
              <div style={{
                background: '#1c2427',
                borderRadius: '20px',
                padding: '16px',
                color: '#e2e8f0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f5c35c', fontFamily: 'monospace' }}>
                    {template === 'abey_classic' ? 'classic_tech_resume.tex' : template === 'executive' ? 'executive_resume.tex' : 'data_ml_specialist_resume.tex'}
                  </span>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '6px', color: '#94a3b8' }}>
                    LaTeX Source Code
                  </span>
                </div>

                <pre style={{
                  background: '#141a1c',
                  borderRadius: '12px',
                  padding: '12px',
                  fontFamily: 'Consolas, Monaco, "Fira Code", monospace',
                  fontSize: '0.76rem',
                  lineHeight: 1.45,
                  flex: 1,
                  minHeight: '620px',
                  maxHeight: '760px',
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
