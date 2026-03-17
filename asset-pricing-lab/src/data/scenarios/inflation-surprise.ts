import type { Scenario } from '../../types/index.ts';

export const inflationSurprise: Scenario = {
  id: 'inflation_surprise',
  title: 'Inflation Defender',
  headline: 'Inflation Surprises to the Upside While Growth Weakens',
  description:
    'CPI prints 6.2% versus 4.8% expected. Core services inflation remains sticky. The Fed signals higher-for-longer rates while leading indicators point to slowing real activity.',
  difficulty: 'hard',
  factors: {
    growth: { shock: -0.6, premium: 0.045 },
    inflation: { shock: 2.0, premium: 0.03 },
    oil: { shock: 0.4, premium: 0.025 },
    power_demand: { shock: 0.1, premium: 0.015 },
  },
  riskFreeRate: 0.04,
  states: {
    boom: { probability: 0.08, sdfWeight: 0.5 },
    normal: { probability: 0.30, sdfWeight: 0.85 },
    slowdown: { probability: 0.32, sdfWeight: 1.35 },
    recession: { probability: 0.22, sdfWeight: 2.1 },
    crisis: { probability: 0.08, sdfWeight: 3.5 },
  },
  assets: [
    {
      id: 'tips',
      name: 'TIPS (Inflation-Protected)',
      icon: '🛡️',
      sector: 'Government Bonds',
      currentPrice: 102.0,
      factorClues: ['Inflation Hedge', 'Real Rate Exposure'],
      trueBetas: { growth: 0.05, inflation: -0.8, oil: 0.05, power_demand: 0.0 },
      statePayoffs: { boom: 106, normal: 105, slowdown: 104, recession: 103, crisis: 101 },
      trueExpectedReturn: 0.022,
    },
    {
      id: 'nominal_bond',
      name: '10Y Nominal Treasury',
      icon: '🏛️',
      sector: 'Government Bonds',
      currentPrice: 92.0,
      factorClues: ['Negative Inflation Exposure', 'Duration Risk'],
      trueBetas: { growth: -0.1, inflation: 0.7, oil: 0.0, power_demand: 0.0 },
      statePayoffs: { boom: 104, normal: 100, slowdown: 96, recession: 90, crisis: 82 },
      trueExpectedReturn: 0.056,
    },
    {
      id: 'tech_growth',
      name: 'HyperScale Tech',
      icon: '💻',
      sector: 'Technology',
      currentPrice: 105.0,
      factorClues: ['High Growth Exposure', 'Duration Sensitive'],
      trueBetas: { growth: 1.8, inflation: 0.3, oil: -0.1, power_demand: 0.2 },
      statePayoffs: { boom: 150, normal: 120, slowdown: 92, recession: 65, crisis: 38 },
      trueExpectedReturn: 0.153,
    },
    {
      id: 'staples_infl',
      name: 'PricePower Consumer',
      icon: '🏪',
      sector: 'Consumer Staples',
      currentPrice: 99.0,
      factorClues: ['Pricing Power', 'Low Growth Beta'],
      trueBetas: { growth: 0.15, inflation: -0.3, oil: 0.05, power_demand: 0.05 },
      statePayoffs: { boom: 107, normal: 104, slowdown: 102, recession: 98, crisis: 93 },
      trueExpectedReturn: 0.039,
    },
    {
      id: 'cash',
      name: 'Money Market Fund',
      icon: '💵',
      sector: 'Cash',
      currentPrice: 100.0,
      factorClues: ['Risk-Free Rate', 'No Factor Exposure'],
      trueBetas: { growth: 0.0, inflation: 0.0, oil: 0.0, power_demand: 0.0 },
      statePayoffs: { boom: 104, normal: 104, slowdown: 104, recession: 104, crisis: 104 },
      trueExpectedReturn: 0.04,
    },
  ],
  rounds: [
    {
      roundNumber: 1,
      decisionType: 'rank_expected_returns',
      instruction:
        'Rank these assets from LOWEST to HIGHEST expected return after the inflation surprise.',
      correctRanking: ['tips', 'staples_infl', 'cash', 'nominal_bond', 'tech_growth'],
      reasoningQuestion: {
        question:
          'Why do TIPS have the lowest expected return despite the inflation shock?',
        options: [
          'Because TIPS are government bonds and always safe',
          'Because TIPS hedge inflation risk — their negative inflation beta means they pay more when inflation hurts, making them valuable insurance',
          'Because TIPS have the highest price',
          'Because inflation does not affect bond returns',
        ],
        correctIndex: 1,
        explanation:
          'TIPS have β_inflation = -0.8, meaning they gain value when inflation rises. Investors pay a premium for this hedge, accepting lower expected returns. High price today means low expected return going forward — the cost of insurance.',
      },
    },
    {
      roundNumber: 2,
      decisionType: 'estimate_betas',
      instruction:
        'Place each asset on the Growth Beta (x-axis) vs Inflation Beta (y-axis) map.',
      axisConfig: {
        xAxis: { factor: 'growth', label: 'Growth Beta', range: [-0.5, 2.0] },
        yAxis: { factor: 'inflation', label: 'Inflation Beta', range: [-1.0, 1.0] },
      },
      reasoningQuestion: {
        question:
          'Why does the nominal Treasury appear in the upper half of the inflation beta map?',
        options: [
          'Because Treasuries always beat inflation',
          'Because nominal bonds lose value when inflation rises — their positive inflation beta means they co-move with inflation shocks, adding to required returns',
          'Because Treasuries are risky investments',
          'Because the Fed controls bond prices',
        ],
        correctIndex: 1,
        explanation:
          'Nominal bonds have fixed coupons eroded by inflation. Their positive inflation beta (0.7) means they perform poorly in high-inflation states, which are also bad states for investors. This systematic exposure is priced — investors demand higher returns.',
      },
    },
    {
      roundNumber: 3,
      decisionType: 'build_arbitrage',
      instruction:
        'TIPS and nominal Treasuries have opposite inflation exposures. Can you construct a portfolio that isolates the inflation risk premium?',
      availableAssets: ['tips', 'nominal_bond', 'tech_growth', 'cash'],
      reasoningQuestion: {
        question:
          'What does comparing TIPS and nominal bonds reveal about inflation as a priced factor?',
        options: [
          'Inflation risk does not matter for bond investors',
          'The return spread between nominal and inflation-protected bonds reflects the market price of inflation risk',
          'TIPS are always better than nominal bonds',
          'Both bonds have the same expected return in equilibrium',
        ],
        correctIndex: 1,
        explanation:
          'The difference in expected returns between nominal bonds (β_infl = +0.7) and TIPS (β_infl = -0.8) reflects 1.5 units of inflation beta difference times λ_inflation. This spread is the market-implied inflation risk premium.',
      },
    },
  ],
};
