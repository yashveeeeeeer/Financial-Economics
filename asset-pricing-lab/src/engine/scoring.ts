import type { ArbitrageResult, ScoreResult } from '../types/index.ts';

export function scoreRanking(
  playerRanking: string[],
  correctRanking: string[]
): ScoreResult {
  let concordant = 0;
  let discordant = 0;
  const n = correctRanking.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const playerOrder =
        playerRanking.indexOf(correctRanking[i]) <
        playerRanking.indexOf(correctRanking[j]);
      if (playerOrder) concordant++;
      else discordant++;
    }
  }

  const total = concordant + discordant;
  const score = Math.round((concordant / total) * 100);
  const stars = score >= 90 ? 3 : score >= 60 ? 2 : score >= 30 ? 1 : 0;

  return { score, stars, details: { concordant, discordant, total } };
}

export function scoreBetaPlacement(
  playerPlacements: { assetId: string; x: number; y: number }[],
  correctPlacements: { assetId: string; x: number; y: number }[]
): ScoreResult {
  let totalDist = 0;
  const n = playerPlacements.length;

  playerPlacements.forEach((pp) => {
    const cp = correctPlacements.find((c) => c.assetId === pp.assetId);
    if (cp) {
      totalDist += Math.sqrt((pp.x - cp.x) ** 2 + (pp.y - cp.y) ** 2);
    }
  });

  const avgDist = totalDist / n;
  const score = Math.max(0, Math.round(100 - avgDist * 50));
  const stars = avgDist < 0.2 ? 3 : avgDist < 0.5 ? 2 : avgDist < 1.0 ? 1 : 0;

  return { score, stars, details: { avgDist } };
}

export function scoreArbitrage(arbitrageResult: ArbitrageResult): ScoreResult {
  let points = 0;
  if (arbitrageResult.isFactorNeutral) points++;
  if (arbitrageResult.isPositiveReturn) points++;
  if (arbitrageResult.isNonPositiveCost) points++;

  return {
    score: Math.round((points / 3) * 100),
    stars: points,
    details: arbitrageResult as unknown as Record<string, unknown>,
  };
}
