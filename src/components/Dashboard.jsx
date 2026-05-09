import { useState, useMemo } from 'react';
import { useVentas } from '../hooks/useVentas';
import { hoy, nombreMesActual } from '../utils/fechas';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, Legend } from 'recharts';

// Dashboard principal optimizado para móvil y desktop
export default function Dashboard() {
  const {
    tienda,
    totalHoy,
    totalSemana,
    totalMes,
    gananciaMes,
    porcentajeMeta,
    metaCumplida,
    ticketPromedio,
    comparacionMesAnterior,
    datosUltimos7Dias,
    datosMetodosPago,
    formatCOP
  } = useVentas();

  const [toast, setToast] = useState(null);

  // Color de la barra de progreso según porcentaje
  const getColorBarra = () => {
    if (porcentajeMeta >= 100) return 'bg-gradient-to-r from-green-400 to-green-600';
    if (porcentajeMeta >= 70) return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
    return 'bg-gradient-to-r from-red-400 to-red-500';
  };

  // Colores para gráficas
  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#818CF8', '#EF4444'];

  return (
    <div className="animate-fadeIn">
      {/* Toast notification */}
      {toast && (
        <div className={`toast toast-${toast.tipo} animate-slideDown`}>
          {toast.mensaje}
        </div>
      )}

      {/* Encabezado mejorado */}
      <div className="mb-8 relative">
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {tienda.nombre}
            </h1>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 mt-1 font-medium">
              Resumen de {nombreMesActual()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-card-dark px-3 py-1 rounded-full">{hoy()}</p>
            <div className="flex items-center gap-2 justify-end mt-2">
              <div className={`w-2.5 h-2.5 rounded-full ${porcentajeMeta >= 100 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]'} animate-pulse`} />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {porcentajeMeta >= 100 ? 'Meta lograda' : 'En curso'}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-primary/50 via-primary-light/20 to-transparent" />
      </div>

      {/* 4 tarjetas de resumen mejoradas - scroll horizontal en móvil */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <TarjetaResumen
          titulo="Hoy"
          valor={formatCOP(totalHoy)}
          icono="💰"
          color="from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
          border="border-green-200 dark:border-green-800"
        />
        <TarjetaResumen
          titulo="Esta semana"
          valor={formatCOP(totalSemana)}
          icono="📅"
          color="from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
          border="border-blue-200 dark:border-blue-800"
        />
        <TarjetaResumen
          titulo="Este mes"
          valor={formatCOP(totalMes)}
          icono="📊"
          color="from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
          border="border-purple-200 dark:border-purple-800"
        />
        <TarjetaResumen
          titulo="Ganancia est."
          valor={formatCOP(gananciaMes)}
          subtitulo={`Margen ${tienda.margen_ganancia}%`}
          icono="💎"
          color="from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20"
          border="border-yellow-200 dark:border-yellow-800"
        />
      </div>

      {/* Meta mensual con diseño mejorado */}
      <div className="card p-5 md:p-6 mb-6 animate-slideUp">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="font-bold text-gray-800 dark:text-text-dark text-base md:text-lg">Meta mensual</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Objetivo: {formatCOP(tienda.meta_mensual)}
            </p>
          </div>
          <div className="text-right ml-4">
            <span className={`text-2xl md:text-3xl font-bold ${
              porcentajeMeta >= 100 ? 'text-green-500' :
              porcentajeMeta >= 70 ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {Math.round(porcentajeMeta)}%
            </span>
          </div>
        </div>

        {/* Barra de progreso animada */}
        <div className="w-full h-3 md:h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${getColorBarra()}`}
            style={{ width: `${Math.min(porcentajeMeta, 100)}%` }}
          />
        </div>

        {metaCumplida && (
          <div className="flex items-center gap-2 text-green-500 animate-bounceIn">
            <span className="text-xl">🎉</span>
            <span className="font-bold text-sm md:text-base">¡Meta cumplida!</span>
          </div>
        )}
      </div>

      {/* Gráficas en grid para desktop, apiladas en móvil */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Gráfica de área - últimos 7 días */}
        <div className="card p-4 md:p-6 animate-slideUp">
          <h2 className="font-bold text-gray-800 dark:text-text-dark mb-2 text-base md:text-lg flex items-center gap-2">
            <span>📈</span> Ventas últimos 7 días
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={datosUltimos7Dias}>
              <defs>
                <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="dia" tick={{ fontSize: 11, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(v) => formatCOP(v)}
                contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)', fontFamily: 'Outfit' }}
                itemStyle={{ color: '#F8FAFC', fontSize: '14px', fontWeight: '600' }}
                labelStyle={{ color: '#94A3B8', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#4F46E5"
                fillOpacity={1}
                fill="url(#colorVentas)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de torta - métodos de pago */}
        <div className="card p-4 md:p-6 animate-slideUp">
          <h2 className="font-bold text-gray-800 dark:text-text-dark mb-2 text-base md:text-lg flex items-center gap-2">
            <span>💳</span> Métodos de pago
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={datosMetodosPago}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={40}
                strokeWidth={0}
              >
                {datosMetodosPago.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)', fontFamily: 'Outfit' }}
                itemStyle={{ color: '#F8FAFC', fontSize: '14px', fontWeight: '600' }}
                labelStyle={{ color: '#94A3B8', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '12px', fontFamily: 'Outfit', paddingTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2 tarjetas pequeñas mejoradas */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <div className="card p-4 md:p-5 animate-scaleIn">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🎫</span>
            <h3 className="text-xs text-gray-500 dark:text-gray-400">Ticket promedio</h3>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-text-dark">{formatCOP(ticketPromedio)}</p>
        </div>
        <div className="card p-4 md:p-5 animate-scaleIn">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">📊</span>
            <h3 className="text-xs text-gray-500 dark:text-gray-400">vs Mes anterior</h3>
          </div>
          <p className={`text-xl md:text-2xl font-bold ${comparacionMesAnterior.subio ? 'text-green-500' : 'text-red-500'}`}>
            {comparacionMesAnterior.subio ? '↑' : '↓'} {comparacionMesAnterior.porcentaje}%
          </p>
        </div>
      </div>
    </div>
  );
}

// Componente reutilizable para tarjetas de resumen mejorado
function TarjetaResumen({ titulo, valor, subtitulo, icono, color, border }) {
  // Extraemos los colores para usar en sombras sutiles
  const gradientClass = color.includes('green') ? 'from-emerald-500/10 to-emerald-500/5 dark:from-emerald-400/10 dark:to-emerald-400/5' :
                        color.includes('blue') ? 'from-indigo-500/10 to-indigo-500/5 dark:from-indigo-400/10 dark:to-indigo-400/5' :
                        color.includes('purple') ? 'from-purple-500/10 to-purple-500/5 dark:from-purple-400/10 dark:to-purple-400/5' :
                        'from-amber-500/10 to-amber-500/5 dark:from-amber-400/10 dark:to-amber-400/5';

  const iconBg = color.includes('green') ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                 color.includes('blue') ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' :
                 color.includes('purple') ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400' :
                 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400';

  return (
    <div className={`card p-4 md:p-5 relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1`}>
      {/* Fondo decorativo */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradientClass} rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500`} />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-sm ${iconBg}`}>
            {icono}
          </div>
          <h3 className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">{titulo}</h3>
        </div>
        <p className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight break-words">{valor}</p>
        {subtitulo && (
          <p className="text-xs md:text-sm font-medium text-gray-400 dark:text-gray-500 mt-2 bg-gray-100 dark:bg-gray-800/50 inline-block px-2 py-1 rounded-md">
            {subtitulo}
          </p>
        )}
      </div>
    </div>
  );
}
