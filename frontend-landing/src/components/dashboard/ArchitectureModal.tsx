import { X, Network } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchitectureDiagram from './ArchitectureDiagram';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ArchitectureModal({ isOpen, onClose }: ArchitectureModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#0f172a]/95 backdrop-blur-sm flex items-center justify-center p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-900 border border-slate-700 rounded-2xl w-[95vw] md:w-full max-w-5xl max-h-[90vh] shadow-2xl overflow-hidden relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-800 flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Network className="text-blue-500" /> System Architecture Map
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-800 rounded-full text-slate-400"
              >
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto p-8 bg-[#0f172a] flex flex-col items-center">
              <div className="w-full flex justify-center mb-8">
                <ArchitectureDiagram />
              </div>

              {/* LEGEND SECTION */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl border-t border-slate-800 pt-10 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    API Routing
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    <strong className="text-white">Nginx</strong> pełni rolę Reverse Proxy. Kieruje ruch z portu 80 do odpowiednich kontenerów na podstawie ścieżki URL (np. <code className="text-blue-300">/api/fintech</code>).
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    Persistence
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    <strong className="text-white">PostgreSQL</strong> przechowuje dane krytyczne (konta, transakcje). <strong className="text-white">Redis</strong> służy jako szybki Cache dla B2B oraz Broker dla Celery.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    Background Sync
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    <strong className="text-white">Celery Worker</strong> działa niezależnie od API. Pobiera ceny krypto i aktualizuje stan w Redisie, skąd React może je błyskawicznie odczytać.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 text-center shrink-0">
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em]">
                Full Microservices Stack :: Containerized with Docker Compose
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ArchitectureModal;
