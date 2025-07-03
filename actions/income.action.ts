"use server";

import Income from "@/models/Income";
import { incomeSchema } from "@/schemas/income.schemas";
import { getUserIdFromToken } from "@/lib/get-user-from-token";
import { connectToDatabase } from "@/lib/mongodb";
import { IIncomeDB } from "@/types";

export async function createIncome(data: IIncomeDB) {
  try {
    await connectToDatabase();

    const userId = await getUserIdFromToken();
    if (!userId) return { status: 401, message: "Not authenticated" };

    const parsed = incomeSchema.safeParse(data);

    if (!parsed.success) return { status: 400, message: "Invalid data" };
    const income = await Income.create({ ...parsed.data, user: userId });
    return { status: 200, data: income, message: "Income added" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { status: 500, data: null, message: "Error adding income" };
  }
}
