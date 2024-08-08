import executeQuery from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, params) {
  const { id } = params.params;
  const data = await executeQuery({
    query: `select 
    h.id,
    p.nombre,
    p.cedula,
    e.nombre_evento,
    s.nombre
    from historial h inner join participantes p on h.evento_id=p.evento_id
    inner join sorteos s on s.evento_id=p.evento_id
    inner join evento e on e.id=p.evento_id where h.evento_id=?
    `,
    values: [id],
  });

  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(req, params) {
  const body = await req.json();
  const select =
    "select * from historial where participante_id=? and evento_id=?";

  const exists = await executeQuery({
    query: select,
    values: [body.participante_id, body.evento_id],
  });
  if (exists.length === 0) {
    try {
      const query =
        "sorteo_id" in body
          ? "insert into historial (evento_id, sorteo_id, participante_id) values (?,?,?)"
          : "insert into historial (evento_id, participante_id) values (?,?)";
      let insert;
      if ("sorteo_id" in body) {
        insert = await executeQuery({
          query,
          values: [body.evento_id, body.sorteo_id, body.participante_id],
        });
      } else {
        insert = await executeQuery({
          query,
          values: [body.evento_id, body.participante_id],
        });
      }
      return NextResponse.json({ message: "Ok" }, { status: 201 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 400 });
    }
  } else {
    return NextResponse.json({ message: "Ya existe" }, { status: 400 });
  }
}
