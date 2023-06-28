import executeQuery from "@/app/lib/db";

const { NextResponse } = require("next/server");

export async function GET(req, params) {
  const { id } = params.params;

  try {
    const result = await executeQuery({
      query: "SELECT * FROM sorteos WHERE evento_id=?",
      values: [id],
    });
    const ev = await executeQuery({
      query: "SELECT * FROM evento WHERE id=?",
      values: [id],
    });

    return NextResponse.json(
      { data: result, nombre_evento: ev[0].nombre_evento },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
}
