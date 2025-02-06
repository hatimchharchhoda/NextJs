import { NextRequest ,NextResponse } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
   const token = await getToken({ req: request })
   const url = request.nextUrl
   if (token) {
      const redirectPath = "/dashboard";
      
      // Prevent redirect loop
      if (
        url.pathname.startsWith("/signup") ||
        url.pathname.startsWith("/signin") ||
        url.pathname.startsWith("/verify") ||
        url.pathname === "/"
      ) {
        if (url.pathname !== redirectPath) {
          return NextResponse.redirect(new URL(redirectPath, request.nextUrl.origin));
        }
      }
   }

   if(!token) {
    const redirectPath = "/";
    if (url.pathname.startsWith("/dashboard")) {
      if (url.pathname !== redirectPath) {
        return NextResponse.redirect(new URL(redirectPath, request.nextUrl.origin));
      }
    }
   }

   return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
   '/signup',
   '/signin',
   '/verify/:path*',
   '/dashboard/:path*'
  ]
}