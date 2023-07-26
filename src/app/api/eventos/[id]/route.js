import executeQuery from "@/app/lib/db";
import { NextResponse } from "next/server";
import base64Img from "base64-img";
import { unlink } from "fs";
import formatString from "@/app/lib/formatString";

export async function GET(req, params) {
  const { id } = params.params;
  try {
    const result = await executeQuery({
      query: "SELECT * FROM evento WHERE id=?",
      values: [id],
    });
    const data = result.filter((evento) => {
      evento.foto_evento = base64Img.base64Sync("public" + evento.foto_evento);
      evento.foto_empresa = base64Img.base64Sync(
        "public" + evento.foto_empresa
      );
      return evento;
    });
    return NextResponse.json({ data: data[0] }, { status: 200 });
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
        body.nombre_evento + Date.now()
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

    const sorteos = await executeQuery({
      query: "SELECT * FROM sorteos where evento_id=?",
      values: [id],
    });

    sorteos.forEach((sorteo) => {
      unlink("public" + sorteo.premio_foto, (err) => {
        if (err) throw err;
      });
    });


    const participantes = await executeQuery({
      query: "SELECT * FROM participantes where evento_id=?",
      values: [id],
    });

    participantes.forEach((participante) => {
      if (participante.foto !== "/user.png") {
        unlink("public" + participante.foto);
      }
    });

    const delSorteo = await executeQuery({
      query: "DELETE from sorteos where evento_id=?",
      values: [id],
    });

    const delParticipantes = await executeQuery({
      query: "DELETE FROM participantes where evento_id=?",
      values: [id],
    });

    const result = await executeQuery({
      query: "DELETE FROM evento where id=?",
      values: [id],
    });
    console.log(result);

    return NextResponse.json({ message: "Evento Eliminado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
