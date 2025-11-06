'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import CameraImage from '@/components/CameraImage';

interface Camera {
  camera_id: string;
  image: string;
  timestamp: string;
}

interface TrafficData {
  timestamp: string;
  cameras: Camera[];
}

const CAMERA_LOCATIONS: Record<string, string> = {
  '2704': 'Before Woodlands Customs',
  '2702': 'Woodlands Customs',
  '2701': 'Woodlands Checkpoint (First Link)',
  '4712': 'Before Tuas Customs',
  '4713': 'Tuas Customs',
  '4703': 'Tuas Checkpoint (Second Link)',
};

const WOODLANDS_CAMERAS = ['2704', '2702', '2701'];
const TUAS_CAMERAS = ['4712', '4713', '4703'];

export default function Home() {
  const [trafficData, setTrafficData] = useState<TrafficData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'woodlands' | 'tuas'>('woodlands');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchTrafficData = async () => {
    try {
      const response = await fetch('/api/traffic', {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch traffic data');
      }

      const data: TrafficData = await response.json();
      setTrafficData(data);
      setError(null);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchTrafficData();

    // Set up interval to fetch every 20 seconds
    const interval = setInterval(() => {
      fetchTrafficData();
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const getCamerasByLocation = (cameraIds: string[]) => {
    if (!trafficData) return [];
    return cameraIds
      .map((id) => trafficData.cameras.find((cam) => cam.camera_id === id))
      .filter((cam): cam is Camera => cam !== undefined);
  };

  const woodlandsCameras = getCamerasByLocation(WOODLANDS_CAMERAS);
  const tuasCameras = getCamerasByLocation(TUAS_CAMERAS);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Singapore Traffic Monitor
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Live traffic images from Woodlands and Tuas customs
                </p>
              </div>
              <ThemeToggle />
            </div>

            {/* Mobile view toggle */}
            <div className="mt-4 md:hidden">
              <div className="flex gap-2">
                <button
                  onClick={() => setMobileView('woodlands')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    mobileView === 'woodlands'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Woodlands
                </button>
                <button
                  onClick={() => setMobileView('tuas')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    mobileView === 'tuas'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Tuas
                </button>
              </div>
            </div>

            {/* Status bar */}
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Auto-refresh every 20s
                  </span>
                </div>
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Last updated: {lastUpdate.toLocaleString('en-SG', {
                  timeZone: 'Asia/Singapore',
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading traffic data...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Woodlands Column */}
              <div
                className={`space-y-6 ${
                  mobileView === 'tuas' ? 'hidden md:block' : ''
                }`}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    Woodlands Customs
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Malaysia-Singapore border checkpoint
                  </p>
                </div>

                {woodlandsCameras.map((camera) => (
                  <CameraImage
                    key={camera.camera_id}
                    cameraId={camera.camera_id}
                    imageUrl={camera.image}
                    location={CAMERA_LOCATIONS[camera.camera_id]}
                    timestamp={camera.timestamp}
                  />
                ))}
              </div>

              {/* Tuas Column */}
              <div
                className={`space-y-6 ${
                  mobileView === 'woodlands' ? 'hidden md:block' : ''
                }`}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    Tuas Customs
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Malaysia-Singapore border checkpoint
                  </p>
                </div>

                {tuasCameras.map((camera) => (
                  <CameraImage
                    key={camera.camera_id}
                    cameraId={camera.camera_id}
                    imageUrl={camera.image}
                    location={CAMERA_LOCATIONS[camera.camera_id]}
                    timestamp={camera.timestamp}
                  />
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Data source:{' '}
              <a
                href="https://data.gov.sg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Data.gov.sg
              </a>
              {' '}- Singapore Government Traffic Images API
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
