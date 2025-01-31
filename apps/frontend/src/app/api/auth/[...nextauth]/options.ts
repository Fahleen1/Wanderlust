// import { loginUser } from '../../../../../api/user';
// import NextAuth, { NextAuthOptions } from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
// export const authOptions: NextAuthOptions = NextAuth({
//   providers: [
//     Credentials({
//       credentials: {
//         email: { label: 'Email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         // const response = await fetch(request);
//         // if (!response.ok) return null;
//         // return (await response.json()) ?? null;
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Missing credentials');
//         }
//         const user = await loginUser(
//           credentials?.email as string,
//           credentials?.password as string,
//         );
//         console.log(user);
//         if (!user || !user.token) {
//           throw new Error('Invalid credentials');
//         }
//         return user;
//         // return {
//         //   id: user._id,
//         //   email: user.email,
//         //   token: user.token,
//         // };
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       if (token) {
//         session.user._id = token._id;
//         session.user.isVerified = token.isVerified;
//         session.user.username = token.username;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token._id = user._id?.toString();
//         token.isVerified = user.isVerified;
//         token.username = user.username;
//       }
//       return token;
//     },
//   },
//   pages: {
//     signIn: '/signin',
//   },
//   session: {
//     strategy: 'jwt',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });
import { loginUser } from '../../../../../services/user';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        const user = await loginUser(credentials.email, credentials.password);

        if (!user || !user.token) {
          throw new Error('Invalid credentials');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
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
