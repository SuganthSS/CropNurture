import React, { useState, useEffect } from 'react';
import { HistoryItem } from '../../types';
import { getCropEmoji } from '../../services/localAnalysis';
import DashboardView from '../DashboardView';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cropAnalysisHistory');
      if (saved) setHistory(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  const handleClear = () => {
    if (confirm('Clear all analysis history?')) {
      localStorage.removeItem('cropAnalysisHistory');
      setHistory([]);
    }
  };

  const handleDelete = (id: number) => {
    const updated = history.filter(h => h.id !== id);
    localStorage.setItem('cropAnalysisHistory', JSON.stringify(updated));
    setHistory(updated);
  };

  // Show DashboardView for selected history item
  if (selectedItem) {
    return (
      <DashboardView
        recommendation={selectedItem.recommendation}
        soilData={selectedItem.soilData}
        onBack={() => setSelectedItem(null)}
      />
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-terra-950 tracking-tight">Analysis History</h1>
          <p className="text-gray-500 text-sm mt-1">{history.length} past {history.length === 1 ? 'analysis' : 'analyses'} — click to view details</p>
        </div>
        {history.length > 0 && (
          <button onClick={handleClear} className="px-4 py-2 text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-all">
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white border border-terra-100 rounded-2xl p-12 text-center">
          <svg className="w-16 h-16 text-terra-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <p className="text-gray-500 font-medium">No analyses yet</p>
          <p className="text-gray-400 text-sm mt-1">Run a soil analysis to see your history here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="w-full text-left bg-white border border-terra-100 rounded-2xl p-5 hover:shadow-lg hover:border-terra-200 hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{getCropEmoji(item.recommendation.cropName)}</span>
                    <h3 className="text-lg font-display font-bold text-terra-900">{item.recommendation.cropName}</h3>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{item.timestamp}</span>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-terra-500 transition-colors ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{item.recommendation.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { l: 'pH', v: item.soilData.ph.toFixed(1) },
                      { l: 'N', v: `${item.soilData.nitrogen}` },
                      { l: 'P', v: `${item.soilData.phosphorus}` },
                      { l: 'K', v: `${item.soilData.potassium}` },
                      { l: 'Temp', v: `${item.soilData.temperature}°C` },
                      { l: 'Rain', v: `${item.soilData.rainfall}mm` },
                    ].map((p, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-xs bg-terra-50 text-terra-700 px-2.5 py-1 rounded-lg font-medium">
                        <span className="text-terra-400 font-bold">{p.l}:</span> {p.v}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                  className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 p-1"
                  title="Delete"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
