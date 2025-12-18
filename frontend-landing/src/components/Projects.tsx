import React from 'react';
import B2BService from './B2BService';
import { Shield, BarChart3, Lock, Zap } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 animate-in fade-in zoom-in-95 duration-700">
      
      <div className="flex flex-col mb-12">
        <span className="text-blue-500 font-mono text-sm mb-2 tracking-wider">WORKS_DIRECTORY</span>
        <h2 className="text-4xl font-bold text-white">Active Microservices</h2>
        <p className="text-gray-400 mt-2">
          Poniższe serwisy działają w kontenerach Docker. Jeden z nich jest już w pełni interaktywny.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. Fintech Simulator (Planowany na Fazę 3) */}
        <div className="bg-[#111] border border-gray-800 p-6 rounded-xl hover:border-blue-500 transition-colors group relative overflow-hidden">
           {/* Ribbon "In Progress" */}
           <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full text-blue-400 text-[10px] font-mono font-bold tracking-wide">
             <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
             IN_DEV
           </div>

          <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
            <Shield size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">Fintech Core</h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Symulator systemu bankowego. Obsługuje podpisy HMAC, klucze idempotentności i transakcje atomowe.
          </p>
          
          <div className="space-y-2 border-t border-gray-800 pt-4">
             <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                <Lock size={12} /> HMAC Security
             </div>
             <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                <Zap size={12} /> Idempotency Keys
             </div>
          </div>
        </div>

        {/* 2. B2B Service (INTERAKTYWNY) */}
        <B2BService />

        {/* 3. Price Monitor (Planowany) */}
        <div className="bg-[#111] border border-gray-800 p-6 rounded-xl hover:border-purple-500 transition-colors group relative">
           <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-400 text-[10px] font-mono font-bold tracking-wide">
             <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
             PLANNED
           </div>

          <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500 mb-6 group-hover:bg-purple-500 group-hover:text-white transition-all">
            <BarChart3 size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">Price Monitor</h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            System scrapingowy oparty o Celery Workers. Monitoruje ceny konkurencji i wykrywa anomalie rynkowe.
          </p>
          
          <div className="space-y-2 border-t border-gray-800 pt-4">
             <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Redis Broker
             </div>
             <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span> Celery Workers
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Projects;
