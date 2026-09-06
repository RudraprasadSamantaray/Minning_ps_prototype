import React, { useState } from 'react';
import { useMining } from '../../context/MiningContext';
import { ScreenId } from '../../types/mining';
import {
  LayoutDashboard,
  Map,
  BarChart3,
  Truck,
  CloudRain,
  Sliders,
  CheckSquare,
  RotateCcw,
  Database,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';

interface NavItem {
  id: ScreenId;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useMining();
  const [collapsed, setCollapsed] = useState(false);

  const navGroups: NavGroup[] = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'command-center', label: 'Command Center', icon: LayoutDashboard },
      ],
    },
    {
      title: 'MINE INTELLIGENCE',
      items: [
        { id: 'mine-intelligence', label: 'Mine Intelligence (3D/GIS)', icon: Map, badge: '3D/2D' },
      ],
    },
    {
      title: 'OPERATIONAL INTELLIGENCE',
      items: [
        { id: 'risk-explainability', label: 'Shortfall Risk (SHAP)', icon: BarChart3, badge: '72% Risk', badgeColor: 'bg-amber-100 text-amber-800' },
        { id: 'equipment-intelligence', label: 'Equipment Telemetry', icon: Truck },
        { id: 'weather-impact', label: 'Weather Impact', icon: CloudRain },
      ],
    },
    {
      title: 'DECISION SUPPORT',
      items: [
        { id: 'what-if-simulator', label: 'What-If Simulator', icon: Sliders, badge: 'Hero', badgeColor: 'bg-blue-100 text-blue-800' },
        { id: 'decision-center', label: 'Decision & Execution', icon: CheckSquare },
      ],
    },
    {
      title: 'SYSTEM & LEARNING',
      items: [
        { id: 'outcome-learning', label: 'Outcome & Feedback Loop', icon: RotateCcw, badge: 'v2.4' },
        { id: 'data-quality', label: 'Data Quality & Pipeline', icon: Database },
      ],
    },
  ];

  return (
    <aside
      className={`bg-surface border-r border-border flex flex-col justify-between transition-all duration-300 z-20 shrink-0 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex-1 overflow-y-auto py-4 px-2.5">
        {navGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="mb-5">
            {!collapsed && (
              <h4 className="px-2.5 mb-1.5 text-[10px] font-bold text-navy-muted tracking-wider uppercase font-mono">
                {group.title}
              </h4>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentScreen(item.id)}
                    className={`w-full flex items-center ${
                      collapsed ? 'justify-center px-0' : 'justify-between px-3'
                    } py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-navy-primary text-white shadow-sm font-semibold'
                        : 'text-navy-muted hover:text-navy-primary hover:bg-surface-subtle'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-mining-blue' : 'text-slate-500'}`} />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!collapsed && item.badge && (
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badgeColor || 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info & Collapse Toggle */}
      <div className="p-3 border-t border-border bg-canvas/50">
        {!collapsed && (
          <div className="mb-2 p-2 bg-blue-50/70 border border-blue-100 rounded-md text-[11px] text-blue-900 flex items-start space-x-2">
            <Info className="w-3.5 h-3.5 text-mining-blue shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold leading-tight">Balaghat Mine Block 04</p>
              <p className="text-[10px] text-blue-700 mt-0.5">Simulation / Decision Support Active</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-1.5 rounded-md hover:bg-surface-subtle text-slate-500 hover:text-slate-800 transition-colors text-xs"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : (
            <div className="flex items-center space-x-1.5">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[11px]">Collapse View</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};
