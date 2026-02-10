import React from 'react';
import { cn } from '../lib/utils';

interface ScoreRingProps {
  score: number;
  label: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ScoreRing: React.FC<ScoreRingProps> = ({ 
  score, 
  label, 
  color = 'text-cyan-neon',
  size = 'md' 
}) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const sizeClasses = {
    sm: 'w-16 h-16 text-xs',
    md: 'w-24 h-24 text-sm',
    lg: 'w-32 h-32 text-base',
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("relative flex items-center justify-center", sizeClasses[size])}>
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-white/10"
            strokeWidth="6"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
          <circle
            className={cn("transition-all duration-1000 ease-out", color)}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
        </svg>
        <span className={cn("absolute font-bold", color)}>{Math.round(score)}%</span>
      </div>
      <span className="text-gray-400 font-medium uppercase tracking-wider text-xs">{label}</span>
    </div>
  );
};
