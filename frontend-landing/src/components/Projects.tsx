import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, BarChart3, Search, Database, Cpu, Activity, ExternalLink } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      id: 'fintech',
      title: 'Fintech Core',
      description: 'Symulator systemu bankowego z pełną obsługą transakcji ACID, relacyjną bazą danych i bezpiecznymi przelewami.',
      icon: <Shield size={24} />,
      color: 'blue',
      tags: ['Django Ninja', 'PostgreSQL', 'ACID']
    },
    {
      id: 'b2b',
      title: 'B2B Verifier',
      description: 'Mikroserwis do weryfikacji danych kontrahentów z systemem inteligentnego cacheowania w pamięci RAM.',
      icon: <Search size={24} />,
      color: 'emerald',
      tags: ['FastAPI', 'Redis', 'High Perf']
    },
    {
      id: 'monitor',
      title: 'Price Monitor',
      description: 'System zadań asynchronicznych monitorujący kursy walut i kryptowalut w czasie rzeczywistym.',
      icon: <BarChart3 size={24} />,
      color: 'purple',
      tags: ['Celery', 'Redis', 'Workers']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 animate-in fade-in zoom-in-95 duration-700">
      
      <div className="flex flex-col mb-12">
        <span className="text-blue-500 font-mono text-sm mb-2 tracking-wider uppercase">Architecture_Exhibits</span>
        <h2 className="text-4xl font-bold text-white tracking-tight">Active Microservices</h2>
        <p className="text-gray-400 mt-2 max-w-2xl">
          Kompletny ekosystem backendowy zintegrowany w architekturze mikroserwisów. 
          Każdy moduł to osobna technologia dobrana pod konkretny problem biznesowy.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="bg-[#111] border border-gray-800 p-8 rounded-2xl hover:border-blue-500/50 transition-all group flex flex-col h-full"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors bg-gray-900 group-hover:bg-blue-500/10 text-gray-400 group-hover:text-blue-400`}>
              {project.icon}
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
              {project.title}
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
            </h3>
            
            <p className="text-gray-500 text-sm mb-8 leading-relaxed flex-grow">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-900 border border-gray-800 rounded text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>

            <Link 
              to={`/dashboard?view=${project.id}`}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-200 transition-all group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Launch Live Demo
              <ExternalLink size={14} />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-full text-blue-400">
            <Activity size={20} />
          </div>
          <div>
            <p className="text-white font-bold text-sm">System Health: Normal</p>
            <p className="text-gray-500 text-xs tracking-wide uppercase font-mono">Gateway & 3 Services Operational</p>
          </div>
        </div>
        <div className="hidden md:flex gap-8">
           <div className="text-right">
              <p className="text-white font-mono text-sm">8001 | 8002</p>
              <p className="text-gray-600 text-[10px] uppercase font-bold">API PORTS</p>
           </div>
           <div className="text-right">
              <p className="text-white font-mono text-sm">PostgreSQL | Redis</p>
              <p className="text-gray-600 text-[10px] uppercase font-bold">Persistence</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;