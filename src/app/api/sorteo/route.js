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
    let imgPremio = base64Img.imgSync(
      body.premio_foto,
      `public/fotos_sorteos`,
      body.nombre
    );
    const imgUrlPremio = formatString(imgPremio);
    const result = await executeQuery({
      query:
        "INSERT INTO sorteos (nombre, evento_id, jugado, premio, premio_foto) values (?, ?, ?, ?, ?)",
      values: [body.nombre, body.evento_id, false, body.premio, imgUrlPremio],
    });
    console.log(result);
    return NextResponse.json({ message: "sorteo creado" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
