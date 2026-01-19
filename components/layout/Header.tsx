import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useApp } from '../../context/AppContext';

const Accordion: React.FC<{ 
  title: string; 
  icon: string; 
  isOpen: boolean; 
  onToggle: () => void; 
  children: React.ReactNode 
}> = React.memo(({ title, icon, isOpen, onToggle, children }) => (
  <div className="border-b border-white/5 last:border-0">
    <button 
      onClick={onToggle}
      className="w-full flex items-center justify-between py-5 px-4 hover:bg-white/5 transition-all rounded-2xl group"
    >
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 transition-all ${isOpen ? 'bg-yellow text-navy' : 'bg-white/5 text-yellow'}`}>
          <i className={`fa-solid ${icon}`}></i>
        </div>
        <span className={`text-lg font-black transition-colors ${isOpen ? 'text-white' : 'text-gray-300'}`}>{title}</span>
      </div>
      <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${isOpen ? 'rotate-180 text-yellow' : 'text-gray-500'}`}></i>
    </button>
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
      <div className="pl-14 pr-4 space-y-1">
        {children}
      </div>
    </div>
  </div>
));

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const { setIsAdmin, universities, searchQuery, setSearchQuery } = useApp();
  
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => {
    setIsOpen(false);
    setActiveAccordion(null);
  }, []);

  const toggleAccordion = useCallback((id: string) => {
    setActiveAccordion(prev => prev === id ? null : id);
  }, []);

  const navLinks = useMemo(() => [
    { name: 'Hostels', id: 'hostels', icon: 'fa-house-chimney' },
    { name: 'Community', id: 'community', icon: 'fa-users' },
    { name: 'Spotlight', id: 'spotlight', icon: 'fa-star' },
    { name: 'Contact', id: 'contact', icon: 'fa-envelope' },
  ], []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    handleClose();
  }, [handleClose]);

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    scrollToSection('hostels');
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSearch(val);
    setSearchQuery(val);
  };

  return (
    <nav className="bg-navy text-white sticky top-0 z-[100] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-2xl font-black tracking-tighter text-yellow">UNISTAY</span>
            <span className="text-[10px] font-black ml-1.5 text-gray-400 tracking-[0.2em]">UGANDA</span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((link) => (
                <button 
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="px-3 py-2 rounded-md text-sm font-bold hover:text-yellow transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => setIsAdmin(true)}
                className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-yellow transition-colors border border-white/10 px-3 py-1 rounded-lg"
              >
                Admin Panel
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-yellow text-navy px-6 py-2.5 rounded-full text-sm font-black hover:bg-yellow-hover transition-all shadow-lg shadow-yellow/10"
              >
                Join UniStay
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
             <button 
              onClick={() => setIsAdmin(true)}
              className="p-2.5 rounded-xl bg-white/5 text-gray-400"
              aria-label="Admin Access"
            >
              <i className="fa-solid fa-lock text-sm"></i>
            </button>
            <button 
              onClick={handleOpen}
              className="inline-flex items-center justify-center p-2.5 rounded-xl bg-white/5 text-yellow hover:text-white transition focus:outline-none"
              aria-label="Toggle Menu"
            >
              <i className="fa-solid fa-bars-staggered text-2xl"></i>
            </button>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-[110] md:hidden transition-all duration-500 ease-in-out ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-navy/95 backdrop-blur-xl" onClick={handleClose}></div>
        <div className={`absolute top-0 right-0 h-full w-[90%] max-w-sm bg-navy-dark shadow-2xl border-l border-white/5 transform transition-transform duration-500 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <div className="flex items-center" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); handleClose(); }}>
              <span className="text-xl font-black tracking-tighter text-yellow">UNISTAY</span>
              <span className="text-[8px] font-black ml-1 text-gray-500 tracking-widest">MENU</span>
            </div>
            <button onClick={handleClose} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-yellow hover:bg-white/10 transition-all active:scale-90">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          <div className="flex-grow flex flex-col overflow-y-auto hide-scrollbar">
            <div className="p-6 pb-2">
              <form onSubmit={handleMobileSearchSubmit} className="relative group">
                <label htmlFor="mobile-search" className="sr-only">Search hostels or news</label>
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow transition-colors"></i>
                <input 
                  id="mobile-search"
                  type="text" 
                  value={localSearch}
                  onChange={onSearchChange}
                  placeholder="Find hostels or news..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow/50 focus:border-yellow transition-all placeholder:text-gray-500 font-medium text-white"
                />
              </form>
            </div>

            <div className="px-2 py-4 space-y-1">
              <div className="mb-6 px-4">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 ml-1">Explore Services</p>
                <div className="grid grid-cols-2 gap-3">
                  {navLinks.map((link) => (
                    <button 
                      key={link.name} 
                      onClick={() => scrollToSection(link.id)} 
                      className="flex flex-col items-start p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all active:scale-95 group"
                    >
                      <i className={`fa-solid ${link.icon} text-yellow text-lg mb-2 group-hover:scale-110 transition-transform`}></i>
                      <span className="text-sm font-black">{link.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-2">
                <Accordion title="Universities" icon="fa-building-columns" isOpen={activeAccordion === 'unis'} onToggle={() => toggleAccordion('unis')}>
                  <div className="grid grid-cols-2 gap-2">
                    {universities.map(uni => (
                      <button 
                        key={uni.id}
                        onClick={() => scrollToSection('hostels')}
                        className="text-left py-2.5 px-3 rounded-lg text-xs font-bold text-gray-400 hover:text-yellow hover:bg-white/5 transition-all"
                      >
                        {uni.shortName} <span className="text-[10px] opacity-40 ml-1 font-normal">• {uni.location}</span>
                      </button>
                    ))}
                  </div>
                </Accordion>

                <Accordion title="Quick Resources" icon="fa-bolt" isOpen={activeAccordion === 'resources'} onToggle={() => toggleAccordion('resources')}>
                  <div className="space-y-2">
                    <button onClick={() => { scrollToSection('community'); }} className="flex items-center w-full py-2 text-sm text-gray-400 hover:text-white transition-colors"><i className="fa-solid fa-book-open w-6 text-xs text-yellow/50"></i> University Guide</button>
                    <button onClick={() => { scrollToSection('hostels'); }} className="flex items-center w-full py-2 text-sm text-gray-400 hover:text-white transition-colors"><i className="fa-solid fa-tags w-6 text-xs text-yellow/50"></i> Student Discounts</button>
                    <button onClick={() => { scrollToSection('hostels'); }} className="flex items-center w-full py-2 text-sm text-gray-400 hover:text-white transition-colors"><i className="fa-solid fa-list-check w-6 text-xs text-yellow/50"></i> Hostel Checklist</button>
                  </div>
                </Accordion>
              </div>
            </div>

            <div className="mt-auto p-6 pt-10">
              <div className="bg-yellow rounded-[2rem] p-6 text-navy relative overflow-hidden group">
                <i className="fa-solid fa-headset absolute -right-4 -bottom-4 text-7xl opacity-10 group-hover:scale-110 transition-transform"></i>
                <h4 className="font-black text-xl mb-2 relative z-10 text-navy">Need Help?</h4>
                <p className="text-sm font-bold opacity-80 mb-4 relative z-10 leading-snug text-navy">Contact student support 24/7.</p>
                <button onClick={() => scrollToSection('contact')} className="inline-flex bg-navy text-yellow px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl relative z-10 hover:scale-105 transition-transform">Get in Touch</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Header);