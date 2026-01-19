import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

export const Input: React.FC<InputProps> = React.memo(({ icon, id, className = '', ...props }) => {
  return (
    <div className="relative group w-full">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <i className={`${icon} text-gray-400 group-focus-within:text-yellow transition-colors`}></i>
        </div>
      )}
      <input 
        id={id}
        className={`block w-full ${icon ? 'pl-12' : 'pl-6'} pr-6 py-4 bg-white border border-gray-100 rounded-[2rem] text-navy placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-yellow/10 focus:border-yellow shadow-xl shadow-navy/5 transition-all ${className}`}
        {...props}
      />
    </div>
  );
});