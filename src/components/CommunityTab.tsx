import React, { useState } from 'react';
import { Users, HeartHandshake, CheckCircle, Clock, Plus, MapPin, ShieldAlert, ExternalLink, Utensils } from 'lucide-react';
import { CommunityAction } from '../types';
import { updateCommunityActionStatus, createCommunityAction } from '../lib/syncService';

interface CommunityTabProps {
  actions: CommunityAction[];
}

export const CommunityTab: React.FC<CommunityTabProps> = ({ actions }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CommunityAction['category']>('Stock Repositioning');
  const [assignedRole, setAssignedRole] = useState('Caregivers & Volunteers');
  const [location, setLocation] = useState('Subang Community Shelter A');
  const [volunteersCount, setVolunteersCount] = useState(10);
  const [targetFamilies, setTargetFamilies] = useState(250);
  const [submitting, setSubmitting] = useState(false);

  const handleStatusChange = async (actionId: string, newStatus: CommunityAction['status']) => {
    try {
      await updateCommunityActionStatus(actionId, newStatus);
    } catch (err) {
      console.error('Failed to update action status:', err);
    }
  };

  const handleCreateAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    setSubmitting(true);

    try {
      await createCommunityAction({
        title,
        description,
        category,
        assignedRole,
        location,
        status: 'pending',
        volunteersCount,
        targetFamilies,
        createdAt: new Date().toISOString()
      });
      setShowModal(false);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Failed to create community action:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner Bento Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Feature 4 • Community Engagement & Alert Delivery (Fellas Indonesia)</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Grassroots Alert Dispatch & Caregiver Response Coordination
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Converts disaster predictions into a coordinated human response across local caregivers, NGOs, and community leaders.
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
            <span>LAPAQ App Support</span>
          </a>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm shadow-emerald-200 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Post Response Action</span>
          </button>
        </div>
      </div>

      {/* LAPAQ Emergency Child Nutrition Tracking Integration */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 text-white p-5 rounded-2xl border border-teal-700/60 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-md bg-teal-500/20 border border-teal-400/30 text-teal-300 text-[10px] font-bold uppercase tracking-wider">
            <Utensils className="w-3.5 h-3.5 text-teal-300" />
            <span>Emergency Child Nutrition Support • LAPAQ System</span>
          </div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            LAPAQ App Child Nutrition Disaster Intake Tracker
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Monitor and track real-time child nutrition intake support, Posyandu emergency food distribution, and supplementary feeding (PAGi) for children and toddlers when disaster strikes.
          </p>
        </div>

        <a
          href="https://lapaq.app:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-teal-950/50 flex items-center space-x-2 shrink-0 border border-teal-300/40"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Launch LAPAQ App (lapaq.app:3000)</span>
        </a>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((act) => {
          const isDone = act.status === 'completed';
          const isInProgress = act.status === 'in_progress';

          return (
            <div
              key={act.id}
              className={`bg-white border rounded-2xl p-5 shadow-sm transition-all space-y-4 ${
                isDone
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : isInProgress
                  ? 'border-blue-200 bg-blue-50/20'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md border uppercase tracking-wider ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : isInProgress
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-amber-100 text-amber-800 border-amber-200'
                      }`}
                    >
                      {act.status.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                      {act.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{act.title}</h3>
                  <p className="text-xs text-slate-500 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{act.location}</span>
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700">
                  <HeartHandshake className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{act.description}</p>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Assigned Actor Group</span>
                  <span className="font-semibold text-slate-800">{act.assignedRole}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Mobilized Reach</span>
                  <span className="font-mono font-bold text-emerald-700">
                    {act.volunteersCount} Vol. • {act.targetFamilies} Fam.
                  </span>
                </div>
              </div>

              {/* Status Toggle Controls */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-400">
                  Posted: {new Date(act.createdAt).toLocaleDateString()}
                </span>

                <div className="flex items-center space-x-1.5">
                  {act.status !== 'in_progress' && (
                    <button
                      onClick={() => handleStatusChange(act.id, 'in_progress')}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-[11px] font-semibold"
                    >
                      In Progress
                    </button>
                  )}
                  {act.status !== 'completed' && (
                    <button
                      onClick={() => handleStatusChange(act.id, 'completed')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold shadow-xs"
                    >
                      Complete Task
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* New Action Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl shadow-xl p-6 text-slate-900 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Users className="w-5 h-5 text-emerald-600" />
              <span>Post Fellas Community Preparedness Action</span>
            </h3>

            <form onSubmit={handleCreateAction} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Action Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Clean Water & Formula Distribution Point Setup"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Action Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-emerald-800 font-medium focus:outline-none"
                  >
                    <option value="Stock Repositioning">Stock Repositioning</option>
                    <option value="Evacuation Preparation">Evacuation Preparation</option>
                    <option value="Emergency Food Depot">Emergency Food Depot</option>
                    <option value="Caregiver Counseling">Caregiver Counseling</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Assigned Group
                  </label>
                  <input
                    type="text"
                    value={assignedRole}
                    onChange={(e) => setAssignedRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Description & Task Scope
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail the community response task, target location, and caregiver instructions..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Volunteers Mobilized
                  </label>
                  <input
                    type="number"
                    value={volunteersCount}
                    onChange={(e) => setVolunteersCount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Target Households / Families
                  </label>
                  <input
                    type="number"
                    value={targetFamilies}
                    onChange={(e) => setTargetFamilies(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>
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
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Publishing...' : 'Dispatch Action'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
