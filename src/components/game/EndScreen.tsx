"use client";

import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/Confetti";
import { Trophy, ShieldAlert, Sparkles, RotateCcw, Crown } from "lucide-react";

export default function EndScreen() {
  const { secretWord, imposterIndex, restartGame, players } = useGame();

  return (
    <div className="w-full max-w-md mx-auto space-y-4 p-4 min-h-screen flex flex-col justify-center">
      <Confetti />
      
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="relative mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-yellow-400/10 flex items-center justify-center mb-4">
          </div>
          <Sparkles className="w-5 h-5 text-yellow-300 absolute top-0 right-1/2 translate-x-8 animate-pulse" />
          <Sparkles className="w-4 h-4 text-yellow-200 absolute bottom-2 left-1/2 -translate-x-8 animate-bounce" style={{ animationDelay: '1s' }} />
        </div>
        <h2 className="text-3xl font-bold mb-2">انتهت اللعبة!</h2>
        <p className="text-muted-foreground text-sm">تم كشف الأوراق!</p>
      </div>

      {/* Secret Word Card */}
      <div className="rounded-2xl border bg-card p-5 hover:bg-accent/5 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Crown className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="font-semibold text-base">الكلمة السرية</span>
              <p className="text-sm text-muted-foreground">الكلمة الصحيحة كانت</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary bg-primary/5 rounded-xl py-4 px-6">
            {secretWord}
          </div>
        </div>
      </div>
      
      {/* Imposter Card */}
      <div className="rounded-2xl border bg-card p-5 hover:bg-accent/5 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <span className="font-semibold text-base">الـImposter</span>
              <p className="text-sm text-muted-foreground">اللاعب الذي كان يخدع الجميع</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-destructive bg-destructive/5 rounded-xl py-4 px-6 flex items-center justify-center gap-2">
            <ShieldAlert className="w-6 h-6" />
            {players[imposterIndex]}
          </div>
          <p className="text-sm text-muted-foreground mt-2 opacity-70">
            كان يحاول خداعكم! 🕵️
          </p>
        </div>
      </div>

      {/* Game Summary Card */}
      <div className="rounded-2xl border bg-muted/30 p-4">
        <h3 className="font-semibold mb-3 text-center">نتائج اللعبة</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary">{players.length}</div>
            <div className="text-xs text-muted-foreground">إجمالي اللاعبين</div>
          </div>
          <div>
            <div className="text-lg font-bold text-destructive">1</div>
            <div className="text-xs text-muted-foreground">إمبوستر مكشوف</div>
          </div>
        </div>
      </div>
      
      {/* Restart Button */}
      <div className="pt-2">
        <Button 
          onClick={restartGame} 
          className="w-full text-xl py-8 rounded-2xl font-bold"
          size="lg"
        >
          <RotateCcw className="w-6 h-6 ml-2" />
          لعب جولة جديدة
        </Button>
      </div>

      {/* Decorative Elements - Subtle */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 right-12 w-1 h-1 bg-yellow-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-8 w-1.5 h-1.5 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: '3s' }} />
      </div>
    </div>
  );
}