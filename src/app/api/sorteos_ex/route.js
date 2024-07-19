import { NextResponse } from "next/server";
import executeQuery from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function POST(req, params) {
  const body = await req.json();
  body.sorteos.forEach(async (element) => {
    const participantes = body.selectedParticipantes;
    participantes.forEach(async (participante) => {
      const addParticipantes = await executeQuery({
        query:
          "insert into exclusividad_sorteo(participante_id, sorteo_id) values (?,?)",
        values: [participante.id, element],
      });
    });
  });
  revalidatePath("/admin-hub/gestionarevento/[id]/participantes");
  revalidatePath(
    "/admin-hub/gestionarevento/[id]/sorteos/exclusividad_sorteo/[sorteo]"
  );

  return NextResponse.json({ message: "ok" });
}

export async function DELETE(req, params) {
  const body = await req.json();
  console.log(body);

  const quitarParticipantes = await executeQuery({
    query: "delete from exclusividad_sorteo where sorteo_id=?",
    values: [body.sorteo],
  });

  revalidatePath("/admin-hub/gestionarevento/[id]/participantes");
  revalidatePath(
    "/admin-hub/gestionarevento/[id]/sorteos/exclusividad_sorteo/[sorteo]"
  );
  return NextResponse.json({ message: ":D" });
}
