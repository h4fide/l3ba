"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import HoldRevealButton from "@/components/ui/hold-reveal-button";
import { VenetianMask, ChevronFirst, Lightbulb, Flame } from "lucide-react";

// Animated version of the Chevron icon for the next / start discussion button
const MotionChevronFirst = motion(ChevronFirst);

// Rebuilt simple reveal flow: click to reveal word/role, then go to next player or discussion.
export default function RevealCard() {
  const {
    secretWord,
    hint,
    category,
    imposterIndex,
    imposterCount,
    l7ajIndex,
    l7ajWord,
    imposterHint,
    categoryHint,
    currentPlayerIndex,
    playerCount,
    players,
    nextPlayer,
    hideL7aj,
    trapActivated,
  } = useGame();

  const [revealed, setRevealed] = useState(false);
  // moved hold-to-reveal logic into reusable HoldRevealButton component

  // if imposterCount is 0 then there are no imposters this round
  // if trap is activated, everyone is an imposter
  const isImposter = trapActivated || (imposterCount && imposterCount > 0 ? currentPlayerIndex === imposterIndex : false);
  const isL7aj = !trapActivated && currentPlayerIndex === l7ajIndex;
  const currentPlayerName = players[currentPlayerIndex] || `اللاعب ${currentPlayerIndex + 1}`;
  const isLastPlayer = currentPlayerIndex === playerCount - 1;

  const handleReveal = () => setRevealed(true);
  const handleNext = () => {
    setRevealed(false);
  // progress / intervals handled inside HoldRevealButton now
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
                <HoldRevealButton
                  size="lg"
                  variant="default"
                  onComplete={handleReveal}
                  gradient="linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)"
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 border-2 border-slate-300"
                >
                  إفصاح
                </HoldRevealButton>
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
                    <h3 className="text-5xl font-bold text-primary tracking-tight">
                      {trapActivated ? "لمصيدة! Imposter" : "Imposter"}
                    </h3>
                    {(imposterHint || categoryHint) && (
                      <div className="space-y-2">
                        {imposterHint && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Lightbulb className="w-4 h-4" />
                            <span>تلميح: <span className="font-bold text-foreground">{hint}</span></span>
                          </div>
                        )}
                        {categoryHint && category && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Flame className="w-4 h-4" />
                            <span>فئة: <span className="font-bold text-foreground">{category}</span></span>
                          </div>
                        )}
                      </div>
                    )}
                    {!imposterHint && trapActivated && (
                      <div className="text-sm text-muted-foreground">
                        <span className="text-orange-600 font-medium">الجميع إمبوسترز!</span>
                      </div>
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
                <Button variant="secondary" size="lg" onClick={handleNext} className="mt-5 rounded-full px-16 text-lg shadow-none">
                  {isLastPlayer ? 'ابدأ النقاش' : 'اللاعب التالي'}
                  <MotionChevronFirst
                    className="ml-2 w-5 h-5"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden="true"
                  />
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
