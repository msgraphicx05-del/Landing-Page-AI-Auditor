import React from 'react';
import { LandingPageAudit } from '../types';
import { ScoreBadge } from './ScoreBadge';
import { MetricRow } from './MetricRow';
import { 
  Search, 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  Target, 
  ExternalLink,
  ListChecks,
  FileText,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

interface AuditResultProps {
  audit: LandingPageAudit;
}

export const AuditResult: React.FC<AuditResultProps> = ({ audit }) => {
  const getVerdictColor = (verdict: string) => {
    const v = verdict.toLowerCase();
    if (v.includes('highly recommended') || v.includes('excellent')) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (v.includes('needs improvement') || v.includes('warning')) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-100';
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <ScoreBadge score={audit.overallScore} size="lg" />
          <div className="flex-1">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <ExternalLink size={14} />
              <span className="text-xs font-mono truncate max-w-xs">{audit.url}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-slate-900">Audit Summary</h2>
              <div className={cn("px-3 py-1 rounded-full text-xs font-bold border", getVerdictColor(audit.verdict))}>
                {audit.verdict}
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {audit.summary}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Target size={16} /> Performance Metrics
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            <MetricRow 
              label="Helpful Content" 
              metric={audit.metrics.helpfulContent} 
              icon={<Search size={20} />} 
            />
            <MetricRow 
              label="E-E-A-T" 
              metric={audit.metrics.eeat} 
              icon={<ShieldCheck size={20} />} 
            />
            <MetricRow 
              label="Page Experience" 
              metric={audit.metrics.pageExperience} 
              icon={<Zap size={20} />} 
            />
            <MetricRow 
              label="Mobile First" 
              metric={audit.metrics.mobileFirst} 
              icon={<Smartphone size={20} />} 
            />
            <MetricRow 
              label="Content Originality" 
              metric={audit.metrics.contentOriginality} 
              icon={<Sparkles size={20} />} 
            />
            <MetricRow 
              label="Ad & Policy Compliance" 
              metric={audit.metrics.adCompliance} 
              icon={<FileText size={20} />} 
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
              <AlertCircle size={16} /> Final Verdict
            </h3>
            <div className={cn("p-4 rounded-xl border-l-4 font-medium text-sm leading-relaxed", getVerdictColor(audit.verdict))}>
              {audit.verdict}: {audit.summary}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
              <ListChecks size={16} /> Action Plan
            </h3>
            <div className="space-y-4">
              {audit.actionPlan.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
