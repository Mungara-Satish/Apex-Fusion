import crypto from 'crypto';
import { SubscriptionPlan, PaymentTransaction } from './types';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-session',
    type: 'SESSION_PASS',
    title: '1-on-1 Doubt Masterclass Pass',
    price: 299,
    originalPrice: 499,
    duration: 'Single 60-Min Session',
    popular: false,
    gstPercentage: 18,
    features: [
      '1 Hour Live Interactive Whiteboard class',
      'Verified IIT / Board Specialist Mentor',
      'Instant KaTeX Formula Notes & Recordings',
      'Personalized homework doubt correction',
    ],
  },
  {
    id: 'plan-monthly',
    type: 'MONTHLY_PASS',
    title: 'Monthly Board Accelerator Pass',
    price: 999,
    originalPrice: 1999,
    duration: '30 Days Full Access',
    popular: true,
    gstPercentage: 18,
    features: [
      'Unlimited Gemini AI Multimodal Doubt Solver',
      '4 Live 1-on-1 Mentorship Sessions',
      'All Chapter Mock Tests & CBSE 5-Section Papers',
      'Dedicated Parent Portal & Weekly WhatsApp Summary',
      '10-Year Solved Board PYQs & Formula Sheets',
    ],
  },
  {
    id: 'plan-crash-course',
    type: 'CRASH_COURSE',
    title: 'Complete 10th Board Exam Crash Pass (2025-26)',
    price: 2999,
    originalPrice: 5999,
    duration: 'Valid Till Board Exams 2026',
    popular: false,
    gstPercentage: 18,
    features: [
      'Everything in Monthly Pass till Final Exam Day',
      '16 Live Whiteboard Revision Masterclasses',
      'Topper Model Answer Script Comparisons',
      'Term 1 & Term 2 Official CBSE Mock Papers',
      'Printable CCE Term Report Cards for Parents',
      'Priority 24/7 AI & Tutor Doubt Resolution',
    ],
  },
];

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secretKey: string = process.env.RAZORPAY_KEY_SECRET || 'eduten_razorpay_secret_key'
): boolean {
  try {
    const generatedSignature = crypto
      .createHmac('sha256', secretKey)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    return generatedSignature === signature;
  } catch (e) {
    return false;
  }
}

export function generateInvoiceNumber(): string {
  const year = new Date().getFullYear();
  const randomHex = Math.floor(100000 + Math.random() * 900000);
  return `INV-EDUTEN-${year}-${randomHex}`;
}
