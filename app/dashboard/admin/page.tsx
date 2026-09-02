'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore, DEMO_USERS } from '@/lib/store';
import { SAMPLE_TUTORS, SUBJECTS, CURRENT_STUDENT } from '@/lib/mock-data';
import { RoleAccessGuard } from '@/components/role-access-guard';
import { Role } from '@/lib/types';
import {
  Shield,
  Users,
  GraduationCap,
  HeartHandshake,
  UserCheck,
  HelpCircle,
  FileCheck2,
  CheckCircle2,
  XCircle,
  BookOpen,
  BarChart3,
  Award,
  CreditCard,
  KeyRound,
  Eye,
  Lock,
  Unlock,
  Sparkles,
  Server,
  Zap,
  FileSpreadsheet,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { doubts, chapters, bookings, setRole } = useAppStore();
  const [tutorsList, setTutorsList] = useState(SAMPLE_TUTORS);
  const [activeTab, setActiveTab] = useState<'overview' | 'permissions' | 'users' | 'tutors'>('overview');

  const toggleVerify = (tutorId: string) => {
    setTutorsList((prev) =>
      prev.map((t) => (t.id === tutorId ? { ...t, verified: !t.verified } : t))
    );
  };

  const usersList = [
    {
      id: 'u-1',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@eduten.org',
      role: 'STUDENT' as Role,
      board: 'CBSE Class 10',
      status: 'Active',
      details: '7-Day Streak • 1,240 XP',
      dashboardUrl: '/dashboard/student',
    },
    {
      id: 'u-2',
      name: 'Rajesh Sharma',
      email: 'parent.sharma@eduten.org',
      role: 'PARENT' as Role,
      board: 'Linked: Aarav Sharma',
      status: 'Active',
      details: 'OTP Verified • WhatsApp Alerts ON',
      dashboardUrl: '/dashboard/parent',
    },
    {
      id: 'u-3',
      name: 'Dr. Priya Raman',
      email: 'priya.raman@eduten.org',
      role: 'TUTOR' as Role,
      board: 'IIT Delhi Ph.D. Physics',
      status: 'Verified',
      details: '4.9 ★ Rating • 42 Reviews',
      dashboardUrl: '/dashboard/tutor',
    },
    {
      id: 'u-4',
      name: 'Dr. Sanjay Gupta',
      email: 'admin@eduten.org',
      role: 'ADMIN' as Role,
      board: 'Master Superuser',
      status: 'Root Access',
      details: 'Full Platform Privileges',
      dashboardUrl: '/dashboard/admin',
    },
  ];

  const permissionsMatrix = [
    {
      feature: 'Google Gemini Multimodal AI Doubt Solver',
      student: 'Full Access (Ask Doubts)',
      parent: 'View Linked History',
      tutor: 'Triage & Verify',
      admin: 'Full Master Root Access',
    },
    {
      feature: 'CBSE 5-Section Board Exam Runner',
      student: 'Take & Submit Exams',
      parent: 'View Score Breakdown',
      tutor: 'Grade Subjective Sections',
      admin: 'Full Master Root Access',
    },
    {
      feature: 'Live Classroom Whiteboard & Video',
      student: 'Join & Participate',
      parent: 'View Attendance Logs',
      tutor: 'Host & Moderate',
      admin: 'Full Master Root Access',
    },
    {
      feature: 'Parent Oversight & CCE Report Cards',
      student: 'View Own Report Card',
      parent: 'Download & Print Report',
      tutor: 'Add Mentor Remarks',
      admin: 'Full Master Root Access',
    },
    {
      feature: 'Faculty Earnings & Slot Scheduling',
      student: 'Restricted (No Access)',
      parent: 'Restricted (No Access)',
      tutor: 'Manage Own Earnings',
      admin: 'Full Master Root Access',
    },
    {
      feature: 'Platform User Management & DB Push',
      student: 'Restricted (No Access)',
      parent: 'Restricted (No Access)',
      tutor: 'Restricted (No Access)',
      admin: 'Full Master Root Access',
    },
  ];

  return (
    <RoleAccessGuard allowedRoles={['ADMIN']} pageTitle="Admin Master Console">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              <Shield className="w-4 h-4" /> Root Superuser Security Console
            </div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
              EduTen Administration & Access Control Hub
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Only Administrators have full master privileges across students, parents, tutors, and financial transactions.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-300 font-extrabold text-xs flex items-center gap-1.5 border border-purple-500/30">
              <KeyRound className="w-4 h-4" /> Full Root Access Active
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            System Overview & KPIs
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'permissions'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Role Access Matrix (Only Admin Has Full Access)
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'users'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            User Directory & Master Inspection
          </button>
          <button
            onClick={() => setActiveTab('tutors')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'tutors'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Tutor Verification Queue ({tutorsList.filter((t) => t.verified).length}/{tutorsList.length})
          </button>
        </div>

        {/* TAB 1: SYSTEM OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-semibold">Enrolled 10th Students</span>
                  <GraduationCap className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-black text-foreground">4,820</div>
                <div className="text-[11px] text-emerald-600 font-semibold">+18% this month</div>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-semibold">Linked Parents</span>
                  <HeartHandshake className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-black text-foreground">3,940</div>
                <div className="text-[11px] text-muted-foreground">98.5% WhatsApp Opt-in</div>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-semibold">Verified Mentors</span>
                  <Users className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-black text-foreground">{tutorsList.length}</div>
                <div className="text-[11px] text-emerald-600 font-semibold">100% Verified Credentials</div>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-semibold">Razorpay Volume</span>
                  <CreditCard className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="text-2xl font-black text-foreground">₹14.2 Lakhs</div>
                <div className="text-[11px] text-primary font-semibold">GST Compliant</div>
              </div>
            </div>

            {/* Quick Admin Master Navigation */}
            <div className="p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-primary/10 space-y-4">
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Admin Direct Workspace Inspection
                </h3>
                <p className="text-xs text-muted-foreground">
                  As Root Administrator, you have full access to inspect any workspace directly:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Link
                  href="/directory"
                  className="p-4 rounded-2xl border border-purple-500/40 bg-purple-500/5 hover:bg-purple-500/10 text-xs flex flex-col justify-between space-y-2 transition-all shadow-sm group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground group-hover:text-purple-600">User Access & Credentials</span>
                    <KeyRound className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-[11px] text-muted-foreground">Grant, issue and suspend login credentials &rarr;</span>
                </Link>

                <Link
                  href="/directory"
                  className="p-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/15 text-xs flex flex-col justify-between space-y-2 transition-all shadow-sm group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-700 dark:text-amber-300">Interested Leads & Inquiries</span>
                    <FileSpreadsheet className="w-4 h-4 text-amber-500" />
                  </div>
                  <span className="text-[11px] text-muted-foreground">Review Google Form leads & 1-click enroll &rarr;</span>
                </Link>

                <Link
                  href="/dashboard/student"
                  className="p-4 rounded-2xl border border-border bg-card hover:border-primary text-xs flex flex-col justify-between space-y-2 transition-all shadow-sm group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground group-hover:text-primary">Inspect Student Workspace</span>
                    <GraduationCap className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[11px] text-muted-foreground">View chapters, tests, and Gemini solver as student &rarr;</span>
                </Link>

                <Link
                  href="/dashboard/parent"
                  className="p-4 rounded-2xl border border-border bg-card hover:border-emerald-500 text-xs flex flex-col justify-between space-y-2 transition-all shadow-sm group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground group-hover:text-emerald-600">Inspect Parent Portal</span>
                    <HeartHandshake className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-[11px] text-muted-foreground">View weakness heatmap and CCE report cards &rarr;</span>
                </Link>

                <Link
                  href="/dashboard/tutor"
                  className="p-4 rounded-2xl border border-border bg-card hover:border-amber-500 text-xs flex flex-col justify-between space-y-2 transition-all shadow-sm group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground group-hover:text-amber-600">Inspect Tutor Workspace</span>
                    <UserCheck className="w-4 h-4 text-amber-500" />
                  </div>
                  <span className="text-[11px] text-muted-foreground">View whiteboard classrooms and doubt queues &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ROLE ACCESS CONTROL MATRIX */}
        {activeTab === 'permissions' && (
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-1">
              <div className="text-xs font-bold text-purple-600 uppercase tracking-wider">Access Control Matrix</div>
              <h2 className="text-xl font-bold text-foreground">Role Permissions Breakdown</h2>
              <p className="text-xs text-muted-foreground">
                Verification that only the Administrator role maintains full, unrestricted root access across the entire platform.
              </p>
            </div>

            <div className="border border-border rounded-2xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-muted/80 text-foreground font-bold">
                  <tr>
                    <th className="p-3.5">Platform Module</th>
                    <th className="p-3.5">Student Role</th>
                    <th className="p-3.5">Parent Role</th>
                    <th className="p-3.5">Tutor Role</th>
                    <th className="p-3.5 text-purple-600 font-extrabold bg-purple-500/10">Admin (Root)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {permissionsMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/30">
                      <td className="p-3.5 font-bold text-foreground">{row.feature}</td>
                      <td className="p-3.5 text-muted-foreground">
                        {row.student.includes('Restricted') ? (
                          <span className="inline-flex items-center gap-1 text-rose-500 font-semibold">
                            <Lock className="w-3 h-3" /> No Access
                          </span>
                        ) : (
                          <span className="text-foreground">{row.student}</span>
                        )}
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        {row.parent.includes('Restricted') ? (
                          <span className="inline-flex items-center gap-1 text-rose-500 font-semibold">
                            <Lock className="w-3 h-3" /> No Access
                          </span>
                        ) : (
                          <span className="text-foreground">{row.parent}</span>
                        )}
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        {row.tutor.includes('Restricted') ? (
                          <span className="inline-flex items-center gap-1 text-rose-500 font-semibold">
                            <Lock className="w-3 h-3" /> No Access
                          </span>
                        ) : (
                          <span className="text-foreground">{row.tutor}</span>
                        )}
                      </td>
                      <td className="p-3.5 font-extrabold text-purple-700 dark:text-purple-300 bg-purple-500/5">
                        <span className="inline-flex items-center gap-1">
                          <Unlock className="w-3 h-3 text-purple-600" /> Full Master Access
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: USER DIRECTORY & INSPECTION */}
        {activeTab === 'users' && (
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Platform User Accounts</h2>
                <p className="text-xs text-muted-foreground">
                  Admin directory allowing direct inspection into any student, parent, or faculty workspace.
                </p>
              </div>
            </div>

            <div className="border border-border rounded-2xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-muted/80 text-foreground font-bold">
                  <tr>
                    <th className="p-3.5">User Name & Email</th>
                    <th className="p-3.5">Assigned Role</th>
                    <th className="p-3.5">Target / Bio</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Master Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {usersList.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/30">
                      <td className="p-3.5 space-y-0.5">
                        <div className="font-bold text-foreground">{user.name}</div>
                        <div className="text-[11px] text-muted-foreground font-mono">{user.email}</div>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          user.role === 'STUDENT'
                            ? 'bg-blue-500/10 text-blue-600'
                            : user.role === 'PARENT'
                            ? 'bg-emerald-500/10 text-emerald-600'
                            : user.role === 'TUTOR'
                            ? 'bg-amber-500/10 text-amber-700'
                            : 'bg-purple-500/10 text-purple-600'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3.5 font-medium text-muted-foreground">{user.board}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
                          {user.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <Link
                          href={user.dashboardUrl}
                          className="px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground font-bold text-[11px] inline-flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3 h-3 text-primary" /> Inspect Workspace
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: TUTOR VERIFICATION QUEUE */}
        {activeTab === 'tutors' && (
          <div className="rounded-3xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  Faculty Credentials & Verification Queue
                </h2>
                <p className="text-xs text-muted-foreground">Admin approval controls for board mentors</p>
              </div>
            </div>

            <div className="divide-y divide-border">
              {tutorsList.map((tutor) => (
                <div
                  key={tutor.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={tutor.avatar}
                      alt={tutor.name}
                      className="w-12 h-12 rounded-xl object-cover border border-border"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-foreground">{tutor.name}</h3>
                        {tutor.verified ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" /> Approved Faculty
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">
                            <XCircle className="w-3 h-3" /> Pending Review
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{tutor.headline}</p>
                      <div className="text-[11px] text-muted-foreground">
                        {tutor.qualifications} • Rate: ₹{tutor.hourlyRate}/hr
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleVerify(tutor.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                        tutor.verified
                          ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 border border-rose-500/30'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                      }`}
                    >
                      {tutor.verified ? 'Revoke Approval' : 'Approve & Verify'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </RoleAccessGuard>
  );
}
