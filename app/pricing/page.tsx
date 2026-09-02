'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SUBSCRIPTION_PLANS } from '@/lib/razorpay';
import { SubscriptionPlan, PaymentTransaction } from '@/lib/types';
import { RazorpayCheckoutModal } from '@/components/razorpay-checkout-modal';
import {
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  CreditCard,
  Flame,
  ArrowRight,
  Bot,
  Video,
  FileCheck2,
} from 'lucide-react';

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [recentTxn, setRecentTxn] = useState<PaymentTransaction | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> CBSE Class 10 Board Passes
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Invest in 95%+ Board Exam Scores
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Full access to Google Gemini AI Doubt Solver, live 1-on-1 IIT mentors, CBSE 5-section mock exams, and the Parent oversight portal.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-3xl p-8 border flex flex-col justify-between space-y-8 relative transition-all ${
              plan.popular
                ? 'border-primary bg-gradient-to-b from-primary/5 via-card to-card shadow-xl ring-2 ring-primary/40'
                : 'border-border bg-card shadow-sm hover:shadow-md'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground font-extrabold text-xs shadow-md">
                MOST POPULAR FOR CBSE 2026
              </div>
            )}

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {plan.duration}
                </span>
                <h2 className="text-xl font-bold text-foreground mt-1">{plan.title}</h2>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-foreground">₹{plan.price}</span>
                <span className="text-sm text-muted-foreground line-through">₹{plan.originalPrice}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Save {Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)}%
                </span>
              </div>

              <div className="text-[11px] text-muted-foreground">
                +18% GST • Instant Razorpay / UPI Activation
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <div className="text-xs font-bold text-foreground">What’s included:</div>
                <ul className="space-y-2.5 text-xs text-muted-foreground">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => setSelectedPlan(plan)}
              className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                plan.popular
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/25'
                  : 'bg-muted hover:bg-muted/80 text-foreground'
              }`}
            >
              <CreditCard className="w-4 h-4" /> Get Pass with Razorpay
            </button>
          </div>
        ))}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="p-6 rounded-3xl border border-border bg-muted/30 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
        <div className="space-y-1">
          <div className="font-bold text-foreground flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Secure Razorpay & UPI
          </div>
          <p className="text-muted-foreground">Encrypted bank-grade checkout with GST invoices.</p>
        </div>
        <div className="space-y-1">
          <div className="font-bold text-foreground flex items-center justify-center gap-1.5">
            <Bot className="w-4 h-4 text-purple-500" /> Powered by Google Gemini
          </div>
          <p className="text-muted-foreground">24/7 multimodal step-by-step doubt resolution.</p>
        </div>
        <div className="space-y-1">
          <div className="font-bold text-foreground flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" /> 95%+ CBSE Score Guarantee
          </div>
          <p className="text-muted-foreground">Structured NCERT practice with topper comparisons.</p>
        </div>
      </div>

      {/* Modal Checkout */}
      {selectedPlan && (
        <RazorpayCheckoutModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onSuccess={(txn) => setRecentTxn(txn)}
        />
      )}
    </div>
  );
}
