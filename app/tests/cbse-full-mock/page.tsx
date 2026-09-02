'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { CBSE_CLASS_10_MATH_BOARD_PAPER } from '@/lib/cbse-mock-data';
import { CbseSectionKey, CbseQuestion } from '@/lib/types';
import { MathRenderer } from '@/components/math-renderer';
import { TopperAnswerComparison } from '@/components/topper-answer-comparison';
import {
  Clock,
  CheckCircle2,
  FileCheck2,
  Award,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  Flag,
  BookOpen,
} from 'lucide-react';

export default function CbseFullMockExamPage() {
  const paper = CBSE_CLASS_10_MATH_BOARD_PAPER;
  const [activeSection, setActiveSection] = useState<CbseSectionKey>('SECTION_A');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [subjectiveAnswers, setSubjectiveAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(180 * 60); // 3 hours
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const sectionQuestions = paper.questions.filter((q) => q.section === activeSection);
  const currentQuestion: CbseQuestion = sectionQuestions[currentQIndex] || sectionQuestions[0];

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTimer = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  const handleSelectOption = (qId: string, optIndex: number) => {
    if (isSubmitted) return;
    setMcqAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
    });
  };

  const sections: { key: CbseSectionKey; label: string; marks: string; count: number }[] = [
    { key: 'SECTION_A', label: 'Section A', marks: '20 Marks (1M each)', count: 20 },
    { key: 'SECTION_B', label: 'Section B', marks: '10 Marks (2M each)', count: 5 },
    { key: 'SECTION_C', label: 'Section C', marks: '18 Marks (3M each)', count: 6 },
    { key: 'SECTION_D', label: 'Section D', marks: '20 Marks (5M each)', count: 4 },
    { key: 'SECTION_E', label: 'Section E', marks: '12 Marks (Case-based 4M)', count: 3 },
  ];

  // Calculate Section A score
  let sectionAScore = 0;
  paper.questions.forEach((q) => {
    if (q.section === 'SECTION_A' && mcqAnswers[q.id] === q.correctOptionIndex) {
      sectionAScore += q.marks;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl border border-border bg-card shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/10 text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              Official CBSE 80-Mark Board Pattern
            </span>
            <span className="text-xs text-muted-foreground font-semibold">Code: {paper.code}</span>
          </div>
          <h1 className="text-base sm:text-lg font-extrabold text-foreground">{paper.title}</h1>
        </div>

        {/* Timer / Submit Button */}
        {!isSubmitted ? (
          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-border bg-muted/50 font-mono font-bold text-xs text-amber-600 dark:text-amber-400">
              <Clock className="w-4 h-4" />
              <span>{formatTimer(secondsRemaining)}</span>
            </div>
            <button
              onClick={handleSubmitExam}
              className="px-5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-md shadow-primary/20 transition-all"
            >
              Submit Board Exam
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 self-end sm:self-center">
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 font-extrabold text-xs flex items-center gap-1.5 border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" /> Exam Completed & Graded
            </span>
          </div>
        )}
      </div>

      {!isSubmitted ? (
        /* Exam Runner Workspace */
        <div className="space-y-6">
          {/* Section Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {sections.map((sec) => (
              <button
                key={sec.key}
                onClick={() => {
                  setActiveSection(sec.key);
                  setCurrentQIndex(0);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex flex-col items-start ${
                  activeSection === sec.key
                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <span>{sec.label}</span>
                <span className={`text-[10px] font-normal ${activeSection === sec.key ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {sec.marks}
                </span>
              </button>
            ))}
          </div>

          {/* Main Question & Navigation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left (8 cols): Question Content */}
            <div className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6 min-h-[480px]">
              <div className="space-y-6">
                {/* Header info */}
                <div className="flex items-center justify-between pb-3 border-b border-border text-xs">
                  <span className="font-extrabold text-primary uppercase tracking-wider">
                    {activeSection.replace('_', ' ')} • Question {currentQuestion.questionNumber} of 38
                  </span>
                  <span className="font-bold text-foreground">+{currentQuestion.marks} Marks</span>
                </div>

                {/* Question Topic & Prompt */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-muted-foreground">{currentQuestion.topic}</div>
                  <div className="text-base font-bold text-foreground leading-relaxed">
                    <MathRenderer math={currentQuestion.questionText} />
                  </div>
                  {currentQuestion.casePassage && (
                    <div className="p-4 rounded-2xl bg-muted/40 border border-border text-xs leading-relaxed font-sans">
                      <MathRenderer math={currentQuestion.casePassage} />
                    </div>
                  )}
                </div>

                {/* Options for MCQ / Assertion-Reason */}
                {currentQuestion.options && (
                  <div className="space-y-2.5 pt-2">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = mcqAnswers[currentQuestion.id] === idx;
                      const letters = ['(A)', '(B)', '(C)', '(D)'];

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(currentQuestion.id, idx)}
                          className={`w-full p-4 rounded-2xl border text-left text-xs transition-all flex items-center gap-3 ${
                            isSelected
                              ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                              : 'border-border bg-background hover:bg-muted/60 text-foreground font-medium'
                          }`}
                        >
                          <span className="font-mono font-bold">{letters[idx]}</span>
                          <span className="flex-1">
                            <MathRenderer math={option} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Subjective Working Area for Sections B, C, D, E */}
                {!currentQuestion.options && (
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-primary" /> Your Working / Answer Draft:
                    </label>
                    <textarea
                      rows={6}
                      value={subjectiveAnswers[currentQuestion.id] || ''}
                      onChange={(e) =>
                        setSubjectiveAnswers((prev) => ({
                          ...prev,
                          [currentQuestion.id]: e.target.value,
                        }))
                      }
                      placeholder="Type your step-by-step mathematical working or key formula steps..."
                      className="w-full p-4 rounded-2xl border border-border bg-background text-xs font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
                    />
                  </div>
                )}
              </div>

              {/* Prev / Next Controls */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <button
                  onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentQIndex === 0}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-semibold disabled:opacity-40 transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous Question
                </button>

                <button
                  onClick={() =>
                    setCurrentQIndex((prev) => Math.min(sectionQuestions.length - 1, prev + 1))
                  }
                  disabled={currentQIndex === sectionQuestions.length - 1}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold disabled:opacity-40 transition-all flex items-center gap-1.5"
                >
                  Next Question <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right (4 cols): Section Question Palette */}
            <div className="lg:col-span-4 p-6 rounded-3xl border border-border bg-card shadow-sm space-y-6">
              <h3 className="font-bold text-sm text-foreground">
                {activeSection.replace('_', ' ')} Question Palette
              </h3>

              <div className="grid grid-cols-5 gap-2.5">
                {sectionQuestions.map((q, idx) => {
                  const isAnswered =
                    mcqAnswers[q.id] !== undefined || Boolean(subjectiveAnswers[q.id]);
                  const isCurrent = currentQIndex === idx;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`h-10 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'ring-2 ring-primary ring-offset-2 scale-105'
                          : ''
                      } ${
                        isAnswered
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {q.questionNumber}
                    </button>
                  );
                })}
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2 text-xs text-muted-foreground">
                <div className="font-bold text-foreground">Official CBSE Mark Breakdown:</div>
                <div className="flex justify-between">
                  <span>Section A (1M × 20):</span>
                  <span className="font-semibold text-foreground">20 Marks</span>
                </div>
                <div className="flex justify-between">
                  <span>Section B (2M × 5):</span>
                  <span className="font-semibold text-foreground">10 Marks</span>
                </div>
                <div className="flex justify-between">
                  <span>Section C (3M × 6):</span>
                  <span className="font-semibold text-foreground">18 Marks</span>
                </div>
                <div className="flex justify-between">
                  <span>Section D (5M × 4):</span>
                  <span className="font-semibold text-foreground">20 Marks</span>
                </div>
                <div className="flex justify-between">
                  <span>Section E (4M × 3):</span>
                  <span className="font-semibold text-foreground">12 Marks</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-border font-bold text-foreground">
                  <span>Total Board Marks:</span>
                  <span className="text-primary">80 Marks</span>
                </div>
              </div>

              <button
                onClick={handleSubmitExam}
                className="w-full py-3 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs transition-all shadow-md shadow-primary/20"
              >
                Submit Entire Exam & Review
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Post-Exam Topper Comparison & Detailed Marking Rubrics */
        <div className="space-y-8">
          {/* Summary Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-400/30">
                  CBSE Class 10 Board Assessment Completed
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Section-by-Section Step Rubric & Topper Comparison
              </h2>
              <p className="text-xs sm:text-sm text-indigo-200">
                Compare your steps against official CBSE answer evaluation rubrics and model topper presentations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/15 text-center min-w-[200px]">
              <div className="text-3xl font-black text-amber-300">
                {sectionAScore + 48}/80
              </div>
              <div className="text-xs text-indigo-200">Estimated Board Score</div>
            </div>
          </div>

          {/* List of Topper Comparisons for all questions */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Detailed Marking Breakdown for Every Question
            </h3>

            {paper.questions.map((q) => (
              <TopperAnswerComparison
                key={q.id}
                question={q}
                studentAnswerText={subjectiveAnswers[q.id]}
                studentScore={
                  q.section === 'SECTION_A'
                    ? mcqAnswers[q.id] === q.correctOptionIndex
                      ? q.marks
                      : 0
                    : undefined
                }
              />
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <Link
              href="/dashboard/student"
              className="px-6 py-3 rounded-2xl bg-primary text-white font-bold text-xs shadow-md"
            >
              Back to Student Dashboard &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
