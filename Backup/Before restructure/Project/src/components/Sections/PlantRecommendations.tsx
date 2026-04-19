
import React from 'react';
import { Filter, Droplets, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Crop } from '../../types';

const MOCK_CROPS: Crop[] = [
  {
    id: '1',
    name: 'Wheat',
    image: '🌾',
    suitabilityScore: 92,
    yieldRange: '3.5 - 4.0 ton/ha',
    growthDuration: '110-130 days',
    waterRequirement: 'Medium',
    tags: ['Best Match', 'Stable Price']
  },
  {
    id: '2',
    name: 'Maize',
    image: '🌽',
    suitabilityScore: 85,
    yieldRange: '5.0 - 6.5 ton/ha',
    growthDuration: '90-110 days',
    waterRequirement: 'Medium',
    tags: ['High Yield']
  },
  {
    id: '3',
    name: 'Cotton',
    image: '☁️',
    suitabilityScore: 78,
    yieldRange: '2.0 - 2.5 ton/ha',
    growthDuration: '150-180 days',
    waterRequirement: 'High',
    tags: ['Cash Crop']
  }
];

export const PlantRecommendations: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex items-center text-gray-500 mr-2">
          <Filter className="w-5 h-5 mr-2" />
          <span className="font-medium">Filters:</span>
        </div>
        <select className="px-3 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-green-500">
          <option>Season: Kharif</option>
          <option>Season: Rabi</option>
        </select>
        <select className="px-3 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-green-500">
          <option>Irrigation: Rainfed</option>
          <option>Irrigation: Drip</option>
        </select>
        <div className="flex-1" />
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-lg hover:bg-green-100 transition-colors">
            High Yield
          </button>
          <button className="px-4 py-2 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
            Low Cost
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CROPS.map((crop) => (
          <div key={crop.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl">
                  {crop.image}
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-bold text-green-700">{crop.suitabilityScore}%</span>
                  <span className="text-xs text-gray-400">Suitability</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">{crop.name}</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {crop.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                  <span>Yield: {crop.yieldRange}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Duration: {crop.growthDuration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Droplets className="w-4 h-4 mr-2 text-blue-400" />
                  <span>Water: {crop.waterRequirement}</span>
                </div>
              </div>

              <button className="w-full py-2.5 bg-green-600 text-white rounded-xl font-medium opacity-90 group-hover:opacity-100 hover:bg-green-700 transition-all flex items-center justify-center">
                View Detailed Plan
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-b-2xl overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-green-600" 
                style={{ width: `${crop.suitabilityScore}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
