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
  if (user && (user as any).is_anonymous) {
    if (["/new"].includes(pathname)) {
      return NextResponse.redirect(new URL("/alert?message=익명 사용자는 만들기가 불가능 합니다.", baseUrl));
    }
  }
  if (user) {
    if (["/signin", "/signup"].includes(pathname)) {
      return NextResponse.redirect(new URL("/list", baseUrl));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
