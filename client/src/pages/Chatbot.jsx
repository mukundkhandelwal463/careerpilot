import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Components/navbar.jsx';
import Footer from '../Components/footer.jsx';
import '../css/style.css';

const Chatbot = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);
  const [chatLog, setChatLog] = useState([]);
  
  const [inputValue, setInputValue] = useState('');
  const [templateChoice, setTemplateChoice] = useState('classical.pdf');
  const [status, setStatus] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Result variables from backend
  const [generatedResumeText, setGeneratedResumeText] = useState('');
  const [jobRecommendations, setJobRecommendations] = useState([]);
  const [geminiSuggestions, setGeminiSuggestions] = useState('');
  const [downloadLinks, setDownloadLinks] = useState(null);

  const chatBoxRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      setStatus({ text: 'Initializing AI Chatbot...', type: 'info' });
      try {
        const res = await fetch("/api/chatbot/questions");
        const data = await res.json();
        if (data.success && data.questions) {
          setQuestions(data.questions);
          // Initial greeting and first question
          setChatLog([
            { role: 'Bot', text: "Hello! Let's build your professional resume. Please answer the following questions." },
            { role: 'Bot', text: data.questions[0].question }
          ]);
          setStatus({ text: '', type: '' });
        } else {
          setStatus({ text: data.error || "Could not load questions.", type: 'error' });
        }
      } catch (err) {
        setStatus({ text: "Failed to connect to chatbot server.", type: 'error' });
      }
    };
    fetchQuestions();
  }, []);

  // Scroll to bottom of chatbox
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatLog]);

  const handleSend = () => {
    if (!inputValue.trim() || index >= questions.length) return;
    
    const currentQuestion = questions[index];
    const newAnswers = { ...answers, [currentQuestion.key]: inputValue };
    setAnswers(newAnswers);

    const newLog = [...chatLog, { role: 'You', text: inputValue }];
    
    const nextIndex = index + 1;
    setIndex(nextIndex);
    setInputValue('');

    if (nextIndex < questions.length) {
      newLog.push({ role: 'Bot', text: questions[nextIndex].question });
    } else {
      newLog.push({ role: 'Bot', text: "All details captured! You can choose a template on the left and click 'Generate Resume' to build your document." });
    }
    
    setChatLog(newLog);
  };

  const handleGenerate = async () => {
    setStatus({ text: "Consulting Gemini AI and Generating Resume files...", type: 'info' });
    setGenerating(true);

    try {
      const res = await fetch("/api/chatbot/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, template_choice: templateChoice })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Resume generation failed.");
      }

      setGeneratedResumeText(data.resume_text || "");
      setJobRecommendations(data.job_recommendations || []);
      setGeminiSuggestions(data.gemini_suggestions || "");
      
      if (data.docx_b64 && data.pdf_b64) {
        setDownloadLinks({
          docx: `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${data.docx_b64}`,
          pdf: `data:application/pdf;base64,${data.pdf_b64}`
        });
      }

      setStatus({ text: "Resume generated successfully!", type: 'success' });
    } catch (err) {
      setStatus({ text: err.message, type: 'error' });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page" id="chatbotPage">
        <h1>AI Resume Builder</h1>

        <section className="grid two">
          <article className="card">
            <h2>Conversation</h2>
            
            <label htmlFor="templateChoice">Template Style</label>
            <select 
              id="templateChoice" 
              value={templateChoice} 
              onChange={(e) => setTemplateChoice(e.target.value)}
              style={{ marginBottom: '16px', display: 'block', width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(24,35,38,0.1)' }}
            >
              <option value="classical.pdf">classical.pdf</option>
              <option value="freasher.pdf">freasher.pdf</option>
              <option value="resume for experienced.pdf">resume for experienced.pdf</option>
              <option value="resume for experienced2.pdf">resume for experienced2.pdf</option>
            </select>
            
            <div 
              id="chatbox" 
              className="chat-box" 
              ref={chatBoxRef}
              style={{ 
                height: '350px', 
                overflowY: 'auto', 
                background: 'rgba(255, 255, 255, 0.4)', 
                border: '1px solid rgba(24,35,38,0.08)', 
                borderRadius: 'var(--radius-md)', 
                padding: '16px', 
                marginBottom: '16px' 
              }}
            >
              {chatLog.map((msg, i) => (
                <div key={i} className="chat-msg" style={{ marginBottom: '12px' }}>
                  <strong>{msg.role}:</strong> {msg.text}
                </div>
              ))}
            </div>

            <label htmlFor="userInput">Your answer</label>
            <input 
              type="text" 
              id="userInput" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={questions[index] ? questions[index].question : "Type your answer"} 
              disabled={index >= questions.length}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{ marginBottom: '16px' }}
            />
            
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary" 
                id="sendBtn" 
                type="button" 
                onClick={handleSend}
                disabled={index >= questions.length}
              >
                Send
              </button>
              <button 
                className="btn btn-secondary" 
                id="generateBtn" 
                type="button" 
                onClick={handleGenerate}
                disabled={index < questions.length || generating}
              >
                {generating ? 'Generating...' : 'Generate Resume'}
              </button>
            </div>

            {status.text && (
              <div id="chatStatus" className={`status ${status.type}`} style={{ marginTop: '16px' }}>
                {status.text}
              </div>
            )}
          </article>

          <article className="card">
            <h2>Generated Resume Hub</h2>
            {geminiSuggestions && (
              <div 
                id="geminiSuggestions" 
                style={{ 
                  whiteSpace: 'pre-wrap', 
                  background: 'var(--accent-soft)', 
                  border: '1px solid rgba(225,75,41,0.15)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '14px', 
                  marginBottom: '15px' 
                }}
              >
                <strong>Model 3 AI Tips:</strong><br/><br/>
                {geminiSuggestions}
              </div>
            )}
            
            {downloadLinks && (
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }} id="downloadActions">
                <a className="btn btn-primary" style={{ textDecoration: 'none' }} download="My_Resume.docx" href={downloadLinks.docx}>Download DOCX</a>
                <a className="btn btn-primary" style={{ textDecoration: 'none' }} download="My_Resume.pdf" href={downloadLinks.pdf}>Download PDF</a>
                <button className="btn btn-primary" onClick={() => navigate('/jobs')} style={{ background: '#0f9d58' }}>Proceed to Live Jobs!</button>
              </div>
            )}

            <pre 
              id="generatedResume" 
              style={{ 
                whiteSpace: 'pre-wrap', 
                background: 'rgba(255,255,255,0.5)', 
                border: '1px solid rgba(24,35,38,0.08)', 
                borderRadius: 'var(--radius-md)', 
                padding: '14px', 
                minHeight: '220px', 
                fontFamily: '"Manrope", sans-serif', 
                fontSize: '14px' 
              }}
            >
              {generatedResumeText || 'Your generated plain text resume will show up here.'}
            </pre>

            <h3 style={{ fontFamily: '"Sora", sans-serif', marginTop: '20px' }}>Recommended Jobs</h3>
            <ul id="chatJobs" className="list">
              {jobRecommendations.length > 0 ? (
                jobRecommendations.map((j, idx) => (
                  <li key={idx} style={{ marginBottom: '6px' }}>
                    {j.title} ({j.company}) - <strong>{j.score}% match</strong>
                    {j.url && j.url !== "#" && (
                      <>
                        <br/>
                        <a href={j.url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontSize: '13px', decoration: 'none' }}>
                          Apply on Arbeitnow &rarr;
                        </a>
                      </>
                    )}
                  </li>
                ))
              ) : (
                <li>No recommendations available yet.</li>
              )}
            </ul>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Chatbot;
