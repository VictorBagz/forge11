
import React, { useState, useCallback } from 'react';
import { Hostel } from '../../../types';
import { UNIVERSITIES } from '../../../data';
import { Badge } from '../../ui/Badge';

interface HostelCardProps {
  hostel: Hostel;
  featured?: boolean;
  onClick: () => void;
}

const HostelCard: React.FC<HostelCardProps> = ({ hostel, featured, onClick }) => {
  const uni = UNIVERSITIES.find(u => u.id === hostel.universityId);
  const [isSaved, setIsSaved] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleSave = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(prev => !prev);
  }, []);

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] group cursor-pointer active:scale-[0.98] ${featured ? 'ring-2 ring-yellow/20' : ''}`}
    >
      {/* Explicit aspect ratio prevents Cumulative Layout Shift (CLS) */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}
        <img 
          src={`${hostel.image}?auto=format&fit=crop&w=800&q=80`} 
          alt={hostel.name} 
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imgLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'}`} 
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
          decoding="async"
        />
        
        <button 
          onClick={handleSave}
          className={`absolute top-4 right-14 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 z-10 btn-press ${
            isSaved ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-white/80 text-navy hover:bg-white hover:scale-110'
          }`}
          aria-label={isSaved ? "Remove from saved" : "Save hostel"}
        >
          <i className={`${isSaved ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
        </button>

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-navy font-bold text-xs shadow-sm flex items-center">
          <i className="fa-solid fa-star text-yellow mr-1"></i> {hostel.rating}
        </div>
        {hostel.isRecommended && (
          <div className="absolute top-4 left-4">
            <Badge variant="yellow">Premium Choice</Badge>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-xl font-black text-navy truncate flex-grow pr-2 group-hover:text-navy-light transition-colors">{hostel.name}</h4>
          <Badge variant="navy">{uni?.shortName}</Badge>
        </div>
        <p className="text-gray-500 text-sm mb-4 flex items-center">
          <i className="fa-solid fa-location-dot mr-1.5 text-navy/30 group-hover:text-yellow transition-colors"></i> {hostel.distance}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6 h-12 overflow-hidden">
          {hostel.amenities.map(a => (
            <Badge key={a} variant="outline" className="text-gray-500 normal-case">{a}</Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-0.5">Starting From</p>
            <p className="text-navy font-black text-xl leading-none">{hostel.priceRange.split(' - ')[0]}</p>
          </div>
          <button 
            className="w-12 h-12 rounded-2xl bg-navy text-yellow flex items-center justify-center transition-all duration-300 group-hover:bg-yellow group-hover:text-navy group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-yellow/20 btn-press shadow-lg shadow-navy/10"
            aria-label="View Details"
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HostelCard);
