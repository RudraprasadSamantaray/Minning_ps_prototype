import React from 'react';
import { useMining } from '../../context/MiningContext';
import {
  PlayCircle,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

interface StepInfo {
  step: number;
  title: string;
  question: string;
  description: string;
}

const TOUR_STEPS: StepInfo[] = [
  {
    step: 1,
    title: 'Command Center: Current Operational State',
    question: 'WHAT IS HAPPENING RIGHT NOW?',
    description:
      'AI Early Warning predicts 18,400 tonnes vs 20,000 tonnes target. A projected shortfall of 1,600 tonnes with 72% High Risk is detected.',
  },
  {
    step: 2,
    title: 'AI Risk & Explainability (SHAP)',
    question: 'WHY IS IT HAPPENING?',
    description:
      'SHAP attribution decomposes the 72% risk: Excavator E12 downtime (+28%), 42mm localized rainfall (+19%), and Blast #104 deferral (+14%).',
  },
  {
    step: 3,
    title: 'AI Recommendation Engine',
    question: 'WHAT CAN WE DO?',
    description:
      'AI proposes Option A: Redeploy standby Excavator E14 to dry Zone C, pre-initiate Blast #105, and route haul cycles around flooded Zone B.',
  },
  {
    step: 4,
    title: 'What-If Simulator: Scenario Sandbox',
    question: 'WHAT HAPPENS IF WE CHANGE THE PLAN?',
    description:
      'Test management interventions: Increase fleet availability from 70% to 85%, and compress blasting delay from 5 days to 2 days.',
  },
  {
    step: 5,
    title: 'Reactive Simulation Recalculation',
    question: 'HOW MUCH SHORTFALL DO WE RECOVER?',
    description:
      'Shared calculation model instantly recalculates: Production rises to 19,200 t (+800 t recovery) and risk drops from 72% to 42%.',
  },
  {
    step: 6,
    title: 'Commit Scenario to Decision Center',
    question: 'TRANSITIONING SIMULATION TO ACTION',
    description:
      'Scenario parameters are applied directly to the Decision Center, comparing Option A against overtime and grade dilution alternatives.',
  },
  {
    step: 7,
    title: 'Human Authority: Manager Decision',
    question: 'APPROVE, MODIFY, OR REJECT?',
    description:
      'Human-in-the-loop governance: Mine Manager R. Sengupta reviews AI suggestions and approves the operational redeployment plan.',
  },
  {
    step: 8,
    title: 'Action Execution Tracking',
    question: 'HOW IS THE PLAN DISPATCHED?',
    description:
      'Lightweight operational dispatch tracker coordinates Fleet Dispatch (S. Verma), Blasting Engineer (D. Roy), and Safety Crew.',
  },
  {
    step: 9,
    title: 'Outcome Monitoring: Predicted vs Actual',
    question: 'DID THE DECISION WORK?',
    description:
      'Cycle outcome recorded: Actual production 18,920 t vs predicted 19,200 t. Variance is -280 t (-1.45% error), validating 98.5% recovery.',
  },
  {
    step: 10,
    title: 'Feedback Loop & Continuous Learning',
    question: 'HOW DOES THE SYSTEM LEARN?',
    description:
      'Actual outcome feeds back into model weights via a closed learning loop, improving Model v2.4 MAPE to 4.88% for subsequent shifts.',
  },
];

export const GuidedTourBar: React.FC = () => {
  const { guidedStep, nextGuidedStep, prevGuidedStep, exitGuidedTour } = useMining();

  if (guidedStep === 0) return null;

  const currentInfo = TOUR_STEPS[guidedStep - 1] || TOUR_STEPS[0];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl z-40 bg-navy-primary text-white p-4 rounded-xl shadow-2xl border-2 border-blue-500/80 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Step Index & Title */}
        <div className="flex items-start space-x-3">
          <div className="w-9 h-9 rounded-lg bg-mining-blue text-white flex items-center justify-center font-bold text-sm font-mono shrink-0 shadow">
            {guidedStep}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300">
                HACKATHON DEMO TOUR • STEP {guidedStep} OF 10
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs font-mono font-semibold text-emerald-300">
                {currentInfo.question}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">{currentInfo.title}</h4>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">{currentInfo.description}</p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center justify-end space-x-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-slate-700">
          <button
            onClick={prevGuidedStep}
            disabled={guidedStep === 1}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors ${
              guidedStep === 1
                ? 'text-slate-500 bg-slate-800/50 cursor-not-allowed'
                : 'text-white bg-slate-800 hover:bg-slate-700'
            }`}
            title="Previous step"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <button
            onClick={nextGuidedStep}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg text-xs font-bold shadow flex items-center space-x-1.5 transition-all"
          >
            <span>{guidedStep === 10 ? 'Finish Tour' : 'Next Step'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={exitGuidedTour}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Exit Tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
