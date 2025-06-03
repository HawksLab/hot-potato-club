// Define data models and state types for the Hot Potato game
export interface Category {
  id: string;
  name: string;
  questions: string[];
}

export interface Player {
  id: string;
  name: string;
  color: string;
  roundsLost: number;
}

export interface GameSettings {
  players: Player[];
  selectedCategories: string[];
  rounds: number;
  minTimer: number;
  maxTimer: number;
}

export interface RoundResult {
  playerId: string;
  exploded: boolean;
}

export interface GameState {
  settings: GameSettings;
  currentRound: number;
  currentQuestion: string;
  currentCategory: string;
  currentPlayer: number;
  timerRunning: boolean;
  exploded: boolean;
  gameOver: boolean;
  roundResults: RoundResult[];
}

// Action types for reducer
export type GameAction =
  | { type: 'SET_PLAYERS'; payload: Player[] }
  | { type: 'SET_SELECTED_CATEGORIES'; payload: string[] }
  | { type: 'SET_ROUNDS'; payload: number }
  | { type: 'SET_TIMER_RANGE'; payload: { min: number; max: number } }
  | { type: 'START_GAME' }
  | { type: 'SET_QUESTION'; payload: { question: string; category: string } }
  | { type: 'NEXT_PLAYER' }
  | { type: 'SKIP_QUESTION' }
  | { type: 'EXPLODE' }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET_GAME' }
  | { type: 'SET_ROUND_LOSER'; payload: number };

export default {} as any;
