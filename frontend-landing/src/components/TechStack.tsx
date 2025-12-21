import React from 'react';
import { Server, Database, Code2 } from 'lucide-react';

const TechStack: React.FC = () => {
  const stack = [
    {
      category: "Backend Core",
      icon: <Server className="text-blue-400" size={24} />,
      tools: ["Python 3.11", "Django 5.0", "FastAPI", "Celery"]
    },
    {
      category: "Infrastructure",
      icon: <Database className="text-emerald-400" size={24} />,
      tools: ["Docker / Compose", "PostgreSQL", "Redis", "Nginx"]
    },
    {
      category: "Frontend",
      icon: <Code2 className="text-purple-400" size={24} />,
      tools: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col mb-16 items-start">
        <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 text-left">Engineering_Arsenal</span>
        <h2 className="text-5xl font-bold text-white font-display text-left">Tech Stack</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stack.map((item, idx) => (
          <div key={idx} className="glass-card p-10 rounded-[2rem] hover:border-blue-500/30 transition-all group text-left">
            <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-2xl w-fit group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-all">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-white font-display mb-6 tracking-tight text-left">{item.category}</h3>
            <div className="flex flex-col gap-3">
              {item.tools.map(tool => (
                <div key={tool} className="flex items-center gap-3 text-slate-400 font-mono text-xs uppercase tracking-widest">
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