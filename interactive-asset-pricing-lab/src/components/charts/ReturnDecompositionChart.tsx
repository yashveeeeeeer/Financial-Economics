import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine, Cell,
} from 'recharts';
import { Asset, Factor } from '../../types/scenario';

interface Props {
  assets: Asset[];
  factors: Factor[];
}

export default function ReturnDecompositionChart({ assets, factors }: Props) {
  const data = assets.map((a) => {
    const row: Record<string, string | number> = {
      asset: a.ticker,
      'Risk-Free': a.returnDecomposition.riskFree * 100,
    };
    factors.forEach((f) => {
      const contrib = (a.returnDecomposition.factorContributions[f.id] ?? 0) * 100;
      row[`${f.name}`] = contrib;
    });
    row['Total E(R)'] = a.expectedReturn * 100;
    return row;
  });

  const allColors: Record<string, string> = { 'Risk-Free': '#6b7280' };
  factors.forEach((f) => {
    allColors[f.name] = f.color;
  });

  return (
    <div className="w-full">
      <div className="text-xs text-gray-500 mb-2">
        Expected Return Decomposition — stacked: Rf + &Sigma; &beta;<sub>i</sub>&lambda;<sub>k</sub>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} stackOffset="sign">
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
            tickFormatter={(v) => `${v}%`}
            label={{ value: 'E(R) contribution (%)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }}
          />
          <ReferenceLine y={0} stroke="#475569" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
            labelStyle={{ color: '#e2e8f0' }}
            formatter={(value: number, name: string) => [`${value.toFixed(1)}%`, name]}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="Risk-Free" stackId="stack" fill="#6b7280" fillOpacity={0.7} radius={[0, 0, 0, 0]}>
            {data.map((_, idx) => (
              <Cell key={idx} fill="#6b7280" />
            ))}
          </Bar>
          {factors.map((f) => (
            <Bar key={f.id} dataKey={f.name} stackId="stack" fill={f.color} fillOpacity={0.85}>
              {data.map((entry, idx) => {
                const val = entry[f.name] as number;
                return (
                  <Cell
                    key={idx}
                    fill={f.color}
                    fillOpacity={val < 0 ? 0.5 : 0.85}
                    stroke={val < 0 ? f.color : 'none'}
                    strokeWidth={val < 0 ? 1 : 0}
                    strokeDasharray={val < 0 ? '4 2' : ''}
                  />
                );
              })}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-3 mt-3">
        {data.map((d) => (
          <div key={d.asset as string} className="text-xs text-gray-400">
            <span className="font-medium text-gray-300">{d.asset}</span>: E(R) = {(d['Total E(R)'] as number).toFixed(1)}%
          </div>
        ))}
      </div>
    </div>
  );
}
