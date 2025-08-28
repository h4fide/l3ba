"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface StrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StrategyModal({ isOpen, onClose }: StrategyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="font-body">
        <DialogHeader>
          <DialogTitle>Game Tips</DialogTitle>
          <DialogDescription as="div" className="space-y-4 pt-4 text-left">
            <div>
              <h3 className="font-bold text-primary">For Regular Players:</h3>
              <p>Try to make the discussion clear enough for your teammates to recognize you, but not so obvious that the Imposter can guess the word.</p>
            </div>
            <div>
              <h3 className="font-bold text-primary">For the Imposter:</h3>
              <p>Try to stay calm and participate in the discussion normally. Use general answers and listen carefully to others to mimic their ideas.</p>
            </div>
            <div>
              <h3 className="font-bold text-primary">General Advice:</h3>
              <p>Watch out for hesitation or overly general answers in the discussion. These could be signs that reveal the Imposter.</p>
            </div>
             <div>
              <h3 className="font-bold text-primary">Bluffing:</h3>
              <p>The Imposter might try to mimic others' discussions without being too obvious. Try to catch who is doing this.</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
