import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import { Loader2, Clock, CheckCircle2, AlertCircle, Play, ChevronRight, Lock } from 'lucide-react';
import Navbar from '../Components/navbar.jsx';

const MockTest = () => {
  const [searchParams] = useSearchParams();
  const difficulty = searchParams.get('difficulty') || 'medium';

  const [loading, setLoading] = useState(true);
  const [testData, setTestData] = useState(null);
  const [error, setError] = useState(null);

  // States: 'intro', 'test', 'result'
  const [testState, setTestState] = useState('intro');

  // Sequential sections
  const sectionOrder = ['technical', 'verbal', 'aptitude', 'coding_easy', 'coding_hard'];
  const [activeSection, setActiveSection] = useState('technical');
  const [completedSections, setCompletedSections] = useState({});

  // Answers state
  const [answers, setAnswers] = useState({});
  const [codingAnswers, setCodingAnswers] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState({ title: '', message: '', onConfirm: null });
  const [codingLanguages, setCodingLanguages] = useState({ code_easy: 'python', code_hard: 'python' });
  const [evalResults, setEvalResults] = useState({});
  const [evaluating, setEvaluating] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  // Individual timers in seconds
  const [sectionTimes, setSectionTimes] = useState({
    technical: 90 * 60,      // 60 questions => 1.5 min per question = 90 min
    verbal: 15 * 60,         // 15 questions => 1.0 min per question = 15 min
    aptitude: 22.5 * 60,     // 15 questions => 1.5 min per question = 22.5 min
    coding_easy: 20 * 60,    // 1 Easy problem => 20 min
    coding_hard: 30 * 60     // 1 Hard problem => 30 min
  });

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/mock-test/generate`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ difficulty })
        });
        const data = await response.json();

        if (data.success) {
          setTestData(data.test_data);
          setLoading(false);
        } else {
          setError(data.error || 'Failed to generate test. Please try again.');
          setLoading(false);
        }
      } catch (err) {
        setError(err.message || 'An error occurred.');
        setLoading(false);
      }
    };
    fetchTestData();
  }, [difficulty]);

  useEffect(() => {
    if (activeSection === 'coding_easy' || activeSection === 'coding_hard') {
      const isHard = activeSection === 'coding_hard';
      const questions = testData?.coding || [];
      const q = isHard ? questions[1] : questions[0];
      if (q) {
        const lang = codingLanguages[q.id] || 'python';
        if (!codingAnswers[q.id] && q.templates && q.templates[lang]) {
          setCodingAnswers(prev => ({ ...prev, [q.id]: q.templates[lang] }));
        }
      }
    }
  }, [activeSection, testData, codingLanguages]);

  // Section-based Timer Effect
  useEffect(() => {
    let timer;
    if (testState === 'test' && !completedSections[activeSection]) {
      timer = setInterval(() => {
        setSectionTimes(prev => {
          const currentLeft = prev[activeSection];
          if (currentLeft <= 1) {
            clearInterval(timer);
            // Auto submit section on timeout
            setTimeout(() => handleSectionSubmit(true), 10);
            return { ...prev, [activeSection]: 0 };
          }
          return { ...prev, [activeSection]: currentLeft - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testState, activeSection, completedSections]);

  const handleAnswerSelect = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleCodingChange = (questionId, code) => {
    setCodingAnswers(prev => ({ ...prev, [questionId]: code }));
  };

  const handleLanguageChange = (qId, newLang, q) => {
    setCodingLanguages(prev => ({ ...prev, [qId]: newLang }));
    const currentCode = codingAnswers[qId] || '';
    const otherTemplates = Object.values(q?.templates || {});
    const isDefaultOrEmpty = !currentCode.trim() || otherTemplates.some(t => currentCode.trim() === t.trim());
    
    if (isDefaultOrEmpty && q?.templates && q.templates[newLang]) {
      setCodingAnswers(prev => ({ ...prev, [qId]: q.templates[newLang] }));
    }
  };

  const submitTest = async (finalCompletedSections) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setTestState('submitting');

    try {
      const res = await fetch('/api/mock-test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          difficulty,
          test_data: testData,
          answers,
          coding_answers: codingAnswers,
          coding_languages: codingLanguages
        })
      });
      const data = await res.json();
      if (data.success) {
        setSubmitResult(data);
        setTestState('result');
      } else {
        setSubmitError(data.error || 'Failed to submit test.');
        setTestState('result');
      }
    } catch (err) {
      setSubmitError('Failed to submit test due to a network connection issue.');
      setTestState('result');
    } finally {
      setIsSubmitting(false);
    }
  };

  const executeSectionSubmit = () => {
    const updatedSections = { ...completedSections, [activeSection]: true };
    setCompletedSections(updatedSections);

    const currentIdx = sectionOrder.indexOf(activeSection);
    if (currentIdx < sectionOrder.length - 1) {
      const nextSec = sectionOrder[currentIdx + 1];
      setActiveSection(nextSec);
    } else {
      // Last section submitted => submit test to backend for AI evaluation
      submitTest(updatedSections);
    }
  };

  const handleSectionSubmit = (isAuto = false) => {
    if (isAuto) {
      executeSectionSubmit();
    } else {
      setConfirmModalData({
        title: `Submit ${getSectionLabel(activeSection)}`,
        message: `Are you sure you want to submit the ${getSectionLabel(activeSection)} section? You will not be able to return to it.`,
        onConfirm: () => executeSectionSubmit()
      });
      setShowConfirmModal(true);
    }
  };

  const handleRunCode = async (qId) => {
    const code = codingAnswers[qId] || '';
    if (!code.trim()) {
      alert("Please write some code first before running it.");
      return;
    }

    const language = codingLanguages[qId] || 'python';
    const questions = testData.coding || [];
    const q = questions.find(item => item.id === qId) || {};

    setEvaluating(prev => ({ ...prev, [qId]: true }));
    setEvalResults(prev => ({ ...prev, [qId]: null }));

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/mock-test/run-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          code,
          title: q.title || '',
          description: q.description || '',
          examples: q.examples || []
        })
      });
      const data = await res.json();
      if (data.success && data.result) {
        setEvalResults(prev => ({ ...prev, [qId]: data.result }));
      } else {
        setEvalResults(prev => ({ ...prev, [qId]: { compiled: false, passed: false, output: data.error || 'Execution failed.' } }));
      }
    } catch (err) {
      setEvalResults(prev => ({ ...prev, [qId]: { compiled: false, passed: false, output: 'Connection failed to execution API.' } }));
    } finally {
      setEvaluating(prev => ({ ...prev, [qId]: false }));
    }
  };

  const getSectionLabel = (secId) => {
    switch (secId) {
      case 'technical': return 'Technical MCQs';
      case 'verbal': return 'Verbal Reasoning';
      case 'aptitude': return 'Aptitude';
      case 'coding_easy': return 'Coding (Easy)';
      case 'coding_hard': return 'Coding (Hard)';
      default: return '';
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const calculateScore = (section) => {
    if (!testData) return { correct: 0, total: 0 };
    const questions = testData[section] || [];
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.answer) correct++;
    });
    return { correct, total: questions.length };
  };

  if (loading) {
    return (
      <div className="page-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Loader2 className="size-12 text-indigo-600" style={{ animation: 'spin 1s linear infinite' }} />
          <h2 style={{ marginTop: '20px', fontSize: '1.4rem', color: '#1e293b', fontWeight: 800 }}>Assembling custom AI Mock Test...</h2>
          <p style={{ color: '#64748b', marginTop: '8px' }}>This takes about 20-30 seconds. Generating fresh, targeted questions.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <AlertCircle className="size-12 text-red-500" />
          <h2 style={{ marginTop: '20px', fontSize: '1.3rem', color: '#ef4444', fontWeight: 800 }}>Error Generating Test</h2>
          <p style={{ color: '#64748b', marginTop: '6px' }}>{error}</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '12px 24px', borderRadius: '12px', background: '#4f46e5', color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)' }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (testState === 'intro') {
    return (
      <div className="page-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ maxWidth: '800px', width: '100%', background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>AI-Powered Mock Assessment</h1>
            <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '32px' }}>Difficulty: <strong style={{ textTransform: 'capitalize', color: '#4f46e5' }}>{difficulty}</strong></p>

            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', marginBottom: '32px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', marginBottom: '16px' }}>Section breakdown & timing</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <span style={{ color: '#475569', fontWeight: 600 }}>1. Technical MCQs (6 subjects)</span> 
                  <strong>60 MCQs / 90 mins</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <span style={{ color: '#475569', fontWeight: 600 }}>2. Verbal Reasoning</span> 
                  <strong>15 MCQs / 15 mins</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <span style={{ color: '#475569', fontWeight: 600 }}>3. Aptitude / Quantitative</span> 
                  <strong>15 MCQs / 22.5 mins</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <span style={{ color: '#475569', fontWeight: 600 }}>4. Coding (Easy)</span> 
                  <strong>1 Problem / 20 mins</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}>
                  <span style={{ color: '#475569', fontWeight: 600 }}>5. Coding (Hard)</span> 
                  <strong>1 Problem / 30 mins</strong>
                </li>
              </ul>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#b45309', background: '#fef3c7', padding: '16px', borderRadius: '16px', marginBottom: '32px', fontSize: '0.95rem', fontWeight: 500 }}>
              <Clock className="size-5" />
              <span>Sections are sequential. Once you submit a section, you cannot return to it. Timers tick independently per section.</span>
            </div>

            <button onClick={() => setTestState('test')} style={{ width: '100%', padding: '18px', borderRadius: '16px', background: 'linear-gradient(to right, #4f46e5, #3b82f6)', color: 'white', fontSize: '1.15rem', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(79, 70, 229, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Play className="size-5" /> Start Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (testState === 'submitting') {
    return (
      <div className="page-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Loader2 className="size-12 text-indigo-600" style={{ animation: 'spin 1.5s linear infinite' }} />
          <h2 style={{ marginTop: '20px', fontSize: '1.4rem', color: '#1e293b', fontWeight: 800 }}>Analyzing & Grading Assessment...</h2>
          <p style={{ color: '#64748b', marginTop: '8px', textAlign: 'center', maxWidth: '440px', padding: '0 20px' }}>
            Gemini is grading your programming solutions and checking MCQs. This will take about 20-30 seconds.
          </p>
        </div>
      </div>
    );
  }

  if (testState === 'result') {
    const techScore = calculateScore('technical');
    const verbScore = calculateScore('verbal');
    const aptScore = calculateScore('aptitude');
    const totalCorrect = techScore.correct + verbScore.correct + aptScore.correct;
    const totalMCQs = techScore.total + verbScore.total + aptScore.total;
    const percentage = totalMCQs > 0 ? Math.round((totalCorrect / totalMCQs) * 100) : 0;

    const grading = submitResult?.details?.grading || {};
    const coding_easy = grading.coding_easy || {};
    const coding_hard = grading.coding_hard || {};

    return (
      <div className="page-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <div style={{ maxWidth: '900px', width: '100%', background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1e293b', textAlign: 'center', marginBottom: '8px' }}>Assessment Results</h1>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '40px' }}>Here is your comprehensive score report.</p>

            {submitError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', padding: '16px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem', fontWeight: 600 }}>
                ⚠ {submitError} (Local score displayed below. Register/Login to persist results)
              </div>
            )}

            <div style={{ display: 'flex', gap: '30px', marginBottom: '40px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px', background: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)', padding: '40px 30px', borderRadius: '20px', textAlign: 'center', border: '1px solid #a7f3d0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontSize: '4.5rem', fontWeight: 800, color: '#059669', lineHeight: 1 }}>
                  {submitResult ? `${submitResult.score}` : `${techScore.correct * 1.5 + verbScore.correct + aptScore.correct}`}
                </div>
                <div style={{ fontSize: '1.2rem', color: '#047857', fontWeight: 700, marginTop: '8px' }}>
                  / {submitResult ? submitResult.max_score : '200'} Marks
                </div>
                <div style={{ color: '#047857', fontWeight: 600, marginTop: '16px', fontSize: '0.95rem' }}>Overall Graded Performance</div>
              </div>

              <div style={{ flex: 1.5, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
                <div style={{ background: '#f8fafc', padding: '18px 24px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontWeight: 700, color: '#475569' }}>Technical Core (90 Marks max)</span>
                  <strong style={{ fontSize: '1.25rem', color: '#1e293b' }}>
                    {submitResult ? `${submitResult.technical_score} / 90.0` : `${techScore.correct * 1.5} / 90.0`}
                  </strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '18px 24px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontWeight: 700, color: '#475569' }}>Verbal Reasoning (15 Marks max)</span>
                  <strong style={{ fontSize: '1.25rem', color: '#1e293b' }}>
                    {submitResult ? `${submitResult.verbal_score} / 15.0` : `${verbScore.correct} / 15.0`}
                  </strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '18px 24px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontWeight: 700, color: '#475569' }}>Aptitude / Quant (15 Marks max)</span>
                  <strong style={{ fontSize: '1.25rem', color: '#1e293b' }}>
                    {submitResult ? `${submitResult.aptitude_score} / 15.0` : `${aptScore.correct} / 15.0`}
                  </strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '18px 24px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontWeight: 700, color: '#475569' }}>Easy Coding (30 Marks max)</span>
                  <strong style={{ fontSize: '1.25rem', color: '#1e293b' }}>
                    {submitResult ? `${submitResult.coding_easy_score} / 30.0` : 'N/A'}
                  </strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '18px 24px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontWeight: 700, color: '#475569' }}>Hard Coding (50 Marks max)</span>
                  <strong style={{ fontSize: '1.25rem', color: '#1e293b' }}>
                    {submitResult ? `${submitResult.coding_hard_score} / 50.0` : 'N/A'}
                  </strong>
                </div>
              </div>
            </div>

            {submitResult && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', margin: '0' }}>AI Coding Evaluations</h3>
                {coding_easy && (
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <strong style={{ color: '#4f46e5' }}>Coding (Easy) Challenge</strong>
                      <strong style={{ color: '#059669' }}>Score: {submitResult.coding_easy_score} / 30.0</strong>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                      <strong>AI Evaluation:</strong> {coding_easy.feedback}
                    </p>
                  </div>
                )}
                {coding_hard && (
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <strong style={{ color: '#4f46e5' }}>Coding (Hard) Challenge</strong>
                      <strong style={{ color: '#059669' }}>Score: {submitResult.coding_hard_score} / 50.0</strong>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                      <strong>AI Evaluation:</strong> {coding_hard.feedback}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              {submitResult && (
                <button
                  onClick={() => window.open(`/api/results/download-pdf?id=${submitResult.attempt_id}&type=test`, '_blank')}
                  style={{
                    padding: '14px 36px',
                    borderRadius: '12px',
                    background: 'linear-gradient(to right, #4f46e5, #3b82f6)',
                    color: 'white',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)'
                  }}
                >
                  Download Report PDF
                </button>
              )}
              <button
                onClick={() => window.close()}
                style={{
                  padding: '14px 36px',
                  borderRadius: '12px',
                  background: '#1e293b',
                  color: 'white',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Close Assessment Tab
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MCQs rendering
  const renderMCQSection = (sectionName) => {
    const questions = testData[sectionName] || [];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {questions.map((q, idx) => (
          <div key={q.id} style={{ background: 'white', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, color: '#4f46e5', fontSize: '0.95rem' }}>Question {idx + 1}</span>
              {q.subject && <span style={{ background: 'rgba(79, 70, 229, 0.08)', color: '#4f46e5', padding: '6px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700 }}>{q.subject}</span>}
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e293b', marginBottom: '20px', lineHeight: 1.5 }}>{q.question}</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {q.options.map((opt, oIdx) => {
                const isSelected = answers[q.id] === opt;
                return (
                  <label key={oIdx} style={{
                    display: 'flex', alignItems: 'center', gap: '14px', padding: '16px',
                    borderRadius: '12px', border: isSelected ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                    background: isSelected ? '#f5f7ff' : '#f8fafc', cursor: 'pointer', transition: 'all 0.2s',
                    fontWeight: isSelected ? 600 : 500, color: isSelected ? '#1e1b4b' : '#334155'
                  }}>
                    <input
                      type="radio"
                      name={q.id}
                      value={opt}
                      checked={isSelected}
                      onChange={() => handleAnswerSelect(q.id, opt)}
                      style={{ width: '18px', height: '18px', accentColor: '#4f46e5', cursor: 'pointer' }}
                    />
                    <span>{opt}</span>
                  </label>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Coding rendering
  const renderCodingSection = (isHard = false) => {
    const questions = testData.coding || [];
    const q = isHard ? questions[1] : questions[0];
    
    if (!q) return <p>No coding question generated.</p>;

    return (
      <div style={{ background: 'white', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>{q.title}</h2>
          <span style={{ background: q.difficulty === 'Hard' ? '#fef2f2' : '#ecfdf5', color: q.difficulty === 'Hard' ? '#dc2626' : '#059669', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800 }}>
            {q.difficulty}
          </span>
        </div>

        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '24px' }}>
          {q.description}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <strong style={{ color: '#1e293b', fontSize: '1.05rem', fontWeight: 700 }}>Examples:</strong>
          {q.examples && q.examples.map((ex, exIdx) => {
            const isObj = typeof ex === 'object' && ex !== null;
            const inputVal = isObj ? ex.input : (ex.split('\nOutput:')[0] || '').replace('Input:', '').replace('Input :', '').trim();
            const outputVal = isObj ? ex.output : (ex.split('\nOutput:')[1] || '').split('(since')[0].replace('Output:', '').replace('Output :', '').trim();
            const explVal = isObj ? ex.explanation : ((ex.split('(since')[1] || '').replace(')', '').trim());

            return (
              <div key={exIdx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <span style={{ color: '#64748b', fontWeight: 700 }}>Example {exIdx + 1}:</span>
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.92rem', color: '#334155', background: '#f1f5f9', padding: '12px 16px', borderRadius: '10px', display: 'inline-block', width: '100%', marginBottom: '10px' }}>
                  <div><strong style={{ color: '#4f46e5' }}>Input:</strong> {inputVal}</div>
                  <div style={{ marginTop: '4px' }}><strong style={{ color: '#059669' }}>Output:</strong> {outputVal}</div>
                </div>
                {explVal && (
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                    <strong>Explanation:</strong> {explVal}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '28px' }}>
          <strong style={{ color: '#1e293b' }}>Constraints:</strong>
          <ul style={{ color: '#475569', marginTop: '8px', paddingLeft: '20px', lineHeight: 1.6 }}>
            {q.constraints.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>

        <div style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <label style={{ fontWeight: 700, color: '#1e293b', margin: 0 }}>Your Solution (Editor):</label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <select
                value={codingLanguages[q.id] || 'python'}
                onChange={(e) => handleLanguageChange(q.id, e.target.value, q)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#334155',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript (JS)</option>
              </select>

              <button
                onClick={() => handleRunCode(q.id)}
                disabled={evaluating[q.id]}
                style={{
                  background: 'linear-gradient(to right, #4f46e5, #3b82f6)',
                  color: 'white',
                  padding: '8px 20px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  border: 'none',
                  cursor: evaluating[q.id] ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 10px rgba(79, 70, 229, 0.15)',
                  opacity: evaluating[q.id] ? 0.7 : 1
                }}
              >
                {evaluating[q.id] ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Running...
                  </>
                ) : (
                  'Run Code'
                )}
              </button>
            </div>
          </div>

          <textarea
            value={codingAnswers[q.id] || ''}
            onChange={(e) => handleCodingChange(q.id, e.target.value)}
            placeholder={`// Write your ${codingLanguages[q.id] || 'python'} solution here...`}
            style={{
              width: '100%', height: '350px', background: '#090d16', color: '#38bdf8',
              padding: '24px', borderRadius: '16px', fontFamily: 'monospace', fontSize: '1rem',
              border: '1px solid #1e293b', resize: 'vertical', outline: 'none'
            }}
          />
        </div>

        {evalResults[q.id] && (
          <div style={{ marginTop: '24px', background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>
              Execution Results
            </h4>
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{
                background: evalResults[q.id].compiled ? '#ecfdf5' : '#fef2f2',
                color: evalResults[q.id].compiled ? '#059669' : '#dc2626',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: evalResults[q.id].compiled ? '1px solid #a7f3d0' : '1px solid #fecaca'
              }}>
                {evalResults[q.id].compiled ? '✓ Compiled Successfully' : '✗ Compilation Error'}
              </span>
              {evalResults[q.id].compiled && (
                <span style={{
                  background: evalResults[q.id].passed ? '#ecfdf5' : '#fff7ed',
                  color: evalResults[q.id].passed ? '#059669' : '#ea580c',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  border: evalResults[q.id].passed ? '1px solid #a7f3d0' : '1px solid #ffedd5'
                }}>
                  {evalResults[q.id].passed ? '✓ Sample Testcases Passed' : '⚠ Sample Testcases Failed'}
                </span>
              )}
            </div>

            {evalResults[q.id].output && (
              <div style={{ marginBottom: '20px' }}>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Stdout / Compiler Output:
                </strong>
                <pre style={{
                  margin: 0,
                  background: '#0f172a',
                  color: evalResults[q.id].compiled ? '#e2e8f0' : '#f87171',
                  padding: '16px',
                  borderRadius: '12px',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  whiteSpace: 'pre-wrap',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  {evalResults[q.id].output}
                </pre>
              </div>
            )}

            {evalResults[q.id].test_results && evalResults[q.id].test_results.length > 0 && (
              <div>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Sample Test Cases:
                </strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {evalResults[q.id].test_results.map((tr, idx) => (
                    <div key={idx} style={{
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: '#475569', fontSize: '0.9rem' }}>Case {idx + 1}</span>
                        <span style={{
                          color: tr.passed ? '#10b981' : '#f59e0b',
                          fontWeight: 700,
                          fontSize: '0.85rem'
                        }}>
                          {tr.passed ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem', fontFamily: 'monospace', color: '#334155' }}>
                        <div>
                          <span style={{ color: '#94a3b8' }}>Expected:</span> {tr.expected}
                        </div>
                        <div>
                          <span style={{ color: '#94a3b8' }}>Actual:</span> {tr.actual}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '60px' }}>
      {/* Top Fixed Navigation Bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100, background: 'white', padding: '16px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)', borderBottom: '1px solid #f1f5f9'
      }}>
        <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#1e293b', letterSpacing: '-0.02em' }}>
          AI Assessment Panel
        </div>
        
        {/* Section Timer Display */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fef2f2', color: '#dc2626', padding: '8px 20px', borderRadius: '999px', fontWeight: 800, border: '1px solid #fee2e2' }}>
          <Clock className="size-5" />
          <span>{getSectionLabel(activeSection)} Time: {formatTime(sectionTimes[activeSection])}</span>
        </div>

        <button onClick={() => handleSectionSubmit(false)} style={{ background: '#10b981', color: 'white', padding: '10px 24px', borderRadius: '12px', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)' }}>
          {activeSection === 'coding_hard' ? 'Finish Assessment' : 'Submit & Next Section'}
        </button>
      </div>

      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', padding: '40px 30px', gap: '30px' }}>
        
        {/* Sidebar - Shows sections progress */}
        <div style={{ width: '280px', flexShrink: 0 }}>
          <div style={{ position: 'sticky', top: '100px', background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '20px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Assessment Flow</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sectionOrder.map(secId => {
                const isActive = activeSection === secId;
                const isCompleted = completedSections[secId];
                
                return (
                  <div
                    key={secId}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px',
                      borderRadius: '16px', background: isActive ? '#f5f7ff' : 'transparent',
                      border: isActive ? '1px solid #e0e7ff' : '1px solid transparent',
                      color: isActive ? '#4f46e5' : (isCompleted ? '#94a3b8' : '#64748b'),
                      fontWeight: 700, fontSize: '0.95rem'
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="size-5 text-emerald-500" style={{ flexShrink: 0 }} />
                    ) : (
                      isActive ? (
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '6px solid #4f46e5', background: 'white', flexShrink: 0 }} />
                      ) : (
                        <Lock className="size-5 text-slate-300" style={{ flexShrink: 0 }} />
                      )
                    )}
                    <span>{getSectionLabel(secId)}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content Panel */}
        <div style={{ flex: 1 }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '24px 32px', marginBottom: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#1e293b' }}>
              {getSectionLabel(activeSection)}
            </h2>
            <div style={{ color: '#64748b', fontSize: '0.95rem', fontWeight: 600 }}>
              {activeSection === 'technical' && '60 Questions'}
              {activeSection === 'verbal' && '15 Questions'}
              {activeSection === 'aptitude' && '15 Questions'}
              {activeSection === 'coding_easy' && '1 Coding Challenge'}
              {activeSection === 'coding_hard' && '1 Coding Challenge'}
            </div>
          </div>

          {/* Render the active section question interface */}
          {activeSection === 'coding_easy' && renderCodingSection(false)}
          {activeSection === 'coding_hard' && renderCodingSection(true)}
          {activeSection === 'technical' && renderMCQSection('technical')}
          {activeSection === 'verbal' && renderMCQSection('verbal')}
          {activeSection === 'aptitude' && renderMCQSection('aptitude')}
          
        </div>
      </div>

      {/* Section submit confirmation modal */}
      {showConfirmModal && ReactDOM.createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '32px',
            width: '90%',
            maxWidth: '440px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>
              {confirmModalData.title}
            </h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.96rem', lineHeight: 1.5 }}>
              {confirmModalData.message}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '8px' }}>
              <button
                onClick={() => setShowConfirmModal(false)}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  borderRadius: '12px',
                  background: '#f1f5f9',
                  color: '#64748b',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (confirmModalData.onConfirm) confirmModalData.onConfirm();
                  setShowConfirmModal(false);
                }}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  background: 'linear-gradient(to right, #4f46e5, #3b82f6)',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
                  transition: 'all 0.2s'
                }}
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default MockTest;
