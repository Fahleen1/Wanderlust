import { auth } from '../../auth';
import { signIn, signOut } from 'next-auth/react';

export default async function Page() {
  const session = await auth();
  console.log('Session from useSession():', session);
  if (session) {
    return (
      <div>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>SignOut</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  );
}
