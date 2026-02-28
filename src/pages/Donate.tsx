import React from 'react';
import { Heart, Coffee, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useSearchParams } from 'react-router-dom';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Donate() {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get('success') === 'true';
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleDonate = async (amount: number) => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Create Order on Server
      const response = await fetch('/api/donate/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      
      const order = await response.json();
      
      if (!response.ok) {
        throw new Error(order.error || 'Failed to create order');
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: "rzp_test_SLBZY9WCxTG8VM", // Use the public key ID
        amount: order.amount,
        currency: order.currency,
        name: "ATS-AI",
        description: "Support ATS-AI Development",
        image: "https://picsum.photos/200",
        order_id: order.id,
        handler: async function (response: any) {
          // 3. Verify Payment on Server
          const verifyResponse = await fetch('/api/donate/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const result = await verifyResponse.json();
          if (result.success) {
            setSearchParams({ success: 'true' });
          } else {
            setError('Payment verification failed');
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#0F172A", // Slate-900 to match theme
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error('Donation failed:', error);
      setError(error.message || 'Donation failed. Please try again.');
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 max-w-lg"
        >
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h1 className="text-4xl font-black text-slate-900">Thank You So Much!</h1>
          <p className="text-lg text-slate-600">
            Your generous support helps keep ATS-AI free for everyone. We're incredibly grateful for your contribution to this project.
          </p>
          <div className="pt-4">
            <a href="/dashboard" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
              Back to Dashboard <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-16">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mb-6">
          <Heart className="h-10 w-10 fill-current" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Support My Work</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          ATS-AI is a free tool built to help job seekers land their dream jobs. If you've found it helpful, consider supporting its development and server costs.
        </p>
        {error && (
          <div className="mt-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-medium max-w-md mx-auto">
            {error}
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {[
          { amount: 10, label: 'Buy me a chai', icon: Coffee },
          { amount: 50, label: 'Fuel the servers', icon: Heart },
          { amount: 200, label: 'Super Supporter', icon: SparklesIcon },
        ].map((tier) => (
          <button
            key={tier.amount}
            onClick={() => handleDonate(tier.amount)}
            disabled={isLoading}
            className="group p-8 bg-white border border-slate-200 rounded-2xl text-center hover:border-primary hover:shadow-xl transition-all disabled:opacity-50 relative overflow-hidden"
          >
            {isLoading && (
              <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
              </div>
            )}
            <tier.icon className="h-8 w-8 mx-auto mb-4 text-slate-400 group-hover:text-primary transition-colors" />
            <div className="text-2xl font-black text-slate-900 mb-1">₹{tier.amount}</div>
            <div className="text-sm text-slate-500 font-medium">{tier.label}</div>
          </button>
        ))}
      </div>

      <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center">
        <p className="text-slate-600 italic">
          "I built this tool because I believe everyone deserves a fair shot at their dream career, regardless of their budget. Your support keeps this mission alive."
        </p>
        <p className="mt-4 font-bold text-slate-900">— Founder of ATS-AI</p>
      </div>
    </div>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
