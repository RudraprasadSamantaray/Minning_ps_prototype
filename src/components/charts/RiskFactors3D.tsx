import React, { useState } from 'react';
import { RISK_FACTORS } from '../../data/miningData';

interface RiskFactors3DProps {
  onFactorClick?: (factorName: string, category: 'equipment' | 'weather' | 'blasting') => void;
  variant?: 'full' | 'compact';
  className?: string;
}

interface FactorVisualConfig {
  name: string;
  shortName: string;
  impact: number;
  category: 'equipment' | 'weather' | 'blasting';
  colorFront: string;
  colorTop: string;
  colorSide: string;
  shadowColor: string;
  accentBadge: string;
  cause: string;
  telemetry: string;
}

export const RiskFactors3D: React.FC<RiskFactors3DProps> = ({
  onFactorClick,
  variant = 'full',
  className = '',
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Map factors with restrained, harmonious 3D color palettes & detailed causes
  const factors: FactorVisualConfig[] = [
    {
      name: 'Equipment Downtime (Excavator E12)',
      shortName: 'Equipment Downtime',
      impact: 28,
      category: 'equipment',
      colorFront: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
      colorTop: '#EF4444',
      colorSide: '#991B1B',
      shadowColor: 'rgba(220, 38, 38, 0.28)',
      accentBadge: 'bg-red-100 text-red-800 border-red-200',
      cause: 'Hydraulic pump delta pressure dropped to 184 bar (vs 320 bar nominal) on Bench 3.',
      telemetry: 'CAN-bus Telemetry Tele-Node #12',
    },
    {
      name: 'Rainfall Ingress (Zone B)',
      shortName: 'Rainfall Ingress (Zone B)',
      impact: 19,
      category: 'weather',
      colorFront: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)',
      colorTop: '#FB923C',
      colorSide: '#9A3412',
      shadowColor: 'rgba(234, 88, 12, 0.25)',
      accentBadge: 'bg-orange-100 text-orange-800 border-orange-200',
      cause: '42mm heavy precipitation waterlogged Ramp B-2. Truck speed limited to 12 km/h.',
      telemetry: 'IMD Automated Weather Station',
    },
    {
      name: 'Blasting Delay (#104)',
      shortName: 'Blasting Delay (#104)',
      impact: 14,
      category: 'blasting',
      colorFront: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      colorTop: '#FBBF24',
      colorSide: '#B45309',
      shadowColor: 'rgba(245, 158, 11, 0.22)',
      accentBadge: 'bg-amber-100 text-amber-800 border-amber-200',
      cause: 'Blast #104 deferred 3 days pending drainage clearance; 1,000t muckpile release delayed.',
      telemetry: 'Mine Safety & Blasting ERP',
    },
    {
      name: 'Fleet Haul Constraints',
      shortName: 'Fleet Haul Constraints',
      impact: 11,
      category: 'equipment',
      colorFront: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
      colorTop: '#F59E0B',
      colorSide: '#92400E',
      shadowColor: 'rgba(217, 119, 6, 0.2)',
      accentBadge: 'bg-amber-50 text-amber-900 border-amber-300',
      cause: 'Haul cycle length extended (+1.4 km) while rerouting around waterlogged Zone B.',
      telemetry: 'Fleet GPS Dispatch Engine',
    },
  ];

  const maxImpact = 35; // Maximum scale domain (0% to 35% Risk)
  const isCompact = variant === 'compact';

  const handleBarClick = (factor: FactorVisualConfig) => {
    if (onFactorClick) {
      onFactorClick(factor.name, factor.category);
    }
  };

  return (
    <div className={`relative flex flex-col justify-between select-none ${className}`}>
      {/* 3D Contributing Forces Grid */}
      <div className={`space-y-${isCompact ? '3' : '4'} my-1`}>
        {factors.map((factor, idx) => {
          const isHovered = hoveredIdx === idx;
          const isTopDriver = idx === 0;
          const barWidthPercent = (factor.impact / maxImpact) * 100;

          return (
            <div
              key={factor.name}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => handleBarClick(factor)}
            >
              {/* Factor Header Row */}
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center space-x-2 truncate">
                  {isTopDriver && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-red-100 text-red-800 border border-red-300 uppercase shrink-0">
                      Primary
                    </span>
                  )}
                  <span
                    className={`font-semibold transition-colors truncate ${
                      isHovered ? 'text-navy-primary' : 'text-navy-secondary'
                    } ${isTopDriver ? 'font-bold' : ''}`}
                  >
                    {isCompact ? factor.shortName : factor.name}
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0 font-mono">
                  <span
                    className={`text-xs font-black transition-transform duration-150 ${
                      isTopDriver ? 'text-red-600' : 'text-amber-700'
                    } ${isHovered ? 'scale-105' : ''}`}
                  >
                    +{factor.impact}% Risk
                  </span>
                  <span className="text-[10px] text-slate-400 font-sans hidden sm:inline">
                    impact
                  </span>
                </div>
              </div>

              {/* 3D Extruded Bar Track & Geometry */}
              <div
                className="relative w-full rounded-md transition-all duration-200"
                style={{
                  height: isCompact ? '22px' : '28px',
                  perspective: '600px',
                }}
              >
                {/* 3D Recessed Channel Floor */}
                <div
                  className="absolute inset-0 rounded-md bg-slate-100/90 border border-slate-200/80"
                  style={{
                    boxShadow: 'inset 0 1px 3px rgba(11, 25, 44, 0.08)',
                  }}
                />

                {/* Extruded 3D Bar Assembly */}
                <div
                  className="relative h-full transition-all duration-200 ease-out"
                  style={{
                    width: `${barWidthPercent}%`,
                    transform: isHovered ? 'translateY(-3px) translateZ(8px)' : 'translateY(0) translateZ(0)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Soft Cast Shadow underneath */}
                  <div
                    className="absolute -bottom-1 left-1 right-0 rounded-full blur-xs transition-opacity duration-200"
                    style={{
                      height: '6px',
                      backgroundColor: factor.shadowColor,
                      opacity: isHovered ? 0.9 : 0.6,
                    }}
                  />

                  {/* 3D Top Bevel (Illuminated Surface) */}
                  <div
                    className="absolute top-0 left-0 right-1 h-1.5 rounded-t-sm transition-colors"
                    style={{
                      backgroundColor: factor.colorTop,
                      opacity: 0.95,
                    }}
                  />

                  {/* 3D Front Face */}
                  <div
                    className="absolute inset-0 rounded-md flex items-center justify-between px-2 text-white font-mono text-[11px] font-bold shadow-xs transition-all overflow-hidden"
                    style={{
                      background: factor.colorFront,
                      borderTop: `1px solid ${factor.colorTop}`,
                    }}
                  >
                    {/* Subtle internal shine highlight */}
                    <div
                      className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/25 to-transparent pointer-events-none"
                    />

                    {/* Numeric value embedded on bar if wide enough */}
                    {barWidthPercent > 35 && (
                      <span className="relative z-10 text-[10px] font-mono tracking-wider opacity-90">
                        {factor.impact}%
                      </span>
                    )}
                  </div>

                  {/* 3D Right Extrusion Face Cap */}
                  <div
                    className="absolute right-0 top-0 bottom-0 w-2 rounded-r-md transition-colors"
                    style={{
                      backgroundColor: factor.colorSide,
                      transform: 'skewY(-4deg)',
                      transformOrigin: 'left',
                      boxShadow: 'inset -1px 0 2px rgba(0, 0, 0, 0.25)',
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3D Floor Axis Scale Reference */}
      <div className="pt-2 border-t border-slate-100 mt-2">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
          <span>0%</span>
          <span>9%</span>
          <span>18%</span>
          <span>27%</span>
          <span>35% Risk</span>
        </div>
        {/* Slanted perspective ruler ticks */}
        <div className="relative w-full h-1 mt-0.5">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-slate-200" />
          {[0, 25.7, 51.4, 77.1, 100].map((pct, i) => (
            <div
              key={i}
              className="absolute top-0 w-[1px] h-1.5 bg-slate-300"
              style={{ left: `${pct}%` }}
            />
          ))}
        </div>
      </div>

      {/* FLOATING RICH TELEMETRY TOOLTIP ON HOVER */}
      {hoveredIdx !== null && (
        <div
          className="absolute z-30 pointer-events-none transition-all duration-150 ease-out bg-white/95 backdrop-blur-md border border-border shadow-popover rounded-lg p-3 text-xs text-navy-primary font-sans max-w-[280px]"
          style={{
            right: '8px',
            top: `${hoveredIdx * 52 + 10}px`,
          }}
        >
          <div className="flex items-center justify-between border-b border-border pb-1.5 mb-1.5">
            <span className="font-bold text-navy-primary text-[11px] truncate">
              {factors[hoveredIdx].name}
            </span>
            <span
              className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${factors[hoveredIdx].accentBadge}`}
            >
              +{factors[hoveredIdx].impact}% Risk
            </span>
          </div>

          <div className="space-y-1.5">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Operational Cause
              </span>
              <p className="text-[11px] text-navy-secondary leading-snug mt-0.5">
                {factors[hoveredIdx].cause}
              </p>
            </div>

            <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px]">
              <span className="text-slate-400 font-mono">Source:</span>
              <span className="text-slate-600 font-semibold font-mono truncate max-w-[170px]">
                {factors[hoveredIdx].telemetry}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
