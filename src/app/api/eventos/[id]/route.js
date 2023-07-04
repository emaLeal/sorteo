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
    const select = await executeQuery({
      query: "select * from evento where id=?",
      values: [id],
    });
    if (select[0].foto_evento !== body.foto_evento) {
      const img = base64Img.imgSync(
        body.foto_evento,
        `public/fotos_eventos`,
        `body.nombre_evento`
      );

      const m = img.replaceAll("\\", "/");

      const imgUrl = m.replace("public", "");

      const result = await executeQuery({
        query:
          "UPDATE evento SET nombre_evento=?, foto_evento=?, empresa=? WHERE id=?",
        values: [body.nombre_evento, imgUrl, body.empresa, id],
      });
    } else {
      const result = await executeQuery({
        query:
          "UPDATE evento SET nombre_evento=?, foto_evento=?, empresa=? WHERE id=?",
        values: [body.nombre_evento, body.foto_evento, body.empresa, id],
      });
    }

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
    return NextResponse.json({ message: "Evento Eliminado" }, { status: 200  });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
