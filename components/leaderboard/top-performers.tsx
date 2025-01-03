'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy } from 'lucide-react';

interface TopPerformer {
  rank: number;
  name: string;
  points: number;
  image: string;
}

const topPerformers: TopPerformer[] = [
  { rank: 1, name: 'Alice Chen', points: 15420, image: 'https://i.pravatar.cc/150?u=alice' },
  { rank: 2, name: 'Bob Smith', points: 12350, image: 'https://i.pravatar.cc/150?u=bob' },
  { rank: 3, name: 'Carol Davis', points: 11200, image: 'https://i.pravatar.cc/150?u=carol' },
];

const trophyColors = {
  1: 'text-yellow-500',
  2: 'text-gray-400',
  3: 'text-amber-600',
};

export function TopPerformers() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {topPerformers.map((performer) => (
        <Card key={performer.rank}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rank #{performer.rank}</CardTitle>
            <Trophy className={`h-4 w-4 ${trophyColors[performer.rank as keyof typeof trophyColors]}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={performer.image} alt={performer.name} />
                <AvatarFallback>{performer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{performer.name}</p>
                <p className="text-sm text-muted-foreground">{performer.points.toLocaleString()} points</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}