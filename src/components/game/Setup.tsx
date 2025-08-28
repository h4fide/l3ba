"use client";

import React from "react";
import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Users, MoreHorizontal, Lightbulb, Play, Settings, ChevronRight, AlertCircle, Group, VenetianMask } from "lucide-react";
import EditPlayersModal from "./EditPlayersModal";
import ChooseCategoriesModal from "./ChooseCategoriesModal";

export default function Setup() {
  const { setupGame, players, updatePlayers, selectedCategories, updateSelectedCategories, imposterHint, setImposterHint } = useGame();
  const [imposterCount, setImposterCount] = useState(1);
  const [isPlayerSheetOpen, setIsPlayerSheetOpen] = useState(false);
  const [isImposterSheetOpen, setIsImposterSheetOpen] = useState(false);
  const [isEditPlayersOpen, setIsEditPlayersOpen] = useState(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);

  const handleStartGame = () => {
    if (selectedCategories.length === 0) return;
    setupGame(players.length, selectedCategories, imposterCount, imposterHint);
  };

  const canStartGame = selectedCategories.length > 0 && players.length >= 3;

  return (
    <div className="w-full max-w-md mx-auto space-y-4 p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">إعدادات اللعبة</h2>
        <p className="text-muted-foreground text-sm">قم بإعداد اللعبة قبل البدء</p>
      </div>

      {/* Player Count Tile - Enhanced */}
      <div className="rounded-2xl border bg-card p-5 hover:bg-accent/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="font-semibold text-base">اللاعبين</span>
              <p className="text-sm text-muted-foreground">من 3 إلى 20 لاعب</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-primary">{players.length}</span>
            <p className="text-xs text-muted-foreground">لاعب</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl flex-1 h-11"
            onClick={() => setIsEditPlayersOpen(true)}
          >
            <Settings className="w-4 h-4 ml-2" />
            تعديل الأسماء
          </Button>
          {/* <Sheet open={isPlayerSheetOpen} onOpenChange={setIsPlayerSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-xl px-4 h-11">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto rounded-t-3xl">
              <SheetHeader className="text-center">
                <SheetTitle className="text-xl">اختر عدد اللاعبين</SheetTitle>
                <p className="text-muted-foreground text-sm">الحد الأدنى 3 لاعبين، الأقصى 20</p>
              </SheetHeader>
              <div className="grid grid-cols-4 gap-3 mt-6 pb-4">
                {Array.from({ length: 18 }, (_, i) => i + 3).map((count) => (
                  <Button
                    key={count}
                    variant={players.length === count ? "default" : "outline"}
                    className="rounded-xl h-12 font-semibold"
                    onClick={() => {
                      const newPlayers = Array.from({ length: count }, (_, i) => `اللاعب ${i + 1}`);
                      updatePlayers(newPlayers);
                      setIsPlayerSheetOpen(false);
                    }}
                  >
                    {count}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet> */}
        </div>
      </div>

      {/* Categories Tile - Enhanced */}
      <div className="rounded-2xl border bg-card p-5 hover:bg-accent/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Group className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="font-semibold text-base">الفئات</span>
              <p className="text-sm text-muted-foreground">اختر المواضيع للعب</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-primary">{selectedCategories.length}</span>
            <p className="text-xs text-muted-foreground">فئة</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full rounded-xl h-12 justify-between group"
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

      {/* Imposters Row - Enhanced */}
      <div className="rounded-2xl border bg-card p-5 hover:bg-accent/5">
        <Sheet open={isImposterSheetOpen} onOpenChange={setIsImposterSheetOpen}>
          <SheetTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <VenetianMask className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-base">الإمبوستر</div>
                  <div className="text-sm text-muted-foreground">
                    {imposterCount === 1 ? 'إمبوستر واحد' : `${imposterCount} إمبوسترز`}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{imposterCount}</div>
                  <p className="text-xs text-muted-foreground">إمبوستر</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1" />
              </div>
            </div>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto rounded-t-3xl">
            <SheetHeader className="text-center">
              <SheetTitle className="text-xl">اختر عدد الـImposters</SheetTitle>
              <p className="text-muted-foreground text-sm">كلما زاد العدد، زادت الصعوبة</p>
            </SheetHeader>
            <div className="grid grid-cols-3 gap-4 mt-6 pb-4">
              {[1, 2, 3].map((count) => (
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
                  <span className="text-xs opacity-70">
                    {count === 1 ? 'سهل' : count === 2 ? 'متوسط' : 'صعب'}
                  </span>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Imposter Hint Switch - Enhanced */}
      <div className="flex items-center justify-between cursor-pointer group">
      <div className="rounded-2xl border bg-card p-5 hover:bg-accent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-base">تلميح الإمبوستر</div>
              <div className="text-sm text-muted-foreground">
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

      {/* Game Summary Card */}
      <div className="rounded-2xl border bg-muted/30 p-4">
        <h3 className="font-semibold mb-3 text-center">ملخص اللعبة</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary">{players.length}</div>
            <div className="text-xs text-muted-foreground">لاعب</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">{selectedCategories.length}</div>
            <div className="text-xs text-muted-foreground">فئة</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">{imposterCount}</div>
            <div className="text-xs text-muted-foreground">إمبوستر</div>
          </div>
        </div>
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
          <p className="text-center text-xs text-muted-foreground mt-2">
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