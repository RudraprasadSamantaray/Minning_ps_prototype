import React from 'react';
import { useMining } from '../../context/MiningContext';
import { WEATHER_STATUS } from '../../data/miningData';
import {
  CloudRain,
  Droplets,
  Thermometer,
  Trees,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Sliders,
  CheckCircle,
} from 'lucide-react';

export const WeatherImpact: React.FC = () => {
  const { setCurrentScreen, loadPresetScenario } = useMining();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-navy-primary tracking-tight">WEATHER & REMOTE SENSING IMPACT</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-100 text-mining-blue border border-blue-200">
              ENVIRONMENTAL SURVEILLANCE
            </span>
          </div>
          <p className="text-xs text-navy-muted mt-0.5">
            Core Relationship: <span className="font-semibold text-navy-secondary">WEATHER ➔ MINING IMPACT ➔ PRODUCTION RISK</span>
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
          <span>Simulate Weather Scenarios</span>
        </button>
      </div>

      {/* 3-Step Impact Flow (Weather -> Mining Impact -> Production Risk) */}
      <div className="industrial-card p-5">
        <h3 className="text-xs font-bold text-navy-primary uppercase tracking-wider font-mono mb-3 pb-2 border-b border-border">
          PROPAGATION CHAIN: WEATHER TO PRODUCTION DEFICIT
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-canvas rounded-xl border border-border space-y-2">
            <div className="flex items-center space-x-2">
              <CloudRain className="w-5 h-5 text-blue-600" />
              <span className="text-xs font-bold font-mono text-navy-primary">STEP 1: WEATHER EVENT</span>
            </div>
            <h4 className="text-sm font-bold text-navy-primary">42mm Monsoon Precipitation</h4>
            <p className="text-xs text-navy-secondary">
              Localized severe cloudburst saturated open-pit bench drainage channels and sump catchment.
            </p>
          </div>

          <div className="p-4 bg-canvas rounded-xl border border-border space-y-2">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span className="text-xs font-bold font-mono text-navy-primary">STEP 2: MINING IMPACT</span>
            </div>
            <h4 className="text-sm font-bold text-navy-primary">Zone B Ramp Slippage</h4>
            <p className="text-xs text-navy-secondary">
              Soil moisture index spiked to 68.4%. Wheel slippage triggered traction interventions, forcing speed restriction to 12 km/h.
            </p>
          </div>

          <div className="p-4 bg-red-50/40 rounded-xl border border-red-200 space-y-2">
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              <span className="text-xs font-bold font-mono text-red-800">STEP 3: PRODUCTION RISK</span>
            </div>
            <h4 className="text-sm font-bold text-navy-primary">+19% Risk / -540t Volume</h4>
            <p className="text-xs text-navy-secondary">
              Haul cycle bottleneck combined with deferred blast hole charging, contributing 19% to the total 72% shortfall risk.
            </p>
          </div>
        </div>
      </div>

      {/* Environmental Indicators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="industrial-card p-4">
          <div className="flex items-center space-x-2 text-blue-600 mb-2">
            <CloudRain className="w-5 h-5" />
            <span className="text-xs font-bold uppercase font-mono">Rainfall Runoff</span>
          </div>
          <div className="text-2xl font-bold font-mono text-navy-primary">42.0 mm</div>
          <p className="text-xs text-navy-muted mt-1">24h pit precipitation accumulation</p>
        </div>

        <div className="industrial-card p-4">
          <div className="flex items-center space-x-2 text-cyan-600 mb-2">
            <Droplets className="w-5 h-5" />
            <span className="text-xs font-bold uppercase font-mono">Soil Moisture</span>
          </div>
          <div className="text-2xl font-bold font-mono text-navy-primary">68.4%</div>
          <p className="text-xs text-amber-700 font-medium mt-1">High saturation in pit sump</p>
        </div>

        <div className="industrial-card p-4">
          <div className="flex items-center space-x-2 text-orange-600 mb-2">
            <Thermometer className="w-5 h-5" />
            <span className="text-xs font-bold uppercase font-mono">Surface Temp</span>
          </div>
          <div className="text-2xl font-bold font-mono text-navy-primary">31.2 °C</div>
          <p className="text-xs text-navy-muted mt-1">Landsat thermal sensor correlation</p>
        </div>

        <div className="industrial-card p-4">
          <div className="flex items-center space-x-2 text-emerald-600 mb-2">
            <Trees className="w-5 h-5" />
            <span className="text-xs font-bold uppercase font-mono">NDVI Index</span>
          </div>
          <div className="text-2xl font-bold font-mono text-navy-primary">0.28 Sparse</div>
          <p className="text-xs text-slate-500 mt-1">Structural fractured shale outcrop</p>
        </div>
      </div>

      {/* Direct mitigation route */}
      <div className="p-4 bg-canvas border border-border rounded-xl flex items-center justify-between text-xs">
        <span className="text-navy-secondary">
          Weather intelligence directly recommends routing haul cycles to the dry East Ridge Route C.
        </span>
        <button
          onClick={() => setCurrentScreen('decision-center')}
          className="text-mining-blue hover:text-blue-800 font-semibold flex items-center space-x-1"
        >
          <span>View Decision Matrix</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
