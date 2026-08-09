import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  getDoc,
  onSnapshot, 
  getDocs, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { 
  UserProfile,
  UserRole,
  DisasterAlert, 
  WeatherData, 
  InventoryItem, 
  CommunityAction, 
  NutritionLog 
} from '../types';

// Baseline initial data for C-FEWA operational pilot
const INITIAL_WEATHER: WeatherData[] = [
  {
    id: 'weather-01',
    stationName: 'e-Farmania St. Bengawan Solo Watershed',
    location: 'Solo Basin, Central Java',
    rainfallMm: 185,
    temperatureC: 28.5,
    humidityPercent: 88,
    riverLevelM: 4.85,
    riverThresholdM: 5.0,
    windSpeedKmh: 24,
    status: 'Watch',
    forecast24h: [
      { hour: '06:00', rainfall: 20, risk: 30 },
      { hour: '10:00', rainfall: 45, risk: 55 },
      { hour: '14:00', rainfall: 85, risk: 80 },
      { hour: '18:00', rainfall: 120, risk: 92 },
      { hour: '22:00', rainfall: 60, risk: 70 },
      { hour: '02:00', rainfall: 30, risk: 40 }
    ],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'weather-02',
    stationName: 'e-Farmania St. Citarum Delta',
    location: 'Karawang Agritech Zone, West Java',
    rainfallMm: 210,
    temperatureC: 27.2,
    humidityPercent: 92,
    riverLevelM: 6.2,
    riverThresholdM: 5.5,
    windSpeedKmh: 32,
    status: 'Critical',
    forecast24h: [
      { hour: '06:00', rainfall: 40, risk: 60 },
      { hour: '10:00', rainfall: 90, risk: 85 },
      { hour: '14:00', rainfall: 150, risk: 98 },
      { hour: '18:00', rainfall: 110, risk: 88 },
      { hour: '22:00', rainfall: 75, risk: 65 },
      { hour: '02:00', rainfall: 35, risk: 45 }
    ],
    updatedAt: new Date().toISOString()
  }
];

const INITIAL_ALERTS: DisasterAlert[] = [
  {
    id: 'alert-01',
    title: 'RED FLOOD WARNING: Citarum Delta Food Supply & Paddy Vulnerability',
    severity: 'red',
    location: 'Karawang Agri Hub & Subang District',
    district: 'West Java',
    floodRiskPercent: 94,
    predictedRainfallMm: 210,
    expectedLeadTimeHours: 18,
    description: 'AI model detects imminent flash flood in Citarum river basin within 18 hours. High risk of grain storage submergence and transport blockage.',
    roleRecommendations: {
      farmer: 'Harvest mature paddy early; elevate rice seed bags above 2m flood line.',
      trader: 'Initiate stock repositioning of 25 tons dry unhusked rice to Subang Inland Silos.',
      government: 'Pre-position 10 tons emergency grain relief & deploy regional logistic boats.',
      citizen: 'Prepare 3-day dry food kits & move livestock to high-ground community shelter.',
      kitchen_operator: 'Secure MBG central kitchen food stores; stock up on vacuum-sealed protein packs.'
    },
    status: 'active',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    createdBy: 'PT. Sepuh Trismatek Nusa AI Engine'
  },
  {
    id: 'alert-02',
    title: 'YELLOW WATCH: Bengawan Solo River Rise & Vegetable Transport Risk',
    severity: 'yellow',
    location: 'Solo Basin & Sragen Agri Center',
    district: 'Central Java',
    floodRiskPercent: 68,
    predictedRainfallMm: 140,
    expectedLeadTimeHours: 36,
    description: 'Sustained rainfall expected to increase water level. Potential road blockage on main delivery route to local schools.',
    roleRecommendations: {
      farmer: 'Cover harvested shallots & chili with waterproof tarps; inspect drainage canals.',
      trader: 'Reroute distribution trucks via Southern Highway to avoid lowland inundation.',
      government: 'Issue early warning bulletin to district trade offices and market vendors.',
      citizen: 'Ensure household water purification tablets and emergency infant cereal are accessible.',
      kitchen_operator: 'Adjust school menu to non-perishable legumes if fresh deliver is delayed.'
    },
    status: 'active',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    createdBy: 'PT. Sepuh Trismatek Nusa AI Engine'
  }
];

const INITIAL_STOCKS: InventoryItem[] = [
  {
    id: 'stock-01',
    facilityName: 'Farmer Cooperative Depot #4',
    ownerName: 'Pak Hadi (Kelompok Tani Subur)',
    role: 'farmer',
    itemType: 'Dry Unhusked Rice (Gabah Kering)',
    category: 'Grains & Rice',
    quantityKg: 18500,
    capacityKg: 25000,
    status: 'needs_repositioning',
    location: 'Karawang Lowland Farm Zone',
    district: 'Karawang',
    contactNumber: '+62 812-3456-7890',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'stock-02',
    facilityName: 'Subang Inland Trade Warehouse',
    ownerName: 'CV. Trismatek Agri Logistics',
    role: 'trader',
    itemType: 'Milled Premium Rice (Beras Medium)',
    category: 'Grains & Rice',
    quantityKg: 42000,
    capacityKg: 60000,
    status: 'safe',
    location: 'Subang High-Ground Industrial Park',
    district: 'Subang',
    contactNumber: '+62 811-9876-5432',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'stock-03',
    facilityName: 'Regional Government Logistics Depot (BNPB/Bulog)',
    ownerName: 'Dinas Ketahanan Pangan Subang',
    role: 'government',
    itemType: 'Emergency Rice & Ready-to-Eat Relief Meals',
    category: 'Relief Kits',
    quantityKg: 35000,
    capacityKg: 100000,
    status: 'repositioned',
    location: 'Subang Civic Buffer Zone',
    district: 'Subang',
    contactNumber: '+62 813-1122-3344',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'stock-04',
    facilityName: 'Solo Organic Vegetable Farmers Hub',
    ownerName: 'Ibu Ratna (Tani Organik Solo)',
    role: 'farmer',
    itemType: 'Fortified Beans & Sweet Potatoes',
    category: 'Vegetables',
    quantityKg: 6800,
    capacityKg: 10000,
    status: 'needs_repositioning',
    location: 'Sragen Flood Basin',
    district: 'Sragen',
    contactNumber: '+62 815-5544-3322',
    updatedAt: new Date().toISOString()
  }
];

const INITIAL_ACTIONS: CommunityAction[] = [
  {
    id: 'act-01',
    alertId: 'alert-01',
    title: 'Pre-disaster Grain Repositioning from Karawang to Subang Silos',
    description: 'Mobilizing 4 trucks to move 20 tons of paddy from flood-prone farm warehouse before rain peaks tonight.',
    category: 'Stock Repositioning',
    assignedRole: 'Traders & Farmers',
    location: 'Karawang -> Subang Route',
    status: 'in_progress',
    volunteersCount: 14,
    targetFamilies: 450,
    createdAt: new Date().toISOString()
  },
  {
    id: 'act-02',
    alertId: 'alert-01',
    title: 'Fellas Community Emergency Nutrition Distribution Point Setup',
    description: 'Setting up clean water & fortified milk distribution point at Subang Public School #2 shelter.',
    category: 'Emergency Food Depot',
    assignedRole: 'Caregivers & Health Volunteers',
    location: 'Subang Community Shelter A',
    status: 'pending',
    volunteersCount: 8,
    targetFamilies: 280,
    createdAt: new Date().toISOString()
  }
];

const INITIAL_NUTRITION: NutritionLog[] = [
  {
    id: 'nut-01',
    schoolOrKitchenName: 'PAGi Central Kitchen #1 (SDN Karawang 04)',
    location: 'Karawang Agri Zone',
    programType: 'PAGi / MBG School Kitchen',
    childCount: 420,
    mealsServedToday: 420,
    nutritionScore: 92,
    stuntingRiskCount: 18,
    disasterDisruptionActive: true,
    notes: 'Disaster early warning active. Substituted fresh leafy greens with fortified freeze-dried legumes to ensure protein continuity.',
    loggedBy: 'PAGi Kitchen Supervisor - Siti Nurhaliza',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'nut-02',
    schoolOrKitchenName: 'LaPaQ Household Health Post (Posyandu Melati 3)',
    location: 'Sragen Flood Buffer Zone',
    programType: 'LaPaQ Household Tracking',
    childCount: 185,
    mealsServedToday: 180,
    nutritionScore: 88,
    stuntingRiskCount: 12,
    disasterDisruptionActive: false,
    notes: 'Weekly longitudinal weight & height tracking completed. All monitored children received micro-nutrient powder sachets.',
    loggedBy: 'LaPaQ Cadre - Budi Santoso',
    updatedAt: new Date().toISOString()
  }
];

// Initialize and Seed collections if empty
export async function seedInitialDataIfNeeded() {
  try {
    const alertsSnap = await getDocs(collection(db, 'alerts'));
    if (alertsSnap.empty) {
      for (const alert of INITIAL_ALERTS) {
        await setDoc(doc(db, 'alerts', alert.id), alert);
      }
    }

    const weatherSnap = await getDocs(collection(db, 'weather_data'));
    if (weatherSnap.empty) {
      for (const w of INITIAL_WEATHER) {
        await setDoc(doc(db, 'weather_data', w.id), w);
      }
    }

    const stocksSnap = await getDocs(collection(db, 'inventory_stocks'));
    if (stocksSnap.empty) {
      for (const s of INITIAL_STOCKS) {
        await setDoc(doc(db, 'inventory_stocks', s.id), s);
      }
    }

    const actionsSnap = await getDocs(collection(db, 'community_actions'));
    if (actionsSnap.empty) {
      for (const a of INITIAL_ACTIONS) {
        await setDoc(doc(db, 'community_actions', a.id), a);
      }
    }

    const nutSnap = await getDocs(collection(db, 'nutrition_logs'));
    if (nutSnap.empty) {
      for (const n of INITIAL_NUTRITION) {
        await setDoc(doc(db, 'nutrition_logs', n.id), n);
      }
    }
  } catch (err) {
    console.warn('Firestore seeding check fallback (using memory/local fallback):', err);
  }
}

// REALTIME LISTENERS
export function subscribeAlerts(callback: (alerts: DisasterAlert[]) => void) {
  const q = query(collection(db, 'alerts'));
  return onSnapshot(q, (snapshot) => {
    const items: DisasterAlert[] = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as DisasterAlert);
    });
    // Sort by createdAt desc
    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    callback(items.length > 0 ? items : INITIAL_ALERTS);
  }, (err) => {
    console.warn('Alerts realtime listener offline, fallback to initial data:', err);
    callback(INITIAL_ALERTS);
  });
}

export function subscribeWeather(callback: (weather: WeatherData[]) => void) {
  const q = query(collection(db, 'weather_data'));
  return onSnapshot(q, (snapshot) => {
    const items: WeatherData[] = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as WeatherData);
    });
    callback(items.length > 0 ? items : INITIAL_WEATHER);
  }, (err) => {
    console.warn('Weather realtime listener fallback:', err);
    callback(INITIAL_WEATHER);
  });
}

export function subscribeInventory(callback: (stocks: InventoryItem[]) => void) {
  const q = query(collection(db, 'inventory_stocks'));
  return onSnapshot(q, (snapshot) => {
    const items: InventoryItem[] = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as InventoryItem);
    });
    callback(items.length > 0 ? items : INITIAL_STOCKS);
  }, (err) => {
    console.warn('Inventory realtime listener fallback:', err);
    callback(INITIAL_STOCKS);
  });
}

export function subscribeCommunityActions(callback: (actions: CommunityAction[]) => void) {
  const q = query(collection(db, 'community_actions'));
  return onSnapshot(q, (snapshot) => {
    const items: CommunityAction[] = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as CommunityAction);
    });
    callback(items.length > 0 ? items : INITIAL_ACTIONS);
  }, (err) => {
    console.warn('Community actions listener fallback:', err);
    callback(INITIAL_ACTIONS);
  });
}

export function subscribeNutritionLogs(callback: (logs: NutritionLog[]) => void) {
  const q = query(collection(db, 'nutrition_logs'));
  return onSnapshot(q, (snapshot) => {
    const items: NutritionLog[] = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as NutritionLog);
    });
    callback(items.length > 0 ? items : INITIAL_NUTRITION);
  }, (err) => {
    console.warn('Nutrition logs listener fallback:', err);
    callback(INITIAL_NUTRITION);
  });
}

// REALTIME WRITE MUTATIONS
export async function updateStockStatus(stockId: string, newStatus: InventoryItem['status'], newQuantityKg?: number) {
  const stockRef = doc(db, 'inventory_stocks', stockId);
  const updates: any = { status: newStatus, updatedAt: new Date().toISOString() };
  if (newQuantityKg !== undefined) {
    updates.quantityKg = newQuantityKg;
  }
  await updateDoc(stockRef, updates);
}

export async function createInventoryItem(item: Omit<InventoryItem, 'id'>) {
  const docRef = await addDoc(collection(db, 'inventory_stocks'), {
    ...item,
    updatedAt: new Date().toISOString()
  });
  return docRef.id;
}

export async function createDisasterAlert(alert: Omit<DisasterAlert, 'id'>) {
  const docRef = await addDoc(collection(db, 'alerts'), {
    ...alert,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
}

export async function createCommunityAction(action: Omit<CommunityAction, 'id'>) {
  const docRef = await addDoc(collection(db, 'community_actions'), {
    ...action,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
}

export async function updateCommunityActionStatus(actionId: string, status: CommunityAction['status']) {
  const actionRef = doc(db, 'community_actions', actionId);
  await updateDoc(actionRef, { status });
}

export async function createNutritionLog(log: Omit<NutritionLog, 'id'>) {
  const docRef = await addDoc(collection(db, 'nutrition_logs'), {
    ...log,
    updatedAt: new Date().toISOString()
  });
  return docRef.id;
}

// USER PROFILE & ROLE FIRESTORE SYNC
export async function saveUserProfile(profile: UserProfile): Promise<void> {
  if (!profile.uid) return;
  try {
    const userRef = doc(db, 'users', profile.uid);
    const dataToSave = {
      uid: profile.uid,
      email: profile.email,
      displayName: profile.displayName || profile.email.split('@')[0],
      role: profile.role,
      region: profile.region || 'West Java Pilot Zone',
      organization: profile.organization || '',
      photoURL: profile.photoURL || '',
      updatedAt: new Date().toISOString()
    };
    await setDoc(userRef, dataToSave, { merge: true });
  } catch (err) {
    console.error('Error saving user profile to Firestore:', err);
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!uid) return null;
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
  } catch (err) {
    console.error('Error fetching user profile from Firestore:', err);
  }
  return null;
}

export function subscribeUserProfile(uid: string, callback: (profile: UserProfile | null) => void) {
  if (!uid) return () => {};
  const userRef = doc(db, 'users', uid);
  return onSnapshot(
    userRef, 
    (snap) => {
      if (snap.exists()) {
        callback(snap.data() as UserProfile);
      } else {
        callback(null);
      }
    }, 
    (err) => {
      console.warn('User profile listener offline or restricted:', err);
    }
  );
}

export async function updateUserRole(uid: string, newRole: UserRole): Promise<void> {
  if (!uid) return;
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { role: newRole, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.error('Error updating user role in Firestore:', err);
  }
}
