import executeQuery from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const body = await req.json();
  console.log(body);

  const query = await executeQuery({
    query:
      "UPDATE exclusividad_sorteo set habilitado=? where participante_id=? and sorteo_id=?",
    values: [true, body.id, body.sorteo_id],
  });
  if (query) {
    revalidatePath("/admin-hub/gestionarevento/[id]/sorteos/exclusividad_sorteo/[sorteo]")
    return NextResponse.json({ message: "ok" }, { status: 200 });
  }
  return NextResponse.json({ message: "Error" }, { status: 400 });
}
