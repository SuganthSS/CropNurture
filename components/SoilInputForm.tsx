
import React from 'react';
import { SoilData, DailyForecast } from '../types';

interface SoilInputFormProps {
  soilData: SoilData;
  setSoilData: React.Dispatch<React.SetStateAction<SoilData>>;
  onSubmit: () => void;
  isLoading: boolean;
  onFetchWeather: () => void;
  isWeatherLoading: boolean;
  forecast?: DailyForecast[];
}

interface SliderInputProps {
  label: string;
  id: keyof SoilData;
  min: number;
  max: number;
  step: number;
  value: number;
  unit: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accentColor?: string; // 'green' | 'blue'
}

const SliderInput: React.FC<SliderInputProps> = ({ label, id, min, max, step, value, unit, onChange, accentColor = 'green' }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const colorClass = accentColor === 'blue' ? 'bg-blue-500' : 'bg-terra-500';
  const bgClass = accentColor === 'blue' ? 'bg-blue-100' : 'bg-terra-100';

  return (
    <div className="group relative">
      <div className="flex justify-between items-end mb-2">
        <label htmlFor={id} className="text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-gray-700 transition-colors">
          {label}
        </label>
        <span className="text-sm font-bold text-gray-900 font-mono bg-white px-2 py-0.5 rounded border border-gray-200 shadow-sm">
          {value} <span className="text-gray-400 text-xs font-normal ml-0.5">{unit}</span>
        </span>
      </div>
      
      <div className="relative w-full h-6 flex items-center">
        {/* Track Background */}
        <div className={`absolute w-full h-2 ${bgClass} rounded-full overflow-hidden`}>
            {/* Progress Fill */}
            <div 
                className={`h-full ${colorClass} rounded-full transition-all duration-150 ease-out`} 
                style={{ width: `${percentage}%` }} 
            />
        </div>
        
        {/* Custom Range Input */}
        <input
          type="range"
          id={id}
          name={id}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        {/* Custom Thumb Handle (Visual only, follows percentage) */}
        <div 
            className="absolute h-5 w-5 bg-white border-2 border-gray-200 rounded-full shadow-md pointer-events-none transition-all duration-150 ease-out group-hover:scale-110 group-hover:border-terra-500"
            style={{ left: `calc(${percentage}% - 10px)` }}
        >
             <div className={`w-1.5 h-1.5 rounded-full ${colorClass} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} />
        </div>
      </div>
    </div>
  );
};

const RainfallChart: React.FC<{ forecast: DailyForecast[] }> = ({ forecast }) => {
    const maxRainfall = Math.max(...forecast.map(f => f.rainfall), 10);

    return (
        <div className="mt-6 bg-white/80 rounded-xl p-4 border border-blue-100 shadow-sm">
            <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Rainfall Trend (7 Days)
            </h4>
            <div className="flex justify-between items-end h-20 gap-2">
                {forecast.map((day, index) => {
                    const heightPercent = (day.rainfall / maxRainfall) * 100;
                    const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });
                    return (
                        <div key={index} className="flex flex-col items-center flex-1 group relative">
                            <div className="w-full bg-blue-50 rounded-t-md relative h-full flex items-end overflow-hidden">
                                <div 
                                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md transition-all duration-500 ease-out group-hover:to-blue-300"
                                    style={{ height: `${heightPercent}%` }}
                                ></div>
                            </div>
                            <span className="text-[9px] text-gray-500 font-bold mt-1.5 uppercase">{dayName}</span>
                            
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-[10px] rounded px-2 py-1 whitespace-nowrap transition-opacity pointer-events-none z-10 shadow-lg transform translate-y-1 group-hover:translate-y-0">
                                {day.rainfall} mm
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const SoilInputForm: React.FC<SoilInputFormProps> = ({ soilData, setSoilData, onSubmit, isLoading, onFetchWeather, isWeatherLoading, forecast }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSoilData(prevData => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Soil Card */}
      <div className="bg-white p-6 rounded-3xl shadow-soft-xl border border-terra-100/50 hover:border-terra-200 transition-all duration-300 h-full">
        <h3 className="font-display font-bold text-lg text-terra-900 mb-6 flex items-center border-b border-terra-50 pb-4">
            <div className="p-2 bg-terra-50 rounded-lg mr-3 text-terra-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2C8,2 6,5 6,8C6,10 7,13 8,16C9,19 10,22 12,22C14,22 15,19 16,16C17,13 18,10 18,8C18,5 16,2 12,2M12,4C14,4 15,5.5 15.5,7H8.5C9,5.5 10,4 12,4Z" />
                </svg>
            </div>
            Soil Composition
        </h3>
        <div className="space-y-6">
            <SliderInput label="Soil pH" id="ph" min={0} max={14} step={0.1} value={soilData.ph} unit="" onChange={handleChange} />
            <SliderInput label="Nitrogen (N)" id="nitrogen" min={0} max={200} step={1} value={soilData.nitrogen} unit="ppm" onChange={handleChange} />
            <SliderInput label="Phosphorus (P)" id="phosphorus" min={0} max={200} step={1} value={soilData.phosphorus} unit="ppm" onChange={handleChange} />
            <SliderInput label="Potassium (K)" id="potassium" min={0} max={200} step={1} value={soilData.potassium} unit="ppm" onChange={handleChange} />
        </div>
      </div>

      {/* Climate Card */}
      <div className="bg-white p-6 rounded-3xl shadow-soft-xl border border-blue-100/50 hover:border-blue-200 transition-all duration-300 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6 border-b border-blue-50 pb-4">
            <h3 className="font-display font-bold text-lg text-gray-900 flex items-center">
                <div className="p-2 bg-blue-50 rounded-lg mr-3 text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                    </svg>
                </div>
                Climate Data
            </h3>
            <button
                type="button"
                onClick={onFetchWeather}
                disabled={isWeatherLoading}
                className="group flex items-center space-x-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold transition-all border border-blue-100 active:scale-95"
            >
                {isWeatherLoading ? (
                    <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                )}
                <span>{isWeatherLoading ? 'Sync' : 'Auto-Fill'}</span>
            </button>
        </div>
        
        <div className="space-y-6 flex-grow">
            <SliderInput label="Temperature" id="temperature" min={-10} max={50} step={0.5} value={soilData.temperature} unit="°C" onChange={handleChange} accentColor="blue" />
            <SliderInput label="Humidity" id="humidity" min={0} max={100} step={1} value={soilData.humidity} unit="%" onChange={handleChange} accentColor="blue" />
            <SliderInput label="Annual Rainfall" id="rainfall" min={0} max={3000} step={10} value={soilData.rainfall} unit="mm" onChange={handleChange} accentColor="blue" />
        </div>
        
        {forecast && forecast.length > 0 && <RainfallChart forecast={forecast} />}
      </div>
      
      <div className="md:col-span-2 mt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative overflow-hidden flex justify-center py-5 px-6 rounded-2xl shadow-glow text-xl font-display font-bold text-white bg-terra-600 hover:bg-terra-500 focus:outline-none focus:ring-4 focus:ring-terra-200 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 ease-out transform hover:-translate-y-1 active:translate-y-0"
          >
            <span className="relative z-10 flex items-center gap-3">
            {isLoading ? (
                <>Analyzing Data...</>
            ) : (
                <>
                    Generate Recommendation
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </>
            )}
            </span>
          </button>
      </div>
    </form>
  );
};

export default SoilInputForm;
