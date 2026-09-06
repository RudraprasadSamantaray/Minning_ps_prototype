import React from 'react';
import { DATA_QUALITY_SOURCES } from '../../data/miningData';
import {
  Database,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Layers,
} from 'lucide-react';

export const DataQualityScreen: React.FC = () => {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-navy-primary tracking-tight">DATA QUALITY & PIPELINE</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              HEALTH: 94.2%
            </span>
          </div>
          <p className="text-xs text-navy-muted mt-0.5">
            Multi-modal sensor validation, temporal alignment, and AI-readiness verification
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono bg-canvas px-2.5 py-1 rounded border border-border text-navy-muted">
            All 5 Pipelines Synchronized
          </span>
        </div>
      </div>

      {/* 6-Stage Processing Architecture */}
      <div className="industrial-card p-5">
        <h3 className="text-xs font-bold text-navy-primary uppercase tracking-wider font-mono mb-3 pb-2 border-b border-border">
          END-TO-END DATA CLEANING & STANDARDIZATION PIPELINE
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-2.5 text-xs">
          <div className="p-3 bg-canvas rounded-lg border border-border space-y-1">
            <span className="font-mono text-[10px] text-navy-muted uppercase font-bold">STAGE 1</span>
            <h4 className="font-bold text-navy-primary">Raw Ingestion</h4>
            <p className="text-[11px] text-slate-600">CAN-bus, IoT sensors, satellite spectral feeds.</p>
          </div>

          <div className="p-3 bg-canvas rounded-lg border border-border space-y-1">
            <span className="font-mono text-[10px] text-blue-600 uppercase font-bold">STAGE 2</span>
            <h4 className="font-bold text-navy-primary">Validation</h4>
            <p className="text-[11px] text-slate-600">Schema boundaries and parity checksums.</p>
          </div>

          <div className="p-3 bg-canvas rounded-lg border border-border space-y-1">
            <span className="font-mono text-[10px] text-teal-600 uppercase font-bold">STAGE 3</span>
            <h4 className="font-bold text-navy-primary">Outlier Cleaning</h4>
            <p className="text-[11px] text-slate-600">Noise filtering and transient spikes removal.</p>
          </div>

          <div className="p-3 bg-canvas rounded-lg border border-border space-y-1">
            <span className="font-mono text-[10px] text-indigo-600 uppercase font-bold">STAGE 4</span>
            <h4 className="font-bold text-navy-primary">Temporal Align</h4>
            <p className="text-[11px] text-slate-600">Millisecond time-sync across mine systems.</p>
          </div>

          <div className="p-3 bg-canvas rounded-lg border border-border space-y-1">
            <span className="font-mono text-[10px] text-purple-600 uppercase font-bold">STAGE 5</span>
            <h4 className="font-bold text-navy-primary">Standardize</h4>
            <p className="text-[11px] text-slate-600">Normalized coordinates in WGS84 GIS grid.</p>
          </div>

          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-300 space-y-1">
            <span className="font-mono text-[10px] text-emerald-700 uppercase font-bold">STAGE 6</span>
            <h4 className="font-bold text-emerald-950">AI-Ready Tensor</h4>
            <p className="text-[11px] text-emerald-800">Directly feeding XGBoost & Bayesian models.</p>
          </div>
        </div>
      </div>

      {/* Stream Health Details */}
      <div className="industrial-card p-5">
        <h3 className="text-xs font-bold text-navy-primary uppercase tracking-wider font-mono mb-3 pb-2 border-b border-border">
          MULTI-MODAL DATA SOURCES HEALTH STATUS
        </h3>

        <div className="space-y-3">
          {DATA_QUALITY_SOURCES.map((source, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-canvas border border-border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-navy-primary">{source.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      source.status === 'Optimal'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {source.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">{source.activeSensors}</p>
              </div>

              <div className="flex items-center space-x-4 self-end sm:self-center font-mono">
                <div className="text-right">
                  <span className="text-[10px] text-navy-muted block">Latency</span>
                  <span className="font-bold text-navy-primary">{source.latencySeconds}s</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-navy-muted block">Health Score</span>
                  <span className="font-bold text-emerald-600 text-sm">{source.healthPercent}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
