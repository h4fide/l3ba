"use client";

import { useState } from 'react';
import { GameProvider, useGame } from '@/context/GameContext';
import Setup from '@/components/game/Setup';
import RoleRevealContainer from '@/components/game/RoleRevealContainer';
import DiscussionScreen from '@/components/game/DiscussionScreen';
import EndScreen from '@/components/game/EndScreen';
import StrategyModal from '@/components/ui/StrategyModal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

function GameView() {
  const { gameState } = useGame();
  const [isStrategyModalOpen, setStrategyModalOpen] = useState(false);

  const renderGameState = () => {
    switch (gameState) {
      case 'setup':
        return <Setup />;
      case 'roleReveal':
        return <RoleRevealContainer />;
      case 'discussion':
        return <DiscussionScreen />;
      case 'end':
        return <EndScreen />;
      default:
        return <Setup />;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center p-2 sm:p-4">
      <header className="w-full text-center my-6">
        <h1 className="text-5xl md:text-6xl font-bold text-primary font-headline">كلمة خداع</h1>
      </header>
      
      <Card className="w-full shadow-2xl bg-card">
        <CardContent className="p-4 sm:p-6 min-h-[24rem] flex items-center justify-center">
            <AnimatePresence mode="wait">
                 <motion.div
                    key={gameState}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    {renderGameState()}
                </motion.div>
            </AnimatePresence>
        </CardContent>
      </Card>

      {gameState === 'setup' && (
        <Button variant="link" onClick={() => setStrategyModalOpen(true)} className="mt-4 text-lg">
          نصائح اللعبة
        </Button>
      )}

      <StrategyModal isOpen={isStrategyModalOpen} onClose={() => setStrategyModalOpen(false)} />
    </div>
  );
}

export default function Home() {
  return (
    <GameProvider>
      <main className="flex items-center justify-center min-h-screen bg-background font-body">
        <GameView />
      </main>
    </GameProvider>
  );
}
