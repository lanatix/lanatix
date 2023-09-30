import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export const POST = async (req: NextRequest) => {
  const { fullName, owner, uniqueName, email } = await req.json();

  try {
    const event = await prisma.event.findUnique({
      where: {
        owner_uniqueName: {
          owner,
          uniqueName,
        },
      },
      select: {
        registered: true,
        attended: true,
        title: true,
      },
    });

    if (
      event?.registered.filter((item: any) => item?.email === email).length !==
      0
    ) {
      const attend = await prisma.event.update({
        where: {
          owner_uniqueName: {
            owner,
            uniqueName,
          },
        },
        data: {
          attended: {
            push: { fullName, email },
          },
        },
      });

      return NextResponse.json(
        { success: true, message: `Welcome to ${event?.title}` },
        { status: 201 },
      );
    } else {
      return NextResponse.json(
        { success: false, message: "User didn't register for the event" },
        { status: 401 },
      );
    }
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "A server error has occured", error: err },
      { status: 500 },
    );
  }
};
