import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  const { uniqueName, adminPassword, ...payload } = await req.json();

  try {
    const alreadyExist = await prisma.event.findUnique({
      where: {
        uniqueName,
      },
    });

    if (alreadyExist) {
      return NextResponse.json(
        { success: false, message: "Event with unique name already exists" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const created = await prisma.event.create({
      data: { uniqueName, adminPassword: hashedPassword, ...payload },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Event created successfully",
        data: created,
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
