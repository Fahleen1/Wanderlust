// import NextAuth from 'next-auth';
// import { authOptions } from './options';
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
import NextAuth from '@auth/core';

import { authConfig } from './options';

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
