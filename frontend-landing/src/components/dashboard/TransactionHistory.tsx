import { useQuery } from '@tanstack/react-query';
import { fintechApi } from '../../api/fintech';
import { ArrowDownLeft, ArrowUpRight, Calendar, FileText, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransactionHistoryProps {
  accountId: string;
}

const TransactionHistory = ({ accountId }: TransactionHistoryProps) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions', accountId],
    queryFn: () => fintechApi.getTransactions(accountId),
    enabled: !!accountId,
  });

  const handleDownloadPdf = async (txId: string) => {
    try {
        setDownloadingId(txId);
        const blob = await fintechApi.getTransactionPdf(txId);
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `confirmation_${txId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
    } catch {
        alert("Błąd pobierania PDF");
    } finally {
        setDownloadingId(null);
    }
  };

  if (isLoading) return <div className="text-slate-500 animate-pulse py-12 text-center font-mono">Loading encrypted ledger...</div>;

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-slate-500 text-center py-12 border-2 border-dashed border-white/5 rounded-3xl font-mono text-sm">
        No transactions found in this vault.
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden border-white/5">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
            <thead>
            <tr className="bg-white/5 text-slate-500 text-[10px] uppercase font-mono tracking-[0.2em]">
                <th className="px-8 py-4 font-bold">Timestamp</th>
                <th className="px-8 py-4 font-bold">Metadata</th>
                <th className="px-8 py-4 font-bold text-right">Volume</th>
                <th className="px-8 py-4 font-bold text-center">Docs</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
            <AnimatePresence>
                {transactions.map((tx, idx) => {
                    const isNegative = parseFloat(tx.amount) < 0;
                    return (
                    <motion.tr 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={tx.id} 
                        className="hover:bg-white/[0.02] transition-colors group"
                    >
                        <td className="px-8 py-5 whitespace-nowrap text-xs font-mono text-slate-400">
                            <div className="flex items-center gap-2">
                                <Calendar size={12} className="text-slate-600" />
                                {formatDate(tx.created_at)}
                            </div>
                        </td>
                        <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-xl ${isNegative ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                    {isNegative ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-bold text-white font-display uppercase tracking-tight">{tx.transaction_type.replace('_', ' ')}</p>
                                    <p className="text-[10px] text-slate-500 font-mono line-clamp-1">{tx.description}</p>
                                </div>
                            </div>
                        </td>
                        <td className={`px-8 py-5 text-right font-mono font-bold ${isNegative ? 'text-red-400' : 'text-emerald-400'}`}>
                            {isNegative ? '' : '+'}{tx.amount} <span className="text-[10px] opacity-50">PLN</span>
                        </td>
                        <td className="px-8 py-5 text-center">
                            <button 
                                onClick={() => handleDownloadPdf(tx.id)}
                                disabled={downloadingId === tx.id}
                                className="p-2.5 bg-white/5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all border border-white/5 hover:border-blue-500/30 disabled:opacity-50"
                            >
                                {downloadingId === tx.id ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
                            </button>
                        </td>
                    </motion.tr>
                    );
                })}
            </AnimatePresence>
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;