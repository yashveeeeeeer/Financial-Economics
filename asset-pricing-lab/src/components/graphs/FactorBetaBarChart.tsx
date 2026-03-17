import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import type { Scenario, FactorId } from '../../types/index.ts';
import { FACTOR_COLORS, FACTOR_LABELS } from '../../types/index.ts';
import Equation from '../equations/Equation.tsx';

interface FactorBetaBarChartProps {
  scenario: Scenario;
}

const FACTOR_KEYS: FactorId[] = ['growth', 'inflation', 'oil', 'power_demand'];

export default function FactorBetaBarChart({ scenario }: FactorBetaBarChartProps) {
  const data = scenario.assets.map((asset) => {
    const entry: Record<string, unknown> = {
      name: `${asset.icon} ${asset.name}`,
    };
    FACTOR_KEYS.forEach((f) => {
      entry[FACTOR_LABELS[f]] = asset.trueBetas[f];
    });
    return entry;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-bg-secondary border border-border rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-text-primary">Factor Betas</h4>
        <Equation
          latex="\beta_{ik} = \frac{\text{Cov}(R_i, F_k)}{\text{Var}(F_k)}"
          className="text-xs"
        />
      </div>

      <p className="text-xs text-text-muted mb-4">
        Each bar shows how sensitive an asset's return is to a given factor.
        Positive beta = moves with the factor; negative = moves against it.
      </p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barGap={1} barSize={10}>
            <XAxis
              type="number"
              tick={{ fill: '#94A3B8', fontSize: 10 }}
              axisLine={{ stroke: '#334155' }}
              tickLine={false}
              label={{
                value: 'Beta (β)',
                position: 'insideBottom',
                style: { fill: '#64748B', fontSize: 10 },
              }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={120}
              tick={{ fill: '#94A3B8', fontSize: 9 }}
              axisLine={{ stroke: '#334155' }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(v: unknown) => Number(v).toFixed(2)}
            />
            <Legend wrapperStyle={{ fontSize: 10, paddingTop: 8 }} />
            <ReferenceLine x={0} stroke="#64748B" />
            {FACTOR_KEYS.map((f) => (
              <Bar
                key={f}
                dataKey={FACTOR_LABELS[f]}
                fill={FACTOR_COLORS[f]}
                radius={[0, 2, 2, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
