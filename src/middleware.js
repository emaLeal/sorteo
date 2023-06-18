import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("miToken");
  if (request.nextUrl.pathname.includes("/admin-hub")) {
    if (jwt) {
      try {
        const payload = await jwtVerify(
          new TextEncoder().encode(jwt.value),
          new TextEncoder().encode(process.env.SECRET)
        );
      } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL("/admin-log", request.url));
      }
    }

    if (jwt === undefined) {
      return NextResponse.redirect(new URL("/admin-log", request.url));
    }
  }

  if (request.nextUrl.pathname.includes("/admin-log")) {
    if (jwt) {
      try {
        const payload = await jwtVerify(
          new TextEncoder().encode(jwt.value),
          new TextEncoder().encode(process.env.SECRET)
        );
        return NextResponse.redirect(new URL("/admin-hub", request.url));
      } catch (error) {
        console.log(error);
      }
    }
  }

  return NextResponse.next();
}
