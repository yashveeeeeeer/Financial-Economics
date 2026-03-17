import type { ScatterPoint } from '../types/index.ts';

function gaussianRandom(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function round(num: number, decimals: number): number {
  return Math.round(num * 10 ** decimals) / 10 ** decimals;
}

export function generateScatterData(
  trueBeta: number,
  nPoints = 30,
  noiseStd = 0.3
): ScatterPoint[] {
  const data: ScatterPoint[] = [];
  for (let i = 0; i < nPoints; i++) {
    const factorShock = (Math.random() - 0.5) * 4;
    const noise = gaussianRandom() * noiseStd;
    const assetReturn = trueBeta * factorShock + noise;
    data.push({
      factorShock: round(factorShock, 2),
      assetReturn: round(assetReturn, 2),
    });
  }
  return data;
}

export function computeBetaFromData(data: ScatterPoint[]): number {
  const n = data.length;
  const meanF = data.reduce((s, d) => s + d.factorShock, 0) / n;
  const meanR = data.reduce((s, d) => s + d.assetReturn, 0) / n;
  const cov =
    data.reduce((s, d) => s + (d.factorShock - meanF) * (d.assetReturn - meanR), 0) / (n - 1);
  const varF =
    data.reduce((s, d) => s + (d.factorShock - meanF) ** 2, 0) / (n - 1);
  return cov / varF;
}
