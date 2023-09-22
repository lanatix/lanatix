import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * This function is responsible for the brand account creation
 * @param req
 * @returns
 */
export const POST = async (req: NextRequest) => {
  const { walletAddress, username, ...payload } = await req.json();
  try {
    const alreadyExisting = await prisma.brand.findUnique({
      where: { walletAddress },
    });
    if (alreadyExisting)
      return NextResponse.json(
        {
          success: true,
          message: "Account already exists",
          data: alreadyExisting,
        },
        { status: 201 }
      );

    const brand = await prisma.brand.create({
      data: { walletAddress, username, ...payload },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        data: brand,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "A server error has occured", error: err },
      { status: 401 }
    );
  }
};
