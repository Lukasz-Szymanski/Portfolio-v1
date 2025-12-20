import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fintechApi } from '../api/fintech';
import AccountList from '../components/dashboard/AccountList';
import TransferForm from '../components/dashboard/TransferForm';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import { AlertCircle } from 'lucide-react';

function DashboardPage() {
  const userId = 1; // Symulacja zalogowanego użytkownika

  const { data: accounts, isLoading, isError } = useQuery({
    queryKey: ['accounts', userId],
    queryFn: () => fintechApi.getAccounts(userId),
  });

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Fintech Dashboard
          </h1>
          <Link to="/" className="text-gray-400 hover:text-white transition-colors">
            &larr; Back to Portfolio
          </Link>
        </header>

        {/* Loading State */}
        {isLoading && (
            <div className="text-gray-400 animate-pulse text-center mt-20">Loading financial data...</div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-lg flex items-center gap-2 max-w-2xl mx-auto">
            <AlertCircle size={20} />
            <span>Failed to connect to Fintech Service. Please ensure the backend containers are running.</span>
          </div>
        )}

        {/* Content */}
        {accounts && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Lewa kolumna: Lista Kont (zajmuje 2/3 szerokości na dużych ekranach) */}
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-emerald-500 pl-3">Your Accounts</h2>
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

                {/* Prawa kolumna: Akcje (Formularz) */}
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
    </div>
  );
}

export default DashboardPage;