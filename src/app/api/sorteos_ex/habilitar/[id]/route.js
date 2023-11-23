import { revalidatePath } from "next/cache";
import executeQuery from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req, params) {
  const { id } = params.params;
  try {
    const result = await executeQuery({
      query:
        "UPDATE exclusividad_sorteo set habilitado=? where participante_id=?",
      values: [true, id],
    });

    revalidatePath(
      "/admin-hub/gestionarevento/[id]/sorteos/exclusividad_sorteo/[sorteo]"
    );
    return NextResponse.json({ message: "exito" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
