export type FactorId = 'growth' | 'inflation' | 'oil' | 'power_demand';

export type StateId = 'boom' | 'normal' | 'slowdown' | 'recession' | 'crisis';

export type DecisionType = 'rank_expected_returns' | 'estimate_betas' | 'build_arbitrage';

export type GamePhase = 'shock' | 'analyze' | 'decide' | 'reveal' | 'score';

export interface FactorConfig {
  shock: number;
  premium: number;
}

export interface StateConfig {
  probability: number;
  sdfWeight: number;
}

export interface AxisConfig {
  factor: FactorId;
  label: string;
  range: [number, number];
}

export interface ReasoningQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Asset {
  id: string;
  name: string;
  icon: string;
  sector: string;
  currentPrice: number;
  factorClues: string[];
  trueBetas: Record<FactorId, number>;
  statePayoffs: Record<StateId, number>;
  trueExpectedReturn: number;
}

export interface Round {
  roundNumber: number;
  decisionType: DecisionType;
  instruction: string;
  correctRanking?: string[];
  axisConfig?: { xAxis: AxisConfig; yAxis: AxisConfig };
  availableAssets?: string[];
  reasoningQuestion: ReasoningQuestion;
}

export interface Scenario {
  id: string;
  title: string;
  headline: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  factors: Record<FactorId, FactorConfig>;
  riskFreeRate: number;
  states: Record<StateId, StateConfig>;
  assets: Asset[];
  rounds: Round[];
}

export interface ReturnComponent {
  factor: string;
  contribution: number;
  beta?: number;
  premium?: number;
  color: string;
}

export interface ScatterPoint {
  factorShock: number;
  assetReturn: number;
}

export interface PortfolioPosition {
  assetId: string;
  weight: number;
  betas: Record<string, number>;
  statePayoffs: Record<string, number>;
  currentPrice: number;
}

export interface ArbitrageResult {
  isFactorNeutral: boolean;
  isPositiveReturn: boolean;
  isNonPositiveCost: boolean;
  isArbitrage: boolean;
  netExposure: Record<string, number>;
  netReturn: number;
  netCost: number;
}

export interface ScoreResult {
  score: number;
  stars: number;
  details?: Record<string, unknown>;
}

export interface GameState {
  currentScenarioId: string | null;
  currentRoundIndex: number;
  currentPhase: GamePhase;
  totalScore: number;
  totalStars: number;
  scenarioStars: Record<string, number>;
  unlockedScenarios: string[];
  playerDecision: unknown;
  revealStep: number;
  lastScoreResult: ScoreResult | null;
  reasoningAnswer: number | null;
}

export type GameAction =
  | { type: 'START_SCENARIO'; scenarioId: string }
  | { type: 'ADVANCE_PHASE' }
  | { type: 'SET_DECISION'; decision: unknown }
  | { type: 'SUBMIT_DECISION' }
  | { type: 'NEXT_REVEAL_STEP' }
  | { type: 'SET_SCORE'; result: ScoreResult }
  | { type: 'ANSWER_REASONING'; answerIndex: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'FINISH_SCENARIO' }
  | { type: 'RESET' };

export const FACTOR_COLORS: Record<FactorId, string> = {
  growth: '#3B82F6',
  inflation: '#F97316',
  oil: '#22C55E',
  power_demand: '#A855F7',
};

export const FACTOR_LABELS: Record<FactorId, string> = {
  growth: 'Growth',
  inflation: 'Inflation',
  oil: 'Oil',
  power_demand: 'Power Demand',
};

export const STATE_LABELS: Record<StateId, string> = {
  boom: 'Boom',
  normal: 'Normal',
  slowdown: 'Slowdown',
  recession: 'Recession',
  crisis: 'Crisis',
};
