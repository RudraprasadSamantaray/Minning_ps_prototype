import React from 'react';
import { useMining } from '../../context/MiningContext';
import { MINE_ZONES } from '../../data/miningData';
import { MineZone, GisLayerId } from '../../types/mining';
import { MapPin, Info, Layers } from 'lucide-react';

export const MineMap2D: React.FC = () => {
  const { openZoneDrawer, activeGisLayers, selectedZone } = useMining();

  return (
    <div className="relative w-full h-full min-h-[480px] bg-[#E5E7EB] overflow-hidden rounded-xl border border-border flex items-center justify-center">
      {/* Topographic GIS SVG Canvas */}
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full object-cover select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background terrain base */}
        <rect width="800" height="600" fill="#F1F5F9" />

        {/* Geological Strata Grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="1" />
          </pattern>

          {/* Mineralization Heatmap Gradient */}
          <radialGradient id="mineralGrad" cx="35%" cy="40%" r="40%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.0" />
          </radialGradient>

          {/* Temperature Heatmap Gradient */}
          <radialGradient id="tempGrad" cx="60%" cy="45%" r="35%">
            <stop offset="0%" stopColor="#EA580C" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#FDBA74" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FED7AA" stopOpacity="0.0" />
          </radialGradient>

          {/* Soil Moisture / Rainfall Ponding Gradient */}
          <radialGradient id="moistureGrad" cx="65%" cy="65%" r="35%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.65" />
            <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.0" />
          </radialGradient>

          {/* NDVI Vegetation Anomaly Gradient */}
          <radialGradient id="ndviGrad" cx="30%" cy="35%" r="30%">
            <stop offset="0%" stopColor="#16A34A" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#86EFAC" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#DCFCE7" stopOpacity="0.0" />
          </radialGradient>
        </defs>

        <rect width="800" height="600" fill="url(#grid)" />

        {/* Pit Bench Contours (Concentric stepped lines) */}
        <ellipse cx="400" cy="300" rx="360" ry="240" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
        <ellipse cx="400" cy="300" rx="310" ry="205" fill="#E5E7EB" stroke="#CBD5E1" strokeWidth="1.5" />
        <ellipse cx="400" cy="300" rx="260" ry="170" fill="#D1D5DB" stroke="#94A3B8" strokeWidth="1.5" />
        <ellipse cx="400" cy="300" rx="210" ry="135" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
        <ellipse cx="390" cy="300" rx="160" ry="100" fill="#94A3B8" stroke="#64748B" strokeWidth="1.5" />
        <ellipse cx="380" cy="300" rx="110" ry="68" fill="#64748B" stroke="#475569" strokeWidth="2" />
        <ellipse cx="370" cy="300" rx="60" ry="38" fill="#475569" stroke="#334155" strokeWidth="2" />

        {/* Spiral Haul Road */}
        <path
          d="M 120 200 C 180 120, 580 100, 680 250 C 720 380, 520 480, 380 470 C 260 460, 240 360, 320 320 C 370 290, 420 310, 370 300"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="6"
          strokeDasharray="10 5"
          opacity="0.85"
        />

        {/* Active GIS Layer Heatmap Overlays */}
        {activeGisLayers.includes('mineralization') && (
          <ellipse cx="300" cy="240" rx="220" ry="140" fill="url(#mineralGrad)" />
        )}

        {activeGisLayers.includes('temperature') && (
          <ellipse cx="480" cy="280" rx="200" ry="130" fill="url(#tempGrad)" />
        )}

        {activeGisLayers.includes('soil-moisture') && (
          <ellipse cx="520" cy="390" rx="190" ry="120" fill="url(#moistureGrad)" />
        )}

        {activeGisLayers.includes('rainfall') && (
          <ellipse cx="490" cy="370" rx="210" ry="130" fill="url(#moistureGrad)" />
        )}

        {activeGisLayers.includes('ndvi') && (
          <ellipse cx="280" cy="210" rx="180" ry="110" fill="url(#ndviGrad)" />
        )}

        {/* Drill Hole Collars */}
        {activeGisLayers.includes('drill-assay') && (
          <g>
            {[
              { x: 260, y: 220, id: 'DH-01', mn: '44.2%' },
              { x: 310, y: 240, id: 'DH-02', mn: '43.8%' },
              { x: 230, y: 270, id: 'DH-03', mn: '41.1%' },
              { x: 480, y: 240, id: 'DH-04', mn: '39.8%' },
              { x: 530, y: 380, id: 'DH-05', mn: '32.1%' },
              { x: 490, y: 410, id: 'DH-06', mn: '29.4%' },
            ].map((dh, i) => (
              <g key={i} className="cursor-pointer">
                <circle cx={dh.x} cy={dh.y} r="6" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx={dh.x} cy={dh.y} r="2.5" fill="#2563EB" />
                <text x={dh.x + 8} y={dh.y + 4} fontSize="9" fontFamily="monospace" fill="#0F172A" fontWeight="600">
                  {dh.id} ({dh.mn})
                </text>
              </g>
            ))}
          </g>
        )}

        {/* Zone Markers on 2D GIS Map */}
        {/* Zone A */}
        <g
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={() => openZoneDrawer(MINE_ZONES[0])}
        >
          <circle cx="280" cy="230" r="28" fill="#2563EB" fillOpacity="0.2" stroke="#2563EB" strokeWidth="2" />
          <circle cx="280" cy="230" r="14" fill="#2563EB" />
          <text x="280" y="234" textAnchor="middle" fontSize="10" fill="#FFFFFF" fontWeight="bold">A</text>
          <rect x="230" y="262" width="100" height="24" rx="4" fill="#0B192C" />
          <text x="280" y="278" textAnchor="middle" fontSize="10" fill="#FFFFFF" fontFamily="monospace" fontWeight="600">
            ZONE A • 84.2%
          </text>
        </g>

        {/* Zone B */}
        <g
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={() => openZoneDrawer(MINE_ZONES[1])}
        >
          <circle cx="530" cy="380" r="28" fill="#D97706" fillOpacity="0.2" stroke="#D97706" strokeWidth="2" />
          <circle cx="530" cy="380" r="14" fill="#D97706" />
          <text x="530" y="384" textAnchor="middle" fontSize="10" fill="#FFFFFF" fontWeight="bold">B</text>
          <rect x="475" y="412" width="110" height="24" rx="4" fill="#0B192C" />
          <text x="530" y="428" textAnchor="middle" fontSize="10" fill="#FFFFFF" fontFamily="monospace" fontWeight="600">
            ZONE B • 41.8% ⚠️
          </text>
        </g>

        {/* Zone C */}
        <g
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={() => openZoneDrawer(MINE_ZONES[2])}
        >
          <circle cx="490" cy="230" r="28" fill="#0D9488" fillOpacity="0.2" stroke="#0D9488" strokeWidth="2" />
          <circle cx="490" cy="230" r="14" fill="#0D9488" />
          <text x="490" y="234" textAnchor="middle" fontSize="10" fill="#FFFFFF" fontWeight="bold">C</text>
          <rect x="440" y="262" width="100" height="24" rx="4" fill="#0B192C" />
          <text x="490" y="278" textAnchor="middle" fontSize="10" fill="#FFFFFF" fontFamily="monospace" fontWeight="600">
            ZONE C • 71.4%
          </text>
        </g>
      </svg>

      {/* 2D Map Metadata HUD */}
      <div className="absolute top-3 left-3 z-10 bg-surface/90 backdrop-blur-sm border border-border px-3 py-1.5 rounded-lg shadow-sm text-xs font-mono">
        <span className="text-slate-500 font-bold uppercase">Ortho GIS View: </span>
        <span className="text-navy-primary font-semibold">1:2500 Scale • WGS84 Datum</span>
      </div>

      <div className="absolute bottom-3 right-3 z-10 bg-surface/90 backdrop-blur-sm border border-border px-3 py-1.5 rounded-lg shadow-sm text-xs flex items-center space-x-2">
        <span className="text-slate-500">Haul Road Ramp B-2:</span>
        <span className="text-amber-700 font-semibold">Speed restricted (12 km/h)</span>
      </div>
    </div>
  );
};
