import { getURL } from "next/dist/shared/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { paths } from "./paths";
import { getUrl } from "./utils/getUrl";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token");
  const pathname = request.nextUrl.pathname;

  if ((pathname === "/login" || pathname === "/cadastro") && token) {
    return NextResponse.redirect(new URL(getUrl(paths.home())));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
