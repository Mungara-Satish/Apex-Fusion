/**
 * Apex Fusion — k6 Production Load Test (1,000 Concurrent Virtual Users)
 *
 * Target: POST /api/register
 * Payload: Realistic dynamic JSON user registration applications
 * SLO Thresholds:
 *   - p95 latency < 1500ms
 *   - p99 latency < 3000ms
 *   - Failure rate < 1.0% (99%+ Success)
 *
 * Usage:
 *   k6 run scripts/load_test_1000_vus.js
 *   k6 run --env TARGET_URL=https://your-staging-domain.com/api/register scripts/load_test_1000_vus.js
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';

// Custom Telemetry Metrics
export const failureRate = new Rate('registration_failures');
export const successCounter = new Counter('successful_registrations');
export const formSubmitLatency = new Trend('registration_form_latency_ms');

// Dynamic Target URL (Local Dev or Staging/Production)
const TARGET_URL = __ENV.TARGET_URL || 'http://localhost:3000/api/register';

// 1,000 Virtual Users Ramping Configuration
export const options = {
  stages: [
    { duration: '30s', target: 50 },    // Warm-up ramp: 0 -> 50 VUs
    { duration: '1m',  target: 250 },   // Moderate traffic: 50 -> 250 VUs
    { duration: '1m',  target: 500 },   // High load: 250 -> 500 VUs
    { duration: '2m',  target: 1000 },  // Peak surge: 500 -> 1,000 VUs
    { duration: '3m',  target: 1000 },  // Peak Plateau: Sustain 1,000 Concurrent VUs
    { duration: '1m',  target: 250 },   // Step down: 1,000 -> 250 VUs
    { duration: '30s', target: 0 },     // Cooldown: 250 -> 0 VUs
  ],
  thresholds: {
    // 95% of requests must complete below 1.5s; 99% below 3.0s
    http_req_duration: ['p(90)<1000', 'p(95)<1500', 'p(99)<3000'],
    // HTTP failure rate must stay strictly under 1%
    http_req_failed: ['rate<0.01'],
    registration_failures: ['rate<0.01'],
    // Form processing latency trend
    registration_form_latency_ms: ['p(95)<1500'],
  },
};

// Seed Data for Dynamic Realistic Payloads
const FIRST_NAMES = ['Aarav', 'Diya', 'Rohan', 'Ananya', 'Sai', 'Sneha', 'Kabir', 'Ishita', 'Arjun', 'Meera', 'Aditya', 'Pooja'];
const LAST_NAMES = ['Sharma', 'Verma', 'Mehta', 'Gupta', 'Reddy', 'Patel', 'Nair', 'Iyer', 'Chopra', 'Singh', 'Deshmukh', 'Mungara'];
const ROLES = ['STUDENT', 'PARENT', 'EDUCATOR', 'SCHOOL'];
const BOARDS = ['CBSE', 'ICSE', 'STATE'];
const CITIES = ['Delhi NCR', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur'];
const INTEREST_OPTIONS = [
  ['Live Classes (Morning Slot)', 'Google Gemini AI Doubt Solver'],
  ['CCE Report Card Tracking', 'Formula Sheet Cheatcards'],
  ['1-on-1 Mentor Session', 'Board PYQ Solutions'],
  ['Class 10 State Board Intensive', 'Diagnostic Mock Test'],
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function () {
  const vuId = __VU;
  const iter = __ITER;
  const firstName = getRandomItem(FIRST_NAMES);
  const lastName = getRandomItem(LAST_NAMES);
  const randomNum = Math.floor(1000 + Math.random() * 9000);

  // Generate unique realistic candidate payload
  const payload = JSON.stringify({
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${vuId}_${iter}_${randomNum}@example.com`,
    phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
    role: getRandomItem(ROLES),
    board: getRandomItem(BOARDS),
    city: getRandomItem(CITIES),
    interests: getRandomItem(INTEREST_OPTIONS),
    notes: `Concurrent load test submission from VU #${vuId} at ${new Date().toISOString()}`,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'k6-ApexFusion-LoadTest/1.0',
      'X-Load-Test': 'true',
    },
    timeout: '10s',
  };

  const startReq = Date.now();
  const res = http.post(TARGET_URL, payload, params);
  const duration = Date.now() - startReq;
  formSubmitLatency.add(duration);

  // Validate HTTP 201/200 and JSON response schema
  const isSuccess = check(res, {
    'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
    'response has applicationId': (r) => {
      try {
        const json = JSON.parse(r.body);
        return json && json.success === true && typeof json.applicationId === 'string';
      } catch {
        return false;
      }
    },
    'latency is under 1500ms': () => duration < 1500,
  });

  if (isSuccess) {
    successCounter.add(1);
    failureRate.add(0);
  } else {
    failureRate.add(1);
    console.warn(`[VU ${vuId}] Request failed with HTTP ${res.status}: ${res.body ? res.body.substring(0, 100) : 'No body'}`);
  }

  // Realistic human think-time jitter (0.5s to 2.0s) between submissions
  sleep(0.5 + Math.random() * 1.5);
}
