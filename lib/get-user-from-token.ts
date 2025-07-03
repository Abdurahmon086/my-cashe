import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUserIdFromToken(): Promise<string | null> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    if (
      typeof payload === "object" &&
      payload !== null &&
      Object.prototype.hasOwnProperty.call(payload, "userId") &&
      typeof (payload as { userId?: unknown }).userId === "string"
    ) {
      return (payload as { userId: string }).userId;
    }
    return null;
  } catch {
    return null;
  }
}