import executeQuery from '/src/app/lib/db'
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  try {
    const result = await executeQuery({
      query:
        "INSERT INTO participantes (nombre, cedula, cargo, foto, correo, evento_id) values(?, ?, ?, ?, ?, ?)",
      values: [
        body.nombre,
        body.cedula,
        body.cargo,
        '/user.png',
        body.correo,
        body.evento_id,
      ],
    });
    console.log(result)
    return NextResponse.json(
      { message: "Participante Registrado" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
