
import React from 'react';
import { SoilData } from '../types';

interface RadarChartProps {
  data: SoilData;
}

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const size = 300;
  const center = size / 2;
  const radius = 100; // Max radius for the chart itself
  
  const axes: { label: string; key: keyof SoilData; max: number }[] = [
    { label: 'pH', key: 'ph', max: 14 },
    { label: 'Nitrogen', key: 'nitrogen', max: 200 },
    { label: 'Phosphorus', key: 'phosphorus', max: 200 },
    { label: 'Potassium', key: 'potassium', max: 200 },
    { label: 'Temp', key: 'temperature', max: 50 },
    { label: 'Humidity', key: 'humidity', max: 100 },
    { label: 'Rainfall', key: 'rainfall', max: 3000 },
  ];

  const valueToPoint = (value: number, index: number, max: number) => {
    const angle = (Math.PI * 2 * index) / axes.length - Math.PI / 2;
    // normalize value between 0 and 1. Handle potential negative temps by clamping 0.
    const normalized = Math.max(0, Math.min(1, value / max));
    const x = center + Math.cos(angle) * radius * normalized;
    const y = center + Math.sin(angle) * radius * normalized;
    return { x, y };
  };

  const points = axes.map((axis, i) => {
    const val = data[axis.key];
    const { x, y } = valueToPoint(val, i, axis.max);
    return `${x},${y}`;
  }).join(' ');

  // Create grid polygons (20%, 40%, 60%, 80%, 100%)
  const grids = [0.2, 0.4, 0.6, 0.8, 1.0].map(level => {
    return axes.map((_, i) => {
      const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
      const x = center + Math.cos(angle) * radius * level;
      const y = center + Math.sin(angle) * radius * level;
      return `${x},${y}`;
    }).join(' ');
  });

  return (
    <div className="flex justify-center py-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* Grid Lines */}
        {grids.map((polyPoints, i) => (
          <polygon
            key={i}
            points={polyPoints}
            fill={i === grids.length - 1 ? "rgba(240, 253, 244, 0.5)" : "none"}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* Axes Lines & Labels */}
        {axes.map((axis, i) => {
          const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius;
          
          // Label pos with a bit more offset
          const labelRadius = radius + 20;
          const labelX = center + Math.cos(angle) * labelRadius;
          const labelY = center + Math.sin(angle) * labelRadius;

          return (
            <g key={i}>
              <line x1={center} y1={center} x2={x} y2={y} stroke="#e5e7eb" strokeWidth="1" />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[10px] fill-gray-500 font-bold uppercase tracking-wider"
                style={{ fontSize: '10px' }}
              >
                {axis.label}
              </text>
            </g>
          );
        })}

        {/* Data Polygon */}
        <polygon
          points={points}
          fill="rgba(34, 197, 94, 0.4)"
          stroke="#16a34a"
          strokeWidth="2"
        />
        
         {/* Data Points */}
         {axes.map((axis, i) => {
            const val = data[axis.key];
            const { x, y } = valueToPoint(val, i, axis.max);
            return (
                <circle key={i} cx={x} cy={y} r="3" fill="#15803d" />
            );
        })}
      </svg>
    </div>
  );
};

export default RadarChart;
