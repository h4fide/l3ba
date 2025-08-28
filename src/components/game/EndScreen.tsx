"use client";

import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/Confetti";
import { Trophy, ShieldAlert, Sparkles } from "lucide-react";

export default function EndScreen() {
  const { secretWord, imposterIndex, restartGame, players } = useGame();

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen p-6 bg-gradient-to-br from-background via-background to-secondary/20">
      
      {/* Header Section with Trophy */}
      <div className="mb-8 animate-in fade-in-0 zoom-in-95 duration-700 relative overflow-hidden">
        <Confetti />
        <div className="relative">
          <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-4 drop-shadow-lg animate-pulse" />
          <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-2 -right-2 animate-spin" style={{ animationDuration: '3s' }} />
          <Sparkles className="w-4 h-4 text-yellow-200 absolute -bottom-1 -left-3 animate-bounce" style={{ animationDelay: '1s' }} />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-red-500 to-orange-500 bg-clip-text text-transparent mb-2">
          انتهت اللعبة!
        </h2>
        <p className="text-muted-foreground text-lg">تم كشف الأوراق!</p>
      </div>

      {/* Results Section */}
      <div className="space-y-6 w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
        
        {/* Secret Word Card */}
        <div className="group p-6 bg-gradient-to-r from-secondary to-secondary/80 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
          <div className="mb-3">
            <p className="text-lg text-muted-foreground">الكلمة السرية كانت</p>
          </div>
          <div className="relative">
            <p className="text-4xl font-bold text-primary group-hover:scale-105 transition-transform duration-300">
              {secretWord}
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-red-500/10 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        
        {/* Imposter Card */}
        <div className="group p-6 bg-gradient-to-r from-destructive/5 to-red-500/5 rounded-xl border border-destructive/20 hover:border-destructive/40 transition-all duration-300 hover:shadow-lg hover:shadow-destructive/10">
          <div className="mb-3">
            <p className="text-lg text-muted-foreground">الـImposter هو</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <ShieldAlert className="w-8 h-8 text-destructive group-hover:animate-pulse" />
            <p className="text-3xl font-bold text-destructive group-hover:scale-105 transition-transform duration-300">
              {players[imposterIndex]}
            </p>
          </div>
          <div className="mt-2 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            كان يحاول خداعكم! 🕵️
          </div>
        </div>
      </div>
      
      {/* Restart Button */}
      <div className="mt-12 w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-500">
        <Button 
          onClick={restartGame} 
          className="w-full text-lg py-6 bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-600/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" 
          size="lg"
        >
          <span className="flex items-center gap-2">
            لعب جولة جديدة
            <Trophy className="w-5 h-5" />
          </span>
        </Button>
      </div>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 right-12 w-1 h-1 bg-red-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-8 w-1.5 h-1.5 bg-orange-400/30 rounded-full animate-bounce" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/4 left-6 w-1 h-1 bg-yellow-400/40 rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
    </div>
  );
}