import { useState } from 'react';
import { CreditCard, Wallet, Check } from 'lucide-react';
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
    return <div className="text-gray-400">No active accounts found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {accounts.map((account) => (
        <div 
          key={account.id} 
          className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CreditCard size={64} />
          </div>
          
          <div className="flex items-center gap-2 text-slate-400 mb-4">
            <Wallet size={18} />
            <span className="text-sm font-medium">Main Account</span>
          </div>

          <div className="mb-4">
            <p className="text-3xl font-mono font-bold text-white tracking-tight">
              {account.balance} <span className="text-lg text-emerald-400">{account.currency}</span>
            </p>
          </div>

          <div className="bg-slate-900/50 p-2 rounded flex items-center justify-between">
             <span className="text-xs text-slate-500 font-mono break-all">{account.account_number}</span>
             <button 
               className={`text-xs flex items-center gap-1 transition-colors ${
                 copiedId === account.id ? 'text-emerald-400' : 'text-blue-400 hover:text-blue-300'
               }`}
               onClick={() => copyToClipboard(account.account_number, account.id)}
             >
               {copiedId === account.id ? (
                 <><Check size={12} /> Copied!</>
               ) : (
                 'Copy'
               )}
             </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountList;
