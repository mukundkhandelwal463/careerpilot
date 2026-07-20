import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../Components/navbar.jsx';
import { detailedTheoryData } from '../data/detailedTheoryData';
import { 
  ArrowLeft, 
  BookOpen, 
  Terminal, 
  Cpu, 
  Clock, 
  Sparkles, 
  Check, 
  Copy, 
  ChevronLeft, 
  ChevronRight,
  BookMarked,
  HelpCircle
} from 'lucide-react';
import { questionBankData } from '../data/questionBankData.js';

const DetailedTheory = () => {
  const { patternName } = useParams();
  const navigate = useNavigate();
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [copiedExample, setCopiedExample] = useState(false);
  const [activeLang, setActiveLang] = useState('js'); // 'js' | 'python' | 'cpp'
  const [userAnswers, setUserAnswers] = useState({});
  const [revealedExplanations, setRevealedExplanations] = useState({});

  const handleSelectMCQ = (questionId, option) => {
    if (userAnswers[questionId] !== undefined) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: option }));
    setRevealedExplanations(prev => ({ ...prev, [questionId]: true }));
  };
  const decodedName = decodeURIComponent(patternName || '');
  const data = detailedTheoryData[decodedName];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [patternName]);

  if (!data) {
    return (
      <div className="page-shell" style={{ minHeight: '100vh', background: '#f8fafc' }}>
        <Navbar />
        <main className="page" style={{ marginTop: '40px', textAlign: 'center', padding: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', marginBottom: '16px' }}>Topic Not Found</h2>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>The requested DSA pattern guide does not exist or has been moved.</p>
          <Link to="/preparation" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft className="size-4" /> Return to Preparation Hub
          </Link>
        </main>
      </div>
    );
  }

  // Helper to get ordered keys to find Prev/Next topics
  const topicKeys = [
    "Arrays & Hashing",
    "String",
    "Recursion",
    "Sorting",
    "Two Pointers",
    "Sliding Window",
    "Stack",
    "Queues & Deques",
    "Linked List",
    "Binary Search",
    "Matrix / Grid",
    "Trees",
    "Binary Search Tree (BST)",
    "Tries",
    "Heap / Priority Queue",
    "Backtracking",
    "Greedy",
    "Intervals",
    "Graphs",
    "Advanced Graphs",
    "Bit Manipulation",
    "Math & Geometry",
    "1-D DP",
    "2-D DP",
    "Design",
    "Advanced Data Structures",
    "OOPs"
  ];

  const currentIndex = topicKeys.indexOf(decodedName);
  const prevTopic = currentIndex > 0 ? topicKeys[currentIndex - 1] : null;
  const nextTopic = currentIndex < topicKeys.length - 1 ? topicKeys[currentIndex + 1] : null;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'template') {
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2000);
    } else {
      setCopiedExample(true);
      setTimeout(() => setCopiedExample(false), 2000);
    }
  };

  // Quick helper to fetch the pre-authored code snippet for the selected language
  const getCodeSnippet = (codeObj, lang) => {
    if (!codeObj) return '';
    if (typeof codeObj === 'string') {
      // Fallback for any legacy code blocks using string format
      return codeObj;
    }
    return codeObj[lang] || codeObj['js'] || '';
  };


  return (
    <div className="page-shell" style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />
      
      <div style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 24px' }}>
        {/* Back Link */}
        <Link 
          to="/preparation" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#6366f1', 
            fontWeight: 700, 
            fontSize: '0.86rem', 
            textDecoration: 'none',
            marginBottom: '24px',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
        >
          <ArrowLeft className="size-4" /> Back to Preparation Hub
        </Link>

        {/* Topic Title Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '24px',
          padding: '40px',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-20%', left: '10%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ padding: '6px 12px', background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
              DSA MASTERCLASS
            </span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>•</span>
            <span style={{ fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock className="size-4 text-indigo-400" /> 15 mins read
            </span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
            {data.title}
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#94a3b8', maxWidth: '850px', lineHeight: '1.6', margin: 0 }}>
            {data.overview}
          </p>
        </div>

        {/* main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }}>
          
          {/* LEFT: Main Content Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Core concepts card */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eff6ff', color: '#1d4ed8', display: 'grid', placeItems: 'center' }}>
                  <Cpu className="size-5" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Core Concepts & Intuition</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                {data.concepts.map((concept, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    padding: '20px',
                    background: '#f8fafc',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <span style={{
                      flexShrink: 0,
                      width: '28px', height: '28px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      color: '#ffffff',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      display: 'grid',
                      placeItems: 'center'
                    }}>{idx + 1}</span>
                    <div>
                      <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#1e293b', margin: '0 0 6px 0' }}>{concept.name}</h4>
                      <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5', margin: 0 }}>{concept.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Types of Data Structure / Pattern Classifications */}
            {data.types && data.types.length > 0 && (
              <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'grid', placeItems: 'center' }}>
                    <BookOpen className="size-5" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Classifications & Types</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  {data.types.map((type, idx) => (
                    <div key={idx} style={{
                      padding: '20px',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                      transition: 'transform 0.2s',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#6366f1' }} />
                      <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0' }}>{type.name}</h4>
                      <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: '1.5', margin: 0 }}>{type.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Standard Code Template */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f5f3ff', color: '#7c3aed', display: 'grid', placeItems: 'center' }}>
                    <Terminal className="size-5" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Standard Code Template</h3>
                </div>

                {/* Language switcher */}
                <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
                  <button onClick={() => setActiveLang('js')} style={{ border: 'none', padding: '6px 12px', fontSize: '0.78rem', fontWeight: 800, borderRadius: '8px', cursor: 'pointer', background: activeLang === 'js' ? '#ffffff' : 'transparent', color: activeLang === 'js' ? '#0f172a' : '#64748b', boxShadow: activeLang === 'js' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}>JS</button>
                  <button onClick={() => setActiveLang('python')} style={{ border: 'none', padding: '6px 12px', fontSize: '0.78rem', fontWeight: 800, borderRadius: '8px', cursor: 'pointer', background: activeLang === 'python' ? '#ffffff' : 'transparent', color: activeLang === 'python' ? '#0f172a' : '#64748b', boxShadow: activeLang === 'python' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}>Python</button>
                  <button onClick={() => setActiveLang('cpp')} style={{ border: 'none', padding: '6px 12px', fontSize: '0.78rem', fontWeight: 800, borderRadius: '8px', cursor: 'pointer', background: activeLang === 'cpp' ? '#ffffff' : 'transparent', color: activeLang === 'cpp' ? '#0f172a' : '#64748b', boxShadow: activeLang === 'cpp' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}>C++</button>
                  <button onClick={() => setActiveLang('java')} style={{ border: 'none', padding: '6px 12px', fontSize: '0.78rem', fontWeight: 800, borderRadius: '8px', cursor: 'pointer', background: activeLang === 'java' ? '#ffffff' : 'transparent', color: activeLang === 'java' ? '#0f172a' : '#64748b', boxShadow: activeLang === 'java' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}>Java</button>
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <pre style={{
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: '24px',
                  borderRadius: '16px',
                  fontSize: '0.88rem',
                  fontFamily: 'monospace, Courier New',
                  overflowX: 'auto',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  <code>{getCodeSnippet(data.template, activeLang)}</code>
                </pre>
                <button
                  onClick={() => handleCopy(getCodeSnippet(data.template, activeLang), 'template')}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    padding: '8px',
                    color: '#e2e8f0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                >
                  {copiedTemplate ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                </button>
              </div>
            </section>

            {/* Dry Run Walkthrough Example */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'grid', placeItems: 'center' }}>
                  <Sparkles className="size-5" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Standard Problem Walkthrough</h3>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Featuring: <strong style={{ color: '#059669' }}>{data.example.name}</strong></span>
                </div>
              </div>

              <div style={{ padding: '16px 20px', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#166534', margin: '0 0 6px 0' }}>Problem Statement</h4>
                <p style={{ fontSize: '0.88rem', color: '#14532d', lineHeight: '1.5', margin: 0 }}>{data.example.desc}</p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#1e293b', margin: '0 0 10px 0' }}>Step-by-Step Dry Run</h4>
                <pre style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  fontSize: '0.86rem',
                  fontFamily: 'monospace, Courier New',
                  color: '#334155',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  margin: 0
                }}>
                  {data.example.dryRun}
                </pre>
              </div>

              {data.example.visualTrace && (
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#1e293b', margin: '0 0 10px 0' }}>Visual Execution Trace</h4>
                  <pre style={{
                    background: '#0f172a',
                    color: '#38bdf8',
                    padding: '20px',
                    borderRadius: '12px',
                    fontSize: '0.86rem',
                    fontFamily: 'monospace, Courier New',
                    overflowX: 'auto',
                    lineHeight: '1.6',
                    border: '1px solid #1e293b',
                    margin: 0
                  }}>
                    <code>{data.example.visualTrace}</code>
                  </pre>
                </div>
              )}

              <div>
                <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#1e293b', margin: '0 0 12px 0' }}>Example Implementation Code</h4>
                <div style={{ position: 'relative' }}>
                  <pre style={{
                    background: '#0f172a',
                    color: '#e2e8f0',
                    padding: '24px',
                    borderRadius: '16px',
                    fontSize: '0.88rem',
                    fontFamily: 'monospace, Courier New',
                    overflowX: 'auto',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    <code>{getCodeSnippet(data.example.code, activeLang)}</code>
                  </pre>
                  <button
                    onClick={() => handleCopy(getCodeSnippet(data.example.code, activeLang), 'example')}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '8px',
                      color: '#e2e8f0',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                  >
                    {copiedExample ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                  </button>
                </div>
              </div>
            </section>

            {/* MCQ Practice Section */}
            {questionBankData.filter(q => q.conceptId === decodedName).length > 0 && (
              <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0', marginTop: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'grid', placeItems: 'center' }}>
                    <HelpCircle className="size-5" />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Topic MCQ Challenge</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {questionBankData.filter(q => q.conceptId === decodedName).map((q, idx) => {
                    const selectedAns = userAnswers[q.id];
                    const isAnswered = selectedAns !== undefined;
                    const showExp = !!revealedExplanations[q.id];

                    return (
                      <div key={q.id} style={{ borderBottom: idx < questionBankData.filter(q => q.conceptId === decodedName).length - 1 ? '1px solid #f1f5f9' : 'none', paddingBottom: idx < questionBankData.filter(q => q.conceptId === decodedName).length - 1 ? '20px' : '0' }}>
                        <p style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e293b', marginBottom: '14px', lineHeight: '1.5' }}>
                          <strong>Q{idx + 1}:</strong> {q.question}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginBottom: '14px' }}>
                          {q.options.map(option => {
                            const isThisSelected = selectedAns === option;
                            const isCorrect = q.answer === option;

                            let optStyle = {
                              background: '#ffffff',
                              border: '1px solid #cbd5e1',
                              color: '#334155',
                              cursor: isAnswered ? 'default' : 'pointer'
                            };

                            if (isAnswered) {
                              if (isCorrect) {
                                optStyle = {
                                  background: '#d1fae5',
                                  border: '1px solid #10b981',
                                  color: '#065f46',
                                  fontWeight: 800,
                                  cursor: 'default'
                                };
                              } else if (isThisSelected) {
                                optStyle = {
                                  background: '#fee2e2',
                                  border: '1px solid #ef4444',
                                  color: '#991b1b',
                                  fontWeight: 800,
                                  cursor: 'default'
                                };
                              } else {
                                optStyle = {
                                  background: '#f8fafc',
                                  border: '1px solid #e2e8f0',
                                  color: '#94a3b8',
                                  cursor: 'default'
                                };
                              }
                            }

                            return (
                              <button
                                key={option}
                                disabled={isAnswered}
                                onClick={() => handleSelectMCQ(q.id, option)}
                                style={{
                                  width: '100%',
                                  textAlign: 'left',
                                  padding: '12px 18px',
                                  borderRadius: '10px',
                                  fontSize: '0.84rem',
                                  fontWeight: 600,
                                  transition: 'all 0.15s',
                                  ...optStyle
                                }}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>

                        {isAnswered && (
                          <div>
                            <button
                              onClick={() => setRevealedExplanations(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#059669',
                                fontSize: '0.8rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                padding: '4px 0',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              <Terminal className="size-4" />
                              {showExp ? "Hide Explanation" : "View Explanation"}
                            </button>

                            {showExp && (
                              <div style={{ marginTop: '10px', padding: '12px 16px', background: '#f8fafc', borderRadius: '10px', borderLeft: '4px solid #10b981', fontSize: '0.82rem', color: '#475569', lineHeight: '1.5' }}>
                                {q.explanation}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Pagination Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', marginBottom: '40px' }}>
              {prevTopic ? (
                <Link 
                  to={`/preparation/theory/${encodeURIComponent(prevTopic)}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    color: '#475569',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.transform = 'translateX(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  <ChevronLeft className="size-4" /> {prevTopic}
                </Link>
              ) : <div />}

              {nextTopic ? (
                <Link 
                  to={`/preparation/theory/${encodeURIComponent(nextTopic)}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    color: '#475569',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.transform = 'translateX(2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  {nextTopic} <ChevronRight className="size-4" />
                </Link>
              ) : <div />}
            </div>

          </div>

          {/* RIGHT: Quick Reference Info Panel */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '100px' }}>
            
            {/* Quick Metrics */}
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>Complexity Reference</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <span style={{ fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '4px' }}>Time Complexity</span>
                  <span style={{ fontSize: '0.86rem', color: '#1e293b', fontWeight: 700, lineHeight: '1.4' }}>{data.complexity.time}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '4px' }}>Space Complexity</span>
                  <span style={{ fontSize: '0.86rem', color: '#1e293b', fontWeight: 700, lineHeight: '1.4' }}>{data.complexity.space}</span>
                </div>
              </div>
            </div>

            {/* When To Use Callout */}
            <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '24px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '1.1rem' }}>🎯</span>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#92400e', margin: 0 }}>Pattern Identification</h4>
              </div>
              <p style={{ fontSize: '0.86rem', color: '#78350f', lineHeight: '1.5', margin: 0 }}>
                {data.whenToUse}
              </p>
            </div>

            {/* Quick Navigation jumps */}
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                <BookMarked className="size-4 text-indigo-500" />
                <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>All DSA Patterns</h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '350px', overflowY: 'auto', paddingRight: '4px' }}>
                {topicKeys.map((topic, ti) => {
                  const isCurrent = topic === decodedName;
                  return (
                    <Link
                      key={topic}
                      to={`/preparation/theory/${encodeURIComponent(topic)}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        color: isCurrent ? '#6366f1' : '#475569',
                        background: isCurrent ? '#f5f3ff' : 'transparent',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => { if (!isCurrent) e.currentTarget.style.background = '#f8fafc'; }}
                      onMouseLeave={(e) => { if (!isCurrent) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <span style={{
                        width: '18px', height: '18px',
                        borderRadius: '50%',
                        background: isCurrent ? '#6366f1' : '#e2e8f0',
                        color: isCurrent ? '#ffffff' : '#64748b',
                        fontSize: '0.64rem',
                        fontWeight: 800,
                        display: 'grid',
                        placeItems: 'center'
                      }}>{ti + 1}</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{topic}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
};

export default DetailedTheory;
