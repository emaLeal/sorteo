import executeQuery from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req, params) {
  const { toggle, evento } = params.params;

  if (toggle === '0') {
    const act = await executeQuery({
      query: "UPDATE participantes set participara=? where evento_id=?",
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
      query: "UPDATE participantes set participara=? where evento_id=?",
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
