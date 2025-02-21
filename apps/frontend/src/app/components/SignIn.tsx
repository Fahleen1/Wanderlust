'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const userSchema = z.object({
  username: z.string(),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export default function SignIn() {
  const router = useRouter();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  // Handle form submission
  const handleSubmit = async (values: z.infer<typeof userSchema>) => {
    const result = await signIn('credentials', {
      username: values.username,
      email: values.email,
      password: values.password,
    });

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
          >
            {/* Email Input */}
            <div>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
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
