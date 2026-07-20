import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ResumePreview from '../Components/ResumePreview.jsx'
import Loader from '../Components/Loader.jsx'

const Preview = () => {
  const { resumeId } = useParams()
  const [resumeData, setResumeData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPublicResume = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/resumes/${resumeId}`);
        const data = await res.json();
        if (data.success && data.resume) {
          const r = data.resume;
          let parsedData = {};
          if (r.resume_json) {
            try {
              parsedData = JSON.parse(r.resume_json);
            } catch (e) {
              console.error("Error parsing resume_json", e);
            }
          }
          setResumeData({
            ...parsedData,
            id: r.id,
            title: r.title,
            public: r.public || false,
            ats_score: r.ats_score,
            category: r.category
          });
          document.title = r.title;
        } else {
          setError(data.error || "Resume not found or is set to private.");
        }
      } catch (err) {
        console.error("Error fetching preview resume:", err);
        setError("Failed to fetch resume details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicResume();
  }, [resumeId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 px-4">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full shadow-xl border border-slate-200 dark:border-slate-700 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Access Error</h2>
          <p className="text-slate-650 dark:text-slate-400 mb-6">{error}</p>
          <a href="/" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow hover:shadow-md transition-all">Go Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8 print:py-0 print:bg-none">
      <div className="max-w-4xl mx-auto px-4 print:max-w-full print:px-0">
        <div className="mb-6 text-center print:hidden">
          <h1 className="text-2xl font-extrabold text-slate-850 dark:text-white">{resumeData.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Shared Resume Preview</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 border border-slate-200 dark:border-slate-700 print:p-0 print:border-none print:shadow-none print:bg-transparent">
          <ResumePreview 
            data={resumeData} 
            template={resumeData.template} 
            accentColor={resumeData.accent_color} 
            classes="print:p-0 print:m-0" 
          />
        </div>
        
        <div className="mt-6 text-center print:hidden">
          <button 
            onClick={() => window.print()} 
            className="px-6 py-3.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all font-bold shadow-md cursor-pointer hover:scale-102"
          >
            Print / Save to PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export default Preview
