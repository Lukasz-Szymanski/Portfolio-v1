import { useQuery } from '@tanstack/react-query';
import { fintechApi } from '../../api/fintech';
import { ArrowDownLeft, ArrowUpRight, Calendar, FileText, Loader2 } from 'lucide-react';
import { useState } from 'react';

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
        
        // Tworzymy tymczasowy link do pobrania
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `confirmation_${txId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
    } catch (error) {
        console.error("Failed to download PDF", error);
        alert("Błąd pobierania PDF");
    } finally {
        setDownloadingId(null);
    }
  };

  if (isLoading) return <div className="text-slate-500 animate-pulse py-4">Loading transactions...</div>;

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-slate-500 text-center py-8 border-2 border-dashed border-slate-700 rounded-xl">
        No transactions found for this account.
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
    <div className="bg-slate-800/20 rounded-2xl border border-slate-700/50 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
            <th className="px-6 py-3 font-semibold">Data</th>
            <th className="px-6 py-3 font-semibold">Szczegóły</th>
            <th className="px-6 py-3 font-semibold text-right">Kwota</th>
            <th className="px-6 py-3 font-semibold text-center">Dokumenty</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {transactions.map((tx) => {
            const isNegative = parseFloat(tx.amount) < 0;
            return (
              <tr key={tx.id} className="hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {formatDate(tx.created_at)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${isNegative ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                      {isNegative ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{tx.transaction_type.replace('_', ' ')}</p>
                      <p className="text-xs text-slate-500 line-clamp-1">{tx.description}</p>
                    </div>
                  </div>
                </td>
                <td className={`px-6 py-4 text-right font-mono font-bold ${isNegative ? 'text-red-400' : 'text-emerald-400'}`}>
                  {isNegative ? '' : '+'}{tx.amount}
                </td>
                <td className="px-6 py-4 text-center">
                    <button 
                        onClick={() => handleDownloadPdf(tx.id)}
                        disabled={downloadingId === tx.id}
                        className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-colors disabled:opacity-50"
                        title="Pobierz potwierdzenie PDF"
                    >
                        {downloadingId === tx.id ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
                    </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
