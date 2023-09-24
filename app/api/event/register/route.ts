import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { walletAddress, ...payload } = await req.json();

  try {
    const event = await prisma.event.findUnique({
      where: { owner: walletAddress },
    });

    if (!event) {
      return NextResponse.json(
        { success: false, message: "Event does not exist" },
        { status: 401 }
      );
    }
    const registered = await prisma.event.update({
      where: { owner: walletAddress },
      data: {
        registered: {
          push: { walletAddress, ...payload },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Successfully registered to ${registered.title}. Your ticket has been sent to your email.`,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: true, message: "A server error occured", error: err },
      { status: 500 }
    );
  }
};
