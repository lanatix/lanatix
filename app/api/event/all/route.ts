import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const owner = req.nextUrl.searchParams.get("owner")!;

  try {
    const events = await prisma.event.findMany({
      where: {
        owner,
      },
    });

    return NextResponse.json(
      { success: true, message: "Events fetched successfully", data: events },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "A server error has occured" },
      { status: 500 },
    );
  }
};
