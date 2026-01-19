
import React from 'react';
import { Hostel } from '../../../types';
import HostelCard from './HostelCard';

interface HostelGridProps {
  title: string;
  icon?: string;
  hostels: Hostel[];
  onHostelClick: (hostel: Hostel) => void;
  emptyState?: React.ReactNode;
  headerRight?: React.ReactNode;
  columns?: '3' | '4';
}

export const HostelGrid: React.FC<HostelGridProps> = React.memo(({ 
  title, 
  icon, 
  hostels, 
  onHostelClick, 
  emptyState, 
  headerRight,
  columns = '4'
}) => {
  if (hostels.length === 0 && emptyState) return <>{emptyState}</>;
  if (hostels.length === 0) return null;

  return (
    <div className="mb-20">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-2xl font-black text-navy flex items-center">
          {icon && (
            <span className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center mr-4">
              <i className={`fa-solid ${icon} text-navy/40 text-sm`}></i>
            </span>
          )}
          {title}
        </h3>
        {headerRight}
      </div>
      
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${columns === '3' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-8 md:gap-10`}>
        {hostels.map(hostel => (
          <HostelCard 
            key={hostel.id} 
            hostel={hostel} 
            featured={hostel.isRecommended}
            onClick={() => onHostelClick(hostel)} 
          />
        ))}
      </div>
    </div>
  );
});
