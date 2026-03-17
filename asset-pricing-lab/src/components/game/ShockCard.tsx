import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import type { Scenario, FactorId } from '../../types/index.ts';
import { FACTOR_COLORS, FACTOR_LABELS } from '../../types/index.ts';

interface ShockCardProps {
  scenario: Scenario;
}

export default function ShockCard({ scenario }: ShockCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-bg-secondary border border-border rounded-xl p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-accent-yellow" />
        <span className="text-xs font-semibold text-accent-yellow uppercase tracking-wider">
          Macro Shock
        </span>
      </div>

      <h3 className="text-base font-bold text-text-primary mb-2 leading-tight">
        {scenario.headline}
      </h3>

      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        {scenario.description}
      </p>

      <div className="space-y-2">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wider">
          Factor Shocks
        </p>
        {(Object.keys(scenario.factors) as FactorId[]).map((factorId) => {
          const factor = scenario.factors[factorId];
          const isPositive = factor.shock > 0;
          return (
            <motion.div
              key={factorId}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: FACTOR_COLORS[factorId] }}
                />
                <span className="text-xs text-text-secondary">
                  {FACTOR_LABELS[factorId]}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className="text-xs font-mono font-semibold"
                  style={{
                    color: isPositive ? '#22C55E' : '#EF4444',
                  }}
                >
                  {isPositive ? '+' : ''}{factor.shock.toFixed(1)}σ
                </span>
                <span className="text-xs">
                  {isPositive ? '↑' : '↓'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
