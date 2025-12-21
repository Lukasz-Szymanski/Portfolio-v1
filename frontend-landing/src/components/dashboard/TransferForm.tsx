import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fintechApi } from '../../api/fintech';
import type { TransferRequest } from '../../api/fintech';
import { Send, CheckCircle, AlertOctagon, User, Store, Loader2 } from 'lucide-react';

const TransferForm = ({ senderId }: { senderId: string }) => {
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    receiver_account_number: '',
    amount: '',
    description: 'Przelew natychmiastowy'
  });
  
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fillRecipient = (acc: string, desc: string, amount: string) => {
    setFormData({
        receiver_account_number: acc,
        description: desc,
        amount: amount
    });
  };

  const mutation = useMutation({
    mutationFn: (data: TransferRequest) => fintechApi.makeTransfer(data),
    onSuccess: () => {
      setSuccessMsg('Przelew wysłany pomyślnie!');
      setErrorMsg('');
      setFormData({ ...formData, amount: '' }); 
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      setTimeout(() => setSuccessMsg(''), 3000);
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Wystąpił błąd podczas przelewu.';
      setErrorMsg(msg);
      setSuccessMsg('');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderId) {
        setErrorMsg("Nie wybrano konta nadawcy.");
        return;
    }
    mutation.mutate({
      sender_account_id: senderId,
      receiver_account_number: formData.receiver_account_number.trim(),
      amount: parseFloat(formData.amount),
      description: formData.description
    });
  };

  return (
    <div className="glass-card p-8 rounded-3xl h-full flex flex-col text-left">
      <h3 className="text-xl font-bold font-display mb-8 flex items-center gap-3 text-left">
        <Send size={20} className="text-blue-400" />
        Nowy Przelew
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6 flex-grow text-left">
        
        <div className="space-y-2 text-left">
          <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1 text-left">Numer konta odbiorcy</label>
          <input 
            type="text" 
            placeholder="26 cyfr..."
            className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 outline-none font-mono text-sm transition-all"
            value={formData.receiver_account_number}
            onChange={(e) => setFormData({...formData, receiver_account_number: e.target.value})}
            required
            minLength={26}
            maxLength={26}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
             <button 
                type="button"
                onClick={() => fillRecipient("10000000000000000000000001", "Czynsz za mieszkanie", "2500")}
                className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all text-left"
             >
                <div className="p-2 bg-blue-500/10 rounded-full text-blue-400"><User size={14} /></div>
                <div><p className="text-[10px] font-bold text-slate-300">Właściciel</p></div>
             </button>

             <button 
                type="button"
                onClick={() => fillRecipient("20000000000000000000000002", "Zakupy spożywcze", "150")}
                className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all text-left"
             >
                <div className="p-2 bg-emerald-500/10 rounded-full text-emerald-400"><Store size={14} /></div>
                <div><p className="text-[10px] font-bold text-slate-300">Sklep</p></div>
             </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 text-left">
            <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1 text-left">Kwota (PLN)</label>
            <input 
              type="number" step="0.01" min="0.01" placeholder="0.00"
              className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 outline-none font-mono font-bold transition-all"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2 text-left">
            <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1 text-left">Tytuł</label>
            <input 
              type="text"
              className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 outline-none transition-all"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
        </div>

        {successMsg && (
          <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-2xl border border-emerald-500/20 flex items-center gap-2 text-xs font-mono animate-in slide-in-from-top-2">
            <CheckCircle size={16} /> {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-500/10 text-red-400 p-4 rounded-2xl border border-red-500/20 flex items-center gap-2 text-xs font-mono animate-in slide-in-from-top-2">
            <AlertOctagon size={16} /> {errorMsg}
          </div>
        )}

        <button 
          type="submit" 
          disabled={mutation.isPending}
          className={`w-full py-4 rounded-2xl font-bold font-display transition-all ${
            mutation.isPending 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_30px_rgba(37,99,235,0.2)] hover:scale-[1.02]'
          }`}
        >
          {mutation.isPending ? <div className="flex items-center justify-center gap-2"><Loader2 size={18} className="animate-spin"/> Przetwarzanie...</div> : 'Wyślij Przelew'}
        </button>
      </form>
    </div>
  );
};

export default TransferForm;