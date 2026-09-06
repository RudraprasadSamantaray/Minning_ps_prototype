import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import {
  ScreenId,
  MapMode,
  CameraPreset,
  GisLayerId,
  MineZone,
  SimulatorInputs,
  SimulatorOutputs,
  DecisionStatus,
  ExecutionTask,
  AlertItem,
} from '../types/mining';
import {
  DEFAULT_EXECUTION_TASKS,
  ACTIVE_ALERTS,
} from '../data/miningData';

interface MiningContextType {
  // Navigation
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;

  // Mine Intelligence
  mapMode: MapMode;
  setMapMode: (mode: MapMode) => void;
  cameraPreset: CameraPreset;
  setCameraPreset: (preset: CameraPreset) => void;
  activeGisLayers: GisLayerId[];
  toggleGisLayer: (layer: GisLayerId) => void;
  selectedZone: MineZone | null;
  setSelectedZone: (zone: MineZone | null) => void;
  isZoneDrawerOpen: boolean;
  openZoneDrawer: (zone: MineZone) => void;
  closeZoneDrawer: () => void;
  focusZoneIn3D: (zoneId: 'zone-a' | 'zone-b' | 'zone-c') => void;

  // Simulator
  simulatorInputs: SimulatorInputs;
  simulatorOutputs: SimulatorOutputs;
  updateSimulatorInput: <K extends keyof SimulatorInputs>(key: K, value: SimulatorInputs[K]) => void;
  resetSimulatorToBaseline: () => void;
  loadPresetScenario: (scenario: 'recommended' | 'baseline' | 'conservative') => void;
  applySimulatorToDecisionCenter: () => void;

  // Decision & Execution
  selectedOptionId: 'option-a' | 'option-b' | 'option-c';
  setSelectedOptionId: (id: 'option-a' | 'option-b' | 'option-c') => void;
  decisionStatus: DecisionStatus;
  executionTasks: ExecutionTask[];
  approveDecision: (optionId?: 'option-a' | 'option-b' | 'option-c') => void;
  modifyDecision: (notes: string) => void;
  rejectDecision: (reason: string) => void;
  toggleTaskStatus: (taskId: string) => void;
  lastDecisionNote: string;

  // Modals & Drawers
  isModifyModalOpen: boolean;
  setIsModifyModalOpen: (v: boolean) => void;
  isStopWorkModalOpen: boolean;
  setIsStopWorkModalOpen: (v: boolean) => void;
  isAuditTrailOpen: boolean;
  setIsAuditTrailOpen: (v: boolean) => void;
  isAlertsDrawerOpen: boolean;
  setIsAlertsDrawerOpen: (v: boolean) => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (v: boolean) => void;
  openReportModal: () => void;

  // Alerts
  alerts: AlertItem[];
  dismissAlert: (id: string) => void;

  // Guided Tour
  guidedStep: number; // 0 = off, 1-10 = active steps
  startGuidedTour: () => void;
  nextGuidedStep: () => void;
  prevGuidedStep: () => void;
  exitGuidedTour: () => void;

  // Quick Action Helpers
  testInSimulatorWithZone: (zoneCode: string) => void;
  viewCauseForRisk: () => void;
}

const BASELINE_SIMULATOR_INPUTS: SimulatorInputs = {
  equipmentAvailability: 70,
  blastingDelayDays: 5,
  rainfallCondition: 'heavy',
  productionTarget: 20000,
  activeZonePriority: 'Zone B',
};

const MiningContext = createContext<MiningContextType | undefined>(undefined);

export const MiningProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('command-center');

  // Mine Map & Zones
  const [mapMode, setMapMode] = useState<MapMode>('3d');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('perspective');
  const [activeGisLayers, setActiveGisLayers] = useState<GisLayerId[]>([
    'mineralization',
    'drill-assay',
  ]);
  const [selectedZone, setSelectedZone] = useState<MineZone | null>(null);
  const [isZoneDrawerOpen, setIsZoneDrawerOpen] = useState(false);

  // Simulator state
  const [simulatorInputs, setSimulatorInputs] = useState<SimulatorInputs>(BASELINE_SIMULATOR_INPUTS);

  // Decision state
  const [selectedOptionId, setSelectedOptionId] = useState<'option-a' | 'option-b' | 'option-c'>('option-a');
  const [decisionStatus, setDecisionStatus] = useState<DecisionStatus>('pending');
  const [executionTasks, setExecutionTasks] = useState<ExecutionTask[]>(DEFAULT_EXECUTION_TASKS);
  const [lastDecisionNote, setLastDecisionNote] = useState('');

  // Modals & Drawers
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isStopWorkModalOpen, setIsStopWorkModalOpen] = useState(false);
  const [isAuditTrailOpen, setIsAuditTrailOpen] = useState(false);
  const [isAlertsDrawerOpen, setIsAlertsDrawerOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const openReportModal = () => {
    setIsReportModalOpen(true);
  };

  // Alerts
  const [alerts, setAlerts] = useState<AlertItem[]>(ACTIVE_ALERTS);

  // Guided Tour
  const [guidedStep, setGuidedStep] = useState<number>(0);

  // GIS Layer toggler
  const toggleGisLayer = (layer: GisLayerId) => {
    setActiveGisLayers((prev) =>
      prev.includes(layer) ? prev.filter((l) => l !== layer) : [...prev, layer]
    );
  };

  // Zone drawer actions
  const openZoneDrawer = (zone: MineZone) => {
    setSelectedZone(zone);
    setIsZoneDrawerOpen(true);
    if (zone.id === 'zone-a') setCameraPreset('zone-a');
    else if (zone.id === 'zone-b') setCameraPreset('zone-b');
    else if (zone.id === 'zone-c') setCameraPreset('zone-c');
  };

  const closeZoneDrawer = () => {
    setIsZoneDrawerOpen(false);
  };

  const focusZoneIn3D = (zoneId: 'zone-a' | 'zone-b' | 'zone-c') => {
    setCameraPreset(zoneId);
  };

  // Simulator update & recalculation
  const updateSimulatorInput = <K extends keyof SimulatorInputs>(key: K, value: SimulatorInputs[K]) => {
    setSimulatorInputs((prev) => ({ ...prev, [key]: value }));
  };

  const resetSimulatorToBaseline = () => {
    setSimulatorInputs(BASELINE_SIMULATOR_INPUTS);
  };

  const loadPresetScenario = (scenario: 'recommended' | 'baseline' | 'conservative') => {
    if (scenario === 'recommended') {
      setSimulatorInputs({
        equipmentAvailability: 85,
        blastingDelayDays: 2,
        rainfallCondition: 'moderate',
        productionTarget: 20000,
        activeZonePriority: 'Zone C',
      });
    } else if (scenario === 'conservative') {
      setSimulatorInputs({
        equipmentAvailability: 78,
        blastingDelayDays: 3,
        rainfallCondition: 'heavy',
        productionTarget: 20000,
        activeZonePriority: 'Zone A',
      });
    } else {
      resetSimulatorToBaseline();
    }
  };

  // Shared reactive simulation calculation engine
  // BASELINE: 18,400 t | 72% risk
  // RECOMMENDED PRESET: 19,225 t (+825 t recovery) | 35% risk (37 point risk reduction)
  const simulatorOutputs: SimulatorOutputs = useMemo(() => {
    const baseProduction = 18400;
    const isRecommendedPreset =
      simulatorInputs.equipmentAvailability === 85 &&
      simulatorInputs.blastingDelayDays === 2 &&
      simulatorInputs.rainfallCondition === 'moderate' &&
      simulatorInputs.activeZonePriority === 'Zone C';

    if (isRecommendedPreset && simulatorInputs.productionTarget === 20000) {
      return {
        expectedProduction: 19225,
        shortfallRiskPercent: 35,
        projectedGap: -775,
        productionRecovery: 825,
        riskReduction: 37,
        operationalFeasibility: 92,
        recommendedActionSummary:
          'Simulated Plan: Redeploy Excavator E14 to Zone C, advance Blast #105, and route around Zone B sump.',
      };
    }

    const availDelta = (simulatorInputs.equipmentAvailability - 70) * 35; // e.g. +525t at 85%
    const blastDelta = (5 - simulatorInputs.blastingDelayDays) * 65; // e.g. +195t at 2 days
    const rainDelta =
      simulatorInputs.rainfallCondition === 'normal'
        ? 200
        : simulatorInputs.rainfallCondition === 'moderate'
        ? 60
        : 0;
    const zoneBonus =
      simulatorInputs.activeZonePriority === 'Zone C'
        ? 140
        : simulatorInputs.activeZonePriority === 'Zone A'
        ? 60
        : 0;

    const expectedProduction = Math.round(
      baseProduction + availDelta + blastDelta + rainDelta + zoneBonus
    );
    const projectedGap = expectedProduction - simulatorInputs.productionTarget;

    const shortfallFraction = Math.max(0, -projectedGap / 1600);
    const shortfallRiskPercent = Math.min(
      94,
      Math.max(15, Math.round(shortfallFraction * 72))
    );

    const productionRecovery = Math.max(0, expectedProduction - baseProduction);
    const riskReduction = Math.max(0, 72 - shortfallRiskPercent);

    const operationalFeasibility = Math.max(
      60,
      Math.min(96, Math.round(92 - (simulatorInputs.equipmentAvailability > 90 ? 12 : 0)))
    );

    let recommendedActionSummary = 'Maintain standard monitoring protocol.';
    if (shortfallRiskPercent > 60) {
      recommendedActionSummary = 'Urgent: Redeploy fleet to Zone C & compress Blast #105 timeline.';
    } else if (shortfallRiskPercent > 35) {
      recommendedActionSummary = 'Proceed with Zone C fleet deployment and monitor sump drainage.';
    } else {
      recommendedActionSummary = 'Simulation indicates target recovery with acceptable risk threshold.';
    }

    return {
      expectedProduction,
      shortfallRiskPercent,
      projectedGap,
      productionRecovery,
      riskReduction,
      operationalFeasibility,
      recommendedActionSummary,
    };
  }, [simulatorInputs]);

  // Apply to Decision Center
  const applySimulatorToDecisionCenter = () => {
    setSelectedOptionId('option-a');
    setCurrentScreen('decision-center');
  };

  // Decision actions
  const approveDecision = (optionId: 'option-a' | 'option-b' | 'option-c' = 'option-a') => {
    setSelectedOptionId(optionId);
    setDecisionStatus('approved');
    setExecutionTasks((prev) =>
      prev.map((t, idx) =>
        idx === 0
          ? { ...t, status: 'in_progress', progressPercent: 75 }
          : idx === 1
          ? { ...t, status: 'in_progress', progressPercent: 40 }
          : t
      )
    );
  };

  const modifyDecision = (notes: string) => {
    setLastDecisionNote(notes);
    setDecisionStatus('modified');
    setIsModifyModalOpen(false);
  };

  const rejectDecision = (reason: string) => {
    setLastDecisionNote(reason);
    setDecisionStatus('rejected');
  };

  const toggleTaskStatus = (taskId: string) => {
    setExecutionTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const nextStatus =
          task.status === 'pending'
            ? 'in_progress'
            : task.status === 'in_progress'
            ? 'completed'
            : 'pending';
        const progress = nextStatus === 'completed' ? 100 : nextStatus === 'in_progress' ? 50 : 0;
        return { ...task, status: nextStatus, progressPercent: progress };
      })
    );
  };

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  // Quick navigation helpers
  const testInSimulatorWithZone = (zoneCode: string) => {
    loadPresetScenario('recommended');
    if (zoneCode.includes('C')) {
      updateSimulatorInput('activeZonePriority', 'Zone C');
    }
    setCurrentScreen('what-if-simulator');
  };

  const viewCauseForRisk = () => {
    setCurrentScreen('risk-explainability');
  };

  // Guided 10-Step Story Tour
  const startGuidedTour = () => {
    setGuidedStep(1);
    setCurrentScreen('command-center');
    resetSimulatorToBaseline();
  };

  const nextGuidedStep = () => {
    setGuidedStep((prev) => {
      const next = prev + 1;
      if (next > 10) return 0; // End tour

      if (next === 1) {
        setCurrentScreen('command-center');
        resetSimulatorToBaseline();
      } else if (next === 2) {
        // Shortfall detected
        setCurrentScreen('command-center');
      } else if (next === 3) {
        // Explain why
        setCurrentScreen('risk-explainability');
      } else if (next === 4) {
        // Mine Intelligence 3D Zone
        setCurrentScreen('mine-intelligence');
        setCameraPreset('zone-c');
      } else if (next === 5) {
        // Recommendation
        setCurrentScreen('decision-center');
      } else if (next === 6) {
        // What-If Simulation
        setCurrentScreen('what-if-simulator');
        loadPresetScenario('recommended');
      } else if (next === 7) {
        // Manager Decision
        setCurrentScreen('decision-center');
        approveDecision('option-a');
      } else if (next === 8) {
        // Execution
        setCurrentScreen('decision-center');
      } else if (next === 9) {
        // Outcome
        setCurrentScreen('outcome-learning');
      } else if (next === 10) {
        // Feedback
        setCurrentScreen('outcome-learning');
      }

      return next;
    });
  };

  const prevGuidedStep = () => {
    setGuidedStep((prev) => Math.max(1, prev - 1));
  };

  const exitGuidedTour = () => {
    setGuidedStep(0);
  };

  return (
    <MiningContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        mapMode,
        setMapMode,
        cameraPreset,
        setCameraPreset,
        activeGisLayers,
        toggleGisLayer,
        selectedZone,
        setSelectedZone,
        isZoneDrawerOpen,
        openZoneDrawer,
        closeZoneDrawer,
        focusZoneIn3D,
        simulatorInputs,
        simulatorOutputs,
        updateSimulatorInput,
        resetSimulatorToBaseline,
        loadPresetScenario,
        applySimulatorToDecisionCenter,
        selectedOptionId,
        setSelectedOptionId,
        decisionStatus,
        executionTasks,
        approveDecision,
        modifyDecision,
        rejectDecision,
        toggleTaskStatus,
        lastDecisionNote,
        isModifyModalOpen,
        setIsModifyModalOpen,
        isStopWorkModalOpen,
        setIsStopWorkModalOpen,
        isAuditTrailOpen,
        setIsAuditTrailOpen,
        isAlertsDrawerOpen,
        setIsAlertsDrawerOpen,
        isReportModalOpen,
        setIsReportModalOpen,
        openReportModal,
        alerts,
        dismissAlert,
        guidedStep,
        startGuidedTour,
        nextGuidedStep,
        prevGuidedStep,
        exitGuidedTour,
        testInSimulatorWithZone,
        viewCauseForRisk,
      }}
    >
      {children}
    </MiningContext.Provider>
  );
};

export const useMining = () => {
  const context = useContext(MiningContext);
  if (!context) {
    throw new Error('useMining must be used within a MiningProvider');
  }
  return context;
};
