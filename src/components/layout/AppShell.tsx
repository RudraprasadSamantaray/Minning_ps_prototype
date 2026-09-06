import React from 'react';
import { useMining } from '../../context/MiningContext';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';

// Screens
import { CommandCenter } from '../screens/CommandCenter';
import { MineIntelligence } from '../screens/MineIntelligence';
import { RiskExplainability } from '../screens/RiskExplainability';
import { WhatIfSimulator } from '../screens/WhatIfSimulator';
import { DecisionCenter } from '../screens/DecisionCenter';
import { OutcomeLearning } from '../screens/OutcomeLearning';
import { EquipmentIntelligence } from '../screens/EquipmentIntelligence';
import { WeatherImpact } from '../screens/WeatherImpact';
import { DataQualityScreen } from '../screens/DataQualityScreen';

// Drawers & Modals
import { ZoneDetailDrawer } from '../modals/ZoneDetailDrawer';
import { ModifyRecommendationModal } from '../modals/ModifyRecommendationModal';
import { StopWorkModal } from '../modals/StopWorkModal';
import { DecisionMemoryDrawer } from '../modals/DecisionMemoryDrawer';
import { AlertsDrawer } from '../modals/AlertsDrawer';
import { ShiftReportModal } from '../modals/ShiftReportModal';
import { GuidedTourBar } from '../demo/GuidedTourBar';

export const AppShell: React.FC = () => {
  const { currentScreen } = useMining();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'command-center':
        return <CommandCenter />;
      case 'mine-intelligence':
        return <MineIntelligence />;
      case 'risk-explainability':
        return <RiskExplainability />;
      case 'what-if-simulator':
        return <WhatIfSimulator />;
      case 'decision-center':
        return <DecisionCenter />;
      case 'outcome-learning':
        return <OutcomeLearning />;
      case 'equipment-intelligence':
        return <EquipmentIntelligence />;
      case 'weather-impact':
        return <WeatherImpact />;
      case 'data-quality':
        return <DataQualityScreen />;
      default:
        return <CommandCenter />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-canvas text-navy-primary overflow-hidden">
      {/* Top Navigation */}
      <TopNav />

      {/* Main Body with Sidebar + Viewport */}
      <div className="flex flex-1 overflow-hidden">
        {/* Compact Sidebar */}
        <Sidebar />

        {/* Scrollable Main Content Canvas */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-28">
          <div className="max-w-7xl mx-auto">
            {renderActiveScreen()}
          </div>
        </main>
      </div>

      {/* Persistent Modals & Drawers */}
      <ZoneDetailDrawer />
      <ModifyRecommendationModal />
      <StopWorkModal />
      <DecisionMemoryDrawer />
      <AlertsDrawer />
      <ShiftReportModal />

      {/* Guided 10-Step Story Demonstration Floating Bar */}
      <GuidedTourBar />
    </div>
  );
};
