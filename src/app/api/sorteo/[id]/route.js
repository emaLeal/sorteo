import executeQuery from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(params) {
  const { id } = params.params;
  try {
    const result = await executeQuery({
      query: "DELETE FROM sorteos WHERE id=?",
      values: [id],
    });
    return NextResponse.json(
      { message: "Eliminado con exito" },
      { status: 204 }
    );
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
}

export async function GET(params) {
  const { id } = params.params;
  try {
    const result = await executeQuery({
      query: "SELECT * FROM sorteos WHERE id=?",
      values: [id],
    });
    return NextResponse.json({ data: result[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
