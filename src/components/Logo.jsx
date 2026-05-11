import React from 'react';

export default function Logo({ className = "w-10 h-10", showText = false }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex-shrink-0">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
        
        <img 
          src="/logo.png" 
          alt="VentaClara Logo" 
          className="w-full h-full relative z-10 object-contain"
        />
      </div>
      
      {showText && (
        <span className="font-extrabold text-gray-900 dark:text-white tracking-tight text-2xl">
          Venta<span className="text-primary">Clara</span>
        </span>
      )}
    </div>
  );
}
