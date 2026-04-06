import { NextResponse } from "next/server";
import connect from "@/lib/db";
import UserModel from "@/lib/models/users";
import { sign } from "jsonwebtoken";
import bcrypt from "bcryptjs"; 

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ message: "Missing values" }, { status: 400 });
    }

    await connect();

    const user = await UserModel.findOne({ username });

    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ message: "Invalid password!" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not defined");

    const payload = { id: user._id.toString() };
    const token = sign(payload, secret, { expiresIn: "7d" });

    const { password: _, ...userSafe } = user.toObject();

    const res = NextResponse.json({ user: userSafe });
    const isProd = process.env.NODE_ENV === "production";

    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: isProd,          
      sameSite: isProd ? "none" : "lax", 
      maxAge: 7 * 24 * 60 * 60, 
    });

    return res;
    
  } catch (e: any) {
    console.error(e.message);
    return NextResponse.json(
      { message: "Error logging in: " + e.message },
      { status: 500 }
    );
  }
};