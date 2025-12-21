import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { b2bApi } from '../../api/b2b';
import { Search, Building2, ShieldCheck, MapPin, Hash, Loader2 } from 'lucide-react';

const CompanyVerifier = () => {
  const [nip, setNip] = useState('');
  const [searchNip, setSearchNip] = useState('');

  const { data: result, isLoading, isError, isFetching } = useQuery({
    queryKey: ['company', searchNip],
    queryFn: () => b2bApi.getCompany(searchNip),
    enabled: searchNip.length === 10, // Szukaj tylko gdy NIP ma 10 znaków
    retry: false
  });

  const company = result?.data;
  const source = result?.source;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (nip.length === 10) {
      setSearchNip(nip);
    }
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 h-full">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Search size={20} className="text-emerald-400" />
        B2B Verifier
      </h3>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Wpisz NIP (10 cyfr)..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 pl-10 text-white focus:border-emerald-500 outline-none font-mono"
            value={nip}
            onChange={(e) => setNip(e.target.value.replace(/\D/g, ''))}
            maxLength={10}
          />
          <Search className="absolute left-3 top-3.5 text-slate-500" size={18} />
          <button 
            type="submit"
            disabled={nip.length !== 10 || isFetching}
            className="absolute right-2 top-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-md text-sm font-bold transition-colors disabled:opacity-50"
          >
            {isFetching ? <Loader2 className="animate-spin" size={16} /> : 'Sprawdź'}
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2 italic">Testuj NIP: 1234567890 (mock) lub 5252344078 (Google PL)</p>
      </form>

      {/* Wyniki */}
      <div className="min-h-[200px] flex items-center justify-center border-2 border-dashed border-slate-700/50 rounded-xl relative overflow-hidden">
        {isLoading && searchNip ? (
            <div className="text-center">
                <Loader2 className="animate-spin mx-auto text-emerald-500 mb-2" size={32} />
                <p className="text-slate-400 text-sm italic animate-pulse">Consulting registers...</p>
            </div>
        ) : company ? (
            <div className="w-full p-4 space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-start gap-3">
                    <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
                        <Building2 size={24} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg leading-tight">{company.name}</h4>
                        <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold mt-1">
                            <ShieldCheck size={12} />
                            <span>STATUS: {company.is_active ? 'ACTIVE' : 'INACTIVE'}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 pt-2">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <MapPin size={16} />
                        <span className="break-words">{company.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Hash size={16} />
                        <span>REGON: {company.regon}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Hash size={16} />
                        <span>NIP: {company.nip}</span>
                    </div>
                </div>
                
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-2 rounded text-[10px] text-emerald-500/60 text-center uppercase tracking-widest font-bold">
                    Source: {source === 'live_gov_api' ? 'Ministry of Finance API' : source}
                </div>
            </div>
        ) : isError ? (
            <div className="text-red-400 text-sm text-center p-4">
                Nie znaleziono firmy o podanym numerze NIP.
            </div>
        ) : (
            <div className="text-slate-500 text-sm text-center px-6">
                Wprowadź NIP kontrahenta, aby zweryfikować jego dane w systemie B2B.
            </div>
        )}
      </div>
    </div>
  );
};

export default CompanyVerifier;
