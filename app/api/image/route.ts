import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";

export async function POST(req: NextRequest) {
  const { image } = await req.json();

  try {
    const data = await cloudinary.uploader.upload(image);
    return NextResponse.json({success: true, message: "Image uploaded successfully", data}, {status: 201});
  } catch (err) {
    return NextResponse.json({success: false, message: "A server error has occured", error: err}, {status: 500});
  }
}
