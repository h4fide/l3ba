"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { categories, Category } from '@/data/words';

type GameState = 'setup' | 'roleReveal' | 'discussion' | 'end';

interface GameContextType {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  playerCount: number;
  category: Category | null;
  secretWord: string;
  imposterIndex: number;
  currentPlayerIndex: number;
  firstPlayerIndex: number;
  setupGame: (players: number, category: Category) => void;
  nextPlayer: () => void;
  restartGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [playerCount, setPlayerCount] = useState(3);
  const [category, setCategory] = useState<Category | null>(null);
  const [secretWord, setSecretWord] = useState('');
  const [imposterIndex, setImposterIndex] = useState(-1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [firstPlayerIndex, setFirstPlayerIndex] = useState(0);

  const setupGame = (players: number, cat: Category) => {
    const wordPool = categories[cat];
    const randomWord = wordPool[Math.floor(Math.random() * wordPool.length)];
    const randomImposter = Math.floor(Math.random() * players);
    const randomFirstPlayer = Math.floor(Math.random() * players);
    
    setPlayerCount(players);
    setCategory(cat);
    setSecretWord(randomWord);
    setImposterIndex(randomImposter);
    setFirstPlayerIndex(randomFirstPlayer);
    setCurrentPlayerIndex(0);
    setGameState('roleReveal');
  };

  const nextPlayer = () => {
    if (currentPlayerIndex < playerCount - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
    } else {
      setGameState('discussion');
    }
  };

  const restartGame = () => {
    setGameState('setup');
    setPlayerCount(3);
    setCategory(null);
    setSecretWord('');
    setImposterIndex(-1);
    setCurrentPlayerIndex(0);
  };

  const value = {
    gameState,
    setGameState,
    playerCount,
    category,
    secretWord,
    imposterIndex,
    currentPlayerIndex,
    firstPlayerIndex,
    setupGame,
    nextPlayer,
    restartGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
