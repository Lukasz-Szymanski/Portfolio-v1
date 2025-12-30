import { motion, AnimatePresence } from 'framer-motion';
import { useDevMode } from '../../context/useDevMode';
import { Database, Server, Globe } from 'lucide-react';

interface XRayWrapperProps {
  children: React.ReactNode;
  label: string;
  tech: string;
  endpoint?: string;
  description?: string;
}

const XRayWrapper = ({ children, label, tech, endpoint, description }: XRayWrapperProps) => {
  const { isDevMode } = useDevMode();

  const getTechColor = (t: string) => {
    const techKey = t.toLowerCase();
    if (techKey.includes('django')) return { border: 'border-emerald-500/40', badge: 'bg-emerald-600', shadow: 'shadow-[0_0_20px_rgba(16,185,129,0.4)]', pulse: 'rgba(16,185,129,0.2)' };
    if (techKey.includes('fastapi')) return { border: 'border-cyan-500/40', badge: 'bg-cyan-600', shadow: 'shadow-[0_0_20px_rgba(6,182,212,0.4)]', pulse: 'rgba(6,182,212,0.2)' };
    if (techKey.includes('postgres')) return { border: 'border-blue-500/40', badge: 'bg-blue-600', shadow: 'shadow-[0_0_20px_rgba(59,130,246,0.4)]', pulse: 'rgba(59,130,246,0.2)' };
    if (techKey.includes('redis')) return { border: 'border-rose-500/40', badge: 'bg-rose-600', shadow: 'shadow-[0_0_20px_rgba(244,63,94,0.4)]', pulse: 'rgba(244,63,94,0.2)' };
    if (techKey.includes('recharts')) return { border: 'border-indigo-500/40', badge: 'bg-indigo-600', shadow: 'shadow-[0_0_20px_rgba(99,102,241,0.4)]', pulse: 'rgba(99,102,241,0.2)' };
    return { border: 'border-purple-500/40', badge: 'bg-purple-600', shadow: 'shadow-[0_0_20_rgba(168,85,247,0.4)]', pulse: 'rgba(168,85,247,0.2)' };
  };

  const colors = getTechColor(tech);

  return (
    <div className="relative group/xray">
      <AnimatePresence>
        {isDevMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-2 z-40 pointer-events-none"
          >
            {/* Holographic Border - Dynamic Color */}
            <div className={`absolute inset-0 border-2 ${colors.border} rounded-3xl border-dashed animate-pulse`} />
            
            {/* Tech Badge - Dynamic Color */}
            <div className={`absolute -top-3 left-4 px-3 py-1 ${colors.badge} text-white text-[9px] font-bold font-mono rounded-lg ${colors.shadow} flex items-center gap-2`}>
              <Database size={10} /> {tech.toUpperCase()}
            </div>

            {/* Label Badge */}
            <div className="absolute -bottom-3 right-4 px-3 py-1 bg-slate-800 text-slate-300 text-[9px] font-bold font-mono rounded-lg border border-white/10 flex items-center gap-2">
              <Server size={10} /> {label.toUpperCase()}
            </div>

            {/* Ghost Overlay */}
            <div className="absolute inset-0 bg-white/[0.02] rounded-2xl border border-white/5" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`transition-all duration-500 ${isDevMode ? 'scale-[0.99]' : ''}`}>
        {children}
      </div>

      {/* Hover Info (only in Dev Mode) */}
      <AnimatePresence>
        {isDevMode && (
          <div className="absolute inset-0 z-50 flex items-center justify-center opacity-0 group-hover/xray:opacity-100 transition-opacity pointer-events-none">
            <div className={`bg-black/90 backdrop-blur-md border ${colors.border} p-4 rounded-xl max-w-[200px] text-center shadow-2xl`}>
              <div className={`flex justify-center mb-2 text-white opacity-80`}><Globe size={20} className="animate-pulse" /></div>
              <p className="text-[10px] font-mono text-white font-bold mb-1">{endpoint || 'INTERNAL_LOGIC'}</p>
              <p className="text-[9px] text-slate-400 leading-tight italic">{description || 'Data flow encapsulation'}</p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default XRayWrapper;