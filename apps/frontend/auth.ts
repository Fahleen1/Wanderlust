import axios from 'axios';
import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const handleCredentialsSignIn = async (user: User) => {
  const response = await axios.post(
    `${process.env.BACKEND_URL}/auth/generate-tokens`,
    {
      token: user.token,
      tokenType: 'initial',
    },
  );

  if (response.data?.accessToken && response.data?.refreshToken) {
    user.accessToken = response.data.accessToken;
    user.refreshToken = response.data.refreshToken;
    return true;
  }
  return false;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      type: 'credentials',
      credentials: {
        username: { type: 'string', label: 'Email' },
        password: { type: 'string', label: 'Password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          const response = await axios.post(
            `${process.env.BACKEND_URL}/auth/login`,
            {
              email: credentials.username,
              password: credentials.password,
            },
          );

          if (response.data.user && response.data.token) {
            return {
              ...response.data.user,
              token: response.data.token,
              provider: 'credentials',
            };
          }
          return null;
        } catch (error) {
          console.log('error in credentials authorize function', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'credentials' && user.token)
          return await handleCredentialsSignIn(user);
        return false;
      } catch (error) {
        console.error('Error during sign-in callback:', error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        return token;
      }
      return token;
      //return handleTokenRefresh(token);
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = {
        ...token.user,
        id: token.user?.id ?? '',
        email: token.user?.email ?? '',
        emailVerified: new Date(),
      };
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
