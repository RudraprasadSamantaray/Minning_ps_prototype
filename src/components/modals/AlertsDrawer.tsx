import React, { useState } from 'react';
import { useMining } from '../../context/MiningContext';
import {
  X,
  Bell,
  AlertTriangle,
  ShieldAlert,
  Play,
  ArrowRight,
  CheckCircle2,
  Filter,
} from 'lucide-react';

export const AlertsDrawer: React.FC = () => {
  const {
    isAlertsDrawerOpen,
    setIsAlertsDrawerOpen,
    alerts,
    dismissAlert,
    setCurrentScreen,
    setIsStopWorkModalOpen,
    testInSimulatorWithZone,
    loadPresetScenario,
  } = useMining();

  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'high'>('all');

  if (!isAlertsDrawerOpen) return null;

  const filteredAlerts = alerts.filter((a) => {
    if (filterSeverity === 'all') return true;
    return a.severity === filterSeverity;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-primary/20 backdrop-blur-[2px] pointer-events-auto transition-opacity"
        onClick={() => setIsAlertsDrawerOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-lg bg-surface h-full shadow-2xl border-l border-border pointer-events-auto flex flex-col justify-between overflow-y-auto animate-slide-left z-10">
        <div>
          {/* Header */}
          <div className="p-5 border-b border-border bg-canvas/70 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-navy-primary text-white rounded-lg">
                <Bell className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-navy-primary">Alerts & Escalation Engine</h3>
                <p className="text-xs text-navy-muted">Real-time Operational and Safety Warnings</p>
              </div>
            </div>

            <button
              onClick={() => setIsAlertsDrawerOpen(false)}
              className="p-1.5 text-navy-muted hover:text-navy-primary hover:bg-surface-subtle rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Pills */}
          <div className="p-3.5 border-b border-border bg-canvas/40 flex items-center space-x-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-navy-muted" />
            <span className="text-navy-muted text-[11px] font-medium">Filter:</span>
            <button
              onClick={() => setFilterSeverity('all')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                filterSeverity === 'all'
                  ? 'bg-navy-primary text-white'
                  : 'bg-surface border border-border text-navy-muted'
              }`}
            >
              All Alerts ({alerts.length})
            </button>
            <button
              onClick={() => setFilterSeverity('critical')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                filterSeverity === 'critical'
                  ? 'bg-red-600 text-white'
                  : 'bg-surface border border-border text-red-700'
              }`}
            >
              Critical
            </button>
            <button
              onClick={() => setFilterSeverity('high')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                filterSeverity === 'high'
                  ? 'bg-amber-500 text-white'
                  : 'bg-surface border border-border text-amber-700'
              }`}
            >
              High Risk
            </button>
          </div>

          {/* Alert Cards */}
          <div className="p-5 space-y-3.5">
            {filteredAlerts.length === 0 ? (
              <div className="p-8 text-center text-navy-muted text-xs">
                No alerts matching the selected filter.
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border transition-all ${
                    alert.severity === 'critical'
                      ? 'bg-red-50/50 border-red-300'
                      : alert.severity === 'high'
                      ? 'bg-amber-50/40 border-amber-300'
                      : 'bg-canvas border-border'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded uppercase ${
                          alert.severity === 'critical'
                            ? 'bg-red-600 text-white'
                            : alert.severity === 'high'
                            ? 'bg-amber-500 text-white'
                            : 'bg-slate-200 text-slate-800'
                        }`}
                      >
                        {alert.severity}
                      </span>
                      <span className="text-[11px] text-navy-muted">{alert.timestamp}</span>
                    </div>

                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="text-slate-400 hover:text-slate-600 text-[11px]"
                      title="Dismiss notification"
                    >
                      Dismiss
                    </button>
                  </div>

                  <h4 className="text-xs font-bold text-navy-primary mt-2">{alert.title}</h4>
                  <p className="text-xs text-navy-secondary mt-1 leading-relaxed">
                    {alert.summary}
                  </p>

                  {/* Causes */}
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {alert.causeFactors.map((c, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded font-medium text-slate-700"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Buttons */}
                  <div className="mt-3.5 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-xs">
                    {alert.isStopWork ? (
                      <button
                        onClick={() => {
                          setIsAlertsDrawerOpen(false);
                          setIsStopWorkModalOpen(true);
                        }}
                        className="w-full py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <ShieldAlert className="w-4 h-4" />
                        <span>REVIEW STOP-WORK PROTOCOL</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setIsAlertsDrawerOpen(false);
                            setCurrentScreen('risk-explainability');
                          }}
                          className="text-mining-blue hover:text-blue-800 font-semibold flex items-center space-x-1 text-xs"
                        >
                          <span>View Cause (SHAP)</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            setIsAlertsDrawerOpen(false);
                            loadPresetScenario('recommended');
                            setCurrentScreen('what-if-simulator');
                          }}
                          className="px-2.5 py-1 bg-surface border border-slate-300 hover:bg-slate-100 text-navy-primary font-medium rounded text-xs flex items-center space-x-1"
                        >
                          <Play className="w-3 h-3 fill-current text-mining-blue" />
                          <span>Test in Simulator</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-canvas/80 text-xs text-navy-muted flex items-center justify-between">
          <span>Active Duty Dispatch: Balaghat Shift B</span>
          <span className="font-mono text-emerald-700 font-semibold">99.8% System Uptime</span>
        </div>
      </div>
    </div>
  );
};
