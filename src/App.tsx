
import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Overview } from './components/Sections/Overview';
import { SoilAnalysis } from './components/Sections/SoilAnalysis';
import { PlantRecommendations } from './components/Sections/PlantRecommendations';
import { DiseaseScan } from './components/Sections/DiseaseScan';
import { ChatAssistant } from './components/Shared/ChatAssistant';

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <Overview />;
      case 'soil': return <SoilAnalysis />;
      case 'crops': return <PlantRecommendations />;
      case 'disease': return <DiseaseScan />;
      default: return <Overview />;
    }
  };

  const getTitle = () => {
    switch (activeSection) {
      case 'overview': return 'Farm Overview';
      case 'soil': return 'Soil Analysis';
      case 'crops': return 'Plant Recommendations';
      case 'disease': return 'Disease Detection';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection} 
        onNavigate={(section) => {
          setActiveSection(section);
          setSidebarOpen(false);
        }} 
        isOpen={sidebarOpen}
      />

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuClick={() => setSidebarOpen(true)} 
          title={getTitle()} 
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>

      <ChatAssistant />
    </div>
  );
}

export default App;
