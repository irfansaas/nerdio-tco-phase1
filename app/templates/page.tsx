'use client';

import React from 'react';
import { useTCO } from '@/contexts/TCOContext';
import { Building2, Heart, Factory, Code, GraduationCap, Landmark, ShoppingCart, Server } from 'lucide-react';
import Link from 'next/link';

export default function TemplatesPage() {
  const { setScenario, setIndustry, setNamedUsers, setWorkloadMix, setCurrentCosts } = useTCO();

  const templates = [
    {
      industry: 'financial',
      name: 'Financial Services',
      icon: Building2,
      users: 8000,
      scenario: 'citrix',
      workload: { task: 25, knowledge: 55, power: 15, vip: 5 },
      costs: { infrastructure: 1200000, licensing: 1800000, personnel: 2000000, support: 500000 }
    },
    {
      industry: 'healthcare',
      name: 'Healthcare',
      icon: Heart,
      users: 6000,
      scenario: 'citrix',
      workload: { task: 35, knowledge: 50, power: 10, vip: 5 },
      costs: { infrastructure: 900000, licensing: 1400000, personnel: 1600000, support: 400000 }
    },
    {
      industry: 'manufacturing',
      name: 'Manufacturing',
      icon: Factory,
      users: 5000,
      scenario: 'onprem',
      workload: { task: 40, knowledge: 45, power: 10, vip: 5 },
      costs: { infrastructure: 850000, licensing: 1200000, personnel: 1500000, support: 350000 }
    },
    {
      industry: 'technology',
      name: 'Technology',
      icon: Code,
      users: 3000,
      scenario: 'native',
      workload: { task: 20, knowledge: 40, power: 35, vip: 5 },
      costs: { infrastructure: 500000, licensing: 800000, personnel: 900000, support: 200000 }
    },
    {
      industry: 'education',
      name: 'Education',
      icon: GraduationCap,
      users: 10000,
      scenario: 'onprem',
      workload: { task: 45, knowledge: 45, power: 5, vip: 5 },
      costs: { infrastructure: 1100000, licensing: 1500000, personnel: 1800000, support: 450000 }
    },
    {
      industry: 'government',
      name: 'Government',
      icon: Landmark,
      users: 7500,
      scenario: 'citrix',
      workload: { task: 35, knowledge: 50, power: 10, vip: 5 },
      costs: { infrastructure: 1000000, licensing: 1600000, personnel: 1700000, support: 450000 }
    },
    {
      industry: 'retail',
      name: 'Retail',
      icon: ShoppingCart,
      users: 4000,
      scenario: 'onprem',
      workload: { task: 50, knowledge: 40, power: 5, vip: 5 },
      costs: { infrastructure: 700000, licensing: 1000000, personnel: 1200000, support: 300000 }
    },
    {
      industry: 'msp',
      name: 'MSP / Service Provider',
      icon: Server,
      users: 15000,
      scenario: 'citrix',
      workload: { task: 30, knowledge: 50, power: 15, vip: 5 },
      costs: { infrastructure: 1500000, licensing: 2200000, personnel: 2500000, support: 600000 }
    }
  ];

  const applyTemplate = (template: any) => {
    setIndustry(template.industry);
    setScenario(template.scenario);
    setNamedUsers(template.users);
    setWorkloadMix(template.workload);
    setCurrentCosts(template.costs);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="section-header">Industry Templates</h1>
        <p className="section-subheader">
          Start with pre-configured scenarios based on industry best practices and validated customer data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template, index) => {
          const Icon = template.icon;
          return (
            <div key={index} className="card-interactive group">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-nerdio-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-nerdio-teal-600" />
                </div>
                <h3 className="font-bold text-nerdio-gray-900 mb-2">{template.name}</h3>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-nerdio-gray-600">Users:</span>
                  <span className="font-semibold text-nerdio-gray-900">{template.users.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-nerdio-gray-600">Scenario:</span>
                  <span className="font-semibold text-nerdio-gray-900">{template.scenario === 'citrix' ? 'Citrix→AVD' : template.scenario === 'onprem' ? 'OnPrem→AVD' : 'Native AVD'}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  applyTemplate(template);
                  window.location.href = '/calculator';
                }}
                className="w-full btn-primary text-sm"
              >
                Use This Template
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
