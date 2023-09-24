import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const name = req.nextUrl.searchParams.get("name")!;
  const adminWallet = req.nextUrl.searchParams.get("walletAddress");

  try {
    const event = await prisma.event.findUnique({
      where: {
        uniqueName: name,
        admins: {
          has: adminWallet,
        },
      },
    });
    if (!event) {
      return NextResponse.json(
        { success: false, message: "You are not an admin" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Your Admin status has been validated" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err, message: "An error has occurred" },
      { status: 500 }
    );
  }
};
