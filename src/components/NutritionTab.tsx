import React, { useState } from 'react';
import { Utensils, Heart, ShieldCheck, AlertCircle, Plus, School, Home, Activity, ExternalLink } from 'lucide-react';
import { NutritionLog } from '../types';
import { createNutritionLog } from '../lib/syncService';

interface NutritionTabProps {
  logs: NutritionLog[];
}

export const NutritionTab: React.FC<NutritionTabProps> = ({ logs }) => {
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  const [schoolOrKitchenName, setSchoolOrKitchenName] = useState('');
  const [location, setLocation] = useState('Karawang Agritech Pilot Zone');
  const [programType, setProgramType] = useState<NutritionLog['programType']>('PAGi / MBG School Kitchen');
  const [childCount, setChildCount] = useState(350);
  const [mealsServedToday, setMealsServedToday] = useState(350);
  const [nutritionScore, setNutritionScore] = useState(90);
  const [stuntingRiskCount, setStuntingRiskCount] = useState(15);
  const [disasterDisruptionActive, setDisasterDisruptionActive] = useState(true);
  const [notes, setNotes] = useState('');
  const [loggedBy, setLoggedBy] = useState('PAGi Supervisor');
  const [submitting, setSubmitting] = useState(false);

  const filteredLogs = logs.filter((log) => {
    if (filterType === 'pagi' && !log.programType.includes('PAGi')) return false;
    if (filterType === 'lapaq' && !log.programType.includes('LaPaQ')) return false;
    return true;
  });

  const handleCreateLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolOrKitchenName) return;
    setSubmitting(true);

    try {
      await createNutritionLog({
        schoolOrKitchenName,
        location,
        programType,
        childCount,
        mealsServedToday,
        nutritionScore,
        stuntingRiskCount,
        disasterDisruptionActive,
        notes: notes || 'Daily nutrition monitoring log recorded during flood early warning window.',
        loggedBy,
        updatedAt: new Date().toISOString()
      });
      setShowModal(false);
      setSchoolOrKitchenName('');
      setNotes('');
    } catch (err) {
      console.error('Failed to create nutrition log:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner Bento Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-teal-600 uppercase tracking-wider">
            <Utensils className="w-4 h-4 text-teal-600" />
            <span>Feature 5 • Child Nutrition Intake Monitoring (PAGi / LaPaQ)</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Child Nutrition Outcomes & MBG Program Impact Validation
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Closes the loop by confirming whether the early warning & supply chain stock repositioning actually protected child nutrition during disasters.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <a
            href="https://lapaq.app:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition-all shadow-2xs"
          >
            <ExternalLink className="w-4 h-4 text-teal-600" />
            <span>Connect to LAPAQ App</span>
          </a>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm shadow-teal-200 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Record Nutrition Log</span>
          </button>
        </div>
      </div>

      {/* LAPAQ App Platform Live Integration Box */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white p-5 rounded-2xl border border-teal-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-md bg-teal-500/20 border border-teal-400/30 text-teal-300 text-[10px] font-bold uppercase tracking-wider">
            <ExternalLink className="w-3.5 h-3.5 text-teal-300" />
            <span>External System Integration • LAPAQ Engine</span>
          </div>
          <h3 className="text-base font-bold text-white">
            Connect to LAPAQ Household Posyandu Platform
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Link directly to the external LAPAQ household nutrition telemetry system at <code className="bg-slate-800 px-1.5 py-0.5 rounded text-teal-300 font-mono text-[11px]">https://lapaq.app:3000</code> to synchronize family feeding metrics and community Posyandu data.
          </p>
        </div>

        <a
          href="https://lapaq.app:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-teal-950/50 flex items-center space-x-2 shrink-0"
        >
          <span>Launch https://lapaq.app:3000</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Program Type Filter */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <span className="text-xs text-slate-600 font-bold uppercase tracking-wider pl-2">Filter Program Stream:</span>
        <div className="flex space-x-1.5">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterType === 'all'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Tracking Logs
          </button>
          <button
            onClick={() => setFilterType('pagi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterType === 'pagi'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            🏫 PAGi (MBG School Kitchens)
          </button>
          <button
            onClick={() => setFilterType('lapaq')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterType === 'lapaq'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            🏡 LaPaQ (Household Posyandu)
          </button>
        </div>
      </div>

      {/* Logs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLogs.map((log) => {
          const isDisruption = log.disasterDisruptionActive;

          return (
            <div
              key={log.id}
              className={`bg-white border rounded-2xl p-5 shadow-sm transition-all space-y-4 ${
                isDisruption ? 'border-amber-200 bg-amber-50/20' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-teal-100 text-teal-800 border border-teal-200 uppercase tracking-wider">
                      {log.programType}
                    </span>
                    {isDisruption && (
                      <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-rose-100 text-rose-800 border border-rose-200 uppercase tracking-wider">
                        Flood Disruption Active
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {log.schoolOrKitchenName}
                  </h3>
                  <p className="text-xs text-slate-500">{log.location}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-teal-700">
                  {log.programType.includes('PAGi') ? (
                    <School className="w-5 h-5" />
                  ) : (
                    <Home className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* Nutrition Key Stats Grid */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 grid grid-cols-3 gap-2 text-xs text-center">
                <div className="bg-white p-2 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Children Served</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {log.mealsServedToday} / {log.childCount}
                  </span>
                </div>

                <div className="bg-white p-2 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Nutrition Score</span>
                  <span className="font-mono font-bold text-teal-700 text-sm">
                    {log.nutritionScore} / 100
                  </span>
                </div>

                <div className="bg-white p-2 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Stunting Risk</span>
                  <span className="font-mono font-bold text-amber-700 text-sm">
                    {log.stuntingRiskCount} Kids
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-200">
                "{log.notes}"
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2">
                <span>Logged by: <strong className="text-slate-800 font-medium">{log.loggedBy}</strong></span>
                <span>{new Date(log.updatedAt).toLocaleTimeString()}</span>
              </div>

            </div>
          );
        })}
      </div>

      {/* New Nutrition Log Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl shadow-xl p-6 text-slate-900 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Utensils className="w-5 h-5 text-teal-600" />
              <span>Record PAGi / LaPaQ Child Nutrition Log</span>
            </h3>

            <form onSubmit={handleCreateLog} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  School / Kitchen / Posyandu Name
                </label>
                <input
                  type="text"
                  required
                  value={schoolOrKitchenName}
                  onChange={(e) => setSchoolOrKitchenName(e.target.value)}
                  placeholder="e.g. PAGi Kitchen #2 - SDN Subang 01"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Program Stream
                  </label>
                  <select
                    value={programType}
                    onChange={(e) => setProgramType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-teal-800 font-medium focus:outline-none"
                  >
                    <option value="PAGi / MBG School Kitchen">🏫 PAGi (MBG Kitchen)</option>
                    <option value="LaPaQ Household Tracking">🏡 LaPaQ (Posyandu Post)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Disaster Flood Active?
                  </label>
                  <select
                    value={disasterDisruptionActive ? 'yes' : 'no'}
                    onChange={(e) => setDisasterDisruptionActive(e.target.value === 'yes')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-amber-800 font-semibold focus:outline-none"
                  >
                    <option value="yes">Yes (Flood Disruption)</option>
                    <option value="no">No (Normal Operations)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Children Monitored
                  </label>
                  <input
                    type="number"
                    value={childCount}
                    onChange={(e) => setChildCount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Meals Served Today
                  </label>
                  <input
                    type="number"
                    value={mealsServedToday}
                    onChange={(e) => setMealsServedToday(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Nutrition Index (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={nutritionScore}
                    onChange={(e) => setNutritionScore(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Field Observations & Menu Adaptation
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Note dietary substitutes, clean water access, or stunting risk follow-ups..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Record Log'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
