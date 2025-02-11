'use client';

import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function AuthButtons() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div>
      {session ? (
        <div>
          <p>Signed in as {session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign In
        </button>
      )}
    </div>
  );
}
