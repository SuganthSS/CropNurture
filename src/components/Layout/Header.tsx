
import React from 'react';
import { Menu, Bell, HelpCircle, Globe, Moon, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, title }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden mr-2">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="hidden sm:flex items-center px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 rounded-full hover:bg-green-100 transition-colors">
          <HelpCircle className="w-4 h-4 mr-2" />
          How to Use
        </button>
        
        <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block" />

        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Globe className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Moon className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <button className="ml-2 p-1 rounded-full bg-gray-100 border border-gray-200">
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
            JD
          </div>
        </button>
      </div>
    </header>
  );
};
