import executeQuery from "@/lib/db";
import formatString from "@/lib/formatString";
import base64Img from "base64-img";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const body = await req.json();
  try {
    const imgFoto = base64Img.imgSync(
      body.foto,
      "img/fotos_participantes",
      body.nombre
    );
    const imgUrl = formatString(imgFoto);

    const result = await executeQuery({
      query:
        "UPDATE participantes SET foto=?, participara=?, acepta=? WHERE cedula=?",
      values: [imgUrl, true, body.acepta, body.cedula],
    });
    revalidatePath(`/admin-hub/gestionarevento/[id]/participantes`);
    return NextResponse.json(
      { message: "Participante Registrado" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:8080",
          "Access-Control-Allow-Methods": "PUT",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
