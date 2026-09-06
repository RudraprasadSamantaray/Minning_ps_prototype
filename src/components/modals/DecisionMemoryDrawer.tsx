import React from 'react';
import { useMining } from '../../context/MiningContext';
import { OUTCOME_HISTORY } from '../../data/miningData';
import { X, History, ShieldCheck, UserCheck } from 'lucide-react';

export const DecisionMemoryDrawer: React.FC = () => {
  const { isAuditTrailOpen, setIsAuditTrailOpen, decisionStatus, lastDecisionNote } = useMining();

  if (!isAuditTrailOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-primary/20 backdrop-blur-[2px] pointer-events-auto transition-opacity"
        onClick={() => setIsAuditTrailOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-lg bg-surface h-full shadow-2xl border-l border-border pointer-events-auto flex flex-col justify-between overflow-y-auto animate-slide-left z-10">
        <div>
          {/* Header */}
          <div className="p-5 border-b border-border bg-canvas/70 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-navy-primary text-white rounded-lg">
                <History className="w-5 h-5 text-mining-blue" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-navy-primary">Decision Memory & Audit Log</h3>
                <p className="text-xs text-navy-muted">Traceability, Accountability & Human Authority</p>
              </div>
            </div>

            <button
              onClick={() => setIsAuditTrailOpen(false)}
              className="p-1.5 text-navy-muted hover:text-navy-primary hover:bg-surface-subtle rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Active Decision State */}
          <div className="p-5 border-b border-border bg-blue-50/40">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-navy-primary uppercase tracking-wide font-mono">
                Current Shift: Week 36 / Shift B
              </h4>
              <span className="text-[10px] font-mono text-slate-500">[Demo Log]</span>
            </div>
            <div className="p-3 bg-surface border border-blue-200 rounded-lg space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-navy-muted">Human Authorization Status:</span>
                <span
                  className={`px-2 py-0.5 rounded font-mono font-bold uppercase text-[11px] ${
                    decisionStatus === 'approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : decisionStatus === 'modified'
                      ? 'bg-blue-100 text-blue-800'
                      : decisionStatus === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {decisionStatus}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-navy-muted">Authorizing Officer:</span>
                <span className="font-semibold text-navy-primary">R. Sengupta (Chief Mine Manager)</span>
              </div>
              {lastDecisionNote && (
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-700">
                  <span className="font-semibold">Recorded Instruction: </span>
                  {lastDecisionNote}
                </div>
              )}
            </div>
          </div>

          {/* Chronological Audit Records */}
          <div className="p-5 space-y-4">
            <h4 className="text-xs font-bold text-navy-muted uppercase tracking-wider font-mono">
              Archived Shift Decision History
            </h4>

            {OUTCOME_HISTORY.map((item) => (
              <div
                key={item.cycleId}
                className="p-4 bg-canvas border border-border rounded-lg space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-navy-primary">{item.cycleId}</span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {item.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center space-x-1.5 text-navy-secondary">
                    <span className="font-semibold">Decision:</span>
                    <span>{item.decisionTaken}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200">
                    <div>
                      <span className="text-navy-muted block">Predicted</span>
                      <span className="font-mono font-bold text-navy-primary">
                        {item.predictedTons.toLocaleString()} t
                      </span>
                    </div>
                    <div>
                      <span className="text-navy-muted block">Actual</span>
                      <span className="font-mono font-bold text-navy-primary">
                        {item.actualTons.toLocaleString()} t
                      </span>
                    </div>
                    <div>
                      <span className="text-navy-muted block">Variance</span>
                      <span className="font-mono font-bold text-slate-700">
                        {item.varianceTons} t ({item.variancePercent}%)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-[10px] text-navy-muted pt-1">
                  <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Authorized by: {item.approvedBy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-canvas/80 text-[11px] text-navy-muted flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Decision Accountability Log</span>
          </div>
          <span className="font-mono text-[10px] text-slate-500">Balaghat Complex • Shift B</span>
        </div>
      </div>
    </div>
  );
};
