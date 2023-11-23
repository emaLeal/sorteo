import { NextResponse } from "next/server";
import executeQuery from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function POST(req, params) {
  const body = await req.json();

  body.sorteos.forEach(async (element) => {
    const participantes = await executeQuery({
      query: "select id from participantes where cargo=?",
      values: [body.cargo],
    });
    participantes.forEach(async (participante) => {
      const addParticipantes = await executeQuery({
        query:
          "insert into exclusividad_sorteo(participante_id, sorteo_id) values (?,?)",
        values: [participante.id, element],
      });
    });
  });
  revalidatePath("/admin-hub/gestionarevento/[id]/participantes");
  revalidatePath("/admin-hub/gestionarevento/[id]/sorteos/exclusividad_sorteo/[sorteo]");

  return NextResponse.json({ message: "ok" });
}
