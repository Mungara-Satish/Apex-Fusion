'use client';

import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';
import { useAppStore } from '@/lib/store';

export function SubjectRadarChart() {
  const { chapters } = useAppStore();

  const subjects = [
    { name: 'Math', prefix: 'sub-math' },
    { name: 'Physics', prefix: 'sub-physic' },
    { name: 'Chemistry', prefix: 'sub-chem' },
    { name: 'Biology', prefix: 'sub-bio' },
    { name: 'Social Studies', prefix: 'sub-history' },
    { name: 'English', prefix: 'sub-english' },
  ];

  const data = subjects.map((s) => {
    const subChapters = chapters.filter(
      (c) =>
        c.subjectId.toLowerCase().includes(s.name.toLowerCase().slice(0, 4)) ||
        c.subjectId.startsWith(s.prefix)
    );
    const completed = subChapters.filter(
      (c) => c.status === 'COMPLETED' || c.status === 'REVISED'
    ).length;
    const total = subChapters.length || 5;
    const score = Math.round((completed / total) * 100);

    return {
      subject: s.name,
      score: score,
      targetScore: 95,
    };
  });

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis dataKey="subject" stroke="hsl(var(--foreground))" fontSize={11} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={10} />
          <Radar name="Current Mastery %" dataKey="score" stroke="#0ea5e9" fill="#38bdf8" fillOpacity={0.4} />
          <Radar name="Target %" dataKey="targetScore" stroke="#10b981" fill="#10b981" fillOpacity={0.15} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: '0.5rem',
              color: 'hsl(var(--foreground))',
              fontSize: '12px',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
