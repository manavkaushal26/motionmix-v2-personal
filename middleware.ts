import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const pathname = request.nextUrl.pathname;
  const authSession = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  });

  if (!authSession) {
    if (pathname.includes("signin")) {
      return NextResponse.next();
    }
    if (pathname.includes("signup")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(`/signin?callbackUrl=${pathname}`, request.url)
    );
  }

  if (pathname === "/signin") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (pathname === "/signup") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup", "/session/:path*"],
};
