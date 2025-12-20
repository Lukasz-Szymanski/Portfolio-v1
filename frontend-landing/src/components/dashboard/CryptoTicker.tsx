import { useQuery } from '@tanstack/react-query';
import { monitorApi } from '../../api/monitor';
import { TrendingUp, Bitcoin, Activity } from 'lucide-react';

const CryptoTicker = () => {
  const { data: prices, isLoading } = useQuery({
    queryKey: ['crypto'],
    queryFn: monitorApi.getPrices,
    refetchInterval: 60000, // Odświeżaj co minutę
  });

  if (isLoading || !prices) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-xl p-4 flex items-center justify-between animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
          <Activity size={20} />
        </div>
        <div>
          <p className="text-xs text-indigo-300 font-bold tracking-wider uppercase">Market Watch</p>
          <p className="text-xs text-slate-400">Live from Celery Worker</p>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="text-right">
          <p className="text-xs text-slate-400 uppercase font-bold flex items-center justify-end gap-1">
            BTC <Bitcoin size={12} />
          </p>
          <p className="text-white font-mono font-bold">
            {prices.bitcoin !== 'unavailable' ? `${prices.bitcoin} PLN` : '---'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 uppercase font-bold flex items-center justify-end gap-1">
            ETH <TrendingUp size={12} />
          </p>
          <p className="text-white font-mono font-bold">
            {prices.ethereum !== 'unavailable' ? `${prices.ethereum} PLN` : '---'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoTicker;
