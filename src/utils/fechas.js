// Obtiene la fecha de hoy en formato YYYY-MM-DD
export function hoy() {
  return new Date().toISOString().split('T')[0];
}

// Obtiene el primer día del mes actual
export function inicioMes() {
  const fecha = new Date();
  return new Date(fecha.getFullYear(), fecha.getMonth(), 1).toISOString().split('T')[0];
}

// Obtiene el primer día del mes anterior
export function inicioMesAnterior() {
  const fecha = new Date();
  return new Date(fecha.getFullYear(), fecha.getMonth() - 1, 1).toISOString().split('T')[0];
}

// Obtiene el último día del mes anterior
export function finMesAnterior() {
  const fecha = new Date();
  return new Date(fecha.getFullYear(), fecha.getMonth(), 0).toISOString().split('T')[0];
}

// Obtiene el lunes de esta semana
export function inicioSemana() {
  const fecha = new Date();
  const dia = fecha.getDay();
  const diff = fecha.getDate() - dia + (dia === 0 ? -6 : 1);
  return new Date(fecha.setDate(diff)).toISOString().split('T')[0];
}

// Formatea una fecha para mostrar (ej: "15 Ene")
export function formatFechaCorta(fecha) {
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const f = new Date(fecha + 'T00:00:00');
  return `${f.getDate()} ${meses[f.getMonth()]}`;
}

// Obtiene el nombre del día de la semana
export function diaSemana(fecha) {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const f = new Date(fecha + 'T00:00:00');
  return dias[f.getDay()];
}

// Obtiene la hora actual en formato HH:MM
export function horaActual() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

// Obtiene el nombre del mes actual
export function nombreMesActual() {
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return meses[new Date().getMonth()];
}

// Verifica si una fecha está en el rango
export function enRango(fecha, inicio, fin) {
  return fecha >= inicio && fecha <= fin;
}
