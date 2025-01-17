'use client';

import { getListing } from '../../../api/listings';
import Image from 'next/image';
import { useQuery } from 'react-query';

export default function Listing({ id }: { id: string }) {
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
    <section className="h-screen flex items-center justify-center text-gray-600 body-font ">
      <div className="max-w-3xl mx-auto flex flex-col lg:flex-row items-center bg-white shadow-md rounded-lg ">
        {/* Image Section */}
        <div className="lg:w-1/2 w-full mb-6 lg:mb-0 rounded-l-md overflow-hidden">
          <Image
            src={listing.image.url}
            alt={listing.title}
            width={300}
            height={300}
            className="object-cover object-center h-full w-full "
          />
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2 w-full lg:pl-6 flex flex-col items-start text-left">
          <h2 className="text-gray-900 text-2xl font-semibold mb-2">
            {listing.title}
          </h2>
          <p className="leading-relaxed text-base mb-4 text-gray-700">
            {listing.description}
          </p>
          <h3 className="text-xl font-bold text-purple-600 mb-3">
            ${listing.price}
          </h3>
          <h3 className="text-sm text-gray-500 mb-2">{listing.location}</h3>
          <h3 className="text-sm text-gray-500 mb-4">{listing.country}</h3>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="px-4 py-2 font-semibold text-sm rounded-md text-gray-800 border border-gray-500 bg-transparent hover:bg-gray-300">
              Edit
            </button>
            <button className="px-4 py-2 font-semibold text-sm rounded-md text-red-800 bg-red-200 hover:bg-red-300">
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
