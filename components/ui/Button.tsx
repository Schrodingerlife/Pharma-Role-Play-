import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}) => {
  const variants = {
    primary: 'bg-cyan-neon text-navy-dark hover:bg-cyan-400 shadow-[0_0_15px_rgba(0,217,255,0.4)] border-none font-bold',
    secondary: 'bg-purple-neon text-white hover:bg-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.4)]',
    outline: 'border border-cyan-neon text-cyan-neon hover:bg-cyan-neon/10',
    ghost: 'bg-transparent text-gray-300 hover:text-white hover:bg-white/5',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.4)]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(
        'rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
