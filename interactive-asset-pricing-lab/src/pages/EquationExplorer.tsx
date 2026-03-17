import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import EquationDisplay from '../components/EquationDisplay';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, ReferenceLine, Legend,
} from 'recharts';

export default function EquationExplorer() {
  const [riskFree, setRiskFree] = useState(4);
  const [betaGrowth, setBetaGrowth] = useState(1.2);
  const [betaInflation, setBetaInflation] = useState(-0.3);
  const [lambdaGrowth, setLambdaGrowth] = useState(6);
  const [lambdaInflation, setLambdaInflation] = useState(-2);

  const growthContrib = betaGrowth * lambdaGrowth;
  const inflContrib = betaInflation * lambdaInflation;
  const expectedReturn = riskFree + growthContrib + inflContrib;

  const decompositionData = useMemo(() => [
    { name: 'Risk-Free Rate', value: riskFree, color: '#6b7280' },
    { name: 'Growth Premium', value: growthContrib, color: '#3b82f6' },
    { name: 'Inflation Premium', value: inflContrib, color: '#f97316' },
  ], [riskFree, growthContrib, inflContrib]);

  const comparisonAssets = useMemo(() => {
    const assets = [
      { name: 'Your Asset', rf: riskFree, growth: growthContrib, inflation: inflContrib, total: expectedReturn },
      { name: 'High Growth', rf: riskFree, growth: 1.8 * lambdaGrowth, inflation: 0 * lambdaInflation, total: riskFree + 1.8 * lambdaGrowth },
      { name: 'Inflation Hedge', rf: riskFree, growth: 0, inflation: 0.8 * lambdaInflation, total: riskFree + 0.8 * lambdaInflation },
      { name: 'T-Bill', rf: riskFree, growth: 0, inflation: 0, total: riskFree },
    ];
    return assets;
  }, [riskFree, lambdaGrowth, lambdaInflation, growthContrib, inflContrib, expectedReturn]);

  const sliderClass = "w-full h-2 rounded-lg appearance-none cursor-pointer accent-accent-primary bg-surface-900";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Equation Explorer</h1>
        <p className="text-gray-400">
          Adjust factor betas and risk premia to see how expected returns change in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders */}
        <div className="lg:col-span-4 space-y-4">
          <div className="card">
            <h3 className="text-white font-semibold mb-4">Parameters</h3>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Risk-Free Rate (Rf)</span>
                  <span className="font-mono text-gray-300">{riskFree.toFixed(1)}%</span>
                </div>
                <input type="range" min={0} max={10} step={0.5} value={riskFree}
                  onChange={(e) => setRiskFree(Number(e.target.value))} className={sliderClass} />
              </div>

              <div className="pt-3 border-t border-gray-700/50">
                <div className="text-xs text-factor-growth uppercase tracking-wider mb-3">Growth Factor</div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Beta (Growth)</span>
                      <span className="font-mono text-factor-growth">{betaGrowth.toFixed(1)}</span>
                    </div>
                    <input type="range" min={-1} max={3} step={0.1} value={betaGrowth}
                      onChange={(e) => setBetaGrowth(Number(e.target.value))} className={sliderClass} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Lambda (Growth)</span>
                      <span className="font-mono text-factor-growth">{lambdaGrowth.toFixed(1)}%</span>
                    </div>
                    <input type="range" min={0} max={12} step={0.5} value={lambdaGrowth}
                      onChange={(e) => setLambdaGrowth(Number(e.target.value))} className={sliderClass} />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-700/50">
                <div className="text-xs text-factor-inflation uppercase tracking-wider mb-3">Inflation Factor</div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Beta (Inflation)</span>
                      <span className="font-mono text-factor-inflation">{betaInflation.toFixed(1)}</span>
                    </div>
                    <input type="range" min={-2} max={2} step={0.1} value={betaInflation}
                      onChange={(e) => setBetaInflation(Number(e.target.value))} className={sliderClass} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Lambda (Inflation)</span>
                      <span className="font-mono text-factor-inflation">{lambdaInflation.toFixed(1)}%</span>
                    </div>
                    <input type="range" min={-6} max={4} step={0.5} value={lambdaInflation}
                      onChange={(e) => setLambdaInflation(Number(e.target.value))} className={sliderClass} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Result */}
          <motion.div
            key={expectedReturn.toFixed(2)}
            initial={{ scale: 1.02 }}
            animate={{ scale: 1 }}
            className="card border-accent-primary/30"
          >
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Expected Return</div>
            <div className="text-3xl font-bold font-mono text-white">
              {expectedReturn.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500 mt-2 font-mono">
              = {riskFree.toFixed(1)}% + ({betaGrowth.toFixed(1)} x {lambdaGrowth.toFixed(1)}%) + ({betaInflation.toFixed(1)} x {lambdaInflation.toFixed(1)}%)
            </div>
          </motion.div>
        </div>

        {/* Charts and Equations */}
        <div className="lg:col-span-8 space-y-6">
          <EquationDisplay
            equation={`E(R_i) = \\underbrace{${riskFree.toFixed(1)}\\%}_{R_f} + \\underbrace{${betaGrowth.toFixed(1)}}_{\\beta_{\\text{growth}}} \\times \\underbrace{${lambdaGrowth.toFixed(1)}\\%}_{\\lambda_{\\text{growth}}} + \\underbrace{(${betaInflation.toFixed(1)})}_{\\beta_{\\text{infl}}} \\times \\underbrace{(${lambdaInflation.toFixed(1)}\\%)}_{\\lambda_{\\text{infl}}} = ${expectedReturn.toFixed(1)}\\%`}
            label="Live Factor Pricing Equation"
            interpretation={`Risk-free: ${riskFree.toFixed(1)}% | Growth contribution: ${growthContrib.toFixed(1)}% | Inflation contribution: ${inflContrib.toFixed(1)}%`}
            pinned
            size="md"
          />

          {/* Decomposition */}
          <div className="card">
            <h3 className="text-white font-semibold mb-4">Return Decomposition</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={decompositionData} layout="vertical" margin={{ top: 5, right: 30, bottom: 5, left: 100 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} width={100} />
                <ReferenceLine x={0} stroke="#475569" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(v: number) => [`${v.toFixed(1)}%`, 'Contribution']}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {decompositionData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} fillOpacity={entry.value < 0 ? 0.5 : 0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Comparison */}
          <div className="card">
            <h3 className="text-white font-semibold mb-4">Cross-Asset Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonAssets} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} stackOffset="sign">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                <ReferenceLine y={0} stroke="#475569" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(v: number) => [`${v.toFixed(1)}%`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="rf" stackId="a" fill="#6b7280" fillOpacity={0.7} name="Risk-Free" />
                <Bar dataKey="growth" stackId="a" fill="#3b82f6" fillOpacity={0.85} name="Growth" />
                <Bar dataKey="inflation" stackId="a" fill="#f97316" fillOpacity={0.85} name="Inflation" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Interpretation */}
          <div className="card bg-surface-900/60">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Live Interpretation</div>
            <div className="space-y-2 text-sm text-gray-300">
              {growthContrib > 0 && (
                <p>Your asset has positive growth exposure ({betaGrowth.toFixed(1)}), earning a {growthContrib.toFixed(1)}% premium for bearing systematic growth risk.</p>
              )}
              {growthContrib < 0 && (
                <p>Your asset has negative growth beta ({betaGrowth.toFixed(1)}), acting as a growth hedge. This reduces expected return by {Math.abs(growthContrib).toFixed(1)}%.</p>
              )}
              {inflContrib < 0 && betaInflation > 0 && (
                <p>Positive inflation beta ({betaInflation.toFixed(1)}) with negative inflation lambda ({lambdaInflation.toFixed(1)}%) means the asset hedges inflation — investors accept {Math.abs(inflContrib).toFixed(1)}% less return for this protection.</p>
              )}
              {inflContrib > 0 && betaInflation < 0 && (
                <p>Negative inflation beta ({betaInflation.toFixed(1)}) with negative inflation lambda ({lambdaInflation.toFixed(1)}%) means the asset suffers in inflation — investors demand an extra {inflContrib.toFixed(1)}% for this exposure.</p>
              )}
              {expectedReturn < riskFree && (
                <p className="text-accent-warning">Expected return ({expectedReturn.toFixed(1)}%) is below the risk-free rate ({riskFree.toFixed(1)}%). This asset provides valuable hedging properties that investors pay for through lower returns.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
