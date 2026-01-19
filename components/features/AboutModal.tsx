
import React from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-navy/90 backdrop-blur-md" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white w-full max-w-3xl my-auto rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-in zoom-in duration-300 border border-white/10 overflow-hidden">
        
        {/* Header/Close */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-[210] w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-navy hover:text-yellow transition-all active:scale-90"
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <div className="p-8 sm:p-12 lg:p-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-yellow/10 border border-yellow/20 text-yellow-hover font-black text-[10px] uppercase tracking-widest mb-6">
            Our Story
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-navy mb-8 tracking-tighter leading-none">
            UniStay <span className="text-yellow italic">Uganda.</span>
          </h2>

          <div className="space-y-8">
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              Founded in 2024, UniStay Uganda was born out of a simple necessity: the struggle to find safe, reliable, and affordable housing for university students across the country. We noticed the gap between students and landlords and decided to bridge it with technology.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 group hover:bg-navy transition-all duration-500">
                <div className="w-12 h-12 bg-yellow rounded-xl flex items-center justify-center text-navy mb-4 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-shield-heart text-xl"></i>
                </div>
                <h3 className="text-xl font-black text-navy mb-2 group-hover:text-white transition-colors">Student Safety</h3>
                <p className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors">Every hostel on our platform is physically verified for security and basic standards.</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 group hover:bg-navy transition-all duration-500">
                <div className="w-12 h-12 bg-yellow rounded-xl flex items-center justify-center text-navy mb-4 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-bolt text-xl"></i>
                </div>
                <h3 className="text-xl font-black text-navy mb-2 group-hover:text-white transition-colors">Instant Access</h3>
                <p className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors">No more walking for miles. Find your perfect room in under 5 minutes from your phone.</p>
              </div>
            </div>

            {/* Impact Numbers */}
            <div className="flex flex-wrap items-center gap-10 pt-4">
              <div>
                <p className="text-4xl font-black text-navy">50k+</p>
                <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Active Users</p>
              </div>
              <div className="w-px h-10 bg-gray-100 hidden sm:block"></div>
              <div>
                <p className="text-4xl font-black text-navy">200+</p>
                <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Verified Hostels</p>
              </div>
              <div className="w-px h-10 bg-gray-100 hidden sm:block"></div>
              <div>
                <p className="text-4xl font-black text-navy">6+</p>
                <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Universities</p>
              </div>
            </div>

            <div className="pt-8">
              <button 
                onClick={onClose}
                className="w-full bg-navy text-yellow font-black py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all btn-press"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
