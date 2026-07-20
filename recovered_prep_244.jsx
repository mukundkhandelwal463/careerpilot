Created At: 2026-07-16T07:41:19Z
Completed At: 2026-07-16T07:41:19Z
File Path: `file:///c:/Users/Mukund/PycharmProjects/Resume_Screener/client/src/pages/Preparation.jsx`
Total Lines: 1403
Total Bytes: 66171
Showing lines 1 to 800
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
1: import React, { useState, useEffect, useRef } from 'react';
2: import { Link } from 'react-router-dom';
3: import Navbar from '../Components/navbar.jsx';
4: import { useAuth } from '../contexts/AuthContext.jsx';
5: import { 
6:   Bot, 
7:   Map, 
8:   CheckSquare, 
9:   GraduationCap, 
10:   Play, 
11:   CheckCircle2, 
12:   Plus, 
13:   Trash2, 
14:   BookOpen, 
15:   Award,
16:   Sparkles,
17:   ChevronRight,
18:   Mic,
19:   MicOff,
20:   UploadCloud,
21:   ChevronLeft,
22:   Flame,
23:   Trophy,
24:   ArrowUp,
25:   ArrowDown,
26:   Bell
27: } from 'lucide-react';
28: import '../css/style.css';
29: 
30: // Initialize Web Speech Recognition API
31: const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
32: 
33: const Preparation = () => {
34:   const { user } = useAuth();
35:   const [activeTab, setActiveTab] = useState('interview');
36:   
37:   // ── AI Interview Simulator State ────────────────────────────────
38:   const [resumeFile, setResumeFile] = useState(null);
39:   const [questions, setQuestions] = useState([]);
40:   const [interviewStarted, setInterviewStarted] = useState(false);
41:   const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
42:   const [userAnswer, setUserAnswer] = useState('');
43:   const [isListening, setIsListening] = useState(false);
44:   const [isGrading, setIsGrading] = useState(false);
45:   const [questionScores, setQuestionScores] = useState([]);
46:   const [interviewFeedback, setInterviewFeedback] = useState(null);
47:   const [interviewCompleted, setInterviewCompleted] = useState(false);
48:   const [saveStatus, setSaveStatus] = useState('');
49: 
50:   const recognitionRef = useRef(null);
51: 
52:   // ── Career Roadmap State ────────────────────────────────────────
53:   const [roadmapResumeFile, setRoadmapResumeFile] = useState(null);
54:   const [targetRole, setTargetRole] = useState(() => localStorage.getItem("active_target_role") || '');
55:   const [targetJd, setTargetJd] = useState('');
56:   const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
57:   const [careerRoadmap, setCareerRoadmap] = useState(() => {
58:     const saved = localStorage.getItem("active_career_roadmap");
59:     if (saved) {
60:       try { return JSON.parse(saved); } catch (e) {}
61:     }
62:     return null;
63:   });
64: 
65:   // ── Task Tracker & Calendar States ──────────────────────────────
66:   const getLocalDateString = (date) => {
67:     const tzOffset = date.getTimezoneOffset() * 60000;
68:     return new Date(date.getTime() - tzOffset).toISOString().slice(0, 10);
69:   };
70: 
71:   const [selectedDate, setSelectedDate] = useState(() => getLocalDateString(new Date()));
72:   const [newTaskText, setNewTaskText] = useState('');
73:   const [timeLeft, setTimeLeft] = useState('04:17:41 left');
74:   const [overdueReminder, setOverdueReminder] = useState('');
75: 
76:   const [scheduledTasks, setScheduledTasks] = useState(() => {
77:     const saved = localStorage.getItem("scheduled_tasks");
78:     if (saved) {
79:       try { return JSON.parse(saved); } catch (e) {}
80:     }
81:     return {};
82:   });
83: 
84:   useEffect(() => {
85:     localStorage.setItem("scheduled_tasks", JSON.stringify(scheduledTasks));
86:   }, [scheduledTasks]);
87: 
88:   useEffect(() => {
89:     if (careerRoadmap) {
90:       localStorage.setItem("active_career_roadmap", JSON.stringify(careerRoadmap));
91:       if (targetRole) {
92:         localStorage.setItem("active_target_role", targetRole);
93:       }
94:     } else {
95:       localStorage.removeItem("active_career_roadmap");
96:       localStorage.removeItem("active_target_role");
97:     }
98:   }, [careerRoadmap, targetRole]);
99: 
100:   // Countdown timer to midnight
101:   useEffect(() => {
102:     const timer = setInterval(() => {
103:       const now = new Date();
104:       const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
105:       const diffMs = endOfDay.getTime() - now.getTime();
106:       if (diffMs > 0) {
107:         const hrs = String(Math.floor(diffMs / (1000 * 60 * 60))).padStart(2, '0');
108:         const mins = String(Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
109:         const secs = String(Math.floor((diffMs % (1000 * 60)) / 1000)).padStart(2, '0');
110:         setTimeLeft(`${hrs}:${mins}:${secs} left`);
111:       } else {
112:         setTimeLeft('00:00:00 left');
113:       }
114:     }, 1000);
115:     return () => clearInterval(timer);
116:   }, []);
117: 
118:   const emailSentRef = useRef(false);
119: 
120:   // Check for missed tasks from past days
121:   useEffect(() => {
122:     const todayStr = getLocalDateString(new Date());
123:     const pastMissed = Object.keys(scheduledTasks).filter(d => {
124:       if (d < todayStr) {
125:         return (scheduledTasks[d] || []).some(t => !t.completed);
126:       }
127:       return false;
128:     });
129: 
130:     if (pastMissed.length > 0) {
131:       const missedDates = pastMissed.map(d => new Date(d).getDate()).sort((a, b) => a - b);
132:       const missedDatesStr = missedDates.join(', ');
133:       setOverdueReminder(`⚠ Reminder: You missed tasks scheduled for July ${missedDatesStr}! Keep your streak alive.`);
134:       
135:       // 1. Add notification warning to navbar bell dropdown
136:       const savedNotifs = localStorage.getItem("app_notifications");
137:       let notifsList = [];
138:       if (savedNotifs) {
139:         try {
140:           notifsList = JSON.parse(savedNotifs);
141:         } catch (e) {}
142:       }
143:       
144:       const notifText = `⚠ You have incomplete preparation tasks from July ${missedDatesStr}!`;
145:       if (!notifsList.some(n => n.text === notifText)) {
146:         notifsList.unshift({
147:           id: Date.now(),
148:           text: notifText,
149:           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
150:         });
151:         localStorage.setItem("app_notifications", JSON.stringify(notifsList));
152:         localStorage.setItem("has_unread_notifications", "true");
153:         window.dispatchEvent(new Event("new_scan_notification"));
154:       }
155: 
156:       // 2. Trigger email SMTP dispatch via API
157:       if (!emailSentRef.current) {
158:         emailSentRef.current = true;
159:         fetch('/api/interview/notify-overdue', {
160:           method: 'POST',
161:           headers: { 'Content-Type': 'application/json' },
162:           body: JSON.stringify({ missed_dates: missedDates })
163:         })
164:         .then(res => res.json())
165:         .then(data => {
166:           console.log("[Notification API]", data.message);
167:         })
168:         .catch(err => console.error("[Notification API Error]", err));
169:       }
170: 
171:       // Request browser notification permission and send alert
172:       if (Notification && Notification.permission !== 'granted') {
173:         Notification.requestPermission();
174:       }
175:       if (Notification && Notification.permission === 'granted') {
176:         new Notification("AI Career Hub Tracker", {
177:           body: `You have incomplete preparation tasks from July ${missedDatesStr}!`,
178:           icon: '/favicon.ico'
179:         });
180:       }
181:     } else {
182:       setOverdueReminder('');
183:     }
184:   }, [scheduledTasks]);
185: 
186:   // Import Tasks from generated roadmap
187:   const handleImportRoadmapTasks = () => {
188:     if (!careerRoadmap || !careerRoadmap.levels) {
189:       alert("Please generate a Career Roadmap first.");
190:       return;
191:     }
192: 
193:     const updated = { ...scheduledTasks };
194:     let dayCounter = new Date().getDate();
195: 
196:     careerRoadmap.levels.forEach((lvl) => {
197:       lvl.topics.forEach((topic) => {
198:         const dateStr = `2026-07-${String(dayCounter).padStart(2, '0')}`;
199:         if (!updated[dateStr]) {
200:           updated[dateStr] = [];
201:         }
202:         updated[dateStr].push({
203:           id: Date.now() + Math.random(),
204:           text: `[Roadmap Level ${lvl.level}] ${topic}`,
205:           completed: false
206:         });
207:         dayCounter++;
208:         if (dayCounter > 31) dayCounter = 1; // Wrap around month for safety
209:       });
210:     });
211: 
212:     setScheduledTasks(updated);
213:     alert("Roadmap steps imported successfully as study tasks!");
214:   };
215: 
216:   // Speech Recognition hook setup
217:   useEffect(() => {
218:     if (SpeechRecognition) {
219:       const rec = new SpeechRecognition();
220:       rec.continuous = true;
221:       rec.interimResults = true;
222:       rec.lang = 'en-US';
223: 
224:       rec.onresult = (event) => {
225:         let transcript = '';
226:         for (let i = event.resultIndex; i < event.results.length; i++) {
227:           transcript += event.results[i][0].transcript;
228:         }
229:         setUserAnswer(transcript);
230:       };
231: 
232:       rec.onerror = (e) => {
233:         console.error('Speech recognition error:', e);
234:         setIsListening(false);
235:       };
236: 
237:       rec.onend = () => {
238:         setIsListening(false);
239:       };
240: 
241:       recognitionRef.current = rec;
242:     }
243:   }, []);
244: 
245:   const toggleListening = () => {
246:     if (!recognitionRef.current) {
247:       alert("Speech recognition is not supported in this browser. Please use Chrome, Edge or Safari.");
248:       return;
249:     }
250: 
251:     if (isListening) {
252:       recognitionRef.current.stop();
253:       setIsListening(false);
254:     } else {
255:       setUserAnswer('');
256:       setIsListening(true);
257:       recognitionRef.current.start();
258:     }
259:   };
260: 
261:   // Upload and Parse Resume for interview
262:   const handleResumeUpload = async (e) => {
263:     const file = e.target.files[0];
264:     if (!file) return;
265:     setResumeFile(file);
266:     setIsParsing(true);
267: 
268:     const formData = new FormData();
269:     formData.append('resume', file);
270: 
271:     try {
272:       const res = await fetch('/api/interview/start', {
273:         method: 'POST',
274:         body: formData,
275:       });
276:       const data = await res.json();
277:       if (data.success && data.questions) {
278:         setQuestions(data.questions);
279:         setInterviewStarted(true);
280:         setCurrentQuestionIdx(0);
281:         setQuestionScores([]);
282:         setInterviewCompleted(false);
283:         setInterviewFeedback(null);
284:       } else {
285:         alert(data.error || "Failed to start interview from resume.");
286:       }
287:     } catch (err) {
288:       console.error(err);
289:       alert("An error occurred during resume parsing.");
290:     } finally {
291:       setIsParsing(false);
292:     }
293:   };
294: 
295:   const startFallbackInterview = async () => {
296:     setIsParsing(true);
297:     try {
298:       const res = await fetch('/api/interview/start', {
299:         method: 'POST',
300:         headers: { 'Content-Type': 'application/json' },
301:         body: JSON.stringify({ resume_text: "General Software Developer Resume with Javascript, SQL, Python" }),
302:       });
303:       const data = await res.json();
304:       if (data.success && data.questions) {
305:         setQuestions(data.questions);
306:         setInterviewStarted(true);
307:         setCurrentQuestionIdx(0);
308:         setQuestionScores([]);
309:         setInterviewCompleted(false);
310:         setInterviewFeedback(null);
311:       }
312:     } catch (err) {
313:       console.error(err);
314:     } finally {
315:       setIsParsing(false);
316:     }
317:   };
318: 
319:   const submitAnswer = async () => {
320:     if (!userAnswer.trim()) return;
321:     if (isListening && recognitionRef.current) {
322:       recognitionRef.current.stop();
323:       setIsListening(false);
324:     }
325: 
326:     setIsGrading(true);
327:     const questionObj = questions[currentQuestionIdx];
328: 
329:     try {
330:       const res = await fetch('/api/interview/grade', {
331:         method: 'POST',
332:         headers: { 'Content-Type': 'application/json' },
333:         body: JSON.stringify({
334:           question: questionObj.question,
335:           response: userAnswer.trim(),
336:         }),
337:       });
338:       const data = await res.json();
339:       if (data.success && data.evaluation) {
340:         const evalResult = data.evaluation;
341:         setInterviewFeedback(evalResult);
342:         
343:         setQuestionScores([
344:           ...questionScores,
345:           {
346:             id: questionObj.id,
347:             type: questionObj.type,
348:             question: questionObj.question,
349:             score: evalResult.score,
350:             userAnswer: userAnswer.trim(),
351:             feedback: evalResult
352:           }
353:         ]);
354:       }
355:     } catch (err) {
356:       console.error(err);
357:     } finally {
358:       setIsGrading(false);
359:     }
360:   };
361: 
362:   const handleNextQuestion = () => {
363:     if (currentQuestionIdx < questions.length - 1) {
364:       setCurrentQuestionIdx(currentQuestionIdx + 1);
365:       setUserAnswer('');
366:       setInterviewFeedback(null);
367:     } else {
368:       setInterviewCompleted(true);
369:     }
370:   };
371: 
372:   const saveFinalScore = async () => {
373:     if (questionScores.length === 0) return;
374:     const total = questionScores.reduce((sum, item) => sum + item.score, 0);
375:     const avgScore = Math.round(total / questionScores.length);
376: 
377:     setSaveStatus('Saving...');
378:     try {
379:       const res = await fetch('/api/interview/save-score', {
380:         method: 'POST',
381:         headers: { 'Content-Type': 'application/json' },
382:         body: JSON.stringify({ score: avgScore }),
383:       });
384:       const data = await res.json();
385:       if (data.success) {
386:         setSaveStatus('Saved Successfully! Check dashboard.');
387:         if (user) {
388:           user.interview_score = avgScore;
389:         }
390:       }
391:     } catch (err) {
392:       console.error(err);
393:       setSaveStatus('Network error.');
394:     }
395:   };
396: 
397:   // Roadmap request triggers
398:   const handleGenerateRoadmap = async (e) => {
399:     e.preventDefault();
400:     if (!targetRole.trim()) {
401:       alert("Please enter what role you want to be.");
402:       return;
403:     }
404:     
405:     setIsGeneratingRoadmap(true);
406:     const formData = new FormData();
407:     if (roadmapResumeFile) {
408:       formData.append('resume', roadmapResumeFile);
409:     }
410:     formData.append('target_role', targetRole.trim());
411:     formData.append('job_description', targetJd.trim());
412: 
413:     try {
414:       const res = await fetch('/api/interview/roadmap', {
415:         method: 'POST',
416:         body: formData,
417:       });
418:       const data = await res.json();
419:       if (data.success && data.roadmap) {
420:         setCareerRoadmap(data.roadmap);
421:       }
422:     } catch (err) {
423:       console.error(err);
424:     } finally {
425:       setIsGeneratingRoadmap(false);
426:     }
427:   };
428: 
429:   // ── Task Tracker Actions ────────────────────────────────────────
430:   const handleAddTask = (e) => {
431:     e.preventDefault();
432:     if (!newTaskText.trim()) return;
433: 
434:     const dayTasks = [...(scheduledTasks[selectedDate] || [])];
435:     dayTasks.push({
436:       id: Date.now(),
437:       text: newTaskText.trim(),
438:       completed: false
439:     });
440: 
441:     setScheduledTasks({ ...scheduledTasks, [selectedDate]: dayTasks });
442:     setNewTaskText('');
443:   };
444: 
445:   const toggleTask = (date, id) => {
446:     const dayTasks = (scheduledTasks[date] || []).map(t => 
447:       t.id === id ? { ...t, completed: !t.completed } : t
448:     );
449:     setScheduledTasks({ ...scheduledTasks, [date]: dayTasks });
450:   };
451: 
452:   const deleteTask = (date, id) => {
453:     const dayTasks = (scheduledTasks[date] || []).filter(t => t.id !== id);
454:     setScheduledTasks({ ...scheduledTasks, [date]: dayTasks });
455:   };
456: 
457:   const moveTask = (date, index, direction) => {
458:     const dayTasks = [...(scheduledTasks[date] || [])];
459:     if (direction === 'up' && index > 0) {
460:       const temp = dayTasks[index];
461:       dayTasks[index] = dayTasks[index - 1];
462:       dayTasks[index - 1] = temp;
463:     } else if (direction === 'down' && index < dayTasks.length - 1) {
464:       const temp = dayTasks[index];
465:       dayTasks[index] = dayTasks[index + 1];
466:       dayTasks[index + 1] = temp;
467:     }
468:     setScheduledTasks({ ...scheduledTasks, [date]: dayTasks });
469:   };
470: 
471:   const menuItems = [
472:     { id: 'interview', label: 'AI Interview', icon: <Bot className="size-5" /> },
473:     { id: 'roadmap', label: 'Career roadmap', icon: <Map className="size-5" /> },
474:     { id: 'tracker', label: 'Task Tracker', icon: <CheckSquare className="size-5" /> },
475:     { id: 'cse', label: 'CSE Special', icon: <GraduationCap className="size-5" /> },
476:   ];
477: 
478:   // Calculated average score
479:   const finalAverageScore = questionScores.length > 0 
480:     ? Math.round(questionScores.reduce((sum, item) => sum + item.score, 0) / questionScores.length)
481:     : 0;
482: 
483:   // ── Dynamic Streak Calculator ──
484:   const calculateStreak = () => {
485:     const activeDates = Object.keys(scheduledTasks).filter(d => (scheduledTasks[d] || []).length > 0);
486:     if (activeDates.length === 0) return { current: 0, best: 0 };
487: 
488:     const completedDates = Object.keys(scheduledTasks).filter(d => {
489:       const dayTasks = scheduledTasks[d] || [];
490:       return dayTasks.length > 0 && dayTasks.every(t => t.completed);
491:     }).sort();
492: 
493:     if (completedDates.length === 0) return { current: 0, best: 0 };
494: 
495:     let current = 0;
496:     let best = 0;
497:     let temp = 0;
498: 
499:     const dates = completedDates.map(d => new Date(d));
500: 
501:     // Best Streak
502:     for (let i = 0; i < dates.length; i++) {
503:       if (i === 0) {
504:         temp = 1;
505:       } else {
506:         const diffTime = Math.abs(dates[i] - dates[i - 1]);
507:         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
508:         if (diffDays === 1) {
509:           temp++;
510:         } else if (diffDays > 1) {
511:           if (temp > best) best = temp;
512:           temp = 1;
513:         }
514:       }
515:     }
516:     if (temp > best) best = temp;
517: 
518:     // Current Streak (consecutive backwards from selectedDate)
519:     let checkDateStr = selectedDate;
520:     let currentStreakCount = 0;
521:     while (completedDates.includes(checkDateStr)) {
522:       currentStreakCount++;
523:       const d = new Date(checkDateStr);
524:       d.setDate(d.getDate() - 1);
525:       checkDateStr = d.toISOString().split('T')[0];
526:     }
527: 
528:     return {
529:       current: currentStreakCount,
530:       best: Math.max(best, currentStreakCount)
531:     };
532:   };
533: 
534:   const { current: currentStreak, best: bestStreak } = calculateStreak();
535: 
536: 
537:   // Generate calendar days for July 2026 (Wednesday start, 31 days)
538:   const calendarDays = [];
539:   // 3 empty slots for Sun, Mon, Tue at Wednesday start
540:   for (let i = 0; i < 3; i++) {
541:     calendarDays.push(null);
542:   }
543:   for (let d = 1; d <= 31; d++) {
544:     calendarDays.push(d);
545:   }
546: 
547:   // Check if a day has completed tasks to render icon/status
548:   const getDayStatus = (day) => {
549:     if (!day) return null;
550:     const dateStr = `2026-07-${String(day).padStart(2, '0')}`;
551:     const dayTasks = scheduledTasks[dateStr] || [];
552:     if (dayTasks.length === 0) return null;
553:     const allDone = dayTasks.every(t => t.completed);
554:     
555:     // Custom checkmark/heart labels to match image layout
556:     if (allDone) {
557:       if ([2, 4].includes(day)) return 'heart';
558:       return 'check';
559:     }
560:     return null;
561:   };
562: 
563:   return (
564:     <div className="page-shell">
565:       <Navbar />
566:       <main className="page" style={{ marginTop: '24px' }}>
567:         <h1 style={{ marginBottom: '24px', fontSize: '2.3rem', fontWeight: 800, color: 'var(--text)' }}>
568:           Preparation Hub
569:         </h1>
570: 
571:         <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '30px', alignItems: 'start' }}>
572:           
573:           {/* LEFT SIDEBAR: Matches image style */}
574:           <aside className="card" style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.72)', borderRadius: '24px' }}>
575:             <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)', margin: '0 0 4px 0' }}>
576:               Preparation
577:             </h2>
578:             <p style={{ fontSize: '0.96rem', color: 'var(--muted)', margin: '0 0 16px 0' }}>
579:               Optimizers & Hub Tools
580:             </p>
581:             <hr style={{ border: 'none', borderTop: '1px solid rgba(24, 35, 38, 0.08)', margin: '0 0 20px 0' }} />
582:             
583:             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
584:               {menuItems.map((item) => {
585:                 const isActive = activeTab === item.id;
586:                 return (
587:                   <button
588:                     key={item.id}
589:                     onClick={() => setActiveTab(item.id)}
590:                     style={{
591:                       display: 'flex',
592:                       alignItems: 'center',
593:                       gap: '12px',
594:                       width: '100%',
595:                       padding: '14px 18px',
596:                       borderRadius: '16px',
597:                       border: 'none',
598:                       cursor: 'pointer',
599:                       fontSize: '1.06rem',
600:                       fontWeight: 700,
601:                       textAlign: 'left',
602:                       transition: 'all 0.25s ease',
603:                       background: isActive ? '#1e293b' : 'transparent',
604:                       color: isActive ? '#ffffff' : '#334155'
605:                     }}
606:                     onMouseEnter={(e) => {
607:                       if (!isActive) {
608:                         e.currentTarget.style.background = 'rgba(24, 35, 38, 0.04)';
609:                       }
610:                     }}
611:                     onMouseLeave={(e) => {
612:                       if (!isActive) {
613:                         e.currentTarget.style.background = 'transparent';
614:                       }
615:                     }}
616:                   >
617:                     <span style={{ color: isActive ? '#ffffff' : '#64748b' }}>
618:                       {item.icon}
619:                     </span>
620:                     <span>{item.label}</span>
621:                   </button>
622:                 );
623:               })}
624:             </div>
625:           </aside>
626: 
627:           {/* RIGHT CONTENT WORKSPACE */}
628:           <section className="card" style={{ padding: '32px', minHeight: '540px', background: 'rgba(255, 255, 255, 0.72)', borderRadius: '24px' }}>
629:             
630:             {/* 1. AI INTERVIEW TAB */}
631:             {activeTab === 'interview' && (
632:               <div>
633:                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
634:                   <Bot className="size-6 text-blue-600" />
635:                   <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>AI Voice-Based CV Interview</h2>
636:                 </div>
637:                 
638:                 {!interviewStarted && !interviewCompleted && (
639:                   <div>
640:                     <p style={{ color: 'var(--muted)', marginBottom: '24px', fontSize: '1.06rem' }}>
641:                       Generate custom Technical, HR, and Management questions mapped specifically to your uploaded CV. Use voice recognition to answer, and see your scorecard update live.
642:                     </p>
643: 
644:                     <div style={{
645:                       border: '2px dashed #cbd5e1',
646:                       borderRadius: '16px',
647:                       padding: '40px 24px',
648:                       textAlign: 'center',
649:                       background: 'rgba(255, 255, 255, 0.5)',
650:                       marginBottom: '20px',
651:                       position: 'relative'
652:                     }}>
653:                       <input 
654:                         type="file" 
655:                         accept=".pdf,.docx,.txt"
656:                         onChange={handleResumeUpload}
657:                         style={{
658:                           position: 'absolute',
659:                           top: 0,
660:                           left: 0,
661:                           width: '100%',
662:                           height: '100%',
663:                           opacity: 0,
664:                           cursor: 'pointer'
665:                         }}
666:                       />
667:                       <UploadCloud className="size-12 text-slate-400 mx-auto" style={{ marginBottom: '14px' }} />
668:                       <strong style={{ display: 'block', fontSize: '1.15rem', color: 'var(--text)', marginBottom: '4px' }}>
669:                         Upload your resume to start
670:                       </strong>
671:                       <span style={{ fontSize: '0.96rem', color: 'var(--muted)' }}>
672:                         Supports PDF, DOCX, and TXT files
673:                       </span>
674:                     </div>
675: 
676:                     <div style={{ textAlign: 'center' }}>
677:                       <span style={{ display: 'block', color: 'var(--muted)', fontSize: '0.94rem', margin: '14px 0' }}>— OR —</span>
678:                       <button 
679:                         onClick={startFallbackInterview}
680:                         className="btn btn-secondary"
681:                         style={{ fontSize: '0.98rem', padding: '10px 20px', borderRadius: '999px' }}
682:                       >
683:                         Start with General Developer CV Questions
684:                       </button>
685:                     </div>
686:                   </div>
687:                 )}
688: 
689:                 {interviewStarted && !interviewCompleted && (
690:                   <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
691:                     <div style={{ background: '#0f2540', borderRadius: '16px', padding: '20px 24px', color: '#ffffff' }}>
692:                       <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
693:                         <span style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#93c5fd' }}>
694:                           Question {currentQuestionIdx + 1} of {questions.length}
695:                         </span>
696:                         <span style={{
697:                           fontSize: '0.92rem',
698:                           fontWeight: 800,
699:                           textTransform: 'uppercase',
700:                           background: 'rgba(255,255,255,0.15)',
701:                           padding: '3px 10px',
702:                           borderRadius: '6px'
703:                         }}>
704:                           {questions[currentQuestionIdx]?.type} Prompt
705:                         </span>
706:                       </div>
707:                       <p style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, lineHeight: 1.5 }}>
708:                         "{questions[currentQuestionIdx]?.question}"
709:                       </p>
710:                     </div>
711: 
712:                     <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', position: 'relative' }}>
713:                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
714:                         <strong style={{ fontSize: '1.0rem', color: 'var(--text)' }}>Your Spoken Answer:</strong>
715:                         
716:                         <button
717:                           onClick={toggleListening}
718:                           style={{
719:                             display: 'flex',
720:                             alignItems: 'center',
721:                             gap: '6px',
722:                             border: 'none',
723:                             padding: '8px 16px',
724:                             borderRadius: '999px',
725:                             fontWeight: 700,
726:                             fontSize: '0.96rem',
727:                             cursor: 'pointer',
728:                             color: '#ffffff',
729:                             background: isListening ? '#ef4444' : '#2563eb',
730:                             boxShadow: isListening ? '0 0 14px rgba(239, 68, 68, 0.4)' : 'none',
731:                             transition: 'all 0.25s ease'
732:                           }}
733:                         >
734:                           {isListening ? (
735:                             <>
736:                               <MicOff className="size-4 animate-pulse" /> Recording (Click to stop)
737:                             </>
738:                           ) : (
739:                             <>
740:                               <Mic className="size-4" /> Start Speaking
741:                             </>
742:                           )}
743:                         </button>
744:                       </div>
745: 
746:                       <textarea
747:                         value={userAnswer}
748:                         onChange={(e) => setUserAnswer(e.target.value)}
749:                         placeholder="Click 'Start Speaking' and answer the question out loud. Your voice response will auto-populate here."
750:                         style={{
751:                           width: '100%',
752:                           minHeight: '130px',
753:                           border: '1px solid #cbd5e1',
754:                           borderRadius: '12px',
755:                           padding: '14px',
756:                           fontSize: '1.06rem',
757:                           lineHeight: 1.6,
758:                           background: '#ffffff',
759:                           outline: 'none',
760:                           resize: 'vertical'
761:                         }}
762:                       />
763:                     </div>
764: 
765:                     {!interviewFeedback ? (
766:                       <div style={{ display: 'flex', gap: '12px' }}>
767:                         <button
768:                           onClick={submitAnswer}
769:                           disabled={!userAnswer.trim() || isGrading}
770:                           className="btn btn-primary"
771:                           style={{ minWidth: '130px' }}
772:                         >
773:                           {isGrading ? 'Evaluating Response...' : 'Submit Answer'}
774:                         </button>
775:                       </div>
776:                     ) : (
777:                       <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
778:                         <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '20px' }}>
779:                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
780:                             <strong style={{ fontSize: '1.15rem', color: '#166534', fontWeight: 800 }}>Evaluation feedback</strong>
781:                             <span style={{ background: '#dcfce7', color: '#15803d', fontWeight: 900, padding: '4px 12px', borderRadius: '8px', fontSize: '1.06rem' }}>
782:                               Score: {interviewFeedback.score}/100
783:                             </span>
784:                           </div>
785: 
786:                           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
787:                             <div>
788:                               <strong style={{ display: 'block', fontSize: '0.94rem', color: '#166534', marginBottom: '4px' }}>✓ Strengths</strong>
789:                               <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '1.0rem', color: '#14532d', lineHeight: 1.5 }}>
790:                                 {interviewFeedback.strengths?.map((str, idx) => <li key={idx}>{str}</li>)}
791:                               </ul>
792:                             </div>
793:                             <div>
794:                               <strong style={{ display: 'block', fontSize: '0.94rem', color: '#9a3412', marginBottom: '4px' }}>⚠ Suggested Improvements</strong>
795:                               <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '1.0rem', color: '#7c2d12', lineHeight: 1.5 }}>
796:                                 {interviewFeedback.improvements?.map((imp, idx) => <li key={idx}>{imp}</li>)}
797:                               </ul>
798:                             </div>
799:                           </div>
800:                         </div>
The above content does NOT show the entire file contents. If you need to view any lines of the file which were not shown to complete your task, call this tool again to view those lines.
