import { LogOut, Glasses, Network } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  gradient: string;
  isDevMode: boolean;
  onToggleDevMode: () => void;
  onShowArchitecture: () => void;
  onLogout: () => void;
}

function DashboardHeader({
  title,
  subtitle,
  gradient,
  isDevMode,
  onToggleDevMode,
  onShowArchitecture,
  onLogout
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-white/5 pb-8">
      <div>
        <motion.h1
          key={title}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl font-bold font-display bg-linear-to-r ${gradient} bg-clip-text text-transparent`}
        >
          {title}
        </motion.h1>
        <p className="text-slate-400 text-sm mt-1 font-mono tracking-wide uppercase">{subtitle}</p>
      </div>
      <div className="flex gap-4 items-center">
        <button
          onClick={onShowArchitecture}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-xs font-mono font-bold tracking-wider backdrop-blur-sm"
        >
          <Network size={14} /> SYSTEM_MAP
        </button>
        <button
          onClick={onToggleDevMode}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-xs font-mono font-bold tracking-wider backdrop-blur-sm ${
            isDevMode
              ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
              : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300'
          }`}
        >
          <Glasses size={14} /> {isDevMode ? 'DEV_MODE: ON' : 'DEV_MODE: OFF'}
        </button>
        <div className="h-6 w-px bg-white/5 mx-2"></div>
        <button
          onClick={onLogout}
          className="p-2 text-slate-500 hover:text-red-400 transition-colors bg-white/5 rounded-full border border-white/5"
        >
          <LogOut size={20} />
        </button>
        <Link
          to="/"
          className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all text-sm font-medium border border-white/10 backdrop-blur-sm"
        >
          &larr; Exit
        </Link>
      </div>
    </header>
  );
}

export default DashboardHeader;
