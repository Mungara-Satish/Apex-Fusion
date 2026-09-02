'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line,
  ComposedChart,
} from 'recharts';
import { WEEKLY_STUDY_ANALYTICS } from '@/lib/mock-data';

export function PerformanceChart() {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={WEEKLY_STUDY_ANALYTICS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="h" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: '0.5rem',
              color: 'hsl(var(--foreground))',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          <Bar dataKey="hours" name="Study Hours" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={24} />
          <Line type="monotone" dataKey="target" name="Daily Target (2.5h)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
