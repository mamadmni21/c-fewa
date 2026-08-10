import React from 'react';
import { Shield, Radio, User as UserIcon, LogOut, Sparkles, Building2, ExternalLink } from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface HeaderProps {
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
  onRoleChange: (role: UserRole) => void;
  isSynced: boolean;
  onNavigateLanding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenAuth,
  onSignOut,
  onRoleChange,
  isSynced,
  onNavigateLanding,
}) => {
  return (
    <header className="bg-white text-slate-900 border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        
        {/* Brand & Title */}
        <div 
          onClick={onNavigateLanding}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                C-FEWA
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md">
                UNICEF Pilot
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden md:block">
              Climate-Food Early Warning & Action • <span className="text-slate-700 font-semibold">PT. Sepuh Trismatek Nusa</span> <span className="text-indigo-600 font-normal">(Fellas Indonesia's Partner)</span>
            </p>
          </div>
        </div>

        {/* Real-time Sync & Role Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-3">
          {/* Live Sync Status */}
          <div className="flex items-center space-x-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs">
            <Radio className={`w-3.5 h-3.5 ${isSynced ? 'text-emerald-600 animate-pulse' : 'text-amber-500'}`} />
            <span className="text-slate-700 font-medium text-[11px] sm:text-xs">
              {isSynced ? <span className="hidden xs:inline">Live Sync</span> : <span className="hidden xs:inline">Syncing</span>}
            </span>
          </div>

          {/* LAPAQ Direct Connect Button */}
          <a
            href="https://lapaq.app:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 text-xs font-bold transition-all shadow-2xs"
            title="Open LAPAQ App Platform (lapaq.app:3000)"
          >
            <ExternalLink className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span className="text-[11px] sm:text-xs">LAPAQ</span>
          </a>

          {/* Role Selector */}
          <div className="hidden sm:flex items-center space-x-1.5 bg-slate-50 rounded-lg p-1 border border-slate-200">
            <span className="text-[11px] text-slate-500 pl-1 font-medium hidden md:inline">Role:</span>
            <select
              value={currentUser?.role || 'government'}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="bg-white text-[11px] sm:text-xs text-indigo-700 font-semibold py-1 px-1.5 sm:px-2 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs max-w-[120px] sm:max-w-none truncate"
            >
              <option value="farmer">🌾 Farmer</option>
              <option value="trader">🚚 Supplier</option>
              <option value="government">🏛️ Government</option>
              <option value="citizen">🏡 Citizen</option>
              <option value="kitchen_operator">🏫 School/PAGi</option>
            </select>
          </div>

          {/* User Auth Buttons */}
          {currentUser ? (
            <div className="flex items-center space-x-1.5">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-semibold text-slate-800 leading-tight">
                  {currentUser.displayName || currentUser.email.split('@')[0]}
                </span>
                <span className="text-[10px] text-indigo-600 font-mono font-medium capitalize">
                  {currentUser.role.replace('_', ' ')}
                </span>
              </div>

              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="Profile"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-indigo-200 object-cover"
                />
              ) : (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-semibold text-xs">
                  {(currentUser.displayName || currentUser.email)[0].toUpperCase()}
                </div>
              )}

              <button
                onClick={onSignOut}
                title="Sign Out"
                className="p-1 sm:p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-sm shadow-indigo-200 transition-all focus:ring-2 focus:ring-indigo-400"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span className="text-[11px] sm:text-xs">Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
