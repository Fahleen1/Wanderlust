import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken: string;
    user: {
      id?: string;
      username?: string;
      email: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    username?: string;
    email: string;
    accessToken: string;
    refreshToken: string;
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    username?: string;
    email: string;
    accessToken: string;
    refreshToken: string;
  }
}
