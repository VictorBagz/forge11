
import React from 'react';
import { University } from '../../../types';

interface UniversityFilterSectionProps {
  selectedId: string;
  onSelect: (id: string) => void;
  filteredUniversities: University[];
}

const FilterButton: React.FC<{ 
  isActive: boolean; 
  onClick: () => void; 
  shortName: string; 
  fullName: string;
  isAll?: boolean;
}> = React.memo(({ isActive, onClick, shortName, fullName, isAll }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center group transition-all duration-500 flex-shrink-0 btn-press px-3"
  >
    {/* Badge Element - Using a refined squircle-like shape */}
    <div className={`
      relative w-20 h-20 sm:w-24 sm:h-24 rounded-[2rem] sm:rounded-[2.5rem] flex items-center justify-center transition-all duration-500 border overflow-hidden
      ${isActive 
        ? 'bg-yellow border-yellow shadow-[0_20px_40px_-15px_rgba(255,215,0,0.4)] -translate-y-2 scale-105' 
        : 'bg-white border-gray-100 shadow-[0_10px_20px_-10px_rgba(0,35,73,0.05)] text-gray-400 group-hover:border-yellow/30 group-hover:shadow-lg group-hover:-translate-y-1'
      }
    `}>
      {/* Decorative background circle for active state */}
      {isActive && (
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/20 rounded-full blur-xl animate-pulse"></div>
      )}

      <div className="flex flex-col items-center relative z-10">
        {isAll ? (
          <i className={`fa-solid fa-layer-group text-2xl sm:text-3xl transition-transform duration-500 ${isActive ? 'text-navy scale-110' : 'text-gray-300 group-hover:text-yellow'}`}></i>
        ) : (
          <span className={`text-lg sm:text-xl font-black tracking-tighter transition-colors duration-500 ${isActive ? 'text-navy' : 'text-gray-400 group-hover:text-navy'}`}>
            {shortName}
          </span>
        )}
      </div>

      {/* Active Indicator Dot */}
      {isActive && (
        <div className="absolute bottom-3 w-1.5 h-1.5 bg-navy rounded-full animate-bounce"></div>
      )}
    </div>
    
    {/* Label Element - Sophisticated typography */}
    <div className="mt-4 flex flex-col items-center">
      <span className={`
        max-w-[80px] sm:max-w-[100px] text-center leading-tight transition-all duration-500
        text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]
        ${isActive ? 'text-navy' : 'text-gray-400 group-hover:text-navy/70'}
      `}>
        {fullName.split(' ')[0]}
      </span>
      <span className={`
        text-[7px] font-bold uppercase tracking-[0.1em] mt-0.5 transition-all duration-500
        ${isActive ? 'text-navy/40' : 'text-gray-300'}
      `}>
        {isAll ? 'UGANDA' : 'CAMPUS'}
      </span>
    </div>
  </button>
));

export const UniversityFilterSection: React.FC<UniversityFilterSectionProps> = React.memo(({
  selectedId,
  onSelect,
  filteredUniversities
}) => {
  return (
    <div className="pt-12 mb-20">
      <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow/10 border border-yellow/20 text-yellow-hover font-black text-[8px] uppercase tracking-widest mb-4">
            Select Your Location
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-navy mb-4 tracking-tighter leading-none">
            Find Your <span className="text-yellow italic">Tribe.</span>
          </h2>
          <p className="text-gray-500 font-medium text-lg leading-relaxed">
            Every campus has its rhythm. Pick yours to explore the best-rated student housing nearby.
          </p>
        </div>
        
        <div className="hidden md:flex items-center gap-2 text-gray-300 text-xs font-bold uppercase tracking-widest">
          Scroll to explore <i className="fa-solid fa-arrow-right-long animate-pulse ml-2"></i>
        </div>
      </div>

      <div className="relative group/scroll">
        {/* Refined gradient masks for scrollable area */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none transition-opacity duration-300 group-hover/scroll:opacity-0"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none transition-opacity duration-300 group-hover/scroll:opacity-0"></div>
        
        {/* Added pt-6 to accommodate the upward translation and scale of active buttons */}
        <div className="flex items-start gap-2 sm:gap-6 overflow-x-auto pt-6 pb-10 hide-scrollbar px-2 -mx-2 snap-x">
          <div className="snap-center">
            <FilterButton 
              isActive={selectedId === 'all'} 
              onClick={() => onSelect('all')}
              shortName="ALL"
              fullName="All Locations"
              isAll
            />
          </div>
          
          {filteredUniversities.map(uni => (
            <div key={uni.id} className="snap-center">
              <FilterButton 
                isActive={selectedId === uni.id}
                onClick={() => onSelect(uni.id)}
                shortName={uni.shortName}
                fullName={uni.name}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-4 opacity-50"></div>
    </div>
  );
});
