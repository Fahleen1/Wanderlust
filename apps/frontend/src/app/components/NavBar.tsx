'use client';

import { links } from '../items';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function NavBar() {
  const { data: session, status } = useSession();

  return (
    <div className="bg-gray-800 text-white p-4">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <ul className="flex space-x-6">
          {links.map((link) => (
            <li key={link.url}>
              <Link href={link.url} className="hover:text-gray-300 transition">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          {status === 'loading' ? (
            <p className="text-gray-400">Loading...</p>
          ) : session ? (
            <>
              <p className="hidden sm:block text-sm">
                Signed in as{' '}
                <span className="font-semibold">{session.user?.email}</span>
              </p>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
