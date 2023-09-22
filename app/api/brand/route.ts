import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * This function is responsible for brand log in
 * @param req
 * @returns
 */
export const POST = async (req: NextRequest) => {
  const { id, walletAddress, ...payload } = await req.json();
  try {
    const brand = await prisma.brand.findUnique({ where: { walletAddress } });

    if (!brand)
      return NextResponse.json(
        { success: false, message: "Account does not exist" },
        { status: 400 }
      );

    return NextResponse.json(
      { success: true, message: "Log in Successful", data: brand },
      { status: 200 }
    );
  } catch (err) {
    NextResponse.json(
      { success: false, message: "A server error has occured", error: err },
      { status: 500 }
    );
  }
};
