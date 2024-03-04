import nodemailer from "nodemailer";

export async function sendEmail(file){
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
  const mailOptions = file

  // Enviar el correo electrónico
  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado con éxito");
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw error; // Propagar el error para que pueda ser manejado en otro lugar si es necesario
  }
}
