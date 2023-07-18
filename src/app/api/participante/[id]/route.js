import executeQuery from "@/app/lib/db";
import { base64Sync } from "base64-img";
import { NextResponse } from "next/server";

export async function GET(req, params) {
  const { id } = params.params;
  try {
    const result = await executeQuery({
      query: "SELECT * FROM participantes where evento_id=?",
      values: [id],
    });
    const data = result.filter((participante) => {
      participante.foto = base64Sync("public" + participante.foto);
      return participante
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
