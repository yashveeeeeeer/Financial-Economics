import type { StateConfig, ReturnComponent } from '../types/index.ts';

export function computeSDFPrice(
  states: Record<string, StateConfig>,
  payoffs: Record<string, number>
): number {
  return Object.keys(states).reduce((sum, state) => {
    return sum + states[state].probability * states[state].sdfWeight * payoffs[state];
  }, 0);
}

export function computeExpectedReturn(
  riskFreeRate: number,
  betas: Record<string, number>,
  premia: Record<string, number>
): number {
  const factorContribution = Object.keys(betas).reduce((sum, factor) => {
    return sum + betas[factor] * (premia[factor] || 0);
  }, 0);
  return riskFreeRate + factorContribution;
}

export function computeReturnDecomposition(
  riskFreeRate: number,
  betas: Record<string, number>,
  premia: Record<string, number>
): ReturnComponent[] {
  const FACTOR_COLORS: Record<string, string> = {
    growth: '#3B82F6',
    inflation: '#F97316',
    oil: '#22C55E',
    power_demand: '#A855F7',
  };

  const components: ReturnComponent[] = [
    { factor: 'Risk-Free Rate', contribution: riskFreeRate, color: '#6B7280' },
  ];

  Object.keys(betas).forEach((factor) => {
    components.push({
      factor: factor.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      contribution: betas[factor] * (premia[factor] || 0),
      beta: betas[factor],
      premium: premia[factor] || 0,
      color: FACTOR_COLORS[factor] || '#9CA3AF',
    });
  });

  return components;
}

export function computeExpectedPayoff(
  states: Record<string, StateConfig>,
  payoffs: Record<string, number>
): number {
  return Object.keys(states).reduce((sum, state) => {
    return sum + states[state].probability * payoffs[state];
  }, 0);
}

export function computeCovariance(
  states: Record<string, StateConfig>,
  sdfValues: Record<string, number>,
  returnValues: Record<string, number>
): number {
  const stateKeys = Object.keys(states);
  const meanSDF = stateKeys.reduce((s, k) => s + states[k].probability * sdfValues[k], 0);
  const meanR = stateKeys.reduce((s, k) => s + states[k].probability * returnValues[k], 0);

  return stateKeys.reduce((s, k) => {
    return s + states[k].probability * (sdfValues[k] - meanSDF) * (returnValues[k] - meanR);
  }, 0);
}
