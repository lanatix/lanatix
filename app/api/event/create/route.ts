import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  const { questions, owner, title, description, location, date, time, images } =
    await req.json();

  try {
    const created = await prisma.event.create({
      data: {
        owner,
        registered: [],
        images,
        title,
        location,
        description,
        date,
        time,
        questions: questions ? questions : [],
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Event created successfully",
        data: { id: created.id },
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "A server error has occured", error: err },
      { status: 500 }
    );
  }
};
