import { NextResponse } from "next/server";
import executeQuery from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function PUT(req, params) {
  const body = await req.json();
  const { id } = params.params;
  const stringQuery = `UPDATE evento SET 
  fondo_color=?, 
  fuente_color=?, 
  borde_color=?, 
  fondo_campos=? WHERE id=?`;
  const query = await executeQuery({
    query: stringQuery,
    values: [
      body.fondo_color,
      body.fuente_color,
      body.borde_color,
      body.fondo_campos,
      id
    ],
  });
  console.log(query)

  revalidatePath("/admin-hub")
  revalidatePath("/admin-hub/gestionarevento/[id]/sorteos")
  revalidatePath("/admin-hub/gestionarevento/[id]/participantes")
  return NextResponse.json({ message: "ok" }, { status: 200 });
}
