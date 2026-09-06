export type ScreenId =
  | 'command-center'
  | 'mine-intelligence'
  | 'risk-explainability'
  | 'what-if-simulator'
  | 'decision-center'
  | 'outcome-learning'
  | 'equipment-intelligence'
  | 'weather-impact'
  | 'data-quality';

export type MapMode = '3d' | '2d';

export type CameraPreset = 'perspective' | 'top' | 'bench' | 'zone-a' | 'zone-b' | 'zone-c';

export type GisLayerId =
  | 'mineralization'
  | 'temperature'
  | 'rainfall'
  | 'soil-moisture'
  | 'ndvi'
  | 'drill-assay';

export interface MineZone {
  id: string;
  name: string;
  code: string;
  mineralizationProb: number; // e.g. 84.2%
  oreGrade: number; // % Mn
  depthRange: string; // e.g. 42–68 m
  coreAssayStatus: 'Verified' | 'Sampled' | 'In Analysis';
  drillHolesCount: number;
  ndviAnomalies: string;
  soilMoistureRisk: 'Low' | 'Moderate' | 'High';
  explorationPriority: 'HIGH' | 'MEDIUM-HIGH' | 'MEDIUM' | 'LOW';
  accessibilityStatus: 'Accessible' | 'Restricted' | 'Waterlogged';
  summary: string;
  coordinates: { x: number; y: number; z: number };
  estimatedReserveTons: number;
}

export interface FactorContribution {
  factor: string;
  impactPercent: number; // positive or negative
  direction: 'increase-risk' | 'decrease-risk';
  description: string;
  telemetrySource: string;
}

export interface EquipmentUnit {
  id: string;
  name: string;
  type: string;
  zone: string;
  availability: number; // %
  downtimeHours: number;
  failureRisk: 'Low' | 'Medium' | 'High' | 'Critical';
  productionImpact: number; // -%
  lastSensorAlert: string;
  telemetryHealth: number; // %
}

export interface WeatherData {
  rainfallMm: number;
  soilMoisturePercent: number;
  surfaceTempC: number;
  ndviIndex: number;
  forecastSummary: string;
  operationalRisk: 'Low' | 'Moderate' | 'High';
  affectedZones: string[];
}

export interface BlastingScheduleItem {
  id: string;
  blastId: string;
  zone: string;
  plannedVolumeTons: number;
  delayedVolumeTons: number;
  delayDays: number;
  status: 'Scheduled' | 'Delayed' | 'Completed';
  clearanceReason: string;
  alternatives: string[];
}

export interface SimulatorInputs {
  equipmentAvailability: number; // 50 to 100%
  blastingDelayDays: number; // 0 to 7 days
  rainfallCondition: 'normal' | 'moderate' | 'heavy';
  productionTarget: number; // tonnes (e.g. 20,000)
  activeZonePriority: 'Zone C' | 'Zone A' | 'Zone B';
}

export interface SimulatorOutputs {
  expectedProduction: number;
  shortfallRiskPercent: number;
  projectedGap: number;
  productionRecovery: number;
  riskReduction: number;
  operationalFeasibility: number;
  recommendedActionSummary: string;
}

export interface DecisionOption {
  id: 'option-a' | 'option-b' | 'option-c';
  title: string;
  tagline: string;
  isAiPreferred: boolean;
  expectedRecoveryTons: number;
  resultingRiskPercent: number;
  opexImpact: string;
  operationalFeasibility: 'Very High' | 'High' | 'Moderate';
  actions: string[];
  risks: string[];
}

export type DecisionStatus = 'pending' | 'approved' | 'modified' | 'rejected';

export interface ExecutionTask {
  id: string;
  title: string;
  assignedRole: string;
  responsibleLead: string;
  zone: string;
  status: 'pending' | 'in_progress' | 'completed';
  progressPercent: number;
  estimatedCompletion: string;
}

export interface OutcomeRecord {
  cycleId: string;
  timeframe: string;
  predictedTons: number;
  actualTons: number;
  varianceTons: number;
  variancePercent: number;
  decisionTaken: string;
  approvedBy: string;
  status: 'Verified' | 'Calibrated';
}

export interface LearningCycleMetric {
  version: string;
  mapePercent: number;
  accuracyPercent: number;
  inferenceLatencyMs: number;
  trainingSamples: number;
  dateActive: string;
}

export interface AlertItem {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'info';
  category: 'production' | 'safety' | 'equipment' | 'weather';
  timestamp: string;
  summary: string;
  causeFactors: string[];
  recommendedAction: string;
  escalatedTo?: string;
  isStopWork?: boolean;
}

export interface DataQualitySource {
  name: string;
  healthPercent: number;
  status: 'Optimal' | 'Degraded' | 'Attention';
  latencySeconds: number;
  activeSensors: string;
  issuesCount: number;
}
