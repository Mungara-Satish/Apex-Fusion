'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { getSubjectsForBoard, SUBJECTS, getChaptersForBoard } from '@/lib/mock-data';
import { ChapterStatus } from '@/lib/types';
import { MathRenderer } from '@/components/math-renderer';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  BookOpen,
  FileCheck2,
  HelpCircle,
  FolderDown,
  Sparkles,
  ChevronRight,
  Flame,
  AlertCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Bot,
  GraduationCap,
  Target,
  School,
} from 'lucide-react';

export default function SubjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { chapters, updateChapterStatus, currentBoard } = useAppStore();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [expandedConceptIds, setExpandedConceptIds] = useState<Record<string, boolean>>({
    'chap-math-1': true,
    'chap-math-2': true,
    'chap-phy-1': true,
    'chap-chem-1': true,
    'chap-icse-math-1': true,
    'chap-icse-math-2': true,
    'chap-icse-phy-1': true,
    'chap-icse-chem-1': true,
    'chap-state-math-1': true,
    'chap-state-ps-1': true,
  });

  const toggleConcept = (chapterId: string) => {
    setExpandedConceptIds((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const activeBoard = currentBoard || 'CBSE';
  const boardSubjects = getSubjectsForBoard(activeBoard);
  const subject =
    boardSubjects.find((s) => s.slug === slug) ||
    SUBJECTS.find((s) => s.slug === slug);

  if (!subject) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold">Subject Not Found</h1>
        <Link href="/subjects" className="text-primary font-semibold hover:underline">
          &larr; Back to Subjects Catalog
        </Link>
      </div>
    );
  }

  // Get chapters specific to this board & subject from active store
  const subjectChapters = chapters.filter((c) => c.subjectId === subject.id);
  const finalChapters =
    subjectChapters.length > 0
      ? subjectChapters
      : getChaptersForBoard(activeBoard).filter((c) => c.subjectId === subject.id);

  const filteredChapters =
    filterStatus === 'ALL'
      ? finalChapters
      : finalChapters.filter((c) => c.status === filterStatus);

  const completedCount = finalChapters.filter(
    (c) => c.status === 'COMPLETED' || c.status === 'REVISED'
  ).length;
  const progressPercent = Math.round((completedCount / (finalChapters.length || 1)) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Back Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/subjects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Subject Catalog
        </Link>

        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-extrabold text-xs flex items-center gap-1">
          <School className="w-3.5 h-3.5" /> {activeBoard} Class 10
        </span>
      </div>

      {/* Subject Header Banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 text-white shadow-xl min-h-[220px] flex items-center">
        {/* Background Photo */}
        {subject.image && (
          <img
            src={subject.image}
            alt={subject.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Color Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${
            subject.id.includes('math')
              ? 'from-blue-900/95 via-indigo-950/95 to-slate-950/95'
              : subject.id.includes('phys')
              ? 'from-amber-900/95 via-orange-950/95 to-slate-950/95'
              : subject.id.includes('chem')
              ? 'from-emerald-900/95 via-teal-950/95 to-slate-950/95'
              : subject.id.includes('bio')
              ? 'from-green-900/95 via-emerald-950/95 to-slate-950/95'
              : subject.id.includes('hist') || subject.id.includes('social')
              ? 'from-purple-900/95 via-pink-950/95 to-slate-950/95'
              : subject.id.includes('geo')
              ? 'from-cyan-900/95 via-blue-950/95 to-slate-950/95'
              : 'from-rose-900/95 via-red-950/95 to-slate-950/95'
          }`}
        />

        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-black/40 backdrop-blur border border-white/20 text-xs font-bold uppercase tracking-wider">
                {subject.code}
              </span>
              <span className="px-3 py-0.5 rounded-full bg-white/20 backdrop-blur text-xs font-semibold">
                Class 10 ({activeBoard} Board)
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow">
              {subject.name}
            </h1>
            <p className="text-white/90 text-sm leading-relaxed">
              {subject.description}
            </p>
          </div>

          {/* Progress Box */}
          <div className="p-5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 min-w-[240px] space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
              <span>Syllabus Mastered</span>
              <span className="text-emerald-300 font-extrabold text-sm">{progressPercent}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-xs text-white/80 flex items-center justify-between">
              <span>{completedCount} of {finalChapters.length} Chapters Done</span>
              <span className="font-semibold text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {activeBoard} Prep
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-foreground">
            {activeBoard} Chapters & Units ({filteredChapters.length})
          </h2>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { label: 'All', value: 'ALL' },
            { label: 'Completed', value: 'COMPLETED' },
            { label: 'In Progress', value: 'IN_PROGRESS' },
            { label: 'Revised', value: 'REVISED' },
            { label: 'Not Started', value: 'NOT_STARTED' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setFilterStatus(item.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === item.value
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chapters List */}
      <div className="space-y-6">
        {filteredChapters.map((chapter) => {
          const isExpanded = !!expandedConceptIds[chapter.id];

          return (
            <div
              key={chapter.id}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all space-y-5"
            >
              {/* Top row: Unit Name, Chapter Number, Status Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-primary tracking-wide mb-1">
                    {chapter.unitName}
                  </div>
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-muted text-foreground flex items-center justify-center text-xs font-bold">
                      {chapter.chapterNumber}
                    </span>
                    {chapter.title}
                  </h3>
                </div>

                {/* Status Selector Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">Status:</span>
                  <select
                    value={chapter.status || 'NOT_STARTED'}
                    onChange={(e) => updateChapterStatus(chapter.id, e.target.value as ChapterStatus)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none cursor-pointer transition-colors ${
                      chapter.status === 'COMPLETED'
                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400'
                        : chapter.status === 'REVISED'
                        ? 'bg-indigo-500/10 text-indigo-600 border-indigo-500/30 dark:text-indigo-400'
                        : chapter.status === 'IN_PROGRESS'
                        ? 'bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400'
                        : 'bg-muted text-muted-foreground border-border'
                    }`}
                  >
                    <option value="NOT_STARTED">⚪ Not Started</option>
                    <option value="IN_PROGRESS">🟡 In Progress</option>
                    <option value="COMPLETED">🟢 Completed</option>
                    <option value="REVISED">🟣 Revised & Ready</option>
                  </select>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {chapter.description}
              </p>

              {/* Key Topics Tags */}
              {chapter.keyTopics && chapter.keyTopics.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Core {activeBoard} Board Exam Topics:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {chapter.keyTopics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-muted/80 text-foreground text-xs font-medium border border-border"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Core LaTeX Formulas Cheatcard for this Chapter */}
              {chapter.formulaList && chapter.formulaList.length > 0 && (
                <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> Key Formulas & Equations:
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {chapter.formulaList.map((formula, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-card border border-border text-center overflow-x-auto font-mono text-xs shadow-xs"
                      >
                        <MathRenderer math={formula} block={true} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* READABLE CONCEPT DEEP-DIVE & WORKED EXAMPLES EXPANDER */}
              {(chapter.conceptNotes || chapter.workedExample) && (
                <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 dark:bg-indigo-950/20 overflow-hidden">
                  <button
                    onClick={() => toggleConcept(chapter.id)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-indigo-500/10 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>{activeBoard} Concept Deep-Dive & Worked Example</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                      <span>{isExpanded ? 'Hide Notes' : 'Read Concept & Example'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-5 pt-0 space-y-4 border-t border-indigo-500/10 text-xs">
                      {/* 3D Cartoonish Concept Visual Diagram */}
                      {chapter.conceptImage && (
                        <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm space-y-2.5 p-3.5">
                          <div className="flex items-center justify-between text-xs px-1">
                            <span className="font-extrabold text-foreground flex items-center gap-1.5 text-[11px] text-primary">
                              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                              <span>3D Visual Concept Model & Diagram ({activeBoard} 10th)</span>
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px]">
                              Interactive 3D Render
                            </span>
                          </div>
                          <div className="relative rounded-xl overflow-hidden aspect-video border border-border/60 bg-muted group shadow-inner">
                            <img
                              src={chapter.conceptImage}
                              alt={`${chapter.title} 3D Concept Visualization`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        </div>
                      )}

                      {/* Concept Theory Notes */}
                      {chapter.conceptNotes && (
                        <div className="p-4 rounded-xl bg-card border border-border space-y-2">
                          <div className="font-bold text-foreground flex items-center gap-1.5 text-xs">
                            <BookOpen className="w-4 h-4 text-primary" />
                            <span>{activeBoard} Concept Explanation & Intuition:</span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed text-xs">
                            {chapter.conceptNotes}
                          </p>
                        </div>
                      )}

                      {/* Worked Board Example */}
                      {chapter.workedExample && (
                        <div className="p-4 rounded-xl bg-card border border-border space-y-3">
                          <div className="font-bold text-foreground flex items-center gap-1.5 text-xs">
                            <GraduationCap className="w-4 h-4 text-emerald-500" />
                            <span>{activeBoard} Board Model Worked Problem:</span>
                          </div>

                          {/* Problem statement */}
                          <div className="p-3 rounded-lg bg-muted/50 font-semibold text-foreground border border-border/80">
                            {chapter.workedExample.problem}
                          </div>

                          {/* Step by step solution */}
                          <div className="space-y-1.5">
                            <div className="font-bold text-muted-foreground text-[11px] uppercase tracking-wider">
                              Step-by-Step Solution:
                            </div>
                            <div className="p-3.5 rounded-lg bg-muted/30 border border-border font-mono text-xs whitespace-pre-wrap leading-relaxed">
                              {chapter.workedExample.solution}
                            </div>
                          </div>

                          {/* Examiner Tip */}
                          {chapter.workedExample.boardTip && (
                            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 flex items-start gap-2">
                              <Target className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div className="text-[11px] leading-relaxed">
                                <span className="font-bold">{activeBoard} Examiner’s Scoring Tip: </span>
                                {chapter.workedExample.boardTip}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Ask AI direct button */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-muted-foreground">
                          Stuck on any step? Ask Google Gemini AI:
                        </span>
                        <Link
                          href={`/ai-doubt-solver?doubt=${encodeURIComponent(
                            `Explain the concept of ${chapter.title} in ${activeBoard} Class 10 ${subject.name} with step-by-step examples.`
                          )}`}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-sm"
                        >
                          <Bot className="w-3.5 h-3.5" />
                          <span>Solve Doubt with Gemini AI</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Bar for Chapter */}
              <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> ~{chapter.estHours} Study Hours
                  </span>
                  <span className="flex items-center gap-1">
                    <FileCheck2 className="w-3.5 h-3.5" /> {chapter.totalQuestions} Questions
                  </span>
                  <span className={`font-semibold px-2 py-0.5 rounded-full text-[10px] ${
                    chapter.difficulty === 'HARD' ? 'bg-rose-500/10 text-rose-600' : chapter.difficulty === 'MEDIUM' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'
                  }`}>
                    {chapter.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/doubts/new?subject=${subject.id}&chapter=${chapter.id}`}
                    className="px-3 py-1.5 rounded-lg border border-border hover:bg-muted font-medium text-foreground transition-colors flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" /> Ask Doubt
                  </Link>
                  <Link
                    href="/tests"
                    className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all flex items-center gap-1 shadow-sm"
                  >
                    <FileCheck2 className="w-3.5 h-3.5" /> Practice {activeBoard} Test &rarr;
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
