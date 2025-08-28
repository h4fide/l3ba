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
import { Users, List, Play } from "lucide-react";

const setupSchema = z.object({
  playerCount: z.coerce
    .number({ invalid_type_error: "يجب أن يكون رقما" })
    .min(3, { message: "3 لاعبين على الأقل" })
    .max(20, { message: "20 لاعبًا كحد أقصى" }),
  category: z.string({ required_error: "الرجاء اختيار فئة" }).min(1, "الرجاء اختيار فئة"),
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
      <h2 className="text-3xl font-bold mb-8 text-center">إعدادات اللعبة</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="playerCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-lg">
                  <Users className="w-6 h-6" />
                  <span>عدد اللاعبين</span>
                </FormLabel>
                <FormControl>
                  <Input type="number" {...field} className="text-center text-xl h-14" />
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
                <FormLabel className="flex items-center gap-2 text-lg">
                  <List className="w-6 h-6" />
                  <span>الفئة</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-14 text-xl">
                      <SelectValue placeholder="اختر فئة..." />
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
          <Button type="submit" className="w-full text-xl py-8" size="lg">
            <Play className="w-6 h-6 ml-2"/>
            ابدأ اللعبة
          </Button>
        </form>
      </Form>
    </div>
  );
}
