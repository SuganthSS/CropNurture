
import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { SoilData } from '../../types';

interface Props {
  data: SoilData;
}

export const SoilRadarChart: React.FC<Props> = ({ data }) => {
  // Normalize data for the chart (0-100 scale approximation)
  const chartData = [
    { subject: 'pH', A: data.ph * 10, fullMark: 140 }, // Scaled pH
    { subject: 'Nitrogen', A: data.nitrogen, fullMark: 100 },
    { subject: 'Phosphorus', A: data.phosphorus, fullMark: 100 },
    { subject: 'Potassium', A: data.potassium, fullMark: 100 },
    { subject: 'Organic', A: data.organicMatter * 10, fullMark: 100 },
    { subject: 'Moisture', A: data.moisture, fullMark: 100 },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Current Soil"
            dataKey="A"
            stroke="#16a34a"
            strokeWidth={2}
            fill="#22c55e"
            fillOpacity={0.3}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
