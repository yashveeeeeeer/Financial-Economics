import { motion } from 'framer-motion';
import EquationCard from '../components/equations/EquationCard.tsx';

const SECTIONS = [
  {
    title: 'Asset Pricing Basics',
    equations: [
      {
        title: 'Fundamental Pricing Equation',
        latex: 'p = E[m \\cdot x]',
        explanation:
          'The price of any asset today equals the expected value of its future payoff (x) multiplied by the stochastic discount factor (m). The SDF encodes how much investors value payoffs in different states of the world — payoffs in bad economic states are weighted more heavily.',
        variables: [
          { symbol: 'p', meaning: 'Price of the asset today' },
          { symbol: 'm', meaning: 'Stochastic discount factor (pricing kernel)' },
          { symbol: 'x', meaning: 'Random future payoff of the asset' },
          { symbol: 'E[\\cdot]', meaning: 'Expectation over all possible states' },
        ],
      },
      {
        title: 'State-Price Decomposition',
        latex: 'p = \\sum_s \\pi_s \\cdot m_s \\cdot x_s',
        explanation:
          'When we have a finite number of states, the pricing equation becomes a weighted sum. Each state contributes its probability (π), its SDF value (m), and the asset payoff (x) in that state. States with high SDF values (bad times) contribute disproportionately to the price.',
        variables: [
          { symbol: '\\pi_s', meaning: 'Probability of state s' },
          { symbol: 'm_s', meaning: 'SDF value in state s (high in bad states)' },
          { symbol: 'x_s', meaning: 'Asset payoff in state s' },
        ],
      },
    ],
  },
  {
    title: 'Expected Return and Risk',
    equations: [
      {
        title: 'Risk Premium via SDF Covariance',
        latex: 'E(R_i) - R_f = -\\frac{\\text{Cov}(m, R_i)}{E(m)}',
        explanation:
          'An asset\'s risk premium — the excess return above the risk-free rate — is determined by the negative of its covariance with the SDF. Assets that lose value when the SDF is high (bad economic times) have negative Cov(m, R) and therefore require positive risk premia. This is the core insight: risk is about co-movement with bad times, not total volatility.',
        variables: [
          { symbol: 'E(R_i)', meaning: 'Expected return on asset i' },
          { symbol: 'R_f', meaning: 'Risk-free rate' },
          { symbol: '\\text{Cov}(m, R_i)', meaning: 'Covariance of SDF with asset return' },
          { symbol: 'E(m)', meaning: 'Expected value of the SDF' },
        ],
      },
    ],
  },
  {
    title: 'Factor Model for the SDF',
    equations: [
      {
        title: 'Linear Factor Model',
        latex: 'm = a + b_1 F_1 + b_2 F_2 + \\cdots + b_k F_k',
        explanation:
          'The SDF can be expressed as a linear function of macroeconomic factors. Growth shocks, inflation surprises, oil price changes, and power demand shifts all feed into how investors value different states. The coefficients (b) capture how each factor affects the marginal utility of consumption.',
        variables: [
          { symbol: 'F_k', meaning: 'Realization of factor k (e.g., GDP growth, inflation)' },
          { symbol: 'b_k', meaning: 'Sensitivity of the SDF to factor k' },
          { symbol: 'a', meaning: 'Constant term (related to risk-free rate)' },
        ],
      },
    ],
  },
  {
    title: 'Factor Beta',
    equations: [
      {
        title: 'Beta as Regression Slope',
        latex: '\\beta_{ik} = \\frac{\\text{Cov}(R_i, F_k)}{\\text{Var}(F_k)}',
        explanation:
          'Factor beta measures how sensitive an asset\'s return is to a particular factor. It is the slope from regressing the asset return on the factor. A beta of 1.5 means the asset return moves 1.5% for every 1% move in the factor. Positive beta means the asset co-moves with the factor; negative beta means it moves against it.',
        variables: [
          { symbol: '\\beta_{ik}', meaning: 'Beta of asset i with respect to factor k' },
          { symbol: '\\text{Cov}(R_i, F_k)', meaning: 'Covariance of asset return with the factor' },
          { symbol: '\\text{Var}(F_k)', meaning: 'Variance of the factor' },
        ],
      },
    ],
  },
  {
    title: 'Risk Premium Decomposition',
    equations: [
      {
        title: 'Multi-Factor Expected Return',
        latex: 'E(R_i) = R_f + \\beta_{i1}\\lambda_1 + \\beta_{i2}\\lambda_2 + \\cdots + \\beta_{ik}\\lambda_k',
        explanation:
          'The expected return on any asset decomposes into the risk-free rate plus a sum of risk premia. Each premium is the product of the asset\'s exposure to a factor (beta) and the market price of that factor\'s risk (lambda). Only systematic, factor-related risk is compensated — idiosyncratic risk earns no premium because it can be diversified away.',
        variables: [
          { symbol: '\\lambda_k', meaning: 'Risk premium per unit of factor k exposure (market price of risk)' },
          { symbol: '\\beta_{ik}', meaning: 'Asset i\'s exposure to factor k' },
          { symbol: 'R_f', meaning: 'Risk-free rate (compensation for time, not risk)' },
        ],
      },
    ],
  },
  {
    title: 'No-Arbitrage and APT',
    equations: [
      {
        title: 'No-Arbitrage Condition',
        latex: '\\beta_A = \\beta_B \\implies E(R_A) = E(R_B)',
        explanation:
          'If two assets have identical factor exposures, they must earn the same expected return. If they don\'t, you can go long the higher-return asset, short the lower-return one, and construct a portfolio with zero factor exposure and positive expected payoff — an arbitrage. In equilibrium, such opportunities cannot persist.',
        variables: [
          { symbol: '\\beta_A, \\beta_B', meaning: 'Factor beta vectors of assets A and B' },
          { symbol: 'E(R_A), E(R_B)', meaning: 'Expected returns on assets A and B' },
        ],
      },
      {
        title: 'Arbitrage Portfolio',
        latex: '\\sum_i w_i \\beta_{ik} = 0 \\;\\forall\\; k, \\quad \\sum_i w_i E(R_i) > 0',
        explanation:
          'An arbitrage portfolio has zero net exposure to every factor (achieved by choosing weights w that cancel out all betas) but still generates a positive expected return. This is only possible if the pricing relationship E(R) = Rf + Σβλ is violated for some asset.',
        variables: [
          { symbol: 'w_i', meaning: 'Portfolio weight on asset i' },
          { symbol: '\\beta_{ik}', meaning: 'Asset i\'s beta on factor k' },
        ],
      },
    ],
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Theory Guide
          </h1>
          <p className="text-sm text-text-secondary">
            The equations and intuition behind asset pricing, factor models, and no-arbitrage.
          </p>
        </motion.div>

        <div className="space-y-8">
          {SECTIONS.map((section, sIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sIdx * 0.08 }}
            >
              <h2 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-accent-blue/20 text-accent-blue text-xs font-bold flex items-center justify-center">
                  {sIdx + 1}
                </span>
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.equations.map((eq) => (
                  <EquationCard
                    key={eq.title}
                    title={eq.title}
                    latex={eq.latex}
                    explanation={eq.explanation}
                    variables={eq.variables}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
