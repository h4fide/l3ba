"use client";

import { useState } from 'react';
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Confetti } from '@/components/ui/Confetti';

export default function EndScreen() {
  const { secretWord, imposterIndex, restartGame } = useGame();
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState<'pending' | 'win' | 'loss'>('pending');

  const handleGuess = () => {
    if (guess.trim().toLowerCase() === secretWord.toLowerCase()) {
      setResult('win');
    } else {
      setResult('loss');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {result === 'win' && <Confetti />}
      <div className="mb-6">
        <h2 className="text-xl">الكلمة السرية كانت:</h2>
        <p className="text-4xl font-bold text-primary">{secretWord}</p>
        <p className="text-xl mt-4">الـImposter هو:</p>
        <p className="text-3xl font-bold text-destructive">اللاعب {imposterIndex + 1}</p>
      </div>

      {result === 'pending' && (
        <div className="w-full space-y-4 my-6 p-4 border rounded-lg">
          <h3 className="font-bold">تخمين الـImposter</h3>
          <p className="text-sm text-muted-foreground">
            عند الـImposter فرصة أخيرة باش يربح. خاصو يخمن الكلمة السرية.
          </p>
          <div className="flex gap-2">
            <Input 
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="ادخل تخمينك هنا..."
              className="text-center"
            />
            <Button onClick={handleGuess}>تأكيد</Button>
          </div>
        </div>
      )}

      {result === 'win' && (
        <div className="my-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 rounded-lg w-full">
          <h3 className="text-2xl font-bold text-green-700 dark:text-green-300">الـImposter ربح!</h3>
          <p>قدر يخمن الكلمة الصحيحة!</p>
        </div>
      )}

      {result === 'loss' && (
        <div className="my-6 p-4 bg-red-100 dark:bg-red-900 border border-red-400 rounded-lg w-full">
          <h3 className="text-2xl font-bold text-red-700 dark:text-red-300">الفريق ربح!</h3>
          <p>الـImposter ماقدرش يخمن الكلمة.</p>
        </div>
      )}

      <Button onClick={restartGame} className="w-full text-lg py-6 mt-4" size="lg">
        لعبة جديدة
      </Button>
    </div>
  );
}
