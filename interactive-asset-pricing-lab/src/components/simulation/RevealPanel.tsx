import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scenario } from '../../types/scenario';
import EquationDisplay from '../EquationDisplay';
import StatePayoffChart from '../charts/StatePayoffChart';
import CovarianceChart from '../charts/CovarianceChart';
import FactorExposureChart from '../charts/FactorExposureChart';
import ReturnDecompositionChart from '../charts/ReturnDecompositionChart';

interface Props {
  scenario: Scenario;
  userAnswer: string[];
  isCorrect: boolean;
}

export default function RevealPanel({ scenario, userAnswer, isCorrect }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const renderChart = (graphType: string) => {
    switch (graphType) {
      case 'state_payoff':
        return <StatePayoffChart assets={scenario.assets} states={scenario.states} />;
      case 'covariance':
        return <CovarianceChart assets={scenario.assets} states={scenario.states} />;
      case 'factor_exposure':
        return <FactorExposureChart assets={scenario.assets} factors={scenario.factors} />;
      case 'return_decomposition':
        return <ReturnDecompositionChart assets={scenario.assets} factors={scenario.factors} />;
      default:
        return <div className="text-gray-500 text-sm">Chart type not available</div>;
    }
  };

  const correctAnswer = scenario.decisions[0]?.correctAnswer ?? [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Result Banner */}
      <div className={`card border-l-4 ${isCorrect ? 'border-l-accent-success' : 'border-l-accent-warning'}`}>
        <div className="flex items-center gap-3">
          <div className={`text-2xl ${isCorrect ? '' : ''}`}>
            {isCorrect ? '✓' : '✗'}
          </div>
          <div>
            <div className={`font-semibold ${isCorrect ? 'text-accent-success' : 'text-accent-warning'}`}>
              {isCorrect ? 'Correct!' : 'Not quite right'}
            </div>
            <div className="text-gray-400 text-sm">
              {isCorrect
                ? 'You correctly identified the return ranking. Let\'s see why.'
                : 'Let\'s walk through the economics to understand the correct ranking.'}
            </div>
          </div>
        </div>

        {!isCorrect && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Your Answer</div>
              {userAnswer.map((id, i) => {
                const a = scenario.assets.find((x) => x.id === id);
                return (
                  <div key={id} className="text-sm text-gray-300">
                    #{i + 1} {a?.ticker ?? id}
                  </div>
                );
              })}
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Correct Answer</div>
              {correctAnswer.map((id, i) => {
                const a = scenario.assets.find((x) => x.id === id);
                return (
                  <div key={id} className="text-sm text-accent-success">
                    #{i + 1} {a?.ticker ?? id}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Step Navigation */}
      <div className="flex items-center gap-2">
        {scenario.revealSteps.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              currentStep === i
                ? 'bg-accent-primary text-white'
                : 'bg-surface-800 text-gray-400 hover:text-gray-200'
            }`}
          >
            Step {i + 1}
          </button>
        ))}
      </div>

      {/* Current Reveal Step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <div className="card">
            <h3 className="text-white font-semibold mb-4">
              {scenario.revealSteps[currentStep].title}
            </h3>

            <EquationDisplay
              equation={scenario.revealSteps[currentStep].equation}
              interpretation={scenario.revealSteps[currentStep].equationLabel}
              pinned
              size="md"
            />

            <div className="mt-6">
              {renderChart(scenario.revealSteps[currentStep].graphType)}
            </div>

            <div className="mt-4 p-4 bg-surface-900/60 rounded-lg border border-gray-700/30">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Explanation</div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {scenario.revealSteps[currentStep].explanation}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="btn-secondary disabled:opacity-30"
            >
              Previous
            </button>
            {currentStep < scenario.revealSteps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="btn-primary"
              >
                Next Step
              </button>
            ) : (
              <div className="card border-accent-success/30 bg-accent-success/5 max-w-md">
                <div className="text-xs text-accent-success uppercase tracking-wider mb-1">Key Takeaway</div>
                <p className="text-gray-200 text-sm leading-relaxed">{scenario.takeaway}</p>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
