'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  interface SignInResult {
    ok: boolean;
    error?: string | null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result: SignInResult | undefined = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result && result.ok) {
      router.push('/');
    } else if (result && result.error) {
      setError(result.error);
    } else {
      setError('An unknown error occurred');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="lg:w-1/2 bg-gray-100 lg:flex hidden items-center justify-center p-6"></div>

      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center min-h-screen lg:min-h-full p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md lg:bg-gray-100 rounded-lg lg:shadow-md p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-gray-700 py-2 px-3 outline-none"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-gray-700 py-2 px-3 outline-none"
              />
            </div>
            {error && <p>{error}</p>}
            <button
              type="submit"
              className="w-full text-white bg-purple-600 hover:bg-purple-800 py-2 px-4 rounded transition duration-200"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="text-purple-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
