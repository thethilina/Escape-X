import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/users";
import bcrypt from "bcryptjs"; 
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { username, password, avatar } = body;

    if (!username || !password || !avatar) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    await connect();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ message: "Username already taken" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = new User({
      username,
      avatar,
      password: hashedPassword,
    });

    await newuser.save();

    return NextResponse.json(
      { message: "User Created successfully!", user: { username: newuser.username } }, 
      { status: 201 }
    );

  } catch (e: any) {
    console.error(e.message);
    return NextResponse.json(
      { message: "Error creating user: " + e.message }, 
      { status: 500 }
    );
  }
};