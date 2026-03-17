import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Line, ComposedChart,
} from 'recharts';
import { Asset, State } from '../../types/scenario';

interface Props {
  assets: Asset[];
  states: State[];
}

const ASSET_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export default function StatePayoffChart({ assets, states }: Props) {
  const data = states.map((state) => {
    const row: Record<string, string | number> = {
      state: state.name,
      sdfWeight: state.sdfWeight,
      probability: state.probability,
    };
    assets.forEach((a) => {
      row[a.ticker] = a.payoffs[state.id];
    });
    return row;
  });

  return (
    <div className="w-full">
      <div className="text-xs text-gray-500 mb-2">
        State Payoffs (bars) with SDF Weights (orange line) — higher SDF = &quot;bad times&quot;
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="state"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: '#334155' }}
          />
          <YAxis
            yAxisId="payoff"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: '#334155' }}
            label={{ value: 'Payoff ($)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }}
          />
          <YAxis
            yAxisId="sdf"
            orientation="right"
            tick={{ fill: '#fb923c', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: '#fb923c33' }}
            label={{ value: 'SDF Weight (m)', angle: 90, position: 'insideRight', fill: '#fb923c', fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          {assets.map((a, i) => (
            <Bar
              key={a.id}
              yAxisId="payoff"
              dataKey={a.ticker}
              fill={ASSET_COLORS[i % ASSET_COLORS.length]}
              fillOpacity={0.8}
              radius={[4, 4, 0, 0]}
            />
          ))}
          <Line
            yAxisId="sdf"
            type="monotone"
            dataKey="sdfWeight"
            stroke="#fb923c"
            strokeWidth={2.5}
            dot={{ fill: '#fb923c', r: 5 }}
            name="SDF Weight (m)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
