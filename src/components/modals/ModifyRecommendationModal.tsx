import React, { useState } from 'react';
import { useMining } from '../../context/MiningContext';
import { Edit3, Check, X, Sliders, Truck, Zap } from 'lucide-react';

export const ModifyRecommendationModal: React.FC = () => {
  const { isModifyModalOpen, setIsModifyModalOpen, modifyDecision } = useMining();

  const [fleetUnits, setFleetUnits] = useState(3);
  const [blastingBufferHours, setBlastingBufferHours] = useState(24);
  const [managerNotes, setManagerNotes] = useState(
    'Redeploy E14 with 3 BEML trucks to Zone C. Maintain water pump operational on Ramp B-2 continuously.'
  );

  if (!isModifyModalOpen) return null;

  const handleSave = () => {
    const summary = `Modified: Mobilize ${fleetUnits} haul trucks; Blasting buffer ${blastingBufferHours}h. Note: ${managerNotes}`;
    modifyDecision(summary);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-primary/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsModifyModalOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-surface rounded-xl shadow-2xl border border-border overflow-hidden z-10 animate-fade-in">
        <div className="p-4 bg-navy-primary text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Edit3 className="w-5 h-5 text-mining-blue" />
            <div>
              <h3 className="text-sm font-bold">Modify Decision Parameters</h3>
              <p className="text-[11px] text-slate-300">Option A Custom Operational Calibration</p>
            </div>
          </div>
          <button
            onClick={() => setIsModifyModalOpen(false)}
            className="p-1 text-slate-400 hover:text-white rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Slider 1: Haul Truck Units */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-navy-primary flex items-center space-x-1.5">
                <Truck className="w-3.5 h-3.5 text-mining-blue" />
                <span>Haul Trucks Reassigned to Zone C</span>
              </span>
              <span className="font-mono font-bold text-mining-blue text-sm">{fleetUnits} Trucks</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={fleetUnits}
              onChange={(e) => setFleetUnits(Number(e.target.value))}
              className="w-full accent-mining-blue"
            />
            <div className="flex justify-between text-[10px] text-navy-muted">
              <span>1 Truck (Conservative)</span>
              <span>3 Trucks (AI Optimum)</span>
              <span>5 Trucks (Maximum Surge)</span>
            </div>
          </div>

          {/* Slider 2: Blasting Buffer */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-navy-primary flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Blast #105 Initiation Buffer</span>
              </span>
              <span className="font-mono font-bold text-amber-600 text-sm">{blastingBufferHours}h</span>
            </div>
            <input
              type="range"
              min="6"
              max="48"
              step="6"
              value={blastingBufferHours}
              onChange={(e) => setBlastingBufferHours(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-navy-muted">
              <span>6h (Fast-track)</span>
              <span>24h (Balanced)</span>
              <span>48h (Drying safety window)</span>
            </div>
          </div>

          {/* Manager Log Notes */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-semibold text-navy-primary block">
              Operational Instructions for Dispatch & Shift In-Charge:
            </label>
            <textarea
              rows={3}
              value={managerNotes}
              onChange={(e) => setManagerNotes(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-border focus:ring-1 focus:ring-mining-blue focus:outline-none text-navy-primary"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-canvas border-t border-border flex items-center justify-end space-x-2">
          <button
            onClick={() => setIsModifyModalOpen(false)}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-bold bg-navy-primary hover:bg-navy-secondary text-white rounded-lg transition-colors flex items-center space-x-1.5"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>SAVE MODIFIED PLAN & COMMIT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
