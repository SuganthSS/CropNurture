
import React, { useState, useCallback } from 'react';
import { SoilData, CropRecommendation, HistoryItem, DailyForecast } from '../types';
import { getCropRecommendation } from '../services/geminiService';
import SoilInputForm from './SoilInputForm';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import RadarChart from './RadarChart';
import ComparisonView from './ComparisonView';
import DashboardView from './DashboardView';

const SoilAnalysis: React.FC = () => {
  const [soilData, setSoilData] = useState<SoilData>({
    ph: 7.0,
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    temperature: 25,
    humidity: 60,
    rainfall: 600,
  });

  const [recommendation, setRecommendation] = useState<CropRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);

  const [history, setHistory] = useState<HistoryItem[]>(() => {
      try {
          const saved = localStorage.getItem('cropAnalysisHistory');
          return saved ? JSON.parse(saved) : [];
      } catch (e) {
          return [];
      }
  });
  const [showHistory, setShowHistory] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  const handleGetRecommendation = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setRecommendation(null);
    try {
      const result = await getCropRecommendation(soilData, forecast);
      setRecommendation(result);

      const newItem: HistoryItem = {
          id: Date.now(),
          timestamp: new Date().toLocaleString(),
          soilData: { ...soilData },
          recommendation: result
      };
      
      setHistory(prev => {
          const updated = [newItem, ...prev];
          localStorage.setItem('cropAnalysisHistory', JSON.stringify(updated));
          return updated;
      });

    } catch (err) {
      console.error(err);
      let message = err instanceof Error ? err.message : 'An unknown error occurred.';
      if (message.includes("Failed to get crop recommendation")) {
         message = "The AI service could not generate a recommendation. Please check your inputs or try again later.";
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [soilData, forecast]);

  const handleFetchWeather = useCallback(() => {
      if (!navigator.geolocation) {
          setError("Geolocation is not supported by this browser.");
          return;
      }

      setIsWeatherLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
          async (position) => {
              try {
                  const { latitude, longitude } = position.coords;
                  const response = await fetch(
                      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,rain&daily=precipitation_sum&timezone=auto`
                  );
                  
                  if (!response.ok) throw new Error("Failed to fetch weather data");
                  const data = await response.json();
                  
                  if (data.current) {
                      setSoilData(prev => ({
                          ...prev,
                          temperature: data.current.temperature_2m,
                          humidity: data.current.relative_humidity_2m,
                          rainfall: data.current.rain > 0 ? data.current.rain : prev.rainfall
                      }));
                  }

                  if (data.daily && data.daily.time && data.daily.precipitation_sum) {
                      const dailyForecast: DailyForecast[] = data.daily.time.map((time: string, index: number) => ({
                          date: time,
                          rainfall: data.daily.precipitation_sum[index]
                      }));
                      setForecast(dailyForecast);
                  }
              } catch (err) {
                  setError("Failed to fetch weather data.");
              } finally {
                  setIsWeatherLoading(false);
              }
          },
          (err) => {
              setError("Unable to retrieve location.");
              setIsWeatherLoading(false);
          }
      );
  }, []);

  const handleClearHistory = () => {
      if(window.confirm("Clear all history?")) {
          setHistory([]);
          localStorage.removeItem('cropAnalysisHistory');
          setSelectedIds([]);
      }
  };

  const handleLoadHistoryItem = (item: HistoryItem) => {
      setSoilData(item.soilData);
      setRecommendation(item.recommendation);
      setShowHistory(false);
  };

  const handleToggleSelect = (id: number) => {
      setSelectedIds(prev => 
          prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
      );
  };

  const handleCompare = () => {
      if (selectedIds.length > 1) setIsComparing(true);
  };

  const handleBackFromDashboard = () => {
      setRecommendation(null);
  };

  // Render Comparison
  if (isComparing) {
      const compareItems = history.filter(item => selectedIds.includes(item.id));
      return (
        <div className="bg-white/70 backdrop-blur-sm p-6 lg:p-8 rounded-4xl shadow-soft-xl border border-white/60 h-full">
            <ComparisonView items={compareItems} onBack={() => setIsComparing(false)} />
        </div>
      );
  }

  // Render Dashboard
  if (recommendation && !isLoading && !error) {
      return (
          <DashboardView 
            recommendation={recommendation} 
            soilData={soilData} 
            forecast={forecast} 
            onBack={handleBackFromDashboard}
          />
      );
  }

  // Render Input Form (Default)
  return (
    <div className="bg-white/70 backdrop-blur-sm p-6 lg:p-8 rounded-4xl shadow-soft-xl border border-white/60 flex flex-col h-full relative overflow-hidden">
       
       {/* Header Action Bar */}
       <div className="flex justify-between items-center mb-8 relative z-10">
        <h2 className="text-2xl font-display font-bold text-gray-900">Soil Analysis</h2>
        <button 
            onClick={() => {
                setShowHistory(!showHistory);
                setIsComparing(false);
            }}
            className="group flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-terra-700 bg-terra-50 hover:bg-terra-100 border border-terra-200 rounded-full transition-all active:scale-95"
        >
            {showHistory ? (
                <>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                   <span>Back to Form</span>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                    <span>History</span>
                    {history.length > 0 && <span className="bg-terra-200 text-terra-800 text-[10px] px-1.5 py-0.5 rounded-full">{history.length}</span>}
                </>
            )}
        </button>
      </div>

      {showHistory ? (
         <div className="flex-grow animate-fade-in flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Saved Reports</span>
                {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-xs text-red-500 hover:text-red-700 font-bold">
                        Clear All
                    </button>
                )}
            </div>
            
            {history.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <p>No saved reports yet.</p>
                </div>
            ) : (
                <div className="space-y-3 overflow-y-auto pr-2 pb-20 custom-scrollbar">
                    {history.map((item) => (
                        <div 
                            key={item.id} 
                            className={`border rounded-2xl p-4 transition-all cursor-pointer ${selectedIds.includes(item.id) ? 'border-terra-500 bg-terra-50 shadow-sm' : 'border-gray-100 hover:border-terra-200 hover:bg-white'}`}
                            onClick={() => handleToggleSelect(item.id)}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedIds.includes(item.id) ? 'bg-terra-500 border-terra-500' : 'border-gray-300'}`}>
                                        {selectedIds.includes(item.id) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">{item.recommendation.cropName}</h4>
                                        <span className="text-xs text-gray-400">{item.timestamp}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleLoadHistoryItem(item); }}
                                    className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:text-terra-600 hover:border-terra-200 font-bold transition-colors"
                                >
                                    Load
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {selectedIds.length > 0 && (
                <div className="absolute bottom-6 left-6 right-6">
                    <button 
                        onClick={handleCompare}
                        disabled={selectedIds.length < 2}
                        className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Compare ({selectedIds.length})
                    </button>
                </div>
            )}
         </div>
      ) : (
        <>
            <div className="mb-8 p-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <RadarChart data={soilData} />
            </div>

            <SoilInputForm
                soilData={soilData}
                setSoilData={setSoilData}
                onSubmit={handleGetRecommendation}
                isLoading={isLoading}
                onFetchWeather={handleFetchWeather}
                isWeatherLoading={isWeatherLoading}
                forecast={forecast}
            />
            
            <div className="mt-8 flex flex-col items-center justify-center">
                {isLoading && (
                    <div className="flex flex-col items-center animate-fade-in">
                        <Loader />
                        <p className="mt-4 font-medium text-terra-700">Analyzing composition & climate...</p>
                    </div>
                )}
                {error && <ErrorMessage message={error} />}
            </div>
        </>
      )}
    </div>
  );
};

export default SoilAnalysis;
