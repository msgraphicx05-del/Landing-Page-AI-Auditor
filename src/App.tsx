import React from 'react';
import { Search, Plus, Trash2, Shield, BarChart3, Info, Loader2, AlertTriangle, FileSearch, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auditLandingPages, extractLandingPageData } from './services/geminiService';
import { AuditResponse, ExtractionResponse } from './types';
import { AuditResult } from './components/AuditResult';
import { ExtractionResult } from './components/ExtractionResult';
import { cn } from './lib/utils';

export default function App() {
  const [urls, setUrls] = React.useState<string[]>(['']);
  const [mode, setMode] = React.useState<'audit' | 'extract'>('audit');
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [auditResult, setAuditResult] = React.useState<AuditResponse | null>(null);
  const [extractionResult, setExtractionResult] = React.useState<ExtractionResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleAddUrl = () => {
    if (urls.length < 2) {
      setUrls([...urls, '']);
    }
  };

  const handleRemoveUrl = (index: number) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls.length ? newUrls : ['']);
  };

  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    const validUrls = urls.filter(url => url.trim() !== '');
    if (validUrls.length === 0) return;

    setIsAnalyzing(true);
    setError(null);
    setAuditResult(null);
    setExtractionResult(null);

    try {
      if (mode === 'audit') {
        const result = await auditLandingPages(validUrls);
        setAuditResult(result);
      } else {
        const result = await extractLandingPageData(validUrls);
        setExtractionResult(result);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during processing. Please check your URLs and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Shield className="text-white" size={18} />
            </div>
            <h1 className="font-bold text-lg tracking-tight">AuditAI</h1>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1"><BarChart3 size={14} /> 2026 Standards</span>
            <span className="flex items-center gap-1"><Shield size={14} /> E-E-A-T Verified</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight"
          >
            {mode === 'audit' ? 'Audit your landing pages' : 'Extract page elements'} <br />
            <span className="text-slate-400">with Google-level precision.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 max-w-2xl mx-auto"
          >
            {mode === 'audit' 
              ? 'Get instant scores based on the 2026 Helpful Content System, Core Web Vitals, and E-E-A-T guidelines.'
              : 'Automatically extract headlines, CTAs, trust signals, and technical indicators without scoring.'}
          </motion.p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
            <button
              onClick={() => setMode('audit')}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
                mode === 'audit' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <BarChart3 size={16} /> Audit Mode
            </button>
            <button
              onClick={() => setMode('extract')}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
                mode === 'extract' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <FileSearch size={16} /> Extraction Mode
            </button>
          </div>
        </div>

        {/* Input Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <form onSubmit={handleProcess} className="card p-6 md:p-8">
            <div className="space-y-4 mb-6">
              {urls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Search size={18} />
                    </div>
                    <input
                      type="url"
                      placeholder="https://example.com/landing-page"
                      value={url}
                      onChange={(e) => handleUrlChange(index, e.target.value)}
                      className="input-field pl-11"
                      required
                    />
                  </div>
                  {urls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveUrl(index)}
                      className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {urls.length < 2 && (
                <button
                  type="button"
                  onClick={handleAddUrl}
                  className="flex-1 border-2 border-dashed border-slate-200 text-slate-500 py-3 rounded-xl hover:border-slate-400 hover:text-slate-700 transition-all flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <Plus size={18} /> Add Page to Compare
                </button>
              )}
              <button
                type="submit"
                disabled={isAnalyzing}
                className={cn("btn-primary", urls.length < 2 ? "md:w-48" : "w-full")}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    {mode === 'audit' ? 'Analyzing...' : 'Extracting...'}
                  </>
                ) : (
                  <>
                    {mode === 'audit' ? <Zap size={20} fill="currentColor" /> : <FileSearch size={20} />}
                    {mode === 'audit' ? 'Run Audit' : 'Extract Data'}
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              <Info size={12} />
              Analysis uses real-time URL context via Gemini 3.1 Pro
            </div>
          </form>
        </div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-3xl mx-auto bg-rose-50 border border-rose-100 p-4 rounded-2xl flex gap-3 text-rose-600 mb-12"
            >
              <AlertTriangle className="shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {auditResult && mode === 'audit' && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              {auditResult.comparison && (
                <div className="card bg-slate-900 text-white p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
                  <div className="relative z-10">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <BarChart3 size={16} /> Comparative Analysis
                    </h3>
                    <p className="text-lg md:text-xl font-medium leading-relaxed text-slate-200">
                      {auditResult.comparison}
                    </p>
                  </div>
                </div>
              )}

              <div className="grid gap-8 grid-cols-1">
                {auditResult.audits.map((audit, i) => (
                  <AuditResult key={i} audit={audit} />
                ))}
              </div>
            </motion.div>
          )}

          {extractionResult && mode === 'extract' && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="grid gap-8 grid-cols-1">
                {extractionResult.extractions.map((extraction, i) => (
                  <ExtractionResult key={i} extraction={extraction} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Shield size={16} />
            <span className="text-sm font-bold tracking-tight">AuditAI</span>
          </div>
          <p className="text-xs text-slate-400">
            &copy; 2026 AuditAI. Powered by Google Gemini. Evaluated against 2026 Search Quality Guidelines.
          </p>
          <div className="flex gap-6 text-xs font-medium text-slate-400">
            <a href="#" className="hover:text-slate-900">Documentation</a>
            <a href="#" className="hover:text-slate-900">API</a>
            <a href="#" className="hover:text-slate-900">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
