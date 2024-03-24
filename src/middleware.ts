import { NextRequest, NextResponse } from "next/server";
import { paths } from "./paths";
import { getUrl } from "./utils/getUrl";
import { getSession } from "next-auth/react";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token");
  const pathname = request.nextUrl.pathname;

  if ((pathname === "/login" || pathname === "/cadastro") && token) {
    return NextResponse.redirect(new URL(getUrl(paths.home())));
  }

  if (pathname.includes("/perfil") && !token) {
    return NextResponse.redirect(new URL(getUrl(paths.home())));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
