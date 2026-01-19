
import React, { useEffect, useState } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'none';
}

export const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const translateClass = {
    up: isVisible ? 'translate-y-0' : 'translate-y-8',
    down: isVisible ? 'translate-y-0' : '-translate-y-8',
    none: ''
  }[direction];

  return (
    <div 
      className={`transition-all duration-1000 cubic-bezier(0.2, 0.8, 0.2, 1) ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${translateClass}`}
    >
      {children}
    </div>
  );
};
