import executeQuery from "@/app/lib/db";
import formatString from "@/app/lib/formatString";
import base64Img from "base64-img";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  try {
    let imgEvento = base64Img.imgSync(
      body.foto_evento,
      `img/fotos_eventos`,
      body.nombre_evento + Date.now()
    );
    const imgEmpresa = base64Img.imgSync(
      body.foto_empresa,
      "img/fotos_empresas",
      body.empresa + Date.now()
    );
    const imgUrlEvento = formatString(imgEvento);
    const imgUrlEmpresa = formatString(imgEmpresa);

    const result = await executeQuery({
      query:
        "INSERT INTO evento (nombre_evento, foto_evento, empresa, foto_empresa) values(?, ?, ?, ?)",
      values: [body.nombre_evento, imgUrlEvento, body.empresa, imgUrlEmpresa],
    });
    revalidatePath('/admin-hub')
    return NextResponse.json(
      { message: "Evento Satisfactoriamente Creado" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await executeQuery({
      query: "SELECT * FROM evento",
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
