import { type NextRequest, NextResponse } from "next/server";
import { hasRequiredPlan } from "@/lib/billing";
import { getAppUrl } from "@/lib/getBaseUrl";
import { createMiddlewareClient } from "@/lib/supabase/middleware";
import { TOOL_CONFIGS } from "@/lib/tools";

const PREMIUM_ROUTE_RULES = TOOL_CONFIGS.filter((tool) => tool.requiredPlan).map((tool) => ({
  pathname: tool.route,
  requiredPlan: tool.requiredPlan!
}));

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
    const premiumRoute = PREMIUM_ROUTE_RULES.find((route) => request.nextUrl.pathname.startsWith(route.pathname));

    if (!user && isProtectedRoute) {
      return NextResponse.redirect(getAppUrl("/login", request.url));
    }

    if (user && premiumRoute) {
      const { data: profile } = await supabase
        .from("users")
        .select("plan")
        .eq("id", user.id)
        .maybeSingle();

      const currentPlan = (profile?.plan ?? "free") as "free" | "pro" | "studio";

      if (!hasRequiredPlan(currentPlan, premiumRoute.requiredPlan)) {
        return NextResponse.redirect(getAppUrl("/pricing", request.url));
      }
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
