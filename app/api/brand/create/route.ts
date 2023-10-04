import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

/**
 * This function is responsible for the brand account creation
 * @param req
 * @returns
 */
export const POST = async (req: NextRequest) => {
  const { walletAddress, username, password, ...payload } = await req.json();
  try {
    const alreadyExisting = await prisma.brand.findMany({
      where: { walletAddress },
    });
    if (alreadyExisting.length !== 0)
      return NextResponse.json(
        {
          success: true,
          message: "Account already exists",
          data: alreadyExisting,
        },
        { status: 201 }
      );

    const existingUsername = await prisma.brand.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return NextResponse.json(
        { success: false, message: "Username is already taken" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const brand = await prisma.brand.create({
      data: { walletAddress, username, password: hashedPassword, ...payload },
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
