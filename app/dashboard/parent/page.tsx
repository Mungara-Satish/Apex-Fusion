'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { SAMPLE_BOOKINGS } from '@/lib/mock-data';
import { WeaknessHeatmap } from '@/components/weakness-heatmap';
import { PerformanceChart } from '@/components/charts/performance-chart';
import { SubjectRadarChart } from '@/components/charts/subject-radar';
import { RoleAccessGuard } from '@/components/role-access-guard';
import {
  HeartHandshake,
  GraduationCap,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Flame,
  Award,
  Bell,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Lock,
  UserCheck,
  Plus,
  X,
  School,
  IdCard,
} from 'lucide-react';

interface LinkedChild {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  board: string;
  rollNumber: string;
  school: string;
  inviteCode: string;
  attendance: string;
  streak: number;
  studyHours: number;
  readinessScore: string;
}

const INITIAL_LINKED_CHILDREN: LinkedChild[] = [
  {
    id: 'user-student-1',
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    grade: 'Class 10',
    board: 'CBSE',
    rollNumber: 'CBSE-2026-X-1048',
    school: 'Delhi Public School, R.K. Puram',
    inviteCode: 'AARAV10TH',
    attendance: '98.5%',
    streak: 7,
    studyHours: 18.5,
    readinessScore: '93.2% (A1)',
  },
];

export default function ParentDashboardPage() {
  const { currentUser } = useAppStore();

  const [linkedChildren, setLinkedChildren] = useState<LinkedChild[]>(INITIAL_LINKED_CHILDREN);
  const [selectedChildId, setSelectedChildId] = useState<string>('user-student-1');
  const [showLinkModal, setShowLinkModal] = useState<boolean>(false);
  const [newInviteCode, setNewInviteCode] = useState<string>('');
  const [linkError, setLinkError] = useState<string | null>(null);

  const [whatsappAlerts, setWhatsappAlerts] = useState<boolean>(true);
  const [emailAlerts, setEmailAlerts] = useState<boolean>(true);
  const [alertSentToast, setAlertSentToast] = useState<boolean>(false);

  const activeChild =
    linkedChildren.find((c) => c.id === selectedChildId) || linkedChildren[0];

  const handleTestAlert = () => {
    setAlertSentToast(true);
    setTimeout(() => setAlertSentToast(false), 3000);
  };

  const handleLinkNewChild = (e: React.FormEvent) => {
    e.preventDefault();
    setLinkError(null);

    if (newInviteCode.toUpperCase() === 'DIYA10TH') {
      const newChild: LinkedChild = {
        id: 'user-student-2',
        name: 'Diya Sharma',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        grade: 'Class 10',
        board: 'CBSE',
        rollNumber: 'CBSE-2026-X-1049',
        school: 'Delhi Public School, R.K. Puram',
        inviteCode: 'DIYA10TH',
        attendance: '96.0%',
        streak: 5,
        studyHours: 16.0,
        readinessScore: '91.0% (A1)',
      };
      setLinkedChildren([...linkedChildren, newChild]);
      setSelectedChildId('user-student-2');
      setShowLinkModal(false);
      setNewInviteCode('');
    } else if (newInviteCode.toUpperCase() === 'AARAV10TH') {
      setLinkError('This child (Aarav Sharma) is already linked to your parent account.');
    } else {
      setLinkError('Invalid student invite code. Please check the code in your child’s student profile.');
    }
  };

  return (
    <RoleAccessGuard allowedRoles={['PARENT']} pageTitle="Parent Oversight Portal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Child Data Isolation Notice */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 font-bold text-emerald-800 dark:text-emerald-300">
            <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              🔒 Strict 1:1 Child Data Isolation Enforced: You are securely viewing exclusive progress metrics only for your verified linked child ({activeChild.name}). No external student data is accessible.
            </span>
          </div>
          <span className="hidden md:inline px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-extrabold text-[10px] uppercase tracking-wider shrink-0">
            Encrypted Oversight
          </span>
        </div>

        {/* Linked Children Switcher & Add Child Button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Viewing Ward:
            </span>
            <div className="flex items-center gap-2">
              {linkedChildren.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChildId(child.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold border transition-all ${
                    selectedChildId === child.id
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 shadow-sm ring-1 ring-emerald-500/30'
                      : 'border-border bg-card text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <img
                    src={child.avatar}
                    alt={child.name}
                    className="w-5 h-5 rounded-full object-cover border border-emerald-500/40"
                  />
                  <span>{child.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20">
                    {child.grade} {child.board}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowLinkModal(true)}
            className="px-3.5 py-2 rounded-2xl border border-border bg-card hover:bg-muted text-xs font-bold text-foreground flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-primary" />
            <span>Link Another Child with Invite Code</span>
          </button>
        </div>

        {/* Header Banner for Linked Child */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={activeChild.avatar}
              alt={activeChild.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400/60 shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Linked Ward
                </span>
                <span className="text-xs text-emerald-300/80">• Parent: Rajesh Sharma (Father)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold">
                {activeChild.name}&apos;s Academic Progress
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-200/90 pt-0.5">
                <span className="flex items-center gap-1">
                  <School className="w-3.5 h-3.5" /> {activeChild.school}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" /> {activeChild.grade} {activeChild.board}
                </span>
                <span>•</span>
                <span>Roll No: {activeChild.rollNumber}</span>
              </div>
            </div>
          </div>

          {/* Quick Report Card Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/parent/report-card"
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
            >
              <FileText className="w-4 h-4" /> View {activeChild.name}&apos;s CBSE Report Card &rarr;
            </Link>
          </div>
        </div>

        {/* KPI Stats Overview for Linked Child */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
              <span>Class Attendance</span>
              <Calendar className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {activeChild.attendance}
            </div>
            <div className="text-[11px] text-muted-foreground">12/12 Live Sessions Attended</div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
              <span>Study Streak</span>
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-500">{activeChild.streak} Days Active</div>
            <div className="text-[11px] text-muted-foreground">Daily revision uninterrupted</div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
              <span>Weekly Study Time</span>
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-black text-foreground">{activeChild.studyHours} Hours</div>
            <div className="text-[11px] text-emerald-600 font-semibold">+2.5 hrs above weekly goal</div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
              <span>Board Readiness</span>
              <Award className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
              {activeChild.readinessScore}
            </div>
            <div className="text-[11px] text-muted-foreground">Projected 95%+ in Boards</div>
          </div>
        </div>

        {/* Main Grid: Attendance Logs & Weekly Hours for Linked Child */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left (8 cols): Chapter Weakness Heatmap for Linked Child */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 rounded-3xl border border-border bg-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-foreground">
                    {activeChild.name}&apos;s Chapter-Wise Weakness & Mastery Heatmap
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Real-time test accuracy across all 10th-grade CBSE chapters for {activeChild.name}.
                  </p>
                </div>
              </div>

              <WeaknessHeatmap />
            </div>

            {/* Attendance Logs */}
            <div className="p-6 rounded-3xl border border-border bg-card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  Live Class Attendance History ({activeChild.name})
                </h3>
                <span className="text-xs font-bold text-emerald-600">100% Verified</span>
              </div>

              <div className="divide-y divide-border text-xs">
                {SAMPLE_BOOKINGS.map((booking) => (
                  <div key={booking.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                    <div className="space-y-0.5">
                      <div className="font-bold text-foreground">{booking.topic}</div>
                      <div className="text-[11px] text-muted-foreground">
                        Mentor: {booking.tutorName} • {booking.durationMinutes} mins
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Attended by {activeChild.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right (4 cols): Automated Alerts & Study Analytics */}
          <div className="lg:col-span-4 space-y-6">
            {/* Automated Alerts Box */}
            <div className="p-6 rounded-3xl border border-border bg-card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <Bell className="w-4 h-4 text-primary" /> Automated Ward Alerts
                </h3>
                <span className="text-[10px] text-muted-foreground font-semibold">SMS / WhatsApp</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-500" />
                    <span>WhatsApp Weekly Summary for {activeChild.name}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={whatsappAlerts}
                    onChange={(e) => setWhatsappAlerts(e.target.checked)}
                    className="w-4 h-4 text-primary rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-primary" />
                    <span>Instant Test Score Notifications</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="w-4 h-4 text-primary rounded"
                  />
                </div>
              </div>

              <button
                onClick={handleTestAlert}
                className="w-full py-2.5 rounded-xl border border-primary/30 hover:bg-primary/5 text-primary text-xs font-semibold transition-colors"
              >
                Send Test WhatsApp Report for {activeChild.name}
              </button>

              {alertSentToast && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 text-xs font-medium text-center animate-in fade-in">
                  ✓ {activeChild.name}&apos;s test summary dispatched to parent mobile!
                </div>
              )}
            </div>

            {/* Subject Radar Breakdown */}
            <div className="p-6 rounded-3xl border border-border bg-card space-y-3">
              <h3 className="font-bold text-sm text-foreground">
                {activeChild.name}&apos;s Subject Mastery Radar
              </h3>
              <SubjectRadarChart />
            </div>

            {/* Weekly Study Hours */}
            <div className="p-6 rounded-3xl border border-border bg-card space-y-3">
              <h3 className="font-bold text-sm text-foreground">
                {activeChild.name}&apos;s Daily Study Hours
              </h3>
              <PerformanceChart />
            </div>
          </div>
        </div>

        {/* Modal: Link Another Child with Invite Code */}
        {showLinkModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <div className="w-full max-w-md rounded-3xl border border-border bg-card shadow-2xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2 font-bold text-foreground">
                  <Plus className="w-5 h-5 text-primary" />
                  <span>Link Additional Child</span>
                </div>
                <button
                  onClick={() => setShowLinkModal(false)}
                  className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Enter the unique Student Invite Code generated from your child’s student profile to link their academic dashboard to your parent account.
              </p>

              <form onSubmit={handleLinkNewChild} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Student Invite Code:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DIYA10TH"
                    value={newInviteCode}
                    onChange={(e) => setNewInviteCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs uppercase font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Try demo code: <span className="font-mono font-bold text-primary">DIYA10TH</span>
                  </p>
                </div>

                {linkError && (
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs font-medium">
                    {linkError}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLinkModal(false)}
                    className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-foreground text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-sm shadow-primary/25"
                  >
                    <span>Verify & Link Child</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </RoleAccessGuard>
  );
}
