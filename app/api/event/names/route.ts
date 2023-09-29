import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const owner = req.nextUrl.searchParams.get("owner")!;

  try {
    const usernames = await prisma.event.findMany({
      where: {
        owner,
      },
      select: {
        uniqueName: true,
      },
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
      { success: false, message: "A server error has occcured", error: err },
      { status: 500 }
    );
  }
};
