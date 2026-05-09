import { useState, useMemo } from 'react';
import { useVentas } from '../hooks/useVentas';
import { formatCOP } from '../utils/formatCOP';
import { hoy, inicioSemana, inicioMes } from '../utils/fechas';

// Pantalla de historial optimizada para móvil
export default function Historial() {
  const { ventas, eliminarVenta } = useVentas();

  const [filtroFecha, setFiltroFecha] = useState('este_mes');
  const [filtroMetodo, setFiltroMetodo] = useState('Todos');
  const [ventaAEliminar, setVentaAEliminar] = useState(null);

  const ventasFiltradas = useMemo(() => {
    let resultado = [...ventas];

    switch (filtroFecha) {
      case 'hoy':
        resultado = resultado.filter(v => v.fecha === hoy());
        break;
      case 'esta_semana':
        resultado = resultado.filter(v => v.fecha >= inicioSemana());
        break;
      case 'este_mes':
        resultado = resultado.filter(v => v.fecha >= inicioMes());
        break;
    }

    if (filtroMetodo !== 'Todos') {
      resultado = resultado.filter(v => v.metodo_pago === filtroMetodo);
    }

    return resultado;
  }, [ventas, filtroFecha, filtroMetodo]);

  const totalFiltrado = useMemo(() =>
    ventasFiltradas.reduce((sum, v) => sum + v.monto, 0),
    [ventasFiltradas]
  );

  const confirmarEliminar = (id) => {
    if (ventaAEliminar === id) {
      eliminarVenta(id);
      setVentaAEliminar(null);
    } else {
      setVentaAEliminar(id);
    }
  };

  const getMetodoColor = (metodo) => {
    switch(metodo) {
      case 'Efectivo': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Transferencia': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getCategoriaColor = (cat) => {
    switch(cat) {
      case 'Ropa mujer': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400';
      case 'Ropa hombre': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400';
      case 'Ropa niño': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Accesorios': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="animate-fadeIn max-w-lg mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-text-dark mb-6 flex items-center gap-2">
        <span className="text-primary text-3xl">📋</span> Historial
      </h1>

      {/* Filtros mejorados - scroll horizontal en móvil */}
      <div className="card p-4 mb-4 space-y-3">
        {/* Filtro por fecha */}
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Período</p>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 md:flex-wrap">
            {[
              { value: 'hoy', label: 'Hoy' },
              { value: 'esta_semana', label: 'Esta semana' },
              { value: 'este_mes', label: 'Este mes' },
              { value: 'todos', label: 'Todos' }
            ].map(f => (
              <button
                key={f.value}
                onClick={() => setFiltroFecha(f.value)}
                className={`px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-200 min-h-[36px] ${
                  filtroFecha === f.value
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro por método de pago */}
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Método</p>
          <div className="flex gap-2 flex-wrap">
            {['Todos', 'Efectivo', 'Transferencia', 'Otro'].map(m => (
              <button
                key={m}
                onClick={() => setFiltroMetodo(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 min-h-[32px] ${
                  filtroMetodo === m
                    ? 'bg-primary text-white scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Total filtrado */}
      <div className="card p-4 mb-4 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Total ventas</p>
          <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-text-dark">{formatCOP(totalFiltrado)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-gray-400">Registros</p>
          <p className="text-xl md:text-2xl font-bold text-primary">{ventasFiltradas.length}</p>
        </div>
      </div>

      {/* Lista de ventas */}
      {ventasFiltradas.length === 0 ? (
        <div className="text-center py-12 card">
          <div className="text-5xl mb-3">📭</div>
          <p className="text-base text-gray-400 dark:text-gray-500">Aún no hay ventas registradas</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Las ventas aparecerán aquí cuando las registres</p>
        </div>
      ) : (
        <div className="space-y-3">
          {ventasFiltradas.map((venta, index) => (
            <div
              key={venta.id}
              className="card p-3 md:p-4 animate-slideUp hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 dark:text-text-dark text-lg md:text-xl">{formatCOP(venta.monto)}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span>📅 {venta.fecha}</span>
                    <span>🕐 {venta.hora}</span>
                  </div>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full font-medium ${getMetodoColor(venta.metodo_pago)}`}>
                      {venta.metodo_pago}
                    </span>
                    <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full font-medium ${getCategoriaColor(venta.categoria)}`}>
                      {venta.categoria}
                    </span>
                  </div>
                  {venta.nota && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic bg-gray-50 dark:bg-gray-800 p-2 rounded-lg truncate">
                      "{venta.nota}"
                    </p>
                  )}
                </div>

                <button
                  onClick={() => confirmarEliminar(venta.id)}
                  className={`ml-2 p-2 md:p-3 rounded-xl transition-all duration-200 flex-shrink-0 ${
                    ventaAEliminar === venta.id
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
                  }`}
                  title="Eliminar venta"
                >
                  {ventaAEliminar === venta.id ? '¿Seguro?' : '🗑️'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
