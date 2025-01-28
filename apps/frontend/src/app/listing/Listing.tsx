'use client';

import { deleteListing, getListing } from '../../../api/listings';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';

export default function Listing({ id }: { id: string }) {
  const router = useRouter();

  const {
    data: listing,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['listing', id],
    queryFn: async () => await getListing(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </span>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>No listing found</span>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    await deleteListing(id);
    router.push('/');
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2">
            <div className="relative w-full h-80 lg:h-[500px]">
              <Image
                src={listing.image.url}
                alt={listing.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {listing.title}
              </h2>

              <p className="text-gray-600 text-lg mb-6">
                {listing.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <span className="text-2xl font-bold text-purple-600">
                  ${listing.price}
                </span>
                <div className="flex items-center space-x-2 text-gray-500">
                  <span>{listing.location}</span>
                  <span>•</span>
                  <span>{listing.country}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => router.push(`/listing/${listing._id}/edit`)}
                  className="flex-1 px-6 py-3 font-semibold text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="flex-1 px-6 py-3 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
