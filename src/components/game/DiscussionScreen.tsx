"use client";

import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";

export default function DiscussionScreen() {
  const { firstPlayerIndex, setGameState, restartGame } = useGame();

  return (
    <div className="flex flex-col items-center justify-center text-center h-64">
      <h2 className="text-3xl font-bold">اللعبة بدات!</h2>
      <p className="text-2xl my-4">
        <span className="font-bold text-primary">اللاعب {firstPlayerIndex + 1}</span> غادي يبدا النقاش.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4 w-full">
        <Button onClick={() => setGameState('end')} className="w-full text-lg py-6" size="lg">
          شوف الـImposter والكلمة
        </Button>
        <Button onClick={restartGame} variant="outline" className="w-full">
          لعبة جديدة
        </Button>
      </div>
    </div>
  );
}
