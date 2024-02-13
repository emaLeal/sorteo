import executeQuery from "@/lib/db";
import { NextResponse } from "next/server";
import base64Img from "base64-img";
import { unlink } from "fs";
import formatString from "@/lib/formatString";
import { revalidatePath } from "next/cache";

export async function DELETE(req, params) {
  const { id } = params.params;
  try {
    const sorteo = await executeQuery({
      query: "SELECT * FROM sorteos WHERE id=?",
      values: [id],
    });
    const delParticipantes = await executeQuery({
      query: "DELETE from exclusividad_sorteo where sorteo_id=?",
      values: [id],
    });

    const result = await executeQuery({
      query: "DELETE FROM sorteos WHERE id=?",
      values: [id],
    });

    if (sorteo[0].pregunta === true) {
      const delPregunta = await executeQuery({
        query: "delete from preguntas where sorteo_id=?",
        values: [id],
      });
    }
    unlink("img" + sorteo[0].premio_foto, (err) => {
      console.log(err);
    });
    revalidatePath(`/admin-hub/gestionarevento/[id]/sorteos`);
    return NextResponse.json(
      { message: "Eliminado con exito" },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ e }, { status: 500 });
  }
}

export async function GET(req, params) {
  const { id } = params.params;
 
  try {
    const result = await executeQuery({
      query: "SELECT * FROM sorteos WHERE id=?",
      values: [id],
    });

    const participantes = await executeQuery({
      query:
        "select * from participantes p where p.evento_id=? and p.participara=? and not exists(select 1 from sorteos s where s.ganador_id=p.id)",
      values: [result[0].evento_id, true],
    });

    if (result[0].pregunta === 1) {
      const pregunta = await executeQuery({
        query: "SELECT * FROM preguntas where sorteo_id=?",
        values: [id],
      });
      console.log(result);

      return NextResponse.json(
        { data: result[0], participantes, pregunta: pregunta[0] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { data: result[0], participantes },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(req, params) {
  const { id } = params.params;
  const body = await req.json();
  console.log(body);

  try {
    const result = await executeQuery({
      query: "SELECT * FROM sorteos where id=?",
      values: [id],
    });

    let imgUrlPremio = body.premio_foto;

    if (result[0].premio_foto !== body.premio_foto) {
      const imgPremioSorteo = base64Img.imgSync(
        body.premio_foto,
        "img/fotos_sorteos",
        body.nombre
      );

      imgUrlPremio = formatString(imgPremioSorteo);
      const premio_foto = result[0].premio_foto;
      if (imgUrlPremio !== premio_foto) {
        unlink(`img${premio_foto}`, (err) => {
          if (err) throw err;
        });
      }
    }

    if (body.pregunta === true) {
      const selPregunta = await executeQuery({
        query: "select * from preguntas where sorteo_id=?",
        values: [id],
      });
      if (selPregunta.length > 0) {
        const pregunta = await executeQuery({
          query:
            "UPDATE preguntas set pregunta=?, opcion1=?, opcion2=?, opcion3=?, opcion4=?, opcion_verdadera=? where sorteo_id=?",
          values: [
            body.preguntalabel,
            body.opcion1,
            body.opcion2,
            body.opcion3,
            body.opcion4,
            body.opcion_verdadera,
            id,
          ],
        });
      } else {
        const pregunta = await executeQuery({
          query:
            "insert into preguntas (pregunta, opcion1, opcion2, opcion3, opcion4, opcion_verdadera, sorteo_id) values (?, ?, ?, ?, ?, ?, ?)",
          values: [
            body.preguntalabel,
            body.opcion1,
            body.opcion2,
            body.opcion3,
            body.opcion4,
            body.opcion_verdadera,
            id,
          ],
        });
      }
    } else {
      if (result[0].pregunta === 1) {
        const delPregunta = await executeQuery({
          query: "DELETE from preguntas where sorteo_id=?",
          values: [id],
        });
      }
    }

    const act = await executeQuery({
      query:
        "UPDATE sorteos set nombre=?, premio=?, premio_foto=?, pregunta=? where id=?",
      values: [body.nombre, body.premio, imgUrlPremio, body.pregunta, id],
    });
    revalidatePath(`/admin-hub/gestionarevento/[id]/sorteos`);
    return NextResponse.json(
      { message: "Sorteo Actualizado" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
