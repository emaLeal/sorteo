import executeQuery from "@/lib/db";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/sendMail";
import fs from "fs";

export async function POST(req) {
  const body = await req.json();
  const htmlContent = await fs.promises.readFile(
    "./public/correo.html",
    "utf-8"
  );
  const participantes = await executeQuery({
    query: "SELECT * from participantes where evento_id=?",
    values: [body.evento],
  });
  const commonOptions = {
    from: "Tu Nombre <tu_correo@gmail.com>",
    subject: "Bienvenido a Smartie",
  };

  // Crea una lista de opciones de correo electrónico personalizadas para cada destinatario
  const mailOptionsList = participantes.map(participante => {
    // Reemplaza los marcadores de posición en el HTML con los valores correspondientes
    const replacedHtmlContent = htmlContent
      .replace(/{nombre}/g, participante.nombre)
      // Agrega más reemplazos según sea necesario para otros datos específicos

    // Define las opciones específicas para este participante
    return {
      ...commonOptions,
      to: participante.correo, // Define el destinatario como el correo del participante actual
      html: replacedHtmlContent, // HTML actualizado con los datos del participante
    };
  });

  // Envía los correos electrónicos
  try {
    await sendEmail(mailOptionsList, true);
    console.log("Correos electrónicos enviados con éxito");
  } catch (error) {
    console.error("Error al enviar los correos electrónicos:", error);
    // Manejar el error según sea necesario
  }

  return NextResponse.json({ message: "D:" }, { status: 200 });
}
