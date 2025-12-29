import React, { useState } from "react";
import {
  Mail,
  Linkedin,
  Github,
  Gitlab,
  Send,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { b2bApi } from "../api/b2b";
import { motion, AnimatePresence } from "framer-motion";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await b2bApi.sendContactMessage(formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setFormStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col justify-center h-[calc(100vh-120px)] animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center mb-10">
        <h2 className="text-5xl font-bold text-white mb-2 font-display tracking-tight">
          Let's build together.
        </h2>
        <p className="text-lg text-slate-400 font-light">
          Masz projekt lub ofertę pracy? Mój inbox jest zawsze otwarty.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Dane kontaktowe */}
        <div className="glass-card rounded-3xl p-8 flex flex-col justify-between">
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-white font-display flex items-center gap-3 text-left">
              <div className="w-8 h-px bg-blue-500 text-left"></div> Kontakt
            </h3>

            <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                        <Mail size={24} />
                    </div>
                    <div className="text-left">
                        <p className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-0.5 text-left">Email</p>
                        <p className="text-white font-medium text-base italic text-left">lukasz.szymanski94@icloud.com</p>
                    </div>
                </div>

                <a href="https://www.linkedin.com/in/lukasz-szymanski94/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group transition-all">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 group-hover:text-[#0077b5] group-hover:border-[#0077b5]/30 transition-all">
                        <Linkedin size={24} />
                    </div>
                    <div className="text-left">
                        <p className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-0.5 text-left">LinkedIn</p>
                        <p className="text-white font-medium text-base text-left">/in/lukasz-szymanski94</p>
                    </div>
                </a>

                <a href="https://github.com/Lukasz-Szymanski" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group transition-all">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 group-hover:text-white group-hover:border-white/30 transition-all">
                        <Github size={24} />
                    </div>
                    <div className="text-left">
                        <p className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-0.5 text-left">GitHub</p>
                        <p className="text-white font-medium text-base text-left">@Lukasz-Szymanski</p>
                    </div>
                </a>

                <a href="https://gitlab.com/Lukasz-Szymanski" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group transition-all">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 group-hover:text-[#fc6d26] group-hover:border-[#fc6d26]/30 transition-all">
                        <Gitlab size={24} />
                    </div>
                    <div className="text-left">
                        <p className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-0.5 text-left">GitLab</p>
                        <p className="text-white font-medium text-base text-left">@Lukasz-Szymanski</p>
                    </div>
                </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 font-mono text-[9px] text-slate-600 text-left uppercase tracking-widest">
            Status: Secure & Online
          </div>
        </div>

        {/* Formularz API */}
        <form
          onSubmit={handleSubmit}
          className="glass-card rounded-3xl p-8 space-y-4">
          <div className="space-y-1.5 text-left">
            <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] ml-1 text-left">
              Identity
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all text-sm placeholder:text-slate-700"
              placeholder="Jan Kowalski"
            />
          </div>
          <div className="space-y-1.5 text-left">
            <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] ml-1 text-left">
              Digital Address
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all text-sm placeholder:text-slate-700"
              placeholder="jan@example.com"
            />
          </div>
          <div className="space-y-1.5 text-left">
            <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] ml-1 text-left">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all resize-none text-sm placeholder:text-slate-700"
              placeholder="W czym mogę pomóc?"
            />
          </div>

          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-xs font-medium">
                <CheckCircle size={16} /> Wiadomość wysłana!
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={status === "sending" || status === "success"}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all text-sm ${
              status === "sending"
                ? "bg-slate-800 cursor-wait"
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:scale-[1.02]"
            }`}>
            {status === "sending" ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Sending...
              </>
            ) : (
              <>
                Wyślij <Send size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
