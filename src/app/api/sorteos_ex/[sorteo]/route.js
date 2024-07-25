import { NextResponse } from "next/server";
import executeQuery from "@/lib/db";
import { revalidatePath } from "next/cache";

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
      es.sorteo_id,
      es.habilitado
      FROM participantes p INNER JOIN exclusividad_sorteo es ON p.id = es.participante_id 
      INNER JOIN sorteos s ON es.sorteo_id = s.id WHERE s.id = ?`,
    values: [sorteo],
  });

  return NextResponse.json({ data: participante });
}

export async function DELETE(req, params) {
  const { sorteo } = params.params;

  const deleteParticipante = await executeQuery({
    query: "delete from exclusividad_sorteo where participante_id=?",
    values: [sorteo],
  });
  revalidatePath(
    "/admin-hub/gestionarevento/[id]/sorteos/exclusividad_sorteo/[sorteo]"
  );
  revalidatePath("/admin-hub/gestionarevento/[id]/participantes");
  return NextResponse.json({ message: ":D" });
}
