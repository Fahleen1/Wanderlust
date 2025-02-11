'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButtons() {
  const { data: session, status } = useSession();
  console.log(session);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {session ? (
        <>
          <p>Signed in as {session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </>
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
