import React from 'react';
import { Notification } from './Sidebar';

interface Props {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onClearAll: () => void;
}

const typeStyles: Record<Notification['type'], { bg: string; icon: string; border: string }> = {
  success: { bg: 'bg-emerald-50', icon: '✅', border: 'border-emerald-200' },
  info: { bg: 'bg-blue-50', icon: 'ℹ️', border: 'border-blue-200' },
  warning: { bg: 'bg-amber-50', icon: '⚠️', border: 'border-amber-200' },
};

const timeAgo = (ts: string): string => {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
};

const NotificationsPage: React.FC<Props> = ({ notifications, onMarkRead, onMarkAllRead, onClearAll }) => {
  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-terra-950 tracking-tight">Notifications</h1>
          <p className="text-gray-500 text-sm mt-1">{unread > 0 ? `${unread} unread notification${unread > 1 ? 's' : ''}` : 'All caught up!'}</p>
        </div>
        {notifications.length > 0 && (
          <div className="flex gap-2">
            {unread > 0 && (
              <button onClick={onMarkAllRead} className="px-4 py-2 text-xs font-bold text-terra-700 bg-terra-50 border border-terra-200 rounded-lg hover:bg-terra-100 transition-all">
                Mark All Read
              </button>
            )}
            <button onClick={onClearAll} className="px-4 py-2 text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-all">
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* List */}
      {notifications.length === 0 ? (
        <div className="bg-white border border-terra-100 rounded-2xl p-12 text-center">
          <svg className="w-16 h-16 text-terra-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          <p className="text-gray-500 font-medium">No notifications yet</p>
          <p className="text-gray-400 text-sm mt-1">We'll notify you when something happens.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => {
            const style = typeStyles[n.type];
            return (
              <button
                key={n.id}
                onClick={() => !n.read && onMarkRead(n.id)}
                className={`w-full text-left flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 ${
                  n.read
                    ? 'bg-white border-gray-100 opacity-60'
                    : `${style.bg} ${style.border} hover:shadow-md`
                }`}
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{style.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-bold ${n.read ? 'text-gray-600' : 'text-terra-900'}`}>{n.title}</p>
                    {!n.read && <span className="w-2 h-2 bg-terra-500 rounded-full flex-shrink-0"></span>}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{timeAgo(n.timestamp)}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
