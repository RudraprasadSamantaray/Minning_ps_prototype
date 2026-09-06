import React, { useState } from 'react';
import { useMining } from '../../context/MiningContext';
import {
  X,
  Printer,
  Download,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sliders,
  ShieldCheck,
  Calendar,
  Compass,
  Building2,
  UserCheck,
  Check,
  Share2,
  Copy,
} from 'lucide-react';

export const ShiftReportModal: React.FC = () => {
  const {
    isReportModalOpen,
    setIsReportModalOpen,
    simulatorInputs,
    simulatorOutputs,
    selectedOptionId,
    decisionStatus,
    executionTasks,
    lastDecisionNote,
  } = useMining();

  const [activeTab, setActiveTab] = useState<'all' | 'summary' | 'geology' | 'simulator' | 'audit'>('all');
  const [copied, setCopied] = useState(false);

  if (!isReportModalOpen) return null;

  const reportDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const reportTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const reportId = 'RPT-2026-BAL04-B89';

  // Handle native window print
  const handlePrint = () => {
    window.print();
  };

  // Generate self-contained HTML document for download
  const handleDownloadHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>26009 Mining Intelligence Shift Report - Balaghat Mine Block 04</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #0F172A; background: #FFF; margin: 40px; }
    .header { border-bottom: 2px solid #0F172A; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
    .title { font-size: 24px; font-weight: 800; color: #0F172A; margin: 0; }
    .subtitle { font-size: 14px; color: #475569; margin-top: 4px; }
    .meta-box { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; font-size: 12px; margin-bottom: 24px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
    .badge-high { background: #FEE2E2; color: #991B1B; border: 1px solid #FCA5A5; }
    .badge-success { background: #DCFCE7; color: #166534; border: 1px solid #86EFAC; }
    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
    .kpi-card { border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; background: #F8FAFC; }
    .kpi-val { font-size: 22px; font-weight: 800; color: #0F172A; margin: 4px 0; }
    .kpi-lbl { font-size: 11px; color: #64748B; text-transform: uppercase; font-weight: 600; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }
    th, td { border: 1px solid #E2E8F0; padding: 10px 12px; text-align: left; }
    th { background: #F1F5F9; font-weight: 700; color: #334155; }
    .section-title { font-size: 16px; font-weight: 800; margin-top: 28px; margin-bottom: 12px; color: #0F172A; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px; }
    .stamp-box { border: 2px dashed #0F172A; padding: 16px; border-radius: 8px; display: inline-block; margin-top: 24px; background: #FAFAFA; }
    .disclaimer { font-size: 11px; color: #64748B; margin-top: 40px; border-top: 1px solid #E2E8F0; padding-top: 12px; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="title">26009 — AI MINING DECISION SUPPORT SYSTEM</h1>
      <div class="subtitle">Operational Shift Intelligence & Production Risk Report • Balaghat Manganese Complex</div>
    </div>
    <div style="text-align: right;">
      <div style="font-weight: bold; font-size: 14px;">${reportId}</div>
      <div style="font-size: 12px; color: #64748B;">Shift B • ${reportDate}</div>
    </div>
  </div>

  <div class="meta-box">
    <div><strong>Mine Site:</strong> Balaghat Complex (MP)</div>
    <div><strong>Active Sector:</strong> Mine Block 04 (Pit South)</div>
    <div><strong>Chief Manager:</strong> R. Sengupta (Reg #MN-48291)</div>
    <div><strong>Classification:</strong> <span class="badge badge-high">72% Shortfall Risk Detected</span></div>
  </div>

  <div class="section-title">1. EXECUTIVE KPI BENCHMARK [SHARED DEMO SCENARIO]</div>
  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-lbl">Target Production</div>
      <div class="kpi-val">20,000 t</div>
      <div style="font-size: 11px; color: #64748B;">Monthly Quota</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-lbl">Expected Production</div>
      <div class="kpi-val" style="color: #DC2626;">18,400 t</div>
      <div style="font-size: 11px; color: #DC2626;">-1,600 t Deficit</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-lbl">Shortfall Risk</div>
      <div class="kpi-val" style="color: #EA580C;">72%</div>
      <div style="font-size: 11px; color: #EA580C;">High Priority Alert</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-lbl">Simulated Recovery</div>
      <div class="kpi-val" style="color: #16A34A;">19,225 t</div>
      <div style="font-size: 11px; color: #16A34A;">+825 t (35% Risk)</div>
    </div>
  </div>

  <div class="section-title">2. QUANTITATIVE ROOT-CAUSE ATTRIBUTION</div>
  <table>
    <thead>
      <tr>
        <th>Factor Category</th>
        <th>Measured Telemetry / Event</th>
        <th>Impact on Production</th>
        <th>Contribution %</th>
        <th>Mitigation Vector</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Equipment Downtime</strong></td>
        <td>Excavator E12 scheduled track motor overhaul</td>
        <td style="color: #DC2626; font-weight: bold;">-780 t</td>
        <td>48.8%</td>
        <td>Redeploy standby excavator E08 to Bench 02</td>
      </tr>
      <tr>
        <td><strong>Rainfall / Inundation</strong></td>
        <td>68mm heavy monsoon surge; Zone B sump +1.8m</td>
        <td style="color: #DC2626; font-weight: bold;">-420 t</td>
        <td>26.2%</td>
        <td>Activate high-head dewatering pump line #3</td>
      </tr>
      <tr>
        <td><strong>Blasting Clearance Delay</strong></td>
        <td>DGMS clearance delay on Bench 04 (5-day slip)</td>
        <td style="color: #DC2626; font-weight: bold;">-260 t</td>
        <td>16.2%</td>
        <td>Compress secondary blast cycle to 48 hours</td>
      </tr>
      <tr>
        <td><strong>Haul Fleet Constraints</strong></td>
        <td>Wet haul road gradient friction slows cycles</td>
        <td style="color: #DC2626; font-weight: bold;">-140 t</td>
        <td>8.8%</td>
        <td>Deploy grader fleet for aggregate resurfacing</td>
      </tr>
    </tbody>
  </table>

  <div class="section-title">3. GEOLOGICAL & 3D DIGITAL TWIN EVALUATION</div>
  <table>
    <thead>
      <tr>
        <th>Zone</th>
        <th>Mineralization Probability</th>
        <th>Ore Grade (% Mn)</th>
        <th>Depth (m)</th>
        <th>AI Operational Assessment</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Zone A (East Wall)</strong></td>
        <td><span class="badge badge-success">84.2% High Prob</span></td>
        <td>43.8% Mn (Braunite)</td>
        <td>42–68m</td>
        <td>High-priority exploration target; verified drill core assay</td>
      </tr>
      <tr>
        <td><strong>Zone B (Pit Floor / Sump)</strong></td>
        <td>68.0% Moderate</td>
        <td>34.2% Mn</td>
        <td>70–95m</td>
        <td>Temporarily restricted by water accumulation (68mm storm)</td>
      </tr>
      <tr>
        <td><strong>Zone C (North Ridge)</strong></td>
        <td>61.5% Moderate</td>
        <td>38.5% Mn</td>
        <td>15–35m</td>
        <td>Immediate dry extraction candidate to recover tonnage gap</td>
      </tr>
    </tbody>
  </table>

  <div class="section-title">4. WHAT-IF SIMULATION & DECISION OUTCOME</div>
  <p><strong>Baseline Plan:</strong> 18,400 tonnes expected (72% shortfall risk)</p>
  <p><strong>Simulated Optimized Strategy:</strong> Equipment availability 70% &rarr; 85%, Blasting delay 5d &rarr; 2d, Zone priority shifted to Zone C.</p>
  <p><strong>Simulated Result:</strong> Expected <strong>19,225 tonnes</strong> (+825 t recovered), Shortfall risk reduced from 72% to <strong>35%</strong> (-37 points), Operational Feasibility: <strong>92%</strong>.</p>

  <div class="section-title">5. MANAGERIAL DIRECTIVE & AUTHORIZATION</div>
  <div class="stamp-box">
    <div style="font-weight: 800; font-size: 14px; text-transform: uppercase; color: #0F172A;">
      &check; HUMAN-IN-THE-LOOP AUTHORIZED DIRECTIVE
    </div>
    <div style="margin-top: 8px; font-size: 13px;">
      <strong>Selected Strategy:</strong> Option A — Accelerated Equipment Redeployment & Blasting Adjustment<br>
      <strong>Manager Note:</strong> "${lastDecisionNote || 'Approved mobilization of backup Excavator E08 to Bench 02. Priority drainage lines assigned to Sump B. Blasting clearance compressed to 48 hours.'}"<br>
      <strong>Authorized By:</strong> R. Sengupta, Chief Mine Manager (Balaghat)<br>
      <strong>Status:</strong> ${decisionStatus.toUpperCase()} &bull; Dispatched to Dispatch Control
    </div>
  </div>

  <div class="disclaimer">
    <strong>DISCLAIMER & INTEGRITY NOTICE:</strong> This decision-support report was generated by the 26009 AI Mining Platform for demonstration and operational testing purposes. Model estimates and simulated projections are labeled as [DEMO DATA] and do not replace mandatory statutory inspections under DGMS regulations.
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Balaghat_MineBlock04_ShiftReport_${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Generate structured JSON for download
  const handleDownloadJSON = () => {
    const reportData = {
      reportId,
      timestamp: new Date().toISOString(),
      mine: 'Balaghat Manganese Complex',
      block: 'Mine Block 04',
      shift: 'Shift B (14:00 - 22:00)',
      officer: 'R. Sengupta (Chief Mine Manager)',
      scenario: {
        targetTonnes: 20000,
        expectedTonnes: 18400,
        projectedShortfall: 1600,
        shortfallRiskPercent: 72,
        classification: 'HIGH_RISK_DETECTED',
      },
      attribution: [
        { factor: 'Equipment Downtime', metric: 'Excavator E12 Overhaul', impactTons: -780, percentage: 48.8 },
        { factor: 'Rainfall / Sump Inundation', metric: '68mm Storm, Sump +1.8m', impactTons: -420, percentage: 26.2 },
        { factor: 'Blasting Clearance Delay', metric: 'Bench 04 5-Day Delay', impactTons: -260, percentage: 16.2 },
        { factor: 'Haul Fleet Friction', metric: 'Wet Haul Road Gradient', impactTons: -140, percentage: 8.8 },
      ],
      simulation: {
        inputs: simulatorInputs,
        outputs: simulatorOutputs,
        baselineExpected: 18400,
        baselineRisk: 72,
        simulatedExpected: 19225,
        simulatedRisk: 35,
        recoveredTonnage: 825,
        riskReductionPoints: 37,
        feasibilityScore: 92,
      },
      decision: {
        selectedOptionId,
        decisionStatus,
        managerNote: lastDecisionNote || 'Approved accelerated redeployment of Excavator E08.',
        tasks: executionTasks,
      },
      dataQualityHealth: 94,
      isDemoData: true,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Balaghat_MineBlock04_ShiftData_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy brief summary to clipboard
  const handleCopySummary = () => {
    const summaryText = `26009 MINING INTELLIGENCE SHIFT REPORT [${reportId}]
Site: Balaghat Complex • Mine Block 04 | Shift B
Target: 20,000 t | Expected: 18,400 t | Shortfall: 1,600 t (72% Risk)
Root Causes: Equipment (-780t), Rainfall (-420t), Blasting (-260t), Productivity (-140t)
What-If Simulated Recovery: 19,225 t (+825 t recovery, 35% risk)
Manager Directive: Approved Option A (Redeploy E08, Dewater Sump B, Compress Blasting)`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-primary/60 backdrop-blur-sm p-4 overflow-y-auto">
      {/* Printable / Modal Main Frame */}
      <div className="printable-report-modal bg-surface rounded-2xl border border-border shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-fade-in print:max-w-none print:max-h-none print:shadow-none print:border-none print:w-full">
        
        {/* Top Header Bar: Actions & Document Details (Hidden during print) */}
        <div className="p-4 border-b border-border bg-canvas flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-navy-primary flex items-center justify-center text-white shadow-sm">
              <FileText className="w-5 h-5 text-mining-blue" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-extrabold text-base text-navy-primary">
                  Shift Intelligence & Operational Decision Report
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-mining-blue border border-blue-200">
                  {reportId}
                </span>
              </div>
              <p className="text-xs text-navy-muted">
                Balaghat Manganese Complex • Mine Block 04 | Shift B (14:00 - 22:00 IST)
              </p>
            </div>
          </div>

          {/* Action Buttons: Print, Download HTML, Download JSON, Close */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopySummary}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface hover:bg-slate-50 text-xs font-semibold text-navy-secondary transition-colors"
              title="Copy executive brief to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied!' : 'Copy Brief'}</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface hover:bg-slate-50 text-xs font-semibold text-navy-secondary transition-colors"
              title="Download structured JSON dataset for ERP"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>JSON</span>
            </button>

            <button
              onClick={handleDownloadHTML}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-xs font-semibold text-mining-blue transition-colors shadow-sm"
              title="Download standalone HTML Report document"
            >
              <Download className="w-3.5 h-3.5 text-mining-blue" />
              <span>Download HTML/PDF</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-navy-primary hover:bg-slate-800 text-xs font-semibold text-white transition-colors shadow-sm"
              title="Print or Save to PDF via Browser"
            >
              <Printer className="w-3.5 h-3.5 text-white" />
              <span>Print to PDF</span>
            </button>

            <button
              onClick={() => setIsReportModalOpen(false)}
              className="p-1.5 text-slate-400 hover:text-navy-primary hover:bg-slate-100 rounded-lg transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Filters (Hidden during print) */}
        <div className="px-6 py-2.5 bg-surface border-b border-border flex items-center justify-between text-xs print:hidden">
          <div className="flex items-center space-x-1">
            <span className="text-navy-muted font-bold mr-2 text-[11px] uppercase tracking-wider">
              Sections:
            </span>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-navy-primary text-white shadow-xs'
                  : 'text-navy-secondary hover:bg-slate-100'
              }`}
            >
              Full Document
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                activeTab === 'summary'
                  ? 'bg-navy-primary text-white shadow-xs'
                  : 'text-navy-secondary hover:bg-slate-100'
              }`}
            >
              KPI & Variance
            </button>
            <button
              onClick={() => setActiveTab('geology')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                activeTab === 'geology'
                  ? 'bg-navy-primary text-white shadow-xs'
                  : 'text-navy-secondary hover:bg-slate-100'
              }`}
            >
              Geology & GIS
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                activeTab === 'simulator'
                  ? 'bg-navy-primary text-white shadow-xs'
                  : 'text-navy-secondary hover:bg-slate-100'
              }`}
            >
              What-If Scenario
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                activeTab === 'audit'
                  ? 'bg-navy-primary text-white shadow-xs'
                  : 'text-navy-secondary hover:bg-slate-100'
              }`}
            >
              Manager Directive
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-500">
            Certified Decision Support Record
          </div>
        </div>

        {/* Scrollable Printable Report Canvas */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-surface text-navy-primary print:p-0 print:overflow-visible">
          
          {/* Official Document Banner */}
          <div className="border-b-2 border-navy-primary pb-5 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-mining-blue">
                  GOVERNMENT OF INDIA &bull; MINISTRY OF MINES / MOIL STANDARDS
                </span>
                <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                  DEMO PROTOCOL
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-navy-primary tracking-tight">
                26009 AI MINING DECISION-SUPPORT SYSTEM
              </h1>
              <p className="text-sm text-navy-secondary font-medium">
                Operational Production Forecast, Shortfall Risk & Managerial Directive Record
              </p>
            </div>

            <div className="text-right space-y-1">
              <div className="text-xs font-mono font-bold text-navy-primary">
                SERIAL: {reportId}
              </div>
              <div className="text-xs text-navy-muted">
                {reportDate} &bull; {reportTime}
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-300">
                STATUS: 72% SHORTFALL RISK ACTIVE
              </div>
            </div>
          </div>

          {/* Context Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-canvas border border-border text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Mine Location</span>
              <span className="font-bold text-navy-primary">Balaghat Complex (MP)</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Active Sector</span>
              <span className="font-bold text-navy-primary">Mine Block 04 &bull; Pit South</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Shift In-Charge</span>
              <span className="font-bold text-navy-primary">R. Sengupta (Chief Mgr)</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Telemetry Stream</span>
              <span className="font-bold text-emerald-600 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active [Demo Stream]</span>
              </span>
            </div>
          </div>

          {/* Section 1: Executive KPI Benchmark */}
          {(activeTab === 'all' || activeTab === 'summary') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-navy-primary flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-mining-blue" />
                  <span>1. Executive Production Benchmark [Shared Demo Scenario]</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-400">Baseline vs Target</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-border bg-surface-subtle">
                  <span className="text-[10px] font-mono uppercase font-bold text-navy-muted block">
                    Target Production
                  </span>
                  <div className="text-2xl font-extrabold text-navy-primary font-mono mt-1">
                    20,000 <span className="text-xs font-sans text-navy-muted">tonnes</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Monthly Operational Goal</span>
                </div>

                <div className="p-4 rounded-xl border border-red-200 bg-red-50/50">
                  <span className="text-[10px] font-mono uppercase font-bold text-red-800 block">
                    Expected Production
                  </span>
                  <div className="text-2xl font-extrabold text-red-600 font-mono mt-1">
                    18,400 <span className="text-xs font-sans text-red-500">tonnes</span>
                  </div>
                  <span className="text-[11px] text-red-700 font-semibold mt-1 block">
                    &darr; 1,600 t Projected Shortfall
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-800 block">
                    Shortfall Risk
                  </span>
                  <div className="text-2xl font-extrabold text-amber-600 font-mono mt-1">
                    72%
                  </div>
                  <span className="text-[11px] text-amber-800 font-semibold mt-1 block">
                    High Early Warning Risk
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-800 block">
                    Simulated Recovery
                  </span>
                  <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">
                    19,225 <span className="text-xs font-sans text-emerald-500">tonnes</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
                    +825 t Recovered (35% Risk)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Quantitative Variance & Root-Cause Attribution */}
          {(activeTab === 'all' || activeTab === 'summary') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-navy-primary flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-mining-blue" />
                  <span>2. Quantitative Root-Cause Attribution</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-400">Total Deficit: -1,600 tonnes</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-border rounded-lg overflow-hidden">
                  <thead className="bg-canvas border-b border-border font-mono text-navy-muted uppercase text-[11px]">
                    <tr>
                      <th className="p-3">Contributing Factor</th>
                      <th className="p-3">Telemetry / Operational Trigger</th>
                      <th className="p-3 text-right">Production Impact</th>
                      <th className="p-3 text-right">Attribution %</th>
                      <th className="p-3">Mitigation Directive</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-navy-primary flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>Equipment Downtime</span>
                      </td>
                      <td className="p-3 text-navy-secondary">
                        Excavator E12 overhaul; cycle time loss on Bench 03
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-red-600">
                        -780 t
                      </td>
                      <td className="p-3 text-right font-mono text-navy-muted">48.8%</td>
                      <td className="p-3 text-navy-primary font-medium">
                        Redeploy standby excavator E08 to Bench 02
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-navy-primary flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-sky-500" />
                        <span>Monsoon Precipitation</span>
                      </td>
                      <td className="p-3 text-navy-secondary">
                        68mm localized storm surge; Zone B sump water +1.8m
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-red-600">
                        -420 t
                      </td>
                      <td className="p-3 text-right font-mono text-navy-muted">26.2%</td>
                      <td className="p-3 text-navy-primary font-medium">
                        Activate high-capacity dewatering pump line #3
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-navy-primary flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        <span>Blasting Clearance Delay</span>
                      </td>
                      <td className="p-3 text-navy-secondary">
                        Bench 04 regulatory clearance delayed 5 days
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-red-600">
                        -260 t
                      </td>
                      <td className="p-3 text-right font-mono text-navy-muted">16.2%</td>
                      <td className="p-3 text-navy-primary font-medium">
                        Compress secondary blast clearance to 48 hours
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-navy-primary flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        <span>Fleet Haul Cycle Friction</span>
                      </td>
                      <td className="p-3 text-navy-secondary">
                        Wet haul road gradient friction slowing tipper cycles
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-red-600">
                        -140 t
                      </td>
                      <td className="p-3 text-right font-mono text-navy-muted">8.8%</td>
                      <td className="p-3 text-navy-primary font-medium">
                        Deploy motor grader fleet for aggregate resurfacing
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section 3: Geological & 3D Digital Twin Profile */}
          {(activeTab === 'all' || activeTab === 'geology') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-navy-primary flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-mining-blue" />
                  <span>3. Geological & Remote Sensing Zone Profile</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-400">Drill Assay & Satellite Layers</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-navy-primary">Zone A &bull; East Wall</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                      84.2% Probability
                    </span>
                  </div>
                  <div className="text-xs space-y-1 text-navy-secondary">
                    <div><strong>Ore Grade:</strong> 43.8% Mn (Braunite/Pyrolusite)</div>
                    <div><strong>Target Depth:</strong> 42–68 meters</div>
                    <div><strong>Status:</strong> High-priority exploration target verified by drill core assay cylinders.</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-navy-primary">Zone B &bull; Central Pit Floor</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800">
                      68.0% Probability
                    </span>
                  </div>
                  <div className="text-xs space-y-1 text-navy-secondary">
                    <div><strong>Ore Grade:</strong> 34.2% Mn</div>
                    <div><strong>Target Depth:</strong> 70–95 meters</div>
                    <div><strong>Environmental Condition:</strong> Flooded sump (+1.8m); dewatering priority before safe bench entry.</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-navy-primary">Zone C &bull; North Ridge Bench</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-100 text-teal-800">
                      61.5% Probability
                    </span>
                  </div>
                  <div className="text-xs space-y-1 text-navy-secondary">
                    <div><strong>Ore Grade:</strong> 38.5% Mn</div>
                    <div><strong>Target Depth:</strong> 15–35 meters</div>
                    <div><strong>Status:</strong> Dry accessible bench; immediate candidate for production shortfall recovery.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: What-If Simulation Evaluation */}
          {(activeTab === 'all' || activeTab === 'simulator') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-navy-primary flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-mining-blue" />
                  <span>4. What-If Simulation Evaluation [Scenario Comparison]</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-400">Tested in Decision Sandbox</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="text-xs font-mono font-bold uppercase text-slate-500 block">
                    Baseline Operational Plan
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Equipment Availability: <strong className="font-mono">70%</strong></div>
                    <div>Blasting Delay: <strong className="font-mono">5 Days</strong></div>
                    <div>Expected Production: <strong className="font-mono text-red-600">18,400 t</strong></div>
                    <div>Shortfall Risk: <strong className="font-mono text-red-600">72%</strong></div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-mining-blue block">
                      Simulated Recovery Scenario
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      92% Feasibility Score
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Equipment Availability: <strong className="font-mono">85% (+15%)</strong></div>
                    <div>Blasting Delay: <strong className="font-mono">2 Days (-3d)</strong></div>
                    <div>Expected Production: <strong className="font-mono text-emerald-700">19,225 t (+825 t)</strong></div>
                    <div>Shortfall Risk: <strong className="font-mono text-emerald-700">35% (-37 pts)</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Manager Directive & Formal Sign-Off */}
          {(activeTab === 'all' || activeTab === 'audit') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-navy-primary flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-mining-blue" />
                  <span>5. Manager Directive & Formal Authorization</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-400">Human-In-The-Loop Governance</span>
              </div>

              <div className="p-5 rounded-xl border-2 border-navy-primary/80 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-5 h-5 text-emerald-600" />
                    <span className="font-extrabold text-sm text-navy-primary">
                      Selected Operational Directive: Option A (AI Preferred)
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    STATUS: {decisionStatus.toUpperCase()}
                  </span>
                </div>

                <p className="text-xs text-navy-secondary leading-relaxed bg-white p-3 rounded-lg border border-border">
                  <strong>Authorized Action Notes:</strong> "{lastDecisionNote || 'Approved mobilization of backup Excavator E08 to Bench 02. Priority drainage lines assigned to Sump B. Blasting clearance compressed to 48 hours.'}"
                </p>

                {/* Execution Tasks Status Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {executionTasks.map((t) => (
                    <div key={t.id} className="p-2.5 rounded-lg border border-border bg-white text-xs space-y-1">
                      <div className="font-semibold text-navy-primary">{t.title}</div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-navy-muted">{t.responsibleLead}</span>
                        <span className={`font-mono font-bold px-1.5 py-0.5 rounded text-[10px] uppercase ${
                          t.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : t.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {t.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sign-off Signature Box */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px]">AUTHORIZED DIGITAL SIGNATURE:</span>
                    <span className="font-bold text-navy-primary text-sm tracking-wide">
                      R. Sengupta &bull; Chief Mine Manager
                    </span>
                    <span className="text-slate-500 block text-[10px]">DGMS Reg #MN-48291 &bull; Balaghat Sector</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">SECURITY AUDIT HASH:</span>
                    <span className="font-bold text-slate-700 text-xs">
                      BLG-2026-OP-REC-B89
                    </span>
                    <span className="text-emerald-600 block text-[10px] font-bold">
                      &check; Logged to Operational Decision Memory
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Legal / Competition Prototype Footer */}
          <div className="border-t border-border pt-4 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2 print:text-[10px]">
            <div>
              26009 AI Mining Decision Support Prototype &bull; Ministry of Mines Smart India Hackathon
            </div>
            <div className="font-mono">
              Demo Environment: Simulated Telemetry & Model Estimates &bull; Page 1 of 1
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
