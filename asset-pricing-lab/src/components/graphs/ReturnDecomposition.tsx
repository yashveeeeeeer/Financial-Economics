import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';
import type { Scenario } from '../../types/index.ts';
import { computeReturnDecomposition } from '../../engine/pricing.ts';
import { FACTOR_COLORS } from '../../types/index.ts';
import Equation from '../equations/Equation.tsx';

interface ReturnDecompositionProps {
  scenario: Scenario;
  playerRanking?: string[];
  correctRanking?: string[];
}

export default function ReturnDecomposition({
  scenario,
  playerRanking,
  correctRanking,
}: ReturnDecompositionProps) {
  const premia = Object.fromEntries(
    Object.entries(scenario.factors).map(([k, v]) => [k, v.premium])
  );

  const data = scenario.assets.map((asset) => {
    const decomp = computeReturnDecomposition(
      scenario.riskFreeRate,
      asset.trueBetas,
      premia
    );
    const entry: Record<string, unknown> = {
      name: asset.name,
      icon: asset.icon,
      id: asset.id,
    };
    decomp.forEach((comp) => {
      entry[comp.factor] = Number((comp.contribution * 100).toFixed(2));
    });
    entry['total'] = Number(
      (decomp.reduce((s, c) => s + c.contribution, 0) * 100).toFixed(2)
    );
    return entry;
  });

  // Sort by total expected return
  data.sort((a, b) => (a.total as number) - (b.total as number));

  const factorLabels = [
    { key: 'Risk-Free Rate', color: '#6B7280' },
    { key: 'Growth', color: FACTOR_COLORS.growth },
    { key: 'Inflation', color: FACTOR_COLORS.inflation },
    { key: 'Oil', color: FACTOR_COLORS.oil },
    { key: 'Power Demand', color: FACTOR_COLORS.power_demand },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-bg-secondary border border-border rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-text-primary">
          Expected Return Decomposition
        </h4>
        <Equation latex="E(R_i) = R_f + \sum_k \beta_{ik}\lambda_k" className="text-xs" />
      </div>

      <p className="text-xs text-text-muted mb-4">
        Each bar shows how factor exposures contribute to the total expected return.
        Taller bars mean more compensation for bearing that factor's risk.
      </p>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="horizontal" barGap={2}>
            <XAxis
              dataKey="icon"
              tick={{ fill: '#94A3B8', fontSize: 16 }}
              axisLine={{ stroke: '#334155' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#94A3B8', fontSize: 10 }}
              axisLine={{ stroke: '#334155' }}
              tickLine={false}
              tickFormatter={(v: number) => `${v}%`}
              label={{
                value: 'Expected Return (%)',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#64748B', fontSize: 10 },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(value: unknown, name: unknown) => [
                `${Number(value).toFixed(2)}%`,
                String(name),
              ]}
            />
            <Legend
              wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
            />
            {factorLabels.map(({ key, color }) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="returns"
                fill={color}
                radius={key === 'Power Demand' ? [2, 2, 0, 0] : undefined}
              >
                {data.map((_, idx) => (
                  <Cell key={idx} fill={color} />
                ))}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {playerRanking && correctRanking && (
        <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-text-muted font-medium mb-1">Your Ranking</p>
            {playerRanking.map((id, i) => {
              const asset = scenario.assets.find((a) => a.id === id);
              const isCorrect = correctRanking[i] === id;
              return (
                <div
                  key={id}
                  className={`flex items-center gap-1 py-0.5 ${
                    isCorrect ? 'text-accent-green' : 'text-accent-red'
                  }`}
                >
                  <span>#{i + 1}</span>
                  <span>{asset?.icon}</span>
                  <span>{asset?.name}</span>
                  {isCorrect ? ' ✓' : ' ✗'}
                </div>
              );
            })}
          </div>
          <div>
            <p className="text-text-muted font-medium mb-1">Correct Ranking</p>
            {correctRanking.map((id, i) => {
              const asset = scenario.assets.find((a) => a.id === id);
              return (
                <div key={id} className="flex items-center gap-1 py-0.5 text-text-secondary">
                  <span>#{i + 1}</span>
                  <span>{asset?.icon}</span>
                  <span>{asset?.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
