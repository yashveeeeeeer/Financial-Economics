import { useState, useCallback } from 'react';

export function useAnimationSequence(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(0);

  const next = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, totalSteps));
  }, [totalSteps]);

  const reset = useCallback(() => setCurrentStep(0), []);

  return {
    currentStep,
    next,
    reset,
    isComplete: currentStep >= totalSteps,
  };
}
