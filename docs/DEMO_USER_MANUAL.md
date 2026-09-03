# Apex Fusion — Comprehensive Demo User Manual & Test Script

This document provides a guided walkthrough for evaluators, stakeholders, and test engineers to experience all features of **Apex Fusion**.

---

## 1. Quick Access & Test Credentials

| Role | Name | Username / Email | Password | Target Board / Scope |
| :--- | :--- | :--- | :--- | :--- |
| **?? Student** | Aarav Sharma | `aarav.sharma@eduten.org` | `Aarav@2026` | CBSE Class 10 |
| **?? Student** | Rohan Mehta | `rohan.mehta@eduten.org` | `Rohan@ICSE10` | ICSE Class 10 |
| **?? Student** | Sai Krishna | `sai.krishna@eduten.org` | `Krishna@State10` | State Board Class 10 |
| **???????? Parent** | Rajesh Sharma | `rajesh.sharma@parent.org` | `Parent@2026` | Linked to Aarav (CBSE) |
| **????? Tutor** | Dr. Priya Raman | `priya.raman@eduten.org` | `Tutor@Physics10` | Senior Physics Mentor |
| **??? Admin** | Dr. Sanjay Gupta | `admin@eduten.org` | `Admin@Master2026` | Master Superuser |

---

## 2. Test Scenarios & Step-by-Step Walkthrough

### ?? Scenario 1: Default Vlog Landing Page & Admissions
1. Open `http://localhost:3000/`.
2. Observe the **3D Concept Models** (Ray Optics, Quadratic Curves, Smelting Metallurgy, Human Heart).
3. Scroll to the **Curriculum Breakdown** to view CBSE, ICSE, and State Board subjects.
4. Scroll to the **Live Timetable** showing the 4 daily class slots (Morning 6:30 AM, Afternoon 2:30 PM, Evening 6:00 PM, Night 8:30 PM).
5. Scroll down to the **Official Google Form Admission Hub**:
   - Click **"Open in Google Forms ?"** to verify the connected Google Form link.
   - Click **"Live Google Form Embed & Direct View"** to see the interactive iframe embedded in the website.

---

### ?? Scenario 2: Student Learning & AI Doubt Clearance
1. Navigate to `http://localhost:3000/login`.
2. Select **Student** &rarr; Enter `aarav.sharma@eduten.org` / `Aarav@2026` (or click 1-Click Demo Login) &rarr; Click **"Sign In"**.
3. You will land on the **Student Dashboard** (`/dashboard/student`):
   - Click **"+ Check In"** to increment the daily study streak.
   - Switch between **CBSE**, **ICSE**, and **State Board** using the board pills.
4. Click **"AI Doubt Solver"** (`/ai-doubt-solver`):
   - Type a question or click a prompt (e.g. *"Prove Pythagoras Theorem with diagram steps"*).
   - Click **"Solve with Gemini AI"**.
   - Notice the step-by-step LaTeX formula rendering via KaTeX and CBSE marking breakdown.
5. Click **"Subjects"** (`/subjects`):
   - Choose **Physics** (`/subjects/physics`) &rarr; View the 3D Optics artwork, chapter list, and formula cheatcard.
6. Click **"Passes"** (`/pricing`):
   - View the subscription tiers (Free, Booster ?499, Super Pass ?1,499) with Razorpay integration.

---

### ???????? Scenario 3: Parent Oversight & Diagnostic Reports
1. Sign out and go to `http://localhost:3000/login`.
2. Select **Parent** &rarr; Enter `rajesh.sharma@parent.org` / `Parent@2026` &rarr; Click **"Sign In"**.
3. You will land on the **Parent Portal** (`/dashboard/parent`):
   - Note that the header logo dynamically displays the connected student's board (`CBSE 10`).
   - Observe the **Weakness Heatmap** highlighting subjects that need revision.
   - Test the **WhatsApp/SMS Alert Simulator** by toggling notification switches.
4. Click **"CCE Report Card"** (`/parent/report-card`):
   - View the official CBSE 9-point scholastic grading card, attendance log, and download/print scorecard.

---

### ????? Scenario 4: Tutor Workspace & Video Uploads
1. Sign out and go to `http://localhost:3000/login`.
2. Select **Tutor** &rarr; Enter `priya.raman@eduten.org` / `Tutor@Physics10` &rarr; Click **"Sign In"**.
3. You will land on the **Tutor Dashboard** (`/dashboard/tutor`):
   - Note that the board badge is removed from the logo, displaying *Faculty & Mentor Portal*.
4. Click **"Recorded Video Masterclasses"** tab:
   - Click **"+ Add Recorded Video"** modal.
   - Select **"From Computer"** &rarr; Browse any local `.mp4`/`.webm`/`.mov` file &rarr; Watch the animated upload bar.
   - Select **"Google Drive"** &rarr; Paste a drive shareable link &rarr; Notice automatic `/preview` stream conversion.
   - Select **"Stream URL"** &rarr; Enter a direct video link.
   - Submit the form &rarr; Notice your masterclass appears in the library.
   - Click **"Watch Masterclass"** on any video &rarr; Test the adaptive player with **0.75x – 2x speed controls**.
5. Click **"Join Whiteboard Class"** (`/classroom/session-live-101`):
   - Test the digital whiteboard with pen tools, live chat, and student hand-raise audio simulation.

---

### ??? Scenario 5: Academic Admin Console & Credential Hub
1. Sign out and go to `http://localhost:3000/login`.
2. Select **Admin** &rarr; Enter `admin@eduten.org` / `Admin@Master2026` &rarr; Click **"Sign In"**.
3. You will land on the **Admin Console** (`/dashboard/admin`):
   - Review live platform metrics (4,820 Students, 3,940 Parents, Razorpay revenue).
4. Click **"Directory Hub"** (`/directory`):
   - View all students, parents, tutors, and admin credentials in a unified grid.
   - Click **"+ Add Student / Parent / Tutor"** to provision new accounts with custom pass tiers and auto-generated passwords.
   - Click the **"Interested Leads"** tab to view Google Form inquiries and 1-click enroll candidates.

---

## 3. Evaluation Checklist

- [x] Responsive layout on Desktop, Tablet, and Mobile devices.
- [x] Fast load times with zero TypeScript compilation errors (`tsc --noEmit`).
- [x] Functional AI Doubt Solver with real-time KaTeX LaTeX math rendering.
- [x] Multi-source video upload engine (Computer, Google Drive, Stream URL).
- [x] Strict role-based access control and parent-child data isolation.
- [x] Dynamic navbar logo badge reflecting role and student connection.
