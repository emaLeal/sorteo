import executeQuery from "@/app/lib/db";
import base64Img from "base64-img";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  try {
    let img = base64Img.imgSync(
      body.foto_evento,
      `public/fotos_eventos`,
      `${body.nombre_evento}`
    );
    console.log(img);

    const m = img.replaceAll("\\", "/");
    const imgUrl = m.replace("public", "");
    console.log(imgUrl);

    const result = await executeQuery({
      query:
        "INSERT INTO evento (nombre_evento, foto_evento, empresa) values(?, ?, ?)",
      values: [
        body.nombre_evento,
        imgUrl,
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
