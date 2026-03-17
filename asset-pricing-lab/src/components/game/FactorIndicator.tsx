import { motion } from 'framer-motion';
import type { FactorId } from '../../types/index.ts';
import { FACTOR_COLORS, FACTOR_LABELS } from '../../types/index.ts';

interface FactorIndicatorProps {
  factorId: FactorId;
  shock: number;
  premium: number;
}

export default function FactorIndicator({
  factorId,
  shock,
  premium,
}: FactorIndicatorProps) {
  const color = FACTOR_COLORS[factorId];
  const isPositive = shock > 0;
  const barWidth = Math.min(Math.abs(shock) * 25, 100);

  return (
    <div className="flex items-center gap-3 py-1.5">
      <div className="flex items-center gap-1.5 w-24 shrink-0">
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
        <span className="text-xs text-text-secondary truncate">
          {FACTOR_LABELS[factorId]}
        </span>
      </div>

      <div className="flex-1 relative h-3 bg-bg-tertiary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${barWidth}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute top-0 h-full rounded-full"
          style={{
            backgroundColor: color,
            left: isPositive ? '50%' : undefined,
            right: isPositive ? undefined : '50%',
          }}
        />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-text-muted/30" />
      </div>

      <div className="w-16 text-right shrink-0">
        <span
          className="text-xs font-mono font-semibold"
          style={{ color: isPositive ? '#22C55E' : '#EF4444' }}
        >
          {isPositive ? '+' : ''}{shock.toFixed(1)}σ
        </span>
        <br />
        <span className="text-[10px] text-text-muted font-mono">
          λ={(premium * 100).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}
