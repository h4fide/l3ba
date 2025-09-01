"use client";

import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/Confetti";
import { ShieldAlert, RotateCcw, Crown, Zap } from "lucide-react";

export default function EndScreen() {
  const { secretWord, imposterIndices, imposterCount, restartGame, players, l7ajEnabled, l7ajIndex, l7ajWord, hideL7aj, trapActivated, restoreToSavedSettings } = useGame();

  return (
    <div className="w-full max-w-md mx-auto space-y-4 p-4 min-h-screen flex flex-col justify-center">
      <Confetti />

      {/* Header Section */}
      <div className="text-center mb-8">
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

      {/* Trap Alert Card - Show if trap was activated */}
      {trapActivated && (
        <div className="rounded-2xl border border-orange-500/60 bg-gradient-to-br from-orange-500/20 via-orange-600/15 to-red-500/25 p-5 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <span className="font-semibold text-base text-orange-700">لمصيدة مفعلة!</span>
                <p className="text-sm text-orange-600">كان جميع اللاعبين إمبوسترز هذه الجولة</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-700 bg-orange-500/10 rounded-xl py-3 px-4 flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              <span>مصيدة نادرة - الجميع كانوا إمبوسترز!</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Imposter Card */}
      <div className="rounded-2xl border bg-card p-5 hover:bg-accent/5 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="font-semibold text-base">الامبوسـتـر</span>
              <p className="text-sm text-muted-foreground">اللاعب الذي كان يخدع الجميع</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary bg-destructive/10 rounded-xl py-4 px-6 flex flex-col items-center justify-center gap-2">
            {imposterCount === 0 ? (
              <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6" />
                  <span>لا يوجد إمبوستر هذه الجولة</span>
                </div>
              </div>
            ) : trapActivated ? (
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 text-orange-700">
                  <Zap className="w-6 h-6" />
                  <span>جميع اللاعبين كانوا إمبوسترز!</span>
                </div>
                <div className="text-sm text-orange-600">المصيدة نشطة</div>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-6 h-6" />
                    <span>
                      {imposterIndices.length > 0 ? (
                        imposterIndices.length === 1 ? (
                          players[imposterIndices[0]] || '—'
                        ) : (
                          `${imposterIndices.length} إمبوسترز`
                        )
                      ) : '—'}
                    </span>
                  </div>
                  {imposterIndices.length > 1 && (
                    <div className="text-sm text-muted-foreground">
                      {imposterIndices.map((index, i) => (
                        <span key={index}>
                          {players[index] || `اللاعب ${index + 1}`}
                          {i < imposterIndices.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* L7aj (Mr. White) Card - reveal at end if enabled */}
      {l7ajEnabled && (
        <div className="rounded-2xl border bg-card p-5 hover:bg-accent/5 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Crown className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="font-semibold text-base">لحاج (Mr. White)</span>
                <p className="text-sm text-muted-foreground">دور اللحاج في الجولة</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary bg-primary/5 rounded-xl py-4 px-6 flex flex-col items-center gap-2">
              <div>{l7ajIndex >= 0 && l7ajIndex < players.length ? players[l7ajIndex] : '—'}</div>
              <div className="text-sm text-muted-foreground">كلمة اللحاج: {l7ajWord || '—'}</div>
              {hideL7aj && <div className="text-xs text-amber-600">تم إخفاء دور اللحاج أثناء اللعب</div>}
            </div>
          </div>
        </div>
      )}

      {/* Game Summary Card */}
      <div className="rounded-2xl border bg-muted/30 p-4">
        <h3 className="font-semibold mb-3 text-center">نتائج اللعبة</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary">{players.length}</div>
            <div className="text-xs text-muted-foreground">إجمالي اللاعبين</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">
              {trapActivated ? players.length : (typeof imposterCount === 'number' ? imposterCount : '—')}
            </div>
            <div className="text-xs text-muted-foreground">إمبوستر</div>
          </div>
        </div>
        {trapActivated && (
          <div className="mt-3 text-center">
            <div className="text-xs text-orange-600 bg-orange-500/10 rounded-lg py-1 px-2">
              مصيدة نادرة - 5% فرصة
            </div>
          </div>
        )}
      </div>
      
      {/* Restart Button */}
      <div className="pt-2">
        <Button 
          onClick={() => {
            restoreToSavedSettings();
            restartGame();
          }} 
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