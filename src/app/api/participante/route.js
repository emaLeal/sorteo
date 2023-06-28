import executeQuery from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  try {
    const result = await executeQuery({
      query:
        "INSERT INTO participante (nombre, cargo, foto, sorteo, correo) values(?, ?, ?, ?, ?)",
      values: [body.nombre, body.cargo, body.foto, body.sorteo, body.correo],
    });
    return NextResponse.json(
      { message: "Participante Registrado" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
