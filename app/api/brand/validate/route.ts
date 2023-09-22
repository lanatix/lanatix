import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { username }: any = req.nextUrl.searchParams;
  try {
    const unavailable = await prisma.brand.findUnique({ where: { username } });
    if (unavailable) {
      return NextResponse.json(
        { success: false, message: "Username already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Username is available" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "A server error has occured" },
      { status: 500 }
    );
  }
};
