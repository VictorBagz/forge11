
import React, { useCallback, useState } from 'react';
import AboutModal from './AboutModal';

const Hero: React.FC = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleExploreClick = useCallback(() => {
    const target = document.getElementById('hostels');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const searchInput = target.querySelector('input');
        if (searchInput) {
          searchInput.focus({ preventScroll: true });
        }
      }, 800);
    }
  }, []);

  const handleAboutClick = useCallback(() => {
    setIsAboutOpen(true);
  }, []);

  return (
    <>
      <section className="relative px-4 sm:px-6 lg:px-8 py-8 lg:py-12 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[80vh] min-h-[600px] lg:min-h-[750px] w-full overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] shadow-2xl shadow-navy/20">
            
            {/* Main Hero Image - GPU Accelerated with Hardware-layer promotion */}
            <div className="absolute inset-0 z-0 gpu-accel overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756ebafe1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Modern Campus Architecture" 
                className="w-full h-full object-cover object-center scale-100 transition-transform duration-[10000ms] hover:scale-110"
                fetchPriority="high"
              />
              {/* Multi-layered gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent"></div>
              <div className="absolute inset-0 bg-navy/20"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-12 lg:p-20">
              <div className="max-w-4xl">
                <div className="inline-flex items-center px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-yellow font-black text-[9px] sm:text-[10px] uppercase tracking-[0.25em] mb-6 lg:mb-8 animate-in slide-in-from-bottom duration-700">
                  <span className="w-2 h-2 bg-yellow rounded-full mr-3 animate-pulse"></span>
                  Trusted by 50,000+ Students
                </div>
                
                <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8 animate-in slide-in-from-bottom duration-1000">
                  LIVING <br/>
                  <span className="text-yellow italic">EVOLVED.</span>
                </h1>
                
                <p className="text-gray-200 text-lg sm:text-2xl max-w-2xl font-medium leading-relaxed mb-10 opacity-90 animate-in slide-in-from-bottom duration-1200">
                  The most sophisticated platform for finding high-quality student housing across all major Ugandan universities.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-in slide-in-from-bottom duration-1400">
                  <button 
                    onClick={handleExploreClick}
                    className="bg-yellow text-navy px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-yellow/20 hover:bg-yellow-hover hover:scale-105 transition-all active:scale-95 group"
                  >
                    Start Exploring
                    <i className="fa-solid fa-arrow-right ml-3 group-hover:translate-x-2 transition-transform"></i>
                  </button>

                  <button 
                    onClick={handleAboutClick}
                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 hover:scale-105 transition-all active:scale-95 flex items-center justify-center sm:justify-start"
                  >
                    About Us
                    <i className="fa-solid fa-circle-info ml-3 opacity-60"></i>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Subtle Floaties for aesthetic depth - low priority rendering */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-yellow/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-navy/30 rounded-full blur-[100px] pointer-events-none"></div>
          </div>
        </div>
      </section>

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  );
};

export default Hero;
