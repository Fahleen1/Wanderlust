'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';

import SignIn from '@/app/components/SignIn';

const checkSession = async () => {
  const session = await getSession();
  console.log('🔄 Session Data:', session);
};

export default function Page() {
  useEffect(() => {
    checkSession();
  }, []);
  const { data: session } = useSession();
  console.log('Session:', session);

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
      {/* <button className="bg-black" onClick={() => signIn()}>
        Sign In
      </button> */}
      <SignIn />
    </div>
  );
}
