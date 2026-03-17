import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EquationDisplay from '../components/EquationDisplay';

interface Section {
  id: string;
  title: string;
  content: string[];
  equation: string;
  equationLabel: string;
  interpretation: string;
  keyDistinction?: { wrong: string; right: string };
}

const sections: Section[] = [
  {
    id: 'sdf',
    title: '1. The Stochastic Discount Factor',
    content: [
      'The price of any asset equals the expected value of its future payoff, weighted by the stochastic discount factor (SDF). The SDF assigns higher weight to states of the world where investors value wealth more — typically recessions and crises.',
      'In good times (booms), the SDF weight is low: an extra dollar is less valuable when you are already wealthy. In bad times (recessions), the SDF weight is high: an extra dollar is extremely valuable when wealth is scarce.',
      'This means an asset that pays well in bad times gets a high SDF-weighted price. Its price is bid up today, which mechanically lowers its expected return going forward.',
    ],
    equation: 'p = E[m \\cdot x] = \\sum_s \\pi_s \\, m_s \\, x_s',
    equationLabel: 'Fundamental pricing equation',
    interpretation: 'p = price today, m = SDF (high in bad states), x = future payoff, π = state probability',
  },
  {
    id: 'covariance',
    title: '2. Expected Returns and Covariance',
    content: [
      'An asset\'s expected excess return (over the risk-free rate) is determined by how its return co-moves with the SDF. Specifically, it depends on the negative of the covariance between the asset return and the SDF.',
      'If an asset\'s return is negatively correlated with the SDF (it pays well in good times and poorly in bad times), then −Cov(m, Rᵢ) is positive, meaning the asset must offer a positive risk premium.',
      'If an asset\'s return is positively correlated with the SDF (it pays well in bad times — a hedge), then −Cov(m, Rᵢ) is negative, and the asset can have a low or even negative excess return.',
    ],
    equation: 'E(R_i) - R_f = -\\frac{\\text{Cov}(m, R_i)}{E(m)}',
    equationLabel: 'Risk premium equation',
    interpretation: 'Negative covariance with the SDF ↔ positive risk premium. The asset fails investors in bad times, so they demand compensation.',
    keyDistinction: {
      wrong: 'Volatile assets earn higher returns',
      right: 'Assets that covary negatively with the SDF earn higher returns. Volatility alone is not priced.',
    },
  },
  {
    id: 'factors',
    title: '3. The SDF as a Function of Factors',
    content: [
      'In practice, the SDF can be modeled as a linear function of observable economic factors: growth, inflation, oil prices, etc. Each factor captures a dimension of systematic risk.',
      'The SDF loads on these factors with coefficients b₁, b₂, ... that reflect how important each factor is for pricing. Factors that strongly predict bad times get larger weights.',
      'This allows us to decompose the abstract "covariance with bad times" into concrete, measurable factor exposures.',
    ],
    equation: 'm = a + b_1 F_1 + b_2 F_2 + \\cdots + b_k F_k',
    equationLabel: 'Linear factor model for the SDF',
    interpretation: 'The SDF is driven by economic factors. Each factor captures a source of systematic risk that investors care about.',
  },
  {
    id: 'betas',
    title: '4. Factor Betas',
    content: [
      'An asset\'s factor beta measures its sensitivity to a given factor. A growth beta of 1.5 means the asset\'s return amplifies growth shocks by 50%. A negative oil beta means the asset moves opposite to oil prices.',
      'Factor betas are not about total risk — they capture only the systematic exposure to each priced factor. An asset can be extremely volatile due to idiosyncratic risk and still have low factor betas.',
      'The sign and magnitude of betas directly determine whether a factor adds to or subtracts from an asset\'s expected return.',
    ],
    equation: '\\beta_{ik} = \\frac{\\text{Cov}(R_i, F_k)}{\\text{Var}(F_k)}',
    equationLabel: 'Factor beta definition',
    interpretation: 'Beta = regression slope of asset return on factor. Positive beta means the asset moves with the factor; negative means it moves against it.',
    keyDistinction: {
      wrong: 'High volatility = high beta',
      right: 'Beta captures systematic factor exposure only. An asset can be volatile for idiosyncratic reasons with low beta.',
    },
  },
  {
    id: 'decomposition',
    title: '5. Risk Premium Decomposition',
    content: [
      'Combining factor betas with factor risk premia gives the complete expected return decomposition. Each factor contributes βᵢₖ × λₖ to the expected return.',
      'λₖ is the factor risk premium — the market price of bearing one unit of factor-k exposure. Growth factors typically have positive λ. Inflation and oil factors can have negative λ if their shocks coincide with bad times.',
      'This is the key equation for understanding cross-sectional differences in expected returns. Two assets with different expected returns must differ in their factor betas (assuming no arbitrage).',
    ],
    equation: 'E(R_i) = R_f + \\beta_{i1} \\lambda_1 + \\beta_{i2} \\lambda_2 + \\cdots + \\beta_{ik} \\lambda_k',
    equationLabel: 'Factor pricing equation',
    interpretation: 'Expected return = risk-free rate + compensation for each factor exposure. Negative beta on a positive-λ factor subtracts from expected return.',
    keyDistinction: {
      wrong: 'All risk is compensated',
      right: 'Only systematic factor risk is compensated. Idiosyncratic risk earns no premium because it can be diversified.',
    },
  },
  {
    id: 'no-arbitrage',
    title: '6. No-Arbitrage',
    content: [
      'The no-arbitrage condition requires that assets with identical factor exposures earn the same expected return. If two assets have the same betas but different expected returns, an arbitrage exists.',
      'You can construct an arbitrage portfolio by going long the underpriced (high expected return) asset and short the overpriced (low expected return) asset. This portfolio has zero net factor exposure but positive expected return.',
      'In equilibrium, such opportunities are traded away. The factor pricing equation holds because arbitrage forces prices to be consistent with the SDF.',
    ],
    equation: 'E(R_i) - E(R_j) = \\sum_k (\\beta_{ik} - \\beta_{jk}) \\lambda_k',
    equationLabel: 'No-arbitrage condition',
    interpretation: 'If βᵢ = βⱼ for all factors but E(Rᵢ) ≠ E(Rⱼ), you can build a factor-neutral portfolio with free expected return — an arbitrage.',
  },
];

export default function Learn() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const current = sections.find((s) => s.id === activeSection) ?? sections[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Learn the Framework</h1>
        <p className="text-gray-400">
          The stochastic discount factor approach to understanding risk premia — from first principles.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Nav */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="lg:sticky lg:top-24 space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
                  activeSection === s.id
                    ? 'bg-accent-primary/10 text-accent-primary font-medium'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-surface-800'
                }`}
              >
                {s.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="card">
                <h2 className="text-xl font-bold text-white mb-6">{current.title}</h2>

                <div className="space-y-4 mb-6">
                  {current.content.map((p, i) => (
                    <p key={i} className="text-gray-300 text-sm leading-relaxed">{p}</p>
                  ))}
                </div>

                <EquationDisplay
                  equation={current.equation}
                  label={current.equationLabel}
                  interpretation={current.interpretation}
                  pinned
                  size="lg"
                />

                {current.keyDistinction && (
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                      <div className="text-xs text-red-400 uppercase tracking-wider mb-1">Common Misconception</div>
                      <p className="text-gray-300 text-sm">{current.keyDistinction.wrong}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                      <div className="text-xs text-green-400 uppercase tracking-wider mb-1">Correct Distinction</div>
                      <p className="text-gray-300 text-sm">{current.keyDistinction.right}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
