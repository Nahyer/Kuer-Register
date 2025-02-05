import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const { pathname } = req.nextUrl

  // Allow access to the signin page, API routes, and the landing page
  if (pathname === "/" || pathname.startsWith("/signin") || pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Protect important routes
  if (
    !token &&
    (pathname.startsWith("/register") || pathname.startsWith("/profile") || pathname.startsWith("/select-game"))
  ) {
    const url = new URL("/signin", req.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  // Allow access to other routes
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js authentication routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
}

