# Apex Fusion — Comprehensive Technical & System Documentation

**Project Name**: Apex Fusion  
**Version**: 1.0.0-PROD  
**Target Milestone**: 2025-2026 10th-Grade Board Examination Academic Cycle (CBSE, ICSE, State Boards)  
**Repository**: [https://github.com/Mungara-Satish/Apex-Fusion](https://github.com/Mungara-Satish/Apex-Fusion)

---

## 1. Executive Summary & Architectural Goals

Apex Fusion is an enterprise-grade, full-stack educational web platform designed specifically for 10th-grade students preparing for Indian secondary school board examinations (CBSE, ICSE, and State Board/SSLC). The platform resolves the key pain points of existing e-learning software:

1. **Board-Specific Discrepancy Resolution**: Provides dedicated syllabi trees for CBSE, ICSE, and State Boards with chapter-level curriculum mapping, formula lists, and exam marking schemes.
2. **Multimodal AI Doubt Assistance**: Integrates Google Gemini 2.5 Flash to accept textbook snapshots and typed queries, outputting structured mathematical proofs in KaTeX LaTeX format.
3. **Multi-Source Video Infrastructure**: Allows tutors to publish recorded video masterclasses from local computer files (`.mp4`, `.webm`, `.mov`, `.mkv`), Google Drive shareable links (automatically converted into responsive `/preview` streams), or cloud CDN URLs.
4. **Role-Isolated Stakeholder Workspaces**: Strict role-based access control (RBAC) across Students, Parents, Tutors, and Administrators.
5. **Parental Academic Oversight**: Real-time Red-Amber-Green weakness heatmaps, attendance records, and CCE report cards.

---

## 2. Technology Stack & Component Architecture

### 2.1 Technology Matrix

| Layer | Component | Version / Library | Rationale |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | Next.js App Router | `14.2.20` | Server-Side Rendering (SSR), Server Components, dynamic API routes, and optimized client bundles. |
| **UI Library** | React | `18.3.1` | Concurrent rendering, Suspense boundaries, hooks (`useMemo`, `useCallback`, `useTransition`). |
| **Language** | TypeScript | `5.7.2` | Static typing, interface contracts, and compile-time error prevention. |
| **Styling & CSS** | Tailwind CSS | `3.4.16` | Utility-first responsive CSS, custom `#38bdf8` / `#0284c7` skyblue tokens, glassmorphism. |
| **Icons** | Lucide React | `0.468.0` | Accessible, tree-shakeable SVG vector icons. |
| **AI Vision Engine** | Google Gemini API | `gemini-2.5-flash` | Multimodal text & image processing with LaTeX formula generation. |
| **Math Typesetting** | KaTeX | `0.16.11` | Client-side LaTeX math and physics equation rendering. |
| **State Management** | Zustand | `5.0.2` | Boilerplate-free, reactive global state synchronized with LocalStorage. |
| **Data Visualization**| Recharts | `2.14.1` | SVG-based responsive performance charts, radar metrics, and weakness heatmaps. |
| **Payment Gateway** | Razorpay SDK | `v1` | Server-side order creation, checkout integration, and SHA-256 HMAC verification. |
| **Database ORM** | Prisma | `5.22.0` | Declarative schema modeling, migrations, and type-safe database queries. |

---

## 3. Role-Based Access Control (RBAC) & Security

The platform enforces strict authentication boundaries across 4 distinct user roles:

```
+-------------------------------------------------------------------------+
|                              APEX FUSION                                |
+-------------------------------------------------------------------------+
       |                     |                     |                     |
       v                     v                     v                     v
 [ ?? STUDENT ]        [ ???????? PARENT ]       [ ????? TUTOR ]         [ ??? ADMIN ]
       |                     |                     |                     |
 - Board Subjects      - Linked Ward Data    - Live Classrooms     - User Directory
 - Gemini AI Solver    - Weakness Heatmap    - Video Vault Upload  - Grant Credentials
 - Mock Tests          - CCE Report Card     - Student Doubts      - Leads Intake
 - Doubts & Passes     - SMS/WhatsApp Alert  - Whiteboard Tools    - Financial Volume
```

### 3.1 Security & Data Isolation Rules
1. **Parent Data Isolation**: A parent can **only** view data belonging to their linked student profile (`parentProfile.linkedStudentId`).
2. **Dynamic Logo Badge**:
   - For **Students**: Displays the student's active board badge (`CBSE 10`, `ICSE 10`, `STATE 10`).
   - For **Parents**: Displays the connected student's board badge.
   - For **Tutors & Admins**: Board badge is removed to maintain a universal faculty/admin view.
3. **Route Protection**: The `RoleAccessGuard` higher-order component blocks unauthorized URL traversal and redirects users to their appropriate dashboard.

---

## 4. Multimodal AI Doubt Clearance Pipeline

```
[ User Input (Photo / Text) ]
              |
              v
[ Next.js API Route: /api/ai/solve-doubt ]
              |
              v
[ Google Gemini 2.5 Flash API with Vision ]
              |
              +--> If Online: Returns Structured JSON + KaTeX LaTeX Equations
              |
              +--> If Network Fails: Heuristic Local Solver Fallback
              |
              v
[ Client MathRenderer: Step-by-Step Proof + Marking Scheme + Pro Tips ]
```

### AI Response Schema:
```json
{
  "solution": "1. Using Snell's Law: \\mu = \\frac{\\sin i}{\\sin r} ...",
  "keyFormulas": ["\\mu = \\frac{\\sin i}{\\sin r}", "\\sin C = \\frac{1}{\\mu}"],
  "markingBreakdown": {
    "step1": "Formula Statement: 1 Mark",
    "step2": "Substitution & Calculation: 2 Marks",
    "step3": "Final Unit & Direction: 1 Mark"
  },
  "commonMistakes": "Do not forget to state refractive index is dimensionless.",
  "boardExamTip": "Always draw ray diagrams with arrows indicating light direction."
}
```

---

## 5. Media & Video Masterclass Streaming Pipeline

Tutors can publish recorded video lectures using 3 different sources:

```
                         +-----------------------------------+
                         |   Publish Recorded Masterclass    |
                         +-----------------------------------+
                                  /         |         \
                                 /          |          \
                                v           v           v
                     [ ?? Local Computer ] [ ?? Drive ] [ ?? Stream URL ]
                                |           |           |
                                v           v           v
                     Local Blob URL   /file/d/{id}/    Direct MP4 / CDN
                     (createObjectURL)  preview          Stream URL
                                \           |           /
                                 \          |          /
                                  v         v         v
                         +-----------------------------------+
                         |       Adaptive Video Player       |
                         |  (HTML5 <video> / Dynamic IFrame) |
                         +-----------------------------------+
```

1. **Local Computer Upload**: Validates video formats (`video/mp4`, `video/webm`, `video/quicktime`, `video/mkv`), displays file size metadata (e.g. `142.5 MB`), tracks simulated progress, and creates a local blob stream (`URL.createObjectURL(file)`).
2. **Google Drive Integration**: Automatically matches `/file/d/{ID}/view` and converts it into `https://drive.google.com/file/d/{ID}/preview` for seamless responsive embedding.
3. **Direct Cloud CDN**: Supports direct MP4, WebM, and YouTube URLs with speed controls (`0.75x`, `1.0x`, `1.25x`, `1.5x`, `2.0x`).

---

## 6. Database ER Model (Prisma ORM)

```prisma
model User {
  id               String          @id @default(uuid())
  email            String          @unique
  name             String
  phone            String?
  role             Role            @default(STUDENT)
  board            Board           @default(CBSE)
  avatar           String?
  username         String?         @unique
  tempPassword     String?
  credentialStatus AccessStatus    @default(APPROVED)
  streakCount      Int             @default(1)
  points           Int             @default(0)
  parentProfile    ParentProfile?
  tutorProfile     TutorProfile?
  bookings         Booking[]
  doubts           Doubt[]
  doubtReplies     DoubtReply[]
  createdAt        DateTime        @default(now())
  updatedAt        DateTime        @updatedAt
}

model ParentProfile {
  id                 String   @id @default(uuid())
  userId             String   @unique
  user               User     @relation(fields: [userId], references: [id])
  linkedStudentId    String
  studentName        String
  studentRollNumber  String?
  studentSchool      String?
  studentBoard       Board    @default(CBSE)
  relationship       String   @default("Father")
  notifyOnTestScore  Boolean  @default(true)
  notifyOnAttendance Boolean  @default(true)
  whatsappAlerts     Boolean  @default(true)
}

model TutorProfile {
  id                String   @id @default(uuid())
  userId            String   @unique
  user              User     @relation(fields: [userId], references: [id])
  headline          String
  bio               String
  qualifications    String
  hourlyRate        Float    @default(500)
  rating            Float    @default(5.0)
  reviewCount       Int      @default(0)
  verified          Boolean  @default(true)
  subjectsTaught    String[]
  availabilitySlots String[]
}
```

---

## 7. API Specification

### 7.1 AI Doubt Solver API
- **Endpoint**: `POST /api/ai/solve-doubt`
- **Payload**:
  ```json
  {
    "query": "Solve mirror formula with u = -20cm, f = -10cm",
    "imageDataUrl": "data:image/jpeg;base64,...",
    "subject": "Physics",
    "chapter": "Ray Optics"
  }
  ```
- **Response**: `200 OK` with JSON solution object and LaTeX KaTeX tokens.

### 7.2 Razorpay Order Creation API
- **Endpoint**: `POST /api/payments/razorpay/create-order`
- **Payload**:
  ```json
  {
    "amount": 1499,
    "currency": "INR",
    "receipt": "rcpt_super_pass_101",
    "notes": { "passTier": "SUPER", "board": "CBSE" }
  }
  ```
- **Response**: `200 OK` with `orderId`, `amount`, `currency`, and Razorpay key.

---

## 8. Deployment & Execution Instructions

### 8.1 Development Environment
```bash
# Clone the repository
git clone https://github.com/Mungara-Satish/Apex-Fusion.git
cd Apex-Fusion

# Install dependencies
npm install

# Run TypeScript validation
npx tsc --noEmit

# Start development server
npm run dev
# Server runs on http://localhost:3000
```

### 8.2 Production Build
```bash
# Generate production bundle
npm run build

# Start production server
npm run start
```
