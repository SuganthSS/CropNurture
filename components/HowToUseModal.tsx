import React, { useEffect } from 'react';

interface HowToUseModalProps {
  onClose: () => void;
}

const Tip: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-brand-green-100 flex items-center justify-center">
            <span className="text-xl">{icon}</span>
        </div>
        <div>
            <h4 className="font-bold text-gray-800">{title}</h4>
            <p className="text-sm text-gray-600">{children}</p>
        </div>
    </div>
);

const HowToUseModal: React.FC<HowToUseModalProps> = ({ onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="how-to-use-title"
        >
            <div 
                className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 id="how-to-use-title" className="text-2xl md:text-3xl font-bold text-brand-green-800">
                        How to Use CropNurture AI
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close instructions"
                    >
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="space-y-8">
                    {/* Soil Analysis Section */}
                    <section>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2 flex items-center">
                           <span className="text-2xl mr-3">🌱</span> Soil Analysis & Crop Recommendation
                        </h3>
                        <div className="space-y-4">
                            <Tip icon="🧪" title="Accurate Data is Key">
                                For the best recommendations, use data from a recent soil test kit. If you don't have one, use estimates based on your region's typical soil.
                            </Tip>
                             <Tip icon="🌍" title="Use Local Averages">
                                When inputting climate data like temperature and rainfall, use yearly averages for your specific location for more reliable results.
                            </Tip>
                             <Tip icon="🎚️" title="Adjust the Sliders">
                                Each slider represents a crucial factor for plant growth. Move them to match your conditions as closely as possible to get a tailored recommendation.
                            </Tip>
                        </div>
                    </section>

                    {/* Disease Detection Section */}
                     <section>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2 flex items-center">
                           <span className="text-2xl mr-3">📸</span> Crop Disease Detection
                        </h3>
                        <div className="space-y-4">
                            <Tip icon="🎯" title="Focus on the Problem">
                                Take a clear, close-up photo of the affected area (e.g., a single leaf showing spots, discoloration, or pests).
                            </Tip>
                             <Tip icon="☀️" title="Good Lighting is Crucial">
                                Use natural, even lighting. Avoid harsh shadows or direct sunlight which can hide important details. Overcast days are often best.
                            </Tip>
                             <Tip icon="📄" title="Use a Plain Background">
                                If possible, place the leaf or affected part against a neutral, plain background (like a piece of paper or cardboard) to help the AI focus.
                            </Tip>
                             <Tip icon="🌿" title="One Subject Per Photo">
                                Ensure the photo contains only one plant or leaf to avoid confusing the analysis. This helps the AI provide a more accurate diagnosis.
                            </Tip>
                        </div>
                    </section>
                </div>

                <div className="mt-8 text-center">
                     <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-8 py-3 bg-brand-green-600 text-white font-bold rounded-lg hover:bg-brand-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-500 transition-all duration-300"
                    >
                        Got it, let's get started!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HowToUseModal;
