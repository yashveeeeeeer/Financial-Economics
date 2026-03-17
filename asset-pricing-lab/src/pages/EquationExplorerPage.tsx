import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import Equation from '../components/equations/Equation.tsx';
import type { FactorId } from '../types/index.ts';
import { FACTOR_COLORS, FACTOR_LABELS } from '../types/index.ts';
import { formatPercent } from '../utils/formatters.ts';

const FACTOR_KEYS: FactorId[] = ['growth', 'inflation', 'oil', 'power_demand'];

interface AssetConfig {
  name: string;
  icon: string;
  betas: Record<FactorId, number>;
}

const DEFAULT_ASSETS: AssetConfig[] = [
  { name: 'Tech Stock', icon: '💻', betas: { growth: 1.5, inflation: -0.3, oil: -0.1, power_demand: 0.5 } },
  { name: 'Utility', icon: '⚡', betas: { growth: 0.3, inflation: -0.1, oil: 0.2, power_demand: 1.2 } },
  { name: 'Treasury', icon: '🏛️', betas: { growth: 0.0, inflation: 0.0, oil: 0.0, power_demand: 0.0 } },
  { name: 'Oil Producer', icon: '🛢️', betas: { growth: 0.6, inflation: 0.3, oil: 1.8, power_demand: 0.3 } },
];

export default function EquationExplorerPage() {
  const [riskFreeRate, setRiskFreeRate] = useState(4.0);
  const [premia, setPremia] = useState<Record<FactorId, number>>({
    growth: 4.5,
    inflation: 2.5,
    oil: 3.0,
    power_demand: 5.5,
  });
  const [assets, setAssets] = useState<AssetConfig[]>(DEFAULT_ASSETS);

  const chartData = useMemo(() => {
    return assets.map((asset) => {
      const entry: Record<string, unknown> = {
        name: `${asset.icon} ${asset.name}`,
      };
      let total = riskFreeRate;
      entry['Risk-Free Rate'] = riskFreeRate;
      FACTOR_KEYS.forEach((f) => {
        const contribution = asset.betas[f] * premia[f];
        entry[FACTOR_LABELS[f]] = Number(contribution.toFixed(2));
        total += contribution;
      });
      entry['total'] = Number(total.toFixed(2));
      return entry;
    });
  }, [assets, riskFreeRate, premia]);

  const updateBeta = (assetIdx: number, factor: FactorId, value: number) => {
    setAssets((prev) => {
      const next = [...prev];
      next[assetIdx] = {
        ...next[assetIdx],
        betas: { ...next[assetIdx].betas, [factor]: value },
      };
      return next;
    });
  };

  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Equation Explorer
          </h1>
          <p className="text-sm text-text-secondary mb-4">
            Adjust factor risk premia and asset betas to see how expected returns change in real time.
          </p>
          <div className="inline-block">
            <Equation
              latex="E(R_i) = R_f + \beta_{i,\text{growth}}\lambda_{\text{growth}} + \beta_{i,\text{infl}}\lambda_{\text{infl}} + \beta_{i,\text{oil}}\lambda_{\text{oil}} + \beta_{i,\text{power}}\lambda_{\text{power}}"
              displayMode
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-5">
            {/* Risk-free rate */}
            <div className="bg-bg-secondary border border-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-text-primary mb-3">Risk-Free Rate</h3>
              <div className="flex items-center gap-3">
                <Equation latex="R_f" className="text-xs shrink-0" />
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.5}
                  value={riskFreeRate}
                  onChange={(e) => setRiskFreeRate(parseFloat(e.target.value))}
                  className="flex-1 accent-gray-400"
                />
                <span className="text-sm font-mono text-text-primary w-14 text-right">
                  {riskFreeRate.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Factor premia */}
            <div className="bg-bg-secondary border border-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-text-primary mb-3">
                Factor Risk Premia (λ)
              </h3>
              <p className="text-xs text-text-muted mb-3">
                The market price of bearing one unit of factor risk.
              </p>
              <div className="space-y-3">
                {FACTOR_KEYS.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 w-28 shrink-0">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: FACTOR_COLORS[f] }}
                      />
                      <Equation latex={`\\lambda_{\\text{${f.replace('_', ' ')}}}`} className="text-xs" />
                    </div>
                    <input
                      type="range"
                      min={-5}
                      max={10}
                      step={0.5}
                      value={premia[f]}
                      onChange={(e) =>
                        setPremia((prev) => ({ ...prev, [f]: parseFloat(e.target.value) }))
                      }
                      className="flex-1"
                      style={{ accentColor: FACTOR_COLORS[f] }}
                    />
                    <span className="text-sm font-mono text-text-primary w-14 text-right">
                      {premia[f].toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Asset betas */}
            <div className="bg-bg-secondary border border-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-text-primary mb-3">
                Asset Factor Betas (β)
              </h3>
              <p className="text-xs text-text-muted mb-3">
                Each asset's sensitivity to the economic factors.
              </p>
              <div className="space-y-4">
                {assets.map((asset, aIdx) => (
                  <div key={aIdx}>
                    <p className="text-xs font-medium text-text-secondary mb-1.5">
                      {asset.icon} {asset.name}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {FACTOR_KEYS.map((f) => (
                        <div key={f} className="flex items-center gap-1">
                          <span
                            className="text-[10px] w-12 shrink-0"
                            style={{ color: FACTOR_COLORS[f] }}
                          >
                            β_{FACTOR_LABELS[f].slice(0, 3).toLowerCase()}
                          </span>
                          <input
                            type="range"
                            min={-2}
                            max={3}
                            step={0.1}
                            value={asset.betas[f]}
                            onChange={(e) => updateBeta(aIdx, f, parseFloat(e.target.value))}
                            className="flex-1"
                            style={{ accentColor: FACTOR_COLORS[f] }}
                          />
                          <span className="text-[10px] font-mono text-text-secondary w-8 text-right">
                            {asset.betas[f].toFixed(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="space-y-4">
            <div className="bg-bg-secondary border border-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-text-primary mb-4">
                Expected Return Decomposition
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barGap={2}>
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#94A3B8', fontSize: 10 }}
                      axisLine={{ stroke: '#334155' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: '#94A3B8', fontSize: 10 }}
                      axisLine={{ stroke: '#334155' }}
                      tickLine={false}
                      tickFormatter={(v: number) => `${v}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1E293B',
                        border: '1px solid #334155',
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                      formatter={(v: unknown, name: unknown) => [`${Number(v).toFixed(2)}%`, String(name)]}
                    />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Bar dataKey="Risk-Free Rate" stackId="a" fill="#6B7280" />
                    <Bar dataKey="Growth" stackId="a" fill={FACTOR_COLORS.growth} />
                    <Bar dataKey="Inflation" stackId="a" fill={FACTOR_COLORS.inflation} />
                    <Bar dataKey="Oil" stackId="a" fill={FACTOR_COLORS.oil} />
                    <Bar dataKey="Power Demand" stackId="a" fill={FACTOR_COLORS.power_demand} radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Result summary */}
            <div className="bg-bg-secondary border border-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-text-primary mb-3">
                Computed Expected Returns
              </h3>
              <div className="space-y-2">
                {chartData.map((d) => (
                  <div
                    key={d.name as string}
                    className="flex items-center justify-between py-1 border-b border-border last:border-b-0"
                  >
                    <span className="text-xs text-text-secondary">{d.name as string}</span>
                    <span className="text-sm font-mono font-semibold text-text-primary">
                      {formatPercent((d.total as number) / 100)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-muted mt-3 italic">
                Move the sliders to see how changing factor premia and betas
                affects each asset's required return.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
