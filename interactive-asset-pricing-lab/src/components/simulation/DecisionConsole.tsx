import { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Decision, Asset } from '../../types/scenario';

interface Props {
  decision: Decision;
  assets: Asset[];
  onSubmit: (answer: string[]) => void;
  disabled?: boolean;
}

export default function DecisionConsole({ decision, assets, onSubmit, disabled }: Props) {
  const relevantAssets = decision.options
    ? assets.filter((a) => decision.options!.includes(a.id))
    : assets;

  const [ranking, setRanking] = useState<string[]>(relevantAssets.map((a) => a.id));
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit(ranking);
  };

  if (decision.type === 'rank_returns') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card border-t-4 border-t-accent-primary"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-accent-primary/20 text-accent-primary">
            YOUR DECISION
          </span>
        </div>

        <p className="text-gray-200 text-sm leading-relaxed mb-4">{decision.prompt}</p>

        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2">
            Drag to rank from HIGHEST to LOWEST expected return:
          </div>
          <Reorder.Group
            axis="y"
            values={ranking}
            onReorder={submitted ? () => {} : setRanking}
            className="space-y-2"
          >
            <AnimatePresence>
              {ranking.map((id, idx) => {
                const asset = assets.find((a) => a.id === id);
                if (!asset) return null;
                return (
                  <Reorder.Item
                    key={id}
                    value={id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      submitted
                        ? 'cursor-default'
                        : 'cursor-grab active:cursor-grabbing hover:border-gray-500'
                    } ${
                      disabled ? 'opacity-50' : ''
                    } bg-surface-900 border-gray-700`}
                  >
                    <span className="text-accent-primary font-bold text-sm w-6">
                      #{idx + 1}
                    </span>
                    <span className="font-mono text-xs text-gray-400 bg-surface-800 px-2 py-0.5 rounded">
                      {asset.ticker}
                    </span>
                    <span className="text-sm text-white">{asset.name}</span>
                  </Reorder.Item>
                );
              })}
            </AnimatePresence>
          </Reorder.Group>
        </div>

        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={disabled}
            className="btn-primary w-full"
          >
            Submit Ranking
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <div className="card">
      <p className="text-gray-400 text-sm">Decision type "{decision.type}" not yet implemented.</p>
    </div>
  );
}
