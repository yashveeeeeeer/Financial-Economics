import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scenarios } from '../data/scenarios';

const concepts = [
  {
    title: 'Stochastic Discount Factor',
    equation: 'p = E[mx]',
    description: 'Asset prices reflect expected payoffs weighted by how valuable each state of the world is to investors.',
    color: '#6366f1',
  },
  {
    title: 'Risk Premium & Covariance',
    equation: 'E(Rᵢ) − Rf = −Cov(m, Rᵢ) / E(m)',
    description: 'Assets that pay poorly in bad times (negative covariance with SDF) must offer higher expected returns.',
    color: '#10b981',
  },
  {
    title: 'Factor Betas',
    equation: 'βᵢₖ = Cov(Rᵢ, Fₖ) / Var(Fₖ)',
    description: 'Sensitivity to systematic factors determines an asset\'s exposure to priced risk.',
    color: '#f59e0b',
  },
  {
    title: 'Factor Risk Premia',
    equation: 'E(Rᵢ) = Rf + Σ βᵢₖ λₖ',
    description: 'Expected returns decompose into the risk-free rate plus compensation for each factor exposure.',
    color: '#ef4444',
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-purple-900/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="text-xs font-medium text-accent-primary uppercase tracking-widest mb-4">
              Financial Economics Education
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Interactive Asset{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-purple-400">
                Pricing Lab
              </span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl">
              Understand why different assets earn different expected returns through macro shocks,
              factor exposure, and visual pricing logic.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/simulations" className="btn-primary text-base">
                Start Simulations
              </Link>
              <Link to="/learn" className="btn-secondary text-base">
                Learn the Framework
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-3xl">
          <h2 className="section-title">Why This Matters</h2>
          <p className="text-gray-400 leading-relaxed">
            The central question of asset pricing is not "what will this stock do tomorrow?" but
            "why do some assets earn higher average returns than others?" The answer lies in the
            covariance between asset payoffs and the states of the world investors fear most. This
            lab makes that logic visual, interactive, and concrete.
          </p>
        </div>
      </section>

      {/* Core Concepts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="section-title">Core Concepts</h2>
        <p className="section-subtitle">The four pillars of factor-based asset pricing</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {concepts.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-hover group"
            >
              <div className="w-2 h-2 rounded-full mb-3" style={{ backgroundColor: c.color }} />
              <h3 className="text-white font-semibold mb-1">{c.title}</h3>
              <div className="font-mono text-sm mb-3" style={{ color: c.color }}>
                {c.equation}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{c.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Scenario Previews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="section-title">Scenarios</h2>
        <p className="section-subtitle">Real-world macro shocks that test your pricing intuition</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/simulations/${s.id}`} className="block card-hover h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    s.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                    s.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {s.difficulty}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">{s.subtitle}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.concepts.map((c) => (
                    <span key={c} className="text-xs text-gray-500 bg-surface-900 px-2 py-0.5 rounded">
                      {c}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
