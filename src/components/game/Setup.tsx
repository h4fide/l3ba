"use client";

import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Users, MoreHorizontal, Lightbulb, Play, Settings } from "lucide-react";
import EditPlayersModal from "./EditPlayersModal";
import ChooseCategoriesModal from "./ChooseCategoriesModal";

export default function Setup() {
  const { setupGame, players, updatePlayers, selectedCategories, updateSelectedCategories } = useGame();
  const [imposterCount, setImposterCount] = useState(1);
  const [imposterHint, setImposterHint] = useState(false);
  const [isPlayerSheetOpen, setIsPlayerSheetOpen] = useState(false);
  const [isImposterSheetOpen, setIsImposterSheetOpen] = useState(false);
  const [isEditPlayersOpen, setIsEditPlayersOpen] = useState(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);

  const handleStartGame = () => {
    if (selectedCategories.length === 0) return;
    setupGame(players.length, selectedCategories, imposterCount, imposterHint);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 p-4">
      <h2 className="text-3xl font-bold text-center mb-8">إعدادات اللعبة</h2>

      {/* Player Count Tile */}
      <div className="rounded-2xl border bg-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span className="font-medium">عدد اللاعبين</span>
          </div>
          <span className="text-2xl font-bold text-primary">{players.length}</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full flex-1"
            onClick={() => setIsEditPlayersOpen(true)}
          >
            <Settings className="w-4 h-4 mr-1" />
            تعديل
          </Button>
          <Sheet open={isPlayerSheetOpen} onOpenChange={setIsPlayerSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full px-3">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto">
              <SheetHeader>
                <SheetTitle>اختر عدد اللاعبين</SheetTitle>
              </SheetHeader>
              <div className="grid grid-cols-4 gap-2 mt-4">
                {Array.from({ length: 18 }, (_, i) => i + 3).map((count) => (
                  <Button
                    key={count}
                    variant={players.length === count ? "default" : "outline"}
                    className="rounded-full"
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
          </Sheet>
        </div>
      </div>

      {/* Categories Tile */}
      <div className="rounded-2xl border bg-card p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium">الفئات</span>
          <span className="text-2xl font-bold text-primary">{selectedCategories.length}</span>
        </div>
        <Button
          variant="outline"
          className="w-full rounded-full"
          onClick={() => setIsCategoriesModalOpen(true)}
        >
          {selectedCategories.length === 0
            ? "اختر الفئات"
            : `${selectedCategories.length} فئة محددة`}
        </Button>
      </div>

      {/* Imposters Row */}
      <div className="rounded-2xl border bg-card p-4">
        <Sheet open={isImposterSheetOpen} onOpenChange={setIsImposterSheetOpen}>
          <SheetTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-medium">الـImposters</div>
                <div className="text-sm text-muted-foreground">
                  {imposterCount} {imposterCount === 1 ? 'imposter' : 'imposters'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary">{imposterCount}</div>
              </div>
            </div>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto">
            <SheetHeader>
              <SheetTitle>اختر عدد الـImposters</SheetTitle>
            </SheetHeader>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[1, 2, 3].map((count) => (
                <Button
                  key={count}
                  variant={imposterCount === count ? "default" : "outline"}
                  className="rounded-full py-8"
                  onClick={() => {
                    setImposterCount(count);
                    setIsImposterSheetOpen(false);
                  }}
                >
                  {count}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Imposter Hint Switch */}
      <div className="rounded-2xl border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-5 h-5" />
            <div>
              <div className="font-medium">تلميح الـImposter</div>
              <div className="text-sm text-muted-foreground">
                يحصل الـImposter على تلميح إضافي
              </div>
            </div>
          </div>
          <Switch
            checked={imposterHint}
            onCheckedChange={setImposterHint}
          />
        </div>
      </div>

      {/* Start Button */}
      <Button
        onClick={handleStartGame}
        disabled={selectedCategories.length === 0}
        className="w-full text-xl py-8 rounded-2xl"
        size="lg"
      >
        <Play className="w-6 h-6 ml-2" />
        ابدأ اللعبة
      </Button>

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
