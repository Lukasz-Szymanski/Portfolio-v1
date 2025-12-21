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
    <div className="glass-card border-blue-500/20 rounded-3xl p-6 flex items-center justify-between shadow-[0_0_50px_rgba(59,130,246,0.1)]">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400 border border-blue-500/20">
          <Activity size={24} />
        </div>
        <div className="text-left">
          <p className="text-[10px] text-blue-400 font-mono font-bold tracking-[0.3em] uppercase text-left">Market Pulse</p>
          <p className="text-xs text-slate-500 font-mono italic text-left">Source: Celery Network</p>
        </div>
      </div>

      <div className="flex gap-10">
        <div className="text-right group">
          <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest flex items-center justify-end gap-2 mb-1">
            Bitcoin <Bitcoin size={14} className="text-orange-500" />
          </p>
          <p className="text-2xl text-white font-mono font-bold tracking-tighter group-hover:text-blue-400 transition-colors">
            {prices.bitcoin !== 'unavailable' ? `${prices.bitcoin} PLN` : '---'}
          </p>
        </div>
        <div className="text-right group">
          <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest flex items-center justify-end gap-2 mb-1">
            Ethereum <TrendingUp size={14} className="text-blue-400" />
          </p>
          <p className="text-2xl text-white font-mono font-bold tracking-tighter group-hover:text-emerald-400 transition-colors">
            {prices.ethereum !== 'unavailable' ? `${prices.ethereum} PLN` : '---'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoTicker;