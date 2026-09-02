import { NextRequest, NextResponse } from 'next/server';
import { SUBSCRIPTION_PLANS, generateInvoiceNumber } from '@/lib/razorpay';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planId, userId, userName, userEmail } = body;

    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId) || SUBSCRIPTION_PLANS[1];

    const amountInPaise = plan.price * 100; // Razorpay expects amount in paise
    const gstAmount = Math.round(plan.price * 0.18);
    const invoiceNumber = generateInvoiceNumber();

    // In production with live Razorpay credentials, create order via Razorpay instance:
    // const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
    // const order = await razorpay.orders.create({ amount: amountInPaise, currency: 'INR', receipt: invoiceNumber });

    // Mock/Generated Razorpay Order for deterministic, robust local testing
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    return NextResponse.json({
      success: true,
      order: {
        id: orderId,
        amount: amountInPaise,
        currency: 'INR',
        receipt: invoiceNumber,
        planTitle: plan.title,
        priceINR: plan.price,
        gstAmountINR: gstAmount,
        invoiceNumber: invoiceNumber,
      },
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_eduten10th',
    });
  } catch (error: any) {
    console.error('Razorpay create-order error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create payment order.' },
      { status: 500 }
    );
  }
}
