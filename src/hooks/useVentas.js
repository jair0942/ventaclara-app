import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { hoy, inicioSemana, inicioMes, inicioMesAnterior, finMesAnterior, diaSemana, formatFechaCorta, nombreMesActual } from '../utils/fechas';
import { formatCOP } from '../utils/formatCOP';

// Hook principal para gestionar todas las ventas y métricas
export function useVentas() {
  // Datos iniciales sin demo
  const demoVentas = [];
  const demoTienda = {
    nombre: 'Tienda Lucía',
    meta_mensual: 8000000,
    margen_ganancia: 35,
    moneda: 'COP'
  };

  const [tienda, setTienda] = useLocalStorage('ventaclara_tienda_v2', demoTienda);
  const [ventas, setVentas] = useLocalStorage('ventaclara_ventas_v2', demoVentas);

  // Agregar una venta nueva
  const agregarVenta = (venta) => {
    const nuevaVenta = {
      ...venta,
      id: crypto.randomUUID(),
      fecha: venta.fecha || hoy(),
      hora: venta.hora || new Date().toTimeString().slice(0, 5)
    };
    setVentas([nuevaVenta, ...ventas]);
    return nuevaVenta;
  };

  // Eliminar una venta por ID
  const eliminarVenta = (id) => {
    setVentas(ventas.filter(v => v.id !== id));
  };

  // Ventas de hoy
  const ventasHoy = useMemo(() =>
    ventas.filter(v => v.fecha === hoy()),
    [ventas]
  );

  // Ventas de esta semana (lunes a hoy)
  const ventasSemana = useMemo(() =>
    ventas.filter(v => v.fecha >= inicioSemana()),
    [ventas]
  );

  // Ventas de este mes
  const ventasMes = useMemo(() =>
    ventas.filter(v => v.fecha >= inicioMes()),
    [ventas]
  );

  // Ventas del mes anterior
  const ventasMesAnterior = useMemo(() =>
    ventas.filter(v => v.fecha >= inicioMesAnterior() && v.fecha <= finMesAnterior()),
    [ventas]
  );

  // Total de ventas de hoy
  const totalHoy = useMemo(() =>
    ventasHoy.reduce((sum, v) => sum + v.monto, 0),
    [ventasHoy]
  );

  // Total de ventas de la semana
  const totalSemana = useMemo(() =>
    ventasSemana.reduce((sum, v) => sum + v.monto, 0),
    [ventasSemana]
  );

  // Total de ventas del mes
  const totalMes = useMemo(() =>
    ventasMes.reduce((sum, v) => sum + v.monto, 0),
    [ventasMes]
  );

  // Total de ventas del mes anterior
  const totalMesAnterior = useMemo(() =>
    ventasMesAnterior.reduce((sum, v) => sum + v.monto, 0),
    [ventasMesAnterior]
  );

  // Ganancia estimada del mes
  const gananciaMes = useMemo(() =>
    totalMes * (tienda.margen_ganancia / 100),
    [totalMes, tienda.margen_ganancia]
  );

  // Porcentaje de meta mensual cumplida
  const porcentajeMeta = useMemo(() =>
    Math.min(100, (totalMes / tienda.meta_mensual) * 100),
    [totalMes, tienda.meta_mensual]
  );

  // Meta cumplida
  const metaCumplida = porcentajeMeta >= 100;

  // Ticket promedio del mes
  const ticketPromedio = useMemo(() =>
    ventasMes.length > 0 ? totalMes / ventasMes.length : 0,
    [ventasMes, totalMes]
  );

  // Comparación con mes anterior
  const comparacionMesAnterior = useMemo(() => {
    if (totalMesAnterior === 0) return { porcentaje: 0, subio: true };
    const diff = ((totalMes - totalMesAnterior) / totalMesAnterior) * 100;
    return {
      porcentaje: Math.abs(Math.round(diff)),
      subio: diff >= 0
    };
  }, [totalMes, totalMesAnterior]);

  // Datos para gráfica de barras - últimos 7 días
  const datosUltimos7Dias = useMemo(() => {
    const dias = [];
    for (let i = 6; i >= 0; i--) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() - i);
      const fechaStr = fecha.toISOString().split('T')[0];
      const total = ventas
        .filter(v => v.fecha === fechaStr)
        .reduce((sum, v) => sum + v.monto, 0);
      dias.push({
        fecha: fechaStr,
        dia: diaSemana(fechaStr),
        corto: formatFechaCorta(fechaStr),
        total,
        esHoy: fechaStr === hoy()
      });
    }
    return dias;
  }, [ventas]);

  // Datos para gráfica de torta - métodos de pago del mes
  const datosMetodosPago = useMemo(() => {
    const metodos = { 'Efectivo': 0, 'Transferencia': 0, 'Otro': 0 };
    ventasMes.forEach(v => {
      if (metodos[v.metodo_pago] !== undefined) {
        metodos[v.metodo_pago]++;
      } else {
        metodos['Otro']++;
      }
    });
    const total = Object.values(metodos).reduce((a, b) => a + b, 0);
    return Object.entries(metodos).map(([name, value]) => ({
      name,
      value,
      porcentaje: total > 0 ? Math.round((value / total) * 100) : 0
    }));
  }, [ventasMes]);

  // Datos para análisis - ventas por día de la semana (mes actual)
  const datosPorDiaSemana = useMemo(() => {
    const dias = [
      { dia: 'Lun', total: 0 },
      { dia: 'Mar', total: 0 },
      { dia: 'Mié', total: 0 },
      { dia: 'Jue', total: 0 },
      { dia: 'Vie', total: 0 },
      { dia: 'Sáb', total: 0 },
      { dia: 'Dom', total: 0 }
    ];
    ventasMes.forEach(v => {
      const fecha = new Date(v.fecha + 'T00:00:00');
      const indice = fecha.getDay() === 0 ? 6 : fecha.getDay() - 1;
      dias[indice].total += v.monto;
    });
    return dias;
  }, [ventasMes]);

  // Datos para análisis - ventas por hora
  const datosPorHora = useMemo(() => {
    const horas = [];
    for (let h = 6; h <= 22; h++) {
      const horaStr = `${String(h).padStart(2, '0')}:00`;
      const total = ventasMes
        .filter(v => {
          const horaVenta = parseInt(v.hora.split(':')[0]);
          return horaVenta === h;
        })
        .reduce((sum, v) => sum + v.monto, 0);
      horas.push({
        hora: horaStr,
        total
      });
    }
    return horas;
  }, [ventasMes]);

  // Datos para análisis - ventas por categoría
  const datosPorCategoria = useMemo(() => {
    const cats = {};
    ventasMes.forEach(v => {
      if (!cats[v.categoria]) {
        cats[v.categoria] = 0;
      }
      cats[v.categoria] += v.monto;
    });
    const total = Object.values(cats).reduce((a, b) => a + b, 0);
    return Object.entries(cats)
      .map(([nombre, totalVendido]) => ({
        nombre,
        totalVendido,
        porcentaje: total > 0 ? Math.round((totalVendido / total) * 100) : 0
      }))
      .sort((a, b) => b.totalVendido - a.totalVendido);
  }, [ventasMes]);

  // Exportar ventas como CSV bien formateado para Excel
  const exportarCSV = () => {
    const headers = ['Fecha', 'Hora', 'Monto', 'Método de pago', 'Categoría', 'Nota'];

    // Función para escapar campos CSV (maneja comas, comillas y saltos de línea)
    const escapeCSV = (field) => {
      const stringField = String(field || '');
      if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
        return '"' + stringField.replace(/"/g, '""') + '"';
      }
      return stringField;
    };

    const rows = ventas.map(v =>
      [
        escapeCSV(v.fecha),
        escapeCSV(v.hora),
        escapeCSV(v.monto),
        escapeCSV(v.metodo_pago),
        escapeCSV(v.categoria),
        escapeCSV(v.nota)
      ].join(',')
    );

    const csv = [headers.map(h => escapeCSV(h)).join(','), ...rows].join('\r\n');

    // BOM para que Excel reconozca correctamente UTF-8
    const BOM = '\ufeff';
    const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ventaclara_${hoy()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Limpiar todos los datos
  const limpiarDatos = () => {
    setVentas([]);
    setTienda(demoTienda);
  };

  return {
    tienda,
    setTienda,
    ventas,
    agregarVenta,
    eliminarVenta,
    ventasHoy,
    ventasSemana,
    ventasMes,
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
    datosPorDiaSemana,
    datosPorHora,
    datosPorCategoria,
    exportarCSV,
    limpiarDatos,
    formatCOP
  };
}

// Genera 40 ventas ficticias para demo
function generarVentasDemo() {
  const ventas = [];
  const categorias = ['Ropa mujer', 'Ropa hombre', 'Ropa niño', 'Accesorios', 'Otro'];
  const metodos = ['Efectivo', 'Transferencia', 'Otro'];
  const hoy = new Date();

  for (let i = 0; i < 40; i++) {
    const diasAtras = Math.floor(Math.random() * 45);
    const fecha = new Date(hoy);
    fecha.setDate(fecha.getDate() - diasAtras);
    const fechaStr = fecha.toISOString().split('T')[0];

    const hora = `${String(Math.floor(Math.random() * 12) + 9).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;

    ventas.push({
      id: crypto.randomUUID(),
      monto: Math.floor(Math.random() * 220000) + 30000,
      metodo_pago: metodos[Math.floor(Math.random() * metodos.length)],
      categoria: categorias[Math.floor(Math.random() * categorias.length)],
      nota: '',
      fecha: fechaStr,
      hora
    });
  }

  return ventas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}
