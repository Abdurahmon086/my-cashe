"use server";
import { getUserIdFromToken } from "@/lib/get-user-from-token";
import { connectToDatabase } from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { IExpenseDB } from "@/types";
import { revalidatePath } from "next/cache";

export async function addExpense(data: IExpenseDB) {
  try {
    await connectToDatabase();

    const userId = await getUserIdFromToken();
    if (!userId) return { status: 401, message: "Not authenticated" };

    const expense = await Expense.create({ ...data, user: userId });

    revalidatePath("/");
    return { status: 200, data: JSON.parse(JSON.stringify(expense)), message: "Expense added" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { status: 500, message: "Error adding expense" };
  }
}
