'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { SAMPLE_MOCK_TESTS } from '@/lib/mock-data';
import { MathRenderer } from '@/components/math-renderer';
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Award,
  Sparkles,
  RotateCcw,
  Flag,
  HelpCircle,
} from 'lucide-react';

export default function TestRunnerPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params?.id as string;
  const { addPoints } = useAppStore();

  const test = SAMPLE_MOCK_TESTS.find((t) => t.id === testId);

  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(
    (test?.durationMinutes || 15) * 60
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);

  // Countdown timer
  useEffect(() => {
    if (isSubmitted || !test) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
      setTimeSpentSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, test]);

  if (!test || !test.questions || test.questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold">Practice Test Not Found</h1>
        <Link href="/tests" className="text-primary font-semibold hover:underline">
          &larr; Back to Tests Catalog
        </Link>
      </div>
    );
  }

  const questions = test.questions;
  const currentQuestion = questions[currentQIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const toggleMarkReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);
    // Calculate score
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correct++;
      }
    });
    // Add XP points
    const earnedXP = correct * 20 + 10;
    addPoints(earnedXP);
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Score calculation
  let correctCount = 0;
  let totalScore = 0;
  if (isSubmitted) {
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correctCount++;
        totalScore += q.marks;
      }
    });
  }
  const scorePercentage = Math.round((totalScore / test.totalMarks) * 100);
  const isPassed = totalScore >= test.passingMarks;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Test Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-card shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
              {test.subjectName}
            </span>
            <span className="text-xs text-muted-foreground font-medium">• Class 10 Board Mock</span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-foreground">{test.title}</h1>
        </div>

        {/* Timer or Result Badge */}
        {!isSubmitted ? (
          <div className="flex items-center gap-3 self-end sm:self-center">
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-xs ${
                timeLeftSeconds < 180
                  ? 'bg-rose-500/10 text-rose-600 border-rose-500/30 animate-pulse'
                  : 'bg-muted/80 text-foreground border-border'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTimer(timeLeftSeconds)} Remaining</span>
            </div>

            <button
              onClick={handleSubmitTest}
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs transition-all shadow-sm"
            >
              Submit Test
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 self-end sm:self-center">
            <span
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 ${
                isPassed
                  ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-600 border border-rose-500/30'
              }`}
            >
              {isPassed ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {isPassed ? 'PASSED & BOARD READY' : 'NEEDS REVISION'}
            </span>
          </div>
        )}
      </div>

      {/* Main Runner Layout */}
      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left / Center (8 cols): Current Question View */}
          <div className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6 min-h-[480px]">
            <div className="space-y-6">
              {/* Question Index & Marks */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="text-xs font-bold text-muted-foreground">
                  Question {currentQIndex + 1} of {questions.length}
                </span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-primary font-semibold">+{currentQuestion.marks} Marks</span>
                  <button
                    onClick={toggleMarkReview}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors ${
                      markedForReview[currentQuestion.id]
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 font-bold'
                        : 'border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>{markedForReview[currentQuestion.id] ? 'Marked' : 'Mark for Review'}</span>
                  </button>
                </div>
              </div>

              {/* Question Text with KaTeX Formula */}
              <div className="text-base sm:text-lg font-bold text-foreground leading-relaxed">
                <MathRenderer math={currentQuestion.questionText} />
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === idx;
                  const optionLetters = ['A', 'B', 'C', 'D'];

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
                        isSelected
                          ? 'border-primary bg-primary/5 text-foreground shadow-sm ring-1 ring-primary'
                          : 'border-border bg-background hover:bg-muted/60 text-foreground'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {optionLetters[idx]}
                      </span>
                      <span className="text-sm font-medium flex-1">
                        <MathRenderer math={option} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Question Navigation Controls */}
            <div className="pt-6 border-t border-border flex items-center justify-between">
              <button
                onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQIndex === 0}
                className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-semibold disabled:opacity-40 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous
              </button>

              <button
                onClick={() => setCurrentQIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                disabled={currentQIndex === questions.length - 1}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold disabled:opacity-40 transition-all flex items-center gap-1.5"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right (4 cols): Question Navigation Grid */}
          <div className="lg:col-span-4 p-6 rounded-3xl border border-border bg-card shadow-sm space-y-6">
            <h3 className="font-bold text-sm text-foreground">Question Navigation</h3>

            {/* Question Buttons Grid */}
            <div className="grid grid-cols-5 gap-2.5">
              {questions.map((q, idx) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isMarked = markedForReview[q.id];
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
                      isMarked
                        ? 'bg-amber-500 text-slate-950 font-extrabold'
                        : isAnswered
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-2 pt-4 border-t border-border text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-primary" />
                <span>Answered ({Object.keys(selectedAnswers).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-amber-500" />
                <span>Marked for Review ({Object.keys(markedForReview).filter(k => markedForReview[k]).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-muted" />
                <span>Unvisited ({questions.length - Object.keys(selectedAnswers).length})</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleSubmitTest}
                className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs transition-all shadow-md shadow-primary/20"
              >
                Finish & Submit Test
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Post-Submission Result Card & Solutions */
        <div className="space-y-8">
          {/* Score Summary Box */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-indigo-900 to-purple-950 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                    +{(correctCount * 20 + 10)} XP Earned!
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight">Test Scorecard & Analysis</h2>
                <p className="text-xs sm:text-sm text-indigo-200">
                  Detailed review with step-by-step mathematical solutions.
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15">
                  <div className="text-3xl font-black text-amber-300">{totalScore}/{test.totalMarks}</div>
                  <div className="text-[11px] text-indigo-200">Total Marks ({scorePercentage}%)</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15">
                  <div className="text-3xl font-black text-emerald-300">{correctCount}/{questions.length}</div>
                  <div className="text-[11px] text-indigo-200">Correct Answers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Question Solutions */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Step-by-Step Math Solutions & Explanations
            </h2>

            {questions.map((q, idx) => {
              const chosen = selectedAnswers[q.id];
              const isCorrect = chosen === q.correctOptionIndex;
              const optionLetters = ['A', 'B', 'C', 'D'];

              return (
                <div
                  key={q.id}
                  className={`p-6 sm:p-8 rounded-3xl border bg-card shadow-sm space-y-4 ${
                    isCorrect ? 'border-emerald-500/40' : 'border-rose-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground">
                      Question {idx + 1} • {q.topic}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                        isCorrect
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+{q.marks} Marks)
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" /> Incorrect (0 Marks)
                        </>
                      )}
                    </span>
                  </div>

                  <div className="text-base font-bold text-foreground">
                    <MathRenderer math={q.questionText} />
                  </div>

                  {/* Options with correctness highlight */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = chosen === optIdx;
                      const isActualCorrect = q.correctOptionIndex === optIdx;

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2.5 ${
                            isActualCorrect
                              ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold'
                              : isChosen && !isActualCorrect
                              ? 'border-rose-500/60 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                              : 'border-border bg-muted/20 text-muted-foreground'
                          }`}
                        >
                          <span className="w-5 h-5 rounded-md bg-black/10 flex items-center justify-center font-bold text-[10px]">
                            {optionLetters[optIdx]}
                          </span>
                          <span className="flex-1">
                            <MathRenderer math={opt} />
                          </span>
                          {isActualCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                          {isChosen && !isActualCorrect && <XCircle className="w-4 h-4 text-rose-500" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Step-by-Step Explanation Box */}
                  <div className="p-4 rounded-2xl bg-muted/50 border border-border space-y-2">
                    <div className="text-xs font-bold text-primary flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Step-by-Step Solution:
                    </div>
                    <div className="text-xs text-foreground leading-relaxed whitespace-pre-wrap font-mono">
                      <MathRenderer math={q.explanation} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Link
              href="/tests"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
            >
              Take Another Practice Test &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
