import executeQuery from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  try {
    const result = await executeQuery({
      query: "INSERT INTO sorteos (nombre, evento_id) values (?, ?)",
      values: [body.nombre, body.evento_id],
    });
    console.log(result);
    return NextResponse.json({ message: "sorteo creado" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
