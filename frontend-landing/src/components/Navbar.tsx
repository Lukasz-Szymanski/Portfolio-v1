import React, { useState } from 'react';
import { Terminal, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Start' },
    { id: 'about', label: 'O mnie' },
    { id: 'stack', label: 'Tech Stack' },
    { id: 'ai-mentoring', label: 'AI Workflow' },
    { id: 'projects', label: 'Projekty' },
    { id: 'hobby', label: 'Hobby' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <button onClick={() => handleNavClick('home')} className="flex items-center gap-2 text-white font-display font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity cursor-pointer">
          <Terminal size={24} className="text-blue-500" />
          <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">LUKASZ_DEV</span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-xs font-mono uppercase tracking-widest transition-colors relative group cursor-pointer ${
                activeSection === link.id ? 'text-blue-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-2 left-0 h-0.5 bg-blue-500 transition-all ${
                activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full shadow-[0_0_10px_rgba(59,130,246,0.5)]'
              }`}></span>
            </button>
          ))}
          
          <div className="h-6 w-px bg-white/10 mx-2"></div>

          <button 
             onClick={() => handleNavClick('contact')}
             className={`text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all cursor-pointer border ${
               activeSection === 'contact' 
                ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]' 
                : 'bg-white/10 border-white/10 text-white hover:bg-white/20'
             }`}
          >
            Kontakt
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gray-400 hover:text-white transition-colors cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-gray-800 animate-in slide-in-from-top-2">
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-lg font-medium text-left cursor-pointer ${
                   activeSection === link.id ? 'text-blue-400' : 'text-gray-400'
                }`}
              >
                {link.label}
              </button>
            ))}
             <button 
                onClick={() => handleNavClick('contact')}
                className="text-blue-400 font-bold mt-2 text-left cursor-pointer"
              >
                Kontakt
              </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;