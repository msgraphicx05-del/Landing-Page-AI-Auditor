import React from 'react';
import { ExtractionResult as ExtractionResultType } from '../types';
import { 
  Type, 
  MousePointer2, 
  ShieldCheck, 
  Image as ImageIcon, 
  Code, 
  Smartphone, 
  FileText, 
  Layout, 
  Zap,
  ExternalLink
} from 'lucide-react';

interface ExtractionResultProps {
  extraction: ExtractionResultType;
}

export const ExtractionResult: React.FC<ExtractionResultProps> = ({ extraction }) => {
  return (
    <div className="card overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Layout size={20} className="text-slate-400" />
          {extraction.pageLabel} Summary
        </h3>
        <div className="flex items-center gap-2 text-slate-400">
          <ExternalLink size={14} />
          <span className="text-xs font-mono truncate max-w-[200px]">{extraction.url}</span>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 mb-1">
                <Type size={12} /> Headline
              </label>
              <p className="text-sm font-semibold text-slate-800">{extraction.headline}</p>
            </div>
            
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 mb-1">
                <FileText size={12} /> Subheadline
              </label>
              <p className="text-sm text-slate-600">{extraction.subheadline}</p>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 mb-1">
                <MousePointer2 size={12} /> Primary CTA
              </label>
              <p className="text-sm text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100 italic">
                {extraction.primaryCta}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 mb-1">
                <ShieldCheck size={12} /> Trust Signals
              </label>
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                {extraction.trustSignals.map((signal, i) => (
                  <li key={i}>{signal}</li>
                ))}
              </ul>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 mb-1">
                <ImageIcon size={12} /> Media
              </label>
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                {extraction.media.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 mb-1">
              <Code size={12} /> Schema Detected
            </label>
            <p className="text-xs font-medium text-slate-700">{extraction.schemaDetected}</p>
          </div>
          
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 mb-1">
              <Smartphone size={12} /> Mobile Indicators
            </label>
            <p className="text-xs font-medium text-slate-700">{extraction.mobileIndicators}</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 mb-1">
              <Zap size={12} /> Load Speed Hints
            </label>
            <ul className="text-[10px] text-slate-600 list-disc list-inside">
              {extraction.loadSpeedHints.map((hint, i) => (
                <li key={i}>{hint}</li>
              ))}
            </ul>
          </div>
        </div>

        {extraction.bodyCopy && (
          <div className="pt-4 border-t border-slate-100">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 mb-1">
              <FileText size={12} /> Body Copy Summary
            </label>
            <p className="text-xs text-slate-600 leading-relaxed">{extraction.bodyCopy}</p>
          </div>
        )}
      </div>
    </div>
  );
};
