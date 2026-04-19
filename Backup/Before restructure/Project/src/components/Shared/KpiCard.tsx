
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { clsx } from 'clsx';

interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  subtext?: string;
  color?: 'green' | 'blue' | 'orange' | 'red';
}

export const KpiCard: React.FC<KpiCardProps> = ({ title, value, trend, trendValue, subtext, color = 'green' }) => {
  const colors = {
    green: 'bg-green-50 text-green-700 border-green-100',
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    orange: 'bg-orange-50 text-orange-700 border-orange-100',
    red: 'bg-red-50 text-red-700 border-red-100',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</h3>
        <div className={clsx("p-2 rounded-lg border", colors[color])}>
          {trend === 'up' && <TrendingUp className="w-4 h-4" />}
          {trend === 'down' && <TrendingDown className="w-4 h-4" />}
          {trend === 'neutral' && <Minus className="w-4 h-4" />}
          {!trend && <div className="w-4 h-4 rounded-full bg-current opacity-50" />}
        </div>
      </div>
      
      <div className="flex items-baseline space-x-2">
        <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
        {trendValue && (
          <span className={clsx("text-sm font-medium", 
            trend === 'up' ? "text-green-600" : trend === 'down' ? "text-red-600" : "text-gray-500"
          )}>
            {trend === 'up' ? '+' : ''}{trendValue}
          </span>
        )}
      </div>
      
      {subtext && <p className="mt-2 text-sm text-gray-500">{subtext}</p>}
    </div>
  );
};
