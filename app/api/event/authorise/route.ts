import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  const { fullName, passphrase, walletAddress, owner, uniqueName } =
    await req.json();

  try {
    const event = await prisma.event.findUnique({
      where: {
        owner_uniqueName: {
          owner,
          uniqueName,
        },
      },
    });

    const authorised = await bcrypt.compare(passphrase, event?.adminPassword!);

    if (!authorised) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect Passphrase provided",
        },
        { status: 401 },
      );
    }

    if (event?.admins.filter((item: any) => item?.walletAddress === walletAddress).length !== 0) {
      return NextResponse.json({ success: true, message: "You are already an admin" }, { status: 201 })
    }

    const updateEvent = await prisma.event.update({
      where: {
        owner_uniqueName: {
          owner,
          uniqueName,
        },
      },
      data: {
        admins: {
          push: { fullName, walletAddress },
        },
      },
    });
    return NextResponse.json(
      { success: true, message: "Authorization successful" },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "A server error has occured", error: err },
      { status: 500 },
    );
  }
};
