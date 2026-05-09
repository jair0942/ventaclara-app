import { useMemo } from 'react';
import { useVentas } from '../hooks/useVentas';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatCOP } from '../utils/formatCOP';

// Pantalla de análisis optimizada para móvil
export default function Analisis() {
  const {
    datosPorDiaSemana,
    datosPorHora,
    datosPorCategoria,
    ventasMes,
  } = useVentas();

  const hayDatos = ventasMes.length > 0;

  return (
    <div className="animate-fadeIn max-w-lg mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-text-dark mb-6 flex items-center gap-2">
        <span className="text-primary text-3xl">📊</span> Análisis
      </h1>

      {!hayDatos ? (
        <div className="text-center py-16 card">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-lg text-gray-400 dark:text-gray-500 mb-2">Sin datos suficientes</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Registra más ventas para ver tu análisis detallado</p>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6">
          {/* Gráfica: ventas por día de la semana */}
          <div className="card p-4 md:p-6 animate-slideUp">
            <h2 className="font-bold text-gray-800 dark:text-text-dark mb-2 text-base md:text-lg flex items-center gap-2">
              <span>📅</span> Ventas por día (mes actual)
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Días con mayor venta del mes</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={datosPorDiaSemana}>
                <XAxis dataKey="dia" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(v) => formatCOP(v)}
                  contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)', fontFamily: 'Outfit' }}
                  itemStyle={{ color: '#F8FAFC', fontSize: '14px', fontWeight: '600' }}
                  labelStyle={{ color: '#94A3B8', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}
                />
                <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                  {datosPorDiaSemana.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.total > 0 ? '#4F46E5' : '#374151'}
                      opacity={entry.total > 0 ? 0.8 + (entry.total / Math.max(...datosPorDiaSemana.map(d => d.total), 1)) * 0.2 : 0.3}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfica: ventas por hora */}
          <div className="card p-4 md:p-6 animate-slideUp" style={{animationDelay: '0.1s'}}>
            <h2 className="font-bold text-gray-800 dark:text-text-dark mb-2 text-base md:text-lg flex items-center gap-2">
              <span>🕐</span> Ventas por hora
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Horarios pico de ventas (6am - 10pm)</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={datosPorHora}>
                <XAxis
                  dataKey="hora"
                  tick={{ fontSize: 9, fill: '#6B7280' }}
                  interval={2}
                />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(v) => formatCOP(v)}
                  contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)', fontFamily: 'Outfit' }}
                  itemStyle={{ color: '#F8FAFC', fontSize: '14px', fontWeight: '600' }}
                  labelStyle={{ color: '#94A3B8', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}
                />
                <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                  {datosPorHora.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.total > 0 ? '#4F46E5' : '#374151'}
                      opacity={entry.total > 0 ? 0.8 : 0.2}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tabla: ventas por categoría */}
          <div className="card p-4 md:p-6 animate-slideUp" style={{animationDelay: '0.2s'}}>
            <h2 className="font-bold text-gray-800 dark:text-text-dark mb-2 text-base md:text-lg flex items-center gap-2">
              <span>🏷️</span> Ventas por categoría
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Distribución de ventas por categoría</p>
            <div className="space-y-2 md:space-y-3">
              {datosPorCategoria.map((cat, index) => (
                <div key={cat.nombre} className="flex items-center justify-between p-2 md:p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-6 md:w-8 h-6 md:h-8 rounded-full bg-primary text-white text-xs md:text-sm flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-xs md:text-sm text-gray-700 dark:text-text-dark font-medium truncate">{cat.nombre}</span>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="font-bold text-xs md:text-sm text-gray-800 dark:text-text-dark">{formatCOP(cat.totalVendido)}</p>
                    <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500">{cat.porcentaje}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
