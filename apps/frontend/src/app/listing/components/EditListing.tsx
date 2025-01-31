'use client';

import { editListing, getListing } from '../../../../services/listings';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { z } from 'zod';

import { listingSchema } from './AddListing';

export default function EditListing({ id }: { id: string }) {
  const router = useRouter();

  // Fetch the listing data
  const {
    data: listing,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['listing', id],
    queryFn: async () => await getListing(id),
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof listingSchema>) => editListing(id, data),
    onSuccess: () => {
      router.push('/');
    },
    onError: (err: { message: string }) => {
      console.error('Update failed:', err);
    },
  });

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof listingSchema>>({
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

  // Use useEffect to reset form when data is fetched
  useEffect(() => {
    if (listing) {
      reset({
        title: listing.title || '',
        image: { url: listing.image?.url || '' },
        location: listing.location || '',
        country: listing.country || '',
        description: listing.description || '',
        price: listing.price || 0,
      });
    }
  }, [listing, reset]);

  // Form submit handler
  const onSubmit = async (data: z.infer<typeof listingSchema>) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return (
      <span>
        Error: {error instanceof Error ? error.message : 'Unknown error'}
      </span>
    );
  }

  if (!listing) {
    return <span>No listing found</span>;
  }

  return (
    <div className="h-screen w-full max-w-md mx-auto p-2">
      <h1 className="text-center text-3xl m-4 text-gray-600 font-semibold">
        Edit Listing
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-6">
          <label className="flex gap-1 items-center mb-2 text-gray-600 text-sm font-medium">
            Title
            <span className="text-red-500">*</span>
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
            <span className="text-red-500">*</span>
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

        {/* Rest of the form fields - replacing Image with span for required indicator */}
        <div className="relative mb-6">
          <label className="flex gap-1 items-center mb-2 text-gray-600 text-sm font-medium">
            Location
            <span className="text-red-500">*</span>
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
            <span className="text-red-500">*</span>
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
            <span className="text-red-500">*</span>
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
            <span className="text-red-500">*</span>
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
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
}
