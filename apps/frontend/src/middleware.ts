// import { getToken } from 'next-auth/jwt';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// export async function middleware(request: NextRequest) {
//   const token = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET || 'fallback_secret',
//   });
//   const url = request.nextUrl;
//   if (
//     token &&
//     (url.pathname.startsWith('/signin') ||
//       url.pathname.startsWith('/signup') ||
//       url.pathname.startsWith('/'))
//   ) {
//     return NextResponse.rewrite(new URL('/listing', request.url));
//   }
//   if (request.nextUrl.pathname.startsWith('/dashboard')) {
//     return NextResponse.rewrite(new URL('/dashboard/user', request.url));
//   }
// }
// export const config = {
//   matcher: ['/signin', '/signup', '/', '/dashboard/:path*'],
// };
import { getToken } from '@auth/core/jwt';
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
    (url.pathname.startsWith('/signin') ||
      url.pathname.startsWith('/signup') ||
      url.pathname.startsWith('/'))
  ) {
    return NextResponse.redirect(new URL('/listing', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard/user', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/signin', '/signup', '/', '/dashboard/:path*'],
};
