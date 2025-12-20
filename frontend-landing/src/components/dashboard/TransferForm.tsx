import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fintechApi } from '../../api/fintech';
import type { TransferRequest } from '../../api/fintech';
import { Send, CheckCircle, AlertOctagon } from 'lucide-react';

const TransferForm = ({ senderId }: { senderId: string }) => {
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    receiver_account_number: '',
    amount: '',
    description: 'Przelew natychmiastowy'
  });
  
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const mutation = useMutation({
    mutationFn: (data: TransferRequest) => fintechApi.makeTransfer(data),
    onSuccess: () => {
      // Sukces!
      setSuccessMsg('Przelew wysłany pomyślnie!');
      setErrorMsg('');
      setFormData({ ...formData, amount: '' }); // Czyścimy tylko kwotę
      
      // Magia React Query: Odśwież listę kont i transakcje automatycznie
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });

      // Ukryj komunikat po 3s
      setTimeout(() => setSuccessMsg(''), 3000);
    },
    onError: (error: any) => {
      console.error(error);
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
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 mt-8">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Send size={20} className="text-blue-400" />
        Nowy Przelew
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        
        {/* Odbiorca */}
        <div>
          <label className="block text-sm text-slate-400 mb-1">Numer konta odbiorcy</label>
          <input 
            type="text" 
            placeholder="26 cyfr..."
            className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-blue-500 outline-none font-mono"
            value={formData.receiver_account_number}
            onChange={(e) => setFormData({...formData, receiver_account_number: e.target.value})}
            required
            minLength={26}
            maxLength={26}
          />
        </div>

        {/* Kwota i Tytuł */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Kwota (PLN)</label>
            <input 
              type="number" 
              step="0.01"
              min="0.01"
              placeholder="0.00"
              className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-blue-500 outline-none font-mono font-bold"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Tytuł</label>
            <input 
              type="text" 
              className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-blue-500 outline-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
        </div>

        {/* Komunikaty */}
        {successMsg && (
          <div className="bg-green-500/10 text-green-400 p-3 rounded flex items-center gap-2 text-sm">
            <CheckCircle size={16} /> {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-500/10 text-red-400 p-3 rounded flex items-center gap-2 text-sm">
            <AlertOctagon size={16} /> {errorMsg}
          </div>
        )}

        <button 
          type="submit" 
          disabled={mutation.isPending}
          className={`w-full py-3 rounded font-bold transition-all ${
            mutation.isPending 
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
          }`}
        >
          {mutation.isPending ? 'Przetwarzanie...' : 'Wyślij Przelew'}
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
