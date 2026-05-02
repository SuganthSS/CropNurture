import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TrackedCrop } from '../../types';
import { getCurrentStageIndex, getStageProgress, getOverallProgress, formatShortDate, daysUntil } from '../../utils/timelineUtils';
import { getCropEmoji } from '../../services/localAnalysis';

const TRACKED_KEY = 'cropnurture_tracked_crops';

const CropTracker: React.FC = () => {
  const [trackedCrops, setTrackedCrops] = useState<TrackedCrop[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadFromStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem(TRACKED_KEY);
      setTrackedCrops(saved ? JSON.parse(saved) : []);
    } catch { /* ignore */ }
  }, []);

  // Load on mount
  useEffect(() => { loadFromStorage(); }, [loadFromStorage]);

  // Re-read localStorage whenever tracking data changes (custom event from DashboardView)
  useEffect(() => {
    const handler = () => loadFromStorage();
    window.addEventListener('cropnurture_tracking_updated', handler);
    // Also re-read periodically in case of tab switch
    const interval = setInterval(loadFromStorage, 2000);
    return () => {
      window.removeEventListener('cropnurture_tracking_updated', handler);
      clearInterval(interval);
    };
  }, [loadFromStorage]);

  const handleStopTracking = (id: string) => {
    if (!confirm('Stop tracking this crop?')) return;
    const updated = trackedCrops.filter(c => c.id !== id);
    localStorage.setItem(TRACKED_KEY, JSON.stringify(updated));
    setTrackedCrops(updated);
    if (expandedId === id) setExpandedId(null);
  };

  const activeCrops = trackedCrops.filter(c => c.status === 'active');

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-terra-950 tracking-tight">Crop Tracker</h1>
          <p className="text-gray-500 text-sm mt-1">
            {activeCrops.length > 0
              ? `${activeCrops.length} active crop${activeCrops.length > 1 ? 's' : ''} being tracked`
              : 'No crops being tracked — start from a crop analysis'}
          </p>
        </div>
      </div>

      {trackedCrops.length === 0 ? (
        <div className="bg-white border border-terra-100 rounded-2xl p-12 text-center">
          <svg className="w-16 h-16 text-terra-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 font-medium">No crops tracked yet</p>
          <p className="text-gray-400 text-sm mt-1">Run a soil analysis, then click "Start Tracking" on the growth timeline.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {trackedCrops.map((crop) => {
            const currentIdx = getCurrentStageIndex(crop.stages);
            const overall = getOverallProgress(crop.stages);
            const currentStage = currentIdx >= 0 ? crop.stages[currentIdx] : null;
            const progress = currentStage ? getStageProgress(currentStage) : 0;
            const isExpanded = expandedId === crop.id;
            const isCompleted = overall >= 100;

            return (
              <div key={crop.id} className="bg-white border border-terra-100 rounded-2xl overflow-hidden transition-all hover:shadow-md">
                {/* Header */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : crop.id)}
                  className="w-full text-left p-5 flex items-center gap-4"
                >
                  <span className="text-2xl">{getCropEmoji(crop.cropName)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-bold text-terra-900">{crop.cropName}</h3>
                      {isCompleted ? (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">COMPLETED</span>
                      ) : (
                        <span className="text-[10px] font-bold text-terra-600 bg-terra-50 px-2 py-0.5 rounded-full">ACTIVE</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>Started {formatShortDate(crop.startDate)}</span>
                      {currentStage && <span>• Stage: <strong className="text-terra-700">{currentStage.name}</strong></span>}
                    </div>
                    {/* Overall Progress */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500' : 'bg-terra-500'}`} style={{ width: `${overall}%` }} />
                      </div>
                      <span className="text-xs font-bold text-terra-600 tabular-nums">{overall}%</span>
                    </div>
                  </div>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-gray-100 animate-fade-in">
                    {/* Current Stage Card */}
                    {currentStage && (
                      <div className="mt-4 bg-terra-50 border border-terra-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-display font-bold text-terra-900">🌱 Currently: {currentStage.name}</h4>
                          <span className="text-xs font-bold text-terra-600 bg-white px-2 py-0.5 rounded-full border border-terra-200">
                            Day {currentStage.durationDays - daysUntil(currentStage.endDate)} of {currentStage.durationDays}
                          </span>
                        </div>
                        {/* Stage Progress */}
                        <div className="h-2 bg-terra-200 rounded-full overflow-hidden mb-3">
                          <div className="h-full bg-terra-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                        {/* Tasks */}
                        <div className="space-y-1.5">
                          <p className="text-xs font-bold text-terra-700 uppercase tracking-wider">📋 Tasks for this stage:</p>
                          {currentStage.tasks.map((task, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-terra-500 mt-0.5">•</span>
                              <span>{task}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-terra-200 text-xs text-gray-500">
                          <span>📅 {formatShortDate(currentStage.startDate)} → {formatShortDate(currentStage.endDate)}</span>
                          {currentIdx < crop.stages.length - 1 && (
                            <span>⏭ Next: {crop.stages[currentIdx + 1].name} ({formatShortDate(crop.stages[currentIdx + 1].startDate)})</span>
                          )}
                        </div>
                      </div>
                    )}

                    {isCompleted && (
                      <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                        <p className="text-emerald-700 font-bold">🎉 All growth stages completed!</p>
                        <p className="text-emerald-600 text-sm mt-1">Congratulations on completing the full growth cycle.</p>
                      </div>
                    )}

                    {/* All Stages Timeline */}
                    <div className="mt-4">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Full Timeline</p>
                      <div className="space-y-2">
                        {crop.stages.map((stage, i) => {
                          const now = Date.now();
                          const stageStart = new Date(stage.startDate).getTime();
                          const stageEnd = new Date(stage.endDate).getTime();
                          const isPast = now >= stageEnd;
                          const isCurrent = now >= stageStart && now < stageEnd;

                          return (
                            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                              isCurrent ? 'bg-terra-50 border-terra-300' : isPast ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-100'
                            }`}>
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                isPast ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-terra-500 text-white' : 'bg-gray-200 text-gray-500'
                              }`}>
                                {isPast ? '✓' : i + 1}
                              </div>
                              <div className="flex-1">
                                <span className={`text-sm font-bold ${isCurrent ? 'text-terra-900' : 'text-gray-700'}`}>{stage.name}</span>
                                <span className="text-xs text-gray-400 ml-2">{stage.durationDays} days</span>
                              </div>
                              <span className="text-xs text-gray-400">{formatShortDate(stage.startDate)} → {formatShortDate(stage.endDate)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Stop Tracking */}
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleStopTracking(crop.id)}
                        className="px-4 py-2 text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-all"
                      >
                        Stop Tracking
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CropTracker;
