import React from 'react';
import { useMining } from '../../context/MiningContext';
import { PRODUCTION_TRAJECTORY_DATA, RISK_FACTORS, ACTIVE_ALERTS } from '../../data/miningData';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Sliders,
  CheckCircle,
  Sparkles,
  Info,
  FileText,
} from 'lucide-react';

export const CommandCenter: React.FC = () => {
  const {
    setCurrentScreen,
    loadPresetScenario,
    alerts,
    setIsStopWorkModalOpen,
    openReportModal,
  } = useMining();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-navy-primary tracking-tight">COMMAND CENTER</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
              SHORTFALL RISK 72%
            </span>
          </div>
          <p className="text-xs text-navy-muted mt-0.5">
            Primary Question: <span className="font-semibold text-navy-secondary">“What is happening right now?”</span> • Balaghat Mine Block 04 Operational Decision Support
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={openReportModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-surface hover:bg-slate-100 border border-border text-xs font-semibold text-navy-primary rounded-lg shadow-xs transition-colors"
            title="Generate and view official operational shift report"
          >
            <FileText className="w-3.5 h-3.5 text-mining-blue" />
            <span>Generate Shift Report</span>
          </button>
          <span className="text-[11px] text-navy-muted font-mono bg-canvas px-2.5 py-1 rounded border border-border hidden md:inline-block">
            Shift B • Week 36 [Demo Scenario]
          </span>
        </div>
      </div>

      {/* TOP 4 HERO KPIS (Clear, Open, Spacious — Understandable in 5 Seconds) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="industrial-card p-4 border-l-4 border-l-blue-600">
          <span className="text-[11px] font-bold text-navy-muted uppercase tracking-wider block font-mono">
            Expected Production
          </span>
          <div className="text-2xl font-black font-mono text-navy-primary mt-1">18,400 t</div>
          <span className="text-[11px] text-slate-500">Predicted weekly run-rate</span>
        </div>

        <div className="industrial-card p-4 border-l-4 border-l-slate-400">
          <span className="text-[11px] font-bold text-navy-muted uppercase tracking-wider block font-mono">
            Production Target
          </span>
          <div className="text-2xl font-black font-mono text-navy-primary mt-1">20,000 t</div>
          <span className="text-[11px] text-slate-500">Weekly contractual quota</span>
        </div>

        <div className="industrial-card p-4 border-l-4 border-l-amber-500 bg-amber-50/25">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block font-mono">
            Projected Shortfall
          </span>
          <div className="text-2xl font-black font-mono text-amber-700 mt-1">-1,600 t</div>
          <span className="text-[11px] text-amber-700 font-semibold">8.0% shortfall deficit</span>
        </div>

        <div className="industrial-card p-4 border-l-4 border-l-red-600 bg-red-50/25">
          <span className="text-[11px] font-bold text-red-800 uppercase tracking-wider block font-mono">
            Shortfall Risk
          </span>
          <div className="text-2xl font-black font-mono text-red-600 mt-1">72%</div>
          <span className="text-[11px] font-extrabold text-red-700 uppercase">HIGH RISK WARNING</span>
        </div>
      </div>

      {/* MAIN VISUAL SECTION: Trajectory Chart & Why? Risk Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Large Production Trajectory Chart (7 Cols) */}
        <div className="lg:col-span-7 industrial-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-navy-primary">Production Trajectory & Forecast Gap</h3>
              <p className="text-xs text-navy-muted">Daily actuals (Day 1–4) vs predictive trajectory (Day 5–7)</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-canvas border border-border text-navy-muted">
              Target: 2,850 t/day
            </span>
          </div>

          <div className="h-64 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={PRODUCTION_TRAJECTORY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis domain={[2000, 3200]} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value: any, name: any) => [`${value} t`, name]}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area
                  type="monotone"
                  dataKey="forecast"
                  name="Forecast Trajectory"
                  stroke="#2563EB"
                  fill="#DBEAFE"
                  fillOpacity={0.4}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Actual Output"
                  stroke="#0B192C"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#0B192C' }}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="Target Quota"
                  stroke="#94A3B8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="p-2.5 bg-canvas rounded-lg border border-border flex items-center justify-between text-xs">
            <span className="text-navy-secondary">
              Deficit gap of <strong>1,600 tonnes</strong> projected by Day 7 without operational intervention.
            </span>
            <button
              onClick={() => setCurrentScreen('risk-explainability')}
              className="text-mining-blue hover:text-blue-800 font-semibold flex items-center space-x-1"
            >
              <span>Explain Why</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Shortfall Risk "WHY?" Breakdown (5 Cols) */}
        <div className="lg:col-span-5 industrial-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h3 className="text-sm font-bold text-navy-primary">SHORTFALL RISK: 72%</h3>
                <span className="text-xs text-red-600 font-bold uppercase font-mono">HIGH RISK</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">[Model Attribution]</span>
            </div>

            <div className="mt-4 space-y-3">
              <span className="text-[11px] font-bold text-navy-primary uppercase tracking-wider block font-mono">
                WHY IS THE RISK HIGH?
              </span>

              {RISK_FACTORS.map((factor, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-navy-secondary font-medium truncate max-w-[220px]">
                      {factor.factor.split('(')[0]}
                    </span>
                    <span className="font-mono font-bold text-red-600">
                      +{factor.impactPercent}% Risk
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-red-600 transition-all duration-300"
                      style={{ width: `${(factor.impactPercent / 30) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-border mt-3 flex items-center justify-between text-xs">
            <span className="text-navy-muted">Fleet availability: <strong>71.2%</strong> (Target: 85%)</span>
            <button
              onClick={() => setCurrentScreen('risk-explainability')}
              className="text-mining-blue hover:text-blue-800 font-semibold flex items-center space-x-1"
            >
              <span>View SHAP Factors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* AI RECOMMENDATION HERO CARD */}
      <div className="industrial-card p-5 border-l-4 border-l-mining-blue bg-gradient-to-r from-white via-white to-blue-50/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-mining-blue border border-blue-200">
                AI RECOMMENDATION
              </span>
              <span className="text-xs text-navy-muted">• Option A: Dynamic Zone Redeployment</span>
            </div>
            <h3 className="text-base font-bold text-navy-primary">
              Prioritize Zone C, Redeploy Equipment from Zone B, and Adjust Blasting
            </h3>
            <p className="text-xs text-navy-secondary leading-relaxed">
              Mobilizing standby Excavator E14 and haul units to dry Zone C recovers approximately <strong>+825 tonnes</strong>, reducing shortfall risk from <strong>72% down to 35%</strong>.
            </p>
          </div>

          {/* Action Launcher */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                loadPresetScenario('recommended');
                setCurrentScreen('what-if-simulator');
              }}
              className="px-4 py-2.5 bg-mining-blue hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center space-x-2 transition-colors"
            >
              <Sliders className="w-4 h-4" />
              <span>TEST IN SIMULATOR</span>
            </button>

            <button
              onClick={() => setCurrentScreen('decision-center')}
              className="px-4 py-2.5 bg-navy-primary hover:bg-navy-secondary text-white text-xs font-bold rounded-lg shadow-sm flex items-center space-x-2 transition-colors"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>REVIEW DECISION</span>
            </button>

            <button
              onClick={() => setCurrentScreen('risk-explainability')}
              className="px-3 py-2.5 bg-surface hover:bg-slate-100 border border-border text-navy-primary text-xs font-semibold rounded-lg transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* ACTIVE PRIORITY ALERTS (Compact) */}
      <div className="industrial-card p-4">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold text-navy-primary uppercase tracking-wider font-mono">
              Active Priority Alerts ({ACTIVE_ALERTS.length})
            </h3>
          </div>
          <span className="text-[10px] text-navy-muted font-mono">[Real-time Telemetry Stream]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {ACTIVE_ALERTS.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border text-xs flex flex-col justify-between ${
                alert.severity === 'critical'
                  ? 'bg-red-50/40 border-red-200'
                  : alert.severity === 'high'
                  ? 'bg-amber-50/30 border-amber-200'
                  : 'bg-canvas border-border'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded uppercase ${
                      alert.severity === 'critical'
                        ? 'bg-red-600 text-white'
                        : alert.severity === 'high'
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {alert.severity}
                  </span>
                  <span className="text-[10px] text-navy-muted">{alert.timestamp}</span>
                </div>
                <h4 className="font-bold text-navy-primary leading-snug">{alert.title}</h4>
                <p className="text-[11px] text-navy-secondary mt-1 line-clamp-2">{alert.summary}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                {alert.isStopWork ? (
                  <button
                    onClick={() => setIsStopWorkModalOpen(true)}
                    className="text-[11px] font-bold text-red-600 hover:text-red-800 flex items-center space-x-1"
                  >
                    <span>Stop-Work Protocol</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setCurrentScreen('risk-explainability')}
                      className="text-[11px] font-semibold text-mining-blue hover:text-blue-800"
                    >
                      View Cause
                    </button>
                    <button
                      onClick={() => {
                        loadPresetScenario('recommended');
                        setCurrentScreen('what-if-simulator');
                      }}
                      className="text-[11px] font-medium text-slate-600 hover:text-navy-primary flex items-center space-x-0.5"
                    >
                      <span>Simulate</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
