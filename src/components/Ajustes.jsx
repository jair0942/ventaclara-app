import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useVentas } from '../hooks/useVentas';
import { formatCOP } from '../utils/formatCOP';
import { useTheme } from '../context/ThemeContext';

// Pantalla de ajustes con diseño mejorado
export default function Ajustes() {
  const { tienda, setTienda, exportarCSV, limpiarDatos } = useVentas();
  const { darkMode, toggleTheme } = useTheme();

  const [nombre, setNombre] = useState(tienda.nombre);
  const [metaMensual, setMetaMensual] = useState(tienda.meta_mensual.toString());
  const [margen, setMargen] = useState(tienda.margen_ganancia);
  const [guardado, setGuardado] = useState(false);
  const [confirmarBorrar, setConfirmarBorrar] = useState(false);
  const [confirmarBorrarFinal, setConfirmarBorrarFinal] = useState(false);

  const handleGuardar = () => {
    setTienda({
      ...tienda,
      nombre,
      meta_mensual: parseInt(metaMensual) || 0,
      margen_ganancia: margen
    });
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  const handleBorrarDatos = () => {
    if (!confirmarBorrar) {
      setConfirmarBorrar(true);
      return;
    }
    if (!confirmarBorrarFinal) {
      setConfirmarBorrarFinal(true);
      return;
    }
    limpiarDatos();
    setConfirmarBorrar(false);
    setConfirmarBorrarFinal(false);
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/" className="text-2xl hover:scale-110 transition-transform">←</Link>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-text-dark flex items-center gap-2">
          <span className="text-primary">⚙️</span> Ajustes
        </h1>
      </div>

      {/* Tema oscuro/claro */}
      <div className="card p-6 mb-6 animate-slideUp">
        <h2 className="font-bold text-gray-800 dark:text-text-dark mb-4">Apariencia</h2>
        <button
          onClick={toggleTheme}
          className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <span className="flex items-center gap-3">
            <span className="text-2xl">{darkMode ? '🌙' : '☀️'}</span>
            <span className="font-medium text-gray-700 dark:text-text-dark">
              {darkMode ? 'Modo oscuro' : 'Modo claro'}
            </span>
          </span>
          <span className="text-sm text-gray-500">
            {darkMode ? 'Cambiar a claro' : 'Cambiar a oscuro'}
          </span>
        </button>
      </div>

      {/* Configuración de la tienda */}
      <div className="card p-6 mb-6 space-y-6 animate-slideUp" style={{animationDelay: '0.1s'}}>
        <h2 className="font-bold text-gray-800 dark:text-text-dark text-lg flex items-center gap-2">
          <span>🏪</span> Datos de la tienda
        </h2>

        {/* Nombre */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Nombre de la tienda
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 dark:bg-card-dark dark:text-text-dark rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        {/* Meta mensual */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Meta de ventas del mes
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl font-bold">$</span>
            <input
              type="number"
              value={metaMensual}
              onChange={(e) => setMetaMensual(e.target.value)}
              className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 dark:bg-card-dark dark:text-text-dark rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all"
              min="0"
              step="100000"
            />
          </div>
          {metaMensual && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 pl-2">{formatCOP(parseInt(metaMensual))}</p>
          )}
        </div>

        {/* Margen de ganancia */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
            Margen de ganancia: <span className="text-primary font-bold">{margen}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={margen}
            onChange={(e) => setMargen(parseInt(e.target.value))}
            className="w-full h-2 accent-primary cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>0%</span>
            <span className="text-primary font-semibold">{margen}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Botón guardar */}
        <button
          onClick={handleGuardar}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
            guardado
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5'
          }`}
        >
          {guardado ? '✓ ¡Guardado!' : 'Guardar cambios'}
        </button>
      </div>


    </div>
  );
}
