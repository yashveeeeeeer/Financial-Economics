import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { Asset, State } from '../../types/scenario';

interface Props {
  assets: Asset[];
  states: State[];
  highlightAssetId?: string;
}

const ASSET_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export default function CovarianceChart({ assets, states, highlightAssetId }: Props) {
  const data = states.map((state) => {
    const row: Record<string, string | number> = {
      state: state.name,
      sdf: state.sdfWeight,
    };
    assets.forEach((a) => {
      row[`${a.ticker}_return`] = ((a.payoffs[state.id] - a.currentPrice) / a.currentPrice) * 100;
    });
    return row;
  });

  const meanSdf = states.reduce((s, st) => s + st.probability * st.sdfWeight, 0);

  return (
    <div className="w-full">
      <div className="text-xs text-gray-500 mb-2">
        SDF (orange) vs. Asset Returns — negative co-movement = higher required return
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
            labelStyle={{ color: '#e2e8f0' }}
            formatter={(value: number, name: string) => {
              if (name === 'SDF (m)') return [value.toFixed(2), name];
              return [`${value.toFixed(1)}%`, name];
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <ReferenceLine y={meanSdf} stroke="#fb923c" strokeDasharray="5 5" strokeOpacity={0.5} />
          <Line
            type="monotone"
            dataKey="sdf"
            stroke="#fb923c"
            strokeWidth={3}
            dot={{ fill: '#fb923c', r: 5, strokeWidth: 0 }}
            name="SDF (m)"
          />
          {assets.map((a, i) => (
            <Line
              key={a.id}
              type="monotone"
              dataKey={`${a.ticker}_return`}
              stroke={ASSET_COLORS[i % ASSET_COLORS.length]}
              strokeWidth={highlightAssetId === a.id ? 3 : 1.5}
              strokeOpacity={highlightAssetId && highlightAssetId !== a.id ? 0.3 : 1}
              dot={{ fill: ASSET_COLORS[i % ASSET_COLORS.length], r: 4, strokeWidth: 0 }}
              name={`${a.ticker} Return (%)`}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
