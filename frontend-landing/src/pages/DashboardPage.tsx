import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fintechApi } from '../api/fintech';
import AccountList from '../components/dashboard/AccountList';
import TransferForm from '../components/dashboard/TransferForm';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import BalanceChart from '../components/dashboard/BalanceChart';
import CompanyVerifier from '../components/dashboard/CompanyVerifier';
import CryptoTicker from '../components/dashboard/CryptoTicker';
import Overview from '../components/dashboard/Overview';
import ArchitectureDiagram from '../components/dashboard/ArchitectureDiagram';
import { LogOut, PlayCircle, ShieldCheck, LayoutDashboard, Landmark, Database, Activity, Glasses, Network, X, Loader2, Server } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDevMode } from '../context/DevModeContext';
import XRayWrapper from '../components/shared/XRayWrapper';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentView = searchParams.get('view') || 'overview';
  
  const { isDevMode, toggleDevMode } = useDevMode();
  const [showArchitecture, setShowArchitecture] = useState(false);

  const handleGlobalNavigate = (section: string) => {
    navigate(`/#${section}`);
  };

  const [userId, setUserId] = useState<number | null>(() => {
    const saved = localStorage.getItem('demo_user_id');
    return saved ? parseInt(saved) : null;
  });

  const [isInitializing, setIsInitializing] = useState(false);

  const { data: accounts } = useQuery({
    queryKey: ['accounts', userId],
    queryFn: () => fintechApi.getAccounts(userId!),
    enabled: !!userId && currentView === 'fintech'
  });

  const { data: transactions } = useQuery({
    queryKey: ['transactions', accounts?.[0]?.id],
    queryFn: () => fintechApi.getTransactions(accounts![0].id),
    enabled: !!accounts && accounts.length > 0 && currentView === 'fintech'
  });

  const handleLogin = async () => {
    setIsInitializing(true);
    const newId = Math.floor(Math.random() * 9000) + 1000;
    try {
        await fintechApi.initDemoAccount(newId);
        localStorage.setItem('demo_user_id', newId.toString());
        setUserId(newId);
        window.location.reload(); 
    } catch (e) {
        console.error("Failed to init demo", e);
        alert("Błąd inicjalizacji demo. Sprawdź czy kontenery działają.");
    } finally {
        setIsInitializing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('demo_user_id');
    setUserId(null);
  };

  const setView = (view: string) => {
    setSearchParams({ view });
  };

  if (!userId) {
    // --- LOGIN SCREEN (NEON GLASS REFACTOR) ---
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
                        onClick={handleLogin}
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

  const getHeaderContent = () => {
    switch (currentView) {
      case 'overview': return { title: 'System Overview', subtitle: 'Real-time aggregated metrics', gradient: 'from-orange-400 to-pink-500' };
      case 'fintech': return { title: 'Fintech Core', subtitle: `Logged as Guest_ID: ${userId}`, gradient: 'from-blue-400 to-cyan-400' };
      case 'b2b': return { title: 'B2B Verifier', subtitle: 'Contractor Data Verification', gradient: 'from-emerald-400 to-teal-400' };
      case 'monitor': return { title: 'Price Monitor', subtitle: 'Background Workers Status', gradient: 'from-purple-400 to-pink-400' };
      default: return { title: 'Dashboard', subtitle: 'Select module', gradient: 'from-gray-400 to-white' };
    }
  };

  const header = getHeaderContent();
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'fintech', label: 'Fintech Bank', icon: Landmark },
    { id: 'b2b', label: 'B2B Verifier', icon: Database },
    { id: 'monitor', label: 'Crypto Monitor', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-[#050811] text-white font-sans transition-colors duration-500 selection:bg-blue-500/30">
      <div className="mesh-background" />
      
      <div className="max-w-6xl mx-auto flex flex-col pt-12 px-8 pb-16">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-white/5 pb-8">
          <div>
             <motion.h1 key={header.title} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`text-4xl font-bold font-display bg-gradient-to-r ${header.gradient} bg-clip-text text-transparent`}>
                {header.title}
             </motion.h1>
             <p className="text-slate-400 text-sm mt-1 font-mono tracking-wide uppercase">{header.subtitle}</p>
          </div>
          <div className="flex gap-4 items-center">
             <button onClick={() => setShowArchitecture(true)} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-xs font-mono font-bold tracking-wider backdrop-blur-sm">
                <Network size={14} /> SYSTEM_MAP
             </button>
             <button onClick={toggleDevMode} className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-xs font-mono font-bold tracking-wider backdrop-blur-sm ${isDevMode ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300'}`}>
                <Glasses size={14} /> {isDevMode ? 'DEV_MODE: ON' : 'DEV_MODE: OFF'}
             </button>
             <div className="h-6 w-px bg-white/5 mx-2"></div>
             <button onClick={handleLogout} className="p-2 text-slate-500 hover:text-red-400 transition-colors bg-white/5 rounded-full border border-white/5"><LogOut size={20} /></button>
             <a href="/#projects" className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all text-sm font-medium border border-white/10 backdrop-blur-sm">&larr; Exit</a>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
            {tabs.map(tab => (
                <button key={tab.id} onClick={() => setView(tab.id)} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all relative ${currentView === tab.id ? 'text-white' : 'text-slate-400 hover:bg-white/5'}`}>
                    {currentView === tab.id && <motion.div layoutId="activeTab" className="absolute inset-0 bg-blue-600/20 border border-blue-500/30 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.1)]" />}
                    <span className="relative z-10 flex items-center gap-2 font-display uppercase tracking-wider text-sm"><tab.icon size={18} /> {tab.label}</span>
                </button>
            ))}
        </div>

        {/* Content */}
        <main className="flex-grow">
            <AnimatePresence mode="wait">
                <motion.div key={currentView} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                    {currentView === 'overview' && <XRayWrapper label="Data Aggregator" tech="Redis" endpoint="GET /api/b2b/system-status" description="Agregacja danych"><Overview userId={userId} /></XRayWrapper>}
                    {currentView === 'fintech' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <section>
                                    <h2 className="text-xl font-semibold mb-6 border-l-4 border-blue-500 pl-3 uppercase tracking-tight font-display text-slate-200">Financial Growth</h2>
                                    <div className="glass-card p-6 rounded-3xl border-white/5 bg-gradient-to-br from-blue-500/5 to-transparent">
                                        <XRayWrapper label="Data Visualization" tech="Recharts" description="Dynamic balance reconstruction">
                                            <BalanceChart 
                                                transactions={transactions || []} 
                                                currentBalance={parseFloat(accounts?.[0]?.balance || "0")} 
                                            />
                                        </XRayWrapper>
                                    </div>
                                </section>
                                <section><h2 className="text-xl font-semibold mb-6 border-l-4 border-blue-500 pl-3">Your Accounts</h2><XRayWrapper label="Relational Data" tech="Postgres"><AccountList accounts={accounts || []} /></XRayWrapper></section>
                                <section><h3 className="text-xl font-semibold mb-6 border-l-4 border-slate-500 pl-3">Recent Activity</h3>{accounts && accounts.length > 0 ? <XRayWrapper label="Transaction Log" tech="Django"><TransactionHistory accountId={accounts[0].id} /></XRayWrapper> : <div className="text-slate-500">No account.</div>}</section>
                            </div>
                            <section><h2 className="text-xl font-semibold mb-6 border-l-4 border-blue-500 pl-3">Quick Transfer</h2>{accounts && accounts.length > 0 ? <XRayWrapper label="Atomic Action" tech="Django"><TransferForm senderId={accounts[0].id} /></XRayWrapper> : null}</section>
                        </div>
                    )}
                    {currentView === 'b2b' && <div className="max-w-2xl mx-auto py-8"><XRayWrapper label="Data Proxy" tech="FastAPI"><CompanyVerifier /></XRayWrapper></div>}
                    {currentView === 'monitor' && <div className="max-w-3xl mx-auto"><XRayWrapper label="Live Feed" tech="Redis"><CryptoTicker /></XRayWrapper></div>}
                </motion.div>
            </AnimatePresence>
        </main>

        {/* Modal */}
        <AnimatePresence>
            {showArchitecture && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-[#0f172a]/95 backdrop-blur-sm flex items-center justify-center p-8" onClick={() => setShowArchitecture(false)}>
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-slate-900 border border-slate-700 rounded-2xl w-[95vw] md:w-full max-w-5xl max-h-[90vh] shadow-2xl overflow-hidden relative flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center shrink-0">
                            <div><h3 className="text-xl font-bold text-white flex items-center gap-2"><Network className="text-blue-500" /> System Architecture Map</h3></div>
                            <button onClick={() => setShowArchitecture(false)} className="p-2 hover:bg-slate-800 rounded-full text-slate-400"><X size={24} /></button>
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
      </div>
      <Footer />
    </div>
  );
}

export default DashboardPage;