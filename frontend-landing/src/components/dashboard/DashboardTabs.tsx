import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ size: number }>;
}

interface DashboardTabsProps {
  tabs: Tab[];
  currentView: string;
  onViewChange: (view: string) => void;
}

function DashboardTabs({ tabs, currentView, onViewChange }: DashboardTabsProps) {
  return (
    <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onViewChange(tab.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all relative ${
            currentView === tab.id ? 'text-white' : 'text-slate-400 hover:bg-white/5'
          }`}
        >
          {currentView === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-blue-600/20 border border-blue-500/30 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.1)]"
            />
          )}
          <span className="relative z-10 flex items-center gap-2 font-display uppercase tracking-wider text-sm">
            <tab.icon size={18} /> {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default DashboardTabs;
