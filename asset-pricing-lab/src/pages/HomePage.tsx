import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, BookOpen, Sigma, Zap, Shield, TrendingUp } from 'lucide-react';
import Equation from '../components/equations/Equation.tsx';
import { ALL_SCENARIOS } from '../data/scenarios/index.ts';
import Card from '../components/ui/Card.tsx';

const CONCEPTS = [
  {
    icon: <Sigma className="w-5 h-5" />,
    title: 'Stochastic Discount Factor',
    latex: 'p = E[m \\cdot x]',
    desc: 'Asset prices equal the expected product of the SDF and future payoffs. The SDF assigns higher weight to bad economic states.',
    color: '#06B6D4',
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: 'Expected Return & Covariance',
    latex: 'E(R_i) - R_f = -\\frac{\\text{Cov}(m, R_i)}{E(m)}',
    desc: 'Assets that lose value in bad times must offer higher expected returns. The risk premium depends on covariance with the SDF.',
    color: '#F97316',
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Factor Risk Premia',
    latex: 'E(R_i) = R_f + \\sum_k \\beta_{ik} \\lambda_k',
    desc: 'Expected returns decompose into a risk-free rate plus compensation for each factor exposure, weighted by the price of that risk.',
    color: '#3B82F6',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'No-Arbitrage',
    latex: '\\beta_A = \\beta_B \\implies E(R_A) = E(R_B)',
    desc: 'If two assets have the same factor exposures, they must earn the same expected return. Otherwise, a factor-neutral arbitrage exists.',
    color: '#A855F7',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen pt-14">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-accent-blue/10 border border-accent-blue/20 rounded-full px-4 py-1.5 mb-6">
              <Zap className="w-3.5 h-3.5 text-accent-blue" />
              <span className="text-xs font-medium text-accent-blue">
                Interactive Financial Economics
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-tight mb-4">
              Interactive Asset
              <br />
              <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">
                Pricing Lab
              </span>
            </h1>

            <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed mb-8">
              Understand why different assets earn different expected returns through
              macro shocks, factor exposure, and visual pricing logic.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/simulations"
                className="inline-flex items-center gap-2 bg-accent-blue hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm"
              >
                Enter Simulations
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/learn"
                className="inline-flex items-center gap-2 bg-bg-tertiary hover:bg-slate-600 text-text-primary px-6 py-3 rounded-lg font-medium transition-colors border border-border text-sm"
              >
                <BookOpen className="w-4 h-4" />
                Theory Guide
              </Link>
              <Link
                to="/equations"
                className="inline-flex items-center gap-2 bg-bg-tertiary hover:bg-slate-600 text-text-primary px-6 py-3 rounded-lg font-medium transition-colors border border-border text-sm"
              >
                <Sigma className="w-4 h-4" />
                Equation Explorer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-bold text-text-primary mb-3">
            Why Do Assets Earn Different Returns?
          </h2>
          <p className="text-sm text-text-secondary max-w-xl mx-auto">
            A government bond earns less than a tech stock. Not because tech is "better" — but
            because investors price <em>when</em> payoffs arrive, <em>how</em> assets co-move
            with economic risks, and <em>whether</em> those risks are rewarded in equilibrium.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {CONCEPTS.map((c, i) => (
            <Card key={c.title} delay={i * 0.1}>
              <div className="flex items-start gap-3">
                <div
                  className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${c.color}20`, color: c.color }}
                >
                  {c.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-text-primary mb-1">{c.title}</h3>
                  <div className="mb-2">
                    <Equation latex={c.latex} className="text-xs" />
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Scenario Previews */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 border-t border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-2 text-center">
          Simulation Scenarios
        </h2>
        <p className="text-sm text-text-secondary text-center mb-8">
          Face real macro shocks and discover how factor pricing works through interactive decisions.
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {ALL_SCENARIOS.map((scenario, i) => (
            <Card key={scenario.id} delay={i * 0.1}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-accent-cyan uppercase tracking-wider">
                    Scenario {i + 1}
                  </span>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      scenario.difficulty === 'easy'
                        ? 'bg-accent-green/15 text-accent-green'
                        : scenario.difficulty === 'medium'
                        ? 'bg-accent-yellow/15 text-accent-yellow'
                        : 'bg-accent-red/15 text-accent-red'
                    }`}
                  >
                    {scenario.difficulty}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-text-primary">{scenario.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                  {scenario.description}
                </p>
                <Link
                  to={`/simulations/${scenario.id}`}
                  className="inline-flex items-center gap-1 text-xs text-accent-blue hover:text-blue-400 font-medium mt-1"
                >
                  Play scenario
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-xs text-text-muted">
          Interactive Asset Pricing Lab — Built for learning financial economics
        </p>
      </footer>
    </div>
  );
}
