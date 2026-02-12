
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
       <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-brand-green-600 rounded-full animate-spin"></div>
       <p className="text-brand-green-700 font-semibold">AI is analyzing your data...</p>
    </div>
  );
};

export default Loader;
