// Formatea un número como pesos colombianos
export function formatCOP(numero) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numero).replace('COP', '$').trim();
}
