'use client';

import { getListings } from '../../api/listings';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';

import { Listings } from './types/listings';

export default function Page() {
  const router = useRouter();

  const {
    data: listings = [],
    isError,
    isLoading,
    error,
  } = useQuery<Listings[]>({
    queryKey: ['listings'],
    queryFn: getListings,
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

  const seeFullInfo = async (id: string) => {
    router.push(`/listing/${id}`);
  };

  return (
    <div className="container px-2 py-10 sm:mx-auto">
      <div className="flex flex-wrap w-full mb-5">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            Listings
          </h1>
          <div className="h-1 w-20 bg-purple-500 rounded"></div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((list) => (
          <div
            key={list._id}
            className="bg-gray-100 p-2 rounded-lg"
            onClick={() => seeFullInfo(list._id)}
          >
            <Image
              src={list.image.url}
              alt={list.image.filename}
              width={300}
              height={300}
              className="w-full h-72 sm:h-64 rounded-lg overflow-hidden"
            />

            <h3 className="tracking-widest text-purple-500 text-xs font-medium title-font mt-3">
              {list.title}
            </h3>
            <h2 className="text-lg text-gray-500 font-medium title-font mb-2">
              {list.location}
            </h2>
            <p className="leading-relaxed text-gray-700 text-base">
              ${list.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
