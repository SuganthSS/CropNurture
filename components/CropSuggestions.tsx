import React from 'react';
import { CropMatch, getCropEmoji } from '../services/localAnalysis';

interface Props {
  matches: CropMatch[];
  onSelectCrop: (cropName: string) => void;
  selectedCrop: string | null;
}

const getScoreColor = (score: number): string => {
  if (score >= 90) return 'bg-terra-500';
  if (score >= 75) return 'bg-terra-400';
  if (score >= 60) return 'bg-amber-400';
  return 'bg-gray-400';
};

const getScoreTextColor = (score: number): string => {
  if (score >= 90) return 'text-terra-600';
  if (score >= 75) return 'text-terra-500';
  if (score >= 60) return 'text-amber-600';
  return 'text-gray-500';
};

const getScoreLabel = (score: number): string => {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Moderate';
  return 'Low';
};

const CropSuggestions: React.FC<Props> = ({ matches, onSelectCrop, selectedCrop }) => {
  if (matches.length === 0) return null;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-display font-bold text-gray-900">Top Crop Matches</h3>
          <p className="text-xs text-gray-400 mt-0.5">Based on your soil & climate data — click to get full AI analysis</p>
        </div>
        <span className="text-xs font-bold text-terra-600 bg-terra-50 px-3 py-1 rounded-full border border-terra-200">
          {matches.length} matches
        </span>
      </div>

      <div className="space-y-2">
        {matches.map((match, index) => {
          const isTop = index === 0;
          const isSelected = selectedCrop === match.cropName;

          return (
            <button
              key={match.cropName}
              onClick={() => onSelectCrop(match.cropName)}
              className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 group ${
                isSelected
                  ? 'bg-terra-50 border-terra-400 shadow-md'
                  : isTop
                    ? 'bg-white border-terra-200 hover:border-terra-300 hover:shadow-md'
                    : 'bg-white border-gray-100 hover:border-terra-200 hover:shadow-sm'
              }`}
            >
              {/* Rank */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                isTop ? 'bg-terra-500 text-white shadow-sm' : 'bg-gray-100 text-gray-500'
              }`}>
                {index + 1}
              </div>

              {/* Emoji + Name */}
              <div className="flex items-center gap-2 min-w-[120px]">
                <span className="text-xl">{getCropEmoji(match.cropName)}</span>
                <div>
                  <p className={`font-bold text-sm ${isTop ? 'text-terra-900' : 'text-gray-800'}`}>{match.cropName}</p>
                  <p className={`text-[10px] font-semibold ${getScoreTextColor(match.suitabilityScore)}`}>{getScoreLabel(match.suitabilityScore)}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex-1 mx-2">
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getScoreColor(match.suitabilityScore)}`}
                    style={{ width: `${match.suitabilityScore}%` }}
                  />
                </div>
              </div>

              {/* Score */}
              <span className={`text-lg font-display font-extrabold tabular-nums min-w-[50px] text-right ${getScoreTextColor(match.suitabilityScore)}`}>
                {match.suitabilityScore}%
              </span>

              {/* Arrow */}
              <svg className="w-4 h-4 text-gray-300 group-hover:text-terra-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CropSuggestions;
