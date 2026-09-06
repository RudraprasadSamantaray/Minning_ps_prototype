import React from 'react';
import { useMining } from '../../context/MiningContext';
import {
  X,
  MapPin,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Play,
  Layers,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export const ZoneDetailDrawer: React.FC = () => {
  const {
    isZoneDrawerOpen,
    closeZoneDrawer,
    selectedZone,
    testInSimulatorWithZone,
    setCurrentScreen,
  } = useMining();

  if (!isZoneDrawerOpen || !selectedZone) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-primary/20 backdrop-blur-[2px] pointer-events-auto transition-opacity"
        onClick={closeZoneDrawer}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-surface h-full shadow-2xl border-l border-border pointer-events-auto flex flex-col justify-between overflow-y-auto animate-slide-left z-10">
        <div>
          {/* Header */}
          <div className="p-5 border-b border-border bg-canvas/60 flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-navy-primary text-white">
                  {selectedZone.code}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    selectedZone.accessibilityStatus === 'Accessible'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {selectedZone.accessibilityStatus}
                </span>
              </div>
              <h3 className="text-base font-bold text-navy-primary mt-1.5">{selectedZone.name}</h3>
              <p className="text-xs text-navy-muted">Balaghat Complex • Bench Sector Analysis</p>
            </div>

            <button
              onClick={closeZoneDrawer}
              className="p-1.5 text-navy-muted hover:text-navy-primary hover:bg-surface-subtle rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 space-y-5">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-canvas border border-border rounded-lg">
                <span className="text-[11px] text-navy-muted font-medium">Mineralization Prob</span>
                <div className="text-xl font-bold font-mono text-mining-blue mt-0.5">
                  {selectedZone.mineralizationProb}%
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-mining-blue h-full rounded-full"
                    style={{ width: `${selectedZone.mineralizationProb}%` }}
                  />
                </div>
              </div>

              <div className="p-3 bg-canvas border border-border rounded-lg">
                <span className="text-[11px] text-navy-muted font-medium">Ore Grade (% Mn)</span>
                <div className="text-xl font-bold font-mono text-purple-700 mt-0.5">
                  {selectedZone.oreGrade}% Mn
                </div>
                <span className="text-[10px] text-navy-muted">High-grade pyrolusite</span>
              </div>

              <div className="p-3 bg-canvas border border-border rounded-lg">
                <span className="text-[11px] text-navy-muted font-medium">Target Depth</span>
                <div className="text-lg font-bold font-mono text-navy-primary mt-0.5">
                  {selectedZone.depthRange}
                </div>
                <span className="text-[10px] text-navy-muted">True bench vertical</span>
              </div>

              <div className="p-3 bg-canvas border border-border rounded-lg">
                <span className="text-[11px] text-navy-muted font-medium">Drill Boreholes</span>
                <div className="text-lg font-bold font-mono text-emerald-700 mt-0.5">
                  {selectedZone.drillHolesCount} Holes
                </div>
                <span className="text-[10px] text-emerald-600 font-medium">
                  Assay: {selectedZone.coreAssayStatus}
                </span>
              </div>
            </div>

            {/* AI Summary Card */}
            <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2 text-xs font-semibold text-blue-900 mb-1">
                <Flame className="w-4 h-4 text-mining-blue" />
                <span>AI Geological Synthesis</span>
              </div>
              <p className="text-xs text-blue-950 leading-relaxed">
                {selectedZone.summary}
              </p>
            </div>

            {/* Environmental & Remote Sensing Clues Note */}
            <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-lg text-xs space-y-1.5">
              <div className="flex items-center space-x-1.5 font-semibold text-amber-900">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Remote Sensing & NDVI Correlation</span>
              </div>
              <p className="text-amber-950 leading-tight">
                <strong>Observation:</strong> {selectedZone.ndviAnomalies}
              </p>
              <p className="text-[11px] text-amber-800 leading-snug">
                <em>Responsible AI Note:</em> Vegetation and thermal anomalies serve strictly as supportive geological indicators and structural clues, never standalone proof of manganese presence. Always corroborate with core assays.
              </p>
            </div>

            {/* Exploration Priority & Reserves */}
            <div className="border border-border rounded-lg p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-navy-muted">Exploration Priority:</span>
                <span className="font-bold font-mono px-2 py-0.5 rounded bg-navy-primary text-white text-[11px]">
                  {selectedZone.explorationPriority}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-navy-muted">Estimated Model Reserve:</span>
                <span className="font-bold font-mono text-navy-primary">
                  {selectedZone.estimatedReserveTons.toLocaleString()} Tonnes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="p-4 border-t border-border bg-canvas/80 space-y-2">
          <button
            onClick={() => {
              closeZoneDrawer();
              testInSimulatorWithZone(selectedZone.code);
            }}
            className="w-full py-2.5 px-4 bg-mining-blue hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 shadow-sm transition-colors"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>SIMULATE EXTRACTION FOR {selectedZone.code}</span>
          </button>

          <button
            onClick={() => {
              closeZoneDrawer();
              setCurrentScreen('risk-explainability');
            }}
            className="w-full py-2 px-4 bg-surface hover:bg-slate-100 text-navy-primary border border-border rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
          >
            <span>View Risk & Evidence Factors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
