import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fintechApi } from '../api/fintech';
import AccountList from '../components/dashboard/AccountList';
import TransferForm from '../components/dashboard/TransferForm';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import CompanyVerifier from '../components/dashboard/CompanyVerifier';
import CryptoTicker from '../components/dashboard/CryptoTicker';
import Overview from '../components/dashboard/Overview';
import ArchitectureDiagram from '../components/dashboard/ArchitectureDiagram';
import { AlertCircle, LogOut, PlayCircle, ShieldCheck, LayoutDashboard, Landmark, Database, Activity, Glasses, Network, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDevMode } from '../context/DevModeContext';
import XRayWrapper from '../components/shared/XRayWrapper';

function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  // Domyślny widok to Overview
  const currentView = searchParams.get('view') || 'overview';
  
  const { isDevMode, toggleDevMode } = useDevMode();
  const [showArchitecture, setShowArchitecture] = useState(false);

  const [userId, setUserId] = useState<number | null>(() => {
    const saved = localStorage.getItem('demo_user_id');
    return saved ? parseInt(saved) : null;
  });

  const [isInitializing, setIsInitializing] = useState(false);

  const { data: accounts, isLoading, isError } = useQuery({
    queryKey: ['accounts', userId],
    queryFn: () => fintechApi.getAccounts(userId!),
    enabled: !!userId && currentView === 'fintech'
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
    // --- LOGIN SCREEN ---
    return (
        <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-slate-800/50 p-8 rounded-2xl border border-slate-700 text-center"
            >
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
                    <ShieldCheck size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Witaj w Panelu Demo</h2>
                <p className="text-slate-400 mb-8">
                    To jest symulator systemu bankowego. Nie musisz zakładać konta.
                    Wygenerujemy dla Ciebie profil gościa z wirtualną gotówką.
                </p>
                
                <button 
                    onClick={handleLogin}
                    disabled={isInitializing}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isInitializing ? (
                        "Przygotowywanie środowiska..."
                    ) : (
                        <>
                            <PlayCircle size={20} /> Uruchom Demo (Jako Gość)
                        </>
                    )}
                </button>
                <div className="mt-6">
                    <a href="/" className="text-slate-500 hover:text-white text-sm">
                        &larr; Wróć do strony głównej
                    </a>
                </div>
            </motion.div>
        </div>
    );
  }

  const getHeaderContent = () => {
    switch (currentView) {
      case 'overview':
        return {
          title: 'System Overview',
          subtitle: 'Real-time aggregated metrics from all microservices',
          gradient: 'from-orange-400 to-pink-500'
        };
      case 'fintech':
        return {
          title: 'Fintech Core',
          subtitle: `Logged as Guest_ID: ${userId}`,
          gradient: 'from-blue-400 to-cyan-400'
        };
      case 'b2b':
        return {
          title: 'B2B Verifier',
          subtitle: 'Contractor Data Verification (FastAPI + Redis)',
          gradient: 'from-emerald-400 to-teal-400'
        };
      case 'monitor':
        return {
          title: 'Price Monitor',
          subtitle: 'Background Workers & Real-time Data (Celery + Redis)',
          gradient: 'from-purple-400 to-pink-400'
        };
      default:
        return {
          title: 'Dashboard',
          subtitle: 'Select module',
          gradient: 'from-gray-400 to-white'
        };
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
    <div className="min-h-screen bg-[#0f172a] text-white p-8 font-sans transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-slate-800 pb-8">
          <div>
             <motion.h1 
                key={header.title}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-3xl font-bold bg-gradient-to-r ${header.gradient} bg-clip-text text-transparent`}
             >
                {header.title}
             </motion.h1>
             <p className="text-slate-400 text-sm mt-1 font-mono tracking-wide">{header.subtitle}</p>
          </div>
          <div className="flex gap-4 items-center">
             {/* SYSTEM MAP BUTTON */}
             <button 
                onClick={() => setShowArchitecture(true)} 
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-blue-500 transition-all text-xs font-mono font-bold tracking-wider"
                title="View System Architecture Diagram"
             >
                <Network size={14} />
                SYSTEM_MAP
             </button>

             {/* DEV MODE TOGGLE */}
             <button 
                onClick={toggleDevMode} 
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs font-mono font-bold tracking-wider ${
                    isDevMode 
                        ? 'bg-purple-500/10 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                        : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'
                }`}
                title="Toggle Architecture X-Ray Mode"
             >
                <Glasses size={14} />
                {isDevMode ? 'DEV_MODE: ON' : 'DEV_MODE: OFF'}
             </button>

             <div className="h-6 w-px bg-slate-800 mx-2"></div>

             <button onClick={handleLogout} className="text-slate-500 hover:text-red-400 transition-colors" title="Wyloguj">
                <LogOut size={20} />
             </button>
             <a href="/#projects" className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors text-sm font-medium border border-slate-700">
               &larr; Exit
             </a>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setView(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all relative ${
                        currentView === tab.id 
                            ? 'text-white' 
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                >
                    {currentView === tab.id && (
                        <motion.div 
                            layoutId="activeTab"
                            className="absolute inset-0 bg-slate-700 rounded-lg shadow-lg"
                        />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                        <tab.icon size={18} />
                        {tab.label}
                    </span>
                </button>
            ))}
        </div>

        {/* --- DYNAMIC VIEW AREA --- */}
        <AnimatePresence mode="wait">
            <motion.div
                key={currentView}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
            >
                {/* --- VIEW: OVERVIEW --- */}
                {currentView === 'overview' && (
                    <XRayWrapper label="Data Aggregator" tech="Redis" endpoint="GET /api/b2b/system-status" description="Agregacja danych z mikroserwisów">
                        <Overview userId={userId} />
                    </XRayWrapper>
                )}

                {/* --- VIEW: FINTECH --- */}
                {currentView === 'fintech' && (
                    <div>
                        {isError && (
                            <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-lg flex items-center gap-2 mb-8">
                                <AlertCircle size={20} />
                                <span>Failed to connect to Fintech Service.</span>
                            </div>
                        )}
                        {isLoading && <div className="text-gray-400 animate-pulse text-center py-12">Loading financial data...</div>}
                        
                        {accounts && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-8">
                                    <section>
                                        <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-3">Your Accounts</h2>
                                        <XRayWrapper label="Relational Data" tech="Postgres" description="Dane kont via Django ORM">
                                            <AccountList accounts={accounts} />
                                        </XRayWrapper>
                                    </section>
                                    <section>
                                        <h3 className="text-xl font-semibold text-white mb-6 border-l-4 border-slate-500 pl-3">Recent Activity</h3>
                                        {accounts.length > 0 ? (
                                            <XRayWrapper label="Transaction Log" tech="Django" endpoint="GET /api/transactions" description="Generowanie PDF (ReportLab)">
                                                <TransactionHistory accountId={accounts[0].id} />
                                            </XRayWrapper>
                                        ) : (
                                            <div className="text-slate-500">No account selected.</div>
                                        )}
                                    </section>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-3">Quick Transfer</h2>
                                    {accounts.length > 0 ? (
                                        <XRayWrapper label="Atomic Action" tech="Django" endpoint="POST /api/transfer" description="Transakcja ACID (@transaction.atomic)">
                                            <TransferForm senderId={accounts[0].id} />
                                        </XRayWrapper>
                                    ) : (
                                        <div className="text-slate-500">Open an account to make transfers.</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* --- VIEW: B2B --- */}
                {currentView === 'b2b' && (
                    <div className="max-w-2xl mx-auto py-8">
                        <section>
                            <XRayWrapper label="Data Proxy" tech="FastAPI" endpoint="GET /api/b2b/companies/{nip}" description="Redis Cache-Aside Pattern">
                                <CompanyVerifier />
                            </XRayWrapper>
                        </section>
                    </div>
                )}

                {/* --- VIEW: MONITOR --- */}
                {currentView === 'monitor' && (
                    <div className="max-w-3xl mx-auto">
                        <section>
                            <div className="transform scale-110 origin-top mb-12">
                                <XRayWrapper label="Live Feed" tech="Redis" endpoint="GET /api/crypto" description="Wartości zapisywane przez Worker Celery">
                                    <CryptoTicker />
                                </XRayWrapper>
                            </div>
                            
                            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 font-mono text-xs text-slate-500 shadow-2xl">
                                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="ml-2 text-slate-400">worker_logs.log</span>
                                </div>
                                <p className="mb-2 text-purple-400 font-bold">// Real-time Celery Worker Logs</p>
                                <p>[{new Date().toISOString().split('T')[0]} {new Date().toLocaleTimeString()}] INFO/Beat: Scheduler waking up...</p>
                                <p>[{new Date().toISOString().split('T')[0]} {new Date().toLocaleTimeString()}] INFO/MainProcess: Task 'fetch_crypto_prices' sent to queue.</p>
                                <p>[{new Date().toISOString().split('T')[0]} {new Date().toLocaleTimeString()}] INFO/Worker: Task received. Connecting to CoinGecko...</p>
                                <p className="text-emerald-500">[{new Date().toISOString().split('T')[0]} {new Date().toLocaleTimeString()}] INFO/Worker: Success. Redis keys 'crypto:bitcoin' updated.</p>
                                <p className="animate-pulse">_</p>
                            </div>
                        </section>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>

        {/* --- ARCHITECTURE MODAL --- */}
        <AnimatePresence>
            {showArchitecture && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-[#0f172a]/95 backdrop-blur-sm flex items-center justify-center p-8"
                    onClick={() => setShowArchitecture(false)}
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
                                    <Network className="text-blue-500" />
                                    System Architecture Map
                                </h3>
                                <p className="text-slate-400 text-sm">Live Visualization using Mermaid.js</p>
                            </div>
                            <button 
                                onClick={() => setShowArchitecture(false)}
                                className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="overflow-y-auto p-8 bg-[#0f172a] flex flex-col items-center min-h-0">
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
    </div>
  );
}

export default DashboardPage;
