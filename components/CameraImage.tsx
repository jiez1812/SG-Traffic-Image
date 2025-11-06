'use client';

import Image from 'next/image';
import { useState } from 'react';

interface CameraImageProps {
  cameraId: string;
  imageUrl: string;
  location: string;
  timestamp: string;
}

export default function CameraImage({ cameraId, imageUrl, location, timestamp }: CameraImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-SG', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {location}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Camera ID: {cameraId}
        </p>
      </div>

      <div className="relative aspect-video bg-gray-100 dark:bg-gray-900">
        {hasError ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">Failed to load image</p>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            )}
            <Image
              src={imageUrl}
              alt={`${location} traffic camera`}
              fill
              className="object-cover"
              onLoadingComplete={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
              unoptimized
            />
          </>
        )}
      </div>

      <div className="p-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Last updated: {formatTime(timestamp)}
        </p>
      </div>
    </div>
  );
}
