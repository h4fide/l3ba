"use client";

import { useState } from 'react';
import { GameProvider, useGame } from '@/context/GameContext';
import Setup from '@/components/game/Setup';
import DiscussionScreen from '@/components/game/DiscussionScreen';
import EndScreen from '@/components/game/EndScreen';
import StrategyModal from '@/components/ui/StrategyModal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import RoleRevealContainer from '@/components/game/RevealCard';

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
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center p-4">
      {gameState === 'setup' && (
        <header className="w-full text-center my-8">
          <h1 className="text-6xl md:text-7xl font-bold text-primary font-headline tracking-tighter">
            L3ba
          </h1>
          {/* <p className="text-muted-foreground mt-2 text-lg">لعبة  </p> */}
        </header>
      )}
      
      <Card className="w-full shadow-2xl border-primary/20 border-2 bg-card/80 backdrop-blur-lg">
        <CardContent className="p-6 min-h-[28rem] flex items-center justify-center">
            <AnimatePresence mode="wait">
                 <motion.div
                    key={gameState}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full"
                >
                    {renderGameState()}
                </motion.div>
            </AnimatePresence>
        </CardContent>
      </Card>

      {gameState === 'setup' && (
        <Button variant="link" onClick={() => setStrategyModalOpen(true)} className="mt-8 text-lg">
          كيف تلعب؟
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
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 -z-10"></div>
        <GameView />
      </main>
    </GameProvider>
  );
}
