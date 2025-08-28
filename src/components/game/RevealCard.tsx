"use client";

import { useState, useRef } from "react";
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
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const HOLD_DURATION = 2000; // 2 seconds

  const isImposter = currentPlayerIndex === imposterIndex;
  const currentPlayerName = players[currentPlayerIndex] || `اللاعب ${currentPlayerIndex + 1}`;
  const isLastPlayer = currentPlayerIndex === playerCount - 1;

  const handleReveal = () => setRevealed(true);
  const handleNext = () => {
    setRevealed(false);
    nextPlayer();
  };

  const handleMouseDown = () => {
    setIsHolding(true);
    setHoldProgress(0);
    holdIntervalRef.current = setInterval(() => {
      setHoldProgress(prev => {
        if (prev >= 1) {
          clearInterval(holdIntervalRef.current!);
          handleReveal();
          setIsHolding(false);
          return 1;
        }
        return prev + 0.05;
      });
    }, HOLD_DURATION / 40);
  };

  const handleMouseUp = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    setIsHolding(false);
    setHoldProgress(0);
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
                <p className="text-muted-foreground text-lg">اضغط مطولاً للكشف عن الدور</p>
                <Button
                  size="lg"
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleMouseDown}
                  onTouchEnd={handleMouseUp}
                  className="rounded-full px-10 text-lg relative overflow-hidden"
                >
                  <span className="relative z-10">إفصاح</span>

                  {/* Liquid fill overlay - sits under the label (z-0) and animates height + waviness */}
                  {(isHolding || holdProgress > 0) && (
                    <motion.div
                      className="absolute inset-0 rounded-full overflow-hidden z-0 pointer-events-none"
                      initial={false}
                      animate={{}}
                    >
                      {/* fill body */}
                      <motion.div
                        className="absolute left-0 right-0 bottom-0 bg-primary"
                        style={{ height: `${holdProgress * 100}%`, transformOrigin: 'bottom' }}
                        animate={{ height: `${holdProgress * 100}%` }}
                        transition={{ ease: 'linear' }}
                      >
                        {/* wave at the top of the fill to make it look liquid */}
                        <motion.svg
                          viewBox="0 0 600 100"
                          preserveAspectRatio="none"
                          className="w-full block"
                          style={{ display: 'block' }}
                          animate={
                            isHolding
                              ? { x: [0, -12, 8, -6, 0] }
                              : { x: 0 }
                          }
                          transition={{ repeat: isHolding ? Infinity : 0, duration: 0.9, ease: 'easeInOut' }}
                        >
                          <path d="M0,30 C150,80 350,0 600,30 L600,100 L0,100 Z" fill="rgba(255,255,255,0.18)" />
                          <path d="M0,40 C150,90 350,10 600,40 L600,100 L0,100 Z" fill="rgba(255,255,255,0.12)" />
                        </motion.svg>
                      </motion.div>
                    </motion.div>
                  )}
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