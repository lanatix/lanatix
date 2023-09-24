import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id, attendeeData } = await req.json();

  try {
    const attended = await prisma.event.update({
      where: { id },
      data: {
        attended: {
          push: attendeeData,
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Attendance confirmed",
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "An Error has occurred" },
      { status: 500 }
    );
  }
};
