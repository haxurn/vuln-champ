'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

const data = [
  { date: 'Mon', vulnerabilities: 4, points: 450, badges: 1 },
  { date: 'Tue', vulnerabilities: 3, points: 320, badges: 0 },
  { date: 'Wed', vulnerabilities: 5, points: 680, badges: 2 },
  { date: 'Thu', vulnerabilities: 2, points: 240, badges: 0 },
  { date: 'Fri', vulnerabilities: 6, points: 890, badges: 1 },
  { date: 'Sat', vulnerabilities: 4, points: 390, badges: 1 },
  { date: 'Sun', vulnerabilities: 3, points: 280, badges: 0 },
];

export function ProgressChart() {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? '#ffffff' : '#000000';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fill: textColor }}
                axisLine={{ stroke: textColor }}
                tickLine={{ stroke: textColor }}
              />
              <YAxis
                tick={{ fill: textColor }}
                axisLine={{ stroke: textColor }}
                tickLine={{ stroke: textColor }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  color: textColor,
                }}
              />
              <Line
                type="monotone"
                dataKey="vulnerabilities"
                name="Vulnerabilities"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="points"
                name="Points"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="badges"
                name="Badges"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}