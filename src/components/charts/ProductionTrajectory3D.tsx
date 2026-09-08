import React, { useState } from 'react';
import { PRODUCTION_TRAJECTORY_DATA } from '../../data/miningData';

interface ProductionTrajectory3DProps {
  onExplainClick?: () => void;
  className?: string;
}

export const ProductionTrajectory3D: React.FC<ProductionTrajectory3DProps> = ({
  className = '',
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Chart dimensions & coordinate mapping
  const width = 680;
  const height = 280;
  const padding = { top: 38, right: 90, bottom: 48, left: 52 };
  const depthX = 22; // 3D isometric perspective horizontal offset
  const depthY = -14; // 3D isometric perspective vertical offset

  const yMin = 2000;
  const yMax = 3200;

  const data = PRODUCTION_TRAJECTORY_DATA;
  const count = data.length;

  const getX = (index: number) => {
    return padding.left + (index / (count - 1)) * (width - padding.left - padding.right);
  };

  const getY = (val: number) => {
    const clamped = Math.max(yMin, Math.min(yMax, val));
    return height - padding.bottom - ((clamped - yMin) / (yMax - yMin)) * (height - padding.top - padding.bottom);
  };

  // Generate smooth SVG paths
  const actualPoints = data
    .map((d, i) => (d.actual !== null ? { x: getX(i), y: getY(d.actual), val: d.actual, day: d.day, status: d.status } : null))
    .filter((p): p is { x: number; y: number; val: number; day: string; status: string } => p !== null);

  const forecastPoints = data.map((d, i) => ({
    x: getX(i),
    y: getY(d.forecast),
    val: d.forecast,
    day: d.day,
  }));

  const targetPoints = data.map((d, i) => ({
    x: getX(i),
    y: getY(d.target),
    val: d.target,
    day: d.day,
  }));

  // Build SVG path strings
  const buildSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i !== pts.length - 2 ? pts[i + 2] : p2;
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return path;
  };

  const actualPathStr = buildSmoothPath(actualPoints);
  const forecastPathStr = buildSmoothPath(forecastPoints);
  const targetPathStr = buildSmoothPath(targetPoints);

  // 3D Extrusion offsets for actual line
  const actualExtrudePathStr = buildSmoothPath(
    actualPoints.map((p) => ({ x: p.x + depthX * 0.4, y: p.y + depthY * 0.4 }))
  );
  const actualShadowPathStr = buildSmoothPath(
    actualPoints.map((p) => ({ x: p.x + 8, y: height - padding.bottom + 4 }))
  );

  // 3D Extrusion offsets for forecast line
  const forecastExtrudePathStr = buildSmoothPath(
    forecastPoints.map((p) => ({ x: p.x + depthX * 0.35, y: p.y + depthY * 0.35 }))
  );

  // Volumetric Forecast Area Path (from floor to curve)
  const floorY = height - padding.bottom;
  const forecastAreaPathStr = `
    ${forecastPathStr}
    L ${forecastPoints[forecastPoints.length - 1].x} ${floorY}
    L ${forecastPoints[0].x} ${floorY}
    Z
  `;

  // Volumetric Deficit Gap Polygon (Days 3 to 6: between Target and Forecast)
  const gapStartIndex = 3;
  const gapForecastPts = forecastPoints.slice(gapStartIndex);
  const gapTargetPts = targetPoints.slice(gapStartIndex);

  let gapVolumePath = `M ${gapTargetPts[0].x} ${gapTargetPts[0].y}`;
  for (let i = 1; i < gapTargetPts.length; i++) {
    gapVolumePath += ` L ${gapTargetPts[i].x} ${gapTargetPts[i].y}`;
  }
  for (let i = gapForecastPts.length - 1; i >= 0; i--) {
    gapVolumePath += ` L ${gapForecastPts[i].x} ${gapForecastPts[i].y}`;
  }
  gapVolumePath += ' Z';

  // 3D Wall for Deficit Gap
  const gapWallPath = `
    M ${gapTargetPts[gapTargetPts.length - 1].x} ${gapTargetPts[gapTargetPts.length - 1].y}
    L ${gapTargetPts[gapTargetPts.length - 1].x + depthX * 0.5} ${gapTargetPts[gapTargetPts.length - 1].y + depthY * 0.5}
    L ${gapForecastPts[gapForecastPts.length - 1].x + depthX * 0.5} ${gapForecastPts[gapForecastPts.length - 1].y + depthY * 0.5}
    L ${gapForecastPts[gapForecastPts.length - 1].x} ${gapForecastPts[gapForecastPts.length - 1].y}
    Z
  `;

  // Horizontal Grid Levels
  const gridLevels = [2000, 2300, 2600, 2900, 3200];

  const activeItem = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div className={`relative flex flex-col justify-between select-none ${className}`}>
      {/* SVG 3D Data Landscape Container */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: '260px' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
          style={{ filter: 'drop-shadow(0 2px 8px rgba(11, 25, 44, 0.04))' }}
        >
          <defs>
            {/* Linear Gradients */}
            <linearGradient id="gridPlaneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F1F5F9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient id="depthWallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="actualExtrudeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B192C" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1E293B" stopOpacity="0.05" />
            </linearGradient>

            <linearGradient id="forecastVolGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.24" />
              <stop offset="60%" stopColor="#60A5FA" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.01" />
            </linearGradient>

            <linearGradient id="deficitGapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#EF4444" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#DC2626" stopOpacity="0.35" />
            </linearGradient>

            <linearGradient id="forecastLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="70%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>

            <linearGradient id="gapWallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#B91C1C" stopOpacity="0.7" />
            </linearGradient>

            {/* Subtle Diagonal Hatch for Deficit Region */}
            <pattern id="deficitHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#EF4444" strokeWidth="1.2" strokeOpacity="0.35" />
            </pattern>

            {/* Depth Shadows */}
            <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0B192C" floodOpacity="0.12" />
            </filter>

            <filter id="glowBadge" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#DC2626" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* ================= 3D PERSPECTIVE FLOOR & BACKDROP ================= */}
          {/* Floor Grid Plane with 3D Depth Slant */}
          <polygon
            points={`
              ${padding.left},${floorY}
              ${padding.left + depthX},${floorY + depthY}
              ${width - padding.right + depthX},${floorY + depthY}
              ${width - padding.right},${floorY}
            `}
            fill="url(#gridPlaneGrad)"
            stroke="#E2E8F0"
            strokeWidth="0.75"
          />

          {/* 3D Back Depth Wall */}
          <polygon
            points={`
              ${padding.left + depthX},${padding.top + depthY}
              ${width - padding.right + depthX},${padding.top + depthY}
              ${width - padding.right + depthX},${floorY + depthY}
              ${padding.left + depthX},${floorY + depthY}
            `}
            fill="url(#depthWallGrad)"
            stroke="#E2E8F0"
            strokeWidth="0.5"
          />

          {/* Horizontal Perspective Grid Lines & Y-Axis Labels */}
          {gridLevels.map((lvl) => {
            const y = getY(lvl);
            return (
              <g key={lvl} className="transition-opacity">
                {/* 3D Depth connector */}
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + depthX}
                  y2={y + depthY}
                  stroke="#E2E8F0"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                />
                {/* Back-wall level line */}
                <line
                  x1={padding.left + depthX}
                  y1={y + depthY}
                  x2={width - padding.right + depthX}
                  y2={y + depthY}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                />
                {/* Front level line */}
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                />
                {/* Y-Axis Label */}
                <text
                  x={padding.left - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  fill="#64748B"
                  fontSize="10.5"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="500"
                >
                  {lvl}
                </text>
              </g>
            );
          })}

          {/* Vertical Day Grid Lines & 3D Floor Rulers */}
          {data.map((d, i) => {
            const x = getX(i);
            const isHovered = hoveredIndex === i;
            return (
              <g key={d.day}>
                {/* Floor depth guide line */}
                <line
                  x1={x}
                  y1={floorY}
                  x2={x + depthX}
                  y2={floorY + depthY}
                  stroke={isHovered ? '#94A3B8' : '#E2E8F0'}
                  strokeWidth={isHovered ? '1.5' : '1'}
                />
                {/* Back-wall vertical marker */}
                <line
                  x1={x + depthX}
                  y1={floorY + depthY}
                  x2={x + depthX}
                  y2={padding.top + depthY}
                  stroke="#F1F5F9"
                  strokeWidth="0.75"
                  strokeDasharray="2 2"
                />
                {/* Front vertical subtle marker */}
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={floorY}
                  stroke={isHovered ? '#CBD5E1' : '#F8FAFC'}
                  strokeWidth={isHovered ? '1.2' : '0.5'}
                  strokeDasharray={isHovered ? 'none' : '2 4'}
                />
                {/* Day Label */}
                <text
                  x={x}
                  y={floorY + 18}
                  textAnchor="middle"
                  fill={isHovered ? '#0B192C' : '#64748B'}
                  fontSize="11"
                  fontWeight={isHovered ? '700' : '600'}
                  className="transition-colors duration-150"
                >
                  {d.day}
                </text>
              </g>
            );
          })}

          {/* ================= 3D TARGET QUOTA REFERENCE PLANE ================= */}
          {/* Subtle horizontal reference band plane */}
          <g>
            <polygon
              points={`
                ${targetPoints[0].x},${targetPoints[0].y}
                ${targetPoints[0].x + depthX},${targetPoints[0].y + depthY}
                ${targetPoints[targetPoints.length - 1].x + depthX},${targetPoints[targetPoints.length - 1].y + depthY}
                ${targetPoints[targetPoints.length - 1].x},${targetPoints[targetPoints.length - 1].y}
              `}
              fill="#94A3B8"
              fillOpacity="0.07"
            />
            {/* Target 3D line */}
            <path
              d={targetPathStr}
              fill="none"
              stroke="#94A3B8"
              strokeWidth="1.8"
              strokeDasharray="4 4"
            />
          </g>

          {/* ================= VOLUMETRIC FORECAST UNDERLAY ================= */}
          <path d={forecastAreaPathStr} fill="url(#forecastVolGrad)" />

          {/* ================= VOLUMETRIC DEFICIT GAP REGION (3D VOLUME) ================= */}
          {/* Gap Base Volumetric Fill */}
          <path d={gapVolumePath} fill="url(#deficitGapGrad)" />
          {/* Gap Pattern Texture */}
          <path d={gapVolumePath} fill="url(#deficitHatch)" />
          {/* 3D Extrusion Side Wall for Deficit */}
          <path d={gapWallPath} fill="url(#gapWallGrad)" />

          {/* Deficit Vertical Drop Struts (Day 4 to Day 7) */}
          {data.slice(gapStartIndex).map((d, i) => {
            const actualIndex = gapStartIndex + i;
            const x = getX(actualIndex);
            const targetY = getY(d.target);
            const forecastY = getY(d.forecast);
            return (
              <g key={`gap-strut-${i}`}>
                <line
                  x1={x}
                  y1={targetY}
                  x2={x}
                  y2={forecastY}
                  stroke="#DC2626"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                  strokeOpacity="0.8"
                />
              </g>
            );
          })}

          {/* ================= 3D FORECAST TRAJECTORY LINE ================= */}
          {/* 3D Extrusion ribbon for forecast */}
          <path
            d={forecastExtrudePathStr}
            fill="none"
            stroke="#818CF8"
            strokeWidth="2.5"
            strokeOpacity="0.4"
          />
          {/* Main Forecast Path */}
          <path
            d={forecastPathStr}
            fill="none"
            stroke="url(#forecastLineGrad)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#softShadow)"
          />

          {/* ================= 3D ACTUAL OUTPUT DIMENSIONAL RIBBON ================= */}
          {/* Drop Shadow onto floor */}
          <path
            d={actualShadowPathStr}
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="3.5"
            strokeOpacity="0.5"
            filter="url(#softShadow)"
          />
          {/* Extrusion Wall */}
          <path
            d={actualExtrudePathStr}
            fill="none"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeOpacity="0.25"
          />
          {/* Main Navy Dimensional Actual Path */}
          <path
            d={actualPathStr}
            fill="none"
            stroke="#0B192C"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* ================= DIMENSIONAL DATA NODES ================= */}
          {/* Actual Production 3D Nodes (Days 1 to 4) */}
          {actualPoints.map((p, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g key={`actual-node-${i}`} className="cursor-pointer">
                {/* 3D Drop Line to Floor */}
                <line
                  x1={p.x}
                  y1={p.y}
                  x2={p.x}
                  y2={floorY}
                  stroke="#0B192C"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  strokeOpacity={isHovered ? 0.6 : 0.2}
                />
                {/* Node Outer Glow Halo */}
                {isHovered && (
                  <circle cx={p.x} cy={p.y} r="9" fill="#2563EB" fillOpacity="0.2" className="animate-pulse" />
                )}
                {/* 3D Node Sphere Base */}
                <circle cx={p.x} cy={p.y + 1} r="5" fill="#0B192C" fillOpacity="0.35" />
                {/* 3D Node Sphere Core */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? '5.5' : '4.5'}
                  fill="#0B192C"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />
                {/* Specular Highlight */}
                <circle cx={p.x - 1.2} cy={p.y - 1.2} r="1.2" fill="#93C5FD" />
              </g>
            );
          })}

          {/* Forecast Future Projection Nodes (Days 5 to 7) */}
          {forecastPoints.slice(4).map((p, i) => {
            const actualIndex = 4 + i;
            const isHovered = hoveredIndex === actualIndex;
            return (
              <g key={`forecast-node-${i}`} className="cursor-pointer">
                {/* 3D Drop Line to Floor */}
                <line
                  x1={p.x}
                  y1={p.y}
                  x2={p.x}
                  y2={floorY}
                  stroke="#7C3AED"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  strokeOpacity={isHovered ? 0.6 : 0.25}
                />
                {/* Forecast Diamond / Ring Node */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? '5.5' : '4'}
                  fill="#FFFFFF"
                  stroke="#7C3AED"
                  strokeWidth="2.2"
                  className="transition-all duration-150"
                />
                <circle cx={p.x} cy={p.y} r="1.8" fill="#7C3AED" />
              </g>
            );
          })}

          {/* ================= COMPACT 3D FLOATING ENDPOINT GAP MARKER ================= */}
          {(() => {
            const lastForecast = forecastPoints[forecastPoints.length - 1];
            const lastTarget = targetPoints[targetPoints.length - 1];
            const markerX = lastForecast.x + 12;
            const markerY = (lastForecast.y + lastTarget.y) / 2 - 14;

            return (
              <g filter="url(#glowBadge)" className="transition-transform duration-200">
                {/* Connecting Pin / Bracket */}
                <path
                  d={`
                    M ${lastTarget.x} ${lastTarget.y}
                    L ${markerX - 4} ${markerY + 6}
                    M ${lastForecast.x} ${lastForecast.y}
                    L ${markerX - 4} ${markerY + 22}
                  `}
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="1.2"
                  strokeDasharray="2 2"
                  strokeOpacity="0.8"
                />
                {/* 3D Floating Badge Card */}
                <rect
                  x={markerX}
                  y={markerY}
                  width="88"
                  height="36"
                  rx="6"
                  fill="#FFFFFF"
                  stroke="#FCA5A5"
                  strokeWidth="1.2"
                />
                {/* Top Colored Accent Strip */}
                <path
                  d={`M ${markerX} ${markerY + 4} A 4 4 0 0 1 ${markerX + 4} ${markerY} L ${markerX + 84} ${markerY} A 4 4 0 0 1 ${markerX + 88} ${markerY + 4} L ${markerX + 88} ${markerY + 4} L ${markerX} ${markerY + 4} Z`}
                  fill="#DC2626"
                />
                <text
                  x={markerX + 8}
                  y={markerY + 14}
                  fill="#991B1B"
                  fontSize="8.5"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="800"
                  letterSpacing="0.05em"
                >
                  PROJECTED GAP
                </text>
                <text
                  x={markerX + 8}
                  y={markerY + 28}
                  fill="#DC2626"
                  fontSize="12.5"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="900"
                >
                  -1,600 t
                </text>
              </g>
            );
          })()}

          {/* ================= INTERACTIVE INVISIBLE HOVER HIT AREAS ================= */}
          {data.map((d, i) => {
            const x = getX(i);
            const colWidth = (width - padding.left - padding.right) / (count - 1);
            return (
              <rect
                key={`hit-${i}`}
                x={x - colWidth / 2}
                y={padding.top - 10}
                width={colWidth}
                height={height - padding.top}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
        </svg>

        {/* COMPACT FLOATING HOVER TOOLTIP */}
        {activeItem && hoveredIndex !== null && (
          <div
            className="absolute z-20 pointer-events-none transition-all duration-150 ease-out bg-white/95 backdrop-blur-sm border border-border shadow-popover rounded-lg p-2.5 text-xs text-navy-primary font-sans"
            style={{
              left: `${Math.min(78, Math.max(12, (getX(hoveredIndex) / width) * 100))}%`,
              top: '12px',
              transform: 'translateX(-50%)',
              minWidth: '190px',
            }}
          >
            <div className="flex items-center justify-between border-b border-border pb-1.5 mb-1.5">
              <span className="font-bold text-navy-primary flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                <span>{activeItem.day}</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                {activeItem.status}
              </span>
            </div>

            <div className="space-y-1 font-mono text-[11px]">
              {activeItem.actual !== null ? (
                <div className="flex items-center justify-between text-navy-primary">
                  <span className="text-slate-500 font-sans">Actual Output:</span>
                  <span className="font-bold">{activeItem.actual.toLocaleString()} t</span>
                </div>
              ) : (
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-sans">Actual Output:</span>
                  <span className="italic font-sans text-[10px]">Pending shift</span>
                </div>
              )}

              <div className="flex items-center justify-between text-blue-700">
                <span className="text-slate-500 font-sans">Forecast Trajectory:</span>
                <span className="font-bold">{activeItem.forecast.toLocaleString()} t</span>
              </div>

              <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-100">
                <span className="text-slate-500 font-sans">Target Quota:</span>
                <span>{activeItem.target.toLocaleString()} t</span>
              </div>

              {activeItem.gap !== 0 && (
                <div className="flex items-center justify-between text-red-600 font-bold">
                  <span className="font-sans text-red-700">Target Gap:</span>
                  <span>{activeItem.gap > 0 ? `+${activeItem.gap}` : `${activeItem.gap}`} t</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3D LEGEND BAR */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-navy-secondary pt-2 border-t border-slate-100">
        <div className="flex items-center space-x-2">
          <span className="w-3.5 h-1.5 rounded-sm bg-[#0B192C] shadow-xs" />
          <span className="font-medium">Actual Output (Day 1–4)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3.5 h-1.5 rounded-sm bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xs" />
          <span className="font-medium">Forecast Trajectory (Day 5–7)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3.5 h-0.5 border-t-2 border-dashed border-slate-400" />
          <span className="text-slate-500 font-medium">Target Quota</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-2 rounded-xs bg-red-100 border border-red-300" />
          <span className="text-red-700 font-semibold">Deficit Volume</span>
        </div>
      </div>
    </div>
  );
};
