import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2, Sparkles, Zap, Code, Shield, User as UserIcon, Glasses, CheckCircle, Server } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- LOKALNA BAZA WIEDZY (Natychmiastowe odpowiedzi) ---
const PREDEFINED_QA = [
  {
    id: 'stack',
    question: 'Jaki stos technologiczny?',
    icon: <Code size={12} />,
    answer: 'Backend to głównie Python (Django Ninja, FastAPI) oraz Celery. Frontend: React z TypeScript i TailwindCSS. Infrastruktura: Docker, Redis, PostgreSQL i Nginx.'
  },
  {
    id: 'ecosystem',
    question: 'Jak działa ten system?',
    icon: <Zap size={12} />,
    answer: 'To ekosystem mikroserwisów. Django obsługuje bankowość (ACID), FastAPI działa jako inteligentne proxy i silnik AI, a Celery monitoruje ceny krypto w tle. Wszystko połączone w sieci Docker.'
  },
  {
    id: 'xray',
    question: 'Co to jest tryb X-Ray?',
    icon: <Glasses size={12} />,
    answer: 'To autorska funkcja Dashboardu, która po włączeniu (ikona okularów) dekonstruuje interfejs, pokazując podpięte endpointy API oraz technologie użyte w konkretnych modułach. To dowód na transparentność mojej architektury.'
  },
  {
    id: 'quality',
    question: 'Czy dbasz o jakość kodu?',
    icon: <CheckCircle size={12} />,
    answer: 'Zdecydowanie. Projekt posiada pipeline CI/CD (GitHub Actions), testy E2E w Playwright oraz rygorystyczny linting (Ruff dla Pythona, ESLint dla TypeScript). Kod jest utrzymany w standardzie produkcyjnym.'
  },
  {
    id: 'microservices',
    question: 'Dlaczego mikroserwisy?',
    icon: <Server size={12} />,
    answer: 'Wybrałem mikroserwisy, aby zademonstrować umiejętność izolacji logiki. Dzięki Dockerowi każdy serwis (Fintech, B2B, Monitor) jest niezależny, co ułatwia skalowanie i pozwala na dobór najlepszego narzędzia do konkretnego problemu.'
  },
  {
    id: 'gitsensei',
    question: 'Co to jest Git-Sensei?',
    icon: <Shield size={12} />,
    answer: 'To moje autorskie narzędzie CLI w Pythonie. Wykorzystuje AI do analizy zmian w kodzie (git diff) i automatycznego generowania profesjonalnych wiadomości commit.'
  },
  {
    id: 'hire',
    question: 'Czy szukasz pracy?',
    icon: <UserIcon size={12} />,
    answer: 'Tak! Szukam wyzwań jako Python Backend lub Fullstack Developer. Moje dane kontaktowe znajdziesz w zakładce Kontakt lub na LinkedIn.'
  }
];

const AiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { 
      role: 'bot', 
      text: 'Cześć! Jestem asystentem AI Łukasza (w wersji Beta). Wybierz interesujący Cię temat lub zadaj własne pytanie. Pamiętaj, że pełna komunikacja z modelem AI jest jeszcze w fazie produkcji i może mieć ograniczenia.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Obsługa kliknięcia w sugerowane pytanie
  const handleSuggestion = (qa: typeof PREDEFINED_QA[0]) => {
    setMessages(prev => [
      ...prev, 
      { role: 'user', text: qa.question },
      { role: 'bot', text: qa.answer }
    ]);
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input.trim();
    if (!textToSend || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsLoading(true);

    // Sprawdź czy to pytanie jest w naszej lokalnej bazie (case insensitive)
    const localMatch = PREDEFINED_QA.find(q => textToSend.toLowerCase().includes(q.question.toLowerCase()));
    
    if (localMatch) {
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'bot', text: localMatch.answer }]);
            setIsLoading(false);
        }, 500); // Małe opóźnienie dla realizmu
        return;
    }

    // Jeśli nie ma w lokalnej bazie, uderzamy do API (Gemini)
    try {
      const response = await fetch('/api/b2b/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Obecnie mam utrudniony dostęp do moich procesorów w chmurze (Limit API). Skorzystaj z powyższych sugestii!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-110 transition-transform z-[100] group"
        aria-label="Open AI assistant chat"
        aria-expanded={isOpen}
      >
        <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#050811] animate-pulse" aria-hidden="true"></span>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-28 right-8 w-[400px] h-[600px] bg-[#0a0f1d] border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden z-[100] backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-blue-600/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                  <Bot size={20} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    Portfolio AI <Sparkles size={12} className="text-blue-400" />
                  </h3>
                  <p className="text-[10px] text-orange-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span> BETA_TESTING
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors" aria-label="Close chat window">
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-[0_5px_15px_rgba(37,99,235,0.2)]' 
                      : 'bg-white/5 border border-white/10 text-slate-300 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                    <Loader2 size={16} className="text-blue-400 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions Chips */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
                {PREDEFINED_QA.map((qa) => (
                    <button
                        key={qa.id}
                        onClick={() => handleSuggestion(qa)}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-bold whitespace-nowrap hover:bg-blue-500/20 transition-all active:scale-95"
                        aria-label={qa.question}
                    >
                        <span aria-hidden="true">{qa.icon}</span> {qa.question}
                    </button>
                ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Zadaj inne pytanie..."
                  className="w-full bg-[#050811] border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="absolute right-2 top-1.5 p-1.5 bg-blue-600 rounded-lg text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send size={18} aria-hidden="true" />
                </button>
              </div>
              <p className="text-[9px] text-slate-600 text-center mt-3 uppercase tracking-widest font-mono">
                AI Module: Production Phase & Testing
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiChat;