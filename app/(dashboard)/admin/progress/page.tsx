'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { ProgressFilters } from '@/components/progress/progress-filters';
import { ProgressMetrics } from '@/components/progress/progress-mertrics';
import { ProgressChart } from '@/components/progress/progress-chart';
import { ProgressTable } from '@/components/progress/progress-table';

export default function ProgressPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Progress Tracking</h1>
        <ProgressMetrics />
        <ProgressFilters />
        <ProgressChart />
        <ProgressTable />
      </div>
    </MainLayout>
  );
}