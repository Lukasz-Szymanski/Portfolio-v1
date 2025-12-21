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
    enabled: searchNip.length === 10,
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
    <div className="glass-card p-10 rounded-[2.5rem] h-full flex flex-col text-left">
      <h3 className="text-xl font-bold font-display mb-8 flex items-center gap-3 text-left">
        <Search size={20} className="text-emerald-400" />
        B2B Intelligence
      </h3>

      <form onSubmit={handleSearch} className="mb-10 text-left">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="NIP (10 cyfr)..."
            className="w-full bg-black/20 border border-white/10 rounded-2xl p-5 pl-12 text-white focus:border-emerald-500 outline-none font-mono text-sm transition-all"
            value={nip}
            onChange={(e) => setNip(e.target.value.replace(/\D/g, ''))}
            maxLength={10}
          />
          <Search className="absolute left-4 top-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={20} />
          <button 
            type="submit"
            disabled={nip.length !== 10 || isFetching}
            className="absolute right-3 top-3 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50"
          >
            {isFetching ? <Loader2 className="animate-spin" size={16} /> : 'ANALYZE'}
          </button>
        </div>
        <div className="flex justify-between items-center mt-3 px-1">
            <p className="text-[10px] text-slate-500 font-mono italic">Example: 5252344078</p>
            {isFetching && <span className="text-[10px] text-emerald-500 font-mono animate-pulse">Requesting MF API...</span>}
        </div>
      </form>

      {/* Wyniki */}
      <div className="flex-grow min-h-[250px] flex items-center justify-center border border-white/5 bg-black/10 rounded-[2rem] relative overflow-hidden text-left">
        {isLoading && searchNip ? (
            <div className="text-center">
                <Loader2 className="animate-spin mx-auto text-emerald-500 mb-4" size={40} />
                <p className="text-slate-400 text-sm font-mono tracking-widest uppercase animate-pulse text-center">Decrypting Registry...</p>
            </div>
        ) : company ? (
            <div className="w-full p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-start gap-5">
                    <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400 border border-emerald-500/20">
                        <Building2 size={32} />
                    </div>
                    <div className="text-left">
                        <h4 className="text-white font-bold text-2xl font-display leading-tight text-left">{company.name}</h4>
                        <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-bold mt-2 uppercase tracking-widest font-mono">
                            <ShieldCheck size={14} />
                            <span>Registry Status: {company.is_active ? 'ACTIVE' : 'INACTIVE'}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/5">
                    <div className="flex items-start gap-3 text-slate-400 text-sm">
                        <MapPin size={18} className="text-slate-600 mt-0.5 shrink-0" />
                        <span className="text-left font-light leading-relaxed">{company.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                        <Hash size={18} className="text-slate-600 shrink-0" />
                        <span className="font-mono text-xs">REGON: <span className="text-white">{company.regon}</span></span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                        <Hash size={18} className="text-slate-600 shrink-0" />
                        <span className="font-mono text-xs">NIP: <span className="text-white">{company.nip}</span></span>
                    </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Data Integrity: Secured</span>
                    <div className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-mono text-emerald-500/70 border border-emerald-500/10">
                        SOURCE: {source === 'live_gov_api' ? 'MF_GOV_PL' : 'CACHE_LOCAL'}
                    </div>
                </div>
            </div>
        ) : isError ? (
            <div className="text-red-400 text-sm font-mono uppercase tracking-wider text-center p-8 bg-red-500/5 rounded-2xl border border-red-500/10">
                Identification Failed. <br/>Check network or NIP.
            </div>
        ) : (
            <div className="text-slate-600 text-sm font-mono text-center px-12 leading-relaxed uppercase tracking-widest opacity-50 text-center">
                Initialize Search Sequence
            </div>
        )}
      </div>
    </div>
  );
};

export default CompanyVerifier;