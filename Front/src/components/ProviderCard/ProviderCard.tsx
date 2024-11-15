"use client";

import React from 'react';
import Image from 'next/image';
import { IProviderCardProps } from '@/interfaces/IServiceProvider';

const ProviderCard: React.FC<IProviderCardProps> = ({ name, experience, profileImageUrl, calification }) => {
  const flooredRating = typeof calification === 'number' && !isNaN(calification) ? Math.floor(calification) : 0;

  return (
    <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-shadow h-[400px] flex flex-col">
      <div className="w-full h-[200px] overflow-hidden rounded-t-lg">
        <Image
          className="object-cover w-full h-full"
          src={profileImageUrl || '/default-image.jpg'}
          alt={`${name} image`}
          width={400} 
          height={200} 
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        <p className="text-sm text-gray-500 dark:text-gray-400 my-2">{experience}</p>

        {/* Sección de calificación */}
        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              className={`w-5 h-5 ${index < flooredRating ? 'text-yellow-400' : 'text-gray-300'}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-label={`Rating ${index + 1} star`}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.538 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.783.57-1.838-.197-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.2 8.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
          ))}
          <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            {calification ? calification.toFixed(1) : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
