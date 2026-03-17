import katex from 'katex';
import { useMemo } from 'react';

interface EquationProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

export default function Equation({
  latex,
  displayMode = false,
  className = '',
}: EquationProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode,
      });
    } catch {
      return latex;
    }
  }, [latex, displayMode]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
