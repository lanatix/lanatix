import { sendTicketEmail } from "@/utils/mailer";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import axios from "axios";
import fetch from "node-fetch";
export const POST = async (req: NextRequest) => {
  const { id, email, fullName, answers, walletAddress } = await req.json();

  const headerConfig = {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: "Bearer 8efa6236ee5c0c.a3ce50dc488e4e669157fc6aa3f5b0b7",
  };

  try {
    let img = await QRCode.toDataURL(JSON.stringify({ fullName, email, id }));

    const event = await prisma.event.findUnique({
      where: {
        id,
      },
      select: {
        registered: true,
        title: true,
      },
    });

    if (!event) {
      return NextResponse.json(
        { success: false, message: "Event does not exist" },
        { status: 401 }
      );
    }

    if (
      event.registered.filter((item: any) => item?.email === email).length !== 0
    ) {
      return NextResponse.json(
        { success: false, message: "User with this email already registered" },
        { status: 401 }
      );
    }

    const registered = await prisma.event.update({
      where: {
        id,
      },
      data: {
        registered: {
          push: {
            fullName,
            email,
            answers,
            attended: false,
          },
        },
      },
    });
    await fetch("https://devnet.underdogprotocol.com/v2/projects/1/nfts", {
      headers: headerConfig,
      method: "POST",
      body: JSON.stringify({
        name: "Test",
        image: img,
        receiverAddress: walletAddress,
        description: `Your Lanatix ticket for ${event.title}`,
      }),
    });
    await sendTicketEmail(email, img, event.title);
    return NextResponse.json(
      {
        success: true,
        message: `Successfully registered to ${registered.title}. Your ticket has been sent to your email.`,
        data: { image: img },
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "A server error occured", error: err },
      { status: 500 }
    );
  }
};
