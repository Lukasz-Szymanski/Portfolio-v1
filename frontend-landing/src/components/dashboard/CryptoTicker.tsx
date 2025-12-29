import { useState, useEffect } from 'react';
import { TrendingUp, Bitcoin, Activity, Zap } from 'lucide-react';

interface CryptoPrices {
  bitcoin: string | number;
  ethereum: string | number;
}

const CryptoTicker = () => {
  const [prices, setPrices] = useState<CryptoPrices>({ bitcoin: '...', ethereum: '...' });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Determine WS URL based on current location (or env)
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    // For local docker setup via Nginx on port 80:
    const wsUrl = `ws://localhost/ws/crypto`; 
    
    console.log(`Connecting to WebSocket: ${wsUrl}`);
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Data format from Redis/Backend: { bitcoin: { pln: 123 }, ethereum: { pln: 456 } } OR simple flat from cron
        // Check structure from service-b2b-data/main.py: 
        // Cron sends: data['bitcoin']['pln']
        // WS Endpoint initial: { bitcoin: { pln: ... }, ... }
        
        // Let's normalize
        let btc = '---';
        let eth = '---';

        if (data.bitcoin && data.bitcoin.pln) {
           btc = data.bitcoin.pln;
           eth = data.ethereum.pln;
        } else if (data.bitcoin && typeof data.bitcoin !== 'object') {
           // Fallback if structure is different
           btc = data.bitcoin;
           eth = data.ethereum;
        }

        setPrices({
          bitcoin: btc,
          ethereum: eth
        });
      } catch (e) {
        console.error('Error parsing WS message:', e);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="glass-card border-blue-500/20 rounded-3xl p-6 flex items-center justify-between shadow-[0_0_50px_rgba(59,130,246,0.1)]">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl border transition-colors duration-500 ${isConnected ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          {isConnected ? <Zap size={24} className="animate-pulse" /> : <Activity size={24} />}
        </div>
        <div className="text-left">
          <p className="text-[10px] text-blue-400 font-mono font-bold tracking-[0.3em] uppercase text-left flex items-center gap-2">
            Market Pulse
            {isConnected && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"/>}
          </p>
          <p className="text-xs text-slate-500 font-mono italic text-left">
            Source: {isConnected ? 'WebSocket Stream' : 'Connecting...'}
          </p>
        </div>
      </div>

      <div className="flex gap-10">
        <div className="text-right group">
          <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest flex items-center justify-end gap-2 mb-1">
            Bitcoin <Bitcoin size={14} className="text-orange-500" />
          </p>
          <p className="text-2xl text-white font-mono font-bold tracking-tighter group-hover:text-blue-400 transition-colors">
            {prices.bitcoin !== '...' ? `${prices.bitcoin} PLN` : '---'}
          </p>
        </div>
        <div className="text-right group">
          <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest flex items-center justify-end gap-2 mb-1">
            Ethereum <TrendingUp size={14} className="text-blue-400" />
          </p>
          <p className="text-2xl text-white font-mono font-bold tracking-tighter group-hover:text-emerald-400 transition-colors">
            {prices.ethereum !== '...' ? `${prices.ethereum} PLN` : '---'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoTicker;