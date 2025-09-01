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
  setImposterCount: (n: number) => void;
  imposterHint: boolean;
  setImposterHint: (val: boolean) => void;
  l7ajEnabled: boolean;
  setL7ajEnabled: (val: boolean) => void;
  hideL7aj: boolean;
  setHideL7aj: (val: boolean) => void;
  l7ajIndex: number;
  l7ajWord: string;
  randomizeSecretWord: (categories?: string[]) => { category: string | null; wordObj: Word | null } | void;
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
  // Start with deterministic defaults so server and client initial render match.
  const [players, setPlayers] = useState<string[]>(["اللاعب 1", "اللاعب 2", "اللاعب 3"]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [secretWord, setSecretWord] = useState('');
  const [hint, setHint] = useState('');
  const [imposterIndex, setImposterIndex] = useState(-1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [firstPlayerIndex, setFirstPlayerIndex] = useState(0);
  // imposterCount: 0 = no imposters, >=1 explicit number
  const [imposterCount, setImposterCount] = useState(1);
  const [imposterHint, setImposterHint] = useState(false);
  const [l7ajEnabled, setL7ajEnabled] = useState(false);
  const [l7ajIndex, setL7ajIndex] = useState(-1);
  const [l7ajWord, setL7ajWord] = useState('');
  const [hideL7aj, setHideL7aj] = useState(false);

  // Read persisted state from localStorage only on the client after mount to avoid
  // server/client rendering differences that cause hydration mismatches.
  useEffect(() => {
    try {
      const rawPlayers = localStorage.getItem('l3ba_players');
      if (rawPlayers) {
        const parsedPlayers = JSON.parse(rawPlayers) as string[];
        setPlayers(parsedPlayers);
        setPlayerCount(parsedPlayers.length);
      }
    } catch (e) {
      console.warn('Failed to load players from localStorage:', e);
    }

    try {
      const rawCats = localStorage.getItem('l3ba_selectedCategories');
      if (rawCats) {
        setSelectedCategories(JSON.parse(rawCats) as string[]);
      }
    } catch (e) {
      console.warn('Failed to load categories from localStorage:', e);
    }

    try {
      const rawImpCount = localStorage.getItem('l3ba_imposterCount');
      if (rawImpCount) {
        const parsed = parseInt(rawImpCount, 10);
        // allow 0 = no imposters, 1..3 explicit
        if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 3) {
          setImposterCount(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to load imposter count from localStorage:', e);
    }

    try {
      const rawHint = localStorage.getItem('l3ba_imposterHint');
      if (rawHint !== null) {
        setImposterHint(JSON.parse(rawHint) as boolean);
      }
    } catch (e) {
      console.warn('Failed to load imposter hint from localStorage:', e);
    }

    try {
      const rawL7 = localStorage.getItem('l3ba_l7ajEnabled');
      if (rawL7 !== null) {
        setL7ajEnabled(JSON.parse(rawL7) as boolean);
      }
    } catch (e) {
      console.warn('Failed to load l7aj enabled from localStorage:', e);
    }

    try {
      const rawHide = localStorage.getItem('l3ba_hideL7aj');
      if (rawHide !== null) {
        setHideL7aj(JSON.parse(rawHide) as boolean);
      }
    } catch (e) {
      console.warn('Failed to load hideL7aj from localStorage:', e);
    }
  }, []);

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
    return { category: randomCategory, wordObj: randomWordObj };
  };

  const setupGame = (players: number, selectedCategories: string[], impCount: number, hint: boolean) => {
    if (selectedCategories.length === 0) return;
    // Randomize secret word (and category/hint) from the selected categories and capture return
    const randomResult = randomizeSecretWord(selectedCategories) as { category: string | null; wordObj: Word | null } | void;
    
    // Use the imposter count directly (no random logic)
    const resolvedImpCount = impCount;
    const randomImposter = Math.floor(Math.random() * players);
    let randomL7aj = -1;
    let chosenL7ajWord = '';
    if (l7ajEnabled) {
      // pick a different player index for l7aj
      randomL7aj = Math.floor(Math.random() * players);
      let attempts = 0;
      while (randomL7aj === randomImposter && attempts < 10) {
        randomL7aj = Math.floor(Math.random() * players);
        attempts++;
      }

      // pick the l7aj word from same category but different from secret word
      const chosenCategory = randomResult?.category || category;
      if (chosenCategory) {
        const wordPool = categories[chosenCategory as Category] as Word[];
        if (wordPool && wordPool.length > 0) {
          // try to pick a different word
          let candidate = wordPool[Math.floor(Math.random() * wordPool.length)].word;
          let tries = 0;
          const secret = randomResult?.wordObj?.word || secretWord;
          while ((candidate === secret || !candidate) && tries < 20) {
            candidate = wordPool[Math.floor(Math.random() * wordPool.length)].word;
            tries++;
          }
          chosenL7ajWord = candidate;
        }
      }
    }
    const randomFirstPlayer = Math.floor(Math.random() * players);
    setPlayerCount(players);
    setSelectedCategories(selectedCategories);
    setImposterIndex(randomImposter);
    setL7ajIndex(randomL7aj);
    setL7ajWord(chosenL7ajWord);
    setFirstPlayerIndex(randomFirstPlayer);
    setCurrentPlayerIndex(0);
    // persist the chosen imposterCount for this round
    setImposterCount(resolvedImpCount);
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
    // Don't reset imposterCount and imposterHint - keep them persisted
    // setImposterCount(1);
    // setImposterHint(false);
  };

  // Persist players and selectedCategories to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('l3ba_players', JSON.stringify(players));
      console.log('Saved players to localStorage:', players);
    } catch (e) {
      console.error('Failed to save players to localStorage:', e);
    }
  }, [players]);

  useEffect(() => {
    try {
      localStorage.setItem('l3ba_selectedCategories', JSON.stringify(selectedCategories));
      console.log('Saved categories to localStorage:', selectedCategories);
    } catch (e) {
      console.error('Failed to save categories to localStorage:', e);
    }
  }, [selectedCategories]);

  // Persist imposterCount and imposterHint
  useEffect(() => {
    try {
      localStorage.setItem('l3ba_imposterCount', String(imposterCount));
      console.log('Saved imposter count to localStorage:', imposterCount);
    } catch (e) {
      console.error('Failed to save imposter count to localStorage:', e);
    }
  }, [imposterCount]);

  useEffect(() => {
    try {
      localStorage.setItem('l3ba_imposterHint', JSON.stringify(imposterHint));
      console.log('Saved imposter hint to localStorage:', imposterHint);
    } catch (e) {
      console.error('Failed to save imposter hint to localStorage:', e);
    }
  }, [imposterHint]);

  useEffect(() => {
    try {
      localStorage.setItem('l3ba_l7ajEnabled', JSON.stringify(l7ajEnabled));
      console.log('Saved l7aj enabled to localStorage:', l7ajEnabled);
    } catch (e) {
      console.error('Failed to save l7aj enabled to localStorage:', e);
    }
  }, [l7ajEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem('l3ba_hideL7aj', JSON.stringify(hideL7aj));
      console.log('Saved hideL7aj to localStorage:', hideL7aj);
    } catch (e) {
      console.error('Failed to save hideL7aj to localStorage:', e);
    }
  }, [hideL7aj]);

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
  setImposterCount,
    imposterHint,
  setImposterHint,
  l7ajEnabled,
  setL7ajEnabled,
  hideL7aj,
  setHideL7aj,
  l7ajIndex,
  l7ajWord,
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
