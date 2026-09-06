import React from 'react';
import { useMining } from '../../context/MiningContext';
import {
  DATA_QUALITY_SOURCES,
} from '../../data/miningData';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  RotateCcw,
  Database,
  ArrowRight,
  GitCommit,
} from 'lucide-react';

export const OutcomeLearning: React.FC = () => {
  const { setCurrentScreen, setIsAuditTrailOpen } = useMining();

  const cycleComparisonData = [
    { name: 'Week 33', Predicted: 18500, Actual: 18120 },
    { name: 'Week 34', Predicted: 19800, Actual: 19650 },
    { name: 'Week 35 (Prior)', Predicted: 19200, Actual: 18920 },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-navy-primary tracking-tight">
              OUTCOME MONITORING & CONTINUOUS LEARNING
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              FEEDBACK LOOP ACTIVE
            </span>
          </div>
          <p className="text-xs text-navy-muted mt-0.5">
            Primary Question: <span className="font-semibold text-navy-secondary">“DID THE DECISION WORK?”</span> • Continuous learning cycle: Predict ➔ Act ➔ Measure ➔ Learn
          </p>
        </div>

        <button
          onClick={() => setIsAuditTrailOpen(true)}
          className="px-3.5 py-1.5 bg-surface hover:bg-slate-100 border border-border text-navy-primary rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors self-start sm:self-auto"
        >
          <span>Open Full Audit Trail</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* TOP OUTCOME HERO CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="industrial-card p-4 border-l-4 border-l-blue-600">
          <span className="text-[11px] font-bold text-navy-muted uppercase block font-mono">
            AI Model Prediction
          </span>
          <div className="text-2xl font-black font-mono text-navy-primary mt-1">19,225 t</div>
          <span className="text-[11px] text-slate-500">Post-Option A simulation</span>
        </div>

        <div className="industrial-card p-4 border-l-4 border-l-emerald-600 bg-emerald-50/20">
          <span className="text-[11px] font-bold text-emerald-800 uppercase block font-mono">
            Actual Production Achieved
          </span>
          <div className="text-2xl font-black font-mono text-emerald-700 mt-1">18,920 t</div>
          <span className="text-[11px] text-emerald-700 font-medium">Recorded at weighbridge scale</span>
        </div>

        <div className="industrial-card p-4 border-l-4 border-l-teal-600">
          <span className="text-[11px] font-bold text-navy-muted uppercase block font-mono">
            Prediction Error / Variance
          </span>
          <div className="text-2xl font-black font-mono text-teal-800 mt-1">-305 t (-1.5%)</div>
          <span className="text-[11px] text-emerald-600 font-semibold">98.4% Accuracy [Demo Result]</span>
        </div>

        <div className="industrial-card p-4 border-l-4 border-l-purple-600">
          <span className="text-[11px] font-bold text-navy-muted uppercase block font-mono">
            Model Weight Calibration
          </span>
          <div className="text-2xl font-black font-mono text-purple-900 mt-1">Updated</div>
          <span className="text-[11px] text-purple-700 font-medium">Error fed back into model</span>
        </div>
      </div>

      {/* DECISION JOURNEY TIMELINE */}
      <div className="industrial-card p-5">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <div className="flex items-center space-x-2">
            <GitCommit className="w-4 h-4 text-mining-blue" />
            <h3 className="text-xs font-bold text-navy-primary uppercase tracking-wider font-mono">
              END-TO-END DECISION JOURNEY
            </h3>
          </div>
          <span className="text-[10px] text-navy-muted font-mono">[Demonstration Traceability]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
          <div className="p-3 bg-canvas rounded-lg border border-border space-y-1">
            <span className="text-[10px] font-bold font-mono text-red-600 uppercase">1. PREDICTION</span>
            <h4 className="font-bold text-xs text-navy-primary">72% Shortfall Risk</h4>
            <p className="text-[11px] text-slate-600">Forecasted 1,600t deficit driven by equipment downtime and rainfall.</p>
          </div>

          <div className="p-3 bg-canvas rounded-lg border border-border space-y-1">
            <span className="text-[10px] font-bold font-mono text-blue-600 uppercase">2. AI RECOMMENDATION</span>
            <h4 className="font-bold text-xs text-navy-primary">Option A: Zone C</h4>
            <p className="text-[11px] text-slate-600">Suggested redeploying E14 to dry Zone C and advancing Blast #105.</p>
          </div>

          <div className="p-3 bg-canvas rounded-lg border border-border space-y-1">
            <span className="text-[10px] font-bold font-mono text-purple-600 uppercase">3. MANAGER DECISION</span>
            <h4 className="font-bold text-xs text-navy-primary">Authorized Plan</h4>
            <p className="text-[11px] text-slate-600">Approved by R. Sengupta (Chief Mine Manager) with blasting buffer tuning.</p>
          </div>

          <div className="p-3 bg-canvas rounded-lg border border-border space-y-1">
            <span className="text-[10px] font-bold font-mono text-amber-600 uppercase">4. ACTION DISPATCH</span>
            <h4 className="font-bold text-xs text-navy-primary">Fleet Redeployed</h4>
            <p className="text-[11px] text-slate-600">S. Verma mobilized 3 haul trucks; P. Nair energized mobile sump pump.</p>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-300 space-y-1">
            <span className="text-[10px] font-bold font-mono text-emerald-800 uppercase">5. ACTUAL RESULT</span>
            <h4 className="font-bold text-xs text-emerald-950">18,920 Tonnes</h4>
            <p className="text-[11px] text-emerald-900 font-medium">Over 98% of target recovered with -305t residual variance.</p>
          </div>
        </div>
      </div>

      {/* CONTINUOUS LEARNING LOOP & MODEL PERFORMANCE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Circular Continuous Learning Closed Loop Visual */}
        <div className="lg:col-span-6 industrial-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-mining-blue" />
                <h3 className="text-xs font-bold text-navy-primary uppercase tracking-wider font-mono">
                  CONTINUOUS LEARNING CLOSED LOOP
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">[Illustrative Loop]</span>
            </div>

            <div className="my-3 flex items-center justify-center">
              <svg viewBox="0 0 400 300" className="w-full max-w-sm select-none">
                <circle cx="200" cy="150" r="40" fill="#0B192C" />
                <text x="200" y="146" textAnchor="middle" fill="#38BDF8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  DECISION
                </text>
                <text x="200" y="160" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  LEARNING
                </text>

                <circle cx="200" cy="150" r="105" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6 4" />

                <g>
                  <circle cx="200" cy="45" r="26" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
                  <text x="200" y="44" textAnchor="middle" fill="#065F46" fontSize="9" fontWeight="bold">ACTUAL</text>
                  <text x="200" y="55" textAnchor="middle" fill="#047857" fontSize="8">OUTCOME</text>
                </g>

                <g>
                  <circle cx="305" cy="115" r="26" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                  <text x="305" y="114" textAnchor="middle" fill="#1E40AF" fontSize="9" fontWeight="bold">CALCULATE</text>
                  <text x="305" y="125" textAnchor="middle" fill="#1D4ED8" fontSize="8">ERROR Δ</text>
                </g>

                <g>
                  <circle cx="265" cy="235" r="26" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2" />
                  <text x="265" y="234" textAnchor="middle" fill="#5B21B6" fontSize="9" fontWeight="bold">STORE</text>
                  <text x="265" y="245" textAnchor="middle" fill="#6D28D9" fontSize="8">MEMORY</text>
                </g>

                <g>
                  <circle cx="135" cy="235" r="26" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" />
                  <text x="135" y="234" textAnchor="middle" fill="#92400E" fontSize="9" fontWeight="bold">UPDATE</text>
                  <text x="135" y="245" textAnchor="middle" fill="#B45309" fontSize="8">WEIGHTS</text>
                </g>

                <g>
                  <circle cx="95" cy="115" r="26" fill="#FFFFFF" stroke="#0B192C" strokeWidth="2" />
                  <text x="95" y="114" textAnchor="middle" fill="#0B192C" fontSize="9" fontWeight="bold">IMPROVE</text>
                  <text x="95" y="125" textAnchor="middle" fill="#1E293B" fontSize="8">PREDICTION</text>
                </g>
              </svg>
            </div>
          </div>

          <div className="p-2.5 bg-canvas rounded-lg border border-border text-xs text-navy-secondary">
            <span>
              <strong>Core Idea:</strong> The system stores each shift outcome, calculates model error, and updates future forecasting accuracy over time.
            </span>
          </div>
        </div>

        {/* Historical Shift Comparison Chart */}
        <div className="lg:col-span-6 industrial-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-xs font-bold text-navy-primary uppercase tracking-wider font-mono">
                PREDICTED VS ACTUAL HISTORICAL PERFORMANCE
              </h3>
              <span className="text-[10px] font-mono text-slate-400">[Demo Cycles]</span>
            </div>

            <div className="h-56 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cycleComparisonData} margin={{ top: 15, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis domain={[17000, 20500]} tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(val: any) => [`${val} t`, 'Output']}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                  <Bar dataKey="Predicted" fill="#2563EB" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Actual" fill="#059669" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-2.5 border-t border-border mt-2 text-[11px] text-slate-500">
            Simulated demonstration metric: Calibrated against weighbridge scale readings.
          </div>
        </div>
      </div>

      {/* SUPPORTING DATA QUALITY SUMMARY (Compact, Not Dominant) */}
      <div className="industrial-card p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 mb-3 border-b border-border">
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-mining-blue" />
            <h3 className="text-xs font-bold text-navy-primary uppercase tracking-wider font-mono">
              DATA HEALTH (94% AI-READY)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-navy-muted">
            Pipeline: Raw ➔ Validate ➔ Clean ➔ Align ➔ Standardize ➔ AI-Ready
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
          {DATA_QUALITY_SOURCES.map((src, i) => (
            <div key={i} className="p-2.5 bg-canvas rounded-lg border border-border">
              <span className="font-bold text-navy-primary block truncate">{src.name.split('(')[0]}</span>
              <div className="flex items-center justify-between mt-1 text-[11px]">
                <span className="font-mono text-emerald-700 font-bold">{src.healthPercent}%</span>
                <span className="text-[10px] text-slate-500">{src.latencySeconds}s delay</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
