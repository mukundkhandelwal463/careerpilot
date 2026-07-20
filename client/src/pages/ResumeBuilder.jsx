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

  // Personal Info
  const [name, setName] = useState('Mukund Khandelwal');
  const [location, setLocation] = useState('Dausa, Rajasthan');
  const [phone, setPhone] = useState('+91-6376447286');
  const [email, setEmail] = useState('mukundkhandelwal463@gmail.com');
  const [linkedin, setLinkedin] = useState('https://www.linkedin.com/in/mukund463/');
  const [github, setGithub] = useState('https://github.com/mukundkhandelwal463');

  // Education
  const [educationList, setEducationList] = useState([
    { school: 'Lovely Professional University', location: 'Phagwara, Punjab', degree: 'B.Tech -- Computer Science and Engineering | CGPA: 7.69', dates: 'Aug 2023 -- Present' },
    { school: 'Genius Public School', location: 'Dausa, Rajasthan', degree: 'Intermediate | Percentage: 65%', dates: 'Apr 2022 -- Mar 2023' },
    { school: 'Shekhawati Public School', location: 'Dausa, Rajasthan', degree: 'Matriculation | Percentage: 91%', dates: 'Apr 2020 -- Mar 2021' }
  ]);

  // Key Skills
  const [skillsList, setSkillsList] = useState([
    { category: 'Data Analysis & Validation', items: 'Anomaly Detection, Outlier Identification, Data Consistency Checks, Sanity Testing, Root Cause Analysis' },
    { category: 'Machine Learning & AI', items: 'Scikit-learn, Random Forest, SVM, Naive Bayes, TF-IDF, Cosine Similarity, imbalanced-learn' },
    { category: 'Statistical Analysis', items: 'Descriptive Statistics, Trend Analysis, EDA, SciPy, NumPy, Feature Engineering' },
    { category: 'Programming & Tools', items: 'Python, Pandas, Matplotlib, Seaborn, SQL, Joblib, Streamlit, Git, GitHub' },
    { category: 'Reporting & BI', items: 'Power BI, DAX, Power Query, MS Excel, Pivot Tables, KPI Dashboards, Data Storytelling' }
  ]);

  // Projects
  const [projectsList, setProjectsList] = useState([
    {
      title: 'Resume Analyzer & Job Recommendation',
      link: 'https://github.com/mukundkhandelwal463',
      tech: 'Flask, spaCy, Scikit-learn, MySQL, TF-IDF',
      date: 'Jan 2026',
      bullets: 'Developed an AI-powered data validation and classification system using Flask -- applied NLP-based pipelines (spaCy, Regex, TF-IDF, cosine similarity) to extract, parse, and validate data consistency across PDF/DOCX/TXT formats, directly mirroring equipment data validation workflows.\nTrained and evaluated ML models (SVM, Naive Bayes) for accurate data classification and anomaly identification -- achieving high-precision candidate profiling through rule-based and statistical approaches.\nImplemented ATS scoring rules to systematically validate entries against established benchmarks, detect irregular patterns, and produce structured validation reports for decision-making.'
    },
    {
      title: 'Accident Prediction With Pipeline',
      link: 'https://github.com/mukundkhandelwal463/Accident-Prediction-With-Pipeline',
      tech: 'Python, Scikit-learn, Streamlit, imbalanced-learn',
      date: 'Apr 2025',
      bullets: 'Built an end-to-end ML validation pipeline using Scikit-learn -- applied preprocessing, categorical encoding, and class balancing via RandomOverSampler to handle data irregularities and ensure integrity before model training.\nLeveraged Random Forest Classifier with statistical analysis to detect and classify incorrect data entries, identify anomalies, and reason out root causes of outliers across multiple input parameters.\nDeployed a Streamlit web app enabling real-time data input validation and severity prediction, demonstrating ability to operationalize data verification rules for live use cases.'
    },
    {
      title: 'Data-Driven Sales Analytics Dashboard',
      link: 'https://github.com/mukundkhandelwal463/Advance_sales_Dashboard',
      tech: 'Microsoft Excel, Power BI, Power Query, DAX',
      date: 'May 2025',
      bullets: 'Performed data cleaning, transformation, and validation across raw sales datasets using Power Query -- applied consistency checks, detected anomalies, and ensured data accuracy before KPI modeling.\nMonitored historical trends in revenue, profit, and order data using DAX measures -- identified unusual data deflections and irregularities through dynamic trend analysis across time periods.\nDesigned interactive dashboards with slicer-based filtering to enable real-time cross-validation of data across regions, categories, and customer segments for strategic reporting.'
    }
  ]);

  // Training / Experience
  const [trainingList, setTrainingList] = useState([
    {
      title: 'Data Science & Business Intelligence Training',
      date: 'Jun 2025',
      link: 'https://github.com/mukundkhandelwal463',
      projectTitle: 'Wine Quality Prediction System',
      tech: 'Python, SQL, Power BI, Scikit-learn',
      bullets: 'Performed comprehensive EDA and statistical analysis on wine quality data -- applied feature engineering to identify key parameters (alcohol, density, acidity) influencing quality, and built sanity checks and test cases to validate data against expected ballpark ranges.\nTrained Logistic Regression and Random Forest models achieving 81% accuracy and 0.79 F1-score -- used outlier detection and root cause analysis to refine data quality and improve model reliability.'
    }
  ]);

  // Certifications
  const [certificationsList, setCertificationsList] = useState([
    { title: 'Machine Learning & Data Science', issuer: 'GeeksforGeeks / Nation SkillUp', date: 'Jan 2026' },
    { title: 'Data Structures and Algorithms', issuer: 'Apna College', date: 'Jun 2026' },
    { title: 'Cloud Computing', issuer: 'NPTEL', date: 'Jun 2025' },
    { title: 'Data Visualization / Empowering Business', issuer: 'Tata Forage', date: 'Jun 2025' }
  ]);

  // Achievements
  const [achievementsList, setAchievementsList] = useState([
    'Built 4+ end-to-end ML and data validation pipelines independently -- covering anomaly detection, outlier analysis, and statistical validation across real-world datasets.',
    'Netflix Movies Analysis Dashboard received 4 GitHub Stars, reflecting quality of data analysis and visualization.',
    'Achieved 91% in Matriculation; maintaining CGPA of 7.69 in B.Tech CSE at LPU.',
    'Solved 200+ problems on LeetCode and GeeksforGeeks, demonstrating strong analytical and problem-solving skills.'
  ]);

  // Status
  const [isCopied, setIsCopied] = useState(false);
  const [isAutofilling, setIsAutofilling] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Handle Upload Auto-parse
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
        if (pd.email) setEmail(pd.email);
        if (pd.phone) setPhone(pd.phone);
        if (pd.location) setLocation(pd.location);
        if (pd.linkedin) setLinkedin(pd.linkedin);
        if (pd.github) setGithub(pd.github);
        setStatusMsg('Resume data extracted successfully into LaTeX Architect!');
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

  // Generate Dynamic LaTeX Code
  const latexCode = useMemo(() => {
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
    {\\Huge \\scshape ${esc(name)}} \\\\ \\vspace{2pt}
    ${esc(location)} \\\\ \\vspace{2pt}
    \\small
    \\href{tel:${esc(phone)}}{${esc(phone)}} ~\\$|\\$~
    \\href{mailto:${esc(email)}}{${esc(email)}} ~\\$|\\$~
    \\href{${esc(linkedin)}}{LinkedIn} ~\\$|\\$~
    \\href{${esc(github)}}{GitHub}
\\end{center}
\\vspace{3mm}

%-----------EDUCATION-----------
\\section{EDUCATION}
\\vspace{3pt}
  \\resumeSubHeadingListStart
${educationList.map(e => `    \\resumeSubheading
      {${esc(e.school)}}{${esc(e.location)}}
      {${esc(e.degree)}}{${esc(e.dates)}}`).join('\n')}
  \\resumeSubHeadingListEnd

%-----------TECHNICAL SKILLS-----------
\\section{TECHNICAL SKILLS}
\\vspace{2pt}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
${skillsList.map(s => `     \\textbf{\\normalsize{${esc(s.category)}:}}{\\normalsize{ ${esc(s.items)}}} \\\\`).join('\n')}
    }}
 \\end{itemize}
 \\vspace{-15pt}

%-----------PROJECTS-----------
\\section{PROJECTS}
    \\vspace{-2pt}
    \\resumeSubHeadingListStart

${projectsList.map(p => `      \\resumeProjectHeading
          {\\href{${esc(p.link)}}{\\textbf{\\large{${esc(p.title)}}}} $|$ \\large{${esc(p.tech)}}}{${esc(p.date)}}
          \\resumeItemListStart
${p.bullets.split('\n').filter(Boolean).map(b => `            \\resumeItem{\\normalsize{${esc(b)}}}`).join('\n')}
          \\resumeItemListEnd
          \\vspace{-18pt}`).join('\n')}

    \\resumeSubHeadingListEnd

%-----------EXPERIENCE & TRAINING-----------
\\section{EXPERIENCE \\& TRAINING}
\\vspace{-2pt}
\\resumeSubHeadingListStart
${trainingList.map(t => `  \\resumeSubheading
    {${esc(t.title)}}{${esc(t.date)}}
    {}{}
  \\vspace{-5pt}

  \\resumeProjectHeading
      {\\href{${esc(t.link)}}{\\textbf{\\large{${esc(t.projectTitle)}}}} $|$ \\large{${esc(t.tech)}}}{${esc(t.date)}}
      \\resumeItemListStart
${t.bullets.split('\n').filter(Boolean).map(b => `        \\resumeItem{\\normalsize{${esc(b)}}}`).join('\n')}
      \\resumeItemListEnd`).join('\n')}

\\resumeSubHeadingListEnd
\\vspace{-12pt}

%-----------CERTIFICATIONS-----------
\\section{CERTIFICATIONS}
\\resumeSubHeadingListStart
    \\resumeItemListStart
${certificationsList.map(c => `        \\resumeItem{\\normalsize{${esc(c.title)} -- \\textbf{(${esc(c.issuer)})} \\hfill \\textbf{${esc(c.date)}}}}`).join('\n')}
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
{\\Huge \\bfseries \\color{primary} ${esc(name)}} \\\\[4pt]
{\\color{accent} \\bfseries ${esc(location)}} \\\\[6pt]
\\small ${esc(email)} $\\cdot$ ${esc(phone)} $\\cdot$ \\href{${esc(linkedin)}}{LinkedIn} $\\cdot$ \\href{${esc(github)}}{GitHub}
\\end{center}

\\vspace{8pt}

\\section{Education}
${educationList.map(e => `\\textbf{${esc(e.school)}} \\hfill ${esc(e.dates)} \\\\ \\textit{${esc(e.degree)}} \\hfill ${esc(e.location)} \\\\[4pt]`).join('\n')}

\\section{Key Skills \\& Competencies}
${skillsList.map(s => `\\textbf{${esc(s.category)}}: ${esc(s.items)} \\\\[2pt]`).join('\n')}

\\section{Projects}
${projectsList.map(p => `\\textbf{${esc(p.title)}} (${esc(p.tech)}) \\hfill ${esc(p.date)} \\\\
${p.bullets.split('\n').filter(Boolean).map(b => `$\\bullet$ ${esc(b)}`).join(' \\\\ ')} \\\\[6pt]`).join('\n')}

\\section{Certifications}
${certificationsList.map(c => `$\\bullet$ \\textbf{${esc(c.title)}} -- ${esc(c.issuer)} (${esc(c.date)})`).join(' \\\\ ')}

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
    {\\Huge \\scshape ${esc(name)}} \\\\ \\vspace{2pt}
    ${esc(location)} \\\\ \\vspace{2pt}
    \\small
    \\href{tel:${esc(phone)}}{${esc(phone)}} ~\\$|\\$~
    \\href{mailto:${esc(email)}}{${esc(email)}} ~\\$|\\$~
    \\href{${esc(linkedin)}}{LinkedIn} ~\\$|\\$~
    \\href{${esc(github)}}{GitHub}
\\end{center}
\\vspace{-4mm}

%-----------EDUCATION-----------
\\section{EDUCATION}
\\vspace{3pt}
  \\resumeSubHeadingListStart
${educationList.map(e => `    \\resumeSubheading
      {${esc(e.school)}}{${esc(e.location)}}
      {${esc(e.degree)}}{${esc(e.dates)}}`).join('\n')}
  \\resumeSubHeadingListEnd

%-----------KEY SKILLS-----------
\\section{KEY SKILLS}
\\vspace{2pt}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
${skillsList.map(s => `     \\textbf{\\normalsize{${esc(s.category)}:}}{\\normalsize{ ${esc(s.items)}}} \\\\`).join('\n')}
    }}
 \\end{itemize}
 \\vspace{-15pt}

%-----------PROJECTS-----------
\\section{PROJECTS}
    \\vspace{-2pt}
    \\resumeSubHeadingListStart

${projectsList.map(p => `      \\resumeProjectHeading
          {\\href{${esc(p.link)}}{\\textbf{\\large{${esc(p.title)}}}} $|$ \\large{${esc(p.tech)}}}{${esc(p.date)}}
          \\resumeItemListStart
${p.bullets.split('\n').filter(Boolean).map(b => `            \\resumeItem{\\normalsize{${esc(b)}}}`).join('\n')}
          \\resumeItemListEnd
          \\vspace{-18pt}`).join('\n')}

    \\resumeSubHeadingListEnd

%-----------TRAINING-----------
\\section{TRAINING}
\\vspace{-2pt}
\\resumeSubHeadingListStart
${trainingList.map(t => `  \\resumeSubheading
    {${esc(t.title)}}{${esc(t.date)}}
    {}{}
  \\vspace{-25pt}
  \\begin{itemize}[leftmargin=0.15in, label={}]
    \\resumeProjectHeading
        {\\href{${esc(t.link)}}{\\textbf{\\large{${esc(t.projectTitle)}}}} $|$ \\large{${esc(t.tech)}}}{}
        \\resumeItemListStart
${t.bullets.split('\n').filter(Boolean).map(b => `          \\resumeItem{\\normalsize{${esc(b)}}}`).join('\n')}
        \\resumeItemListEnd
  \\end{itemize}`).join('\n')}
\\resumeSubHeadingListEnd
\\vspace{-12pt}

%-----------CERTIFICATIONS-----------
\\section{CERTIFICATIONS}
\\resumeSubHeadingListStart
    \\resumeItemListStart
${certificationsList.map(c => `        \\resumeItem{\\normalsize{${esc(c.title)} -- \\textbf{(${esc(c.issuer)})} \\hfill \\textbf{${esc(c.date)}}}}`).join('\n')}
    \\resumeItemListEnd
\\resumeSubHeadingListEnd
\\vspace{-15pt}

%-----------ACHIEVEMENTS-----------
\\section{ACHIEVEMENTS}
\\begin{itemize}[leftmargin=0.15in, label={$\\bullet$}, itemsep=1pt]
    \\small{
${achievementsList.map(a => `    \\item ${esc(a)}`).join('\n')}
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
    a.download = `${name.replace(/\s+/g, '_')}_Resume.tex`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const latexOnlineUrl = `https://latexonline.cc/compile?text=${encodeURIComponent(latexCode)}`;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ marginTop: '70px', padding: '32px 24px', flex: 1 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          
          {/* Title Header */}
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
                Build & Customize your authentic LaTeX resume code with 3 specialized templates & live compile links.
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
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1c2427', display: 'block' }}>Magic Resume Autofill</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Parse PDF / DOCX to Form</span>
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

            {/* LEFT COLUMN: CONTROLS & FORM TABS */}
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
                  Select LaTeX Resume Template
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
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
                          borderRadius: '16px',
                          padding: '12px 8px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <strong style={{ fontSize: '0.82rem', display: 'block' }}>{t.name}</strong>
                        <span style={{ fontSize: '0.68rem', color: isSelected ? '#10b981' : '#64748b', fontWeight: 600 }}>{t.tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Bar (Copy LaTeX, Download .tex, Open Overleaf) */}
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
                  Render & Preview Live PDF Online:
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

              {/* Form Input Card */}
              <div style={{
                background: '#ffffff',
                borderRadius: '28px',
                padding: '28px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                border: '1px solid #e2e8f0'
              }}>

                {/* Form Navigation Tabs */}
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
                    { id: 'education', label: 'Education', icon: GraduationCap },
                    { id: 'skills', label: 'Skills', icon: Code2 },
                    { id: 'projects', label: 'Projects', icon: Briefcase },
                    { id: 'training', label: 'Training', icon: Award },
                    { id: 'certifications', label: 'Certs & Wins', icon: Trophy },
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
                          padding: '10px 14px',
                          fontSize: '0.82rem',
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
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Full Name</label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Location / City, State</label>
                      <input type="text" value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Phone Number</label>
                        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>LinkedIn URL</label>
                        <input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>GitHub URL</label>
                        <input type="text" value={github} onChange={e => setGithub(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: EDUCATION */}
                {activeTab === 'education' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {educationList.map((edu, idx) => (
                      <div key={idx} style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1c2427' }}>Education #{idx + 1}</span>
                          {educationList.length > 1 && (
                            <button onClick={() => setEducationList(educationList.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                              <Trash2 className="size-4" />
                            </button>
                          )}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                          <input type="text" placeholder="School / University" value={edu.school} onChange={e => { const list = [...educationList]; list[idx].school = e.target.value; setEducationList(list); }} style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                          <input type="text" placeholder="Location" value={edu.location} onChange={e => { const list = [...educationList]; list[idx].location = e.target.value; setEducationList(list); }} style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <input type="text" placeholder="Degree / Marks" value={edu.degree} onChange={e => { const list = [...educationList]; list[idx].degree = e.target.value; setEducationList(list); }} style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                          <input type="text" placeholder="Dates (e.g. Aug 2023 -- Present)" value={edu.dates} onChange={e => { const list = [...educationList]; list[idx].dates = e.target.value; setEducationList(list); }} style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                        </div>
                      </div>
                    ))}
                    <button onClick={() => setEducationList([...educationList, { school: '', location: '', degree: '', dates: '' }])} style={{ background: '#f1f5f9', color: '#1c2427', border: '1px stroke #cbd5e1', borderRadius: '12px', padding: '10px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <Plus className="size-4" /> Add Education Row
                    </button>
                  </div>
                )}

                {/* TAB 3: SKILLS */}
                {activeTab === 'skills' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {skillsList.map((skill, idx) => (
                      <div key={idx} style={{ background: '#f8fafc', padding: '14px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <input type="text" placeholder="Skill Category Name" value={skill.category} onChange={e => { const list = [...skillsList]; list[idx].category = e.target.value; setSkillsList(list); }} style={{ fontWeight: 700, color: '#1c2427', background: 'transparent', border: 'none', fontSize: '0.9rem', width: '80%' }} />
                          {skillsList.length > 1 && (
                            <button onClick={() => setSkillsList(skillsList.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                              <Trash2 className="size-4" />
                            </button>
                          )}
                        </div>
                        <textarea rows="2" placeholder="Items (comma separated)" value={skill.items} onChange={e => { const list = [...skillsList]; list[idx].items = e.target.value; setSkillsList(list); }} style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                      </div>
                    ))}
                    <button onClick={() => setSkillsList([...skillsList, { category: '', items: '' }])} style={{ background: '#f1f5f9', color: '#1c2427', border: '1px stroke #cbd5e1', borderRadius: '12px', padding: '10px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <Plus className="size-4" /> Add Skill Category
                    </button>
                  </div>
                )}

                {/* TAB 4: PROJECTS */}
                {activeTab === 'projects' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {projectsList.map((proj, idx) => (
                      <div key={idx} style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1c2427' }}>Project #{idx + 1}</span>
                          {projectsList.length > 1 && (
                            <button onClick={() => setProjectsList(projectsList.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                              <Trash2 className="size-4" />
                            </button>
                          )}
                        </div>
                        <input type="text" placeholder="Project Title" value={proj.title} onChange={e => { const list = [...projectsList]; list[idx].title = e.target.value; setProjectsList(list); }} style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem', marginBottom: '8px' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                          <input type="text" placeholder="GitHub Link" value={proj.link} onChange={e => { const list = [...projectsList]; list[idx].link = e.target.value; setProjectsList(list); }} style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                          <input type="text" placeholder="Tech Stack" value={proj.tech} onChange={e => { const list = [...projectsList]; list[idx].tech = e.target.value; setProjectsList(list); }} style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                          <input type="text" placeholder="Date" value={proj.date} onChange={e => { const list = [...projectsList]; list[idx].date = e.target.value; setProjectsList(list); }} style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                        </div>
                        <textarea rows="4" placeholder="Bullet points (1 per line)" value={proj.bullets} onChange={e => { const list = [...projectsList]; list[idx].bullets = e.target.value; setProjectsList(list); }} style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                      </div>
                    ))}
                    <button onClick={() => setProjectsList([...projectsList, { title: '', link: '', tech: '', date: '', bullets: '' }])} style={{ background: '#f1f5f9', color: '#1c2427', border: '1px stroke #cbd5e1', borderRadius: '12px', padding: '10px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <Plus className="size-4" /> Add Project
                    </button>
                  </div>
                )}

                {/* TAB 5: TRAINING */}
                {activeTab === 'training' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {trainingList.map((tr, idx) => (
                      <div key={idx} style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
                          <input type="text" placeholder="Training Program Title" value={tr.title} onChange={e => { const list = [...trainingList]; list[idx].title = e.target.value; setTrainingList(list); }} style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                          <input type="text" placeholder="Date (e.g. Jun 2025)" value={tr.date} onChange={e => { const list = [...trainingList]; list[idx].date = e.target.value; setTrainingList(list); }} style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
                          <input type="text" placeholder="Project Title in Training" value={tr.projectTitle} onChange={e => { const list = [...trainingList]; list[idx].projectTitle = e.target.value; setTrainingList(list); }} style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                          <input type="text" placeholder="Tech Stack" value={tr.tech} onChange={e => { const list = [...trainingList]; list[idx].tech = e.target.value; setTrainingList(list); }} style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                        </div>
                        <textarea rows="3" placeholder="Description Bullets (1 per line)" value={tr.bullets} onChange={e => { const list = [...trainingList]; list[idx].bullets = e.target.value; setTrainingList(list); }} style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 6: CERTIFICATIONS & ACHIEVEMENTS */}
                {activeTab === 'certifications' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1c2427', marginBottom: '10px' }}>Certifications</h3>
                      {certificationsList.map((cert, idx) => (
                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr auto', gap: '8px', marginBottom: '8px' }}>
                          <input type="text" placeholder="Certification Name" value={cert.title} onChange={e => { const list = [...certificationsList]; list[idx].title = e.target.value; setCertificationsList(list); }} style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                          <input type="text" placeholder="Issuer / Organization" value={cert.issuer} onChange={e => { const list = [...certificationsList]; list[idx].issuer = e.target.value; setCertificationsList(list); }} style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                          <input type="text" placeholder="Date" value={cert.date} onChange={e => { const list = [...certificationsList]; list[idx].date = e.target.value; setCertificationsList(list); }} style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }} />
                          {certificationsList.length > 1 && (
                            <button onClick={() => setCertificationsList(certificationsList.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                              <Trash2 className="size-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button onClick={() => setCertificationsList([...certificationsList, { title: '', issuer: '', date: '' }])} style={{ background: '#f1f5f9', color: '#1c2427', border: 'none', borderRadius: '10px', padding: '8px 14px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Plus className="size-3.5" /> Add Certification
                      </button>
                    </div>

                    <div>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1c2427', marginBottom: '10px' }}>Key Achievements (1 per line)</h3>
                      <textarea rows="4" value={achievementsList.join('\n')} onChange={e => setAchievementsList(e.target.value.split('\n').filter(Boolean))} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* RIGHT COLUMN: GENERATED LATEX CODE CONTAINER */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                background: '#1c2427',
                borderRadius: '24px',
                padding: '20px',
                color: '#e2e8f0',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f5c35c', fontFamily: 'monospace' }}>
                    {template === 'abey_classic' ? 'classic_tech_resume.tex' : template === 'executive' ? 'executive_resume.tex' : 'data_ml_specialist_resume.tex'}
                  </span>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '6px', color: '#94a3b8' }}>
                    LaTeX Source Code
                  </span>
                </div>

                <pre style={{
                  background: '#141a1c',
                  borderRadius: '14px',
                  padding: '16px',
                  fontFamily: 'Consolas, Monaco, "Fira Code", monospace',
                  fontSize: '0.78rem',
                  lineHeight: 1.5,
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
