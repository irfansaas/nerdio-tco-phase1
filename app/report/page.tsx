'use client';

import React, { useRef } from 'react';
import { useTCO } from '@/contexts/TCOContext';
import { FileText, Download, Printer, AlertCircle } from 'lucide-react';

export default function ReportPage() {
  const { scenario, industry, namedUsers, calculations } = useTCO();
  const reportRef = useRef<HTMLDivElement>(null);

  if (!calculations) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="card text-center py-12">
          <AlertCircle className="w-12 h-12 text-nerdio-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-nerdio-gray-900 mb-2">No Data Available</h2>
          <p className="text-nerdio-gray-600">Please configure the calculator first to generate a report.</p>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const scenarioLabels = {
    onprem: 'On-Premises → Azure Virtual Desktop',
    citrix: 'Citrix/VMware → Azure Virtual Desktop',
    native: 'Native AVD → AVD + Nerdio'
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Header & Actions */}
      <div className="no-print flex items-center justify-between">
        <div>
          <h1 className="section-header">TCO Analysis Report</h1>
          <p className="section-subheader">Comprehensive analysis and recommendations</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handlePrint} className="btn-outline inline-flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Print Report
          </button>
          <button onClick={handlePrint} className="btn-primary inline-flex items-center gap-2">
            <Download className="w-4 h-4" />
            Save as PDF
          </button>
        </div>
      </div>

      {/* Report Content */}
      <div ref={reportRef} className="card print-full-width space-y-8">
        {/* Executive Summary */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-nerdio-teal-600" />
            <h2 className="text-2xl font-bold text-nerdio-gray-900">Executive Summary</h2>
          </div>
          
          <div className="bg-nerdio-teal-50 p-6 rounded-xl border border-nerdio-teal-200 mb-6">
            <h3 className="text-lg font-bold text-nerdio-teal-900 mb-3">Key Findings</h3>
            <div className="space-y-2 text-nerdio-teal-800">
              <p>• Migration of {namedUsers.toLocaleString()} users from {scenarioLabels[scenario]}</p>
              <p>• Projected 3-year savings: <strong>${(calculations.savings.total / 1000000).toFixed(2)}M</strong> ({calculations.savings.percentage.toFixed(1)}% reduction)</p>
              <p>• Break-even point: <strong>{calculations.migration.breakEvenMonths.toFixed(1)} months</strong></p>
              <p>• Return on investment: <strong>{calculations.migration.roi.toFixed(0)}%</strong> over 3 years</p>
            </div>
          </div>
        </div>

        {/* Cost Comparison */}
        <div>
          <h2 className="text-xl font-bold text-nerdio-gray-900 mb-4">Cost Comparison</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-sm font-medium text-red-700 mb-3">Current State (3 Years)</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-red-900">Infrastructure:</span>
                  <span className="font-semibold text-red-900">${(calculations.current.infrastructure / 1000000).toFixed(2)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-red-900">Licensing:</span>
                  <span className="font-semibold text-red-900">${(calculations.current.licensing / 1000000).toFixed(2)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-red-900">Personnel:</span>
                  <span className="font-semibold text-red-900">${(calculations.current.personnel / 1000000).toFixed(2)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-red-900">Support:</span>
                  <span className="font-semibold text-red-900">${(calculations.current.support / 1000000).toFixed(2)}M</span>
                </div>
                <div className="border-t border-red-300 pt-2 mt-2 flex justify-between">
                  <span className="font-bold text-red-900">Total:</span>
                  <span className="font-bold text-red-900">${(calculations.current.total / 1000000).toFixed(2)}M</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-sm font-medium text-green-700 mb-3">Future State with Nerdio (3 Years)</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-green-900">Infrastructure:</span>
                  <span className="font-semibold text-green-900">${(calculations.future.infrastructure / 1000000).toFixed(2)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-900">Licensing:</span>
                  <span className="font-semibold text-green-900">${(calculations.future.licensing / 1000000).toFixed(2)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-900">Personnel:</span>
                  <span className="font-semibold text-green-900">${(calculations.future.personnel / 1000000).toFixed(2)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-900">Support:</span>
                  <span className="font-semibold text-green-900">${(calculations.future.support / 1000000).toFixed(2)}M</span>
                </div>
                <div className="border-t border-green-300 pt-2 mt-2 flex justify-between">
                  <span className="font-bold text-green-900">Total:</span>
                  <span className="font-bold text-green-900">${(calculations.future.total / 1000000).toFixed(2)}M</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h2 className="text-xl font-bold text-nerdio-gray-900 mb-4">Recommendations</h2>
          <div className="space-y-3">
            <div className="bg-nerdio-teal-50 p-4 rounded-lg border border-nerdio-teal-200">
              <h3 className="font-bold text-nerdio-teal-900 mb-2">✓ Proceed with Migration</h3>
              <p className="text-sm text-nerdio-teal-800">
                The financial analysis strongly supports migrating to Azure Virtual Desktop with Nerdio Manager. 
                The break-even point of {calculations.migration.breakEvenMonths.toFixed(1)} months and {calculations.migration.roi.toFixed(0)}% ROI 
                demonstrate compelling business value.
              </p>
            </div>
            <div className="bg-nerdio-yellow-50 p-4 rounded-lg border border-nerdio-yellow-200">
              <h3 className="font-bold text-nerdio-yellow-900 mb-2">→ Next Steps</h3>
              <p className="text-sm text-nerdio-yellow-800">
                1. Conduct detailed discovery assessment<br/>
                2. Plan pilot deployment with 50-100 users<br/>
                3. Develop phased migration roadmap<br/>
                4. Engage Nerdio Professional Services
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-nerdio-gray-200 pt-6 text-center text-sm text-nerdio-gray-600">
          <p>Generated by Nerdio TCO Calculator | {new Date().toLocaleDateString()}</p>
          <p className="mt-1">For more information, visit <a href="https://getnerdio.com" className="text-nerdio-teal-600 hover:underline">getnerdio.com</a></p>
        </div>
      </div>
    </div>
  );
}
