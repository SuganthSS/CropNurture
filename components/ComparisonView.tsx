
import React from 'react';
import { HistoryItem } from '../types';

interface ComparisonViewProps {
  items: HistoryItem[];
  onBack: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ items, onBack }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No items selected for comparison.</p>
        <button onClick={onBack} className="mt-4 text-brand-green-600 hover:underline">Go Back</button>
      </div>
    );
  }

  // Helper to render a row
  const renderRow = (label: string, renderCell: (item: HistoryItem) => React.ReactNode, icon?: string) => (
    <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      <td className="p-4 bg-gray-50 font-semibold text-gray-700 sticky left-0 z-10 border-r border-gray-200 min-w-[140px] md:min-w-[180px]">
        <div className="flex items-center gap-2">
            {icon && <span className="text-lg">{icon}</span>}
            <span>{label}</span>
        </div>
      </td>
      {items.map((item) => (
        <td key={item.id} className="p-4 min-w-[200px] md:min-w-[250px] text-sm text-gray-600 align-top">
          {renderCell(item)}
        </td>
      ))}
    </tr>
  );

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
        <h3 className="font-bold text-gray-800 text-lg">Crop Comparison ({items.length})</h3>
        <button 
          onClick={onBack}
          className="text-sm font-medium text-gray-500 hover:text-brand-green-700 flex items-center gap-1 transition-colors"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
           </svg>
           Back
        </button>
      </div>
      
      <div className="flex-grow overflow-auto pb-4">
          <table className="w-full border-collapse text-left">
              <thead>
                  <tr>
                      <th className="p-4 bg-gray-50 border-b border-gray-200 sticky left-0 z-20 min-w-[140px] md:min-w-[180px]"></th>
                      {items.map(item => (
                          <th key={item.id} className="p-4 border-b border-gray-200 min-w-[200px] bg-white font-bold text-brand-green-800">
                              {item.recommendation.cropName}
                              <div className="text-xs font-normal text-gray-400 mt-1">{item.timestamp}</div>
                          </th>
                      ))}
                  </tr>
              </thead>
              <tbody>
                  {renderRow("Soil pH", item => item.soilData.ph, "🧪")}
                  {renderRow("Avg Temp", item => `${item.soilData.temperature}°C`, "🌡️")}
                  {renderRow("Rainfall", item => `${item.soilData.rainfall} mm`, "💧")}
                  
                  {renderRow("Optimal pH", item => item.recommendation.optimalConditions.ph)}
                  {renderRow("Season", item => item.recommendation.plantingSeason, "📅")}
                  
                  {renderRow("Exp. Yield", (item) => {
                       const yieldData = item.recommendation.historicalYield;
                       if (!yieldData) return <span className="text-gray-400">-</span>;
                       if (typeof yieldData === 'string') return yieldData;
                       return (
                           <div>
                               <span className="font-bold text-brand-green-700 text-lg">{yieldData.value}</span>
                               <span className="text-xs text-gray-500 ml-1 font-medium">{yieldData.unit}</span>
                           </div>
                       );
                  }, "📊")}

                  {renderRow("Common Pests", (item) => (
                      <div className="flex flex-wrap gap-1">
                          {item.recommendation.pestAndDiseaseManagement.commonPestsAndDiseases.map((pest, i) => {
                               const name = typeof pest === 'string' ? pest : pest.name;
                               return (
                                  <span key={i} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded border border-red-100">
                                      {name}
                                  </span>
                               );
                          })}
                      </div>
                  ), "🐛")}
              </tbody>
          </table>
      </div>
    </div>
  );
};

export default ComparisonView;
