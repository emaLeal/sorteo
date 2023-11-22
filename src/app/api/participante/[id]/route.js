import { revalidatePath } from 'next/cache';
import executeQuery from '@/lib/db'
import { NextResponse } from "next/server";
/* SELECT *
FROM participantes p
WHERE p.id_evento = 'x'
AND NOT EXISTS (
    SELECT 1
    FROM otra_tabla o
    WHERE o.id_participante = p.id_participante
);*/

export async function GET(req, params) {
  const { id } = params.params;
  try {
    const data = await executeQuery({
      query: "SELECT * FROM participantes p where p.evento_id=? and not exists(select 1 from exclusividad_sorteo ex where ex.participante_id=p.id)",
      values: [id],
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req, params) {
  const { id } = params.params;
  try {
    const result = await executeQuery({
      query: "DELETE FROM participantes where id=?",
      values: [id],
    });
    revalidatePath("/admin-hub/gestionarevento/[id]/participantes");
    return NextResponse.json(
      { message: "Participante eliminado" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
