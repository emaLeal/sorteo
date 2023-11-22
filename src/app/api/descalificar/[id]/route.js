import { revalidatePath } from "next/cache";
import executeQuery from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req, params) {
  const { id } = params.params;

  try {
    const result = await executeQuery({
      query: "UPDATE participantes set participara=? where id=?",
      values: [false, id],
    });
    revalidatePath("/admin-hub/gestionarevento/[id]/participantes");
    revalidatePath(
      "/admin-hub/gestionarevento/[id]/sorteos/exclusividad_sorteo/[sorteo]"
    );

    return NextResponse.json({ message: "exito" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
