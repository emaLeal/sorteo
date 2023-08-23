import executeQuery from '/src/app/lib/db'
import { NextResponse } from "next/server";

export async function PUT(req) {
  const body = await req.json();

  try {
    const result = await executeQuery({
      query:
        "UPDATE sorteos SET ganador_id=?, nombre_ganador=?, jugado=? WHERE id=?",
      values: [body.ganador, body.ganador_nombre, true, body.id],
    });
    console.log(result);
    return NextResponse.json(
      { message: "Sorteo Actualizado" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
