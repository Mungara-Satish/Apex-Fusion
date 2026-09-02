'use client';

import React from 'react';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  AlertCircle,
  Download,
  Printer,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export function CbseReportCard() {
  const scholasticData = [
    {
      code: '041',
      subject: 'Mathematics (Standard)',
      theory: 74,
      internal: 19,
      total: 93,
      grade: 'A1',
      gp: 10,
    },
    {
      code: '086',
      subject: 'Science (Physics, Chem, Bio)',
      theory: 72,
      internal: 19,
      total: 91,
      grade: 'A1',
      gp: 10,
    },
    {
      code: '087',
      subject: 'Social Science (Hist, Civ, Geo, Eco)',
      theory: 68,
      internal: 18,
      total: 86,
      grade: 'A2',
      gp: 9,
    },
    {
      code: '184',
      subject: 'English Language & Literature',
      theory: 71,
      internal: 19,
      total: 90,
      grade: 'A1',
      gp: 10,
    },
  ];

  const totalObtained = scholasticData.reduce((acc, s) => acc + s.total, 0);
  const totalMax = scholasticData.length * 100;
  const overallPercentage = ((totalObtained / totalMax) * 100).toFixed(1);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-end gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl border border-border bg-card hover:bg-muted text-foreground text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
        >
          <Printer className="w-4 h-4" /> Print / Save as PDF
        </button>
      </div>

      {/* Printable CBSE Report Card Paper Container */}
      <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl border-2 border-indigo-900/40 bg-white text-slate-900 shadow-2xl space-y-8 font-sans">
        {/* Header with CBSE Emblem styling */}
        <div className="text-center space-y-1.5 pb-6 border-b-2 border-indigo-950">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-900 text-white flex items-center justify-center font-bold text-xl shadow-md">
              <GraduationCap className="w-7 h-7" />
            </div>
          </div>
          <div className="text-[11px] font-extrabold tracking-widest text-indigo-900 uppercase">
            Central Board of Secondary Education — Continuous and Comprehensive Evaluation (CCE)
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 uppercase">
            EduTen Board Assessment Report Card
          </h1>
          <div className="text-xs font-semibold text-slate-600">
            Academic Term Pre-Board Evaluation • Class 10 (Session 2025-26)
          </div>
        </div>

        {/* Student Profile Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Student Name</div>
            <div className="font-bold text-slate-900 text-sm">Aarav Sharma</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">CBSE Roll Number</div>
            <div className="font-mono font-bold text-slate-900 text-sm">10245892</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Class & Section</div>
            <div className="font-bold text-slate-900 text-sm">Class 10 - Section A</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Attendance Rate</div>
            <div className="font-bold text-emerald-700 text-sm">98.5% (Regular)</div>
          </div>
        </div>

        {/* Scholastic Performance Table */}
        <div className="space-y-2">
          <h2 className="font-extrabold text-sm uppercase tracking-wider text-indigo-950">
            Part 1: Scholastic Performance (Academic Subjects)
          </h2>

          <div className="border border-slate-300 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-indigo-950 text-white font-bold">
                <tr>
                  <th className="p-3">Code</th>
                  <th className="p-3">Subject Name</th>
                  <th className="p-3 text-center">Theory (80)</th>
                  <th className="p-3 text-center">Internal / Practical (20)</th>
                  <th className="p-3 text-center">Total (100)</th>
                  <th className="p-3 text-center">Grade</th>
                  <th className="p-3 text-center">Grade Point</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {scholasticData.map((row) => (
                  <tr key={row.code} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-semibold">{row.code}</td>
                    <td className="p-3 font-bold text-slate-900">{row.subject}</td>
                    <td className="p-3 text-center font-semibold">{row.theory}</td>
                    <td className="p-3 text-center font-semibold">{row.internal}</td>
                    <td className="p-3 text-center font-bold text-indigo-900 text-sm">{row.total}</td>
                    <td className="p-3 text-center font-extrabold text-emerald-700">{row.grade}</td>
                    <td className="p-3 text-center font-bold">{row.gp}</td>
                  </tr>
                ))}
                <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
                  <td colSpan={4} className="p-3 text-right uppercase">
                    Cumulative Total & Overall Percentage:
                  </td>
                  <td className="p-3 text-center text-sm font-black text-indigo-950">
                    {totalObtained} / {totalMax}
                  </td>
                  <td colSpan={2} className="p-3 text-center text-sm font-black text-emerald-700">
                    {overallPercentage}% (A1 Merit)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Co-Scholastic Activities */}
        <div className="space-y-2">
          <h2 className="font-extrabold text-sm uppercase tracking-wider text-indigo-950">
            Part 2: Co-Scholastic & Skill Competencies
          </h2>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              <div className="font-bold text-slate-800">Work Education (501)</div>
              <div className="text-emerald-700 font-extrabold mt-1">Grade: A (Exemplary)</div>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              <div className="font-bold text-slate-800">Art Education (502)</div>
              <div className="text-emerald-700 font-extrabold mt-1">Grade: A (Exemplary)</div>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              <div className="font-bold text-slate-800">Health & Physical Education (503)</div>
              <div className="text-emerald-700 font-extrabold mt-1">Grade: A (Exemplary)</div>
            </div>
          </div>
        </div>

        {/* AI Diagnostic Summary & Recommendations */}
        <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-indigo-950 text-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            AI Diagnostic Insights for Parents & Mentors:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="font-bold text-emerald-800">Key Strengths Demonstrated:</span>
              <p className="text-slate-700 leading-relaxed">
                Outstanding accuracy (94%+) in Optics Ray Diagrams, Arithmetic Progressions, and Real Numbers. Strong mathematical proof presentation.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-amber-800">Recommended Revision Focus:</span>
              <p className="text-slate-700 leading-relaxed">
                Practice 5-mark word problems in Quadratic Equations (Upstream/Downstream) and chemical reaction balancing under timed conditions before Board exams.
              </p>
            </div>
          </div>
        </div>

        {/* Signatures & Certification */}
        <div className="pt-8 border-t border-slate-300 flex justify-between items-end text-xs text-slate-600">
          <div className="text-center space-y-2">
            <div className="font-signature text-lg font-bold text-slate-800">Dr. Priya Raman</div>
            <div className="border-t border-slate-400 pt-1 font-semibold">Senior Academic Mentor</div>
          </div>
          <div className="text-center space-y-2">
            <div className="font-mono text-xs font-bold text-emerald-700">VERIFIED BOARD RESULT</div>
            <div className="border-t border-slate-400 pt-1 font-semibold">Parent / Guardian Signature</div>
          </div>
          <div className="text-center space-y-2">
            <div className="font-serif text-lg font-bold text-indigo-950">EduTen Council</div>
            <div className="border-t border-slate-400 pt-1 font-semibold">Academic Director & Controller</div>
          </div>
        </div>
      </div>
    </div>
  );
}
