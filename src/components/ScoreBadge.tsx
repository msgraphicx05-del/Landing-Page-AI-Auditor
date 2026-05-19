import React from 'react';
import { cn } from '../lib/utils';

interface ScoreBadgeProps {
  score: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, className, size = 'md' }) => {
  const getColor = (s: number) => {
    if (s >= 90) return 'text-emerald-600 border-emerald-200 bg-emerald-50';
    if (s >= 70) return 'text-amber-600 border-amber-200 bg-amber-50';
    return 'text-rose-600 border-rose-200 bg-rose-50';
  };

  const getSize = (sz: string) => {
    switch (sz) {
      case 'sm': return 'w-10 h-10 text-sm border-2';
      case 'lg': return 'w-24 h-24 text-3xl border-8';
      default: return 'w-16 h-16 text-xl border-4';
    }
  };

  return (
    <div className={cn(
      "score-circle font-bold",
      getColor(score),
      getSize(size),
      className
    )}>
      {score}
    </div>
  );
};
