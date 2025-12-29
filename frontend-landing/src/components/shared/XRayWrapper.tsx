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
            {/* Holographic Border */}
            <div className="absolute inset-0 border-2 border-purple-500/40 rounded-3xl border-dashed animate-[spin_20s_linear_infinite]" />
            
            {/* Tech Badge */}
            <div className="absolute -top-3 -left-2 px-3 py-1 bg-purple-600 text-white text-[9px] font-bold font-mono rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center gap-2">
              <Database size={10} /> {tech.toUpperCase()}
            </div>

            {/* Label Badge */}
            <div className="absolute -bottom-3 -right-2 px-3 py-1 bg-blue-600 text-white text-[9px] font-bold font-mono rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.5)] flex items-center gap-2">
              <Server size={10} /> {label.toUpperCase()}
            </div>

            {/* Ghost Overlay */}
            <div className="absolute inset-0 bg-purple-500/5 backdrop-invert-[0.05] rounded-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`transition-all duration-500 ${isDevMode ? 'scale-[0.98] blur-[0.5px] grayscale-[0.5]' : ''}`}>
        {children}
      </div>

      {/* Hover Info (only in Dev Mode) */}
      <AnimatePresence>
        {isDevMode && (
          <div className="absolute inset-0 z-50 flex items-center justify-center opacity-0 group-hover/xray:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-black/80 backdrop-blur-md border border-purple-500/50 p-4 rounded-xl max-w-[200px] text-center">
              <div className="flex justify-center mb-2 text-purple-400"><Globe size={20} className="animate-pulse" /></div>
              <p className="text-[10px] font-mono text-purple-300 font-bold mb-1">{endpoint || 'INTERNAL_LOGIC'}</p>
              <p className="text-[9px] text-slate-400 leading-tight italic">{description || 'Data flow encapsulation'}</p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default XRayWrapper;