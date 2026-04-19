
import React from 'react';
import { KpiCard } from '../Shared/KpiCard';
import { SoilRadarChart } from '../Widgets/SoilRadarChart';
import { CloudRain, Sun, Wind, AlertTriangle } from 'lucide-react';

export const Overview: React.FC = () => {
  // Dummy Data
  const soilData = { ph: 6.5, nitrogen: 60, phosphorus: 40, potassium: 75, organicMatter: 3.5, moisture: 45 };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Soil Health Score" value="82" trend="up" trendValue="4%" subtext="Optimal condition" color="green" />
        <KpiCard title="Crop Readiness" value="High" trend="neutral" subtext="Suitable for Cereals" color="blue" />
        <KpiCard title="Disease Risk" value="Low" trend="down" trendValue="12%" subtext="Dry conditions help" color="orange" />
        <KpiCard title="Next Action" value="Irrigate" subtext="Moisture dropping" color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Soil Summary */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Soil Profile Summary</h3>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium">View Details</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <SoilRadarChart data={soilData} />
            </div>
            <div className="space-y-4 justify-center flex flex-col">
              <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-green-800 font-medium">Nitrogen (N)</span>
                  <span className="text-sm font-bold text-green-900">60 mg/kg</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-blue-800 font-medium">Moisture</span>
                  <span className="text-sm font-bold text-blue-900">45%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-orange-800 font-medium">Phosphorus (P)</span>
                  <span className="text-sm font-bold text-orange-900">40 mg/kg</span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weather & Alerts */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h4 className="text-blue-100 font-medium">Today, 24 Oct</h4>
                <h2 className="text-4xl font-bold mt-1">28°C</h2>
                <p className="text-blue-100 mt-1">Partly Cloudy</p>
              </div>
              <Sun className="w-12 h-12 text-yellow-300" />
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-blue-400 pt-4">
              <div className="text-center">
                <p className="text-xs text-blue-200 mb-1">Humidity</p>
                <p className="font-semibold">62%</p>
              </div>
              <div className="text-center border-l border-blue-400">
                <p className="text-xs text-blue-200 mb-1">Wind</p>
                <p className="font-semibold">12 km/h</p>
              </div>
              <div className="text-center border-l border-blue-400">
                <p className="text-xs text-blue-200 mb-1">Rain</p>
                <p className="font-semibold">10%</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-start p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 shrink-0" />
                <div>
                  <h5 className="text-sm font-medium text-yellow-900">Pest Warning</h5>
                  <p className="text-xs text-yellow-700 mt-1">Aphid activity detected in region.</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-100">
                <CloudRain className="w-5 h-5 text-blue-600 mt-0.5 mr-3 shrink-0" />
                <div>
                  <h5 className="text-sm font-medium text-blue-900">Rain Expected</h5>
                  <p className="text-xs text-blue-700 mt-1">Heavy rain forecast for Sunday.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
