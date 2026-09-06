import React, { useState } from 'react';
import { useMining } from '../../context/MiningContext';
import { ShieldAlert, AlertTriangle, X, Check, Lock } from 'lucide-react';

export const StopWorkModal: React.FC = () => {
  const { isStopWorkModalOpen, setIsStopWorkModalOpen } = useMining();
  const [confirmed, setConfirmed] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isStopWorkModalOpen) return null;

  const handleExecuteStopWork = () => {
    setStatusMessage('STOP-WORK NOTICE DISPATCHED: Zone B extraction halted. Fleet evacuated to safety bench.');
    setTimeout(() => {
      setIsStopWorkModalOpen(false);
      setStatusMessage(null);
      setConfirmed(false);
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsStopWorkModalOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-surface rounded-xl shadow-2xl border-2 border-red-500 overflow-hidden z-10 animate-fade-in">
        {/* Red Header Bar */}
        <div className="bg-red-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wide">
                Mine Safety Protocol: Stop-Work Order
              </h3>
              <p className="text-[11px] text-red-100">
                Requires explicit Mine Manager & Safety Officer human authorization
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsStopWorkModalOpen(false)}
            className="p-1 text-red-200 hover:text-white rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs space-y-2">
            <div className="flex items-center space-x-2 font-bold text-red-900">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>Zone B Sump Slope Instability Alert (Piezometer P-09)</span>
            </div>
            <p className="text-red-800 leading-relaxed">
              Continuous borehole telemetry shows pore pressure rising at <strong>1.25 kPa/hr</strong> following 42mm precipitation, approaching the critical structural stability ceiling of 1.4 kPa/hr.
            </p>
          </div>

          <div className="space-y-2 text-xs text-navy-secondary">
            <h4 className="font-semibold text-navy-primary">Mandatory Stop-Work Actions:</h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Immediate radio evacuation of all personnel and haul trucks from Zone B Bench 3.</li>
              <li>Power isolation to secondary dewatering pump array in flooded sump.</li>
              <li>Dispatch geotechnical surveying drone to log crack propagation along South Crest.</li>
            </ul>
          </div>

          {/* Safety Rule Notice */}
          <div className="p-2.5 bg-slate-100 rounded-md border border-slate-300 text-[11px] text-slate-600 flex items-start space-x-2">
            <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
            <span>
              <strong>Rule 102 Safety Directive:</strong> The AI Early Warning System will never autonomously execute a Stop-Work evacuation. Authority resides exclusively with certified human officers.
            </span>
          </div>

          {/* Confirmation Checkbox */}
          <div className="pt-2 border-t border-slate-200">
            <label className="flex items-center space-x-3 cursor-pointer text-xs font-semibold text-navy-primary select-none">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500"
              />
              <span>I confirm authorization as R. Sengupta (Chief Mine Manager)</span>
            </label>
          </div>

          {statusMessage && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold rounded flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{statusMessage}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-canvas border-t border-border flex items-center justify-end space-x-2.5">
          <button
            onClick={() => setIsStopWorkModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleExecuteStopWork}
            disabled={!confirmed}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center space-x-2 ${
              confirmed
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-md cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>ISSUE STOP-WORK DIRECTIVE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
