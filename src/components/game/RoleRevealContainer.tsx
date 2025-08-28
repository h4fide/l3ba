"use client";

import { useState } from "react";
import { useGame } from "@/context/GameContext";
import RevealCard from "./RevealCard";
import { Button } from "@/components/ui/button";

export default function RoleRevealContainer() {
  const { currentPlayerIndex, nextPlayer } = useGame();
  const [viewState, setViewState] = useState<'pass' | 'reveal'>('pass');

  const handleNext = () => {
    setViewState('pass');
    nextPlayer();
  };

  if (viewState === 'pass') {
    return (
      <div className="flex flex-col items-center justify-center text-center h-64">
        <h2 className="text-2xl font-bold">مرر الجهاز لـ</h2>
        <p className="text-4xl font-bold text-primary my-4">اللاعب {currentPlayerIndex + 1}</p>
        <Button onClick={() => setViewState('reveal')} className="w-full text-lg py-6" size="lg">
          أنا هو اللاعب
        </Button>
      </div>
    );
  }

  return <RevealCard onRevealed={handleNext} />;
}
