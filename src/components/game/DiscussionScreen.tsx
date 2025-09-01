"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function DiscussionScreen() {
  const { setGameState, restartGame, players } = useGame();
  const [startingPlayerIndex, setStartingPlayerIndex] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * players.length);
    setStartingPlayerIndex(randomIndex);
  }, [players.length]);

  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      <Mic className="w-20 h-20 text-primary animate-pulse mb-6" />
      <h2 className="text-4xl font-bold">وقت النقاش!</h2>
      <p className="text-2xl my-4">
        <span className="font-bold text-primary">{players[startingPlayerIndex]}</span> يبدأ.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4 w-full">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full text-lg py-6" size="lg">
              كشف الـImposter والكلمة
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>تأكيد الكشف</AlertDialogTitle>
              <AlertDialogDescription>
                هل أنت متأكد أنك تريد كشف الـ Imposter والكلمة الآن؟ لا يمكنك الرجوع بعد هذا الإجراء.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>إلغاء</AlertDialogCancel>
              <AlertDialogAction onClick={() => setGameState('end')}>تأكيد</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full">
              بدء لعبة جديدة
            </Button>
          </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>إعادة بدء اللعبة</AlertDialogTitle>
                <AlertDialogDescription>
                  سيتم فقدان التقدم الحالي. هل تريد المتابعة وبدء لعبة جديدة؟
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction onClick={restartGame}>نعم، ابدأ</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
