import executeQuery from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, params) {
  const { id } = params.params;
  try {
    const result = await executeQuery({
      query: "SELECT * FROM participantes where evento_id=?",
      values: [id],
    });
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
