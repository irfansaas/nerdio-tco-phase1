'use client';

import React from 'react';
import Link from 'next/link';
import { useTCO } from '@/contexts/TCOContext';
import { 
  ArrowRight, 
  TrendingDown, 
  Users, 
  Clock, 
  DollarSign,
  Calculator,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';

export default function HomePage() {
  const { calculations, namedUsers, scenario } = useTCO();

  const scenarioLabels = {
    onprem: 'On-Premises → Azure Virtual Desktop',
    citrix: 'Citrix/VMware → Azure Virtual Desktop',
    native: 'Native AVD → AVD + Nerdio'
  };

  const quickActions = [
    {
      title: 'Start Calculation',
      description: 'Input your organization details and current costs',
      icon: Calculator,
      href: '/calculator',
      color: 'teal'
    },
    {
      title: 'View Timeline',
      description: 'See migration phases and break-even analysis',
      icon: Clock,
      href: '/timeline',
      color: 'yellow'
    },
    {
      title: 'Analyze Risk',
      description: 'Run sensitivity analysis on key assumptions',
      icon: BarChart3,
      href: '/sensitivity',
      color: 'teal'
    },
    {
      title: 'See Benchmarks',
      description: 'Compare with similar organizations',
      icon: Users,
      href: '/benchmarks',
      color: 'yellow'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-nerdio-teal-500 via-nerdio-teal-600 to-nerdio-teal-700 p-8 lg:p-12 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-nerdio-yellow-500/20 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-nerdio-teal-400/20 rounded-full blur-3xl -ml-48 -mb-48" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-6 h-6 text-nerdio-yellow-500" />
            <span className="text-nerdio-yellow-500 font-semibold text-sm uppercase tracking-wide">
              Total Cost of Ownership
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Nerdio TCO Calculator Suite
          </h1>
          
          <p className="text-xl text-nerdio-teal-50 max-w-3xl mb-8">
            Comprehensive financial analysis for your Azure Virtual Desktop migration or optimization journey
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/calculator" className="btn-secondary inline-flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/templates" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 inline-flex items-center gap-2">
              Use Industry Template
            </Link>
          </div>
        </div>
      </div>

      {/* Current Configuration Summary */}
      {calculations && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="stat-label">3-Year Savings</div>
              <TrendingDown className="w-5 h-5 text-nerdio-teal-500" />
            </div>
            <div className="stat-value">
              ${(calculations.savings.total / 1000000).toFixed(2)}M
            </div>
            <div className="text-sm text-nerdio-gray-600 mt-2">
              {calculations.savings.percentage.toFixed(1)}% reduction
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="stat-label">Users</div>
              <Users className="w-5 h-5 text-nerdio-teal-500" />
            </div>
            <div className="stat-value">
              {namedUsers.toLocaleString()}
            </div>
            <div className="text-sm text-nerdio-gray-600 mt-2">
              {calculations.ccu.toLocaleString()} concurrent
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="stat-label">Break-Even</div>
              <Clock className="w-5 h-5 text-nerdio-teal-500" />
            </div>
            <div className="stat-value">
              {calculations.migration.breakEvenMonths.toFixed(1)}
            </div>
            <div className="text-sm text-nerdio-gray-600 mt-2">
              months
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="stat-label">ROI</div>
              <DollarSign className="w-5 h-5 text-nerdio-teal-500" />
            </div>
            <div className="stat-value">
              {calculations.migration.roi.toFixed(0)}%
            </div>
            <div className="text-sm text-nerdio-gray-600 mt-2">
              3-year return
            </div>
          </div>
        </div>
      )}

      {/* Current Scenario Badge */}
      <div className="card bg-gradient-to-r from-nerdio-teal-50 to-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-nerdio-teal-500 flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-sm font-medium text-nerdio-gray-600 mb-1">Current Scenario</div>
            <div className="text-lg font-bold text-nerdio-gray-900">{scenarioLabels[scenario]}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="section-header">Quick Actions</h2>
        <p className="section-subheader">Choose where you'd like to start or continue</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const isHighlight = action.color === 'teal';
            
            return (
              <Link
                key={action.title}
                href={action.href}
                className={`card-interactive group ${isHighlight ? 'border-nerdio-teal-200 bg-gradient-to-br from-white to-nerdio-teal-50' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${isHighlight ? 'bg-nerdio-teal-500' : 'bg-nerdio-yellow-500'} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-nerdio-gray-900 mb-1 group-hover:text-nerdio-teal-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-nerdio-gray-600 text-sm mb-3">
                      {action.description}
                    </p>
                    <div className="flex items-center gap-2 text-nerdio-teal-600 font-medium text-sm">
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="section-header">What's Included</h2>
        <p className="section-subheader">Comprehensive tools for your TCO analysis</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="w-10 h-10 rounded-lg bg-nerdio-teal-100 flex items-center justify-center mb-4">
              <Calculator className="w-5 h-5 text-nerdio-teal-600" />
            </div>
            <h3 className="font-bold text-nerdio-gray-900 mb-2">TCO Calculator</h3>
            <p className="text-sm text-nerdio-gray-600">
              Input your current costs and get detailed 3-year projections with Azure + Nerdio
            </p>
          </div>

          <div className="card">
            <div className="w-10 h-10 rounded-lg bg-nerdio-yellow-100 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-nerdio-yellow-700" />
            </div>
            <h3 className="font-bold text-nerdio-gray-900 mb-2">Migration Timeline</h3>
            <p className="text-sm text-nerdio-gray-600">
              Visualize your migration journey with phase-by-phase planning and milestones
            </p>
          </div>

          <div className="card">
            <div className="w-10 h-10 rounded-lg bg-nerdio-teal-100 flex items-center justify-center mb-4">
              <BarChart3 className="w-5 h-5 text-nerdio-teal-600" />
            </div>
            <h3 className="font-bold text-nerdio-gray-900 mb-2">Sensitivity Analysis</h3>
            <p className="text-sm text-nerdio-gray-600">
              Test assumptions with best/worst case scenarios and risk assessment
            </p>
          </div>

          <div className="card">
            <div className="w-10 h-10 rounded-lg bg-nerdio-yellow-100 flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-nerdio-yellow-700" />
            </div>
            <h3 className="font-bold text-nerdio-gray-900 mb-2">Customer Benchmarks</h3>
            <p className="text-sm text-nerdio-gray-600">
              Compare your results with real customer case studies and industry data
            </p>
          </div>

          <div className="card">
            <div className="w-10 h-10 rounded-lg bg-nerdio-teal-100 flex items-center justify-center mb-4">
              <Target className="w-5 h-5 text-nerdio-teal-600" />
            </div>
            <h3 className="font-bold text-nerdio-gray-900 mb-2">Strategic Value</h3>
            <p className="text-sm text-nerdio-gray-600">
              Quantify beyond hard costs: agility, risk mitigation, and innovation
            </p>
          </div>

          <div className="card">
            <div className="w-10 h-10 rounded-lg bg-nerdio-yellow-100 flex items-center justify-center mb-4">
              <Calculator className="w-5 h-5 text-nerdio-yellow-700" />
            </div>
            <h3 className="font-bold text-nerdio-gray-900 mb-2">Industry Templates</h3>
            <p className="text-sm text-nerdio-gray-600">
              Start fast with pre-configured scenarios for your industry vertical
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
