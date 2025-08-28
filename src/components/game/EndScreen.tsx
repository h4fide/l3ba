"use client";

import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";

export default function EndScreen() {
  const { secretWord, imposterIndex, restartGame } = useGame();

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-6">
        <h2 className="text-xl">الكلمة السرية كانت:</h2>
        <p className="text-4xl font-bold text-primary">{secretWord}</p>
        <p className="text-xl mt-4">الـImposter هو:</p>
        <p className="text-3xl font-bold text-destructive">اللاعب {imposterIndex + 1}</p>
      </div>

      <div className="my-6 p-4 bg-blue-100 dark:bg-blue-900 border border-blue-400 rounded-lg w-full">
        <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">انتهت اللعبة!</h3>
        <p>تم كشف الـImposter والفريق ربح!</p>
      </div>

      <Button onClick={restartGame} className="w-full text-lg py-6 mt-4" size="lg">
        لعبة جديدة
      </Button>
    </div>
  );
}
