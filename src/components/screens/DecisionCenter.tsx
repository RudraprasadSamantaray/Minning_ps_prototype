import React, { useState } from 'react';
import { useMining } from '../../context/MiningContext';
import { DECISION_OPTIONS } from '../../data/miningData';
import {
  CheckCircle2,
  Edit3,
  XCircle,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Lock,
  Clock,
  UserCheck,
  Check,
  Play,
  RotateCcw,
  FileText,
} from 'lucide-react';

export const DecisionCenter: React.FC = () => {
  const {
    selectedOptionId,
    setSelectedOptionId,
    decisionStatus,
    approveDecision,
    setIsModifyModalOpen,
    rejectDecision,
    executionTasks,
    toggleTaskStatus,
    lastDecisionNote,
    setIsStopWorkModalOpen,
    setCurrentScreen,
    openReportModal,
  } = useMining();

  const [rejectReason, setRejectReason] = useState('');
  const [showRejectBox, setShowRejectBox] = useState(false);

  const activeOption = DECISION_OPTIONS.find((o) => o.id === selectedOptionId) || DECISION_OPTIONS[0];

  const handleReject = () => {
    rejectDecision(rejectReason || 'Operational constraint: Alternative required.');
    setShowRejectBox(false);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-navy-primary tracking-tight">
              DECISION & EXECUTION CENTER
            </h1>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase ${
                decisionStatus === 'approved'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : decisionStatus === 'modified'
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : decisionStatus === 'rejected'
                  ? 'bg-red-100 text-red-800 border border-red-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}
            >
              STATUS: {decisionStatus}
            </span>
          </div>
          <p className="text-xs text-navy-muted mt-0.5">
            Primary Question: <span className="font-semibold text-navy-secondary">“What should the manager do?”</span> • Human-in-the-loop operational authorization
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={openReportModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-surface hover:bg-slate-100 border border-border text-xs font-semibold text-navy-primary rounded-lg shadow-xs transition-colors"
            title="Generate and view official operational shift report"
          >
            <FileText className="w-3.5 h-3.5 text-mining-blue" />
            <span>Generate Shift Report</span>
          </button>

          <button
            onClick={() => setIsStopWorkModalOpen(true)}
            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-800 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
            <span>Stop-Work Protocol</span>
          </button>
        </div>
      </div>

      {/* WARNING HEADER BANNER */}
      <div className="industrial-card p-4 bg-amber-50/40 border-l-4 border-l-amber-500 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold text-amber-900 uppercase font-mono">
              PRODUCTION SHORTFALL DETECTED
            </span>
          </div>
          <p className="text-xs text-amber-950">
            Current Risk: <strong>72% High Risk</strong> • Projected Shortfall Gap: <strong>-1,600 tonnes</strong>
          </p>
        </div>

        <div className="p-2 bg-white rounded border border-amber-200 text-[11px] text-amber-900 flex items-center space-x-2">
          <Lock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>Human Authority Principle: AI recommends; Manager authorizes.</span>
        </div>
      </div>

      {/* OPTIONS COMPARISON MATRIX (3 Cards) */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-navy-primary uppercase tracking-wider font-mono">
          COMPARE OPERATIONAL INTERVENTIONS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DECISION_OPTIONS.map((option) => {
            const isSelected = selectedOptionId === option.id;
            return (
              <div
                key={option.id}
                onClick={() => setSelectedOptionId(option.id)}
                className={`industrial-card p-4 cursor-pointer transition-all flex flex-col justify-between relative ${
                  isSelected
                    ? 'ring-2 ring-mining-blue border-transparent shadow-md'
                    : 'hover:border-slate-400'
                } ${option.isAiPreferred ? 'bg-gradient-to-b from-blue-50/30 to-white' : ''}`}
              >
                {option.isAiPreferred && (
                  <div className="absolute -top-2.5 right-4 bg-mining-blue text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow">
                    AI PREFERRED
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-bold text-navy-primary leading-tight mt-1">
                    {option.title}
                  </h4>
                  <span className="text-[10px] text-navy-muted font-medium block mt-0.5">
                    {option.tagline}
                  </span>

                  <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                    <div className="p-2 bg-canvas rounded border border-border">
                      <span className="text-[10px] text-navy-muted block">Recovery</span>
                      <span className="font-bold font-mono text-emerald-600">
                        +{option.expectedRecoveryTons} t
                      </span>
                    </div>
                    <div className="p-2 bg-canvas rounded border border-border">
                      <span className="text-[10px] text-navy-muted block">Risk Level</span>
                      <span className="font-bold font-mono text-navy-primary">
                        {option.resultingRiskPercent}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <span className="text-[10px] font-semibold text-navy-muted uppercase block">
                      Key Actions:
                    </span>
                    <ul className="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                      {option.actions.slice(0, 2).map((act, i) => (
                        <li key={i}>{act}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-500">
                    Opex: {option.opexImpact}
                  </span>
                  <span
                    className={`font-semibold text-[11px] ${
                      isSelected ? 'text-mining-blue' : 'text-slate-400'
                    }`}
                  >
                    {isSelected ? '✓ Selected' : 'Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MANAGER DECISION ACTION CENTER */}
      <div className="industrial-card p-5 bg-canvas/60 border border-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-navy-primary" />
              <h3 className="text-sm font-bold text-navy-primary">
                Manager Decision on {activeOption.title.split(':')[0]}
              </h3>
            </div>
            <p className="text-xs text-navy-secondary mt-1 max-w-xl">
              Approving commits the operational plan to shift execution. Modifying opens parameter adjustment. Rejecting requests alternative feasible strategies.
            </p>
            {lastDecisionNote && (
              <p className="text-[11px] text-blue-900 bg-blue-50 border border-blue-200 p-2 rounded mt-2">
                <strong>Recorded Decision Note:</strong> {lastDecisionNote}
              </p>
            )}
          </div>

          {/* Decision Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => approveDecision(activeOption.id)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow flex items-center space-x-1.5 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>APPROVE PLAN</span>
            </button>

            <button
              onClick={() => setIsModifyModalOpen(true)}
              className="px-4 py-2.5 bg-surface hover:bg-slate-100 border border-border text-navy-primary rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Edit3 className="w-4 h-4 text-mining-blue" />
              <span>MODIFY</span>
            </button>

            <button
              onClick={() => setShowRejectBox(!showRejectBox)}
              className="px-4 py-2.5 bg-surface hover:bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <XCircle className="w-4 h-4 text-red-500" />
              <span>REJECT / REVISE</span>
            </button>
          </div>
        </div>

        {/* Reject / Alternative Reason Input Box */}
        {showRejectBox && (
          <div className="mt-4 p-3.5 bg-surface border border-red-200 rounded-lg text-xs space-y-2 animate-fade-in">
            <label className="font-semibold text-navy-primary block">
              Reason for Rejection / Alternative Requirements:
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Sump pump capacity is reserved for Ramp A. Request plan using low-grade blending."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full text-xs p-2 rounded border border-border text-navy-primary focus:outline-none"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowRejectBox(false)}
                className="px-3 py-1 text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-semibold"
              >
                Submit Rejection
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ACTION EXECUTION TRACKER */}
      <div className="industrial-card p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-mining-blue" />
            <h3 className="text-xs font-bold text-navy-primary uppercase tracking-wider font-mono">
              OPERATIONAL EXECUTION TRACKER
            </h3>
          </div>
          <span className="text-[11px] text-navy-muted">
            Click task status badge to toggle progress
          </span>
        </div>

        <div className="space-y-3">
          {executionTasks.map((task) => (
            <div
              key={task.id}
              className="p-3.5 bg-canvas border border-border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-navy-primary">{task.title}</span>
                  <span className="font-mono text-[10px] text-slate-500">[{task.zone}]</span>
                </div>
                <div className="flex items-center space-x-3 text-[11px] text-navy-muted">
                  <span>Role: <strong>{task.assignedRole}</strong></span>
                  <span>•</span>
                  <span>Lead: <strong>{task.responsibleLead}</strong></span>
                  <span>•</span>
                  <span>Est: {task.estimatedCompletion}</span>
                </div>
              </div>

              {/* Status and interactive progress toggle */}
              <div className="flex items-center space-x-3 self-end sm:self-center">
                <div className="w-24 hidden md:block">
                  <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
                    <span>Progress</span>
                    <span>{task.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        task.status === 'completed'
                          ? 'bg-emerald-600'
                          : task.status === 'in_progress'
                          ? 'bg-blue-600'
                          : 'bg-slate-400'
                      }`}
                      style={{ width: `${task.progressPercent}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center space-x-1.5 ${
                    task.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : task.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                  title="Click to advance status"
                >
                  {task.status === 'completed' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                  ) : null}
                  <span>{task.status.replace('_', ' ')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer to Outcome Monitoring */}
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
          <span className="text-navy-muted">
            All execution logs are recorded in the continuous feedback registry.
          </span>
          <button
            onClick={() => setCurrentScreen('outcome-learning')}
            className="text-mining-blue hover:text-blue-800 font-semibold flex items-center space-x-1"
          >
            <span>Proceed to Outcome Monitoring</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
