import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, Loader2, CheckCircle } from 'lucide-react';
import { b2bApi } from '../api/b2b';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
        await b2bApi.sendContactMessage(formData);
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); 
        setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
        setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-5xl mx-auto py-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      <div className="text-center mb-20">
        <h2 className="text-6xl font-bold text-white mb-6 font-display tracking-tight">Let's build together.</h2>
        <p className="text-xl text-slate-400 font-light">
          Masz projekt, pomysł lub ofertę pracy? Mój inbox jest zawsze otwarty.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Dane kontaktowe */}
        <div className="glass-card rounded-3xl p-12 flex flex-col justify-between">
          <div className="space-y-12">
            <h3 className="text-2xl font-bold text-white font-display flex items-center gap-3 text-left">
                <div className="w-8 h-px bg-blue-500 text-left"></div> Kontakt
            </h3>
            
            <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                        <Mail size={28} />
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-1 text-left">Email</p>
                        <p className="text-white font-medium text-lg italic text-left">lukasz@example.com</p>
                    </div>
                </div>

                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group transition-all">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 group-hover:text-[#0077b5] group-hover:border-[#0077b5]/30 transition-all">
                        <Linkedin size={28} />
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-1 text-left">LinkedIn</p>
                        <p className="text-white font-medium text-lg text-left">/in/lukasz-dev</p>
                    </div>
                </a>

                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group transition-all">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 group-hover:text-white group-hover:border-white/30 transition-all">
                        <Github size={28} />
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-1 text-left">GitHub</p>
                        <p className="text-white font-medium text-lg text-left">@lukasz-repo</p>
                    </div>
                </a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 font-mono text-[10px] text-slate-600 text-left">
             ENCRYPTED_CONNECTION: TLS_1.3
          </div>
        </div>

        {/* Formularz API */}
        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-12 space-y-6">
          <div className="space-y-2 text-left">
            <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] ml-1 text-left">Identity</label>
            <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all placeholder:text-slate-700" 
                placeholder="Jan Kowalski" 
            />
          </div>
          <div className="space-y-2 text-left">
            <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] ml-1 text-left">Digital Address</label>
            <input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all placeholder:text-slate-700" 
                placeholder="jan@example.com" 
            />
          </div>
          <div className="space-y-2 text-left">
            <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] ml-1 text-left">Encrypted Message</label>
            <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4} 
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all resize-none placeholder:text-slate-700" 
                placeholder="Opisz swój projekt..." 
            />
          </div>
          
          <AnimatePresence>
            {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl text-sm font-medium">
                    <CheckCircle size={18} /> Wiadomość wysłana do bazy danych!
                </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit" 
            disabled={status === 'sending' || status === 'success'}
            className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
                status === 'sending' ? 'bg-slate-800 cursor-wait' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:scale-[1.02]'
            }`}
          >
            {status === 'sending' ? (
                <><Loader2 size={20} className="animate-spin" /> Transmitting...</>
            ) : (
                <>Wyślij Wiadomość <Send size={20} /></>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Contact;