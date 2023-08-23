import executeQuery from '/src/app/lib/db'
import { NextResponse } from "next/server";

export async function GET(req, params) {
  const { id } = params.params;

  try {
    const data = await executeQuery({
      query: "SELECT * FROM participantes WHERE cedula=?",
      values: [id],
    });

    if (result.length === 0) {
      return NextResponse.json({ message: "no se encontro" }, { status: 404 });
    }
    if (result[0].participara === 1) {
      return NextResponse.json(
        { message: "Usuario Ya participara" },
        { status: 403 }
      );
    }
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
