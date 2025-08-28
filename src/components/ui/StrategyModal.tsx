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
      <DialogContent className="font-body text-right">
        <DialogHeader>
          <DialogTitle>نصائح اللعبة</DialogTitle>
          <DialogDescription as="div" className="space-y-4 pt-4 text-right">
            <div>
              <h3 className="font-bold text-primary">للاعبين العاديين:</h3>
              <p>حاول تخلي النقاش واضح باش يعرفوك صحابك، ولكن ماشي واضح بزاف باش المحتال مايعرفش الكلمة.</p>
            </div>
            <div>
              <h3 className="font-bold text-primary">للمحتال:</h3>
              <p>حاول تبقى هادئ وشارك فالنقاش عادي. استعمل أجوبة عامة وسمع مزيان للآخرين باش تقلد أفكارهم.</p>
            </div>
            <div>
              <h3 className="font-bold text-primary">نصيحة عامة:</h3>
              <p>رد البال للتردد أو الأجوبة العامة بزاف فالنقاش، هادو علامات تقدر تكشف المحتال.</p>
            </div>
             <div>
              <h3 className="font-bold text-primary">التمويه:</h3>
              <p>المحتال يقدر يحاول يقلد نقاشات الآخرين بلا مايبين. حاول تلقى شكون كيدير هادشي.</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
