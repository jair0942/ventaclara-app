import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';

// Barra de navegación optimizada para móvil y desktop
export default function NavBar() {
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();

  const items = [
    { path: '/', label: 'Inicio', icon: '🏠' },
    { path: '/registrar', label: 'Vender', icon: '➕' },
    { path: '/historial', label: 'Historial', icon: '📋' },
    { path: '/analisis', label: 'Análisis', icon: '📊' }
  ];

  return (
    <>
      {/* Header superior con botón de tema mejorado (SOLO MÓVIL) */}
      <div className="fixed md:hidden top-0 left-0 right-0 z-50 bg-white/90 dark:bg-card-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo className="h-8" />
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? 'bg-yellow-100 text-yellow-600 shadow-lg shadow-yellow-200'
                  : 'bg-gray-800 text-yellow-300 shadow-lg shadow-gray-300'
              }`}
              title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            <Link
              to="/ajustes"
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl hover:scale-110 transition-transform hover:bg-gray-200 dark:hover:bg-gray-600"
              title="Ajustes"
            >
              ⚙️
            </Link>
          </div>
        </div>
      </div>

      {/* Espaciador para el header fijo (SOLO MÓVIL) */}
      <div className="h-14 md:hidden" />

      {/* Barra inferior de navegación - optimizada para móvil */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-card-dark/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 z-40 md:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
          {items.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-200 ${
                  isActive
                    ? 'text-primary scale-105'
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <span className={`text-2xl transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                  {item.icon}
                </span>
                <span className={`text-[10px] font-semibold ${isActive ? 'text-primary' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-1 w-6 h-1 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Navegación lateral - solo en desktop */}
      <nav className="hidden md:fixed md:left-0 md:top-0 md:bottom-0 md:w-64 md:bg-white/90 md:dark:bg-card-dark/90 md:backdrop-blur-xl md:border-r md:border-gray-200/50 md:dark:border-white/5 md:flex md:flex-col md:py-8 md:px-5 md:z-30">
        
        {/* Logo de la aplicación (Desktop) */}
        <Link to="/" className="flex items-center mb-10 pl-2 group">
          <Logo className="h-12 group-hover:scale-105 transition-transform" />
        </Link>

        {/* Opciones del menú */}
        <div className="space-y-2 flex-1">
          {items.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium ${
                  isActive
                    ? 'bg-primary text-white shadow-xl shadow-primary/25 translate-x-1'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-base">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Ajustes y Tema en la parte inferior (Desktop) */}
        <div className="mt-auto space-y-2 pt-6 border-t border-gray-200/60 dark:border-gray-700/60">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
          >
            <span className="text-2xl">{darkMode ? '☀️' : '🌙'}</span>
            <span className="text-base">{darkMode ? 'Modo claro' : 'Modo oscuro'}</span>
          </button>

          <Link
            to="/ajustes"
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium ${
              location.pathname === '/ajustes'
                ? 'bg-primary text-white shadow-xl shadow-primary/25 translate-x-1'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span className="text-2xl">⚙️</span>
            <span className="text-base">Ajustes</span>
          </Link>
          
          <div className="pt-4 text-center">
             <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">VentaClara v1.0</p>
          </div>
        </div>
      </nav>
    </>
  );
}
