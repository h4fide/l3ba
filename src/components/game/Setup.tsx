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
    .number({ invalid_type_error: "Must be a number" })
    .min(3, { message: "At least 3 players" })
    .max(20, { message: "Maximum of 20 players" }),
  category: z.string({ required_error: "Please select a category" }).min(1, "Please select a category"),
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
      <h2 className="text-3xl font-bold mb-8 text-center">Game Setup</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="playerCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-lg">
                  <Users className="w-6 h-6" />
                  <span>Number of Players</span>
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
                  <span>Category</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-14 text-xl">
                      <SelectValue placeholder="Choose a category..." />
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
            <Play className="w-6 h-6 mr-2"/>
            Start Game
          </Button>
        </form>
      </Form>
    </div>
  );
}
