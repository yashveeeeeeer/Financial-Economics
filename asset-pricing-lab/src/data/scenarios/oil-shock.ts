import type { Scenario } from '../../types/index.ts';

export const oilShock: Scenario = {
  id: 'oil_shock',
  title: 'Oil Shock Crisis',
  headline: 'Middle East Conflict Pushes Oil to $130',
  description:
    'Escalating geopolitical tensions disrupt major shipping lanes. Brent crude surges past $130/barrel. Airlines scramble to hedge fuel costs while energy producers report record cash flows.',
  difficulty: 'medium',
  factors: {
    growth: { shock: -0.4, premium: 0.045 },
    inflation: { shock: 0.6, premium: 0.025 },
    oil: { shock: 2.5, premium: 0.035 },
    power_demand: { shock: 0.2, premium: 0.02 },
  },
  riskFreeRate: 0.04,
  states: {
    boom: { probability: 0.10, sdfWeight: 0.5 },
    normal: { probability: 0.35, sdfWeight: 0.85 },
    slowdown: { probability: 0.30, sdfWeight: 1.4 },
    recession: { probability: 0.18, sdfWeight: 2.0 },
    crisis: { probability: 0.07, sdfWeight: 3.2 },
  },
  assets: [
    {
      id: 'airline',
      name: 'SkyWays Airlines',
      icon: '✈️',
      sector: 'Airlines',
      currentPrice: 78.0,
      factorClues: ['Negative Oil Exposure', 'High Growth Sensitivity'],
      trueBetas: { growth: 1.2, inflation: -0.3, oil: -1.5, power_demand: 0.1 },
      statePayoffs: { boom: 110, normal: 90, slowdown: 72, recession: 52, crisis: 30 },
      trueExpectedReturn: 0.142,
    },
    {
      id: 'oil_major',
      name: 'GlobalPetro Inc',
      icon: '🛢️',
      sector: 'Energy',
      currentPrice: 95.0,
      factorClues: ['High Oil Exposure', 'Inflation Hedge'],
      trueBetas: { growth: 0.5, inflation: 0.4, oil: 2.0, power_demand: 0.3 },
      statePayoffs: { boom: 130, normal: 112, slowdown: 90, recession: 68, crisis: 48 },
      trueExpectedReturn: 0.163,
    },
    {
      id: 'railroad',
      name: 'TransRail Logistics',
      icon: '🚂',
      sector: 'Industrials',
      currentPrice: 88.0,
      factorClues: ['Moderate Oil Exposure', 'Growth Sensitive'],
      trueBetas: { growth: 0.9, inflation: 0.1, oil: 0.6, power_demand: 0.15 },
      statePayoffs: { boom: 115, normal: 100, slowdown: 85, recession: 68, crisis: 52 },
      trueExpectedReturn: 0.124,
    },
    {
      id: 'treasury_oil',
      name: '10Y Treasury Bond',
      icon: '🏛️',
      sector: 'Government Bonds',
      currentPrice: 98.0,
      factorClues: ['Risk-Free Benchmark'],
      trueBetas: { growth: 0.0, inflation: 0.0, oil: 0.0, power_demand: 0.0 },
      statePayoffs: { boom: 104, normal: 104, slowdown: 104, recession: 104, crisis: 104 },
      trueExpectedReturn: 0.04,
    },
    {
      id: 'hedged_airline',
      name: 'SkyWays (Fuel Hedged)',
      icon: '🛡️',
      sector: 'Airlines',
      currentPrice: 85.0,
      factorClues: ['Oil Hedged', 'Growth Sensitive'],
      trueBetas: { growth: 1.2, inflation: -0.3, oil: -0.2, power_demand: 0.1 },
      statePayoffs: { boom: 108, normal: 95, slowdown: 82, recession: 65, crisis: 48 },
      trueExpectedReturn: 0.097,
    },
  ],
  rounds: [
    {
      roundNumber: 1,
      decisionType: 'rank_expected_returns',
      instruction:
        'Rank these assets from LOWEST to HIGHEST expected return after the oil price shock.',
      correctRanking: ['treasury_oil', 'hedged_airline', 'railroad', 'airline', 'oil_major'],
      reasoningQuestion: {
        question:
          'Why does the unhedged airline require a higher expected return than the hedged version?',
        options: [
          'Because unhedged airlines have more volatile revenues',
          'Because the unhedged airline has large negative oil beta, adding to its systematic risk',
          'Because hedging is always free',
          'Because airlines are growth stocks',
        ],
        correctIndex: 1,
        explanation:
          'SkyWays unhedged has β_oil = -1.5 versus -0.2 for the hedged version. Since oil is a priced factor (λ = 3.5%), the large absolute oil exposure requires additional compensation, even though the exposure is negative — the absolute magnitude of systematic risk drives the premium.',
      },
    },
    {
      roundNumber: 2,
      decisionType: 'estimate_betas',
      instruction:
        'Place each asset on the Growth Beta (x-axis) vs Oil Beta (y-axis) map.',
      axisConfig: {
        xAxis: { factor: 'growth', label: 'Growth Beta', range: [-0.5, 2.0] },
        yAxis: { factor: 'oil', label: 'Oil Beta', range: [-2.0, 2.5] },
      },
      reasoningQuestion: {
        question:
          'Why does SkyWays Airlines appear in the lower-right of the beta map?',
        options: [
          'Because airlines are cheap stocks',
          'Because it has high growth exposure but strongly negative oil exposure',
          'Because it has the lowest market price',
          'Because airlines never pay dividends',
        ],
        correctIndex: 1,
        explanation:
          'SkyWays has β_growth = 1.2 (high, placing it right) and β_oil = -1.5 (strongly negative, placing it low). Fuel costs are a major expense, so rising oil hurts airlines — the negative beta captures this systematic sensitivity.',
      },
    },
    {
      roundNumber: 3,
      decisionType: 'build_arbitrage',
      instruction:
        'The hedged and unhedged airlines have similar growth exposure but different oil risk. Build a portfolio that isolates the oil risk premium.',
      availableAssets: ['airline', 'hedged_airline', 'oil_major', 'treasury_oil'],
      reasoningQuestion: {
        question:
          'What does comparing hedged and unhedged airlines teach about factor pricing?',
        options: [
          'Hedging is always profitable',
          'Only systematic factor exposure is priced — removing oil exposure changes the required return',
          'Airlines should never hedge fuel costs',
          'All airline stocks have the same expected return',
        ],
        correctIndex: 1,
        explanation:
          'By hedging oil exposure, the airline removes a priced risk factor. The difference in expected returns between hedged and unhedged versions equals the oil risk premium times the beta difference: Δβ_oil × λ_oil.',
      },
    },
  ],
};
