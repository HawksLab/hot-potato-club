import { sampleCategories } from '@/_constants/categories';
import { GameAction, GameState } from '@/_types/GameTypes';
import { getAvailableQuestions, getRandomQuestion } from '@/_utils/gameUtils';

// Initial game state
export const initialGameState: GameState = {
  settings: { players: [], selectedCategories: [], rounds: 3, minTimer: 10, maxTimer: 60 },
  currentRound: 0,
  currentQuestion: '',
  currentCategory: '',
  currentPlayer: 0,
  timerRunning: false,
  exploded: false,
  gameOver: false,
  roundResults: [],
};

// Reducer function for game state
export function gameReducer(state: GameState = initialGameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_PLAYERS':
      return { ...state, settings: { ...state.settings, players: action.payload } };
    case 'SET_SELECTED_CATEGORIES':
      return { ...state, settings: { ...state.settings, selectedCategories: action.payload } };
    case 'SET_ROUNDS':
      return { ...state, settings: { ...state.settings, rounds: action.payload } };
    case 'SET_TIMER_RANGE':
      return { ...state, settings: { ...state.settings, minTimer: action.payload.min, maxTimer: action.payload.max } };
    case 'START_GAME': {
      const available = getAvailableQuestions(sampleCategories, state.settings.selectedCategories);
      const { question, category } = getRandomQuestion(available);
      return {
        ...state,
        currentRound: 1,
        currentQuestion: question,
        currentCategory: category,
        timerRunning: true,
        exploded: false,
        gameOver: false,
        roundResults: [],
      };
    }
    case 'SET_QUESTION': {
      return { ...state, currentQuestion: action.payload.question, currentCategory: action.payload.category };
    }
    case 'NEXT_PLAYER':
      return { ...state, currentPlayer: (state.currentPlayer + 1) % state.settings.players.length };
    case 'SKIP_QUESTION': {
      const available = getAvailableQuestions(sampleCategories, state.settings.selectedCategories);
      const { question, category } = getRandomQuestion(available);
      return { ...state, currentQuestion: question, currentCategory: category };
    }
    case 'EXPLODE': {
      const playerId = state.settings.players[state.currentPlayer].id;
      return {
        ...state,
        exploded: true,
        timerRunning: false,
        roundResults: [...state.roundResults, { playerId, exploded: true }],
      };
    }
    case 'NEXT_ROUND': {
      const nextRoundIndex = state.currentRound + 1;
      if (nextRoundIndex > state.settings.rounds) {
        return { ...state, gameOver: true };
      }
      const available = getAvailableQuestions(sampleCategories, state.settings.selectedCategories);
      const { question, category } = getRandomQuestion(available);
      return {
        ...state,
        currentRound: nextRoundIndex,
        currentQuestion: question,
        currentCategory: category,
        timerRunning: true,
        exploded: false,
      };
    }
    case 'RESET_GAME':
      return initialGameState;
    default:
      return state;
  }
}

export default function GameReducerPlaceholder() {
  return null;
}