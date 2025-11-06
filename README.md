# Singapore Traffic Image Downloader

A Python script that automatically downloads traffic camera images from Singapore's Data.gov.sg API for border checkpoint monitoring.

## Overview

This tool fetches real-time traffic images from selected cameras at Singapore's border checkpoints (Woodlands and Tuas) using the official [Data.gov.sg Traffic Images API](https://data.gov.sg/dataset/traffic-images). Images are automatically saved with timestamps for monitoring and archival purposes.

## Features

- Real-time traffic image retrieval from Singapore's government API
- Automatic timestamp generation and formatting
- Saves images with descriptive names including location and timestamp
- Monitors 6 strategic camera locations at border checkpoints

## Monitored Camera Locations

| Camera ID | Location |
|-----------|----------|
| 2702 | Woodlands Custom |
| 2701 | First Link |
| 4713 | Tuas Custom |
| 4703 | Second Link |
| 4712 | Before Tuas Custom |
| 2704 | Before Woodlands Custom |

## Requirements

- Python 3.x
- Required Python packages:
  - `requests`
  - `shutil` (built-in)
  - `json` (built-in)
  - `datetime` (built-in)

## Installation

1. Clone this repository:
```bash
git clone https://github.com/jiez1812/SG-Traffic-Image.git
cd SG-Traffic-Image
```

2. Install required dependencies:
```bash
pip install requests
```

3. Ensure the `traffic images/` directory exists (it will be created automatically if it doesn't exist):
```bash
mkdir -p "traffic images"
```

## Usage

Run the script directly:

```bash
python request_data.py
```

The script will:
1. Query the Data.gov.sg API for current traffic camera images
2. Filter for the specified camera locations
3. Download and save images to the `traffic images/` folder
4. Name each image with format: `[Location] [Timestamp].jpg`

### Example Output

Images are saved with names like:
- `Woodlands Custom 2019-07-05T143022.jpg`
- `First Link 2019-07-05T143022.jpg`
- `Tuas Custom 2019-07-05T143022.jpg`

## Code Structure

The main class `traffic_data_requests` contains the following methods:

- `__init__()`: Initialize API endpoint and camera configuration
- `generate_datetime_now()`: Generate current timestamp in API-compatible format
- `generate_request_url(strdt)`: Build API request URL with timestamp
- `request_json()`: Make HTTP request to the API
- `get_data()`: Parse JSON response from API
- `get_cameras()`: Extract camera data from API response
- `get_images()`: Download images from specified cameras
- `run()`: Main execution method

## API Reference

This script uses the [Singapore Government Traffic Images API](https://api.data.gov.sg/v1/transport/traffic-images):
- Endpoint: `https://api.data.gov.sg/v1/transport/traffic-images`
- Parameter: `date_time` (ISO 8601 format)

## Scheduling

To run this script periodically (e.g., every 5 minutes), you can set up a cron job:

```bash
# Edit crontab
crontab -e

# Add this line to run every 5 minutes
*/5 * * * * cd /path/to/SG-Traffic-Image && python request_data.py
```

## License

This project is open source. Please ensure compliance with Data.gov.sg's [Terms of Use](https://data.gov.sg/privacy-and-website-terms) when using the API.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Disclaimer

This tool is for personal use and monitoring purposes. Please be mindful of API rate limits and respect the Data.gov.sg terms of service.
