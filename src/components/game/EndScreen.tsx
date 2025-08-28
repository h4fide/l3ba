"use client";

import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/Confetti";
import { Trophy, ShieldAlert } from "lucide-react";

export default function EndScreen() {
  const { secretWord, imposterIndex, restartGame } = useGame();

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Confetti />
      <div className="mb-8">
        <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Game Over!</h2>
        <p className="text-muted-foreground">The results are in!</p>
      </div>

      <div className="space-y-6 w-full text-center">
        <div className="p-4 bg-secondary rounded-lg">
          <p className="text-lg text-muted-foreground">The secret word was</p>
          <p className="text-4xl font-bold text-primary">{secretWord}</p>
        </div>
        <div className="p-4 bg-secondary rounded-lg">
            <p className="text-lg text-muted-foreground">The Imposter was</p>
            <div className="flex items-center justify-center gap-2">
                <ShieldAlert className="w-8 h-8 text-destructive"/>
                <p className="text-3xl font-bold text-destructive">Player {imposterIndex + 1}</p>
            </div>
        </div>
      </div>
      
      <Button onClick={restartGame} className="w-full text-lg py-6 mt-12" size="lg">
        Play Another Round
      </Button>
    </div>
  );
}
