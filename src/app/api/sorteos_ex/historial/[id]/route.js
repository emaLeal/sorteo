import { NextResponse } from "next/server";
import executeQuery from "@/lib/db";
export async function GET(req, params) {
  const { id } = params.params;
  try {
    const query = `SELECT 
        h.id, 
        p.nombre, 
        p.cedula, 
        s.nombre as sorteo_nombre,
        e.nombre_evento FROM 
        historial h INNER JOIN participantes p ON p.evento_id=h.evento_id
        INNER JOIN sorteos s ON s.evento_id=p.evento_id
        INNER JOIN exclusividad_sorteo es ON p.id=es.participante_id
        INNER JOIN evento e ON e.id=h.evento_id
        WHERE h.sorteo_id=?`;
    const data = await executeQuery({ query, values: [id] });
    return NextResponse.json({ data }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ e }, { status: 400 });
  }
}

export async function DELETE(req, params) {
  const { id } = params.params;
  try {
    const query = `DELETE FROM historial WHERE id=?`;
    const del = await executeQuery({ query, values: [id] });
    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
