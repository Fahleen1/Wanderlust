'use client';

import { createListing } from '../../../../services/listings';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import { z } from 'zod';

// Validation schema
export const listingSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  image: z.object({
    url: z.string().min(1, { message: 'Image URL is required' }),
  }),
  location: z.string().min(1, { message: 'Location is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  price: z
    .number({ invalid_type_error: 'Price must be a number' })
    .min(1, { message: 'Price is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
});

export default function AddListing() {
  const router = useRouter();
  const form = useForm<z.infer<typeof listingSchema>>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: '',
      image: {
        url: '',
      },
      location: '',
      country: '',
      description: '',
    },
  });

  const { handleSubmit, register, formState } = form;
  const { errors } = formState;

  const addListing = useMutation({
    mutationFn: async (data: z.infer<typeof listingSchema>) =>
      createListing(data),
    onSuccess: () => {
      toast.success('Listing added successfully');
      form.reset();
      router.push('/');
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof listingSchema>) => {
    addListing.mutate(values);
  };

  return (
    <div className="h-screen w-full max-w-md mx-auto p-2">
      <h1 className="text-center text-3xl m-4 text-gray-600 font-semibold">
        Add a listing
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-6">
          <label className="flex gap-1 items-center mb-2 text-gray-600 text-sm font-medium">
            Title
            <Image src="/icons/required.svg" alt="svg" width={8} height={8} />
          </label>
          <input
            {...register('title')}
            type="text"
            className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            placeholder="Enter title"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="relative mb-6">
          <label className="flex gap-1 items-center mb-2 text-gray-600 text-sm font-medium">
            Image URL
            <Image src="/icons/required.svg" alt="svg" width={8} height={8} />
          </label>
          <input
            {...register('image.url')}
            type="text"
            className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            placeholder="Enter image URL"
          />
          {errors.image?.url && (
            <p className="text-sm text-red-500 mt-1">
              {errors.image.url.message}
            </p>
          )}
        </div>

        <div className="relative mb-6">
          <label className="flex gap-1 items-center mb-2 text-gray-600 text-sm font-medium">
            Location
            <Image src="/icons/required.svg" alt="svg" width={8} height={8} />
          </label>
          <input
            {...register('location')}
            type="text"
            className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            placeholder="Enter location"
          />
          {errors.location && (
            <p className="text-sm text-red-500 mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        <div className="relative mb-6">
          <label className="flex gap-1 items-center mb-2 text-gray-600 text-sm font-medium">
            Country
            <Image src="/icons/required.svg" alt="svg" width={8} height={8} />
          </label>
          <input
            {...register('country')}
            type="text"
            className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            placeholder="Enter country"
          />
          {errors.country && (
            <p className="text-sm text-red-500 mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        <div className="relative mb-6">
          <label className="flex gap-1 items-center mb-2 text-gray-600 text-sm font-medium">
            Price
            <Image src="/icons/required.svg" alt="svg" width={8} height={8} />
          </label>
          <input
            {...register('price', { valueAsNumber: true })}
            type="number"
            className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
          )}
        </div>

        <div className="relative mb-6">
          <label className="flex gap-1 items-center mb-2 text-gray-600 text-sm font-medium">
            Description
            <Image src="/icons/required.svg" alt="svg" width={8} height={8} />
          </label>
          <textarea
            {...register('description')}
            className="block w-full h-20 px-4 py-2.5 text-base leading-7 font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-2xl placeholder-gray-400 focus:outline-none resize-none"
            placeholder="Enter description"
          ></textarea>
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-purple-600 hover:bg-purple-800 rounded-full shadow-xs text-white text-base font-semibold leading-6"
        >
          Add
        </button>
      </form>
    </div>
  );
}
