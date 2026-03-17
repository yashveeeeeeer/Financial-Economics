import { useMemo, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { getScenarioById } from '../data/scenarios/index.ts';
import { useGameState } from '../hooks/useGameState.ts';
import { scoreRanking, scoreBetaPlacement, scoreArbitrage } from '../engine/scoring.ts';
import { detectArbitrage } from '../engine/arbitrage.ts';
import type { PortfolioPosition, FactorId } from '../types/index.ts';

import ShockCard from '../components/game/ShockCard.tsx';
import AssetCard from '../components/game/AssetCard.tsx';
import FactorIndicator from '../components/game/FactorIndicator.tsx';
import DecisionRanker from '../components/game/DecisionRanker.tsx';
import BetaPlacement from '../components/game/BetaPlacement.tsx';
import PortfolioBuilder from '../components/game/PortfolioBuilder.tsx';
import ScorePopup from '../components/game/ScorePopup.tsx';
import PinnedEquation from '../components/equations/PinnedEquation.tsx';
import ReturnDecomposition from '../components/graphs/ReturnDecomposition.tsx';
import CovarianceGraph from '../components/graphs/CovarianceGraph.tsx';
import StatePayoffGraph from '../components/graphs/StatePayoffGraph.tsx';
import FactorBetaBarChart from '../components/graphs/FactorBetaBarChart.tsx';
import Button from '../components/ui/Button.tsx';

const PHASE_EQUATIONS: Record<string, { latex: string; label: string; interpretation: string }> = {
  shock: {
    latex: 'p = E[m \\cdot x]',
    label: 'Asset Pricing',
    interpretation: 'Price today equals the expected value of the payoff weighted by the stochastic discount factor.',
  },
  analyze: {
    latex: 'p = \\sum_s \\pi_s \\cdot m_s \\cdot x_s',
    label: 'State Pricing',
    interpretation: 'Each state contributes to the price through its probability, SDF weight, and payoff.',
  },
  decide_rank: {
    latex: 'E(R_i) = R_f + \\sum_k \\beta_{ik} \\lambda_k',
    label: 'Factor Pricing',
    interpretation: 'Expected return equals the risk-free rate plus compensation for each factor exposure.',
  },
  decide_beta: {
    latex: '\\beta_{ik} = \\frac{\\text{Cov}(R_i, F_k)}{\\text{Var}(F_k)}',
    label: 'Factor Beta',
    interpretation: 'Beta measures the sensitivity of an asset\'s return to a specific factor — the regression slope.',
  },
  decide_arb: {
    latex: '\\beta_A = \\beta_B,\\ E(R_A) \\neq E(R_B) \\implies \\text{Arbitrage}',
    label: 'No-Arbitrage',
    interpretation: 'Same factor exposure must produce the same expected return. Differences signal mispricing.',
  },
  reveal: {
    latex: 'E(R_i) - R_f = -\\frac{\\text{Cov}(m, R_i)}{E(m)}',
    label: 'Risk Premium',
    interpretation: 'The risk premium compensates for negative covariance with the SDF — losing value in bad times.',
  },
};

export default function SimulationGamePage() {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const navigate = useNavigate();
  const scenario = useMemo(() => getScenarioById(scenarioId || ''), [scenarioId]);

  const {
    state,
    startScenario,
    advancePhase,
    submitDecision,
    setDecision,
    setScore,
    answerReasoning,
    nextRound,
    finishScenario,
  } = useGameState();

  useEffect(() => {
    if (scenario && state.currentScenarioId !== scenario.id) {
      startScenario(scenario.id);
    }
  }, [scenario, state.currentScenarioId, startScenario]);

  const currentRound = scenario?.rounds[state.currentRoundIndex];
  const isLastRound = scenario
    ? state.currentRoundIndex >= scenario.rounds.length - 1
    : false;

  const getEquationKey = () => {
    if (state.currentPhase === 'shock') return 'shock';
    if (state.currentPhase === 'analyze') return 'analyze';
    if (state.currentPhase === 'reveal' || state.currentPhase === 'score') return 'reveal';
    if (state.currentPhase === 'decide' && currentRound) {
      if (currentRound.decisionType === 'rank_expected_returns') return 'decide_rank';
      if (currentRound.decisionType === 'estimate_betas') return 'decide_beta';
      if (currentRound.decisionType === 'build_arbitrage') return 'decide_arb';
    }
    return 'shock';
  };

  const handleRankingSubmit = useCallback(
    (ranking: string[]) => {
      setDecision(ranking);
      if (currentRound?.correctRanking) {
        const result = scoreRanking(ranking, currentRound.correctRanking);
        submitDecision();
        setTimeout(() => setScore(result), 2500);
      }
    },
    [currentRound, setDecision, submitDecision, setScore]
  );

  const handleBetaSubmit = useCallback(
    (placements: { assetId: string; x: number; y: number }[]) => {
      setDecision(placements);
      if (scenario && currentRound?.axisConfig) {
        const correct = scenario.assets.map((a) => ({
          assetId: a.id,
          x: a.trueBetas[currentRound.axisConfig!.xAxis.factor],
          y: a.trueBetas[currentRound.axisConfig!.yAxis.factor],
        }));
        const result = scoreBetaPlacement(placements, correct);
        submitDecision();
        setTimeout(() => setScore(result), 2500);
      }
    },
    [scenario, currentRound, setDecision, submitDecision, setScore]
  );

  const handlePortfolioSubmit = useCallback(
    (weights: Record<string, number>) => {
      setDecision(weights);
      if (scenario) {
        const premia = Object.fromEntries(
          Object.entries(scenario.factors).map(([k, v]) => [k, v.premium])
        );
        const positions: PortfolioPosition[] = scenario.assets
          .filter((a) => weights[a.id] !== undefined && weights[a.id] !== 0)
          .map((a) => ({
            assetId: a.id,
            weight: weights[a.id],
            betas: a.trueBetas,
            statePayoffs: a.statePayoffs,
            currentPrice: a.currentPrice,
          }));
        const arbResult = detectArbitrage(positions, scenario.riskFreeRate, premia);
        const result = scoreArbitrage(arbResult);
        submitDecision();
        setTimeout(() => setScore(result), 2500);
      }
    },
    [scenario, setDecision, submitDecision, setScore]
  );

  const handleNextRound = useCallback(() => {
    if (isLastRound) {
      finishScenario();
      navigate('/simulations');
    } else {
      nextRound();
    }
  }, [isLastRound, finishScenario, navigate, nextRound]);

  if (!scenario) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center">
        <p className="text-text-muted">Scenario not found.</p>
      </div>
    );
  }

  const eq = PHASE_EQUATIONS[getEquationKey()];

  return (
    <div className="min-h-screen pt-14">
      {/* Top Bar */}
      <div className="bg-bg-secondary border-b border-border px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/simulations')}
              className="text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold text-text-primary">
              {scenario.title}
            </span>
            <span className="text-xs text-text-muted">
              Round {state.currentRoundIndex + 1}/{scenario.rounds.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted">Phase:</span>
            <span className="text-xs font-medium text-accent-cyan uppercase">
              {state.currentPhase}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Panel */}
          <div className="lg:col-span-3 space-y-4">
            <ShockCard scenario={scenario} />
            <div className="bg-bg-secondary border border-border rounded-xl p-4">
              <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                Factor Dashboard
              </p>
              {(Object.keys(scenario.factors) as FactorId[]).map((f) => (
                <FactorIndicator
                  key={f}
                  factorId={f}
                  shock={scenario.factors[f].shock}
                  premium={scenario.factors[f].premium}
                />
              ))}
            </div>
          </div>

          {/* Center Panel */}
          <div className="lg:col-span-5 space-y-4">
            <AnimatePresence mode="wait">
              {/* SHOCK Phase */}
              {state.currentPhase === 'shock' && (
                <motion.div
                  key="shock"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-bg-secondary border border-border rounded-xl p-5 text-center">
                    <h3 className="text-lg font-bold text-text-primary mb-2">
                      {scenario.headline}
                    </h3>
                    <p className="text-sm text-text-secondary mb-4">
                      Study the macro shock and factor movements. Then analyze the assets.
                    </p>
                    <Button onClick={advancePhase} size="lg">
                      See Assets <ArrowRight className="w-4 h-4 inline ml-1" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* ANALYZE Phase */}
              {state.currentPhase === 'analyze' && (
                <motion.div
                  key="analyze"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {scenario.assets.map((asset, i) => (
                    <AssetCard key={asset.id} asset={asset} index={i} />
                  ))}
                  <div className="flex justify-center pt-2">
                    <Button onClick={advancePhase} size="lg">
                      Make Decision <ArrowRight className="w-4 h-4 inline ml-1" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* DECIDE Phase */}
              {state.currentPhase === 'decide' && currentRound && (
                <motion.div
                  key="decide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-bg-secondary border border-accent-blue/30 rounded-xl p-4">
                    <p className="text-sm font-medium text-accent-blue mb-1">Your Task</p>
                    <p className="text-sm text-text-secondary">{currentRound.instruction}</p>
                  </div>

                  {currentRound.decisionType === 'rank_expected_returns' && (
                    <DecisionRanker
                      assets={scenario.assets}
                      onSubmit={handleRankingSubmit}
                    />
                  )}

                  {currentRound.decisionType === 'estimate_betas' &&
                    currentRound.axisConfig && (
                      <BetaPlacement
                        assets={scenario.assets}
                        xAxis={currentRound.axisConfig.xAxis}
                        yAxis={currentRound.axisConfig.yAxis}
                        onSubmit={handleBetaSubmit}
                      />
                    )}

                  {currentRound.decisionType === 'build_arbitrage' && (
                    <PortfolioBuilder
                      assets={
                        currentRound.availableAssets
                          ? scenario.assets.filter((a) =>
                              currentRound.availableAssets!.includes(a.id)
                            )
                          : scenario.assets
                      }
                      riskFreeRate={scenario.riskFreeRate}
                      premia={Object.fromEntries(
                        Object.entries(scenario.factors).map(([k, v]) => [k, v.premium])
                      )}
                      onSubmit={handlePortfolioSubmit}
                    />
                  )}
                </motion.div>
              )}

              {/* REVEAL Phase */}
              {state.currentPhase === 'reveal' && (
                <motion.div
                  key="reveal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-bg-secondary border border-accent-cyan/30 rounded-xl p-4 text-center">
                    <p className="text-sm font-medium text-accent-cyan mb-1">
                      Analyzing your decision...
                    </p>
                    <p className="text-xs text-text-muted">
                      The graphs below reveal the correct answer and the pricing logic.
                    </p>
                  </div>

                  <ReturnDecomposition
                    scenario={scenario}
                    playerRanking={
                      currentRound?.decisionType === 'rank_expected_returns'
                        ? (state.playerDecision as string[])
                        : undefined
                    }
                    correctRanking={currentRound?.correctRanking}
                  />

                  <CovarianceGraph
                    scenario={scenario}
                    assetId={scenario.assets[1]?.id || scenario.assets[0].id}
                  />

                  <StatePayoffGraph
                    scenario={scenario}
                    assetIds={[
                      scenario.assets[scenario.assets.length - 1].id,
                      scenario.assets[0].id,
                    ]}
                  />
                </motion.div>
              )}

              {/* SCORE Phase */}
              {state.currentPhase === 'score' && state.lastScoreResult && currentRound && (
                <motion.div
                  key="score"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ScorePopup
                    result={state.lastScoreResult}
                    reasoningQuestion={currentRound.reasoningQuestion}
                    reasoningAnswer={state.reasoningAnswer}
                    onAnswerReasoning={answerReasoning}
                    onNext={handleNextRound}
                    isLastRound={isLastRound}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-4 space-y-4">
            <PinnedEquation
              latex={eq.latex}
              label={eq.label}
              interpretation={eq.interpretation}
            />

            {(state.currentPhase === 'reveal' || state.currentPhase === 'score') && (
              <FactorBetaBarChart scenario={scenario} />
            )}

            {/* Asset state payoffs on analyze */}
            {state.currentPhase === 'analyze' && (
              <div className="bg-bg-secondary border border-border rounded-xl p-4">
                <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                  State-Contingent Payoffs
                </h4>
                <div className="space-y-2">
                  {scenario.assets.slice(0, 3).map((asset) => (
                    <div key={asset.id} className="flex items-center gap-2">
                      <span className="text-xs w-20 truncate text-text-secondary">
                        {asset.icon} {asset.name.split(' ')[0]}
                      </span>
                      <div className="flex-1 flex gap-0.5">
                        {(['boom', 'normal', 'slowdown', 'recession', 'crisis'] as const).map(
                          (s) => {
                            const val = asset.statePayoffs[s];
                            const max = Math.max(
                              ...Object.values(asset.statePayoffs)
                            );
                            const pct = (val / max) * 100;
                            return (
                              <div
                                key={s}
                                className="flex-1 rounded-sm"
                                style={{
                                  height: '20px',
                                  background: `linear-gradient(to top, #3B82F6${Math.round(
                                    pct * 0.6 + 20
                                  )
                                    .toString(16)
                                    .padStart(2, '0')}, transparent)`,
                                }}
                                title={`${s}: $${val}`}
                              />
                            );
                          }
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1 text-[9px] text-text-muted">
                  <span>Boom</span>
                  <span>Normal</span>
                  <span>Slowdown</span>
                  <span>Recession</span>
                  <span>Crisis</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
