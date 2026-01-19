
import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = React.memo(({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`}></div>
));

export const HostelCardSkeleton = () => (
  <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 p-4 space-y-4">
    <Skeleton className="h-56 w-full rounded-[2rem]" />
    <div className="px-2 space-y-3">
      <div className="flex justify-between">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-1/4" />
      </div>
      <Skeleton className="h-4 w-1/3" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="pt-4 flex justify-between items-center">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-12 w-12 rounded-2xl" />
      </div>
    </div>
  </div>
);
