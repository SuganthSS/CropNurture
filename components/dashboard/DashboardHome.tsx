import React from 'react';
import { useAuth } from '../../context/AuthContext';

const DashboardHome: React.FC<{ onNavigate: (tab: 'soil' | 'disease') => void }> = ({ onNavigate }) => {
  const { user } = useAuth();
  const firstName = user?.fullName.split(' ')[0] || 'Farmer';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="animate-fade-in">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-extrabold text-terra-950 tracking-tight">
          {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-terra-500 to-terra-700">{firstName}</span> 👋
        </h1>
        <p className="text-gray-500 mt-2">Welcome to your agricultural intelligence dashboard.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <button onClick={() => onNavigate('soil')} className="group text-left bg-white border border-terra-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 hover:border-terra-200 transition-all duration-300">
          <div className="w-12 h-12 bg-terra-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-terra-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
          </div>
          <h3 className="text-lg font-display font-bold text-terra-900 mb-1">Soil Analysis</h3>
          <p className="text-sm text-gray-500">Analyze your soil composition and get AI-powered crop recommendations.</p>
          <span className="inline-flex items-center gap-1 text-terra-600 text-sm font-semibold mt-3 group-hover:gap-2 transition-all">
            Start Analysis <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </span>
        </button>

        <button onClick={() => onNavigate('disease')} className="group text-left bg-white border border-terra-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 hover:border-terra-200 transition-all duration-300">
          <div className="w-12 h-12 bg-terra-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-terra-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <h3 className="text-lg font-display font-bold text-terra-900 mb-1">Health Scan</h3>
          <p className="text-sm text-gray-500">Upload a crop photo for AI-powered disease detection and treatment advice.</p>
          <span className="inline-flex items-center gap-1 text-terra-600 text-sm font-semibold mt-3 group-hover:gap-2 transition-all">
            Scan Now <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </span>
        </button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: '🌾', label: '22+ Crops', desc: 'Supported varieties' },
          { icon: '📍', label: '36 Districts', desc: 'Tamil Nadu coverage' },
          { icon: '🧪', label: '18 Fertilizers', desc: 'Nutrient protocols' },
        ].map((s, i) => (
          <div key={i} className="bg-white/80 border border-terra-100 rounded-xl p-5 text-center">
            <span className="text-2xl block mb-2">{s.icon}</span>
            <p className="font-bold text-terra-900 text-lg">{s.label}</p>
            <p className="text-xs text-gray-500">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
