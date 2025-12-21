import React from 'react';
import { User, Code2, Coffee, GraduationCap, MapPin, Calendar } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex flex-col mb-12">
        <span className="text-blue-500 font-mono text-sm mb-2 tracking-wider">USER_PROFILE</span>
        <h2 className="text-4xl font-bold text-white">O Mnie</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Lewa kolumna: Tekstowa historia */}
        <div className="space-y-6">
          <p className="text-2xl text-white font-medium leading-relaxed">
            Jestem aspirującym <span className="text-blue-500">Python Developerem</span>, który nie boi się wyzwań infrastrukturalnych.
          </p>
          
          <div className="space-y-4 text-gray-400 leading-relaxed text-lg">
            <p>
              Moja przygoda z programowaniem zaczęła się od chęci zrozumienia, jak działają systemy, z których korzystamy na co dzień. 
              Zamiast uczyć się tylko składni języka, skupiam się na budowaniu systemów – od bazy danych, przez API, aż po konteneryzację.
            </p>
            <p>
              W moich projektach stawiam na <span className="text-white">wydajność i czysty kod</span>. 
              Dzięki pracy z Dockerem i mikroserwisami, potrafię myśleć o aplikacji jako o większym ekosystemie, a nie tylko pojedynczym pliku.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="bg-[#111] p-4 rounded-xl border border-gray-800">
              <Coffee className="text-orange-500 mb-2" size={20} />
              <h4 className="text-white font-bold">Zawsze z kawą</h4>
              <p className="text-gray-500 text-xs">Paliwo do debugowania kodu.</p>
            </div>
            <div className="bg-[#111] p-4 rounded-xl border border-gray-800">
              <Code2 className="text-blue-500 mb-2" size={20} />
              <h4 className="text-white font-bold">Fan Clean Code</h4>
              <p className="text-gray-500 text-xs">Pythonic way is the only way.</p>
            </div>
          </div>
        </div>

        {/* Prawa kolumna: Fakty i statystyki */}
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 space-y-8">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <User size={20} className="text-blue-500" /> Szybkie Informacje
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase font-mono">Lokalizacja</p>
                <p className="text-white font-medium text-lg">Warszawa, Polska</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                <GraduationCap size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase font-mono">Edukacja</p>
                <p className="text-white font-medium text-lg">Samouk / Projekty Własne</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase font-mono">Status</p>
                <p className="text-white font-medium text-lg">Dostępny od zaraz</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-[10px] font-mono text-gray-500 space-y-2">
             <div className="flex justify-between">
                <span>SYSTEM_VERSION:</span>
                <span>v1.0.4-stable</span>
             </div>
             <div className="flex justify-between">
                <span>LAST_UPDATE:</span>
                <span>{new Date().toLocaleDateString()}</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;