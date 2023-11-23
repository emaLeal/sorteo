import { NextResponse } from "next/server";
import executeQuery from "@/lib/db";

export async function GET(req, params) {
  const { sorteo } = params.params;

  const participante = await executeQuery({
    query: `SELECT p.id,
      p.nombre,
      p.cargo,
      p.correo,
      p.foto,
      p.evento_id,
      p.cedula,
      es.habilitado
      FROM participantes p INNER JOIN exclusividad_sorteo es ON p.id = es.participante_id 
      INNER JOIN sorteos s ON es.sorteo_id = s.id WHERE s.id = ?`,
    values: [sorteo],
  });

  return NextResponse.json({ data: participante });
}
