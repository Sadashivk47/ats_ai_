import React from 'react';
import { useDropzone } from 'react-dropzone';
import { analyzeResume, AnalysisResult } from '@/src/services/gemini';
import { UploadCloud, FileText, Briefcase, BarChart3, CheckCircle2, AlertCircle, ArrowRight, BrainCircuit, TrendingUp, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { DropzoneOptions } from 'react-dropzone';

export default function Dashboard() {
  const [resumeText, setResumeText] = React.useState('');
  const [jobDescription, setJobDescription] = React.useState('');
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [result, setResult] = React.useState<AnalysisResult | null>(null);

  const [error, setError] = React.useState<string | null>(null);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // In a real app, we'd use a library like pdfjs-dist or mammoth to extract text
      setResumeText(`Simulated text from ${file.name}: Experienced Software Engineer with 5+ years in React, Node.js, and Cloud infrastructure. Proven track record of delivering scalable web applications.`);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  } as any);

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) return;
    
    setIsAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      const data = await analyzeResume(resumeText, jobDescription);
      if (!data || !data.jobRolePrediction) {
        throw new Error('Invalid analysis result received');
      }
      setResult(data);
    } catch (err: any) {
      console.error('Analysis failed:', err);
      setError(err.message || 'Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
          AI Resume Screening & <span className="text-primary">ATS Checker</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Optimize your job search with our AI + LLM-based matching engine. Get instant feedback on how well your profile aligns with top-tier job descriptions.
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Resume Upload */}
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            <UploadCloud className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-bold">Resume Upload</h3>
          </div>
          <div 
            {...getRootProps()} 
            className={cn(
              "flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-12 transition-colors cursor-pointer group",
              isDragActive ? "border-primary bg-primary/5" : "border-slate-200 bg-slate-50 hover:border-primary"
            )}
          >
            <input {...getInputProps()} />
            <UploadCloud className={cn("h-12 w-12 mb-4 transition-colors", isDragActive ? "text-primary" : "text-slate-400 group-hover:text-primary")} />
            <p className="text-sm font-medium text-slate-900 mb-1">
              {resumeText ? "Resume uploaded!" : "Drag & drop your PDF or DOCX file"}
            </p>
            <p className="text-xs text-slate-500">Maximum file size 5MB</p>
            {resumeText && (
              <p className="mt-4 text-xs text-slate-400 italic line-clamp-2 px-4 text-center">
                {resumeText}
              </p>
            )}
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-bold">Job Description</h3>
          </div>
          <div className="flex-1 flex flex-col">
            <textarea 
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-full min-h-[200px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none text-sm placeholder:text-slate-400" 
              placeholder="Paste the full job details and requirements here..."
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mb-24">
        <button 
          onClick={handleAnalyze}
          disabled={isAnalyzing || !resumeText || !jobDescription}
          className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-10 py-4 rounded-xl text-lg font-bold transition-all shadow-xl shadow-primary/20 flex items-center gap-3"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" />
              Analyzing...
            </>
          ) : (
            <>
              <BarChart3 className="h-5 w-5" />
              Analyze Resume
            </>
          )}
        </button>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-center gap-2 text-rose-600 bg-rose-50 px-4 py-2 rounded-lg border border-rose-100"
          >
            <XCircle className="h-4 w-4" />
            <span className="text-sm font-medium">{error}</span>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {result && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Analysis Results</h2>
              <span className="text-sm text-slate-500">Report generated just now</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Job Role Prediction */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-sm font-medium text-slate-500 mb-4 uppercase tracking-wider">Job Role Prediction</p>
                <div className="flex items-end justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">{result.jobRolePrediction.role}</h4>
                    <p className="text-xs text-slate-400 mt-1">{result.jobRolePrediction.specialty}</p>
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">
                    {result.jobRolePrediction.confidence}% Confidence
                  </div>
                </div>
              </div>

              {/* ATS Match Score */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-2 uppercase tracking-wider">ATS Match Score</p>
                  <h4 className="text-3xl font-black text-slate-900">{result.atsMatchScore}<span className="text-sm font-normal text-slate-400">/100</span></h4>
                  <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> Good compatibility
                  </p>
                </div>
                <div className="relative h-20 w-20">
                  <svg className="h-full w-full" viewBox="0 0 36 36">
                    <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${result.atsMatchScore}, 100`} strokeLinecap="round" strokeWidth="3" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>

              {/* Semantic Score */}
              <div className="bg-gradient-to-br from-primary to-indigo-700 p-6 rounded-xl shadow-lg relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="text-sm font-medium text-white/70 mb-2 uppercase tracking-wider">Semantic Match (LLM)</p>
                  <h4 className="text-3xl font-black text-white">{result.semanticMatchScore}%</h4>
                  <p className="text-xs text-white/80 mt-2">{result.semanticAnalysis}</p>
                </div>
                <BrainCircuit className="absolute -bottom-4 -right-4 h-32 w-32 text-white/10 rotate-12 group-hover:rotate-0 transition-transform" />
              </div>
            </div>

            {/* Skill Analysis */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="border-b border-slate-100 p-6">
                <h3 className="font-bold text-lg">Skill Analysis</h3>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <h4 className="font-semibold text-slate-900">Matched Skills</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.matchedSkills.map(skill => (
                      <span key={skill} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium border border-emerald-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="h-5 w-5 text-rose-500" />
                    <h4 className="font-semibold text-slate-900">Missing Keywords</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.missingKeywords.map(skill => (
                      <span key={skill} className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-sm font-medium border border-rose-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between">
                <p className="text-sm text-slate-500">{result.recommendation}</p>
                <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                  Improve Resume <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
