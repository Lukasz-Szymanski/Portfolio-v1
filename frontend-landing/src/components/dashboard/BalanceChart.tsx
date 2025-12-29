import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { Transaction } from '../../api/fintech';

interface BalanceChartProps {
  transactions: Transaction[];
  currentBalance: number;
}

const BalanceChart = ({ transactions, currentBalance }: BalanceChartProps) => {
  const chartData = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    // Sortujemy transakcje od najstarszej
    const sortedTxs = [...transactions].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    // Obliczamy saldo początkowe (cofając się od obecnego)
    const totalChange = transactions.reduce((acc, tx) => acc + parseFloat(tx.amount), 0);
    let runningBalance = currentBalance - totalChange;

    const points = sortedTxs.map((tx) => {
      // eslint-disable-next-line react-hooks/immutability
      runningBalance += parseFloat(tx.amount);
      return {
        date: new Date(tx.created_at).toLocaleDateString('pl-PL', { day: '2-digit', month: 'short' }),
        fullDate: new Date(tx.created_at).toLocaleString('pl-PL'),
        balance: parseFloat(runningBalance.toFixed(2)),
        amount: parseFloat(tx.amount),
        type: tx.transaction_type
      };
    });

    // Jeśli mamy mało punktów, dodajmy punkt startowy "0" dla estetyki
    if (points.length > 0) {
        // Obliczamy balans PRZED pierwszą transakcją
        const firstBalance = points[0].balance - parseFloat(sortedTxs[0].amount);
        
        points.unshift({
            date: '',
            fullDate: 'Initial State',
            balance: parseFloat(firstBalance.toFixed(2)),
            amount: 0,
            type: 'START'
        });
    }

    return points;
  }, [transactions, currentBalance]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/90 border border-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-2xl font-mono">
          <p className="text-[10px] text-slate-500 mb-1">{payload[0].payload.fullDate}</p>
          <p className="text-sm font-bold text-white">
            {payload[0].value.toLocaleString()} <span className="text-[10px] opacity-50 text-blue-400">PLN</span>
          </p>
          <p className={`text-[10px] mt-1 ${payload[0].payload.amount >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {payload[0].payload.amount > 0 ? '+' : ''}{payload[0].payload.amount} {payload[0].payload.type}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }}
            minTickGap={30}
          />
          <YAxis 
            hide
            domain={['dataMin - 1000', 'dataMax + 1000']}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorBalance)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;
