import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative text-center max-w-4xl mx-auto py-6 md:py-10 animate-fade-in">
      <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-terra-950 mb-6 leading-tight">
        Cultivate Smarter with <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-terra-500 to-terra-700">Intelligent Analysis</span>
      </h2>
      <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
        Transform your agricultural decisions with real-time soil diagnostics and instant disease detection. 
        Precision farming made simple.
      </p>
    </div>
  );
};

export default Hero;