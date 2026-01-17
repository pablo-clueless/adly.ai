import type { NextURL } from "next/dist/server/web/next-url";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/(auth)/:path*",
    "/admin/:path*",
    "/dashboard/:path*",
  ],
  name: "auth-proxy",
};

const protected_routes = ["/admin", "/dashboard"];

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-next-pathname", request.nextUrl.pathname);

  const url = request.nextUrl.clone();
  const has_token = request.cookies.has("");

  const redirect = (url: NextURL | string) => {
    const destination = typeof url === "string" ? url : url.toString();
    const response = NextResponse.redirect(destination);
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  };

  if (!has_token && protected_routes.some((path) => url.pathname.startsWith(path))) {
    // url.pathname = "/signin";
    return redirect(url);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
