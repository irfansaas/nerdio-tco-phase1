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

// PHASE 1.5 NEW: Custom cost values interface
export interface CustomCostValues {
  hardwareRefreshCost: number;        // per user, amortized over 3 years
  backupDROnPremCostPerYear: number;  // per user per year
  backupDRCloudCostPerYear: number;   // per user per year
  monitoringOnPremCostPerYear: number; // per user per year
  monitoringCloudCostPerYear: number;  // per user per year
  maintenancePercentage: number;       // percentage of licensing costs
  bandwidthGBPerUserPerMonth: number;  // GB per user per month
  bandwidthCostPerGB: number;          // cost per GB
  vpnGatewayCostPerMonth: number;      // VPN gateway monthly cost
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
  
  // PHASE 1.5 NEW: Custom cost values
  customCosts: CustomCostValues;
  setCustomCosts: (costs: CustomCostValues) => void;
  updateCustomCost: (key: keyof CustomCostValues, value: number) => void;
  resetCustomCosts: () => void;
  
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

// PHASE 1.5: Default cost values
const DEFAULT_CUSTOM_COSTS: CustomCostValues = {
  hardwareRefreshCost: 480,              // $1,200/user every 5 years = $480 amortized over 3 years
  backupDROnPremCostPerYear: 76,         // $76/user/year for onprem backup/DR
  backupDRCloudCostPerYear: 7,           // $7/user/year for cloud backup/DR
  monitoringOnPremCostPerYear: 17,       // $17/user/year for SCOM, vROps, etc.
  monitoringCloudCostPerYear: 4,         // $4/user/year for Nerdio monitoring
  maintenancePercentage: 22,             // 22% of licensing costs for maintenance
  bandwidthGBPerUserPerMonth: 20,        // 20GB per user per month
  bandwidthCostPerGB: 0.08,              // $0.08 per GB
  vpnGatewayCostPerMonth: 150,           // $150/month for VPN Gateway
};

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
  const [azureHybridBenefit, setAzureHybridBenefit] = useState(false);
  
  // Advanced Cost Components (PHASE 1 NEW)
  const [includeHardwareRefresh, setIncludeHardwareRefresh] = useState(true);
  const [includeBackupDR, setIncludeBackupDR] = useState(true);
  const [includeMonitoring, setIncludeMonitoring] = useState(true);
  const [includeMaintenance, setIncludeMaintenance] = useState(true);
  const [includeBandwidth, setIncludeBandwidth] = useState(true);
  
  // PHASE 1.5 NEW: Custom cost values
  const [customCosts, setCustomCosts] = useState<CustomCostValues>(DEFAULT_CUSTOM_COSTS);
  
  // PHASE 1.5 NEW: Helper to update individual custom cost
  const updateCustomCost = (key: keyof CustomCostValues, value: number) => {
    setCustomCosts(prev => ({ ...prev, [key]: value }));
  };
  
  // PHASE 1.5 NEW: Reset to defaults
  const resetCustomCosts = () => {
    setCustomCosts(DEFAULT_CUSTOM_COSTS);
  };
  
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

  // Calculate TCO (PHASE 1.5 ENHANCED - now uses custom costs)
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
    
    // PHASE 1.5 ENHANCED: Hardware Refresh (uses custom cost)
    const hardwareRefreshCost = includeHardwareRefresh 
      ? namedUsers * customCosts.hardwareRefreshCost
      : 0;
    
    // PHASE 1.5 ENHANCED: Backup & DR Infrastructure (uses custom cost)
    const backupDRCurrentCost = includeBackupDR
      ? (namedUsers * customCosts.backupDROnPremCostPerYear) * 3
      : 0;
    
    // PHASE 1.5 ENHANCED: Monitoring Tools (uses custom cost)
    const monitoringCurrentCost = includeMonitoring
      ? (namedUsers * customCosts.monitoringOnPremCostPerYear) * 3
      : 0;
    
    // PHASE 1.5 ENHANCED: Software Maintenance (uses custom percentage)
    const maintenanceCurrentCost = includeMaintenance
      ? (currentLicense * (customCosts.maintenancePercentage / 100))
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
    
    // PHASE 1.5 ENHANCED: Cloud Backup/DR (uses custom cost)
    const backupDRFutureCost = includeBackupDR
      ? (namedUsers * customCosts.backupDRCloudCostPerYear) * 3
      : 0;
    
    // PHASE 1.5 ENHANCED: Cloud Monitoring (uses custom cost)
    const monitoringFutureCost = includeMonitoring
      ? (namedUsers * customCosts.monitoringCloudCostPerYear) * 3
      : 0;
    
    // PHASE 1.5 ENHANCED: Bandwidth/Egress Costs (uses custom values)
    const bandwidthCost = includeBandwidth
      ? (namedUsers * customCosts.bandwidthGBPerUserPerMonth * customCosts.bandwidthCostPerGB * 12 * 3) + 
        (customCosts.vpnGatewayCostPerMonth * 12 * 3)
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
      workloadMix, currentCosts, migrationSpeed, customCosts]); // PHASE 1.5: Added customCosts dependency

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
    customCosts,
    setCustomCosts,
    updateCustomCost,
    resetCustomCosts,
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
