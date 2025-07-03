"use server";
import { getUserIdFromToken } from "@/lib/get-user-from-token";
import { connectToDatabase } from "@/lib/mongodb";
import Category from "@/models/Category";
import { ICategoryDB } from "@/types";
import { revalidatePath } from "next/cache";

export async function createCategory(data: ICategoryDB) {
  try {
    await connectToDatabase(); 

    const userId =  await getUserIdFromToken();
    if (!userId) return { status: 401, message: "Not authenticated" };
    const category = await Category.create({ name: data.name, user: userId });

    revalidatePath("/");
    return { status: 200, data: JSON.parse(JSON.stringify(category)), message: "Category added" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { status: 500, data: null, message: "Error adding category" };
  }
}

export async function getAllCategory() {
  try {
    await connectToDatabase();

    const userId = await getUserIdFromToken();
    if (!userId) return { status: 401, message: "Not authenticated" };

    const category = await Category.find({ user: userId });

    return { status: 200, data: JSON.parse(JSON.stringify(category)), message: "Category get all" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { status: 500, data: null, message: "Error category get all" };
  }
}
