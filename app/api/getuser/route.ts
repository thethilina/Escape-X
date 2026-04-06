import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/users";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get("userid");

    if (!userid || userid === "") {
      return new NextResponse(
        JSON.stringify({ message: "Missing userid" }),
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findOne({ _id: userid });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User not found!" }),
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        user: user,
      },
      { status: 200 }
    );
  } catch (e: any) {
    return new NextResponse(
      JSON.stringify({ message: "Error: " + e.message }),
      { status: 500 }
    );
  }
};