import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  animate?: boolean;
  delay?: number;
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  glowColor,
  animate = true,
  delay = 0,
  onClick,
}: CardProps) {
  const baseClass = `
    bg-bg-secondary border border-border rounded-xl p-4
    shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]
    transition-colors
    ${onClick ? 'cursor-pointer hover:border-accent-blue' : ''}
    ${className}
  `;

  if (!animate) {
    return (
      <div
        className={baseClass}
        style={glowColor ? { boxShadow: `0 0 20px ${glowColor}33` } : undefined}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={baseClass}
      style={glowColor ? { boxShadow: `0 0 20px ${glowColor}33` } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
