import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'eduten_webhook_secret';

    if (signature) {
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== signature) {
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
      }
    }

    const event = JSON.parse(rawBody);

    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      console.log('Razorpay payment captured successfully:', event.payload.payment.entity.id);
    }

    return NextResponse.json({ status: 'ok', received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
