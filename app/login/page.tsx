'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Role } from '@/lib/types';
import {
  GraduationCap,
  HeartHandshake,
  UserCheck,
  Shield,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  Bot,
  Video,
  FileCheck2,
} from 'lucide-react';

export default function LoginHubPage() {
  const router = useRouter();
  const { loginAs } = useAppStore();

  const handleQuickDemo = (role: Role) => {
    loginAs(role);
    if (role === 'STUDENT') router.push('/dashboard/student');
    else if (role === 'PARENT') router.push('/dashboard/parent');
    else if (role === 'TUTOR') router.push('/dashboard/tutor');
    else router.push('/dashboard/admin');
  };

  const loginPortals = [
    {
      role: 'STUDENT' as Role,
      title: 'Student Portal',
      subtitle: 'Class 10 CBSE, ICSE & State Board students',
      description:
        'Access chapter-by-chapter curriculum, take CBSE 5-section mock exams, practice PYQs, and solve doubts with Google Gemini AI.',
      icon: GraduationCap,
      href: '/login/student',
      color: 'from-blue-600 to-indigo-600',
      badge: 'CBSE 10th Prep',
      demoName: 'Aarav Sharma',
      features: ['Gemini AI Doubt Solver', '10th Chapter Progress', 'CBSE 5-Section Mocks', 'Study Streak & XP'],
    },
    {
      role: 'PARENT' as Role,
      title: 'Parent Control Portal',
      subtitle: 'Parents & guardians of 10th-grade students',
      description:
        'Link with your child via mobile OTP and invite code to oversee live class attendance, chapter weakness heatmaps, and download CBSE CCE report cards.',
      icon: HeartHandshake,
      href: '/login/parent',
      color: 'from-emerald-600 to-teal-700',
      badge: 'Parent Oversight',
      demoName: 'Rajesh Sharma',
      features: ['Attendance Log Audit', 'Weakness Heatmap (Red/Amber/Green)', 'Printable CBSE Report Cards', 'WhatsApp Alert Controls'],
    },
    {
      role: 'TUTOR' as Role,
      title: 'Faculty & Tutor Portal',
      subtitle: 'Verified IIT & CBSE master educators',
      description:
        'Host live interactive classroom sessions with real-time whiteboard canvas, triage student doubt queue, and track mentor earnings.',
      icon: UserCheck,
      href: '/login/tutor',
      color: 'from-amber-500 to-orange-600',
      badge: 'Verified Faculty',
      demoName: 'Dr. Priya Raman (IIT-D)',
      features: ['Whiteboard & Live Video Class', 'Student Doubt Triage', 'Hourly Earnings Analytics', 'Session Scheduler'],
    },
    {
      role: 'ADMIN' as Role,
      title: 'Administrator Master Console',
      subtitle: 'Platform directors & superusers with full root access',
      description:
        'Comprehensive superuser control across all student records, parent links, tutor verification approvals, course creator, and Razorpay transactions.',
      icon: Shield,
      href: '/login/admin',
      color: 'from-purple-600 to-pink-600',
      badge: 'Full Root Access',
      demoName: 'Dr. Sanjay Gupta (Superuser)',
      features: ['Full Master Access to All Spaces', 'User & Tutor Permissions Matrix', 'Razorpay Transaction Logs', 'System Analytics & Audit'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" /> Role-Based Access Control
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Select Your Login Portal
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Dedicated, secure login portals tailored specifically for students, parents, tutors, and administrators.
        </p>
      </div>

      {/* 4 Portals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loginPortals.map((portal) => {
          const Icon = portal.icon;
          return (
            <div
              key={portal.role}
              className="rounded-3xl border border-border bg-card hover:border-primary/50 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md hover:shadow-xl transition-all relative group"
            >
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex items-center justify-between gap-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${portal.color} text-white shadow-lg`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-muted text-foreground border border-border">
                    {portal.badge}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {portal.title}
                  </h2>
                  <p className="text-xs font-semibold text-muted-foreground mt-0.5">{portal.subtitle}</p>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {portal.description}
                </p>

                {/* Feature highlights */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {portal.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-foreground font-medium">
                      <span className="text-primary font-bold">•</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href={portal.href}
                  className="w-full sm:flex-1 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all"
                >
                  <span>Go to {portal.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => handleQuickDemo(portal.role)}
                  className="w-full sm:w-auto px-4 py-3 rounded-2xl border border-border bg-muted/40 hover:bg-muted text-foreground font-bold text-xs transition-all whitespace-nowrap"
                  title={`Sign in instantly as demo ${portal.demoName}`}
                >
                  ⚡ 1-Click Demo
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Admin Privilege Notice */}
      <div className="p-6 rounded-3xl border border-purple-500/30 bg-purple-500/5 text-center max-w-3xl mx-auto space-y-2 text-xs">
        <div className="font-bold text-purple-900 dark:text-purple-300 flex items-center justify-center gap-1.5">
          <Shield className="w-4 h-4 text-purple-600" /> Administrative Security Architecture
        </div>
        <p className="text-muted-foreground leading-relaxed">
          The <span className="font-bold text-foreground">Administrator</span> has unrestricted root superuser access across all student, parent, tutor, and financial modules. Students, parents, and tutors only have access to their designated workspaces.
        </p>
      </div>
    </div>
  );
}
