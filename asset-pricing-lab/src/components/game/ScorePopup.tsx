import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { ScoreResult, ReasoningQuestion } from '../../types/index.ts';
import Button from '../ui/Button.tsx';

interface ScorePopupProps {
  result: ScoreResult;
  reasoningQuestion: ReasoningQuestion;
  reasoningAnswer: number | null;
  onAnswerReasoning: (index: number) => void;
  onNext: () => void;
  isLastRound: boolean;
}

export default function ScorePopup({
  result,
  reasoningQuestion,
  reasoningAnswer,
  onAnswerReasoning,
  onNext,
  isLastRound,
}: ScorePopupProps) {
  const hasAnswered = reasoningAnswer !== null;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      className="bg-bg-secondary border border-border rounded-2xl p-6 max-w-lg mx-auto"
    >
      {/* Stars */}
      <div className="flex justify-center gap-2 mb-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2 + i * 0.2, type: 'spring', damping: 10 }}
          >
            <Star
              className="w-8 h-8"
              fill={i < result.stars ? '#EAB308' : 'transparent'}
              stroke={i < result.stars ? '#EAB308' : '#64748B'}
              strokeWidth={1.5}
            />
          </motion.div>
        ))}
      </div>

      {/* Score */}
      <div className="text-center mb-5">
        <span className="text-3xl font-bold font-mono text-text-primary">
          {result.score}
        </span>
        <span className="text-lg text-text-muted font-mono">/100</span>
      </div>

      {/* Reasoning question */}
      <div className="border-t border-border pt-4">
        <p className="text-sm font-semibold text-text-primary mb-3">
          {reasoningQuestion.question}
        </p>
        <div className="space-y-2">
          {reasoningQuestion.options.map((option, idx) => {
            const isCorrect = idx === reasoningQuestion.correctIndex;
            const isSelected = reasoningAnswer === idx;
            let optionClass =
              'border border-border bg-bg-primary hover:border-accent-blue';
            if (hasAnswered) {
              if (isCorrect) {
                optionClass = 'border-accent-green bg-accent-green/10';
              } else if (isSelected && !isCorrect) {
                optionClass = 'border-accent-red bg-accent-red/10';
              } else {
                optionClass = 'border-border bg-bg-primary opacity-50';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => !hasAnswered && onAnswerReasoning(idx)}
                disabled={hasAnswered}
                className={`
                  w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all
                  ${optionClass}
                  ${hasAnswered ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                <span className="font-mono text-text-muted mr-2">
                  {String.fromCharCode(65 + idx)}.
                </span>
                <span className={isCorrect && hasAnswered ? 'text-accent-green' : 'text-text-secondary'}>
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {hasAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30"
          >
            <p className="text-xs text-accent-cyan leading-relaxed">
              {reasoningQuestion.explanation}
            </p>
          </motion.div>
        )}
      </div>

      {hasAnswered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-5 flex justify-center"
        >
          <Button onClick={onNext} size="lg">
            {isLastRound ? 'Finish Scenario →' : 'Next Round →'}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
