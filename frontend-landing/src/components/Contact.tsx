import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { b2bApi } from '../api/b2b';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
        await b2bApi.sendContactMessage(formData);
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Reset form
        setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
        console.error("Contact form error:", error);
        setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          
          <div className="flex items-center gap-4 text-gray-400 group">
            <div className="p-3 bg-gray-900 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-xs font-mono text-gray-500 mb-1">EMAIL</p>
              <p className="font-medium text-lg">lukasz@example.com</p>
            </div>
          </div>

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

        {/* Formularz API */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-2 uppercase">Twoje Imię</label>
            <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text" 
                required
                className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors" 
                placeholder="Jan Kowalski" 
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-2 uppercase">Twój Email</label>
            <input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email" 
                required
                className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors" 
                placeholder="jan@example.com" 
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-2 uppercase">Wiadomość</label>
            <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4} 
                className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors resize-none" 
                placeholder="Cześć, chciałbym pogadać o..." 
            />
          </div>
          
          {status === 'success' && (
             <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 p-3 rounded">
                <CheckCircle size={18} /> Wiadomość wysłana pomyślnie!
             </div>
          )}
          
          {status === 'error' && (
             <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded">
                <XCircle size={18} /> Błąd wysyłania. Spróbuj później.
             </div>
          )}

          <button 
            type="submit" 
            disabled={status === 'sending' || status === 'success'}
            className={`w-full font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                status === 'sending' ? 'bg-gray-700 cursor-wait' : 'bg-blue-600 hover:bg-blue-700 text-white group'
            }`}
          >
            {status === 'sending' ? (
                <><Loader2 size={18} className="animate-spin" /> Wysyłanie...</>
            ) : (
                <>Wyślij Wiadomość <Send size={18} className="group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Contact;
