import { sampleCategories } from '@/_constants/categories';
import { Category, GameState, Player } from '@/_types/GameTypes';
import React, { createContext, ReactNode, useContext, useMemo, useReducer } from 'react';
import { gameReducer, initialGameState } from './gameReducer';

type GameContextType = {
  categories: Category[];
  gameState: GameState;
  setPlayers: (players: Player[]) => void;
  setSelectedCategories: (categories: string[]) => void;
  setRoundCount: (rounds: number) => void;
  setTimerRange: (min: number, max: number) => void;
  startGame: () => void;
  nextPlayer: () => void;
  skipQuestion: () => void;
  explode: () => void;
  nextRound: () => void;
  resetGame: () => void;
  isGameSetupComplete: () => boolean;
  setRoundLoser: (playerIndex: number) => void;
};

export const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  
  const setPlayers = (players: Player[]) => dispatch({ type: 'SET_PLAYERS', payload: players });
  const setSelectedCategories = (categories: string[]) => dispatch({ type: 'SET_SELECTED_CATEGORIES', payload: categories });
  const setRoundCount = (rounds: number) => dispatch({ type: 'SET_ROUNDS', payload: rounds });
  const setTimerRange = (min: number, max: number) => dispatch({ type: 'SET_TIMER_RANGE', payload: { min, max } });
  const startGame = () => dispatch({ type: 'START_GAME' });
  const nextPlayer = () => dispatch({ type: 'NEXT_PLAYER' });
  const skipQuestion = () => dispatch({ type: 'SKIP_QUESTION' });
  const explode = () => dispatch({ type: 'EXPLODE' });
  const nextRound = () => dispatch({ type: 'NEXT_ROUND' });
  const resetGame = () => dispatch({ type: 'RESET_GAME' });
  const setRoundLoser = (playerIndex: number) => {
    dispatch({ type: 'SET_ROUND_LOSER', payload: playerIndex });
  };

  const value = useMemo(() => {
    const isGameSetupComplete = () => {
      const { players, selectedCategories, rounds } = state.settings;
      return players.length >= 2 && selectedCategories.length > 0 && rounds > 0;
    };

    return {
      categories: sampleCategories,
      gameState: state,
      setPlayers,
      setSelectedCategories,
      setRoundCount,
      setTimerRange,
      startGame,
      nextPlayer,
      skipQuestion,
      explode,
      nextRound,
      resetGame,
      isGameSetupComplete,
      setRoundLoser,
    };
  }, [state]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook for using the game context
export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

export default GameProvider;