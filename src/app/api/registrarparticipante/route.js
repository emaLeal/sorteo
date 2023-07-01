import executeQuery from "@/app/lib/db";
import base64Img from "base64-img";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const body = await req.json();
  try {
    base64Img.img(
      body.foto,
      `public/fotos_participantes`,
      `${body.nombre}`,
      (err, filepath) => {}
    );
    const result = await executeQuery({
      query: "UPDATE participantes SET foto=?, participara=? WHERE cedula=?",
      values: [`/fotos_participantes/${body.nombre}.jpg`, true, body.cedula],
    });
    return NextResponse.json(
      { message: "Participante Registrado" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
