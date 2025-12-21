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
      <motion.div variants={item} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 relative overflow-hidden group hover:border-blue-500/50 transition-all">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Wallet size={64} />
        </div>
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                <Wallet size={20} />
            </div>
            <h3 className="font-semibold text-slate-200">Total Balance</h3>
        </div>
        <p className="text-3xl font-mono font-bold text-white tracking-tight">
            {mainAccount ? `${mainAccount.balance} PLN` : 'Loading...'}
        </p>
        <p className="text-xs text-slate-500 mt-2">Fintech Core Service • ACID</p>
      </motion.div>

      {/* KARTA 2: B2B TRAFFIC */}
      <motion.div variants={item} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Users size={64} />
        </div>
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                <Activity size={20} />
            </div>
            <h3 className="font-semibold text-slate-200">Companies Verified</h3>
        </div>
        <p className="text-3xl font-mono font-bold text-white tracking-tight">
            {isStatusLoading ? '...' : systemStatus?.b2b.companies_checked || 0}
        </p>
        <p className="text-xs text-slate-500 mt-2">B2B Service • Redis Cache Hit</p>
      </motion.div>

      {/* KARTA 3: CRYPTO MONITOR */}
      <motion.div variants={item} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 relative overflow-hidden group hover:border-purple-500/50 transition-all">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Bitcoin size={64} />
        </div>
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                <TrendingUp size={20} />
            </div>
            <h3 className="font-semibold text-slate-200">BTC Price (Live)</h3>
        </div>
        <p className="text-3xl font-mono font-bold text-white tracking-tight">
            {isStatusLoading ? '...' : `${systemStatus?.monitor.bitcoin} PLN`}
        </p>
        <div className="flex justify-between items-center mt-2">
             <p className="text-xs text-slate-500">Celery Worker • {systemStatus?.monitor.last_update}</p>
             <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
        </div>
      </motion.div>

      {/* SYSTEM HEALTH */}
      <motion.div variants={item} className="md:col-span-2 lg:col-span-3 bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex justify-between items-center text-xs font-mono text-slate-400">
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
