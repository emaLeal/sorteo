import { NextResponse } from "next/server";
import { print, getPrinters } from "pdf-to-printer";
import multer from "multer";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  const printers = await getPrinters()
  console.log(printers.length);

  return NextResponse.json({ message: "ok" }, { status: 200 });
}
