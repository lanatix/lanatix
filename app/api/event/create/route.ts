import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const POST = async (req: NextRequest) => {
  const { questions, owner, title, description, location, date, time, images } =
    await req.json();
  const headerConfig = {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: "Bearer 8efa6236ee5c0c.a3ce50dc488e4e669157fc6aa3f5b0b7",
  };
  try {
    const created = await prisma.event.create({
      data: {
        owner,
        registered: [],
        images,
        title,
        location,
        description,
        date,
        time,
        questions: questions ? questions : [],
      },
    });
    const underdogDetails: any = await fetch(
      "https://devnet.underdogprotocol.com/v2/projects",
      {
        method: "POST",
        headers: headerConfig,
        body: JSON.stringify({
          name: created.id,
          image: `https://res.cloudinary.com/dls6ysfrf/image/upload/${created.images[0]}`,
        }),
      }
    ).then((res) => res.json());
    await prisma.event.update({
      where: { id: created.id },
      data: {
        underdogDetails,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Event created successfully",
        data: { id: created.id },
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "A server error has occured", error: err },
      { status: 500 }
    );
  }
};
