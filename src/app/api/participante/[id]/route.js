import executeQuery from '/src/app/lib/db'
import { NextResponse } from "next/server";

export async function GET(req, params) {
  const { id } = params.params;
  try {
    const data = await executeQuery({
      query: "SELECT * FROM participantes where evento_id=?",
      values: [id],
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req, params) {
  const { id } = params.params;
  try {
    const result = await executeQuery({
      query: "DELETE FROM participantes where id=?",
      values: [id],
    });
    return NextResponse.json(
      { message: "Participante eliminado" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
