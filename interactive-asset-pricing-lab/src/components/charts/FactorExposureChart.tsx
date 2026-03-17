import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine, Cell,
} from 'recharts';
import { Asset, Factor } from '../../types/scenario';

interface Props {
  assets: Asset[];
  factors: Factor[];
}

export default function FactorExposureChart({ assets, factors }: Props) {
  const data = assets.map((a) => {
    const row: Record<string, string | number> = { asset: a.ticker };
    factors.forEach((f) => {
      row[f.name] = a.betas[f.id] ?? 0;
    });
    return row;
  });

  return (
    <div className="w-full">
      <div className="text-xs text-gray-500 mb-2">
        Factor Betas — how sensitive each asset is to each factor
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="asset"
            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
            tickLine={false}
            axisLine={{ stroke: '#334155' }}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: '#334155' }}
            label={{ value: 'Beta (β)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }}
          />
          <ReferenceLine y={0} stroke="#475569" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
            labelStyle={{ color: '#e2e8f0' }}
            formatter={(value: number) => value.toFixed(2)}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          {factors.map((f) => (
            <Bar key={f.id} dataKey={f.name} fill={f.color} fillOpacity={0.85} radius={[4, 4, 0, 0]}>
              {data.map((entry, idx) => {
                const val = entry[f.name] as number;
                return (
                  <Cell
                    key={idx}
                    fill={f.color}
                    fillOpacity={val < 0 ? 0.5 : 0.85}
                  />
                );
              })}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
