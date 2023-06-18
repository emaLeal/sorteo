import executeQuery from "@/app/lib/db";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return authenticate();
    default:
      return res.status(405).end(`Metodo ${req.method} No admitido`);
  }

  async function authenticate() {
    try {
      const body = JSON.parse(req.body);
      const result = await executeQuery({
        query: "SELECT * FROM admin WHERE usuario=? and contrasena=?",
        values: [body.usuario, body.contrasena],
      });
      const m = {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 30,
        id: result[0].id,
        correo: result[0].correo,
        usuario: result[0].usuario,
      };
      const token = jwt.sign(m, process.env.SECRET);
      const serialized = serialize("miToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: Math.floor(Date.now() / 1000) + 60 * 60 * 30,
        path: "/",
      });

      res.setHeader("Set-Cookie", serialized);

      return res.status(200).json({
        id: result[0].id,
        correo: result[0].correo,
        usuario: result[0].usuario,
        token,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: "No Valido",
      });
    }
  }
}
