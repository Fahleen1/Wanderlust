// import { getToken } from 'next-auth/jwt';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// export { default } from 'next-auth/middleware';
// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
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
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (token && (url.pathname === '/signin' || url.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/listing', request.url));
  }

  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/signin', '/signup'],
};
