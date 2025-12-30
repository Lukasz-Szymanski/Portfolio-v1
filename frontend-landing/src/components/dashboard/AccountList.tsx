import { useState } from 'react';
import { CreditCard, Wallet, Check, Code2, Plus, Loader2 } from 'lucide-react';
import { fintechApi, type Account } from '../../api/fintech';

interface AccountListProps {
  accounts: Account[];
}

const AccountList = ({ accounts }: AccountListProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [amounts, setAmounts] = useState<Record<string, number>>({});

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTopUp = async (accountId: string) => {
    setLoadingId(accountId);
    const amount = amounts[accountId] || 50;
    try {
      const { url } = await fintechApi.createStripeSession(accountId, amount);
      window.location.href = url; // Przekierowanie do Stripe Checkout
    } catch {
      alert("Nie udało się zainicjować płatności.");
    } finally {
      setLoadingId(null);
    }
  };

  if (!accounts || accounts.length === 0) {
    return <div className="text-slate-500 font-mono italic text-left p-4">No active accounts found in vault...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {accounts.map((account) => (
        <div 
          key={account.id} 
          className="glass-card p-5 md:p-6 rounded-[2rem] group relative overflow-hidden transition-all text-left flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-white/5 hover:border-blue-500/20 shadow-[0_0_30px_rgba(0,0,0,0.2)]"
        >
          {/* Decorative background icon - smaller and more subtle */}
          <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
            <CreditCard size={120} />
          </div>

          {/* SECTION 1: Account Type & Icon */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest leading-none mb-1">Type</p>
              <p className="text-xs font-bold text-slate-200 uppercase tracking-tight">Operational</p>
            </div>
          </div>

          {/* SECTION 2: Balance - Centered focus */}
          <div className="lg:min-w-[180px]">
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest leading-none mb-1">Available Funds</p>
            <p className="text-3xl font-mono font-bold text-white tracking-tighter">
              {account.balance} <span className="text-sm text-emerald-400 ml-0.5">{account.currency}</span>
            </p>
          </div>

          {/* SECTION 3: Account Number / Vault Address */}
          <div className="flex-grow max-w-md">
            <div className="bg-black/20 border border-white/5 p-3 rounded-xl flex items-center justify-between backdrop-blur-sm group-hover:border-blue-500/20 transition-colors">
              <div className="flex flex-col">
                <span className="text-[8px] text-slate-600 uppercase font-mono tracking-widest mb-0.5">Vault_Address</span>
                <span className="text-[10px] text-slate-400 font-mono tracking-tight">{account.account_number}</span>
              </div>
              <button 
                className={`ml-4 text-xs p-2 rounded-lg transition-all ${
                  copiedId === account.id ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-blue-400 hover:bg-blue-500/20'
                }`}
                onClick={() => copyToClipboard(account.account_number, account.id)}
              >
                {copiedId === account.id ? <Check size={14} /> : <Code2 size={14} />}
              </button>
            </div>
          </div>

          {/* SECTION 4: Actions with Amount Selection */}
          <div className="flex items-center gap-2">
            <select 
              value={amounts[account.id] || 50}
              onChange={(e) => setAmounts({...amounts, [account.id]: parseInt(e.target.value)})}
              className="bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-[10px] font-mono text-emerald-400 focus:outline-none focus:border-emerald-500/50 transition-colors cursor-pointer appearance-none text-center min-w-[80px]"
            >
              <option value="20">20 PLN</option>
              <option value="50">50 PLN</option>
              <option value="100">100 PLN</option>
              <option value="200">200 PLN</option>
              <option value="500">500 PLN</option>
            </select>

            <button 
              onClick={() => handleTopUp(account.id)}
              disabled={!!loadingId}
              className="px-6 py-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all flex items-center justify-center gap-2 group/btn disabled:opacity-50 whitespace-nowrap"
            >
              {loadingId === account.id ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Plus size={14} className="group-hover/btn:rotate-90 transition-transform duration-300" />
              )}
              {loadingId === account.id ? 'Syncing...' : 'Refill'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountList;