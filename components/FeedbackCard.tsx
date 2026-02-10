import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { Feedback } from '../types';

interface FeedbackCardProps {
  feedback: Feedback | null;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  if (!feedback) return null;

  const styles = {
    positive: 'bg-green-500/10 border-green-500/20 text-green-400',
    warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
    constructive: 'bg-purple-neon/10 border-purple-neon/20 text-purple-neon',
  };

  const icons = {
    positive: CheckCircle,
    warning: AlertCircle,
    constructive: Info,
  };

  const Icon = icons[feedback.type];

  return (
    <div className={cn(
      "flex items-start gap-3 p-4 rounded-xl border backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4",
      styles[feedback.type]
    )}>
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div>
        <p className="font-medium text-sm">{feedback.message}</p>
      </div>
    </div>
  );
};
