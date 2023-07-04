import executeQuery from "@/app/lib/db";
import { NextResponse } from "next/server";

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
    console.log(e)
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
      { data: result[0], participantes: re },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
