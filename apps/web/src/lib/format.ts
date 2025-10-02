/**
 * Formata um preço para o formato brasileiro
 * @param price - Preço como number ou string
 * @returns Preço formatado (ex: "R$ 99,90")
 */
export function formatPrice(price: number | string): string {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numericPrice)) {
    return 'R$ 0,00';
  }

  return `R$ ${numericPrice.toFixed(2).replace('.', ',')}`;
}

/**
 * Formata apenas o valor numérico sem o prefixo R$
 * @param price - Preço como number ou string
 * @returns Valor formatado (ex: "99,90")
 */
export function formatCurrency(price: number | string): string {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numericPrice)) {
    return '0,00';
  }

  return numericPrice.toFixed(2).replace('.', ',');
}
