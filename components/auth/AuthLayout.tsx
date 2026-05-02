import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-terra-50">
      
      {/* Ambient background — same style as the main app */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-terra-100/50 blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-50/60 blur-[100px]"></div>
        <div className="absolute top-[50%] left-[50%] w-[30%] h-[30%] rounded-full bg-terra-200/30 blur-[100px] animate-auth-pulse"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-slide-up">
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-terra-400 to-terra-600 rounded-2xl shadow-lg shadow-terra-500/20 mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 21V7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 13C9 13 6 11.5 6 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 13C15 13 18 11.5 18 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 21H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-3xl font-display font-extrabold text-terra-900 tracking-tight">CropNurture</h1>
          <p className="text-terra-500 text-sm font-medium mt-1 tracking-wide">AI-Powered Agricultural Intelligence</p>
        </div>

        {/* White Card */}
        <div className="bg-white/80 backdrop-blur-md border border-terra-100 rounded-3xl p-8 shadow-soft-xl">
          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs mt-6">
          &copy; {new Date().getFullYear()} CropNurture AI. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
