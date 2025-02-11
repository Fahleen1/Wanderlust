import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || 'fallback_secret',
  });

  const url = request.nextUrl;
  if (
    token &&
    !url.pathname.startsWith('/api') && // Don't rewrite API requests
    (url.pathname.startsWith('/signin') || url.pathname.startsWith('/signup'))
  ) {
    return NextResponse.rewrite(new URL('/listing', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
