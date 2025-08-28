"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { VenetianMask, ChevronFirst, Lightbulb } from "lucide-react";

// Rebuilt simple reveal flow: click to reveal word/role, then go to next player or discussion.
export default function RevealCard() {
  const {
    secretWord,
    hint,
    imposterIndex,
    currentPlayerIndex,
    playerCount,
    players,
    nextPlayer,
  } = useGame();

  const [revealed, setRevealed] = useState(false);

  const isImposter = currentPlayerIndex === imposterIndex;
  const currentPlayerName = players[currentPlayerIndex] || `اللاعب ${currentPlayerIndex + 1}`;
  const isLastPlayer = currentPlayerIndex === playerCount - 1;

  const handleReveal = () => setRevealed(true);
  const handleNext = () => {
    setRevealed(false);
    nextPlayer();
  };

  return (
    <div className="flex flex-col items-center text-center space-y-8 w-full">
      <div className="w-full">
        <motion.div
          key={currentPlayerIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-card border rounded-2xl p-8 shadow-xl min-h-64 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-primary-foreground">{currentPlayerName}</h2>
          <AnimatePresence mode="wait">
            {!revealed && (
              <motion.div
                key="concealed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center gap-4"
              >
                <p className="text-muted-foreground text-lg">اضغط للكشف عن الدور</p>
                <Button size="lg" onClick={handleReveal} className="rounded-full px-10 text-lg">
                   افصاح
                </Button>
              </motion.div>
            )}
            {revealed && (
              <motion.div
                key="revealed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center gap-4"
              >
                {isImposter ? (
                  <div className="flex flex-col items-center gap-3">
                    {/* <VenetianMask className="w-16 h-16 text-destructive" /> */}
                    <h3 className="text-5xl font-bold text-primary tracking-tight">Imposter</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lightbulb className="w-4 h-4" />
                      <span>تلميح: <span className="font-bold text-foreground">{hint}</span></span>
                    </div>
                  </div>
                ) : (
                  <p className="text-5xl font-bold text-primary tracking-tight">{secretWord}</p>
                )}
                <Button variant="secondary" size="lg" onClick={handleNext} className="mt-2 rounded-full px-10 text-lg">
                  {isLastPlayer ? 'ابدأ النقاش' : 'اللاعب التالي'}
                  <ChevronFirst className="ml-2" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="text-sm text-muted-foreground">
        اللاعب {currentPlayerIndex + 1} من {playerCount}
      </div>
    </div>
  );
}