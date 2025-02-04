import NextAuth from 'next-auth';

import { authOptions } from './options';

console.log('NextAuth route is being hit');
console.log('authOptions:', authOptions);

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
