"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGame } from "@/context/GameContext";
import { categoryNames } from "@/data/words";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Users, List } from "lucide-react";

const setupSchema = z.object({
  playerCount: z.coerce
    .number({ invalid_type_error: "خاص يكون رقم" })
    .min(3, { message: "خاص يكونو 3 اللاعبين على الأقل" })
    .max(20, { message: "خاص يكونو 20 لاعب كحد أقصى" }),
  category: z.string({ required_error: "خاص تختار فئة" }).min(1, "خاص تختار فئة"),
});

type SetupFormValues = z.infer<typeof setupSchema>;

export default function Setup() {
  const { setupGame } = useGame();

  const form = useForm<SetupFormValues>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      playerCount: 3,
      category: "",
    },
  });

  function onSubmit(data: SetupFormValues) {
    setupGame(data.playerCount, data.category as keyof typeof categoryNames);
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-center">إعدادات اللعبة</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
          <FormField
            control={form.control}
            name="playerCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-base">
                  <Users className="w-5 h-5" />
                  <span>عدد اللاعبين</span>
                </FormLabel>
                <FormControl>
                  <Input type="number" {...field} className="text-center text-lg h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-base">
                  <List className="w-5 h-5" />
                  <span>الفئة</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="اختار فئة..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryNames.map((cat) => (
                      <SelectItem key={cat} value={cat} className="text-lg">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full text-lg py-7" size="lg">
            بدا اللعبة
          </Button>
        </form>
      </Form>
    </div>
  );
}
