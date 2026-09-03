# Apex Fusion — 1,000 Concurrent User Load Testing & DevOps Performance Guide

**Author**: Senior DevOps & Performance Engineering Team  
**System Under Test (SUT)**: Apex Fusion Online Registration / Lead Ingestion Pipeline  
**Target Endpoint**: `POST /api/register` (High-Throughput Edge API)  
**Concurrency Goal**: **1,000 Concurrent Virtual Users (VUs)** with Zero Queue Backpressure & p95 < 1500ms  

---

## 1. Technical Stack Configuration

| Layer | Technology & Configuration |
| :--- | :--- |
| **Frontend** | **Next.js 14.2 (React 18, TypeScript 5.7, Tailwind CSS 3.4)** with Client-Side Validation & Optimistic UI |
| **Backend Runtime** | **Next.js 14 Edge Runtime** (`export const runtime = 'edge';`) on Global Edge PoP Nodes (Node.js 20 fallback) |
| **Database & Destination** | **Managed PostgreSQL (Supabase / Neon)** via **Prisma ORM 5.22** + Connection Pooling (PgBouncer) |
| **Hosting & Edge CDN** | **Vercel Global Edge Network** + **Cloudflare DDoS/WAF & Anycast CDN** |
| **Target Form Endpoint** | `POST /api/register` (Payload: JSON with name, email, phone, role, board, city, interests, notes) |

---

## 2. Load Testing Script (k6) — 1,000 Concurrent VUs

The load test script is located in the repository at [`scripts/load_test_1000_vus.js`](file:///c:/Users/Satish%20Mungara/Documents/satish%20documents/Documents/Online%20Tutor/scripts/load_test_1000_vus.js).

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';

export const failureRate = new Rate('registration_failures');
export const successCounter = new Counter('successful_registrations');
export const formSubmitLatency = new Trend('registration_form_latency_ms');

const TARGET_URL = __ENV.TARGET_URL || 'http://localhost:3000/api/register';

export const options = {
  stages: [
    { duration: '30s', target: 50 },    // Stage 1: Warm-up (0 -> 50 VUs)
    { duration: '1m',  target: 250 },   // Stage 2: Moderate load (50 -> 250 VUs)
    { duration: '1m',  target: 500 },   // Stage 3: High load (250 -> 500 VUs)
    { duration: '2m',  target: 1000 },  // Stage 4: Peak surge (500 -> 1,000 VUs)
    { duration: '3m',  target: 1000 },  // Stage 5: Peak Plateau (Sustain 1,000 VUs)
    { duration: '1m',  target: 250 },   // Stage 6: Step down (1,000 -> 250 VUs)
    { duration: '30s', target: 0 },     // Stage 7: Cooldown (250 -> 0 VUs)
  ],
  thresholds: {
    // SLO 1: Latency thresholds
    http_req_duration: ['p(90)<1000', 'p(95)<1500', 'p(99)<3000'],
    // SLO 2: Error rate must stay strictly under 1%
    http_req_failed: ['rate<0.01'],
    registration_failures: ['rate<0.01'],
    registration_form_latency_ms: ['p(95)<1500'],
  },
};

const FIRST_NAMES = ['Aarav', 'Diya', 'Rohan', 'Ananya', 'Sai', 'Sneha', 'Kabir', 'Ishita', 'Arjun', 'Meera'];
const LAST_NAMES = ['Sharma', 'Verma', 'Mehta', 'Gupta', 'Reddy', 'Patel', 'Nair', 'Iyer', 'Singh', 'Mungara'];
const ROLES = ['STUDENT', 'PARENT', 'EDUCATOR', 'SCHOOL'];
const BOARDS = ['CBSE', 'ICSE', 'STATE'];

export default function () {
  const vuId = __VU;
  const iter = __ITER;
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const randNum = Math.floor(1000 + Math.random() * 9000);

  const payload = JSON.stringify({
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${vuId}_${iter}_${randNum}@example.com`,
    phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
    role: ROLES[Math.floor(Math.random() * ROLES.length)],
    board: BOARDS[Math.floor(Math.random() * BOARDS.length)],
    city: 'Bengaluru',
    interests: ['Live Classes (Morning Slot)', 'Google Gemini AI Doubt Solver'],
    notes: `k6 1,000 VU load test submission from VU #${vuId}`,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'k6-ApexFusion-LoadTest/1.0',
    },
    timeout: '10s',
  };

  const startReq = Date.now();
  const res = http.post(TARGET_URL, payload, params);
  const duration = Date.now() - startReq;
  formSubmitLatency.add(duration);

  const isSuccess = check(res, {
    'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
    'response has valid applicationId': (r) => {
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
  }

  // Realistic human pacing (0.5s to 2.0s think-time)
  sleep(0.5 + Math.random() * 1.5);
}
```

---

## 3. Step-by-Step Execution Guide

### 3.1 Prerequisite: Increase OS File Descriptor Limits (Client-Side)
Generating 1,000 concurrent TCP sockets requires raising open file descriptor limits:
```bash
# On Linux / macOS / WSL:
ulimit -n 65535

# On Windows (PowerShell Administrator):
# k6 on Windows handles socket scaling automatically via WinSock.
```

### 3.2 Install k6
```bash
# Windows (via Chocolatey or Winget):
winget install k6 --source winget
# OR
choco install k6

# macOS (Homebrew):
brew install k6

# Linux (Debian/Ubuntu):
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update && sudo apt-get install k6
```

### 3.3 Run Load Test Locally or Against Staging

```bash
# 1. Local Run against Localhost dev/production server:
k6 run scripts/load_test_1000_vus.js

# 2. Staging / Production Run with Custom URL:
k6 run --env TARGET_URL=https://staging.apexfusion.in/api/register scripts/load_test_1000_vus.js

# 3. Export Comprehensive Summary to JSON / HTML report:
k6 run --summary-export=load_test_report.json scripts/load_test_1000_vus.js
```

### 3.4 Alternative: Run with Locust (Python)
```bash
# Install Locust
pip install locust

# Headless run for 1,000 users with spawn rate of 50 users/sec for 5 minutes:
locust -f scripts/locustfile.py --headless -u 1000 -r 50 --run-time 5m --host=http://localhost:3000 --html=locust_report.html
```

---

## 4. Bottleneck Diagnostic Checklist

During the 1,000 VU load test run, monitor these 4 critical vectors in parallel:

### Vector A: Server & Compute Telemetry (Real-Time)
- **CPU Utilization**: Must remain **below 75%** during the 1,000 VU plateau.
  - *Diagnosis*: If CPU spikes to 100%, check for synchronous JSON schema validators or unmemoized cryptographic hashing on the main thread.
- **Memory (RAM) & Leak Detection**:
  - *Command (Linux/VPS)*: `htop` or `vmstat 1`
  - *Command (Node.js)*: `node --max-old-space-size=4096 server.js`
  - *Serverless (Vercel/AWS)*: Check Vercel Function Memory metrics. Should stay below 128 MB per invocation.
- **Event Loop Lag**:
  - Event loop lag must stay **< 20ms**. If lag exceeds 100ms, async I/O is being blocked by CPU-heavy tasks.

### Vector B: Database Connection Pool Sizing (Prisma & Postgres)
- **The Golden Formula for Database Pool Sizing**:
  $$\text{Pool Size} = ((\text{Core Count} \times 2) + \text{Effective Spindle Count})$$
- **Preventing Pool Starvation at 1,000 Concurrent VUs**:
  1. **Use PgBouncer (Transaction Pooling)**: Set connection mode to `transaction` so connections are returned to the pool immediately after SQL execution rather than held for the entire HTTP lifecycle.
  2. **Prisma Connection String Parameter**:
     ```
     DATABASE_URL="postgresql://user:pass@ep-cool-pooler.us-east-1.aws.neon.tech/neondb?pgbouncer=true&connection_limit=20&pool_timeout=10"
     ```
  3. **Check Active Connections in PostgreSQL**:
     ```sql
     SELECT count(*), state FROM pg_stat_activity GROUP BY state;
     ```
     *If `waiting` or `idle in transaction` exceeds 80% of `max_connections`, connection pool exhaustion is occurring.*

### Vector C: Latency Decomposition (Where is Time Spent?)
Deconstruct the total response time ($T_{\text{total}}$) into 4 distinct phases:
$$T_{\text{total}} = T_{\text{DNS+TLS}} + T_{\text{TTFB}} + T_{\text{App Compute}} + T_{\text{DB/IO}}$$

| Phase | Metric Name (k6) | Target SLO | Remediation if High |
| :--- | :--- | :--- | :--- |
| **Network & Handshake** | `http_req_connecting` + `http_req_tls_handshaking` | `< 50ms` | Enable HTTP/2 or HTTP/3 (QUIC) and Cloudflare Anycast CDN. |
| **Time to First Byte** | `http_req_waiting` (TTFB) | `< 250ms` | Use Edge Runtime (`runtime = 'edge'`) near users. |
| **App Processing** | `registration_form_latency_ms` | `< 50ms` | Optimize payload parsing and avoid synchronous logging. |
| **Database Write** | Database I/O Latency | `< 30ms` | Add indexes on `email` and `createdAt`; use write-behind queue if needed. |

### Vector D: Reverse Proxy & Rate Limiting (Cloudflare / Nginx)
- Check whether Cloudflare or Nginx is returning **HTTP 429 (Too Many Requests)** or **HTTP 502/504 (Bad Gateway/Gateway Timeout)**.
- Whitelist the load generator IP address or set custom bypass rules during testing:
  ```nginx
  # In Nginx:
  limit_req_zone $binary_remote_addr zone=api_reg:10m rate=500r/s;
  limit_req zone=api_reg burst=1000 nodelay;
  ```

---

## 5. Interpreting Results: Pass / Fail Matrix

At the conclusion of the test, k6 will output a summary table:

```
/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
  ? status is 200 or 201................: 100.00% ? 48520  ? 0
  ? response has valid applicationId....: 100.00% ? 48520  ? 0
  ? latency is under 1500ms.............: 99.85%  ? 48447  ? 73

  checks.........................: 99.95% ? 145487   ? 73
  http_req_duration..............: avg=48.2ms min=3.1ms med=24.5ms max=1820ms p(90)=82.1ms p(95)=124.8ms p(99)=410.2ms
  http_req_failed................: 0.00%  ? 0        ? 48520
  http_reqs......................: 48520  161.73/s
  vus............................: 1000   min=0      max=1000
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
```

### 5.1 Criteria for PASS:
1. ? **Error Rate (`http_req_failed`) < 1.0%**: Less than 1 in 100 requests returned non-2xx status codes.
2. ? **p95 Response Time < 1,500ms**: 95% of all concurrent submissions completed in under 1.5 seconds.
3. ? **p99 Response Time < 3,000ms**: 99% of submissions completed in under 3.0 seconds under peak 1,000 VU plateau.
4. ? **Zero Dropped TCP Connections / Reset by Peer errors**.

### 5.2 Failure Modes & Root Cause Action Plan:

| Symptom | Probable Root Cause | Immediate Action Plan |
| :--- | :--- | :--- |
| **HTTP 504 Gateway Timeout** | Backend execution exceeded serverless timeout or DB query hung. | Enable Edge Runtime, optimize DB query indexes, and increase lambda timeout to 15s. |
| **HTTP 500 Connection Refused** | Database connection pool exhausted (`max_connections` reached). | Switch to PgBouncer transaction pooling or scale database pool limit. |
| **HTTP 429 Too Many Requests** | Upstream WAF / Cloudflare rate limiting kicked in. | Adjust WAF rate-limiting rule thresholds for the `/api/register` path. |
| **p95 Latency > 3000ms** | CPU throttling or event loop blocking. | Scale horizontal container replicas or move CPU-intensive tasks to asynchronous background jobs. |
