
import { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SortOrder } from '../types';
import { useDebounce } from './useDebounce';

export const useHostelFilter = () => {
  const { hostels, universities, searchQuery, setSearchQuery, fetchHostels } = useApp();
  const [selectedUniId, setSelectedUniId] = useState<string>('all');
  const [uniSearchQuery, setUniSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOrder>('default');

  // Debounce search queries to avoid excessive "backend" requests
  const debouncedSearchQuery = useDebounce(searchQuery, 350);
  const debouncedUniSearchQuery = useDebounce(uniSearchQuery, 350);

  // Still filter universities on frontend if they are pre-loaded and rarely change,
  // but let's assume hostel list is too large and must be backend-filtered.
  const filteredUniversities = useMemo(() => {
    const q = debouncedUniSearchQuery.toLowerCase();
    return universities.filter(uni => 
      uni.name.toLowerCase().includes(q) || 
      uni.shortName.toLowerCase().includes(q)
    );
  }, [universities, debouncedUniSearchQuery]);

  // Effect to trigger "Backend" refresh when filter state changes
  useEffect(() => {
    fetchHostels({
      universityId: selectedUniId,
      searchQuery: debouncedSearchQuery,
      sortBy: sortBy
    });
  }, [selectedUniId, debouncedSearchQuery, sortBy, fetchHostels]);

  // The 'hostels' from context are now specifically our filtered results
  const filteredHostels = hostels;

  const recommendedHostels = useMemo(() => {
    return filteredHostels.filter(h => h.isRecommended);
  }, [filteredHostels]);

  return {
    selectedUniId,
    setSelectedUniId,
    uniSearchQuery,
    setUniSearchQuery,
    hostelSearchQuery: searchQuery,
    setHostelSearchQuery: setSearchQuery,
    sortBy,
    setSortBy,
    filteredUniversities,
    filteredHostels,
    recommendedHostels,
    universities
  };
};
