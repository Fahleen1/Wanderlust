'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const userSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export default function SignIn() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Handle form submission
  const handleSubmit = async (values: z.infer<typeof userSchema>) => {
    setLoading(true);
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: true,
    });

    setLoading(false);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Signed in successfully');
      router.push('/listing');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side */}
      <div className="lg:w-1/2 bg-gray-100 lg:flex hidden items-center justify-center p-6"></div>

      {/* Right side - Sign-in form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center min-h-screen lg:min-h-full p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md lg:bg-gray-100 rounded-lg lg:shadow-md p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Sign In</h2>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
            name="signin-form"
          >
            {/* Email Input */}
            <div>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                autoComplete="email"
                {...form.register('email')}
                className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-gray-700 py-2 px-3 outline-none"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                autoComplete="current-password"
                {...form.register('password')}
                className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-gray-700 py-2 px-3 outline-none"
              />
              {form.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded"
            >
              {isLoading && <Loader className="animate-spin" />}
              Sign In
            </button>
          </form>

          {/* Signup Redirect */}
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
