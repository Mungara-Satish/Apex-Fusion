'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { SubscriptionPlan, PaymentTransaction } from '@/lib/types';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Landmark,
  CheckCircle2,
  X,
  Lock,
  Download,
  Sparkles,
  ArrowRight,
  Receipt,
} from 'lucide-react';

interface RazorpayCheckoutModalProps {
  plan: SubscriptionPlan;
  onClose: () => void;
  onSuccess?: (transaction: PaymentTransaction) => void;
}

export function RazorpayCheckoutModal({
  plan,
  onClose,
  onSuccess,
}: RazorpayCheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState<string>('student@okhdfcbank');
  const [cardNumber, setCardNumber] = useState<string>('4532 •••• •••• 8921');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedTxn, setCompletedTxn] = useState<PaymentTransaction | null>(null);

  const gstAmount = Math.round(plan.price * (plan.gstPercentage / 100));
  const totalAmount = plan.price + gstAmount;

  const handlePayNow = async () => {
    setIsProcessing(true);

    try {
      // 1. Create order
      const orderRes = await fetch('/api/payments/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: plan.id,
          userId: 'user-student-1',
          userName: 'Aarav Sharma',
          userEmail: 'aarav.sharma@eduten.org',
        }),
      });
      const orderData = await orderRes.json();

      // 2. Verify payment
      const verifyRes = await fetch('/api/payments/razorpay/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpayOrderId: orderData?.order?.id || `order_${Date.now()}`,
          razorpayPaymentId: `pay_rzp_${Date.now()}`,
          planId: plan.id,
          planTitle: plan.title,
          amount: totalAmount,
          invoiceNumber: orderData?.order?.invoiceNumber || `INV-EDUTEN-${Date.now()}`,
        }),
      });
      const verifyData = await verifyRes.json();

      if (verifyData?.success && verifyData?.transaction) {
        setCompletedTxn(verifyData.transaction);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
        if (onSuccess) onSuccess(verifyData.transaction);
      }
    } catch (e) {
      console.error('Payment error:', e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadInvoice = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-3xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Razorpay Brand Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between border-b border-blue-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-sm">
              ₹
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-sm">
                <span>Razorpay Trusted Checkout</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-[11px] text-blue-200">EduTen 10th Board EdTech • 256-Bit SSL Encrypted</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedTxn ? (
          /* Payment Success & GST Invoice View */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-foreground">
                Payment Successful & Pass Activated!
              </h3>
              <p className="text-xs text-muted-foreground">
                Transaction ID: <span className="font-mono font-semibold">{completedTxn.razorpayPaymentId}</span>
              </p>
            </div>

            {/* GST Tax Invoice Card */}
            <div className="p-5 rounded-2xl border border-border bg-muted/30 text-left space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <div>
                  <div className="font-bold text-foreground">Tax Invoice / Receipt</div>
                  <div className="text-[11px] text-muted-foreground font-mono">{completedTxn.invoiceNumber}</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold text-[10px]">
                  PAID VIA RAZORPAY
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subscription Plan:</span>
                  <span className="font-semibold text-foreground">{completedTxn.planTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student Name:</span>
                  <span className="font-semibold text-foreground">Aarav Sharma (CBSE Class 10)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Fee:</span>
                  <span className="font-semibold text-foreground">₹{plan.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18% Educational):</span>
                  <span className="font-semibold text-foreground">₹{gstAmount}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border font-bold text-sm">
                  <span>Total Amount Paid:</span>
                  <span className="text-primary">₹{totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleDownloadInvoice}
                className="px-4 py-2.5 rounded-xl border border-border hover:bg-muted text-foreground text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-4 h-4" /> Print / Save Tax Invoice
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold shadow-md shadow-primary/25 transition-all"
              >
                Continue to Dashboard &rarr;
              </button>
            </div>
          </div>
        ) : (
          /* Payment Selection Form */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Plan Summary */}
            <div className="p-4 rounded-2xl bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                  Selected CBSE Pass
                </span>
                <h4 className="font-bold text-sm text-foreground">{plan.title}</h4>
                <span className="text-xs text-muted-foreground">{plan.duration}</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-foreground">₹{totalAmount}</div>
                <div className="text-[10px] text-muted-foreground">incl. ₹{gstAmount} GST</div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'upi'
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                <QrCode className="w-5 h-5" />
                <span className="text-xs">UPI / QR</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'card'
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-xs">Cards / RuPay</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'netbanking'
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                <Landmark className="w-5 h-5" />
                <span className="text-xs">Net Banking</span>
              </button>
            </div>

            {/* Method Details */}
            {paymentMethod === 'upi' && (
              <div className="space-y-4 p-4 rounded-2xl border border-border bg-muted/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Scan UPI QR Code</span>
                  <div className="flex gap-2 text-[10px] font-bold text-muted-foreground">
                    <span className="text-blue-600">GPay</span>
                    <span className="text-purple-600">PhonePe</span>
                    <span className="text-sky-600">Paytm</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-xl bg-white border p-1 shadow-sm flex items-center justify-center shrink-0">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=eduten@razorpay%26pn=EduTen%26am=${totalAmount}`}
                      alt="UPI QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground">Or Enter UPI ID / VPA:</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-3 p-4 rounded-2xl border border-border bg-muted/20 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4532 0000 0000 0000"
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">Expiry Date</label>
                    <input
                      type="text"
                      defaultValue="08/28"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">CVV</label>
                    <input
                      type="password"
                      defaultValue="•••"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="space-y-2 p-4 rounded-2xl border border-border bg-muted/20 text-xs">
                <label className="font-semibold text-foreground">Select Indian Bank</label>
                <select className="w-full px-3 py-2 rounded-xl border border-border bg-background font-medium">
                  <option>HDFC Bank</option>
                  <option>State Bank of India (SBI)</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handlePayNow}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 disabled:opacity-50 transition-all"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing Payment via Razorpay...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Pay ₹{totalAmount} via Razorpay
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
