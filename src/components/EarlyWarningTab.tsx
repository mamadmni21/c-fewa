import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  Plus, 
  Send, 
  CheckCircle, 
  Users, 
  Truck, 
  Utensils, 
  Building 
} from 'lucide-react';
import { DisasterAlert, UserRole } from '../types';
import { createDisasterAlert } from '../lib/syncService';

interface EarlyWarningTabProps {
  alerts: DisasterAlert[];
  currentUserRole: UserRole;
  isLoggedIn: boolean;
}

export const EarlyWarningTab: React.FC<EarlyWarningTabProps> = ({
  alerts,
  currentUserRole,
  isLoggedIn,
}) => {
  const [activeRoleView, setActiveRoleView] = useState<UserRole>(currentUserRole);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState<'red' | 'yellow' | 'green'>('red');
  const [location, setLocation] = useState('Karawang Agritech Zone');
  const [riskPercent, setRiskPercent] = useState(85);
  const [rainfallMm, setRainfallMm] = useState(180);
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setSubmitting(true);

    try {
      await createDisasterAlert({
        title,
        severity,
        location,
        district: 'West Java',
        floodRiskPercent: riskPercent,
        predictedRainfallMm: rainfallMm,
        expectedLeadTimeHours: 24,
        description,
        roleRecommendations: {
          farmer: 'Harvest mature crops immediately; elevate grain stores above 2.5m flood mark.',
          trader: 'Initiate stock repositioning to dry high-ground warehouses in Subang.',
          government: 'Pre-position emergency food packs & deploy flood rescue boats.',
          citizen: 'Prepare household emergency food bags and move children to elevated shelters.',
          kitchen_operator: 'Switch school MBG menu to non-perishable legumes and clean bottled water.'
        },
        status: 'active',
        createdAt: new Date().toISOString(),
        createdBy: 'C-FEWA AI Predictive Engine'
      });
      setShowModal(false);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error creating alert:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner Bento Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-rose-600 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Feature 2 • AI Flood Early Warning Engine (e-Farmania + ML Layer)</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Role-Differentiated Disaster Warning & Lead-Time Thresholds
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Converts raw meteorological data into time-bound, actionable warnings before flood peaks hit.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm shadow-rose-200 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Issue Disaster Alert</span>
        </button>
      </div>

      {/* Role Filter Tabs */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-slate-600 font-bold uppercase tracking-wider flex items-center space-x-2 pl-2">
          <span>Active Role View:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'farmer', label: '🌾 Farmers' },
            { id: 'trader', label: '🚚 Traders / Sellers' },
            { id: 'government', label: '🏛️ Government' },
            { id: 'citizen', label: '🏡 Citizens' },
            { id: 'kitchen_operator', label: '🏫 School Kitchens' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRoleView(r.id as UserRole)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeRoleView === r.id
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const isRed = alert.severity === 'red';
          const isYellow = alert.severity === 'yellow';

          return (
            <div
              key={alert.id}
              className={`bg-white border rounded-2xl p-6 shadow-sm transition-all space-y-4 ${
                isRed
                  ? 'border-rose-200 bg-rose-50/20'
                  : isYellow
                  ? 'border-amber-200 bg-amber-50/20'
                  : 'border-emerald-200 bg-emerald-50/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      isRed
                        ? 'bg-rose-100 text-rose-700 border-rose-200'
                        : isYellow
                        ? 'bg-amber-100 text-amber-800 border-amber-200'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider ${
                          isRed
                            ? 'bg-rose-100 text-rose-700 border border-rose-200'
                            : isYellow
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {alert.severity} Flood Warning
                      </span>
                      <span className="text-xs text-slate-500 flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{alert.location}</span>
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{alert.title}</h3>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 self-start sm:self-auto">
                  <div className="text-center">
                    <span className="text-[10px] text-slate-500 block font-bold uppercase tracking-wider">Flood Risk</span>
                    <span className="text-base font-mono font-bold text-rose-600">{alert.floodRiskPercent}%</span>
                  </div>
                  <div className="h-6 border-r border-slate-200"></div>
                  <div className="text-center">
                    <span className="text-[10px] text-slate-500 block font-bold uppercase tracking-wider">Lead Time</span>
                    <span className="text-xs font-bold text-slate-800 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>{alert.expectedLeadTimeHours}h Left</span>
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{alert.description}</p>

              {/* Role-Specific Action Banner */}
              <div className="bg-indigo-50/80 p-4 rounded-xl border border-indigo-100 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-900">
                  <span className="capitalize">Role Directive: {activeRoleView.replace('_', ' ')}</span>
                  <span className="text-[10px] text-indigo-500 font-medium">Auto-Tailored by C-FEWA</span>
                </div>
                <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                  "{alert.roleRecommendations[activeRoleView] || alert.roleRecommendations.farmer}"
                </p>
              </div>

            </div>
          );
        })}
      </div>

      {/* New Alert Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl shadow-xl p-6 text-slate-900 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Issue New AI Flood Disaster Warning</span>
            </h3>

            <form onSubmit={handleCreateAlert} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Alert Heading
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Flash Flood Risk in Bengawan Solo Basin"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Severity Level
                  </label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-rose-700 font-semibold focus:outline-none"
                  >
                    <option value="red">RED (Imminent Disaster)</option>
                    <option value="yellow">YELLOW (Watch Warning)</option>
                    <option value="green">GREEN (Normal Monitor)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Target Basin / Location
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Flood Risk Index (%)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={riskPercent}
                    onChange={(e) => setRiskPercent(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Predicted Rainfall (mm)
                  </label>
                  <input
                    type="number"
                    value={rainfallMm}
                    onChange={(e) => setRainfallMm(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Hydrological Situation Summary
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe river water rise, rainfall forecast, and potential food supply chain disruption..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
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
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Publishing...' : 'Broadcast Alert'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
