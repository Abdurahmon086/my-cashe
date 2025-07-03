"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { DialogClose } from "@/components/ui/dialog";
import { getAllCategory } from "@/actions/category.action"; // Sizda shu action bo‘lishi kerak
import { expenseSchema } from "@/schemas/expense.schemas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addExpense } from "@/actions/expense.action";

export function ExpenseForm() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);

  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: "",
      category: "",
      description: "",
    },
  });

  useEffect(() => {
    async function fetchCategories() {
      const res = await getAllCategory();
      if (res?.data) setCategories(res.data);
    }
    fetchCategories();
  }, []);

  // Faqat raqam kiritish uchun handler
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: unknown) => void) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      onChange(value);
    }
  };

  const onSubmit = async (values: z.infer<typeof expenseSchema>) => {
    try {
      setIsPending(true);
      // Convert amount to number before sending to addExpense
      const payload = { ...values, amount: Number(values.amount), description: values.description || "" };

      const { message, status } = await addExpense(payload);
      if (status === 200) {
        toast.success(message);
        form.reset();
        document.getElementById("dialog-close-btn")?.click();
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FormField
          name="description"
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
        <FormField
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategoriya</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Kategoriya tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Miqdori</FormLabel>
              <FormControl>
                <Input type="text" inputMode="numeric" placeholder="Miqdori" {...field} onChange={(e) => handleAmountChange(e, field.onChange)} />
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
