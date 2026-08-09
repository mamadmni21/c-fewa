import React from 'react';
import { 
  Shield, 
  Sparkles, 
  CloudRain, 
  AlertTriangle, 
  Truck, 
  Users, 
  Utensils, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Target, 
  Zap, 
  Globe, 
  Bot, 
  Layers, 
  ShieldCheck, 
  Lock, 
  HeartHandshake, 
  BarChart3,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { TabType } from './Navigation';
import { UserRole } from '../types';

interface LandingTabProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  onSelectRole: (role: UserRole) => void;
  currentRole: UserRole;
}

export const LandingTab: React.FC<LandingTabProps> = ({
  onNavigateTab,
  onOpenAuth,
  isLoggedIn,
  onSelectRole,
  currentRole,
}) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-xl">
        <div className="absolute -right-12 -top-12 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute right-1/4 -bottom-12 w-80 h-80 bg-emerald-500/15 blur-3xl rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>UNICEF Venture Fund Applicant • PT. Sepuh Trismatek Nusa</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Anticipatory Climate-Disaster Platform Protecting Child Nutrition & Food Supply Chains
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            <strong>C-FEWA</strong> (Climate-Food Early Warning & Action) bridges the gap between disaster prediction and human relief.
            While traditional early warning systems stop at weather alerts, C-FEWA automatically triggers 
            <span className="text-emerald-300 font-semibold"> anticipatory food supply repositioning</span> and validates impact through 
            <span className="text-indigo-300 font-semibold"> real-time child nutrition intake tracking</span>.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => onNavigateTab('overview')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-900/50 transition-all flex items-center space-x-2.5 cursor-pointer"
            >
              <span>Launch Interactive Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {!isLoggedIn ? (
              <button
                onClick={onOpenAuth}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Sign In / Register Account</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigateTab('ai_advisor')}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>Run Gemini AI Predictor</span>
              </button>
            )}

            <button
              onClick={() => onNavigateTab('storyline')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer"
            >
              <span>View UNICEF Proposal Storyline</span>
            </button>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
            <div>
              <div className="text-2xl font-mono font-extrabold text-indigo-300">72 Hours</div>
              <div className="text-[11px] text-slate-400 font-medium">Advance Lead Time Warning</div>
            </div>
            <div>
              <div className="text-2xl font-mono font-extrabold text-emerald-300">5 Pillars</div>
              <div className="text-[11px] text-slate-400 font-medium">Closed-Loop Solution Chain</div>
            </div>
            <div>
              <div className="text-2xl font-mono font-extrabold text-amber-300">$99,650</div>
              <div className="text-[11px] text-slate-400 font-medium">UNICEF Innovation Scope</div>
            </div>
            <div>
              <div className="text-2xl font-mono font-extrabold text-teal-300">100%</div>
              <div className="text-[11px] text-slate-400 font-medium">Child Meal Intake Continuity</div>
            </div>
          </div>

        </div>
      </div>

      {/* The Core Problem vs. The C-FEWA Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* The Problem */}
        <div className="bg-white border border-rose-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>The Crisis Challenge</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Climate Disaster Collapses Food Systems & Causes Child Malnutrition
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            When severe La Niña monsoon rains hit agricultural basins like West Java, roads submerge and market supply lines sever. Local rice mills flood, food prices skyrocket, and children in school feeding programs face immediate nutritional deficits.
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start space-x-2">
              <span className="text-rose-500 font-bold">✕</span>
              <span><strong>Reactive Relief Delay:</strong> Humanitarian aid usually arrives 5–10 days post-flood, after child malnutrition damage is already done.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-rose-500 font-bold">✕</span>
              <span><strong>Supply Route Blindspots:</strong> Traders and logistics operators lack advance warning to move grain to safe high-ground warehouses.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-rose-500 font-bold">✕</span>
              <span><strong>Unmonitored Child Impact:</strong> Standard emergency responses do not track actual daily caloric and protein intake for vulnerable children.</span>
            </li>
          </ul>
        </div>

        {/* The Solution */}
        <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>The C-FEWA Solution</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Predictive AI & Anticipatory Supply Repositioning
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            C-FEWA transforms meteorological hazard forecasts directly into anticipatory logistics actions, coordinating farmers, food suppliers, community caregivers, and school kitchens before floodwaters peak.
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>72-Hour Lead Time Alerts:</strong> Ingests e-Farmania weather feeds to detect flood risks 1-3 days early.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Proactive Stock Repositioning:</strong> Automatically identifies rice & formula stocks requiring pre-disaster relocation.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Child Nutrition Protection:</strong> Closes the loop via PAGi school kitchens & LaPaQ Posyandu daily meal tracking.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Detailed Feature Solutions Showcase (The 5 Solution Modules) */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider inline-block">
            Comprehensive Platform Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            5 Core Solution Features Working in Harmony
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Each feature solves a critical link in the disaster-to-nutrition supply chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <CloudRain className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">Feature 1</div>
              <h3 className="text-lg font-bold text-slate-900">
                Weather Forecast & Climate Ingestion
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connects directly to e-Farmania weather sensors, satellite soil moisture meters, and river level gauges across pilot agricultural basins in Indramayu and Subang.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-700 space-y-1">
                <div>• Ingests 24/7 rainfall intensity (mm/h)</div>
                <div>• Monitors river bank threshold levels</div>
                <div>• Predicts basin soil saturation bounds</div>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('weather')}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Explore Weather Module</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-rose-700 uppercase tracking-wider">Feature 2</div>
              <h3 className="text-lg font-bold text-slate-900">
                AI Flood Risk Early Warning System
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Server-side machine learning algorithms compute 72-hour hazard probability scores (Green, Amber, Red) and broadcast action triggers tailored to recipient roles.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-700 space-y-1">
                <div>• 72h advance notice before peak inundation</div>
                <div>• Role-tailored action triggers (Farmers vs. Traders)</div>
                <div>• Automated SMS / App notification dispatch</div>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('early_warning')}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>View Live Early Warnings</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">Feature 3</div>
              <h3 className="text-lg font-bold text-slate-900">
                Food Supply Chain & Stock Repositioning
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provides real-time inventory visibility across rice mills, buffer warehouses, and distribution hubs, flagging vulnerable stocks for pre-disaster movement.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-700 space-y-1">
                <div>• Map rice mills & buffer inventory stock</div>
                <div>• Auto-flag items needing high-ground transfer</div>
                <div>• Prevent market food price spikes</div>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('supply_chain')}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Manage Food Supply Chain</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Feature 4 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Feature 4</div>
              <h3 className="text-lg font-bold text-slate-900">
                Community Engagement (Fellas Indonesia)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Converts digital predictions into coordinated human action across local caregiver networks, community health cadres, and volunteer field dispatch teams.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-700 space-y-1">
                <div>• Mobilize local volunteers & health cadres</div>
                <div>• Emergency clean water & formula distribution</div>
                <div>• Shelter feeding point setup</div>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('community')}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Explore Community Actions</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Feature 5 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Utensils className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Feature 5</div>
              <h3 className="text-lg font-bold text-slate-900">
                Child Nutrition Intake (PAGi / LaPaQ)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Monitors child daily caloric/protein intake in national MBG school kitchens (PAGi) and household Posyandu posts (LaPaQ), closing the impact validation loop.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-700 space-y-1">
                <div>• MBG school kitchen meal continuity</div>
                <div>• Stunting risk detection during disasters</div>
                <div>• Real-time child health score tracking</div>
              </div>
            </div>
            <div className="pt-2 space-y-2">
              <button
                onClick={() => onNavigateTab('nutrition')}
                className="w-full py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer"
              >
                <span>View Nutrition Monitoring</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="https://lapaq.app:3000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Connect LAPAQ App (https://lapaq.app:3000)</span>
              </a>
            </div>
          </div>

          {/* Gemini AI Predictor Feature */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5 text-teal-700" />
              </div>
              <div className="text-xs font-bold text-teal-800 uppercase tracking-wider">Strategic AI</div>
              <h3 className="text-lg font-bold text-slate-900">
                Gemini 2.5 Flash Strategic Engine
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Runs server-side generative AI simulations to synthesize live weather signals, crop stock levels, and nutrition metrics into actionable operational playbooks.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-700 space-y-1">
                <div>• Custom role-based AI scenario queries</div>
                <div>• Automated mitigation playbooks in seconds</div>
                <div>• Secure server-side Gemini API integration</div>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('ai_advisor')}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Try Gemini AI Simulator</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Stakeholder Role Matrix Showcase */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
            Role-Tailored Operational Guidance
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            How C-FEWA Solves Problems for Every Stakeholder
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Click a role to preview how C-FEWA customizes dashboard alerts and action playbooks:
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'farmer', label: '🌾 Farmers', partner: 'e-Farmania Agritech' },
            { id: 'trader', label: '🚚 Food Traders', partner: 'Supply Chain Logistics' },
            { id: 'government', label: '🏛️ Disaster Authorities', partner: 'BNPB / Bulog' },
            { id: 'citizen', label: '🏡 Citizens & Caregivers', partner: 'Fellas Indonesia' },
            { id: 'kitchen_operator', label: '🏫 School Kitchens', partner: 'PAGi / MBG Feeding' },
          ].map((role) => (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id as UserRole)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentRole === role.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{role.label}</span>
              <span className="text-[10px] ml-1.5 opacity-80 font-normal">({role.partner})</span>
            </button>
          ))}
        </div>

        {/* Selected Role Card Box */}
        <div className="bg-indigo-50/80 rounded-2xl p-6 border border-indigo-100 space-y-3">
          {currentRole === 'farmer' && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-indigo-900 font-bold text-sm">
                <span>🌾 Solutions for Farmers & Ag Cooperatives</span>
              </div>
              <p className="text-xs text-indigo-950 leading-relaxed">
                Farmers receive 12-36 hour early notifications before floodwaters inundate paddy fields. C-FEWA advises whether to execute emergency early cutting, elevate seed grain bags to high ground, and schedule transport with local trader hubs before roads close.
              </p>
            </div>
          )}

          {currentRole === 'trader' && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-indigo-900 font-bold text-sm">
                <span>🚚 Solutions for Food Traders & Suppliers</span>
              </div>
              <p className="text-xs text-indigo-950 leading-relaxed">
                Logistics managers gain visibility into vulnerable lowland rice mills and vegetable warehouses. The platform automatically suggests moving inventory to high-ground buffer centers, preserving capital and keeping regional food markets supplied during disasters.
              </p>
            </div>
          )}

          {currentRole === 'government' && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-indigo-900 font-bold text-sm">
                <span>🏛️ Solutions for Government & Disaster Relief (BNPB / Bulog)</span>
              </div>
              <p className="text-xs text-indigo-950 leading-relaxed">
                Disaster management officers monitor macro-level food stock levels and flood risk maps across all regional districts simultaneously. Enables pre-positioning of disaster emergency meal packs and prevents localized food inflation during climate shocks.
              </p>
            </div>
          )}

          {currentRole === 'citizen' && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-indigo-900 font-bold text-sm">
                <span>🏡 Solutions for Citizens & Rural Caregivers</span>
              </div>
              <p className="text-xs text-indigo-950 leading-relaxed">
                Parents and caregivers receive actionable SMS/WhatsApp bulletins via Fellas Indonesia. Bulletins include clean water depot locations, emergency infant formula distribution points, and shelter feeding protocols.
              </p>
            </div>
          )}

          {currentRole === 'kitchen_operator' && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-indigo-900 font-bold text-sm">
                <span>🏫 Solutions for School Kitchens & Posyandu (PAGi / MBG Program)</span>
              </div>
              <p className="text-xs text-indigo-950 leading-relaxed">
                School kitchen operators log daily meals served under the national MBG program. When flood disruption occurs, the platform recommends switching to fortified non-perishable stock, guaranteeing zero feeding interruptions for students.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Consortium Partners & Global Impact */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Consortium Synergy</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              PT. Sepuh Trismatek Nusa & Partner Consortium
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Combining world-class AgTech, community health networks, and child nutrition expertise.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('storyline')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md self-start sm:self-auto flex items-center space-x-2 cursor-pointer"
          >
            <span>Read Master Storyline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">PT. Sepuh Trismatek Nusa</div>
            <div className="text-[11px] font-bold text-slate-300">Lead Tech Applicant</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Builds e-Farmania weather ingestion, AI disaster prediction models, and inventory stock repositioning algorithms.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-xs font-extrabold text-blue-400 uppercase tracking-wider">Fellas Indonesia</div>
            <div className="text-[11px] font-bold text-slate-300">Community Outreach</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Handles grassroots alert delivery, telemedicine support, and local caregiver response coordination.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">Kemaih Sdn Bhd</div>
            <div className="text-[11px] font-bold text-slate-300">Child Nutrition Lead</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deploys PAGi school kitchen tracking and LaPaQ Posyandu child growth analytics (UNICEF-MRANTI Accelerator winner).
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-xs font-extrabold text-teal-400 uppercase tracking-wider">CISDI & Cakrawala Univ</div>
            <div className="text-[11px] font-bold text-slate-300">Research & Policy</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provides independent evidence synthesis, policy evaluation, and community health worker capacity training.
            </p>
          </div>
        </div>
      </div>

      {/* Final Call to Action Section */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-indigo-800 shadow-xl text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider inline-block">
            Ready to Explore?
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Experience the Live C-FEWA Platform
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Test disaster early warnings, stock repositioning algorithms, community action posts, and Gemini AI simulations in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigateTab('overview')}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-900/50 transition-all flex items-center space-x-2 cursor-pointer"
          >
            <span>Open Executive Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {!isLoggedIn && (
            <button
              onClick={onOpenAuth}
              className="px-6 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center space-x-2 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-slate-700" />
              <span>Create Account / Sign In</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
