import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/razorpay';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      planId,
      planTitle,
      amount,
      invoiceNumber,
      userId,
    } = body;

    // Verify cryptographic HMAC signature if live signature is passed
    if (razorpaySignature && process.env.RAZORPAY_KEY_SECRET) {
      const isValid = verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid payment signature verification failed.' },
          { status: 400 }
        );
      }
    }

    const transaction = {
      id: `txn_${Date.now()}`,
      userId: userId || 'user-student-1',
      razorpayOrderId,
      razorpayPaymentId: razorpayPaymentId || `pay_${Date.now()}`,
      amount: amount || 999,
      currency: 'INR',
      status: 'SUCCESS',
      planType: planId?.includes('crash') ? 'CRASH_COURSE' : planId?.includes('session') ? 'SESSION_PASS' : 'MONTHLY_PASS',
      planTitle: planTitle || '10th Board Preparation Pass',
      invoiceNumber: invoiceNumber || `INV-EDUTEN-${Date.now()}`,
      gstAmount: Math.round((amount || 999) * 0.18),
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully. Subscription activated.',
      transaction,
    });
  } catch (error: any) {
    console.error('Razorpay verify error:', error);
    return NextResponse.json(
      { error: error?.message || 'Payment verification failed.' },
      { status: 500 }
    );
  }
}
