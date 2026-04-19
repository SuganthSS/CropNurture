import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onHowToUseClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHowToUseClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-4 z-50 mx-4 md:mx-8 transition-all duration-300 ease-in-out ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm border border-white/40 py-3' 
          : 'bg-transparent py-5'
      } rounded-2xl`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Modern Logo Treatment */}
          <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-terra-400 to-terra-600 rounded-xl shadow-glow">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M12 21V7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13C9 13 6 11.5 6 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13C15 13 18 11.5 18 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 21H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-display font-extrabold tracking-tight text-terra-900 leading-none">CropNurture</h1>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-terra-500">AI Assistant</span>
          </div>
        </div>

        <button
          onClick={onHowToUseClick}
          className="group flex items-center space-x-2 px-5 py-2 text-sm font-semibold text-terra-700 bg-terra-50 hover:bg-terra-100 border border-terra-200 rounded-full transition-all duration-300 hover:shadow-md active:scale-95"
          aria-label="How to use CropNurture"
        >
          <span className="group-hover:rotate-12 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span>How to Use</span>
        </button>
      </div>
    </header>
  );
};

export default Header;