import React from 'react';
import { useDevMode } from '../../context/DevModeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Database, Globe } from 'lucide-react';

export type TechType = 'React' | 'Django' | 'FastAPI' | 'Redis' | 'Postgres' | 'Celery' | 'Nginx' | 'Recharts';

interface XRayWrapperProps {
  children: React.ReactNode;
  label: string;
  tech: TechType;
  endpoint?: string; // Np. "POST /api/transfer"
  description?: string; // Krótki opis co tu się dzieje
}

const techColors: Record<TechType, string> = {
  React: 'border-blue-400 text-blue-400 bg-blue-400/10',
  Django: 'border-green-600 text-green-600 bg-green-600/10',
  FastAPI: 'border-teal-400 text-teal-400 bg-teal-400/10',
  Redis: 'border-red-500 text-red-500 bg-red-500/10',
  Postgres: 'border-blue-600 text-blue-600 bg-blue-600/10',
  Celery: 'border-yellow-500 text-yellow-500 bg-yellow-500/10',
  Nginx: 'border-green-400 text-green-400 bg-green-400/10',
  Recharts: 'border-blue-400 text-blue-400 bg-blue-400/10',
};

const XRayWrapper: React.FC<XRayWrapperProps> = ({ children, label, tech, endpoint, description }) => {
  const { isDevMode } = useDevMode();
  const colorClass = techColors[tech] || 'border-gray-500 text-gray-500';

  // Ikona zależna od technologii
  const getIcon = () => {
      switch(tech) {
          case 'React': return <Code2 size={12} />;
          case 'Redis': case 'Postgres': return <Database size={12} />;
          case 'Nginx': return <Globe size={12} />;
          default: return <Server size={12} />;
      }
  };

  return (
    <div className="relative group">
      <AnimatePresence>
        {isDevMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className={`absolute -inset-6 border-2 border-dashed rounded-2xl pointer-events-none z-40 ${colorClass} opacity-60`}
          >
            {/* Etykieta Górna (Tech) - PRZESUNIĘTA WYŻEJ I Z TŁEM */}
            <div className={`absolute -top-4 left-8 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest rounded-full flex items-center gap-2 bg-[#0f172a] border-2 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-50 pointer-events-auto ${colorClass.replace('bg-', 'no-bg-')}`}>
               {getIcon()}
               <span className="text-white">{tech}</span>
               <span className="opacity-40">|</span>
               <span className="text-white/90">{label}</span>
            </div>

            {/* Etykieta Dolna (Endpoint & Desc) - Z TŁEM I WYRÓWNANIEM */}
            {(endpoint || description) && (
                <div className={`absolute -bottom-4 right-8 px-3 py-1 text-[10px] font-mono rounded-lg bg-[#0f172a] border-2 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-x-4 items-start md:items-center z-50 pointer-events-auto ${colorClass.replace('bg-', 'no-bg-')}`}>
                    {endpoint && <span className="font-bold text-white whitespace-nowrap">{endpoint}</span>}
                    {endpoint && description && <span className="hidden md:inline opacity-30 text-white">|</span>}
                    {description && <span className="text-white/70 italic">{description}</span>}
                </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <div className={`${isDevMode ? 'relative z-10' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default XRayWrapper;
