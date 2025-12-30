import React from 'react';
import { Server, Database, Code2, ShieldCheck } from 'lucide-react';

const TechStack: React.FC = () => {
  const stack = [
    {
      category: "Backend Architecture",
      icon: <Server className="text-blue-400" size={24} />,
      tools: ["Python 3.11", "Django 5.0", "FastAPI", "Celery Worker"]
    },
    {
      category: "Data & Infrastructure",
      icon: <Database className="text-emerald-400" size={24} />,
      tools: ["PostgreSQL (ACID)", "Redis (Broker)", "Docker Compose", "Nginx Proxy"]
    },
    {
      category: "Quality Assurance",
      icon: <ShieldCheck className="text-red-400" size={24} />,
      tools: ["Playwright (E2E)", "Ruff Linter", "GitHub Actions", "Type Safety"]
    },
    {
      category: "Modern Frontend",
      icon: <Code2 className="text-purple-400" size={24} />,
      tools: ["React 18", "TypeScript", "Recharts Data Viz", "Tailwind v4"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-120px)] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col mb-16 items-start">
        <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 text-left">Engineering_Arsenal</span>
        <h2 className="text-5xl font-bold text-white font-display text-left">Tech Stack</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stack.map((item, idx) => (
          <div key={idx} className="glass-card p-8 rounded-[2rem] hover:border-blue-500/30 transition-all group text-left">
            <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-2xl w-fit group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-all">
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-6 tracking-tight text-left h-12 flex items-center">{item.category}</h3>
            <div className="flex flex-col gap-3">
              {item.tools.map(tool => (
                <div key={tool} className="flex items-center gap-3 text-slate-400 font-mono text-[10px] uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40"></div>
                  {tool}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;