import executeQuery from "@/app/lib/db";
import formatString from "@/app/lib/formatString";
import base64Img from "base64-img";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  try {
    let imgEvento = base64Img.imgSync(
      body.foto_evento,
      `public/fotos_eventos`,
      body.nombre_evento + Date.now()
    );
    const imgEmpresa = base64Img.imgSync(
      body.foto_empresa,
      "public/fotos_empresas",
      body.empresa + Date.now()
    );
    const imgUrlEvento = formatString(imgEvento);
    const imgUrlEmpresa = formatString(imgEmpresa);

    const result = await executeQuery({
      query:
        "INSERT INTO evento (nombre_evento, foto_evento, empresa, foto_empresa) values(?, ?, ?, ?)",
      values: [body.nombre_evento, imgUrlEvento, body.empresa, imgUrlEmpresa],
    });
    return NextResponse.json(
      { message: "Evento Satisfactoriamente Creado" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await executeQuery({
      query: "SELECT * FROM evento",
    });

    const data = result.filter((ev) => {
      ev.foto_evento = base64Img.base64Sync("public" + ev.foto_evento);
      ev.foto_empresa = base64Img.base64Sync("public" + ev.foto_empresa);
      return ev;
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
