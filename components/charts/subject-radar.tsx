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
import { SUBJECT_PERFORMANCE_METRICS } from '@/lib/mock-data';

export function SubjectRadarChart() {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={SUBJECT_PERFORMANCE_METRICS}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis dataKey="subject" stroke="hsl(var(--foreground))" fontSize={11} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={10} />
          <Radar name="Current Mastery %" dataKey="score" stroke="#4f46e5" fill="#6366f1" fillOpacity={0.4} />
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
