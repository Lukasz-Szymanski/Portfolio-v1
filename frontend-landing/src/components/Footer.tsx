import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 w-full py-3 bg-[#050811]/80 backdrop-blur-md border-t border-white/5 z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
          © {year} Łukasz Szymański. <span className="opacity-50">All rights reserved.</span>
        </p>
        <div className="flex gap-4 items-center">
            <span className="text-[9px] text-slate-700 font-mono uppercase tracking-[0.3em] hidden md:block">
                Educational_Simulation_Environment
            </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;