'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { CURRENT_TUTOR } from '@/lib/mock-data';
import { MathRenderer } from '@/components/math-renderer';
import { RoleAccessGuard } from '@/components/role-access-guard';
import {
  UserCheck,
  Video,
  Calendar,
  Clock,
  HelpCircle,
  Star,
  DollarSign,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Plus,
  Send,
} from 'lucide-react';

export default function TutorDashboardPage() {
  const { bookings, doubts, addDoubtReply } = useAppStore();
  const [activeTab, setActiveTab] = useState<'schedule' | 'doubts' | 'availability'>('schedule');
  const [quickReplyText, setQuickReplyText] = useState<Record<string, string>>({});

  const tutorProfile = CURRENT_TUTOR.tutorProfile!;
  const upcomingBookings = bookings.filter((b) => b.status === 'CONFIRMED');
  const openDoubts = doubts.filter((d) => d.status === 'OPEN' || d.status === 'ANSWERED');

  const handleSendReply = (doubtId: string) => {
    const text = quickReplyText[doubtId];
    if (!text || !text.trim()) return;

    addDoubtReply(doubtId, {
      doubtId,
      authorId: CURRENT_TUTOR.id,
      authorName: CURRENT_TUTOR.name,
      authorRole: 'TUTOR',
      authorAvatar: CURRENT_TUTOR.avatar,
      content: text,
      isAccepted: false,
      isTutorVerified: true,
    });

    setQuickReplyText((prev) => ({ ...prev, [doubtId]: '' }));
  };

  return (
    <RoleAccessGuard allowedRoles={['TUTOR']} pageTitle="Faculty & Tutor Portal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Tutor Profile Header */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={CURRENT_TUTOR.avatar}
              alt={CURRENT_TUTOR.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400/50"
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{CURRENT_TUTOR.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1 border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Senior Mentor
                </span>
              </div>
              <p className="text-xs sm:text-sm text-indigo-200">{tutorProfile.headline}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/80 pt-1">
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-300" /> {tutorProfile.rating} ({tutorProfile.reviewCount} reviews)
                </span>
                <span>•</span>
                <span>₹{tutorProfile.hourlyRate} / hour</span>
                <span>•</span>
                <span>{tutorProfile.qualifications}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur border border-white/15 text-center min-w-[110px]">
              <div className="text-xl font-extrabold text-amber-300">₹32,500</div>
              <div className="text-[11px] text-white/80">Monthly Earnings</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur border border-white/15 text-center min-w-[110px]">
              <div className="text-xl font-extrabold text-emerald-300">48 hrs</div>
              <div className="text-[11px] text-white/80">Teaching Hours</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'schedule'
              ? 'bg-primary text-white shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <Calendar className="w-4 h-4" /> Booked Sessions ({upcomingBookings.length})
        </button>
        <button
          onClick={() => setActiveTab('doubts')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'doubts'
              ? 'bg-primary text-white shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Doubt Clearance Queue ({openDoubts.length})
        </button>
        <button
          onClick={() => setActiveTab('availability')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'availability'
              ? 'bg-primary text-white shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <Clock className="w-4 h-4" /> Weekly Availability
        </button>
      </div>

      {/* Tab 1: Booked Live Sessions */}
      {activeTab === 'schedule' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Upcoming Student Classes</h2>
            <span className="text-xs text-muted-foreground">Synchronized with Student Calendars</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingBookings.map((session) => (
              <div
                key={session.id}
                className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                      {session.subjectName}
                    </span>
                    {session.isLiveNow ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white animate-pulse">
                        READY TO START
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground font-medium">
                        {session.durationMinutes} Mins Session
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-base text-foreground">{session.topic}</h3>
                  <div className="text-xs text-muted-foreground">
                    Student: <span className="font-semibold text-foreground">{session.studentName}</span>
                  </div>
                  {session.notes && (
                    <p className="text-xs bg-muted/50 p-2.5 rounded-lg text-muted-foreground">
                      📝 Student Note: {session.notes}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-600">
                    Payout: ₹{tutorProfile.hourlyRate}
                  </span>
                  <Link
                    href={session.meetingUrl || '/classroom/session-live-101'}
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <Video className="w-3.5 h-3.5" /> Start Live Classroom &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Doubt Queue */}
      {activeTab === 'doubts' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Pending Student Questions</h2>
            <span className="text-xs text-muted-foreground">Provide verified step-by-step solutions</span>
          </div>

          <div className="space-y-4">
            {openDoubts.map((doubt) => (
              <div
                key={doubt.id}
                className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                      {doubt.subjectName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Asked by {doubt.studentName} ({doubt.studentBoard})
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-md">
                    {doubt.status}
                  </span>
                </div>

                <h3 className="font-bold text-foreground text-sm">
                  <MathRenderer math={doubt.title} />
                </h3>
                <p className="text-xs text-muted-foreground">{doubt.content}</p>

                {/* Quick reply box */}
                <div className="pt-2 border-t border-border space-y-2">
                  <label className="text-xs font-semibold text-foreground">
                    Write Verified Solution (supports LaTeX formulas e.g. <MathRenderer math="\frac{1}{f} = \frac{1}{v} + \frac{1}{u}" />):
                  </label>
                  <textarea
                    rows={3}
                    value={quickReplyText[doubt.id] || ''}
                    onChange={(e) =>
                      setQuickReplyText((prev) => ({ ...prev, [doubt.id]: e.target.value }))
                    }
                    placeholder="Provide step-by-step proof or explanation..."
                    className="w-full p-3 rounded-xl border border-border bg-muted/30 text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                  />
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/doubts/${doubt.id}`}
                      className="text-xs text-primary font-semibold hover:underline"
                    >
                      View full thread & replies &rarr;
                    </Link>
                    <button
                      onClick={() => handleSendReply(doubt.id)}
                      className="px-4 py-2 rounded-xl bg-primary text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-primary/90 transition-all shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" /> Post Verified Solution
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Weekly Availability */}
      {activeTab === 'availability' && (
        <div className="p-6 rounded-2xl border border-border bg-card space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">Active Hourly Availability Slots</h2>
              <p className="text-xs text-muted-foreground">Students can book 1-on-1 sessions during these open windows.</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Slot
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tutorProfile.availabilitySlots.map((slot, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-border bg-muted/30 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-xs text-foreground">{slot}</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </RoleAccessGuard>
  );
}
