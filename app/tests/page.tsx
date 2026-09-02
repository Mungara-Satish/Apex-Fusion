'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SAMPLE_MOCK_TESTS, SUBJECTS } from '@/lib/mock-data';
import {
  FileCheck2,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Filter,
} from 'lucide-react';

export default function TestsCatalogPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');

  const filteredTests =
    selectedSubject === 'ALL'
      ? SAMPLE_MOCK_TESTS
      : SAMPLE_MOCK_TESTS.filter((t) => t.subjectId === selectedSubject);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Exam Simulation Hub
          </div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
            10th-Grade Timed Practice Tests & Mock Exams
          </h1>
          <p className="text-sm text-muted-foreground">
            Timed chapter-wise tests with instant auto-grading, KaTeX math solutions, and topic accuracy reports.
          </p>
        </div>
      </div>

      {/* Filter by Subject */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedSubject('ALL')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            selectedSubject === 'ALL'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          All Practice Tests
        </button>
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedSubject(s.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedSubject === s.id
                ? 'bg-primary text-white shadow-sm'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                  {test.subjectName}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    test.difficulty === 'HARD'
                      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      : test.difficulty === 'MEDIUM'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {test.difficulty}
                </span>
              </div>

              <h2 className="text-lg font-bold text-foreground leading-snug">{test.title}</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">{test.description}</p>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-muted/40 border border-border">
                  <div className="font-bold text-foreground flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary" /> {test.durationMinutes}m
                  </div>
                  <div className="text-[10px] text-muted-foreground">Duration</div>
                </div>
                <div className="p-2 rounded-xl bg-muted/40 border border-border">
                  <div className="font-bold text-foreground">{test.questionsCount} MCQs</div>
                  <div className="text-[10px] text-muted-foreground">Questions</div>
                </div>
                <div className="p-2 rounded-xl bg-muted/40 border border-border">
                  <div className="font-bold text-foreground">{test.totalMarks} Marks</div>
                  <div className="text-[10px] text-muted-foreground">Total Score</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Pass: {test.passingMarks}/{test.totalMarks} marks
              </div>
              <Link
                href={`/tests/${test.id}`}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                Start Timed Test <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
