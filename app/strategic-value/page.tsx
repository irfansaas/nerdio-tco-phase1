'use client';

import React from 'react';
import { useTCO } from '@/contexts/TCOContext';
import { Target, Zap, Shield, Sparkles, TrendingUp } from 'lucide-react';

export default function StrategicValuePage() {
  const { calculations } = useTCO();

  const strategicBenefits = [
    {
      category: 'Business Agility',
      icon: Zap,
      color: 'nerdio-yellow-500',
      value: 85,
      benefits: [
        { name: 'Rapid Scaling', score: 90, desc: 'Scale up/down in minutes vs weeks' },
        { name: 'Market Responsiveness', score: 85, desc: 'Faster response to business needs' },
        { name: 'Workforce Flexibility', score: 80, desc: 'Support remote/hybrid work instantly' }
      ]
    },
    {
      category: 'Risk Mitigation',
      icon: Shield,
      color: 'nerdio-teal-500',
      value: 78,
      benefits: [
        { name: 'Disaster Recovery', score: 95, desc: 'Built-in DR and business continuity' },
        { name: 'Security Posture', score: 85, desc: 'Azure security and compliance' },
        { name: 'Vendor Lock-in', score: 55, desc: 'Reduced dependency on legacy vendors' }
      ]
    },
    {
      category: 'Innovation Capacity',
      icon: Sparkles,
      color: 'nerdio-yellow-500',
      value: 72,
      benefits: [
        { name: 'AI Integration', score: 80, desc: 'Easy access to Azure AI services' },
        { name: 'DevOps Enablement', score: 75, desc: 'Modern development practices' },
        { name: 'Time to Market', score: 60, desc: 'Faster feature deployment' }
      ]
    },
    {
      category: 'User Experience',
      icon: Target,
      color: 'nerdio-teal-500',
      value: 88,
      benefits: [
        { name: 'Performance', score: 90, desc: 'Consistent, high-quality experience' },
        { name: 'Accessibility', score: 95, desc: 'Work from anywhere, any device' },
        { name: 'Productivity', score: 80, desc: 'Reduced downtime and IT friction' }
      ]
    }
  ];

  const overallScore = strategicBenefits.reduce((sum, b) => sum + b.value, 0) / strategicBenefits.length;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="section-header">Strategic Value Dashboard</h1>
        <p className="section-subheader">
          Beyond cost savings: Quantifying business agility, risk reduction, and innovation
        </p>
      </div>

      <div className="card bg-gradient-to-br from-nerdio-teal-500 to-nerdio-teal-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm opacity-90 mb-2">Overall Strategic Value Score</div>
            <div className="text-5xl font-bold mb-2">{overallScore.toFixed(0)}/100</div>
            <div className="text-sm opacity-90">Comprehensive business impact assessment</div>
          </div>
          <TrendingUp className="w-24 h-24 opacity-20" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {strategicBenefits.map((category, index) => {
          const Icon = category.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-${category.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-nerdio-gray-900">{category.category}</h3>
                  <div className="text-2xl font-bold text-nerdio-teal-600">{category.value}/100</div>
                </div>
              </div>

              <div className="space-y-3">
                {category.benefits.map((benefit, bIndex) => (
                  <div key={bIndex}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-nerdio-gray-700">{benefit.name}</span>
                      <span className="text-sm font-bold text-nerdio-teal-600">{benefit.score}</span>
                    </div>
                    <div className="w-full bg-nerdio-gray-200 rounded-full h-2">
                      <div 
                        className="bg-nerdio-teal-500 h-2 rounded-full transition-all"
                        style={{ width: `${benefit.score}%` }}
                      />
                    </div>
                    <div className="text-xs text-nerdio-gray-600 mt-1">{benefit.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {calculations && (
        <div className="card bg-gradient-to-br from-nerdio-yellow-50 to-white border-nerdio-yellow-200">
          <h2 className="text-xl font-bold text-nerdio-gray-900 mb-4">Combined Value Proposition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-nerdio-gray-600 mb-2">Hard Cost Savings (3 years)</div>
              <div className="text-3xl font-bold text-nerdio-teal-600 mb-1">
                ${(calculations.savings.total / 1000000).toFixed(2)}M
              </div>
              <div className="text-sm text-nerdio-gray-600">Quantified financial impact</div>
            </div>
            <div>
              <div className="text-sm text-nerdio-gray-600 mb-2">Strategic Value Score</div>
              <div className="text-3xl font-bold text-nerdio-yellow-600 mb-1">
                {overallScore.toFixed(0)}/100
              </div>
              <div className="text-sm text-nerdio-gray-600">Business transformation impact</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
