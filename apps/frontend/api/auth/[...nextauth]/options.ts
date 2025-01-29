// import NextAuth from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';

// export default NextAuth({
//   providers: [
//     Credentials({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },

//       async authorize(credentials: any) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Email and password are required');
//         }

//         const user = await authenticateUser(
//           credentials.email,
//           credentials.password,
//         );

//         if (!user) {
//           throw new Error('Invalid email or password');
//         }

//         // If successful, return the user object
//         return user;
//       },
//     }),
//   ],
// });
