import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    provider?: string;
    user: {
      id?: string;
      username?: string;
      email: string | null | undefined;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    username?: string;
    email: string | null | undefined;
    accessToken?: string;
    refreshToken?: string;
    provider?: string;
    token: string;
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    provider?: string;
    user: {
      id: string | undefined;
      username?: string;
      email: string | null | undefined;
    };
  }
}
