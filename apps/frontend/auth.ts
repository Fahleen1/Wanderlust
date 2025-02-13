import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import NextAuth, { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

// Token management functions
const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (!decodedToken.exp) return true;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

const refreshBackendAccessToken = async (token: JWT) => {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/user/refreshToken`,
      {
        refreshToken: token.refreshToken,
      },
    );

    if (!response.data?.accessToken) {
      return { ...token, error: 'RefreshAccessTokenError' };
    }

    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken || token.refreshToken,
    };
  } catch {
    return { ...token, error: 'RefreshAccessTokenError' };
  }
};

// Authentication handlers
const handleCredentialsSignIn = async (user: User) => {
  const response = await axios.post(
    `http://localhost:3001/api/v1/user/generate-tokens`,
    {
      userId: user.id,
    },
  );
  if (response.data?.accessToken && response.data?.refreshToken) {
    user.accessToken = response.data.accessToken;
    user.refreshToken = response.data.refreshToken;
    return true;
  }
  return false;
};

// Token refresh handler
const handleTokenRefresh = async (token: JWT) => {
  let updatedToken = { ...token };
  const accessTokenExpired = token.accessToken
    ? isTokenExpired(token.accessToken)
    : true;

  if (accessTokenExpired) {
    const backendTokenData = await refreshBackendAccessToken(token);
    updatedToken = { ...token, ...backendTokenData };
  }

  return updatedToken;
};

// NextAuth configuration
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      type: 'credentials',
      credentials: {
        email: { type: 'string', label: 'Email' },
        password: { type: 'string', label: 'Password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const response = await axios.post(
            `${process.env.BACKEND_URL}/user/login`,
            {
              email: credentials.email,
              password: credentials.password,
            },
          );

          if (response.data?.success && response.data?.data) {
            const { user, accessToken, refreshToken } = response.data.data;

            return {
              id: user._id,
              username: user.username,
              email: user.email,
              accessToken,
              refreshToken,
              provider: 'credentials',
              token: accessToken,
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
        if (account?.provider === 'credentials' && user.token) {
          return await handleCredentialsSignIn(user);
        }
        return false;
      } catch (error) {
        console.error('Error during sign-in callback:', error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      if (user && account) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.provider = account.provider;
        token.user = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        return token;
      }

      return handleTokenRefresh(token);
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.provider = token.provider;
      session.user = {
        ...token.user,
        id: token.user.id ?? '',
        username: token.user.username,
        email: token.user.email ?? '',
        emailVerified: new Date(),
        token: token.accessToken ?? '',
      };
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
