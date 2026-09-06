import React from 'react';
import { useMining } from '../../context/MiningContext';
import { MineCanvas3D } from '../mine3d/MineCanvas3D';
import { MineMap2D } from '../mine3d/MineMap2D';
import { MINE_ZONES, MINE_METADATA } from '../../data/miningData';
import { GisLayerId } from '../../types/mining';
import {
  Layers,
  Box,
  Map as MapIcon,
  Flame,
  Droplets,
  Thermometer,
  Trees,
  Crosshair,
  TrendingUp,
  AlertTriangle,
  Play,
  ArrowRight,
  Info,
  Sliders,
} from 'lucide-react';

export const MineIntelligence: React.FC = () => {
  const {
    mapMode,
    setMapMode,
    activeGisLayers,
    toggleGisLayer,
    openZoneDrawer,
    testInSimulatorWithZone,
    focusZoneIn3D,
  } = useMining();

  const layerButtons: { id: GisLayerId; label: string; icon: React.ElementType; color: string; desc: string }[] = [
    { id: 'mineralization', label: 'Mineralization', icon: Flame, color: 'text-purple-600', desc: 'Braunite vein probability' },
    { id: 'temperature', label: 'Temperature', icon: Thermometer, color: 'text-orange-600', desc: 'Thermal infrared anomaly' },
    { id: 'rainfall', label: 'Rainfall', icon: Droplets, color: 'text-sky-600', desc: 'Precipitation & ponding' },
    { id: 'soil-moisture', label: 'Soil Moisture', icon: Droplets, color: 'text-cyan-600', desc: 'Haul ramp saturation' },
    { id: 'ndvi', label: 'NDVI Vegetation', icon: Trees, color: 'text-emerald-600', desc: 'Structural fracture clue' },
    { id: 'drill-assay', label: 'Drill Holes', icon: Crosshair, color: 'text-indigo-600', desc: 'Core borehole assays' },
  ];

  return (
    <div className="space-y-4">
      {/* Header & 3D/2D View Mode Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-navy-primary tracking-tight">MINE INTELLIGENCE</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-100 text-mining-blue border border-blue-200">
              DIGITAL TWIN & GIS
            </span>
          </div>
          <p className="text-xs text-navy-muted mt-0.5">
            Primary Question: <span className="font-semibold text-navy-secondary">“WHERE is the opportunity or risk?”</span> • Open pit geometry, ore bodies, drill assays & environmental overlays
          </p>
        </div>

        {/* 3D / 2D Switcher */}
        <div className="flex items-center space-x-1.5 bg-canvas p-1 rounded-lg border border-border self-start md:self-auto">
          <button
            onClick={() => setMapMode('3d')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              mapMode === '3d'
                ? 'bg-navy-primary text-white shadow-sm'
                : 'text-navy-muted hover:text-navy-primary hover:bg-slate-200/60'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D Digital Twin</span>
          </button>

          <button
            onClick={() => setMapMode('2d')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              mapMode === '2d'
                ? 'bg-navy-primary text-white shadow-sm'
                : 'text-navy-muted hover:text-navy-primary hover:bg-slate-200/60'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>2D GIS Map</span>
          </button>
        </div>
      </div>

      {/* Interactive Compact Layer Control (Every click visibly alters the 3D scene!) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[10px] font-mono font-bold text-navy-muted uppercase flex items-center space-x-1 shrink-0">
          <Layers className="w-3.5 h-3.5" />
          <span>Toggle Overlays:</span>
        </span>
        {layerButtons.map((layer) => {
          const Icon = layer.icon;
          const isActive = activeGisLayers.includes(layer.id);
          return (
            <button
              key={layer.id}
              onClick={() => toggleGisLayer(layer.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all border ${
                isActive
                  ? 'bg-navy-primary text-white border-navy-primary shadow-sm font-semibold'
                  : 'bg-surface text-navy-muted border-border hover:bg-surface-subtle hover:text-navy-primary'
              }`}
              title={layer.desc}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : layer.color}`} />
              <span>{layer.label}</span>
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Dominant Map Viewport Area (Visually Dominates ~70% of Screen) */}
      <div className="w-full h-[540px] relative">
        {mapMode === '3d' ? <MineCanvas3D /> : <MineMap2D />}
      </div>

      {/* Meaningful Mine Zones: Zone A (84%), Zone B (42%), Zone C (71%) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MINE_ZONES.map((zone) => (
          <div
            key={zone.id}
            className="industrial-card p-4 hover:border-mining-blue transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-navy-primary text-white">
                    {zone.code}
                  </span>
                  <span className="font-bold text-sm text-navy-primary group-hover:text-mining-blue transition-colors">
                    {zone.name}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                    zone.code === 'ZONE A'
                      ? 'bg-blue-100 text-blue-800'
                      : zone.code === 'ZONE C'
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {zone.mineralizationProb}% Prob
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs my-2.5">
                <div className="bg-canvas p-2 rounded border border-border">
                  <span className="text-[10px] text-navy-muted block">Ore Grade</span>
                  <span className="font-bold font-mono text-purple-700">{zone.oreGrade}% Mn</span>
                </div>
                <div className="bg-canvas p-2 rounded border border-border">
                  <span className="text-[10px] text-navy-muted block">Depth Interval</span>
                  <span className="font-bold font-mono text-navy-primary">{zone.depthRange}</span>
                </div>
              </div>

              <p className="text-[11px] text-navy-secondary line-clamp-2 leading-relaxed">
                {zone.summary}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between text-xs gap-2">
              <button
                onClick={() => openZoneDrawer(zone)}
                className="text-mining-blue hover:text-blue-800 font-semibold flex items-center space-x-1"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => testInSimulatorWithZone(zone.code)}
                className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-mining-blue border border-blue-200 rounded font-semibold text-[11px] flex items-center space-x-1"
              >
                <Sliders className="w-3 h-3" />
                <span>Simulate</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reserve Outlook & Exploration Priority (Compact) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Reserve Outlook */}
        <div className="lg:col-span-7 industrial-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-mining-blue" />
              <h3 className="text-xs font-bold text-navy-primary uppercase tracking-wider font-mono">
                Reserve Outlook & Lifespan Projection
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500">[Model Estimate]</span>
          </div>

          <div className="grid grid-cols-3 gap-3 my-2">
            <div className="bg-canvas p-3 rounded-lg border border-border">
              <span className="text-[10px] text-navy-muted block">Known Reserve</span>
              <span className="text-lg font-bold font-mono text-navy-primary">
                {MINE_METADATA.reserveOutlook.knownReserveTons.toLocaleString()} t
              </span>
              <span className="text-[10px] text-slate-500">Avg {MINE_METADATA.reserveOutlook.averageGradePercent}% Mn</span>
            </div>

            <div className="bg-canvas p-3 rounded-lg border border-border">
              <span className="text-[10px] text-navy-muted block">Annual Rate</span>
              <span className="text-lg font-bold font-mono text-navy-primary">
                {MINE_METADATA.reserveOutlook.annualProductionTons.toLocaleString()} t/yr
              </span>
              <span className="text-[10px] text-slate-500">Current quota</span>
            </div>

            <div className="bg-canvas p-3 rounded-lg border border-border">
              <span className="text-[10px] text-navy-muted block">Estimated Lifespan</span>
              <span className="text-lg font-bold font-mono text-amber-700">
                ~{MINE_METADATA.reserveOutlook.estimatedYearsRemaining} Years
              </span>
              <span className="text-[10px] text-amber-600 font-medium">Primary bench</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-600 bg-canvas p-2 rounded border border-border">
            <strong>Advisory:</strong> Plan future mine development and bench expansion before current primary reserve is depleted.
          </p>
        </div>

        {/* Exploration Priority & NDVI Responsible Note */}
        <div className="lg:col-span-5 industrial-card p-4 flex flex-col justify-between space-y-2.5">
          <div>
            <h3 className="text-xs font-bold text-navy-primary uppercase tracking-wider font-mono mb-1.5">
              Exploration Priority
            </h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-canvas border border-border">
                <span className="font-semibold text-navy-primary">Zone A (Braunite Seam)</span>
                <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-blue-100 text-blue-800">
                  HIGH PRIORITY
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-canvas border border-border">
                <span className="font-semibold text-navy-primary">Zone C (Ridge Target)</span>
                <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-teal-100 text-teal-800">
                  MEDIUM-HIGH
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-canvas border border-border">
                <span className="font-semibold text-navy-primary">Zone B (South Pit)</span>
                <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-amber-100 text-amber-800">
                  MEDIUM (Drain First)
                </span>
              </div>
            </div>
          </div>

          <div className="p-2 bg-slate-50 rounded border border-slate-200 text-[10px] text-slate-600 leading-tight">
            <em>Responsible AI Principle:</em> Remote sensing and vegetation anomalies are treated strictly as supporting geological clues, not proof of manganese.
          </div>
        </div>
      </div>
    </div>
  );
};
