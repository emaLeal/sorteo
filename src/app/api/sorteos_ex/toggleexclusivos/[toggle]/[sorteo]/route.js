import executeQuery from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req, params) {
  const { toggle, sorteo } = params.params;

  console.log(toggle, sorteo);

  if (toggle === '0') {
    const act = await executeQuery({
      query: "UPDATE exclusividad_sorteo set habilitado=? where sorteo_id=?",
      values: [false, sorteo],
    });
    console.log(act);
    revalidatePath("/admin-hub/gestionarevento/[id]/sorteos/exclusividad_sorteo/[sorteo]");
    return NextResponse.json(
      {
        message: "Todos los participantes fueron inhabilitados",
      },
      { status: 200 }
    );
  } else if (toggle === '1') {
    const act = await executeQuery({
      query: "UPDATE exclusividad_sorteo set habilitado=? where sorteo_id=?",
      values: [true, sorteo],
    });
    console.log(act);
    revalidatePath("/admin-hub/gestionarevento/[id]/sorteos/exclusividad_sorteo/[sorteo]");
    return NextResponse.json(
      {
        message: "Todos los participantes fueron habilitados",
      },
      { status: 200 }
    );
  }

}
