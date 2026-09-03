# Apex Fusion — 24/7 Production Hosting, Cloud Infrastructure & Rental Budget Guide

To make **Apex Fusion** live, accessible, and running 24 hours a day, 7 days a week globally, you need cloud infrastructure services covering 7 core layers.

---

## 1. Cloud Infrastructure & Service Stack Breakdown

```
+--------------------------------------------------------------------------------------------------+
|                                    24/7 PRODUCTION INFRASTRUCTURE                                |
+--------------------------------------------------------------------------------------------------+
| 1. DOMAIN NAME      : apex-fusion.com / apex-fusion.in (GoDaddy / Namecheap / Cloudflare)        |
| 2. WEB APP HOSTING  : Vercel / AWS Amplify / Render (Next.js 14 Serverless SSR + Edge CDN)       |
| 3. MANAGED DATABASE : Supabase / Neon / AWS RDS PostgreSQL (Prisma ORM Connection)               |
| 4. AI INFERENCE     : Google Gemini 2.5 Flash API (Google AI Studio / Vertex AI)                 |
| 5. VIDEO & STORAGE  : Cloudflare R2 / AWS S3 / Vimeo OTT (plus Google Drive Free Tier)           |
| 6. PAYMENT GATEWAY  : Razorpay Merchant Account (2% per domestic successful transaction)          |
| 7. NOTIFICATIONS    : Resend (Email) + Gupshup / Twilio (WhatsApp & SMS Scorecard Alerts)        |
+--------------------------------------------------------------------------------------------------+
```

---

## 2. Detailed Service-by-Service Specifications

### ? Custom Domain Name (Web Address)
- **Purpose**: Gives your platform its professional branding address (e.g., `https://apexfusion.in` or `https://apexfusion.com`).
- **Recommended Registrars**: Cloudflare Registrar, Namecheap, or GoDaddy.
- **Estimated Cost**: **?600 – ?1,200 per year** ($8 – $14/year).

---

### ? Next.js Web App Hosting (Compute & Edge CDN)
- **Purpose**: Hosts and serves your Next.js 14 server components, API routes (`/api/ai/solve-doubt`, `/api/payments/razorpay`), and responsive web pages 24/7 with automatic HTTPS/SSL and worldwide CDN caching.
- **Top Options**:
  - **Option A: Vercel (Recommended)**: Created by the authors of Next.js. Connects directly to your GitHub repo (`https://github.com/Mungara-Satish/Apex-Fusion`). Auto-deploys on every git push, provides free SSL certificates, DDoS protection, and global edge network.
    - *Free Tier*: Generous 100 GB bandwidth / mo (?0).
    - *Pro Tier*: **?1,650 / month ($20/mo)** for commercial scale and unlimited team bandwidth.
  - **Option B: Render / Railway / DigitalOcean Droplet**:
    - *Cost*: **?400 – ?1,000 / month ($5 – $12/mo)** for a persistent Node.js virtual server.

---

### ? Managed PostgreSQL Database (Prisma ORM)
- **Purpose**: Stores student profiles, parent links, tutor availability, test scores, doubt forum threads, and credentials.
- **Top Options**:
  - **Supabase (Recommended)**: Managed PostgreSQL with 500 MB database and automatic daily backups.
    - *Free Tier*: Up to 50,000 monthly active users (?0).
    - *Pro Tier*: **?2,000 / month ($25/mo)** for 8 GB storage and point-in-time recovery.
  - **Neon Serverless PostgreSQL**: Serverless branching database with generous free tier.
    - *Cost*: **?0 – ?1,500 / month ($0 – $19/mo)**.

---

### ? AI Engine API Credits (Google Gemini 2.5 Flash)
- **Purpose**: Powers the multimodal AI Doubt Solver (processing textbook photos and generating KaTeX LaTeX proofs).
- **Provider**: Google AI Studio / Google Cloud Vertex AI.
- **Cost**:
  - *Free Tier*: Up to 15 Requests Per Minute (RPM) completely free!
  - *Pay-as-you-go*: ~?0.006 per image doubt solved ($0.075 per 1M tokens) — ?500 covers thousands of student questions.

---

### ? Video Storage & Masterclass Streaming
- **Purpose**: Hosts recorded masterclasses and lecture videos.
- **Top Options**:
  - **Google Drive Integration (Already Built In)**: **100% Free** by using shareable Drive links!
  - **Cloudflare R2 Object Storage**: Zero egress fee storage for raw MP4 videos (**?0 for first 10 GB**, then ~?12/GB/month).
  - **Mux / Vimeo OTT / Bun.net**: For adaptive HLS multi-bitrate transcoding (**?800 – ?2,000 / month**).

---

### ? Payment Gateway Account (Razorpay)
- **Purpose**: Collects payments for Board Booster Passes (?499) and All-Access Super Passes (?1,499).
- **Provider**: Razorpay India.
- **Cost**:
  - *Setup & Maintenance*: **?0 Setup Fee, ?0 Annual Rental**.
  - *Transaction Fee*: 2% + GST per successful domestic payment.

---

### ? Transactional Email & WhatsApp/SMS (Optional)
- **Purpose**: Sends login credentials, parent weekly scorecards, and test completion alerts.
- **Providers**:
  - **Email**: Resend / SendGrid (Free for first 3,000 emails/month).
  - **WhatsApp / SMS**: Fast2SMS / Gupshup / Twilio (~?0.20 per SMS, ~?0.40 per WhatsApp template alert).

---

## 3. Estimated Monthly Budget Options

### ?? Plan A: Starter / Zero-Cost Launch (Ideal for Launch Phase)
| Service | Provider | Monthly Cost |
| :--- | :--- | :--- |
| **Domain** | Cloudflare / Namecheap | ~?80/mo (?999/year) |
| **Hosting** | Vercel Free Hobby Tier | **?0** |
| **Database** | Supabase Free PostgreSQL | **?0** |
| **AI Solver** | Google Gemini Free API Tier | **?0** |
| **Video Vault** | Google Drive / YouTube Embed | **?0** |
| **Payments** | Razorpay Gateway | **?0 fixed** (2% per sale) |
| **TOTAL** | | **~?80 to ?200 / month** |

---

### ?? Plan B: Growth & Production Scale (1,000 – 10,000 Active Users)
| Service | Provider | Monthly Cost |
| :--- | :--- | :--- |
| **Domain** | `.com` / `.in` Domain | ~?100/mo |
| **Hosting** | Vercel Pro (Commercial SLA) | ?1,650/mo ($20) |
| **Database** | Supabase Pro Managed Postgres | ?2,000/mo ($25) |
| **AI Solver** | Google Gemini Pay-As-You-Go | ~?500/mo |
| **Video Storage** | Cloudflare R2 / Vimeo OTT | ~?800/mo |
| **WhatsApp/SMS** | Gupshup / Fast2SMS Alerts | ~?400/mo |
| **TOTAL** | | **~?5,450 / month ($65/mo)** |

---

## 4. 4-Step Action Plan to Go Live 24/7 in 15 Minutes

1. **Step 1 — Purchase Domain**: Register `apexfusion.in` or `apexfusion.com` on GoDaddy / Cloudflare.
2. **Step 2 — Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) &rarr; Log in with GitHub.
   - Click **"Add New Project"** &rarr; Select `Mungara-Satish/Apex-Fusion`.
   - Add environment variables (Gemini API Key, Razorpay Keys, Database URL).
   - Click **"Deploy"** &rarr; Your site is live worldwide with free SSL in 60 seconds!
3. **Step 3 — Connect Database**:
   - Create a free project on [supabase.com](https://supabase.com).
   - Copy the PostgreSQL database connection string into your Vercel `DATABASE_URL` env variable.
   - Run `npx prisma db push`.
4. **Step 4 — Add Custom Domain**:
   - In Vercel Project Settings &rarr; Domains &rarr; Add your domain name.
