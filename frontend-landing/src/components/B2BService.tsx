import React, { useState } from 'react';
import { Globe, Search, Loader2 } from 'lucide-react';

const B2BService: React.FC = () => {
  const [nip, setNip] = useState('');
  const [companyData, setCompanyData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchCompany = async () => {
    if (!nip) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/company/${nip}`);
      const data = await response.json();
      setCompanyData(data);
    } catch (error) {
      console.error("Error fetching company:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#161616] border border-gray-800 p-6 rounded-xl hover:border-emerald-500 transition-colors group">
      <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all">
        <Globe size={24} />
      </div>
      <h3 className="text-xl font-bold mb-2">B2B Company Verifier</h3>
      <p className="text-gray-500 text-sm mb-6">FastAPI, Redis Caching, External API Integration.</p>
      
      {/* Interaktywny Formularz */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Enter NIP (e.g. 1234567890)" 
            className="w-full bg-black border border-gray-800 rounded-lg py-2 px-3 text-sm focus:border-emerald-500 outline-none transition-colors text-white"
            value={nip}
            onChange={(e) => setNip(e.target.value)}
          />
          <button 
            onClick={fetchCompany}
            disabled={loading}
            className="absolute right-2 top-1.5 text-emerald-500 hover:text-white transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
          </button>
        </div>

        {companyData && (
          <div className="bg-black/50 border border-emerald-500/20 rounded-lg p-3 text-[10px] font-mono animate-in fade-in slide-in-from-top-1">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">SOURCE:</span>
              <span className={companyData.source === 'cache' ? 'text-yellow-500' : 'text-emerald-500'}>
                {companyData.source.toUpperCase()}
              </span>
            </div>
            <div className="text-gray-300">
              <p className="mb-1 uppercase font-bold text-white">{companyData.data.name}</p>
              <p>{companyData.data.address}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs font-mono text-green-500 bg-green-500/5 px-3 py-1 rounded-full w-fit">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        STATUS: ONLINE
      </div>
    </div>
  );
};

export default B2BService;
