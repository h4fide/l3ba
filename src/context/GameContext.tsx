"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { categories, Category, Word } from '@/data/words';

type GameState = 'setup' | 'roleReveal' | 'discussion' | 'end';

interface GameContextType {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  playerCount: number;
  players: string[];
  selectedCategories: string[];
  category: string | null;
  secretWord: string;
  hint: string;
  imposterIndex: number;
  currentPlayerIndex: number;
  firstPlayerIndex: number;
  imposterCount: number;
  imposterHint: boolean;
  setImposterHint: (val: boolean) => void;
  randomizeSecretWord: (categories?: string[]) => void;
  setupGame: (players: number, selectedCategories: string[], imposterCount: number, imposterHint: boolean) => void;
  nextPlayer: () => void;
  restartGame: () => void;
  updatePlayers: (players: string[]) => void;
  updateSelectedCategories: (categories: string[]) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [playerCount, setPlayerCount] = useState(3);
  const [players, setPlayers] = useState<string[]>(() => {
    try {
      if (typeof window === 'undefined') return ["اللاعب 1", "اللاعب 2", "اللاعب 3"];
      const raw = localStorage.getItem('l3ba_players');
      return raw ? JSON.parse(raw) as string[] : ["اللاعب 1", "اللاعب 2", "اللاعب 3"];
    } catch (e) {
      return ["اللاعب 1", "اللاعب 2", "اللاعب 3"];
    }
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    try {
      if (typeof window === 'undefined') return [];
      const raw = localStorage.getItem('l3ba_selectedCategories');
      return raw ? JSON.parse(raw) as string[] : [];
    } catch (e) {
      return [];
    }
  });
  const [category, setCategory] = useState<string | null>(null);
  const [secretWord, setSecretWord] = useState('');
  const [hint, setHint] = useState('');
  const [imposterIndex, setImposterIndex] = useState(-1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [firstPlayerIndex, setFirstPlayerIndex] = useState(0);
  const [imposterCount, setImposterCount] = useState(1);
  const [imposterHint, setImposterHint] = useState(false);

  // Pick a random category + word from either the provided categories or the currently
  // selectedCategories state. Exposed so the UI can re-randomize the secret word on demand.
  const randomizeSecretWord = (cats?: string[]) => {
    const poolCategories = cats && cats.length > 0 ? cats : selectedCategories;
    if (!poolCategories || poolCategories.length === 0) {
      console.error('No categories available to randomize secret word');
      return;
    }
    const randomCategory = poolCategories[Math.floor(Math.random() * poolCategories.length)];
    const wordPool = categories[randomCategory as Category] as Word[];
    if (!wordPool || wordPool.length === 0) {
      console.error('No words available for category:', randomCategory);
      return;
    }
    const randomWordObj = wordPool[Math.floor(Math.random() * wordPool.length)];
    setCategory(randomCategory);
    setSecretWord(randomWordObj.word);
    setHint(randomWordObj.hint);
  };

  const setupGame = (players: number, selectedCategories: string[], impCount: number, hint: boolean) => {
    if (selectedCategories.length === 0) return;
  // Randomize secret word (and category/hint) from the selected categories
  randomizeSecretWord(selectedCategories);
  const randomImposter = Math.floor(Math.random() * players);
  const randomFirstPlayer = Math.floor(Math.random() * players);
    setPlayerCount(players);
    setSelectedCategories(selectedCategories);
    setImposterIndex(randomImposter);
    setFirstPlayerIndex(randomFirstPlayer);
    setCurrentPlayerIndex(0);
    setImposterCount(impCount);
    setImposterHint(hint);
    setGameState('roleReveal');
  };

  const nextPlayer = () => {
    if (currentPlayerIndex < playerCount - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
    } else {
      setGameState('discussion');
    }
  };

  const updatePlayers = (newPlayers: string[]) => {
    setPlayers(newPlayers);
    setPlayerCount(newPlayers.length);
  };

  const updateSelectedCategories = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const restartGame = () => {
    // Keep players and selected categories persisted between plays.
    setGameState('setup');
    // Ensure playerCount matches the current players array
    setPlayerCount(players.length || 3);
    setCategory(null);
    setSecretWord('');
    setHint('');
    setImposterIndex(-1);
    setCurrentPlayerIndex(0);
    setImposterCount(1);
    setImposterHint(false);
  };

  // Persist players and selectedCategories to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('l3ba_players', JSON.stringify(players));
    } catch (e) {
      // ignore
    }
  }, [players]);

  useEffect(() => {
    try {
      localStorage.setItem('l3ba_selectedCategories', JSON.stringify(selectedCategories));
    } catch (e) {
      // ignore
    }
  }, [selectedCategories]);

  const value = {
    gameState,
    setGameState,
    playerCount,
    players,
    selectedCategories,
    category,
    secretWord,
    hint,
    imposterIndex,
    currentPlayerIndex,
    firstPlayerIndex,
    imposterCount,
    imposterHint,
  setImposterHint,
  randomizeSecretWord,
    setupGame,
    nextPlayer,
    restartGame,
    updatePlayers,
    updateSelectedCategories,
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
