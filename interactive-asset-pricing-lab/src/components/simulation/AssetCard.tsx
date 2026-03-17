import { motion } from 'framer-motion';
import { Asset, Factor } from '../../types/scenario';

interface Props {
  asset: Asset;
  factors: Factor[];
  index: number;
  selected?: boolean;
  rank?: number;
  onClick?: () => void;
  showDetails?: boolean;
}

export default function AssetCard({ asset, factors, index, selected, rank, onClick, showDetails }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={`card cursor-pointer transition-all duration-200 ${
        selected
          ? 'border-accent-primary ring-1 ring-accent-primary/30'
          : 'hover:border-gray-600'
      } ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface-900 text-gray-400 border border-gray-700">
              {asset.ticker}
            </span>
            {rank !== undefined && (
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-accent-primary/20 text-accent-primary">
                #{rank}
              </span>
            )}
          </div>
          <h4 className="text-white font-medium mt-1">{asset.name}</h4>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Price</div>
          <div className="font-mono text-white">${asset.currentPrice}</div>
        </div>
      </div>

      <p className="text-gray-400 text-xs leading-relaxed mb-3">{asset.description}</p>

      {showDetails && (
        <div className="space-y-3 pt-3 border-t border-gray-700/50">
          <div>
            <div className="text-xs text-gray-500 mb-1.5">Factor Betas</div>
            <div className="flex flex-wrap gap-2">
              {factors.map((f) => {
                const beta = asset.betas[f.id] ?? 0;
                return (
                  <div
                    key={f.id}
                    className="text-xs font-mono px-2 py-1 rounded"
                    style={{ backgroundColor: `${f.color}15`, color: f.color }}
                  >
                    β<sub>{f.id}</sub> = {beta.toFixed(1)}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Expected Return</div>
            <div className="text-sm font-mono text-accent-success">
              {(asset.expectedReturn * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
