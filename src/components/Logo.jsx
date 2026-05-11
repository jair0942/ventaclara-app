import React from 'react';

export default function Logo({ className = "w-40", showText = false }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="VentaClara Logo" 
        className="w-full h-auto object-contain"
        style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))" }}
      />
      {showText && (
        <span className="ml-3 font-extrabold text-gray-900 dark:text-white tracking-tight text-xl">
          VentaClara
        </span>
      )}
    </div>
  );
}
