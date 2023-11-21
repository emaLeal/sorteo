import { NextResponse } from "next/server";
import executeQuery from "@/lib/db";

export async function GET(req, params) {
  const { evento, sorteo } = params.params;

  const participante = await executeQuery({
    query:
      "SELECT p.* FROM participantes p INNER JOIN exclusividad_sorteo es ON p.id = es.participante_id INNER JOIN sorteos s ON es.sorteo_id = s.id WHERE s.id = ?",
    values: [sorteo],
  });
  console.log(participante);

  return NextResponse.json({ data: participante });
}
