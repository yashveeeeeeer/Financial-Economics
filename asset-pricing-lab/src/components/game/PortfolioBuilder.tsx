import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Asset, FactorId } from '../../types/index.ts';
import { FACTOR_COLORS, FACTOR_LABELS } from '../../types/index.ts';
import { computeExpectedReturn } from '../../engine/pricing.ts';
import { formatPercent } from '../../utils/formatters.ts';
import Button from '../ui/Button.tsx';

interface PortfolioBuilderProps {
  assets: Asset[];
  riskFreeRate: number;
  premia: Record<string, number>;
  onSubmit: (weights: Record<string, number>) => void;
}

const FACTOR_KEYS: FactorId[] = ['growth', 'inflation', 'oil', 'power_demand'];

export default function PortfolioBuilder({
  assets,
  riskFreeRate,
  premia,
  onSubmit,
}: PortfolioBuilderProps) {
  const [weights, setWeights] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    assets.forEach((a) => (init[a.id] = 0));
    return init;
  });

  const netExposure = useMemo(() => {
    const net: Record<string, number> = {};
    FACTOR_KEYS.forEach((f) => {
      net[f] = assets.reduce((sum, a) => sum + (weights[a.id] || 0) * a.trueBetas[f], 0);
    });
    return net;
  }, [weights, assets]);

  const netReturn = useMemo(() => {
    return assets.reduce((sum, a) => {
      const er = computeExpectedReturn(riskFreeRate, a.trueBetas, premia);
      return sum + (weights[a.id] || 0) * er;
    }, 0);
  }, [weights, assets, riskFreeRate, premia]);

  const netCost = useMemo(() => {
    return assets.reduce((sum, a) => sum + (weights[a.id] || 0) * a.currentPrice, 0);
  }, [weights, assets]);

  const isNeutral = FACTOR_KEYS.every((f) => Math.abs(netExposure[f]) <= 0.1);

  return (
    <div className="space-y-4">
      <p className="text-sm text-text-secondary">
        Assign portfolio weights to construct a factor-neutral portfolio with positive expected return.
      </p>

      {/* Sliders */}
      <div className="space-y-3">
        {assets.map((asset) => (
          <div key={asset.id} className="flex items-center gap-3">
            <div className="w-32 shrink-0 flex items-center gap-1.5">
              <span className="text-base">{asset.icon}</span>
              <span className="text-xs text-text-primary truncate">{asset.name}</span>
            </div>
            <input
              type="range"
              min={-1}
              max={1}
              step={0.05}
              value={weights[asset.id] || 0}
              onChange={(e) =>
                setWeights((prev) => ({
                  ...prev,
                  [asset.id]: parseFloat(e.target.value),
                }))
              }
              className="flex-1 accent-accent-blue"
            />
            <span className="w-14 text-right text-xs font-mono text-text-secondary">
              {((weights[asset.id] || 0) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>

      {/* Net exposure summary */}
      <div className="grid grid-cols-2 gap-2 p-3 bg-bg-primary rounded-lg border border-border">
        {FACTOR_KEYS.map((f) => {
          const val = netExposure[f];
          const neutral = Math.abs(val) <= 0.1;
          return (
            <div key={f} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: FACTOR_COLORS[f] }}
                />
                <span className="text-xs text-text-muted">Net β_{FACTOR_LABELS[f]}</span>
              </div>
              <span
                className={`text-xs font-mono font-semibold ${
                  neutral ? 'text-accent-green' : 'text-accent-red'
                }`}
              >
                {val >= 0 ? '+' : ''}{val.toFixed(2)}
                {neutral ? ' ✓' : ''}
              </span>
            </div>
          );
        })}
        <div className="col-span-2 border-t border-border pt-2 mt-1 flex justify-between">
          <span className="text-xs text-text-muted">Net E(R)</span>
          <span
            className={`text-xs font-mono font-semibold ${
              netReturn > 0 ? 'text-accent-green' : 'text-accent-red'
            }`}
          >
            {formatPercent(netReturn)}
          </span>
        </div>
        <div className="col-span-2 flex justify-between">
          <span className="text-xs text-text-muted">Net Cost</span>
          <span
            className={`text-xs font-mono font-semibold ${
              netCost <= 0 ? 'text-accent-green' : 'text-accent-yellow'
            }`}
          >
            ${netCost.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Factor neutrality indicator */}
      <motion.div
        animate={{
          boxShadow: isNeutral
            ? '0 0 20px rgba(34, 197, 94, 0.3)'
            : '0 0 20px rgba(239, 68, 68, 0.15)',
        }}
        className={`p-2 rounded-lg text-center text-xs font-medium border ${
          isNeutral
            ? 'bg-accent-green/10 border-accent-green/30 text-accent-green'
            : 'bg-accent-red/10 border-accent-red/30 text-accent-red'
        }`}
      >
        {isNeutral ? '✓ Factor Neutral' : '✗ Not Factor Neutral'}
      </motion.div>

      <div className="flex justify-end">
        <Button onClick={() => onSubmit(weights)} size="lg">
          Submit Portfolio →
        </Button>
      </div>
    </div>
  );
}
