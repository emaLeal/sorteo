import executeQuery from "@/app/lib/db";
import base64Img from "base64-img";
import { NextResponse } from "next/server";

const formatString = (string) => {
  const m = string.replaceAll("\\", "/");
  const formatedString = m.replace("public", "");
  return formatedString;
};

export async function POST(req) {
  const body = await req.json();
  try {
    let imgEvento = base64Img.imgSync(
      body.foto_evento,
      `public/fotos_eventos`,
      `${body.nombre_evento}`
    );
    const imgEmpresa = base64Img.imgSync(
      body.foto_empresa,
      "public/fotos_empresas",
      body.empresa
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
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
