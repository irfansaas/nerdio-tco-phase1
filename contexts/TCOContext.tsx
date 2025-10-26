'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export type Scenario = 'onprem' | 'citrix' | 'native';
export type Industry = 'financial' | 'healthcare' | 'manufacturing' | 'technology' | 'education' | 'government' | 'retail' | 'msp';
export type AzurePricing = 'PAYG' | 'RI' | 'EA';
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
  hasM365E3: boolean;
  setHasM365E3: (has: boolean) => void;
  azurePricing: AzurePricing;
  setAzurePricing: (pricing: AzurePricing) => void;
  
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
    total: number;
  };
  future: {
    infrastructure: number;
    licensing: number;
    personnel: number;
    support: number;
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
  // State
  const [scenario, setScenario] = useState<Scenario>('citrix');
  const [industry, setIndustry] = useState<Industry>('financial');
  const [namedUsers, setNamedUsers] = useState(5000);
  const [mauPercentage, setMauPercentage] = useState(45);
  const [concurrentPercentage, setConcurrentPercentage] = useState(35);
  const [hasM365E3, setHasM365E3] = useState(true);
  const [azurePricing, setAzurePricing] = useState<AzurePricing>('EA');
  
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

  // Calculate TCO
  const calculations: CalculationResults | null = React.useMemo(() => {
    // Scenario-based multipliers
    const scenarioMultipliers = {
      onprem: { infra: 1.0, license: 0.85, personnel: 0.5, savings: 0.65 },
      citrix: { infra: 0.75, license: 0.65, personnel: 0.55, savings: 0.47 },
      native: { infra: 0.85, license: 1.0, personnel: 0.65, savings: 0.35 },
    };

    const multiplier = scenarioMultipliers[scenario];

    // Current State 3-Year TCO
    const currentInfra = currentCosts.infrastructure * 3;
    const currentLicense = currentCosts.licensing * 3;
    const currentPersonnel = currentCosts.personnel * 3;
    const currentSupport = currentCosts.support * 3;
    const currentTotal = currentInfra + currentLicense + currentPersonnel + currentSupport;

    // Azure Pricing Discount
    const azureDiscounts = { PAYG: 0, RI: 0.30, EA: 0.40 };
    const azureDiscount = azureDiscounts[azurePricing];

    // Base infrastructure cost per CCU (varies by workload)
    const baseInfraCostPerCCU =
      (workloadMix.task * 120 +
        workloadMix.knowledge * 180 +
        workloadMix.power * 350 +
        workloadMix.vip * 500) / 100;

    // Auto-scaling reduction (65% savings)
    const rawInfraCost = ccu * baseInfraCostPerCCU * 12 * 3;
    const futureInfra = rawInfraCost * (1 - 0.65) * (1 - azureDiscount) * multiplier.infra;

    // Licensing: AVD + Nerdio
    const avdLicenseCost = hasM365E3 ? 0 : namedUsers * 15 * 12 * 3;
    const nerdioLicenseCost = namedUsers * 6.50 * 12 * 3;
    const futureLicense = (avdLicenseCost + nerdioLicenseCost) * multiplier.license;

    // Personnel reduction
    const futurePersonnel = currentPersonnel * multiplier.personnel;

    // Support
    const futureSupport = currentSupport * 0.20;

    const futureTotal = futureInfra + futureLicense + futurePersonnel + futureSupport;
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
        total: currentTotal,
      },
      future: {
        infrastructure: futureInfra,
        licensing: futureLicense,
        personnel: futurePersonnel,
        support: futureSupport,
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
  }, [scenario, namedUsers, mauPercentage, concurrentPercentage, hasM365E3, azurePricing, workloadMix, currentCosts, migrationSpeed]);

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
