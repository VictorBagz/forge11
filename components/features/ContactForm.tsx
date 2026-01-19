import React, { useState, useCallback } from 'react';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('sending');
    setTimeout(() => {
      if (Math.random() > 0.1) {
        setStatus('success');
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    }, 2000);
  }, [email]);

  if (status === 'success') {
    return (
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-[3rem] p-12 lg:p-20 text-center text-white animate-in zoom-in duration-500 shadow-2xl shadow-navy/20">
            <div className="w-24 h-24 bg-yellow rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-yellow/40 animate-bounce">
              <i className="fa-solid fa-check text-navy text-4xl"></i>
            </div>
            <h3 className="text-4xl font-black mb-4">Message Sent!</h3>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">Thanks for reaching out. We'll be in touch at <span className="text-yellow">{email}</span> shortly.</p>
            <button 
              onClick={() => { setStatus('idle'); setEmail(''); }}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-10 py-4 rounded-2xl transition-all btn-press"
            >
              Send Another
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-navy/5 overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          <div className="lg:w-1/2 bg-navy p-12 lg:p-20 text-white relative">
            <h3 className="text-5xl font-black mb-8 leading-tight">Let's <br/><span className="text-yellow italic">Talk.</span></h3>
            <p className="text-gray-400 text-lg mb-12">Ask us anything about campus living.</p>
            <div className="space-y-10">
              <div className="flex items-center group">
                <div className="w-12 h-12 rounded-xl bg-yellow/10 flex items-center justify-center text-yellow group-hover:bg-yellow group-hover:text-navy transition-all">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <p className="ml-4 font-bold text-gray-300">hello@unistay.ug</p>
              </div>
              <div className="flex items-center group">
                <div className="w-12 h-12 rounded-xl bg-yellow/10 flex items-center justify-center text-yellow group-hover:bg-yellow group-hover:text-navy transition-all">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <p className="ml-4 font-bold text-gray-300">+256 755 123 456</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 p-12 lg:p-20 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="contact-email" className="block text-navy font-black text-[10px] uppercase tracking-widest ml-1 cursor-pointer">Email Address</label>
                <input 
                  id="contact-email"
                  required 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-gray-50 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 transition-all border ${status === 'error' ? 'border-red-500 ring-red-100' : 'border-gray-100 focus:ring-yellow'}`} 
                  placeholder="student@uni.ac.ug" 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="block text-navy font-black text-[10px] uppercase tracking-widest ml-1 cursor-pointer">Message</label>
                <textarea id="contact-message" required rows={4} className="w-full bg-gray-50 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-yellow transition-all border border-gray-100" placeholder="How can we help?"></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={status === 'sending'}
                className={`w-full bg-navy text-yellow font-black py-5 rounded-2xl shadow-xl transition-all btn-press flex items-center justify-center relative group ${status === 'sending' ? 'cursor-not-allowed opacity-80' : 'hover:shadow-2xl'}`}
              >
                <span className={`transition-all duration-300 ${status === 'sending' ? 'opacity-0 scale-90' : 'opacity-100'}`}>
                  Send Message <i className="fa-solid fa-paper-plane ml-3 group-hover:translate-x-1 transition-transform"></i>
                </span>
                {status === 'sending' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className="fa-solid fa-spinner fa-spin text-2xl mr-3"></i> 
                    <span className="text-sm font-bold uppercase tracking-widest">Sending...</span>
                  </div>
                )}
              </button>
              {status === 'error' && <p className="text-red-500 text-xs font-bold text-center animate-pulse">Oops! Something went wrong. Try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;