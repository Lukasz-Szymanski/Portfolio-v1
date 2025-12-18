import React from 'react';
import { Terminal, Github, Linkedin, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <header className="w-full min-h-[70vh] flex flex-col justify-center px-4 md:px-16 lg:px-24 mb-20 mt-10 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Mały nagłówek "systemowy" */}
      <div className="flex items-center gap-2 mb-8 text-emerald-500 font-mono text-sm bg-emerald-500/5 w-fit px-4 py-1.5 rounded-full border border-emerald-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        OPEN TO WORK
      </div>
      
      <div className="space-y-6">
        <h1 className="text-7xl font-bold tracking-tight leading-none text-white">
          Cześć, jestem <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Łukasz</span>.
        </h1>
        
        <h2 className="text-4xl text-gray-400 font-light flex items-center gap-3">
          <Terminal className="text-blue-500" size={36} />
          Junior Python Developer
        </h2>

        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed pt-4">
          Szukam pierwszego komercyjnego wyzwania. Zamiast tylko uczyć się teorii, buduję działające mikroserwisy. 
          Poniżej znajdziesz moje projekty wdrożone na produkcji.
        </p>

        {/* Przyciski CTA */}
        <div className="flex flex-wrap gap-4 pt-8">
          <a href="#projects" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105">
            Zobacz Projekty <ArrowRight size={18} />
          </a>
          
          <a href="https://github.com/TwojNick" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#161616] hover:bg-[#202020] border border-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all hover:border-gray-600">
            <Github size={20} /> GitHub
          </a>

          <a href="https://linkedin.com/in/TwojProfil" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#161616] hover:bg-[#202020] border border-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all hover:border-gray-600">
            <Linkedin size={20} /> LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
};

export default Hero;