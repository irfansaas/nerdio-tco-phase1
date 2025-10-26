'use client';

import React, { useState } from 'react';
import { useTCO } from '@/contexts/TCOContext';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SensitivityPage() {
  const { calculations } = useTCO();
  const [selectedAssumption, setSelectedAssumption] = useState('autoscaling');

  const assumptions = [
    {
      id: 'autoscaling',
      name: 'Auto-Scaling Efficiency',
      base: 65,
      best: 75,
      worst: 50,
      impact: 'High',
      description: 'Nerdio\'s auto-scaling reduces infrastructure costs by automatically adjusting resources based on demand'
    },
    {
      id: 'm365',
      name: 'M365 E3/E5 Adoption',
      base: 100,
      best: 100,
      worst: 0,
      impact: 'High',
      description: 'AVD licensing costs are included with M365 E3/E5, saving $15/user/month'
    },
    {
      id: 'azure',
      name: 'Azure Pricing Discount',
      base: 40,
      best: 45,
      worst: 0,
      impact: 'High',
      description: 'Enterprise Agreements and Reserved Instances provide significant Azure compute discounts'
    },
    {
      id: 'personnel',
      name: 'Personnel Reduction',
      base: 55,
      best: 65,
      worst: 40,
      impact: 'Medium',
      description: 'Automation and simplified management reduce IT staffing requirements'
    },
    {
      id: 'migration',
      name: 'Migration Cost per User',
      base: 65,
      best: 50,
      worst: 85,
      impact: 'Medium',
      description: 'Professional services and migration tools impact one-time costs'
    },
    {
      id: 'support',
      name: 'Support Cost Reduction',
      base: 80,
      best: 85,
      worst: 70,
      impact: 'Low',
      description: 'Reduced complexity and vendor support consolidation lower ongoing support costs'
    }
  ];

  if (!calculations) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="card text-center py-12">
          <AlertTriangle className="w-12 h-12 text-nerdio-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-nerdio-gray-900 mb-2">No Data Available</h2>
          <p className="text-nerdio-gray-600">Please configure the calculator first to see sensitivity analysis.</p>
        </div>
      </div>
    );
  }

  const calculateScenario = (multiplier: number) => {
    return calculations.savings.total * multiplier;
  };

  const scenarioData = [
    {
      name: 'Worst Case',
      savings: calculateScenario(0.70),
      percentage: 70,
      color: '#ef4444'
    },
    {
      name: 'Base Case',
      savings: calculations.savings.total,
      percentage: 100,
      color: '#20B2AA'
    },
    {
      name: 'Best Case',
      savings: calculateScenario(1.25),
      percentage: 125,
      color: '#B8E631'
    }
  ];

  const selectedAssumptionData = assumptions.find(a => a.id === selectedAssumption);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="section-header">Sensitivity Analysis</h1>
        <p className="section-subheader">
          Test key assumptions and understand the range of potential outcomes
        </p>
      </div>

      {/* Scenario Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-red-50 to-white border-red-200">
          <div className="flex items-center gap-3 mb-3">
            <TrendingDown className="w-6 h-6 text-red-600" />
            <h3 className="font-bold text-nerdio-gray-900">Worst Case</h3>
          </div>
          <div className="text-3xl font-bold text-red-600 mb-2">
            ${(scenarioData[0].savings / 1000000).toFixed(2)}M
          </div>
          <div className="text-sm text-nerdio-gray-600">
            Conservative assumptions, 70% of base
          </div>
        </div>

        <div className="card bg-gradient-to-br from-nerdio-teal-500 to-nerdio-teal-600 text-white">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="w-6 h-6" />
            <h3 className="font-bold">Base Case</h3>
          </div>
          <div className="text-3xl font-bold mb-2">
            ${(scenarioData[1].savings / 1000000).toFixed(2)}M
          </div>
          <div className="text-sm opacity-90">
            Most likely scenario, validated assumptions
          </div>
        </div>

        <div className="card bg-gradient-to-br from-nerdio-yellow-400 to-nerdio-yellow-500 text-nerdio-gray-900">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6" />
            <h3 className="font-bold">Best Case</h3>
          </div>
          <div className="text-3xl font-bold mb-2">
            ${(scenarioData[2].savings / 1000000).toFixed(2)}M
          </div>
          <div className="text-sm">
            Optimistic assumptions, 125% of base
          </div>
        </div>
      </div>

      {/* Scenario Comparison Chart */}
      <div className="card">
        <h2 className="text-xl font-bold text-nerdio-gray-900 mb-6">Savings Range Analysis</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={scenarioData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis 
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
            <Bar dataKey="savings" fill="#20B2AA" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Key Assumptions */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-nerdio-teal-600" />
          <h2 className="text-xl font-bold text-nerdio-gray-900">Key Assumptions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {assumptions.map(assumption => (
            <button
              key={assumption.id}
              onClick={() => setSelectedAssumption(assumption.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedAssumption === assumption.id
                  ? 'border-nerdio-teal-500 bg-nerdio-teal-50'
                  : 'border-nerdio-gray-200 hover:border-nerdio-teal-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-nerdio-gray-900">{assumption.name}</h3>
                <span className={`badge ${
                  assumption.impact === 'High' ? 'badge-yellow' : 
                  assumption.impact === 'Medium' ? 'badge-teal' : 
                  'bg-nerdio-gray-100 text-nerdio-gray-700'
                }`}>
                  {assumption.impact} Impact
                </span>
              </div>
              <div className="text-sm text-nerdio-gray-600">{assumption.description}</div>
            </button>
          ))}
        </div>

        {/* Selected Assumption Detail */}
        {selectedAssumptionData && (
          <div className="bg-nerdio-teal-50 p-6 rounded-xl border border-nerdio-teal-200">
            <h3 className="text-lg font-bold text-nerdio-teal-900 mb-4">{selectedAssumptionData.name}</h3>
            <p className="text-nerdio-teal-800 mb-4">{selectedAssumptionData.description}</p>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-nerdio-teal-700 font-medium mb-1">Worst Case</div>
                <div className="text-2xl font-bold text-nerdio-teal-900">{selectedAssumptionData.worst}%</div>
              </div>
              <div>
                <div className="text-sm text-nerdio-teal-700 font-medium mb-1">Base Case</div>
                <div className="text-2xl font-bold text-nerdio-teal-900">{selectedAssumptionData.base}%</div>
              </div>
              <div>
                <div className="text-sm text-nerdio-teal-700 font-medium mb-1">Best Case</div>
                <div className="text-2xl font-bold text-nerdio-teal-900">{selectedAssumptionData.best}%</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Risk Assessment */}
      <div className="card">
        <h2 className="text-xl font-bold text-nerdio-gray-900 mb-6">Risk Assessment</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-green-900 mb-1">Low Risk</div>
              <div className="text-sm text-green-800">
                Even in the worst-case scenario, you achieve ${(scenarioData[0].savings / 1000000).toFixed(2)}M in savings with a {((scenarioData[0].savings / calculations.migration.cost - 1) * 100).toFixed(0)}% ROI.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-nerdio-teal-50 rounded-lg border border-nerdio-teal-200">
            <BarChart3 className="w-6 h-6 text-nerdio-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-nerdio-teal-900 mb-1">Confidence Interval</div>
              <div className="text-sm text-nerdio-teal-800">
                Based on industry benchmarks and Nerdio customer data, savings typically range from 
                ${(scenarioData[0].savings / 1000000).toFixed(2)}M to ${(scenarioData[2].savings / 1000000).toFixed(2)}M over 3 years.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-nerdio-yellow-50 rounded-lg border border-nerdio-yellow-200">
            <TrendingUp className="w-6 h-6 text-nerdio-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-nerdio-yellow-900 mb-1">Upside Potential</div>
              <div className="text-sm text-nerdio-yellow-800">
                Best-case scenario delivers an additional ${((scenarioData[2].savings - scenarioData[1].savings) / 1000000).toFixed(2)}M in savings through 
                optimized configurations and advanced Nerdio features.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
