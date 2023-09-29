import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  const {
    uniqueName,
    owner,
    adminPassword,
    title,
    description,
    location,
    date,
    time,
    images,
  } = await req.json();

  try {
    const alreadyExist = await prisma.event.findUnique({
      where: {
        owner_uniqueName: {
          owner,
          uniqueName,
        },
      },
    });

    if (alreadyExist) {
      return NextResponse.json(
        { success: false, message: "Event with unique name already exists" },
        { status: 401 },
      );
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const created = await prisma.event.create({
      data: {
        uniqueName,
        owner,
        adminPassword: hashedPassword,
        registered: [],
        admins: [],
        images,
        attended: [],
        title,
        location,
        description,
        date,
        time,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Event created successfully",
      },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "A server error has occured", error: err },
      { status: 500 },
    );
  }
};
