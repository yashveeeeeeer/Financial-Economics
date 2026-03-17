import { motion } from 'framer-motion';
import Equation from './Equation.tsx';

interface PinnedEquationProps {
  latex: string;
  label: string;
  interpretation: string;
}

export default function PinnedEquation({
  latex,
  label,
  interpretation,
}: PinnedEquationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-bg-secondary border border-border rounded-xl p-4"
    >
      <p className="text-xs font-medium text-accent-cyan uppercase tracking-wider mb-2">
        {label}
      </p>
      <div className="flex justify-center py-2">
        <Equation latex={latex} displayMode />
      </div>
      <p className="text-xs text-text-muted mt-2 leading-relaxed">
        {interpretation}
      </p>
    </motion.div>
  );
}
