import { z } from "zod";

export const incomeSchema = z.object({
  amount: z.string().regex(/^[0-9]+$/, "Faqat raqam kiriting"),
  category: z.string().min(1, "Kategoriya tanlang"),
  description: z.string().optional(),
});
