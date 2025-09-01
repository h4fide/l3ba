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
      <DialogContent className="font-body max-w-2xl max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-red-500 hover:scrollbar-thumb-red-600 scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
        <DialogHeader>
          <DialogTitle>كيفاش نلعب</DialogTitle>
          <div className="space-y-6 pt-4 text-right text-sm text-muted-foreground">
            {/* Game Overview */}
            <div>
              <h3 className="font-bold text-primary text-base mb-2">🎯 الهدف من اللعبة</h3>
              <p className="leading-relaxed">لعبة اجتماعية ديال التخمين فين اللاعبين يحاولوا يكتشفوا الـImposter (المتسلل) اللي ما عندوش نفس الكلمة السرية.</p>
            </div>

            {/* Setup */}
            <div>
              <h3 className="font-bold text-primary text-base mb-2">⚙️ الإعداد</h3>
              <ul className="space-y-2 list-disc list-inside mr-4">
                <li>اختار عدد اللاعبين (3-20 لاعب)</li>
                <li>اختار الفئات اللي باغي تلعب بيها (حيوانات، أكل، رياضة...)</li>
                <li>حدد عدد الـImposters غالبا كيكون واحد</li>
                <li>فعل أو طفي المزايا الإضافية</li>
              </ul>
            </div>

            {/* Gameplay */}
            <div>
              <h3 className="font-bold text-primary text-base mb-2">🎮 طريقة اللعب</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground">1. توزيع الأدوار:</h4>
                  <p>كل لاعب غايشوف كارطة فيها دورو وكلمة سرية. معظم اللاعبين غايشوفوا نفس الكلمة، بس الـImposter غايشوف كلمة مختلفة .</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground">2. النقاش:</h4>
                  <p>اللاعبين غايتناقشوا حول الكلمة ديالهم بطريقة غير مباشرة، بلا ما يقولو الكلمة . كل واحد يحاول يبين لزملاؤو بلي عارف الكلمة بلا ما يكشفها للـImposter.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground">3. التصويت:</h4>
                  <p>فالأخير، كل لاعب يصوت على مين كيعتقد بلي هو الـImposter. إلا كان التصويت صحيح، اللاعبين العاديين يربحوا. إلا لا، الـImposter يربح.</p>
                </div>
              </div>
            </div>

            {/* Special Features */}
            <div>
              <h3 className="font-bold text-primary text-base mb-2">✨ المزايا الخاصة</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground">💡 التلميح للإمبوستر:</h4>
                  <p>الـImposter يقدر يحصل على معلومة إضافية باش يساعدو يقلد اللاعبين الآخرين.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground">🎭 لحاج (Mr. White):</h4>
                  <p>لاعب خاص يحصل على كلمة مختلفة من الفئة نفسها.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground">⚡ المصيدة:</h4>
                  <p>فشي جولات نادرة (احتمال 10%)، كل اللاعبين يوليوا إمبوسترز! لازم يكتشفوا بلي كلهم عندهم كلمات مختلفة.</p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div>
              <h3 className="font-bold text-primary text-base mb-2">💡 نصائح للعب</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground">للاعبين العاديين:</h4>
                  <p>حاول تخلي النقاش واضح باش زملاءك يعرفوك، ولكن موش واضح بزاف باش ما يعرفش الـImposter الكلمة.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground">للـImposter:</h4>
                  <p>حاول تبقا هادئ وتشارك فالنقاش بطريقة عادية. استعمل أجوبة عامة واستمع مزيان للآخرين باش تقلد الأفكار ديالهم.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground">علامات الشك:</h4>
                  <p>دير بالك من التردد، الإجابات العامة بزاف، أو الأسئلة الكثيرة. هادو علامات ممكن تكشف الـImposter.</p>
                </div>
              </div>
            </div>

            {/* Victory Conditions */}
            <div>
              <h3 className="font-bold text-primary text-base mb-2">🏆 شروط الفوز</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-green-600">اللاعبين العاديين يربحوا:</span>
                  <p>إلا كشفوا كل الـImposters صحيح</p>
                </div>
                <div>
                  <span className="font-semibold text-red-600">الـImposters يربحوا:</span>
                  <p>إلا بقاو مختفيين ولا لاعب عادي تصوت عليه غلط</p>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
