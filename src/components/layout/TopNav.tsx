import React, { useState } from 'react';
import { useMining } from '../../context/MiningContext';
import { MINE_METADATA } from '../../data/miningData';
import {
  Compass,
  ChevronDown,
  PlayCircle,
  AlertTriangle,
  History,
  Bell,
  Check,
  Radio,
  FileText,
} from 'lucide-react';

export const TopNav: React.FC = () => {
  const {
    alerts,
    setIsAlertsDrawerOpen,
    setIsStopWorkModalOpen,
    setIsAuditTrailOpen,
    openReportModal,
    startGuidedTour,
    guidedStep,
    exitGuidedTour,
  } = useMining();

  const [isMineDropdownOpen, setIsMineDropdownOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState('Mine Block 04');

  const criticalAlertsCount = alerts.filter(
    (a) => a.severity === 'critical' || a.severity === 'high'
  ).length;

  const mineBlocks = [
    { code: 'Mine Block 04', desc: 'Active Pit • Central Manganese Vein', status: 'Active Surveillance' },
    { code: 'Mine Block 02', desc: 'North Pit Bench • Inactive Shift', status: 'Standby' },
    { code: 'Ukwa Deep Seam', desc: 'Underground Exploration Drift', status: 'Surveying' },
  ];

  return (
    <header className="h-[60px] bg-surface border-b border-border px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {/* Brand & Complex Identity */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-navy-primary flex items-center justify-center text-white shadow-sm border border-slate-700">
            <Compass className="w-4 h-4 text-mining-blue" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-sm tracking-tight text-navy-primary font-mono">
                26009 AI MINING
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-mining-blue border border-blue-200">
                DECISION SUPPORT
              </span>
            </div>
            <p className="text-[10px] text-navy-muted hidden md:block">
              Balaghat Manganese Complex • Early Warning System
            </p>
          </div>
        </div>

        <div className="h-5 w-[1px] bg-border hidden sm:block" />

        {/* Interactive Mine Block Selector Dropdown */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setIsMineDropdownOpen(!isMineDropdownOpen)}
            className="flex items-center space-x-2 bg-canvas hover:bg-slate-100 border border-border px-2.5 py-1.5 rounded-md text-xs transition-colors"
          >
            <span className="text-navy-muted">Sector:</span>
            <span className="font-semibold text-navy-primary">{selectedBlock}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isMineDropdownOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-64 bg-surface border border-border rounded-lg shadow-xl p-1 z-50 animate-fade-in">
              <div className="px-2 py-1 text-[10px] font-mono uppercase text-navy-muted font-bold">
                Select Active Mining Block:
              </div>
              {mineBlocks.map((b) => (
                <button
                  key={b.code}
                  onClick={() => {
                    setSelectedBlock(b.code);
                    setIsMineDropdownOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-md text-xs flex items-start justify-between transition-colors ${
                    selectedBlock === b.code
                      ? 'bg-blue-50 text-navy-primary font-semibold'
                      : 'hover:bg-slate-50 text-navy-secondary'
                  }`}
                >
                  <div>
                    <div className="font-bold">{b.code}</div>
                    <div className="text-[10px] text-slate-500">{b.desc}</div>
                  </div>
                  {selectedBlock === b.code && (
                    <Check className="w-3.5 h-3.5 text-mining-blue shrink-0 mt-0.5" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Shift Badge */}
        <div className="hidden xl:flex items-center space-x-1.5 text-xs bg-canvas border border-border px-2.5 py-1.5 rounded-md text-navy-secondary">
          <span className="text-navy-muted">Shift:</span>
          <span className="font-semibold text-navy-primary">Shift B (06:00 - 14:00)</span>
        </div>
      </div>

      {/* Center: Guided Demo Story Launch */}
      <div className="flex items-center space-x-2">
        {guidedStep === 0 ? (
          <button
            onClick={startGuidedTour}
            className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-xs font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-sm transition-all"
            title="Launch 10-step guided demo for competition presentation"
          >
            <PlayCircle className="w-4 h-4 text-blue-100" />
            <span className="hidden sm:inline">10-Step Guided Demo</span>
            <span className="sm:hidden">Demo</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 text-mining-blue px-3 py-1 rounded-lg text-xs font-semibold">
            <span>Demo Step {guidedStep}/10</span>
            <button
              onClick={exitGuidedTour}
              className="ml-1 text-[11px] text-slate-500 hover:text-slate-700 underline"
            >
              Exit Tour
            </button>
          </div>
        )}
      </div>

      {/* Right Telemetry & Status Indicators */}
      <div className="flex items-center space-x-2 sm:space-x-2.5">
        {/* Telemetry Status (Truthful Demo Stream label) */}
        <div className="hidden lg:flex items-center space-x-1.5 text-[11px] bg-canvas border border-border text-navy-secondary px-2.5 py-1 rounded-md">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Telemetry Active</span>
          <span className="text-[10px] text-slate-400 font-mono">[Demo Stream]</span>
        </div>

        {/* Safety Warning / Stop Work Button */}
        <button
          onClick={() => setIsStopWorkModalOpen(true)}
          className="flex items-center space-x-1.5 text-xs bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 px-2 py-1.5 rounded-md transition-colors"
          title="Inspect Safety Protocols and Stop-Work threshold"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span className="font-semibold hidden sm:inline">Zone B Sump Alert</span>
          <span className="text-[10px] bg-amber-200 px-1 rounded font-mono font-bold sm:hidden">⚠️</span>
        </button>

        {/* Shift Report Generator / Viewer */}
        <button
          onClick={openReportModal}
          className="flex items-center space-x-1.5 px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 border border-slate-300 text-navy-primary rounded-md font-semibold transition-colors shadow-xs"
          title="View & Download Mining Intelligence Shift Report"
        >
          <FileText className="w-3.5 h-3.5 text-mining-blue" />
          <span className="hidden lg:inline">Report</span>
        </button>

        {/* Decision Memory / Audit Trail */}
        <button
          onClick={() => setIsAuditTrailOpen(true)}
          className="p-1.5 text-navy-muted hover:text-navy-primary hover:bg-surface-subtle rounded-md border border-border transition-colors relative"
          title="Open Decision Memory & Audit Log"
        >
          <History className="w-4 h-4" />
        </button>

        {/* Alerts Bell */}
        <button
          onClick={() => setIsAlertsDrawerOpen(true)}
          className="p-1.5 text-navy-muted hover:text-navy-primary hover:bg-surface-subtle rounded-md border border-border transition-colors relative"
          title="Active Alerts"
        >
          <Bell className="w-4 h-4" />
          {criticalAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-mining-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {criticalAlertsCount}
            </span>
          )}
        </button>

        {/* User profile */}
        <div className="flex items-center space-x-2 pl-2 border-l border-border">
          <div className="w-7 h-7 rounded-full bg-navy-secondary text-white flex items-center justify-center font-bold text-[11px]">
            RS
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-semibold text-navy-primary leading-tight">R. Sengupta</p>
            <p className="text-[10px] text-navy-muted leading-tight">Chief Mine Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
};
