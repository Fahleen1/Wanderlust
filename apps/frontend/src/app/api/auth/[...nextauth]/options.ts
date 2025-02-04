import { loginUser } from '../../../../../services/user';
import { loadEnvConfig } from '@next/env';
import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Credentials received:', credentials);

        const res = await fetch('http://localhost:3001/api/v1/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });

        console.log('Response status:', res.status);
        const data = await res.json();
        console.log('User response:', data);

        if (!res.ok || !data.user || !data.accessToken) {
          console.log('Authorization failed');
          return null;
        }

        console.log('Returning user with accessToken:', {
          ...data.user,
          accessToken: data.accessToken,
        });
        return { ...data.user, accessToken: data.accessToken };
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      console.log('⚡ SESSION Callback - Token:', token);
      // if (token) {
      //   session.user._id = token._id;
      //   // session.user.isVerified = token.isVerified;
      //   session.user.username = token.username;
      //   session.user.accessToken = token.accessToken;
      // }
      if (token) {
        session.user = {
          _id: token._id,
          username: token.username,
          email: token.email,
          accessToken: token.accessToken,
        };
      }

      return session;
    },
    async jwt({ token, user }) {
      console.log('🔥 JWT Callback - Incoming Token:', token);
      console.log('🔥 JWT Callback - User:', user);
      if (user) {
        token._id = user._id;
        //token.isVerified = user.isVerified;
        token.username = user.username;
        token.accessToken = user.accessToken;
      }
      return token;
    },
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
