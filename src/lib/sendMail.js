import nodemailer from "nodemailer";

export async function sendEmail(file, many) {
  // Configurar el transporte de nodemailer
  const transporter = nodemailer.createTransport({
    // Configuración del servidor SMTP, por ejemplo, para Gmail
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Definir el contenido del correo electrónico

  // Enviar el correo electrónico
  try {
    if (many === true) {
      // Utiliza Promise.all() para enviar correos electrónicos en paralelo
      await Promise.all(
        file.map(async (options) => {
          await transporter.sendMail(options);
        })
      );
      console.log("Correos electrónicos enviados con éxito");
      return;
    }
    await transporter.sendEmail(mailOptions);
    console.log("Correo electrónico enviado con éxito");
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw error; // Propagar el error para que pueda ser manejado en otro lugar si es necesario
  }
}
