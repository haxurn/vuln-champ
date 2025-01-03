'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface ProgressEntry {
  date: string;
  activity: string;
  points: number;
  type: 'vulnerability' | 'badge' | 'streak';
}

const progressData: ProgressEntry[] = [
  {
    date: '2024-03-20 14:30',
    activity: 'Reported SQL Injection vulnerability',
    points: 250,
    type: 'vulnerability',
  },
  {
    date: '2024-03-20 12:15',
    activity: 'Earned Expert Badge',
    points: 500,
    type: 'badge',
  },
  {
    date: '2024-03-19 16:45',
    activity: 'Weekly Streak Bonus',
    points: 100,
    type: 'streak',
  },
];

const typeColors = {
  vulnerability: 'default',
  badge: 'secondary',
  streak: 'outline',
} as const;

export function ProgressTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {progressData.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{new Date(entry.date).toLocaleString()}</TableCell>
              <TableCell>{entry.activity}</TableCell>
              <TableCell>
                <Badge variant={typeColors[entry.type]}>
                  {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">+{entry.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}