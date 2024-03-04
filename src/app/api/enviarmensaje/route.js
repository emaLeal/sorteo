import executeQuery from "@/lib/db";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/sendMail";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const body = await req.json();
  const htmlContent = await fs.promises.readFile(
    "./public/correo.html",
    "utf-8"
  );
  const participantes = await executeQuery({
    query: "SELECT * from participantes where evento_id=?",
    values: [body.evento],
  });
  let to = "";
  participantes.forEach((e) => (to += e.correo + ","));
  const options = {
    from: "Tu Nombre <tu_correo@gmail.com>",
    to,
    subject: "Bienvenido a Smartie",
    html: htmlContent,
  };
  sendEmail(options);
  return NextResponse.json({ message: "D:" }, { status: 200 });
}
