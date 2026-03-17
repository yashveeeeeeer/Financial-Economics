export interface Factor {
  id: string;
  name: string;
  color: string;
  lambda: number; // factor risk premium
  description: string;
}

export interface State {
  id: string;
  name: string;
  probability: number;
  sdfWeight: number;
  description: string;
}

export interface Asset {
  id: string;
  name: string;
  ticker: string;
  description: string;
  currentPrice: number;
  payoffs: Record<string, number>; // stateId -> payoff
  betas: Record<string, number>;  // factorId -> beta
  expectedReturn: number;
  riskFreeRate: number;
  returnDecomposition: {
    riskFree: number;
    factorContributions: Record<string, number>; // factorId -> beta_i * lambda_k
  };
}

export type DecisionType = 'rank_returns' | 'estimate_betas' | 'construct_portfolio';

export interface Decision {
  type: DecisionType;
  prompt: string;
  options?: string[];       // for rank_returns: asset ids to rank
  targetAsset?: string;     // for estimate_betas
  targetFactor?: string;    // for estimate_betas
  correctAnswer: string[];  // ordered asset ids or numeric answers
  tolerance?: number;       // for numeric answers
}

export interface RevealStep {
  title: string;
  equation: string;           // KaTeX string
  equationLabel: string;
  graphType: 'state_payoff' | 'covariance' | 'factor_exposure' | 'return_decomposition' | 'arbitrage_payoff';
  explanation: string;
  highlightedTerm?: string;
}

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  narrativeShock: string;
  narrativeDetail: string;
  concepts: string[];
  factors: Factor[];
  states: State[];
  assets: Asset[];
  decisions: Decision[];
  revealSteps: RevealStep[];
  takeaway: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
