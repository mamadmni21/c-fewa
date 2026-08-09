import React from 'react';
import { Shield, Radio, HeartHandshake } from 'lucide-react';

interface FooterProps {
  isSynced: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isSynced }) => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs py-8 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm block">
                C-FEWA (Climate-Food Early Warning & Action)
              </span>
              <span className="text-[11px] text-slate-500">
                AI-Powered Climate Disaster & Child Nutrition Resilience System
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-[11px] bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
            <Radio className={`w-3.5 h-3.5 ${isSynced ? 'text-emerald-600 animate-pulse' : 'text-amber-500'}`} />
            <span className="text-slate-700 font-medium">
              Firebase Project: <strong className="text-slate-900 font-mono">c-fewa</strong> ({isSynced ? 'Synced Live' : 'Connecting'})
            </span>
          </div>
        </div>

        {/* Partners Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] text-slate-500 pt-2">
          <div>
            <strong className="text-slate-800 block mb-1">Lead Developer:</strong>
            PT. Sepuh Trismatek Nusa (e-Farmania)
          </div>
          <div>
            <strong className="text-slate-800 block mb-1">Community Delivery:</strong>
            Fellas Indonesia Network
          </div>
          <div>
            <strong className="text-slate-800 block mb-1">Nutrition Technology:</strong>
            Kemaih Sdn Bhd (LaPaQ & PAGi)
          </div>
          <div>
            <strong className="text-slate-800 block mb-1">Validation & Research:</strong>
            CISDI & Cakrawala University
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="pt-4 border-t border-slate-100 text-center text-[10px] uppercase tracking-wider text-slate-400 font-medium flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            © {new Date().getFullYear()} <strong className="text-slate-700">PT. Sepuh Trismatek Nusa</strong>. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-indigo-600">v2.0-bento</span>
            <span className="text-slate-400">UNICEF Venture Fund Pilot Architecture</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
