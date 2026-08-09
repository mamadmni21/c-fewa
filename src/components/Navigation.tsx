import React, { useState } from 'react';
import { 
  ShieldCheck,
  LayoutDashboard, 
  CloudRain, 
  AlertTriangle, 
  Truck, 
  Users, 
  Utensils, 
  Sparkles, 
  FileText,
  ChevronDown,
  Check
} from 'lucide-react';

export type TabType = 
  | 'landing'
  | 'overview' 
  | 'weather' 
  | 'early_warning' 
  | 'supply_chain' 
  | 'community' 
  | 'nutrition' 
  | 'ai_advisor' 
  | 'storyline';

interface NavigationProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  activeAlertsCount: number;
  repositionCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  activeAlertsCount,
  repositionCount,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    {
      id: 'landing' as TabType,
      label: 'Solutions Landing',
      mediumLabel: 'Solutions Landing',
      mobileLabel: 'Solutions',
      subtitle: 'Marketing & App Features',
      icon: ShieldCheck,
      badge: 'Start',
      badgeColor: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    },
    {
      id: 'overview' as TabType,
      label: 'Executive Dashboard',
      mediumLabel: 'Executive Dashboard',
      mobileLabel: 'Executive',
      subtitle: '5-Feature Causal Chain',
      icon: LayoutDashboard,
    },
    {
      id: 'weather' as TabType,
      label: '1. Weather Forecast',
      mediumLabel: '1. Weather',
      mobileLabel: '1. Weather',
      subtitle: 'e-Farmania Ingestion',
      icon: CloudRain,
    },
    {
      id: 'early_warning' as TabType,
      label: '2. Early Warning Alert',
      mediumLabel: '2. Early Warning',
      mobileLabel: '2. Alert',
      subtitle: 'AI Flood Risk Engine',
      icon: AlertTriangle,
      badge: activeAlertsCount > 0 ? `${activeAlertsCount} Red` : undefined,
      badgeColor: 'bg-rose-100 text-rose-700 border border-rose-200',
    },
    {
      id: 'supply_chain' as TabType,
      label: '3. Food Supply Chain',
      mediumLabel: '3. Supply Chain',
      mobileLabel: '3. Supply',
      subtitle: 'Inventory Visibility',
      icon: Truck,
      badge: repositionCount > 0 ? `${repositionCount} Act` : undefined,
      badgeColor: 'bg-amber-100 text-amber-800 border border-amber-200',
    },
    {
      id: 'community' as TabType,
      label: '4. Community Engagement',
      mediumLabel: '4. Community Engagement',
      mobileLabel: '4. Community',
      subtitle: 'Fellas Response Net',
      icon: Users,
    },
    {
      id: 'nutrition' as TabType,
      label: '5. Child Nutrition Intake',
      mediumLabel: '5. Child Nutrition',
      mobileLabel: '5. Nutrition',
      subtitle: 'PAGi & LaPaQ Tracking',
      icon: Utensils,
    },
    {
      id: 'ai_advisor' as TabType,
      label: 'Gemini AI Predictor',
      mediumLabel: 'Gemini AI',
      mobileLabel: 'AI Predictor',
      subtitle: 'Strategic Advisory',
      icon: Sparkles,
      badge: 'AI',
      badgeColor: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
    },
    {
      id: 'storyline' as TabType,
      label: 'UNICEF Storyline',
      mediumLabel: 'UNICEF Storyline',
      mobileLabel: 'Storyline',
      subtitle: 'PT. Sepuh & Partners',
      icon: FileText,
    },
  ];

  const activeTabObj = tabs.find((t) => t.id === activeTab) || tabs[0];
  const ActiveIcon = activeTabObj.icon;

  return (
    <nav className="bg-white/95 border-b border-slate-200 backdrop-blur-md sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        
        {/* Mobile App Drop-down Menu Model (visible on mobile/tablet up to lg screens) */}
        <div className="lg:hidden relative py-2 px-2">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl px-3 py-2.5 flex items-center justify-between text-left shadow-2xs transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <ActiveIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-slate-900 truncate">{activeTabObj.label}</span>
                  {activeTabObj.badge && (
                    <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded-md uppercase shrink-0 ${activeTabObj.badgeColor}`}>
                      {activeTabObj.badge}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 truncate">{activeTabObj.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 pl-2 text-indigo-600 shrink-0">
              <span className="text-[11px] font-bold text-indigo-700">Select Tab</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {/* Interactive Mobile Dropdown Panel */}
          {isMobileMenuOpen && (
            <div className="absolute left-2 right-2 top-full mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100 max-h-[75vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2.5 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex justify-between items-center">
                <span>Select C-FEWA Navigation Tab</span>
                <span className="text-indigo-600 font-semibold">{tabs.length} Views</span>
              </div>
              <div className="p-1 space-y-0.5">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        onSelectTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                        isActive 
                          ? 'bg-indigo-600 text-white font-bold shadow-xs' 
                          : 'hover:bg-slate-100 text-slate-700 font-medium'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0 pr-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-1.5">
                            <span className="text-xs truncate">{tab.label}</span>
                            {tab.badge && (
                              <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded-md uppercase shrink-0 ${
                                isActive ? 'bg-white/20 text-white' : tab.badgeColor
                              }`}>
                                {tab.badge}
                              </span>
                            )}
                          </div>
                          <p className={`text-[10px] truncate ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                            {tab.subtitle}
                          </p>
                        </div>
                      </div>
                      {isActive && <Check className="w-4 h-4 shrink-0 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Horizontal Tab Pills (visible on large screens lg+) */}
        <div className="hidden lg:flex space-x-1 sm:space-x-1.5 py-2.5 items-center justify-start overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                title={`${tab.label} - ${tab.subtitle}`}
                className={`flex items-center transition-all duration-200 shrink-0 min-h-[40px] rounded-xl ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200 px-3.5 py-2 space-x-2'
                    : 'p-2.5 text-slate-600 hover:text-indigo-700 hover:bg-slate-100/90 border border-transparent space-x-1.5'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-600'}`} />
                
                {/* Always display full text for active tab, collapsible icon mode for inactive */}
                {isActive ? (
                  <>
                    <div className="flex flex-col text-left">
                      <span className="leading-tight text-xs font-bold whitespace-nowrap">{tab.label}</span>
                      <span className="text-[10px] font-normal text-indigo-100 hidden xl:block">
                        {tab.subtitle}
                      </span>
                    </div>

                    {tab.badge && (
                      <span
                        className="ml-1 px-1.5 py-0.5 text-[9px] font-bold rounded-md uppercase tracking-wider shrink-0 bg-white/20 text-white"
                      >
                        {tab.badge}
                      </span>
                    )}
                  </>
                ) : (
                  /* Inactive Tab - Compact Icon Mode with optional badge */
                  tab.badge && (
                    <span
                      className={`px-1.5 py-0.5 text-[9px] font-bold rounded-md uppercase tracking-wider shrink-0 ${
                        tab.badgeColor || 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

