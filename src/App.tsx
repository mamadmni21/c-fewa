import React, { useState, useEffect } from 'react';
import { 
  auth, 
  onAuthStateChanged, 
  firebaseSignOut, 
  User 
} from './lib/firebase';
import { 
  subscribeAlerts, 
  subscribeWeather, 
  subscribeInventory, 
  subscribeCommunityActions, 
  subscribeNutritionLogs, 
  seedInitialDataIfNeeded,
  saveUserProfile,
  subscribeUserProfile,
  updateUserRole
} from './lib/syncService';
import { 
  UserProfile, 
  UserRole, 
  DisasterAlert, 
  WeatherData, 
  InventoryItem, 
  CommunityAction, 
  NutritionLog 
} from './types';

import { Header } from './components/Header';
import { Navigation, TabType } from './components/Navigation';
import { AuthModal } from './components/AuthModal';

import { LandingTab } from './components/LandingTab';
import { OverviewTab } from './components/OverviewTab';
import { WeatherTab } from './components/WeatherTab';
import { EarlyWarningTab } from './components/EarlyWarningTab';
import { SupplyChainTab } from './components/SupplyChainTab';
import { CommunityTab } from './components/CommunityTab';
import { NutritionTab } from './components/NutritionTab';
import { AIPredictorTab } from './components/AIPredictorTab';
import { StorylineTab } from './components/StorylineTab';
import { Footer } from './components/Footer';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('landing');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSynced, setIsSynced] = useState(true);

  // Enforce document title
  useEffect(() => {
    document.title = "C-FEWA by SEPUH";
  }, []);

  // Firestore Realtime Collections State
  const [alerts, setAlerts] = useState<DisasterAlert[]>([]);
  const [weatherList, setWeatherList] = useState<WeatherData[]>([]);
  const [stocks, setStocks] = useState<InventoryItem[]>([]);
  const [actions, setActions] = useState<CommunityAction[]>([]);
  const [nutritionLogs, setNutritionLogs] = useState<NutritionLog[]>([]);

  // Initialize and set document title
  useEffect(() => {
    document.title = "C-FEWA App by Sepuh";
  }, []);

  // Initialize and subscribe to Firestore Realtime Updates
  useEffect(() => {
    seedInitialDataIfNeeded();

    const unsubAlerts = subscribeAlerts((data) => {
      setAlerts(data);
      setIsSynced(true);
    });

    const unsubWeather = subscribeWeather((data) => {
      setWeatherList(data);
    });

    const unsubInventory = subscribeInventory((data) => {
      setStocks(data);
    });

    const unsubActions = subscribeCommunityActions((data) => {
      setActions(data);
    });

    const unsubNutrition = subscribeNutritionLogs((data) => {
      setNutritionLogs(data);
    });

    return () => {
      unsubAlerts();
      unsubWeather();
      unsubInventory();
      unsubActions();
      unsubNutrition();
    };
  }, []);

  // Firebase Auth State Listener & Firestore Role Sync
  useEffect(() => {
    let unsubUserDoc: (() => void) | null = null;

    const unsubAuth = onAuthStateChanged(auth, async (user: User | null) => {
      if (unsubUserDoc) {
        unsubUserDoc();
        unsubUserDoc = null;
      }

      if (user) {
        // Subscribe to user profile document in Firestore
        unsubUserDoc = subscribeUserProfile(user.uid, async (storedProfile) => {
          if (storedProfile) {
            setCurrentUser(storedProfile);
          } else {
            // First-time authenticated user -> create profile in Firestore
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email || 'user@cfewa.org',
              displayName: user.displayName || user.email?.split('@')[0] || 'Authenticated User',
              role: 'government',
              region: 'West Java Pilot Zone',
              photoURL: user.photoURL || undefined
            };
            setCurrentUser(newProfile);
            await saveUserProfile(newProfile);
          }
        });
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubAuth();
      if (unsubUserDoc) unsubUserDoc();
    };
  }, []);

  const handleAuthSuccess = async (email: string, displayName: string, role: UserRole) => {
    const uid = auth.currentUser?.uid || 'user-' + Date.now();
    const profile: UserProfile = {
      uid,
      email,
      displayName,
      role,
      region: 'West Java Pilot Zone',
      photoURL: auth.currentUser?.photoURL || undefined
    };
    setCurrentUser(profile);
    await saveUserProfile(profile);
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      setCurrentUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const handleRoleChange = async (newRole: UserRole) => {
    if (currentUser) {
      const updated = { ...currentUser, role: newRole };
      setCurrentUser(updated);
      if (currentUser.uid && !currentUser.uid.startsWith('guest-')) {
        await updateUserRole(currentUser.uid, newRole);
      } else if (auth.currentUser?.uid) {
        await updateUserRole(auth.currentUser.uid, newRole);
      }
    } else {
      setCurrentUser({
        uid: 'guest-' + Date.now(),
        email: 'guest@cfewa.org',
        displayName: 'Guest User',
        role: newRole,
        region: 'West Java Pilot Zone'
      });
    }
  };

  const activeRedAlertsCount = alerts.filter((a) => a.severity === 'red' && a.status === 'active').length;
  const repositionCount = stocks.filter((s) => s.status === 'needs_repositioning').length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-900">
      
      {/* Header Bar */}
      <Header
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSignOut={handleSignOut}
        onRoleChange={handleRoleChange}
        isSynced={isSynced}
        onNavigateLanding={() => setActiveTab('landing')}
      />

      {/* Navigation Tab Bar */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        activeAlertsCount={activeRedAlertsCount}
        repositionCount={repositionCount}
      />

      {/* Main Content Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6">
        {activeTab === 'landing' && (
          <LandingTab
            onNavigateTab={setActiveTab}
            onOpenAuth={() => setIsAuthOpen(true)}
            isLoggedIn={!!currentUser}
            onSelectRole={handleRoleChange}
            currentRole={currentUser?.role || 'government'}
          />
        )}

        {activeTab === 'overview' && (
          <OverviewTab
            alerts={alerts}
            stocks={stocks}
            nutritionLogs={nutritionLogs}
            selectedRole={currentUser?.role || 'government'}
            onSelectRole={handleRoleChange}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'weather' && (
          <WeatherTab
            weatherList={weatherList}
            onRefresh={() => seedInitialDataIfNeeded()}
          />
        )}

        {activeTab === 'early_warning' && (
          <EarlyWarningTab
            alerts={alerts}
            currentUserRole={currentUser?.role || 'government'}
            isLoggedIn={!!currentUser}
          />
        )}

        {activeTab === 'supply_chain' && (
          <SupplyChainTab
            stocks={stocks}
          />
        )}

        {activeTab === 'community' && (
          <CommunityTab
            actions={actions}
          />
        )}

        {activeTab === 'nutrition' && (
          <NutritionTab
            logs={nutritionLogs}
          />
        )}

        {activeTab === 'ai_advisor' && (
          <AIPredictorTab
            currentRole={currentUser?.role || 'government'}
          />
        )}

        {activeTab === 'storyline' && (
          <StorylineTab />
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Footer */}
      <Footer isSynced={isSynced} />

    </div>
  );
}
