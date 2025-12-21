import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, BarChart3, Search, Activity, ExternalLink } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      id: 'fintech',
      title: 'Fintech Core',
      description: 'System bankowy: transakcje ACID, Postgres i PDF.',
      icon: <Shield size={20} />,
      tags: ['Django', 'Postgres']
    },
    {
      id: 'b2b',
      title: 'B2B Verifier',
      description: 'Proxy API: weryfikacja NIP i cache Redis.',
      icon: <Search size={20} />,
      tags: ['FastAPI', 'Redis']
    },
    {
      id: 'monitor',
      title: 'Price Monitor',
      description: 'Background tasks: monitoring krypto w czasie rzeczywistym.',
      icon: <BarChart3 size={20} />,
      tags: ['Celery', 'Beat']
    }
  ];

  return (
    <div id="projects" className="max-w-7xl mx-auto py-10 animate-in fade-in zoom-in-95 duration-1000 flex flex-col h-[calc(100vh-160px)] justify-center">
      
      <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4">
        <div>
            <span className="text-blue-500 font-mono text-[9px] uppercase tracking-[0.4em] mb-2 block">Architecture_Showcase</span>
            <h2 className="text-4xl font-bold text-white font-display">Active Microservices</h2>
        </div>
        
        <div className="hidden lg:flex items-center gap-4 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
            <Activity size={16} className="text-emerald-500" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Global Status: <span className="text-emerald-400">Operational</span></span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="glass-card p-8 rounded-[2rem] hover:-translate-y-1 transition-all group flex flex-col h-full relative"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all bg-white/5 border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 text-slate-400 group-hover:text-blue-400">
              {project.icon}
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-white font-display flex items-center gap-3">
              {project.title}
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
            </h3>
            
            <p className="text-slate-400 text-sm mb-8 leading-relaxed flex-grow font-light">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-full text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>

            <Link 
              to={`/dashboard?view=${project.id}`}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-white text-black rounded-xl font-bold text-xs hover:bg-blue-50 transition-all group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Launch Instance <ExternalLink size={14} />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
         <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.3em]">
            Multi-Container Environment :: Orchestrated with Docker
         </p>
      </div>
    </div>
  );
};

export default Projects;