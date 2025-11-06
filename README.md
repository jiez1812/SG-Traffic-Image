# Singapore Traffic Monitor - Web Application

A modern, real-time web application for monitoring traffic conditions at Singapore's Woodlands and Tuas customs checkpoints. Built with Next.js 15, React 19, and Tailwind CSS.

## Overview

This web application provides real-time monitoring of traffic at Singapore's border checkpoints (Woodlands and Tuas) using the official [Data.gov.sg Traffic Images API](https://data.gov.sg/dataset/traffic-images). The app automatically refreshes every 20 seconds to display the latest traffic conditions.

## Features

- **Real-time Updates**: Automatically fetches and displays traffic images every 20 seconds
- **Dual Theme Support**:
  - Automatically follows system theme (dark/light)
  - Manual theme toggle for user preference
- **Responsive Design**:
  - Desktop: Side-by-side 2-column layout
  - Mobile: Toggle between Woodlands and Tuas views
- **Modern & Minimalist UI**: Clean interface with smooth transitions
- **Live Status Indicator**: Visual feedback showing auto-refresh status

## Monitored Locations

### Woodlands Customs
- **Camera 2704**: Before Woodlands Customs
- **Camera 2702**: Woodlands Customs
- **Camera 2701**: Woodlands Checkpoint (First Link)

### Tuas Customs
- **Camera 4712**: Before Tuas Customs
- **Camera 4713**: Tuas Customs
- **Camera 4703**: Tuas Checkpoint (Second Link)

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Data Source**: Data.gov.sg Traffic Images API

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone this repository:
```bash
git clone https://github.com/jiez1812/SG-Traffic-Image.git
cd SG-Traffic-Image
```

2. Navigate to the traffic-app directory:
```bash
cd traffic-app
```

3. Install dependencies:
```bash
npm install
```

4. Run the development server:
```bash
npm run dev
```

5. Open your browser and visit:
```
http://localhost:3000
```

### Production Build

To create an optimized production build:

```bash
npm run build
npm start
```

## Project Structure

```
traffic-app/
├── app/
│   ├── api/
│   │   └── traffic/
│   │       └── route.ts          # API endpoint for fetching traffic data
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page component
├── components/
│   ├── CameraImage.tsx           # Camera image display component
│   ├── ThemeProvider.tsx         # Theme context provider
│   └── ThemeToggle.tsx           # Theme toggle button
├── public/                       # Static assets
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Project dependencies
```

## Features Breakdown

### Auto-Refresh
The application automatically fetches new traffic images every 20 seconds, ensuring users always see the most current traffic conditions.

### Theme System
- **System Detection**: Automatically detects and applies your device's theme preference
- **Manual Toggle**: Click the sun/moon icon to manually switch between light and dark themes
- **Persistence**: Your theme preference is saved in local storage

### Responsive Layout
- **Desktop (≥768px)**: Two-column layout showing both Woodlands and Tuas simultaneously
- **Mobile (<768px)**: Toggle buttons to switch between Woodlands and Tuas views

### Camera Display
Each camera feed shows:
- Location name
- Camera ID
- Live traffic image
- Last update timestamp
- Loading state with spinner
- Error handling for failed image loads

## API Integration

The app uses an internal API route (`/api/traffic`) that:
1. Fetches data from Singapore's Data.gov.sg API
2. Filters for the 6 specific camera locations
3. Returns formatted data with timestamps
4. Implements error handling and caching strategies

## Performance Optimizations

- Server-side API caching disabled for real-time data
- Next.js Image component for optimized image loading
- Lazy loading and efficient re-rendering
- Minimal bundle size with tree-shaking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source. Please ensure compliance with Data.gov.sg's [Terms of Use](https://data.gov.sg/privacy-and-website-terms) when using the API.

## Data Source

Traffic images are provided by [Data.gov.sg](https://data.gov.sg) through their Traffic Images API.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Disclaimer

This application is for personal monitoring purposes. Please respect API rate limits and Data.gov.sg terms of service.

---

**Note**: This branch contains only the Next.js web application. For the Python script version, please check the main branch.
