import EquationDisplay from '../components/EquationDisplay';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-white mb-2">About This Project</h1>
      <p className="text-gray-400 mb-8">
        An interactive educational platform for understanding asset pricing through the lens of the
        stochastic discount factor.
      </p>

      <div className="space-y-8">
        <section className="card">
          <h2 className="text-xl font-semibold text-white mb-3">What This Teaches</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            This lab teaches the core question of financial economics: why do different assets earn
            different expected returns? The answer is not about volatility, past performance, or
            narrative quality. It is about how an asset's payoffs co-move with bad states of the
            world — states where investors value wealth most.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Through interactive simulations with realistic macro scenarios, you learn to decompose
            expected returns into factor exposures and risk premia, distinguish cash-flow news from
            discount-rate effects, and understand why hedge assets earn less.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-semibold text-white mb-3">The Framework</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Everything in this lab follows from one equation:
          </p>
          <EquationDisplay
            equation="p = E[m \cdot x]"
            label="The fundamental pricing equation"
            interpretation="The price of any asset equals the expected value of its future payoff, weighted by the stochastic discount factor m."
            pinned
          />
          <p className="text-gray-300 text-sm leading-relaxed mt-4">
            From this single equation, we derive expected return formulas, factor pricing models,
            and no-arbitrage conditions. Every simulation in this lab connects back to this principle.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-semibold text-white mb-3">Key Distinctions</h2>
          <div className="space-y-3">
            {[
              ['Price today', 'Expected return going forward'],
              ['Cash-flow news', 'Discount-rate logic'],
              ['Volatility', 'Priced risk (systematic factor exposure)'],
              ['Idiosyncratic risk', 'Systematic factor risk'],
              ['Hedge value (high price, low return)', 'Risk premium (low price, high return)'],
            ].map(([a, b]) => (
              <div key={a} className="flex items-center gap-3 text-sm">
                <span className="text-gray-400 flex-1 text-right">{a}</span>
                <span className="text-gray-600">vs.</span>
                <span className="text-gray-300 flex-1">{b}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 className="text-xl font-semibold text-white mb-3">Academic References</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Cochrane, J. H. (2005). <em>Asset Pricing</em>. Princeton University Press.</li>
            <li>Campbell, J. Y. (2018). <em>Financial Decisions and Markets</em>. Princeton University Press.</li>
            <li>Mehra, R. & Prescott, E. C. (1985). The Equity Premium: A Puzzle. <em>Journal of Monetary Economics</em>.</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="text-xl font-semibold text-white mb-3">Technical Stack</h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts', 'KaTeX', 'Framer Motion'].map((tech) => (
              <span key={tech} className="text-xs px-3 py-1 rounded-full bg-surface-900 text-gray-400 border border-gray-700">
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
