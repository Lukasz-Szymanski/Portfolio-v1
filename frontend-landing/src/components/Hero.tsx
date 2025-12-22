import React from "react";
import { Terminal, Github, ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <header className="w-full h-[calc(100vh-80px)] flex flex-col justify-center px-4 md:px-16 lg:px-24 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-1000">
      {/* Mały nagłówek "systemowy" */}
      <div className="flex items-center gap-2 mb-10 text-blue-400 font-mono text-[10px] uppercase tracking-[0.4em] bg-blue-500/5 w-fit px-4 py-2 rounded-full border border-blue-500/20 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        Systems Architecture 2025
      </div>

      <div className="space-y-10">
        <h1 className="text-7xl md:text-9xl font-bold font-display tracking-tight leading-[0.85] text-white">
          Building the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            Future of Fintech
          </span>
        </h1>

        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
          <h2 className="text-2xl md:text-3xl text-slate-400 font-light flex items-center gap-4">
            <Terminal className="text-blue-500" size={32} />
            <span>
              Aspiring{" "}
              <span className="text-white font-medium">Backend Developer</span>
            </span>
          </h2>
          <div className="h-px md:h-12 w-12 md:w-px bg-white/10 hidden md:block"></div>
          {/* <p className="text-lg text-slate-500 max-w-xl leading-relaxed font-light">
                To portfolio jest dowodem mojej determinacji i umiejętności technicznych. Buduję systemy rozproszone, ucząc się <span className="text-blue-400 font-mono">praktycznego rzemiosła IT</span>.
            </p> */}
        </div>

        {/* Przyciski CTA */}
        <div className="flex flex-wrap gap-6 pt-6">
          <a
            href="#projects"
            className="group relative flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold text-base transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
            Explore Stack{" "}
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>

          <a
            href="https://github.com/Lukasz-Szymanski"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-5 rounded-full font-bold text-base transition-all backdrop-blur-md">
            <Github size={20} /> Repository
          </a>
        </div>
      </div>
    </header>
  );
};

export default Hero;
