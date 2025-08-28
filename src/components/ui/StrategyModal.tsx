"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
          <DialogTitle>نصائح اللعبة</DialogTitle>
          <div className="space-y-4 pt-4 text-right text-sm text-muted-foreground">
            <div>
              <h3 className="font-bold text-primary">للاعبين العاديين:</h3>
              <p>حاول تخلي النقاش واضح باش زملاءك يعرفوك ولكن موش واضح بزاف باش ما يعرفش الـImposter الكلمة.</p>
            </div>
            <div>
              <h3 className="font-bold text-primary">لـ Imposter:</h3>
              <p>حاول تبقا هادئ وتشارك فالنقاش بطريقة عادية. استعمل أجوبة عامة واستمع مزيان للآخرين باش تقلد الأفكار ديالهم.</p>
            </div>
            <div>
              <h3 className="font-bold text-primary">نصيحة عامة:</h3>
              <p>دير بالك من التردد أو الإجابات العامة بزاف فالنقاش. هادو علامات ممكن تكشف الـImposter.</p>
            </div>
             <div>
              <h3 className="font-bold text-primary">التمويه:</h3>
              <p>الـImposter يقدر يقلد النقاش ديال الآخرين بلا ما يكون واضح بزاف. حاول تلقط لي كيدير هاكا.</p>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
