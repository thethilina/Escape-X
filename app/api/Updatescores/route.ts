import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/users";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

function getLevel(score: number) {
  if (score >= 10000) return "Platinum";
  if (score >= 6000) return "Gold";
  if (score >= 3000) return "Silver";
  if (score >= 1000) return "Bronze";
  return "Beginner";
}

export const POST = async (request: Request) => {
  try {
    await connect();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "No token" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id; 

    const body = await request.json();
    const { score } = body;

    if (score === undefined) {
      return NextResponse.json(
        { message: "Missing score" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    user.history.push({
      date: new Date(),
      time: new Date().toLocaleTimeString(),
      score: score,
    });

    if (score > user.topscore) {
      user.topscore = score;
      user.level = getLevel(score);
    }

    await user.save();

    return NextResponse.json(
      {
        message: "Game result saved successfully",
        topscore: user.topscore,
        level: user.level,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
};