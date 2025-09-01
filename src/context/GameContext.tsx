"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { categories, Category, Word } from '@/data/words';

type GameState = 'setup' | 'roleReveal' | 'discussion' | 'end';

interface SavedSettings {
  players: string[];
  selectedCategories: string[];
  imposterCount: number;
  imposterHint: boolean;
  categoryHint: boolean;
  l7ajEnabled: boolean;
  hideL7aj: boolean;
  trapEnabled: boolean;
}

interface GameContextType {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  playerCount: number;
  players: string[];
  selectedCategories: string[];
  category: string | null;
  secretWord: string;
  hint: string;
  imposterIndices: number[];
  currentPlayerIndex: number;
  firstPlayerIndex: number;
  imposterCount: number;
  setImposterCount: (n: number) => void;
  imposterHint: boolean;
  setImposterHint: (val: boolean) => void;
  categoryHint: boolean;
  setCategoryHint: (val: boolean) => void;
  l7ajEnabled: boolean;
  setL7ajEnabled: (val: boolean) => void;
  hideL7aj: boolean;
  setHideL7aj: (val: boolean) => void;
  l7ajIndex: number;
  l7ajWord: string;
  trapEnabled: boolean;
  setTrapEnabled: (val: boolean) => void;
  trapActivated: boolean;
  randomizeSecretWord: (categories?: string[]) => { category: string | null; wordObj: Word | null } | void;
  setupGame: (playerCount: number, selectedCategories: string[], imposterCount: number, imposterHint: boolean, categoryHint?: boolean) => void;
  nextPlayer: () => void;
  restartGame: () => void;
  updatePlayers: (players: string[]) => void;
  updateSelectedCategories: (categories: string[]) => void;
  saveCurrentSettings: () => void;
  restoreToSavedSettings: () => void;
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
  const [imposterIndices, setImposterIndices] = useState<number[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [firstPlayerIndex, setFirstPlayerIndex] = useState(0);
  // imposterCount: 0 = no imposters, >=1 explicit number
  const [imposterCount, setImposterCount] = useState(1);
  const [imposterHint, setImposterHint] = useState(false);
  const [categoryHint, setCategoryHint] = useState(false);
  const [l7ajEnabled, setL7ajEnabled] = useState(false);
  const [l7ajIndex, setL7ajIndex] = useState(-1);
  const [l7ajWord, setL7ajWord] = useState('');
  const [hideL7aj, setHideL7aj] = useState(false);
  const [trapEnabled, setTrapEnabled] = useState(false);
  const [trapActivated, setTrapActivated] = useState(false);
  const [savedSettings, setSavedSettings] = useState<SavedSettings | null>(null);

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
      const rawCategoryHint = localStorage.getItem('l3ba_categoryHint');
      if (rawCategoryHint !== null) {
        setCategoryHint(JSON.parse(rawCategoryHint) as boolean);
      }
    } catch (e) {
      console.warn('Failed to load category hint from localStorage:', e);
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

    try {
      const rawTrap = localStorage.getItem('l3ba_trapEnabled');
      if (rawTrap !== null) {
        setTrapEnabled(JSON.parse(rawTrap) as boolean);
      }
    } catch (e) {
      console.warn('Failed to load trapEnabled from localStorage:', e);
    }
  }, []);

  // Pick a random word from all 800+ words first, then determine its category.
  // Only considers words from the selected categories if specified.
  const randomizeSecretWord = (cats?: string[]) => {
    const poolCategories = cats && cats.length > 0 ? cats : selectedCategories;
    if (!poolCategories || poolCategories.length === 0) {
      console.error('No categories available to randomize secret word');
      return;
    }

    // Create a flat array of all words from selected categories with their category info
    const allWords: Array<{ word: Word; category: string }> = [];
    
    poolCategories.forEach(categoryName => {
      const wordPool = categories[categoryName as Category] as Word[];
      if (wordPool && wordPool.length > 0) {
        wordPool.forEach(wordObj => {
          allWords.push({ word: wordObj, category: categoryName });
        });
      }
    });

    if (allWords.length === 0) {
      console.error('No words available from selected categories');
      return;
    }

    // Pick a random word from all available words
    const randomIndex = Math.floor(Math.random() * allWords.length);
    const selectedWordData = allWords[randomIndex];
    
    setCategory(selectedWordData.category);
    setSecretWord(selectedWordData.word.word);
    setHint(selectedWordData.word.hint);
    return { category: selectedWordData.category, wordObj: selectedWordData.word };
  };

  const setupGame = (playerCount: number, selectedCategories: string[], impCount: number, hint: boolean, catHint?: boolean) => {
    if (selectedCategories.length === 0) return;
    
    // Save current settings before starting the game
    const currentSettings: SavedSettings = {
      players: [...players],
      selectedCategories: [...selectedCategories],
      imposterCount: impCount,
      imposterHint: hint,
      categoryHint: catHint || categoryHint,
      l7ajEnabled,
      hideL7aj,
      trapEnabled
    };
    setSavedSettings(currentSettings);
    
    // Randomize secret word (and category/hint) from the selected categories and capture return
    const randomResult = randomizeSecretWord(selectedCategories) as { category: string | null; wordObj: Word | null } | void;
    
    // Check if trap should be activated (rare occurrence - 10% chance when trap is enabled)
    const shouldActivateTrap = trapEnabled && Math.random() < 0.05;
    setTrapActivated(shouldActivateTrap);
    
    // Use the imposter count directly (no random logic), but if trap is activated, make all players imposters
    const resolvedImpCount = shouldActivateTrap ? playerCount : impCount;
    
    // Generate random imposter indices
    let randomImposters: number[] = [];
    if (resolvedImpCount > 0) {
      const availableIndices = Array.from({ length: playerCount }, (_, i) => i);
      for (let i = 0; i < resolvedImpCount; i++) {
        if (availableIndices.length === 0) break;
        const randomIndex = Math.floor(Math.random() * availableIndices.length);
        const selectedIndex = availableIndices.splice(randomIndex, 1)[0];
        randomImposters.push(selectedIndex);
      }
    }
    
    let randomL7aj = -1;
    let chosenL7ajWord = '';
    
    // L7aj logic (only if trap is not activated and l7aj is enabled)
    if (l7ajEnabled && !shouldActivateTrap) {
      // pick a different player index for l7aj that's not an imposter
      const availableForL7aj = Array.from({ length: playerCount }, (_, i) => i)
        .filter(i => !randomImposters.includes(i));
      
      if (availableForL7aj.length > 0) {
        randomL7aj = availableForL7aj[Math.floor(Math.random() * availableForL7aj.length)];
      }

      // pick the l7aj word from same category but different from secret word
      const chosenCategory = randomResult?.category || category;
      if (chosenCategory) {
        const wordPool = categories[chosenCategory as Category] as Word[];
        if (wordPool && wordPool.length > 0) {
          // Create array of all words in this category except the secret word
          const availableWords = wordPool.filter(wordObj => {
            const secret = randomResult?.wordObj?.word || secretWord;
            return wordObj.word !== secret;
          });
          
          if (availableWords.length > 0) {
            // Pick a random word from available options
            const randomWordObj = availableWords[Math.floor(Math.random() * availableWords.length)];
            chosenL7ajWord = randomWordObj.word;
          } else {
            // Fallback: if somehow no other words available, pick any word
            const randomWordObj = wordPool[Math.floor(Math.random() * wordPool.length)];
            chosenL7ajWord = randomWordObj.word;
          }
        }
      }
    }
    const randomFirstPlayer = Math.floor(Math.random() * playerCount);
    setPlayerCount(playerCount);
    setSelectedCategories(selectedCategories);
    setImposterIndices(randomImposters);
    setL7ajIndex(randomL7aj);
    setL7ajWord(chosenL7ajWord);
    setFirstPlayerIndex(randomFirstPlayer);
    setCurrentPlayerIndex(0);
    // persist the chosen imposterCount for this round
    setImposterCount(resolvedImpCount);
    setImposterHint(hint);
    if (catHint !== undefined) {
      setCategoryHint(catHint);
    }
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

  const saveCurrentSettings = () => {
    const currentSettings: SavedSettings = {
      players: [...players],
      selectedCategories: [...selectedCategories],
      imposterCount,
      imposterHint,
      categoryHint,
      l7ajEnabled,
      hideL7aj,
      trapEnabled
    };
    setSavedSettings(currentSettings);
  };

  const restoreToSavedSettings = () => {
    if (savedSettings) {
      setPlayers(savedSettings.players);
      setSelectedCategories(savedSettings.selectedCategories);
      setImposterCount(savedSettings.imposterCount);
      setImposterHint(savedSettings.imposterHint);
      setCategoryHint(savedSettings.categoryHint);
      setL7ajEnabled(savedSettings.l7ajEnabled);
      setHideL7aj(savedSettings.hideL7aj);
      setTrapEnabled(savedSettings.trapEnabled);
      setPlayerCount(savedSettings.players.length);
    }
  };

  const restartGame = () => {
    // Restore saved settings if available
    if (savedSettings) {
      setPlayers(savedSettings.players);
      setSelectedCategories(savedSettings.selectedCategories);
      setImposterCount(savedSettings.imposterCount);
      setImposterHint(savedSettings.imposterHint);
      setCategoryHint(savedSettings.categoryHint);
      setL7ajEnabled(savedSettings.l7ajEnabled);
      setHideL7aj(savedSettings.hideL7aj);
      setTrapEnabled(savedSettings.trapEnabled);
      setPlayerCount(savedSettings.players.length);
    }
    
    // Reset game state
    setGameState('setup');
    setCategory(null);
    setSecretWord('');
    setHint('');
    setImposterIndices([]);
    setCurrentPlayerIndex(0);
    setTrapActivated(false);
    setL7ajIndex(-1);
    setL7ajWord('');
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
      localStorage.setItem('l3ba_categoryHint', JSON.stringify(categoryHint));
      console.log('Saved category hint to localStorage:', categoryHint);
    } catch (e) {
      console.error('Failed to save category hint to localStorage:', e);
    }
  }, [categoryHint]);

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

  useEffect(() => {
    try {
      localStorage.setItem('l3ba_trapEnabled', JSON.stringify(trapEnabled));
      console.log('Saved trapEnabled to localStorage:', trapEnabled);
    } catch (e) {
      console.error('Failed to save trapEnabled to localStorage:', e);
    }
  }, [trapEnabled]);

  const value = {
    gameState,
    setGameState,
    playerCount,
    players,
    selectedCategories,
    category,
    secretWord,
    hint,
    imposterIndices,
    currentPlayerIndex,
    firstPlayerIndex,
    imposterCount,
  setImposterCount,
    imposterHint,
  setImposterHint,
  categoryHint,
  setCategoryHint,
  l7ajEnabled,
  setL7ajEnabled,
  hideL7aj,
  setHideL7aj,
  l7ajIndex,
  l7ajWord,
  trapEnabled,
  setTrapEnabled,
  trapActivated,
  randomizeSecretWord,
    setupGame,
    nextPlayer,
    restartGame,
    updatePlayers,
    updateSelectedCategories,
    saveCurrentSettings,
    restoreToSavedSettings,
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
