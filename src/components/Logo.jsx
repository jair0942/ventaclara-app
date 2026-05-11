import React from 'react';

export default function Logo({ className = "h-10", showText = false }) {
  // Nota: El logo proporcionado es horizontal y tiene fondo blanco.
  // Lo envolvemos en un contenedor controlado para que no se desborde y se vea bien en modo oscuro.
  return (
    <div className={`flex items-center ${className}`}>
      <div className="h-full aspect-[3/1] bg-white rounded-lg p-1.5 shadow-sm overflow-hidden flex items-center justify-center">
        <img 
          src="/logo.png" 
          alt="VentaClara Logo" 
          className="h-full w-full object-contain"
        />
      </div>
      
      {showText && (
        <span className="ml-3 font-extrabold text-gray-900 dark:text-white tracking-tight text-xl">
          VentaClara
        </span>
      )}
    </div>
  );
}
