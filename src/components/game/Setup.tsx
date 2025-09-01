"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Users, MoreHorizontal, Lightbulb, Play, Settings, ChevronRight, AlertCircle, Group, VenetianMask, Drama, UserRoundPlusIcon, Eye, EyeOffIcon, Zap, Flame } from "lucide-react";
import EditPlayersModal from "./EditPlayersModal";
import ChooseCategoriesModal from "./ChooseCategoriesModal";

export default function Setup() {
  const { setupGame, players, updatePlayers, selectedCategories, updateSelectedCategories, imposterHint, setImposterHint, categoryHint, setCategoryHint, imposterCount, setImposterCount, l7ajEnabled, setL7ajEnabled, hideL7aj, setHideL7aj, trapEnabled, setTrapEnabled, trapActivated, saveCurrentSettings } = useGame();
  const [isPlayerSheetOpen, setIsPlayerSheetOpen] = useState(false);
  const [isImposterSheetOpen, setIsImposterSheetOpen] = useState(false);
  const [isEditPlayersOpen, setIsEditPlayersOpen] = useState(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);

  useEffect(() => {
    if (imposterCount === undefined || imposterCount === null || imposterCount === -1) {
      setImposterCount(1);
    }
  }, []);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveCurrentSettings();
    }, 500); 
    
    return () => clearTimeout(timeoutId);
  }, [players, selectedCategories, imposterCount, imposterHint, categoryHint, l7ajEnabled, hideL7aj, trapEnabled, saveCurrentSettings]);

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
    setupGame(players.length, selectedCategories, imposterCount, imposterHint, categoryHint);
  };

  const canStartGame = selectedCategories.length > 0 && players.length >= 3;
  const displayImposterCount = imposterCount;
  const displayImposterLabel = String(displayImposterCount);

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
            className="rounded-xl flex-1 h-11 hover:bg-blue-500/25 border border-white/50"
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
        
        {/* Display selected categories */}
        {selectedCategories.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium border border-primary/30"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <Button
          variant="outline"
          className="w-full rounded-xl h-12 justify-between group hover:bg-slate-500/45 border border-white/50"
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
                        <div className="font-semibold text-base">إمبوسترز</div>
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
                    className="rounded-xl py-8 flex flex-col gap-1 "
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

      {/* Imposter Hint & Category Hint (independent) */}
      {imposterCount !== 0 && (
        <div className="rounded-2xl border bg-card p-5 hover:bg-accent/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-base">التلميحات</div>
              <div className="text-xs text-muted-foreground">
                {imposterHint && categoryHint && 'يحصل الإمبوستر على تلميح و الفئة'}
                {imposterHint && !categoryHint && 'يحصل الإمبوستر على تلميح فقط'}
                {!imposterHint && categoryHint && 'يحصل الإمبوستر على الفئة فقط'}
                {!imposterHint && !categoryHint && 'بدون تلميحات حالياً'}
              </div>
            </div>
          </div>
          <div className="flex flex-col xs:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            {/* Toggle Hint */}
            <Button
              type="button"
              size="sm"
              onClick={() => setImposterHint(!imposterHint)}
              aria-label="تفعيل التلميح"
              aria-pressed={imposterHint}
              className={`relative overflow-hidden h-8 rounded-full flex items-center justify-center gap-1.5 px-3 text-[11px] font-medium transition-all border backdrop-blur-sm flex-1 sm:flex-initial
                ${imposterHint
                  ? 'bg-gradient-to-r from-emerald-500/90 to-green-600 text-white border-emerald-400/60 shadow-sm ring-1 ring-white/20'
                  : 'bg-white/5 hover:bg-white/10 text-emerald-400 border-emerald-400/30'}
              `}
              variant={imposterHint ? 'default' : 'ghost'}
            >
              <Lightbulb className={`w-3 h-3 transition-transform ${imposterHint ? 'scale-110 drop-shadow-sm' : 'opacity-80'}`} />
              <span>التلميح</span>
              {imposterHint && (
                <span className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_30%_30%,#ffffff33,transparent_60%)]" />
              )}
            </Button>
            {/* Toggle Category */}
            <Button
              type="button"
              size="sm"
              onClick={() => setCategoryHint(!categoryHint)}
              aria-label="تفعيل تلميح الفئة"
              aria-pressed={categoryHint}
              className={`relative overflow-hidden h-8 rounded-full flex items-center justify-center gap-1.5 px-3 text-[11px] font-medium transition-all border backdrop-blur-sm flex-1 sm:flex-initial
                ${categoryHint
                  ? 'bg-gradient-to-r from-amber-500/90 to-orange-600 text-white border-orange-400/60 shadow-sm ring-1 ring-white/20'
                  : 'bg-white/5 hover:bg-white/10 text-amber-400 border-amber-400/30'}
              `}
              variant={categoryHint ? 'default' : 'ghost'}
            >
              <Group className={`w-3.5 h-3.5 transition-transform ${categoryHint ? 'scale-110 drop-shadow-sm' : 'opacity-80'}`} />
              <span>الفئة</span>
              {categoryHint && (
                <span className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_30%_30%,#ffffff33,transparent_60%)]" />
              )}
            </Button>
          </div>
        </div>
      )}

      {/* L7aj (Mr. White) role + hide option combined */}
      <div className="rounded-2xl border bg-card p-5 hover:bg-accent/5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Drama className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-base flex items-center gap-2">لحاج</div>
              <div className="text-xs text-muted-foreground min-h-[1.1rem]">
                {l7ajEnabled ? (
                  hideL7aj
                    ? 'لاعب خاص ماعارفش أنه عندو كلمة مختلفة'
                    : 'لاعب خاص عندو كلمة مختلفة او عارف راسو هو الحاج'
                ) : (
                  'دور اختياري: لاعب بكلمة مختلفة'
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {l7ajEnabled && (
              <Button
                type="button"
                size="sm"
                onClick={() => setHideL7aj(!hideL7aj)}
                aria-label="تفعيل إخفاء لحاج"
                aria-pressed={hideL7aj}
                className={`relative overflow-hidden h-8 rounded-full flex items-center justify-center gap-1.5 px-3 text-[11px] font-medium transition-all border backdrop-blur-sm
                  ${hideL7aj
                    ? 'bg-gradient-to-r from-rose-500/90 to-red-600 text-white border-red-400/60 shadow-sm ring-1 ring-white/20'
                    : 'bg-white/5 hover:bg-white/10 text-red-400 border-red-400/30'}
                `}
                variant={hideL7aj ? 'default' : 'ghost'}
              >
                {hideL7aj ? (
                  <EyeOffIcon className={`w-3.5 h-3.5 transition-transform ${hideL7aj ? 'scale-110 drop-shadow-sm' : 'opacity-80'}`} />
                ) : (
                  <Eye className="w-3.5 h-3.5 opacity-80" />
                )}
                <span className="flex items-center gap-1">{hideL7aj ? 'مخفي' : 'إخفاء'}</span>
                {hideL7aj && (
                  <span className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_30%_30%,#ffffff33,transparent_60%)]" />
                )}
              </Button>
            )}
            <Switch checked={l7ajEnabled} onCheckedChange={setL7ajEnabled} className="data-[state=checked]:bg-primary" />
          </div>
        </div>
      </div>

      {/* Trap Feature - لمصيدة */}
      <div className="rounded-2xl border p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-base">لمصيدة</div>
              <div className="text-xs text-muted-foreground pl-3">فشي جولات معينة كولشي يقدر يولي إمبوستر</div>
            </div>
          </div>
          <Switch checked={trapEnabled} onCheckedChange={setTrapEnabled} className="data-[state=checked]:bg-primary" />
        </div>
        {trapActivated && (
          <div className="mt-3 p-2 bg-orange-500/20 rounded-lg border border-orange-500/30">
            <div className="flex items-center gap-2 text-orange-700">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">المصيدة مفعلة! جميع اللاعبين إمبوسترز!</span>
            </div>
          </div>
        )}
      </div>

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