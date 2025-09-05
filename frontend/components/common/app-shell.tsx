// frontend/components/common/app-shell.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">Resume Matcher</Link>
          <nav className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/(default)/dashboard" className="hover:text-gray-900">Dashboard</Link>
            <Link href="/(default)/(onboarding)/resume" className="hover:text-gray-900">Upload Resume</Link>
            <Link href="/(default)/(onboarding)/jobs" className="hover:text-gray-900">Jobs</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Resume Matcher</span>
          <span>v0.1.0</span>
        </div>
      </footer>
    </div>
  );
}
