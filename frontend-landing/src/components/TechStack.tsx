import React from 'react';
import { Database, Server, Layout, Cpu, Code2, Layers } from 'lucide-react';

const TechStack: React.FC = () => {
  const categories = [
    {
      title: "Backend Core",
      icon: <Server className="text-blue-500" size={28} />,
      skills: ["Python 3.11", "FastAPI", "Django Ninja", "RESTful APIs", "Celery"]
    },
    {
      title: "Data & Caching",
      icon: <Database className="text-emerald-500" size={28} />,
      skills: ["PostgreSQL", "Redis", "SQLAlchemy", "System Design"]
    },
    {
      title: "DevOps & Infra",
      icon: <Cpu className="text-purple-500" size={28} />,
      skills: ["Docker", "Docker Compose", "Nginx", "Linux/Bash", "Git"]
    },
    {
      title: "Frontend Lite",
      icon: <Layout className="text-yellow-500" size={28} />,
      skills: ["React", "TypeScript", "Tailwind CSS", "Vite"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 animate-in fade-in zoom-in-95 duration-700">
      <div className="flex flex-col mb-16 items-center text-center">
        <h2 className="text-5xl font-bold mb-4 text-white">My Tech Stack</h2>
        <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
          Narzędzia i technologie, których używam do budowania skalowalnych systemów mikroserwisowych.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-[#111] border border-gray-800 p-8 rounded-2xl hover:border-blue-500/50 transition-all group">
            <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
              {cat.icon}
            </div>
            <h3 className="text-xl font-bold mb-6 text-white">{cat.title}</h3>
            <ul className="space-y-3">
              {cat.skills.map(skill => (
                <li key={skill} className="flex items-center gap-2 text-gray-400 font-mono text-sm group-hover:text-gray-200 transition-colors">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-50"></div>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Status systemowy na dole */}
      <div className="mt-20 p-6 bg-blue-500/5 border border-blue-500/10 rounded-xl flex items-center justify-between font-mono text-xs text-blue-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <Code2 size={14} /> LANGUAGE: PYTHON_3.11
          </span>
          <span className="flex items-center gap-2">
            <Layers size={14} /> ARCH: MICROSERVICES
          </span>
        </div>
        <div className="hidden md:block uppercase tracking-widest">
          ready_to_deploy: true
        </div>
      </div>
    </div>
  );
};

export default TechStack;
