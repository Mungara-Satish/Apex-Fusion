'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { getSubjectsForBoard, getChaptersForBoard } from '@/lib/mock-data';
import { Board } from '@/lib/types';
import {
  BookOpen,
  Calculator,
  Zap,
  FlaskConical,
  Dna,
  Landmark,
  Globe,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  Sparkles,
  School,
  Check,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  Zap,
  FlaskConical,
  Dna,
  Landmark,
  Globe,
  BookOpen,
};

// Explicit Tailwind color map to ensure no purges
const gradientMap: Record<string, string> = {
  'sub-math': 'from-blue-600/90 to-indigo-900/95',
  'sub-physics': 'from-amber-600/90 to-orange-950/95',
  'sub-chemistry': 'from-emerald-600/90 to-teal-950/95',
  'sub-biology': 'from-green-600/90 to-emerald-950/95',
  'sub-history-civics': 'from-purple-600/90 to-pink-950/95',
  'sub-geography-economics': 'from-cyan-600/90 to-blue-950/95',
  'sub-english': 'from-rose-600/90 to-red-950/95',
  'sub-math-icse': 'from-blue-600/90 to-indigo-900/95',
  'sub-physics-icse': 'from-amber-600/90 to-orange-950/95',
  'sub-chemistry-icse': 'from-emerald-600/90 to-teal-950/95',
  'sub-biology-icse': 'from-green-600/90 to-emerald-950/95',
  'sub-history-civics-icse': 'from-purple-600/90 to-pink-950/95',
  'sub-geography-icse': 'from-cyan-600/90 to-blue-950/95',
  'sub-english-icse': 'from-rose-600/90 to-red-950/95',
  'sub-math-state': 'from-blue-600/90 to-indigo-900/95',
  'sub-physical-science-state': 'from-amber-600/90 to-orange-950/95',
  'sub-chemistry-state': 'from-emerald-600/90 to-teal-950/95',
  'sub-biological-science-state': 'from-green-600/90 to-emerald-950/95',
  'sub-social-studies-state': 'from-purple-600/90 to-pink-950/95',
  'sub-geography-state': 'from-cyan-600/90 to-blue-950/95',
  'sub-english-state': 'from-rose-600/90 to-red-950/95',
};

export default function SubjectsPage() {
  const { currentBoard, setBoard, chapters } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Math', 'Science', 'Social Studies', 'English'];

  const boardSubjects = getSubjectsForBoard(currentBoard || 'CBSE');

  const filteredSubjects =
    selectedCategory === 'ALL'
      ? boardSubjects
      : boardSubjects.filter((s) => s.category === selectedCategory);

  const handleBoardSwitch = (board: Board) => {
    setBoard(board);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Board Selector Banner */}
      <div className="p-4 sm:p-5 rounded-3xl border border-border bg-card shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <School className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <span>Active Curriculum Board:</span>
              <span className="text-primary font-black uppercase">{currentBoard} Class 10</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Switch board to load authentic NCERT (CBSE), Concise Selina (ICSE), or SCERT (State Board) syllabus.
            </p>
          </div>
        </div>

        {/* Board Switcher Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {(['CBSE', 'ICSE', 'STATE'] as Board[]).map((b) => {
            const isSelected = currentBoard === b;
            return (
              <button
                key={b}
                onClick={() => handleBoardSwitch(b)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-[1.02]'
                    : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                <span>{b} Board</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            <span>Grade 10</span>
            <span>•</span>
            <span>{currentBoard} Board Syllabus & Chapter Trackers</span>
          </div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
            10th-Grade Subject Portals & Deep-Dive Concepts
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your progress across all {currentBoard} core chapters, master formulas, and read step-by-step board worked examples.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          <Filter className="w-4 h-4 text-muted-foreground mr-1 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              {cat === 'ALL' ? 'All Subjects' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((sub) => {
          const Icon = iconMap[sub.icon] || BookOpen;
          const bgGradient = gradientMap[sub.id] || 'from-indigo-600/90 to-purple-900/95';

          // Calculate real completion from board chapters
          const allBoardChapters = getChaptersForBoard(currentBoard || 'CBSE');
          const subjectChapters = allBoardChapters.filter((c) => c.subjectId === sub.id);
          const completedCount = subjectChapters.filter(
            (c) => c.status === 'COMPLETED' || c.status === 'REVISED'
          ).length;
          const totalChapters = subjectChapters.length || sub.chaptersCount || 5;
          const progressPercent = Math.round((completedCount / totalChapters) * 100);

          return (
            <div
              key={sub.id}
              className="group rounded-3xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              {/* Card Banner with High-Res Image & Gradient */}
              <div className="relative h-44 overflow-hidden p-6 flex flex-col justify-between text-white">
                {/* Background Image */}
                {sub.image && (
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${bgGradient} opacity-90`} />

                {/* Top Row: Code & Category */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider border border-white/20">
                    {sub.code}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[10px] font-bold">
                    {currentBoard}
                  </span>
                </div>

                {/* Bottom Row: Icon & Subject Title */}
                <div className="relative z-10 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-extrabold text-xl leading-tight drop-shadow-sm">
                      {sub.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {sub.description}
                </p>

                {/* Syllabus Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-medium">Syllabus Mastered</span>
                    <span className="font-bold text-foreground">
                      {completedCount} / {totalChapters} Chapters ({progressPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-2 border-t border-border flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~35 hrs total</span>
                  </div>

                  <Link
                    href={`/subjects/${sub.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all group-hover:translate-x-0.5 shadow-sm shadow-primary/25"
                  >
                    <span>View {currentBoard} Chapters</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
