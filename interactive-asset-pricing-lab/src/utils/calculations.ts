import { Asset, State, Factor } from '../types/scenario';

export function computeExpectedPayoff(asset: Asset, states: State[]): number {
  return states.reduce((sum, s) => sum + s.probability * asset.payoffs[s.id], 0);
}

export function computeSdfPrice(asset: Asset, states: State[]): number {
  return states.reduce((sum, s) => sum + s.probability * s.sdfWeight * asset.payoffs[s.id], 0);
}

export function computeExpectedReturn(asset: Asset, states: State[]): number {
  const price = computeSdfPrice(asset, states);
  const expectedPayoff = computeExpectedPayoff(asset, states);
  return (expectedPayoff - price) / price;
}

export function computeCovariance(
  asset: Asset,
  states: State[],
  series: 'sdf' | Factor
): number {
  const meanReturn = computeExpectedReturn(asset, states);
  if (series === 'sdf') {
    const meanM = states.reduce((s, st) => s + st.probability * st.sdfWeight, 0);
    return states.reduce((sum, st) => {
      const ri = asset.payoffs[st.id] / computeSdfPrice(asset, states) - 1;
      return sum + st.probability * (ri - meanReturn) * (st.sdfWeight - meanM);
    }, 0);
  }
  return 0;
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}
