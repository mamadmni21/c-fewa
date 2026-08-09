import React from 'react';
import { FileText, Building2, Calendar, Target, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const StorylineTab: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Executive Storyline Banner Bento Box */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5 text-emerald-700" />
          <span>UNICEF Venture Fund Application • Master Narrative Version 2</span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          C-FEWA: Climate-Food Early Warning & Action
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
          An AI-powered anticipatory climate-disaster platform that protects children's nutrition by keeping the food supply chain resilient during climate disasters — not just by detecting malnutrition after it happens.
        </p>

        <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 border-t border-slate-100">
          <span>Lead Applicant: <strong className="text-emerald-700 font-bold">PT. Sepuh Trismatek Nusa</strong></span>
          <span>Requested Funding: <strong className="text-slate-900 font-bold">USD 99,650</strong></span>
          <span>Repository ID: <strong className="text-slate-700 font-mono">c-fewa</strong></span>
        </div>
      </div>

      {/* Partner Profiles */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-indigo-600" />
          <span>Consortium Partners & Role Matrix</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-slate-50 p-4 rounded-xl border border-emerald-200 space-y-2">
            <div className="text-xs font-extrabold text-emerald-800">PT. Sepuh Trismatek Nusa</div>
            <div className="text-[11px] font-semibold text-slate-600">(e-Farmania Lead)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Climate/weather ingestion, AI flood disaster prediction, food supply chain & inventory intelligence.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="text-xs font-extrabold text-blue-800">Fellas Indonesia</div>
            <div className="text-[11px] font-semibold text-slate-600">(Community Lead)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Alert delivery to citizens/caregivers, response coordination & telemedicine network (East Ventures-backed).
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="text-xs font-extrabold text-amber-800">Kemaih Sdn Bhd</div>
            <div className="text-[11px] font-semibold text-slate-600">(LaPaQ & PAGi Lead)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Household nutrition intake monitoring, child longitudinal growth analytics (UNICEF-MRANTI Accelerator Winner).
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="text-xs font-extrabold text-teal-800">CISDI & Cakrawala Univ</div>
            <div className="text-[11px] font-semibold text-slate-600">(Validation & Capacity)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Independent evidence synthesis, policy evaluation, teacher/community leader training.
            </p>
          </div>

        </div>
      </div>

      {/* 12-Month Milestones Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 overflow-x-auto">
        <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <span>12-Month Implementation Milestones (Quarterly Roadmap)</span>
        </h3>

        <table className="w-full text-left text-xs text-slate-700 border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
              <th className="p-3">Core Activity</th>
              <th className="p-3">Q4 2026 (M1)</th>
              <th className="p-3">Q1 2027 (M2)</th>
              <th className="p-3">Q2 2027 (M3)</th>
              <th className="p-3">Q3 2027 (M4)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-3 font-bold text-slate-900">Weather Ingestion & Flood Model v1</td>
              <td className="p-3 text-emerald-700 font-bold">✅ Completed</td>
              <td className="p-3 text-emerald-700 font-bold">✅ Completed</td>
              <td className="p-3 text-slate-400">-</td>
              <td className="p-3 text-slate-400">-</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-slate-900">Food Supply Visibility & Stock Repositioning</td>
              <td className="p-3 text-emerald-700 font-bold">✅ Completed</td>
              <td className="p-3 text-emerald-700 font-bold">✅ Active</td>
              <td className="p-3 text-slate-400">-</td>
              <td className="p-3 text-slate-400">-</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-slate-900">Role-Differentiated Alert Design (5 Roles)</td>
              <td className="p-3 text-emerald-700 font-bold">✅ Completed</td>
              <td className="p-3 text-emerald-700 font-bold">✅ Active</td>
              <td className="p-3 text-slate-400">-</td>
              <td className="p-3 text-slate-400">-</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-slate-900">Pilot Site Deployment (3-5 Flood Zones)</td>
              <td className="p-3 text-emerald-700 font-bold">✅ Active</td>
              <td className="p-3 text-slate-400">-</td>
              <td className="p-3 text-slate-400">-</td>
              <td className="p-3 text-slate-400">-</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-slate-900">Nutrition Intake Monitoring (PAGi / LaPaQ)</td>
              <td className="p-3 text-slate-400">-</td>
              <td className="p-3 text-emerald-700 font-bold">✅ Active</td>
              <td className="p-3 text-emerald-700 font-bold">✅ Active</td>
              <td className="p-3 text-emerald-700 font-bold">✅ Planned</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-slate-900">Evidence Synthesis & UNICEF Framework Publication</td>
              <td className="p-3 text-slate-400">-</td>
              <td className="p-3 text-slate-400">-</td>
              <td className="p-3 text-slate-400">-</td>
              <td className="p-3 text-emerald-700 font-bold">✅ Planned</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SDG Alignment */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <Target className="w-5 h-5 text-indigo-600" />
          <span>United Nations Sustainable Development Goals (SDG Alignment)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Primary: SDG 13</span>
            <span className="text-xs font-bold text-slate-900 block">Climate Action</span>
            <p className="text-[11px] text-slate-600">Anticipatory supply chain action before disaster peaks hit.</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">SDG 2</span>
            <span className="text-xs font-bold text-slate-900 block">Zero Hunger</span>
            <p className="text-[11px] text-slate-600">Keeps food physically available and affordable during climate shocks.</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">SDG 3</span>
            <span className="text-xs font-bold text-slate-900 block">Good Health & Well-being</span>
            <p className="text-[11px] text-slate-600">Child nutrition intake monitoring closes the loop to child health outcomes.</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">SDG 17</span>
            <span className="text-xs font-bold text-slate-900 block">Partnerships for the Goals</span>
            <p className="text-[11px] text-slate-600">Connects farmers, traders, government, citizens, and national feeding programs.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
