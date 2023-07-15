import executeQuery from "@/app/lib/db";
import base64Img from "base64-img";
import { NextResponse } from "next/server";

const formatString = (string) => {
  const m = string.replaceAll("\\", "/");
  const formatedString = m.replace("public", "");
  return formatedString;
};

export async function PUT(req) {
  const body = await req.json();
  try {
    const imgFoto = base64Img.imgSync(
      body.foto,
      "public/fotos_participantes",
      body.nombre
    );
    const imgUrl = formatString(imgFoto);

    const result = await executeQuery({
      query: "UPDATE participantes SET foto=?, participara=? WHERE cedula=?",
      values: [imgUrl, true, body.cedula],
    });
    return NextResponse.json(
      { message: "Participante Registrado" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
