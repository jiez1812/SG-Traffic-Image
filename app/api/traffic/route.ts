import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Camera {
  timestamp: string;
  image: string;
  location: {
    latitude: number;
    longitude: number;
  };
  camera_id: string;
  image_metadata: {
    height: number;
    width: number;
    md5: string;
  };
}

interface TrafficData {
  items: Array<{
    timestamp: string;
    cameras: Camera[];
  }>;
  api_info: {
    status: string;
  };
}

export async function GET() {
  try {
    const now = new Date();
    const sgTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    const dateTime = sgTime.toISOString().split('.')[0];

    const response = await fetch(
      `https://api.data.gov.sg/v1/transport/traffic-images?date_time=${dateTime}`,

      {
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch traffic data');
    }

    const data: TrafficData = await response.json();

    // Camera IDs we're interested in
    const targetCameras = ['2704', '2702', '2701', '4712', '4713', '4703'];

    // Filter cameras
    const cameras = data.items[0]?.cameras.filter(
      (camera) => targetCameras.includes(camera.camera_id)
    );

    return NextResponse.json({
      timestamp: data.items[0]?.timestamp || new Date().toISOString(),
      cameras: cameras || [],
    });
  } catch (error) {
    console.error('Error fetching traffic data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch traffic data' },
      { status: 500 }
    );
  }
}
