'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { LeaderboardFilters } from '@/components/leaderboard/leaderboard-filters';
import { LeaderboardTable } from '@/components/leaderboard/leaderboard';
import { TopPerformers } from '@/components/leaderboard/top-performers';

export default function LeaderboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <TopPerformers />
        <LeaderboardFilters />
        <LeaderboardTable />
      </div>
    </MainLayout>
  );
}