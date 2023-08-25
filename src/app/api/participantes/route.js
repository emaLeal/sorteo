import { revalidatePath } from 'next/cache';
import executeQuery from '/src/app/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  body.map(async (parti) => {
    try {
      const result = await executeQuery({
        query:
          "INSERT INTO participantes (nombre, cargo, foto, evento_id, correo, cedula, participara, acepta) values(?, ?, ?, ?, ?, ?, ?, ?)",
        values: [
          parti.nombre,
          parti.cargo,
          "/user.png",
          parti.evento_id,
          parti.correo,
          parti.cedula,
          false,
          false
        ],
      });
      console.log(result)
    } catch (error) {
      console.log(error);
    }
  });
  revalidatePath(`/admin-hub/gestionarevento/[id]/participantes`)
  return NextResponse.json(
    { message: "Se crearon los participantes" },
    { status: 201 }
  );
}
