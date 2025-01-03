'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Trophy, Flame, Clock } from 'lucide-react';

const metrics = [
  {
    title: 'Vulnerabilities Reported',
    value: '284',
    change: '+12 this week',
    icon: Shield,
  },
  {
    title: 'Points Earned',
    value: '15,234',
    change: '+2,345 this month',
    icon: Trophy,
  },
  {
    title: 'Active Streak',
    value: '12 weeks',
    change: 'Personal best!',
    icon: Flame,
  },
  {
    title: 'Last Activity',
    value: '2 hours ago',
    change: 'Active today',
    icon: Clock,
  },
];

export function ProgressMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.change}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}