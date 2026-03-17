import { motion } from 'framer-motion';
import { Scenario } from '../../types/scenario';

interface Props {
  scenario: Scenario;
}

export default function MacroShockCard({ scenario }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="card border-l-4 border-l-accent-primary"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium px-2 py-0.5 rounded bg-accent-primary/20 text-accent-primary">
          MACRO SHOCK
        </span>
        <span className={`text-xs px-2 py-0.5 rounded ${
          scenario.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
          scenario.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-red-500/20 text-red-400'
        }`}>
          {scenario.difficulty}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{scenario.title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed mb-4">{scenario.narrativeShock}</p>
      <p className="text-gray-400 text-xs leading-relaxed">{scenario.narrativeDetail}</p>

      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Active Factors</div>
        <div className="flex flex-wrap gap-2">
          {scenario.factors.map((f) => (
            <div
              key={f.id}
              className="factor-badge"
              style={{ backgroundColor: `${f.color}20`, color: f.color }}
            >
              <div className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: f.color }} />
              {f.name} (λ = {(f.lambda * 100).toFixed(1)}%)
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">States of the World</div>
        <div className="space-y-1.5">
          {scenario.states.map((s) => (
            <div key={s.id} className="flex items-center justify-between text-xs">
              <span className="text-gray-300">{s.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">π = {(s.probability * 100).toFixed(0)}%</span>
                <span className="text-orange-400 font-mono">m = {s.sdfWeight.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
