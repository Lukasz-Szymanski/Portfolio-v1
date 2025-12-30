import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Search, Activity, ExternalLink, Layout, Database, Zap, Terminal, GitBranch, Sparkles } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <div id="projects" className="max-w-7xl mx-auto py-6 md:py-10 animate-in fade-in zoom-in-95 duration-1000 flex flex-col min-h-[calc(100vh-160px)] justify-center">
      
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-12 gap-4 text-center md:text-left px-4 md:px-0">
        <div>
            <span className="text-blue-500 font-mono text-[9px] uppercase tracking-[0.4em] mb-2 block">Premium_Showcase</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-display tracking-tight">Core Projects</h2>
        </div>
        
        <div className="hidden lg:flex items-center gap-4 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
            <Activity size={16} className="text-emerald-500" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Repository Status: <span className="text-emerald-400">All Live</span></span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 md:px-0">
        
        {/* CARD 1: MICROSERVICES ECOSYSTEM */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-600 rounded-[3rem] blur opacity-10 group-hover:opacity-30 transition duration-700"></div>
          <div className="relative glass-card p-8 md:p-10 rounded-[3rem] border-white/10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 text-blue-400">
                <Layout size={24} />
              </div>
              <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[9px] font-mono text-blue-400 uppercase tracking-widest">Fullstack Ecosystem</span>
            </div>

            <div className="flex-grow space-y-6">
              <h3 className="text-2xl font-bold text-white font-display">System Ecosystem</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Zintegrowana platforma mikroserwisów (Fintech + B2B + AI). Architektura oparta o niezależne kontenery, asynchroniczne zadania Celery i komunikację real-time.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono uppercase">
                  <Shield size={14} className="text-blue-400" /> Fintech_Core
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono uppercase">
                  <Zap size={14} className="text-purple-400" /> WebSockets_RT
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono uppercase">
                  <Search size={14} className="text-emerald-400" /> B2B_Verifier
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono uppercase">
                  <Database size={14} className="text-orange-400" /> PGVector_DB
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/5">
              <Link
                to="/dashboard"
                className="w-full flex items-center justify-center gap-3 py-4 bg-white text-black rounded-2xl font-bold text-xs hover:bg-blue-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                aria-label="Launch system ecosystem dashboard"
              >
                LAUNCH DASHBOARD <ExternalLink size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* CARD 2: GIT-SENSEI CLI */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-pink-600 rounded-[3rem] blur opacity-10 group-hover:opacity-30 transition duration-700"></div>
          <div className="relative glass-card p-8 md:p-10 rounded-[3rem] border-white/10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20 text-purple-400">
                <Terminal size={24} />
              </div>
              <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[9px] font-mono text-purple-400 uppercase tracking-widest">AI Productivity Tool</span>
            </div>

            <div className="flex-grow space-y-6">
              <h3 className="text-2xl font-bold text-white font-display">Git-Sensei CLI</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Inteligentne narzędzie CLI eliminujące "Commit Fatigue". Automatycznie analizuje zmiany w kodzie i generuje semantyczne, profesjonalne wiadomości commit przy użyciu modeli LLM.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono uppercase">
                  <Sparkles size={14} className="text-purple-400" /> LLM_Analysis
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono uppercase">
                  <GitBranch size={14} className="text-blue-400" /> Git_Integration
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono uppercase">
                  <Terminal size={14} className="text-emerald-400" /> Meta_CLI
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono uppercase">
                  <Database size={14} className="text-pink-400" /> Privacy_First
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/5">
              <a
                href="https://github.com/Lukasz-Szymanski/git_sensei"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 py-4 bg-transparent border border-white/10 text-white rounded-2xl font-bold text-xs hover:bg-white/5 transition-all hover:scale-[1.02] active:scale-[0.98]"
                aria-label="View Git-Sensei CLI source code on GitHub (opens in new tab)"
              >
                VIEW SOURCE ON GITHUB <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-12 flex justify-center gap-10 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
         <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-widest text-slate-400">
            <Database size={12} /> Persistence_Layer
         </div>
         <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-widest text-slate-400">
            <Layout size={12} /> Frontend_Orchestration
         </div>
         <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-widest text-slate-400">
            <Zap size={12} /> AI_Integration
         </div>
      </div>
    </div>
  );
};

export default Projects;