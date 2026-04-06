import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/users";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
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
    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }


    const higherScoresCount = await User.countDocuments({
      topscore: { $gt: user.topscore }
    });
    
    const rank = higherScoresCount + 1;
 
    return NextResponse.json({ 
      user, 
      rank 
    }, { status: 200 });

  } catch (e: any) {
    return NextResponse.json(
      { message: "Error: " + e.message },
      { status: 500 }
    );
  }
};