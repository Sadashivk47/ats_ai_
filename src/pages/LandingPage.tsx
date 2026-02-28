import { PlayCircle, UploadCloud, FileText, Search, Brain, CheckCircle2, Verified, Zap, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative px-6 py-16 lg:px-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                100% Free Resume ATS Checker
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-slate-600">
                ATS-AI is a completely free-to-use resume ATS score checker. Our advanced ML + LLM technology analyzes your resume against industry-standard algorithms without any subscription fees.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/dashboard"
                  className="rounded-lg bg-primary px-8 py-4 text-base font-bold text-white shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
                >
                  Check ATS Score Now
                </Link>
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                  <PlayCircle className="h-5 w-5" />
                  Watch Demo
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 p-8">
                <div className="h-full w-full rounded-2xl bg-white shadow-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(80,72,229,0.1),transparent)]"></div>
                  <img 
                    alt="Analysis Dashboard" 
                    className="h-4/5 w-4/5 object-cover rounded-xl shadow-lg" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBPNik35HaHjpkYDR6Q_6EenqvtWLio_W4Hu43F22kb-Z8PVsdDnSnu5TPq9EDzaRMFx4Bnp5dmMsB7aphPf476qs4eZ8fUD1zENpggfM5WR7guIQ1tiasyl42M05eNbB4exyeazuY8h2KhO8Huy-8qZddxzwM8e42Of3PeXTVBITSzO8tEscfziLEENBwIbaWAW67U5FMM_-9AoHeQx2qEdgaDiXt0Yi6F1m_hHs0_147voqC_oFhtkl_CkIAP4NUzU6B36_Cmtji"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Timeline */}
      <section id="how-it-works" className="bg-white py-24 px-6 lg:px-20">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Your path to a perfect application</h2>
            <p className="mt-4 text-slate-600">Five simple steps to outperform the competition.</p>
          </div>
          
          <div className="relative space-y-12">
            <div className="absolute left-6 top-4 h-[calc(100%-48px)] w-0.5 bg-slate-200 lg:left-1/2 lg:-ml-px"></div>
            
            {[
              { title: 'Upload Resume', desc: 'Simply drag and drop your professional resume. We support PDF and DOCX files with high-fidelity text extraction.', icon: UploadCloud, side: 'right' },
              { title: 'Paste Job Description', desc: 'Paste the job description you are targeting. Our AI identifies exactly what the company is looking for in a candidate.', icon: FileText, side: 'left' },
              { title: 'ATS Keyword Matching', desc: 'Our Machine Learning models simulate top-tier ATS algorithms to find hard skill and keyword alignment gaps.', icon: Search, side: 'right' },
              { title: 'Semantic Matching', desc: 'LLM-powered analysis goes beyond keywords to understand the context, impact, and relevancy of your experience.', icon: Brain, side: 'left' },
              { title: 'Skill Gap & Suggestions', desc: 'Receive a comprehensive report with actionable bullet point improvements and missing skill suggestions.', icon: CheckCircle2, side: 'right' },
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative flex flex-col gap-8 lg:flex-row lg:items-center"
              >
                <div className={cn("lg:w-1/2 order-2", step.side === 'right' ? "lg:pr-12 lg:text-right lg:order-1" : "lg:pl-12 lg:order-3")}>
                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-slate-600">{step.desc}</p>
                </div>
                <div className="absolute left-6 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-white ring-4 ring-white lg:left-1/2 z-10">
                  <step.icon className="h-5 w-5" />
                </div>
                <div className={cn("lg:w-1/2 order-3", step.side === 'right' ? "lg:pl-12" : "lg:pr-12 lg:order-1")}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ATS-AI? */}
      <section className="py-24 px-6 lg:px-20 bg-background-light">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="lg:w-1/3">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Why ATS-AI?</h2>
              <p className="mt-4 text-slate-600">Designed for the modern job seeker, our platform provides recruiter-ready insights in seconds.</p>
            </div>
            <div className="grid flex-grow gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: '99.9% Accuracy', desc: 'Our models are trained on thousands of successful, recruiter-vetted resumes across all industries.', icon: Verified },
                { title: 'Lightning Fast', desc: "Don't wait hours for feedback. Get your full analysis report in less than 30 seconds.", icon: Zap },
                { title: 'Recruiter Insights', desc: 'See exactly what hiring managers see. We uncover the hidden scoring metrics used by recruiters.', icon: Eye },
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 lg:px-20">
        <div className="container mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-16 text-center shadow-2xl sm:px-16 lg:py-24">
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
            <div className="relative z-10 flex flex-col items-center gap-8">
              <h2 className="text-3xl font-black text-white sm:text-5xl">Completely Free Forever</h2>
              <p className="max-w-2xl text-lg text-slate-300">Join 50,000+ job seekers who optimized their resumes for free using ATS-AI.</p>
              <Link 
                to="/dashboard"
                className="rounded-xl bg-primary px-10 py-5 text-lg font-bold text-white shadow-xl shadow-primary/40 hover:scale-105 transition-transform active:scale-95"
              >
                Check ATS Score Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
