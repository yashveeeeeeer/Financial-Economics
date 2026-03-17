import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Play } from 'lucide-react';
import { ALL_SCENARIOS } from '../data/scenarios/index.ts';
import Card from '../components/ui/Card.tsx';
import type { FactorId } from '../types/index.ts';
import { FACTOR_COLORS, FACTOR_LABELS } from '../types/index.ts';

export default function SimulationsPage() {
  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">Simulations</h1>
          <p className="text-sm text-text-secondary">
            Face macro shocks, rank assets, estimate betas, and build arbitrage portfolios.
          </p>
        </motion.div>

        <div className="space-y-4">
          {ALL_SCENARIOS.map((scenario, i) => {
            const isLocked = false; // All unlocked for now
            return (
              <Card key={scenario.id} delay={i * 0.1}>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
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

                    <h2 className="text-lg font-bold text-text-primary mb-1">
                      {scenario.title}
                    </h2>
                    <p className="text-xs text-text-secondary mb-3 leading-relaxed">
                      {scenario.description}
                    </p>

                    {/* Factor pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {(Object.keys(scenario.factors) as FactorId[]).map((f) => {
                        const shock = scenario.factors[f].shock;
                        if (Math.abs(shock) < 0.3) return null;
                        return (
                          <span
                            key={f}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium"
                            style={{
                              backgroundColor: `${FACTOR_COLORS[f]}15`,
                              color: FACTOR_COLORS[f],
                              border: `1px solid ${FACTOR_COLORS[f]}30`,
                            }}
                          >
                            {FACTOR_LABELS[f]} {shock > 0 ? '↑' : '↓'}
                          </span>
                        );
                      })}
                    </div>

                    <div className="text-[10px] text-text-muted">
                      {scenario.rounds.length} rounds •{' '}
                      {scenario.rounds.map((r) => r.decisionType.replace(/_/g, ' ')).join(' • ')}
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isLocked ? (
                      <div className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-bg-tertiary text-text-muted text-sm">
                        <Lock className="w-3.5 h-3.5" />
                        Locked
                      </div>
                    ) : (
                      <Link
                        to={`/simulations/${scenario.id}`}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent-blue hover:bg-blue-500 text-white text-sm font-medium transition-colors"
                      >
                        <Play className="w-3.5 h-3.5" />
                        Play
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
