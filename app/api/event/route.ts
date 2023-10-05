import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get("id")!;

  try {
    const event = await prisma.event.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Event details fetched successfully",
        data: event,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "An error has occured" },
      { status: 500 }
    );
  }
};
