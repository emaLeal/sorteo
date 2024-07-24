import executeQuery from '@/lib/db'
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  const body = await req.json();
  try {
    const result = await executeQuery({
      query: "SELECT * FROM admin WHERE usuario=? and contrasena=?",
      values: [body.usuario, body.contrasena],
    });
    if (result.length === 0) {
      return NextResponse.json(
        { message: "Credenciales Incorrectos" },
        { status: 400 }
      );
    }

    const m = {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 30,
      id: result[0].id,
      correo: result[0].correo,
      usuario: result[0].usuario,
    };
    const token = jwt.sign(m, process.env.SECRET);

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: Math.floor(Date.now() / 1000) + 60 * 60 * 30,
      path: "/",
    };

    cookies().set("miToken", token, options);

    return NextResponse.json(
      {
        id: result[0].id,
        correo: result[0].correo,
        usuario: result[0].usuario,
        token,
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "No Valido",
      },
      { status: 400 }
    );
  }
}
