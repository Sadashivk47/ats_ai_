import React from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Github } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const [submitted, setSubmitted] = React.useState(false);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Message Sent!</h1>
          <p className="text-slate-600 max-w-md mx-auto">
            Thank you for reaching out. We've received your message and will get back to you as soon as possible.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-primary font-semibold hover:underline"
          >
            Send another message
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Get in Touch</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Have questions about ATS-AI? We're here to help you optimize your career for free.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex flex-col items-center md:items-start mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <img 
                src="https://github.com/Sadashivk47.png" 
                alt="Sadashiv" 
                className="w-32 h-32 rounded-2xl object-cover shadow-2xl border-4 border-white mb-4"
                referrerPolicy="no-referrer"
              />
              <a 
                href="https://github.com/Sadashivk47/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
            </motion.div>
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold text-slate-900">Sadashiv</h2>
              <p className="text-sm text-slate-500 font-medium italic">Crafting Intelligent Tools with LLMs</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Email Me</h3>
              <p className="text-slate-600">sadashivkandgole@gmail.com</p>
              <p className="text-xs text-slate-400 mt-1">We typically respond within 24 hours.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Github className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">GitHub</h3>
              <a 
                href="https://github.com/Sadashivk47/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-primary transition-colors"
              >
                Leave a star on GitHub
              </a>
              <p className="text-xs text-slate-400 mt-1">Support the open source project.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Live Chat</h3>
              <p className="text-slate-600">Available Mon-Fri, 9am-5pm EST</p>
            </div>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">100% Free Forever</h4>
            <p className="text-sm text-slate-600">
              ATS-AI is a passion project dedicated to helping job seekers. We will never charge for our core resume scanning services.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Name</label>
              <input name="name" required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="John Doe" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <input name="email" required type="email" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="john@example.com" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Subject</label>
            <input name="subject" required className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="How can we help?" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Message</label>
            <textarea name="message" required rows={5} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" placeholder="Your message..." />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
