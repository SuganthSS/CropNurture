
import React from 'react';
import { LayoutDashboard, Sprout, FileText, ScanLine, CloudSun, History, Settings } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  isOpen: boolean;
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'soil', label: 'Soil Analysis', icon: FileText },
  { id: 'crops', label: 'Plant Recommendations', icon: Sprout },
  { id: 'disease', label: 'Disease Scan', icon: ScanLine },
  { id: 'weather', label: 'Weather & Alerts', icon: CloudSun },
  { id: 'history', label: 'History & Reports', icon: History },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate, isOpen }) => {
  return (
    <aside
      className={clsx(
        "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto",
        !isOpen && "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Sprout className="w-8 h-8 text-green-600 mr-2" />
          <span className="text-xl font-bold text-green-900">CropNurture</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={clsx(
                  "w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className={clsx("w-5 h-5 mr-3", isActive ? "text-green-600" : "text-gray-400")} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-green-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-green-800 mb-1">Upgrade Plan</h4>
            <p className="text-xs text-green-600 mb-3">Get advanced satellite insights.</p>
            <button className="w-full py-2 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors">
              View Plans
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
