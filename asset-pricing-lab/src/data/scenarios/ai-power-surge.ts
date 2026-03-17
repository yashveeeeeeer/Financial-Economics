import type { Scenario } from '../../types/index.ts';

export const aiPowerSurge: Scenario = {
  id: 'ai_power_surge',
  title: 'AI Power Rush',
  headline: 'AI Demand Surge Strains Power Grid',
  description:
    'Major tech companies announce massive data center expansion plans. Electricity demand forecasts jump 15% over the next decade. Utility capex programs accelerate to meet AI infrastructure needs.',
  difficulty: 'medium',
  factors: {
    growth: { shock: 0.8, premium: 0.045 },
    inflation: { shock: 0.3, premium: 0.025 },
    oil: { shock: 0.5, premium: 0.03 },
    power_demand: { shock: 2.1, premium: 0.055 },
  },
  riskFreeRate: 0.04,
  states: {
    boom: { probability: 0.15, sdfWeight: 0.6 },
    normal: { probability: 0.4, sdfWeight: 0.9 },
    slowdown: { probability: 0.25, sdfWeight: 1.3 },
    recession: { probability: 0.15, sdfWeight: 1.8 },
    crisis: { probability: 0.05, sdfWeight: 3.0 },
  },
  assets: [
    {
      id: 'utility',
      name: 'GridPower Utility',
      icon: '⚡',
      sector: 'Utilities',
      currentPrice: 94.5,
      factorClues: ['High Power Demand Exposure', 'Moderate Defensive'],
      trueBetas: { growth: 0.3, inflation: -0.2, oil: 0.1, power_demand: 1.4 },
      statePayoffs: { boom: 108, normal: 102, slowdown: 98, recession: 88, crisis: 75 },
      trueExpectedReturn: 0.137,
    },
    {
      id: 'tech_ai',
      name: 'DeepNet AI Corp',
      icon: '🧠',
      sector: 'Technology',
      currentPrice: 112.0,
      factorClues: ['High Growth Exposure', 'Moderate Power Demand'],
      trueBetas: { growth: 1.6, inflation: -0.5, oil: -0.1, power_demand: 0.8 },
      statePayoffs: { boom: 145, normal: 118, slowdown: 95, recession: 70, crisis: 45 },
      trueExpectedReturn: 0.162,
    },
    {
      id: 'consumer_staples',
      name: 'StableGoods Inc',
      icon: '🛒',
      sector: 'Consumer Staples',
      currentPrice: 101.0,
      factorClues: ['Low Growth Exposure', 'Defensive'],
      trueBetas: { growth: 0.2, inflation: 0.1, oil: -0.05, power_demand: 0.05 },
      statePayoffs: { boom: 106, normal: 104, slowdown: 102, recession: 99, crisis: 95 },
      trueExpectedReturn: 0.057,
    },
    {
      id: 'treasury',
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
      id: 'oil_producer',
      name: 'PetroCorp Energy',
      icon: '🛢️',
      sector: 'Energy',
      currentPrice: 89.0,
      factorClues: ['High Oil Exposure', 'Cyclical'],
      trueBetas: { growth: 0.7, inflation: 0.3, oil: 1.8, power_demand: 0.4 },
      statePayoffs: { boom: 125, normal: 105, slowdown: 85, recession: 65, crisis: 50 },
      trueExpectedReturn: 0.155,
    },
  ],
  rounds: [
    {
      roundNumber: 1,
      decisionType: 'rank_expected_returns',
      instruction:
        'Rank these assets from LOWEST to HIGHEST expected return after the AI power demand shock.',
      correctRanking: ['treasury', 'consumer_staples', 'utility', 'oil_producer', 'tech_ai'],
      reasoningQuestion: {
        question:
          'Why does the utility stock now require a higher expected return than consumer staples?',
        options: [
          'Because utility stocks are always riskier',
          'Because utilities have high exposure to the priced power-demand factor',
          'Because consumer staples are boring investments',
          'Because the utility stock price dropped',
        ],
        correctIndex: 1,
        explanation:
          'The utility has β_power = 1.4 while staples have β_power = 0.05. Since power demand carries a positive risk premium (λ = 5.5%), this exposure adds significantly to the utility\'s required return.',
      },
    },
    {
      roundNumber: 2,
      decisionType: 'estimate_betas',
      instruction:
        'Place each asset on the Growth Beta (x-axis) vs Power Demand Beta (y-axis) map.',
      axisConfig: {
        xAxis: { factor: 'growth', label: 'Growth Beta', range: [-0.5, 2.0] },
        yAxis: { factor: 'power_demand', label: 'Power Demand Beta', range: [-0.5, 2.0] },
      },
      reasoningQuestion: {
        question: 'Why does DeepNet AI Corp appear in the upper-right of the beta map?',
        options: [
          'Because it is an expensive stock',
          'Because it has high exposure to both growth and power demand factors',
          'Because AI companies are always the most volatile',
          'Because it has the highest dividend yield',
        ],
        correctIndex: 1,
        explanation:
          'DeepNet has β_growth = 1.6 and β_power = 0.8, placing it in the high-growth, high-power-demand quadrant. Both exposures contribute to its required return.',
      },
    },
    {
      roundNumber: 3,
      decisionType: 'build_arbitrage',
      instruction:
        'DeepNet AI and GridPower Utility have similar power-demand exposure but different prices. Can you build a factor-neutral portfolio with positive expected return?',
      availableAssets: ['utility', 'tech_ai', 'treasury', 'consumer_staples'],
      reasoningQuestion: {
        question: 'What makes this trade an arbitrage rather than a risky bet?',
        options: [
          'The portfolio uses leverage',
          'The portfolio has zero net factor exposure but positive expected return',
          'We are buying cheap stocks and selling expensive ones',
          'The portfolio is diversified across sectors',
        ],
        correctIndex: 1,
        explanation:
          'True arbitrage requires zero net cost and zero net factor exposure (all β_net ≈ 0) with a positive expected payoff. If any factor exposure remains, it is a risky bet, not an arbitrage.',
      },
    },
  ],
};
