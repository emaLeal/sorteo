import executeQuery from "@/lib/db";
import { NextResponse } from "next/server";
import base64Img from "base64-img";
import { unlink } from "fs";
import formatString from "@/lib/formatString";
import { revalidatePath } from "next/cache";

export async function GET(req, params) {
  const { id } = params.params;
  try {
    const data = await executeQuery({
      query: "SELECT * FROM evento WHERE id=?",
      values: [id],
    });

    if (data.length === 0) throw 404;

    return NextResponse.json({ data: data[0] }, { status: 200 });
  } catch (error) {
    if (error === 404)
      return NextResponse.json(
        { message: "No se ha encontrado este evento" },
        { status: 404 }
      );
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

    if (select.length === 0) throw 404;

    let imgEmpresa = body.foto_empresa;
    let imgEvento = body.foto_evento;

    if (select[0].foto_evento !== body.foto_evento) {
      unlink("img" + select[0].foto_evento, (err) => {
        if (err) throw err;
      });
      const img = base64Img.imgSync(
        body.foto_evento,
        `img/fotos_eventos`,
        body.nombre_evento + Date.now()
      );

      imgEvento = formatString(img);
    }

    if (select[0].foto_empresa !== body.foto_empresa) {
      unlink("img" + select[0].foto_empresa, (err) => {
        if (err) throw err;
      });
      const img = base64Img.imgSync(
        body.foto_empresa,
        `img/fotos_empresas`,
        body.empresa
      );

      imgEmpresa = formatString(img);
    }

    const result = await executeQuery({
      query:
        "UPDATE evento SET nombre_evento=?, foto_evento=?, empresa=?, foto_empresa=? WHERE id=?",
      values: [body.nombre_evento, imgEvento, body.empresa, imgEmpresa, id],
    });
    revalidatePath("/admin-hub");
    return NextResponse.json(
      { message: "Evento Correctamente Actualizado" },
      { status: 200 }
    );
  } catch (error) {
    if (error === 404)
      return NextResponse.json(
        { message: "No se encontro un evento" },
        { status: 404 }
      );
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

    if (event.length === 0) throw 404;

    let imgEvento = event[0].foto_evento;
    let imgEmpresa = event[0].foto_empresa;
    imgEvento = "img" + imgEvento;
    imgEmpresa = "img" + imgEmpresa;

    const sorteos = await executeQuery({
      query: "SELECT * FROM sorteos where evento_id=?",
      values: [id],
    });

    const participantes = await executeQuery({
      query: "SELECT * FROM participantes where evento_id=?",
      values: [id],
    });

    const delHistorial = await executeQuery({
      query: "DELETE FROM historial WHERE evento_id=?",
      values: [id],
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

    participantes.forEach((participante) => {
      if (participante.foto !== "/user.png") {
        unlink("img" + participante.foto);
      }
    });

    unlink(imgEmpresa, (err) => {
      if (err) throw err;
    });
    unlink(imgEvento, (err) => {
      if (err) throw err;
    });
    sorteos.forEach(async (sorteo) => {
      if (sorteo.pregunta) {
        const delPregunta = await executeQuery({
          query: "DELETE FROM preguntas where sorteo_id=?",
          values: [sorteo.id],
        });
      }
      unlink("img" + sorteo.premio_foto, (err) => {
        if (err) throw err;
      });
      const delExclusivo = await executeQuery({
        query: "DELETE FROM exclusividad_sorteo WHERE sorteo_id=?",
        values: [sorteo.id],
      });
    });
    revalidatePath("/admin-hub");
    return NextResponse.json({ message: "Evento Eliminado" }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error === 404)
      return NextResponse.json(
        { message: "Evento no se ha encontrado" },
        { status: 404 }
      );
    return NextResponse.json({ error }, { status: 500 });
  }
}
