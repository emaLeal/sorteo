import executeQuery from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req, params) {
  const { toggle, evento } = params.params;

  if (toggle === '0') {
    const act = await executeQuery({
      query: "UPDATE participantes p set p.participara=? where p.evento_id=? and not exists (select 1 from exclusividad_sorteo es where es.participante_id=p.id)",
      values: [false, evento],
    });
    console.log(act);
    revalidatePath("/admin-hub/gestionarevento/[id]/participantes");
    return NextResponse.json(
      {
        message: "Todos los participantes fueron inhabilitados",
      },
      { status: 200 }
    );
  } else if (toggle === '1') {
    const act = await executeQuery({
      query: "UPDATE participantes p set p.participara=? where p.evento_id=? and not exists (select 1 from exclusividad_sorteo es where es.participante_id=p.id)",
      values: [true, evento],
    });
    console.log(act);
    revalidatePath("/admin-hub/gestionarevento/[id]/participantes");
    return NextResponse.json(
      {
        message: "Todos los participantes fueron habilitados",
      },
      { status: 200 }
    );
  }
}
