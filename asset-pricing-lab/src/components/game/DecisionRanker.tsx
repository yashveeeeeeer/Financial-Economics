import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Asset } from '../../types/index.ts';
import Button from '../ui/Button.tsx';

interface DecisionRankerProps {
  assets: Asset[];
  onSubmit: (ranking: string[]) => void;
}

export default function DecisionRanker({ assets, onSubmit }: DecisionRankerProps) {
  const [ranking, setRanking] = useState<string[]>([]);

  const toggleAsset = useCallback(
    (assetId: string) => {
      setRanking((prev) => {
        if (prev.includes(assetId)) {
          return prev.filter((id) => id !== assetId);
        }
        if (prev.length >= assets.length) return prev;
        return [...prev, assetId];
      });
    },
    [assets.length]
  );

  const resetRanking = useCallback(() => setRanking([]), []);

  const getAsset = (id: string) => assets.find((a) => a.id === id);
  const isComplete = ranking.length === assets.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          Click assets in order from <span className="text-accent-red font-medium">lowest</span>{' '}
          to <span className="text-accent-green font-medium">highest</span> expected return
        </p>
        <button
          onClick={resetRanking}
          className="text-xs text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
        >
          Reset
        </button>
      </div>

      {/* Ranking slots */}
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: assets.length }).map((_, idx) => {
          const assetId = ranking[idx];
          const asset = assetId ? getAsset(assetId) : null;
          return (
            <motion.div
              key={idx}
              layout
              className={`
                flex-1 min-w-[120px] border rounded-lg p-3 text-center transition-all
                ${
                  asset
                    ? 'bg-bg-secondary border-accent-blue/50'
                    : 'bg-bg-primary border-dashed border-border'
                }
              `}
            >
              <span className="text-[10px] text-text-muted uppercase tracking-wider block mb-1">
                #{idx + 1} {idx === 0 ? '(Lowest)' : idx === assets.length - 1 ? '(Highest)' : ''}
              </span>
              {asset ? (
                <button
                  onClick={() => toggleAsset(asset.id)}
                  className="cursor-pointer"
                >
                  <span className="text-lg block">{asset.icon}</span>
                  <span className="text-xs text-text-primary font-medium block truncate">
                    {asset.name}
                  </span>
                </button>
              ) : (
                <span className="text-xs text-text-muted block py-2">—</span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Available assets to pick */}
      <div className="flex gap-2 flex-wrap">
        {assets.map((asset) => {
          const isRanked = ranking.includes(asset.id);
          return (
            <motion.button
              key={asset.id}
              whileHover={isRanked ? undefined : { scale: 1.05 }}
              whileTap={isRanked ? undefined : { scale: 0.95 }}
              onClick={() => toggleAsset(asset.id)}
              disabled={isRanked}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg border transition-all cursor-pointer
                ${
                  isRanked
                    ? 'bg-bg-tertiary border-border opacity-40 cursor-not-allowed'
                    : 'bg-bg-secondary border-border hover:border-accent-blue'
                }
              `}
            >
              <span className="text-base">{asset.icon}</span>
              <span className="text-xs font-medium text-text-primary">
                {asset.name}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => onSubmit(ranking)}
          disabled={!isComplete}
          size="lg"
        >
          Submit Ranking →
        </Button>
      </div>
    </div>
  );
}
