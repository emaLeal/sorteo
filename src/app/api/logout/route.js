import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  cookies().delete("miToken");

  return NextResponse.redirect(new URL("/admin-log", req.url));
}
