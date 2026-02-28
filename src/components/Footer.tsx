import { Sparkles, Globe, Share2, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 px-6 lg:px-20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-slate-900">ATS-AI</span>
            </div>
            <p className="text-sm text-slate-500">
              Helping candidates beat the bot and land their dream jobs with cutting-edge AI technology.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-900">Product</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a className="hover:text-primary" href="#">Checker</a></li>
              <li><a className="hover:text-primary" href="#">Templates</a></li>
              <li><a className="hover:text-primary" href="#">API</a></li>
              <li><a className="hover:text-primary" href="#">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-900">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a className="hover:text-primary" href="#">Blog</a></li>
              <li><a className="hover:text-primary" href="#">Guides</a></li>
              <li><a className="hover:text-primary" href="#">Support</a></li>
              <li><a className="hover:text-primary" href="#">Case Studies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-900">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a className="hover:text-primary" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-primary" href="#">Terms of Service</a></li>
              <li><a className="hover:text-primary" href="#">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-xs text-slate-400">© 2024 ATS-AI. All rights reserved.</p>
            <a 
              href="https://github.com/Sadashivk47/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] text-slate-400 hover:text-primary transition-colors font-medium"
            >
              Designed and developed with AI by Sadashiv
            </a>
          </div>
          <div className="flex gap-4">
            <a className="text-slate-400 hover:text-primary" href="#"><Globe className="h-4 w-4" /></a>
            <a className="text-slate-400 hover:text-primary" href="#"><Share2 className="h-4 w-4" /></a>
            <a className="text-slate-400 hover:text-primary" href="#"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
