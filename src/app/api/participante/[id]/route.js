import { revalidatePath } from "next/cache";
import executeQuery from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, params) {
  const { id } = params.params;
  try {
    const data = await executeQuery({
      query: `SELECT * FROM participantes p where 
        p.evento_id=? and not exists
        (select 1 from exclusividad_sorteo ex where ex.participante_id=p.id)`,
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
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "El participante no existe" },
        { status: 404 }
      );
    }
    revalidatePath("/admin-hub/gestionarevento/[id]/participantes");
    return NextResponse.json(
      { message: "Participante eliminado" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar participante", details: error },
      { status: 500 }
    );
  }
}
