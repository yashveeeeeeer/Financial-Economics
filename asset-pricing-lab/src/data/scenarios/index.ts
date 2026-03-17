import type { Scenario } from '../../types/index.ts';
import { aiPowerSurge } from './ai-power-surge.ts';
import { oilShock } from './oil-shock.ts';
import { inflationSurprise } from './inflation-surprise.ts';

export const ALL_SCENARIOS: Scenario[] = [
  aiPowerSurge,
  oilShock,
  inflationSurprise,
];

export function getScenarioById(id: string): Scenario | undefined {
  return ALL_SCENARIOS.find((s) => s.id === id);
}

export { aiPowerSurge, oilShock, inflationSurprise };
