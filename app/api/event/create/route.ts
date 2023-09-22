import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const payload = await req.json();

  try {
    const created = prisma.event.create({ data: payload });

    return NextResponse.json(
      {
        success: true,
        message: "Event created successfully",
        data: created,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "A server error has occured", error: err },
      { status: 500 }
    );
  }
};
