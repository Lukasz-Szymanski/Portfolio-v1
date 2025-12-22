import React from 'react';
import { Bot, Sparkles, BrainCircuit, MessageSquareCode } from 'lucide-react';

const AiMentoring: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-100px)] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-purple-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6 flex items-center gap-2">
          <Sparkles size={14} /> Accelerated_Growth
        </span>
        <h2 className="text-6xl font-bold text-white font-display mb-6 tracking-tight leading-tight">
          AI-Augmented <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">Learning</span>
        </h2>
        <p className="text-slate-400 max-w-2xl text-lg leading-relaxed font-light">
          Traktuję AI nie jako generator kodu, ale jako <span className="text-white font-medium">Mentora i Senior Developera</span>. <br className="hidden md:block"/> 
          Ten projekt to efekt setek godzin dyskusji o architekturze, bezpieczeństwie i dobrych praktykach.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        
        {/* Karta 1 */}
        <div className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-purple-500/30 transition-all">
          <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-8 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
            <BrainCircuit size={24} />
          </div>
          <h3 className="text-xl font-bold text-white font-display mb-4 uppercase tracking-tighter">Architect</h3>
          <p className="text-slate-400 text-sm leading-relaxed font-light">
            Projektowanie systemów rozproszonych i dbanie o spójność transakcyjną ACID.
          </p>
        </div>

        {/* Karta 2 */}
        <div className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-pink-500/30 transition-all">
          <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-8 text-pink-400 border border-pink-500/20 group-hover:scale-110 transition-transform">
            <MessageSquareCode size={24} />
          </div>
          <h3 className="text-xl font-bold text-white font-display mb-4 uppercase tracking-tighter">Workflow</h3>
          <p className="text-slate-400 text-sm leading-relaxed font-light">
            Błyskawiczne iteracje w terminalu z bezpośrednim dostępem do bazy kodu.
          </p>
        </div>

        {/* Karta 3 */}
        <div className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-blue-500/30 transition-all">
          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
            <Bot size={24} />
          </div>
          <h3 className="text-xl font-bold text-white font-display mb-4 uppercase tracking-tighter">Education</h3>
          <p className="text-slate-400 text-sm leading-relaxed font-light">
            Głębokie zrozumienie technologii poprzez proces "Why-Oriented Development".
          </p>
        </div>

      </div>

      <div className="mt-20 text-center opacity-30 font-mono text-[10px] uppercase tracking-[0.4em]">
        Neural Processing Instance :: 2.0_PRO_STABLE
      </div>
    </div>
  );
};

export default AiMentoring;
