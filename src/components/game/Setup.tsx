"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Users, MoreHorizontal, Lightbulb, Play, Settings, ChevronRight, AlertCircle, Group, VenetianMask, Drama, UserRoundPlusIcon, UserRoundPlus, EyeOffIcon } from "lucide-react";
import EditPlayersModal from "./EditPlayersModal";
import ChooseCategoriesModal from "./ChooseCategoriesModal";

export default function Setup() {
  const { setupGame, players, updatePlayers, selectedCategories, updateSelectedCategories, imposterHint, setImposterHint, imposterCount, setImposterCount, l7ajEnabled, setL7ajEnabled, hideL7aj, setHideL7aj } = useGame();
  const [isPlayerSheetOpen, setIsPlayerSheetOpen] = useState(false);
  const [isImposterSheetOpen, setIsImposterSheetOpen] = useState(false);
  const [isEditPlayersOpen, setIsEditPlayersOpen] = useState(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);

  // Ensure default selection for imposters is 1 on first load
  useEffect(() => {
    // Initialize to 1 if value is unset or was previously set to random (-1)
    if (imposterCount === undefined || imposterCount === null || imposterCount === -1) {
      setImposterCount(1);
    }
    // only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Open handler for the imposter sheet: ensure default selection is 1 when opening
  const handleImposterSheetOpen = (open: boolean) => {
    if (open) {
      if (imposterCount === -1 || imposterCount === undefined || imposterCount === null) {
        setImposterCount(1);
      }
    }
    setIsImposterSheetOpen(open);
  };

  const handleStartGame = () => {
    if (selectedCategories.length === 0) return;
    // Pass the imposterCount directly: 0 = no imposters, >=1 explicit
    setupGame(players.length, selectedCategories, imposterCount, imposterHint);
  };

  const canStartGame = selectedCategories.length > 0 && players.length >= 3;
  // Display imposter count directly
  const displayImposterCount = imposterCount;
  const displayImposterLabel = String(displayImposterCount);


  // Build available imposter choices based on players count (max = players-1), cap to 6 for UI
  const maxSelectable = Math.max(0, Math.min(players.length - 1, 6));
  const availableCounts = Array.from({ length: maxSelectable }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-md mx-auto space-y-4 p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">إعدادات اللعبة</h2>
  <p className="text-muted-foreground text-xs">قم بإعداد اللعبة قبل البدء</p>
      </div>

  {/* Player Count Tile */}
  <div className="rounded-2xl border border-blue-500/80 p-5 transition-colors relative overflow-hidden bg-gradient-to-br from-blue-500/30 via-blue-600/20 to-black-600/60 hover:from-blue-500/45 hover:via-blue-600/35 hover:to-slate-600/70">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="font-semibold text-base">اللاعبين</span>
              <p className="text-xs text-muted-foreground">من 3 إلى 20 لاعب</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-primary">{players.length}</span>
            <p className="text-[0.7rem] text-muted-foreground">لاعب</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl flex-1 h-11 hover:bg-blue-500/25"
            onClick={() => setIsEditPlayersOpen(true)}
          >
            <Settings className="w-4 h-4 ml-2" />
            تعديل الأسماء
          </Button>
        </div>
      </div>

  {/* Categories Tile */}
  <div className="rounded-2xl border border-slate-500/80 p-5 transition-colors relative overflow-hidden bg-gradient-to-br from-slate-500/30 via-slate-600/20 to-slate-700/60 hover:from-slate-500/45 hover:via-slate-600/35 hover:to-slate-700/70">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Group className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="font-semibold text-base">الفئات</span>
              <p className="text-xs text-muted-foreground">اختر المواضيع للعب</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-primary">{selectedCategories.length}</span>
            <p className="text-[0.7rem] text-muted-foreground">فئة</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full rounded-xl h-12 justify-between group hover:bg-slate-500/45"
          onClick={() => setIsCategoriesModalOpen(true)}
        >
          <span className="font-medium">
            {selectedCategories.length === 0
              ? "اختر الفئات"
              : `تم اختيار ${selectedCategories.length} فئة`}
          </span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1" />
        </Button>
        {selectedCategories.length === 0 && (
          <div className="flex items-center gap-2 mt-2 text-amber-600">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs">يجب اختيار فئة واحدة على الأقل</span>
          </div>
        )}
      </div>

  {/* Imposters Row */}
  <div className="rounded-2xl border border-red-500/80 p-5 transition-colors relative overflow-hidden bg-gradient-to-br from-red-600/35 via-red-700/25 to-black/65 hover:from-red-600/50 hover:via-red-700/40 hover:to-black/75">
        <Sheet open={isImposterSheetOpen} onOpenChange={handleImposterSheetOpen}>
          <SheetTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <VenetianMask className="w-5 h-5 text-primary" />
                </div>
                <div>
                        <div className="font-semibold text-base">فوضى</div>
                        <div className="text-xs text-muted-foreground">
                          {displayImposterCount === 1 ? 'إمبوستر واحد' : `${displayImposterCount} إمبوسترز`}
                        </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{displayImposterCount}</div>
                  <p className="text-[0.7rem] text-muted-foreground">إمبوستر</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1" />
              </div>
            </div>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto rounded-t-3xl">
            <SheetHeader className="text-center">
              <SheetTitle className="text-xl">اختر عدد الـImposters</SheetTitle>
              <p className="text-muted-foreground text-xs">كلما زاد العدد، زادت الصعوبة</p>
            </SheetHeader>
            <div className="grid grid-cols-3 gap-4 mt-6 pb-4">
              <div className="col-span-3 grid grid-cols-3 gap-4">
                <Button
                  variant={imposterCount === 0 ? "default" : "outline"}
                  className="rounded-xl py-8 flex flex-col gap-1"
                  onClick={() => {
                    setImposterCount(0);
                    setIsImposterSheetOpen(false);
                  }}
                >
                  <span className="text-2xl font-bold">0</span>
                  <span className="text-[0.7rem] opacity-70">بلا إمبوستر</span>
                </Button>
                {availableCounts.map((count) => (
                  <Button
                    key={count}
                    variant={imposterCount === count ? "default" : "outline"}
                    className="rounded-xl py-8 flex flex-col gap-1"
                    onClick={() => {
                      setImposterCount(count);
                      setIsImposterSheetOpen(false);
                    }}
                  >
                    <span className="text-2xl font-bold">{count}</span>
                    <span className="text-[0.7rem] opacity-70">
                      {count === 1 ? 'سهل' : count === 2 ? 'متوسط' : count === 3 ? 'صعب' : 'متقدم'}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Imposter Hint Switch - Enhanced (hidden when 0 imposters) */}
      {imposterCount !== 0 && (
        <div className="flex items-center justify-between cursor-pointer group">
          <div className="rounded-2xl border bg-card p-5 hover:bg-accent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-base">تلميح الإمبوستر</div>
                  <div className="text-xs text-muted-foreground">
                    يحصل الإمبوستر على معلومة إضافية
                  </div>
                </div>
              </div>
              <Switch
                checked={imposterHint}
                onCheckedChange={setImposterHint}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>
        </div>
      )}

      {/* L7aj (Mr. White) Switch - new role */}
      <div className="rounded-2xl border bg-card p-5 hover:bg-accent/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Drama className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-base">لحاج</div>
              <div className="text-xs text-muted-foreground">شخصية خاصة تحصل على كلمة منفصلة</div>
            </div>
          </div>
          <Switch checked={l7ajEnabled} onCheckedChange={setL7ajEnabled} className="data-[state=checked]:bg-primary" />
        </div>
      </div>

      {/* Hide L7aj button/toggle when L7aj is enabled */}
      {l7ajEnabled && (
        <div className="rounded-2xl border bg-card p-5 hover:bg-accent/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <EyeOffIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-base">إخفاء لحاج</div>
                <div className="text-xs text-muted-foreground">اجعل اللاعب لا يعرف إذا كان لحاج أم لا</div>
              </div>
            </div>
            <Switch checked={hideL7aj} onCheckedChange={setHideL7aj} className="data-[state=checked]:bg-primary" />
          </div>
        </div>
      )}

      {/* Start Button - Enhanced */}
      <div className="pt-2">
        <Button
          onClick={handleStartGame}
          disabled={!canStartGame}
          className="w-full text-xl py-8 rounded-2xl font-bold relative overflow-hidden"
          size="lg"
        >
          <Play className="w-6 h-6 ml-2" />
          {canStartGame ? 'ابدأ اللعبة' : 'اختر الفئات أولاً'}
        </Button>
        {!canStartGame && (
          <p className="text-center text-[0.7rem] text-muted-foreground mt-2">
              تأكد من اختيار فئة واحدة على الأقل
            </p>
        )}
      </div>

      {/* Edit Players Modal */}
      <EditPlayersModal
        open={isEditPlayersOpen}
        onOpenChange={setIsEditPlayersOpen}
        initialPlayers={players}
        onSave={updatePlayers}
      />

      {/* Choose Categories Modal */}
      <ChooseCategoriesModal
        open={isCategoriesModalOpen}
        onOpenChange={setIsCategoriesModalOpen}
        selectedCategories={selectedCategories}
        onSave={updateSelectedCategories}
      />
    </div>
  );
}