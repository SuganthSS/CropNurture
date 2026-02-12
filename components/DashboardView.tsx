
import React from 'react';
import { CropRecommendation, SoilData, DailyForecast } from '../types';

interface DashboardViewProps {
  recommendation: CropRecommendation;
  soilData: SoilData;
  forecast?: DailyForecast[];
  onBack: () => void;
}

// Refined Dark Theme Card
const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string; icon?: React.ReactNode }> = ({ children, className = "", title, icon }) => (
  <div className={`bg-terra-950 border border-terra-800/50 rounded-3xl p-5 flex flex-col shadow-lg ${className}`}>
    {(title || icon) && (
      <div className="flex items-center mb-4 gap-2 border-b border-terra-900 pb-2">
        {icon && <span className="text-terra-400">{icon}</span>}
        {title && <h4 className="text-terra-100 font-bold text-sm tracking-wide font-display">{title}</h4>}
      </div>
    )}
    {children}
  </div>
);

const ProgressBar: React.FC<{ label: string; value: number; max: number; unit: string; status: string }> = ({ label, value, max, unit, status }) => {
    const percentage = Math.min((value / max) * 100, 100);
    const statusColor = status === 'High' ? 'text-yellow-400' : status === 'Low' ? 'text-red-400' : 'text-terra-400';
    
    return (
        <div className="mb-3 last:mb-0">
            <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-terra-300/70">{label}:</span>
                <div className="flex gap-2">
                     <span className="text-terra-50 font-mono">{value} {unit}</span>
                     <span className={`${statusColor}`}>({status})</span>
                </div>
            </div>
            <div className="w-full bg-terra-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-terra-500 h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    )
}

const DashboardView: React.FC<DashboardViewProps> = ({ recommendation, soilData, onBack }) => {
  const yieldValue = typeof recommendation.historicalYield === 'object' ? recommendation.historicalYield.value : parseFloat(recommendation.historicalYield || '0');
  const yieldUnit = typeof recommendation.historicalYield === 'object' ? recommendation.historicalYield.unit : 't/ha';
  
  const pestAlert = recommendation.pestAndDiseaseManagement.commonPestsAndDiseases.length > 0 
    ? (typeof recommendation.pestAndDiseaseManagement.commonPestsAndDiseases[0] === 'object' 
        ? recommendation.pestAndDiseaseManagement.commonPestsAndDiseases[0].name 
        : recommendation.pestAndDiseaseManagement.commonPestsAndDiseases[0])
    : "None";

  const getStatus = (val: number, min: number, max: number) => {
      if (val < min) return 'Low';
      if (val > max) return 'High';
      return 'Optimal';
  }

  const marketTrends = recommendation.marketTrends || [
      { month: 'Jan', demandLevel: 30 },
      { month: 'Feb', demandLevel: 45 },
      { month: 'Mar', demandLevel: 60 },
      { month: 'Apr', demandLevel: 85 },
      { month: 'May', demandLevel: 75 },
      { month: 'Jun', demandLevel: 55 }
  ];

  return (
    <div className="bg-[#051a15] p-4 sm:p-6 lg:p-8 rounded-4xl shadow-2xl text-white font-sans animate-fade-in h-full overflow-y-auto relative">
      
      <div className="flex justify-between items-center mb-8">
        <div>
            <h2 className="text-2xl font-display font-bold text-white tracking-tight">Farm Intelligence</h2>
            <p className="text-terra-400 text-xs uppercase tracking-widest mt-1">Real-time Analysis</p>
        </div>
        <div className="flex gap-3">
             <button onClick={onBack} className="bg-terra-600 hover:bg-terra-500 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-glow">
                New Scan
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Current Weather */}
        <Card title="Conditions" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>}>
            <div className="mt-2 h-full flex flex-col justify-between">
                <div>
                    <div className="text-4xl font-display font-bold text-white">{soilData.temperature}°C</div>
                    <div className="text-terra-300 text-sm mt-1 font-medium">
                        {soilData.rainfall > 0 ? "Precipitation Likely" : "Clear Sky"}
                    </div>
                </div>
                <div className="mt-3 pt-3 border-t border-terra-800/50">
                    <span className="text-[10px] text-terra-400 uppercase tracking-wider block font-bold mb-0.5">Optimal Range</span>
                    <span className="text-sm text-terra-100 font-medium">{recommendation.optimalConditions.temperature}</span>
                </div>
            </div>
        </Card>

        {/* Pest Alerts */}
        <Card title="Risk Assessment" icon={<svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}>
             <div className="mt-1">
                <div className="flex items-baseline gap-2">
                    <div className="text-xl font-bold text-yellow-400">Moderate Risk</div>
                </div>
                <div className="text-gray-400 text-xs mt-2 leading-relaxed">
                    Watch for <span className="text-white font-bold">{pestAlert}</span> activity.
                </div>
            </div>
        </Card>

        {/* Soil Health Overview */}
        <Card title="Soil Chemistry" icon={<svg className="w-5 h-5 text-terra-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}>
            <div className="mt-2 space-y-3">
                <ProgressBar label="Nitrogen" value={soilData.nitrogen} max={200} unit="ppm" status={getStatus(soilData.nitrogen, 40, 100)} />
                <ProgressBar label="Phosphorus" value={soilData.phosphorus} max={100} unit="ppm" status={getStatus(soilData.phosphorus, 20, 60)} />
            </div>
        </Card>

         {/* Resource Insights */}
         <Card title="Water Table" icon={<svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}>
             <div className="mt-2 space-y-3">
                <div>
                    <span className="text-terra-400 text-xs block uppercase tracking-wider">Annual Rain</span>
                    <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-2xl">{soilData.rainfall}</span>
                        <span className="text-gray-500 text-xs">mm</span>
                    </div>
                </div>
            </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Market Trends Chart */}
          <Card title={`Demand Trend: ${recommendation.cropName}`} icon={<svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>}>
             <div className="mt-auto h-32 flex items-end justify-between gap-3 px-2">
                {marketTrends.map((trend, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 w-full group">
                        <div 
                            className="w-full bg-terra-700 rounded-md opacity-60 group-hover:opacity-100 group-hover:bg-terra-500 transition-all duration-300" 
                            style={{ height: `${trend.demandLevel}%` }}
                        ></div>
                        <span className="text-[9px] text-gray-500 font-bold uppercase">{trend.month}</span>
                    </div>
                ))}
             </div>
          </Card>

          {/* Yield Prediction */}
           <Card title="Yield Projection" icon={<svg className="w-5 h-5 text-terra-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}>
                <div className="flex flex-col items-center justify-center h-full py-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-6xl font-bold text-white tracking-tighter">{yieldValue}</span>
                        <span className="text-xl text-terra-400 font-bold">{yieldUnit}</span>
                    </div>
                    <div className="text-terra-200/80 text-sm mt-2 text-center max-w-[200px]">
                        Estimated output for <strong>{recommendation.cropName}</strong> in current conditions.
                    </div>
                </div>
           </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
           {/* Planting Advisor */}
           <Card title="Primary Recommendation" className="md:col-span-2" icon={<svg className="w-5 h-5 text-terra-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}>
               <div className="flex flex-col justify-center h-full">
                   <div className="text-3xl font-display font-bold text-terra-400 mb-3">{recommendation.cropName}</div>
                   <p className="text-sm text-gray-300 leading-relaxed">
                       {recommendation.description}
                   </p>
               </div>
           </Card>

           {/* District Benchmark */}
           <Card title="Efficiency Score" icon={<svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>}>
                <div className="flex flex-col justify-center h-full items-center">
                    <div className="text-4xl font-bold text-white mb-1">92<span className="text-lg text-terra-500">/100</span></div>
                    <p className="text-gray-400 text-xs text-center px-4">
                        Your soil profile is highly optimized for this crop choice.
                    </p>
                </div>
           </Card>
      </div>
      
      {/* Crop Rotation & Sustainability */}
      {recommendation.cropRotation && recommendation.cropRotation.length > 0 && (
          <Card title="Sustainability Strategy: Crop Rotation" className="w-full mb-4" icon={<svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>}>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommendation.cropRotation.map((rot, i) => (
                      <div key={i} className="bg-terra-900/50 border border-terra-800 rounded-xl p-4 flex items-start gap-4 hover:bg-terra-900 transition-colors">
                          <div className="bg-terra-800/50 p-3 rounded-full text-green-400">
                              <span className="text-xl font-bold">{i + 1}</span>
                          </div>
                          <div>
                              <h5 className="text-lg font-bold text-white">{rot.crop}</h5>
                              <span className="text-xs font-bold text-terra-400 uppercase tracking-wider block mb-1">{rot.timing}</span>
                              <p className="text-sm text-gray-400">{rot.benefit}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </Card>
      )}

      {/* Growth Cycle Visualization */}
      {recommendation.growthStages && recommendation.growthStages.length > 0 && (
          <Card title="Growth Cycle Timeline" className="w-full" icon={<svg className="w-5 h-5 text-terra-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
              <div className="mt-4 relative pb-2 overflow-x-auto">
                   <div className="min-w-[600px] flex justify-between items-start relative px-6">
                       {/* Timeline Line */}
                       <div className="absolute top-2.5 left-8 right-8 h-0.5 bg-terra-800 -z-0"></div>
                       
                       {recommendation.growthStages.map((stage, i) => (
                           <div key={i} className="flex flex-col items-center relative z-10 group">
                               <div className="w-6 h-6 bg-terra-950 border-2 border-terra-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                   <div className="w-2 h-2 bg-terra-400 rounded-full"></div>
                               </div>
                               <div className="mt-3 text-center">
                                   <span className="text-xs font-bold text-terra-100 block">{stage.name}</span>
                                   <span className="text-[10px] text-terra-400 bg-terra-900/50 px-2 py-0.5 rounded-full mt-1 inline-block">{stage.duration}</span>
                               </div>
                           </div>
                       ))}
                   </div>
              </div>
          </Card>
      )}
    </div>
  );
};

export default DashboardView;
