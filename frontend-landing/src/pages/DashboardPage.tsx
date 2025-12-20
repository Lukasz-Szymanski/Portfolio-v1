import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fintechApi } from '../api/fintech';
import AccountList from '../components/dashboard/AccountList';
import TransferForm from '../components/dashboard/TransferForm';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import CompanyVerifier from '../components/dashboard/CompanyVerifier';
import CryptoTicker from '../components/dashboard/CryptoTicker';
import { AlertCircle } from 'lucide-react';

function DashboardPage() {
  const [searchParams] = useSearchParams();
  // Domyślnie otwieramy Fintech, jeśli nie podano widoku
  const currentView = searchParams.get('view') || 'fintech';
  
  const userId = 1;

  // Pobieramy dane kont tylko jeśli jesteśmy w widoku Fintech
  const { data: accounts, isLoading, isError } = useQuery({
    queryKey: ['accounts', userId],
    queryFn: () => fintechApi.getAccounts(userId),
    enabled: currentView === 'fintech'
  });

  // Konfiguracja nagłówka w zależności od widoku
  const getHeaderContent = () => {
    switch (currentView) {
      case 'fintech':
        return {
          title: 'Fintech Core Demo',
          subtitle: 'Banking System Simulation (Django Ninja + PostgreSQL)',
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
          <div className="flex gap-4">
             {/* Używamy zwykłego tagu <a> aby wymusić poprawne działanie kotwicy #projects */}
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