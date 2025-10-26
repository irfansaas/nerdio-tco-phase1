'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Calculator, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Target, 
  FileText, 
  Settings,
  Menu,
  X,
  Home,
  Clock
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/', icon: Home },
  { name: 'TCO Calculator', href: '/calculator', icon: Calculator },
  { name: 'Timeline & ROI', href: '/timeline', icon: Clock },
  { name: 'Sensitivity Analysis', href: '/sensitivity', icon: TrendingUp },
  { name: 'Customer Benchmarks', href: '/benchmarks', icon: Users },
  { name: 'Strategic Value', href: '/strategic-value', icon: Target },
  { name: 'Industry Templates', href: '/templates', icon: Settings },
  { name: 'Generate Report', href: '/report', icon: FileText },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-nerdio-teal-50/30">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-nerdio-gray-200 bg-gradient-to-r from-nerdio-teal-500 to-nerdio-teal-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-nerdio-teal-500" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Nerdio</h1>
              <p className="text-xs text-nerdio-teal-50">TCO Calculator</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-nerdio-teal-600 p-2 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-nerdio-gray-200 bg-nerdio-gray-50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 bg-nerdio-yellow-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-nerdio-gray-700">
              All changes saved
            </span>
          </div>
          <p className="text-xs text-nerdio-gray-500">
            © 2025 Nerdio. All rights reserved.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Bar */}
        <header className="h-20 bg-white shadow-sm border-b border-nerdio-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-nerdio-gray-100 text-nerdio-gray-600"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-4">
            <a
              href="https://getnerdio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-nerdio-gray-600 hover:text-nerdio-teal-600 transition-colors"
            >
              Visit Nerdio.com
              <span className="text-nerdio-teal-500">→</span>
            </a>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
