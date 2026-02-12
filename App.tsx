import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import SoilAnalysis from './components/SoilAnalysis';
import DiseaseDetector from './components/DiseaseDetector';
import HowToUseModal from './components/HowToUseModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'soil' | 'disease'>('soil');

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-terra-50 selection:bg-terra-200 selection:text-terra-900">
      {/* Background Ambient Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-terra-100/50 blur-[120px]"></div>
         <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-50/60 blur-[100px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header onHowToUseClick={() => setIsModalOpen(true)} />
        
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Hero />
          
          {/* Mode Switcher / Tabs */}
          <div className="flex justify-center mb-8 mt-6 animate-fade-in">
            <div className="bg-white/60 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-terra-100 inline-flex">
              <button
                onClick={() => setActiveTab('soil')}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'soil'
                    ? 'bg-terra-600 text-white shadow-md'
                    : 'text-gray-500 hover:text-terra-600 hover:bg-terra-50'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Soil Analysis
              </button>
              <button
                onClick={() => setActiveTab('disease')}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'disease'
                    ? 'bg-terra-600 text-white shadow-md'
                    : 'text-gray-500 hover:text-terra-600 hover:bg-terra-50'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Health Scan
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="max-w-6xl mx-auto min-h-[600px]">
             <div className={`transition-all duration-500 ${activeTab === 'soil' ? 'block animate-fade-in' : 'hidden'}`}>
                 <SoilAnalysis />
             </div>
             <div className={`transition-all duration-500 ${activeTab === 'disease' ? 'block animate-fade-in' : 'hidden'}`}>
                 <DiseaseDetector />
             </div>
          </div>

        </main>
        <Footer />
      </div>
      
      {isModalOpen && <HowToUseModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default App;