"use server";

import { signJwt } from "@/lib/jwt";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { IUserDB } from "@/types";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function createUser(data: IUserDB) {
  try {
    await connectToDatabase();

    const existing = await User.findOne({ email: data.email });
    if (existing) {
      return { status: 400, data: null, message: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      ...data,
      password: hashedPassword,
    });

    const token = signJwt({ userId: user._id, email: user.email });

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { status: 200, data: JSON.parse(JSON.stringify({ user, token })), message: "User created successfully" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { status: 500, data: null, message: "Error creating user" };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    console.log("asd");
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      return { status: 401, data: null, message: "Invalid credentials" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 401, data: null, message: "Invalid credentials" };
    }

    const token = signJwt({ userId: user._id, email: user.email });

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { status: 200, data: JSON.parse(JSON.stringify({ user, token })), message: "Login successful" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { status: 500, data: null, message: "Error logging in" };
  }
}

export async function getUsers() {
  try {
    await connectToDatabase();
    const users = await User.find();
    return { status: 200, data: JSON.parse(JSON.stringify(users)), message: "Users fetched successfully" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { status: 500, data: null, message: "Error getting users" };
  }
}

export async function getUser(id: string) {
  try {
    await connectToDatabase();
    const user = await User.findById(id);
    return { status: 200, data: JSON.parse(JSON.stringify(user)), message: "User fetched successfully" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { status: 500, data: null, message: "Error getting user" };
  }
}
