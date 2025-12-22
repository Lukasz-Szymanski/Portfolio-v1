import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface B2BStatsProps {
  hits: number;
  misses: number;
}

const B2BStats = ({ hits, misses }: B2BStatsProps) => {
  const data = [
    { name: 'Cache Hits', value: Number(hits), color: '#10b981' }, // emerald-500
    { name: 'Cache Misses', value: Number(misses), color: '#3b82f6' }, // blue-500
  ];

  return (
    <div className="h-[200px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            animationDuration={1000}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px', fontFamily: 'monospace' }}
            itemStyle={{ color: '#fff' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default B2BStats;
