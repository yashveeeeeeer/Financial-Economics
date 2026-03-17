export function formatPercent(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatBeta(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}`;
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function formatNumber(value: number, decimals = 2): string {
  return value.toFixed(decimals);
}
