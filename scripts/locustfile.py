# -*- coding: utf-8 -*-
"""
Apex Fusion — Locust Distributed Load Test (1,000 Concurrent Virtual Users)
Target: POST /api/register
Execution:
    locust -f scripts/locustfile.py --host=http://localhost:3000
    locust -f scripts/locustfile.py --headless -u 1000 -r 50 --run-time 5m --host=http://localhost:3000
"""

import random
import time
from locust import HttpUser, task, between, events

FIRST_NAMES = ["Aarav", "Diya", "Rohan", "Ananya", "Sai", "Sneha", "Kabir", "Ishita", "Arjun", "Meera"]
LAST_NAMES = ["Sharma", "Verma", "Mehta", "Gupta", "Reddy", "Patel", "Nair", "Iyer", "Singh", "Mungara"]
ROLES = ["STUDENT", "PARENT", "EDUCATOR", "SCHOOL"]
BOARDS = ["CBSE", "ICSE", "STATE"]
CITIES = ["Delhi NCR", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Jaipur"]
INTERESTS = [
    ["Live Classes (Morning Slot)", "Google Gemini AI Doubt Solver"],
    ["CCE Report Card Tracking", "Formula Sheet Cheatcards"],
    ["1-on-1 Mentor Session", "Board PYQ Solutions"],
]

class ApexFusionUser(HttpUser):
    # Think-time between 0.5s to 2.0s to simulate realistic human pacing
    wait_time = between(0.5, 2.0)

    @task(5)
    def submit_registration_form(self):
        """High-concurrency registration intake simulation"""
        first = random.choice(FIRST_NAMES)
        last = random.choice(LAST_NAMES)
        rand_id = random.randint(1000, 9999)

        payload = {
            "name": f"{first} {last}",
            "email": f"{first.lower()}.{last.lower()}_{rand_id}@example.com",
            "phone": f"+91 98{random.randint(10000000, 99999999)}",
            "role": random.choice(ROLES),
            "board": random.choice(BOARDS),
            "city": random.choice(CITIES),
            "interests": random.choice(INTERESTS),
            "notes": "Locust 1,000 VU load test automated form submission.",
        }

        headers = {
            "Content-Type": "application/json",
            "User-Agent": "Locust-ApexFusion-LoadTest/1.0",
        }

        start_time = time.time()
        with self.client.post("/api/register", json=payload, headers=headers, catch_response=True) as response:
            latency_ms = (time.time() - start_time) * 1000

            if response.status_code in [200, 201]:
                try:
                    data = response.json()
                    if data.get("success") is True and "applicationId" in data:
                        response.success()
                    else:
                        response.failure(f"Invalid JSON schema: {response.text[:100]}")
                except Exception as e:
                    response.failure(f"JSON decode failed: {str(e)}")
            else:
                response.failure(f"HTTP {response.status_code}: {response.text[:100]}")

    @task(1)
    def check_health_status(self):
        """Simulate lightweight health & telemetry poll"""
        self.client.get("/api/register")
