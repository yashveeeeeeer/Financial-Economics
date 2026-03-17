import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell,
} from 'recharts';
import { State } from '../../types/scenario';

interface Props {
  states: State[];
  longPayoffs: Record<string, number>;
  shortPayoffs: Record<string, number>;
  longLabel: string;
  shortLabel: string;
}

export default function ArbitragePayoffChart({
  states,
  longPayoffs,
  shortPayoffs,
  longLabel,
  shortLabel,
}: Props) {
  const data = states.map((state) => {
    const longVal = longPayoffs[state.id] ?? 0;
    const shortVal = shortPayoffs[state.id] ?? 0;
    return {
      state: state.name,
      'Long-Short Payoff': longVal - shortVal,
      probability: state.probability,
    };
  });

  return (
    <div className="w-full">
      <div className="text-xs text-gray-500 mb-2">
        Arbitrage Payoff: Long {longLabel} / Short {shortLabel} — state-by-state net payoff
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="state"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: '#334155' }}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: '#334155' }}
            label={{ value: 'Net Payoff ($)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }}
          />
          <ReferenceLine y={0} stroke="#475569" strokeWidth={2} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
            labelStyle={{ color: '#e2e8f0' }}
            formatter={(value: number) => [`$${value.toFixed(1)}`, 'Net Payoff']}
          />
          <Bar dataKey="Long-Short Payoff" radius={[4, 4, 0, 0]}>
            {data.map((entry, idx) => (
              <Cell
                key={idx}
                fill={entry['Long-Short Payoff'] >= 0 ? '#10b981' : '#ef4444'}
                fillOpacity={0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
