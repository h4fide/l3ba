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
    imposterCount,
    l7ajIndex,
    l7ajWord,
    imposterHint,
    currentPlayerIndex,
    playerCount,
    players,
    nextPlayer,
    hideL7aj,
  } = useGame();

  const [revealed, setRevealed] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const HOLD_DURATION = 1500; // 1.5 seconds

  // if imposterCount is 0 then there are no imposters this round
  const isImposter = imposterCount && imposterCount > 0 ? currentPlayerIndex === imposterIndex : false;
  const isL7aj = currentPlayerIndex === l7ajIndex;
  const currentPlayerName = players[currentPlayerIndex] || `اللاعب ${currentPlayerIndex + 1}`;
  const isLastPlayer = currentPlayerIndex === playerCount - 1;

  const handleReveal = () => setRevealed(true);
  const handleNext = () => {
    setRevealed(false);
    setHoldProgress(0);
    setIsHolding(false);
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
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
          className="bg-card border rounded-2xl p-8 min-h-64 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl font-bold mb-2 text-primary-foreground">{currentPlayerName}</h2>
          <div className="w-full h-1 bg-muted mb-6" />

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
                  className="rounded-full px-10 text-lg relative overflow-hidden bg-slate-200 hover:bg-slate-300 text-slate-800 border-2 border-slate-300 shadow-none select-none"
                  style={{ 
                    minHeight: '60px', 
                    minWidth: '200px',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none'
                  }}
                >
                  <span className="relative z-20 font-semibold transition-colors duration-200 select-none"
                    style={{ 
                      color: holdProgress > 0.5 ? 'white' : 'inherit',
                      textShadow: 'none',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none'
                    }}
                  >
                    إفصاح
                  </span>

                  {/* Liquid fill effect */}
                  {(isHolding || holdProgress > 0) && (
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      {/* Main liquid body */}
                      <motion.div
                        className="absolute left-0 right-0 bottom-0"
                        style={{
                          height: `${Math.max(0, holdProgress * 100)}%`,
                          background: 'linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                          borderRadius: '50px',
                        }}
                        animate={{
                          height: `${Math.max(0, holdProgress * 100)}%`,
                        }}
                        transition={{ 
                          duration: 0.1, 
                          ease: 'easeOut'
                        }}
                      >
                        {/* Liquid wave surface */}
                        <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden">
                          <motion.svg
                            viewBox="0 0 400 40"
                            className="absolute top-0 left-0 w-full h-full"
                            style={{ 
                              transform: 'translateY(-50%)'
                            }}
                            animate={isHolding ? {
                              x: [0, -50, 0],
                            } : {}}
                            transition={{
                              repeat: isHolding ? Infinity : 0,
                              duration: 2,
                              ease: "easeInOut",
                            }}
                          >
                            <motion.path
                              d="M0,20 Q100,10 200,20 T400,20 L400,40 L0,40 Z"
                              fill="#fca5a5"
                              animate={isHolding ? {
                                d: [
                                  "M0,20 Q100,10 200,20 T400,20 L400,40 L0,40 Z",
                                  "M0,20 Q100,30 200,20 T400,20 L400,40 L0,40 Z",
                                  "M0,20 Q100,10 200,20 T400,20 L400,40 L0,40 Z",
                                ]
                              } : {}}
                              transition={{
                                repeat: isHolding ? Infinity : 0,
                                duration: 1.5,
                                ease: "easeInOut",
                              }}
                            />
                          </motion.svg>
                          
                          {/* Secondary wave for more liquid effect */}
                          <motion.svg
                            viewBox="0 0 400 40"
                            className="absolute top-0 left-0 w-full h-full opacity-60"
                            style={{ 
                              transform: 'translateY(-50%) translateX(25px)'
                            }}
                            animate={isHolding ? {
                              x: [25, -25, 25],
                            } : {}}
                            transition={{
                              repeat: isHolding ? Infinity : 0,
                              duration: 2.5,
                              ease: "easeInOut",
                            }}
                          >
                            <motion.path
                              d="M0,25 Q75,15 150,25 T300,25 T400,25 L400,40 L0,40 Z"
                              fill="#ef4444"
                              animate={isHolding ? {
                                d: [
                                  "M0,25 Q75,15 150,25 T300,25 T400,25 L400,40 L0,40 Z",
                                  "M0,25 Q75,35 150,25 T300,25 T400,25 L400,40 L0,40 Z",
                                  "M0,25 Q75,15 150,25 T300,25 T400,25 L400,40 L0,40 Z",
                                ]
                              } : {}}
                              transition={{
                                repeat: isHolding ? Infinity : 0,
                                duration: 1.8,
                                ease: "easeInOut",
                              }}
                            />
                          </motion.svg>
                        </div>

                        {/* Bubble effects */}
                        {holdProgress > 0.3 && (
                          <>
                            <motion.div
                              className="absolute w-2 h-2 bg-white bg-opacity-40 rounded-full"
                              style={{
                                left: '20%',
                                bottom: `${20 + Math.random() * 40}%`,
                              }}
                              animate={{
                                y: [-10, -30],
                                opacity: [0.6, 0],
                                scale: [0.8, 1.2],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: 0,
                              }}
                            />
                            <motion.div
                              className="absolute w-1.5 h-1.5 bg-white bg-opacity-30 rounded-full"
                              style={{
                                left: '70%',
                                bottom: `${10 + Math.random() * 50}%`,
                              }}
                              animate={{
                                y: [-10, -40],
                                opacity: [0.5, 0],
                                scale: [0.6, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 0.5,
                              }}
                            />
                            <motion.div
                              className="absolute w-1 h-1 bg-white bg-opacity-50 rounded-full"
                              style={{
                                left: '45%',
                                bottom: `${30 + Math.random() * 30}%`,
                              }}
                              animate={{
                                y: [-5, -25],
                                opacity: [0.7, 0],
                              }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: 1,
                              }}
                            />
                          </>
                        )}
                      </motion.div>

                        {/* Progress indicator removed per request */}
                    </div>
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
                    {imposterHint ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Lightbulb className="w-4 h-4" />
                        <span>تلميح: <span className="font-bold text-foreground">{hint}</span></span>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground"></div>
                    )}
                  </div>
                ) : isL7aj ? (
                  <div className="flex flex-col items-center gap-2">
                    {/* If hideL7aj is enabled, don't explicitly tell the player they are L7aj */}
                    {hideL7aj ? (
                      <>
                        <p className="text-5xl font-bold text-primary tracking-tight">{l7ajWord || '—'}</p>
                      </>
                    ) : (
                      <>
                        <h5 className="text-2xl font-bold text-primary"> انت هو لحاج</h5>
                        <div className="w-full h-1 bg-muted mb-2" />
                        <p className="text-3xl font-bold tracking-tight">{l7ajWord || '—'}</p>
                      </>
                    )}
                  </div>
                ) : (
                  <p className="text-5xl font-bold text-primary tracking-tight">{secretWord}</p>
                )}
                <Button variant="secondary" size="lg" onClick={handleNext} className="mt-5 rounded-full px-10 text-lg shadow-none">
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
