'use client';

import React, { useState } from 'react';
import { useTCO } from '@/contexts/TCOContext';
import {
  Target,
  Building2,
  Users,
  DollarSign,
  Settings,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  TrendingDown,
  Clock,
  CheckCircle2,
  Shield,
  HardDrive,
  Database,
  Activity,
  Wrench,
  Wifi,
  Sparkles
} from 'lucide-react';

export default function CalculatorPage() {
  const {
    scenario,
    setScenario,
    industry,
    setIndustry,
    namedUsers,
    setNamedUsers,
    mauPercentage,
    setMauPercentage,
    concurrentPercentage,
    setConcurrentPercentage,
    hasM365E3,
    setHasM365E3,
    azurePricing,
    setAzurePricing,
    azureHybridBenefit,
    setAzureHybridBenefit,
    includeHardwareRefresh,
    setIncludeHardwareRefresh,
    includeBackupDR,
    setIncludeBackupDR,
    includeMonitoring,
    setIncludeMonitoring,
    includeMaintenance,
    setIncludeMaintenance,
    includeBandwidth,
    setIncludeBandwidth,
    workloadMix,
    setWorkloadMix,
    currentCosts,
    setCurrentCosts,
    migrationSpeed,
    setMigrationSpeed,
    mau,
    ccu,
    calculations
  } = useTCO();

  const [expandedSections, setExpandedSections] = useState({
    scenario: true,
    org: true,
    workload: true,
    costs: true,
    azure: true,
    advanced: true, // PHASE 1 NEW
    migration: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const SectionHeader = ({ title, section, icon: Icon, badge }: any) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-nerdio-teal-50 hover:bg-nerdio-teal-100 rounded-lg transition-colors mb-4 group"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-nerdio-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-nerdio-gray-900">{title}</h3>
        {badge && (
          <span className="px-2 py-1 text-xs font-bold bg-nerdio-yellow-500 text-nerdio-gray-900 rounded-md">
            {badge}
          </span>
        )}
      </div>
      {expandedSections[section] ? (
        <ChevronDown className="w-5 h-5 text-nerdio-teal-600" />
      ) : (
        <ChevronRight className="w-5 h-5 text-nerdio-gray-400" />
      )}
    </button>
  );

  const handleWorkloadChange = (key: string, value: number) => {
    const others = Object.entries(workloadMix).filter(([k]) => k !== key);
    const othersSum = others.reduce((sum, [_, v]) => sum + v, 0);
    const remaining = 100 - value;
    
    if (othersSum === 0) return;
    
    const ratio = remaining / othersSum;
    const newMix = { ...workloadMix, [key]: value };
    
    others.forEach(([k, v]) => {
      newMix[k] = Math.round(v * ratio);
    });
    
    setWorkloadMix(newMix);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="section-header">TCO Calculator</h1>
        <p className="section-subheader">
          Configure your organization details and current costs to calculate your total cost of ownership
        </p>
      </div>

      {/* Summary Cards */}
      {calculations && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card bg-gradient-to-br from-nerdio-teal-500 to-nerdio-teal-600 text-white">
            <div className="flex items-center gap-3 mb-2">
              <TrendingDown className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">3-Year Savings</span>
            </div>
            <div className="text-3xl font-bold mb-1">
              ${(calculations.savings.total / 1000000).toFixed(2)}M
            </div>
            <div className="text-sm opacity-90">
              {calculations.savings.percentage.toFixed(1)}% reduction
            </div>
          </div>

          <div className="card bg-gradient-to-br from-nerdio-yellow-400 to-nerdio-yellow-500 text-nerdio-gray-900">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">Break-Even Point</span>
            </div>
            <div className="text-3xl font-bold mb-1">
              {calculations.migration.breakEvenMonths.toFixed(1)}mo
            </div>
            <div className="text-sm">
              ROI: {calculations.migration.roi.toFixed(0)}%
            </div>
          </div>

          <div className="card bg-gradient-to-br from-white to-nerdio-teal-50 border-nerdio-teal-200">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-nerdio-teal-600" />
              <span className="text-sm font-medium text-nerdio-gray-700">Concurrent Users</span>
            </div>
            <div className="text-3xl font-bold text-nerdio-teal-600 mb-1">
              {ccu.toLocaleString()}
            </div>
            <div className="text-sm text-nerdio-gray-600">
              {mau.toLocaleString()} monthly active
            </div>
          </div>
        </div>
      )}

      {/* Configuration Form */}
      <div className="card">
        {/* Scenario Selection */}
        <SectionHeader title="Scenario Selection" section="scenario" icon={Target} />
        {expandedSections.scenario && (
          <div className="mb-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'onprem', label: 'On-Premises → AVD', desc: 'Migrate from physical datacenter' },
                { id: 'citrix', label: 'Citrix/VMware → AVD', desc: 'Replace Citrix Cloud/OnPrem' },
                { id: 'native', label: 'Native AVD → AVD + Nerdio', desc: 'Optimize existing AVD' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setScenario(item.id as any)}
                  className={`p-4 rounded-lg border-2 transition-all text-left group ${
                    scenario === item.id
                      ? 'border-nerdio-teal-500 bg-nerdio-teal-50 shadow-md'
                      : 'border-nerdio-gray-200 hover:border-nerdio-teal-300 bg-white'
                  }`}
                >
                  <div className={`font-semibold mb-1 ${scenario === item.id ? 'text-nerdio-teal-700' : 'text-nerdio-gray-800'}`}>
                    {item.label}
                  </div>
                  <div className="text-sm text-nerdio-gray-600">{item.desc}</div>
                  {scenario === item.id && (
                    <div className="mt-2 flex items-center gap-2 text-nerdio-teal-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-xs font-medium">Selected</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="bg-nerdio-gray-50 p-4 rounded-lg">
              <label className="input-label">Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value as any)}
                className="input"
              >
                <option value="financial">Financial Services</option>
                <option value="healthcare">Healthcare</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="technology">Technology</option>
                <option value="education">Education</option>
                <option value="government">Government</option>
                <option value="retail">Retail</option>
                <option value="msp">Managed Service Provider</option>
              </select>
            </div>
          </div>
        )}

        {/* Organization Size */}
        <SectionHeader title="Organization Size & Usage" section="org" icon={Building2} />
        {expandedSections.org && (
          <div className="mb-8 space-y-6">
            <div>
              <label className="input-label">
                Total Named Users
                <span className="text-nerdio-gray-500 font-normal ml-2">(All employees with access)</span>
              </label>
              <input
                type="number"
                value={namedUsers}
                onChange={(e) => setNamedUsers(Number(e.target.value))}
                className="input"
                step="100"
                min="100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="input-label">
                  Monthly Active Users %
                  <span className="text-nerdio-gray-500 font-normal ml-2">(Typical: 45-60%)</span>
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={mauPercentage}
                    onChange={(e) => setMauPercentage(Number(e.target.value))}
                    className="flex-1 h-2 bg-nerdio-gray-200 rounded-lg appearance-none cursor-pointer accent-nerdio-teal-500"
                  />
                  <div className="text-2xl font-bold text-nerdio-teal-600 w-16 text-right">
                    {mauPercentage}%
                  </div>
                </div>
                <div className="text-sm text-nerdio-gray-600 mt-2">
                  {mau.toLocaleString()} MAU
                </div>
              </div>

              <div>
                <label className="input-label">
                  Peak Concurrent %
                  <span className="text-nerdio-gray-500 font-normal ml-2">(Typical: 30-40%)</span>
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={concurrentPercentage}
                    onChange={(e) => setConcurrentPercentage(Number(e.target.value))}
                    className="flex-1 h-2 bg-nerdio-gray-200 rounded-lg appearance-none cursor-pointer accent-nerdio-teal-500"
                  />
                  <div className="text-2xl font-bold text-nerdio-teal-600 w-16 text-right">
                    {concurrentPercentage}%
                  </div>
                </div>
                <div className="text-sm text-nerdio-gray-600 mt-2">
                  {ccu.toLocaleString()} CCU
                </div>
              </div>
            </div>

            <div className="bg-nerdio-teal-50 p-4 rounded-lg border border-nerdio-teal-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-nerdio-teal-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-nerdio-teal-900 mb-1">User Calculation Method</div>
                  <div className="text-sm text-nerdio-teal-700">
                    Infrastructure sizing is based on Concurrent Users (CCU), while licensing costs use Named Users. This ensures accurate cost modeling.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workload Mix */}
        <SectionHeader title="Workload Distribution" section="workload" icon={Users} />
        {expandedSections.workload && (
          <div className="mb-8 space-y-4">
            {[
              { key: 'task', label: 'Task Workers', desc: 'Basic apps, email, web browsing', specs: '2 vCPU, 4GB RAM' },
              { key: 'knowledge', label: 'Knowledge Workers', desc: 'Office suite, CRM, standard apps', specs: '2 vCPU, 8GB RAM' },
              { key: 'power', label: 'Power Users', desc: 'CAD, development, heavy compute', specs: '4 vCPU, 16GB RAM' },
              { key: 'vip', label: 'VIP/Executive', desc: 'Premium performance, dedicated resources', specs: '8 vCPU, 32GB RAM' }
            ].map(item => (
              <div key={item.key} className="bg-nerdio-gray-50 p-4 rounded-lg border border-nerdio-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-nerdio-gray-800">{item.label}</div>
                    <div className="text-sm text-nerdio-gray-600">{item.desc}</div>
                    <div className="text-xs text-nerdio-gray-500 mt-1">{item.specs}</div>
                  </div>
                  <div className="text-2xl font-bold text-nerdio-teal-600 w-20 text-right">
                    {workloadMix[item.key]}%
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={workloadMix[item.key]}
                  onChange={(e) => handleWorkloadChange(item.key, Number(e.target.value))}
                  className="w-full h-2 bg-nerdio-gray-200 rounded-lg appearance-none cursor-pointer accent-nerdio-teal-500"
                />
              </div>
            ))}
            <div className="bg-nerdio-yellow-50 p-4 rounded-lg border border-nerdio-yellow-200">
              <div className="text-sm text-nerdio-yellow-800">
                <strong>Total:</strong> {Object.values(workloadMix).reduce((a, b) => a + b, 0)}% 
                {Object.values(workloadMix).reduce((a, b) => a + b, 0) !== 100 && (
                  <span className="ml-2 text-nerdio-yellow-600">(Must equal 100%)</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Current Costs */}
        <SectionHeader title="Current Annual Costs" section="costs" icon={DollarSign} />
        {expandedSections.costs && (
          <div className="mb-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: 'infrastructure', label: 'Infrastructure', desc: 'Servers, storage, networking, datacenter' },
                { key: 'licensing', label: 'Licensing', desc: 'Software licenses, support, maintenance' },
                { key: 'personnel', label: 'Personnel', desc: 'IT staff costs for VDI management' },
                { key: 'support', label: 'Support & Other', desc: 'Vendor support, consulting, misc costs' }
              ].map(item => (
                <div key={item.key}>
                  <label className="input-label">{item.label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-nerdio-gray-500">$</span>
                    <input
                      type="number"
                      value={currentCosts[item.key]}
                      onChange={(e) => setCurrentCosts({ ...currentCosts, [item.key]: Number(e.target.value) })}
                      className="input pl-8"
                      step="10000"
                    />
                  </div>
                  <div className="text-xs text-nerdio-gray-500 mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
            <div className="bg-nerdio-teal-50 p-4 rounded-lg border border-nerdio-teal-200">
              <div className="text-sm font-medium text-nerdio-teal-900 mb-1">Current Total Annual Cost</div>
              <div className="text-2xl font-bold text-nerdio-teal-700">
                ${Object.values(currentCosts).reduce((a, b) => a + b, 0).toLocaleString()}
              </div>
            </div>
          </div>
        )}

        {/* Azure & Licensing */}
        <SectionHeader title="Azure & Licensing Configuration" section="azure" icon={Settings} />
        {expandedSections.azure && (
          <div className="mb-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="input-label">Azure Pricing Model</label>
                <select
                  value={azurePricing}
                  onChange={(e) => setAzurePricing(e.target.value as any)}
                  className="input"
                >
                  <option value="PAYG">Pay-As-You-Go (No discount)</option>
                  <option value="RI-1yr">Reserved Instances 1-Year (-30%)</option>
                  <option value="RI-3yr">Reserved Instances 3-Year (-50%)</option>
                  <option value="EA">Enterprise Agreement (-40%)</option>
                  <option value="EA-Plus">EA + Volume Licensing (-45%)</option>
                </select>
                <div className="text-xs text-nerdio-gray-500 mt-2">
                  Discounts apply to Azure compute costs
                </div>
              </div>
              <div>
                <label className="input-label">Microsoft 365 E3/E5 License</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setHasM365E3(true)}
                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${
                      hasM365E3
                        ? 'border-nerdio-teal-500 bg-nerdio-teal-50 text-nerdio-teal-700'
                        : 'border-nerdio-gray-300 bg-white text-nerdio-gray-600'
                    }`}
                  >
                    Yes, have M365
                  </button>
                  <button
                    onClick={() => setHasM365E3(false)}
                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${
                      !hasM365E3
                        ? 'border-nerdio-teal-500 bg-nerdio-teal-50 text-nerdio-teal-700'
                        : 'border-nerdio-gray-300 bg-white text-nerdio-gray-600'
                    }`}
                  >
                    No M365
                  </button>
                </div>
                <div className="text-xs text-nerdio-gray-500 mt-2">
                  {hasM365E3 ? 'AVD rights included - $0 cost' : 'AVD licensing ($15/user/month) will be added'}
                </div>
              </div>
            </div>

            {/* PHASE 1 NEW: Azure Hybrid Benefit */}
            <div className="bg-gradient-to-r from-nerdio-yellow-50 to-nerdio-teal-50 p-6 rounded-lg border-2 border-nerdio-yellow-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-nerdio-yellow-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <label className="text-lg font-bold text-nerdio-gray-900">
                      Azure Hybrid Benefit
                    </label>
                    <button
                      onClick={() => setAzureHybridBenefit(!azureHybridBenefit)}
                      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                        azureHybridBenefit ? 'bg-nerdio-teal-500' : 'bg-nerdio-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          azureHybridBenefit ? 'translate-x-8' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-nerdio-gray-700 mb-2">
                    Use your existing Windows Server licenses with Software Assurance for <strong>additional 40% savings</strong> on Azure compute costs
                  </p>
                  {azureHybridBenefit && (
                    <div className="flex items-center gap-2 text-nerdio-teal-600 font-medium text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Enabled - Maximizing Azure savings</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PHASE 1 NEW: Advanced Cost Components */}
        <SectionHeader 
          title="Advanced Cost Components" 
          section="advanced" 
          icon={Shield}
          badge="NEW"
        />
        {expandedSections.advanced && (
          <div className="mb-8 space-y-4">
            <div className="bg-nerdio-teal-50 p-4 rounded-lg border border-nerdio-teal-200 mb-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-nerdio-teal-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-nerdio-teal-900 mb-1">Comprehensive TCO Analysis</div>
                  <div className="text-sm text-nerdio-teal-700">
                    Enable these components for a complete view of your total cost of ownership. These represent real costs often hidden in traditional calculations.
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Hardware Refresh */}
              <div className={`p-4 rounded-lg border-2 transition-all ${
                includeHardwareRefresh ? 'border-nerdio-teal-500 bg-nerdio-teal-50' : 'border-nerdio-gray-200 bg-white'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-nerdio-teal-100 flex items-center justify-center flex-shrink-0">
                    <HardDrive className="w-5 h-5 text-nerdio-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-semibold text-nerdio-gray-900">Hardware Refresh Cycles</label>
                      <button
                        onClick={() => setIncludeHardwareRefresh(!includeHardwareRefresh)}
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                          includeHardwareRefresh ? 'bg-nerdio-teal-500' : 'bg-nerdio-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            includeHardwareRefresh ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-sm text-nerdio-gray-600">
                      Include Year 4-5 hardware replacement costs (~$480/user amortized)
                    </p>
                  </div>
                </div>
              </div>

              {/* Backup & DR */}
              <div className={`p-4 rounded-lg border-2 transition-all ${
                includeBackupDR ? 'border-nerdio-teal-500 bg-nerdio-teal-50' : 'border-nerdio-gray-200 bg-white'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-nerdio-teal-100 flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5 text-nerdio-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-semibold text-nerdio-gray-900">Backup & DR Infrastructure</label>
                      <button
                        onClick={() => setIncludeBackupDR(!includeBackupDR)}
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                          includeBackupDR ? 'bg-nerdio-teal-500' : 'bg-nerdio-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            includeBackupDR ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-sm text-nerdio-gray-600">
                      OnPrem: $76/user/year vs Cloud: $7/user/year
                    </p>
                  </div>
                </div>
              </div>

              {/* Monitoring Tools */}
              <div className={`p-4 rounded-lg border-2 transition-all ${
                includeMonitoring ? 'border-nerdio-teal-500 bg-nerdio-teal-50' : 'border-nerdio-gray-200 bg-white'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-nerdio-teal-100 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-5 h-5 text-nerdio-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-semibold text-nerdio-gray-900">Monitoring Tools</label>
                      <button
                        onClick={() => setIncludeMonitoring(!includeMonitoring)}
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                          includeMonitoring ? 'bg-nerdio-teal-500' : 'bg-nerdio-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            includeMonitoring ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-sm text-nerdio-gray-600">
                      SCOM, vROps, etc.: $17/user/year vs Nerdio: $4/user/year
                    </p>
                  </div>
                </div>
              </div>

              {/* Software Maintenance */}
              <div className={`p-4 rounded-lg border-2 transition-all ${
                includeMaintenance ? 'border-nerdio-teal-500 bg-nerdio-teal-50' : 'border-nerdio-gray-200 bg-white'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-nerdio-teal-100 flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-5 h-5 text-nerdio-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-semibold text-nerdio-gray-900">Software Maintenance</label>
                      <button
                        onClick={() => setIncludeMaintenance(!includeMaintenance)}
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                          includeMaintenance ? 'bg-nerdio-teal-500' : 'bg-nerdio-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            includeMaintenance ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-sm text-nerdio-gray-600">
                      VMware/Citrix support contracts (~22% of licensing)
                    </p>
                  </div>
                </div>
              </div>

              {/* Bandwidth/Egress */}
              <div className={`p-4 rounded-lg border-2 transition-all md:col-span-2 ${
                includeBandwidth ? 'border-nerdio-teal-500 bg-nerdio-teal-50' : 'border-nerdio-gray-200 bg-white'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-nerdio-teal-100 flex items-center justify-center flex-shrink-0">
                    <Wifi className="w-5 h-5 text-nerdio-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-semibold text-nerdio-gray-900">Bandwidth & Egress Costs</label>
                      <button
                        onClick={() => setIncludeBandwidth(!includeBandwidth)}
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                          includeBandwidth ? 'bg-nerdio-teal-500' : 'bg-nerdio-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            includeBandwidth ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-sm text-nerdio-gray-600">
                      Azure data egress (20GB/user/month) + VPN Gateway costs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Summary */}
            {calculations && (
              <div className="bg-gradient-to-r from-nerdio-teal-600 to-nerdio-teal-700 p-6 rounded-lg text-white mt-6">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingDown className="w-6 h-6" />
                  <h4 className="text-lg font-bold">Additional Savings from Advanced Components</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                  {includeHardwareRefresh && (
                    <div>
                      <div className="text-2xl font-bold">${(calculations.current.hardwareRefresh / 1000000).toFixed(2)}M</div>
                      <div className="text-sm text-nerdio-teal-100">Hardware Refresh</div>
                    </div>
                  )}
                  {includeBackupDR && (
                    <div>
                      <div className="text-2xl font-bold">${((calculations.current.backupDR - calculations.future.backupDR) / 1000000).toFixed(2)}M</div>
                      <div className="text-sm text-nerdio-teal-100">Backup/DR Savings</div>
                    </div>
                  )}
                  {includeMonitoring && (
                    <div>
                      <div className="text-2xl font-bold">${((calculations.current.monitoring - calculations.future.monitoring) / 1000000).toFixed(2)}M</div>
                      <div className="text-sm text-nerdio-teal-100">Monitoring Savings</div>
                    </div>
                  )}
                  {includeMaintenance && (
                    <div>
                      <div className="text-2xl font-bold">${(calculations.current.maintenance / 1000000).toFixed(2)}M</div>
                      <div className="text-sm text-nerdio-teal-100">Maintenance Avoided</div>
                    </div>
                  )}
                  {includeBandwidth && (
                    <div>
                      <div className="text-2xl font-bold">-${(calculations.future.bandwidth / 1000000).toFixed(2)}M</div>
                      <div className="text-sm text-nerdio-teal-100">Bandwidth Cost</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Migration Parameters */}
        <SectionHeader title="Migration Parameters" section="migration" icon={Clock} />
        {expandedSections.migration && (
          <div className="mb-8 space-y-4">
            <div>
              <label className="input-label">Migration Speed</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'fast', label: 'Fast Track', desc: '2-3 months', cost: '$85/user' },
                  { id: 'standard', label: 'Standard', desc: '4-6 months', cost: '$65/user' },
                  { id: 'phased', label: 'Phased', desc: '6-12 months', cost: '$45/user' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setMigrationSpeed(item.id as any)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      migrationSpeed === item.id
                        ? 'border-nerdio-teal-500 bg-nerdio-teal-50'
                        : 'border-nerdio-gray-200 hover:border-nerdio-teal-300'
                    }`}
                  >
                    <div className="font-semibold text-nerdio-gray-800 mb-1">{item.label}</div>
                    <div className="text-sm text-nerdio-gray-600 mb-2">{item.desc}</div>
                    <div className="text-xs text-nerdio-teal-600 font-medium">{item.cost}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}