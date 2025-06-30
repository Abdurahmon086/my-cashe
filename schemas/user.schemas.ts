import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email noto'g'ri kiritilgan"),
  password: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
});

export const registerSchema = z.object({
  username: z.string().min(3, "Username kamida 3 ta belgidan iborat bo‘lishi kerak"),
  email: z.string().email("Email noto‘g‘ri kiritilgan"),
  password: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo‘lishi kerak"),
});
