'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { StatsCard } from '@/components/dashboard/stats-card';
import { ActivityChart } from '@/components/dashboard/activity-chart';
import { Users, ShieldAlert, Trophy, Activity } from 'lucide-react';

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6 dark:text-white dark:bg-black">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Users"
            value="2,853"
            change="+20.1% from last month"
            Icon={Users}
          />
          <StatsCard
            title="Vulnerabilities"
            value="1,234"
            change="+15% from last month"
            Icon={ShieldAlert}
          />
          <StatsCard
            title="Total Points"
            value="45,231"
            change="+25% from last month"
            Icon={Trophy}
          />
          <StatsCard
            title="Active Users"
            value="573"
            change="+5% from last month"
            Icon={Activity}
          />
        </div>

        <ActivityChart />
      </div>
    </MainLayout>
  );
}