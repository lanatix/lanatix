import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const name = await req.nextUrl.searchParams.get("name")!;
  const owner = await req.nextUrl.searchParams.get("owner")!

  try {
    const event = await prisma.event.findUnique({
      where: {
        owner_uniqueName: {
          owner,
          uniqueName: name
        }
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
