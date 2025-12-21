import React from 'react';
import { User, Code2, Coffee, GraduationCap, MapPin, Calendar } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex flex-col mb-16">
        <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-4">Core_Intelligence</span>
        <h2 className="text-5xl font-bold text-white font-display">System Engineer</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        
        {/* Lewa kolumna: Tekstowa historia */}
        <div className="glass-card p-10 rounded-3xl space-y-8 flex flex-col justify-center text-left">
          <p className="text-3xl text-white font-display font-medium leading-tight text-left">
            Projektuję systemy, które <span className="text-blue-500 text-left">wytrzymują próbę czasu</span> i obciążenia.
          </p>
          
          <div className="space-y-6 text-slate-400 leading-relaxed text-lg font-light text-left">
            <p className="text-left">
              Moje podejście łączy czystą logikę Pythona z wydajnością infrastruktury opartej o Docker i Redis. 
              Nie interesuje mnie tylko "działający kod" – szukam optymalnych rozwiązań architektonicznych.
            </p>
            <p className="text-left">
              W portfolio demonstruję pełną integrację mikroserwisów, transakcyjność ACID oraz nowoczesne wzorce asynchroniczne.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Code2 size={20} /></div>
              <span className="text-sm font-mono text-slate-300">Clean Code</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Coffee size={20} /></div>
              <span className="text-sm font-mono text-slate-300">Performance</span>
            </div>
          </div>
        </div>

        {/* Prawa kolumna: Fakty i statystyki */}
        <div className="glass-card rounded-3xl p-10 space-y-10">
          <h3 className="text-xl font-bold text-white font-display flex items-center gap-3">
            <div className="w-8 h-px bg-blue-500"></div> Szybki Profil
          </h3>
          
          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                <MapPin size={24} />
              </div>
              <div className="text-left">
                <p className="text-slate-500 text-[10px] uppercase font-mono tracking-widest mb-1 text-left">Lokalizacja</p>
                <p className="text-white font-medium text-xl text-left">Warszawa, PL</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                <GraduationCap size={24} />
              </div>
              <div className="text-left">
                <p className="text-slate-500 text-[10px] uppercase font-mono tracking-widest mb-1 text-left">Specjalizacja</p>
                <p className="text-white font-medium text-xl text-left">Backend / Cloud</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-2xl text-purple-400 group-hover:bg-purple-500/10 transition-colors">
                <Calendar size={24} />
              </div>
              <div className="text-left">
                <p className="text-slate-500 text-[10px] uppercase font-mono tracking-widest mb-1 text-left">Status</p>
                <p className="text-white font-medium text-xl text-left">Available Now</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 font-mono text-[10px] text-slate-600 flex justify-between">
             <span>SYS_VER: 2.0.1-PRO</span>
             <span>UPTIME: 99.9%</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
