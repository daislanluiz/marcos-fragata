
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-cyan-600 to-blue-700 rounded-xl overflow-hidden shadow-lg animate-float">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
          {/* Stylized sail/ship shape */}
          <path d="M10 32L14 10L30 26L10 32Z" fill="white" fillOpacity="0.2" />
          <path d="M12 28L15 12L28 24L12 28Z" fill="white" />
          <path className="logo-wave" d="M5 34C10 32 15 36 20 34C25 32 30 36 35 34" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-xl font-black font-outfit text-white tracking-tighter uppercase italic">Fragata</span>
        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest -mt-1">Fretes & Mudanças</span>
      </div>
    </div>
  );
};

export default Logo;
