
import React, { useState } from 'react';
import { Upload, Camera, AlertCircle, ShieldCheck } from 'lucide-react';

export const DiseaseScan: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        // Simulate analysis
        setIsAnalyzing(true);
        setTimeout(() => {
          setIsAnalyzing(false);
          setResult({
            disease: 'Early Blight',
            confidence: 94,
            severity: 'Medium',
            treatment: 'Apply copper-based fungicides. Remove infected leaves immediately.'
          });
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-140px)]">
      {/* Left: Upload Area */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Scan Plant</h3>
        
        <div className="flex-1 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden group hover:border-green-300 transition-colors">
          {selectedImage ? (
            <img src={selectedImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 text-green-600">
                <Upload className="w-8 h-8" />
              </div>
              <p className="text-sm font-medium text-gray-700 mb-1">Click or drag image here</p>
              <p className="text-xs text-gray-400">Supports JPG, PNG (Max 5MB)</p>
            </div>
          )}
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer" 
          />
        </div>

        <div className="mt-4 text-center">
          <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center">
            <Camera className="w-5 h-5 mr-2" />
            Capture from Camera
          </button>
        </div>
      </div>

      {/* Right: Results */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-y-auto">
        {!selectedImage ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <ScanLinePlaceholder />
            <p className="mt-4">Upload an image to see analysis results</p>
          </div>
        ) : isAnalyzing ? (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
            <p className="text-green-800 font-medium">Analyzing plant health...</p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{result.disease}</h2>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                    {result.confidence}% Confidence
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                    Severity: {result.severity}
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                <AlertCircle className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Early blight is a common fungal disease affecting tomatoes and potatoes. It causes concentric rings on leaves, often leading to defoliation and yield loss.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-green-600" />
                  Recommended Treatment
                </h4>
                <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                  <ul className="space-y-3">
                    <li className="flex items-start text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 mr-2 shrink-0" />
                      {result.treatment}
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 mr-2 shrink-0" />
                      Improve air circulation by spacing plants properly.
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 mr-2 shrink-0" />
                      Water at the base of the plant to keep foliage dry.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ScanLinePlaceholder = () => (
  <svg className="w-24 h-24 text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7V5a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2m-10 0H5a2 2 0 01-2-2v-2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-3 0a3 3 0 106 0a3 3 0 10-6 0" />
  </svg>
);
