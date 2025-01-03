'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

const data = [
  { name: 'Jan', users: 400, vulnerabilities: 240, points: 2400 },
  { name: 'Feb', users: 300, vulnerabilities: 139, points: 2210 },
  { name: 'Mar', users: 200, vulnerabilities: 980, points: 2290 },
  { name: 'Apr', users: 278, vulnerabilities: 390, points: 2000 },
  { name: 'May', users: 189, vulnerabilities: 480, points: 2181 },
  { name: 'Jun', users: 239, vulnerabilities: 380, points: 2500 },
];

export function ActivityChart() {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? '#ffffff' : '#000000';

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Platform Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name"
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
                  color: textColor
                }}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="hsl(var(--chart-1))" 
                name="Users"
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="vulnerabilities" 
                stroke="hsl(var(--chart-2))" 
                name="Vulnerabilities"
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="points" 
                stroke="hsl(var(--chart-3))" 
                name="Points"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}