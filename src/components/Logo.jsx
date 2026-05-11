import React from 'react';

export default function Logo({ className = "w-10 h-10", showText = false }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex-shrink-0">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
        
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full relative z-10 filter drop-shadow-sm"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Shape - Stylized V / Diamond */}
          <path 
            d="M50 15L85 45L50 85L15 45L50 15Z" 
            fill="url(#logo-gradient)" 
            className="transition-all duration-500"
          />
          
          {/* Inner accent - Light / Growth */}
          <path 
            d="M50 30L70 48L50 72L30 48L50 30Z" 
            fill="white" 
            fillOpacity="0.4"
          />
          
          {/* Top light tip */}
          <circle cx="50" cy="15" r="4" fill="#2DD4BF" />
          
          <defs>
            <linearGradient id="logo-gradient" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0EA5E9" />
              <stop offset="1" stopColor="#2DD4BF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {showText && (
        <span className="font-extrabold text-gray-900 dark:text-white tracking-tight text-2xl">
          Venta<span className="text-primary">Clara</span>
        </span>
      )}
    </div>
  );
}
