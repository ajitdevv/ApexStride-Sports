import { NextResponse } from "next/server";

const protectedMatchers = ["/account", "/admin"];

export async function proxy(request) {
  const path = request.nextUrl.pathname;
  const response = NextResponse.next();

  const isProtectedPath = protectedMatchers.some(
    (matcher) => path === matcher || path.startsWith(`${matcher}/`)
  );

  if (isProtectedPath) {
    response.headers.set("x-apexstride-protected-route", "true");
  }

  return response;
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*"],
};
