import { revalidatePath } from "next/cache";
import executeQuery from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  console.log(body)
  const allValidParticipants = [];
  for (const parti of body) {
    const existingParticipant = await executeQuery({
      query: `SELECT 1 FROM participantes WHERE cedula = ? AND evento_id = ?`,
      values: [parti.cedula, parti.evento_id],
    });

    // Si el participante no existe, insertarlo en la base de datos
    if (!existingParticipant.length) {
      allValidParticipants.push([
        parti.nombre,
        parti.cedula,
        parti.cargo,
        "/user.png",
        parti.correo,
        parti.evento_id,
        false,
        false,
      ]);
    } else throw "Participante ya existente";
  }
  try {
    const query = await executeQuery({
      query:
        "INSERT INTO participantes (nombre, cedula, cargo, foto, correo, evento_id, participara, acepta) VALUES ?",
      values: [allValidParticipants],
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/admin-hub/gestionarevento/[id]/participantes`);
  return NextResponse.json(
    { message: "Se crearon los participantes" },
    { status: 201 }
  );
}
