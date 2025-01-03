'use client';

import { cn } from '@/lib/utils';
import {
  BarChart3,
  Trophy,
  TrendingUp,
  Shield,
  Award,
  Settings,
  Menu,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const menuItems = [
  { icon: BarChart3, label: 'Dashboard', href: '/' },
  { icon: Trophy, label: 'Leaderboard', href: '/leaderboard' },
  { icon: TrendingUp, label: 'Progress', href: '/progress' },
  { icon: Shield, label: 'Vulnerabilities', href: '/vulnerabilities' },
  { icon: Award, label: 'Badges', href: '/badges' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <div
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-64 bg-background border-r transition-transform duration-200 ease-in-out',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-foreground flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-background rounded-full" />
            </div>
            <span className="font-semibold text-lg md:text-xl text-foreground">
              Vuln Champ
            </span>
          </Link>
        </div>
        <nav className="space-y-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === `/admin${item.href}`;
            return (
              <Link
                key={item.href}
                href={`/admin${item.href}`}
                className={cn(
                  'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent',
                  isActive ? 'bg-accent' : 'transparent'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}