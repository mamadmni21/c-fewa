export type UserRole = 'farmer' | 'trader' | 'government' | 'citizen' | 'kitchen_operator' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  region: string;
  organization?: string;
  photoURL?: string;
}

export type AlertSeverity = 'green' | 'yellow' | 'red';

export interface DisasterAlert {
  id: string;
  title: string;
  severity: AlertSeverity;
  location: string;
  district: string;
  floodRiskPercent: number;
  predictedRainfallMm: number;
  expectedLeadTimeHours: number;
  description: string;
  roleRecommendations: {
    farmer: string;
    trader: string;
    government: string;
    citizen: string;
    kitchen_operator: string;
  };
  status: 'active' | 'repositioned' | 'resolved';
  createdAt: string;
  createdBy: string;
}

export interface WeatherData {
  id: string;
  stationName: string;
  location: string;
  rainfallMm: number;
  temperatureC: number;
  humidityPercent: number;
  riverLevelM: number;
  riverThresholdM: number;
  windSpeedKmh: number;
  status: 'Normal' | 'Watch' | 'Critical';
  forecast24h: { hour: string; rainfall: number; risk: number }[];
  updatedAt: string;
}

export type InventoryStatus = 'safe' | 'needs_repositioning' | 'in_transit' | 'repositioned' | 'critical';

export interface InventoryItem {
  id: string;
  facilityName: string;
  ownerName: string;
  ownerId?: string;
  role: 'farmer' | 'trader' | 'government';
  itemType: string;
  category: 'Grains & Rice' | 'Vegetables' | 'Proteins' | 'Pre-packaged Meals' | 'Relief Kits';
  quantityKg: number;
  capacityKg: number;
  status: InventoryStatus;
  location: string;
  district: string;
  contactNumber: string;
  updatedAt: string;
}

export interface CommunityAction {
  id: string;
  alertId?: string;
  title: string;
  description: string;
  category: 'Stock Repositioning' | 'Evacuation Preparation' | 'Emergency Food Depot' | 'Caregiver Counseling';
  assignedRole: string;
  location: string;
  status: 'pending' | 'in_progress' | 'completed';
  volunteersCount: number;
  targetFamilies: number;
  createdAt: string;
}

export interface NutritionLog {
  id: string;
  schoolOrKitchenName: string;
  location: string;
  programType: 'PAGi / MBG School Kitchen' | 'LaPaQ Household Tracking';
  childCount: number;
  mealsServedToday: number;
  nutritionScore: number; // 0-100 scale
  stuntingRiskCount: number;
  disasterDisruptionActive: boolean;
  notes: string;
  loggedBy: string;
  updatedAt: string;
}

export interface CFEWAMetric {
  activeAlertsCount: number;
  highRiskDistricts: string[];
  totalStockMonitoredKg: number;
  repositionedStockKg: number;
  communityActionsActive: number;
  childrenMonitoredCount: number;
  nutritionProtectionRate: number;
}
