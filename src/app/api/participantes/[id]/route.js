import executeQuery from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req, params) {
  const { id } = params.params;

  try {
    const data = await executeQuery({
      query: "SELECT * FROM participantes WHERE cedula=?",
      values: [id],
    });

    if (result.length === 0) {
      return NextResponse.json({ message: "no se encontro" }, { status: 404 });
    }
    if (result[0].participara === 1) {
      return NextResponse.json(
        { message: "Usuario Ya participara" },
        { status: 403 }
      );
    }
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req, params) {
  const { id } = params.params;

  try {
    const data = await executeQuery({
      query: "SELECT * FROM participantes WHERE evento_id=?",
      values: [id],
    });

    for (const element of data) {
      await executeQuery({
        query: "DELETE FROM participantes where id=?",
        values: [element.id],
      });
      if (element.foto !== "/user.png") {
        await unlink("img" + element.foto); // Esperar la eliminación de la imagen
      }
    }

    revalidatePath("/admin-hub/gestionarevento/[id]/participantes");
    return NextResponse.json(
      { message: "Participantes eliminados" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
