import React, { useState, useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
import { useHostelFilter } from '../../hooks/useHostelFilter';
import { Hostel, SortOrder } from '../../types';
import { UniversityFilterSection } from './hostels/UniversityFilterSection';
import { HostelGrid } from './hostels/HostelGrid';
import { FadeIn } from '../ui/FadeIn';
import { HostelCardSkeleton } from '../ui/Skeleton';
import { Input } from '../ui/Input';

const HostelModal = lazy(() => import('./hostels/HostelModal').then(module => ({ default: module.HostelModal })));

const HostelExplorer: React.FC = () => {
  const {
    selectedUniId,
    setSelectedUniId,
    setUniSearchQuery,
    hostelSearchQuery,
    setHostelSearchQuery,
    sortBy,
    setSortBy,
    filteredUniversities,
    filteredHostels,
    universities
  } = useHostelFilter();

  const [activeHostel, setActiveHostel] = useState<Hostel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeHostel ? 'hidden' : 'unset';
  }, [activeHostel]);

  const handleHostelClick = useCallback((hostel: Hostel) => {
    setActiveHostel(hostel);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveHostel(null);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSelectedUniId('all');
    setUniSearchQuery('');
    setHostelSearchQuery('');
    setSortBy('default');
  }, [setSelectedUniId, setUniSearchQuery, setHostelSearchQuery, setSortBy]);

  const EmptyState = useMemo(() => (
    <div className="col-span-full py-24 text-center bg-white rounded-[4rem] border-2 border-dashed border-gray-200">
      <div className="bg-navy/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-navy/20 text-4xl">
        <i className="fa-solid fa-house-circle-xmark"></i>
      </div>
      <p className="text-navy font-black text-2xl mb-2">No matching hostels</p>
      <p className="text-gray-500 max-w-sm mx-auto">Try adjusting your filters or search terms.</p>
      <button onClick={handleResetFilters} className="mt-10 bg-navy text-yellow px-10 py-4 rounded-2xl font-black shadow-xl transition-all active:scale-95">
        Reset All Filters
      </button>
    </div>
  ), [handleResetFilters]);

  const activeUniversity = useMemo(() => 
    universities.find(u => u.id === activeHostel?.universityId),
    [universities, activeHostel]
  );

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <FadeIn delay={100}>
        <UniversityFilterSection 
          selectedId={selectedUniId}
          onSelect={setSelectedUniId}
          filteredUniversities={filteredUniversities}
        />
      </FadeIn>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
        <div className="w-full sm:max-w-md">
          <Input 
            id="hostel-search-input"
            icon="fa-solid fa-hotel"
            placeholder="Search by hostel name or amenity..."
            value={hostelSearchQuery}
            onChange={(e) => setHostelSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="relative group w-full sm:w-auto">
          <label htmlFor="sort-by-select" className="sr-only">Sort hostels</label>
          <select 
            id="sort-by-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOrder)}
            className="appearance-none w-full sm:w-64 bg-white border border-gray-100 rounded-2xl px-6 py-3.5 pr-12 text-sm font-black text-navy focus:outline-none focus:ring-4 focus:ring-yellow/10 focus:border-yellow shadow-lg shadow-navy/5 transition-all cursor-pointer"
          >
            <option value="default">Sort: Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
          </select>
          <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-navy/30">
            <i className="fa-solid fa-chevron-down text-[10px]"></i>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map(i => <HostelCardSkeleton key={i} />)}
        </div>
      ) : (
        <>
          {hostelSearchQuery && (
            <div className="mb-8 p-4 bg-yellow/5 border border-yellow/20 rounded-2xl flex items-center justify-between">
              <span className="text-sm font-bold text-navy">Showing results for "<span className="text-yellow-hover font-black">{hostelSearchQuery}</span>"</span>
              <button onClick={() => setHostelSearchQuery('')} className="text-xs font-black uppercase text-navy/40 hover:text-navy">Clear</button>
            </div>
          )}
          
          <FadeIn delay={200}>
            <HostelGrid 
              title={hostelSearchQuery ? "Search Results" : "Available Student Housing"}
              icon={hostelSearchQuery ? "fa-magnifying-glass" : "fa-list-ul"}
              columns="4"
              hostels={filteredHostels}
              onHostelClick={handleHostelClick}
              emptyState={EmptyState}
              headerRight={
                <div className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {filteredHostels.length} results found
                </div>
              }
            />
          </FadeIn>
        </>
      )}

      {activeHostel && (
        <Suspense fallback={null}>
          <HostelModal hostel={activeHostel} university={activeUniversity} onClose={handleCloseModal} />
        </Suspense>
      )}
    </div>
  );
};

export default HostelExplorer;