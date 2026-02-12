import React, { useState, useCallback, useRef } from 'react';
import { CropDiseaseInfo } from '../types';
import { detectCropDisease } from '../services/geminiService';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

const DiseaseResult: React.FC<{ info: CropDiseaseInfo }> = ({ info }) => {
    const isHealthy = info.isHealthy;

    return (
        <div className="animate-fade-in w-full h-full flex flex-col">
            <div className={`text-center p-6 rounded-3xl mb-6 ${isHealthy ? 'bg-terra-50 border border-terra-100' : 'bg-red-50 border border-red-100'}`}>
                <div className="text-5xl mb-3 filter drop-shadow-sm">{isHealthy ? '🌿' : '⚠️'}</div>
                <h3 className={`text-2xl font-display font-bold mb-1 ${isHealthy ? 'text-terra-800' : 'text-red-800'}`}>
                    {isHealthy ? 'Healthy Plant Detected' : info.diseaseName}
                </h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto">{info.description}</p>
            </div>

            {!isHealthy && (
                <div className="mb-6">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Detected Symptoms</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {info.symptoms.map((symptom, i) => (
                            <div key={i} className="flex items-start p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-red-200 transition-colors">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 mr-2.5 flex-shrink-0"></div>
                                <span className="text-sm text-gray-700 font-medium">{symptom}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 flex-grow">
                <div className="p-5 bg-white rounded-2xl border border-terra-100 shadow-sm">
                    <h4 className="font-bold text-terra-900 mb-2 flex items-center gap-2">
                        <span className="text-lg">🌱</span> Organic Treatment
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{info.organicTreatment}</p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-blue-100 shadow-sm">
                    <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <span className="text-lg">🛡️</span> Prevention
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{info.preventativeMeasures}</p>
                </div>
            </div>
        </div>
    );
};

const PhotoTips: React.FC = () => (
    <div className="w-full mt-4 animate-fade-in">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
                { icon: '☀️', label: 'Good Light', bg: 'bg-yellow-50', border: 'border-yellow-100', text: 'text-yellow-800' },
                { icon: '🎯', label: 'Sharp Focus', bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-800' },
                { icon: '⬜', label: 'Plain Back', bg: 'bg-gray-50', border: 'border-gray-100', text: 'text-gray-700' },
                { icon: '🔍', label: 'Close-up', bg: 'bg-terra-50', border: 'border-terra-100', text: 'text-terra-800' }
            ].map((tip, i) => (
                <div key={i} className={`flex flex-col items-center justify-center p-3 rounded-xl border ${tip.bg} ${tip.border} transition-transform hover:-translate-y-1`}>
                    <span className="text-lg mb-1">{tip.icon}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wide ${tip.text}`}>{tip.label}</span>
                </div>
            ))}
        </div>
    </div>
);

const DiseaseDetector: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [diseaseInfo, setDiseaseInfo] = useState<CropDiseaseInfo | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setDiseaseInfo(null);
            setError(null);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleClear = () => {
        setImage(null);
        setFile(null);
        setDiseaseInfo(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleAnalyze = useCallback(async () => {
        if (!file || !image) return;
        setIsLoading(true);
        setError(null);
        setDiseaseInfo(null);
        try {
            const base64Image = image.split(',')[1];
            const result = await detectCropDisease(base64Image, file.type);
            setDiseaseInfo(result);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [file, image]);

    return (
        <div className="bg-white/70 backdrop-blur-sm p-6 lg:p-8 rounded-4xl shadow-soft-xl border border-white/60 h-full relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-terra-100/50 to-transparent rounded-bl-full pointer-events-none"></div>

            <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold text-gray-900">Health Scan</h2>
                    <span className="px-3 py-1 bg-terra-100 text-terra-700 text-xs font-bold rounded-full">AI Vision</span>
                </div>

                {/* Split Layout Container */}
                <div className={`grid gap-8 ${image && (diseaseInfo || isLoading) ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                    
                    {/* Left Column: Upload Area */}
                    <div className="flex flex-col gap-6">
                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
                        
                        <div 
                            className={`group relative w-full rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden
                                ${image 
                                    ? 'border-terra-300 bg-gray-900 h-64 lg:h-full min-h-[300px]' 
                                    : 'aspect-[4/3] lg:aspect-auto lg:h-[400px] border-gray-300 bg-white hover:border-terra-400 hover:bg-terra-50/30'
                                }`}
                            onClick={() => !image && fileInputRef.current?.click()}
                        >
                            {image ? (
                                <>
                                    <img src={image} alt="Uploaded" className="absolute inset-0 w-full h-full object-contain opacity-90" />
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleClear(); }}
                                        className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white p-2 rounded-full hover:bg-red-500/80 transition-colors z-20"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </>
                            ) : (
                                <div className="text-center p-6 transition-transform duration-300 group-hover:scale-105">
                                    <div className="w-20 h-20 bg-terra-50 text-terra-500 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:bg-white group-hover:shadow-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">Upload Crop Photo</h3>
                                    <p className="text-gray-500 mt-2">Drag & drop or tap to browse</p>
                                </div>
                            )}
                        </div>

                        {image && !diseaseInfo && !isLoading && (
                            <button
                                onClick={handleAnalyze}
                                className="w-full py-5 rounded-2xl bg-terra-600 text-white font-bold text-xl shadow-lg shadow-terra-500/30 hover:bg-terra-500 transition-all transform active:scale-95"
                            >
                                Analyze Disease
                            </button>
                        )}

                        {!image && <PhotoTips />}
                    </div>

                    {/* Right Column: Results (Conditional) */}
                    {(diseaseInfo || isLoading || error) && (
                        <div className="flex flex-col">
                            {isLoading && (
                                <div className="flex-grow flex flex-col items-center justify-center min-h-[300px] bg-white/50 rounded-3xl border border-terra-100">
                                    <Loader />
                                    <p className="text-terra-700 font-medium mt-6 animate-pulse text-lg">Diagnosing symptoms...</p>
                                </div>
                            )}
                            {error && <ErrorMessage message={error} />}
                            {diseaseInfo && !isLoading && <DiseaseResult info={diseaseInfo} />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiseaseDetector;