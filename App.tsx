import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import SoilAnalysis from './components/SoilAnalysis';
import DiseaseDetector from './components/DiseaseDetector';
import HowToUseModal from './components/HowToUseModal';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './components/HomePage';
import Sidebar, { Notification, DashboardTab } from './components/dashboard/Sidebar';
import DashboardHome from './components/dashboard/DashboardHome';
import NotificationsPage from './components/dashboard/NotificationsPage';
import HistoryPage from './components/dashboard/HistoryPage';
import CropTracker from './components/dashboard/CropTracker';
import { TrackedCrop } from './types';
import { getCurrentStageIndex } from './utils/timelineUtils';

const NOTIF_KEY = 'cropnurture_notifications';
const TRACKED_KEY = 'cropnurture_tracked_crops';

const seedNotifications: Notification[] = [
  { id: '1', type: 'info', title: 'Welcome to CropNurture!', message: 'Start by running your first soil analysis to get AI-powered crop recommendations.', timestamp: new Date(Date.now() - 3600000).toISOString(), read: false },
  { id: '2', type: 'info', title: 'Try Soil Analysis', message: 'Input your soil pH, NPK levels, and climate data to discover the best crops for your farm.', timestamp: new Date(Date.now() - 7200000).toISOString(), read: false },
  { id: '3', type: 'success', title: 'Weather Data Available', message: 'Use the auto-fill feature to fetch real-time weather data based on your location.', timestamp: new Date(Date.now() - 10800000).toISOString(), read: false },
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(NOTIF_KEY);
      if (stored) {
        const parsed: Notification[] = JSON.parse(stored);
        setNotifications(parsed);
        setUnreadCount(parsed.filter(n => !n.read).length);
      } else {
        localStorage.setItem(NOTIF_KEY, JSON.stringify(seedNotifications));
        setNotifications(seedNotifications);
        setUnreadCount(seedNotifications.length);
      }
    } catch {
      setNotifications(seedNotifications);
      setUnreadCount(seedNotifications.length);
    }
  }, []);

  const saveNotifications = (updated: Notification[]) => {
    setNotifications(updated);
    setUnreadCount(updated.filter(n => !n.read).length);
    localStorage.setItem(NOTIF_KEY, JSON.stringify(updated));
  };

  const markRead = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem(NOTIF_KEY, JSON.stringify(updated));
      setUnreadCount(updated.filter(n => !n.read).length);
      return updated;
    });
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem(NOTIF_KEY, JSON.stringify(updated));
      setUnreadCount(0);
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    saveNotifications([]);
  }, []);

  const addNotification = useCallback((type: 'success' | 'info' | 'warning', title: string, message: string) => {
    const newNotif: Notification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => {
      const updated = [newNotif, ...prev];
      localStorage.setItem(NOTIF_KEY, JSON.stringify(updated));
      setUnreadCount(updated.filter(n => !n.read).length);
      return updated;
    });
  }, []);

  const tabTitles: Record<DashboardTab, string> = {
    home: 'Dashboard',
    soil: 'Soil Analysis',
    disease: 'Health Scan',
    history: 'History',
    tracker: 'Crop Tracker',
    notifications: 'Notifications',
  };

  // Notification scheduling: stage transitions + 2 daily reminders per tracked crop
  useEffect(() => {
    const DAILY_KEY = 'cropnurture_daily_notif_tracker';

    const getDailyTracker = (): Record<string, { date: string; count: number }> => {
      try {
        return JSON.parse(localStorage.getItem(DAILY_KEY) || '{}');
      } catch { return {}; }
    };

    const morningMessages = [
      (crop: string, stage: string, task: string) => ({ title: `☀️ Morning Check: ${crop}`, message: `Current stage: ${stage}. Today's priority: ${task}` }),
      (crop: string, stage: string, task: string) => ({ title: `🌱 ${crop} — Daily Task`, message: `You're in the ${stage} stage. Remember to: ${task}` }),
      (crop: string, stage: string, task: string) => ({ title: `📋 ${crop} Reminder`, message: `${stage} stage is active. Key task: ${task}` }),
    ];

    const eveningMessages = [
      (crop: string, stage: string, daysLeft: number) => ({ title: `🌙 ${crop} — Progress Update`, message: `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left in ${stage} stage. Keep up the great work!` }),
      (crop: string, stage: string, daysLeft: number) => ({ title: `📊 ${crop} Status`, message: `${stage} stage: ${daysLeft} day${daysLeft !== 1 ? 's' : ''} remaining. Check your Crop Tracker for details.` }),
      (crop: string, stage: string, daysLeft: number) => ({ title: `🔔 ${crop} Evening Update`, message: `Your ${stage} stage has ${daysLeft} day${daysLeft !== 1 ? 's' : ''} to go. Review tomorrow's tasks in Crop Tracker.` }),
    ];

    const checkTrackedCrops = () => {
      try {
        const saved = localStorage.getItem(TRACKED_KEY);
        if (!saved) return;
        const tracked: TrackedCrop[] = JSON.parse(saved);
        let changed = false;
        const dailyTracker = getDailyTracker();
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        tracked.forEach(crop => {
          if (crop.status !== 'active') return;
          const now = Date.now();

          // 1. Stage transition notifications
          crop.stages.forEach((stage, i) => {
            const stageStart = new Date(stage.startDate).getTime();
            if (now >= stageStart && !stage.notified) {
              addNotification(
                'info',
                `${crop.cropName}: ${stage.name} Started`,
                `Stage ${i + 1} of ${crop.stages.length} has begun. Check your tasks in Crop Tracker.`
              );
              stage.notified = true;
              changed = true;
            }
          });

          // 2. Check completion
          const lastStage = crop.stages[crop.stages.length - 1];
          if (now >= new Date(lastStage.endDate).getTime() && crop.status === 'active') {
            crop.status = 'completed';
            addNotification('success', `${crop.cropName}: Growth Complete! 🎉`, 'All growth stages have been completed. Time to harvest!');
            changed = true;
          }

          // 3. Daily reminders (2 per day per crop)
          if (crop.status !== 'active') return;

          const trackerKey = `crop_${crop.id}`;
          const entry = dailyTracker[trackerKey];
          const todayCount = (entry && entry.date === today) ? entry.count : 0;

          if (todayCount >= 2) return; // already sent 2 today

          // Find current stage
          const currentStageIdx = crop.stages.findIndex(s =>
            now >= new Date(s.startDate).getTime() && now < new Date(s.endDate).getTime()
          );
          if (currentStageIdx < 0) return;

          const currentStage = crop.stages[currentStageIdx];
          const daysLeft = Math.max(0, Math.ceil((new Date(currentStage.endDate).getTime() - now) / 86400000));
          const randomTask = currentStage.tasks[Math.floor(Math.random() * currentStage.tasks.length)] || 'Monitor crop health';

          if (todayCount === 0) {
            // Morning reminder
            const msgGen = morningMessages[Math.floor(Math.random() * morningMessages.length)];
            const msg = msgGen(crop.cropName, currentStage.name, randomTask);
            addNotification('info', msg.title, msg.message);
          } else {
            // Afternoon/evening reminder
            const msgGen = eveningMessages[Math.floor(Math.random() * eveningMessages.length)];
            const msg = msgGen(crop.cropName, currentStage.name, daysLeft);
            addNotification('info', msg.title, msg.message);
          }

          dailyTracker[trackerKey] = { date: today, count: todayCount + 1 };
          localStorage.setItem(DAILY_KEY, JSON.stringify(dailyTracker));
        });

        if (changed) {
          localStorage.setItem(TRACKED_KEY, JSON.stringify(tracked));
        }
      } catch { /* ignore */ }
    };

    checkTrackedCrops();
    // Check every 3 minutes — ensures both daily notifications get sent across the session
    const interval = setInterval(checkTrackedCrops, 3 * 60 * 1000);
    return () => clearInterval(interval);
  }, [addNotification]);

  return (
    <div className="min-h-screen bg-terra-50 selection:bg-terra-200 selection:text-terra-900">
      {/* Ambient BG */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-terra-100/40 blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-blue-50/40 blur-[100px]"></div>
      </div>

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        unreadCount={unreadCount}
      />

      {/* Main Content */}
      <div className="lg:ml-[280px] relative z-10 min-h-screen flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-terra-100 px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-terra-800 hover:bg-terra-50 rounded-lg transition-colors" aria-label="Open menu">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <h2 className="text-lg font-display font-bold text-terra-900">{tabTitles[activeTab]}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsModalOpen(true)} className="p-2 text-terra-600 hover:bg-terra-50 rounded-lg transition-colors" aria-label="How to use" title="How to Use">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
            <button onClick={() => { setActiveTab('notifications'); }} className="relative p-2 text-terra-600 hover:bg-terra-50 rounded-lg transition-colors" aria-label="Notifications">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{unreadCount > 9 ? '9+' : unreadCount}</span>
              )}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className={activeTab === 'home' ? '' : 'hidden'}><DashboardHome onNavigate={setActiveTab} /></div>
            <div className={activeTab === 'soil' ? '' : 'hidden'}>
              <SoilAnalysis
                onAnalysisComplete={(cropName) => {
                  addNotification('success', 'Analysis Complete', `Your soil analysis for ${cropName} is ready. View the full report now.`);
                }}
              />
            </div>
            <div className={activeTab === 'disease' ? '' : 'hidden'}><DiseaseDetector /></div>
            <div className={activeTab === 'history' ? '' : 'hidden'}><HistoryPage /></div>
            <div className={activeTab === 'tracker' ? '' : 'hidden'}><CropTracker /></div>
            {activeTab === 'notifications' && (
              <NotificationsPage
                notifications={notifications}
                onMarkRead={markRead}
                onMarkAllRead={markAllRead}
                onClearAll={clearAll}
              />
            )}
          </div>
        </main>
      </div>

      {isModalOpen && <HowToUseModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default App;