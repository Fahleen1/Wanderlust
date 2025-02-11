import axios from 'axios';
import NextAuth, { User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import Credentials from 'next-auth/providers/credentials';

import { loginUser } from './services/user';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          const response = await loginUser(
            credentials.username as string,
            credentials.email as string,
            credentials.password as string,
          );
          console.log('Login response:', response.data);

          if (!response.data) return null;
          return (await response.data) ?? null;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(
              'Login failed:',
              error.response?.data || error.message,
            );
          } else {
            console.error('Login failed:', (error as Error).message);
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as AdapterUser & {
        id?: string;
        username?: string;
        email: string;
      } & User;
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
