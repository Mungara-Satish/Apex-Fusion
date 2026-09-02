'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { Role, Board } from '@/lib/types';
import { Flame, Sparkles, UserCheck, Shield, GraduationCap, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

export function RoleSwitcherBanner() {
  const { currentRole, setRole, currentBoard, setBoard, streakCount, studentPoints } = useAppStore();

  return (
    <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-purple-950 text-white text-xs py-2 px-4 shadow-sm border-b border-indigo-800/60">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Role Switcher Buttons */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-indigo-200 uppercase tracking-wider text-[10px] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Switch Role:
          </span>
          <div className="flex items-center bg-indigo-950/80 p-0.5 rounded-lg border border-indigo-700/50">
            <button
              onClick={() => setRole('STUDENT')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 font-medium ${
                currentRole === 'STUDENT'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-indigo-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Student
            </button>
            <button
              onClick={() => setRole('PARENT')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 font-medium ${
                currentRole === 'PARENT'
                  ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                  : 'text-indigo-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-300" />
              Parent
            </button>
            <button
              onClick={() => setRole('TUTOR')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 font-medium ${
                currentRole === 'TUTOR'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-indigo-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Tutor
            </button>
            <button
              onClick={() => setRole('ADMIN')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 font-medium ${
                currentRole === 'ADMIN'
                  ? 'bg-purple-500 text-white shadow-sm'
                  : 'text-indigo-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Admin
            </button>
          </div>
        </div>

        {/* Center: Board Selector for Student */}
        {currentRole === 'STUDENT' && (
          <div className="flex items-center gap-2">
            <span className="text-indigo-200 text-[11px]">10th Grade Board:</span>
            <div className="flex bg-indigo-950/60 p-0.5 rounded-lg border border-indigo-700/40">
              {(['CBSE', 'ICSE', 'STATE'] as Board[]).map((b) => (
                <button
                  key={b}
                  onClick={() => setBoard(b)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                    currentBoard === b
                      ? 'bg-indigo-600 text-white'
                      : 'text-indigo-300 hover:text-white'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Right: Quick Stats & Dashboard Link */}
        <div className="flex items-center gap-4">
          {currentRole === 'STUDENT' && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
                <span className="font-bold">{streakCount} Day Streak</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span className="font-bold">{studentPoints} XP</span>
              </div>
            </div>
          )}

          {currentRole === 'PARENT' && (
            <div className="flex items-center gap-2 text-emerald-300 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Monitoring: <strong>Aarav Sharma</strong> (CBSE 10th)</span>
            </div>
          )}

          <Link
            href={
              currentRole === 'STUDENT'
                ? '/dashboard/student'
                : currentRole === 'PARENT'
                ? '/dashboard/parent'
                : currentRole === 'TUTOR'
                ? '/dashboard/tutor'
                : '/dashboard/admin'
            }
            className="text-xs bg-white text-indigo-950 font-semibold px-2.5 py-1 rounded-md hover:bg-indigo-50 transition-colors shadow-sm"
          >
            Go to {currentRole.charAt(0) + currentRole.slice(1).toLowerCase()} Portal &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
