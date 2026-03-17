import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { Scenario, StateId } from '../../types/index.ts';
import { STATE_LABELS } from '../../types/index.ts';
import Equation from '../equations/Equation.tsx';

interface CovarianceGraphProps {
  scenario: Scenario;
  assetId: string;
}

const STATE_ORDER: StateId[] = ['boom', 'normal', 'slowdown', 'recession', 'crisis'];

export default function CovarianceGraph({ scenario, assetId }: CovarianceGraphProps) {
  const asset = scenario.assets.find((a) => a.id === assetId);
  if (!asset) return null;

  const data = STATE_ORDER.map((stateId) => {
    const stateConf = scenario.states[stateId];
    const payoff = asset.statePayoffs[stateId];
    const returnVal = (payoff / asset.currentPrice - 1) * 100;

    return {
      state: STATE_LABELS[stateId],
      sdf: stateConf.sdfWeight,
      return: Number(returnVal.toFixed(1)),
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-bg-secondary border border-border rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-text-primary">
          SDF vs Return: {asset.icon} {asset.name}
        </h4>
        <Equation
          latex="E(R_i) - R_f = -\frac{\text{Cov}(m, R_i)}{E(m)}"
          className="text-xs"
        />
      </div>

      <p className="text-xs text-text-muted mb-4">
        The SDF (cyan) is high in bad states — assets paying less in those states have
        negative covariance with the SDF, requiring higher expected returns as compensation.
      </p>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="state"
              tick={{ fill: '#94A3B8', fontSize: 10 }}
              axisLine={{ stroke: '#334155' }}
              tickLine={false}
            />
            <YAxis
              yAxisId="sdf"
              orientation="left"
              tick={{ fill: '#06B6D4', fontSize: 10 }}
              axisLine={{ stroke: '#334155' }}
              tickLine={false}
              label={{
                value: 'SDF Weight (m)',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#06B6D4', fontSize: 10 },
              }}
            />
            <YAxis
              yAxisId="return"
              orientation="right"
              tick={{ fill: '#F97316', fontSize: 10 }}
              axisLine={{ stroke: '#334155' }}
              tickLine={false}
              label={{
                value: 'Return (%)',
                angle: 90,
                position: 'insideRight',
                style: { fill: '#F97316', fontSize: 10 },
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
            <ReferenceLine yAxisId="return" y={0} stroke="#64748B" strokeDasharray="3 3" />
            <Line
              yAxisId="sdf"
              type="monotone"
              dataKey="sdf"
              stroke="#06B6D4"
              strokeWidth={2.5}
              dot={{ fill: '#06B6D4', r: 4 }}
              name="SDF Weight"
            />
            <Line
              yAxisId="return"
              type="monotone"
              dataKey="return"
              stroke="#F97316"
              strokeWidth={2.5}
              dot={{ fill: '#F97316', r: 4 }}
              name="Asset Return (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-text-muted mt-3 italic">
        Notice: when the SDF rises (bad states), this asset's return falls — negative covariance
        means higher required compensation.
      </p>
    </motion.div>
  );
}
