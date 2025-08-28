"use client";

import { useState } from "react";
import { useGame } from "@/context/GameContext";
import RevealCard from "./RevealCard";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function RoleRevealContainer() {
  const { currentPlayerIndex, nextPlayer, playerCount } = useGame();
  const [viewState, setViewState] = useState<'pass' | 'reveal'>('pass');

  const handleNext = () => {
      setViewState('pass');
      nextPlayer();
  };

  if (viewState === 'pass') {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full">
        <Users className="w-20 h-20 text-primary mb-6" />
        <h2 className="text-2xl font-bold">Pass the device to</h2>
        <p className="text-5xl font-bold text-primary my-4">Player {currentPlayerIndex + 1}</p>
        <p className="text-muted-foreground">({currentPlayerIndex + 1} of {playerCount})</p>
        <Button onClick={() => setViewState('reveal')} className="w-full text-lg py-6 mt-8" size="lg">
          I'm Ready
        </Button>
      </div>
    );
  }

  return <RevealCard onRevealed={handleNext} />;
}
