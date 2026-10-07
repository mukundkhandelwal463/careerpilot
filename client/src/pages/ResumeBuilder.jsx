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
  Trash2,
  Target,
  BarChart3,
  Lightbulb,
  Search,
  Loader2,
  FileText,
  RefreshCw,
  Edit3
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

const DEFAULT_STREAM_KEYWORDS = [
  'Scikit-learn', 'Random Forest', 'PyTorch', 'TF-IDF', 'NLP Pipelines', 
  'Feature Engineering', 'EDA', 'Outlier Detection', 'Model Deployment', 
  'Cosine Similarity', 'Pandas', 'SciPy'
];

// Rich, Production-Grade Sample Resumes tailored to each template
const SAMPLE_RESUMES = {
  mukund_ml: {
    stream: 'Data Science & Machine Learning',
    name: 'Alex Morgan',
    location: 'San Francisco, CA',
    phone: '+1 (555) 234-5678',
    email: 'alex.morgan@example.com',
    linkedin: 'https://linkedin.com/in/alexmorgan-ai',
    github: 'https://github.com/alexmorgan-ml',
    educationList: [
      {
        school: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        degree: 'B.S. in Computer Science & Data Science (GPA: 3.88 / 4.0)',
        dates: 'Aug 2021 -- May 2025'
      }
    ],
    skillsList: [
      { category: 'Machine Learning & AI', items: 'PyTorch, Scikit-learn, TensorFlow, Hugging Face, Transformers, NLP Pipelines, Computer Vision, LLMs' },
      { category: 'Languages & Tools', items: 'Python, SQL, C++, R, Docker, Kubernetes, FastAPI, Git, Linux' },
      { category: 'Data Engineering & Cloud', items: 'Apache Spark, Kafka, AWS (EC2, S3, SageMaker), PostgreSQL, Vector DBs (FAISS, Pinecone)' }
    ],
    projectsList: [
      {
        title: 'Multimodal Retrieval-Augmented Generation (RAG) System',
        link: 'https://github.com/alexmorgan-ml/rag-assistant',
        tech: 'PyTorch, FAISS, LangChain, FastAPI, Docker',
        date: 'Jan 2025 -- Mar 2025',
        bullets: 'Engineered an enterprise RAG knowledge engine utilizing vector embeddings and hybrid BM25 semantic retrieval.\nReduced query latency by 42% through embedding caching and quantization while achieving 94% answer accuracy.\nDeployed containerized microservice on AWS EC2 with automated CI/CD pipeline supporting 5,000+ daily queries.'
      },
      {
        title: 'Real-Time Fraud Detection & Anomaly Pipeline',
        link: 'https://github.com/alexmorgan-ml/fraud-detect',
        tech: 'Scikit-learn, XGBoost, Kafka, Pandas, Streamlit',
        date: 'Sep 2024 -- Dec 2024',
        bullets: 'Built an end-to-end streaming anomaly detection architecture processing 50k transactions/minute with sub-15ms inference.\nTrained gradient-boosted ensemble models achieving 0.96 ROC-AUC and reducing false positives by 31%.\nDesigned an interactive observability dashboard featuring real-time drift monitoring and SHAP explainability graphs.'
      }
    ],
    trainingList: [
      {
        title: 'Machine Learning Engineer Intern',
        date: 'Jun 2024 -- Aug 2024',
        projectTitle: 'Enterprise AI Lab, San Francisco, CA',
        tech: 'PyTorch, ONNX, Ray, Docker, GCP',
        bullets: 'Developed automated feature extraction pipelines processing 10M+ rows of multimodal tabular and time-series data.\nOptimized model inference latency by 3.2x via INT8 quantization and ONNX Runtime compilation for production edge deployment.\nCollaborated with cross-functional product teams to release an AI-assisted recommendation engine driving 14% user engagement lift.'
      }
    ],
    certificationsList: [
      { title: 'AWS Certified Machine Learning -- Specialty', issuer: 'Amazon Web Services', date: '2024' },
      { title: 'Deep Learning Specialization', issuer: 'DeepLearning.AI / Coursera', date: '2023' },
      { title: 'TensorFlow Developer Certificate', issuer: 'Google Developers', date: '2023' }
    ],
    achievementsList: [
      '1st Place Winner at National AI & Data Hackathon (out of 350+ competitive collegiate teams).',
      'Published peer-reviewed workshop paper on Efficient Transformer Quantization at NeurIPS Workshop.',
      'Solved 450+ Data Structures and Algorithm problems on LeetCode (Knight rank, top 4% globally).'
    ]
  },
  abey_classic: {
    stream: 'Full Stack & Software Engineering',
    name: 'Jordan Lee',
    location: 'Seattle, WA',
    phone: '+1 (555) 987-6543',
    email: 'jordan.lee@example.com',
    linkedin: 'https://linkedin.com/in/jordanlee-dev',
    github: 'https://github.com/jordanlee-code',
    educationList: [
      {
        school: 'University of Washington',
        location: 'Seattle, WA',
        degree: 'B.S. in Computer Science (Major GPA: 3.9 / 4.0)',
        dates: 'Sep 2021 -- Jun 2025'
      }
    ],
    skillsList: [
      { category: 'Languages & Frameworks', items: 'Java, Python, C/C++, TypeScript, React.js, Node.js, Next.js, Go' },
      { category: 'Systems & Cloud', items: 'Distributed Systems, Docker, Kubernetes, AWS, PostgreSQL, Redis, Kafka, GraphQL' },
      { category: 'Developer Practices', items: 'RESTful APIs, Microservices, CI/CD, Git, Linux, TDD, Agile & Scrum' }
    ],
    projectsList: [
      {
        title: 'CloudScale: High-Throughput Distributed Key-Value Store',
        link: 'https://github.com/jordanlee-code/cloudscale',
        tech: 'Go, Raft Consensus, gRPC, Docker',
        date: 'Jan 2025 -- Present',
        bullets: 'Implemented a distributed, fault-tolerant key-value store in Go implementing Raft consensus protocol.\nAchieved linear scalability handling 120,000 requests/second with 99th-percentile latency under 8ms.\nEngineered continuous leader-election and log-replication test harness simulating network partitions.'
      },
      {
        title: 'DevPulse: Real-Time Collaborative Workspace',
        link: 'https://github.com/jordanlee-code/devpulse',
        tech: 'React, Node.js, WebSockets, Redis, PostgreSQL',
        date: 'Aug 2024 -- Nov 2024',
        bullets: 'Architected a real-time collaborative coding platform with operational transformation algorithm for conflict resolution.\nIntegrated Redis Pub/Sub backplane supporting 10,000 simultaneous active WebSocket connections.\nImplemented end-to-end user authentication with JWT and granular role-based workspace access controls.'
      }
    ],
    trainingList: [
      {
        title: 'Software Engineering Intern',
        date: 'Jun 2024 -- Sep 2024',
        projectTitle: 'Cloud Infrastructure Team, Seattle, WA',
        tech: 'Python, Go, AWS, Terraform, Docker',
        bullets: 'Designed internal metrics aggregation microservice processing 2TB daily log telemetry with Prometheus & Grafana.\nRefactored deployment workflows reducing Docker image build and deployment turnaround time from 22 mins to 6 mins.\nWrote comprehensive integration test suites boosting code coverage from 68% to 91% across 14 microservices.'
      }
    ],
    certificationsList: [
      { title: 'AWS Certified Solutions Architect -- Associate', issuer: 'Amazon Web Services', date: '2024' },
      { title: 'Certified Kubernetes Application Developer (CKAD)', issuer: 'CNCF', date: '2024' }
    ],
    achievementsList: [
      'Finalist at ACM ICPC Regional Programming Contest (Pacific Northwest).',
      'President of Association for Computing Machinery (ACM) Student Chapter (500+ members).'
    ]
  },
  executive: {
    stream: 'Engineering Leadership & Architecture',
    name: 'Morgan Taylor',
    location: 'New York, NY',
    phone: '+1 (555) 456-7890',
    email: 'morgan.taylor@example.com',
    linkedin: 'https://linkedin.com/in/morgantaylor-lead',
    github: 'https://github.com/morgantaylor-eng',
    educationList: [
      {
        school: 'Columbia University',
        location: 'New York, NY',
        degree: 'M.S. in Computer Science & Technology Management',
        dates: '2020 -- 2022'
      },
      {
        school: 'Cornell University',
        location: 'Ithaca, NY',
        degree: 'B.S. in Electrical & Computer Engineering',
        dates: '2016 -- 2020'
      }
    ],
    skillsList: [
      { category: 'Executive Leadership', items: 'Engineering Strategy, Cross-Functional Team Leadership, Technical Architecture, Agile Coaching' },
      { category: 'Platforms & Systems', items: 'Cloud-Native Architectures, Kubernetes, Microservices, AWS/GCP, Python, TypeScript, Kafka' },
      { category: 'Governance & Security', items: 'SOC2 Compliance, System Reliability Engineering, FinOps, CI/CD Automation' }
    ],
    projectsList: [
      {
        title: 'Global Payment Modernization Platform',
        link: 'https://github.com/morgantaylor-eng/payment-platform',
        tech: 'Kafka, Golang, AWS, Microservices, Terraform',
        date: '2023 -- 2024',
        bullets: 'Led architectural overhaul of legacy payment infrastructure, migrating to event-driven microservices processing $40M daily volume.\nAchieved 99.999% platform availability while cutting infrastructure overhead by $350k annually.\nCoached and mentored 18 engineers across 3 distributed cross-functional agile pods.'
      },
      {
        title: 'Enterprise Multi-Cloud Observability Mesh',
        link: 'https://github.com/morgantaylor-eng/cloud-mesh',
        tech: 'OpenTelemetry, Grafana, Kubernetes, Go',
        date: '2022 -- 2023',
        bullets: 'Spearheaded organization-wide rollout of unified telemetry mesh across 60+ microservices spanning AWS and GCP.\nDecreased Mean Time to Detection (MTTD) by 64% and Mean Time to Resolution (MTTR) by 48%.'
      }
    ],
    trainingList: [
      {
        title: 'Staff Engineering Lead',
        date: '2022 -- Present',
        projectTitle: 'Core Platform Engineering, New York, NY',
        tech: 'Kubernetes, Go, AWS, Architecture Strategy',
        bullets: 'Defined the 3-year technical roadmap for scalable cloud infrastructure supporting 15M active mobile users.'
      }
    ],
    certificationsList: [
      { title: 'TOGAF 9 Enterprise Architecture Certified', issuer: 'The Open Group', date: '2023' },
      { title: 'AWS Certified Solutions Architect -- Professional', issuer: 'Amazon Web Services', date: '2022' }
    ],
    achievementsList: [
      'Keynote speaker at Cloud Native Summit NYC on Microservices Resilience at Scale.',
      'Recipient of Annual Engineering Excellence Award for Zero-Downtime Migration.'
    ]
  }
};

// Pure function to generate complete LaTeX string from form parameters
const generateLatexString = ({
  template,
  name,
  location,
  phone,
  email,
  linkedin,
  github,
  educationList = [],
  skillsList = [],
  projectsList = [],
  trainingList = [],
  certificationsList = [],
  achievementsList = []
}) => {
  const displayName = name || 'YOUR FULL NAME';
  const displayLocation = location || '';
  const displayPhone = phone || '';
  const displayEmail = email || '';

  // Clean Contact Line using standard LaTeX mathematical pipe \mid
  const contactParts = [];
  if (displayPhone) contactParts.push(`\\href{tel:${esc(displayPhone)}}{${esc(displayPhone)}}`);
  if (displayEmail) contactParts.push(`\\href{mailto:${esc(displayEmail)}}{${esc(displayEmail)}}`);
  if (linkedin && linkedin.trim() && linkedin.trim() !== 'LinkedIn') {
    const lUrl = linkedin.startsWith('http') ? linkedin : `https://${linkedin}`;
    contactParts.push(`\\href{${esc(lUrl)}}{LinkedIn}`);
  }
  if (github && github.trim() && github.trim() !== 'GitHub') {
    const gUrl = github.startsWith('http') ? github : `https://${github}`;
    contactParts.push(`\\href{${esc(gUrl)}}{GitHub}`);
  }
  const contactLine = contactParts.length > 0
    ? contactParts.join(' ~$\\mid$~ ')
    : `${esc(displayEmail || 'email@example.com')}${displayPhone ? ` ~$\\mid$~ ${esc(displayPhone)}` : ''}`;

  // Education Section
  const validEdu = educationList.filter(e => e.school && e.school.trim());
  const eduContent = validEdu.length > 0
    ? validEdu.map(e => `    \\resumeSubheading\n      {${esc(e.school)}}{${esc(e.location || '')}}\n      {${esc(e.degree || '')}}{${esc(e.dates || '')}}`).join('\n')
    : (name ? '' : `    \\resumeSubheading\n      {University / School Name}{Location}\n      {Degree / Major}{Dates}`);

  // Skills Section
  const validSkills = skillsList.filter(s => s.items && s.items.trim());
  const skillsContent = validSkills.length > 0
    ? validSkills.map(s => `     \\textbf{\\normalsize{${esc(s.category || 'Skills')}:}}{\\normalsize{ ${esc(s.items)}}} \\\\`).join('\n')
    : (name ? '' : `     \\textbf{\\normalsize{Technical Skills:}}{\\normalsize{ Core Competencies, Tools, Technologies}} \\\\`);

  // Projects Section
  const validProjects = projectsList.filter(p => (p.title && p.title.trim()) || (p.bullets && p.bullets.trim()));
  const projectsContent = validProjects.length > 0
    ? validProjects.map(p => {
        const title = esc(p.title || 'Project');
        const techStr = p.tech ? ` $|$ \\large{${esc(p.tech)}}` : '';
        const titlePart = p.link && p.link !== '#'
          ? `\\href{${esc(p.link)}}{\\textbf{\\large{${title}}}}${techStr}`
          : `\\textbf{\\large{${title}}}${techStr}`;
        const date = esc(p.date || '');
        const bullets = (p.bullets || '').split('\n').filter(Boolean);
        const bulletItems = bullets.length > 0
          ? bullets.map(b => `            \\resumeItem{\\normalsize{${esc(b)}}}`).join('\n')
          : `            \\resumeItem{\\normalsize{${esc(p.title || 'Key project achievement.')}}}`;
        return `      \\resumeProjectHeading\n          {${titlePart}}{${date}}\n          \\resumeItemListStart\n${bulletItems}\n          \\resumeItemListEnd`;
      }).join('\n\\vspace{-4pt}\n')
    : '';

  // Training / Experience Section
  const validTraining = trainingList.filter(t => (t.title && t.title.trim()) || (t.projectTitle && t.projectTitle.trim()) || (t.bullets && t.bullets.trim()));
  const trainingContent = validTraining.length > 0
    ? validTraining.map(t => {
        const title = esc(t.title || 'Professional Experience');
        const date = esc(t.date || '');
        const projTitle = esc(t.projectTitle || '');
        const techStr = t.tech ? ` $|$ \\large{${esc(t.tech)}}` : '';
        const titlePart = t.link && t.link !== '#'
          ? `\\href{${esc(t.link)}}{\\textbf{\\large{${projTitle}}}}${techStr}`
          : `\\textbf{\\large{${projTitle}}}${techStr}`;
        const bullets = (t.bullets || '').split('\n').filter(Boolean);
        const bulletItems = bullets.length > 0
          ? bullets.map(b => `          \\resumeItem{\\normalsize{${esc(b)}}}`).join('\n')
          : '';
        return `  \\resumeSubheading\n    {${title}}{${date}}\n    {}{}\n  \\vspace{-10pt}\n  \\begin{itemize}[leftmargin=0.15in, label={}]\n    \\resumeProjectHeading\n        {${titlePart}}{}\n        \\resumeItemListStart\n${bulletItems}\n        \\resumeItemListEnd\n  \\end{itemize}`;
      }).join('\n')
    : '';

  // Certifications Section
  const validCerts = certificationsList.filter(c => c.title && c.title.trim());
  const certsContent = validCerts.length > 0
    ? validCerts.map(c => `        \\resumeItem{\\normalsize{${esc(c.title)}${c.issuer ? ` -- \\textbf{(${esc(c.issuer)})}` : ''}${c.date ? ` \\hfill \\textbf{${esc(c.date)}}` : ''}}}`).join('\n')
    : '';

  // Achievements Section
  const validAchievements = achievementsList.filter(a => a && String(a).trim());
  const achievementsContent = validAchievements.length > 0
    ? validAchievements.map(a => `    \\item ${esc(a)}`).join('\n')
    : '';

  // Dynamic modular section blocks
  const eduSection = eduContent ? `
%-----------EDUCATION-----------
\\section{EDUCATION}
\\vspace{3pt}
  \\resumeSubHeadingListStart
${eduContent}
  \\resumeSubHeadingListEnd
` : '';

  const skillsSection = skillsContent ? `
%-----------TECHNICAL SKILLS-----------
\\section{TECHNICAL SKILLS}
\\vspace{2pt}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
${skillsContent}
    }}
 \\end{itemize}
 \\vspace{-8pt}
` : '';

  const projectsSection = projectsContent ? `
%-----------PROJECTS-----------
\\section{PROJECTS}
    \\vspace{-2pt}
    \\resumeSubHeadingListStart
${projectsContent}
    \\resumeSubHeadingListEnd
    \\vspace{-4pt}
` : '';

  const trainingSection = trainingContent ? `
%-----------EXPERIENCE & TRAINING-----------
\\section{EXPERIENCE \\& TRAINING}
\\vspace{-2pt}
\\resumeSubHeadingListStart
${trainingContent}
\\resumeSubHeadingListEnd
\\vspace{-4pt}
` : '';

  const certsSection = certsContent ? `
%-----------CERTIFICATIONS-----------
\\section{CERTIFICATIONS}
\\resumeSubHeadingListStart
    \\resumeItemListStart
${certsContent}
    \\resumeItemListEnd
\\resumeSubHeadingListEnd
\\vspace{-4pt}
` : '';

  const achievementsSection = achievementsContent ? `
%-----------ACHIEVEMENTS-----------
\\section{ACHIEVEMENTS}
\\begin{itemize}[leftmargin=0.15in, label={$\\bullet$}, itemsep=1pt]
    \\small{
${achievementsContent}
    }
\\end{itemize}
` : '';

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
    ${displayLocation ? `${esc(displayLocation)} \\\\ \\vspace{2pt}` : ''}
    \\small
    ${contactLine}
\\end{center}
\\vspace{2mm}

${eduSection}
${skillsSection}
${projectsSection}
${trainingSection}
${certsSection}
${achievementsSection}

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
${displayLocation ? `{\\color{accent} \\bfseries ${esc(displayLocation)}} \\\\[6pt]` : ''}
\\small ${contactLine}
\\end{center}

\\vspace{8pt}

${eduSection}
${skillsSection}
${projectsSection}
${trainingSection}
${certsSection}

\\end{document}`;
  }

  // Default: 'mukund_ml' (Data & ML Specialist Template)
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
    ${displayLocation ? `${esc(displayLocation)} \\\\ \\vspace{2pt}` : ''}
    \\small
    ${contactLine}
\\end{center}
\\vspace{2mm}

${eduSection}
${skillsSection}
${projectsSection}
${trainingSection}
${certsSection}
${achievementsSection}

\\end{document}`;
};

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  // Template Choice: 'mukund_ml' | 'abey_classic' | 'executive'
  const [template, setTemplate] = useState('mukund_ml');

  // Custom Career Stream Target (User can write any role/stream!)
  const [customStream, setCustomStream] = useState('Data Science & Machine Learning');
  const [dynamicKeywords, setDynamicKeywords] = useState(DEFAULT_STREAM_KEYWORDS);
  const [isFetchingKeywords, setIsFetchingKeywords] = useState(false);

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

  const getClientFallbackKeywords = (streamText) => {
    const s = (streamText || '').toLowerCase();
    if (s.includes('ai') || s.includes('ml') || s.includes('machine') || s.includes('learning')) {
      return ['Scikit-learn', 'PyTorch', 'TensorFlow', 'Random Forest', 'TF-IDF', 'NLP Pipelines', 'Feature Engineering', 'EDA', 'Model Deployment', 'Cosine Similarity', 'Neural Networks', 'Pandas & NumPy'];
    }
    if (s.includes('cyber') || s.includes('security') || s.includes('sec')) {
      return ['Wireshark', 'Metasploit', 'Penetration Testing', 'Nmap', 'SIEM', 'SOC Analysis', 'ISO 27001', 'Cryptography', 'Network Security', 'Ethical Hacking', 'Zero Trust', 'Firewalls'];
    }
    if (s.includes('devops') || s.includes('cloud') || s.includes('aws')) {
      return ['Docker', 'Kubernetes', 'Terraform', 'CI/CD Pipelines', 'AWS', 'Ansible', 'Jenkins', 'Prometheus', 'Grafana', 'Linux Administration', 'Bash Scripting', 'Helm'];
    }
    if (s.includes('ios') || s.includes('swift') || s.includes('apple')) {
      return ['Swift', 'SwiftUI', 'UIKit', 'Xcode', 'Combine Framework', 'CoreData', 'CocoaPods', 'RESTful APIs', 'Git', 'TestFlight', 'App Store Deployment', 'MVVM'];
    }
    if (s.includes('android') || s.includes('kotlin') || s.includes('mobile')) {
      return ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Coroutines', 'Room Database', 'Retrofit', 'Dagger Hilt', 'Gradle', 'MVVM Architecture', 'Unit Testing'];
    }
    if (s.includes('web') || s.includes('full') || s.includes('stack') || s.includes('react')) {
      return ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'RESTful APIs', 'Redux Toolkit', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Next.js', 'JWT Auth', 'Webpack'];
    }
    if (s.includes('data eng') || s.includes('sql') || s.includes('spark')) {
      return ['Apache Spark', 'PySpark', 'Hadoop', 'Kafka', 'Airflow', 'ETL Pipelines', 'Snowflake', 'Databricks', 'Data Warehousing', 'SQL Optimization', 'Parquet', 'BigQuery'];
    }
    const words = streamText.split(/[\s,/\-_]+/).filter(w => w.length > 2).map(w => w.charAt(0).toUpperCase() + w.slice(1));
    return Array.from(new Set([...words, 'System Design', 'Agile Methodology', 'Git / GitHub', 'Problem Solving', 'REST APIs', 'Unit Testing', 'CI/CD', 'Performance Optimization']));
  };

  // Fetch AI Engine Keywords for User-Entered Stream
  const handleFetchGeminiKeywords = async () => {
    if (!customStream.trim()) return;
    setIsFetchingKeywords(true);
    setStatusMsg(`AI Engine is generating ATS keywords for "${customStream}"...`);

    try {
      const res = await fetch('/api/suggest-stream-keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stream: customStream.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.keywords) && data.keywords.length > 0) {
          setDynamicKeywords(data.keywords);
          setStatusMsg(`AI Engine generated ${data.keywords.length} ATS keywords for "${customStream}"!`);
          setTimeout(() => setStatusMsg(''), 3000);
          setIsFetchingKeywords(false);
          return;
        }
      }
    } catch (err) {
      console.warn('API fetch error, using fallback:', err);
    }

    // Fallback keyword generation
    const fallbacks = getClientFallbackKeywords(customStream);
    setDynamicKeywords(fallbacks);
    setStatusMsg(`Generated ${fallbacks.length} ATS keywords for "${customStream}"!`);
    setTimeout(() => setStatusMsg(''), 3000);
    setIsFetchingKeywords(false);
  };

  // Calculate Real-Time ATS Score
  const atsScore = useMemo(() => {
    let score = 0;
    if (name.trim()) score += 15;
    if (email.trim() && phone.trim()) score += 15;
    if (educationList.length > 0 && educationList[0].school) score += 20;
    if (skillsList.length > 0 && skillsList[0].items) score += 20;
    if (projectsList.length > 0 && projectsList[0].title) score += 20;
    if (certificationsList.length > 0 || achievementsList.length > 0) score += 10;
    return score;
  }, [name, email, phone, educationList, skillsList, projectsList, certificationsList, achievementsList]);

  // Add suggested keyword to skills list
  const handleAddKeywordToSkills = (keyword) => {
    if (skillsList.length === 0) {
      setSkillsList([{ category: 'Core Competencies', items: keyword }]);
    } else {
      const updated = [...skillsList];
      if (!updated[0].items.includes(keyword)) {
        updated[0].items = updated[0].items ? `${updated[0].items}, ${keyword}` : keyword;
        setSkillsList(updated);
      }
    }
    setStatusMsg(`Added "${keyword}" to Skills section!`);
    setTimeout(() => setStatusMsg(''), 2500);
  };

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

        // 1. Parse Education
        if (pd.education) {
          if (Array.isArray(pd.education)) {
            const parsedEdu = pd.education.map(e => {
              if (typeof e === 'object' && e !== null) {
                return {
                  school: e.school || e.institution || '',
                  degree: e.degree || e.major || '',
                  location: e.location || '',
                  dates: e.dates || e.date || e.year || ''
                };
              }
              const str = String(e).trim();
              let school = str;
              let degree = '';
              let dates = '';
              const dateMatch = str.match(/\(([^)]*(?:20\d\d|19\d\d|Present)[^)]*)\)/i);
              if (dateMatch) {
                dates = dateMatch[1];
                school = str.replace(dateMatch[0], '').trim();
              }
              const parts = school.split(/\s*[-–—|]\s*/);
              if (parts.length >= 2) {
                school = parts[0].trim();
                degree = parts.slice(1).join(' - ').trim();
              }
              return { school, degree, dates, location: '' };
            });
            setEducationList(parsedEdu);
          } else if (typeof pd.education === 'string') {
            const str = pd.education.trim();
            let school = str;
            let degree = '';
            let dates = '';
            const dateMatch = str.match(/\(([^)]*(?:20\d\d|19\d\d|Present)[^)]*)\)/i);
            if (dateMatch) {
              dates = dateMatch[1];
              school = str.replace(dateMatch[0], '').trim();
            }
            const parts = school.split(/\s*[-–—|]\s*/);
            if (parts.length >= 2) {
              school = parts[0].trim();
              degree = parts.slice(1).join(' - ').trim();
            }
            setEducationList([{ school, degree, dates, location: '' }]);
          }
        }

        // 2. Parse Skills
        if (pd.skills) {
          if (Array.isArray(pd.skills)) {
            if (pd.skills.length > 0 && typeof pd.skills[0] === 'object' && pd.skills[0] !== null) {
              setSkillsList(pd.skills.map(s => ({ category: s.category || 'Technical Skills', items: s.items || '' })));
            } else {
              setSkillsList([{ category: 'Technical Skills', items: pd.skills.join(', ') }]);
            }
          } else if (typeof pd.skills === 'string') {
            setSkillsList([{ category: 'Technical Skills', items: pd.skills }]);
          }
        }

        // 3. Parse Projects
        let extractedProjects = [];
        if (pd.projects && Array.isArray(pd.projects) && pd.projects.length > 0) {
          extractedProjects = pd.projects.map(p => ({
            title: p.title || p.name || 'Project',
            tech: p.tech || p.technologies || p.stack || '',
            date: p.date || p.duration || '',
            link: p.link || p.github || '',
            bullets: Array.isArray(p.bullets) ? p.bullets.join('\n') : (p.bullets || p.description || '')
          }));
        } else if (typeof pd.experience === 'string' && pd.experience) {
          // If projects were lumped into experience, extract them intelligently
          const expText = pd.experience;
          const projRegex = /([A-Za-z0-9\s&/–—-]+?)\s*[-–—]\s*([^:]+?):\s*([\s\S]+?)(?=(?:[A-Za-z0-9\s&/–—-]+?\s*[-–—]\s*[^:]+?:)|$)/g;
          let match;
          while ((match = projRegex.exec(expText)) !== null) {
            const rawTitle = match[1].trim().replace(/^[\s*•-]+/, '');
            const rawSubtitle = match[2].trim();
            const desc = match[3].trim();
            if (rawTitle.length > 2 && rawTitle.length < 50) {
              extractedProjects.push({
                title: `${rawTitle} -- ${rawSubtitle}`,
                tech: '',
                date: '',
                link: '',
                bullets: desc.split(/(?<=\.)\s+/).filter(b => b.length > 15).join('\n') || desc
              });
            }
          }
        }

        if (extractedProjects.length > 0) {
          setProjectsList(extractedProjects);
        }

        // 4. Parse Experience / Training
        if (pd.experience && Array.isArray(pd.experience) && pd.experience.length > 0) {
          setTrainingList(pd.experience.map(exp => ({
            title: exp.title || exp.role || 'Experience',
            date: exp.date || exp.dates || '',
            link: exp.link || '',
            projectTitle: exp.company || exp.organization || '',
            tech: exp.tech || '',
            bullets: Array.isArray(exp.bullets) ? exp.bullets.join('\n') : (exp.bullets || exp.description || '')
          })));
        } else if (extractedProjects.length === 0 && typeof pd.experience === 'string' && pd.experience.trim()) {
          setTrainingList([{
            title: 'Professional Experience',
            date: '',
            link: '',
            projectTitle: 'Key Responsibilities',
            tech: '',
            bullets: pd.experience
          }]);
        }

        // 5. Parse Certifications
        if (pd.certifications && Array.isArray(pd.certifications) && pd.certifications.length > 0) {
          setCertificationsList(pd.certifications.map(c => {
            if (typeof c === 'string') return { title: c, issuer: '', date: '' };
            return {
              title: c.title || c.name || '',
              issuer: c.issuer || c.organization || '',
              date: c.date || c.year || ''
            };
          }));
        }

        // 6. Parse Achievements
        if (pd.achievements && Array.isArray(pd.achievements) && pd.achievements.length > 0) {
          setAchievementsList(pd.achievements.map(a => (typeof a === 'string' ? a : a.title || '')));
        }

        setIsManualEdit(false);
        setStatusMsg('Resume parsed and structured into LaTeX successfully!');
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

  // Dynamic LaTeX Code State (Can be generated from form OR edited manually in code box)
  const [latexCode, setLatexCode] = useState('');
  const [isManualEdit, setIsManualEdit] = useState(false);

  // Sync LaTeX code whenever form fields or template change
  useEffect(() => {
    const generated = generateLatexString({
      template,
      name,
      location,
      phone,
      email,
      linkedin,
      github,
      educationList,
      skillsList,
      projectsList,
      trainingList,
      certificationsList,
      achievementsList
    });
    setLatexCode(generated);
    setIsManualEdit(false);
  }, [
    template,
    name,
    location,
    phone,
    email,
    linkedin,
    github,
    educationList,
    skillsList,
    projectsList,
    trainingList,
    certificationsList,
    achievementsList
  ]);

  // Load Sample Resume into Form & LaTeX
  const loadSampleResume = (templateKey = template) => {
    const sample = SAMPLE_RESUMES[templateKey] || SAMPLE_RESUMES.mukund_ml;
    setName(sample.name);
    setLocation(sample.location);
    setPhone(sample.phone);
    setEmail(sample.email);
    setLinkedin(sample.linkedin);
    setGithub(sample.github);
    setEducationList(JSON.parse(JSON.stringify(sample.educationList)));
    setSkillsList(JSON.parse(JSON.stringify(sample.skillsList)));
    setProjectsList(JSON.parse(JSON.stringify(sample.projectsList)));
    setTrainingList(JSON.parse(JSON.stringify(sample.trainingList)));
    setCertificationsList(JSON.parse(JSON.stringify(sample.certificationsList)));
    setAchievementsList(JSON.parse(JSON.stringify(sample.achievementsList)));
    if (sample.stream) {
      setCustomStream(sample.stream);
      setDynamicKeywords(getClientFallbackKeywords(sample.stream));
    }
    setIsManualEdit(false);
    setStatusMsg(`Loaded "${sample.name}" sample resume! Form and LaTeX updated.`);
    setTimeout(() => setStatusMsg(''), 3500);
  };

  // Handle Manual Code Edit in Code Box
  const handleCodeChange = (e) => {
    setLatexCode(e.target.value);
    setIsManualEdit(true);
  };

  // Tab key indent support inside code box
  const handleCodeKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const val = e.target.value;
      const newVal = val.substring(0, start) + '  ' + val.substring(end);
      setLatexCode(newVal);
      setIsManualEdit(true);
      setTimeout(() => {
        if (e.target) {
          e.target.selectionStart = e.target.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  // Re-sync LaTeX Code from current form fields
  const handleResetFromForm = () => {
    const generated = generateLatexString({
      template,
      name,
      location,
      phone,
      email,
      linkedin,
      github,
      educationList,
      skillsList,
      projectsList,
      trainingList,
      certificationsList,
      achievementsList
    });
    setLatexCode(generated);
    setIsManualEdit(false);
    setStatusMsg('Re-synced LaTeX code from form fields.');
    setTimeout(() => setStatusMsg(''), 2500);
  };

  // Copy LaTeX
  const handleCopyLatex = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(latexCode);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = latexCode;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        textarea.style.top = '-999999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed, using fallback:', err);
      const textarea = document.createElement('textarea');
      textarea.value = latexCode;
      textarea.style.position = 'fixed';
      textarea.style.left = '-999999px';
      textarea.style.top = '-999999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
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
                Live two-way sync: Form edits update LaTeX, and you can edit or paste code directly in the code box.
              </p>
            </div>

            {/* Header Right Action Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {/* Load Sample Resume Button */}
              <button
                onClick={() => loadSampleResume(template)}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '8px 16px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 3px 12px rgba(16, 185, 129, 0.28)',
                  transition: 'all 0.2s'
                }}
                title="Populate form & LaTeX with realistic sample resume data"
              >
                <Sparkles className="size-4" /> Load Sample Resume
              </button>

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
                <FileText className="size-4 text-emerald-600" />
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

            {/* LEFT COLUMN: CONTROLS, CAREER ROADMAP & FORM TABS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
              
              {/* Template Selector Card (Top of Left Column) */}
              <div style={{
                background: '#ffffff',
                borderRadius: '18px',
                padding: '12px 16px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Select LaTeX Resume Template
                  </span>
                  <button
                    onClick={() => loadSampleResume(template)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#059669',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: 0
                    }}
                    title="Load complete sample data for this template"
                  >
                    <Sparkles className="size-3" /> Load {template === 'abey_classic' ? 'Tech' : template === 'executive' ? 'Executive' : 'ML'} Sample
                  </button>
                </div>
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

              {/* DYNAMIC GEMINI CAREER STREAM & ATS KEYWORD GENERATOR CARD */}
              <div style={{
                background: '#ffffff',
                borderRadius: '18px',
                padding: '14px 16px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Target className="size-4 text-emerald-600" />
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1c2427', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Target Career Stream / Role
                    </span>
                  </div>

                  {/* ATS Score Indicator Pill */}
                  <div style={{
                    background: atsScore >= 70 ? '#ecfdf5' : '#fffbeb',
                    border: `1px solid ${atsScore >= 70 ? '#6ee7b7' : '#fde68a'}`,
                    padding: '4px 10px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <BarChart3 className={`size-3.5 ${atsScore >= 70 ? 'text-emerald-600' : 'text-amber-600'}`} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: atsScore >= 70 ? '#047857' : '#b45309' }}>
                      ATS Match: {atsScore}%
                    </span>
                  </div>
                </div>

                {/* Stream Input Box with Gemini Keyword AI Trigger */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <input
                    type="text"
                    placeholder="Type target stream / role (e.g. Cybersecurity, iOS Dev, GenAI)..."
                    value={customStream}
                    onChange={(e) => setCustomStream(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleFetchGeminiKeywords(); }}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#1c2427',
                      background: '#f8fafc'
                    }}
                  />
                  <button
                    onClick={handleFetchGeminiKeywords}
                    disabled={isFetchingKeywords || !customStream.trim()}
                    style={{
                      background: isFetchingKeywords ? '#64748b' : '#1c2427',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '8px 14px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: isFetchingKeywords ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {isFetchingKeywords ? <Loader2 className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5 text-amber-400" />}
                    {isFetchingKeywords ? 'Generating...' : 'AI Engine Keywords'}
                  </button>
                </div>

                {/* AI Engine Suggested Keywords Pills */}
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                    <Lightbulb className="size-3 text-amber-500" /> AI Recommended Keywords for "{customStream}" (Click to add to Skills):
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {dynamicKeywords.map((kw, i) => (
                      <button
                        key={i}
                        onClick={() => handleAddKeywordToSkills(kw)}
                        title={`Click to add "${kw}" to Skills`}
                        style={{
                          background: '#f1f5f9',
                          color: '#334155',
                          border: '1px solid #cbd5e1',
                          borderRadius: '16px',
                          padding: '4px 10px',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'all 0.15s'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#10b981'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = '#10b981'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#334155'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                      >
                        <Plus className="size-3" /> {kw}
                      </button>
                    ))}
                  </div>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f5c35c', fontFamily: 'monospace' }}>
                      {template === 'abey_classic' ? 'classic_tech_resume.tex' : template === 'executive' ? 'executive_resume.tex' : 'data_ml_specialist_resume.tex'}
                    </span>
                    {isManualEdit ? (
                      <span style={{
                        fontSize: '0.7rem',
                        background: 'rgba(245, 158, 11, 0.2)',
                        border: '1px solid rgba(245, 158, 11, 0.4)',
                        color: '#fcd34d',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <Edit3 className="size-3" /> Custom LaTeX Active
                      </span>
                    ) : (
                      <span style={{
                        fontSize: '0.7rem',
                        background: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        color: '#6ee7b7',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        ⚡ Live Form Synced
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isManualEdit && (
                      <button
                        onClick={handleResetFromForm}
                        style={{
                          background: 'rgba(56, 189, 248, 0.15)',
                          color: '#38bdf8',
                          border: '1px solid rgba(56, 189, 248, 0.35)',
                          borderRadius: '8px',
                          padding: '3px 8px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'all 0.2s'
                        }}
                        title="Revert custom code edits and re-sync from form fields"
                      >
                        <RefreshCw className="size-3" /> Re-sync from Form
                      </button>
                    )}
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                      {latexCode ? latexCode.split('\n').length : 0} lines
                    </span>
                    <button
                      onClick={handleCopyLatex}
                      style={{
                        background: isCopied ? '#10b981' : 'rgba(255, 255, 255, 0.08)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '4px 10px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {isCopied ? <Check className="size-3" /> : <Copy className="size-3" />}
                      {isCopied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <textarea
                    value={latexCode}
                    onChange={handleCodeChange}
                    onKeyDown={handleCodeKeyDown}
                    spellCheck={false}
                    placeholder="LaTeX code will appear here. You can freely edit or paste LaTeX code manually..."
                    style={{
                      background: '#141a1c',
                      borderRadius: '12px',
                      padding: '12px',
                      fontFamily: 'Consolas, Monaco, "Fira Code", monospace',
                      fontSize: '0.76rem',
                      lineHeight: 1.45,
                      flex: 1,
                      minHeight: '620px',
                      maxHeight: '760px',
                      width: '100%',
                      boxSizing: 'border-box',
                      color: '#a7f3d0',
                      border: isManualEdit ? '1px solid rgba(245, 158, 11, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                      outline: 'none',
                      resize: 'none',
                      whiteSpace: 'pre',
                      overflowWrap: 'normal',
                      overflowX: 'auto',
                      overflowY: 'auto'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '12px',
                    fontSize: '0.65rem',
                    color: '#64748b',
                    background: 'rgba(20, 26, 28, 0.85)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    pointerEvents: 'none'
                  }}>
                    Editable Code Box • Tab key supported
                  </div>
                </div>
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
