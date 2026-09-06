import React, { useState } from 'react';
import { useMining } from '../../context/MiningContext';
import {
  EQUIPMENT_FLEET,
  WEATHER_STATUS,
  BLASTING_STATUS,
} from '../../data/miningData';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from 'recharts';
import {
  AlertTriangle,
  Truck,
  CloudRain,
  Zap,
  ArrowRight,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

export const RiskExplainability: React.FC = () => {
  const { setCurrentScreen, loadPresetScenario } = useMining();
  const [activeEvidenceTab, setActiveEvidenceTab] = useState<'equipment' | 'weather' | 'blasting'>('equipment');

  const waterfallData = [
    { name: 'Equipment Downtime', impact: 28, fill: '#DC2626' },
    { name: 'Rainfall Ingress (Zone B)', impact: 19, fill: '#EA580C' },
    { name: 'Blasting Delay (#104)', impact: 14, fill: '#F59E0B' },
    { name: 'Fleet Haul Constraints', impact: 11, fill: '#D97706' },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-navy-primary tracking-tight">AI RISK & EXPLAINABILITY</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
              SHAP ATTRIBUTION
            </span>
          </div>
          <p className="text-xs text-navy-muted mt-0.5">
            Primary Question: <span className="font-semibold text-navy-secondary">“WHY is the system predicting a problem?”</span> • Balaghat Mine Block 04 Causal Decomposition
          </p>
        </div>

        <button
          onClick={() => setCurrentScreen('decision-center')}
          className="px-3.5 py-1.5 bg-navy-primary hover:bg-navy-secondary text-white rounded-lg text-xs font-bold shadow-sm flex items-center space-x-1.5 transition-colors self-start sm:self-auto"
        >
          <span>VIEW RECOMMENDATIONS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* HERO RISK BANNER */}
      <div className="industrial-card p-4 bg-gradient-to-r from-red-50/40 via-white to-amber-50/30 border-l-4 border-l-red-600">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          <div>
            <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider block font-mono">
              SHORTFALL RISK
            </span>
            <div className="text-2xl font-black font-mono text-red-600 mt-0.5">72% HIGH</div>
            <span className="text-[11px] text-red-800">Threshold breached for Week 36</span>
          </div>

          <div className="border-l border-border pl-4">
            <span className="text-[11px] font-semibold text-navy-muted uppercase block">Expected Output</span>
            <div className="text-xl font-bold font-mono text-navy-primary mt-0.5">18,400 t</div>
            <span className="text-[11px] text-slate-500">Predicted weekly run-rate</span>
          </div>

          <div className="border-l border-border pl-4">
            <span className="text-[11px] font-semibold text-navy-muted uppercase block">Target Quota</span>
            <div className="text-xl font-bold font-mono text-navy-primary mt-0.5">20,000 t</div>
            <span className="text-[11px] text-slate-500">Contractual commitment</span>
          </div>

          <div className="border-l border-border pl-4">
            <span className="text-[11px] font-semibold text-amber-800 uppercase block">Projected Gap</span>
            <div className="text-xl font-black font-mono text-amber-600 mt-0.5">-1,600 t</div>
            <span className="text-[11px] text-amber-700 font-semibold">8.0% shortfall deficit</span>
          </div>
        </div>
      </div>

      {/* MAIN VISUAL SECTION: SHAP Contribution Visualization + AI Diagnosis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* SHAP Feature Contribution Waterfall (7 Cols) */}
        <div className="lg:col-span-7 industrial-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-navy-primary">WHY IS THE RISK AT 72%?</h3>
                <p className="text-xs text-navy-muted">Quantified factor contribution to the shortfall risk</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-canvas border border-border text-navy-muted">
                [Model Estimate]
              </span>
            </div>

            <div className="h-60 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={waterfallData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 35]}
                    tick={{ fontSize: 11, fill: '#64748B' }}
                    unit="% Risk"
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 11, fill: '#0B192C', fontWeight: 500 }}
                    width={150}
                  />
                  <Tooltip
                    formatter={(val: any) => [`+${val}% to Shortfall Risk`, 'Impact']}
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="impact" radius={[0, 4, 4, 0]}>
                    {waterfallData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-2.5 bg-canvas rounded-lg border border-border text-xs text-navy-secondary">
            <span>
              <strong>Primary Drivers:</strong> Heavy equipment downtime (E12 hydraulic fault) and Zone B rainfall ponding account for over 65% of the risk weighting.
            </span>
          </div>
        </div>

        {/* AI Diagnosis (5 Cols) */}
        <div className="lg:col-span-5 industrial-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-border">
              <h3 className="text-sm font-bold text-navy-primary uppercase tracking-wider font-mono">
                AI ROOT CAUSE DIAGNOSIS
              </h3>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-mining-blue border border-blue-200 text-[10px] font-mono font-bold">
                SYNTHESIS
              </span>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-red-50/50 border border-red-200 flex items-start space-x-2.5">
                <Truck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-red-950">1. Excavator E12 Hydraulic Downtime</h4>
                  <p className="text-[11px] text-red-900 mt-0.5">
                    Main pump delta pressure dropped to 184 bar, reducing Bench 3 loading by 41% (-8.4% drag).
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-200 flex items-start space-x-2.5">
                <CloudRain className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-950">2. Zone B Precipitation Ponding</h4>
                  <p className="text-[11px] text-amber-900 mt-0.5">
                    42mm rainfall waterlogged Haul Ramp B-2. Truck speed restricted to 12 km/h due to wheel slippage.
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-100 border border-slate-200 flex items-start space-x-2.5">
                <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">3. Blast #104 Deferral</h4>
                  <p className="text-[11px] text-slate-700 mt-0.5">
                    Blast deferred by 3 days due to saturated drill holes, holding back 1,000t muckpile release.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border mt-3 flex items-center justify-between text-xs">
            <span className="text-navy-muted flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Confidence: <strong>High [Model Estimate]</strong></span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Balaghat Model v2.4</span>
          </div>
        </div>
      </div>

      {/* GROUND-TRUTH EVIDENCE TABS */}
      <div className="industrial-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-2 border-b border-border">
          <h3 className="text-xs font-bold text-navy-primary uppercase tracking-wider font-mono">
            GROUND-TRUTH EVIDENCE
          </h3>

          <div className="flex items-center space-x-1 bg-canvas p-1 rounded-lg border border-border">
            <button
              onClick={() => setActiveEvidenceTab('equipment')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                activeEvidenceTab === 'equipment'
                  ? 'bg-navy-primary text-white shadow-sm'
                  : 'text-navy-muted hover:bg-slate-200/60'
              }`}
            >
              Equipment Telemetry
            </button>
            <button
              onClick={() => setActiveEvidenceTab('weather')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                activeEvidenceTab === 'weather'
                  ? 'bg-navy-primary text-white shadow-sm'
                  : 'text-navy-muted hover:bg-slate-200/60'
              }`}
            >
              Weather & Sump
            </button>
            <button
              onClick={() => setActiveEvidenceTab('blasting')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                activeEvidenceTab === 'blasting'
                  ? 'bg-navy-primary text-white shadow-sm'
                  : 'text-navy-muted hover:bg-slate-200/60'
              }`}
            >
              Blasting Schedule
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeEvidenceTab === 'equipment' && (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-canvas border-b border-border font-mono uppercase text-[10px] text-navy-muted">
                <tr>
                  <th className="py-2 px-3">Unit</th>
                  <th className="py-2 px-3">Location</th>
                  <th className="py-2 px-3">Availability</th>
                  <th className="py-2 px-3">Downtime</th>
                  <th className="py-2 px-3">Impact</th>
                  <th className="py-2 px-3">Telemetry Diagnosis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {EQUIPMENT_FLEET.map((eq) => (
                  <tr key={eq.id} className={eq.failureRisk === 'Critical' ? 'bg-red-50/40 font-semibold' : ''}>
                    <td className="py-2 px-3 font-mono text-navy-primary">{eq.name}</td>
                    <td className="py-2 px-3 text-slate-600">{eq.zone}</td>
                    <td className="py-2 px-3 font-mono">{eq.availability}%</td>
                    <td className="py-2 px-3 font-mono">{eq.downtimeHours} hrs</td>
                    <td className="py-2 px-3 font-mono text-red-600">{eq.productionImpact}%</td>
                    <td className="py-2 px-3 text-[11px] text-slate-600">{eq.lastSensorAlert}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeEvidenceTab === 'weather' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-canvas border border-border rounded-lg">
              <span className="text-[10px] text-navy-muted block">Rainfall (24h)</span>
              <span className="text-lg font-bold font-mono text-blue-600">{WEATHER_STATUS.rainfallMm} mm</span>
              <span className="text-[10px] text-amber-700 block mt-0.5">Heavy shower</span>
            </div>
            <div className="p-3 bg-canvas border border-border rounded-lg">
              <span className="text-[10px] text-navy-muted block">Soil Moisture</span>
              <span className="text-lg font-bold font-mono text-cyan-600">{WEATHER_STATUS.soilMoisturePercent}%</span>
              <span className="text-[10px] text-red-600 block mt-0.5">Saturated sump</span>
            </div>
            <div className="p-3 bg-canvas border border-border rounded-lg">
              <span className="text-[10px] text-navy-muted block">Surface Temp</span>
              <span className="text-lg font-bold font-mono text-orange-600">{WEATHER_STATUS.surfaceTempC}°C</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Normal</span>
            </div>
            <div className="p-3 bg-canvas border border-border rounded-lg">
              <span className="text-[10px] text-navy-muted block">Operational Risk</span>
              <span className="text-lg font-bold font-mono text-red-600">{WEATHER_STATUS.operationalRisk}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Ramp B-2 caution</span>
            </div>
          </div>
        )}

        {activeEvidenceTab === 'blasting' && (
          <div className="space-y-2 text-xs">
            {BLASTING_STATUS.map((blast) => (
              <div key={blast.id} className="p-3 bg-canvas border border-border rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-bold font-mono text-navy-primary">{blast.blastId}</span>
                  <p className="text-[11px] text-navy-secondary mt-0.5">{blast.clearanceReason}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-amber-100 text-amber-800">
                    {blast.status} ({blast.delayDays}d delay)
                  </span>
                  <span className="text-[10px] text-red-600 block mt-0.5">
                    Deferred: {blast.plannedVolumeTons - blast.delayedVolumeTons} t
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer: Route to Decision Center */}
      <div className="flex items-center justify-between p-4 bg-canvas rounded-xl border border-border text-xs">
        <span className="text-navy-secondary">
          AI suggests <strong>Option A (Zone C Fleet Redeployment)</strong> to mitigate the 72% shortfall risk.
        </span>

        <button
          onClick={() => setCurrentScreen('decision-center')}
          className="px-4 py-2 bg-mining-blue hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm flex items-center space-x-1.5 transition-colors"
        >
          <span>VIEW RECOMMENDATION IN DECISION CENTER</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
