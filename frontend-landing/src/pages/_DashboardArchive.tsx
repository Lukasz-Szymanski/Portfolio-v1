import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fintechApi } from '../api/fintech';
import AccountList from '../components/dashboard/AccountList';
import TransferForm from '../components/dashboard/TransferForm';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import CompanyVerifier from '../components/dashboard/CompanyVerifier';
import CryptoTicker from '../components/dashboard/CryptoTicker';
import { AlertCircle, LayoutDashboard, Shield, Search, BarChart3 } from 'lucide-react';

function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentView = searchParams.get('view') || 'overview';
  
  const userId = 1;

  const { data: accounts, isLoading, isError } = useQuery({
    queryKey: ['accounts', userId],
    queryFn: () => fintechApi.getAccounts(userId),
    enabled: currentView === 'overview' || currentView === 'fintech' // Pobieraj tylko gdy potrzebne
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'fintech', label: 'Fintech Core', icon: <Shield size={18} /> },
    { id: 'b2b', label: 'B2B Verifier', icon: <Search size={18} /> },
    { id: 'monitor', label: 'Price Monitor', icon: <BarChart3 size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Fintech Dashboard
             </h1>
             <p className="text-slate-400 text-sm mt-1">Microservices Control Center</p>
          </div>
          <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
            &larr; Return to Portfolio
          </Link>
        </header>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-slate-700/50 pb-1">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setSearchParams({ view: tab.id })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors text-sm font-medium ${
                        currentView === tab.id 
                        ? 'bg-slate-800 text-white border-b-2 border-blue-500' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                >
                    {tab.icon}
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Global Error */}
        {isError && (currentView === 'fintech' || currentView === 'overview') && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-lg flex items-center gap-2 mb-8">
            <AlertCircle size={20} />
            <span>Failed to connect to Fintech Service. Please ensure the backend containers are running.</span>
          </div>
        )}

        {/* --- VIEW: OVERVIEW --- */}
        {currentView === 'overview' && (
            <div className="text-center py-20">
                <h2 className="text-2xl text-slate-300 font-bold mb-4">Welcome to the Control Center</h2>
                <p className="text-slate-500 max-w-lg mx-auto mb-8">
                    Select a module from the tabs above or launch a specific demo from the portfolio page.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {/* Skróty */}
                    <div onClick={() => setSearchParams({ view: 'fintech' })} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500 cursor-pointer transition-all">
                        <Shield className="text-blue-400 mb-4" size={32} />
                        <h3 className="font-bold text-white">Fintech Core</h3>
                    </div>
                    <div onClick={() => setSearchParams({ view: 'b2b' })} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-emerald-500 cursor-pointer transition-all">
                        <Search className="text-emerald-400 mb-4" size={32} />
                        <h3 className="font-bold text-white">B2B Verifier</h3>
                    </div>
                    <div onClick={() => setSearchParams({ view: 'monitor' })} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500 cursor-pointer transition-all">
                        <BarChart3 className="text-purple-400 mb-4" size={32} />
                        <h3 className="font-bold text-white">Price Monitor</h3>
                    </div>
                </div>
            </div>
        )}

        {/* --- VIEW: FINTECH --- */}
        {currentView === 'fintech' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
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
            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section>
                    <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-emerald-500 pl-3">Contractor Verification</h2>
                    <p className="text-slate-400 mb-8">
                        This module connects to the <strong>FastAPI Service</strong> via Redis Cache. 
                        Enter a NIP number to verify company details instantly.
                    </p>
                    <CompanyVerifier />
                </section>
            </div>
        )}

        {/* --- VIEW: MONITOR --- */}
        {currentView === 'monitor' && (
            <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section>
                    <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-purple-500 pl-3">Real-time Price Monitor</h2>
                    <p className="text-slate-400 mb-8">
                        Data fetched by background <strong>Celery Workers</strong>, stored in Redis, and served via FastAPI.
                        Updates automatically every 60 seconds.
                    </p>
                    <div className="transform scale-110 origin-top">
                        <CryptoTicker />
                    </div>
                    
                    <div className="mt-12 bg-slate-900 rounded-lg p-6 border border-slate-800 font-mono text-xs text-slate-500">
                        <p className="mb-2 text-purple-400 font-bold">// Worker Logs Simulation</p>
                        <p>[2025-12-20 14:00:01] INFO/Beat: Waking up...</p>
                        <p>[2025-12-20 14:00:01] INFO/MainProcess: Sending task 'fetch_crypto_prices'</p>
                        <p>[2025-12-20 14:00:02] INFO/Worker: Task received. Fetching from CoinGecko...</p>
                        <p>[2025-12-20 14:00:02] INFO/Worker: Success. Data saved to Redis key 'crypto:btc'.</p>
                    </div>
                </section>
            </div>
        )}

      </div>
    </div>
  );
}

export default DashboardPage;
