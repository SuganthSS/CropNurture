
import React, { useState } from 'react';
import { CropRecommendation, HistoricalYield, PestOrDisease } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface RecommendationCardProps {
  recommendation: CropRecommendation;
}

const InfoPill: React.FC<{ label: string; value: string; icon: string }> = ({ label, value, icon }) => (
    <div className="flex flex-col items-center justify-center bg-terra-50 text-terra-800 p-3 rounded-lg text-center">
        <div className="flex items-center mb-1">
            <span className="text-xl mr-2">{icon}</span>
            <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
        </div>
        <p className="text-sm font-semibold">{value}</p>
    </div>
);

const PestImage: React.FC<{ src?: string | null; name: string }> = ({ src, name }) => {
    const [error, setError] = useState(false);

    if (!src || error) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-terra-100 text-terra-400" title={name}>
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-70">
                    <path d="M19 10.13C19.09 10.41 19.14 10.7 19.14 11C19.14 14.53 16.03 17.43 12.36 17.93L12.95 18.95C13.13 19.26 13.02 19.66 12.71 19.84C12.4 20.03 12 19.91 11.82 19.6L11.2 18.53C10.81 18.57 10.41 18.57 10 18.57C5.58 18.57 2 15.16 2 11C2 10.7 2.05 10.41 2.14 10.13L1.55 9.11C1.37 8.8 1.48 8.4 1.79 8.22C2.1 8.04 2.5 8.15 2.68 8.46L3.31 9.55C4.28 8.32 5.76 7.5 7.42 7.16L6.8 4.06C6.73 3.71 6.96 3.37 7.31 3.3C7.66 3.23 8 3.46 8.07 3.81L8.72 7.03C9.14 7 9.56 6.97 10 6.97C10.44 6.97 10.86 7 11.28 7.03L11.93 3.81C12 3.46 12.34 3.23 12.69 3.3C13.04 3.37 13.27 3.71 13.2 4.06L12.58 7.16C14.24 7.5 15.72 8.32 16.69 9.55L17.32 8.46C17.5 8.15 17.9 8.04 18.21 8.22C18.52 8.4 18.63 8.8 18.45 9.11L17.86 10.13V10.13ZM10 16.57C13.31 16.57 16 14.08 16 11C16 7.92 13.31 5.43 10 5.43C6.69 5.43 4 7.92 4 11C4 14.08 6.69 16.57 10 16.57Z" />
                </svg>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setError(true)}
        />
    );
};

const YieldVisual: React.FC<{ data: HistoricalYield }> = ({ data }) => (
    <div className="bg-gradient-to-br from-terra-50 to-white rounded-xl p-5 border border-terra-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-3">
            <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-terra-700 leading-none">{data.value}</span>
                <span className="text-lg font-bold text-terra-600">{data.unit}</span>
            </div>
             <div className="hidden sm:block">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-terra-200">
                    <path d="M3 21h18M3 10h4v11H3V10zm7-7h4v18h-4V3zm7 5h4v13h-4V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
        
        {/* Visual Indicator Bar */}
        <div className="w-full bg-gray-100 rounded-full h-4 mb-3 overflow-hidden relative">
             <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-terra-400 to-terra-600 rounded-full w-4/5"></div>
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMykiLz48L3N2Zz4=')] opacity-30"></div>
        </div>
        
        <p className="text-sm text-gray-600 leading-relaxed border-t border-terra-100 pt-3 mt-2">
            {data.description}
        </p>
    </div>
);

const GrowthDurationVisual: React.FC<{ duration: string }> = ({ duration }) => {
    // Parse duration for a number to visualize
    let days = 120; 
    const match = duration.match(/(\d+)/);
    if (match) days = parseInt(match[0]);
    
    // Cap visualization at 180 days for crop context
    const percentage = Math.min((days / 180) * 100, 100); 

    return (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-6 shadow-sm">
            <div className="flex justify-between items-end mb-3">
                 <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="text-lg">⏳</span> Cycle Duration
                 </h4>
                 <span className="text-sm font-bold text-blue-900 bg-white px-2 py-1 rounded shadow-sm border border-blue-100">{duration}</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3 relative overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full relative transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }}>
                     <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50"></div>
                </div>
                {/* Markers */}
                <div className="absolute top-0 bottom-0 left-1/3 w-px bg-blue-300/50"></div>
                <div className="absolute top-0 bottom-0 left-2/3 w-px bg-blue-300/50"></div>
            </div>
            <div className="flex justify-between text-[10px] text-blue-400 mt-1.5 font-medium uppercase tracking-wide">
                <span>Sowing</span>
                <span>~3 Mo</span>
                <span>Harvest</span>
            </div>
        </div>
    );
};

const MarketTrendChart: React.FC<{ trends: any[] }> = ({ trends }) => {
    if (!trends || trends.length === 0) return null;

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm">
            <h4 className="font-display font-bold text-purple-900 mb-4 flex items-center text-lg">
                <span className="p-2 bg-purple-50 rounded-lg mr-3 text-purple-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                </span>
                Market Demand Forecast (6 Months)
            </h4>
            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trends}>
                        <defs>
                            <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis 
                            dataKey="month" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 10, fill: '#9ca3af'}} 
                            interval={0}
                        />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            cursor={{ stroke: '#d1d5db', strokeWidth: 1, strokeDasharray: '3 3' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="demandLevel" 
                            stroke="#8b5cf6" 
                            strokeWidth={3} 
                            fillOpacity={1} 
                            fill="url(#colorDemand)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [expandedPestName, setExpandedPestName] = useState<string | null>(null);

  const togglePest = (name: string) => {
    setExpandedPestName(prev => prev === name ? null : name);
  };

  return (
    <div className="w-full animate-fade-in">
      <h3 className="text-center text-3xl font-bold text-gray-900 mb-4">
        Recommended Crop: <span className="text-terra-700">{recommendation.cropName}</span>
      </h3>
      <div className="rounded-2xl overflow-hidden shadow-lg mb-4">
        <img
          src={recommendation.imageUrl || 'https://picsum.photos/800/400'}
          alt={`Image of ${recommendation.cropName}`}
          className="w-full h-64 object-cover"
          onError={(e) => { e.currentTarget.src = 'https://picsum.photos/800/400'; }}
        />
      </div>
      
      <p className="text-gray-600 text-center mb-6">{recommendation.description}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-6">
        <InfoPill label="Planting" value={recommendation.plantingSeason} icon="📅" />
        <InfoPill label="pH Level" value={recommendation.optimalConditions.ph} icon="🧪" />
        <InfoPill label="Temperature" value={recommendation.optimalConditions.temperature} icon="🌡️" />
        <InfoPill label="Rainfall" value={recommendation.optimalConditions.rainfall} icon="💧" />
      </div>

      {/* Market Trends Visualization */}
      {recommendation.marketTrends && recommendation.marketTrends.length > 0 && (
          <MarketTrendChart trends={recommendation.marketTrends} />
      )}

      {/* Planting Guidance Section */}
      {recommendation.plantingGuide && (
        <div className="bg-white border border-terra-100 rounded-2xl p-6 mb-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 to-terra-400"></div>
             <h4 className="font-display font-bold text-terra-900 mb-6 flex items-center text-xl">
                <span className="p-2 bg-amber-100 rounded-lg mr-3 text-amber-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </span>
                Planting Guidance
            </h4>
            
            <div className="space-y-4">
                {/* Step 1: Soil Prep */}
                 <div className="flex group">
                    <div className="mr-4 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-terra-100 text-terra-600 flex items-center justify-center font-bold text-sm border-2 border-terra-50 z-10 group-hover:bg-terra-600 group-hover:text-white transition-colors shadow-sm">1</div>
                        <div className="h-full w-0.5 bg-terra-100 my-1"></div>
                    </div>
                    <div className="bg-terra-50/50 p-4 rounded-xl border border-terra-100 flex-grow hover:bg-terra-50 transition-colors shadow-sm hover:shadow-md">
                         <div className="flex items-start justify-between mb-2">
                             <h5 className="font-bold text-terra-800 text-sm uppercase tracking-wide">Preparation</h5>
                             <span className="text-xl">🧤</span>
                         </div>
                         <p className="text-gray-700 font-medium leading-relaxed">{recommendation.plantingGuide.soilPreparation}</p>
                    </div>
                </div>

                {/* Step 2: Seed Depth */}
                 <div className="flex group">
                    <div className="mr-4 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm border-2 border-amber-50 z-10 group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-sm">2</div>
                         <div className="h-full w-0.5 bg-terra-100 my-1"></div>
                    </div>
                    <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 flex-grow hover:bg-amber-50 transition-colors shadow-sm hover:shadow-md">
                         <div className="flex items-start justify-between mb-2">
                             <h5 className="font-bold text-amber-800 text-sm uppercase tracking-wide">Sowing Depth</h5>
                             <span className="text-xl">🌱</span>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="relative h-14 w-14 bg-amber-100/50 rounded-lg overflow-hidden border border-amber-200 flex-shrink-0 flex flex-col justify-end">
                                <div className="w-full border-t-2 border-amber-800/20 border-dashed absolute top-2"></div>
                                <div className="w-1.5 h-1.5 bg-amber-800 rounded-full mx-auto mb-3 animate-float"></div>
                                <div className="w-full h-1/2 bg-amber-200/30 border-t border-amber-300"></div>
                            </div>
                            <p className="text-gray-800 font-bold text-lg">{recommendation.plantingGuide.seedDepth}</p>
                         </div>
                    </div>
                </div>

                {/* Step 3: Spacing */}
                 <div className="flex group">
                    <div className="mr-4 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm border-2 border-blue-50 z-10 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">3</div>
                    </div>
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex-grow hover:bg-blue-50 transition-colors shadow-sm hover:shadow-md">
                         <div className="flex items-start justify-between mb-2">
                             <h5 className="font-bold text-blue-800 text-sm uppercase tracking-wide">Spacing</h5>
                             <span className="text-xl">↔️</span>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center space-x-1 text-blue-400 bg-white px-3 py-2 rounded-lg border border-blue-100 shadow-sm">
                                <div className="w-2 h-2 bg-terra-500 rounded-full"></div>
                                <div className="h-px w-6 bg-blue-300 border-t border-dashed border-blue-400"></div>
                                <div className="w-2 h-2 bg-terra-500 rounded-full"></div>
                            </div>
                            <p className="text-gray-800 font-medium">{recommendation.plantingGuide.spacing}</p>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Growth Cycle Duration Visualization */}
      {recommendation.growthCycle && (
          <GrowthDurationVisual duration={recommendation.growthCycle} />
      )}

      {/* Growth Stages Horizontal Timeline */}
      {recommendation.growthStages && recommendation.growthStages.length > 0 && (
        <div className="mb-8">
           <div className="flex items-center justify-center mb-4">
              <span className="h-px w-12 bg-gray-200"></span>
              <span className="mx-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Growth Timeline</span>
              <span className="h-px w-12 bg-gray-200"></span>
           </div>
           
           <div className="overflow-x-auto pb-2">
               <div className="flex justify-between items-start relative min-w-max md:min-w-0 md:w-full px-4 mx-auto">
                   {/* Connecting Line */}
                   <div className="absolute top-3 left-8 right-8 h-0.5 bg-gray-100 -z-10"></div>
                   
                   {recommendation.growthStages.map((stage, index) => (
                       <div key={index} className="flex flex-col items-center px-3 w-28 md:w-auto group cursor-default">
                           <div className="w-6 h-6 rounded-full bg-white border-2 border-terra-400 flex items-center justify-center z-10 shadow-sm group-hover:border-terra-600 group-hover:scale-110 transition-all">
                                <div className="w-2 h-2 rounded-full bg-terra-500"></div>
                           </div>
                           <div className="mt-2 text-center">
                               <p className="text-xs font-bold text-gray-800 leading-tight">{stage.name}</p>
                               <p className="text-[10px] text-terra-600 font-medium mt-1 bg-terra-50 px-2 py-0.5 rounded-full">{stage.duration}</p>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
        </div>
      )}

      {recommendation.pestAndDiseaseManagement && (
        <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">Pest & Disease Management</h4>
            
            <div className="mb-6">
                <h5 className="font-semibold text-gray-700 mb-3">Common Issues</h5>
                <div className="space-y-3">
                    {recommendation.pestAndDiseaseManagement.commonPestsAndDiseases.map((pest, index) => {
                        const isObject = typeof pest !== 'string';
                        const name = isObject ? pest.name : pest;
                        const imageUrl = isObject ? pest.imageUrl : null;
                        const severity = isObject ? pest.severity : null;
                        const hasDetails = isObject && (pest.symptoms || pest.controlMethods);
                        const isExpanded = expandedPestName === name;

                        return (
                            <div 
                                key={index} 
                                className={`bg-white border rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${
                                    isExpanded ? 'border-terra-300 ring-1 ring-terra-300' : 'border-gray-100 hover:border-terra-200 hover:shadow-md'
                                }`}
                            >
                                <div 
                                    className={`flex items-center p-3 ${hasDetails ? 'cursor-pointer' : ''}`}
                                    onClick={() => hasDetails && togglePest(name)}
                                >
                                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                                        <PestImage src={imageUrl} name={name} />
                                    </div>
                                    
                                    <div className="ml-4 flex-grow">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <h6 className="font-bold text-gray-800">{name}</h6>
                                                {severity && (
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                                        severity.toLowerCase() === 'high' ? 'bg-red-100 text-red-700' :
                                                        severity.toLowerCase() === 'medium' ? 'bg-orange-100 text-orange-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {severity}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        {hasDetails && !isExpanded && (
                                            <p className="text-xs text-gray-400 mt-1">Click to view symptoms & control</p>
                                        )}
                                    </div>

                                    {hasDetails && (
                                        <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Expandable Content */}
                                {hasDetails && isExpanded && (
                                    <div className="bg-terra-50 p-4 border-t border-terra-100 animate-fade-in">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <h6 className="text-xs font-bold text-terra-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                                                    <span className="text-sm">🔍</span> Symptoms
                                                </h6>
                                                <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-terra-100/50 leading-relaxed">
                                                    {(pest as PestOrDisease).symptoms}
                                                </p>
                                            </div>
                                            <div>
                                                <h6 className="text-xs font-bold text-terra-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                                                    <span className="text-sm">🛡️</span> Control Methods
                                                </h6>
                                                <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-terra-100/50 leading-relaxed">
                                                    {(pest as PestOrDisease).controlMethods}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                <h5 className="font-semibold text-gray-700 mb-2">Natural Control Methods</h5>
                <p className="text-gray-600 text-sm leading-relaxed">{recommendation.pestAndDiseaseManagement.naturalControlMethods}</p>
            </div>
        </div>
      )}

      {/* Detailed Analysis Button & Modal */}
      {(recommendation.nutritionalValue || recommendation.historicalYield) && (
        <div className="mt-8 text-center">
            <button 
                onClick={() => setShowDetails(true)}
                className="px-6 py-2 bg-white border border-terra-200 text-terra-700 font-bold rounded-full shadow-sm hover:shadow-md hover:border-terra-300 transition-all"
            >
                View Detailed Analytics
            </button>
        </div>
      )}

      {showDetails && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowDetails(false)}>
              <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-display font-bold text-terra-900">Crop Analytics</h3>
                      <button onClick={() => setShowDetails(false)} className="p-2 hover:bg-gray-100 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                      </button>
                  </div>
                  
                  <div className="space-y-8">
                      {recommendation.historicalYield && (typeof recommendation.historicalYield === 'object') && (
                          <section>
                              <h4 className="text-lg font-bold text-gray-800 mb-3">Yield Potential</h4>
                              <YieldVisual data={recommendation.historicalYield} />
                          </section>
                      )}
                      
                      {recommendation.nutritionalValue && (
                          <section>
                              <h4 className="text-lg font-bold text-gray-800 mb-3">Nutritional Profile</h4>
                              <div className="bg-terra-50 rounded-xl p-5 border border-terra-100">
                                  <p className="text-gray-700 leading-relaxed">{recommendation.nutritionalValue}</p>
                              </div>
                          </section>
                      )}
                      
                       {/* Fallback for cycle description if no dedicated visual used or for extra detail */}
                      {recommendation.growthCycle && (
                          <section>
                              <h4 className="text-lg font-bold text-gray-800 mb-2">Growth Cycle Description</h4>
                              <p className="text-gray-600">{recommendation.growthCycle}</p>
                          </section>
                      )}
                  </div>
                  
                  <div className="mt-8 pt-4 border-t border-gray-100 text-center">
                      <button 
                        onClick={() => setShowDetails(false)}
                        className="text-terra-600 font-bold hover:text-terra-800"
                      >
                          Close Analysis
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default RecommendationCard;
