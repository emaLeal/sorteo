import { NextResponse } from "next/server";
import executeQuery from '@/lib/db'

/*
select * from participantes p where p.evento_id=? and not exists(select 1 from sorteos s where s.ganador_id=p.id)
*/ 

export async function GET(req, params) {
  const { id } = params.params;

  try {
    const result = await executeQuery({
      query: "SELECT * FROM sorteos WHERE evento_id=?",
      values: [id],
    });
    const concPart = result.map(async (sort) => {
      const gan = await executeQuery({
        query: "select * from participantes p where p.evento_id=? and not exists(select 1 from sorteos s where s.ganador_id=p.id)",
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
            dataPregunta: {
              id: preguntas[0].id,
              preguntalabel: preguntas[0].pregunta,
              opcion1: preguntas[0].opcion1,
              opcion2: preguntas[0].opcion2,
              opcion3: preguntas[0].opcion3,
              opcion4: preguntas[0].opcion4,
              opcion_verdadera: preguntas[0].opcion_verdadera,
              sorteo_id: preguntas[0].sorteo_id,
            }
          };
        } else {
          return {
            ...sort,
            nombre_ganador: null,
            correo_ganador: null,
            imagen_ganador: null,
            dataPreguntas: {
              id: preguntas[0].id,
              preguntalabel: preguntas[0].pregunta,
              opcion1: preguntas[0].opcion1,
              opcion2: preguntas[0].opcion2,
              opcion3: preguntas[0].opcion3,
              opcion4: preguntas[0].opcion4,
              opcion_verdadera: preguntas[0].opcion_verdadera,
              sorteo_id: preguntas[0].sorteo_id,
            },
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
    console.log(e)
    return NextResponse.json({ e }, { status: 500 });
  }
}
