"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col items-center justify-center text-center h-64">
      <AnimatePresence>
        {isRevealed ? (
          <motion.div
            key="role"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            {isImposter ? (
              <>
                <h3 className="text-3xl font-bold text-destructive">نتا الـImposter!</h3>
                <p className="text-xl mt-2">الفئة هي: <span className="font-bold">{category}</span></p>
              </>
            ) : (
              <>
                <h3 className="text-xl">الكلمة السرية هي:</h3>
                <p className="text-4xl font-bold text-primary mt-2">{secretWord}</p>
              </>
            )}
          </motion.div>
        ) : (
          <p className="text-2xl text-muted-foreground">
            {hasBeenRevealed ? "شوف مرة أخرى" : "مستعد؟"}
          </p>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-col items-center gap-4 w-full">
        <Button
          className="w-full h-20 text-2xl bg-primary hover:bg-primary/90 active:bg-primary/80"
          onMouseDown={() => handleReveal(true)}
          onMouseUp={() => handleReveal(false)}
          onTouchStart={() => handleReveal(true)}
          onTouchEnd={() => handleReveal(false)}
        >
          شد باش تشوف
        </Button>

        {hasBeenRevealed && (
          <Button onClick={onRevealed} className="w-full" variant="secondary">
            التالي
          </Button>
        )}
      </div>
    </div>
  );
}
