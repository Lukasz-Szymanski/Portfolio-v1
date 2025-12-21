import React from 'react';
import { Headphones, Film, Smartphone } from 'lucide-react';

const Hobby: React.FC = () => {
  const hobbies = [
    {
      title: "Muzyka",
      icon: <Headphones className="text-blue-400" size={32} />,
      desc: "Od rocka po elektronikę. Muzyka to mój sposób na absolutne skupienie podczas debugowania skomplikowanych systemów.",
      tags: ["Spotify", "Audiophile"]
    },
    {
      title: "Video & Film",
      icon: <Film className="text-emerald-400" size={32} />,
      desc: "Fascynuje mnie wizualna strona opowiadania historii. Cenię dobry kadr i montaż tak samo jak czysty, czytelny kod.",
      tags: ["Cine", "Editing"]
    },
    {
      title: "Nowinki Tech",
      icon: <Smartphone className="text-purple-400" size={32} />,
      desc: "Śledzę rozwój AI, hardware i systemów operacyjnych. Lubię wiedzieć, dokąd zmierza świat, zanim to nastąpi.",
      tags: ["AI", "Future"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-24 animate-in fade-in zoom-in-95 duration-1000">
      <div className="flex flex-col mb-20 items-center text-center">
        <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-4">Off_Duty_Mode</span>
        <h2 className="text-5xl font-bold text-white font-display">Po Godzinach</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {hobbies.map((hobby, idx) => (
          <div key={idx} className="glass-card p-10 rounded-[2rem] hover:-translate-y-2 transition-all group text-left">
            <div className="mb-8 p-5 bg-white/5 border border-white/10 rounded-2xl w-fit group-hover:scale-110 transition-transform">
              {hobby.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white font-display text-left">{hobby.title}</h3>
            <p className="text-slate-400 leading-relaxed mb-8 min-h-[80px] font-light text-left">
              {hobby.desc}
            </p>
            <div className="flex flex-wrap gap-2 justify-start">
              {hobby.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] rounded-full font-mono uppercase tracking-widest border border-blue-500/20">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hobby;