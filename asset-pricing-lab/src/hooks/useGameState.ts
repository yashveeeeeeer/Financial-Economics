import { useReducer, useCallback } from 'react';
import type { GameState, GameAction, ScoreResult } from '../types/index.ts';

const INITIAL_STATE: GameState = {
  currentScenarioId: null,
  currentRoundIndex: 0,
  currentPhase: 'shock',
  totalScore: 0,
  totalStars: 0,
  scenarioStars: {},
  unlockedScenarios: ['ai_power_surge'],
  playerDecision: null,
  revealStep: 0,
  lastScoreResult: null,
  reasoningAnswer: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_SCENARIO':
      return {
        ...state,
        currentScenarioId: action.scenarioId,
        currentRoundIndex: 0,
        currentPhase: 'shock',
        playerDecision: null,
        revealStep: 0,
        lastScoreResult: null,
        reasoningAnswer: null,
      };

    case 'ADVANCE_PHASE': {
      const phases: GameState['currentPhase'][] = [
        'shock', 'analyze', 'decide', 'reveal', 'score',
      ];
      const currentIdx = phases.indexOf(state.currentPhase);
      const nextPhase = phases[Math.min(currentIdx + 1, phases.length - 1)];
      return {
        ...state,
        currentPhase: nextPhase,
        revealStep: nextPhase === 'reveal' ? 0 : state.revealStep,
      };
    }

    case 'SET_DECISION':
      return { ...state, playerDecision: action.decision };

    case 'SUBMIT_DECISION':
      return { ...state, currentPhase: 'reveal', revealStep: 0 };

    case 'NEXT_REVEAL_STEP':
      return { ...state, revealStep: state.revealStep + 1 };

    case 'SET_SCORE':
      return {
        ...state,
        currentPhase: 'score',
        lastScoreResult: action.result,
        totalScore: state.totalScore + action.result.score,
        totalStars: state.totalStars + action.result.stars,
        scenarioStars: {
          ...state.scenarioStars,
          [state.currentScenarioId || '']:
            (state.scenarioStars[state.currentScenarioId || ''] || 0) +
            action.result.stars,
        },
      };

    case 'ANSWER_REASONING':
      return { ...state, reasoningAnswer: action.answerIndex };

    case 'NEXT_ROUND':
      return {
        ...state,
        currentRoundIndex: state.currentRoundIndex + 1,
        currentPhase: 'shock',
        playerDecision: null,
        revealStep: 0,
        lastScoreResult: null,
        reasoningAnswer: null,
      };

    case 'FINISH_SCENARIO': {
      const scenarioId = state.currentScenarioId || '';
      const stars = state.scenarioStars[scenarioId] || 0;
      const newUnlocked = [...state.unlockedScenarios];
      // Unlock next scenario if player earned 4+ stars
      const scenarioOrder = ['ai_power_surge', 'oil_shock', 'inflation_surprise'];
      const idx = scenarioOrder.indexOf(scenarioId);
      if (stars >= 4 && idx >= 0 && idx < scenarioOrder.length - 1) {
        const next = scenarioOrder[idx + 1];
        if (!newUnlocked.includes(next)) newUnlocked.push(next);
      }
      return {
        ...state,
        currentScenarioId: null,
        currentPhase: 'shock',
        unlockedScenarios: newUnlocked,
      };
    }

    case 'RESET':
      return INITIAL_STATE;

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  const startScenario = useCallback(
    (id: string) => dispatch({ type: 'START_SCENARIO', scenarioId: id }),
    []
  );
  const advancePhase = useCallback(() => dispatch({ type: 'ADVANCE_PHASE' }), []);
  const setDecision = useCallback(
    (d: unknown) => dispatch({ type: 'SET_DECISION', decision: d }),
    []
  );
  const submitDecision = useCallback(() => dispatch({ type: 'SUBMIT_DECISION' }), []);
  const nextRevealStep = useCallback(() => dispatch({ type: 'NEXT_REVEAL_STEP' }), []);
  const setScore = useCallback(
    (r: ScoreResult) => dispatch({ type: 'SET_SCORE', result: r }),
    []
  );
  const answerReasoning = useCallback(
    (i: number) => dispatch({ type: 'ANSWER_REASONING', answerIndex: i }),
    []
  );
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const finishScenario = useCallback(() => dispatch({ type: 'FINISH_SCENARIO' }), []);

  return {
    state,
    startScenario,
    advancePhase,
    setDecision,
    submitDecision,
    nextRevealStep,
    setScore,
    answerReasoning,
    nextRound,
    finishScenario,
  };
}
