// middleware.ts

import { NextRequest, NextResponse } from "next/server"

export function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get("token")?.value

  const pathname =
    request.nextUrl.pathname

  // public routes
  const publicRoutes = [
    "/",
    "/login",
    "/signup",
  ]

  const isPublicRoute =
    publicRoutes.includes(pathname)

  // protect everything else
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    )
  }

  // prevent logged in users from visiting auth pages
  if (
    token &&
    (pathname === "/login" ||
      pathname === "/signup")
  ) {
    return NextResponse.redirect(
      new URL("/home", request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}