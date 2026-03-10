import { type NextRequest, NextResponse } from "next/server";
import { getAppUrl } from "@/lib/getBaseUrl";
import { createMiddlewareClient } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  try {
    const response = NextResponse.next({
      request: {
        headers: request.headers
      }
    });

    const supabase = createMiddlewareClient(request, response);
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const isProtectedRoute =
      request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/tools");

    if (!user && isProtectedRoute) {
      return NextResponse.redirect(getAppUrl("/login", request.url));
    }

    if (user && request.nextUrl.pathname === "/login") {
      return NextResponse.redirect(getAppUrl("/dashboard", request.url));
    }

    return response;
  } catch (error) {
    console.error("Auth middleware failed:", error);

    if (request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/tools")) {
      return NextResponse.redirect(getAppUrl("/login", request.url));
    }

    if (request.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/tools/:path*", "/login"]
};
