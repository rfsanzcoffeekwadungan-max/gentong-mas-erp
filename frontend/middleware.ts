// frontend/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that don't require authentication
const PUBLIC_PATHS = ['/login', '/otp', '/select-tenant'];

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Allow public auth routes through without any checks
  const isPublic = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (isPublic) {
    return NextResponse.next();
  }

  // Allow Next.js internals and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check for the httpOnly refreshToken cookie as the auth indicator
  // (The accessToken lives in memory and is not available in middleware)
  const refreshToken = request.cookies.get('refreshToken');

  if (!refreshToken) {
    // Redirect to login, preserving the intended destination
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Run middleware on all routes except static files and Next.js internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
