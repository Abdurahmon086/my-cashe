"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { toast } from "sonner";
import { useState } from "react";
import { DialogClose } from "@/components/ui/dialog";
import { categorySchema } from "@/schemas/category.schemas";
import { createCategory } from "@/actions/category.action";

export function CategoryForm() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    try {
      setIsPending(true);
      const { status, message } = await createCategory(values);
      if (status === 200) {
        toast(message);
        form.reset();
        document.getElementById("dialog-close-btn")?.click();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Error category");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomi</FormLabel>
              <FormControl>
                <Input placeholder="Nomi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" type="button" id="dialog-close-btn">
              Bekor qilish
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Yuklanmoqda..." : "Qo'shish"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
