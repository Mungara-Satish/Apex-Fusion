'use client';

import React from 'react';
import { CHAPTERS, SUBJECTS } from '@/lib/mock-data';
import { AlertCircle, CheckCircle2, Flame, HelpCircle } from 'lucide-react';

export function WeaknessHeatmap() {
  // Categorize chapters into Weak (<70%), Average (70-85%), Strong (>85%)
  const chapterScores: Record<string, number> = {
    'chap-math-1': 94,
    'chap-math-2': 88,
    'chap-math-3': 82,
    'chap-math-4': 64, // Quadratic Equations (Weak)
    'chap-math-5': 90,
    'chap-math-6': 85,
    'chap-math-7': 68, // Trigonometry (Weak)
    'chap-math-8': 58, // Heights & Distances (Weak)
    'chap-math-9': 74, // Triangles (Average)
    'chap-math-10': 92,
    'chap-phy-1': 91,
    'chap-phy-2': 86,
    'chap-phy-3': 70, // Electricity (Needs Revision)
    'chap-phy-4': 62, // Magnetic Effects (Weak)
    'chap-chem-1': 89,
    'chap-chem-2': 84,
    'chap-chem-3': 66, // Metals & Non-metals (Weak)
    'chap-chem-4': 59, // Carbon & its Compounds (Weak)
    'chap-bio-1': 92,
    'chap-bio-2': 86,
    'chap-bio-3': 88,
    'chap-bio-4': 81,
    'chap-bio-5': 95,
  };

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-muted/40 border border-border text-xs">
        <span className="font-bold text-foreground">CBSE Mastery Heatmap Index:</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-emerald-500" />
            <span className="text-muted-foreground font-medium">Mastered (&gt;85%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-amber-500" />
            <span className="text-muted-foreground font-medium">Average (70-85%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-rose-500" />
            <span className="text-muted-foreground font-medium">Priority Focus (&lt;70%)</span>
          </div>
        </div>
      </div>

      {/* Subject-Wise Heatmap Matrix */}
      <div className="space-y-4">
        {SUBJECTS.slice(0, 4).map((sub) => {
          const subChapters = CHAPTERS.filter((c) => c.subjectId === sub.id);

          return (
            <div key={sub.id} className="p-5 rounded-2xl border border-border bg-card space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-foreground">{sub.name}</h4>
                <span className="text-xs text-muted-foreground">
                  {subChapters.length} Syllabus Chapters
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
                {subChapters.map((chap) => {
                  const score = chapterScores[chap.id] || 75;
                  const isWeak = score < 70;
                  const isAvg = score >= 70 && score <= 85;
                  const isStrong = score > 85;

                  return (
                    <div
                      key={chap.id}
                      className={`p-3 rounded-xl border text-xs flex flex-col justify-between space-y-2 transition-all ${
                        isWeak
                          ? 'border-rose-500/40 bg-rose-500/10 text-rose-800 dark:text-rose-200'
                          : isAvg
                          ? 'border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-200'
                          : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200'
                      }`}
                    >
                      <div className="font-bold truncate text-[11px]" title={chap.title}>
                        Ch {chap.chapterNumber}: {chap.title}
                      </div>

                      <div className="flex items-center justify-between font-mono font-bold text-[11px]">
                        <span>{score}% Accuracy</span>
                        {isWeak && <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                        {isAvg && <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                        {isStrong && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
