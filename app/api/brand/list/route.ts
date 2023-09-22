import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const usernames = await prisma.brand.findMany({
      select: { username: true },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Usernames fetched successfully",
        data: usernames,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "A server error occured" },
      { status: 500 }
    );
  }
};
