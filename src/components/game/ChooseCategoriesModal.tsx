"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { categoryNames, categoryEmojis } from "@/data/words";
import { Check } from "lucide-react";

interface ChooseCategoriesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategories: string[];
  onSave: (categories: string[]) => void;
}

export default function ChooseCategoriesModal({
  open,
  onOpenChange,
  selectedCategories,
  onSave,
}: ChooseCategoriesModalProps) {
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>(selectedCategories);

  const toggleCategory = (category: string) => {
    setTempSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSave = () => {
    if (tempSelectedCategories.length > 0) {
      onSave(tempSelectedCategories);
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setTempSelectedCategories(selectedCategories);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>اختر الفئات</DialogTitle>
          <p className="text-sm text-muted-foreground">
            اختر فئة أو أكثر للعبة
          </p>
        </DialogHeader>

        <div 
          className="flex-1 overflow-y-auto space-y-3 py-2"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgb(203 213 225) transparent'
          }}
        >
          {categoryNames.map((category) => {
            const isSelected = tempSelectedCategories.includes(category);
            return (
              <Button
                key={category}
                variant={isSelected ? "default" : "outline"}
                className="w-full justify-between h-auto py-4 px-4 text-left"
                onClick={() => toggleCategory(category)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{categoryEmojis[category]}</span>
                  <span className="font-medium">{category}</span>
                </div>
                {isSelected && (
                  <Check className="w-5 h-5" />
                )}
              </Button>
            );
          })}
        </div>

        <DialogFooter className="flex-shrink-0 border-t pt-4">
          <Button variant="outline" onClick={handleCancel}>
            إلغاء
          </Button>
          <Button
            onClick={handleSave}
            disabled={tempSelectedCategories.length === 0}
          >
            تأكيد ({tempSelectedCategories.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
