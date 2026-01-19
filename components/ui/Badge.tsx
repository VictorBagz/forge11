
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'navy' | 'yellow' | 'outline' | 'ghost';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = React.memo(({ children, variant = 'navy', className = '' }) => {
  const variants = {
    navy: 'bg-navy text-yellow',
    yellow: 'bg-yellow text-navy',
    outline: 'bg-transparent border border-gray-200 text-gray-600',
    ghost: 'bg-gray-100 text-gray-500'
  };

  return (
    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
});
