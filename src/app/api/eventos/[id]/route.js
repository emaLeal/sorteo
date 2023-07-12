import executeQuery from "@/app/lib/db";
import { NextResponse } from "next/server";
import base64Img from "base64-img";
import { unlink } from "fs";

const formatString = (string) => {
  const m = string.replaceAll("\\", "/");
  const formatedString = m.replace("public", "");
  return formatedString;
};

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

    let imgEmpresa = body.foto_empresa;
    let imgEvento = body.foto_evento;

    if (select[0].foto_evento !== body.foto_evento) {
      unlink("public" + select[0].foto_evento, (err) => {
        if (err) throw err;
      });
      const img = base64Img.imgSync(
        body.foto_evento,
        `public/fotos_eventos`,
        body.nombre_evento
      );

      imgEvento = formatString(img);
    }

    if (select[0].foto_empresa !== body.foto_empresa) {
      unlink("public" + select[0].foto_empresa, (err) => {
        if (err) throw err;
      });
      const img = base64Img.imgSync(
        body.foto_empresa,
        `public/fotos_empresas`,
        body.empresa
      );

      imgEmpresa = formatString(img);
    }

    const result = await executeQuery({
      query:
        "UPDATE evento SET nombre_evento=?, foto_evento=?, empresa=?, foto_empresa=? WHERE id=?",
      values: [body.nombre_evento, imgEvento, body.empresa, imgEmpresa, id],
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
    const event = await executeQuery({
      query: "SELECT * FROM evento where id=?",
      values: [id],
    });

    let imgEvento = event[0].foto_evento;
    let imgEmpresa = event[0].foto_empresa;
    imgEvento = "public" + imgEvento;
    imgEmpresa = "public" + imgEmpresa;
    unlink(imgEmpresa, (err) => {
      if (err) throw err;
    });
    unlink(imgEvento, (err) => {
      if (err) throw err;
    });

    const result = await executeQuery({
      query: "DELETE FROM evento WHERE id=?",
      values: [id],
    });
    return NextResponse.json({ message: "Evento Eliminado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
