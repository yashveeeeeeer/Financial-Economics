import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scenarios } from '../data/scenarios';
import MacroShockCard from '../components/simulation/MacroShockCard';
import AssetCard from '../components/simulation/AssetCard';
import DecisionConsole from '../components/simulation/DecisionConsole';
import RevealPanel from '../components/simulation/RevealPanel';

export default function SimulationPlay() {
  const { id } = useParams<{ id: string }>();
  const scenario = scenarios.find((s) => s.id === id);
  const [phase, setPhase] = useState<'decide' | 'reveal'>('decide');
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!scenario) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Scenario Not Found</h2>
        <p className="text-gray-400 mb-6">The scenario you're looking for doesn't exist.</p>
        <Link to="/simulations" className="btn-primary">Back to Simulations</Link>
      </div>
    );
  }

  const handleDecisionSubmit = (answer: string[]) => {
    setUserAnswer(answer);
    const correct = scenario.decisions[0]?.correctAnswer;
    if (correct) {
      const match = answer.every((a, i) => a === correct[i]);
      setIsCorrect(match);
    }
    setTimeout(() => setPhase('reveal'), 600);
  };

  const handleRestart = () => {
    setPhase('decide');
    setUserAnswer([]);
    setIsCorrect(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link to="/simulations" className="text-gray-500 hover:text-gray-300 text-sm">
              ← Simulations
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-gray-300 text-sm">{scenario.title}</span>
          </div>
          <h1 className="text-2xl font-bold text-white">{scenario.title}</h1>
        </div>
        {phase === 'reveal' && (
          <button onClick={handleRestart} className="btn-secondary text-sm">
            Try Again
          </button>
        )}
      </div>

      {phase === 'decide' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Macro Shock */}
          <div className="lg:col-span-4">
            <MacroShockCard scenario={scenario} />
          </div>

          {/* Center: Assets */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Available Assets</div>
            {scenario.assets.map((asset, i) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                factors={scenario.factors}
                index={i}
              />
            ))}
          </div>

          {/* Right: Decision */}
          <div className="lg:col-span-4">
            {scenario.decisions[0] && (
              <DecisionConsole
                decision={scenario.decisions[0]}
                assets={scenario.assets}
                onSubmit={handleDecisionSubmit}
              />
            )}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <RevealPanel
            scenario={scenario}
            userAnswer={userAnswer}
            isCorrect={isCorrect}
          />
        </motion.div>
      )}
    </div>
  );
}
