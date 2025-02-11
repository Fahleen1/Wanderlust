import axios from 'axios';
import NextAuth, { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

import { loginUser } from './services/user';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          const response = await loginUser(
            credentials.email as string,
            credentials.password as string,
          );

          if (!response.data) return null;

          return {
            id: response.data.user._id,
            username: response.data.user.username,
            email: response.data.user.email,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          };
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
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id as string;
        token.username = user.username;
        token.email = user.email as string;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      session.user = {
        id: token.id,
        username: token.username,
        email: token.email,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };

      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
