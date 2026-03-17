import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scenarios } from '../data/scenarios';

export default function Simulations() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Simulations</h1>
        <p className="text-gray-400">
          Test your understanding of asset pricing by making decisions under realistic macro scenarios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/simulations/${s.id}`} className="block h-full">
              <div className="card-hover h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    s.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                    s.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {s.difficulty}
                  </span>
                  <span className="text-xs text-gray-500">
                    {s.decisions.length} decision{s.decisions.length > 1 ? 's' : ''}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{s.subtitle}</p>

                <div className="space-y-3 pt-3 border-t border-gray-700/50">
                  <div>
                    <div className="text-xs text-gray-500 mb-1.5">Factors</div>
                    <div className="flex flex-wrap gap-1.5">
                      {s.factors.map((f) => (
                        <span
                          key={f.id}
                          className="factor-badge text-xs"
                          style={{ backgroundColor: `${f.color}20`, color: f.color }}
                        >
                          {f.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1.5">Concepts Tested</div>
                    <div className="flex flex-wrap gap-1.5">
                      {s.concepts.slice(0, 3).map((c) => (
                        <span key={c} className="text-xs text-gray-500 bg-surface-900 px-2 py-0.5 rounded">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1.5">Assets</div>
                    <div className="flex gap-2">
                      {s.assets.map((a) => (
                        <span key={a.id} className="text-xs font-mono text-gray-400 bg-surface-900 px-2 py-0.5 rounded border border-gray-700">
                          {a.ticker}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-700/50">
                  <span className="text-accent-primary text-sm font-medium">
                    Start Simulation →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
