import React from 'react';
import { useMining } from '../../context/MiningContext';
import { EQUIPMENT_FLEET } from '../../data/miningData';
import {
  Truck,
  AlertTriangle,
  CheckCircle2,
  Activity,
  ArrowRight,
  Sliders,
  Wrench,
  Gauge,
} from 'lucide-react';

export const EquipmentIntelligence: React.FC = () => {
  const { loadPresetScenario, setCurrentScreen } = useMining();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-navy-primary tracking-tight">EQUIPMENT INTELLIGENCE</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
              FLEET TELEMETRY
            </span>
          </div>
          <p className="text-xs text-navy-muted mt-0.5">
            Heavy machinery utilization, sensor health, and production impact analysis
          </p>
        </div>

        <button
          onClick={() => {
            loadPresetScenario('recommended');
            setCurrentScreen('what-if-simulator');
          }}
          className="px-3.5 py-1.5 bg-mining-blue hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm flex items-center space-x-1.5 transition-colors self-start sm:self-auto"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Simulate Fleet Redeployment</span>
        </button>
      </div>

      {/* Critical Unit Spotlight: Excavator E12 */}
      <div className="industrial-card p-5 bg-red-50/40 border-l-4 border-l-red-600">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-600 text-white">
                CRITICAL FLEET ANOMALY
              </span>
              <span className="text-xs font-mono font-semibold text-red-900">Unit ID: EQ-E12</span>
            </div>
            <h3 className="text-base font-bold text-navy-primary">
              Excavator E12 (Komatsu PC1250) • Bench 3 Waterlogged Sector
            </h3>
            <p className="text-xs text-navy-secondary max-w-2xl leading-relaxed">
              Main hydraulic pump delta pressure dropped from 320 bar to 184 bar due to pump cavitation. Bucket cycle time degraded from 24s to 42s. Direct production drag is <strong>-8.4% (-1,150 tonnes/week)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="p-2.5 bg-white rounded-lg border border-red-200">
              <span className="text-[10px] text-navy-muted block">Availability</span>
              <span className="text-lg font-bold font-mono text-red-600">58.4%</span>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-red-200">
              <span className="text-[10px] text-navy-muted block">Production Drag</span>
              <span className="text-lg font-bold font-mono text-red-600">-8.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Fleet Roster */}
      <div className="industrial-card p-5">
        <h3 className="text-xs font-bold text-navy-primary uppercase tracking-wider font-mono mb-3 pb-2 border-b border-border">
          HEAVY MINING EQUIPMENT AVAILABILITY & TELEMETRY ROSTER
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EQUIPMENT_FLEET.map((unit) => (
            <div
              key={unit.id}
              className={`p-4 rounded-xl border text-xs flex flex-col justify-between ${
                unit.failureRisk === 'Critical'
                  ? 'bg-red-50/30 border-red-300'
                  : unit.failureRisk === 'High'
                  ? 'bg-amber-50/30 border-amber-300'
                  : 'bg-canvas border-border'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-navy-primary">{unit.name}</span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      unit.failureRisk === 'Critical'
                        ? 'bg-red-600 text-white'
                        : unit.failureRisk === 'High'
                        ? 'bg-amber-500 text-white'
                        : unit.failureRisk === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {unit.failureRisk} Risk
                  </span>
                </div>

                <div className="space-y-1 text-slate-600 text-[11px] mb-3">
                  <div>Type: <strong className="text-navy-primary">{unit.type}</strong></div>
                  <div>Location: <strong>{unit.zone}</strong></div>
                  <div>Shift Downtime: <strong className="font-mono">{unit.downtimeHours} hrs</strong></div>
                </div>

                <div className="bg-white p-2 rounded border border-border text-[11px] text-navy-secondary">
                  <span className="text-[10px] text-navy-muted block font-semibold">Sensor Diagnostic:</span>
                  {unit.lastSensorAlert}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between">
                <span className="text-[10px] text-navy-muted">
                  Telemetry Health: <strong>{unit.telemetryHealth}%</strong>
                </span>
                <span className="font-mono font-bold text-navy-primary">
                  {unit.availability}% Avail
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
