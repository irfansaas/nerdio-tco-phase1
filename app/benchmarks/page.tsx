'use client';

import React, { useState } from 'react';
import { useTCO } from '@/contexts/TCOContext';
import { Users, Building2, TrendingDown, CheckCircle, Filter } from 'lucide-react';

export default function BenchmarksPage() {
  const { industry, namedUsers, calculations } = useTCO();
  const [filterIndustry, setFilterIndustry] = useState('all');

  const customerCases = [
    {
      name: 'Global Financial Services',
      industry: 'financial',
      users: 15000,
      scenario: 'Citrix → AVD',
      savings: 52,
      timeframe: '18 months',
      roi: 285
    },
    {
      name: 'Healthcare Network',
      industry: 'healthcare',
      users: 8500,
      scenario: 'On-Prem → AVD',
      savings: 63,
      timeframe: '12 months',
      roi: 420
    },
    {
      name: 'Manufacturing Corp',
      industry: 'manufacturing',
      users: 5200,
      scenario: 'Citrix → AVD',
      savings: 48,
      timeframe: '15 months',
      roi: 310
    },
    {
      name: 'Tech Unicorn',
      industry: 'technology',
      users: 3000,
      scenario: 'Native AVD → Nerdio',
      savings: 38,
      timeframe: '6 months',
      roi: 180
    },
    {
      name: 'University System',
      industry: 'education',
      users: 12000,
      scenario: 'On-Prem → AVD',
      savings: 68,
      timeframe: '24 months',
      roi: 380
    },
    {
      name: 'Government Agency',
      industry: 'government',
      users: 7500,
      scenario: 'Citrix → AVD',
      savings: 45,
      timeframe: '18 months',
      roi: 265
    }
  ];

  const filteredCases = filterIndustry === 'all' 
    ? customerCases 
    : customerCases.filter(c => c.industry === filterIndustry);

  const industryBenchmarks = {
    financial: { avgSavings: 50, avgROI: 295, deployments: 450 },
    healthcare: { avgSavings: 61, avgROI: 385, deployments: 320 },
    manufacturing: { avgSavings: 48, avgROI: 310, deployments: 280 },
    technology: { avgSavings: 42, avgROI: 245, deployments: 520 },
    education: { avgSavings: 65, avgROI: 360, deployments: 210 },
    government: { avgSavings: 47, avgROI: 275, deployments: 180 },
    retail: { avgSavings: 53, avgROI: 325, deployments: 240 },
    msp: { avgSavings: 58, avgROI: 340, deployments: 380 }
  };

  const currentBenchmark = industryBenchmarks[industry];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="section-header">Customer Benchmarks & Proof Points</h1>
        <p className="section-subheader">
          Real customer results and industry comparisons
        </p>
      </div>

      {calculations && currentBenchmark && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-gradient-to-br from-nerdio-teal-500 to-nerdio-teal-600 text-white">
            <div className="text-sm opacity-90 mb-2">Your Projected Savings</div>
            <div className="text-4xl font-bold mb-2">{calculations.savings.percentage.toFixed(0)}%</div>
            <div className="text-sm opacity-90">vs {currentBenchmark.avgSavings}% industry avg</div>
          </div>

          <div className="card bg-gradient-to-br from-nerdio-yellow-400 to-nerdio-yellow-500 text-nerdio-gray-900">
            <div className="text-sm font-medium mb-2">Industry Benchmark</div>
            <div className="text-4xl font-bold mb-2">{currentBenchmark.avgSavings}%</div>
            <div className="text-sm">Typical savings</div>
          </div>

          <div className="card bg-gradient-to-br from-white to-nerdio-teal-50 border-nerdio-teal-200">
            <div className="text-sm font-medium text-nerdio-gray-700 mb-2">Deployments</div>
            <div className="text-4xl font-bold text-nerdio-teal-600 mb-2">{currentBenchmark.deployments}+</div>
            <div className="text-sm text-nerdio-gray-600">In your industry</div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-nerdio-teal-600" />
            <h2 className="text-xl font-bold text-nerdio-gray-900">Customer Case Studies</h2>
          </div>
          <select
            value={filterIndustry}
            onChange={(e) => setFilterIndustry(e.target.value)}
            className="px-4 py-2 border border-nerdio-gray-300 rounded-lg focus:ring-2 focus:ring-nerdio-teal-500"
          >
            <option value="all">All Industries</option>
            <option value="financial">Financial Services</option>
            <option value="healthcare">Healthcare</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="technology">Technology</option>
            <option value="education">Education</option>
            <option value="government">Government</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCases.map((customer, index) => (
            <div key={index} className="p-6 bg-nerdio-gray-50 rounded-xl border border-nerdio-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-nerdio-gray-900 mb-1">{customer.name}</h3>
                  <p className="text-sm text-nerdio-gray-600">{customer.users.toLocaleString()} users</p>
                </div>
                <span className="badge badge-teal">{customer.scenario}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-xs text-nerdio-gray-600 mb-1">Savings</div>
                  <div className="text-xl font-bold text-nerdio-teal-600">{customer.savings}%</div>
                </div>
                <div>
                  <div className="text-xs text-nerdio-gray-600 mb-1">Timeline</div>
                  <div className="text-xl font-bold text-nerdio-teal-600">{customer.timeframe}</div>
                </div>
                <div>
                  <div className="text-xs text-nerdio-gray-600 mb-1">ROI</div>
                  <div className="text-xl font-bold text-nerdio-teal-600">{customer.roi}%</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-nerdio-teal-600">
                <CheckCircle className="w-4 h-4" />
                <span>Validated by Nerdio</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
