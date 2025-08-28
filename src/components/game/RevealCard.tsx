"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Eye, VenetianMask } from "lucide-react";

interface RevealCardProps {
    onRevealed: () => void;
}

export default function RevealCard({ onRevealed }: RevealCardProps) {
  const { secretWord, category, imposterIndex, currentPlayerIndex } = useGame();
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);
  const isImposter = currentPlayerIndex === imposterIndex;

  const handleReveal = (state: boolean) => {
    setIsRevealed(state);
    if (state) {
      setHasBeenRevealed(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center h-[24rem]">
      <div className="flex-grow flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isRevealed ? (
            <motion.div
              key="role"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, position: 'absolute' }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              {isImposter ? (
                <>
                  <VenetianMask className="w-20 h-20 text-destructive mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-destructive">You are the Imposter!</h3>
                  <p className="text-xl mt-2 text-muted-foreground">The category is: <span className="font-bold text-foreground">{category}</span></p>
                </>
              ) : (
                <>
                  <h3 className="text-xl text-muted-foreground">The secret word is:</h3>
                  <p className="text-5xl font-bold text-primary mt-2">{secretWord}</p>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, position: 'absolute' }}
                transition={{ duration: 0.2 }}
            >
                <p className="text-2xl text-muted-foreground">
                    {hasBeenRevealed ? "Look again" : "Are you ready?"}
                </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 w-full">
        <Button
          className="w-full h-24 text-2xl"
          onMouseDown={() => handleReveal(true)}
          onMouseUp={() => handleReveal(false)}
          onTouchStart={() => handleReveal(true)}
          onTouchEnd={() => handleReveal(false)}
          size="lg"
        >
          <Eye className="mr-2" />
          Press to Reveal
        </Button>

        {hasBeenRevealed && (
          <Button onClick={onRevealed} className="w-full" variant="secondary">
            Next Player
          </Button>
        )}
      </div>
    </div>
  );
}
