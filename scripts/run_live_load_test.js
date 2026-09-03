/**
 * Apex Fusion — Live 1,000 Concurrent User Load Test Runner
 * Measures RPS, p50, p90, p95, p99, Max Latency, CPU/Memory telemetry, and Error Rates.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { performance } = require('perf_hooks');

const projectRoot = path.join(__dirname, '..');

const TARGET_URL = process.env.TARGET_URL || 'http://localhost:3000/api/register';
const TOTAL_CONCURRENT_USERS = 1000;

const FIRST_NAMES = ['Aarav', 'Diya', 'Rohan', 'Ananya', 'Sai', 'Sneha', 'Kabir', 'Ishita', 'Arjun', 'Meera', 'Aditya', 'Pooja'];
const LAST_NAMES = ['Sharma', 'Verma', 'Mehta', 'Gupta', 'Reddy', 'Patel', 'Nair', 'Iyer', 'Singh', 'Mungara'];
const ROLES = ['STUDENT', 'PARENT', 'EDUCATOR', 'SCHOOL'];
const BOARDS = ['CBSE', 'ICSE', 'STATE'];
const CITIES = ['Delhi NCR', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur'];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePayload(vuId, iter) {
  const first = getRandomItem(FIRST_NAMES);
  const last = getRandomItem(LAST_NAMES);
  const randNum = Math.floor(1000 + Math.random() * 9000);

  return JSON.stringify({
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${vuId}_${iter}_${randNum}@example.com`,
    phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
    role: getRandomItem(ROLES),
    board: getRandomItem(BOARDS),
    city: getRandomItem(CITIES),
    interests: ['Live Classes (Morning Slot)', 'Google Gemini AI Doubt Solver'],
    notes: `High-concurrency load test submission from VU #${vuId}`,
  });
}

async function sendRequest(vuId, iter) {
  const payload = generatePayload(vuId, iter);
  const start = performance.now();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(TARGET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'ApexFusion-DevOps-LoadRunner/1.0',
        'X-Load-Test': 'true',
      },
      body: payload,
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const duration = performance.now() - start;

    let isValid = false;
    let data = null;

    if (res.status === 200 || res.status === 201) {
      try {
        data = await res.json();
        isValid = data && data.success === true && typeof data.applicationId === 'string';
      } catch {}
    }

    return {
      status: res.status,
      duration,
      success: isValid,
      applicationId: data?.applicationId,
    };
  } catch (err) {
    const duration = performance.now() - start;
    return {
      status: 0,
      duration,
      success: false,
      error: err.message,
    };
  }
}

function calculatePercentiles(latencies) {
  if (latencies.length === 0) return { min: 0, med: 0, p90: 0, p95: 0, p99: 0, max: 0, avg: 0 };
  const sorted = [...latencies].sort((a, b) => a - b);
  const avg = sorted.reduce((a, b) => a + b, 0) / sorted.length;

  return {
    min: sorted[0],
    med: sorted[Math.floor(sorted.length * 0.5)],
    p90: sorted[Math.floor(sorted.length * 0.9)],
    p95: sorted[Math.floor(sorted.length * 0.95)],
    p99: sorted[Math.floor(sorted.length * 0.99)],
    max: sorted[sorted.length - 1],
    avg,
  };
}

async function runStage(stageName, concurrency, iterationsPerVU) {
  console.log(`\n=======================================================`);
  console.log(`🚀 [STAGE] ${stageName.toUpperCase()}: ${concurrency} Concurrent VUs (${concurrency * iterationsPerVU} Total Submissions)`);
  console.log(`=======================================================`);

  const memBefore = process.memoryUsage();
  const cpuStart = process.cpuUsage();
  const stageStartTime = performance.now();

  const allPromises = [];
  for (let vu = 1; vu <= concurrency; vu++) {
    for (let iter = 1; iter <= iterationsPerVU; iter++) {
      allPromises.push(sendRequest(vu, iter));
    }
  }

  const results = await Promise.all(allPromises);
  const stageDurationMs = performance.now() - stageStartTime;
  const cpuDiff = process.cpuUsage(cpuStart);
  const memAfter = process.memoryUsage();

  const latencies = results.map((r) => r.duration);
  const successful = results.filter((r) => r.success).length;
  const failed = results.length - successful;
  const stats = calculatePercentiles(latencies);
  const rps = (results.length / (stageDurationMs / 1000)).toFixed(1);
  const failureRatePercent = ((failed / results.length) * 100).toFixed(2);

  console.log(`  - Stage Duration       : ${(stageDurationMs / 1000).toFixed(2)} seconds`);
  console.log(`  - Requests Executed    : ${results.length} total (${rps} RPS)`);
  console.log(`  - Success Count (201)  : ${successful} (${((successful / results.length) * 100).toFixed(2)}%)`);
  console.log(`  - Failure Count        : ${failed} (${failureRatePercent}%)`);
  console.log(`  - Latency Min          : ${stats.min.toFixed(1)} ms`);
  console.log(`  - Latency Avg (Mean)   : ${stats.avg.toFixed(1)} ms`);
  console.log(`  - Latency Median (p50) : ${stats.med.toFixed(1)} ms`);
  console.log(`  - Latency p90          : ${stats.p90.toFixed(1)} ms`);
  console.log(`  - Latency p95          : ${stats.p95.toFixed(1)} ms`);
  console.log(`  - Latency p99          : ${stats.p99.toFixed(1)} ms`);
  console.log(`  - Latency Max          : ${stats.max.toFixed(1)} ms`);
  console.log(`  - Heap Used            : ${(memAfter.heapUsed / 1024 / 1024).toFixed(1)} MB (Delta: ${((memAfter.heapUsed - memBefore.heapUsed) / 1024 / 1024).toFixed(2)} MB)`);

  return {
    stageName,
    concurrency,
    totalRequests: results.length,
    successful,
    failed,
    failureRatePercent,
    rps,
    stats,
    stageDurationSec: (stageDurationMs / 1000).toFixed(2),
    heapMb: (memAfter.heapUsed / 1024 / 1024).toFixed(1),
  };
}

async function main() {
  console.log(`************************************************************************`);
  console.log(`  APEX FUSION DEVOPS LOAD TESTING HARNESS (1,000 CONCURRENT VUs)`);
  console.log(`  Target: ${TARGET_URL}`);
  console.log(`  System: ${os.cpus()[0]?.model} (${os.cpus().length} Cores) | RAM: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(1)} GB`);
  console.log(`  Time  : ${new Date().toISOString()}`);
  console.log(`************************************************************************`);

  // Verify baseline health check
  try {
    const health = await fetch(TARGET_URL);
    const healthJson = await health.json();
    console.log(`\n[PRE-CHECK] Endpoint health:`, healthJson);
  } catch (e) {
    console.error(`[PRE-CHECK ERROR] Cannot reach ${TARGET_URL}: ${e.message}`);
    process.exit(1);
  }

  const results = [];

  // Stage 1: Warm-up (50 VUs)
  results.push(await runStage('Stage 1: Warm-up', 50, 1));

  // Stage 2: Moderate Load (250 VUs)
  results.push(await runStage('Stage 2: Ramp-up', 250, 1));

  // Stage 3: High Concurrency (500 VUs)
  results.push(await runStage('Stage 3: High Load', 500, 1));

  // Stage 4: Peak Stress (1,000 Concurrent VUs)
  results.push(await runStage('Stage 4: Peak Stress (1,000 VUs)', 1000, 1));

  // Final Summary & Verification Report
  console.log(`\n************************************************************************`);
  console.log(`  FINAL LOAD TEST VERIFICATION SUMMARY & SLO EVALUATION`);
  console.log(`************************************************************************`);

  const peakStage = results[results.length - 1];
  const passedLatency = peakStage.stats.p95 < 1500;
  const passedErrors = parseFloat(peakStage.failureRatePercent) < 1.0;
  const passedOverall = passedLatency && passedErrors;

  console.log(`\nTarget Concurrency Sustained : ${peakStage.concurrency} Concurrent VUs`);
  console.log(`Peak Throughput (RPS)        : ${peakStage.rps} req/sec`);
  console.log(`Peak p95 Latency             : ${peakStage.stats.p95.toFixed(1)} ms [SLO: < 1500ms] -> ${passedLatency ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Peak Failure Rate            : ${peakStage.failureRatePercent}% [SLO: < 1.0%] -> ${passedErrors ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Overall Performance Verdict  : ${passedOverall ? '🏆 ALL SLO CHECKS PASSED (EXCELLENT)' : '⚠️ REQUIRES TUNING'}`);

  // Write summary report to disk
  fs.writeFileSync(
    path.join(projectRoot, 'load_test_results.json'),
    JSON.stringify({ timestamp: new Date().toISOString(), results, passedOverall }, null, 2),
    'utf8'
  );
  console.log(`\nReport saved to load_test_results.json\n`);
}

main().catch(console.error);
