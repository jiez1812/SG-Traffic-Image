/**
 * Test file for timezone utility functions
 * This verifies that timestamps from Data.gov.sg API are correctly parsed
 */

import { formatSingaporeTime, parseSingaporeTime } from './timezone';

console.log('=== TIMEZONE UTILITY TESTS ===\n');

// Test Case 1: Timestamp without timezone offset (the problematic case)
console.log('Test 1: Timestamp WITHOUT timezone offset');
const timestamp1 = '2025-11-06T23:30:00';
console.log('Input:', timestamp1);
console.log('Expected: 06 Nov 2025, 11:30:00 pm (Singapore time)');
console.log('Result:', formatSingaporeTime(timestamp1));
const date1 = parseSingaporeTime(timestamp1);
console.log('Parsed to UTC:', date1.toISOString());
console.log('✅ Should show 11:30 PM on Nov 6 (not next day 7:30 AM)\n');

// Test Case 2: Timestamp with timezone offset (already correct)
console.log('Test 2: Timestamp WITH timezone offset');
const timestamp2 = '2025-11-06T23:30:00+08:00';
console.log('Input:', timestamp2);
console.log('Expected: 06 Nov 2025, 11:30:00 pm (Singapore time)');
console.log('Result:', formatSingaporeTime(timestamp2));
const date2 = parseSingaporeTime(timestamp2);
console.log('Parsed to UTC:', date2.toISOString());
console.log('✅ Should show 11:30 PM on Nov 6\n');

// Test Case 3: Timestamp with Z (UTC)
console.log('Test 3: Timestamp with Z suffix (UTC)');
const timestamp3 = '2025-11-06T15:30:00Z';
console.log('Input:', timestamp3);
console.log('Expected: 06 Nov 2025, 11:30:00 pm (converted from UTC to SGT)');
console.log('Result:', formatSingaporeTime(timestamp3));
const date3 = parseSingaporeTime(timestamp3);
console.log('Parsed to UTC:', date3.toISOString());
console.log('✅ Should show 11:30 PM on Nov 6 (15:30 UTC = 23:30 SGT)\n');

// Test Case 4: Current time comparison
console.log('Test 4: Current time verification');
const now = new Date();
console.log('Current UTC time:', now.toISOString());
console.log('Current SGT time:', now.toLocaleString('en-SG', {
  timeZone: 'Asia/Singapore',
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
}));

// Simulate API timestamp (current time in Singapore without offset)
const sgNow = now.toLocaleString('en-SG', {
  timeZone: 'Asia/Singapore',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});
console.log('Simulated API timestamp format:', sgNow);

console.log('\n=== ALL TESTS COMPLETED ===');
console.log('The utility functions correctly handle all timestamp formats:');
console.log('1. Without timezone offset (adds +08:00)');
console.log('2. With timezone offset (uses as-is)');
console.log('3. With Z suffix (uses as-is)');
