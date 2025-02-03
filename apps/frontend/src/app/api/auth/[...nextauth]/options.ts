// import { loginUser } from '../../../../../services/user';
// import type { NextAuthOptions, User } from 'next-auth';
// import { Session } from 'next-auth';
// import { JWT } from 'next-auth/jwt';
// import Credentials from 'next-auth/providers/credentials';
// export const authOptions: NextAuthOptions = {
//   providers: [
//     Credentials({
//       credentials: {
//         email: { label: 'Email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Missing credentials');
//         }
//         const user = await loginUser(
//           credentials.email as string,
//           credentials.password as string,
//         );
//         console.log(user);
//         if (!user || !user.token) {
//           throw new Error('Invalid credentials');
//         }
//         return user;
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }: { session: Session; token: JWT }) {
//       if (token) {
//         session.user._id = token._id;
//         session.user.isVerified = token.isVerified;
//         session.user.username = token.username;
//       }
//       return session;
//     },
//     async jwt({ token, user }: { token: JWT; user: User }) {
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
// };
import { loginUser } from '../../../../../services/user';
import Credentials from '@auth/core/providers/credentials';
import type { AuthConfig } from '@auth/core/types';

export const authConfig: AuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // const res = await fetch('http://localhost:5000/api/auth/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(credentials),
        // });

        // const user = await res.json();
        // if (res.ok && user) return user;
        // return null;

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }
        const user = await loginUser(
          credentials.email as string,
          credentials.password as string,
        );
        console.log(user);
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
  session: { strategy: 'jwt' },
};
