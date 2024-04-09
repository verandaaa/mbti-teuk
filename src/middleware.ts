import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const pathname = request.nextUrl.pathname;
  const baseUrl = request.nextUrl.origin;

  if (!user) {
    if (["/new"].includes(pathname)) {
      return NextResponse.redirect(new URL("/signin", baseUrl));
    }
  }
  if (user) {
    if (["/signin", "signup"].includes(pathname)) {
      return NextResponse.redirect(new URL("/list", baseUrl));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
