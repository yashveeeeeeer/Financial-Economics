import type { PortfolioPosition, ArbitrageResult } from '../types/index.ts';
import { computeExpectedReturn } from './pricing.ts';

export function computeNetExposure(
  positions: PortfolioPosition[]
): Record<string, number> {
  const net: Record<string, number> = {};
  positions.forEach((pos) => {
    Object.keys(pos.betas).forEach((factor) => {
      net[factor] = (net[factor] || 0) + pos.weight * pos.betas[factor];
    });
  });
  return net;
}

export function isFactorNeutral(
  netExposure: Record<string, number>,
  tolerance = 0.1
): boolean {
  return Object.values(netExposure).every((beta) => Math.abs(beta) <= tolerance);
}

export function computePortfolioReturn(
  positions: PortfolioPosition[],
  riskFreeRate: number,
  premia: Record<string, number>
): number {
  return positions.reduce((sum, pos) => {
    const assetReturn = computeExpectedReturn(riskFreeRate, pos.betas, premia);
    return sum + pos.weight * assetReturn;
  }, 0);
}

export function computePortfolioPayoffs(
  positions: PortfolioPosition[],
  stateNames: string[]
): Record<string, number> {
  const payoffs: Record<string, number> = {};
  stateNames.forEach((state) => {
    payoffs[state] = positions.reduce((sum, pos) => {
      return sum + pos.weight * (pos.statePayoffs[state] || 0);
    }, 0);
  });
  return payoffs;
}

export function detectArbitrage(
  positions: PortfolioPosition[],
  riskFreeRate: number,
  premia: Record<string, number>
): ArbitrageResult {
  const netExposure = computeNetExposure(positions);
  const netReturn = computePortfolioReturn(positions, riskFreeRate, premia);
  const netCost = positions.reduce((sum, pos) => sum + pos.weight * pos.currentPrice, 0);
  const neutral = isFactorNeutral(netExposure);

  return {
    isFactorNeutral: neutral,
    isPositiveReturn: netReturn > 0,
    isNonPositiveCost: netCost <= 0,
    isArbitrage: neutral && netReturn > 0 && netCost <= 0.01,
    netExposure,
    netReturn,
    netCost,
  };
}
