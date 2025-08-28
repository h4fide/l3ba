"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGame } from "@/context/GameContext";
import { categoryNames } from "@/data/words";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  category: z.string({ required_error: "خاص تختار فئة" }),
});

type SetupFormValues = z.infer<typeof setupSchema>;

export default function Setup() {
  const { setupGame } = useGame();

  const form = useForm<SetupFormValues>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      playerCount: 3,
    },
  });

  function onSubmit(data: SetupFormValues) {
    setupGame(data.playerCount, data.category as keyof typeof categoryNames);
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-center">إعدادات اللعبة</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="playerCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>عدد اللاعبين</span>
                </FormLabel>
                <FormControl>
                  <Input type="number" {...field} className="text-center text-lg" />
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
                <FormLabel className="flex items-center gap-2">
                  <List className="w-5 h-5" />
                  <span>الفئة</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="اختار فئة..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryNames.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full text-lg py-6" size="lg">
            بدا اللعبة
          </Button>
        </form>
      </Form>
    </div>
  );
}
