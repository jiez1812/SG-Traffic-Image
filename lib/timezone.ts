/**
 * Formats a timestamp from Data.gov.sg API to Singapore time.
 *
 * Data.gov.sg API returns timestamps in Singapore time (UTC+8) but without timezone offset.
 * For example: "2025-11-06T23:30:00"
 *
 * JavaScript's Date constructor interprets timestamps without timezone info as UTC,
 * which causes an 8-hour shift when converting to Singapore time.
 *
 * This function ensures the timestamp is properly interpreted as Singapore time
 * by adding the +08:00 offset if it's missing.
 *
 * @param isoString - ISO 8601 timestamp string from the API
 * @returns Formatted date string in Singapore locale
 */
export function formatSingaporeTime(isoString: string): string {
  // If the timestamp doesn't have timezone info (+XX:XX or Z), add Singapore offset
  let timestamp = isoString;
  if (!timestamp.includes('+') && !timestamp.includes('Z')) {
    timestamp = timestamp + '+08:00';
  }

  const date = new Date(timestamp);
  return date.toLocaleString('en-SG', {
    timeZone: 'Asia/Singapore',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

/**
 * Parses a timestamp from Data.gov.sg API and returns a Date object.
 * Ensures the timestamp is correctly interpreted as Singapore time.
 *
 * @param isoString - ISO 8601 timestamp string from the API
 * @returns Date object
 */
export function parseSingaporeTime(isoString: string): Date {
  let timestamp = isoString;
  if (!timestamp.includes('+') && !timestamp.includes('Z')) {
    timestamp = timestamp + '+08:00';
  }
  return new Date(timestamp);
}
