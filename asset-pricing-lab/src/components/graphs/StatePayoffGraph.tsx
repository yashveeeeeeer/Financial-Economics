import { motion } from 'framer-motion';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { Scenario, StateId } from '../../types/index.ts';
import { STATE_LABELS } from '../../types/index.ts';
import Equation from '../equations/Equation.tsx';

interface StatePayoffGraphProps {
  scenario: Scenario;
  assetIds: [string, string];
}

const STATE_ORDER: StateId[] = ['boom', 'normal', 'slowdown', 'recession', 'crisis'];

export default function StatePayoffGraph({ scenario, assetIds }: StatePayoffGraphProps) {
  const [a1, a2] = assetIds.map((id) => scenario.assets.find((a) => a.id === id));
  if (!a1 || !a2) return null;

  const data = STATE_ORDER.map((stateId) => ({
    state: STATE_LABELS[stateId],
    [a1.name]: a1.statePayoffs[stateId],
    [a2.name]: a2.statePayoffs[stateId],
    sdf: scenario.states[stateId].sdfWeight,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-bg-secondary border border-border rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-text-primary">
          State Payoffs: {a1.icon} vs {a2.icon}
        </h4>
        <Equation latex="p = \sum_s \pi_s \cdot m_s \cdot x_s" className="text-xs" />
      </div>

      <p className="text-xs text-text-muted mb-4">
        Assets paying more in bad states (where SDF is high) receive higher pricing weights,
        resulting in higher prices today and lower expected returns going forward.
      </p>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <XAxis
              dataKey="state"
              tick={{ fill: '#94A3B8', fontSize: 10 }}
              axisLine={{ stroke: '#334155' }}
              tickLine={false}
            />
            <YAxis
              yAxisId="payoff"
              tick={{ fill: '#94A3B8', fontSize: 10 }}
              axisLine={{ stroke: '#334155' }}
              tickLine={false}
              label={{
                value: 'Payoff ($)',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#64748B', fontSize: 10 },
              }}
            />
            <YAxis
              yAxisId="sdf"
              orientation="right"
              tick={{ fill: '#06B6D4', fontSize: 10 }}
              axisLine={{ stroke: '#334155' }}
              tickLine={false}
              label={{
                value: 'SDF Weight',
                angle: 90,
                position: 'insideRight',
                style: { fill: '#06B6D4', fontSize: 10 },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 10, paddingTop: 8 }} />
            <Bar
              yAxisId="payoff"
              dataKey={a1.name}
              fill="#3B82F6"
              opacity={0.8}
              radius={[2, 2, 0, 0]}
            />
            <Bar
              yAxisId="payoff"
              dataKey={a2.name}
              fill="#A855F7"
              opacity={0.8}
              radius={[2, 2, 0, 0]}
            />
            <Line
              yAxisId="sdf"
              type="monotone"
              dataKey="sdf"
              stroke="#06B6D4"
              strokeWidth={2.5}
              dot={{ fill: '#06B6D4', r: 4 }}
              name="SDF Weight"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
