'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AppBar() {
  const { data: session, status } = useSession();

  console.log('Session:', session);

  return (
    <div className="flex gap-2">
      {status === 'authenticated' ? ( // Check if session is authenticated
        <div>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  );
}
