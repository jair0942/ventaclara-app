import { useState } from 'react';
import { useVentas } from '../hooks/useVentas';
import { hoy, horaActual } from '../utils/fechas';
import { formatCOP } from '../utils/formatCOP';

// Pantalla para registrar venta optimizada para móvil
export default function RegistrarVenta() {
  const { agregarVenta } = useVentas();

  const [monto, setMonto] = useState('');
  const [metodoPago, setMetodoPago] = useState('Efectivo');
  const [categoria, setCategoria] = useState('Ropa mujer');
  const [nota, setNota] = useState('');
  const [mostrarExito, setMostrarExito] = useState(false);

  const metodosPago = ['Efectivo', 'Transferencia', 'Otro'];
  const categorias = ['Ropa mujer', 'Ropa hombre', 'Ropa niño', 'Accesorios', 'Otro'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!monto || parseInt(monto) <= 0) return;

    agregarVenta({
      monto: parseInt(monto),
      metodo_pago: metodoPago,
      categoria,
      nota: nota.slice(0, 100),
      fecha: hoy(),
      hora: horaActual()
    });

    setMostrarExito(true);
    setTimeout(() => setMostrarExito(false), 2000);

    setMonto('');
    setNota('');
  };

  const montoFormateado = monto ? formatCOP(parseInt(monto)) : '';

  return (
    <div className="animate-fadeIn max-w-lg mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-text-dark mb-6 flex items-center gap-2">
        <span className="text-primary text-3xl">➕</span> Registrar venta
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Monto */}
        <div className="card p-4 md:p-6 animate-slideUp">
          <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
            Monto de la venta
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl font-bold">$</span>
            <input
              type="number"
              inputMode="numeric"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-4 md:py-5 text-2xl md:text-3xl font-bold border-2 border-gray-200 dark:border-gray-700 dark:bg-card-dark dark:text-text-dark rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all"
              min="0"
              step="1000"
            />
          </div>
          {montoFormateado && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 pl-2">{montoFormateado}</p>
          )}
        </div>

        {/* Método de pago */}
        <div className="card p-4 md:p-6 animate-slideUp" style={{animationDelay: '0.1s'}}>
          <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
            Método de pago
          </label>
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {metodosPago.map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setMetodoPago(m)}
                className={`py-3 md:py-4 px-3 md:px-4 rounded-xl text-sm font-semibold transition-all duration-200 min-h-[44px] ${
                  metodoPago === m
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Categoría */}
        <div className="card p-4 md:p-6 animate-slideUp" style={{animationDelay: '0.2s'}}>
          <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
            Categoría
          </label>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {categorias.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setCategoria(c)}
                className={`py-3 md:py-4 px-3 md:px-4 rounded-xl text-sm font-semibold transition-all duration-200 min-h-[44px] ${
                  categoria === c
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Nota */}
        <div className="card p-4 md:p-6 animate-slideUp" style={{animationDelay: '0.3s'}}>
          <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
            Nota opcional <span className="text-gray-400 font-normal">(máx 100 caracteres)</span>
          </label>
          <textarea
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            maxLength={100}
            placeholder="Ej: Cliente pidió talla M..."
            className="w-full p-3 md:p-4 border-2 border-gray-200 dark:border-gray-700 dark:bg-card-dark dark:text-text-dark rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none resize-none transition-all text-base"
            rows={3}
          />
          <div className="flex justify-between items-center mt-2">
            <div />
            <p className={`text-xs ${nota.length >= 90 ? 'text-red-500' : 'text-gray-400'}`}>
              {nota.length}/100
            </p>
          </div>
        </div>

        {/* Botón registrar */}
        <button
          type="submit"
          disabled={!monto || parseInt(monto) <= 0}
          className="w-full py-4 md:py-5 bg-gradient-to-r from-primary to-primary-light text-white text-lg md:text-xl font-bold rounded-2xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:shadow-none transform hover:-translate-y-0.5 active:scale-98"
        >
          Registrar venta
        </button>
      </form>

      {/* Animación de éxito */}
      {mostrarExito && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fadeIn">
          <div className="bg-white dark:bg-card-dark rounded-3xl p-8 md:p-10 flex flex-col items-center animate-bounceIn shadow-2xl mx-4">
            <div className="w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-green-500/30">
              <svg className="w-8 md:w-10 h-8 md:h-10 text-white animate-checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-text-dark">¡Venta registrada!</p>
          </div>
        </div>
      )}
    </div>
  );
}
