import React from 'react';
import { Bot, Sparkles, BrainCircuit, MessageSquareCode } from 'lucide-react';

const AiMentoring: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* ... istniejący kod ... */}
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-purple-500 font-mono text-sm mb-2 tracking-wider uppercase flex items-center gap-2">
          <Sparkles size={14} /> AI-Assisted Development
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Zbudowane z <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Gemini Agent</span>
        </h2>
        <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
          Ten projekt to nie tylko kod. To dowód na efektywną współpracę człowieka z AI. 
          Wykorzystałem autonomicznego agenta CLI do przyspieszenia procesu developmentu o 300%.
        </p>
      </div>

      {/* Grid Kart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* ... karty ... */}
        {/* Karta 1: Architektura */}
        <div className="bg-[#111] border border-purple-500/20 p-8 rounded-2xl relative overflow-hidden group hover:border-purple-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-32 bg-purple-600/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
          
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 text-purple-400">
            <BrainCircuit size={24} />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-4">Architekt i Mentor</h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            AI nie pisało kodu "na ślepo". Działało jako Senior Developer, sugerując architekturę mikroserwisów, 
            wzorce projektowe (Repository Pattern) i dbając o bezpieczeństwo (ACID Transactions).
          </p>
          <ul className="text-sm text-gray-500 space-y-2 font-mono">
            <li className="flex items-center gap-2"><span className="text-purple-500">✓</span> Code Review w czasie rzeczywistym</li>
            <li className="flex items-center gap-2"><span className="text-purple-500">✓</span> Decyzje architektoniczne (ADR)</li>
          </ul>
        </div>

        {/* Karta 2: Workflow */}
        <div className="bg-[#111] border border-pink-500/20 p-8 rounded-2xl relative overflow-hidden group hover:border-pink-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-32 bg-pink-600/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
          
          <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6 text-pink-400">
            <MessageSquareCode size={24} />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-4">CLI Agent Workflow</h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            Cała interakcja odbywała się w terminalu. Zamiast kopiować kod z przeglądarki, 
            Agent miał bezpośredni dostęp do systemu plików, co pozwoliło na błyskawiczne iteracje.
          </p>
          <div className="bg-black/50 p-3 rounded-lg border border-gray-800 font-mono text-xs text-green-400">
            $ user: "Dodaj obsługę Redis"<br/>
            $ agent: "Installing redis... Done."
          </div>
        </div>

        {/* Karta 3: Edukacja */}
        <div className="bg-[#111] border border-blue-500/20 p-8 rounded-2xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-32 bg-blue-600/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
          
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400">
            <Bot size={24} />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-4">Nauka przez Praktykę</h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            To nie był "gotowiec". Każda linijka kodu była omawiana. AI tłumaczyło zawiłości 
            konfiguracji Nginx, Docker Compose i asynchroniczności w Pythonie.
          </p>
          <ul className="text-sm text-gray-500 space-y-2 font-mono">
            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Dogłębne zrozumienie "Why?"</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Dokumentacja techniczna w Markdown</li>
          </ul>
        </div>
      </div>

      {/* Stopka sekcji */}
      <div className="mt-16 text-center">
        <p className="text-gray-500 text-sm font-mono uppercase tracking-widest">
          GENERATED_BY: Gemini 2.0 Pro | ROLE: Software Engineer Assistant
        </p>
      </div>
    </div>
  );
};

export default AiMentoring;
