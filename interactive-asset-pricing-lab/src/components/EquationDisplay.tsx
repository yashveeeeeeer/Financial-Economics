import { useEffect, useRef } from 'react';
import katex from 'katex';
import { motion } from 'framer-motion';

interface EquationDisplayProps {
  equation: string;
  label?: string;
  interpretation?: string;
  highlightedTerm?: string;
  size?: 'sm' | 'md' | 'lg';
  pinned?: boolean;
}

export default function EquationDisplay({
  equation,
  label,
  interpretation,
  size = 'md',
  pinned = false,
}: EquationDisplayProps) {
  const mathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mathRef.current) {
      try {
        katex.render(equation, mathRef.current, {
          displayMode: true,
          throwOnError: false,
          trust: true,
        });
      } catch {
        mathRef.current.textContent = equation;
      }
    }
  }, [equation]);

  const sizeClasses = {
    sm: 'text-sm p-3',
    md: 'text-base p-4',
    lg: 'text-lg p-5',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`equation-box ${sizeClasses[size]} ${
        pinned ? 'border-accent-primary/30 bg-accent-primary/5' : ''
      }`}
    >
      {label && (
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-sans">
          {label}
        </div>
      )}
      <div ref={mathRef} className="overflow-x-auto py-1" />
      {interpretation && (
        <div className="mt-3 text-sm text-gray-400 font-sans leading-relaxed border-t border-gray-700/50 pt-3">
          {interpretation}
        </div>
      )}
    </motion.div>
  );
}
