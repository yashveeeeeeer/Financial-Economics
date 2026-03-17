import { motion } from 'framer-motion';
import type { Asset } from '../../types/index.ts';
import Badge from '../ui/Badge.tsx';
import { formatPrice } from '../../utils/formatters.ts';

interface AssetCardProps {
  asset: Asset;
  index: number;
  selected?: boolean;
  dimmed?: boolean;
  onClick?: () => void;
}

export default function AssetCard({
  asset,
  index,
  selected = false,
  dimmed = false,
  onClick,
}: AssetCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: dimmed ? 0.4 : 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={onClick ? { scale: 1.02 } : undefined}
      onClick={onClick}
      className={`
        bg-bg-secondary border rounded-xl p-4 transition-all
        ${selected ? 'border-accent-blue glow-blue' : 'border-border'}
        ${onClick ? 'cursor-pointer hover:border-accent-blue' : ''}
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{asset.icon}</span>
          <div>
            <h4 className="text-sm font-semibold text-text-primary leading-tight">
              {asset.name}
            </h4>
            <p className="text-xs text-text-muted">{asset.sector}</p>
          </div>
        </div>
        <span className="text-sm font-mono font-semibold text-text-primary">
          {formatPrice(asset.currentPrice)}
        </span>
      </div>

      <div className="flex flex-wrap gap-1 mt-2">
        {asset.factorClues.map((clue) => (
          <Badge key={clue} text={clue} color="#94A3B8" />
        ))}
      </div>
    </motion.div>
  );
}
