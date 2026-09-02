'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { SAMPLE_TUTORS, SAMPLE_LIVE_SESSIONS, SUBJECTS, CURRENT_STUDENT } from '@/lib/mock-data';
import { TutorProfile, LiveClassSession } from '@/lib/types';
import {
  Users,
  Star,
  ShieldCheck,
  Calendar,
  Clock,
  CheckCircle2,
  Filter,
  X,
  Sparkles,
  ArrowRight,
  Radio,
  Video,
  Zap,
  BookOpen,
  Award,
  Crown,
  Check,
  AlertCircle,
  Sun,
  Sunset,
  Moon,
  Sunrise,
} from 'lucide-react';

export default function TutorsPage() {
  const {
    addBooking,
    currentBoard,
    hasActiveSubscription,
    activePassName,
    setSubscription,
    enrolledLiveSessionIds,
    enrollInLiveSession,
  } = useAppStore();

  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedTiming, setSelectedTiming] = useState<string>('ALL');
  const [bookingModalTutor, setBookingModalTutor] = useState<TutorProfile | null>(null);

  // Modal form state
  const [bookingTopic, setBookingTopic] = useState<string>('');
  const [bookingSubjectId, setBookingSubjectId] = useState<string>(SUBJECTS[0].id);
  const [bookingSlot, setBookingSlot] = useState<string>('');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [enrollToast, setEnrollToast] = useState<string | null>(null);

  // Filter Live Sessions
  const filteredLiveSessions = SAMPLE_LIVE_SESSIONS.filter((session) => {
    const matchesSubject =
      selectedSubject === 'ALL' ||
      session.subjectName.toLowerCase().includes(selectedSubject.toLowerCase()) ||
      session.topic.toLowerCase().includes(selectedSubject.toLowerCase());

    const matchesTiming =
      selectedTiming === 'ALL' || session.timingCategory === selectedTiming;

    return matchesSubject && matchesTiming;
  });

  // Filter 1-on-1 Tutors
  const filteredTutors =
    selectedSubject === 'ALL'
      ? SAMPLE_TUTORS
      : SAMPLE_TUTORS.filter((t) =>
          t.subjectsTaught.some((s) => s.toLowerCase().includes(selectedSubject.toLowerCase()))
        );

  const handleOpenBooking = (tutor: TutorProfile) => {
    setBookingModalTutor(tutor);
    setBookingSlot(tutor.availabilitySlots[0] || 'Today 5:00 PM - 6:00 PM');
    setBookingSuccess(false);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingModalTutor || !bookingTopic) return;

    const sub = SUBJECTS.find((s) => s.id === bookingSubjectId);

    addBooking({
      studentId: CURRENT_STUDENT.id,
      studentName: CURRENT_STUDENT.name,
      tutorId: bookingModalTutor.userId,
      tutorName: bookingModalTutor.name,
      tutorAvatar: bookingModalTutor.avatar,
      subjectId: bookingSubjectId,
      subjectName: sub?.name || 'Science',
      topic: bookingTopic,
      scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
      durationMinutes: 60,
      status: 'CONFIRMED',
      meetingUrl: '/classroom/session-live-101',
      notes: bookingNotes,
      isLiveNow: true,
      isFreeWithSubscription: hasActiveSubscription,
    });

    setBookingSuccess(true);
  };

  const handleInstantLiveEnroll = (session: LiveClassSession) => {
    enrollInLiveSession(session.id);
    setEnrollToast(`Seat Reserved for "${session.title}" (100% Free with Active Subscription)!`);
    setTimeout(() => setEnrollToast(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Toast Notification */}
      {enrollToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span>{enrollToast}</span>
        </div>
      )}

      {/* Subscription Privilege Banner */}
      <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 border border-purple-500/30 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 shrink-0">
            <Crown className="w-6 h-6 fill-slate-950" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-[11px] uppercase tracking-wider border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> All-Access Subscription Active
              </span>
              <span className="hidden sm:inline text-xs text-purple-200">• {activePassName}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              All Live Classes & Timings are 100% Free with Your Subscription
            </h2>
            <p className="text-xs text-purple-200/90 leading-relaxed max-w-2xl">
              As an enrolled subscription holder, you get unlimited free access (₹0 fee) to all morning, afternoon, evening, and night live whiteboard classes and doubt clinics!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/pricing"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-colors"
          >
            Manage Passes
          </Link>
          <Link
            href="/classroom/session-live-101"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-rose-500/30 transition-all animate-pulse"
          >
            <Radio className="w-4 h-4" /> Enter Live Class &rarr;
          </Link>
        </div>
      </div>

      {/* SECTION 1: LIVE CLASSES TIMETABLE & SCHEDULE */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              <Radio className="w-4 h-4 animate-ping" /> Daily Live Classes & Masterclass Batches
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Live Classes Across Morning, Afternoon, Evening & Night Timings
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Choose the batch timing that fits your schedule. Free access unlocked with any subscription pass.
            </p>
          </div>

          {/* Timing Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {[
              { label: 'All Timings', value: 'ALL', icon: Clock },
              { label: 'Morning (7-12 AM)', value: 'MORNING', icon: Sunrise },
              { label: 'Afternoon (12-5 PM)', value: 'AFTERNOON', icon: Sun },
              { label: 'Evening (5-8 PM)', value: 'EVENING', icon: Sunset },
              { label: 'Night (8-10 PM)', value: 'NIGHT', icon: Moon },
            ].map((timing) => {
              const Icon = timing.icon;
              return (
                <button
                  key={timing.value}
                  onClick={() => setSelectedTiming(timing.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    selectedTiming === timing.value
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{timing.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Class Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLiveSessions.map((session) => {
            const isEnrolled = enrolledLiveSessionIds.includes(session.id);
            const isLive = session.status === 'LIVE_NOW';

            return (
              <div
                key={session.id}
                className={`rounded-3xl border transition-all flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl ${
                  isLive
                    ? 'border-rose-500/40 bg-gradient-to-b from-rose-500/5 via-card to-card ring-1 ring-rose-500/20'
                    : 'border-border bg-card'
                }`}
              >
                <div className="p-6 space-y-4">
                  {/* Top Status & Timing Row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {isLive ? (
                        <span className="px-2.5 py-1 rounded-full bg-rose-500 text-white font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-sm">
                          <Radio className="w-3 h-3 animate-pulse" /> Live Right Now
                        </span>
                      ) : session.status === 'STARTING_SOON' ? (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold text-[10px] uppercase tracking-wider border border-amber-500/30">
                          ⏳ Starting Soon
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-[10px] uppercase tracking-wider border border-indigo-500/20">
                          📅 Scheduled
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md bg-muted text-foreground text-[10px] font-bold">
                        {session.subjectName}
                      </span>
                    </div>

                    {/* Free with Subscription Badge */}
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-[10px] border border-emerald-500/30">
                      ₹0 Free Pass
                    </span>
                  </div>

                  {/* Timing & Day Pill */}
                  <div className="p-3 rounded-2xl bg-muted/40 border border-border/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{session.timeLabel}</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground font-semibold">
                      {session.dayLabel}
                    </span>
                  </div>

                  {/* Title & Topic */}
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-foreground text-base leading-snug line-clamp-2">
                      {session.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      <span className="font-semibold text-foreground">Topic: </span>
                      {session.topic}
                    </p>
                  </div>

                  {/* Tutor Details */}
                  <div className="flex items-center gap-3 pt-2 border-t border-border/60">
                    <img
                      src={session.tutorAvatar}
                      alt={session.tutorName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary/40 shadow-xs"
                    />
                    <div className="text-xs space-y-0.5">
                      <div className="font-bold text-foreground flex items-center gap-1">
                        <span>{session.tutorName}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <div className="text-[11px] text-muted-foreground line-clamp-1">
                        {session.tutorHeadline}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>👥 {session.enrolledStudentsCount}/{session.maxCapacity} Students Enrolled</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Free with Pass</span>
                  </div>

                  {isLive ? (
                    <Link
                      href={session.meetingUrl}
                      className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-rose-600/25 transition-all"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Live Whiteboard Class (Free) &rarr;</span>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleInstantLiveEnroll(session)}
                        className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                          isEnrolled
                            ? 'bg-emerald-600 text-white'
                            : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
                        }`}
                      >
                        {isEnrolled ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Reserved (Free Pass)</span>
                          </>
                        ) : (
                          <>
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Reserve Free Seat</span>
                          </>
                        )}
                      </button>

                      <Link
                        href={session.meetingUrl}
                        className="px-3.5 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-xs font-semibold text-foreground transition-colors"
                        title="Enter Classroom Preview"
                      >
                        Preview
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: 1-ON-1 SPECIALIST TUTORS WITH CUSTOM TIMINGS */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> 1-on-1 Personal Whiteboard Mentorship
            </div>
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
              Verified IIT & 10th Board Specialist Tutors
            </h2>
            <p className="text-xs text-muted-foreground">
              Select your preferred time slot for 1-on-1 personalized doubt solving. Unlocked free with subscription.
            </p>
          </div>

          {/* Subject Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {['ALL', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'English'].map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedSubject === sub
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {sub === 'ALL' ? 'All Mentors' : sub}
              </button>
            ))}
          </div>
        </div>

        {/* Tutor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-xl transition-all space-y-6"
            >
              <div className="space-y-4">
                {/* Tutor Profile Header */}
                <div className="flex items-start gap-4">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/30 shadow-xs"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-extrabold text-foreground">{tutor.name}</h3>
                      {tutor.verified && (
                        <span title="Verified Educator">
                          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-1 font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {tutor.rating}
                      </span>
                      <span className="text-muted-foreground">({tutor.reviewCount} reviews)</span>
                    </div>
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <span className="line-through text-muted-foreground font-normal">₹{tutor.hourlyRate}/hr</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 font-black text-[11px]">₹0 Free with Pass</span>
                    </div>
                  </div>
                </div>

                {/* Headline & Bio */}
                <div className="space-y-1">
                  <div className="text-xs font-bold text-foreground">{tutor.headline}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {tutor.bio}
                  </p>
                </div>

                {/* Qualifications */}
                <div className="p-3 rounded-2xl bg-muted/30 border border-border/70 text-xs space-y-1">
                  <div className="text-[11px] font-bold text-foreground flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-primary" /> Credentials:
                  </div>
                  <div className="text-muted-foreground text-[11px] leading-relaxed">
                    {tutor.qualifications}
                  </div>
                </div>

                {/* Subjects Taught */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Subjects Taught:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tutor.subjectsTaught.map((sub, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg bg-muted text-foreground text-[11px] font-medium border border-border"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Timing Slots */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Available Batch Timings:
                  </div>
                  <div className="space-y-1 text-xs">
                    {tutor.availabilitySlots.map((slot, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-1.5 rounded-xl bg-muted/20 text-muted-foreground text-[11px]"
                      >
                        <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{slot}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking CTA Button */}
              <button
                onClick={() => handleOpenBooking(tutor)}
                className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-primary/25"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book 1-on-1 Class (Free with Pass)</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 1-on-1 Booking Modal */}
      {bookingModalTutor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <img
                  src={bookingModalTutor.avatar}
                  alt={bookingModalTutor.name}
                  className="w-12 h-12 rounded-xl object-cover border border-primary/40"
                />
                <div>
                  <h3 className="text-base font-extrabold text-foreground">
                    Book Live Class with {bookingModalTutor.name}
                  </h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                    ✨ 100% Free Entry Unlocked (Active Subscription Pass)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setBookingModalTutor(null)}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-6 text-center space-y-4 animate-in zoom-in-95">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-foreground">Live Class Confirmed!</h4>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                    Your 1-on-1 session on &quot;{bookingTopic}&quot; is scheduled. Access link is active.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <Link
                    href="/classroom/session-live-101"
                    className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition-all flex items-center gap-1.5"
                  >
                    <span>Enter Live Classroom</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => setBookingModalTutor(null)}
                    className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-foreground"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Subject:</label>
                  <select
                    value={bookingSubjectId}
                    onChange={(e) => setBookingSubjectId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  >
                    {SUBJECTS.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name} (Grade 10 {currentBoard})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Topic / Doubt to Solve:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ray Optics sign conventions, Quadratic word problems"
                    value={bookingTopic}
                    onChange={(e) => setBookingTopic(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Select Batch Timing Slot:</label>
                  <select
                    value={bookingSlot}
                    onChange={(e) => setBookingSlot(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  >
                    {bookingModalTutor.availabilitySlots.map((slot, i) => (
                      <option key={i} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Student Notes / Question Context (Optional):</label>
                  <textarea
                    rows={2}
                    placeholder="Mention specific NCERT textbook exercises or previous year board questions..."
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span className="font-bold">Total Booking Fee:</span>
                  </div>
                  <div className="text-right">
                    <span className="line-through text-muted-foreground mr-1">₹{bookingModalTutor.hourlyRate}</span>
                    <span className="font-black text-sm text-emerald-600 dark:text-emerald-400">₹0 (Free Pass)</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingModalTutor(null)}
                    className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-foreground text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-sm shadow-primary/25"
                  >
                    <span>Confirm Booking (₹0 Free)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
