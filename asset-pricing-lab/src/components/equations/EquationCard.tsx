import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Equation from './Equation.tsx';

interface EquationCardProps {
  title: string;
  latex: string;
  explanation: string;
  variables?: { symbol: string; meaning: string }[];
}

export default function EquationCard({
  title,
  latex,
  explanation,
  variables,
}: EquationCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-bg-secondary border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-bg-tertiary transition-colors cursor-pointer"
      >
        <div className="text-left">
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
          <div className="mt-1">
            <Equation latex={latex} />
          </div>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
          <ChevronDown className="w-4 h-4 text-text-muted" />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-border pt-3">
              <p className="text-sm text-text-secondary leading-relaxed">
                {explanation}
              </p>
              {variables && variables.length > 0 && (
                <div className="mt-3 space-y-1">
                  {variables.map((v) => (
                    <div key={v.symbol} className="flex items-start gap-2 text-xs">
                      <Equation latex={v.symbol} className="text-accent-cyan shrink-0" />
                      <span className="text-text-muted">= {v.meaning}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
