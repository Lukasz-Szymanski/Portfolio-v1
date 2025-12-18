import React from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-white mb-6">Stwórzmy coś razem.</h2>
        <p className="text-xl text-gray-400">
          Masz projekt, pomysł lub ofertę pracy? Mój inbox jest zawsze otwarty.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#111] border border-gray-800 rounded-2xl p-8 md:p-12">
        
        {/* Dane kontaktowe */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-white mb-8">Kontakt</h3>
          
          <a href="mailto:lukasz@example.com" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group">
            <div className="p-3 bg-gray-900 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-500 mb-1">EMAIL</p>
              <p className="font-medium text-lg">lukasz@example.com</p>
            </div>
          </a>

          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group">
            <div className="p-3 bg-gray-900 rounded-lg group-hover:bg-[#0077b5] group-hover:text-white transition-all">
              <Linkedin size={24} />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-500 mb-1">LINKEDIN</p>
              <p className="font-medium text-lg">/in/lukasz-dev</p>
            </div>
          </a>

          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group">
            <div className="p-3 bg-gray-900 rounded-lg group-hover:bg-white group-hover:text-black transition-all">
              <Github size={24} />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-500 mb-1">GITHUB</p>
              <p className="font-medium text-lg">@lukasz-repo</p>
            </div>
          </a>
        </div>

        {/* Prosty formularz (mailto) */}
        <form action="mailto:lukasz@example.com" method="post" encType="text/plain" className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-2 uppercase">Twoje Imię</label>
            <input type="text" className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors" placeholder="Jan Kowalski" />
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-2 uppercase">Wiadomość</label>
            <textarea rows={4} className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors resize-none" placeholder="Cześć, chciałbym pogadać o..." />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all group">
            Wyślij Wiadomość <Send size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

      </div>
    </div>
  );
};

export default Contact;
