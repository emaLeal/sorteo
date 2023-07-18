import executeQuery from "@/app/lib/db";
import { base64Sync } from "base64-img";

const { NextResponse } = require("next/server");

export async function GET(req, params) {
  const { id } = params.params;

  try {
    const result = await executeQuery({
      query: "SELECT * FROM sorteos WHERE evento_id=?",
      values: [id],
    });
    const concPart = result.map(async (sort) => {
      const gan = await executeQuery({
        query: "select * from participantes where id=?",
        values: [sort.ganador_id],
      });
      sort.premio_foto = base64Sync("public" + sort.premio_foto);
      if (gan.length === 1) {
        return {
          ...sort,
          nombre_ganador: gan[0].nombre,
          correo_ganador: gan[0].correo,
        };
      } else {
        return { ...sort, nombre_ganador: null, correo_ganador: null };
      }
    });
    const ev = await executeQuery({
      query: "SELECT * FROM evento WHERE id=?",
      values: [id],
    });
    const sorteoParticipantes = await Promise.all(concPart);

    return NextResponse.json(
      { data: sorteoParticipantes, nombre_evento: ev[0].nombre_evento },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
}
