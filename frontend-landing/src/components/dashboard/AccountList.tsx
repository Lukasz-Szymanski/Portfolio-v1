import { useState } from 'react';
import { CreditCard, Wallet, Check, Code2, Plus, Loader2 } from 'lucide-react';
import { fintechApi, type Account } from '../../api/fintech';

interface AccountListProps {
  accounts: Account[];
}

const AccountList = ({ accounts }: AccountListProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTopUp = async (accountId: string) => {
    setLoadingId(accountId);
    try {
      const { url } = await fintechApi.createStripeSession(accountId);
      window.location.href = url; // Przekierowanie do Stripe Checkout
    } catch (e) {
      console.error("Stripe Session Error", e);
      alert("Nie udało się zainicjować płatności.");
    } finally {
      setLoadingId(null);
    }
  };

  if (!accounts || accounts.length === 0) {
    return <div className="text-slate-500 font-mono italic text-left p-4">No active accounts found in vault...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {accounts.map((account) => (
        <div 
          key={account.id} 
          className="glass-card p-8 rounded-3xl group relative overflow-hidden transition-all text-left flex flex-col justify-between h-full border-white/5 hover:border-blue-500/20 shadow-[0_0_30px_rgba(0,0,0,0.2)]"
        >
          <div>
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <CreditCard size={120} />
            </div>
            
            <div className="flex items-center gap-3 text-slate-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-8">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                <Wallet size={14} />
              </div>
              <span>Operational Account</span>
            </div>

            <div className="mb-8">
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-1">Available Balance</p>
              <p className="text-5xl font-mono font-bold text-white tracking-tighter">
                {account.balance} <span className="text-xl text-emerald-400 ml-1">{account.currency}</span>
              </p>
            </div>

            <button 
              onClick={() => handleTopUp(account.id)}
              disabled={!!loadingId}
              className="w-full mb-8 py-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all flex items-center justify-center gap-3 group/btn disabled:opacity-50"
            >
              {loadingId === account.id ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Plus size={14} className="group-hover/btn:rotate-90 transition-transform duration-300" />
              )}
              {loadingId === account.id ? 'Processing...' : 'Refill Account (50 PLN)'}
            </button>
          </div>

          <div className="bg-black/40 border border-white/5 p-4 rounded-2xl flex items-center justify-between backdrop-blur-sm group-hover:border-blue-500/30 transition-colors">
             <div className="flex flex-col">
               <span className="text-[8px] text-slate-600 uppercase font-mono tracking-widest mb-1">Vault_Address</span>
               <span className="text-[10px] text-slate-400 font-mono break-all tracking-tight">{account.account_number}</span>
             </div>
             <button 
               className={`text-xs p-2.5 rounded-xl transition-all ${
                 copiedId === account.id ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-blue-400 hover:bg-blue-500/20'
               }`}
               onClick={() => copyToClipboard(account.account_number, account.id)}
             >
               {copiedId === account.id ? <Check size={16} /> : <Code2 size={16} />}
             </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountList;