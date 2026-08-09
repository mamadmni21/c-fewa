import React, { useState } from 'react';
import { CloudRain, Thermometer, Droplets, Waves, Wind, RefreshCw, Radio, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { WeatherData } from '../types';

interface WeatherTabProps {
  weatherList: WeatherData[];
  onRefresh: () => void;
}

export const WeatherTab: React.FC<WeatherTabProps> = ({ weatherList, onRefresh }) => {
  const [selectedStationId, setSelectedStationId] = useState<string>(weatherList[0]?.id || 'weather-01');

  const selectedStation = weatherList.find((w) => w.id === selectedStationId) || weatherList[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner Bento Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <CloudRain className="w-4 h-4 text-indigo-600" />
            <span>Feature 1 • Meteorological Ingestion (e-Farmania Pipeline)</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Real-Time Climate & Hydrological Forecast
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Provides the earliest upstream signal in the C-FEWA anticipatory disaster pipeline.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium border border-slate-200 transition-all self-start sm:self-auto shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5 text-indigo-600" />
          <span>Sync Meteorological Data</span>
        </button>
      </div>

      {/* Station Selector Tabs */}
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
        {weatherList.map((station) => (
          <button
            key={station.id}
            onClick={() => setSelectedStationId(station.id)}
            className={`px-4 py-3 rounded-xl border text-left shrink-0 transition-all ${
              selectedStationId === station.id
                ? 'bg-indigo-600 border-indigo-700 text-white shadow-sm shadow-indigo-200'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${station.status === 'Critical' ? 'bg-rose-400 animate-ping' : 'bg-emerald-400'}`}></span>
              <span className="text-xs font-bold">{station.stationName}</span>
            </div>
            <p className={`text-[10px] mt-1 ${selectedStationId === station.id ? 'text-indigo-100' : 'text-slate-400'}`}>
              {station.location}
            </p>
          </button>
        ))}
      </div>

      {selectedStation && (
        <>
          {/* Main Telemetry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            
            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-blue-600">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">24h Rainfall</span>
                <CloudRain className="w-4 h-4" />
              </div>
              <div className="text-2xl font-mono font-bold text-slate-900">
                {selectedStation.rainfallMm} <span className="text-xs font-sans font-medium text-slate-500">mm</span>
              </div>
              <p className="text-[10px] text-slate-500">Heavy Precip Alert</p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-amber-600">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">River Level</span>
                <Waves className="w-4 h-4" />
              </div>
              <div className="text-2xl font-mono font-bold text-slate-900">
                {selectedStation.riverLevelM} <span className="text-xs font-sans font-medium text-slate-500">m</span>
              </div>
              <p className="text-[10px] text-slate-500">
                Threshold: <span className="text-rose-600 font-bold">{selectedStation.riverThresholdM}m</span>
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-emerald-600">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Temperature</span>
                <Thermometer className="w-4 h-4" />
              </div>
              <div className="text-2xl font-mono font-bold text-slate-900">
                {selectedStation.temperatureC}°<span className="text-xs font-sans font-medium text-slate-500">C</span>
              </div>
              <p className="text-[10px] text-slate-500">Surface Temp</p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-indigo-600">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Humidity</span>
                <Droplets className="w-4 h-4" />
              </div>
              <div className="text-2xl font-mono font-bold text-slate-900">
                {selectedStation.humidityPercent}%
              </div>
              <p className="text-[10px] text-slate-500">Relative Humidity</p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-sm col-span-2 md:col-span-1">
              <div className="flex items-center justify-between text-indigo-600">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Wind Speed</span>
                <Wind className="w-4 h-4" />
              </div>
              <div className="text-2xl font-mono font-bold text-slate-900">
                {selectedStation.windSpeedKmh} <span className="text-xs font-sans font-medium text-slate-500">km/h</span>
              </div>
              <p className="text-[10px] text-slate-500">E/NE Monsoon Vector</p>
            </div>

          </div>

          {/* Hourly Rainfall Chart */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  24-Hour Predictive Rainfall & Flood Risk Trend
                </h3>
                <p className="text-xs text-slate-500">
                  Calculated by e-Farmania meteorological model for {selectedStation.stationName}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                Hourly Ingestion
              </span>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedStation.forecast24h}>
                  <defs>
                    <linearGradient id="colorRainfall" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e11d48" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#e11d48" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="rainfall"
                    name="Rainfall (mm)"
                    stroke="#4f46e5"
                    fillOpacity={1}
                    fill="url(#colorRainfall)"
                  />
                  <Area
                    type="monotone"
                    dataKey="risk"
                    name="Disaster Risk Index (%)"
                    stroke="#e11d48"
                    fillOpacity={1}
                    fill="url(#colorRisk)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

    </div>
  );
};
