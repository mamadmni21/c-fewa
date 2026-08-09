import React, { useState } from 'react';
import { Sparkles, Send, Bot, ShieldCheck, Loader2, RefreshCw } from 'lucide-react';
import { UserRole } from '../types';

interface AIPredictorTabProps {
  currentRole: UserRole;
}

export const AIPredictorTab: React.FC<AIPredictorTabProps> = ({ currentRole }) => {
  const [role, setRole] = useState<UserRole>(currentRole);
  const [location, setLocation] = useState('Citarum Watershed & Subang Agri Basin');
  const [rainfallMm, setRainfallMm] = useState(195);
  const [riverLevelM, setRiverLevelM] = useState(5.2);
  const [cropType, setCropType] = useState('Unhusked Rice (Gabah) & School MBG Meals');
  const [userQuery, setUserQuery] = useState(
    'What immediate stock repositioning and child nutrition safeguard measures should be executed in the next 18 hours?'
  );

  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRunAiAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAiResult(null);

    try {
      const response = await fetch('/api/ai-advisory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          location,
          rainfallMm,
          riverLevelM,
          cropType,
          userQuery,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'AI analysis request failed.');
      }

      setAiResult(data.result);
    } catch (err: any) {
      console.error('AI Advisory Error:', err);
      setError(err.message || 'Failed to connect to Gemini AI Advisory Engine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner Bento Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Server-Side Gemini AI Engine (gemini-2.5-flash)</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            C-FEWA Climate-Food Strategic AI Predictor
          </h2>
          <p className="text-xs text-slate-500">
            Powered by PT. Sepuh Trismatek Nusa AI pipeline for real-time disaster simulation & stock repositioning advice.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input Parameters Form */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <Bot className="w-4 h-4 text-indigo-600" />
            <span>Simulation Parameters</span>
          </h3>

          <form onSubmit={handleRunAiAnalysis} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Target Role Perspective
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-indigo-800 font-semibold focus:outline-none"
              >
                <option value="farmer">🌾 Farmer (e-Farmania Agritech)</option>
                <option value="trader">🚚 Trader / Supplier (Supply Chain)</option>
                <option value="government">🏛️ Government (BNPB / Bulog / Dinas)</option>
                <option value="citizen">🏡 Citizen / Caregiver (Fellas Network)</option>
                <option value="kitchen_operator">🏫 Kitchen Operator (PAGi / MBG Feeding)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Geographic Basin / Zone
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Rainfall (mm)
                </label>
                <input
                  type="number"
                  value={rainfallMm}
                  onChange={(e) => setRainfallMm(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  River Level (m)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={riverLevelM}
                  onChange={(e) => setRiverLevelM(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Commodity & Meal Focus
              </label>
              <input
                type="text"
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Strategic Query
              </label>
              <textarea
                rows={3}
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm shadow-indigo-200 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-200" />
                  <span>Gemini Engine Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run AI Flood & Supply Advisory</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Strategic Advisory Report</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">
                PT. Sepuh Trismatek Nusa AI Engine
              </span>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                {error}
              </div>
            )}

            {!aiResult && !loading && !error && (
              <div className="text-center py-12 space-y-3 text-slate-400">
                <Bot className="w-12 h-12 mx-auto text-slate-300" />
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Configure simulation parameters on the left and click "Run AI Advisory" to generate Gemini-powered disaster mitigation guidance.
                </p>
              </div>
            )}

            {loading && (
              <div className="text-center py-16 space-y-3 text-indigo-600">
                <Loader2 className="w-10 h-10 animate-spin mx-auto text-indigo-600" />
                <p className="text-xs font-semibold text-slate-600">
                  Synthesizing meteorological signals with e-Farmania stock maps & PAGi child nutrition algorithms...
                </p>
              </div>
            )}

            {aiResult && (
              <div className="prose prose-xs max-w-none space-y-3 text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-200">
                {aiResult}
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 pt-3 mt-6 text-[11px] text-slate-500 flex items-center justify-between">
            <span>© PT. Sepuh Trismatek Nusa C-FEWA Engine</span>
            <span>gemini-2.5-flash</span>
          </div>
        </div>

      </div>

    </div>
  );
};
