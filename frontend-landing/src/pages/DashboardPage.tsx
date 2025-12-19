import { Link } from 'react-router-dom';

function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Fintech Dashboard
          </h1>
          <Link to="/" className="text-gray-400 hover:text-white transition-colors">
            &larr; Back to Portfolio
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-slate-400 mb-2">Active Accounts</h3>
            <p className="text-4xl font-mono font-bold">2</p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-slate-400 mb-2">Total Balance</h3>
            <p className="text-4xl font-mono font-bold">1,000.00 <span className="text-sm text-slate-500">PLN</span></p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-slate-400 mb-2">Status</h3>
            <p className="text-emerald-400 font-bold">Live API Access</p>
          </div>
        </div>

        <div className="mt-12 text-center text-slate-500 italic">
          Dashboard is under construction. API integration coming next...
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
