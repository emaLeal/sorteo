import executeQuery from "@/app/lib/db";
import { NextResponse } from "next/server";
import base64Img from "base64-img";

export async function GET(req, params) {
  const { id } = params.params;
  try {
    const result = await executeQuery({
      query: "SELECT * FROM evento WHERE id=?",
      values: [id],
    });
    return NextResponse.json({ data: result[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(req, params) {
  const { id } = params.params;
  const body = await req.json();
  try {
    base64Img.img(
      body.foto_evento,
      `public/fotos_eventos`,
      `${body.nombre_evento}`,
      (err, filepath) => {
      }
    );
    const result = await executeQuery({
      query:
        "UPDATE evento SET nombre_evento=?, foto_evento=?, empresa=? WHERE id=?",
      values: [
        body.nombre_evento,
        `/fotos_eventos/${body.nombre_evento}.jpg`,
        body.empresa,
        id,
      ],
    });
    return NextResponse.json(
      { message: "Evento Correctamente Actualizado" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req, params) {
  const { id } = params.params;
  try {
    const result = await executeQuery({
      query: "DELETE FROM evento WHERE id=?",
      values: [id],
    });
    console.log(result);
    return NextResponse.json({ message: "Evento Eliminado" }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
