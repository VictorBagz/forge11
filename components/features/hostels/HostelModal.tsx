
import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { Hostel, University } from '../../../types';
import { Badge } from '../../ui/Badge';
import { getAmenityIcon } from '../../../utils/amenityIcons';

interface HostelModalProps {
  hostel: Hostel;
  university?: University;
  onClose: () => void;
}

const ZoomOverlay: React.FC<{ imageUrl: string; onClose: () => void }> = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[300] bg-navy/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10 animate-in fade-in zoom-in duration-300 cursor-zoom-out"
      onClick={onClose}
    >
      <button 
        className="absolute top-8 right-8 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-2xl flex items-center justify-center transition-all border border-white/10 active:scale-90"
        aria-label="Close zoom"
      >
        <i className="fa-solid fa-xmark text-2xl"></i>
      </button>
      <img 
        src={imageUrl} 
        className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl" 
        alt="Zoomed view" 
      />
    </div>
  );
};

export const HostelModal: React.FC<HostelModalProps> = ({ hostel, university, onClose }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isInquiring, setIsInquiring] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  
  // Swipe logic refs
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const images = useMemo(() => [
    hostel.image,
    `https://picsum.photos/seed/${hostel.id}1/800/600`,
    `https://picsum.photos/seed/${hostel.id}2/800/600`,
    `https://picsum.photos/seed/${hostel.id}3/800/600`,
  ], [hostel.id, hostel.image]);

  const nextImage = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;

    if (isLeftSwipe) nextImage();
    if (isRightSwipe) prevImage();

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleInquiry = useCallback(() => {
    setIsInquiring(true);
    setTimeout(() => {
      setIsInquiring(false);
      alert(`Inquiry sent to ${hostel.name}! They will contact you via your profile email.`);
    }, 2000);
  }, [hostel.name]);

  return (
    <>
      <div className="fixed inset-0 z-[150] flex items-start sm:items-center justify-center p-4 sm:p-6 pt-24 sm:pt-6 animate-in fade-in duration-300 overflow-y-auto">
        <div className="fixed inset-0 bg-navy/90 backdrop-blur-md" onClick={onClose}></div>
        
        <div className="relative bg-white w-full max-w-5xl my-auto rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-in zoom-in duration-300 border border-white/10 overflow-hidden">
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[160] w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur shadow-xl rounded-xl sm:rounded-2xl flex items-center justify-center text-navy hover:text-yellow transition-all active:scale-90 border border-gray-100"
            aria-label="Close modal"
          >
            <i className="fa-solid fa-xmark text-lg sm:text-xl"></i>
          </button>

          <div className="flex flex-col lg:flex-row max-h-[90vh] lg:max-h-none overflow-y-auto hide-scrollbar">
            {/* Left Side: Swipeable Carousel */}
            <div className="lg:w-1/2 p-4 sm:p-6 bg-gray-50/50">
              <div 
                className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden h-72 sm:h-[550px] shadow-2xl group/carousel touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Image Track */}
                <div 
                  className="flex h-full transition-transform duration-700 cubic-bezier"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {images.map((img, idx) => (
                    <div 
                      key={idx} 
                      className="w-full h-full flex-shrink-0 cursor-zoom-in group/img relative"
                      onClick={() => setZoomedImage(img)}
                    >
                      <img src={img} alt={`${hostel.name} view ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />
                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors flex items-center justify-center">
                        <i className="fa-solid fa-magnifying-glass-plus text-white text-3xl opacity-0 group-hover/img:opacity-100 transition-opacity"></i>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Larger Navigation Arrows */}
                <div className="hidden sm:block">
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/30 backdrop-blur-lg text-white rounded-2xl flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-white hover:text-navy hover:scale-110 shadow-xl border border-white/20 active:scale-90"
                    aria-label="Previous image"
                  >
                    <i className="fa-solid fa-chevron-left text-xl"></i>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/30 backdrop-blur-lg text-white rounded-2xl flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-white hover:text-navy hover:scale-110 shadow-xl border border-white/20 active:scale-90"
                    aria-label="Next image"
                  >
                    <i className="fa-solid fa-chevron-right text-xl"></i>
                  </button>
                </div>

                {/* Pagination Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 bg-navy/40 backdrop-blur-md p-2 rounded-full px-4 border border-white/10 z-20">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setActiveIndex(idx); }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 bg-yellow' : 'w-2 bg-white/40'}`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
                {images.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveIndex(i)}
                    className={`h-16 sm:h-24 rounded-[1.2rem] sm:rounded-[2rem] overflow-hidden border-2 transition-all active:scale-95 ${activeIndex === i ? 'border-yellow shadow-lg scale-105 z-10' : 'border-transparent opacity-50 hover:opacity-100 hover:scale-102'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${i + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side: Details */}
            <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <Badge variant="navy" className="px-3 sm:px-4 py-1.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px]">{university?.shortName} Area</Badge>
                <div className="flex items-center text-yellow font-black text-xs sm:text-sm bg-yellow/5 px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl border border-yellow/10">
                  <i className="fa-solid fa-star mr-1.5"></i> {hostel.rating}
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy mb-2 sm:mb-3 leading-[1.1]">{hostel.name}</h2>
              <p className="text-gray-500 mb-6 sm:mb-10 flex items-center font-medium text-sm sm:text-base">
                <span className="w-8 h-8 rounded-full bg-yellow/10 flex items-center justify-center mr-3 text-yellow">
                  <i className="fa-solid fa-location-dot text-xs"></i>
                </span>
                {hostel.distance}
              </p>

              <div className="mb-6 sm:mb-10">
                <p className="font-black text-navy uppercase text-[9px] sm:text-[10px] tracking-[0.2em] mb-3 sm:mb-4 ml-1">Semester Pricing</p>
                <div className="bg-gray-50 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 border border-gray-100 flex justify-between items-center hover:bg-white hover:shadow-xl transition-all duration-500">
                  <div>
                    <p className="text-navy font-black text-2xl sm:text-3xl leading-none">{hostel.priceRange}</p>
                    <p className="text-gray-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-2 flex items-center">
                      <i className="fa-solid fa-circle-info mr-1.5 text-navy/20"></i> Non-negotiable Campus Rate
                    </p>
                  </div>
                  <div className="hidden sm:block bg-yellow text-navy px-4 py-2 rounded-xl shadow-lg shadow-yellow/10 transform -rotate-3">
                    <p className="font-black text-[10px] uppercase tracking-tighter">Verified</p>
                  </div>
                </div>
              </div>

              <div className="mb-6 sm:mb-10">
                <p className="font-black text-navy uppercase text-[9px] sm:text-[10px] tracking-[0.2em] mb-3 sm:mb-4 ml-1">Standard Amenities</p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {hostel.amenities.map(amenity => (
                    <div key={amenity} className="flex items-center text-gray-600 text-xs sm:text-sm font-bold group">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gray-50 flex items-center justify-center mr-3 text-navy group-hover:bg-yellow transition-colors duration-300 border border-gray-100">
                        <i className={`fa-solid ${getAmenityIcon(amenity)}`}></i>
                      </div>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <button 
                  disabled={isInquiring}
                  onClick={handleInquiry}
                  className="flex-grow bg-navy text-yellow font-black py-4 sm:py-5 rounded-xl sm:rounded-2xl shadow-2xl shadow-navy/20 hover:bg-navy-light transition-all active:scale-[0.97] text-base sm:text-lg flex items-center justify-center relative group"
                >
                  <span className={`flex items-center transition-all duration-300 ${isInquiring ? 'translate-y-12 opacity-0' : 'translate-y-0 opacity-100'}`}>
                    Check Availability
                    <i className="fa-solid fa-paper-plane ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                  </span>
                  {isInquiring && (
                    <div className="absolute inset-0 flex items-center justify-center animate-in slide-in-from-bottom">
                      <i className="fa-solid fa-circle-notch animate-spin mr-3"></i> Connecting...
                    </div>
                  )}
                </button>
                <button 
                  onClick={() => setIsSaved(!isSaved)}
                  className={`w-full sm:w-16 h-14 sm:h-16 rounded-xl sm:rounded-2xl border-2 flex items-center justify-center transition-all active:scale-90 ${isSaved ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-200' : 'border-gray-100 text-navy hover:bg-gray-50'}`}
                >
                  <i className={`${isSaved ? 'fa-solid' : 'fa-regular'} fa-heart text-xl`}></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {zoomedImage && <ZoomOverlay imageUrl={zoomedImage} onClose={() => setZoomedImage(null)} />}
    </>
  );
};
