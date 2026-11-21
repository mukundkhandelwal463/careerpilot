import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, ChevronRight, Clock, ExternalLink, Sparkles, User } from 'lucide-react';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import SEOHead from '../Components/SEOHead.jsx';
import '../css/style.css';

export const GUIDES_DATA = [
  {
    slug: 'ats-resume-optimization',
    category: 'ATS & Resume Strategy',
    readTime: '6 min read',
    updatedAt: '2026-11-18',
    title: 'How to Optimize Your Resume for ATS (Applicant Tracking Systems) in 2026',
    metaDescription: 'Learn how Applicant Tracking Systems parse resumes, how ATS compatibility scores work, and step-by-step techniques to pass recruiter screening filters.',
    keywords: 'ATS resume optimization, applicant tracking system, ATS score checker, resume keywords, LaTeX resume formatting',
    directAnswer:
      'An Applicant Tracking System (ATS) parses resumes into structured fields—skills, work history, education, and keywords—before a recruiter ever reads them. To pass ATS screening, use a clean single-column layout, standard section headings, exact role keywords from the job description, and quantifiable achievements.',
    sections: [
      {
        heading: 'What is an Applicant Tracking System (ATS) and how does it rank resumes?',
        body: 'An Applicant Tracking System is recruiting software used by over 95% of Fortune 500 companies to filter, index, and rank incoming job applications. When you submit a PDF or DOCX file, the ATS extracts plain text, maps sections like Experience and Skills, and calculates relevance against the employer’s required keywords and qualifications.'
      },
      {
        heading: 'Step-by-step checklist to achieve an 85+ ATS compatibility score',
        steps: [
          'Use clean, text-selectable PDF or DOCX exports (avoid image-only scans, complex tables, or multi-column text boxes).',
          'Mirror exact technical keywords and tool names from the target Job Description naturally inside your Skills and Project bullets.',
          'Quantify impact using the XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]" (for example, reduced API latency by 38%).',
          'Use standard headings such as Education, Technical Skills, Experience, Projects, and Certifications so parsers map dates and roles accurately.',
          'Run your resume through an AI ATS Resume Screener like CareerPilot before applying to identify missing keywords and formatting gaps.'
        ]
      }
    ],
    comparison: {
      heading: 'ATS-Friendly Resume vs. Design-Heavy Resume Comparison',
      columns: ['Criteria', 'ATS-Optimized Resume (LaTeX / Clean)', 'Graphic / Multi-Column Resume'],
      rows: [
        ['Text Extraction Accuracy', '98%–100% clean text parsing', 'Often scrambles column order or skips icons'],
        ['Keyword Matching', 'Structured Skills + contextual project bullets', 'Keywords hidden inside progress bars/charts'],
        ['Recruiter Skim Time', 'Clear hierarchy scannable in 6 seconds', 'Cluttered visual blocks slow down screening'],
        ['Ideal Use Case', 'Software Engineering, Data, Tech & Corporate roles', 'Print portfolios or direct designer referrals']
      ]
    },
    citations: [
      { label: 'Google Career Certificates — Resume Writing Tips', url: 'https://grow.google/certificates/' },
      { label: 'Harvard FAS Career Services — Resume & Cover Letter Guide', url: 'https://careerservices.fas.harvard.edu/' }
    ]
  },
  {
    slug: 'ai-mock-interview-prep',
    category: 'Interview Preparation',
    readTime: '5 min read',
    updatedAt: '2026-11-18',
    title: 'How to Prepare for Technical and Behavioral Interviews Using AI Voice Practice',
    metaDescription: 'Discover how AI voice mock interviews improve technical articulation, STAR behavioral answers, and speaking fluency before real engineering interviews.',
    keywords: 'AI mock interview, technical interview preparation, STAR method, voice interview practice, software engineer interview',
    directAnswer:
      'AI voice mock interviews simulate real recruiter conversations by generating resume-specific technical and behavioral questions and scoring your spoken responses on technical accuracy, structure, and fluency. Practicing aloud 3–4 times per week reduces interview anxiety and exposes gaps in explanation before live rounds.',
    sections: [
      {
        heading: 'Why does speaking answers aloud outperform silent reading?',
        body: 'Many candidates understand algorithms or system architectures conceptually but struggle to articulate trade-offs clearly under time pressure. Speaking answers aloud builds verbal fluency, trains you to structure thoughts concisely, and eliminates filler words when explaining complex projects.'
      },
      {
        heading: 'How to structure winning technical and behavioral answers (STAR + Trade-offs)',
        steps: [
          'Situation & Task (15 seconds): Set concise context—the system, scale, or problem you faced.',
          'Action & Architecture (45–60 seconds): Explain the exact technologies, algorithms, or debugging decisions you owned—and why you chose them over alternatives.',
          'Result & Metrics (15 seconds): Close with measurable outcomes such as latency reduction, uptime improvement, or user adoption.',
          'Review AI Feedback: Inspect technical score, English clarity score, and missing key concepts after every answer, then retry weaker questions.'
        ]
      }
    ],
    comparison: {
      heading: 'Self-Study vs. Peer Mocks vs. CareerPilot AI Voice Interviewer',
      columns: ['Dimension', 'Silent Self-Study', 'Peer Mock Interview', 'CareerPilot AI Voice Interview'],
      rows: [
        ['Availability', '24/7', 'Requires scheduling', '24/7 on-demand'],
        ['Resume Personalization', 'Generic question lists', 'Depends on peer prep', 'Tailored directly to your uploaded resume'],
        ['Objective Scoring', 'None', 'Subjective notes', 'Instant Technical + Clarity + Fluency scores'],
        ['Cost', 'Free', 'Free / Paid platforms', 'Free on CareerPilot']
      ]
    },
    citations: [
      { label: 'MDN Web Docs — Technical Web Engineering Reference', url: 'https://developer.mozilla.org/' },
      { label: 'MIT OpenCourseWare — Introduction to Algorithms', url: 'https://ocw.mit.edu/' }
    ]
  },
  {
    slug: 'cs-fundamentals-roadmap',
    category: 'CS Core & Engineering',
    readTime: '7 min read',
    updatedAt: '2026-11-18',
    title: 'Complete Computer Science Fundamentals Roadmap: OS, DBMS, CN, OOPs & System Design',
    metaDescription: 'A structured Computer Science interview preparation roadmap covering Operating Systems, DBMS, Computer Networks, OOPs, DSA patterns, and System Design.',
    keywords: 'CS fundamentals roadmap, operating systems interview questions, DBMS normalization, computer networks TCP HTTP, system design basics',
    directAnswer:
      'Mastering Computer Science fundamentals for software engineering interviews requires focused preparation across five pillars: Operating Systems (processes, threads, deadlocks), DBMS (ACID, indexing, SQL joins), Computer Networks (HTTP/HTTPS, TCP/UDP, DNS), OOPs (SOLID, polymorphism), and System Design (caching, load balancing, scaling).',
    sections: [
      {
        heading: 'What are the highest-yield CS subjects tested in campus and tech placements?',
        body: 'Recruiters evaluate CS fundamentals to verify that engineers can debug production bottlenecks—not just solve isolated puzzles. Understanding how indexes speed up SQL queries, why TCP handshakes affect latency, and how OS locks cause deadlocks directly predicts real-world engineering effectiveness.'
      },
      {
        heading: 'Recommended 4-Week CS Fundamentals Study Sequence',
        steps: [
          'Week 1 — OOPs & SQL/DBMS: Master encapsulation, inheritance, polymorphism, SOLID principles, B-Tree indexing, normalization (1NF–BCNF), and ACID transactions.',
          'Week 2 — Operating Systems: Study process vs. thread lifecycle, CPU scheduling, mutex vs. semaphore synchronization, deadlock prevention, and virtual memory paging.',
          'Week 3 — Computer Networks: Trace what happens when you type a URL (DNS, TCP 3-way handshake, TLS/HTTPS, HTTP status codes, REST, Load Balancers, CDNs).',
          'Week 4 — System Design & Full-Length Mock Tests: Learn horizontal scaling, Redis caching, rate limiting, and validate readiness with timed MCQ + coding assessments.'
        ]
      }
    ],
    comparison: {
      heading: 'Core CS Subjects — High-Priority Interview Topics Summary',
      columns: ['Subject', 'Must-Know Core Concepts', 'Common Interview Question'],
      rows: [
        ['Operating Systems', 'Threads, Deadlocks, Virtual Memory, Paging', 'Process vs. Thread & how to prevent deadlock?'],
        ['DBMS & SQL', 'ACID, Indexing (B+ Tree), Joins, Isolation Levels', 'How does indexing speed up queries and what is the trade-off?'],
        ['Computer Networks', 'OSI/TCP-IP, HTTP/HTTPS, DNS, TLS Handshake', 'What happens step-by-step when you open a URL?'],
        ['System Design', 'Load Balancing, Caching, Sharding, CAP Theorem', 'How would you design a scalable URL shortener or rate limiter?']
      ]
    },
    citations: [
      { label: 'PostgreSQL Official Documentation — Indexes & Transactions', url: 'https://www.postgresql.org/docs/' },
      { label: 'Cloudflare Learning Center — How DNS & HTTPS Work', url: 'https://www.cloudflare.com/learning/' }
    ]
  }
];

const Guides = () => {
  const { slug } = useParams();
  const activeGuide = slug ? GUIDES_DATA.find((g) => g.slug === slug) : null;

  // Individual Guide Article View
  if (activeGuide) {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: activeGuide.title,
      description: activeGuide.metaDescription,
      datePublished: activeGuide.updatedAt,
      dateModified: activeGuide.updatedAt,
      author: {
        '@type': 'Person',
        name: 'Mukund Khandelwal',
        url: 'https://careerpilot.website/about'
      },
      publisher: {
        '@type': 'Organization',
        name: 'CareerPilot',
        logo: {
          '@type': 'ImageObject',
          url: 'https://careerpilot.website/logo.png'
        }
      },
      mainEntityOfPage: `https://careerpilot.website/guides/${activeGuide.slug}`
    };

    return (
      <div className="page-shell">
        <SEOHead
          title={activeGuide.title}
          description={activeGuide.metaDescription}
          path={`/guides/${activeGuide.slug}`}
          ogType="article"
          keywords={activeGuide.keywords}
          breadcrumbs={[
            { name: 'Home', url: '/' },
            { name: 'Career Guides', url: '/guides' },
            { name: activeGuide.title, url: `/guides/${activeGuide.slug}` }
          ]}
          jsonLd={articleSchema}
        />
        <Navbar />
        <main className="page" style={{ maxWidth: '940px', margin: '28px auto', padding: '0 20px' }}>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--muted)', marginBottom: '20px', flexWrap: 'wrap' }}>
            <Link to="/" style={{ fontWeight: 600 }}>Home</Link>
            <ChevronRight size={14} />
            <Link to="/guides" style={{ fontWeight: 600 }}>Career Guides</Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>{activeGuide.category}</span>
          </nav>

          <article className="card" style={{ padding: '40px 36px', borderRadius: '28px' }}>
            <header style={{ marginBottom: '28px' }}>
              <span style={{
                display: 'inline-block',
                padding: '5px 12px',
                borderRadius: '999px',
                background: 'rgba(255, 107, 74, 0.1)',
                color: '#e14b29',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                marginBottom: '14px'
              }}>
                {activeGuide.category.toUpperCase()}
              </span>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px', color: '#122023' }}>
                {activeGuide.title}
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', fontSize: '0.84rem', color: 'var(--muted)', fontWeight: 600 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <User size={15} /> By <Link to="/about" style={{ color: '#122023', textDecoration: 'underline' }}>Mukund Khandelwal</Link>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={15} /> {activeGuide.readTime}
                </span>
                <time dateTime={activeGuide.updatedAt}>Updated: {activeGuide.updatedAt}</time>
              </div>
            </header>

            {/* AEO Direct Answer Box */}
            <section aria-label="Quick Answer" style={{
              background: 'linear-gradient(135deg, rgba(255, 107, 74, 0.08), rgba(124, 214, 199, 0.14))',
              border: '1px solid rgba(255, 107, 74, 0.22)',
              borderRadius: '18px',
              padding: '20px 22px',
              marginBottom: '30px'
            }}>
              <strong style={{ display: 'block', fontSize: '0.78rem', color: '#e14b29', letterSpacing: '0.08em', marginBottom: '6px' }}>
                QUICK ANSWER SUMMARY
              </strong>
              <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: 1.65, color: '#182326', fontWeight: 500 }}>
                {activeGuide.directAnswer}
              </p>
            </section>

            {/* Main Article Sections */}
            {activeGuide.sections.map((sec, idx) => (
              <section key={idx} style={{ marginBottom: '28px' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#122023', margin: '0 0 12px' }}>
                  {sec.heading}
                </h2>
                {sec.body && (
                  <p style={{ fontSize: '0.96rem', lineHeight: 1.72, color: '#334155', margin: 0 }}>
                    {sec.body}
                  </p>
                )}
                {sec.steps && (
                  <ol style={{ margin: '10px 0 0', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {sec.steps.map((step, sIdx) => (
                      <li key={sIdx} style={{ fontSize: '0.95rem', lineHeight: 1.65, color: '#334155' }}>
                        {step}
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            ))}

            {/* Structured Comparison Table (AEO / GEO) */}
            {activeGuide.comparison && (
              <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#122023', margin: '0 0 14px' }}>
                  {activeGuide.comparison.heading}
                </h2>
                <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid rgba(24, 35, 38, 0.1)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', background: '#fff' }}>
                    <thead>
                      <tr style={{ background: '#122023', color: '#fff', textAlign: 'left' }}>
                        {activeGuide.comparison.columns.map((col, cIdx) => (
                          <th key={cIdx} style={{ padding: '12px 16px', fontWeight: 700 }}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {activeGuide.comparison.rows.map((row, rIdx) => (
                        <tr key={rIdx} style={{ borderTop: '1px solid rgba(24, 35, 38, 0.08)', background: rIdx % 2 === 1 ? '#f8fafc' : '#fff' }}>
                          {row.map((cell, cellIdx) => (
                            <td key={cellIdx} style={{ padding: '12px 16px', fontWeight: cellIdx === 0 ? 700 : 500, color: '#1e293b' }}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Trustworthy External Citations */}
            <section style={{ marginBottom: '32px', paddingTop: '16px', borderTop: '1px solid rgba(24, 35, 38, 0.08)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 10px', color: '#122023' }}>
                References & Further Reading
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {activeGuide.citations.map((cite, idx) => (
                  <li key={idx}>
                    <a
                      href={cite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: '#e14b29', fontWeight: 600 }}
                    >
                      <ExternalLink size={14} /> {cite.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {/* Clear CTA */}
            <div style={{
              background: '#122023',
              color: '#fff',
              borderRadius: '20px',
              padding: '26px 28px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div>
                <h3 style={{ margin: '0 0 6px', fontSize: '1.15rem', fontWeight: 800 }}>Put this guide into action with CareerPilot</h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#cbd5e1' }}>
                  Scan your resume for free, get an instant ATS score, and practice with our AI Interviewer.
                </p>
              </div>
              <Link
                to="/upload"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 22px',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, #ff6b4a, #ff8f57)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.9rem'
                }}
              >
                Launch ATS Screener <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  // Guides Hub Listing Page (/guides)
  return (
    <div className="page-shell">
      <SEOHead
        title="ATS Resume, Interview & CS Preparation Guides"
        description="Free, research-backed guides on ATS resume optimization, AI voice mock interviews, and Computer Science fundamentals (OS, DBMS, CN, OOPs, System Design)."
        path="/guides"
        keywords="ATS resume guide, interview prep articles, CS fundamentals study roadmap, CareerPilot resources"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Career Guides', url: '/guides' }
        ]}
      />
      <Navbar />
      <main className="page" style={{ maxWidth: '1160px', margin: '32px auto', padding: '0 20px' }}>
        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--muted)', marginBottom: '18px' }}>
          <Link to="/" style={{ fontWeight: 600 }}>Home</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--text)', fontWeight: 700 }}>Career Guides</span>
        </nav>

        <header style={{ marginBottom: '36px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            borderRadius: '999px',
            background: 'rgba(255, 107, 74, 0.1)',
            color: '#e14b29',
            fontSize: '0.76rem',
            fontWeight: 800,
            marginBottom: '12px'
          }}>
            <BookOpen size={14} /> PUBLIC KNOWLEDGE HUB
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, margin: '0 0 12px', color: '#122023' }}>
            CareerPilot ATS, Interview & Engineering Prep Guides
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--muted)', maxWidth: '720px', lineHeight: 1.65, margin: 0 }}>
            Actionable, structured guides written to help software engineers, students, and job seekers pass ATS screening, build executive LaTeX resumes, and master technical interviews.
          </p>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          {GUIDES_DATA.map((guide) => (
            <article key={guide.slug} className="card" style={{ padding: '28px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '18px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#e14b29', background: 'rgba(255, 107, 74, 0.1)', padding: '4px 10px', borderRadius: '999px' }}>
                    {guide.category}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 600 }}>{guide.readTime}</span>
                </div>
                <h2 style={{ fontSize: '1.22rem', fontWeight: 800, lineHeight: 1.35, margin: '0 0 12px', color: '#122023' }}>
                  <Link to={`/guides/${guide.slug}`}>{guide.title}</Link>
                </h2>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  {guide.directAnswer}
                </p>
              </div>
              <Link
                to={`/guides/${guide.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  color: '#e14b29'
                }}
              >
                Read Full Guide <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </section>

        <section className="card" style={{ padding: '30px', borderRadius: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '18px' }}>
          <div>
            <h2 style={{ margin: '0 0 6px', fontSize: '1.3rem', fontWeight: 800, color: '#122023' }}>
              Ready to test your resume against real ATS algorithms?
            </h2>
            <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--muted)' }}>
              Upload your PDF or DOCX resume to receive an instant compatibility score, missing keywords, and AI suggestions.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/upload" className="btn-primary" style={{ padding: '12px 22px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
              <Sparkles size={16} /> Check ATS Score
            </Link>
            <Link to="/about" style={{ padding: '12px 20px', borderRadius: '999px', border: '1px solid rgba(24,35,38,0.15)', fontWeight: 700, color: '#122023', background: '#fff' }}>
              About CareerPilot
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Guides;
