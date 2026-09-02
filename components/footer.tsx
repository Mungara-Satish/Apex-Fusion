import React from 'react';
import Link from 'next/link';
import { GraduationCap, Heart, BookOpen, ShieldCheck, Award } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/60 text-muted-foreground text-xs py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-foreground text-base">
              <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-white">
                <GraduationCap className="h-4 w-4" />
              </div>
              <span>EduTen</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The purpose-built 10th-grade learning platform for CBSE, ICSE, and State Board exam excellence. Live classes, doubt clearance, and adaptive mock tests.
            </p>
          </div>

          {/* Col 2: Core 10th Subjects */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm">10th Core Subjects</h4>
            <ul className="space-y-1.5">
              <li><Link href="/subjects/mathematics" className="hover:text-primary transition-colors">Mathematics (Standard & Basic)</Link></li>
              <li><Link href="/subjects/physics" className="hover:text-primary transition-colors">Science: Physics (Optics & Electricity)</Link></li>
              <li><Link href="/subjects/chemistry" className="hover:text-primary transition-colors">Science: Chemistry (Carbon & Reactions)</Link></li>
              <li><Link href="/subjects/biology" className="hover:text-primary transition-colors">Science: Biology (Life Processes & Heredity)</Link></li>
              <li><Link href="/subjects/history-civics" className="hover:text-primary transition-colors">Social Studies (History, Civics, Geo, Econ)</Link></li>
              <li><Link href="/subjects/english" className="hover:text-primary transition-colors">English Language & Literature</Link></li>
            </ul>
          </div>

          {/* Col 3: Board Exam Prep */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm">Exam Hub</h4>
            <ul className="space-y-1.5">
              <li><Link href="/vlog" className="hover:text-primary transition-colors font-bold text-primary">✨ Platform Overview & Registration</Link></li>
              <li><Link href="/tests" className="hover:text-primary transition-colors">Timed Chapter Mock Tests</Link></li>
              <li><Link href="/resources" className="hover:text-primary transition-colors">10-Year Past Solved Papers (PYQs)</Link></li>
              <li><Link href="/resources" className="hover:text-primary transition-colors">All-Subject Formula Cheatcards</Link></li>
              <li><Link href="/doubts" className="hover:text-primary transition-colors">Live Doubt Clearance Forum</Link></li>
              <li><Link href="/tutors" className="hover:text-primary transition-colors">Book 1-on-1 Verified Mentors</Link></li>
            </ul>
          </div>

          {/* Col 4: Boards & Trust */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-sm">Target Boards</h4>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary font-bold text-[11px]">CBSE Class 10</span>
              <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-500 font-bold text-[11px]">ICSE Class 10</span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">State Boards</span>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-muted-foreground text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Verified IIT & Board Expert Tutors
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} EduTen - 10th Grade Online Tutoring & Board Prep Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-muted-foreground">
              Designed for 10th-grade board toppers <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
