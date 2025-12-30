import { Link } from 'react-router-dom';
import { ShieldCheck, PlayCircle, Loader2, Database, Activity, Server } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardLoginScreenProps {
  onLogin: () => void;
  isInitializing: boolean;
}

function DashboardLoginScreen({ onLogin, isInitializing }: DashboardLoginScreenProps) {
  return (
    <div className="min-h-screen bg-[#050811] text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="mesh-background" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl w-full glass-card p-12 rounded-[3rem] text-center relative z-10"
      >
        <div className="w-24 h-24 bg-blue-600/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-blue-500/20 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
          <ShieldCheck size={48} className="text-blue-500" />
        </div>

        <h2 className="text-4xl font-bold font-display mb-4 tracking-tight uppercase">Security Vault</h2>
        <p className="text-slate-400 mb-12 text-lg font-light leading-relaxed">
          Wchodzisz do środowiska symulacyjnego. <br/>
          System wygeneruje dla Ciebie <span className="text-blue-400 font-mono">Tymczasowy Klucz Dostępu</span> oraz wirtualne saldo konta.
        </p>

        <div className="space-y-6">
          <button
            onClick={onLogin}
            disabled={isInitializing}
            className="w-full py-6 bg-white text-black hover:bg-blue-50 rounded-2xl font-bold font-display text-lg flex items-center justify-center gap-3 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isInitializing ? (
              <><Loader2 className="animate-spin" size={24} /> INITIALIZING_CORE...</>
            ) : (
              <><PlayCircle size={24} /> URUCHOM PANEL GOŚCIA</>
            )}
          </button>

          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-mono tracking-widest uppercase">
            &larr; Abort Mission
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex justify-center gap-8 opacity-20 grayscale">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest"><Database size={12}/> PostgreSQL</div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest"><Activity size={12}/> Redis_7</div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest"><Server size={12}/> Python_3.11</div>
        </div>
      </motion.div>
    </div>
  );
}

export default DashboardLoginScreen;
