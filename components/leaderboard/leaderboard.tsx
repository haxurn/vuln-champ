'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown } from 'lucide-react';

interface User {
  rank: number;
  name: string;
  points: number;
  vulnerabilities: number;
  badges: number;
  status: 'active' | 'inactive';
}

const mockUsers: User[] = [
  { rank: 1, name: 'Alice Chen', points: 15420, vulnerabilities: 45, badges: 12, status: 'active' },
  { rank: 2, name: 'Bob Smith', points: 12350, vulnerabilities: 38, badges: 10, status: 'active' },
  { rank: 3, name: 'Carol Davis', points: 11200, vulnerabilities: 32, badges: 8, status: 'inactive' },
  { rank: 4, name: 'David Wilson', points: 10150, vulnerabilities: 28, badges: 7, status: 'active' },
  { rank: 5, name: 'Eve Johnson', points: 9800, vulnerabilities: 25, badges: 6, status: 'active' },
];

export function LeaderboardTable() {
  const [sortColumn, setSortColumn] = useState<keyof User>('points');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const sortData = (column: keyof User) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => sortData('points')}>
                Points
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => sortData('vulnerabilities')}>
                Vulnerabilities
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Badges</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockUsers.map((user) => (
            <TableRow key={user.rank}>
              <TableCell className="font-medium">{user.rank}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.points.toLocaleString()}</TableCell>
              <TableCell>{user.vulnerabilities}</TableCell>
              <TableCell>{user.badges}</TableCell>
              <TableCell>
                <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                  {user.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}