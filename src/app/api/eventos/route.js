import executeQuery from "@/app/lib/db";
import base64Img from "base64-img";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  try {
    base64Img.img(
      body.foto_evento,
      `public/fotos_eventos`,
      `${body.nombre_evento}`,
      (err, filepath) => {}
    );
    const result = await executeQuery({
      query:
        "INSERT INTO evento (nombre_evento, foto_evento, empresa) values(?, ?, ?)",
      values: [
        body.nombre_evento,
        `/fotos_eventos/${body.nombre_evento}.jpg`,
        body.empresa,
      ],
    });
    return NextResponse.json(
      { message: "Evento Satisfactoriamente Creado" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await executeQuery({
      query: "SELECT * FROM evento",
    });
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
