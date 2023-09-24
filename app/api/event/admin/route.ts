import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const GET = async (req: NextRequest) => {
  const name = await req.nextUrl.searchParams.get("name")!;

  try {
    const foundAdmins = await prisma.event.findUnique({
      where: {
        uniqueName: name,
      },
      select: {
        admins: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admins fetched successfully",
        data: foundAdmins,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "An error has occured", error: err },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  const { adminData, password } = await req.json();
  const name = req.nextUrl.searchParams.get("name")!;

  try {
    const event = await prisma.event.findUnique({
      where: {
        uniqueName: name,
      },
    });

    const validated = await bcrypt.compare(password, event?.adminPassword!);

    if (validated) {
      const updatedEvent = await prisma.event.update({
        where: {
          uniqueName: name,
        },
        data: {
          admins: {
            push: adminData,
          },
        },
      });
      return NextResponse.json(
        {
          success: true,
          message: "You have successfully been registered as an admin",
        },
        { status: 401 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Wrong Admin Password" },
        { status: 401 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "An error has occured", success: false, error: err },
      { status: 500 }
    );
  }
};
