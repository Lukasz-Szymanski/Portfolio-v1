import React from 'react';
import { Music, Video, Cpu, Headphones, Film, Smartphone } from 'lucide-react';

const Hobby: React.FC = () => {
  const hobbies = [
    {
      title: "Muzyka",
      icon: <Headphones className="text-pink-500" size={32} />,
      desc: "Nie wyobrażam sobie dnia bez dobrego brzmienia. Od klasyków rocka po nowoczesną elektronikę. Muzyka to mój sposób na skupienie podczas kodowania.",
      tags: ["Spotify Power User", "Audiophile", "Concerts"]
    },
    {
      title: "Video & Film",
      icon: <Film className="text-cyan-500" size={32} />,
      desc: "Fascynuje mnie wizualna strona opowiadania historii. Montaż, kinematografia i efekty specjalne. Doceniam dobry kadr tak samo jak czysty kod.",
      tags: ["Cinematography", "Editing", "Movies"]
    },
    {
      title: "Nowinki Tech",
      icon: <Cpu className="text-yellow-500" size={32} />,
      desc: "Śledzę rozwój AI, nowy hardware i gadżety. Lubię wiedzieć, w którą stronę zmierza świat technologii, zanim stanie się to mainstreamem.",
      tags: ["AI News", "Gadgets", "Future Tech"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 animate-in fade-in zoom-in-95 duration-700">
      <div className="flex flex-col mb-16 items-center text-center">
        <span className="text-purple-500 font-mono text-sm mb-2 tracking-wider">OFF_DUTY_MODE</span>
        <h2 className="text-4xl font-bold text-white mb-4">Po Godzinach</h2>
        <p className="text-gray-400 max-w-xl text-lg">
          Kiedy zamykam IDE, ładuję baterie w inny sposób. Oto co napędza moją kreatywność.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {hobbies.map((hobby, idx) => (
          <div key={idx} className="bg-[#111] border border-gray-800 p-8 rounded-2xl hover:border-gray-600 transition-all group hover:-translate-y-2 duration-300">
            <div className="mb-6 p-4 bg-gray-900 rounded-full w-fit group-hover:bg-white/5 transition-colors">
              {hobby.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">{hobby.title}</h3>
            <p className="text-gray-400 leading-relaxed mb-8 min-h-[80px]">
              {hobby.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {hobby.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full font-mono">
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
