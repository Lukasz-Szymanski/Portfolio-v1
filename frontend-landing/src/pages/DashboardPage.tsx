import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fintechApi } from '../api/fintech';
import AccountList from '../components/dashboard/AccountList';
import TransferForm from '../components/dashboard/TransferForm';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import CompanyVerifier from '../components/dashboard/CompanyVerifier';
import CryptoTicker from '../components/dashboard/CryptoTicker';
import { AlertCircle, LogOut, PlayCircle, ShieldCheck } from 'lucide-react';

function DashboardPage() {
  const [searchParams] = useSearchParams();
  const currentView = searchParams.get('view') || 'fintech';
  
  // State dla użytkownika demo
  const [userId, setUserId] = useState<number | null>(() => {
    const saved = localStorage.getItem('demo_user_id');
    return saved ? parseInt(saved) : null;
  });

  const [isInitializing, setIsInitializing] = useState(false);

  // Pobieramy dane kont tylko jeśli mamy usera i jesteśmy w widoku Fintech
  const { data: accounts, isLoading, isError, refetch } = useQuery({
    queryKey: ['accounts', userId],
    queryFn: () => fintechApi.getAccounts(userId!),
    enabled: !!userId && currentView === 'fintech'
  });

  const handleLogin = async () => {
    setIsInitializing(true);
    // Generujemy losowe ID dla gościa
    const newId = Math.floor(Math.random() * 9000) + 1000;
    
    try {
        await fintechApi.initDemoAccount(newId);
        localStorage.setItem('demo_user_id', newId.toString());
        setUserId(newId);
        window.location.reload(); // Prosty reload, aby odświeżyć wszystkie query
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

  // --- LOGIN SCREEN ---
  if (!userId) {
    return (
        <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-slate-800/50 p-8 rounded-2xl border border-slate-700 text-center animate-in fade-in zoom-in-95">
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
            </div>
        </div>
    );
  }

  // --- MAIN DASHBOARD ---
  const getHeaderContent = () => {
    switch (currentView) {
      case 'fintech':
        return {
          title: 'Fintech Core Demo',
          subtitle: `Logged as Guest_ID: ${userId}`,
          gradient: 'from-blue-400 to-cyan-400'
        };
      case 'b2b':
        return {
          title: 'B2B Verifier Demo',
          subtitle: 'Contractor Data Verification (FastAPI + Redis)',
          gradient: 'from-emerald-400 to-teal-400'
        };
      case 'monitor':
        return {
          title: 'Price Monitor Demo',
          subtitle: 'Background Workers & Real-time Data (Celery + Redis)',
          gradient: 'from-purple-400 to-pink-400'
        };
      default:
        return {
          title: 'Project Demo',
          subtitle: 'Select a project from the main page',
          gradient: 'from-gray-400 to-white'
        };
    }
  };

  const header = getHeaderContent();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 border-b border-slate-800 pb-8">
          <div>
             <h1 className={`text-3xl font-bold bg-gradient-to-r ${header.gradient} bg-clip-text text-transparent`}>
                {header.title}
             </h1>
             <p className="text-slate-400 text-sm mt-1 font-mono tracking-wide">{header.subtitle}</p>
          </div>
          <div className="flex gap-4 items-center">
             <button onClick={handleLogout} className="text-slate-500 hover:text-red-400 transition-colors" title="Wyloguj (Usuń sesję)">
                <LogOut size={20} />
             </button>
             <a href="/#projects" className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors text-sm font-medium border border-slate-700">
               &larr; Back to Projects
             </a>
          </div>
        </header>

        {/* Global Error (dla Fintechu) */}
        {isError && currentView === 'fintech' && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-lg flex items-center gap-2 mb-8">
            <AlertCircle size={20} />
            <span>Failed to connect to Fintech Service. Please ensure the backend containers are running.</span>
          </div>
        )}

        {/* --- VIEW: FINTECH --- */}
        {currentView === 'fintech' && (
            <div>
                {isLoading && <div className="text-gray-400 animate-pulse text-center py-12">Loading financial data...</div>}
                
                {accounts && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <section>
                                <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-3">Your Accounts</h2>
                                <AccountList accounts={accounts} />
                            </section>
                            <section>
                                <h3 className="text-xl font-semibold text-white mb-6 border-l-4 border-slate-500 pl-3">Recent Activity</h3>
                                {accounts.length > 0 ? (
                                    <TransactionHistory accountId={accounts[0].id} />
                                ) : (
                                    <div className="text-slate-500">No account selected.</div>
                                )}
                            </section>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-blue-500 pl-3">Quick Transfer</h2>
                            {accounts.length > 0 ? (
                                <TransferForm senderId={accounts[0].id} />
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
            <div className="max-w-2xl mx-auto">
                <section>
                    <CompanyVerifier />
                </section>
            </div>
        )}

        {/* --- VIEW: MONITOR --- */}
        {currentView === 'monitor' && (
            <div className="max-w-3xl mx-auto">
                <section>
                    <div className="transform scale-110 origin-top mb-12">
                        <CryptoTicker />
                    </div>
                    
                    <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 font-mono text-xs text-slate-500 shadow-2xl">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="ml-2 text-slate-400">worker_logs.log</span>
                        </div>
                        <p className="mb-2 text-purple-400 font-bold">// Worker Activity Simulation</p>
                        <p>[2025-12-20 14:00:01] INFO/Beat: Waking up...</p>
                        <p>[2025-12-20 14:00:01] INFO/MainProcess: Sending task 'fetch_crypto_prices'</p>
                        <p>[2025-12-20 14:00:02] INFO/Worker: Task received. Fetching from CoinGecko...</p>
                        <p className="text-emerald-500">[2025-12-20 14:00:02] INFO/Worker: Success. Data saved to Redis key 'crypto:bitcoin'.</p>
                        <p className="animate-pulse">_</p>
                    </div>
                </section>
            </div>
        )}

      </div>
    </div>
  );
}

export default DashboardPage;