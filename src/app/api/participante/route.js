import { revalidatePath } from "next/cache";
import executeQuery from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  try {
    const result = await executeQuery({
      query: `INSERT INTO participantes (nombre, cedula, cargo, foto, correo, evento_id, participara, acepta) 
        values(?, ?, ?, ?, ?, ?, ?, ?) 
        where not exists (select 1 from participantes where cedula=? and evento_id=?)`,
      values: [
        body.nombre,
        body.cedula,
        body.cargo,
        "/user.png",
        body.correo,
        body.evento_id,
        false,
        false,
        body.cedula,
        body.evento_id,
      ],
    });
    console.log(result);
    revalidatePath(`/admin-hub/gestionarevento/[id]/participantes`);
    return NextResponse.json(
      { message: "Participante Registrado" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
