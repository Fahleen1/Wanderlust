// import { loginUser } from '../../../../../api/user';
// import NextAuth, { Session, User } from 'next-auth';
// import { JWT } from 'next-auth/jwt';
// import CredentialsProvider from 'next-auth/providers/credentials';
// export const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials) => {
//         const user = await loginUser(
//           credentials?.email as string,
//           credentials?.password as string,
//         );
//         if (!user) {
//           throw new Error('Invalid credentials');
//         }
//         return {
//           id: user._id,
//           name: user.username,
//           email: user.email,
//         };
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: '/signin',
//   },
//   session: {
//     strategy: 'jwt',
//   },
//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user?: User }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email; // You might want to save other info in the token as well
//       }
//       return token;
//     },
//     async session({ session, token }: { session: Session; token: JWT }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.email = token.email as string; // Ensure email is also available in the session
//       }
//       return session;
//     },
//   },
// });
// export { handler as GET, handler as POST };
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'test@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          },
        );

        const user = await res.json();

        if (!res.ok || !user.success) {
          throw new Error('Invalid email or password');
        }

        return {
          id: user.data.user._id,
          email: user.data.user.email,
          name: user.data.user.fullname,
          accessToken: user.data.token, // Store the access token
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login', // Custom sign-in page (optional)
  },
});

export { handler as GET, handler as POST };
