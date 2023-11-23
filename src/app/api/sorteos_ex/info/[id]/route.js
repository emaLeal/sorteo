import executeQuery from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, params) {
  const { id } = params.params;
  /*
select * from participantes p where p.evento_id=? and participara=? and not exists(select 1 from sorteos s where s.ganador_id=p.id)
*/
  try {
    const result = await executeQuery({
      query: "SELECT * FROM sorteos WHERE id=?",
      values: [id],
    });
    
    const participantes = await executeQuery({
      query: `SELECT p.id,
        p.nombre,
        p.cargo,
        p.correo,
        p.foto,
        p.evento_id,
        p.cedula,
        es.habilitado
        FROM participantes p INNER JOIN exclusividad_sorteo es ON p.id = es.participante_id 
        INNER JOIN sorteos s ON es.sorteo_id=s.id WHERE s.id = ? and es.habilitado=?`,
      values: [id, true],
    });
    console.log(participantes)

    if (result[0].pregunta === 1) {
      const pregunta = await executeQuery({
        query: "SELECT * FROM preguntas where sorteo_id=?",
        values: [id],
      });
      console.log(result)

      return NextResponse.json(
        { data: result[0], participantes, pregunta: pregunta[0] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { data: result[0], participantes},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}