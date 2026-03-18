import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const token = (await request.cookies).get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  if (token && (pathname === '/' || pathname.startsWith('/auth'))) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (!token && !pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/:path*', '/home/:path*']
};
