import { useState } from 'react';
import { CreditCard, Wallet, Check, Code2 } from 'lucide-react';
import type { Account } from '../../api/fintech';

interface AccountListProps {
  accounts: Account[];
}

const AccountList = ({ accounts }: AccountListProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!accounts || accounts.length === 0) {
    return <div className="text-slate-500 font-mono italic text-left p-4">No active accounts found in vault...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {accounts.map((account) => (
        <div 
          key={account.id} 
          className="glass-card p-8 rounded-3xl group relative overflow-hidden transition-all text-left"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <CreditCard size={80} />
          </div>
          
          <div className="flex items-center gap-3 text-slate-500 mb-6 font-mono text-[10px] uppercase tracking-widest text-left">
            <Wallet size={16} className="text-blue-500" />
            <span>Operational Account</span>
          </div>

          <div className="mb-8 text-left">
            <p className="text-4xl font-mono font-bold text-white tracking-tighter text-left">
              {account.balance} <span className="text-lg text-emerald-400 ml-1">{account.currency}</span>
            </p>
          </div>

          <div className="bg-black/40 border border-white/5 p-3 rounded-2xl flex items-center justify-between backdrop-blur-sm group-hover:border-blue-500/30 transition-colors">
             <span className="text-[10px] text-slate-500 font-mono break-all tracking-tight">{account.account_number}</span>
             <button 
               className={`text-xs p-2 rounded-lg transition-all ${
                 copiedId === account.id ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-blue-400 hover:bg-blue-500/20'
               }`}
               onClick={() => copyToClipboard(account.account_number, account.id)}
             >
               {copiedId === account.id ? <Check size={14} /> : <Code2 size={14} />}
             </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountList;