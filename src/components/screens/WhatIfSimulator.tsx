import React from 'react';
import { useMining } from '../../context/MiningContext';
import {
  Sliders,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Zap,
  Truck,
  CloudRain,
  Layers,
  CheckCircle,
} from 'lucide-react';

export const WhatIfSimulator: React.FC = () => {
  const {
    simulatorInputs,
    simulatorOutputs,
    updateSimulatorInput,
    resetSimulatorToBaseline,
    loadPresetScenario,
    applySimulatorToDecisionCenter,
  } = useMining();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-navy-primary tracking-tight">WHAT-IF SIMULATOR</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-100 text-mining-blue border border-blue-200">
              SIMULATION ENGINE
            </span>
          </div>
          <p className="text-xs text-navy-muted mt-0.5">
            Core Idea: <span className="font-semibold text-navy-secondary">“TEST THE PLAN BEFORE TAKING THE DECISION”</span> • Interactive sensitivity analysis for Balaghat Mine Block 04
          </p>
        </div>

        {/* Preset scenario shortcuts */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={() => loadPresetScenario('recommended')}
            className="px-3 py-1.5 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-mining-blue rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preset: AI Optimum (+825 t)</span>
          </button>

          <button
            onClick={resetSimulatorToBaseline}
            className="px-3 py-1.5 bg-surface border border-border hover:bg-slate-100 text-navy-muted rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      {/* Hero Interactive Workspace: Two Columns (Inputs & Live Outputs) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT: SCENARIO CONTROLS (5 Cols) */}
        <div className="lg:col-span-5 industrial-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-2.5 border-b border-border">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-mining-blue" />
              <h3 className="text-xs font-bold text-navy-primary uppercase tracking-wider font-mono">
                SCENARIO CONTROLS
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500">[Shared State]</span>
          </div>

          {/* Slider 1: Equipment Availability (70% -> 85%) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-navy-primary flex items-center space-x-1.5">
                <Truck className="w-3.5 h-3.5 text-mining-blue" />
                <span>Equipment Availability:</span>
              </span>
              <span className="font-mono font-bold text-mining-blue text-sm">
                {simulatorInputs.equipmentAvailability}%
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="1"
              value={simulatorInputs.equipmentAvailability}
              onChange={(e) => updateSimulatorInput('equipmentAvailability', Number(e.target.value))}
              className="w-full accent-mining-blue"
            />
            <div className="flex justify-between text-[10px] text-navy-muted font-mono">
              <span>50%</span>
              <span>70% (Baseline)</span>
              <span>85% (Redeploy E14)</span>
              <span>95%</span>
            </div>
          </div>

          {/* Slider 2: Blasting Delay (5 days -> 2 days) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-navy-primary flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Blasting Delay (Days):</span>
              </span>
              <span className="font-mono font-bold text-amber-600 text-sm">
                {simulatorInputs.blastingDelayDays} {simulatorInputs.blastingDelayDays === 1 ? 'Day' : 'Days'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="7"
              step="1"
              value={simulatorInputs.blastingDelayDays}
              onChange={(e) => updateSimulatorInput('blastingDelayDays', Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-navy-muted font-mono">
              <span>0 Days</span>
              <span>2 Days (Fast-track)</span>
              <span>5 Days (Baseline)</span>
              <span>7 Days</span>
            </div>
          </div>

          {/* Segmented Control 3: Rainfall Condition */}
          <div className="space-y-1.5">
            <span className="font-semibold text-navy-primary text-xs flex items-center space-x-1.5">
              <CloudRain className="w-3.5 h-3.5 text-blue-500" />
              <span>Weather Condition:</span>
            </span>
            <div className="grid grid-cols-3 gap-1.5 bg-canvas p-1 rounded-lg border border-border">
              {(['normal', 'moderate', 'heavy'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => updateSimulatorInput('rainfallCondition', mode)}
                  className={`py-1.5 text-xs font-semibold rounded capitalize transition-all ${
                    simulatorInputs.rainfallCondition === mode
                      ? 'bg-navy-primary text-white shadow-sm'
                      : 'text-navy-muted hover:text-navy-primary'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-navy-muted block">
              {simulatorInputs.rainfallCondition === 'heavy'
                ? 'Heavy (42mm) - Sump waterlogged'
                : simulatorInputs.rainfallCondition === 'moderate'
                ? 'Moderate (15mm) - Sump draining'
                : 'Normal - Full haul ramp speed'}
            </span>
          </div>

          {/* Segmented Control 4: Active Zone Priority */}
          <div className="space-y-1.5">
            <span className="font-semibold text-navy-primary text-xs flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-600" />
              <span>Zone Extraction Priority:</span>
            </span>
            <div className="grid grid-cols-3 gap-1.5 bg-canvas p-1 rounded-lg border border-border">
              {(['Zone B', 'Zone A', 'Zone C'] as const).map((z) => (
                <button
                  key={z}
                  onClick={() => updateSimulatorInput('activeZonePriority', z)}
                  className={`py-1.5 text-xs font-semibold rounded transition-all ${
                    simulatorInputs.activeZonePriority === z
                      ? 'bg-navy-primary text-white shadow-sm'
                      : 'text-navy-muted hover:text-navy-primary'
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-navy-muted block">
              {simulatorInputs.activeZonePriority === 'Zone C'
                ? 'Zone C: Dry high-grade ridge target'
                : simulatorInputs.activeZonePriority === 'Zone A'
                ? 'Zone A: Standard central prospect'
                : 'Zone B: Inundated haul route sector'}
            </span>
          </div>

          {/* Slider 5: Target Production Quota */}
          <div className="space-y-1.5 pt-2 border-t border-border">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-navy-primary">Production Target:</span>
              <span className="font-mono font-bold text-navy-primary">
                {simulatorInputs.productionTarget.toLocaleString()} t
              </span>
            </div>
            <input
              type="range"
              min="18000"
              max="22000"
              step="500"
              value={simulatorInputs.productionTarget}
              onChange={(e) => updateSimulatorInput('productionTarget', Number(e.target.value))}
              className="w-full accent-navy-primary"
            />
          </div>
        </div>

        {/* RIGHT: SIMULATION RESULT (7 Cols) */}
        <div className="lg:col-span-7 industrial-card p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-border">
              <div>
                <h3 className="text-sm font-bold text-navy-primary uppercase font-mono tracking-wide">
                  SIMULATION RESULT
                </h3>
                <p className="text-xs text-navy-muted">Real-time recalculated outcome based on shared scenario</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-mining-blue text-[10px] font-mono font-bold">
                SIMULATION • DEMO DATA
              </span>
            </div>

            {/* Recalculated Metric Comparison Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
              <div className="p-3 bg-canvas rounded-lg border border-border">
                <span className="text-[10px] font-bold text-navy-muted uppercase block font-mono">
                  Expected Output
                </span>
                <div className="text-xl font-black font-mono text-navy-primary mt-1">
                  {simulatorOutputs.expectedProduction.toLocaleString()} t
                </div>
                <span className="text-[10px] text-slate-500">Baseline: 18,400 t</span>
              </div>

              <div className="p-3 bg-canvas rounded-lg border border-border">
                <span className="text-[10px] font-bold text-emerald-700 uppercase block font-mono">
                  Production Recovery
                </span>
                <div className="text-xl font-black font-mono text-emerald-600 mt-1">
                  +{simulatorOutputs.productionRecovery.toLocaleString()} t
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold">Simulated gain</span>
              </div>

              <div className="p-3 bg-canvas rounded-lg border border-border">
                <span className="text-[10px] font-bold text-navy-muted uppercase block font-mono">
                  Shortfall Risk
                </span>
                <div
                  className={`text-xl font-black font-mono mt-1 ${
                    simulatorOutputs.shortfallRiskPercent > 60
                      ? 'text-red-600'
                      : simulatorOutputs.shortfallRiskPercent > 40
                      ? 'text-amber-600'
                      : 'text-emerald-600'
                  }`}
                >
                  {simulatorOutputs.shortfallRiskPercent}%
                </div>
                <span className="text-[10px] text-slate-500">Baseline: 72% Risk</span>
              </div>

              <div className="p-3 bg-canvas rounded-lg border border-border">
                <span className="text-[10px] font-bold text-blue-700 uppercase block font-mono">
                  Risk Reduction
                </span>
                <div className="text-xl font-black font-mono text-mining-blue mt-1">
                  {simulatorOutputs.riskReduction} points
                </div>
                <span className="text-[10px] text-blue-700 font-semibold">Lower deficit prob</span>
              </div>
            </div>

            {/* Baseline vs Scenario Visual Comparison Bar */}
            <div className="p-4 bg-canvas rounded-lg border border-border space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-navy-primary">Baseline vs Scenario Gap</span>
                <span className="text-[11px] text-navy-muted">
                  Projected Gap: <strong>{simulatorOutputs.projectedGap.toLocaleString()} t</strong> (vs -1,600t baseline)
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-600 mb-0.5">
                    <span>Baseline (Current Plan):</span>
                    <span className="font-mono font-bold text-red-600">18,400 t • 72% High Risk</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-red-600 h-full rounded-full" style={{ width: '72%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-600 mb-0.5">
                    <span>Simulated Interventions:</span>
                    <span className="font-mono font-bold text-emerald-600">
                      {simulatorOutputs.expectedProduction.toLocaleString()} t • {simulatorOutputs.shortfallRiskPercent}% Risk ({simulatorOutputs.riskReduction} pts reduction)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-emerald-500 to-teal-600"
                      style={{ width: `${simulatorOutputs.shortfallRiskPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Synthesized Action */}
            <div className="mt-4 p-3.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs space-y-1">
              <div className="flex items-center space-x-2 font-bold text-blue-900">
                <Sparkles className="w-4 h-4 text-mining-blue" />
                <span>RECOMMENDED ACTION DERIVED FROM SIMULATION</span>
              </div>
              <p className="text-blue-950 font-medium leading-relaxed">
                {simulatorOutputs.recommendedActionSummary}
              </p>
              <div className="flex items-center space-x-3 pt-1 text-[11px] text-blue-800">
                <span>Feasibility Score: <strong>{simulatorOutputs.operationalFeasibility}%</strong></span>
                <span>•</span>
                <span>Ready to transition to Decision Center</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={resetSimulatorToBaseline}
              className="w-full sm:w-auto px-4 py-2 bg-surface hover:bg-slate-100 border border-border text-navy-muted rounded-lg text-xs font-semibold transition-colors"
            >
              Reset to Baseline
            </button>

            <button
              onClick={applySimulatorToDecisionCenter}
              className="w-full sm:w-auto px-5 py-2.5 bg-mining-blue hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm flex items-center justify-center space-x-2 transition-colors"
            >
              <span>APPLY TO DECISION CENTER</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
