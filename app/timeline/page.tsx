'use client';

import React from 'react';
import { useTCO } from '@/contexts/TCOContext';
import { Calendar, TrendingUp, CheckCircle, Clock, DollarSign, Zap, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function TimelinePage() {
  const { migrationSpeed, setMigrationSpeed, namedUsers, scenario, calculations } = useTCO();

  const getTimelineData = () => {
    const timelines = {
      fast: {
        label: 'Fast Track',
        duration: '2-3 months',
        phases: [
          { name: 'Discovery & Assessment', weeks: 2, color: 'nerdio-teal-500', tasks: ['Environment audit', 'User profiling', 'App inventory', 'Network assessment'] },
          { name: 'Design & Planning', weeks: 2, color: 'nerdio-yellow-500', tasks: ['Architecture design', 'Migration plan', 'Pilot selection', 'Training materials'] },
          { name: 'Pilot Deployment', weeks: 2, color: 'nerdio-teal-500', tasks: ['Pilot setup', '50-100 users', 'Issue resolution', 'Feedback'] },
          { name: 'Production Migration', weeks: 4, color: 'nerdio-yellow-500', tasks: ['Batch migrations', 'User onboarding', 'Support', 'Performance tuning'] },
          { name: 'Optimization', weeks: 2, color: 'nerdio-teal-500', tasks: ['Auto-scaling', 'Cost optimization', 'Documentation', 'Handoff'] }
        ],
      },
      standard: {
        label: 'Standard',
        duration: '4-6 months',
        phases: [
          { name: 'Discovery & Assessment', weeks: 3, color: 'nerdio-teal-500', tasks: ['Environment analysis', 'User behavior study', 'App testing', 'Dependency mapping'] },
          { name: 'Design & Planning', weeks: 3, color: 'nerdio-yellow-500', tasks: ['Comprehensive design', 'Migration plan', 'Risk mitigation', 'Training program'] },
          { name: 'Pilot Deployment', weeks: 3, color: 'nerdio-teal-500', tasks: ['Pilot environment', '100-200 users', 'Testing', 'Refinement'] },
          { name: 'Production Migration', weeks: 8, color: 'nerdio-yellow-500', tasks: ['Department rollout', 'Continuous support', 'Monitoring', 'Resolution'] },
          { name: 'Optimization', weeks: 4, color: 'nerdio-teal-500', tasks: ['Advanced scaling', 'Cost analysis', 'Survey', 'Documentation'] }
        ],
      },
      phased: {
        label: 'Phased',
        duration: '6-12 months',
        phases: [
          { name: 'Discovery & Assessment', weeks: 4, color: 'nerdio-teal-500', tasks: ['Comprehensive audit', 'User analysis', 'Compatibility testing', 'Impact analysis'] },
          { name: 'Design & Planning', weeks: 6, color: 'nerdio-yellow-500', tasks: ['Multi-phase design', 'Migration waves', 'Change management', 'Training development'] },
          { name: 'Pilot Deployment', weeks: 6, color: 'nerdio-teal-500', tasks: ['Extended pilot', '200-500 users', 'Feedback loops', 'Refinement'] },
          { name: 'Production Migration', weeks: 16, color: 'nerdio-yellow-500', tasks: ['Gradual migration', 'Business unit by unit', 'Minimal disruption', 'Optimization'] },
          { name: 'Final Optimization', weeks: 8, color: 'nerdio-teal-500', tasks: ['Full optimization', 'Advanced features', 'Support setup', 'CoE establishment'] }
        ],
      }
    };
    return timelines[migrationSpeed];
  };

  const timeline = getTimelineData();
  
  // Calculate cumulative weeks for positioning
  let cumulativeWeeks = 0;
  const phasesWithPosition = timeline.phases.map(phase => {
    const start = cumulativeWeeks;
    cumulativeWeeks += phase.weeks;
    return { ...phase, start, end: cumulativeWeeks };
  });

  const totalWeeks = cumulativeWeeks;

  // Generate ROI chart data
  const generateChartData = () => {
    if (!calculations) return [];
    
    const data = [];
    const monthlySavings = calculations.savings.yearly / 12;
    const migrationCost = calculations.migration.cost;

    for (let month = 0; month <= 36; month++) {
      const cumulativeSavings = (monthlySavings * month) - migrationCost;
      data.push({
        month,
        savings: Math.round(cumulativeSavings),
        breakEven: month === Math.ceil(calculations.migration.breakEvenMonths)
      });
    }
    return data;
  };

  const chartData = generateChartData();

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="section-header">Migration Timeline & ROI</h1>
        <p className="section-subheader">
          Visualize your migration journey and financial impact over time
        </p>
      </div>

      {/* Key Metrics */}
      {calculations && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card bg-gradient-to-br from-nerdio-teal-500 to-nerdio-teal-600 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">Break-Even</span>
            </div>
            <div className="text-3xl font-bold mb-1">
              {calculations.migration.breakEvenMonths.toFixed(1)}mo
            </div>
            <div className="text-sm opacity-90">
              Time to recoup investment
            </div>
          </div>

          <div className="card bg-gradient-to-br from-nerdio-yellow-400 to-nerdio-yellow-500 text-nerdio-gray-900">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">3-Year Savings</span>
            </div>
            <div className="text-3xl font-bold mb-1">
              ${(calculations.savings.total / 1000000).toFixed(2)}M
            </div>
            <div className="text-sm">
              Total cost reduction
            </div>
          </div>

          <div className="card bg-gradient-to-br from-white to-nerdio-teal-50 border-nerdio-teal-200">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-nerdio-teal-600" />
              <span className="text-sm font-medium text-nerdio-gray-700">Migration Cost</span>
            </div>
            <div className="text-3xl font-bold text-nerdio-teal-600 mb-1">
              ${(calculations.migration.cost / 1000000).toFixed(2)}M
            </div>
            <div className="text-sm text-nerdio-gray-600">
              One-time investment
            </div>
          </div>

          <div className="card bg-gradient-to-br from-white to-nerdio-yellow-50 border-nerdio-yellow-200">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-nerdio-yellow-600" />
              <span className="text-sm font-medium text-nerdio-gray-700">ROI</span>
            </div>
            <div className="text-3xl font-bold text-nerdio-yellow-600 mb-1">
              {calculations.migration.roi.toFixed(0)}%
            </div>
            <div className="text-sm text-nerdio-gray-600">
              3-year return
            </div>
          </div>
        </div>
      )}

      {/* Migration Speed Selector */}
      <div className="card">
        <h2 className="text-xl font-bold text-nerdio-gray-900 mb-4">Select Migration Speed</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'fast', label: 'Fast Track', duration: '2-3 months', desc: 'Aggressive timeline, dedicated resources' },
            { id: 'standard', label: 'Standard', duration: '4-6 months', desc: 'Balanced approach, proven methodology' },
            { id: 'phased', label: 'Phased', duration: '6-12 months', desc: 'Gradual rollout, minimal disruption' }
          ].map(option => (
            <button
              key={option.id}
              onClick={() => setMigrationSpeed(option.id as any)}
              className={`p-6 rounded-xl border-2 transition-all text-left group ${
                migrationSpeed === option.id
                  ? 'border-nerdio-teal-500 bg-nerdio-teal-50 shadow-lg'
                  : 'border-nerdio-gray-200 hover:border-nerdio-teal-300 bg-white'
              }`}
            >
              <div className={`text-lg font-bold mb-1 ${
                migrationSpeed === option.id ? 'text-nerdio-teal-700' : 'text-nerdio-gray-900'
              }`}>
                {option.label}
              </div>
              <div className="text-nerdio-teal-600 font-semibold text-sm mb-2">{option.duration}</div>
              <div className="text-sm text-nerdio-gray-600">{option.desc}</div>
              {migrationSpeed === option.id && (
                <div className="mt-3 flex items-center gap-2 text-nerdio-teal-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs font-medium">Current Selection</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-nerdio-teal-600" />
          <h2 className="text-xl font-bold text-nerdio-gray-900">Migration Phases</h2>
          <span className="ml-auto text-sm text-nerdio-gray-600">{timeline.duration}</span>
        </div>

        {/* Timeline visualization */}
        <div className="space-y-6">
          {phasesWithPosition.map((phase, index) => (
            <div key={index} className="relative">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-${phase.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-nerdio-gray-900">{phase.name}</h3>
                    <span className="text-sm font-medium text-nerdio-gray-600">{phase.weeks} weeks</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mb-3 bg-nerdio-gray-100 rounded-full h-2">
                    <div 
                      className={`bg-${phase.color} h-2 rounded-full`}
                      style={{ width: `${(phase.weeks / totalWeeks) * 100}%` }}
                    />
                  </div>

                  {/* Tasks */}
                  <div className="grid grid-cols-2 gap-2">
                    {phase.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-center gap-2 text-sm text-nerdio-gray-600">
                        <CheckCircle className="w-4 h-4 text-nerdio-teal-500 flex-shrink-0" />
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {index < phasesWithPosition.length - 1 && (
                <div className="ml-6 mt-2 mb-2 border-l-2 border-dashed border-nerdio-gray-300 h-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ROI Visualization */}
      {calculations && chartData.length > 0 && (
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-nerdio-teal-600" />
            <h2 className="text-xl font-bold text-nerdio-gray-900">Cumulative Savings Over Time</h2>
          </div>

          <div className="mb-6 bg-nerdio-teal-50 p-4 rounded-lg border border-nerdio-teal-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-nerdio-teal-700 font-medium mb-1">Break-Even Point</div>
                <div className="text-2xl font-bold text-nerdio-teal-600">
                  Month {Math.ceil(calculations.migration.breakEvenMonths)}
                </div>
              </div>
              <ArrowRight className="w-8 h-8 text-nerdio-teal-400" />
              <div>
                <div className="text-sm text-nerdio-teal-700 font-medium mb-1">36-Month Savings</div>
                <div className="text-2xl font-bold text-nerdio-teal-600">
                  ${(calculations.savings.total / 1000000).toFixed(2)}M
                </div>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
                stroke="#6b7280"
              />
              <YAxis 
                label={{ value: 'Cumulative Savings ($)', angle: -90, position: 'insideLeft' }}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                stroke="#6b7280"
              />
              <Tooltip 
                formatter={(value: any) => [`$${(value / 1000000).toFixed(2)}M`, 'Savings']}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #20B2AA',
                  borderRadius: '8px',
                  padding: '12px'
                }}
              />
              <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="3 3" />
              <ReferenceLine 
                x={Math.ceil(calculations.migration.breakEvenMonths)} 
                stroke="#B8E631" 
                strokeWidth={2}
                label={{ value: 'Break-Even', position: 'top', fill: '#84a622' }}
              />
              <Line 
                type="monotone" 
                dataKey="savings" 
                stroke="#20B2AA" 
                strokeWidth={3}
                dot={{ fill: '#20B2AA', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-nerdio-gray-50 rounded-lg">
              <div className="text-sm text-nerdio-gray-600 mb-1">Year 1 Savings</div>
              <div className="text-xl font-bold text-nerdio-teal-600">
                ${((calculations.savings.yearly - calculations.migration.cost) / 1000000).toFixed(2)}M
              </div>
            </div>
            <div className="p-4 bg-nerdio-gray-50 rounded-lg">
              <div className="text-sm text-nerdio-gray-600 mb-1">Year 2 Savings</div>
              <div className="text-xl font-bold text-nerdio-teal-600">
                ${(calculations.savings.yearly / 1000000).toFixed(2)}M
              </div>
            </div>
            <div className="p-4 bg-nerdio-gray-50 rounded-lg">
              <div className="text-sm text-nerdio-gray-600 mb-1">Year 3 Savings</div>
              <div className="text-xl font-bold text-nerdio-teal-600">
                ${(calculations.savings.yearly / 1000000).toFixed(2)}M
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
