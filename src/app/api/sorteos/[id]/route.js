import executeQuery from "@/app/lib/db";
import { NextResponse } from "next/server";

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
      if (sort.pregunta === 1) {
        const preguntas = await executeQuery({
          query: "Select * from preguntas where sorteo_id=?",
          values: [sort.id],
        });
        if (gan.length === 1) {
          return {
            ...sort,
            nombre_ganador: gan[0].nombre,
            correo_ganador: gan[0].correo,
            imagen_ganador: gan[0].foto,
            dataPregunta: preguntas[0],
          };
        } else {
          return {
            ...sort,
            nombre_ganador: null,
            correo_ganador: null,
            imagen_ganador: null,
            dataPreguntas: preguntas[0],
          };
        }
      } else {
        if (gan.length === 1) {
          return {
            ...sort,
            nombre_ganador: gan[0].nombre,
            correo_ganador: gan[0].correo,
            imagen_ganador: gan[0].foto,
          };
        } else {
          return {
            ...sort,
            nombre_ganador: null,
            correo_ganador: null,
            imagen_ganador: null,
          };
        }
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
