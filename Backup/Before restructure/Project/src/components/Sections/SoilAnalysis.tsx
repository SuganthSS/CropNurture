
import React, { useState } from 'react';
import { RefreshCw, Save, Zap } from 'lucide-react';
import { SoilRadarChart } from '../Widgets/SoilRadarChart';
import { SoilData } from '../../types';

export const SoilAnalysis: React.FC = () => {
  const [values, setValues] = useState<SoilData>({
    ph: 6.5,
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    organicMatter: 3,
    moisture: 50
  });

  const handleChange = (key: keyof SoilData, value: number) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const sliderGroup = (label: string, key: keyof SoilData, min: number, max: number, unit: string) => (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm text-gray-500 font-mono">{values[key]} {unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={values[key]}
        onChange={(e) => handleChange(key, Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Input Panel */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Input Parameters</h3>
            <button className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-6">
            {sliderGroup("Soil pH", "ph", 0, 14, "")}
            {sliderGroup("Nitrogen (N)", "nitrogen", 0, 100, "ppm")}
            {sliderGroup("Phosphorus (P)", "phosphorus", 0, 100, "ppm")}
            {sliderGroup("Potassium (K)", "potassium", 0, 100, "ppm")}
            {sliderGroup("Organic Matter", "organicMatter", 0, 10, "%")}
            {sliderGroup("Moisture", "moisture", 0, 100, "%")}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
            <button className="w-full flex items-center justify-center px-4 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all shadow-sm hover:shadow-green-200/50">
              <Zap className="w-4 h-4 mr-2" />
              Analyze Soil
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              <Save className="w-4 h-4 mr-2" />
              Save Record
            </button>
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Analysis Results</h3>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              AI Generated
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="flex justify-center items-center bg-gray-50 rounded-xl p-4">
              <SoilRadarChart data={values} />
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-2">Soil Condition Summary</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Your soil is slightly acidic with moderate nitrogen levels. The organic matter content is healthy, suggesting good water retention. However, phosphorus levels are slightly low for optimal flowering crops.
              </p>
              
              <h4 className="text-md font-medium text-gray-900 mb-3">Immediate Recommendations</h4>
              <ul className="space-y-2">
                {[
                  "Apply rock phosphate to boost P levels.",
                  "Maintain moisture at current levels.",
                  "Add a light layer of compost to sustain organic matter."
                ].map((rec, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
