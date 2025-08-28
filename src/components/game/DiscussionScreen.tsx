"use client";

import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

export default function DiscussionScreen() {
  const { firstPlayerIndex, setGameState, restartGame, players } = useGame();

  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      <Mic className="w-20 h-20 text-primary animate-pulse mb-6" />
      <h2 className="text-4xl font-bold">وقت النقاش!</h2>
      <p className="text-2xl my-4">
        <span className="font-bold text-primary">{players[firstPlayerIndex]}</span> يبدأ.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4 w-full">
        <Button onClick={() => setGameState('end')} className="w-full text-lg py-6" size="lg">
          كشف الـImposter والكلمة
        </Button>
        <Button onClick={restartGame} variant="outline" className="w-full">
          بدء لعبة جديدة
        </Button>
      </div>
    </div>
  );
}
