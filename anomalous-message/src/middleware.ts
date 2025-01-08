import { NextRequest ,NextResponse } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
   const token = await getToken({ req: request })
   const url = request.nextUrl
   if(token && (
      url.pathname.startsWith('/signup') ||
      url.pathname.startsWith('/signin') ||
      url.pathname.startsWith('/verify') ||
      url.pathname.startsWith('/')
   )) {
      return NextResponse.redirect(new URL('/dashboard'))
   }
  //return NextResponse.redirect(new URL('/home', request.url))
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