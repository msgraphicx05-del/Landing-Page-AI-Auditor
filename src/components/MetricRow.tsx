import React from 'react';
import { AuditMetric } from '../types';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface MetricRowProps {
  label: string;
  metric: AuditMetric;
  icon: React.ReactNode;
}

export const MetricRow: React.FC<MetricRowProps> = ({ label, metric, icon }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const getScoreColor = (s: number) => {
    if (s >= 90) return 'bg-emerald-500';
    if (s >= 70) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="text-slate-400">{icon}</div>
          <div>
            <h4 className="text-sm font-semibold text-slate-700">{label}</h4>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={cn("h-full transition-all duration-500", getScoreColor(metric.score))}
                  style={{ width: `${metric.score}%` }}
                />
              </div>
              <span className="text-xs font-mono text-slate-500">{metric.score}/100</span>
            </div>
          </div>
        </div>
        {isOpen ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-slate-50/50"
          >
            <div className="p-4 pt-0 space-y-4">
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "{metric.reasoning}"
                </p>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <AlertCircle size={10} /> Actionable Recommendations
                </h5>
                <ul className="space-y-2">
                  {metric.recommendations.map((rec, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-600">
                      <div className="mt-0.5 text-emerald-500 shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
