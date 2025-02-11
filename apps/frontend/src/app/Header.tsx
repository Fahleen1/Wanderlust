// import { auth, signIn, signOut } from '../../auth';
// import Link from 'next/link';

// function SignOut() {
//   return (
//     <form
//       action={async () => {
//         'use server';
//         await signOut();
//       }}
//     >
//       <button type="submit">Sign out</button>
//     </form>
//   );
// }
// export const Header = async () => {
//   const session = await auth();
//   console.log(session);
//   return (
//     <header>
//       <nav>
//         <div>
//           {session?.user ? (
//             <div>
//               <SignOut />
//             </div>
//           ) : (
//             <Link href="/api/auth/signin">
//               <button>Sign in</button>
//             </Link>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };
