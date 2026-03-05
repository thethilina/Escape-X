import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/users";

export const GET = async () => {
  try {
    await connect();

    const users = await User.find({})
      .select("-password -history") 
      .sort({ topscore: -1 })
      .lean();

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
      level: user.level,
      topscore: user.topscore,
    }));

    const topThree = leaderboard.slice(0, 3);

    return NextResponse.json(
      {
        topThree,
        leaderboard,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
};