import { sendTicketEmail } from "@/utils/mailer";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export const POST = async (req: NextRequest) => {
  const { owner, uniqueName, email, fullName, answers } = await req.json();

  try {
    let img = await QRCode.toDataURL(JSON.stringify({ fullName, email }));

    const event = await prisma.event.findUnique({
      where: {
        owner_uniqueName: {
          owner,
          uniqueName,
        },
      },
      select: {
        registered: true,
        title: true,
      },
    });

    if (!event) {
      return NextResponse.json(
        { success: false, message: "Event does not exist" },
        { status: 401 },
      );
    }

    if (
      event.registered.filter((item: any) => item?.email === email).length !== 0
    ) {
      return NextResponse.json(
        { success: false, message: "User with this email already registered" },
        { status: 401 },
      );
    }

    const registered = await prisma.event.update({
      where: {
        owner_uniqueName: {
          owner,
          uniqueName,
        },
      },
      data: {
        registered: {
          push: { fullName, email, answers },
        },
      },
    });

    await sendTicketEmail(email, img, event.title);
    return NextResponse.json(
      {
        success: true,
        message: `Successfully registered to ${registered.title}. Your ticket has been sent to your email.`,
        data: { image: img },
      },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "A server error occured", error: err },
      { status: 500 },
    );
  }
};
