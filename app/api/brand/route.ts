import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * This function is responsible for brand log in
 * @param req
 * @returns
 */
export const POST = async (req: NextRequest) => {
  const { walletAddress } = await req.json();
  try {
    const brand = await prisma.brand.findUnique({ where: { walletAddress } });
    if (!brand) {
      return NextResponse.json(
        { success: false, message: "Account does not exist" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Signed in successfully", data: brand },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "A server error has occured", error: err },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const walletAddress: string | undefined =
    req.nextUrl.searchParams.get("wallet")!;

  try {
    const brand = await prisma.brand.findUnique({ where: { walletAddress } });

    return NextResponse.json(
      {
        success: true,
        message: "Brand details fetched successfully",
        data: brand,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "A server error has occured", error: err },
      { status: 500 }
    );
  }
};
