"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Pencil, Plus, X } from "lucide-react";

interface EditPlayersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialPlayers: string[];
  onSave: (players: string[]) => void;
}

export default function EditPlayersModal({
  open,
  onOpenChange,
  initialPlayers,
  onSave,
}: EditPlayersModalProps) {
  const [players, setPlayers] = useState<string[]>(initialPlayers);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const cancelEditButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (open) {
      setPlayers(initialPlayers.length > 0 ? initialPlayers : ["اللاعب 1", "اللاعب 2", "اللاعب 3"]);
    }
  }, [open, initialPlayers]);

  const handleAddPlayer = () => {
    if (newPlayerName.trim() && players.length < 20) {
      setPlayers([...players, newPlayerName.trim()]);
      setNewPlayerName("");
    }
  };

  const handleDeletePlayer = (index: number) => {
    if (players.length > 3) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const handleEditPlayer = (index: number) => {
    // If another item is being edited, save it first (auto-save UX)
    if (editingIndex !== null && editingIndex !== index) {
      handleSaveEdit();
    }
    setEditingIndex(index);
    setEditingName(players[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editingName.trim()) {
      const updatedPlayers = [...players];
      updatedPlayers[editingIndex] = editingName.trim();
      setPlayers(updatedPlayers);
      setEditingIndex(null);
      setEditingName("");
    }
    // if editingName is empty we simply cancel the edit (do not overwrite)
    if (editingIndex !== null && !editingName.trim()) {
      setEditingIndex(null);
      setEditingName("");
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingName("");
  };

  const validatePlayers = () => {
    const trimmedPlayers = players.map(p => p.trim());
    const uniquePlayers = new Set(trimmedPlayers);
    return trimmedPlayers.length >= 3 &&
           trimmedPlayers.length <= 20 &&
           trimmedPlayers.every(p => p.length > 0) &&
           uniquePlayers.size === trimmedPlayers.length;
  };

  const handleSave = () => {
    if (validatePlayers()) {
      onSave(players);
      onOpenChange(false);
    }
  };

  const getValidationMessage = () => {
    const trimmedPlayers = players.map(p => p.trim());
    if (trimmedPlayers.length < 3) return "يجب أن يكون هناك 3 لاعبين على الأقل";
    if (trimmedPlayers.length > 20) return "يجب ألا يزيد عدد اللاعبين عن 20";
    if (trimmedPlayers.some(p => p.length === 0)) return "لا يمكن ترك أسماء فارغة";
    const uniquePlayers = new Set(trimmedPlayers);
    if (uniquePlayers.size !== trimmedPlayers.length) return "لا يمكن تكرار الأسماء";
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>تعديل اللاعبين</DialogTitle>
          <p className="text-sm text-muted-foreground">
            النطاق 3–20 لاعبين
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            اضغط لتعديل الاسم
          </p>

          {/* Players List */}
          <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
            {players.map((player, index) => (
              <div key={index} className="flex items-center gap-2 p-2 border rounded-lg">
                {editingIndex === index ? (
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const related = e.relatedTarget as HTMLElement | null;
                        // If the user clicked the cancel button, run cancel instead of save
                        if (related && related === cancelEditButtonRef.current) {
                          handleCancelEdit();
                        } else {
                          handleSaveEdit();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSaveEdit();
                        }
                      }}
                      className="flex-1"
                      autoFocus
                    />
                    <Button size="sm" variant="outline" onClick={handleCancelEdit} ref={(el) => (cancelEditButtonRef.current = el as any)}>
                      إلغاء
                    </Button>
                  </div>
                ) : (
                  <>
                    <Input
                      value={player}
                      readOnly
                      className="flex-1 cursor-pointer"
                      onClick={() => handleEditPlayer(index)}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditPlayer(index)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeletePlayer(index)}
                      disabled={players.length <= 3}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Add New Player */}
          <div className="flex items-center gap-2">
            <Input
              placeholder="أضف اسم لاعب"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
              disabled={players.length >= 20}
            />
            <Button
              onClick={handleAddPlayer}
              disabled={!newPlayerName.trim() || players.length >= 20}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <DialogFooter>
          {getValidationMessage() && (
            <p className="text-sm text-destructive mr-auto">
              {getValidationMessage()}
            </p>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={handleSave} disabled={!validatePlayers()}>
            تأكيد
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}