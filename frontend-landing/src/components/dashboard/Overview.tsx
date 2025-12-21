import { useQuery } from '@tanstack/react-query';
import { b2bApi } from '../../api/b2b';
import { fintechApi } from '../../api/fintech';
import { Activity, Server, Users, Wallet, TrendingUp, Bitcoin } from 'lucide-react';
import { motion } from 'framer-motion';

interface OverviewProps {
  userId: number;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

const Overview = ({ userId }: OverviewProps) => {
  const { data: systemStatus, isLoading: isStatusLoading } = useQuery({
    queryKey: ['systemStatus'],
    queryFn: b2bApi.getSystemStatus,
    refetchInterval: 5000 // Live update co 5s
  });

  const { data: accounts } = useQuery({
    queryKey: ['accounts', userId],
    queryFn: () => fintechApi.getAccounts(userId),
    enabled: !!userId
  });

  const mainAccount = accounts?.[0];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      
      {/* KARTA 1: FINTECH SUMMARY */}
      <motion.div variants={item} className="glass-card p-6 rounded-3xl relative overflow-hidden group transition-all">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Wallet size={64} />
        </div>
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <Wallet size={20} />
            </div>
            <h3 className="font-bold font-display text-slate-200 tracking-tight">Total Balance</h3>
        </div>
        <p className="text-3xl font-mono font-bold text-white tracking-tighter">
            {mainAccount ? `${mainAccount.balance} PLN` : 'Loading...'}
        </p>
        <p className="text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-widest">Fintech Core • ACID</p>
      </motion.div>

      {/* KARTA 2: B2B TRAFFIC */}
      <motion.div variants={item} className="glass-card p-6 rounded-3xl relative overflow-hidden group transition-all">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Users size={64} />
        </div>
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                <Activity size={20} />
            </div>
            <h3 className="font-bold font-display text-slate-200 tracking-tight">Companies Checked</h3>
        </div>
        <p className="text-3xl font-mono font-bold text-white tracking-tighter">
            {isStatusLoading ? '...' : systemStatus?.b2b.companies_checked || 0}
        </p>
        <p className="text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-widest">B2B Proxy • Redis Cache</p>
      </motion.div>

      {/* KARTA 3: CRYPTO MONITOR */}
      <motion.div variants={item} className="glass-card p-6 rounded-3xl relative overflow-hidden group transition-all">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Bitcoin size={64} />
        </div>
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                <TrendingUp size={20} />
            </div>
            <h3 className="font-bold font-display text-slate-200 tracking-tight">Market Watch</h3>
        </div>
        <p className="text-3xl font-mono font-bold text-white tracking-tighter">
            {isStatusLoading ? '...' : `${systemStatus?.monitor.bitcoin} PLN`}
        </p>
        <div className="flex justify-between items-center mt-2">
             <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">BTC/PLN • {systemStatus?.monitor.last_update}</p>
             <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
        </div>
      </motion.div>

      {/* SYSTEM HEALTH */}
      <motion.div variants={item} className="md:col-span-2 lg:col-span-3 bg-white/5 border border-white/5 backdrop-blur-sm rounded-2xl p-4 flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest">
         <div className="flex gap-6">
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${systemStatus?.services.fintech === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                FINTECH_SERVICE
            </div>
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${systemStatus?.services.b2b === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                B2B_GATEWAY
            </div>
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${systemStatus?.services.monitor === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                CELERY_WORKERS
            </div>
         </div>
         <div className="flex items-center gap-2">
            <Server size={14} />
            <span>SYSTEM_LOAD: NORMAL</span>
         </div>
      </motion.div>

    </motion.div>
  );
};

export default Overview;
