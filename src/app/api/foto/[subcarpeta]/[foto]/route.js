// Importa las librerías necesarias para manejar la ruta
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(req, params) {
  // Obtén el ID de la foto desde los parámetros de la URL
  const { subcarpeta, foto } = params.params;

  // Construye la ruta completa de la imagen utilizando la carpeta "img" y el ID proporcionado
  const imagePath = path.join(process.cwd(), "img", subcarpeta, foto);

  if (!fs.existsSync(imagePath)) {
    return NextResponse.json(
      { error: "Imagen no encontrada" },
      { status: 404 }
    );
  }

  // Lee el contenido de la imagen
  const image = fs.readFileSync(imagePath);

  // Envía la imagen como respuesta
  return new NextResponse(image);
}
