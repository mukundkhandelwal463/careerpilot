import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  Pause,
  Columns,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Copy,
  Code2,
  Terminal,
  FileText,
  BookOpen,
  Clock,
  ExternalLink,
  Loader2,
  Check,
  Cpu,
  Layers,
  Sparkles,
  X
} from 'lucide-react';

const SUPPORTED_LANGUAGES = [
  { id: 'python', name: 'Python 3', judge0Id: 71, ext: 'py' },
  { id: 'cpp', name: 'C++ (GCC)', judge0Id: 54, ext: 'cpp' },
  { id: 'java', name: 'Java (OpenJDK)', judge0Id: 62, ext: 'java' },
  { id: 'javascript', name: 'JavaScript (Node.js)', judge0Id: 63, ext: 'js' },
  { id: 'c', name: 'C (GCC)', judge0Id: 50, ext: 'c' }
];

export default function LeetCodeWorkspace({
  question,
  language = 'python',
  code = '',
  onCodeChange,
  onLanguageChange,
  onRun,
  onSubmit,
  isEvaluating = false,
  isSubmitting = false,
  evalResult = null,
  timeRemaining = null,
  onPrevQuestion = null,
  onNextQuestion = null,
  hasPrev = false,
  hasNext = false,
  sectionTitle = 'Coding Section',
  sectionsOverview = [],
  onSectionSubmit = null,
  sectionSubmitLabel = 'Submit & Next Section',
  fullBleed = false,
  onClose = null,
  solvedNotice = false,
  isSolved = false,
  problemLevel = null
}) {
  const [activeTab, setActiveTab] = useState('description'); // 'description', 'submissions'
  const [consoleTab, setConsoleTab] = useState('testcase'); // 'testcase', 'result'
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [selectedResultIdx, setSelectedResultIdx] = useState(0);
  const [solveElapsedSeconds, setSolveElapsedSeconds] = useState(() => {
    const saved = question?.id ? localStorage.getItem(`dsa_solve_time_${question.id}`) : null;
    return saved ? parseInt(saved, 10) || 0 : 0;
  });
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Timer reset / init when question changes
  useEffect(() => {
    if (question?.id) {
      const saved = localStorage.getItem(`dsa_solve_time_${question.id}`);
      if (saved && isSolved) {
        setSolveElapsedSeconds(parseInt(saved, 10) || 0);
        setIsTimerRunning(false);
      } else {
        setSolveElapsedSeconds(0);
        setIsTimerRunning(!isSolved);
      }
    }
  }, [question?.id, isSolved]);

  // Tick timer every second while running and unsolved
  useEffect(() => {
    if (!isTimerRunning || isSolved) return;
    const interval = setInterval(() => {
      setSolveElapsedSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, isSolved]);

  // Freeze and persist time taken when submission succeeds
  useEffect(() => {
    if (evalResult && (evalResult.all_passed || evalResult.passed) && evalResult.status === 'Accepted' && question?.id) {
      setIsTimerRunning(false);
      localStorage.setItem(`dsa_solve_time_${question.id}`, solveElapsedSeconds.toString());
    }
  }, [evalResult, question?.id, solveElapsedSeconds]);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [customStdin, setCustomStdin] = useState('');
  const [copied, setCopied] = useState(false);
  const [submissionsHistory, setSubmissionsHistory] = useState([]);

  // Adjustable panel dimensions (Split Pane Resizing)
  const [leftWidthPercent, setLeftWidthPercent] = useState(46);
  const [isDraggingH, setIsDraggingH] = useState(false);
  const [consoleHeight, setConsoleHeight] = useState(250);
  const [isDraggingV, setIsDraggingV] = useState(false);

  const mainSplitRef = useRef(null);
  const rightColumnRef = useRef(null);
  const editorRef = useRef(null);
  const lineNumbersRef = useRef(null);

  // Drag handlers for split panels
  const handleMouseDownH = (e) => {
    e.preventDefault();
    setIsDraggingH(true);
  };

  const handleMouseDownV = (e) => {
    e.preventDefault();
    setIsDraggingV(true);
  };

  const handleDoubleClickH = () => {
    setLeftWidthPercent(46);
  };

  const handleDoubleClickV = () => {
    setConsoleHeight(250);
    setConsoleOpen(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDraggingH && mainSplitRef.current) {
        const rect = mainSplitRef.current.getBoundingClientRect();
        const rawPercent = ((e.clientX - rect.left) / rect.width) * 100;
        const clamped = Math.min(Math.max(rawPercent, 20), 80);
        setLeftWidthPercent(clamped);
      }

      if (isDraggingV && rightColumnRef.current) {
        const rect = rightColumnRef.current.getBoundingClientRect();
        const rawHeight = rect.bottom - e.clientY;
        const maxHeight = Math.max(120, rect.height - 100);
        const clamped = Math.min(Math.max(rawHeight, 38), maxHeight);
        setConsoleHeight(clamped);
        if (clamped > 50 && !consoleOpen) {
          setConsoleOpen(true);
        } else if (clamped <= 40 && consoleOpen) {
          setConsoleOpen(false);
        }
      }
    };

    const handleMouseUp = () => {
      if (isDraggingH) setIsDraggingH(false);
      if (isDraggingV) setIsDraggingV(false);
    };

    if (isDraggingH || isDraggingV) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      if (isDraggingH) document.body.style.cursor = 'col-resize';
      if (isDraggingV) document.body.style.cursor = 'row-resize';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDraggingH, isDraggingV, consoleOpen]);

  // Normalize test cases from question
  const testcases = question?.testcases || (question?.examples || []).map((ex, i) => {
    const isObj = typeof ex === 'object' && ex !== null;
    return {
      label: `Case ${i + 1}`,
      input: isObj ? ex.input : String(ex).split('\nOutput:')[0] || '',
      expected: isObj ? ex.output : (String(ex).split('\nOutput:')[1] || '').trim()
    };
  });

  // Current active testcase input
  useEffect(() => {
    if (testcases[selectedCaseIdx]) {
      setCustomStdin(testcases[selectedCaseIdx].input || '');
    }
  }, [selectedCaseIdx, question]);

  // When evalResult updates, switch console tab to 'result' and save to session history
  useEffect(() => {
    if (evalResult) {
      setConsoleTab('result');
      setConsoleOpen(true);
      if (evalResult.test_results && evalResult.test_results.length > 0) {
        const firstFail = evalResult.test_results.findIndex(r => !r.passed);
        setSelectedResultIdx(firstFail >= 0 ? firstFail : 0);
      }
      setSubmissionsHistory(prev => [
        {
          timestamp: new Date().toLocaleTimeString(),
          status: evalResult.status || (evalResult.passed ? 'Accepted' : 'Wrong Answer'),
          time: evalResult.time || '0.01',
          memory: evalResult.memory || 3200,
          language
        },
        ...prev.slice(0, 9)
      ]);
    }
  }, [evalResult]);

  // Sync line numbers scrolling with editor
  const handleScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

  // Tab key handling and shortcuts inside textarea
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const val = e.target.value;
      const newVal = val.substring(0, start) + '    ' + val.substring(end);
      onCodeChange(newVal);
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.selectionStart = editorRef.current.selectionEnd = start + 4;
        }
      }, 0);
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleTriggerRun();
    }
  };

  const handleTriggerRun = () => {
    if (onRun) {
      const activeInput = customStdin || (sampleTestcases[selectedCaseIdx]?.input || '');
      const activeExpected = sampleTestcases[selectedCaseIdx]?.expected || null;
      onRun(activeInput, activeExpected, all13Testcases);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset code to initial template? Your current edits will be discarded.')) {
      const defaultTemplate = question?.templates?.[language] || '';
      onCodeChange(defaultTemplate);
    }
  };

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Format line numbers
  const linesCount = Math.max(1, (code || '').split('\n').length);
  const lineNumbers = Array.from({ length: linesCount }, (_, i) => i + 1);

  // Format timer
  const formatTime = (seconds) => {
    if (seconds == null) return null;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const difficultyColors = {
    Easy: { bg: 'rgba(16, 185, 129, 0.12)', text: '#10b981', border: 'rgba(16, 185, 129, 0.3)' },
    Medium: { bg: 'rgba(245, 158, 11, 0.12)', text: '#f59e0b', border: 'rgba(245, 158, 11, 0.3)' },
    Hard: { bg: 'rgba(239, 68, 68, 0.12)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' }
  };
  const diffStyle = difficultyColors[question?.difficulty || 'Medium'] || difficultyColors.Medium;

  useEffect(() => {
    if (isFullscreen) {
      document.documentElement.classList.add('coding-fullscreen-active');
      document.body.classList.add('coding-fullscreen-active');
      return () => {
        document.documentElement.classList.remove('coding-fullscreen-active');
        document.body.classList.remove('coding-fullscreen-active');
      };
    }
  }, [isFullscreen]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: fullBleed ? '100%' : (isFullscreen ? '100vh' : 'calc(100vh - 120px)'),
        width: '100%',
        minHeight: fullBleed ? '100%' : (isFullscreen ? '100vh' : '680px'),
        background: '#121214',
        color: '#e4e4e7',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        borderRadius: (fullBleed || isFullscreen) ? '0' : '16px',
        overflow: 'hidden',
        border: (fullBleed || isFullscreen) ? 'none' : '1px solid #27272a',
        boxShadow: (fullBleed || isFullscreen) ? 'none' : '0 20px 40px rgba(0,0,0,0.5)',
        position: isFullscreen ? 'fixed' : 'relative',
        inset: isFullscreen ? 0 : 'auto',
        top: isFullscreen ? 0 : 'auto',
        left: isFullscreen ? 0 : 'auto',
        right: isFullscreen ? 0 : 'auto',
        bottom: isFullscreen ? 0 : 'auto',
        zIndex: isFullscreen ? 99999 : 1
      }}
    >
      {/* 1. TOP GLOBAL WORKSPACE NAVIGATION */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 20px',
          background: '#18181b',
          borderBottom: '1px solid #27272a',
          fontSize: '0.88rem',
          height: '52px',
          flexShrink: 0
        }}
      >
        {/* Left: Section Nav & Problem Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setShowSectionModal(true)}
            title="Click to view assessment section overview and progress"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#27272a',
              border: '1px solid #3f3f46',
              borderRadius: '8px',
              padding: '6px 12px',
              cursor: 'pointer',
              color: '#f4f4f5',
              fontWeight: 600,
              fontSize: '0.86rem',
              transition: 'all 0.15s ease'
            }}
          >
            <Layers className="size-4 text-emerald-400" />
            <span>{sectionTitle}</span>
            <ChevronDown className="size-3.5 text-zinc-400" />
          </button>

          <div style={{ width: '1px', height: '16px', background: '#3f3f46' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={onPrevQuestion}
              disabled={!hasPrev}
              title={hasPrev ? "Previous Problem" : "No previous problem"}
              style={{
                background: hasPrev ? '#27272a' : 'transparent',
                border: hasPrev ? '1px solid #3f3f46' : '1px solid transparent',
                color: hasPrev ? '#f4f4f5' : '#52525b',
                cursor: hasPrev ? 'pointer' : 'not-allowed',
                padding: '5px 8px',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                fontSize: '0.8rem',
                fontWeight: 600,
                transition: 'all 0.15s ease'
              }}
            >
              <ChevronLeft className="size-4" />
              <span>Prev</span>
            </button>

            <span style={{ fontWeight: 700, fontSize: '0.94rem', color: '#f4f4f5', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 4px' }}>
              <Code2 className="size-4 text-emerald-400" />
              {question?.title || 'Coding Problem'}
            </span>

            {(problemLevel || question?.difficulty) && (
              <span style={{
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: (problemLevel || question?.difficulty) === 'Easy' ? '#10b981' : (problemLevel || question?.difficulty) === 'Medium' ? '#f59e0b' : '#ef4444',
                background: (problemLevel || question?.difficulty) === 'Easy' ? 'rgba(16,185,129,0.15)' : (problemLevel || question?.difficulty) === 'Medium' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                border: '1px solid currentColor'
              }}>
                {problemLevel || question?.difficulty}
              </span>
            )}

            {isSolved && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 8px',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 700,
                background: 'rgba(16, 185, 129, 0.18)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.4)'
              }}>
                <CheckCircle2 className="size-3" /> Solved
              </span>
            )}

            <button
              onClick={onNextQuestion}
              disabled={!hasNext}
              title={hasNext ? "Next Problem" : "No next problem"}
              style={{
                background: hasNext ? '#27272a' : 'transparent',
                border: hasNext ? '1px solid #3f3f46' : '1px solid transparent',
                color: hasNext ? '#f4f4f5' : '#52525b',
                cursor: hasNext ? 'pointer' : 'not-allowed',
                padding: '5px 8px',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                fontSize: '0.8rem',
                fontWeight: 600,
                transition: 'all 0.15s ease'
              }}
            >
              <span>Next</span>
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

                {/* Center: Run & Submit Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleTriggerRun}
            disabled={isEvaluating || isSubmitting}
            title="Run code against testcase (Ctrl + Enter)"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              background: '#27272a',
              border: '1px solid #3f3f46',
              borderRadius: '8px',
              color: '#fafafa',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: isEvaluating ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {isEvaluating ? (
              <>
                <Loader2 className="size-3.5 animate-spin text-emerald-400" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="size-3.5 fill-emerald-400 text-emerald-400" />
                <span>Run</span>
              </>
            )}
          </button>

          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            title="Submit solution for grading against all sample & hidden edge cases"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 20px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)',
              transition: 'all 0.15s ease'
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Check className="size-3.5 stroke-[3]" />
                <span>Submit</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Live Solve Stopwatch Timer, Fullscreen, and Go Back */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Mock test countdown timer (if in mock test) */}
          {timeRemaining != null && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 14px',
                borderRadius: '999px',
                background: timeRemaining < 300 ? 'rgba(239, 68, 68, 0.22)' : 'rgba(239, 68, 68, 0.12)',
                color: '#f87171',
                fontWeight: 700,
                fontSize: '0.85rem',
                border: '1px solid rgba(239, 68, 68, 0.35)'
              }}
            >
              <Clock className="size-3.5" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          )}

          {/* Practice Solve Stopwatch Timer: Shows how much time user takes to solve */}
          {timeRemaining == null && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '8px',
                background: isSolved ? 'rgba(16, 185, 129, 0.15)' : '#27272a',
                border: `1px solid ${isSolved ? 'rgba(16, 185, 129, 0.4)' : '#3f3f46'}`,
                color: isSolved ? '#34d399' : '#f4f4f5',
                fontWeight: 600,
                fontSize: '0.84rem'
              }}
              title={isSolved ? "Time taken to solve this problem" : "Live timer: time spent solving this problem"}
            >
              <Clock className="size-3.5 text-emerald-400" />
              <span>{isSolved ? `Solved in ${formatTime(solveElapsedSeconds)}` : formatTime(solveElapsedSeconds)}</span>
              {!isSolved && (
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  title={isTimerRunning ? "Pause Timer" : "Resume Timer"}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#a1a1aa',
                    cursor: 'pointer',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {isTimerRunning ? <Pause className="size-3" /> : <Play className="size-3 fill-current" />}
                </button>
              )}
            </div>
          )}

          {onSectionSubmit && (
            <button
              onClick={onSectionSubmit}
              title="Submit this section and advance"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 18px',
                background: '#10b981',
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{sectionSubmitLabel || 'Submit & Next Section'}</span>
              <ChevronRight className="size-4" />
            </button>
          )}

          {solvedNotice && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: '#064e3b',
              color: '#a7f3d0',
              border: '1px solid #059669'
            }}>
              <Sparkles className="size-3.5 text-emerald-400" />
              Accepted!
            </span>
          )}

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#a1a1aa',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              title="Go back to DSA sheet"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 16px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #27272a 0%, #1f1f23 100%)',
                color: '#f4f4f5',
                border: '1px solid #3f3f46',
                cursor: 'pointer',
                fontSize: '0.84rem',
                fontWeight: 600,
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#3f3f46'; e.currentTarget.style.borderColor = '#52525b'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#27272a'; e.currentTarget.style.borderColor = '#3f3f46'; }}
            >
              <ChevronLeft className="size-4 text-zinc-300" />
              <span>Go Back</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. MAIN SPLIT PANE (LEFT SPECS | RESIZER | RIGHT CODE WORKSPACE) */}
      <div
        ref={mainSplitRef}
        style={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* LEFT COLUMN: PROBLEM SPECS & TABS */}
        <div
          style={{
            display: 'flex',
            flex: `0 0 ${leftWidthPercent}%`,
            width: `${leftWidthPercent}%`,
            minWidth: '220px',
            maxWidth: '82%',
            flexDirection: 'column',
            background: '#18181b',
            overflow: 'hidden'
          }}
        >
          {/* Header Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              background: '#141416',
              borderBottom: '1px solid #27272a',
              fontSize: '0.82rem'
            }}
          >
            {[
              { id: 'description', label: 'Description', icon: FileText },
              { id: 'submissions', label: 'Submissions', icon: Clock }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    background: isActive ? '#27272a' : 'transparent',
                    color: isActive ? '#ffffff' : '#a1a1aa',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon className="size-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Body (Scrollable) */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
            {activeTab === 'description' && (
              <div>
                {/* Title */}
                <h1 style={{ fontSize: '1.45rem', fontWeight: 700, margin: '0 0 20px 0', color: '#f4f4f5' }}>
                  {question?.title}
                </h1>

                {/* Description Text */}
                <div
                  style={{
                    color: '#d4d4d8',
                    fontSize: '0.94rem',
                    lineHeight: 1.7,
                    marginBottom: '28px',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {question?.description}
                </div>

                {/* Examples */}
                <div style={{ marginBottom: '28px' }}>
                  {question?.examples &&
                    question.examples.map((ex, exIdx) => {
                      const isObj = typeof ex === 'object' && ex !== null;
                      const inputVal = isObj
                        ? ex.input
                        : (String(ex).split('\nOutput:')[0] || '').replace('Input:', '').trim();
                      const outputVal = isObj
                        ? ex.output
                        : (String(ex).split('\nOutput:')[1] || '').split('(since')[0].replace('Output:', '').trim();
                      const explVal = isObj ? ex.explanation : (String(ex).split('(since')[1] || '').replace(')', '').trim();

                      return (
                        <div key={exIdx} style={{ marginBottom: '20px' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#f4f4f5', marginBottom: '8px' }}>
                            Example {exIdx + 1}:
                          </div>
                          <div
                            style={{
                              background: '#121214',
                              border: '1px solid #27272a',
                              borderRadius: '10px',
                              padding: '14px 18px',
                              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                              fontSize: '0.86rem',
                              lineHeight: 1.6
                            }}
                          >
                            <div>
                              <strong style={{ color: '#a1a1aa' }}>Input:</strong>{' '}
                              <span style={{ color: '#e4e4e7' }}>{inputVal}</span>
                            </div>
                            <div style={{ marginTop: '4px' }}>
                              <strong style={{ color: '#a1a1aa' }}>Output:</strong>{' '}
                              <span style={{ color: '#10b981' }}>{outputVal}</span>
                            </div>
                            {explVal && (
                              <div style={{ marginTop: '6px', color: '#a1a1aa', fontFamily: 'sans-serif' }}>
                                <strong style={{ color: '#71717a' }}>Explanation:</strong> {explVal}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Constraints */}
                {question?.constraints && question.constraints.length > 0 && (
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#f4f4f5', marginBottom: '10px' }}>
                      Constraints:
                    </div>
                    <ul style={{ paddingLeft: '20px', margin: 0, color: '#a1a1aa', fontSize: '0.86rem', lineHeight: 1.8 }}>
                      {question.constraints.map((c, i) => (
                        <li key={i}>
                          <code
                            style={{
                              background: '#27272a',
                              color: '#f4f4f5',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '0.82rem'
                            }}
                          >
                            {c}
                          </code>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'submissions' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f4f4f5', marginBottom: '12px' }}>
                  Session Run History
                </h3>
                {submissionsHistory.length === 0 ? (
                  <p style={{ color: '#71717a', fontSize: '0.88rem' }}>No runs executed yet in this session.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {submissionsHistory.map((sub, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: '#121214',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #27272a',
                          fontSize: '0.84rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {sub.status === 'Accepted' ? (
                            <CheckCircle2 className="size-4 text-emerald-400" />
                          ) : (
                            <XCircle className="size-4 text-red-400" />
                          )}
                          <span style={{ fontWeight: 700, color: sub.status === 'Accepted' ? '#10b981' : '#f87171' }}>
                            {sub.status}
                          </span>
                        </div>
                        <span style={{ color: '#a1a1aa' }}>{sub.language}</span>
                        <span style={{ color: '#71717a' }}>{sub.time}s</span>
                        <span style={{ color: '#52525b', fontSize: '0.78rem' }}>{sub.timestamp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* HORIZONTAL RESIZE DIVIDER */}
        <div
          onMouseDown={handleMouseDownH}
          onDoubleClick={handleDoubleClickH}
          className={`split-resizer-h ${isDraggingH ? 'dragging' : ''}`}
          title="Drag to resize Question and Code Editor • Double-click to reset (50/50)"
          
        >
          <div
            className="resizer-grip"
            style={{
              width: '3px',
              height: '32px',
              borderRadius: '3px',
              background: isDraggingH ? '#ffffff' : '#71717a',
              transition: 'all 0.15s ease'
            }}
          />
        </div>

        {/* RIGHT COLUMN: CODE EDITOR & CONSOLE RUNNER */}
        <div
          ref={rightColumnRef}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            
            minWidth: 0,
            overflow: 'hidden'
          }}
        >
          {/* Editor Header Toolbar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 14px',
              background: '#141416',
              borderBottom: '1px solid #27272a',
              fontSize: '0.84rem'
            }}
          >
            {/* Left: Code badge & Language selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 600 }}>
                <Code2 className="size-4" />
                <span>Code</span>
              </div>

              {/* Language Dropdown */}
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                style={{
                  background: '#27272a',
                  color: '#f4f4f5',
                  border: '1px solid #3f3f46',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Right: Reset Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={handleReset}
                title="Reset to starter template"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#a1a1aa',
                  padding: '5px 8px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.78rem'
                }}
              >
                <RotateCcw className="size-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* CODE EDITOR TEXTAREA WITH LINE NUMBERS */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              background: '#18181b',
              position: 'relative',
              minHeight: 0,
              overflow: 'hidden'
            }}
          >
            {/* Gutter: Line Numbers */}
            <div
              ref={lineNumbersRef}
              style={{
                width: '46px',
                padding: '16px 0',
                background: '#141416',
                borderRight: '1px solid #27272a',
                color: '#52525b',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: '0.88rem',
                lineHeight: '22px',
                textAlign: 'right',
                userSelect: 'none',
                overflow: 'hidden',
                paddingRight: '10px'
              }}
            >
              {lineNumbers.map((n) => (
                <div key={n}>{n}</div>
              ))}
            </div>

            {/* Editable Code Textarea */}
            <textarea
              ref={editorRef}
              value={code}
              onChange={(e) => onCodeChange(e.target.value)}
              onScroll={handleScroll}
              onKeyDown={handleKeyDown}
              spellCheck="false"
              placeholder={`// Write your ${language} solution here...`}
              style={{
                flex: 1,
                background: 'transparent',
                color: '#f4f4f5',
                border: 'none',
                outline: 'none',
                padding: '16px',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "JetBrains Mono", monospace',
                fontSize: '0.88rem',
                lineHeight: '22px',
                whiteSpace: 'pre',
                overflowWrap: 'normal',
                overflowX: 'auto',
                resize: 'none',
                tabSize: 4,
                pointerEvents: (isDraggingH || isDraggingV) ? 'none' : 'auto'
              }}
            />
          </div>

          {/* VERTICAL RESIZE DIVIDER */}
          <div
            onMouseDown={handleMouseDownV}
            onDoubleClick={handleDoubleClickV}
            className={`split-resizer-v ${isDraggingV ? 'dragging' : ''}`}
            title="Drag to resize Code Editor and Output Console • Double-click to reset (250px)"
          >
            <div
              className="resizer-grip"
              style={{
                width: '38px',
                height: '3px',
                borderRadius: '3px',
                background: isDraggingV ? '#ffffff' : '#71717a',
                transition: 'all 0.15s ease'
              }}
            />
          </div>

          {/* 3. BOTTOM CONSOLE DRAWER (TESTCASE & TEST RESULT) */}
          <div
            style={{
              height: consoleOpen ? `${consoleHeight}px` : '38px',
              transition: isDraggingV ? 'none' : 'height 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              background: '#141416',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              flexShrink: 0
            }}
          >
            {/* Console Header Tabs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 14px',
                background: '#111113',
                borderBottom: consoleOpen ? '1px solid #27272a' : 'none',
                fontSize: '0.82rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => {
                    setConsoleTab('testcase');
                    setConsoleOpen(true);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    background: consoleTab === 'testcase' && consoleOpen ? '#27272a' : 'transparent',
                    color: consoleTab === 'testcase' && consoleOpen ? '#10b981' : '#a1a1aa',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <CheckCircle2 className="size-3.5" />
                  <span>Testcase</span>
                </button>

                <button
                  onClick={() => {
                    setConsoleTab('result');
                    setConsoleOpen(true);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    background: consoleTab === 'result' && consoleOpen ? '#27272a' : 'transparent',
                    color: consoleTab === 'result' && consoleOpen ? '#60a5fa' : '#a1a1aa',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <Terminal className="size-3.5" />
                  <span>Test Result</span>
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setConsoleOpen(!consoleOpen)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#a1a1aa',
                    padding: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {consoleOpen ? <ChevronDown className="size-4" /> : <ChevronUp className="size-4" />}
                </button>
              </div>
            </div>

            {/* Console Content Area */}
            {consoleOpen && (
              <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px', fontSize: '0.86rem' }}>
                {/* TAB 1: TESTCASES */}
                {consoleTab === 'testcase' && (
                  <div>
                    {/* Case selector chips for all 13 testcases */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                      {sampleTestcases.map((tc, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedCaseIdx(idx)}
                          style={{
                            padding: '4px 12px',
                            borderRadius: '6px',
                            border: '1px solid',
                            borderColor: selectedCaseIdx === idx ? '#10b981' : '#27272a',
                            background: selectedCaseIdx === idx ? 'rgba(16, 185, 129, 0.15)' : '#18181b',
                            color: selectedCaseIdx === idx ? '#10b981' : '#a1a1aa',
                            fontWeight: 600,
                            fontSize: '0.78rem',
                            cursor: 'pointer'
                          }}
                        >
                          {tc.label || `Case ${idx + 1}`}
                        </button>
                      ))}
                      {hiddenTestcases.map((htc, hidx) => {
                        const targetIdx = sampleTestcases.length + hidx;
                        return (
                          <button
                            key={`h-${hidx}`}
                            onClick={() => setSelectedCaseIdx(targetIdx)}
                            title={htc.label || `Hidden Edge Case ${hidx + 1}`}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '6px',
                              border: '1px solid',
                              borderColor: selectedCaseIdx === targetIdx ? '#60a5fa' : '#27272a',
                              background: selectedCaseIdx === targetIdx ? 'rgba(59, 130, 246, 0.15)' : '#18181b',
                              color: selectedCaseIdx === targetIdx ? '#60a5fa' : '#71717a',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <span>🔒 Hidden {hidx + 1}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Stdin input view */}
                    {selectedCaseIdx < sampleTestcases.length ? (
                      <>
                        <div style={{ color: '#71717a', fontSize: '0.78rem', marginBottom: '6px', fontWeight: 600 }}>
                          Standard Input (stdin):
                        </div>
                        <textarea
                          value={customStdin}
                          onChange={(e) => setCustomStdin(e.target.value)}
                          placeholder="Enter test input data here..."
                          style={{
                            width: '100%',
                            height: `${Math.max(90, consoleHeight - 150)}px`,
                            background: '#18181b',
                            color: '#f4f4f5',
                            border: '1px solid #27272a',
                            borderRadius: '8px',
                            padding: '10px 12px',
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            fontSize: '0.84rem',
                            outline: 'none',
                            resize: 'none'
                          }}
                        />
                      </>
                    ) : (
                      <div style={{
                        background: '#18181b',
                        border: '1px solid #27272a',
                        borderRadius: '8px',
                        padding: '16px 20px',
                        color: '#a1a1aa',
                        fontSize: '0.85rem',
                        lineHeight: '1.6'
                      }}>
                        <div style={{ fontWeight: 700, color: '#60a5fa', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>🔒 {hiddenTestcases[selectedCaseIdx - sampleTestcases.length]?.label || `Hidden Case ${selectedCaseIdx - sampleTestcases.length + 1}`}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#71717a' }}>
                          Hidden edge case input is private prior to execution. Click <strong>Run</strong> or <strong>Submit</strong> to evaluate your solution against this case and all 13 testcases!
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: TEST RESULT */}
                {consoleTab === 'result' && (
                  <div>
                    {!evalResult ? (
                      <div style={{ color: '#71717a', textAlign: 'center', padding: '24px 0' }}>
                        Click &quot;Run&quot; to compile and execute code against the testcase.
                      </div>
                    ) : (
                      <div>
                        {/* Status Bar */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
                          <span
                            style={{
                              fontSize: '1.05rem',
                              fontWeight: 800,
                              color:
                                evalResult.status === 'Accepted' || evalResult.passed
                                  ? '#10b981'
                                  : '#ef4444'
                            }}
                          >
                            {evalResult.status || (evalResult.passed ? 'Accepted' : 'Wrong Answer')}
                          </span>

                          <span
                            style={{
                              padding: '3px 10px',
                              borderRadius: '12px',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              background:
                                evalResult.all_passed || evalResult.passed
                                  ? 'rgba(16, 185, 129, 0.15)'
                                  : 'rgba(239, 68, 68, 0.15)',
                              color: evalResult.all_passed || evalResult.passed ? '#10b981' : '#f87171',
                              border: `1px solid ${evalResult.all_passed || evalResult.passed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                            }}
                          >
                            {evalResult.passed_count != null
                              ? `${evalResult.passed_count} / ${evalResult.total || evalResult.test_results?.length || 1} Testcases Passed`
                              : (evalResult.passed ? 'Passed' : 'Failed')}
                          </span>

                          <span style={{ color: '#71717a', fontSize: '0.8rem' }}>
                            Runtime: <strong style={{ color: '#d4d4d8' }}>{evalResult.time || '0.01'}s</strong>
                          </span>
                          <span style={{ color: '#71717a', fontSize: '0.8rem' }}>
                            Memory: <strong style={{ color: '#d4d4d8' }}>{evalResult.memory || 3200} KB</strong>
                          </span>
                          <span style={{ color: '#71717a', fontSize: '0.8rem' }}>
                            Engine: <strong style={{ color: '#10b981' }}>{evalResult.engine || 'Judge0'}</strong>
                          </span>
                        </div>

                        {/* RapidAPI subscription guidance banner if 403 returned */}
                        {evalResult.judge0_subscription_required && (
                          <div
                            style={{
                              background: 'rgba(245, 158, 11, 0.1)',
                              border: '1px solid rgba(245, 158, 11, 0.3)',
                              borderRadius: '8px',
                              padding: '10px 14px',
                              marginBottom: '12px',
                              fontSize: '0.82rem',
                              color: '#fbbf24',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <AlertCircle className="size-4 flex-shrink-0" />
                              <span>Judge0 key connected! Click Subscribe on RapidAPI Free tier (0$/mo) to activate cloud compiler.</span>
                            </div>
                            <a
                              href="https://rapidapi.com/judge0-official/api/judge0-ce/pricing"
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: '#f59e0b',
                                color: '#000',
                                fontWeight: 700,
                                padding: '4px 10px',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                flexShrink: 0
                              }}
                            >
                              <span>Activate</span>
                              <ExternalLink className="size-3" />
                            </a>
                          </div>
                        )}

                        {/* Testcase selector chips for all 13 test results */}
                        {evalResult.test_results && evalResult.test_results.length > 0 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                            {evalResult.test_results.map((tr, idx) => {
                              const isHidden = tr.is_hidden || (tr.label && tr.label.toLowerCase().includes('hidden')) || idx >= 3;
                              const chipText = isHidden ? `Hidden ${idx - 2}` : (tr.label || `Case ${idx + 1}`);
                              return (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedResultIdx(idx)}
                                  title={tr.label || `Test Case ${idx + 1}`}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '4px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid',
                                    borderColor: selectedResultIdx === idx ? (tr.passed ? '#10b981' : '#ef4444') : '#27272a',
                                    background: selectedResultIdx === idx
                                      ? (tr.passed ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)')
                                      : '#18181b',
                                    color: tr.passed ? '#10b981' : '#f87171',
                                    fontWeight: 600,
                                    fontSize: '0.78rem',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {tr.passed ? <CheckCircle2 className="size-3.5 text-emerald-400" /> : <XCircle className="size-3.5 text-red-400" />}
                                  <span>{chipText}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Outputs comparison */}
                        {evalResult.test_results && evalResult.test_results.length > 0 ? (
                          (() => {
                            const cur = evalResult.test_results[selectedResultIdx] || evalResult.test_results[0];
                            return (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div>
                                  <div style={{ fontSize: '0.78rem', color: '#71717a', fontWeight: 600, marginBottom: '4px' }}>
                                    Standard Input:
                                  </div>
                                  <pre
                                    style={{
                                      margin: 0,
                                      background: '#18181b',
                                      border: '1px solid #27272a',
                                      borderRadius: '6px',
                                      padding: '8px 12px',
                                      fontFamily: 'monospace',
                                      color: '#e4e4e7',
                                      whiteSpace: 'pre-wrap',
                                      maxHeight: '120px',
                                      overflowY: 'auto'
                                    }}
                                  >
                                    {cur.input || '(No input)'}
                                  </pre>
                                </div>

                                <div>
                                  <div style={{ fontSize: '0.78rem', color: '#71717a', fontWeight: 600, marginBottom: '4px' }}>
                                    Actual Output:
                                  </div>
                                  <pre
                                    style={{
                                      margin: 0,
                                      background: '#18181b',
                                      border: '1px solid #27272a',
                                      borderRadius: '6px',
                                      padding: '8px 12px',
                                      fontFamily: 'monospace',
                                      color: cur.passed ? '#10b981' : '#f87171',
                                      whiteSpace: 'pre-wrap',
                                      maxHeight: '120px',
                                      overflowY: 'auto'
                                    }}
                                  >
                                    {cur.actual || '(No stdout)'}
                                  </pre>
                                </div>

                                <div>
                                  <div style={{ fontSize: '0.78rem', color: '#71717a', fontWeight: 600, marginBottom: '4px' }}>
                                    Expected Output:
                                  </div>
                                  <pre
                                    style={{
                                      margin: 0,
                                      background: '#18181b',
                                      border: '1px solid #27272a',
                                      borderRadius: '6px',
                                      padding: '8px 12px',
                                      fontFamily: 'monospace',
                                      color: '#10b981',
                                      whiteSpace: 'pre-wrap',
                                      maxHeight: '120px',
                                      overflowY: 'auto'
                                    }}
                                  >
                                    {cur.expected || '(No expected)'}
                                  </pre>
                                </div>

                                {(cur.stderr || cur.compile_output) && (
                                  <div>
                                    <div style={{ fontSize: '0.78rem', color: '#ef4444', fontWeight: 600, marginBottom: '4px' }}>
                                      Error / Compiler Output:
                                    </div>
                                    <pre
                                      style={{
                                        margin: 0,
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        border: '1px solid rgba(239, 68, 68, 0.25)',
                                        borderRadius: '6px',
                                        padding: '8px 12px',
                                        fontFamily: 'monospace',
                                        color: '#f87171',
                                        whiteSpace: 'pre-wrap',
                                        maxHeight: '120px',
                                        overflowY: 'auto'
                                      }}
                                    >
                                      {cur.compile_output || cur.stderr}
                                    </pre>
                                  </div>
                                )}
                              </div>
                            );
                          })()
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div>
                              <div style={{ fontSize: '0.78rem', color: '#71717a', fontWeight: 600, marginBottom: '4px' }}>
                                Standard Output (stdout):
                              </div>
                              <pre
                                style={{
                                  margin: 0,
                                  background: '#18181b',
                                  border: '1px solid #27272a',
                                  borderRadius: '6px',
                                  padding: '8px 12px',
                                  fontFamily: 'monospace',
                                  color: '#e4e4e7',
                                  whiteSpace: 'pre-wrap',
                                  maxHeight: `${Math.max(100, consoleHeight - 180)}px`,
                                  overflowY: 'auto'
                                }}
                              >
                                {evalResult.stdout || evalResult.output || '(No stdout)'}
                              </pre>
                            </div>

                            {(evalResult.stderr || evalResult.compile_output) && (
                              <div>
                                <div style={{ fontSize: '0.78rem', color: '#ef4444', fontWeight: 600, marginBottom: '4px' }}>
                                  Error / Compiler Output:
                                </div>
                                <pre
                                  style={{
                                    margin: 0,
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.25)',
                                    borderRadius: '6px',
                                    padding: '8px 12px',
                                    fontFamily: 'monospace',
                                    color: '#f87171',
                                    whiteSpace: 'pre-wrap',
                                    maxHeight: `${Math.max(100, consoleHeight - 180)}px`,
                                    overflowY: 'auto'
                                  }}
                                >
                                  {evalResult.compile_output || evalResult.stderr}
                                </pre>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. ASSESSMENT SECTION PROGRESS OVERVIEW MODAL */}
      {showSectionModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            padding: '20px'
          }}
          onClick={() => setShowSectionModal(false)}
        >
          <div
            style={{
              maxWidth: '560px',
              width: '100%',
              background: '#18181b',
              border: '1px solid #27272a',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
              color: '#f4f4f5'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers className="size-5 text-emerald-400" />
                <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Assessment Section Progress</h2>
              </div>
              <button
                onClick={() => setShowSectionModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#a1a1aa', cursor: 'pointer', padding: '4px' }}
              >
                <X className="size-5" />
              </button>
            </div>

            <p style={{ margin: '0 0 20px 0', fontSize: '0.86rem', color: '#a1a1aa', lineHeight: 1.5 }}>
              Track your completed question attempts in previous sections, your current active section, and upcoming sections.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(sectionsOverview || []).map((sec) => (
                <div
                  key={sec.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: sec.isActive ? 'rgba(16, 185, 129, 0.08)' : '#141416',
                    border: '1px solid',
                    borderColor: sec.isActive ? '#10b981' : (sec.isCompleted ? '#27272a' : '#27272a')
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {sec.isCompleted ? (
                      <CheckCircle2 className="size-5 text-emerald-400" />
                    ) : sec.isActive ? (
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '4px solid #10b981', background: '#18181b' }} />
                    ) : (
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px dashed #52525b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#52525b' }} />
                      </div>
                    )}
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: sec.isActive ? '#ffffff' : (sec.isCompleted ? '#e4e4e7' : '#71717a') }}>
                        {sec.step}. {sec.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#a1a1aa', marginTop: '2px' }}>
                        {sec.isCompleted ? (
                          <span style={{ color: '#10b981' }}>Completed • {sec.answeredCount} / {sec.totalQuestions} questions attempted</span>
                        ) : sec.isActive ? (
                          <span style={{ color: '#60a5fa' }}>Currently In Progress</span>
                        ) : (
                          <span style={{ color: '#71717a' }}>Upcoming Section (Locked)</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: sec.isCompleted ? 'rgba(16, 185, 129, 0.15)' : (sec.isActive ? 'rgba(96, 165, 250, 0.15)' : '#27272a'),
                      color: sec.isCompleted ? '#10b981' : (sec.isActive ? '#60a5fa' : '#71717a')
                    }}
                  >
                    {sec.isCompleted ? 'Completed' : (sec.isActive ? 'Active' : 'Locked')}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowSectionModal(false)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  background: '#27272a',
                  border: '1px solid #3f3f46',
                  color: '#f4f4f5',
                  fontWeight: 600,
                  fontSize: '0.86rem',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
