import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export const POST = async (req: NextRequest) => {
  const { id, fullName, email } = await req.json();

  try {
    const event = await prisma.event.findUnique({
      where: {
        id,
      },
      select: {
        registered: true,
        title: true,
      },
    });

    if (
      event?.registered.filter((item: any) => item?.email === email).length !==
      0
    ) {
      const filteredRegisteredList: any = event?.registered.filter(
        (item: any) => {
          if (item?.email === email) {
            item.attended = true;
          }
          return true;
        }
      );

      const attend = await prisma.event.update({
        where: {
          id,
        },
        data: {
          registered: filteredRegisteredList,
        },
      });

      return NextResponse.json(
        { success: true, message: `Welcome ${fullName}!` },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "User didn't register for the event" },
        { status: 401 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "A server error has occured", error: err },
      { status: 500 }
    );
  }
};
