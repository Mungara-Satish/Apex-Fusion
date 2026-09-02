'use client';

import React from 'react';
import { MathRenderer } from './math-renderer';
import { CbseQuestion } from '@/lib/types';
import { Award, CheckCircle2, AlertCircle, Sparkles, FileText } from 'lucide-react';

interface TopperAnswerComparisonProps {
  question: CbseQuestion;
  studentAnswerText?: string;
  studentScore?: number;
}

export function TopperAnswerComparison({
  question,
  studentAnswerText,
  studentScore,
}: TopperAnswerComparisonProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
            {question.section.replace('_', ' ')} • Question {question.questionNumber} ({question.marks} Marks)
          </span>
          <h3 className="font-bold text-sm text-foreground mt-0.5">{question.topic}</h3>
        </div>

        {studentScore !== undefined && (
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-primary/10 text-primary">
            Score: {studentScore}/{question.marks} Marks
          </span>
        )}
      </div>

      {/* Question Text */}
      <div className="text-sm font-semibold text-foreground leading-relaxed">
        <MathRenderer math={question.questionText} />
      </div>

      {question.casePassage && (
        <div className="p-4 rounded-2xl bg-muted/40 border border-border text-xs leading-relaxed font-sans">
          <MathRenderer math={question.casePassage} />
        </div>
      )}

      {/* Side-by-side or stacked Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: CBSE Step-Marking Rubric */}
        <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-400">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Official CBSE Step-Marking Rubric:
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            {question.markingRubric.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">•</span>
                <span className="text-foreground">
                  <MathRenderer math={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Model Topper Answer Script */}
        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
            <Award className="w-4 h-4 text-emerald-600" />
            All-India Board Topper Model Presentation:
          </div>
          <div className="text-xs text-foreground font-mono leading-relaxed whitespace-pre-wrap">
            <MathRenderer math={question.topperModelAnswer} />
          </div>
        </div>
      </div>
    </div>
  );
}
