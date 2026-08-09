import React from 'react';
import { 
  CloudRain, 
  AlertTriangle, 
  Truck, 
  Users, 
  Utensils, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldAlert, 
  Building2, 
  HeartHandshake 
} from 'lucide-react';
import { DisasterAlert, InventoryItem, NutritionLog, UserRole } from '../types';

interface OverviewTabProps {
  alerts: DisasterAlert[];
  stocks: InventoryItem[];
  nutritionLogs: NutritionLog[];
  selectedRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onNavigateTab: (tab: any) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  alerts,
  stocks,
  nutritionLogs,
  selectedRole,
  onSelectRole,
  onNavigateTab,
}) => {
  const activeRedAlerts = alerts.filter((a) => a.severity === 'red' && a.status === 'active').length;
  const totalStockKg = stocks.reduce((acc, s) => acc + s.quantityKg, 0);
  const repositionedKg = stocks
    .filter((s) => s.status === 'repositioned' || s.status === 'in_transit')
    .reduce((acc, s) => acc + s.quantityKg, 0);
  const totalChildren = nutritionLogs.reduce((acc, n) => acc + n.childCount, 0);
  const avgNutritionScore = Math.round(
    nutritionLogs.reduce((acc, n) => acc + n.nutritionScore, 0) / (nutritionLogs.length || 1)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Executive Hero Bento Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 sm:p-8 text-white border border-slate-800 shadow-lg">
        <div className="absolute -right-8 -top-8 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute right-12 bottom-0 w-48 h-48 bg-emerald-500/10 blur-2xl rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PT. Sepuh Trismatek Nusa • UNICEF Venture Fund Pilot</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Anticipatory Climate-Disaster & Child Nutrition Protection Platform
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Where traditional platforms stop at <span className="text-indigo-300 font-semibold">"predict & alert"</span>, C-FEWA connects the full loop:
            transforming meteorological flood predictions directly into <strong>inventory stock repositioning</strong> and validating impact via <strong>real-time child nutrition tracking</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('early_warning')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-900/50 flex items-center space-x-2"
            >
              <span>Explore Live Disaster Alerts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('storyline')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-xs transition-all flex items-center space-x-2"
            >
              <span>View UNICEF Proposal Storyline</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Bento Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-rose-600">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active Flood Risk</span>
            <AlertTriangle className="w-5 h-5 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900">
            {activeRedAlerts} <span className="text-xs font-sans font-medium text-slate-500">Red Zones</span>
          </div>
          <p className="text-[11px] text-slate-500">
            e-Farmania ML Flood Prediction
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Stock Repositioned</span>
            <Truck className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900">
            {(repositionedKg / 1000).toFixed(1)} <span className="text-xs font-sans font-medium text-slate-500">Tons</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Pre-positioned before flood hits
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-indigo-600">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Monitored Children</span>
            <Utensils className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900">
            {totalChildren} <span className="text-xs font-sans font-medium text-slate-500">Students</span>
          </div>
          <p className="text-[11px] text-slate-500">
            PAGi / MBG School Kitchen Pilot
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Nutrition Continuity</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900">
            {avgNutritionScore}% <span className="text-xs font-sans font-medium text-slate-500">Score</span>
          </div>
          <p className="text-[11px] text-slate-500">
            LaPaQ longitudinal tracking
          </p>
        </div>
      </div>

      {/* The 5-Feature Closed Loop Architecture Bento Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-indigo-600" />
              <span>The C-FEWA 5-Feature Causal Chain</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Features 1–3 protect the food system • Features 4–5 protect child health outcomes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 relative">
          
          {/* Step 1 */}
          <div 
            onClick={() => onNavigateTab('weather')}
            className="cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all space-y-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
              <CloudRain className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900">1. Weather Forecast</div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Ingests rainfall, temperature & river levels via <strong>e-Farmania</strong> pipelines.
            </p>
          </div>

          {/* Step 2 */}
          <div 
            onClick={() => onNavigateTab('early_warning')}
            className="cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all space-y-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900">2. AI Disaster Alert</div>
            <p className="text-[11px] text-slate-600 leading-snug">
              AI model calculates flood risk percent and issues Green/Yellow/Red warnings.
            </p>
          </div>

          {/* Step 3 */}
          <div 
            onClick={() => onNavigateTab('supply_chain')}
            className="cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all space-y-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
              <Truck className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900">3. Food Supply Chain</div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Real-time stock visibility flags items needing <strong>pre-disaster repositioning</strong>.
            </p>
          </div>

          {/* Step 4 */}
          <div 
            onClick={() => onNavigateTab('community')}
            className="cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all space-y-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900">4. Community Engagement</div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Delivers role-tailored guides to caregivers & volunteers via <strong>Fellas Indonesia</strong>.
            </p>
          </div>

          {/* Step 5 */}
          <div 
            onClick={() => onNavigateTab('nutrition')}
            className="cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all space-y-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
              <Utensils className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900">5. Nutrition Monitoring</div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Tracks child meal intake via <strong>PAGi & LaPaQ</strong>, validating disaster protection.
            </p>
          </div>

        </div>
      </div>

      {/* Role-Differentiated Perspective Simulator Bento Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <span>Interactive Multi-Stakeholder Perspective</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Select a role to see how C-FEWA customizes early warning alerts, inventory guidance, and action tasks:
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'farmer', label: '🌾 Farmers', partner: 'e-Farmania' },
            { id: 'trader', label: '🚚 Traders & Suppliers', partner: 'e-Farmania' },
            { id: 'government', label: '🏛️ Government Agencies', partner: 'PT. Sepuh' },
            { id: 'citizen', label: '🏡 Citizens & Caregivers', partner: 'Fellas Indonesia' },
            { id: 'kitchen_operator', label: '🏫 School Kitchen Operators', partner: 'PAGi / MBG' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => onSelectRole(r.id as UserRole)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                selectedRole === r.id
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <span>{r.label}</span>
              <span className="text-[10px] ml-1.5 opacity-70">({r.partner})</span>
            </button>
          ))}
        </div>

        {/* Customized Role Panel */}
        <div className="bg-indigo-50/70 rounded-xl p-4 border border-indigo-100 text-xs text-indigo-950 space-y-2">
          {selectedRole === 'farmer' && (
            <div>
              <p className="font-bold text-indigo-900 mb-1">🌾 Farmer View (e-Farmania Agritech):</p>
              <p className="leading-relaxed text-indigo-900">
                Receive advance flood lead time alerts (12-36h). Direct harvest protection guidelines: early paddy cutting recommendations, seed bag elevation protocols, and distribution planning with local trader hubs.
              </p>
            </div>
          )}
          {selectedRole === 'trader' && (
            <div>
              <p className="font-bold text-indigo-900 mb-1">🚚 Trader & Supplier View (Supply Chain):</p>
              <p className="leading-relaxed text-indigo-900">
                Automated stock repositioning flags. Identifies lowland grain and vegetable stock vulnerable to spoilage and calculates optimal truck routing to high-ground buffer warehouses.
              </p>
            </div>
          )}
          {selectedRole === 'government' && (
            <div>
              <p className="font-bold text-indigo-900 mb-1">🏛️ Government View (BNPB / Bulog / Dinas Ketahanan Pangan):</p>
              <p className="leading-relaxed text-indigo-900">
                Macro-level stock visibility dashboard across all private and public warehouses. Pre-positions disaster relief kits, monitors regional food security risk, and coordinates emergency logistics.
              </p>
            </div>
          )}
          {selectedRole === 'citizen' && (
            <div>
              <p className="font-bold text-indigo-900 mb-1">🏡 Citizen & Caregiver View (Fellas Indonesia):</p>
              <p className="leading-relaxed text-indigo-900">
                Clear, non-technical household alert bulletins. Nutrition counseling during flood disruption, location of clean water depots, and emergency infant feeding guidance.
              </p>
            </div>
          )}
          {selectedRole === 'kitchen_operator' && (
            <div>
              <p className="font-bold text-indigo-900 mb-1">🏫 School Kitchen & Health Cadre View (PAGi / MBG Feeding Program):</p>
              <p className="leading-relaxed text-indigo-900">
                School-level meal logging and child nutrition intake tracking. Ensures MBG national feeding program continuity during climate shocks by switching to non-perishable fortified ingredients.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
