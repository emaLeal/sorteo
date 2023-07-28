import executeQuery from "@/app/lib/db";
import { NextResponse } from "next/server";
import base64Img from "base64-img";
import { unlink } from "fs";
import formatString from "@/app/lib/formatString";



export async function DELETE(req, params) {
  const { id } = params.params;
  try {
    const result = await executeQuery({
      query: "DELETE FROM sorteos WHERE id=?",
      values: [id],
    });
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
      query: "SELECT * from participantes where evento_id=? and participara=?",
      values: [result[0].evento_id, true],
    });

    const sort = participantes.map(async (part) => {
      const ganador = await executeQuery({
        query: "select * from sorteos where ganador_id=?",
        values: [part.id],
      });
      if (ganador.length === 0) {
        return part;
      }
    });

    const re = await Promise.all(sort);

    return NextResponse.json(
      { data: data[0], participantes: re },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(req, params) {
  const { id } = params.params;
  const body = await req.json();

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

    const act = await executeQuery({
      query: "UPDATE sorteos set nombre=?, premio=?, premio_foto=? where id=?",
      values: [body.nombre, body.premio, imgUrlPremio, id],
    });

    return NextResponse.json(
      { message: "Sorteo Actualizado" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
