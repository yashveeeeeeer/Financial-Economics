import { motion } from 'framer-motion';
import { BookOpen, Code, BarChart3, GraduationCap } from 'lucide-react';
import Equation from '../components/equations/Equation.tsx';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">About</h1>
          <p className="text-sm text-text-secondary">
            An educational platform for understanding modern asset pricing theory.
          </p>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-bg-secondary border border-border rounded-xl p-5"
          >
            <div className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
              <div>
                <h2 className="text-base font-semibold text-text-primary mb-2">
                  Purpose
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  The Interactive Asset Pricing Lab is designed to teach the core
                  ideas of financial economics through hands-on experience. Rather
                  than memorizing formulas, students interact with macro shocks,
                  estimate factor exposures, and discover why expected returns
                  differ across assets — all grounded in the no-arbitrage framework.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-bg-secondary border border-border rounded-xl p-5"
          >
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-accent-orange shrink-0 mt-0.5" />
              <div>
                <h2 className="text-base font-semibold text-text-primary mb-2">
                  Theoretical Foundation
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  The platform is built on the standard asset pricing framework:
                </p>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-blue">•</span>
                    <span>
                      <strong>Stochastic Discount Factor (SDF)</strong> — the
                      fundamental pricing equation{' '}
                      <Equation latex="p = E[mx]" className="text-xs" /> connects
                      prices to state-dependent valuation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-orange">•</span>
                    <span>
                      <strong>Factor models</strong> — the SDF is driven by
                      macroeconomic factors like growth, inflation, and commodity
                      prices
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-purple">•</span>
                    <span>
                      <strong>Arbitrage Pricing Theory (APT)</strong> — expected
                      returns decompose into factor risk premia, and mispricing
                      creates arbitrage opportunities
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-bg-secondary border border-border rounded-xl p-5"
          >
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
              <div>
                <h2 className="text-base font-semibold text-text-primary mb-2">
                  Key Distinctions
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-2">
                  The platform is careful to maintain these important conceptual boundaries:
                </p>
                <div className="grid gap-2">
                  {[
                    ['Price today', 'Expected return going forward'],
                    ['Cash-flow news', 'Discount-rate logic'],
                    ['Volatility', 'Priced risk'],
                    ['Idiosyncratic risk', 'Systematic factor risk'],
                    ['Hedge value', 'Risk premium'],
                  ].map(([a, b]) => (
                    <div
                      key={a}
                      className="flex items-center gap-2 text-xs bg-bg-primary rounded-lg px-3 py-2"
                    >
                      <span className="text-accent-red font-medium">{a}</span>
                      <span className="text-text-muted">≠</span>
                      <span className="text-accent-green font-medium">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-bg-secondary border border-border rounded-xl p-5"
          >
            <div className="flex items-start gap-3">
              <Code className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
              <div>
                <h2 className="text-base font-semibold text-text-primary mb-2">
                  Technology
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Built with React, TypeScript, Vite, Tailwind CSS, Recharts for
                  data visualization, KaTeX for equation rendering, and Framer
                  Motion for transitions. Fully static — no backend, no APIs. All
                  scenario data is hand-authored and lives in typed data files.
                  Deployable on GitHub Pages.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
