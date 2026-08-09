import React, { useState } from 'react';
import { 
  Truck, 
  Warehouse, 
  AlertOctagon, 
  CheckCircle2, 
  ArrowRightLeft, 
  Plus, 
  Filter, 
  Phone, 
  MapPin, 
  ShieldCheck 
} from 'lucide-react';
import { InventoryItem, InventoryStatus } from '../types';
import { updateStockStatus, createInventoryItem } from '../lib/syncService';

interface SupplyChainTabProps {
  stocks: InventoryItem[];
}

export const SupplyChainTab: React.FC<SupplyChainTabProps> = ({ stocks }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [repositioningItem, setRepositioningItem] = useState<InventoryItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New stock form state
  const [facilityName, setFacilityName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [role, setRole] = useState<'farmer' | 'trader' | 'government'>('trader');
  const [itemType, setItemType] = useState('Milled Premium Rice');
  const [category, setCategory] = useState<InventoryItem['category']>('Grains & Rice');
  const [quantityKg, setQuantityKg] = useState(10000);
  const [capacityKg, setCapacityKg] = useState(25000);
  const [location, setLocation] = useState('Subang Buffer Warehouse');
  const [district, setDistrict] = useState('Subang');
  const [contactNumber, setContactNumber] = useState('+62 812-3344-5566');
  const [submitting, setSubmitting] = useState(false);

  const filteredStocks = stocks.filter((s) => {
    if (selectedCategory !== 'all' && s.category !== selectedCategory) return false;
    if (selectedStatus !== 'all' && s.status !== selectedStatus) return false;
    return true;
  });

  const handleExecuteReposition = async (newStatus: InventoryStatus) => {
    if (!repositioningItem) return;
    try {
      await updateStockStatus(repositioningItem.id, newStatus);
      setRepositioningItem(null);
    } catch (err) {
      console.error('Failed to update stock status:', err);
    }
  };

  const handleAddStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!facilityName || !ownerName) return;
    setSubmitting(true);

    try {
      await createInventoryItem({
        facilityName,
        ownerName,
        role,
        itemType,
        category,
        quantityKg,
        capacityKg,
        status: 'needs_repositioning',
        location,
        district,
        contactNumber,
        updatedAt: new Date().toISOString()
      });
      setShowAddModal(false);
      setFacilityName('');
      setOwnerName('');
    } catch (err) {
      console.error('Failed to add inventory stock:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner Bento Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
            <Truck className="w-4 h-4 text-amber-600" />
            <span>Feature 3 • Real-Time Food Supply Chain Visibility (e-Farmania)</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Pre-Disaster Inventory Tracking & Stock Repositioning Engine
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Flags food stocks in flood-prone basins and orchestrates early logistics movements to high-ground siloes before roads submerge.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm shadow-amber-200 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Register Stock Facility</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs text-slate-600 font-bold uppercase tracking-wider pl-1">
          <Filter className="w-4 h-4 text-slate-400" />
          <span>Filter Stock Inventory:</span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 text-slate-700 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Grains & Rice">🌾 Grains & Rice</option>
            <option value="Vegetables">🥦 Vegetables</option>
            <option value="Proteins">🥚 Proteins</option>
            <option value="Relief Kits">📦 Relief Kits</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 text-slate-700 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none"
          >
            <option value="all">All Repositioning Status</option>
            <option value="needs_repositioning">⚠️ Needs Repositioning</option>
            <option value="in_transit">🚚 In Transit</option>
            <option value="repositioned">✅ Repositioned (Safe)</option>
            <option value="safe">🛡️ Safe High Ground</option>
          </select>
        </div>
      </div>

      {/* Stock Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStocks.map((stock) => {
          const isUrgent = stock.status === 'needs_repositioning';
          const isInTransit = stock.status === 'in_transit';
          const isRepositioned = stock.status === 'repositioned';

          return (
            <div
              key={stock.id}
              className={`bg-white border rounded-2xl p-5 shadow-sm transition-all space-y-4 ${
                isUrgent
                  ? 'border-amber-200 bg-amber-50/20'
                  : isInTransit
                  ? 'border-blue-200 bg-blue-50/20'
                  : isRepositioned
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md border uppercase tracking-wider ${
                        isUrgent
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : isInTransit
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : isRepositioned
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {stock.status.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 capitalize">
                      • {stock.role} Depot
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{stock.facilityName}</h3>
                  <p className="text-xs text-slate-500 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{stock.location}</span>
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-700">
                  <Warehouse className="w-5 h-5" />
                </div>
              </div>

              {/* Item Details */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Item Type</span>
                  <span className="font-semibold text-slate-800">{stock.itemType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Current Weight</span>
                  <span className="font-mono font-bold text-amber-700">
                    {stock.quantityKg.toLocaleString()} kg
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Managing Operator</span>
                  <span className="text-slate-700">{stock.ownerName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Emergency Contact</span>
                  <span className="text-slate-600 font-mono text-[11px]">{stock.contactNumber}</span>
                </div>
              </div>

              {/* Actions Bar */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">
                  Last Sync: {new Date(stock.updatedAt).toLocaleTimeString()}
                </span>

                <button
                  onClick={() => setRepositioningItem(stock)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-all ${
                    isUrgent
                      ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>Update Logistics Action</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Reposition Action Modal */}
      {repositioningItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl shadow-xl p-6 text-slate-900 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Truck className="w-5 h-5 text-amber-600" />
              <span>Execute Pre-Disaster Stock Repositioning</span>
            </h3>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
              <p className="font-bold text-slate-900">{repositioningItem.facilityName}</p>
              <p className="text-slate-500">{repositioningItem.itemType} ({repositioningItem.quantityKg} kg)</p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Select the logistics status to sync across all C-FEWA connected devices:
            </p>

            <div className="space-y-2">
              <button
                onClick={() => handleExecuteReposition('in_transit')}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold flex items-center justify-between"
              >
                <span>🚚 Mark as IN TRANSIT (Trucks En Route)</span>
                <ArrowRightLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleExecuteReposition('repositioned')}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between"
              >
                <span>✅ Mark as REPOSITIONED (Secured High Ground)</span>
                <ShieldCheck className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleExecuteReposition('safe')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-between"
              >
                <span>🛡️ Mark as SAFE BUFFER</span>
              </button>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setRepositioningItem(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Stock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl shadow-xl p-6 text-slate-900 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Warehouse className="w-5 h-5 text-amber-600" />
              <span>Register New Inventory Facility</span>
            </h3>

            <form onSubmit={handleAddStock} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Facility Name
                </label>
                <input
                  type="text"
                  required
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                  placeholder="e.g. Karawang Farmer Coop Depot"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Owner / Manager
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. Pak Hadi"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Sector
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-amber-800 font-semibold focus:outline-none"
                  >
                    <option value="farmer">🌾 Farmer Depot</option>
                    <option value="trader">🚚 Trader / Supplier</option>
                    <option value="government">🏛️ Government Silo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Commodity Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="Grains & Rice">🌾 Grains & Rice</option>
                    <option value="Vegetables">🥦 Vegetables</option>
                    <option value="Proteins">🥚 Proteins</option>
                    <option value="Relief Kits">📦 Relief Kits</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Item Description
                  </label>
                  <input
                    type="text"
                    required
                    value={itemType}
                    onChange={(e) => setItemType(e.target.value)}
                    placeholder="e.g. Dry Unhusked Rice"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Quantity (kg)
                  </label>
                  <input
                    type="number"
                    value={quantityKg}
                    onChange={(e) => setQuantityKg(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Location / District
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Adding...' : 'Register Facility'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
