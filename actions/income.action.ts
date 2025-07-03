"use server";

import Income from "@/models/Income";
import { getUserIdFromToken } from "@/lib/get-user-from-token";
import { connectToDatabase } from "@/lib/mongodb";
import { IIncomeDB } from "@/types";
import { revalidatePath } from "next/cache";

export async function createIncome(data: IIncomeDB) {
  try {
    await connectToDatabase();

    const userId = await getUserIdFromToken();
    if (!userId) return { status: 401, message: "Not authenticated" };

    const income = await Income.create({ ...data, user: userId });

    revalidatePath("/");
    return { status: 200, data: income, message: "Income added" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { status: 500, data: null, message: "Error adding income" };
  }
}
