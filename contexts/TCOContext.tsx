'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export type Scenario = 'onprem' | 'citrix' | 'native';
export type Industry = 'financial' | 'healthcare' | 'manufacturing' | 'technology' | 'education' | 'government' | 'retail' | 'msp';
export type AzurePricing = 'PAYG' | 'RI-1yr' | 'RI-3yr' | 'EA' | 'EA-Plus';
export type MigrationSpeed = 'fast' | 'standard' | 'phased';

export interface WorkloadMix {
  task: number;
  knowledge: number;
  power: number;
  vip: number;
}

export interface CurrentCosts {
  infrastructure: number;
  licensing: number;
  personnel: number;
  support: number;
}

export interface TCOContextType {
  // Scenario & Organization
  scenario: Scenario;
  setScenario: (scenario: Scenario) => void;
  industry: Industry;
  setIndustry: (industry: Industry) => void;
  namedUsers: number;
  setNamedUsers: (users: number) => void;
  mauPercentage: number;
  setMauPercentage: (percent: number) => void;
  concurrentPercentage: number;
  setConcurrentPercentage: (percent: number) => void;
  
  // Licensing & Pricing (PHASE 1 ENHANCED)
  hasM365E3: boolean;
  setHasM365E3: (has: boolean) => void;
  azurePricing: AzurePricing;
  setAzurePricing: (pricing: AzurePricing) => void;
  azureHybridBenefit: boolean;
  setAzureHybridBenefit: (enabled: boolean) => void;
  
  // Advanced Cost Components (PHASE 1 NEW)
  includeHardwareRefresh: boolean;
  setIncludeHardwareRefresh: (include: boolean) => void;
  includeBackupDR: boolean;
  setIncludeBackupDR: (include: boolean) => void;
  includeMonitoring: boolean;
  setIncludeMonitoring: (include: boolean) => void;
  includeMaintenance: boolean;
  setIncludeMaintenance: (include: boolean) => void;
  includeBandwidth: boolean;
  setIncludeBandwidth: (include: boolean) => void;
  
  // Workload Mix
  workloadMix: WorkloadMix;
  setWorkloadMix: (mix: WorkloadMix) => void;
  
  // Current Costs
  currentCosts: CurrentCosts;
  setCurrentCosts: (costs: CurrentCosts) => void;
  
  // Migration
  migrationSpeed: MigrationSpeed;
  setMigrationSpeed: (speed: MigrationSpeed) => void;
  servicesNeeded: string[];
  setServicesNeeded: (services: string[]) => void;
  
  // Calculated Values
  mau: number;
  ccu: number;
  calculations: CalculationResults | null;
}

export interface CalculationResults {
  mau: number;
  ccu: number;
  current: {
    infrastructure: number;
    licensing: number;
    personnel: number;
    support: number;
    hardwareRefresh: number;
    backupDR: number;
    monitoring: number;
    maintenance: number;
    total: number;
  };
  future: {
    infrastructure: number;
    licensing: number;
    personnel: number;
    support: number;
    backupDR: number;
    monitoring: number;
    bandwidth: number;
    total: number;
  };
  savings: {
    total: number;
    percentage: number;
    monthlyPerUser: number;
    yearly: number;
  };
  migration: {
    cost: number;
    breakEvenMonths: number;
    roi: number;
  };
}

const TCOContext = createContext<TCOContextType | undefined>(undefined);

export const useTCO = () => {
  const context = useContext(TCOContext);
  if (!context) {
    throw new Error('useTCO must be used within a TCOProvider');
  }
  return context;
};

export const TCOProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Basic State
  const [scenario, setScenario] = useState<Scenario>('citrix');
  const [industry, setIndustry] = useState<Industry>('financial');
  const [namedUsers, setNamedUsers] = useState(5000);
  const [mauPercentage, setMauPercentage] = useState(45);
  const [concurrentPercentage, setConcurrentPercentage] = useState(35);
  
  // Licensing & Pricing
  const [hasM365E3, setHasM365E3] = useState(true);
  const [azurePricing, setAzurePricing] = useState<AzurePricing>('EA');
  const [azureHybridBenefit, setAzureHybridBenefit] = useState(false); // PHASE 1 NEW
  
  // Advanced Cost Components (PHASE 1 NEW)
  const [includeHardwareRefresh, setIncludeHardwareRefresh] = useState(true);
  const [includeBackupDR, setIncludeBackupDR] = useState(true);
  const [includeMonitoring, setIncludeMonitoring] = useState(true);
  const [includeMaintenance, setIncludeMaintenance] = useState(true);
  const [includeBandwidth, setIncludeBandwidth] = useState(true);
  
  const [workloadMix, setWorkloadMix] = useState<WorkloadMix>({
    task: 30,
    knowledge: 50,
    power: 15,
    vip: 5,
  });
  
  const [currentCosts, setCurrentCosts] = useState<CurrentCosts>({
    infrastructure: 850000,
    licensing: 1200000,
    personnel: 1500000,
    support: 350000,
  });
  
  const [migrationSpeed, setMigrationSpeed] = useState<MigrationSpeed>('standard');
  const [servicesNeeded, setServicesNeeded] = useState<string[]>(['assessment', 'migration', 'optimization']);

  // Derived values
  const mau = Math.round(namedUsers * (mauPercentage / 100));
  const ccu = Math.round(mau * (concurrentPercentage / 100));

  // Calculate TCO (PHASE 1 ENHANCED)
  const calculations: CalculationResults | null = React.useMemo(() => {
    // Scenario-based multipliers
    const scenarioMultipliers = {
      onprem: { infra: 1.0, license: 0.85, personnel: 0.5, savings: 0.65 },
      citrix: { infra: 0.75, license: 0.65, personnel: 0.55, savings: 0.47 },
      native: { infra: 0.85, license: 1.0, personnel: 0.65, savings: 0.35 },
    };

    const multiplier = scenarioMultipliers[scenario];

    // ===== CURRENT STATE (ON-PREM/CITRIX) =====
    const currentInfra = currentCosts.infrastructure * 3;
    const currentLicense = currentCosts.licensing * 3;
    const currentPersonnel = currentCosts.personnel * 3;
    const currentSupport = currentCosts.support * 3;
    
    // PHASE 1 NEW: Additional OnPrem Costs
    // Hardware Refresh (Year 4-5 requirement, amortized over 3 years)
    const hardwareRefreshCost = includeHardwareRefresh 
      ? namedUsers * 1200 * 0.4 // $1200/user every 5 years = $480/user over 3 years
      : 0;
    
    // Backup & DR Infrastructure
    const backupDRCurrentCost = includeBackupDR
      ? (namedUsers * 76) * 3 // $76/user/year for backup/DR infrastructure
      : 0;
    
    // Monitoring Tools (SCOM, vROps, etc.)
    const monitoringCurrentCost = includeMonitoring
      ? (namedUsers * 17) * 3 // $17/user/year for monitoring tools
      : 0;
    
    // Software Maintenance Contracts (VMware/Citrix support, backup software, etc.)
    const maintenanceCurrentCost = includeMaintenance
      ? (currentLicense * 0.22) // 22% of licensing cost for annual maintenance
      : 0;

    const currentTotal = currentInfra + currentLicense + currentPersonnel + currentSupport + 
                        hardwareRefreshCost + backupDRCurrentCost + monitoringCurrentCost + maintenanceCurrentCost;

    // ===== FUTURE STATE (AZURE + NERDIO) =====
    // Azure Pricing Discounts (PHASE 1 ENHANCED)
    const azureDiscounts = { 
      'PAYG': 0,
      'RI-1yr': 0.30,
      'RI-3yr': 0.50, 
      'EA': 0.40,
      'EA-Plus': 0.45
    };
    const azureDiscount = azureDiscounts[azurePricing];
    
    // Azure Hybrid Benefit (PHASE 1 NEW - additional 40% off Windows licensing)
    const ahbDiscount = azureHybridBenefit ? 0.40 : 0;
    const totalAzureDiscount = azureDiscount + ahbDiscount * (1 - azureDiscount);

    // Base infrastructure cost per CCU (varies by workload)
    const baseInfraCostPerCCU =
      (workloadMix.task * 120 +
        workloadMix.knowledge * 180 +
        workloadMix.power * 350 +
        workloadMix.vip * 500) / 100;

    // Auto-scaling reduction (65% savings from Nerdio optimization)
    const rawInfraCost = ccu * baseInfraCostPerCCU * 12 * 3;
    const futureInfra = rawInfraCost * (1 - 0.65) * (1 - totalAzureDiscount) * multiplier.infra;

    // Licensing: AVD + Nerdio
    const avdLicenseCost = hasM365E3 ? 0 : namedUsers * 15 * 12 * 3;
    const nerdioLicenseCost = namedUsers * 6.50 * 12 * 3;
    const futureLicense = (avdLicenseCost + nerdioLicenseCost) * multiplier.license;

    // Personnel reduction (typical 45-55% reduction)
    const futurePersonnel = currentPersonnel * multiplier.personnel;

    // Support (cloud reduces to ~20% of current)
    const futureSupport = currentSupport * 0.20;
    
    // PHASE 1 NEW: Cloud-specific costs
    // Backup & DR (much cheaper in cloud)
    const backupDRFutureCost = includeBackupDR
      ? (namedUsers * 7) * 3 // $7/user/year for Azure backup/DR
      : 0;
    
    // Monitoring (included in Nerdio, minimal additional cost)
    const monitoringFutureCost = includeMonitoring
      ? (namedUsers * 4) * 3 // $4/user/year for enhanced monitoring
      : 0;
    
    // Bandwidth/Egress Costs (PHASE 1 NEW)
    const bandwidthCost = includeBandwidth
      ? (namedUsers * 20 * 0.08 * 12 * 3) + (150 * 12 * 3) // 20GB/user/month + VPN Gateway
      : 0;

    const futureTotal = futureInfra + futureLicense + futurePersonnel + futureSupport + 
                       backupDRFutureCost + monitoringFutureCost + bandwidthCost;
    
    const totalSavings = currentTotal - futureTotal;
    const savingsPercentage = (totalSavings / currentTotal) * 100;
    const monthlyPerUserSavings = (totalSavings / 36) / namedUsers;

    // Migration costs
    const migrationCostPerUser = migrationSpeed === 'fast' ? 85 : migrationSpeed === 'standard' ? 65 : 45;
    const migrationCost = namedUsers * migrationCostPerUser;
    const breakEvenMonths = migrationCost / (totalSavings / 36);
    const roi = ((totalSavings - migrationCost) / migrationCost) * 100;

    return {
      mau,
      ccu,
      current: {
        infrastructure: currentInfra,
        licensing: currentLicense,
        personnel: currentPersonnel,
        support: currentSupport,
        hardwareRefresh: hardwareRefreshCost,
        backupDR: backupDRCurrentCost,
        monitoring: monitoringCurrentCost,
        maintenance: maintenanceCurrentCost,
        total: currentTotal,
      },
      future: {
        infrastructure: futureInfra,
        licensing: futureLicense,
        personnel: futurePersonnel,
        support: futureSupport,
        backupDR: backupDRFutureCost,
        monitoring: monitoringFutureCost,
        bandwidth: bandwidthCost,
        total: futureTotal,
      },
      savings: {
        total: totalSavings,
        percentage: savingsPercentage,
        monthlyPerUser: monthlyPerUserSavings,
        yearly: totalSavings / 3,
      },
      migration: {
        cost: migrationCost,
        breakEvenMonths,
        roi,
      },
    };
  }, [scenario, namedUsers, mauPercentage, concurrentPercentage, hasM365E3, azurePricing, azureHybridBenefit,
      includeHardwareRefresh, includeBackupDR, includeMonitoring, includeMaintenance, includeBandwidth,
      workloadMix, currentCosts, migrationSpeed]);

  const value: TCOContextType = {
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
    servicesNeeded,
    setServicesNeeded,
    mau,
    ccu,
    calculations,
  };

  return <TCOContext.Provider value={value}>{children}</TCOContext.Provider>;
};